# 🌌 INTERSTELLAR INTERACTIVE EXPERIENCE

## Wat is dit?

Een **cinematische, interactieve journey** door de ruimte - geïnspireerd door Interstellar - waar gebruikers door verschillende scenes kunnen **swipen** of navigeren met knoppen/toetsen, voordat ze jouw profiel bereiken.

Dit is **GEEN gewone portfolio** - dit is een **filmische ervaring** met echte Interstellar quotes, branching paths, en procedurele audio die meegroeit met de reis.

---

## 🎬 HOE HET WERKT

### De Journey Flow:

```
LOADING SCREEN
     ↓
ACT 1: THE VOID (Mysterie)
  → Scene 1: "We used to look up at the sky..."
  → Scene 2: "Mankind was born on Earth..."
  → Scene 3: "Time is relative..."
     ↓
ACT 2: THE SIGNAL (Keuze!)
  → Scene 4: BRANCHING MOMENT
     ├─ ⚙️ Logic & Code Path
     ├─ 🎨 Creation & Art Path
     └─ 🌌 Mystery Path
     ↓
ACT 3: THE CONTACT (Convergence)
  → All paths lead here
  → Signal strength grows
     ↓
ACT 4: THE REVELATION
  → Your name appears: LOUAY
  → Final choices:
     ├─ 🚀 Explore Projects
     ├─ 📡 Make Contact
     └─ 🔄 Journey Again
```

---

## 🎮 CONTROLS

| Input | Action |
|-------|--------|
| **→ / Swipe Right** | Next scene |
| **← / Swipe Left** | Previous scene |
| **Spacebar** | Next scene |
| **R key** | Restart journey (secret!) |
| **Click buttons** | Navigate (on screen) |
| **Drag horizontally** | Swipe on desktop |

---

## ✨ FEATURES

### 1. **Dynamic Visuals**
- **3 intensiteits-levels** voor de sterrenachtergrond:
  - `low`: Subtiel, rustige ruimte (3000 sterren)
  - `medium`: Standaard cinematisch (5000 sterren)  
  - `high`: Emotionele hoogtepunten (7000 sterren + nebula wireframe)

### 2. **Branching Narrative**
- Scene 4 geeft 3 keuzes → elk leidt naar unieke quotes/ervaringen
- Alle paden komen samen bij de finale onthulling
- Keuzes zijn thematisch: Logic, Creation, Mystery

### 3. **Procedurele Audio** 
- **Web Audio API** genereert ambient drones (geen bestand nodig!)
- Frequentie evolveert met scene-progressie:
  - Early scenes: Deep drone (55 Hz)
  - Mid-journey: Rising tension (82.5 Hz)
  - Emotional peak: Highest pitch (110 Hz)
  - Resolution: Calm down (68.75 Hz)

### 4. **Interstellar Quotes**
Alle quotes zijn echt uit de film:
- Cooper, TARS, Brand, Professor Brand, Murph
- Thematisch gekozen per scene
- Gecombineerd met jouw persoonlijke twist

### 5. **Signal Strength Indicator**
Links onderaan - Interstellar-style transmission meter:
```
█ SIGNAL: 47%
TRANSMISSION ACTIVE
```

### 6. **Auto-Advance** (optioneel per scene)
- Scene 1 en "Signal Detected" scene gaan automatisch door
- Configureerebaar per scene via `autoAdvance` en `duration`

---

## 📂 PROJECT STRUCTUUR

```
app/
  page.tsx                 → Main orchestrator
  
components/
  SceneManager.tsx         → Swipe logic + scene transitions
  AudioManager.tsx         → Procedureel geluid per scene
  Scene.tsx                → 3D starfield (Three.js)
  LoadingScreen.tsx        → Intro loading
  Portal.tsx               → Modals voor projects/contact
  
data/
  scenes.ts                → Alle scene data + quotes
```

---

## 🎨 CUSTOMIZATION

### 1. **Quotes aanpassen**

Open `data/scenes.ts`:

```typescript
{
  id: 'your-scene',
  quote: "Your Interstellar quote here",
  subtitle: '— Character Name',
  description: 'Your personal twist',
  backgroundIntensity: 'high',
}
```

### 2. **Scenes toevoegen**

Voeg nieuwe scene toe in `scenes` array:

```typescript
{
  id: 'new-scene',
  title: 'OPTIONAL TITLE',
  quote: "Quote here",
  subtitle: '— Source',
  description: 'Context text',
  backgroundIntensity: 'medium',
  autoAdvance: false,  // Auto naar volgende?
  duration: 8000,      // Milliseconden
  choices: [           // Optional branching
    {
      label: 'Choice 1',
      icon: '🚀',
      nextSceneId: 'target-scene',
    },
  ],
}
```

### 3. **Intensity aanpassen**

- `low`: Rustige scenes, weinig visuele activiteit
- `medium`: Standaard
- `high`: Dramatische momenten, meer sterren + nebula effect

### 4. **Je naam/info updaten**

In `data/scenes.ts`, scene met `id: 'reveal'`:

```typescript
{
  id: 'reveal',
  title: 'JOUW NAAM',
  subtitle: 'Je Titel • Je Rol • Je Vibe',
  description: 'Je persoonlijke tagline',
  // ...
}
```

---

