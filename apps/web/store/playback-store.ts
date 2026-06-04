/**
 * Playback store — Phase 8 (Section 8.5)
 * Controls step-by-step playback through a real FlowTrace.
 * All visualization components derive their state from currentStep.
 */
import { create } from 'zustand';
import type { FlowTrace } from '@/lib/trace/types';

interface PlaybackState {
  // Core playback
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  speed: number;

  // Loaded trace
  trace: FlowTrace | null;
  hasTrace: boolean;

  // Actions
  setStep: (step: number) => void;
  setTotalSteps: (total: number) => void;
  stepForward: () => void;
  stepBackward: () => void;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  setSpeed: (speed: number) => void;
  reset: () => void;

  // Load real trace
  loadTrace: (trace: FlowTrace) => void;
  clearTrace: () => void;
}

export const usePlaybackStore = create<PlaybackState>((set, get) => ({
  currentStep: 0,
  totalSteps: 0,
  isPlaying: false,
  speed: 1,
  trace: null,
  hasTrace: false,

  setStep: (step) =>
    set({ currentStep: Math.max(0, Math.min(step, Math.max(0, get().totalSteps - 1))) }),

  setTotalSteps: (total) => set({ totalSteps: total }),

  stepForward: () => {
    const { currentStep, totalSteps } = get();
    if (currentStep < totalSteps - 1) set({ currentStep: currentStep + 1 });
  },

  stepBackward: () => {
    const { currentStep } = get();
    if (currentStep > 0) set({ currentStep: currentStep - 1 });
  },

  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  togglePlay: () => set({ isPlaying: !get().isPlaying }),
  setSpeed: (speed) => set({ speed }),

  reset: () => set({ currentStep: 0, isPlaying: false }),

  loadTrace: (trace: FlowTrace) =>
    set({
      trace,
      hasTrace: true,
      totalSteps: trace.steps.length,
      currentStep: 0,
      isPlaying: false,
    }),

  clearTrace: () =>
    set({
      trace: null,
      hasTrace: false,
      totalSteps: 0,
      currentStep: 0,
      isPlaying: false,
    }),
}));
