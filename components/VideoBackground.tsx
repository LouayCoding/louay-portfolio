'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface VideoBackgroundProps {
  src: string;
  startTime?: number;
}

export default function VideoBackground({ src, startTime = 0 }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoSrc, setVideoSrc] = useState<string>(src);
  
  // Make videoRef accessible globally for AudioToggle
  if (typeof window !== 'undefined') {
    (window as any).backgroundVideoRef = videoRef;
  }
  
  // Detect device and select appropriate video with network-aware loading
  useEffect(() => {
    const isMobile = () => {
      // Check screen size
      const isMobileScreen = window.innerWidth <= 768;
      // Check if touch device
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      // Check user agent as fallback
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      return isMobileScreen || (isTouchDevice && isMobileUA);
    };
    
    // Check network speed if available
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    const isSlow2G = connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g';
    
    // Select video based on device and network
    const shouldUseMobile = isMobile() || isSlow2G;
    
    if (shouldUseMobile) {
      setVideoSrc('/mobile.mp4');
      console.log('📱 Loading mobile video (24.66 MB) - Optimized for mobile/slow network');
    } else {
      setVideoSrc('/space-background.mp4');
      console.log('🖥️ Loading desktop video (63.56 MB) - Full quality');
    }
  }, []);
  
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
  }, [startTime, videoSrc]);
  
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
          preload="auto"
          className="w-full h-full object-cover rounded-lg"
          style={{
            opacity: 0.8,
          }}
        >
          <source src={videoSrc} type="video/mp4" />
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

