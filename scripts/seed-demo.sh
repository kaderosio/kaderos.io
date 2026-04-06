#!/bin/bash
# KaderOS Demo Seed Script
# Creates a realistic demo company with agents, tasks, goals, budgets, heartbeats, decisions, activity

SB_URL="https://oxxfmimytrmvbkvhttvl.supabase.co"
SB_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94eGZtaW15dHJtdmJrdmh0dHZsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTE0NjQxNiwiZXhwIjoyMDkwNzIyNDE2fQ.g2PX46NeU64CO1E8h5JuKHgLuiMrjHk-iQVIrPzw3pg"
DEMO_USER_ID="323c77ee-5765-4b17-8acd-996147eb8def"

H1="apikey: ${SB_KEY}"
H2="Authorization: Bearer ${SB_KEY}"
H3="Content-Type: application/json"
H4="Content-Profile: public"
H5="Accept-Profile: public"
H6="Prefer: return=representation"

post() {
  curl -s "${SB_URL}/rest/v1/$1" -X POST -H "$H1" -H "$H2" -H "$H3" -H "$H4" -H "$H5" -H "$H6" -d "$2"
}

echo "=== KaderOS Demo Seed ==="

# 1. Create Demo Company
echo "Creating company..."
COMPANY=$(post "companies" '{
  "name": "NovaTech GmbH",
  "slug": "novatech",
  "mission": "KI-gestützte Lösungen für Schweizer KMU",
  "description": "Wir automatisieren Geschäftsprozesse mit AI-Agents",
  "locale": "de-CH",
  "currency": "CHF",
  "timezone": "Europe/Zurich",
  "settings": {"owner_id": "'"${DEMO_USER_ID}"'"},
  "is_active": true
}')
COMPANY_ID=$(echo "$COMPANY" | python3 -c "import sys,json; print(json.load(sys.stdin)[0]['id'])")
echo "Company: $COMPANY_ID"

# 2. Create 4 Agents (Startup Template)
echo "Creating agents..."

AGENT_CEO=$(post "agents" '{
  "company_id": "'"${COMPANY_ID}"'",
  "name": "Alex",
  "role": "CEO & Strategie",
  "job_description": "Definiert die Unternehmensstrategie, priorisiert Initiativen und koordiniert das Team.",
  "system_prompt": "Du bist Alex, CEO von NovaTech. Du denkst strategisch, priorisierst klar und kommunizierst direkt. Antworte immer auf Deutsch.",
  "type": "claude",
  "status": "active",
  "accent_color": "#000088",
  "skills": ["strategie", "planung", "delegation"],
  "focus": "Q2 2026 Wachstumsstrategie",
  "completed_tasks": 12,
  "open_tasks": 2
}')
CEO_ID=$(echo "$AGENT_CEO" | python3 -c "import sys,json; print(json.load(sys.stdin)[0]['id'])")
echo "Agent Alex (CEO): $CEO_ID"

AGENT_DEV=$(post "agents" '{
  "company_id": "'"${COMPANY_ID}"'",
  "name": "Mia",
  "role": "CTO & Entwicklung",
  "job_description": "Verantwortlich für Technik, Architektur und Code-Qualität.",
  "system_prompt": "Du bist Mia, CTO von NovaTech. Du bist technisch präzise, pragmatisch und hilfst bei Architektur-Entscheidungen. Antworte auf Deutsch.",
  "type": "gpt",
  "status": "active",
  "accent_color": "#059669",
  "skills": ["entwicklung", "architektur", "code-review"],
  "focus": "API Performance Optimierung",
  "completed_tasks": 18,
  "open_tasks": 3
}')
DEV_ID=$(echo "$AGENT_DEV" | python3 -c "import sys,json; print(json.load(sys.stdin)[0]['id'])")
echo "Agent Mia (CTO): $DEV_ID"

