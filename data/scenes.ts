export interface Choice {
  label: string;
  icon: string;
  nextSceneId: string;
}

export interface SceneData {
  id: string;
  title?: string;
  quote?: string;
  subtitle?: string;
  description?: string;
  titleColor?: string;
  backgroundIntensity?: 'low' | 'medium' | 'high';
  autoAdvance?: boolean;
  duration?: number;
  hideNavigation?: boolean;
  choices?: Choice[];
}

export const scenes: SceneData[] = [
  // ACT 1: THE VOID - Mystery & Introduction
  {
    id: 'intro',
    quote: 'We used to look up at the sky and wonder at our place in the stars...',
    subtitle: '— Cooper, Interstellar',
    backgroundIntensity: 'low',
    autoAdvance: true,
    duration: 8000,
  },
  
  {
    id: 'awakening',
    quote: 'Mankind was born on Earth. It was never meant to die here.',
    subtitle: '— Cooper',
    description: 'Welcome to my universe.',
    backgroundIntensity: 'low',
  },
  
  {
    id: 'time',
    quote: 'Time is relative, okay? It can stretch and it can squeeze...',
    subtitle: '— Cooper',
    description: 'In the digital realm, I bend time through code.',
    backgroundIntensity: 'medium',
  },
  
  // ACT 2: THE SIGNAL - Discovery & Choice
  {
    id: 'choice-moment',
    title: 'DO NOT GO GENTLE',
    quote: 'Do not go gentle into that good night. Rage, rage against the dying of the light.',
    subtitle: '— Dylan Thomas (via Professor Brand)',
    description: 'What drives you forward?',
    backgroundIntensity: 'high',
    choices: [
      {
        label: 'Logic & Code',
        icon: '⚙️',
        nextSceneId: 'logic-path',
      },
      {
        label: 'Creation & Art',
        icon: '🎨',
        nextSceneId: 'creation-path',
      },
      {
        label: 'The Unknown',
        icon: '🌌',
        nextSceneId: 'mystery-path',
      },
    ],
  },
  
  // LOGIC PATH
  {
    id: 'logic-path',
    quote: "It's not possible. — No, it's necessary.",
    subtitle: '— Cooper & TARS',
    description: 'Every impossible problem has a solution. You just need to find the right angle.',
    backgroundIntensity: 'high',
  },
  
  {
    id: 'logic-tars',
    quote: "TARS, what's your honesty parameter? — 90 percent. — 90 percent?",
    subtitle: '— Cooper & TARS',
    description: 'In code, like in space, honesty in your logic is survival.',
    backgroundIntensity: 'medium',
  },
  
  // CREATION PATH
  {
    id: 'creation-path',
    quote: "We're still pioneers, we've barely begun.",
    subtitle: '— Cooper',
    description: 'Every project is a new world waiting to be built.',
    backgroundIntensity: 'high',
  },
  
  {
    id: 'creation-message',
    quote: "Maybe we've spent too long trying to figure all this out with theory.",
    subtitle: '— Cooper',
    description: 'Sometimes you just need to build and see what happens.',
    backgroundIntensity: 'medium',
  },
  
  // MYSTERY PATH
  {
    id: 'mystery-path',
    quote: "Love is the one thing we're capable of perceiving that transcends dimensions of time and space.",
    subtitle: '— Brand',
    description: "Some things can't be explained by logic alone.",
    backgroundIntensity: 'high',
  },
  
  {
    id: 'mystery-tesseract',
    quote: "It's not a ghost... it's gravity.",
    subtitle: '— Cooper',
    description: 'The invisible forces that connect everything.',
    backgroundIntensity: 'high',
  },
  
  // ACT 3: THE CONTACT - Convergence
  {
    id: 'convergence',
    quote: "We've always defined ourselves by the ability to overcome the impossible.",
    subtitle: '— Cooper',
    description: "And that's exactly what I do.",
    backgroundIntensity: 'high',
  },
  
  {
    id: 'signal',
    title: 'SIGNAL DETECTED',
    quote: "Don't trust the right thing done for the wrong reason.",
    subtitle: '— TARS',
    description: "You're getting closer to the source...",
    backgroundIntensity: 'high',
    autoAdvance: true,
    duration: 6000,
  },
  
  // ACT 4: THE REVELATION
  {
    id: 'pre-reveal',
    quote: "I'm not afraid of death. I'm an old physicist. I'm afraid of time.",
    subtitle: '— Professor Brand',
    description: 'Every second counts. Every moment matters.',
    backgroundIntensity: 'medium',
  },
  
  {
    id: 'reveal',
    title: 'LOUAY',
    subtitle: 'Developer • Creator • Explorer',
    description: 'The one who bends code like gravity bends spacetime.',
    backgroundIntensity: 'high',
    hideNavigation: true,
    choices: [
      {
        label: 'Explore Projects',
        icon: '🚀',
        nextSceneId: 'projects',
      },
      {
        label: 'Make Contact',
        icon: '📡',
        nextSceneId: 'contact',
      },
      {
        label: 'Journey Again',
        icon: '🔄',
        nextSceneId: 'intro',
      },
    ],
  },
  
  // ENDING BRANCHES
  {
    id: 'projects',
    title: 'MISSION LOGS',
    quote: 'These are the moments we live for.',
    subtitle: '— TARS',
    description: "Explore the universes I've created.",
    backgroundIntensity: 'medium',
  },
  
  {
    id: 'contact',
    title: 'ESTABLISH LINK',
    quote: 'Make him stay, Murph. Make him stay.',
    subtitle: '— Murph',
    description: "Let's build something impossible together.",
    backgroundIntensity: 'medium',
  },
];

