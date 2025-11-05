'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface EnterScreenProps {
  onEnter: () => void;
}

interface Star {
  left: number;
  top: number;
  opacity: number;
  duration: number;
  delay: number;
}

export default function EnterScreen({ onEnter }: EnterScreenProps) {
  const [stars, setStars] = useState<Star[]>([]);
  
  useEffect(() => {
    // Generate stars only on client-side to avoid hydration mismatch
    const generatedStars: Star[] = Array.from({ length: 50 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: Math.random() * 0.5 + 0.2,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
    setStars(generatedStars);
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{
        background: 'radial-gradient(circle at center, #ffffff 0%, #f5f5f5 100%)',
      }}
    >
      {/* Content */}
      <div className="text-center px-8">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6"
          style={{
            fontFamily: 'var(--font-sofia-pro)',
            fontWeight: 700,
            color: '#000000',
            letterSpacing: '0.1em',
          }}
        >
          LOUAY
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-600 mb-12"
          style={{ fontFamily: 'var(--font-sofia-pro)', fontWeight: 300 }}
        >
          Welcome to the universe
        </motion.p>
        
        {/* Enter Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEnter}
          className="px-12 py-5 rounded-full text-lg font-medium transition-all duration-300"
          style={{
            border: '2px solid rgba(0, 0, 0, 0.3)',
            color: '#000000',
            fontFamily: 'var(--font-sofia-pro)',
            fontWeight: 500,
          }}
        >
          Enter
        </motion.button>
        
        {/* Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-sm text-gray-400 mt-8"
          style={{ fontFamily: 'var(--font-sofia-pro)', fontWeight: 300 }}
        >
          Click to experience with sound
        </motion.p>
      </div>
      
      {/* Animated stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {stars.map((star, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gray-300 rounded-full"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              opacity: star.opacity,
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

