'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface Link {
  id: string;
  label: string;
  icon: string;
  subtitle: string;
  href: string;
  color: string;
}

const links: Link[] = [
  {
    id: 'github',
    label: 'GitHub',
    icon: '⚙️',
    subtitle: 'Where logic lives',
    href: 'https://github.com',
    color: '#d4a574',
  },
  {
    id: 'discord',
    label: 'Discord',
    icon: '🔊',
    subtitle: 'Digital conversations',
    href: 'https://discord.com',
    color: '#c9a961',
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: '💡',
    subtitle: 'Ideas materialized',
    href: '#projects',
    color: '#b8956a',
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: '🧠',
    subtitle: 'Connect with me',
    href: '#contact',
    color: '#8b6f47',
  },
];

interface OrbitLinksProps {
  visible?: boolean;
  onLinkClick?: (link: Link) => void;
}

export default function OrbitLinks({ visible = false, onLinkClick }: OrbitLinksProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const linkRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  
  useEffect(() => {
    if (!containerRef.current || !visible) return;
    
    // Adjust radius based on screen size
    const isMobile = window.innerWidth < 768;
    const radius = isMobile ? 140 : 180; // Smaller radius on mobile
    const angleStep = (Math.PI * 2) / links.length;
    
    links.forEach((link, index) => {
      const angle = angleStep * index - Math.PI / 2; // Start from top
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      const element = linkRefs.current[link.id];
      if (element) {
        gsap.fromTo(
          element,
          {
            x: 0,
            y: 0,
            opacity: 0,
            scale: 0,
          },
          {
            x,
            y,
            opacity: 1,
            scale: 1,
            duration: 1.5,
            delay: index * 0.2,
            ease: 'elastic.out(1, 0.7)',
          }
        );
      }
    });
    
    // Continuous rotation animation
    const rotationTl = gsap.timeline({ repeat: -1 });
    rotationTl.to(containerRef.current, {
      rotation: 360,
      duration: 60,
      ease: 'none',
    });
    
    return () => {
      rotationTl.kill();
    };
  }, [visible]);
  
  const handleLinkHover = (linkId: string, isHovering: boolean) => {
    setHoveredLink(isHovering ? linkId : null);
    
    const element = linkRefs.current[linkId];
    if (element) {
      gsap.to(element, {
        scale: isHovering ? 1.3 : 1,
        duration: 0.3,
        ease: 'back.out(2)',
      });
    }
  };
  
  const handleClick = (e: React.MouseEvent, link: Link) => {
    e.preventDefault();
    
    if (link.href.startsWith('#')) {
      // Internal link - trigger modal
      if (onLinkClick) {
        onLinkClick(link);
      }
    } else {
      // External link - open in new tab
      window.open(link.href, '_blank', 'noopener,noreferrer');
    }
  };
  
  if (!visible) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-20 pointer-events-none">
      <div ref={containerRef} className="relative w-0 h-0">
        {links.map((link) => (
          <div key={link.id}>
            {/* Orbital link */}
            <div
              ref={(el) => {
                linkRefs.current[link.id] = el;
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer"
              onMouseEnter={() => handleLinkHover(link.id, true)}
              onMouseLeave={() => handleLinkHover(link.id, false)}
              onClick={(e) => handleClick(e, link)}
            >
              {/* Icon container */}
              <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-3xl md:text-4xl transition-all duration-300"
                style={{
                  background: `radial-gradient(circle, ${link.color}40, transparent)`,
                  boxShadow: hoveredLink === link.id 
                    ? `0 0 30px ${link.color}, 0 0 60px ${link.color}`
                    : `0 0 15px ${link.color}80`,
                }}
              >
                <span className="filter drop-shadow-lg">{link.icon}</span>
              </div>
              
              {/* Subtitle on hover */}
              {hoveredLink === link.id && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap text-sm px-3 py-1 rounded-full"
                  style={{
                    background: `${link.color}20`,
                    color: link.color,
                    boxShadow: `0 0 10px ${link.color}40`,
                    fontFamily: 'var(--font-sofia-pro)',
                    fontWeight: 300,
                  }}
                >
                  {link.subtitle}
                </div>
              )}
            </div>
            
            {/* Connecting line to center */}
            <div
              className="absolute top-0 left-0 w-0.5 origin-bottom opacity-20"
              style={{
                height: '180px',
                background: `linear-gradient(to top, ${link.color}, transparent)`,
                transform: `rotate(${(360 / links.length) * links.indexOf(link) - 90}deg)`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

