'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface AudioManagerProps {
  sceneIndex: number;
}

export default function AudioManager({ sceneIndex }: AudioManagerProps) {
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.15);
  
  useEffect(() => {
    // Initialize Web Audio API for procedural ambient sound
    if (typeof window !== 'undefined' && !audioContextRef.current) {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch (e) {
        console.log('Web Audio API not supported');
      }
    }
  }, []);
  
  useEffect(() => {
    if (!audioContextRef.current || !isPlaying) return;
    
    // Create evolving ambient drone based on scene
    const audioContext = audioContextRef.current;
    
    // Clean up previous oscillator
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current = null;
    }
    
    // Create new oscillator for this scene
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Frequency changes with scene progression
    const baseFrequency = 55; // A1
    const frequencies = [
      baseFrequency, // Scene 0-2: Deep drone
      baseFrequency * 1.5, // Scene 3-5: Rising tension
      baseFrequency * 2, // Scene 6-8: Emotional peak
      baseFrequency * 1.25, // Scene 9+: Resolution
    ];
    
    const freqIndex = Math.min(Math.floor(sceneIndex / 3), frequencies.length - 1);
    oscillator.frequency.setValueAtTime(frequencies[freqIndex], audioContext.currentTime);
    
    // Smooth volume envelope
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 2);
    
    oscillator.type = 'sine';
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    oscillatorRef.current = oscillator;
    gainNodeRef.current = gainNode;
    
    return () => {
      if (oscillatorRef.current) {
        try {
          gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);
          setTimeout(() => {
            oscillatorRef.current?.stop();
          }, 500);
        } catch (e) {
          // Already stopped
        }
      }
    };
  }, [sceneIndex, isPlaying, volume]);
  
  const toggleAudio = () => {
    if (!isPlaying && audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume();
    }
    setIsPlaying(!isPlaying);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-8 right-8 z-50"
    >
      <button
        onClick={toggleAudio}
        className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 hover:scale-110"
        style={{
          background: 'rgba(212, 165, 116, 0.1)',
          borderColor: 'rgba(212, 165, 116, 0.3)',
          boxShadow: isPlaying 
            ? '0 0 15px rgba(212, 165, 116, 0.4)'
            : '0 0 10px rgba(212, 165, 116, 0.2)',
        }}
        aria-label={isPlaying ? 'Mute ambient sound' : 'Play ambient sound'}
      >
        {isPlaying ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="#d4a574">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="#808080">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <line x1="17" y1="9" x2="23" y2="15" stroke="#808080" strokeWidth={2} strokeLinecap="round" />
            <line x1="23" y1="9" x2="17" y2="15" stroke="#808080" strokeWidth={2} strokeLinecap="round" />
          </svg>
        )}
      </button>
      
      {/* Pulse animation when playing */}
      {isPlaying && (
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ border: '2px solid rgba(212, 165, 116, 0.4)' }}
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
      
      {/* Small text hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: isPlaying ? 0 : 1 }}
        className="absolute -top-8 right-0 text-xs text-gray-500 whitespace-nowrap"
        style={{ fontFamily: 'var(--font-sofia-pro)' }}
      >
        Ambient sound
      </motion.p>
    </motion.div>
  );
}

