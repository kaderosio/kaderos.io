# Heartbeat Engine + Task Binding — Spec

> **Ziel:** Agents arbeiten automatisch. Vercel Cron ruft `/api/heartbeat/tick` auf → Agents mit offenen Tasks führen diese aus → Task-Status wird aktualisiert → Kosten werden geloggt → Budget wird geprüft.

## Was der Founder damit tun kann (vorher nicht möglich)

1. Task erstellen → Agent zuweisen → Task wird **automatisch erledigt** ohne manuellen Run
2. Budget setzen → Agent pausiert automatisch wenn Limit erreicht
3. Activity Log zeigt: Wer hat was gemacht, wann, wie viele Tokens

## Architektur

```
Vercel Cron (jede Stunde, konfigurierbar)
  → POST /api/heartbeat/tick (mit CRON_SECRET Auth)
  → Für jeden Agent mit heartbeat.is_enabled=true UND heartbeat.next_run_at <= now:
    → Budget-Check: spent_chf + estimated_cost > monthly_limit_chf? → Skip
    → Tasks laden: status="todo", agent_id=agent.id, ORDER BY priority DESC, created_at ASC, LIMIT 1
    → Keine Tasks? → Skip, log "no_tasks"
    → Task gefunden → POST /api/agents/[id]/run mit Task als Prompt
    → Task-Status: "todo" → "in-progress" (vor Run) → "done" (nach Run)
    → Task Output in task_comments speichern (is_system=true)
    → Cost Entry erstellen (amount_chf aus costUsd * Wechselkurs)
    → Budget spent_chf updaten
    → Goal Progress updaten wenn task.goal_id gesetzt
    → next_run_at berechnen aus cron_expression
```

## Scope (nur das, nicht mehr)

### IN Scope
- `/api/heartbeat/tick` Endpoint (Cron-getriggert)
- `vercel.json` Cron-Config
- Budget-Check vor jedem Run
- Task-Pickup (ältester "todo" Task für den Agent)
- Task-Status-Lifecycle: todo → in-progress → done/blocked
- Cost Pipeline: costUsd → cost_entries → budgets.spent_chf
- Goal auto-progress (Tasks done / Total Tasks für Goal)
- Activity Logging für jeden Schritt

### OUT of Scope (später)
- Agent-zu-Agent Delegation
- Decision Log / Approval Gates
- Echtzeit-Execution (WebSocket/SSE)
- Multi-Task pro Heartbeat (erstmal 1 Task pro Tick pro Agent)
- Custom Cron-Expressions per Agent (erstmal Default: jede Stunde)

## Dateien

### NEU erstellen
1. **`apps/web/app/api/heartbeat/tick/route.ts`** — Cron Endpoint
   - Auth: `Authorization: Bearer ${CRON_SECRET}` (Vercel setzt das automatisch)
   - Lädt alle enabled Heartbeats mit next_run_at <= now
   - Für jeden: Budget-Check → Task-Pickup → Agent-Run → Status-Update
   - Response: JSON Summary (agents_checked, tasks_completed, errors)

2. **`apps/web/vercel.json`** — Erweitern mit Cron
   ```json
   {
     "framework": "nextjs",
     "crons": [
       { "path": "/api/heartbeat/tick", "schedule": "0 * * * *" }
     ]
   }
   ```

3. **`apps/web/lib/budget.ts`** — Budget-Check Utility
   - `checkBudget(supabase, agentId, companyId)` → `{ allowed: boolean, budget: Budget | null, remaining: number }`
   - `recordCost(supabase, { budgetId, agentId, taskId, amountChf, tokensUsed, model })` → void
   - USD→CHF Conversion: Fester Kurs 0.88 (hardcoded, später konfigurierbar)

### MODIFIZIEREN
4. **`apps/web/app/api/agents/[id]/run/route.ts`** — Erweitern
   - Akzeptiert optionales `taskId` im Body
   - Wenn taskId: Task laden → Title+Description als Prompt verwenden
   - Nach Run: Task-Status updaten, Output in task_comments speichern
   - Budget-Integration: Cost Entry erstellen nach Run

5. **`apps/web/app/api/tasks/[id]/route.ts`** — Erweitern
   - Goal-Progress-Update wenn Task completed wird und goal_id gesetzt ist

## DB-Änderungen

