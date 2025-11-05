'use client';

import { useEffect, useRef, useState } from 'react';

interface AmbilightEffectProps {
  videoRef: React.RefObject<HTMLVideoElement>;
}

export default function AmbilightEffect({ videoRef }: AmbilightEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [colors, setColors] = useState({
    left: 'rgba(0, 0, 0, 0)',
    right: 'rgba(0, 0, 0, 0)',
    top: 'rgba(0, 0, 0, 0)',
    bottom: 'rgba(0, 0, 0, 0)',
  });

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId: number;
    let frameCount = 0;

    const extractColors = () => {
      // Only sample every 2nd frame for better performance
      frameCount++;
      if (frameCount % 2 !== 0) {
        animationFrameId = requestAnimationFrame(extractColors);
        return;
      }

      try {
        // Draw current video frame to canvas (higher resolution for better quality)
        canvas.width = 320;
        canvas.height = 180;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Sample edge regions (larger sample area for smoother colors)
        const edgeSize = 40; // pixels to sample from each edge

        // Left edge (larger sample area)
        const leftData = ctx.getImageData(0, canvas.height / 2 - 30, edgeSize, 60);
        const leftColor = getAverageColor(leftData.data);

        // Right edge (larger sample area)
        const rightData = ctx.getImageData(canvas.width - edgeSize, canvas.height / 2 - 30, edgeSize, 60);
        const rightColor = getAverageColor(rightData.data);

        // Top edge (larger sample area)
        const topData = ctx.getImageData(canvas.width / 2 - 30, 0, 60, edgeSize);
        const topColor = getAverageColor(topData.data);

        // Bottom edge (larger sample area)
        const bottomData = ctx.getImageData(canvas.width / 2 - 30, canvas.height - edgeSize, 60, edgeSize);
        const bottomColor = getAverageColor(bottomData.data);

        setColors({
          left: leftColor,
          right: rightColor,
          top: topColor,
          bottom: bottomColor,
        });
      } catch (err) {
        // Video might not be ready yet
        console.log('Ambilight sampling skipped');
      }

      animationFrameId = requestAnimationFrame(extractColors);
    };

    // Start when video plays
    const handlePlay = () => {
      extractColors();
    };

    const handlePause = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    // Start if video is already playing
    if (!video.paused) {
      extractColors();
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [videoRef]);

  // Calculate average color from pixel data
  const getAverageColor = (data: Uint8ClampedArray): string => {
    let r = 0, g = 0, b = 0, count = 0;

    // Sample every 2nd pixel for smoother results
    for (let i = 0; i < data.length; i += 8) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
      count++;
    }

    r = Math.floor(r / count);
    g = Math.floor(g / count);
    b = Math.floor(b / count);

    // Boost saturation slightly for more vibrant effect
    const max = Math.max(r, g, b);
    const boost = 1.2;
    if (max > 0) {
      r = Math.min(255, Math.floor(r * boost));
      g = Math.min(255, Math.floor(g * boost));
      b = Math.min(255, Math.floor(b * boost));
    }

    return `rgba(${r}, ${g}, ${b}, 0.7)`;
  };

  return (
    <>
      {/* Hidden canvas for color sampling */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      
      {/* Ambilight glow effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Left glow */}
        <div
          className="absolute left-0 top-0 bottom-0 w-48 md:w-64 transition-all duration-500 ease-out"
          style={{
            background: `linear-gradient(to right, ${colors.left}, transparent)`,
            opacity: 0.9,
            filter: 'blur(80px)',
          }}
        />
        
        {/* Right glow */}
        <div
          className="absolute right-0 top-0 bottom-0 w-48 md:w-64 transition-all duration-500 ease-out"
          style={{
            background: `linear-gradient(to left, ${colors.right}, transparent)`,
            opacity: 0.9,
            filter: 'blur(80px)',
          }}
        />
        
        {/* Top glow */}
        <div
          className="absolute top-0 left-0 right-0 h-32 md:h-40 transition-all duration-500 ease-out"
          style={{
            background: `linear-gradient(to bottom, ${colors.top}, transparent)`,
            opacity: 0.9,
            filter: 'blur(80px)',
          }}
        />
        
        {/* Bottom glow */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 md:h-40 transition-all duration-500 ease-out"
          style={{
            background: `linear-gradient(to top, ${colors.bottom}, transparent)`,
            opacity: 0.9,
            filter: 'blur(80px)',
          }}
        />
      </div>
    </>
  );
}

