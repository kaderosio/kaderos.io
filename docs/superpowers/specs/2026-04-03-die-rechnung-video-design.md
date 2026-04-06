# "Die Rechnung" — Viral TikTok Video Spec

**Date:** 2026-04-03
**Status:** Approved
**Template ID:** T6-die-rechnung
**File:** `apps/video/src/T6_DieRechnung.tsx`

## Overview

A 24-second hybrid video (real footage backgrounds + motion graphics) that tells the story of crushing startup costs → KaderOS as the answer. Dark cinematic base, rapid-fire pacing, documentary punch credibility.

**Format:** 1080×1920 (9:16 TikTok vertical)
**Duration:** 24 seconds @ 60fps = 1440 frames
**Audio:** Music only, no voiceover
**Style:** Dark Cinematic × Rapid-Fire × Documentary Hybrid

## Emotional Arc

```
Neugier → Druck → Panik → Stille → Hoffnung → Explosion → Schock → Brand
```

## Scene Breakdown

### Scene 1: COLD OPEN (Frames 0–90, 0–1.5s)

**Visual:** Dark, blurred stock footage background (empty office at night, neon light spill). Film grain overlay at 10% opacity. Text flickers in with hard cut (no spring/bounce).

**Text:** "Du willst gründen." — Outfit 700, 72px, uppercase, letter-spacing 0.15em
**Effect:** Light flash on text appear (2 frames, opacity 0→0.8→0). Subtle vignette.
**Camera:** Static with minimal drift (±1px)
**Footage:** Blurred (20px gaussian), dark overlay at 60% opacity. Atmospheric only.

### Scene 2: DIE RECHNUNG (Frames 90–420, 1.5–7s)

**Visual:** Zahlen hammer in one by one over dark footage backgrounds. Each number is bigger, redder, more aggressive than the last. Continuous zoom (scale 1.0→1.12) never stops — creates subconscious pressure.

**Content sequence (5 items, ~60 frames each):**

| Frame | Role | Cost | Size | Footage BG |
|-------|------|------|------|------------|
| 90–150 | CEO | CHF 220'000 | 120px | Blurred contract papers |
| 150–210 | CTO | CHF 180'000 | 135px | Blurred laptop screen |
| 210–270 | CMO | CHF 150'000 | 150px | Blurred invoices |
| 270–330 | CFO | CHF 140'000 | 165px | Blurred calculator/hands |
| 330–420 | TOTAL | CHF 588'000/Jahr | 180px | All footage rapid-cycling |

**Text style:** Outfit 900, color progresses `#FF4444` → `#FF2D2D` → `#DC0000`
**Role labels:** Outfit 400, 32px, `#666666`, positioned above numbers
**Effects per number:**
- Hard cut-in with `Easing.out(t => t*t*t)` (no overshoot)
- Screen shake: 6px amplitude, 10 frame decay
- Glitch flash between numbers: 2-3 frame white flash with random horizontal offset (±20px)
- Previous number fades to 20% opacity when next appears

**Camera:** Continuous push-in (scale 1.0 → 1.12 over full scene)
**Footage:** Different blurred stock per number, 70% dark overlay, grain 10%

### Scene 3: OVERLOAD (Frames 420–540, 7–9s)

**Visual:** All 5 numbers visible simultaneously, overlapping, chaotic. Screen flickers. Grain increases to 15%. Rapid cuts between footage fragments (3-4 frames per cut).

**Effects:**
- Chromatic aberration: RGB split 2-3px offset on all text
- Numbers jitter: random position offset ±4px per frame (deterministic seed)
- Opacity pulsing: all elements flicker 0.6–1.0 at irregular intervals
- Background: rapid stock footage cuts (3-4 frames each) — stress imagery
- Red vignette intensifies from edges

**Camera:** Zoom accelerates (scale 1.12 → 1.18)
**Sound cue:** Music tension peaks here

### Scene 4: BLACKOUT (Frames 540–600, 9–10s)

**Visual:** Abrupt hard cut to pure black `#0A0A0A`. Everything gone. Silence.

**Effects:**
- Film grain continues (only texture on screen)
- Cursor appears at frame 570: `│` blinking, 500ms interval, `#00FF88`
- No camera movement. Static.

