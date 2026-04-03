# KaderOS Hero Video — Design Spec

**Date:** 2026-04-03
**Type:** Website Hero Video (looping)
**Format:** 1080×1920 (vertical) | 60fps | ~45s seamless loop
**Location:** `apps/video/src/HeroVideo.tsx`

---

## Visual Direction: Light Premium Hybrid

White backgrounds with colored gradient accents. UI mockups that look like a real product.
Subtle radial glows behind key elements. Colored box-shadows on cards matching agent colors.
Gradient text for highlights. Micro-parallax on backgrounds. Cinematic transitions between scenes.

**Not:** Generic dark AI startup. Not flat/empty. Not jittery or nervous.

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| Primary | `#3739C1` | Brand, accents, CTAs |
| Secondary | `#0018A8` | Gradient endpoints, secondary highlights |
| Cyan | `#0891B2` | Aura (CMO) agent color |
| Green | `#059669` | Success states, active dots |
| Orange | `#E67E22` | Orion (Strategy) agent color |
| Purple | `#7C3AED` | Vega (CEO) agent color |
| Text | `#1D1D1F` | Primary text |
| Muted | `#86868B` | Secondary text |
| Dim | `#A1A1AA` | Tertiary text |
| Background | `#FFFFFF` | Scene backgrounds |
| Surface | `#F8F8FA` | Card backgrounds, terminal body |
| Border | `#E8E8EC` | Borders, dividers |

### Fonts

- **Outfit** — All UI text (weights: 500, 600, 700, 800)
- **JetBrains Mono** — Terminal, code, monospace elements

### Animation Physics

All animations use Remotion `spring()` with calm, smooth configs:

- **Standard:** `{ mass: 1, stiffness: 60, damping: 26 }` — no overshoot
- **Gentle:** `{ mass: 1.2, stiffness: 40, damping: 30 }` — large elements, entrances
- **Fade durations:** 20-30 frames (not 10-15)
- **Stagger delays:** 10-15 frames between items
- **No jitter, no screen shake, no rapid oscillation**

### Transition Strategy

Scenes use `@remotion/transitions` or manual crossfades:
- Each scene has 20-frame fade-in and 20-frame fade-out
- Scenes overlap by 20 frames for smooth crossfade
- Key transitions: zoom-through (Terminal→Dashboard), zoom-in (Dashboard→CTO), fade (default)
- Loop: Scene 8 fades to white → Scene 0 fades from white (seamless)

### Micro-Detail Layer

Every scene gets these subtle enhancements:
- Radial gradient glow behind main element (`primary` at 5-8% opacity)
- Cards have colored box-shadow matching their accent color (e.g. `rgba(55,57,193,0.06)`)
- Gradient text uses `#3739C1 → #0018A8` (not purple)
- Background has faint dot-grid or radial gradient (not plain white)

---

## Scene Breakdown

### Scene 0 — Claim Opener (4s / 240 frames)

**Purpose:** Hook. Builds curiosity before the product reveal.

**Content:**
```
Dein Team steht schon bereit.
Du musst es nur noch aktivieren.
```

