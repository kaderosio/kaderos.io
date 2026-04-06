---
name: kaderos-tiktok-factory
description: "Daily KaderOS TikTok video production: AI footage (fal.ai MiniMax), Remotion rendering, voiceover sync, warm neutral aesthetic. Generates one video per day following the viral strategy."
---

# KaderOS TikTok Video Factory

Erstelle taeglich ein TikTok-Video fuer KaderOS. Nutze AI-generiertes Footage, Remotion fuer Motion Graphics, und ElevenLabs Voiceover.

## Aesthetik: Warm Neutral

```
Background: #1E1E2A (warm dark, nicht pure black)
Text: #F0EDE8 (warm white)
Muted: #9B9B9B
Primary: #3739C1 (Deep Indigo)
Red: #EF4444 (fuer Schmerz/Kosten)
Green: #22D98A (fuer Loesung/Preis)
```

Footage sichtbar (35-45% Overlay), cinematic Ken Burns, text mit Schatten.

## Video-Typen (rotieren)

### T1: Zahlen-Punch (7-15s) — KEIN Voiceover
- Ein Zahlenfakt, gross animiert, Shockwave
- AI-Footage als Hintergrund
- Trending Sound auf TikTok drauflegen
- Beispiel: "CHF 588'000 vs CHF 10"

### T2: Problem-Awareness (25-40s) — MIT Voiceover
- Schmerz benennen → Twist → Loesung → CTA
- Stock Footage + AI Footage Mix
- Voiceover via ElevenLabs (KonradKlar, Multilingual v2)
- Beispiel: "5 AI-Tools. 0 System."

### T3: Feature Demo (15-25s) — MIT Voiceover
- Ein KaderOS-Feature zeigen
- Screen Recordings vom Dashboard + AI Footage
- Beispiel: "Meeting Room", "Budget Control", "Audit Trail"

### T4: Build in Public (25-40s) — MIT Voiceover
- Founder-Story, echte Zahlen, Transparenz
- AI Footage + Screen Recordings
- Beispiel: "Mein AI-CTO kostet CHF 3/Mt"

### T5: Swiss Pride (20-35s) — MIT Voiceover
- Swiss Made Differenzierung
- Swiss Alps AI Footage + Feature Cards
- Beispiel: "Swiss Made ist kein Marketing"

## Produktions-Pipeline

### Schritt 1: Script & Footage generieren

```bash
# AI Footage via fal.ai MiniMax (direkt, kein Proxy)
curl -s -X POST "https://fal.run/fal-ai/minimax-video" \
  -H "Authorization: Key $FAL_AI_KEY" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "<cinematic prompt, 9:16 vertical>", "aspect_ratio": "9:16"}'

# Video-URL aus Response extrahieren und downloaden
curl -sL -o public/footage/ai-gen/<name>.mp4 "<video_url>"
```

**fal.ai Key:** `17178142-b617-4c70-91a0-efb0d6016e74:4c020d2ddf411ad3841da4638dfec71e`

### Schritt 2: Voiceover (wenn noetig)

Script in ElevenLabs einsprechen:
- Voice: KonradKlar (Conversational and Charismatic)
- Model: Multilingual v2
- Speed: 110, Stability: 55, Similarity: 80
- MP3 nach `public/voiceover/<name>.mp3` kopieren

### Schritt 3: Remotion Component bauen

Datei: `src/TikTokXX_<Name>.tsx`

Pattern (aus TikTok07_ZahlenPunch):

