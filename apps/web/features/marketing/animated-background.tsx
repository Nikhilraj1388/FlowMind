'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function AnimatedBackground() {
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; size: number; duration: number }>
  >([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        duration: Math.random() * 20 + 10,
      })),
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-[var(--deep-charcoal)]" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(var(--electric-blue) 1px, transparent 1px), linear-gradient(90deg, var(--electric-blue) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
        }}
      />
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: `radial-gradient(circle, var(--electric-blue) 0%, transparent 70%)`,
          }}
          animate={{ y: [0, -30, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: particle.duration, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      <motion.div
        className="absolute top-1/4 left-1/4 size-96 rounded-full opacity-20 blur-3xl"
        style={{ background: `radial-gradient(circle, var(--electric-blue) 0%, transparent 70%)` }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 size-96 rounded-full opacity-20 blur-3xl"
        style={{ background: `radial-gradient(circle, var(--neon-purple) 0%, transparent 70%)` }}
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.1, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
