# KaderOS TikTok Viral Strategy v2 — Faceless Motion Graphics Pipeline

> Kein Face-to-Camera. Reine Motion Graphics. Am Fliessband produziert.
> Basierend auf 200 gescrapten TikTok-Videos + Pipeline-Research.
> Erstellt: 3. April 2026

---

## Die Daten sprechen: Faceless funktioniert

Aus unserer Analyse von 100 faceless/motion-graphics TikTok-Videos:

| Dauer | Avg. Plays | Insight |
|-------|-----------|---------|
| **7-10s** | **1'089'802** | Ultra-short Punches, ein einziger Wow-Moment |
| **11-20s** | **1'061'849** | Sweet Spot für Motion Graphics |
| **21-40s** | 520'022 | Gut für Mini-Tutorials |
| **41-60s** | 180'804 | Nur wenn Story stark |
| **60s+** | 222'658 | Deep Dives, UX Tutorials |

**Erkenntnis: Unter 20 Sekunden ist König.** Die Top-Performer machen 7-17s Videos mit einem einzigen visuellen Punch.

### Wer es vormacht (ohne Gesicht)

| Account | Plays | Stil | Was wir lernen |
|---------|-------|------|----------------|
| @fraxbit | 567k | Dashboard UI Showcases, 7s | **Minimalist, clean, eine Animation reicht** |
| @limitless.media_ | 159k | SaaS Product Ads, 14s | **Fake Product Ads für echte Brands** |
| @kram.visuals | 1.2M | Apple-Style Motion, 17s | **Brand-Aesthetic + Sound = viral** |
| @adrien.ninet | 603k | AI Tool Demos, 20s | **"Create X with AI" Hook + Motion** |
| @designvoodoo | 569k | UI/UX Tips, 34s | **Design Education mit Motion** |
| @alex.webnux | 1.1M | UX Tutorials, 89s | **Längere UX Walkthroughs** |
| @ehtsff | 5.2M | Cinematic Motion, 22s | **Trending Audio + Sick Animation** |
| @duhbinkem | 987k | Brand Love Letters, 38s | **Motion Graphics für Brands** |

---

## Unsere Pipeline: Remotion + fal.ai + n8n

### Architektur

```
┌──────────────────────────────────────────────────┐
│              SCRIPT ENGINE (Claude API)            │
│  Hook + Visual-Beschreibung + CTA generieren       │
│  Input: Template-Typ + KaderOS Feature + Trend     │
└──────────────┬───────────────────────────────────┘
               ↓
┌──────────────────────────────────────────────────┐
│            ASSET GENERATION                        │
│                                                    │
│  Audio:   ElevenLabs TTS (Voice-Over)              │
│  Images:  fal.ai / Flux (Hintergründe, Icons)     │
│  Music:   Suno AI / Trending Sound                 │
│  SFX:     freesound.org / fal.ai                   │
└──────────────┬───────────────────────────────────┘
               ↓
┌──────────────────────────────────────────────────┐
│            REMOTION RENDER ENGINE                   │
│                                                    │
│  5 Templates (React Compositions):                 │
│  T1: Dashboard Showcase (7-10s)                    │
│  T2: Zahlen-Punch (10-15s)                         │
│  T3: Feature Demo (15-20s)                         │
│  T4: Before/After Split (15-20s)                   │
│  T5: Terminal/Code Animation (10-15s)              │
│                                                    │
│  Format: 1080×1920 @ 60fps                         │
│  Output: MP4 mit Captions eingebrannt              │
└──────────────┬───────────────────────────────────┘
               ↓
┌──────────────────────────────────────────────────┐
│            POST-PRODUCTION (FFmpeg)                 │
│  Trending Audio unterlegen                         │
│  Caption Sync (Whisper → Remotion Subtitles)       │
│  Thumbnail generieren                              │
└──────────────┬───────────────────────────────────┘
               ↓
┌──────────────────────────────────────────────────┐
│            DISTRIBUTION                             │
│  TikTok → Instagram Reels → YouTube Shorts         │
│  Caption + Hashtags aus Template                   │
└──────────────────────────────────────────────────┘
```