**Keine Migration nötig.** Alle Tabellen existieren bereits:
- `heartbeats` (mit `cron_expression`, `is_enabled`, `next_run_at`)
- `heartbeat_runs` (mit `tokens_used`, `output`, `error`)
- `budgets` (mit `monthly_limit_chf`, `spent_chf`, `warning_threshold`)
- `cost_entries` (mit `amount_chf`, `tokens_used`, `model`)
- `tasks` (mit `agent_id`, `status`, `goal_id`, `completed_at`)
- `task_comments` (mit `agent_id`, `is_system`)

## Environment Variables

- `CRON_SECRET` — Vercel setzt das automatisch für Cron Jobs. Muss im Vercel Dashboard unter Environment Variables existieren.

## Flow Detail: Ein Heartbeat Tick

```
1. GET alle heartbeats WHERE is_enabled=true AND next_run_at <= NOW()
   JOIN agents ON heartbeats.agent_id = agents.id
   
2. Für jeden Heartbeat:
   a. Budget-Check:
      → GET budget WHERE agent_id=agent.id AND period=current_month
      → Kein Budget? → Run erlaubt (kein Limit gesetzt)
      → Budget vorhanden UND is_paused=true? → Skip, log "budget_paused"
      → spent_chf >= monthly_limit_chf? → Skip, log "budget_exceeded"
      → Sonst: Run erlaubt
   
   b. Task-Pickup:
      → GET task WHERE agent_id=agent.id AND status="todo" 
        ORDER BY priority DESC, created_at ASC LIMIT 1
      → Kein Task? → Skip, log "no_tasks", update next_run_at
      → Task gefunden: UPDATE status="in-progress", updated_at=now
   
   c. Agent-Run:
      → Prompt = "Aufgabe: {task.title}\n\nBeschreibung: {task.description}"
      → POST internal call zu agents/[id]/run Logik (nicht HTTP, direkt Funktion)
      → Warte auf Result
   
   d. Post-Run:
      → Success:
        - Task status → "done", completed_at = now
        - INSERT task_comments: agent output als system comment
        - Agent: completed_tasks += 1, open_tasks -= 1
        - Goal: Recalculate progress wenn task.goal_id gesetzt
        - Cost: INSERT cost_entries, UPDATE budgets.spent_chf
        - Activity: log "task_auto_completed"
      → Failure:
        - Task status → "blocked"
        - INSERT task_comments: error als system comment
        - Activity: log "task_auto_failed"
   
   e. Heartbeat Update:
      → next_run_at = berechne nächsten Run aus cron_expression
      → status = "completed" oder "failed"
      → run_count += 1
```

## Akzeptanzkriterien

1. **Happy Path:** Task erstellen (status=todo, agent_id=Mario) → Tick aufrufen → Task ist "done", Output in task_comments
2. **Budget Exceeded:** Budget mit spent_chf >= monthly_limit_chf → Tick → Agent wird geskippt, Activity Log zeigt "budget_exceeded"
3. **No Tasks:** Agent hat keine offenen Tasks → Tick → Skip, kein Run, keine Kosten
4. **Goal Progress:** Task mit goal_id → Task done → Goal progress auto-updated
5. **Error Handling:** LLM-Call fehlgeschlagen → Task "blocked", Error in task_comments, Activity Log
6. **Auth:** Tick ohne CRON_SECRET Header → 401
7. **Vercel Cron:** vercel.json hat cron config, Endpoint wird automatisch aufgerufen

## Kostenschätzung pro Run

- Claude Sonnet: ~$0.003/1K input, ~$0.015/1K output → Typischer Task ~$0.02-0.05
- GPT-4o: ~$0.005/1K input, ~$0.015/1K output → Typischer Task ~$0.02-0.05
- USD→CHF Kurs: 0.88 (hardcoded)
- Pro Agent/Monat bei stündlichem Heartbeat: ~720 Runs max → CHF 15-35

## Nicht vergessen

- `CRON_SECRET` in Vercel Environment Variables setzen
- Default Heartbeat für existierende Agents erstellen (Migration Script oder beim ersten Tick)
- Connector Credentials: Der Tick läuft als System, nicht als User → braucht Service Role Key für DB-Zugriff
  - **WICHTIG:** `/api/heartbeat/tick` muss Supabase Service Role Client nutzen, nicht den Auth-basierten Client
  - Connector Credentials haben `user_id` — der Tick muss den Owner der Company finden und dessen Credentials nutzen
