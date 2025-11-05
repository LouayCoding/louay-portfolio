'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface StarsProps {
  count?: number;
}

// Detect if user is on mobile device
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
}

function Stars({ count = 5000 }: StarsProps) {
  const ref = useRef<THREE.Points>(null);
  
  // Generate random star positions in a sphere
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Spherical distribution
      const radius = Math.random() * 25 + 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
    }
    
    return positions;
  }, [count]);
  
  // Animate stars with subtle rotation and pulsing
  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime();
      
      // Slow rotation
      ref.current.rotation.x = time * 0.05;
      ref.current.rotation.y = time * 0.075;
      
      // Subtle scale pulse
      const scale = 1 + Math.sin(time * 0.5) * 0.05;
      ref.current.scale.set(scale, scale, scale);
    }
  });
  
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#e0e6ff"
        size={0.04}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

function AnimatedCamera() {
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Gentle camera motion like breathing
    state.camera.position.z = 5 + Math.sin(time * 0.3) * 0.5;
    state.camera.position.x = Math.sin(time * 0.2) * 0.3;
    state.camera.position.y = Math.cos(time * 0.25) * 0.2;
    
    state.camera.lookAt(0, 0, 0);
  });
  
  return null;
}

function GlowingSphere() {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime();
      
      // Pulsing glow effect
      const scale = 1 + Math.sin(time * 2) * 0.1;
      ref.current.scale.set(scale, scale, scale);
    }
  });
  
  return (
    <mesh ref={ref} position={[0, 0, -10]}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshBasicMaterial 
        color="#6366f1" 
        transparent 
        opacity={0.1}
      />
    </mesh>
  );
}

interface SceneProps {
  intensity?: 'low' | 'medium' | 'high';
}

export default function Scene({ intensity = 'medium' }: SceneProps) {
  const isMobile = useIsMobile();
  
  // Adjust star count based on intensity and device
  const getStarCount = () => {
    if (isMobile) return intensity === 'high' ? 2500 : 1500;
    
    switch (intensity) {
      case 'low': return 3000;
      case 'medium': return 5000;
      case 'high': return 7000;
      default: return 5000;
    }
  };
  
  const starCount = getStarCount();
  
  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, isMobile ? 1 : 2]}
        performance={{ min: 0.5 }}
      >
        <color attach="background" args={['#000000']} />
        
        {/* Ambient light varies with intensity */}
        <ambientLight intensity={intensity === 'high' ? 0.7 : 0.5} />
        
        {/* Stars particle system */}
        <Stars count={starCount} />
        
        {/* Background glowing sphere (skip on mobile for performance) */}
        {!isMobile && intensity !== 'low' && <GlowingSphere />}
        
        {/* Animated camera */}
        <AnimatedCamera />
        
        {/* Additional visual effects for high intensity */}
        {intensity === 'high' && !isMobile && <NebulaClouds />}
      </Canvas>
    </div>
  );
}

// New: Nebula-like clouds for high intensity scenes
function NebulaClouds() {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime();
      ref.current.rotation.z = time * 0.02;
    }
  });
  
  return (
    <mesh ref={ref} position={[0, 0, -15]}>
      <sphereGeometry args={[8, 32, 32]} />
      <meshBasicMaterial 
        color="#8b5cf6"
        transparent 
        opacity={0.04}
        wireframe
      />
    </mesh>
  );
}

