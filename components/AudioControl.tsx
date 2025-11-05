'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AudioControlProps {
  audioSrc?: string;
  autoPlay?: boolean;
}

export default function AudioControl({ 
  audioSrc = '/ambient.mp3', 
  autoPlay = true 
}: AudioControlProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    
    // Create audio element
    const audio = new Audio(audioSrc);
    audio.loop = true;
    audio.volume = 0.3; // Low volume ambient
    audioRef.current = audio;
    
    // Try to autoplay (might be blocked by browser)
    if (autoPlay) {
      audio.play().catch((error) => {
        console.log('Autoplay blocked by browser:', error);
        setIsPlaying(false);
      });
    }
    
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [audioSrc, autoPlay]);
  
  const toggleAudio = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((error) => {
        console.error('Error playing audio:', error);
      });
      setIsPlaying(true);
    }
  };
  
  if (!isMounted) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.5 }}
      className="fixed bottom-8 right-8 z-50"
    >
      <button
        onClick={toggleAudio}
        className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md border border-glow-primary/30 transition-all duration-300 hover:scale-110 group"
        style={{
          background: 'rgba(212, 165, 116, 0.1)',
          boxShadow: isPlaying 
            ? '0 0 15px rgba(212, 165, 116, 0.4), 0 0 30px rgba(212, 165, 116, 0.2)'
            : '0 0 10px rgba(212, 165, 116, 0.2)',
        }}
        aria-label={isPlaying ? 'Mute audio' : 'Play audio'}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.svg
              key="playing"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{ color: '#d4a574' }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              />
            </motion.svg>
          ) : (
            <motion.svg
              key="muted"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{ color: '#808080' }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </button>
      
      {/* Pulse animation when playing */}
      {isPlaying && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            border: '2px solid rgba(212, 165, 116, 0.4)',
          }}
          animate={{
            scale: [1, 1.4, 1.4],
            opacity: [0.5, 0, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      )}
    </motion.div>
  );
}

