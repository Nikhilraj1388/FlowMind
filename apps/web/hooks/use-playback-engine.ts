'use client';

/**
 * Playback engine — Section 8.5
 * Uses requestAnimationFrame to advance steps at a controlled rate.
 * Speed multiplier: 0.5x / 1x / 2x / 4x
 */
import { useEffect, useRef } from 'react';
import { usePlaybackStore } from '@/store/playback-store';

const BASE_STEP_MS = 600; // ms per step at 1x speed

export function usePlaybackEngine() {
  const { isPlaying, speed, currentStep, totalSteps, stepForward, pause } = usePlaybackStore();
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const accumulatedRef = useRef<number>(0);

  useEffect(() => {
    if (!isPlaying) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = 0;
      accumulatedRef.current = 0;
      return;
    }

    const stepDurationMs = BASE_STEP_MS / speed;

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;

      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;
      accumulatedRef.current += delta;

      if (accumulatedRef.current >= stepDurationMs) {
        accumulatedRef.current = 0;

        if (currentStep >= totalSteps - 1) {
          pause();
          return;
        }
        stepForward();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, speed, currentStep, totalSteps]);
}