AGENT_SALES=$(post "agents" '{
  "company_id": "'"${COMPANY_ID}"'",
  "name": "Luca",
  "role": "Sales & Outreach",
  "job_description": "Generiert Leads, qualifiziert Prospects und erstellt Angebote.",
  "system_prompt": "Du bist Luca, Sales Agent bei NovaTech. Du bist freundlich, überzeugend und kennst den Schweizer Markt. Antworte auf Deutsch.",
  "type": "gpt",
  "status": "active",
  "accent_color": "#D97706",
  "skills": ["sales", "lead-gen", "angebote"],
  "focus": "10 neue Leads pro Woche",
  "completed_tasks": 8,
  "open_tasks": 4
}')
SALES_ID=$(echo "$AGENT_SALES" | python3 -c "import sys,json; print(json.load(sys.stdin)[0]['id'])")
echo "Agent Luca (Sales): $SALES_ID"

AGENT_CONTENT=$(post "agents" '{
  "company_id": "'"${COMPANY_ID}"'",
  "name": "Sara",
  "role": "Content & Marketing",
  "job_description": "Erstellt Blog-Artikel, Social Media Posts und Marketing-Materialien.",
  "system_prompt": "Du bist Sara, Content Managerin bei NovaTech. Du schreibst klar, überzeugend und SEO-optimiert. Antworte auf Deutsch.",
  "type": "claude",
  "status": "active",
  "accent_color": "#7C3AED",
  "skills": ["content", "seo", "social-media"],
  "focus": "3 Blog-Artikel pro Woche",
  "completed_tasks": 15,
  "open_tasks": 2
}')
CONTENT_ID=$(echo "$AGENT_CONTENT" | python3 -c "import sys,json; print(json.load(sys.stdin)[0]['id'])")
echo "Agent Sara (Content): $CONTENT_ID"

# 3. Create Goals
echo "Creating goals..."

GOAL1=$(post "goals" '{
  "company_id": "'"${COMPANY_ID}"'",
  "title": "20 zahlende Kunden bis Ende Q2",
  "description": "Erste 20 KMU-Kunden im Pro-Tier akquirieren",
  "owner_agent_id": "'"${SALES_ID}"'",
  "status": "on-track",
  "progress": 35,
  "deadline": "2026-06-30",
  "department": "Sales"
}')
GOAL1_ID=$(echo "$GOAL1" | python3 -c "import sys,json; print(json.load(sys.stdin)[0]['id'])")

GOAL2=$(post "goals" '{
  "company_id": "'"${COMPANY_ID}"'",
  "title": "MVP Feature-Complete",
  "description": "Alle Must-Have Features aus der Feature Spec implementiert",
  "owner_agent_id": "'"${DEV_ID}"'",
  "status": "on-track",
  "progress": 72,
  "deadline": "2026-04-30",
  "department": "Engineering"
}')
GOAL2_ID=$(echo "$GOAL2" | python3 -c "import sys,json; print(json.load(sys.stdin)[0]['id'])")

GOAL3=$(post "goals" '{
  "company_id": "'"${COMPANY_ID}"'",
  "title": "SEO: Top 10 für AI Agent Schweiz",
  "description": "Organischer Traffic durch Blog-Content aufbauen",
  "owner_agent_id": "'"${CONTENT_ID}"'",
  "status": "at-risk",
  "progress": 20,
  "deadline": "2026-05-31",
  "department": "Marketing"
}')
GOAL3_ID=$(echo "$GOAL3" | python3 -c "import sys,json; print(json.load(sys.stdin)[0]['id'])")

echo "Goals created: $GOAL1_ID, $GOAL2_ID, $GOAL3_ID"

# 4. Create Tasks (mix of statuses)
echo "Creating tasks..."

