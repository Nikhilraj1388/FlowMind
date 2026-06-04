'use client'; // Framer Motion + interactive marketing sections

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Brain,
  Boxes,
  Clock,
  Database,
  GitBranch,
  Globe,
  GraduationCap,
  Layers,
  ListOrdered,
  Network,
  Sparkles,
  Users,
  Zap,
  Check,
  Quote,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';
import { FlowMindLogo } from '@/components/layout/flowmind-logo';
import { Share2, Mail, Rss } from 'lucide-react';

const features = [
  { icon: Clock, title: 'Time Travel Debugging', description: 'Step backward and forward through execution', gradient: 'from-[var(--electric-blue)] to-[var(--cyan-glow)]', size: 'large' },
  { icon: Zap, title: 'Real-time Execution', description: 'Watch code execute with animated visualizations', gradient: 'from-[var(--cyan-glow)] to-[var(--neon-purple)]', size: 'small' },
  { icon: Brain, title: 'AI Explanations', description: 'Insights grounded in execution traces', gradient: 'from-[var(--neon-purple)] to-[var(--electric-blue)]', size: 'small' },
  { icon: Globe, title: 'Multi-language', description: 'JS, Python, Java, C++', gradient: 'from-[var(--electric-blue)] to-[var(--neon-purple)]', size: 'medium' },
  { icon: Boxes, title: 'DSA Visualizer', description: 'Interactive algorithm templates', gradient: 'from-[var(--cyan-glow)] to-[var(--electric-blue)]', size: 'medium' },
  { icon: Users, title: 'Collaboration', description: 'Share and debug together', gradient: 'from-[var(--neon-purple)] to-[var(--cyan-glow)]', size: 'small' },
  { icon: GraduationCap, title: 'Interview Prep', description: 'Master algorithms interactively', gradient: 'from-[var(--electric-blue)] to-[var(--neon-purple)]', size: 'small' },
];

const visualizations = [
  { icon: ListOrdered, title: 'Array Visualization', color: 'var(--electric-blue)' },
  { icon: GitBranch, title: 'Binary Tree', color: 'var(--cyan-glow)' },
  { icon: Network, title: 'Graph Algorithms', color: 'var(--neon-purple)' },
  { icon: Layers, title: 'Stack / Queue', color: 'var(--electric-blue)' },
  { icon: Database, title: 'Memory Allocation', color: 'var(--cyan-glow)' },
  { icon: Boxes, title: 'Dynamic Programming', color: 'var(--neon-purple)' },
];

const plans = [
  { name: 'Free', price: '$0', features: ['5 visualizations/day', 'Basic algorithms', 'Export as image'], cta: 'Get Started', highlighted: false },
  { name: 'Pro', price: '$19', period: '/mo', features: ['Unlimited viz', 'AI explanations', 'All DSA templates', 'Priority support'], cta: 'Start Trial', highlighted: true },
  { name: 'Team', price: '$49', period: '/mo', features: ['Everything in Pro', '10 team members', 'Shared workspaces', 'SSO'], cta: 'Contact Sales', highlighted: false },
];

function SectionHeading({ badge, title, subtitle }: { badge?: string; title: React.ReactNode; subtitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16 space-y-4 text-center"
    >
      {badge && (
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--electric-blue)]/20 bg-[var(--electric-blue)]/10 px-4 py-2">
          <span className="text-sm text-[var(--electric-blue)]">{badge}</span>
        </div>
      )}
      <h2 className="text-3xl font-bold sm:text-4xl md:text-6xl">{title}</h2>
      {subtitle && <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{subtitle}</p>}
    </motion.div>
  );
}

