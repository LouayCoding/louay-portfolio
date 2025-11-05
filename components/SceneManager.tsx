'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import Scene from './Scene';
import { scenes, type SceneData } from '@/data/scenes';

interface SceneManagerProps {
  onComplete: () => void;
}

export default function SceneManager({ onComplete }: SceneManagerProps) {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-10, 0, 10]);
  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);
  
  const currentScene = scenes[currentSceneIndex];
  
  // Auto-advance after delay if enabled
  useEffect(() => {
    if (currentScene.autoAdvance && currentSceneIndex < scenes.length - 1) {
      const timer = setTimeout(() => {
        goToNextScene();
      }, currentScene.duration || 10000);
      
      return () => clearTimeout(timer);
    }
  }, [currentSceneIndex, currentScene]);
  
  const goToNextScene = () => {
    if (currentSceneIndex < scenes.length - 1) {
      setDirection(1);
      setCurrentSceneIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };
  
  const goToPrevScene = () => {
    if (currentSceneIndex > 0) {
      setDirection(-1);
      setCurrentSceneIndex(prev => prev - 1);
    }
  };
  
  const handleChoice = (nextSceneId: string) => {
    const nextIndex = scenes.findIndex(s => s.id === nextSceneId);
    if (nextIndex !== -1) {
      setDirection(1);
      setCurrentSceneIndex(nextIndex);
    }
  };
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        goToNextScene();
      } else if (e.key === 'ArrowLeft') {
        goToPrevScene();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSceneIndex]);
  
  // Swipe detection
  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    
    if (info.offset.x > swipeThreshold) {
      goToPrevScene();
    } else if (info.offset.x < -swipeThreshold) {
      goToNextScene();
    }
  };
  
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45,
    }),
  };
  
  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Progress indicator */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        {scenes.map((_, index) => (
          <motion.div
            key={index}
            className="w-2 h-2 rounded-full"
            style={{
              background: index === currentSceneIndex 
                ? '#d4a574' 
                : 'rgba(212, 165, 116, 0.3)',
            }}
            animate={{
              scale: index === currentSceneIndex ? 1.5 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
      
      {/* Scene container */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSceneIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
            rotateY: { duration: 0.7 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          style={{ x, rotate, opacity }}
          className="absolute inset-0"
        >
          <SceneContent 
            scene={currentScene}
            onNext={goToNextScene}
            onPrev={goToPrevScene}
            onChoice={handleChoice}
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Navigation hints */}
      {!currentScene.hideNavigation && (
        <>
          {currentSceneIndex > 0 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={goToPrevScene}
              className="fixed left-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: 'rgba(212, 165, 116, 0.1)',
                border: '1px solid rgba(212, 165, 116, 0.3)',
              }}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="#d4a574">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
          )}
          
          {currentSceneIndex < scenes.length - 1 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={goToNextScene}
              className="fixed right-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: 'rgba(212, 165, 116, 0.1)',
                border: '1px solid rgba(212, 165, 116, 0.3)',
              }}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="#d4a574">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          )}
        </>
      )}
      
      {/* Swipe hint (first scene only) */}
      {currentSceneIndex === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="fixed bottom-12 left-1/2 -translate-x-1/2 z-40 text-gray-400 text-sm flex items-center gap-2"
          style={{ fontFamily: 'var(--font-sofia-pro)', fontWeight: 300 }}
        >
          <motion.span
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
          <span>Swipe or press arrow keys</span>
        </motion.div>
      )}
    </div>
  );
}

interface SceneContentProps {
  scene: SceneData;
  onNext: () => void;
  onPrev: () => void;
  onChoice: (nextSceneId: string) => void;
}

function SceneContent({ scene, onNext, onPrev, onChoice }: SceneContentProps) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
      {/* Text content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-center max-w-4xl z-10"
      >
        {scene.title && (
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-8"
            style={{
              fontFamily: 'var(--font-sofia-pro)',
              fontWeight: 700,
              color: scene.titleColor || '#d4a574',
              textShadow: '0 0 20px rgba(212, 165, 116, 0.3)',
            }}
          >
            {scene.title}
          </motion.h1>
        )}
        
        {scene.quote && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-2xl md:text-4xl text-gray-300 mb-4 leading-relaxed italic"
            style={{ fontFamily: 'var(--font-sofia-pro)', fontWeight: 300 }}
          >
            "{scene.quote}"
          </motion.p>
        )}
        
        {scene.subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 1 }}
            className="text-lg md:text-xl text-gray-500"
            style={{ fontFamily: 'var(--font-sofia-pro)', fontWeight: 300 }}
          >
            {scene.subtitle}
          </motion.p>
        )}
        
        {scene.description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="text-base md:text-lg text-gray-400 mt-6 max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-sofia-pro)', fontWeight: 300 }}
          >
            {scene.description}
          </motion.p>
        )}
      </motion.div>
      
      {/* Choices */}
      {scene.choices && scene.choices.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="flex flex-wrap gap-4 mt-12 z-10"
        >
          {scene.choices.map((choice, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onChoice(choice.nextSceneId)}
              className="px-8 py-4 rounded-full text-lg transition-all duration-300"
              style={{
                background: 'rgba(212, 165, 116, 0.15)',
                border: '1px solid rgba(212, 165, 116, 0.3)',
                color: '#d4a574',
                fontFamily: 'var(--font-sofia-pro)',
                fontWeight: 400,
              }}
            >
              {choice.icon} {choice.label}
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  );
}

