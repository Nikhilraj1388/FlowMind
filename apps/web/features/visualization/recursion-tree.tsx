'use client';

/**
 * RecursionTree — Phase 8
 * Renders the interactive call tree from a real FlowTrace.
 * Falls back to placeholder when no trace is loaded.
 */
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { usePlaybackStore } from '@/store/playback-store';
import { buildRecursionTree } from '@/lib/trace/graph-builder';
import type { RecursionTreeNode } from '@/lib/trace/types';
import type { SerializedValue } from '@/lib/trace/types';
import { cn } from '@/lib/utils';

function serializeShort(sv: SerializedValue | null | undefined): string {
  if (!sv) return '?';
  if (sv.type === 'array') return `[…]`;
  if (sv.type === 'object') return '{…}';
  return String(sv.value);
}

interface TreeNodeProps {
  node: RecursionTreeNode;
  currentStepIndex: number;
  depth?: number;
}

function TreeNodeView({ node, currentStepIndex, depth = 0 }: TreeNodeProps) {
  const isActive = node.stepIndex === currentStepIndex;
  const isPast = node.stepIndex < currentStepIndex;
  const args = Object.entries(node.arguments)
    .map(([k, v]) => `${k}=${serializeShort(v)}`)
    .join(', ');

  return (
    <div className="flex flex-col items-center">
      <motion.div
        animate={{ scale: isActive ? 1.08 : 1, opacity: isPast ? 0.5 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        className={cn(
          'rounded-lg border px-3 py-1.5 font-mono text-xs text-center min-w-[110px]',
          isActive
            ? 'border-[var(--electric-blue)] bg-[var(--electric-blue)]/15 text-[var(--electric-blue)]'
            : 'border-border/40 bg-card/30',
        )}
      >
        <div className="font-semibold">{node.functionName}({args})</div>
        {node.returnValue !== null && isPast && (
          <div className="text-[var(--cyan-glow)] mt-0.5">
            = {serializeShort(node.returnValue)}
          </div>
        )}
      </motion.div>

      {node.children.length > 0 && (
        <div className="mt-1 flex gap-4 relative pt-3 before:absolute before:top-0 before:left-1/2 before:w-px before:h-3 before:bg-border/50">
          {node.children.map((child, i) => (
            <div key={`${child.id}-${i}`} className="flex flex-col items-center relative">
              <div className="absolute -top-3 left-1/2 w-px h-3 bg-border/50" />
              <TreeNodeView node={child} currentStepIndex={currentStepIndex} depth={depth + 1} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function RecursionTree() {
  const { trace, currentStep, hasTrace } = usePlaybackStore();

  const tree = useMemo(() => {
    if (!trace) return null;
    // Find the most-called function for the tree root
    const callCounts: Record<string, number> = {};
    for (const s of trace.steps) {
      if (s.type === 'call' && s.functionName) {
        callCounts[s.functionName] = (callCounts[s.functionName] ?? 0) + 1;
      }
    }
    const targetFn = Object.entries(callCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
    return buildRecursionTree(trace, targetFn);
  }, [trace]);

  const currentStepIndex = trace?.steps[currentStep]?.index ?? -1;

  if (!hasTrace || !tree) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed border-border/50 text-center p-8">
        <p className="text-muted-foreground text-sm">Recursion tree</p>
        <p className="text-xs text-muted-foreground/60 mt-1">Run recursive code to see the call tree</p>
      </div>
    );
  }

  return (
    <div className="min-h-[400px] overflow-x-auto p-4">
      <div className="flex justify-center">
        <TreeNodeView node={tree} currentStepIndex={currentStepIndex} />
      </div>
    </div>
  );
}