export function PlaygroundShowcaseSection() {
  return (
    <section className="relative overflow-hidden py-24 px-4 sm:px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[var(--deep-charcoal)]/20 to-background" />
      <div className="container relative z-10 mx-auto">
        <SectionHeading
          title={
            <span className="bg-gradient-to-r from-[var(--electric-blue)] to-[var(--neon-purple)] bg-clip-text text-transparent">
              Interactive Code Playground
            </span>
          }
          subtitle="Write code, watch it execute, understand every step"
        />
        <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-xl">
          <div className="grid lg:grid-cols-3">
            <div className="border-b border-border/50 p-6 lg:border-b-0 lg:border-r">
              <h3 className="mb-4 font-semibold">Code Editor</h3>
              <pre className="rounded-lg bg-muted/30 p-4 font-mono text-xs leading-relaxed">
                <code>{`function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n-1) + fibonacci(n-2);
}`}</code>
              </pre>
            </div>
            <div className="flex min-h-[280px] items-center justify-center border-b border-border/50 p-6 lg:border-b-0 lg:border-r">
              <div className="text-center text-muted-foreground">
                <GitBranch className="mx-auto mb-2 size-12 text-[var(--cyan-glow)]" />
                <p className="text-sm">Execution graph animates here</p>
              </div>
            </div>
            <div className="p-6">
              <h3 className="mb-4 font-semibold">AI Insights</h3>
              <div className="space-y-2 rounded-lg bg-muted/30 p-3 text-sm">
                <p>Step 3: Recursive call to fib(4)...</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 border-t border-border/50 bg-card/30 px-6 py-4">
            <Button variant="outline" size="icon"><SkipBack className="size-4" /></Button>
            <Button variant="gradient" size="icon"><Play className="size-4" /></Button>
            <Button variant="outline" size="icon"><SkipForward className="size-4" /></Button>
            <Slider defaultValue={[3]} max={8} step={1} className="flex-1" />
          </div>
        </Card>
      </div>
    </section>
  );
}

