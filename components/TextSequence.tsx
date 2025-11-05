'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface TextSequenceProps {
  onComplete?: () => void;
}

export default function TextSequence({ onComplete }: TextSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scene1Ref = useRef<HTMLDivElement>(null);
  const scene2Ref = useRef<HTMLDivElement>(null);
  const scene3Ref = useRef<HTMLDivElement>(null);
  const scene4Ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });
    
    // Scene 1 - The Awakening
    tl.fromTo(
      scene1Ref.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 2, ease: 'power2.out' }
    )
    .to(scene1Ref.current, {
      opacity: 0,
      y: -50,
      duration: 1.5,
      delay: 3,
      ease: 'power2.in'
    });
    
    // Scene 2 - Identity
    tl.fromTo(
      scene2Ref.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 2, ease: 'elastic.out(1, 0.5)' },
      '-=0.5'
    )
    .to(scene2Ref.current, {
      opacity: 0,
      scale: 1.2,
      duration: 1.5,
      delay: 3,
      ease: 'power2.in'
    });
    
    // Scene 3 - The Monologue
    tl.fromTo(
      scene3Ref.current,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 2, ease: 'power3.out' },
      '-=0.5'
    )
    .to(scene3Ref.current, {
      opacity: 0,
      x: 100,
      duration: 1.5,
      delay: 4,
      ease: 'power3.in'
    });
    
    // Scene 4 - Name reveal (stays visible)
    tl.fromTo(
      scene4Ref.current,
      { opacity: 0, scale: 0.5, rotationX: 90 },
      { 
        opacity: 1, 
        scale: 1, 
        rotationX: 0,
        duration: 2.5, 
        ease: 'back.out(1.7)' 
      },
      '-=0.5'
    );
    
    return () => {
      tl.kill();
    };
  }, [onComplete]);
  
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center z-10 pointer-events-none"
    >
      {/* Scene 1 - The Awakening */}
      <div
        ref={scene1Ref}
        className="absolute text-center opacity-0"
        style={{ fontFamily: 'var(--font-sofia-pro)' }}
      >
        <p className="text-xl md:text-2xl text-gray-400 mb-4">
          Some say the universe speaks in numbers…
        </p>
        <p className="text-2xl md:text-3xl text-white">
          I speak in code.
        </p>
      </div>
      
      {/* Scene 2 - Identity */}
      <div
        ref={scene2Ref}
        className="absolute text-center opacity-0"
        style={{ fontFamily: 'var(--font-sofia-pro)', fontWeight: 500 }}
      >
        <p className="text-lg md:text-xl text-gray-400 mb-2">
          Where logic meets creativity
        </p>
      </div>
      
      {/* Scene 3 - The Monologue */}
      <div
        ref={scene3Ref}
        className="absolute text-center opacity-0 max-w-2xl px-4"
        style={{ fontFamily: 'var(--font-sofia-pro)', fontWeight: 300 }}
      >
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
          I exist between zeros and ones —<br />
          A fragment of thought in an infinite loop.<br />
          Reality bends,<br />
          But logic remains constant.
        </p>
      </div>
      
      {/* Scene 4 - Name (stays visible) */}
      <div
        ref={scene4Ref}
        className="absolute text-center opacity-0"
        style={{ 
          fontFamily: 'var(--font-sofia-pro)',
          fontWeight: 700,
          perspective: '1000px'
        }}
      >
        <h1 className="text-7xl md:text-9xl font-bold glow-text tracking-wider">
          LOUAY
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mt-4">
          Developer, Creator, Thinker
        </p>
      </div>
    </div>
  );
}

