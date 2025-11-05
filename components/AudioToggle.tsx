'use client';

import { useState } from 'react';

interface AudioToggleProps {
  videoRef: React.RefObject<HTMLVideoElement>;
}

export default function AudioToggle({ videoRef }: AudioToggleProps) {
  const [isMuted, setIsMuted] = useState(true);
  
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  return (
    <button
      onClick={toggleMute}
      className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 hover:scale-110"
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        borderColor: 'rgba(255, 255, 255, 0.3)',
      }}
      aria-label={isMuted ? 'Unmute video' : 'Mute video'}
    >
      {isMuted ? (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="#ffffff">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          <line x1="17" y1="9" x2="23" y2="15" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" />
          <line x1="23" y1="9" x2="17" y2="15" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" />
        </svg>
      ) : (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="#ffffff">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      )}
    </button>
  );
}