export function VisualizationsSection() {
  return (
    <section id="visualizations" className="py-24 px-4 sm:px-6">
      <div className="container mx-auto">
        <SectionHeading title={<>Supported <span className="text-[var(--electric-blue)]">Visualizations</span></>} subtitle="From arrays to graphs and memory" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visualizations.map((viz, i) => {
            const Icon = viz.icon;
            return (
              <motion.div key={viz.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Card className="group h-full border-border/50 bg-card/50 transition-colors hover:border-[var(--electric-blue)]/40">
                  <CardContent className="flex flex-col gap-4 p-6">
                    <div className="flex size-12 items-center justify-center rounded-xl" style={{ backgroundColor: `${viz.color}20` }}>
                      <Icon className="size-6" style={{ color: viz.color }} />
                    </div>
                    <h3 className="font-semibold">{viz.title}</h3>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6">
      <div className="container mx-auto">
        <SectionHeading badge="Powerful Features" title={<>Master Code Execution</>} />
        <div className="grid auto-rows-[200px] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => {
            const Icon = f.icon;
            const span = f.size === 'large' ? 'md:col-span-2 md:row-span-2' : f.size === 'medium' ? 'md:col-span-2' : '';
            return (
              <motion.div key={f.title} className={span} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Card className="group h-full border-border/50 bg-card/50 hover:border-[var(--electric-blue)]/40">
                  <CardContent className="flex h-full flex-col justify-between p-6">
                    <div>
                      <div className={`mb-4 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br ${f.gradient} p-px`}>
                        <div className="flex size-full items-center justify-center rounded-xl bg-card">
                          <Icon className="size-6 text-[var(--electric-blue)]" />
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold">{f.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function AIShowcaseSection() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="container mx-auto">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <SectionHeading title={<>AI Grounded in <span className="text-[var(--neon-purple)]">Real Traces</span></>} subtitle="Not generic chat — explanations tied to your execution steps" />
          <Card className="glass-panel border-[var(--neon-purple)]/20 p-6">
            <div className="flex gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[var(--electric-blue)] to-[var(--neon-purple)]">
                <Brain className="size-4" />
              </div>
              <div className="space-y-3 text-sm">
                <p className="rounded-lg bg-muted/50 p-3"><strong>Step 42:</strong> Condition n &lt;= 1 evaluated to true — base case reached.</p>
                <p className="rounded-lg bg-muted/50 p-3">Returning 1 from fib(1). Stack depth will decrease on next return event.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

export function TimelineShowcaseSection() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="container mx-auto text-center">
        <SectionHeading title="Cinematic Timeline Playback" subtitle="Scrub, play, pause — every panel stays in sync" />
        <div className="mx-auto flex max-w-2xl items-center gap-4 rounded-xl glass-panel p-6">
          <Pause className="size-5 text-muted-foreground" />
          <Slider defaultValue={[4]} max={10} step={1} className="flex-1" />
          <span className="font-mono text-sm text-muted-foreground">04 / 10</span>
        </div>
      </div>
    </section>
  );
}

export function DSAShowcaseSection() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="container mx-auto">
        <SectionHeading title="DSA Template Library" subtitle="Binary search, sorting, trees, graphs — edit and run" />
        <div className="flex flex-wrap justify-center gap-3">
          {['Binary Search', 'Merge Sort', 'BFS', 'Dijkstra', 'Trie', 'Heap'].map((name) => (
            <span key={name} className="rounded-full border border-border/50 bg-card/50 px-4 py-2 text-sm font-medium">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-4 sm:px-6">
      <div className="container mx-auto">
        <SectionHeading title="Simple Pricing" subtitle="Start free, upgrade when you need more" />
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative ${plan.highlighted ? 'border-[var(--electric-blue)]/50 shadow-lg shadow-[var(--electric-blue)]/10' : 'border-border/50'}`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[var(--electric-blue)] to-[var(--cyan-glow)] px-3 py-1 text-xs font-medium text-white">
                  Popular
                </div>
              )}
              <CardContent className="space-y-6 p-8">
                <div>
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                  </div>
                </div>
                <ul className="space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check className="size-4 text-[var(--cyan-glow)]" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button variant={plan.highlighted ? 'gradient' : 'outline'} className="w-full">
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="container mx-auto">
        <Card className="relative overflow-hidden border-[var(--electric-blue)]/20 bg-gradient-to-br from-card/80 to-card/40 p-12 text-center backdrop-blur-xl md:p-16">
          <Sparkles className="mx-auto mb-6 size-12 text-[var(--electric-blue)]" />
          <h2 className="text-3xl font-bold md:text-5xl">Ready to transform your coding experience?</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Join thousands of developers visualizing execution today.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/dashboard">
              <Button variant="gradient" size="lg">
                Start Visualizing <ArrowRight className="size-5" />
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  const items = [
    { name: 'Sarah Chen', role: 'SWE @ Google', content: 'FlowMind transformed how I debug complex algorithms.' },
    { name: 'Marcus Rodriguez', role: 'CS Professor', content: 'My students grasp recursion in days, not weeks.' },
    { name: 'Aisha Patel', role: 'Tech Lead', content: 'AI explanations grounded in traces are a game changer.' },
  ];
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="container mx-auto">
        <SectionHeading title="Loved by Developers" />
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card className="h-full border-border/50 bg-card/50 p-6">
                <Quote className="mb-4 size-8 text-[var(--electric-blue)]/50" />
                <p className="text-sm leading-relaxed text-muted-foreground">{t.content}</p>
                <p className="mt-4 font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MarketingFooter() {
  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12 sm:px-6">
        <div className="mb-12 grid gap-8 md:grid-cols-6">
          <div className="col-span-2">
            <FlowMindLogo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Visualize code execution. Understand algorithms. Debug faster.
            </p>
            <div className="mt-4 flex gap-3">
              {[Share2, Rss, Mail].map((Icon, i) => (
                <a key={i} href="#" className="flex size-9 items-center justify-center rounded-lg bg-muted/50 hover:bg-muted" aria-label="Social">
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
          {['Product', 'Resources', 'Company'].map((col) => (
            <div key={col}>
              <h4 className="mb-4 font-semibold">{col}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Docs</a></li>
                <li><a href="#pricing" className="hover:text-foreground">Pricing</a></li>
              </ul>
            </div>
          ))}
        </div>
        <p className="border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
          © 2026 FlowMind. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
