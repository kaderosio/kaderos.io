# KaderOS TikTok Video Factory

> **Ziel:** 3–4 Videos/Tag automatisiert produzieren und posten. 90–120 Videos/Monat.
> **Erstellt:** 3. April 2026

---

## 1. Pipeline-Architektur

```
┌──────────────────────────────────────────────────────────┐
│                    SCRIPT ENGINE                          │
│  Claude API → 20 Scripts/Batch → Queue                   │
│  Input: Video-Typ + Trending Topics + KaderOS Features   │
└────────────────────┬─────────────────────────────────────┘
                     ↓
┌──────────────────────────────────────────────────────────┐
│                  PRODUCTION LANES                         │
│                                                          │
│  Lane 1: Screen Demos      (Puppeteer + Remotion)        │
│  Lane 2: Text + Motion     (Creatomate API)              │
│  Lane 3: AI Avatar         (HeyGen API)                  │
│  Lane 4: Voice + B-Roll    (ElevenLabs + Stock)          │
│  Lane 5: Before/After      (Remotion Templates)          │
│                                                          │
└────────────────────┬─────────────────────────────────────┘
                     ↓
┌──────────────────────────────────────────────────────────┐
│                   POST-PRODUCTION                         │
│  Auto-Captions (Whisper) + Branding + Trending Sound     │
└────────────────────┬─────────────────────────────────────┘
                     ↓
┌──────────────────────────────────────────────────────────┐
│                   DISTRIBUTION                            │
│  TikTok API (Direct Post) → Instagram Reels → YT Shorts │
│  Scheduling: 4x/Tag (09:00, 12:00, 18:00, 21:00 CET)   │
└────────────────────┬─────────────────────────────────────┘
                     ↓
┌──────────────────────────────────────────────────────────┐
│                   ANALYTICS + FEEDBACK                    │
│  Views, Engagement, Follows → Top-Performer identifizieren│
│  → Feed back into Script Engine (mehr davon)             │
└──────────────────────────────────────────────────────────┘
```

---

## 2. Die 5 Production Lanes (Detail)

### Lane 1: Screen Demos (40% der Videos)
**Was:** Automatisierte Aufnahme des KaderOS Dashboards in Aktion.
**Wie:**
- Puppeteer/Playwright navigiert durch das Dashboard
- Screenshots + Screen Recording als Video-Frames
- Remotion rendert das als 30s Video mit Zoom-Effekten + Cursor-Animation
- Voice-over per ElevenLabs drübergelegt

**Tools:** Puppeteer + Remotion + ElevenLabs
**Kosten pro Video:** ~CHF 0.20 (Voice) + CHF 0.10 (Rendering) = **~CHF 0.30**

**Beispiel-Scripts:**
- "Watch me build a company in 30 seconds" (Terminal Demo)
- "So sieht mein AI-Team Dashboard aus" (Dashboard Tour)
- "Meeting Room: Ich frage meinen CTO nach dem Status" (Chat Demo)
- "Budget Control: Mein Agent hat CHF 50 Limit" (Feature Demo)

### Lane 2: Text + Motion Graphics (25% der Videos)
**Was:** Animierter Text mit Music, wie typische TikTok Trend-Videos.
**Wie:**
- Creatomate API mit JSON Template
- Text-Overlays, Transitions, Farb-Animationen
- Trending Sound drunter

**Tools:** Creatomate API
**Kosten pro Video:** ~CHF 0.07 (1 Credit ≈ 1 kurzes Video bei 720p)
**Plan:** Growth CHF 129/Monat = 10'000 Credits = ~1'000 Videos

**Beispiel-Scripts:**
- "5 Gründe warum du kein Team brauchst" (Listicle)
- "In 2 Jahren hat jeder ein AI-Team" (Hot Take)
- "CEO. CTO. CMO. CHF 0." (Punchy Statement)
- "Paperclip vs KaderOS" (Comparison)

### Lane 3: AI Avatar (15% der Videos)
**Was:** AI-generierter Sprecher erklärt KaderOS. Wie Face-to-Camera, ohne Kamera.
**Wie:**
- HeyGen API: Script → Avatar spricht → Video
- Creator Plan: Unlimited Videos, 700+ Avatars
- Custom Avatar möglich (einmal Founder aufnehmen → AI klont)

**Tools:** HeyGen API
**Kosten:** CHF 29/Monat (Creator Plan, unlimited Videos)
**Pro Video:** ~CHF 0.25 (basierend auf unlimited bei ~120 Videos/Monat)

