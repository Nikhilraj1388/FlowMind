'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Code2, Play, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedBackground } from './animated-background';

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <AnimatedBackground />
      <div className="container relative z-10 mx-auto px-4 py-20 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--electric-blue)]/20 bg-gradient-to-r from-[var(--electric-blue)]/10 to-[var(--neon-purple)]/10 px-4 py-2">
              <Code2 className="size-4 text-[var(--electric-blue)]" />
              <span className="text-sm text-[var(--electric-blue)]">AI-Powered Code Visualization</span>
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-7xl">
              <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                Visualize Your Code
              </span>
              <br />
              <span className="bg-gradient-to-r from-[var(--electric-blue)] via-[var(--cyan-glow)] to-[var(--neon-purple)] bg-clip-text text-transparent">
                Like Never Before
              </span>
            </h1>

            <p className="max-w-xl text-lg text-muted-foreground sm:text-xl">
              Understand execution flow, recursion, memory, and algorithms through interactive
              visual animations.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/workspace">
                <Button variant="gradient" size="lg" className="group relative overflow-hidden">
                  <Play className="size-5" />
                  Try Demo
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[var(--neon-purple)]/30 hover:border-[var(--neon-purple)] hover:bg-[var(--neon-purple)]/10"
                >
                  <Upload className="size-5" />
                  Upload Code
                </Button>
              </Link>
            </div>

            <p className="text-sm text-muted-foreground">
              Trusted by <span className="font-semibold text-foreground">10,000+</span> developers
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-square"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--electric-blue)]/20 via-[var(--neon-purple)]/20 to-[var(--cyan-glow)]/20 blur-3xl" />
            <div className="glass-panel relative rounded-3xl p-8 shadow-2xl">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="mb-4 flex items-center gap-4 last:mb-0"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  <div
                    className="size-4 rounded-full"
                    style={{
                      backgroundColor:
                        i === 0
                          ? 'var(--electric-blue)'
                          : i === 1
                            ? 'var(--cyan-glow)'
                            : 'var(--neon-purple)',
                      boxShadow: `0 0 20px ${i === 0 ? 'var(--electric-blue)' : i === 1 ? 'var(--cyan-glow)' : 'var(--neon-purple)'}`,
                    }}
                  />
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                    <motion.div
                      className="h-full rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                      style={{
                        backgroundColor:
                          i === 0
                            ? 'var(--electric-blue)'
                            : i === 1
                              ? 'var(--cyan-glow)'
                              : 'var(--neon-purple)',
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