**Animation:**
1. Small KaderOS logo (K in #3739C1 rounded square) fades in at top center (frame 0-30)
2. First line appears word-by-word with gentle scale-bounce (0.93→1.0 per word, 12 frames stagger)
3. Pause (20 frames)
4. Second line reveals as gradient text (#3739C1 → #0018A8) with shimmer effect (backgroundPosition animation)
5. Subtle radial glow (#3739C1, 8% opacity) pulses gently behind text

**Transition out:** Text scales to 1.03 and fades → white → Terminal slides in

---

### Scene 1 — Terminal Onboard (5s / 300 frames)

**Purpose:** Show the "one command" promise. The activation from Scene 0.

**Content:**
```
$ npx kaderos onboard
✓ Kader erkannt: "Agentur Zürich"
✓ 4 Agents bereit (Max · Aura · Vega · Orion)
✓ Budget: CHF 62/Monat
🚀 Dein AI-Kader ist einsatzbereit.
```

**Visual:** Mac-style terminal window (traffic light dots, #F8F8FA title bar, white body).
Box-shadow: `0 20px 60px rgba(55,57,193,0.08)` (colored, not grey).

**Animation:**
1. Terminal slides up from bottom with gentle spring (frame 0-40)
2. Typing: `npx kaderos onboard` at 4 frames/char with blinking cursor
3. After typing done (+20 frames pause), output lines appear with:
   - Fade in (20 frames) + slideUp (12px) per line
   - 18 frames stagger between lines
4. Final line ("🚀 Dein AI-Kader...") has gradient background highlight (#3739C1→#0018A8, 8% opacity)

**Transition out:** Terminal scales to 0.85 and fades → Dashboard reveals behind it (zoom-through feel)

---

### Scene 2 — Dashboard Reveal (5s / 300 frames)

**Purpose:** Show the product. This is what you get after onboarding.

**Content (inspired by real dashboard, not 1:1):**
- Title: "Dein Kader" + subtitle "4 Agents · Active"
- Stats row: 3/4 aktiv · 6 Tasks · CHF 62/Mt.
- 4 Agent cards in 2×2 grid:
  - **Max** · CTO Agent · Indigo (`#3739C1`) · "Plattform Setup + API"
  - **Aura** · CMO Agent · Teal (`#0891B2`) · "Landing Page + Waitlist"
  - **Vega** · CEO Agent · Purple (`#7C3AED`) · "GTM Strategy + Outreach"
  - **Orion** · Strategy · Orange (`#E67E22`) · "Competitive Analysis"
- Each card: colored avatar circle with initial, green active dot, task count

**Animation:**
1. Title + subtitle fade/slideUp (frame 0-30)
2. Stats row fades in (frame 20-50)
3. Agent cards stagger in (delay 12 frames each): fade + slideUp + scale 0.96→1
4. Each card's box-shadow matches agent color at low opacity
5. Subtle 3D perspective: entire dashboard has 4° Y-rotation that settles to 0° via spring
6. Glint effect: diagonal light sweep across cards (one pass, subtle)

**Transition out:** Zoom into Max's (CTO) card → fills screen → Deep-Dive

---

### Scene 3 — CTO Deep-Dive (5s / 300 frames)

**Purpose:** Show an agent actually working. Proof it's real, not just cards.

**Content:**
- Header: Max · CTO avatar + "Arbeitet autonom · 03:14"
- Code panel: commit messages streaming in
  - `fix: rate limiting for /api/auth` (03:12)
  - `feat: add input validation layer` (03:14)
  - `test: security audit — all passed` (03:15)
  - `chore: create PR #47 → main` (03:16)
- Progress panel: 4 steps with liquid-fill checkmarks
  - Reading codebase → Security analysis → Applying fixes → Creating PR
- Tool calls: `filesystem.read`, `bash.exec`, `github.create_pr` as colored pills

**Animation:**
1. Gentle zoom-in (scale 0.97→1) as scene enters
2. Commit lines appear with fade + slideUp (35 frame stagger) — each colored by type
3. Progress steps: circle border fills from bottom to top like liquid (green fill)
4. When step completes: checkmark appears inside filled circle
5. Tool pills fade in from bottom with stagger (18 frames)
6. Active tool has slightly brighter background + green dot

**Transition out:** Zoom-out, elements shrink → Roles appear around center logo

---

### Scene 4 — Rollen-Karussell (5s / 300 frames)

**Purpose:** Show the full team. More than just a CTO — it's a complete Kader.

**Content:**
- Center: KaderOS logo (72px, #3739C1 square, soft shadow)
- 6 role cards orbiting in 3D ellipse:
  - CEO (Vega, #7C3AED), CTO (Max, #3739C1), CMO (Aura, #0891B2)
  - CFO (#059669), PM (#E67E22), Creator (#DB2777)
- Below carousel: capabilities list
  - ✓ Autonome Agents · 24/7
  - ✓ Lokal · Deine Daten
  - ✓ nDSG-konform · Swiss Made
  - ✓ Ab CHF 49/Mt.
- Tagline: "Dein Kader. Deine Regeln."

**Animation:**
1. Logo fades in center (frame 0-30)
2. Role cards appear staggered (8 frames each), then begin slow orbit (0.005 rad/frame)
3. Orbit is elliptical (radius 240px horizontal, 0.35 ratio vertical) — front cards larger/brighter
4. Front card gets highlighted border + slight color glow
5. Capabilities slide in from right with elastic easing (40px→0) at stagger 18 frames
6. Tagline: word-by-word, each word scales from 0.9→1 with smooth spring

**Transition out:** Crossfade → Pipeline

---

### Scene 5 — Pipeline Flow (5s / 300 frames)

**Purpose:** Show agents working together, not just individually.

**Content:**
Vertical pipeline with 5 steps:
1. 📝 Brief rein (Du)
2. 📋 Content-Plan (CMO / Aura)
3. ✍️ Texte schreiben (Creator)
4. 🖥️ Landing Page (CTO / Max)
5. 📊 ROI tracken (CFO)

Connected by vertical lines. Active step has colored left-border accent.

**Animation:**
1. Title "So arbeitet dein Kader" + subtitle fade in (frame 0-25)
2. Pipeline steps appear with stagger (28 frames each): fade + slideUp
3. An energy indicator (colored left-border that glows) progresses through steps over 250 frames
4. When a step completes: checkmark replaces icon, step border turns green
5. Connecting lines between steps have animated gradient (flows top to bottom)
6. When pipeline completes: "✅ Pipeline complete" fades in below

**Transition out:** Crossfade → Pricing

---

### Scene 6 — Pricing Disruption (5s / 300 frames)

**Purpose:** The price shock. Make the value proposition undeniable.

**Content:**
Split-screen comparison:
- Left (grey): "Mensch" — CHF 15'000, 8h/Tag, 3 Monate Setup, 5 Wochen Ferien
- Right (colored): "KaderOS" — CHF 62, 24/7, 30 Sekunden, 0 Ferien
- Bottom highlight: "241× günstiger" in gradient text

**Animation:**
1. "Mensch vs. Kader" title fades in (frame 0-25)
2. Both cards slide in simultaneously: left from left, right from right (spring)
3. Price numbers use animated counter:
   - Left: CHF 15'000 appears, then fades to grey (muted)
   - Right: CHF 0→62 counts up with gradient shimmer (#3739C1→#0018A8)
4. Comparison rows appear one by one (20 frame stagger): label + both values
5. Left values are grey (#86868B), right values are bold white on subtle primary background
6. "241× günstiger" appears last with gentle scale spring (0.92→1) and gradient text shimmer

**Transition out:** Crossfade → Swiss Trust

---

### Scene 7 — Swiss Trust (5s / 300 frames)

**Purpose:** Trust signals. Swiss, local, compliant, open source.

**Three sub-beats (100 frames each with crossfade):**

**Beat 1 — Swiss Made (0-100):**
- 🇨🇭 flag emoji scales in (0.7→1, gentle spring)
- "Swiss Made" below in 48px Outfit 800
- "Gebaut in der Schweiz. Für die Schweiz." in muted
- Internal crossfade at frame 80-100

**Beat 2 — Compliance (100-200):**
- "Lokal." "Autonom." "nDSG-konform." — each word appears with gentle scale (0.93→1)
- 18 frame stagger between words
- Below: "Keine Cloud. Keine Drittanbieter. Deine Daten." in JetBrains Mono, muted
- Internal crossfade at frame 180-200

**Beat 3 — Open Source (200-300):**
- KaderOS logo scales in (0.7→1)
- "100% Open Source" in 44px
- "Community Driven · Transparent · Frei" in muted

**Transition out:** Logo stays → becomes CTA logo (element continuity)

---

### Scene 8 — CTA Finale → Loop (5s / 300 frames)

**Purpose:** Call to action. Then seamless loop back to start.

**Content:**
- KaderOS logo (96px, already present from Scene 7 — continuity)
- "kaderos.io" in 60px Outfit 800 with cursor blink
- "Platz sichern" button with animated border-trace (conic-gradient rotation)
- Badges: "🇨🇭 Swiss Made · Open Source · Ab CHF 49/Mt."

**Animation:**
1. Logo already visible (continuity). Grows slightly via spring to 96px
2. "kaderos.io" fades in (frame 30-60) with calm cursor blink (50 frame cycle)
3. "Platz sichern" button fades in (frame 60-90):
   - Subtle border-trace: conic-gradient rotates at 3°/frame (slow, elegant)
   - Button has #3739C1 at 10% opacity background
4. Badges fade in (frame 90-120)
5. Subtle radial glow behind logo pulses very gently (scale 1±0.01)
6. **Loop transition (frame 260-300):** Everything fades to white over 40 frames → seamless into Scene 0

**Loop point:** Frame 300 of Scene 8 = visually identical to Frame 0 of Scene 0 (white screen, no elements)

---

## Technical Architecture

### File Structure

```
apps/video/src/
├── HeroVideo.tsx          # Main composition with all scenes + sequencing
├── Root.tsx               # Remotion Composition registration
└── index.tsx              # Entry point
```

All scenes live in HeroVideo.tsx as internal components (matching current structure).

### Dependencies Used

- `remotion` — core (AbsoluteFill, Sequence, spring, interpolate, useCurrentFrame, useVideoConfig)
- `@remotion/transitions` — if needed for advanced scene transitions (optional, manual crossfade may suffice)

### Composition Config

```tsx
id: "HeroVideo"
width: 1080
height: 1920
fps: 60
durationInFrames: 2700 (45s)
```

Second composition for landscape preview:
```tsx
id: "HeroVideoLandscape"
width: 1920
height: 1080
fps: 60
durationInFrames: 2700
```

### Scene Timing (60fps)

| Scene | Start | Duration | End |
|---|---|---|---|
| 0 — Claim | 0 | 240 | 240 |
| 1 — Terminal | 220 | 300 | 520 |
| 2 — Dashboard | 500 | 300 | 800 |
| 3 — CTO | 780 | 300 | 1080 |
| 4 — Roles | 1060 | 300 | 1360 |
| 5 — Pipeline | 1340 | 300 | 1640 |
| 6 — Pricing | 1620 | 300 | 1920 |
| 7 — Trust | 1900 | 300 | 2200 |
| 8 — CTA | 2180 | 320 | 2500 |

Overlap: 20 frames between scenes for crossfade.
Total rendered: 2500 frames with padding = 2700 frames (~45s).

### SceneWrap Component

Every scene is wrapped in a `SceneWrap` component that handles fade-in/fade-out:

```tsx
const SceneWrap: React.FC<{
  children: React.ReactNode;
  durationInFrames: number;
  fadeInDur?: number;   // default 20
  fadeOutDur?: number;  // default 20
}>
```

This ensures consistent transitions without per-scene boilerplate.

---

## Quality Checklist

Before marking implementation complete:

- [ ] All 9 scenes render without errors in Remotion Studio
- [ ] No jitter or overshoot in any animation
- [ ] Gradient text renders correctly (WebkitBackgroundClip)
- [ ] Transitions are smooth (no flash, no jump)
- [ ] Loop is seamless (Scene 8 end → Scene 0 start)
- [ ] All agent names match real product (Max, Aura, Vega, Orion)
- [ ] Colors match palette (no leftover #7C3AED violet in gradients)
- [ ] 60fps playback is smooth in Studio
- [ ] Works in both vertical (1080×1920) and landscape (1920×1080) compositions