**Beispiel-Scripts:**
- "Hey, ich bin Thesh. Ich hab KaderOS gebaut weil..." (Founder Story)
- "Du willst gründen aber hast kein Team? Schau her." (Problem/Solution)
- "Was ist KaderOS? In 30 Sekunden erklärt." (Explainer)

### Lane 4: Voice + B-Roll (10% der Videos)
**Was:** Voice-Over über Stock-Footage oder Screencast-Clips.
**Wie:**
- ElevenLabs generiert Voice-Over
- Pexels/Pixabay Free Stock Video als B-Roll
- Zusammen geschnitten mit Remotion oder Creatomate

**Tools:** ElevenLabs + Pexels (free) + Remotion
**Kosten pro Video:** ~CHF 0.30 (Voice) + CHF 0 (Stock) = **~CHF 0.30**

### Lane 5: Before/After Templates (10% der Videos)
**Was:** Split-Screen Vergleiche, Template-basiert.
**Wie:**
- Remotion Template: Links "Vorher", Rechts "Nachher"
- Daten dynamisch einsetzbar (verschiedene Features highlighten)
- Selber Sound/Transition jedes Mal

**Tools:** Remotion (selbst gehostet)
**Kosten pro Video:** ~CHF 0.05 (nur Rendering-Zeit)

---

## 3. Tool Stack — Vollständig

### Script Generation
| Tool | Zweck | Kosten |
|------|-------|--------|
| **Claude API (Sonnet)** | 20 Scripts auf einmal generieren | ~CHF 0.05/Script |
| **KaderOS Brand Skill** | Voice Consistency | CHF 0 (lokal) |

### Video Production
| Tool | Zweck | Plan | Kosten/Monat |
|------|-------|------|-------------|
| **Creatomate** | Text + Motion Videos (API) | Growth | **CHF 129** |
| **HeyGen** | AI Avatar Videos | Creator | **CHF 29** |
| **ElevenLabs** | Voice-Over Generation | Creator | **CHF 11** |
| **Remotion** | Screen Demos + Templates | Open Source | **CHF 0** |
| **Puppeteer** | Browser Automation für Demos | Open Source | **CHF 0** |

### Post-Production
| Tool | Zweck | Kosten |
|------|-------|--------|
| **Whisper (OpenAI)** | Auto-Captions generieren | ~CHF 0.01/Video |
| **FFmpeg** | Video-Zusammenschnitt, Format-Konvertierung | CHF 0 (Open Source) |
| **Pexels/Pixabay** | Free Stock Footage | CHF 0 |

### Distribution
| Tool | Zweck | Kosten |
|------|-------|--------|
| **TikTok Content Posting API** | Direct Post zu TikTok | CHF 0 (free API) |
| **Instagram Graph API** | Reels posten | CHF 0 (free API) |
| **YouTube Data API** | Shorts uploaden | CHF 0 (free API) |
| **n8n** (self-hosted) | Workflow Orchestration | CHF 0 |

### Analytics
| Tool | Zweck | Kosten |
|------|-------|--------|
| **TikTok Analytics API** | Performance-Daten | CHF 0 |
| **Plausible** | Website Traffic von TikTok | CHF 9/Monat |

---

## 4. Kostenrechnung

### Option A: Budget Pipeline (EMPFOHLEN)

| Posten | Tool | CHF/Monat |
|--------|------|-----------|
| Video Rendering | Remotion + AWS Lambda (~$0.02/Video) | 3 |
| Voice-Over | ElevenLabs Creator (100k Credits) | 22 |
| Script Generation | Claude API Sonnet | 2 |
| Auto-Captions | Whisper API | 1 |
| B-Roll | Pexels (free) + Kling | 10 |
| Screen Recording | Playwright (free) | 0 |
| Posting | TikTok/IG/YT API direkt | 0 |
| Orchestrierung | n8n Cloud Starter | 24 |
| **TOTAL Option A** | | **~CHF 62/Monat** |
| **Pro Video** | | **~CHF 0.52** |

### Option B: Premium Pipeline (mit AI Avatars)

| Posten | Tool | CHF/Monat |
|--------|------|-----------|
| Alles aus Option A | | 62 |
| AI Avatar Videos | HeyGen Creator | 29 |
| Plausible Analytics | | 9 |
| **TOTAL Option B** | | **~CHF 100/Monat** |
| **Pro Video** | | **~CHF 0.83** |

### Warum Option A reicht

> **Remotion ist unser unfairer Vorteil.** KaderOS ist React-basiert. Wir können unsere eigenen UI-Komponenten direkt als Video-Elemente nutzen. Das ist 10x authentischer als generische AI-Videos.
>
> **Playwright Screen Recording ist der Killer-Move.** Automatisierte Product-Demos die echte Features zeigen, mit echten Daten, jeden Tag ein anderes Feature — Content der konvertiert und den kein Competitor faken kann.