# Done tasks
post "tasks" '{"company_id":"'"${COMPANY_ID}"'","agent_id":"'"${DEV_ID}"'","title":"Heartbeat Engine implementieren","description":"Vercel Cron endpoint für automatische Task-Execution","status":"done","priority":"high","goal_id":"'"${GOAL2_ID}"'","completed_at":"2026-04-03T20:00:00Z"}' > /dev/null
post "tasks" '{"company_id":"'"${COMPANY_ID}"'","agent_id":"'"${DEV_ID}"'","title":"Budget Enforcement System","description":"checkBudget + recordCost mit USD→CHF Pipeline","status":"done","priority":"high","goal_id":"'"${GOAL2_ID}"'","completed_at":"2026-04-04T14:00:00Z"}' > /dev/null
post "tasks" '{"company_id":"'"${COMPANY_ID}"'","agent_id":"'"${CONTENT_ID}"'","title":"Blog: Warum KaderOS für Schweizer KMU","description":"SEO-optimierter Artikel über AI-Agents im KMU-Kontext","status":"done","priority":"medium","goal_id":"'"${GOAL3_ID}"'","completed_at":"2026-04-02T10:00:00Z"}' > /dev/null
post "tasks" '{"company_id":"'"${COMPANY_ID}"'","agent_id":"'"${SALES_ID}"'","title":"Lead-Liste Zürich erstellen","description":"50 digital-affine KMU in Zürich recherchieren","status":"done","priority":"high","goal_id":"'"${GOAL1_ID}"'","completed_at":"2026-04-01T16:00:00Z"}' > /dev/null
post "tasks" '{"company_id":"'"${COMPANY_ID}"'","agent_id":"'"${CEO_ID}"'","title":"Q2 OKRs definieren","description":"Quartalsziele für alle Abteilungen festlegen","status":"done","priority":"high","completed_at":"2026-03-29T11:00:00Z"}' > /dev/null

# In-progress tasks
post "tasks" '{"company_id":"'"${COMPANY_ID}"'","agent_id":"'"${DEV_ID}"'","title":"Bexio Connector bauen","description":"OAuth Flow + Rechnungs-Sync für Bexio","status":"in-progress","priority":"high","goal_id":"'"${GOAL2_ID}"'"}' > /dev/null
post "tasks" '{"company_id":"'"${COMPANY_ID}"'","agent_id":"'"${SALES_ID}"'","title":"Outreach-Kampagne starten","description":"Personalisierte Emails an 50 Leads senden","status":"in-progress","priority":"medium","goal_id":"'"${GOAL1_ID}"'"}' > /dev/null

# Todo tasks
post "tasks" '{"company_id":"'"${COMPANY_ID}"'","agent_id":"'"${CONTENT_ID}"'","title":"TikTok Video: 5 AI Tools für KMU","description":"60-Sekunden Video-Skript + Storyboard","status":"todo","priority":"medium","goal_id":"'"${GOAL3_ID}"'"}' > /dev/null
post "tasks" '{"company_id":"'"${COMPANY_ID}"'","agent_id":"'"${DEV_ID}"'","title":"E2E Tests schreiben","description":"Playwright Tests für alle Dashboard-Pages","status":"todo","priority":"low","goal_id":"'"${GOAL2_ID}"'"}' > /dev/null
post "tasks" '{"company_id":"'"${COMPANY_ID}"'","agent_id":"'"${SALES_ID}"'","title":"Pricing-Page A/B Test","description":"Zwei Varianten testen: CHF 49 vs CHF 39 Einstieg","status":"todo","priority":"medium","goal_id":"'"${GOAL1_ID}"'"}' > /dev/null
post "tasks" '{"company_id":"'"${COMPANY_ID}"'","agent_id":"'"${CEO_ID}"'","title":"Investor Deck aktualisieren","description":"Seed-Deck mit neuen Metriken updaten","status":"todo","priority":"low"}' > /dev/null

# Blocked task
post "tasks" '{"company_id":"'"${COMPANY_ID}"'","agent_id":"'"${SALES_ID}"'","title":"CRM Integration evaluieren","description":"HubSpot vs Pipedrive für Lead-Management vergleichen","status":"blocked","priority":"medium","goal_id":"'"${GOAL1_ID}"'"}' > /dev/null

