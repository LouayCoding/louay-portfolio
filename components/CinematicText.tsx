'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface CinematicTextProps {
  text: string;
  delay: number;
  style?: 'normal' | 'bold' | 'italic';
  size?: 'large' | 'medium' | 'small';
}

export default function CinematicText({ text, delay, style = 'normal', size = 'large' }: CinematicTextProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const chars = text.split('');
    const charElements = chars.map((char, i) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.opacity = '0';
      span.style.display = 'inline-block';
      span.style.transform = 'translateY(20px) scale(0.8)';
      span.style.filter = 'blur(4px)';
      return span;
    });

    textRef.current.innerHTML = '';
    charElements.forEach(el => textRef.current?.appendChild(el));

    // Animate each character with stagger
    gsap.to(charElements, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.4,
      stagger: 0.03, // 30ms between each letter
      ease: 'power2.out',
      delay: delay,
    });

    // Fade out after display time (shorter for quick sequences)
    gsap.to(charElements, {
      opacity: 0,
      y: -10,
      filter: 'blur(2px)',
      duration: 0.6,
      stagger: 0.02,
      ease: 'power2.in',
      delay: delay + (chars.length * 0.03) + 0.8, // Stay visible for 0.8s after typing
    });

  }, [text, delay]);

  const sizeClasses = {
    large: 'text-4xl md:text-6xl',
    medium: 'text-3xl md:text-5xl',
    small: 'text-2xl md:text-3xl',
  };

  const styleClasses = {
    normal: 'font-light',
    bold: 'font-bold',
    italic: 'font-light italic text-gray-400',
  };

  return (
    <div
      ref={textRef}
      className={`text-center ${sizeClasses[size]} ${styleClasses[style]}`}
      style={{
        fontFamily: 'var(--font-sofia-pro)',
        fontWeight: style === 'bold' ? 600 : 300,
        color: style === 'italic' ? 'rgba(200, 200, 200, 0.8)' : '#ffffff',
        letterSpacing: '0.08em',
        textShadow: style === 'bold' 
          ? '0 0 40px rgba(255, 255, 255, 0.6), 0 2px 12px rgba(0, 0, 0, 0.9)'
          : '0 0 30px rgba(255, 255, 255, 0.5), 0 2px 10px rgba(0, 0, 0, 0.8)',
      }}
    />
  );
}