> **CHF 0.52 pro Video. 120 Videos/Monat. 4 Videos/Tag. Fully automated.**

---

## 5. Automation Workflow (n8n)

### Workflow 1: Daily Script Generation (06:00 CET)

```
Trigger: Cron 06:00 CET täglich
    ↓
Claude API: Generiere 4 Scripts basierend auf:
    - Rotating Video-Typ (Lane 1-5)
    - Trending TikTok Topics (via TikTok API)
    - KaderOS Feature Queue
    - Brand Skill Prompt
    ↓
Output: 4 JSON Scripts → Queue (Supabase Tabelle)
```

### Workflow 2: Video Production (07:00 CET)

```
Trigger: Neue Scripts in Queue
    ↓
Router: Nach Video-Typ:
    → Lane 1: Puppeteer → Remotion → Render
    → Lane 2: Creatomate API → Render
    → Lane 3: HeyGen API → Render
    → Lane 4: ElevenLabs + Stock → Render
    → Lane 5: Remotion Template → Render
    ↓
Post-Production:
    → Whisper: Auto-Captions
    → FFmpeg: Branding Overlay + Format
    ↓
Output: MP4 → Storage (Supabase Storage oder S3)
```

### Workflow 3: Distribution (09:00, 12:00, 18:00, 21:00 CET)

```
Trigger: Cron 4x/Tag
    ↓
Pick nächstes Video aus Queue
    ↓
Parallel:
    → TikTok Content Posting API (Direct Post)
    → Instagram Graph API (Reels)
    → YouTube Data API (Shorts)
    ↓
Update Status in Queue → "posted"
```

### Workflow 4: Analytics (22:00 CET)

```
Trigger: Cron 22:00 CET
    ↓
TikTok Analytics API: Views, Likes, Shares pro Video
    ↓
Score berechnen: Engagement Rate
    ↓
Top-Performer identifizieren → Typ + Script-Style speichern
    ↓
Feedback in Script Engine: "Mehr davon" Tags
```

---

## 6. TikTok API Setup

### Schritt 1: Developer Account
1. https://developers.tiktok.com/ → App erstellen
2. "Content Posting API" Scope beantragen: `video.upload`
3. Approval: 5–10 Business Days

### Schritt 2: OAuth Flow
1. User (Thesh) autorisiert die App einmalig
2. Access Token + Refresh Token speichern
3. Auto-Refresh via n8n Workflow

### Schritt 3: Direct Post Flow
```javascript
// 1. Initialize upload
POST https://open.tiktokapis.com/v2/post/publish/inbox/video/init/
{
  "post_info": {
    "title": "Dein nächster Mitarbeiter ist kein Mensch 🇨🇭",
    "privacy_level": "PUBLIC_TO_EVERYONE",
    "disable_duet": false,
    "disable_stitch": false,
    "disable_comment": false
  },
  "source_info": {
    "source": "FILE_UPLOAD",
    "video_size": <size_in_bytes>,
    "chunk_size": <chunk_size>
  }
}

// 2. Upload video chunks
// 3. Publish
```

### Instagram Reels API
- Über Instagram Graph API / Facebook Content Publishing API
- Benötigt Business Account + Facebook Page

### YouTube Shorts API
- YouTube Data API v3
- `videos.insert` mit `shorts` Category
- Auch OAuth-basiert

---

## 7. Content Rotation (30-Tage Kalender)

### Woche 1-4 Rotation

| Tag | 09:00 | 12:00 | 18:00 | 21:00 |
|-----|-------|-------|-------|-------|
| **Mo** | Screen Demo | Hot Take Text | AI Avatar Explainer | Before/After |
| **Di** | Feature Deep Dive | Listicle ("5 Gründe") | Voice + B-Roll | Screen Demo |
| **Mi** | AI Avatar Story | Screen Demo | Trending React | Text Motion |
| **Do** | Before/After | AI Avatar | Screen Demo | Hot Take |
| **Fr** | Voice Motivation | Screen Demo | Listicle | AI Avatar |
| **Sa** | Screen Demo | Text Motion | — | — |
| **So** | AI Avatar | Hot Take | — | — |

**Sa/So:** Nur 2 Videos (weniger Traffic, Ressourcen sparen)

---

## 8. Script Templates (für Claude API)

### System Prompt für Script Generation