---

## Die 5 Remotion Templates

### T1: "Dashboard Showcase" (7-10s)
**Was:** Ein einziger, cinematischer Shot des KaderOS Dashboards.
**Stil:** @fraxbit-Style — clean, minimalist, eine smooth Animation.
**Aufbau:**
- Frame 0-30: Schwarzer Screen, Text-Hook faded ein
- Frame 30-180: Dashboard morpht rein mit 3D-Perspektive
- Frame 180-420: Smooth Scroll/Zoom durch Features
- Frame 420-600: Logo + "kaderos.io"

**Warum:** @fraxbit macht 567k plays mit 7s Dashboard-Showcases. Ein sauberes UI + smooth Animation reicht.

**Beispiel-Hooks:**
- "This dashboard runs your entire company."
- "4 AI Agents. 1 Dashboard. 0 Employees."
- "What CHF 49/month looks like."

### T2: "Zahlen-Punch" (10-15s)
**Was:** Ein einziger Zahlenfakt, gross animiert, mit Shockwave.
**Stil:** @dropship-Style — 9s, eine Aussage, fertig.
**Aufbau:**
- Frame 0-60: Hook-Text (klein, muted)
- Frame 60-120: ZAHL slammed rein (gross, bold, Shockwave-Ring)
- Frame 120-300: Subtext erklärt
- Frame 300-600: Logo + CTA

**Beispiel-Hooks:**
- "Kostenpunkt für 4 C-Level Mitarbeiter:" → "CHF 0"
- "Wie viele Agents für CHF 49?" → "Unlimited"
- "Deployment-Zeit:" → "30 Sekunden"

### T3: "Feature Demo" (15-20s)
**Was:** Ein KaderOS-Feature, animiert wie ein Apple Product Video.
**Stil:** @kram.visuals / @limitless.media_ — Apple-Aesthetic, trending Sound.
**Aufbau:**
- Frame 0-60: Feature-Name typed ein (Mono Font)
- Frame 60-180: Feature-UI morpht rein
- Frame 180-600: Live-Demo der Feature (Meeting Room, Budget, Terminal)
- Frame 600-900: Agent-Karte mit Stats
- Frame 900-1200: Logo + CTA

**Beispiel-Features:**
- Meeting Room (Chat mit AI CTO)
- Budget Control (CHF Limit pro Agent)
- Terminal Onboarding (`npx kaderos onboard`)
- Agent Heartbeat (24/7 Status)

### T4: "Before/After Split" (15-20s)
**Was:** Links rot (teuer/alt), rechts grün (KaderOS/neu).
**Stil:** Split-Screen mit dramatischem Wipe.
**Aufbau:**
- Frame 0-60: "Vorher" Label
- Frame 60-450: Rote Seite baut sich auf (Kosten, Pain Points)
- Frame 450-500: Dramatischer Wipe nach rechts
- Frame 500-900: Grüne Seite (KaderOS, Agents, Preis)
- Frame 900-1200: Logo + CTA

**Beispiel-Vergleiche:**
- CHF 588k Team vs CHF 49 KaderOS
- 6 Monate Hiring vs 30s Deployment
- 5 Tools/Logins vs 1 Dashboard

### T5: "Terminal/Code Animation" (10-15s)
**Was:** Terminal-Typing-Effekt mit Output.
**Stil:** Dev-Aesthetic, grüner Text auf dunklem Hintergrund.
**Aufbau:**
- Frame 0-30: Terminal-Fenster erscheint
- Frame 30-180: Command wird getippt
- Frame 180-400: Output erscheint zeilenweise (✓ Checkmarks)
- Frame 400-600: "Your AI team is ready." + Logo

**Beispiel-Commands:**
- `npx kaderos onboard` → 4 Agents deployed
- `kaderos deploy --agent cto` → Max is online
- `kaderos budget --set 50chf` → Budget locked

---

## Benötigte Tools & Kosten

### Must-Have (Phase 1 — sofort)

