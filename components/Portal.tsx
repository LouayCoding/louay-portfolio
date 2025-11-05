'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

interface PortalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Portal({ isOpen, onClose, title, children }: PortalProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isOpen && contentRef.current) {
      // Animate content elements
      const elements = contentRef.current.querySelectorAll('.portal-item');
      gsap.fromTo(
        elements,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
        }
      );
    }
  }, [isOpen]);
  
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop with blur */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
          
          {/* Modal content */}
          <motion.div
            initial={{ scale: 0.8, rotateX: 90 }}
            animate={{ scale: 1, rotateX: 0 }}
            exit={{ scale: 0.8, rotateX: -90 }}
            transition={{ 
              duration: 0.5, 
              ease: [0.34, 1.56, 0.64, 1] // Custom easing
            }}
            className="relative max-w-4xl w-full max-h-[80vh] overflow-hidden rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(212, 165, 116, 0.08), rgba(0, 0, 0, 0.95))',
              border: '1px solid rgba(212, 165, 116, 0.25)',
              boxShadow: '0 0 30px rgba(212, 165, 116, 0.2), 0 0 60px rgba(212, 165, 116, 0.1)',
              perspective: '1000px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-glow-primary/30">
              <h2 
                className="text-3xl font-bold glow-text"
                style={{ fontFamily: 'var(--font-sofia-pro)', fontWeight: 700 }}
              >
                {title}
              </h2>
              
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90"
                style={{
                  background: 'rgba(212, 165, 116, 0.1)',
                  border: '1px solid rgba(212, 165, 116, 0.25)',
                }}
                aria-label="Close modal"
              >
                <svg
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            
            {/* Content */}
            <div 
              ref={contentRef}
              className="p-6 overflow-y-auto max-h-[calc(80vh-100px)] custom-scrollbar"
              style={{ fontFamily: 'var(--font-sofia-pro)', fontWeight: 300 }}
            >
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Example content components for Projects and Contact

export function ProjectsContent() {
  const projects = [
    {
      title: 'Cosmic Calculator',
      description: 'A quantum-inspired calculation engine that bends mathematics.',
      tech: ['React', 'TypeScript', 'Three.js'],
    },
    {
      title: 'Neural Canvas',
      description: 'AI-powered art generation with neural networks.',
      tech: ['Python', 'TensorFlow', 'Next.js'],
    },
    {
      title: 'Logic Forge',
      description: 'A visual programming environment for algorithm design.',
      tech: ['WebGL', 'GSAP', 'Node.js'],
    },
  ];
  
  return (
    <div className="space-y-6">
      {projects.map((project, index) => (
        <div
          key={index}
          className="portal-item p-6 rounded-xl"
          style={{
            background: 'rgba(212, 165, 116, 0.04)',
            border: '1px solid rgba(212, 165, 116, 0.15)',
          }}
        >
          <h3 className="text-2xl font-bold mb-2 glow-text">{project.title}</h3>
          <p className="text-gray-300 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-sm"
                style={{
                  background: 'rgba(212, 165, 116, 0.15)',
                  color: '#d4a574',
                  fontWeight: 400,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function ContactContent() {
  return (
    <div className="space-y-6">
      <div className="portal-item text-center mb-8">
        <p className="text-xl text-gray-300">
          Let&apos;s connect and create something extraordinary together.
        </p>
      </div>
      
      <div className="portal-item space-y-4">
        <a
          href="mailto:louay@example.com"
          className="block p-4 rounded-xl transition-all duration-300 hover:scale-105"
          style={{
            background: 'rgba(212, 165, 116, 0.08)',
            border: '1px solid rgba(212, 165, 116, 0.2)',
          }}
        >
          <div className="flex items-center gap-4">
            <span className="text-3xl">📧</span>
            <div>
              <p className="font-bold text-lg glow-text">Email</p>
              <p className="text-gray-400">louay@example.com</p>
            </div>
          </div>
        </a>
        
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 rounded-xl transition-all duration-300 hover:scale-105"
          style={{
            background: 'rgba(212, 165, 116, 0.08)',
            border: '1px solid rgba(212, 165, 116, 0.2)',
          }}
        >
          <div className="flex items-center gap-4">
            <span className="text-3xl">🐦</span>
            <div>
              <p className="font-bold text-lg glow-text">Twitter</p>
              <p className="text-gray-400">@louay</p>
            </div>
          </div>
        </a>
        
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 rounded-xl transition-all duration-300 hover:scale-105"
          style={{
            background: 'rgba(212, 165, 116, 0.08)',
            border: '1px solid rgba(212, 165, 116, 0.2)',
          }}
        >
          <div className="flex items-center gap-4">
            <span className="text-3xl">💼</span>
            <div>
              <p className="font-bold text-lg glow-text">LinkedIn</p>
              <p className="text-gray-400">linkedin.com/in/louay</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