```
Du bist der Content Creator für KaderOS — eine Swiss AI Workforce Platform.

REGELN:
- Deutsch (Swiss casual) mit English Tech-Begriffen
- Hook in den ersten 1.5 Sekunden
- Max 60 Sekunden Video-Länge
- CTA: "kaderos.io — Link in Bio"
- Zielgruppe: Aspirational Founders (22-35), kein Geld für Team
- Ton: Direkt, selbstbewusst, kein Marketing-BS
- Zahlen nutzen: "CHF 0", "30 Sekunden", "4 Agents"

VIDEO-TYP: [screen_demo | text_motion | ai_avatar | voice_broll | before_after]

OUTPUT FORMAT:
{
  "type": "screen_demo",
  "duration": 30,
  "hook": "Text-Overlay für erste 2 Sekunden",
  "script": "Voice-Over oder Text-Sequenz...",
  "visual_notes": "Was auf dem Bildschirm passiert...",
  "cta": "kaderos.io — Link in Bio",
  "hashtags": ["#KaderOS", "#AIBusiness", ...]
  "trending_sound": "suggestion or 'original'"
}
```

---

## 9. Implementierungs-Reihenfolge

### Phase 1: Manual + Semi-Auto (Woche 1)
- [ ] TikTok Developer Account beantragen
- [ ] Instagram Business Account erstellen
- [ ] Creatomate Account + erste Templates
- [ ] HeyGen Account + Avatar erstellen
- [ ] ElevenLabs Voice klonen (Thesh's Stimme)
- [ ] 10 Scripts manuell schreiben
- [ ] 5 Videos manuell produzieren + posten
- **Ziel:** Proof of Concept, was funktioniert

### Phase 2: Template-basiert (Woche 2)
- [ ] 5 Remotion Templates erstellen (je Lane 1 Template)
- [ ] 5 Creatomate Templates erstellen
- [ ] Claude API Script-Generation Prompt fine-tunen
- [ ] n8n Workflow 1 (Script Gen) bauen
- [ ] Batch: 20 Videos auf Vorrat produzieren
- **Ziel:** 2 Videos/Tag, halb-automatisch

### Phase 3: Fully Automated (Woche 3-4)
- [ ] TikTok API Approval erhalten
- [ ] n8n Workflow 2 (Production) bauen
- [ ] n8n Workflow 3 (Distribution) bauen
- [ ] n8n Workflow 4 (Analytics) bauen
- [ ] Puppeteer Screen Recording automatisieren
- [ ] Auto-Caption Pipeline (Whisper) integrieren
- [ ] Queue-System (Supabase) aufsetzen
- **Ziel:** 4 Videos/Tag, vollautomatisch

---

## 10. Fertige n8n Templates (80% der Pipeline existiert bereits)

| Template | Was es macht | Link |
|----------|-------------|------|
| TikTok Video Automation | OpenAI + Replicate → TikTok Upload | n8n.io/workflows/3004 |
| Fully Automated AI Video + Multi-Platform | Video Gen → TikTok + IG + YT Shorts | n8n.io/workflows/3442 |
| AI Avatar TikTok | VEED.io Avatars + ElevenLabs + GPT → TikTok | n8n.io/workflows/10000 |
| VEO 3 Viral Videos → TikTok | AI Video Gen + Auto Upload | n8n.io/workflows/8642 |

Ausserdem: [TikTok-Forge auf GitHub](https://github.com/ezedinff/TikTok-Forge) — Open Source Automated Video Pipeline.

---

## 11. Risiken & Mitigations

| Risiko | Impact | Mitigation |
|--------|--------|-----------|
| TikTok API Ablehnung | Hoch | Backup: Later.com oder manueller Upload via Browser Automation |
| AI Avatar wirkt "fake" | Mittel | Mix mit echten Screen Recordings (Lane 1 = 40%) |
| Content-Müdigkeit | Mittel | Script Rotation + Trending Topics + Analytics Feedback Loop |
| Kosten steigen | Niedrig | Hauptkosten sind fix (CHF 231). Skaliert linear. |
| Account-Sperrung | Hoch | Keine Spam-Taktiken. Echte Captions. Kein Kauf von Engagement. |

---

## Zusammenfassung

| Metrik | Wert |
|--------|------|
| **Videos pro Tag** | 3–4 |
| **Videos pro Monat** | 90–120 |
| **Kosten pro Monat** | ~CHF 231 |
| **Kosten pro Video** | ~CHF 1.93 |
| **Plattformen** | TikTok + Instagram Reels + YouTube Shorts |
| **Automation Level** | 95% (nur Trending-Reactions manuell) |
| **Time to Full Auto** | 3–4 Wochen |
| **Erster Post** | Woche 1 (manuell) |
