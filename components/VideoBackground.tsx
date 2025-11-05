'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface VideoBackgroundProps {
  src: string;
  startTime?: number;
}

export default function VideoBackground({ src, startTime = 0 }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Make videoRef accessible globally for AudioToggle
  if (typeof window !== 'undefined') {
    (window as any).backgroundVideoRef = videoRef;
  }
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    // Set start time when video loads
    const handleLoadedData = () => {
      video.currentTime = startTime;
    };
    
    video.addEventListener('loadeddata', handleLoadedData);
    
    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [startTime]);
  
  return (
    <div className="fixed inset-0 w-full h-full -z-10 flex items-center justify-center overflow-hidden">
      <div
        ref={containerRef}
        className="relative"
        style={{
          width: '95%',
          height: '95%',
          animation: 'cinematicFadeIn 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
          opacity: 0,
          filter: 'blur(10px)',
        }}
      >
        <video
          ref={videoRef}
          loop
          playsInline
          className="w-full h-full object-cover rounded-lg"
          style={{
            opacity: 0.8,
          }}
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>
      
      <style jsx>{`
        @keyframes cinematicFadeIn {
          0% {
            opacity: 0;
            filter: blur(10px) brightness(0.7);
          }
          60% {
            opacity: 0.8;
            filter: blur(3px) brightness(0.9);
          }
          100% {
            opacity: 1;
            filter: blur(0px) brightness(1);
          }
        }
      `}</style>
    </div>
  );
}

