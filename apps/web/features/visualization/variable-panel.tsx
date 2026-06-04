'use client';

/**
 * VariablePanel — Phase 8 (Section 8.6)
 * Shows call stack + variable diff at current trace step.
 * Falls back to mock UI when no trace is loaded.
 */
import { useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { usePlaybackStore } from '@/store/playback-store';
import type { SerializedValue, TraceStep } from '@/lib/trace/types';

// ── Value serializer for display ─────────────────────────────────────────────

function displayValue(sv: SerializedValue | undefined | null): string {
  if (sv === undefined || sv === null) return 'undefined';
  const { type, value } = sv;
  if (type === 'null') return 'null';
  if (type === 'undefined') return 'undefined';
  if (type === 'array') return `[…${(sv as { length?: number }).length ?? '?'}]`;
  if (type === 'object') return '{…}';
  if (type === 'function') return value as string;
  if (type === 'string') return `"${String(value).slice(0, 40)}"`;
  return String(value);
}

// ── Variable diff hook — Section 8.6 ────────────────────────────────────────

function useVariableDiff(step: TraceStep | null, prevStep: TraceStep | null) {
  return useMemo(() => {
    const current = step?.variables ?? {};
    const previous = prevStep?.variables ?? {};
    const changed: string[] = [];
    const added: string[] = [];

    for (const key of Object.keys(current)) {
      if (!(key in previous)) added.push(key);
      else if (JSON.stringify(current[key]) !== JSON.stringify(previous[key])) changed.push(key);
    }
    return { current, changed, added };
  }, [step, prevStep]);
}

// ── Call stack at current step ───────────────────────────────────────────────

function buildCallStack(steps: TraceStep[], currentIndex: number) {
  const stack: Array<{ fn: string; depth: number; stepIndex: number }> = [];
  const frameSet = new Set<string>();

  for (let i = 0; i <= currentIndex && i < steps.length; i++) {
    const s = steps[i];
    if (s.type === 'call' && s.functionName && s.frameId) {
      if (!frameSet.has(s.frameId)) {
        frameSet.add(s.frameId);
        stack.push({ fn: s.functionName, depth: s.depth ?? 0, stepIndex: s.index });
      }
    }
    if (s.type === 'return' && s.frameId) {
      frameSet.delete(s.frameId);
      const idx = stack.findIndex((f) => f.fn === s.functionName);
      if (idx !== -1) stack.splice(idx, 1);
    }
  }
  return stack.slice(-8); // show last 8 frames
}

// ── Mock fallback ────────────────────────────────────────────────────────────

const mockStack = [
  { fn: 'fibonacci(5)', depth: 0 },
  { fn: 'fibonacci(4)', depth: 1 },
];

export function VariablePanel() {
  const { trace, currentStep, hasTrace } = usePlaybackStore();

  const currentTraceStep = trace?.steps[currentStep] ?? null;
  const prevTraceStep = currentStep > 0 ? (trace?.steps[currentStep - 1] ?? null) : null;
  const { current: variables, changed, added } = useVariableDiff(currentTraceStep, prevTraceStep);

  const callStack = useMemo(() => {
    if (!trace) return [];
    return buildCallStack(trace.steps, currentStep);
  }, [trace, currentStep]);

  const hasVariables = Object.keys(variables).length > 0;

  return (
    <ScrollArea className="h-full">
      <div className="space-y-4 p-4">

        {/* Call Stack */}
        <div>
          <h4 className="mb-2 text-sm font-semibold">Call Stack</h4>
          {hasTrace && callStack.length > 0 ? (
            <div className="space-y-1.5">
              {[...callStack].reverse().map((frame, i) => (
                <Card
                  key={`${frame.fn}-${i}`}
                  className={`px-3 py-2 ${
                    i === 0
                      ? 'border-[var(--electric-blue)] bg-[var(--electric-blue)]/10'
                      : 'border-border/30 bg-muted/20'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="truncate">{frame.fn}()</span>
                    <span className="ml-2 shrink-0 text-muted-foreground">
                      depth {frame.depth}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-1.5">
              {mockStack.map((f, i) => (
                <Card key={f.fn} className={`px-3 py-2 ${i === 1 ? 'border-[var(--electric-blue)] bg-[var(--electric-blue)]/10' : 'border-border/30'}`}>
                  <span className="font-mono text-xs">{f.fn}</span>
                </Card>
              ))}
              {!hasTrace && (
                <p className="text-center text-xs text-muted-foreground pt-1">Run code to see live stack</p>
              )}
            </div>
          )}
        </div>

        {/* Variables */}
        <div>
          <h4 className="mb-2 text-sm font-semibold">Variables</h4>
          {hasTrace && hasVariables ? (
            <div className="space-y-1.5">
              {Object.entries(variables).map(([key, val]) => {
                const isNew = added.includes(key);
                const isChanged = changed.includes(key);
                return (
                  <Card
                    key={key}
                    className={`px-3 py-2 border-border/30 transition-colors ${
                      isNew ? 'border-green-500/50 bg-green-500/5' :
                      isChanged ? 'border-[var(--neon-purple)]/50 bg-[var(--neon-purple)]/5' :
                      'bg-muted/10'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-mono text-muted-foreground">{key}</span>
                      <span className="flex items-center gap-1.5">
                        {(isNew || isChanged) && (
                          <Badge variant="outline" className={`px-1 py-0 text-[10px] ${isNew ? 'border-green-500/50 text-green-400' : 'border-[var(--neon-purple)]/50 text-[var(--neon-purple)]'}`}>
                            {isNew ? 'new' : 'changed'}
                          </Badge>
                        )}
                        <span className="font-mono text-[var(--cyan-glow)]">
                          {displayValue(val as SerializedValue)}
                        </span>
                      </span>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : hasTrace ? (
            <p className="text-center text-xs text-muted-foreground py-2">No variables at this step</p>
          ) : (
            <Card className="border-border/30 p-3">
              <div className="flex justify-between text-sm">
                <span>n</span>
                <span className="font-mono text-[var(--cyan-glow)]">5</span>
              </div>
            </Card>
          )}
        </div>

        {/* Step info */}
        {hasTrace && currentTraceStep && (
          <div>
            <h4 className="mb-2 text-sm font-semibold">Current Step</h4>
            <Card className="border-border/30 bg-muted/10 p-3">
              <div className="space-y-1 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">type</span>
                  <Badge variant="outline" className="px-1 py-0 text-[10px]">{currentTraceStep.type}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">line</span>
                  <span>{currentTraceStep.line}</span>
                </div>
                {currentTraceStep.functionName && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">fn</span>
                    <span className="truncate ml-2">{currentTraceStep.functionName}</span>
                  </div>
                )}
                {currentTraceStep.expression && (
                  <div className="flex justify-between gap-2">
                    <span className="text-muted-foreground shrink-0">expr</span>
                    <span className="truncate text-right">{currentTraceStep.expression}</span>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}

        {/* Memory (placeholder) */}
        <div>
          <h4 className="mb-2 text-sm font-semibold">Memory</h4>
          <Card className="border-border/30 p-3">
            <div className="mb-2 flex justify-between text-sm">
              <span>Stack</span>
              <span className="font-mono text-xs text-muted-foreground">
                {hasTrace ? `${callStack.length} frame${callStack.length !== 1 ? 's' : ''}` : '2.4 KB'}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[var(--electric-blue)] to-[var(--cyan-glow)] transition-all duration-300"
                style={{ width: hasTrace ? `${Math.min(100, (callStack.length / 10) * 100)}%` : '45%' }}
              />
            </div>
          </Card>
        </div>

      </div>
    </ScrollArea>
  );
}
