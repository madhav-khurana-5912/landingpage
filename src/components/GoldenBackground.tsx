import { useEffect, useState, memo, useMemo } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const PARTICLE_COUNT = 35; // Increased for better spread

export const GoldenBackground = memo(() => {
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 z-[-1] overflow-hidden bg-black">
      {/* Deep Background Ambience */}
      <div className="absolute inset-0">
        <div className="absolute top-[20%] left-[10%] w-[50%] h-[50%] rounded-full bg-[#d4af35]/5 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[50%] h-[50%] rounded-full bg-[#9a7b2c]/5 blur-[120px]" />
      </div>

      {/* The Spreading Liquid Trail */}
      <div className="absolute inset-0 pointer-events-none" style={{ filter: 'url(#liquid-gold-spread)' }}>
        {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
          <LiquidParticle key={i} index={i} mouseX={mouseX} mouseY={mouseY} />
        ))}
      </div>

      {/* Spreading SVG Filter */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id="liquid-gold-spread" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="
              1 0 0 0 0.8
              0 1 0 0 0.6
              0 0 1 0 0.2
              0 0 0 35 -12" result="goo" />
            <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="1" result="noise" />
            <feDisplacementMap in="goo" in2="noise" scale="50" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Finishing Textures */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.9)_100%)] pointer-events-none" />
    </div>
  );
});

const LiquidParticle = ({ index, mouseX, mouseY }: { index: number, mouseX: any, mouseY: any }) => {
  // Unique spread pattern for each particle
  const angle = (index / PARTICLE_COUNT) * Math.PI * 2;
  const initialRadius = 20 + (index * 2);
  
  // Oscillating spread radius
  const [radius, setRadius] = useState(initialRadius);

  useEffect(() => {
    let frame: number;
    const animate = (time: number) => {
      const slowTime = time * 0.001;
      // Make particles "spread and pulse" around the cursor
      setRadius(initialRadius + Math.sin(slowTime + index * 0.5) * 40);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [index, initialRadius]);

  // Individual spring configs for "flowing" spread
  const springConfig = { 
    stiffness: 80 - index, 
    damping: 15 + (index * 0.5), 
    mass: 1 + (index * 0.05) 
  };
  
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const size = 60 - (index * 1.2);

  return (
    <motion.div
      style={{
        x,
        y,
        left: Math.cos(angle) * radius,
        top: Math.sin(angle) * radius,
        width: size,
        height: size,
        position: 'absolute',
        translateX: '-50%',
        translateY: '-50%',
        background: 'linear-gradient(135deg, rgba(212, 175, 53, 0.8) 0%, rgba(154, 123, 44, 0.4) 100%)',
        borderRadius: '50%',
        opacity: Math.max(0.1, 0.7 - (index * 0.02)),
        boxShadow: `0 0 30px rgba(212, 175, 53, 0.2)`,
      }}
    />
  );
};