**Purpose:** Pattern interrupt. After visual chaos, 1 second of nothing resets the viewer. Maximum contrast.

### Scene 5: THE COMMAND (Frames 600–780, 10–13s)

**Visual:** Terminal window on dark background. macOS-style chrome (traffic light dots). Minimal, intimate.

**Content:** `$ npx kaderos onboard`
**Typing:** Character by character, 3 frames per keystroke
**Font:** JetBrains Mono 500, 28px, `#00FF88`
**Effects:**
- Each keystroke has subtle light pulse (text-shadow expands briefly)
- Cursor blinks during pauses
- Terminal has subtle inner glow (`#00FF88` at 0.03 opacity border)
- Background: pure `#0A0A0A`, no footage (we're in KaderOS world now)

**Camera:** Minimal breathing drift (±2px horizontal)

### Scene 6: EXPLOSION (Frames 780–960, 13–16s)

**Visual:** Beat drops. Terminal dissolves. Dashboard UI erupts from center with light leaks and particle effects.

**Sequence:**
1. Frame 780: White flash (4 frames, opacity 0→1→0)
2. Frame 784: Light leaks fade in (`@remotion/light-leaks`, warm tone, 0.3 opacity)
3. Frame 790: Dashboard container scales from 0.8→1.0 with `Easing.out(t => t*t)`
4. Frame 810–900: 4 Agent cards stagger in (30 frame gaps):
   - Max/CTO — `#0891B2` (cyan) accent
   - Aura/CMO — `#059669` (green) accent
   - Vega/CFO — `#E67E22` (orange) accent
   - Orion/CEO — `#6C3AC8` (purple) accent
5. Frame 900–960: Particles drift in (20-30 dots, various sizes 2-6px, opacity 0.2-0.6)

**Dashboard style:** Dark theme (`#111` cards on `#0A0A0A`), not white. Colored accent borders top. Status dots pulse. Activity bars animate fill.
**Camera:** Pull-out zoom (scale 1.2 → 1.0) — room opens up

### Scene 7: THE PRICE (Frames 960–1200, 16–20s)

**Visual:** Dashboard dims to 30% opacity. Price takes center stage.

**Content:**
- "CHF 49" — Outfit 900, 200px, `#FFFFFF`, center
- "/Monat" — Outfit 500, 48px, `#888888`, right of 49
- "CHF 588'000/Jahr" — Outfit 600, 48px, `#FF2D2D` at 50% opacity, strikethrough animation

**Sequence:**
1. Frame 960: "CHF 49" slams in (scale 2.5→1.0, hard easing)
2. Frame 990: "/Monat" fades in (10 frames)
3. Frame 1020: Shockwave ring expands (0.5x→3x scale, white, opacity 0.6→0)
4. Frame 1030: Screen shake (8px, 12 frame decay)
5. Frame 1060: Old price appears above, already struck through
6. Frame 1080: "999× günstiger" badge slides in from bottom

**Background:** `#000088` radial glow behind price (0→0.15 opacity)
**Camera:** Breathing pulse (scale ±0.02, sine wave)

### Scene 8: CLOSER (Frames 1200–1440, 20–24s)

**Visual:** Clean brand moment. Everything fades except logo and tagline.

**Sequence:**
1. Frame 1200: Price fades out (20 frames)
2. Frame 1230: KaderOS "K" logo fades in, centered, with `#000088` atmospheric glow
3. Frame 1280: "KaderOS" text below logo, Outfit 700, 56px
4. Frame 1320: Tagline: "Dein nächster Mitarbeiter ist kein Mensch." — Outfit 400, 28px, `#888888`
5. Frame 1380: "kaderos.io" at bottom, `#000088`, Outfit 600, 32px

**Effects:**
- Grain stays at 8% until final frame
- Logo has ambient radial glow (breathing, ±0.02 opacity)
- Particles from Scene 6 continue drifting slowly
- Subtle vignette

**Camera:** Static. Stillness after the storm.

## Color System

```
Phase 1 (Druck):    #0A0A0A bg + #FF2D2D/#DC0000 text + footage overlays
Phase 2 (Stille):   #0A0A0A bg + #00FF88 terminal
Phase 3 (Lösung):   #0A0A0A bg + #000088/#0891B2/#059669/#E67E22/#6C3AC8 brand
Phase 4 (Brand):    #0A0A0A bg + #000088 glow + #FFFFFF text
```

**Rule:** KaderOS brand colors (#000088 etc.) do NOT appear before Scene 6. Color is earned.

## Typography

| Context | Font | Weight | Size Range |
|---------|------|--------|-----------|
| Headlines | Outfit | 700-900 | 72-200px |
| Labels | Outfit | 400 | 28-32px |
| Terminal | JetBrains Mono | 500 | 28px |
| Tagline | Outfit | 400 | 28px |
| URL | Outfit | 600 | 32px |

## Motion Language

**NO spring-bounce animations.** This video uses:

- **Hard cut-ins:** `Easing.out(t => t*t*t)` — immediate presence, no overshoot
- **Continuous zoom:** Scale increases over multi-second spans, never pausing
- **Glitch flash:** 2-3 frame white overlay, random offset
- **Screen shake:** Deterministic pseudo-random, 6-8px amplitude, 10-12 frame decay
- **Chromatic aberration:** RGB channel offset 2-3px (CSS filter or manual layer split)
- **Film grain:** SVG noise filter, animated at 60fps, 8-15% opacity
- **Light leaks:** `@remotion/light-leaks` package, warm tones
- **Particle drift:** Small circles (2-6px), slow movement, varying opacity
- **Shockwave ring:** Expanding circle, scale 0.5→3x, opacity fade

## Camera Behavior

```
Scene 1:    Static + minimal drift (±1px)
Scene 2-3:  Continuous push-in (1.0 → 1.18) — never stops
Scene 4:    Static — absolute stillness
Scene 5:    Minimal breathing drift (±2px)
Scene 6:    Pull-out (1.2 → 1.0) — space opens
Scene 7:    Breathing pulse (±0.02 sine)
Scene 8:    Static — calm
```

## Stock Footage Requirements

Footage is used ONLY in Scenes 1-3 as atmospheric backgrounds:

| Scene | Description | Treatment |
|-------|-------------|-----------|
| Cold Open | Empty office at night, neon light | Gaussian blur 20px, 60% dark overlay |
| CEO cost | Contract papers on desk | Gaussian blur 15px, 70% dark overlay |
| CTO cost | Laptop screen / code | Gaussian blur 15px, 70% dark overlay |
| CMO cost | Stack of invoices | Gaussian blur 15px, 70% dark overlay |
| CFO cost | Calculator / hands on head | Gaussian blur 15px, 70% dark overlay |
| Overload | Rapid mix of all above | Blur 10px, 50% overlay, 3-4 frame cuts |

**Source:** Pexels (free, no attribution). All footage must be dark/moody tone.
**Fallback:** If no footage available, use animated dark gradient backgrounds with subtle noise.

## Safe Zones (TikTok Mobile)

- Top: 12% (216px) — reserved for TikTok UI
- Bottom: 15% (288px) — reserved for caption/buttons
- Sides: 6% (65px) — thumb zone

All critical content within safe area: 65px–1015px horizontal, 216px–1632px vertical.

## Dependencies

- `remotion` v4+ (existing)
- `@remotion/light-leaks` (new — install required)
- Stock footage files in `public/footage/` (to be sourced)

## Batch Script Entry

```json
{
  "id": "v006",
  "template": "T6-die-rechnung",
  "duration": "24s",
  "fps": 60,
  "hook": "Du willst gründen. Hier ist die Rechnung.",
  "costs": {
    "ceo": 220000,
    "cto": 180000,
    "cmo": 150000,
    "cfo": 140000,
    "total": 588000
  },
  "kaderos_price": 49,
  "caption": "Die Rechnung, die kein Founder sehen will. 💀 #startup #ai #schweiz #kaderos",
  "hashtags": ["startup", "ai", "schweiz", "kaderos", "gründen", "kosten", "team"],
  "cta": "kaderos.io"
}
```

## Render Command

```bash
npx remotion render src/index.ts T6DieRechnung out/T6_DieRechnung.mp4
```
