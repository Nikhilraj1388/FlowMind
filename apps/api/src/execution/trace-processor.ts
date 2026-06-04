/**
 * Trace processor — Section 7.10
 * Validates, truncates, builds frame index, computes stats.
 */
import type { FlowTrace, TraceMetadata, TraceSource, TraceStep, TraceFrame } from './types';

const MAX_STEPS = 10_000;

interface RawCollectorOutput {
  steps: TraceStep[];
  frames: RawFrame[];
  truncated?: boolean;
}

interface RawFrame {
  id: string;
  name: string;
  depth: number;
  vars: Record<string, unknown>;
  parentId: string | null;
}

export class TraceProcessor {
  process(
    rawJson: string | null,
    metadata: TraceMetadata,
    source: TraceSource,
  ): FlowTrace {
    // If no trace was produced (e.g. syntax error or crash before exit hook)
    const raw: RawCollectorOutput = rawJson
      ? this.parseRaw(rawJson)
      : { steps: [], frames: [{ id: 'frame_0', name: '<global>', depth: 0, vars: {}, parentId: null }], truncated: false };

    // 1. Enforce step limit
    const steps = raw.steps.length > MAX_STEPS
      ? raw.steps.slice(0, MAX_STEPS)
      : raw.steps;

    const truncated = raw.truncated || raw.steps.length > MAX_STEPS;

    // 2. Build frame index from surviving steps
    const frames = this.buildFrameIndex(steps, raw.frames);

    // 3. Compute stats
    const stats = {
      totalSteps: steps.length,
      maxDepth: Math.max(0, ...steps.map((s) => s.depth ?? 0)),
      functionCalls: steps.filter((s) => s.type === 'call').length,
      assignments: steps.filter((s) => s.type === 'assign').length,
      outputLines: steps.filter((s) => s.type === 'output').length,
      memoryPeakBytes: null,
    };

    return {
      version: '1.0.0',
      metadata,
      source,
      steps,
      frames,
      stats,
      truncated,
    };
  }

  private parseRaw(rawJson: string): RawCollectorOutput {
    try {
      return JSON.parse(rawJson) as RawCollectorOutput;
    } catch {
      return {
        steps: [],
        frames: [{ id: 'frame_0', name: '<global>', depth: 0, vars: {}, parentId: null }],
      };
    }
  }

  private buildFrameIndex(steps: TraceStep[], rawFrames: RawFrame[]): TraceFrame[] {
    // Collect all frame IDs referenced by surviving steps
    const referencedIds = new Set<string>(steps.map((s) => s.frameId));

    return rawFrames
      .filter((f) => referencedIds.has(f.id) || f.id === 'frame_0')
      .map((f) => ({
        id: f.id,
        functionName: f.name,
        depth: f.depth,
        parentId: f.parentId ?? undefined,
        variables: {},
      }));
  }
}
