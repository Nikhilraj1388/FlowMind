/**
 * Execution store — Phase 7/8
 * Holds the current execution result shared across workspace panels.
 */
import { create } from 'zustand';

type ExecStatus = 'idle' | 'submitting' | 'running' | 'completed' | 'failed' | 'timeout';

interface ExecutionState {
  status: ExecStatus;
  executionId: string | null;
  stdout: string;
  stderr: string;
  durationMs: number | null;
  stepCount: number | null;
  errorMessage: string | null;

  setStatus: (s: ExecStatus) => void;
  setResult: (data: {
    executionId: string;
    stdout: string;
    stderr: string;
    durationMs: number | null;
    stepCount: number | null;
  }) => void;
  setError: (msg: string) => void;
  reset: () => void;
}

export const useExecutionStore = create<ExecutionState>((set) => ({
  status: 'idle',
  executionId: null,
  stdout: '',
  stderr: '',
  durationMs: null,
  stepCount: null,
  errorMessage: null,

  setStatus: (status) => set({ status }),

  setResult: ({ executionId, stdout, stderr, durationMs, stepCount }) =>
    set({ status: 'completed', executionId, stdout, stderr, durationMs, stepCount, errorMessage: null }),

  setError: (errorMessage) => set({ status: 'failed', errorMessage }),

  reset: () =>
    set({
      status: 'idle',
      executionId: null,
      stdout: '',
      stderr: '',
      durationMs: null,
      stepCount: null,
      errorMessage: null,
    }),
}));
