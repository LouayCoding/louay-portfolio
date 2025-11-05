# 🎨 Customization Guide

This guide will help you personalize your cinematic portfolio to make it truly yours.

## 📝 Basic Information

### 1. Update Site Title and Description

**File**: `app/layout.tsx`

```typescript
export const metadata: Metadata = {
  title: "YOUR NAME - The Digital Universe",
  description: "Your custom description here",
};
```

### 2. Change Your Name

**File**: `components/TextSequence.tsx` (Line ~103)

```typescript
<h1 className="text-7xl md:text-9xl font-bold glow-text tracking-wider">
  YOUR NAME
</h1>
<p className="text-xl md:text-2xl text-gray-400 mt-4">
  Your Title, Your Role, Your Vision
</p>
```

**File**: `components/LoadingScreen.tsx` (Line ~39)

```typescript
<motion.h1 className="... glow-text ...">
  YOUR NAME
</motion.h1>
```

## 🔗 Update Social Links

**File**: `components/OrbitLinks.tsx` (Lines 13-49)

```typescript
const links: Link[] = [
  {
    id: 'github',
    label: 'GitHub',
    icon: '⚙️',
    subtitle: 'Your custom subtitle',
    href: 'https://github.com/yourusername',
    color: '#0bf49a',
  },
  {
    id: 'discord',
    label: 'Discord',
    icon: '🔊',
    subtitle: 'Join my community',
    href: 'https://discord.gg/yourserver',
    color: '#5865F2',
  },
  // Add more or modify existing links
];
```

### Available Icon Options

You can use any emoji or Unicode character:
- 🚀 Rocket
- 💻 Computer
- 🎨 Palette
- 📱 Phone
- 🌟 Star
- ⚡ Lightning
- 🎯 Target
- 🔥 Fire

## 💬 Customize Philosophical Texts

**File**: `components/TextSequence.tsx`

### Scene 1 - The Awakening (Lines ~63-70)
```typescript
<p className="text-xl md:text-2xl text-gray-400 mb-4">
  Your opening statement...
</p>
<p className="text-2xl md:text-3xl text-white">
  Your follow-up...
</p>
```

### Scene 2 - Identity (Lines ~76-82)
```typescript
<p className="text-lg md:text-xl text-gray-400 mb-2">
  Your identity statement
</p>
```

### Scene 3 - The Monologue (Lines ~88-98)
```typescript
<p className="text-lg md:text-xl text-gray-300 leading-relaxed">
  Your personal philosophy<br />
  Line by line<br />
  Make it yours
</p>
```

## 🎨 Color Customization

**File**: `app/globals.css` (Lines 3-8)

```css
:root {
  --background: #000000;      /* Main background */
  --foreground: #ffffff;      /* Text color */
  --glow-primary: #0bf49a;    /* Primary accent (turquoise) */
  --glow-secondary: #808080;  /* Secondary accent (gray) */
}
```

### Suggested Color Schemes

**Purple Nebula**:
```css
--glow-primary: #9d4edd;
--glow-secondary: #c77dff;
```

**Electric Blue**:
```css
--glow-primary: #00d9ff;
--glow-secondary: #0096c7;
```

**Sunset Orange**:
```css
--glow-primary: #ff6b35;
--glow-secondary: #f7931e;
```

**Matrix Green**:
```css
--glow-primary: #00ff41;
--glow-secondary: #008f11;
```

## 📁 Projects Section

**File**: `components/Portal.tsx` (Lines 115-135)

```typescript
const projects = [
  {
    title: 'Your Project Name',
    description: 'A brief description of what it does',
    tech: ['React', 'TypeScript', 'Your Tech'],
  },
  // Add more projects...
];
```

## 📧 Contact Information

**File**: `components/Portal.tsx` (Lines 148-220)

Update your contact methods:

```typescript
<a href="mailto:your@email.com">
  {/* Email section */}
</a>

<a href="https://twitter.com/yourusername">
  {/* Twitter section */}
</a>

<a href="https://linkedin.com/in/yourprofile">
  {/* LinkedIn section */}
</a>
```

## 🎵 Background Music

1. Find or create an ambient audio file (MP3 format recommended)
2. Name it `ambient.mp3`
3. Place it in the `public/` directory
4. The audio will automatically load

**Recommended sources**:
- Pixabay (royalty-free music)
- YouTube Audio Library
- Epidemic Sound
- Your own compositions

**File**: `components/AudioControl.tsx` to change default behavior:

```typescript
<AudioControl autoPlay={true} /> // Enable autoplay (may be blocked by browsers)
```

## 🌟 Advanced Customizations

### Adjust Animation Timing

**File**: `components/TextSequence.tsx`

Change the `delay` values in the GSAP timeline to speed up or slow down transitions:

```typescript
.to(scene1Ref.current, {
  opacity: 0,
  y: -50,
  duration: 1.5,
  delay: 3, // ← Change this value (seconds)
  ease: 'power2.in'
})
```

### Modify Star Count

**File**: `components/Scene.tsx` (Line 126)

```typescript
const starCount = isMobile ? 2000 : 5000; // Increase for more stars
```

### Change Orbital Speed

**File**: `components/OrbitLinks.tsx` (Line 90)

```typescript
rotationTl.to(containerRef.current, {
  rotation: 360,
  duration: 60, // ← Change this (seconds per rotation)
  ease: 'none',
});
```

### Adjust Loading Screen Duration

**File**: `components/LoadingScreen.tsx` (Line 25)

```typescript
return prev + Math.random() * 15; // ← Change increment speed
```

## 🎭 Font Changes

**File**: `app/layout.tsx`

Replace with any Google Font:

```typescript
import { Your_Font, Another_Font } from "next/font/google";

const yourFont = Your_Font({
  variable: "--font-your-font",
  subsets: ["latin"],
});
```

Update CSS variable in `app/globals.css`:

```css
--font-space-grotesk: var(--font-your-font);
```

## 🚀 Quick Customization Checklist

- [ ] Change name in TextSequence.tsx
- [ ] Change name in LoadingScreen.tsx
- [ ] Update metadata in layout.tsx
- [ ] Update social links in OrbitLinks.tsx
- [ ] Customize philosophical texts
- [ ] Add your projects in Portal.tsx
- [ ] Update contact information
- [ ] (Optional) Change color scheme
- [ ] (Optional) Add background music
- [ ] Test on mobile and desktop

## 💡 Tips

1. **Keep it Personal**: The philosophical texts should reflect YOUR personality
2. **Test Changes**: Run `npm run dev` after each change to see results
3. **Mobile First**: Always test on mobile - use browser dev tools
4. **Performance**: More particles = slower performance on older devices
5. **Backup**: Keep a copy of original files before major changes

---

Need help? Check the main README.md or open an issue on GitHub!

