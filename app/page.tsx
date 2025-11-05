'use client';

import { useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import VideoBackground from '@/components/VideoBackground';
import AudioToggle from '@/components/AudioToggle';
import EnterScreen from '@/components/EnterScreen';
import CinematicText from '@/components/CinematicText';

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = useState(false);
  
  const handleEnter = () => {
    setHasEntered(true);
    
    // Start video with sound after user interaction
    if (typeof window !== 'undefined' && (window as any).backgroundVideoRef?.current) {
      const video = (window as any).backgroundVideoRef.current;
      video.muted = false;
      video.currentTime = 199;
      video.play().catch((err: unknown) => console.log('Play error:', err));
    }
    
    // Trigger shake animations at specific times (No! No! No!)
    setTimeout(() => triggerShake(), 10500); // First No!
    setTimeout(() => triggerShake(), 11500); // Second No!
    setTimeout(() => triggerShake(), 12500); // Third No!
  };
  
  const triggerShake = () => {
    if (contentRef.current) {
      contentRef.current.classList.add('shake-screen');
      setTimeout(() => {
        contentRef.current?.classList.remove('shake-screen');
      }, 500);
    }
  };
  
  return (
    <main className="relative w-full min-h-screen overflow-hidden">
      {/* Enter Screen */}
      <AnimatePresence>
        {!hasEntered && <EnterScreen onEnter={handleEnter} />}
      </AnimatePresence>
      
      {/* Video Background */}
      <VideoBackground src="/space-background.mp4" startTime={0} />
      
      {/* Audio Toggle Button */}
      {hasEntered && (
        <AudioToggle videoRef={(typeof window !== 'undefined' && (window as any).backgroundVideoRef) || videoRef} />
      )}
      
      {/* Name - OUTSIDE VIDEO - Top of page */}
      {hasEntered && (
        <div 
          className="fixed top-6 md:top-8 left-0 right-0 flex justify-center z-20 pointer-events-auto"
          style={{
            animation: 'fadeInUp 1s ease-out 4.5s both',
          }}
        >
          <h1 
            className="text-2xl md:text-4xl font-bold"
            style={{
              fontFamily: 'var(--font-sofia-pro)',
              fontWeight: 700,
              color: '#000000',
              letterSpacing: '0.12em',
            }}
          >
            LOUAY
          </h1>
        </div>
      )}
      
      {/* Main Content - Cinematic Layout - INSIDE VIDEO */}
      {hasEntered && (
        <div ref={contentRef} className="fixed inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="relative" style={{ width: '95%', height: '95%' }}>
            
            {/* Center - Interstellar Quotes with Typewriter Effect */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4 gap-2">
              <CinematicText text="Don't let me leave, Murph!" delay={2.5} size="large" />
              <CinematicText text="Don't let me leave, Murph!" delay={6.5} size="large" />
              <CinematicText text="[SOBBING]" delay={6.5} size="small" style="italic" />
              {/* Each "No!" separately */}
              <CinematicText text="No!" delay={10.5} size="large" style="bold" />
              <CinematicText text="No!" delay={11.5} size="large" style="bold" />
              <CinematicText text="No!" delay={12.5} size="large" style="bold" />
              <CinematicText text="It was you." delay={33.5} size="large" />
              <CinematicText text="You were my ghost." delay={46.5} size="medium" />
            </div>

            {/* Bottom Left - CTA */}
            <div 
              className="absolute bottom-6 left-6 md:bottom-12 md:left-12 pointer-events-auto"
              style={{
                animation: 'fadeInUp 1s ease-out 5s both',
              }}
            >
              <button
                className="px-6 py-2 md:px-8 md:py-3 rounded-full text-xs md:text-sm font-medium transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black"
                style={{
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  color: '#ffffff',
                  fontFamily: 'var(--font-sofia-pro)',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                }}
              >
                VIEW WORK
              </button>
            </div>

            {/* Bottom Right - Social Icons */}
            <div 
              className="absolute bottom-6 right-6 md:bottom-12 md:right-12 flex gap-3 md:gap-4 pointer-events-auto"
              style={{
                animation: 'fadeInUp 1s ease-out 5.5s both',
              }}
            >
            {/* GitHub */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white group"
              style={{
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
              aria-label="GitHub"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5 transition-colors group-hover:text-black" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#ffffff' }}>
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white group"
              style={{
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5 transition-colors group-hover:text-black" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#ffffff' }}>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>

            {/* Email */}
            <a
              href="mailto:louay@example.com"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white group"
              style={{
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
              aria-label="Email"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5 transition-colors group-hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#ffffff' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
          
          </div>
        </div>
      )}
      
      {/* Vignette effect - Light theme */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(255,255,255,0.3) 100%)',
        }}
      />
    </main>
  );
}

