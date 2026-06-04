'use client';

/**
 * Output panel — Phase 8
 * Shows stdout/stderr lines that have been "reached" by the current playback step.
 */
import { useMemo } from 'react';
import { usePlaybackStore } from '@/store/playback-store';
import { useExecutionStore } from '@/store/execution-store';
import { collectOutput } from '@/lib/trace/graph-builder';
import { cn } from '@/lib/utils';

export function OutputPanel() {
  const { trace, currentStep, hasTrace } = usePlaybackStore();
  const { stdout, stderr, status } = useExecutionStore();

  const outputLines = useMemo(() => {
    if (!trace) return [];
    return collectOutput(trace);
  }, [trace]);

  // Only show lines whose step is <= currentStep
  const currentStepIndex = trace?.steps[currentStep]?.index ?? -1;
  const visibleLines = outputLines.filter((l) => l.stepIndex <= currentStepIndex);

  if (!hasTrace) {
    // Show raw stdout/stderr from the last execution if available
    if (status === 'failed' && stderr) {
      return (
        <pre className="min-h-[200px] rounded-xl bg-red-950/30 p-4 font-mono text-xs text-red-400 whitespace-pre-wrap">
          {stderr}
        </pre>
      );
    }
    return (
      <pre className="min-h-[200px] rounded-xl bg-muted/30 p-4 font-mono text-sm text-[var(--cyan-glow)]">
        {stdout || '▸ Run your code to see output here'}
      </pre>
    );
  }

  return (
    <div className="min-h-[200px] rounded-xl border border-border/30 bg-muted/10 p-4 font-mono text-sm">
      {visibleLines.length === 0 ? (
        <span className="text-muted-foreground text-xs">No output yet at this step</span>
      ) : (
        visibleLines.map((line, i) => (
          <div
            key={i}
            className={cn(
              'flex gap-2',
              line.stepIndex === currentStepIndex && 'text-green-400',
              line.stepIndex < currentStepIndex && 'text-[var(--cyan-glow)]',
              line.stream === 'stderr' && 'text-red-400',
            )}
          >
            <span className="select-none text-muted-foreground/40">›</span>
            <span className="whitespace-pre-wrap">{line.text}</span>
          </div>
        ))
      )}
    </div>
  );
}