| Tool | Zweck | Kosten/Monat |
|------|-------|-------------|
| **Remotion** (haben wir) | Video Rendering | CHF 0 |
| **ElevenLabs** Creator | Voice-Over TTS | CHF 22 |
| **Claude API** Sonnet | Script Generation | CHF 2 |
| **Suno AI** | Custom Background Music | CHF 10 |
| **Freesound.org** | Sound Effects | CHF 0 |
| **FFmpeg** | Post-Processing | CHF 0 |
| **Total Phase 1** | | **CHF 34/Monat** |

### Nice-to-Have (Phase 2 — ab Woche 3)

| Tool | Zweck | Kosten/Monat |
|------|-------|-------------|
| **fal.ai** | AI Image/Video Generation für Visuals | CHF 10 |
| **n8n Cloud** Starter | Workflow Automation | CHF 24 |
| **Apify** | Trend Scraping + Competitor Monitoring | CHF 49 |
| **Whisper API** | Auto-Captions/Subtitles | CHF 1 |
| **Total Phase 2** | | **CHF 118/Monat** |

### Automation (Phase 3 — ab Woche 5)

| Tool | Zweck | Kosten/Monat |
|------|-------|-------------|
| **TikTok Content API** | Auto-Posting | CHF 0 |
| **Creatomate** Growth | API Video Generation (Backup) | CHF 129 |
| **Total Phase 3** | | **CHF 247/Monat** |

---

## Produktions-Workflow: So läuft das Fliessband

### Schritt 1: Scripts generieren (5 Min/Tag)

```bash
# Claude API generiert 4 Scripts basierend auf Template-Typ
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -d '{
    "model": "claude-sonnet-4-6",
    "messages": [{
      "role": "user",
      "content": "Generiere 4 TikTok Video Scripts für KaderOS.
        Template-Typen: T1 (Dashboard 7-10s), T2 (Zahlen-Punch 10-15s),
        T3 (Feature Demo 15-20s), T5 (Terminal 10-15s).
        Jedes Script braucht: hook, scenes[], cta, hashtags, caption.
        Brand Voice: Swiss confident, Deutsch, Zahlen nutzen.
        Output: JSON Array."
    }]
  }'
```

### Schritt 2: Assets generieren (2 Min/Video)

```bash
# Voice-Over via ElevenLabs
curl https://api.elevenlabs.io/v1/text-to-speech/$VOICE_ID \
  -H "xi-api-key: $ELEVENLABS_KEY" \
  -d '{"text": "Dein nächster Mitarbeiter ist kein Mensch.", "model_id": "eleven_multilingual_v2"}'

# Background Music via Suno
# → Custom 15s Loop generieren lassen

# Images via fal.ai (optional)
# → Dashboard Screenshots, Feature Mockups
```

### Schritt 3: Remotion rendern (30s/Video)

```bash
cd /Users/thesh/Documents/KaderOS/apps/video

# Template mit dynamischen Props rendern
npx remotion render src/index.tsx template-dashboard \
  --props='{"hook":"4 Agents. 0 Employees.","feature":"dashboard","cta":"kaderos.io"}' \
  out/tiktok-daily-01.mp4
```

### Schritt 4: Post-Production (10s/Video)

```bash
# Audio unterlegen
ffmpeg -i video.mp4 -i voiceover.mp3 -i music.mp3 \
  -filter_complex "[1:a]volume=1.0[vo];[2:a]volume=0.15[bg];[vo][bg]amix=inputs=2" \
  -c:v copy output.mp4

# Captions einbrennen (via Whisper → SRT → FFmpeg)
whisper voiceover.mp3 --language de --output_format srt
ffmpeg -i output.mp4 -vf subtitles=voiceover.srt final.mp4
```

### Schritt 5: Posten

Manuell auf TikTok hochladen mit Caption + Hashtags aus dem generierten Script.

---

## Content-Kalender (Woche 1 — manuell)