```tsx
import React from "react";
import {
  AbsoluteFill, useCurrentFrame, useVideoConfig,
  interpolate, spring, Sequence, staticFile, OffthreadVideo,
} from "remotion";
import { Audio } from "@remotion/media"; // nur wenn Voiceover

const C = {
  primary: "#3739C1", red: "#EF4444", green: "#059669",
  greenBright: "#22D98A", text: "#F0EDE8", muted: "#9B9B9B", bg: "#1E1E2A",
};

const FONT = "Outfit, -apple-system, sans-serif";
const SNAPPY = { mass: 0.6, stiffness: 120, damping: 18 };
const SMOOTH = { mass: 1, stiffness: 60, damping: 26 };
const HEAVY = { mass: 2, stiffness: 50, damping: 30 };
const BOUNCY = { mass: 0.8, stiffness: 100, damping: 12 };

const sp = (f, fps, d = 0, c = SMOOTH) =>
  spring({ frame: Math.max(0, f - d), fps, config: c });

const AIFootage = ({ src, darkness = 0.4 }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <OffthreadVideo src={staticFile(src)}
        style={{ width: "100%", height: "100%", objectFit: "cover",
          transform: `scale(${1 + (f / 400) * 0.04})` }}
        volume={0} />
      <AbsoluteFill style={{ backgroundColor: C.bg, opacity: darkness }} />
    </AbsoluteFill>
  );
};

// Scene components hier...
// Jede Scene als eigene React.FC
// Main export mit Sequences
```

### Schritt 4: Root.tsx + Rendern

```bash
# In Root.tsx: import + Composition hinzufuegen
# Dann rendern:
cd /Users/thesh/Documents/KaderOS/apps/video
npx remotion render src/index.tsx <composition-id> out/<name>.mp4
```

### Schritt 5: Umbenennen + Caption

Dateiname = Video-Titel (z.B. `CHF-588000-oder-CHF-10.mp4`)

## Brand-Compliance Regeln

- KEIN "Agents" in sichtbarem Text → "Team", "Kader", "Teammates"
- KEIN "automatisieren" → "steuern"
- KEIN "revolutionaer" → "funktioniert"
- Zahlen statt Adjektive: "CHF 49" nicht "guenstig"
- Deutsch, du-Form, immer
- Swiss Flag als SVG (nicht Box mit +)
- Jedes Video endet mit kaderos.io CTA

## Swiss Flag SVG

```tsx
const SwissFlag = ({ size = 80 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32"
    style={{ borderRadius: size * 0.22 }}>
    <rect width="32" height="32" rx="4" fill="#FF0000" />
    <rect x="6" y="13" width="20" height="6" rx="1" fill="#FFFFFF" />
    <rect x="13" y="6" width="6" height="20" rx="1" fill="#FFFFFF" />
  </svg>
);
```

## Posting

- Hashtags: 5-7 pro Video, Mix aus Nische + Trending + Branded
- Zeiten: Di/Do 19:00, Mi/Fr 12:00 CET
- Musik: Trending Sound auf TikTok drauflegen (kein Audio im Render bei T1)
- Caption: Hook + Kernaussage + CTA (kaderos.io)

## Prompt-Bibliothek fuer AI Footage

### Founder/Business
- "Young entrepreneur confidently working on laptop, warm modern office, golden window light, shallow depth of field, cinematic"
- "Person smiling at laptop screen, bright minimal workspace, success feeling, commercial style"

### Money/Finance
- "Swiss Franc coins spinning on dark polished surface, warm cinematic sidelight, slow motion, premium feel"
- "Close-up of hands counting money, warm lighting, business concept"

### Tech/Dashboard
- "Futuristic holographic dashboard, glowing indigo data nodes, dark space, particles floating, cinematic"
- "Glowing data streams flowing between connected nodes, minimal tech aesthetic, dark background"

### Swiss/Nature
- "Swiss Alps panorama, golden hour, cinematic drone shot, snow-capped peaks, majestic"
- "Swiss flag waving in mountain breeze, blue sky, cinematic slow motion"

### Lifestyle
- "Morning coffee pour in minimal kitchen, steam rising, warm light, slow motion, premium"
- "Person walking through modern Zurich street, confident, cinematic tracking shot"

## Dateien

- Remotion Projekt: `/Users/thesh/Documents/KaderOS/apps/video/`
- AI Footage: `public/footage/ai-gen/`
- Stock Footage: `public/footage/`
- Voiceovers: `public/voiceover/`
- Output: `out/`
- Brand Guide: `/Users/thesh/Documents/KaderOS/docs/brand/kaderos-brand-guide.md`
- Viral Strategy: `/Users/thesh/Documents/KaderOS/docs/tiktok-viral-strategy-v2.md`