# Review task
post "tasks" '{"company_id":"'"${COMPANY_ID}"'","agent_id":"'"${CONTENT_ID}"'","title":"Blog: Solo Founder AI Stack","description":"Artikel über den idealen AI-Stack für Solo Founders","status":"review","priority":"medium","goal_id":"'"${GOAL3_ID}"'"}' > /dev/null

echo "13 tasks created"

# 5. Create Budgets
echo "Creating budgets..."
BUDGET1=$(post "budgets" '{"company_id":"'"${COMPANY_ID}"'","agent_id":"'"${CEO_ID}"'","monthly_limit_chf":30.00,"spent_chf":12.40,"warning_threshold":80,"period":"2026-04","is_paused":false}')
B1_ID=$(echo "$BUDGET1" | python3 -c "import sys,json; print(json.load(sys.stdin)[0]['id'])")

BUDGET2=$(post "budgets" '{"company_id":"'"${COMPANY_ID}"'","agent_id":"'"${DEV_ID}"'","monthly_limit_chf":80.00,"spent_chf":45.20,"warning_threshold":80,"period":"2026-04","is_paused":false}')
B2_ID=$(echo "$BUDGET2" | python3 -c "import sys,json; print(json.load(sys.stdin)[0]['id'])")

BUDGET3=$(post "budgets" '{"company_id":"'"${COMPANY_ID}"'","agent_id":"'"${SALES_ID}"'","monthly_limit_chf":50.00,"spent_chf":38.90,"warning_threshold":80,"period":"2026-04","is_paused":false}')
B3_ID=$(echo "$BUDGET3" | python3 -c "import sys,json; print(json.load(sys.stdin)[0]['id'])")

BUDGET4=$(post "budgets" '{"company_id":"'"${COMPANY_ID}"'","agent_id":"'"${CONTENT_ID}"'","monthly_limit_chf":40.00,"spent_chf":22.10,"warning_threshold":80,"period":"2026-04","is_paused":false}')
B4_ID=$(echo "$BUDGET4" | python3 -c "import sys,json; print(json.load(sys.stdin)[0]['id'])")

echo "4 budgets created"

# 6. Create Cost Entries
echo "Creating cost entries..."
post "cost_entries" '{"budget_id":"'"${B1_ID}"'","agent_id":"'"${CEO_ID}"'","amount_chf":4.20,"tokens_used":8500,"model":"claude-sonnet-4","description":"Q2 OKRs definieren"}' > /dev/null
post "cost_entries" '{"budget_id":"'"${B1_ID}"'","agent_id":"'"${CEO_ID}"'","amount_chf":8.20,"tokens_used":15200,"model":"claude-sonnet-4","description":"Strategische Analyse Wettbewerb"}' > /dev/null
post "cost_entries" '{"budget_id":"'"${B2_ID}"'","agent_id":"'"${DEV_ID}"'","amount_chf":12.50,"tokens_used":22000,"model":"gpt-4o","description":"Heartbeat Engine Implementation"}' > /dev/null
post "cost_entries" '{"budget_id":"'"${B2_ID}"'","agent_id":"'"${DEV_ID}"'","amount_chf":18.30,"tokens_used":31500,"model":"gpt-4o","description":"Budget System + Cost Pipeline"}' > /dev/null
post "cost_entries" '{"budget_id":"'"${B2_ID}"'","agent_id":"'"${DEV_ID}"'","amount_chf":14.40,"tokens_used":25800,"model":"gpt-4o","description":"Decision Log API"}' > /dev/null
post "cost_entries" '{"budget_id":"'"${B3_ID}"'","agent_id":"'"${SALES_ID}"'","amount_chf":15.60,"tokens_used":28000,"model":"gpt-4o","description":"Lead-Liste Zürich recherchieren"}' > /dev/null
post "cost_entries" '{"budget_id":"'"${B3_ID}"'","agent_id":"'"${SALES_ID}"'","amount_chf":23.30,"tokens_used":42000,"model":"gpt-4o","description":"Outreach Emails generieren"}' > /dev/null
post "cost_entries" '{"budget_id":"'"${B4_ID}"'","agent_id":"'"${CONTENT_ID}"'","amount_chf":9.80,"tokens_used":18500,"model":"claude-sonnet-4","description":"Blog: Warum KaderOS"}' > /dev/null
post "cost_entries" '{"budget_id":"'"${B4_ID}"'","agent_id":"'"${CONTENT_ID}"'","amount_chf":12.30,"tokens_used":21000,"model":"claude-sonnet-4","description":"Blog: Solo Founder AI Stack"}' > /dev/null