| Tag | Video 1 (12:00) | Video 2 (18:00) |
|-----|-----------------|-----------------|
| **Mo** | T2: Zahlen-Punch "CHF 0" | T5: Terminal Demo |
| **Di** | T1: Dashboard Showcase | T4: Before/After |
| **Mi** | T3: Feature "Meeting Room" | T2: "30 Sekunden Deploy" |
| **Do** | T5: `npx kaderos onboard` | T1: Agent Cards |
| **Fr** | T4: Team vs KaderOS | T3: Feature "Budget" |
| **Sa** | T2: "999× günstiger" | — |
| **So** | T1: Dashboard Night Mode | — |

**= 12 Videos/Woche, 48/Monat**

---

## Hook-Bibliothek (nach Template-Typ)

### T1 Dashboard Hooks
- "This is what running a company looks like in 2026."
- "My entire team. One screen."
- "CHF 49/month. This is what you get."
- "4 Agents. Endlos Energie. 0 Drama."

### T2 Zahlen-Punch Hooks
- "Was kostet ein 4-Personen C-Level Team?" → CHF 588'000
- "Was kostet das gleiche bei KaderOS?" → CHF 49
- "Deployment-Zeit für 4 AI Agents:" → 30 Sekunden
- "Arbeitszeit pro Tag:" → 24/7
- "Krankheitstage pro Jahr:" → 0
- "Kündigungsrisiko:" → 0%

### T3 Feature Hooks
- "Your AI CTO just pushed 3 commits. At 3am."
- "Budget überschritten? Dein Agent stoppt automatisch."
- "So sieht ein Meeting mit deinem AI-Team aus."
- "Templates importieren. Team steht in 30 Sekunden."

### T4 Before/After Hooks
- "Dein Startup. Zwei Wege."
- "2020 vs 2026. So hat sich Hiring verändert."
- "Links: dein altes Setup. Rechts: dein neues."

### T5 Terminal Hooks
- "One command. Full team."
- "npx kaderos onboard — und dein CTO ist online."
- "Was passiert wenn du das hier eintippst?"

---

## KPIs & Ziele

### Woche 1 (12 Videos)
- [ ] 5 Templates in Remotion gebaut
- [ ] 12 Videos gerendert
- [ ] Alle gepostet
- [ ] 5'000+ total views
- [ ] Best-Performing Template identifiziert

### Woche 2 (12 Videos)
- [ ] Templates verfeinert basierend auf Daten
- [ ] ElevenLabs Voice-Over integriert
- [ ] 20'000+ total views
- [ ] 1 Video >10k views

### Monat 1 (48 Videos)
- [ ] 100'000+ total views
- [ ] 500+ Followers
- [ ] 30+ Waitlist Signups von TikTok
- [ ] Trending Sound Library aufgebaut
- [ ] n8n Automation läuft

---

## Nächste Schritte (jetzt)

1. **5 Remotion Templates bauen** (T1-T5) mit dynamischen Props
2. **ElevenLabs Account** erstellen + deutsche Voice testen
3. **Suno AI** Account für Background Music
4. **12 Scripts** generieren (Claude API)
5. **12 Videos rendern** + manuell posten
6. **Performance tracken** nach 7 Tagen → Templates optimieren

---

## Quellen

- [ClawVid: Faceless AI Video Pipeline mit Remotion](https://medium.com/composiohq/i-built-a-faceless-ai-video-pipeline-using-openclaw-composio-remotion-clawvid-heres-05618dc79705)
- [TikTok-Forge: Automated Video Framework](https://github.com/ezedinff/TikTok-Forge)
- [Programmatic Video Pipeline mit Remotion](https://dev.to/ryancwynar/i-built-a-programmatic-video-pipeline-with-remotion-and-you-should-too-jaa)
- [Faceless Content Strategy mit AI](https://stormy.ai/blog/faceless-content-strategy-tiktok-reddit-ai-automation)
- [Remotion TikTok Template](https://www.remotion.dev/templates/tiktok)
- [Best Faceless Video AI Generators 2026](https://syllaby.io/blog/best-faceless-video-ai-generators-tiktok-reels-shorts/)
- 200 TikTok-Videos analysiert via Apify (Hashtags: #aibusiness, #motiongraphics, #saas, #uidesign, #founder, etc.)
