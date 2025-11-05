# LOUAY - The Digital Universe 🌌

A cinematic portfolio website with Interstellar-inspired aesthetics, featuring 3D starfield, animated text sequences, and orbital navigation.

## ✨ Features

- **Full-screen cinematic experience** - No scrolling, pure timeline-based animations
- **3D Starfield** - Interactive particle system using React Three Fiber
- **GSAP Timeline Animations** - Smooth, cinematic text sequences
- **Orbital Navigation** - Rotating icon satellites with hover effects
- **Modal System** - Seamless project and contact overlays
- **Ambient Audio** - Optional background music with mute control
- **Fully Responsive** - Optimized for desktop and mobile devices

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Animations**: GSAP + Framer Motion
- **3D Graphics**: React Three Fiber + Three.js + Drei
- **Styling**: Tailwind CSS
- **Fonts**: Space Grotesk & Orbitron

## 📦 Installation

```bash
npm install
```

## 🎮 Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the magic.

## 🎨 Customization

### Update Personal Links

Edit `components/OrbitLinks.tsx` to change the navigation links:

```typescript
const links: Link[] = [
  {
    id: 'github',
    label: 'GitHub',
    icon: '⚙️',
    subtitle: 'Where logic lives',
    href: 'https://github.com/yourusername',
    color: '#0bf49a',
  },
  // Add more links...
];
```

### Modify Philosophical Texts

Update the text sequences in `components/TextSequence.tsx`:

```typescript
<p className="text-xl text-gray-400">
  Your custom philosophical text here...
</p>
```

### Change Color Scheme

Adjust colors in `app/globals.css`:

```css
:root {
  --glow-primary: #0bf49a; /* Turquoise */
  --glow-secondary: #808080; /* Gray */
}
```

### Add Ambient Audio

Place your audio file in the `public/` directory as `ambient.mp3` and it will automatically play (with user interaction).

### Projects Content

Edit `components/Portal.tsx` to customize your projects:

```typescript
const projects = [
  {
    title: 'Your Project',
    description: 'Project description',
    tech: ['React', 'TypeScript'],
  },
];
```

### Contact Information

Update contact details in the `ContactContent` function in `components/Portal.tsx`.

## 🎯 Performance Optimizations

- **Dynamic imports** for Three.js (no SSR)
- **Optimized particle count** for mobile devices
- **Reduced animation complexity** on smaller screens
- **Lazy loading** of components
- **GPU-accelerated animations** with CSS transforms

## 📱 Mobile Support

The site automatically adapts for mobile devices:
- Reduced particle count in starfield
- Simplified animations
- Touch-optimized controls
- Responsive text sizing

## 🏗️ Project Structure

```
├── app/
│   ├── page.tsx          # Main orchestration
│   ├── layout.tsx        # Root layout with fonts
│   └── globals.css       # Global styles & animations
├── components/
│   ├── Scene.tsx         # 3D starfield
│   ├── TextSequence.tsx  # Cinematic text animations
│   ├── OrbitLinks.tsx    # Rotating navigation
│   ├── AudioControl.tsx  # Audio toggle
│   ├── Portal.tsx        # Modal system
│   └── LoadingScreen.tsx # Initial loading
└── public/
    └── ambient.mp3       # Background audio (optional)
```

## 🎭 Scene Flow

1. **Loading Screen** - Initial loading with progress bar
2. **Scene 1 - Awakening** - Fade-in starfield with intro text
3. **Scene 2 - Identity** - Name appears with philosophical context
4. **Scene 3 - Monologue** - Core philosophical statements
5. **Scene 4 - Portal** - Name reveal with orbital links
6. **Idle Loop** - Continuous subtle motion

## 🛠️ Build for Production

```bash
npm run build
npm start
```

## 📄 License

MIT License - Feel free to use this for your own portfolio!

## 🌟 Credits

Inspired by:
- Interstellar (Christopher Nolan)
- Cosmos (Carl Sagan)
- The intersection of logic and creativity

---

**Built with ❤️ and logic by LOUAY**
