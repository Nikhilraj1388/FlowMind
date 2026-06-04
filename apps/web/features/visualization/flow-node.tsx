'use client';

/**
 * Custom React Flow node — Section 8.2
 * Highlights active step, dims past steps, animates with Framer Motion.
 */
import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { motion } from 'framer-motion';
import { usePlaybackStore } from '@/store/playback-store';
import { cn } from '@/lib/utils';
import type { StatementNodeData } from '@/lib/trace/graph-builder';

const NODE_COLORS: Record<StatementNodeData['nodeType'], string> = {
  call:      'border-[var(--electric-blue)] bg-[var(--electric-blue)]/10 text-[var(--electric-blue)]',
  return:    'border-[var(--cyan-glow)] bg-[var(--cyan-glow)]/10 text-[var(--cyan-glow)]',
  condition: 'border-yellow-500 bg-yellow-500/10 text-yellow-400',
  output:    'border-green-500 bg-green-500/10 text-green-400',
  assign:    'border-[var(--neon-purple)] bg-[var(--neon-purple)]/10 text-[var(--neon-purple)]',
  loop:      'border-orange-400 bg-orange-400/10 text-orange-300',
  statement: 'border-border/60 bg-card/40 text-foreground',
};

const ACTIVE_GLOW: Record<StatementNodeData['nodeType'], string> = {
  call:      '0 0 16px rgba(59,130,246,0.6)',
  return:    '0 0 16px rgba(34,211,238,0.6)',
  condition: '0 0 16px rgba(234,179,8,0.5)',
  output:    '0 0 16px rgba(34,197,94,0.5)',
  assign:    '0 0 16px rgba(139,92,246,0.5)',
  loop:      '0 0 16px rgba(251,146,60,0.5)',
  statement: '0 0 12px rgba(148,163,184,0.3)',
};

interface FlowNodeProps {
  data: StatementNodeData;
}

export const FlowNodeComponent = memo(function FlowNodeComponent({ data }: FlowNodeProps) {
  const currentStep = usePlaybackStore((s) => s.currentStep);
  const trace = usePlaybackStore((s) => s.trace);

  // Map visual step index to trace step index
  const isActive = trace
    ? trace.steps[currentStep]?.index === data.stepIndex
    : false;
  const isPast = trace
    ? (trace.steps[currentStep]?.index ?? -1) > data.stepIndex
    : false;

  const colorClass = NODE_COLORS[data.nodeType];

  return (
    <motion.div
      animate={{
        scale: isActive ? 1.07 : 1,
        boxShadow: isActive ? ACTIVE_GLOW[data.nodeType] : 'none',
        opacity: isPast ? 0.45 : 1,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      className={cn(
        'rounded-lg border px-3 py-1.5 font-mono text-xs font-medium',
        'min-w-[140px] max-w-[180px] text-center',
        colorClass,
        isActive && 'ring-1 ring-current ring-offset-1 ring-offset-background',
      )}
    >
      <Handle type="target" position={Position.Top} className="!border-border !bg-muted" />
      <span className="block truncate">{data.label}</span>
      <Handle type="source" position={Position.Bottom} className="!border-border !bg-muted" />
    </motion.div>
  );
});
