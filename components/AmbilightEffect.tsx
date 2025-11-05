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
      // Only sample every 3rd frame for better performance
      frameCount++;
      if (frameCount % 3 !== 0) {
        animationFrameId = requestAnimationFrame(extractColors);
        return;
      }

      try {
        // Draw current video frame to canvas (small size for performance)
        canvas.width = 160;
        canvas.height = 90;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Sample edge regions
        const edgeSize = 20; // pixels to sample from each edge

        // Left edge
        const leftData = ctx.getImageData(0, canvas.height / 2 - 10, edgeSize, 20);
        const leftColor = getAverageColor(leftData.data);

        // Right edge
        const rightData = ctx.getImageData(canvas.width - edgeSize, canvas.height / 2 - 10, edgeSize, 20);
        const rightColor = getAverageColor(rightData.data);

        // Top edge
        const topData = ctx.getImageData(canvas.width / 2 - 10, 0, 20, edgeSize);
        const topColor = getAverageColor(topData.data);

        // Bottom edge
        const bottomData = ctx.getImageData(canvas.width / 2 - 10, canvas.height - edgeSize, 20, edgeSize);
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

    // Sample every 4th pixel for performance
    for (let i = 0; i < data.length; i += 16) {
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
    const boost = 1.3;
    if (max > 0) {
      r = Math.min(255, Math.floor(r * boost));
      g = Math.min(255, Math.floor(g * boost));
      b = Math.min(255, Math.floor(b * boost));
    }

    return `rgba(${r}, ${g}, ${b}, 0.6)`;
  };

  return (
    <>
      {/* Hidden canvas for color sampling */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      
      {/* Ambilight glow effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Left glow */}
        <div
          className="absolute left-0 top-0 bottom-0 w-32 md:w-48 blur-3xl transition-all duration-300"
          style={{
            background: `linear-gradient(to right, ${colors.left}, transparent)`,
            opacity: 0.8,
          }}
        />
        
        {/* Right glow */}
        <div
          className="absolute right-0 top-0 bottom-0 w-32 md:w-48 blur-3xl transition-all duration-300"
          style={{
            background: `linear-gradient(to left, ${colors.right}, transparent)`,
            opacity: 0.8,
          }}
        />
        
        {/* Top glow */}
        <div
          className="absolute top-0 left-0 right-0 h-24 md:h-32 blur-3xl transition-all duration-300"
          style={{
            background: `linear-gradient(to bottom, ${colors.top}, transparent)`,
            opacity: 0.8,
          }}
        />
        
        {/* Bottom glow */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 md:h-32 blur-3xl transition-all duration-300"
          style={{
            background: `linear-gradient(to top, ${colors.bottom}, transparent)`,
            opacity: 0.8,
          }}
        />
      </div>
    </>
  );
}