## 🎵 AUDIO SYSTEM

### Hoe het werkt:
1. **Web Audio API** creëert sinus-golf oscillators
2. Frequentie verandert op basis van `sceneIndex`:
   - Scenes 0-2: Base (55 Hz)
   - Scenes 3-5: Rising (82.5 Hz)
   - Scenes 6-8: Peak (110 Hz)
   - Scenes 9+: Resolution (68.75 Hz)
3. **Smooth fade-in/out** tussen scenes (2 sec)

### Toggle:
- Rechts onderaan = audio on/off button
- Pulsing ring wanneer actief

---

## 🚀 STARTEN

```bash
npm run dev
```

Open http://localhost:3000

**Experience flow:**
1. Loading screen (naam + progress bar)
2. Auto-start scene sequence
3. Swipe/navigate door journey
4. Branching keuze bij Scene 4
5. Eindigen bij je profiel reveal
6. Kies: Projects / Contact / Restart

---

## 🎭 EASTER EGGS & SECRETS

### Geïmplementeerd:
- **R key**: Restart journey vanaf begin
- **Signal strength**: Groeit van 6% → 100%
- **Drag**: Desktop kan horizontaal draggen om te swipen
- **Progress dots**: Bovenaan tonen waar je bent

### Potentieel toe te voegen:
- **Konamicode**: ↑↑↓↓←→←→BA voor secret scene
- **Click sterren**: Explode animatie
- **Shake device**: Versterkt sterren-beweging
- **Hidden quote**: Ergens een "Stay" referentie

---

## 🌟 DESIGN DETAILS

### Kleuren (Interstellar palette):
- **Primary**: `#d4a574` (warm goud)
- **Secondary**: `#8b6f47` (amber)
- **Text**: `#e8e6e3` (off-white)
- **Background**: `#000000` (deep black)

### Fonts:
- **Sofia Pro** (Light 300, Regular 400, Medium 500, Bold 700)
- Elegant, cinematisch, subtiel

### Animaties:
- **GSAP**: Smooth scene transitions
- **Framer Motion**: Swipe gestures + dragging
- **Three.js**: Real-time 3D rendering
- **3D transforms**: rotateY op scene exit/enter

---

## 📱 RESPONSIVE

### Desktop (≥768px):
- Volledige ster count
- Nebula clouds bij high intensity
- Drag + arrow keys
- Alle effecten enabled

### Mobile (<768px):
- 40% minder sterren (performance)
- Geen nebula
- Touch swipe optimized
- Simplified animations

---

## 🎬 SCENES OVERVIEW

| Scene ID | Quote | Branch |
|----------|-------|--------|
| `intro` | "We used to look up..." | Main |
| `awakening` | "Mankind was born..." | Main |
| `time` | "Time is relative..." | Main |
| `choice-moment` | "Do not go gentle..." | **BRANCHING POINT** |
| `logic-path` | "It's not possible..." | Logic |
| `logic-tars` | "What's your honesty..." | Logic |
| `creation-path` | "We're still pioneers..." | Creation |
| `creation-message` | "Maybe we've spent..." | Creation |
| `mystery-path` | "Love is the one thing..." | Mystery |
| `mystery-tesseract` | "It's not a ghost..." | Mystery |
| `convergence` | "We've always defined..." | Converge |
| `signal` | "Don't trust the right..." | Converge |
| `pre-reveal` | "I'm not afraid of death..." | Reveal |
| `reveal` | **LOUAY** (your name) | Final |
| `projects` | "These are the moments..." | Branch |
| `contact` | "Make him stay..." | Branch |

---

## 🛠️ TECH STACK

- **Next.js 16** + TypeScript
- **Three.js** (via @react-three/fiber)
- **GSAP** (timeline animations)
- **Framer Motion** (swipe/drag/gestures)
- **Web Audio API** (procedural sound)
- **Tailwind CSS v3**
- **Sofia Pro** (local font)

---

## 💡 WHY THIS IS UNIQUE

1. **No video files** = Fast load, smooth performance
2. **Procedural audio** = Dynamic, no licensing issues
3. **Branching narrative** = User feels control
4. **Real Interstellar quotes** = Authentic fan experience
5. **Mobile-first** = Works everywhere
6. **Swipe + drag + keys** = Multiple input methods
7. **3-act structure** = Emotionally satisfying arc

---

## 🎯 TOEKOMSTIGE IDEEËN

- [ ] **Sound effects** per swipe (whoosh)
- [ ] **Particles react** to cursor position
- [ ] **Easter egg scene** via Konamicode
- [ ] **Analytics** track which path users choose
- [ ] **Save progress** in localStorage
- [ ] **Share button** at end (tweet journey)
- [ ] **Custom music** (Hans Zimmer-style synth pad)
- [ ] **Deeper branching** (meerdere lagen)

---

## ✅ DONE

🔥 **Fully functional Interstellar-inspired interactive journey**
- Swipe navigation ✓
- Branching paths ✓
- Procedural audio ✓
- Dynamic visuals ✓
- Mobile responsive ✓
- Real quotes ✓
- Signal strength ✓
- Easter eggs ✓

**Status**: PRODUCTION READY 🚀

---

**Veel plezier met je cinematic universe!** 🌌✨

Press **R** to restart. Press **→** to continue.

