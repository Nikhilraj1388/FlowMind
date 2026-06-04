import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function AnimatedBackground() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-[var(--deep-charcoal)]" />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(var(--electric-blue) 1px, transparent 1px),
            linear-gradient(90deg, var(--electric-blue) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
        }}
      />

      {/* Floating particles */}
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
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Large gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: `radial-gradient(circle, var(--electric-blue) 0%, transparent 70%)`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: `radial-gradient(circle, var(--neon-purple) 0%, transparent 70%)`,
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.1, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full">
        <motion.path
          d="M 100 200 Q 400 100 700 300"
          stroke="url(#gradient1)"
          strokeWidth="2"
          fill="none"
          opacity="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M 200 500 Q 500 400 800 600"
          stroke="url(#gradient2)"
          strokeWidth="2"
          fill="none"
          opacity="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 0.5 }}
        />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--electric-blue)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--electric-blue)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--electric-blue)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--neon-purple)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--neon-purple)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--neon-purple)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