echo "9 cost entries created"

# 7. Create Heartbeats
echo "Creating heartbeats..."
post "heartbeats" '{"company_id":"'"${COMPANY_ID}"'","agent_id":"'"${CEO_ID}"'","cron_expression":"0 8 * * *","is_enabled":true,"status":"completed","next_run_at":"2026-04-07T08:00:00Z","last_run_at":"2026-04-06T08:00:00Z","run_count":14,"last_result":{"success":true,"output":"Q2 Priorities reviewed"}}' > /dev/null
post "heartbeats" '{"company_id":"'"${COMPANY_ID}"'","agent_id":"'"${DEV_ID}"'","cron_expression":"0 8 * * *","is_enabled":true,"status":"completed","next_run_at":"2026-04-07T08:00:00Z","last_run_at":"2026-04-06T08:00:00Z","run_count":18,"last_result":{"success":true,"output":"Bexio connector progress"}}' > /dev/null
post "heartbeats" '{"company_id":"'"${COMPANY_ID}"'","agent_id":"'"${SALES_ID}"'","cron_expression":"0 8 * * *","is_enabled":true,"status":"completed","next_run_at":"2026-04-07T08:00:00Z","last_run_at":"2026-04-06T08:00:00Z","run_count":8,"last_result":{"success":true,"output":"3 new leads qualified"}}' > /dev/null
post "heartbeats" '{"company_id":"'"${COMPANY_ID}"'","agent_id":"'"${CONTENT_ID}"'","cron_expression":"0 8 * * *","is_enabled":true,"status":"failed","next_run_at":"2026-04-07T08:00:00Z","last_run_at":"2026-04-06T08:00:00Z","run_count":15,"last_result":{"success":false,"error":"Rate limit exceeded"}}' > /dev/null

echo "4 heartbeats created"

# 8. Create Decisions
echo "Creating decisions..."
post "decisions" '{"company_id":"'"${COMPANY_ID}"'","agent_id":"'"${CEO_ID}"'","request":"Q2 Budget auf CHF 500/Monat erhöhen","type":"budget","confidence":75,"status":"pending","reason":"Wachstumsziele erfordern mehr Agent-Kapazität"}' > /dev/null
post "decisions" '{"company_id":"'"${COMPANY_ID}"'","agent_id":"'"${SALES_ID}"'","request":"Outreach-Kampagne an 50 Leads starten","type":"outreach","confidence":82,"status":"approved","decided_by":"system","reason":"Automatisch genehmigt (Confidence ≥80%)"}' > /dev/null
post "decisions" '{"company_id":"'"${COMPANY_ID}"'","agent_id":"'"${DEV_ID}"'","request":"Task erledigt: Heartbeat Engine implementieren","type":"other","confidence":95,"status":"approved","decided_by":"system","reason":"Automatisch durch Heartbeat Engine ausgeführt"}' > /dev/null
post "decisions" '{"company_id":"'"${COMPANY_ID}"'","agent_id":"'"${CONTENT_ID}"'","request":"Blog-Artikel auf LinkedIn teilen","type":"outreach","confidence":65,"status":"pending","reason":"Soll Content auf LinkedIn gepostet werden?"}' > /dev/null
post "decisions" '{"company_id":"'"${COMPANY_ID}"'","agent_id":"'"${SALES_ID}"'","request":"CRM Integration mit HubSpot starten","type":"config","confidence":55,"status":"denied","decided_by":"'"${DEMO_USER_ID}"'","reason":"Erst nach MVP launch, zu früh"}' > /dev/null

echo "5 decisions created"

# 9. Create Activity Log
echo "Creating activity log..."
post "activity_log" '{"company_id":"'"${COMPANY_ID}"'","actor_type":"agent","actor_id":"'"${DEV_ID}"'","action":"task_auto_completed","entity_type":"task","entity_id":"00000000-0000-0000-0000-000000000001","agent_id":"'"${DEV_ID}"'","details":{"task_title":"Heartbeat Engine implementieren","tokens":22000,"cost_usd":0.14}}' > /dev/null
post "activity_log" '{"company_id":"'"${COMPANY_ID}"'","actor_type":"agent","actor_id":"'"${DEV_ID}"'","action":"task_auto_completed","entity_type":"task","entity_id":"00000000-0000-0000-0000-000000000002","agent_id":"'"${DEV_ID}"'","details":{"task_title":"Budget Enforcement System","tokens":31500,"cost_usd":0.21}}' > /dev/null
post "activity_log" '{"company_id":"'"${COMPANY_ID}"'","actor_type":"agent","actor_id":"'"${SALES_ID}"'","action":"task_auto_completed","entity_type":"task","entity_id":"00000000-0000-0000-0000-000000000003","agent_id":"'"${SALES_ID}"'","details":{"task_title":"Lead-Liste Zürich erstellen","tokens":28000,"cost_usd":0.18}}' > /dev/null
post "activity_log" '{"company_id":"'"${COMPANY_ID}"'","actor_type":"agent","actor_id":"'"${CONTENT_ID}"'","action":"task_auto_completed","entity_type":"task","entity_id":"00000000-0000-0000-0000-000000000004","agent_id":"'"${CONTENT_ID}"'","details":{"task_title":"Blog: Warum KaderOS für Schweizer KMU","tokens":18500,"cost_usd":0.11}}' > /dev/null
post "activity_log" '{"company_id":"'"${COMPANY_ID}"'","actor_type":"system","actor_id":"heartbeat","action":"budget_exceeded","entity_type":"agent","entity_id":"'"${SALES_ID}"'","agent_id":"'"${SALES_ID}"'","details":{"remaining":11.10}}' > /dev/null
post "activity_log" '{"company_id":"'"${COMPANY_ID}"'","actor_type":"agent","actor_id":"'"${CEO_ID}"'","action":"task_delegated","entity_type":"task","entity_id":"00000000-0000-0000-0000-000000000005","agent_id":"'"${CEO_ID}"'","details":{"from":"Alex","to":"Mia","title":"Bexio Connector bauen"}}' > /dev/null
post "activity_log" '{"company_id":"'"${COMPANY_ID}"'","actor_type":"user","actor_id":"'"${DEMO_USER_ID}"'","action":"decision_reviewed","entity_type":"decision","entity_id":"00000000-0000-0000-0000-000000000006","details":{"status":"denied","reason":"Erst nach MVP launch"}}' > /dev/null
post "activity_log" '{"company_id":"'"${COMPANY_ID}"'","actor_type":"agent","actor_id":"'"${CONTENT_ID}"'","action":"task_auto_failed","entity_type":"task","entity_id":"00000000-0000-0000-0000-000000000007","agent_id":"'"${CONTENT_ID}"'","details":{"error":"Rate limit exceeded","task_title":"TikTok Video Skript"}}' > /dev/null

echo "8 activity entries created"

echo ""
echo "=== DEMO SEED COMPLETE ==="
echo "Login: demo@kaderos.io / Demo2026!"
echo "Company: NovaTech GmbH ($COMPANY_ID)"
echo "Agents: Alex (CEO), Mia (CTO), Luca (Sales), Sara (Content)"
echo "Data: 13 tasks, 3 goals, 4 budgets, 9 cost entries, 4 heartbeats, 5 decisions, 8 activities"
