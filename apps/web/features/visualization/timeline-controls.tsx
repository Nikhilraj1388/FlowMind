'use client';

/**
 * Timeline controls — Phase 8 (Section 8.5)
 * Scrubber, play/pause, step buttons, speed selector, keyboard shortcuts.
 */
import { useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { usePlaybackStore } from '@/store/playback-store';
import { usePlaybackEngine } from '@/hooks/use-playback-engine';

export function TimelineControls() {
  const {
    currentStep,
    totalSteps,
    isPlaying,
    speed,
    hasTrace,
    setStep,
    stepForward,
    stepBackward,
    togglePlay,
    setSpeed,
    reset,
  } = usePlaybackStore();

  // Start RAF playback engine
  usePlaybackEngine();

  // Keyboard shortcuts — Section 8.8
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      switch (e.key) {
        case ' ':
          e.preventDefault();
          if (hasTrace) togglePlay();
          break;
        case 'ArrowRight':
          e.preventDefault();
          stepForward();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          stepBackward();
          break;
        case 'Home':
          e.preventDefault();
          setStep(0);
          break;
        case 'End':
          e.preventDefault();
          setStep(Math.max(0, totalSteps - 1));
          break;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [hasTrace, togglePlay, stepForward, stepBackward, setStep, totalSteps]);

  const displayStep = totalSteps > 0 ? currentStep + 1 : 0;
  const canPlay = hasTrace && totalSteps > 0;

  return (
    <div className="flex items-center gap-3 border-t border-border/50 bg-card/30 px-4 py-3 backdrop-blur-sm sm:px-6">
      {/* Step controls */}
      <Button
        variant="outline"
        size="icon"
        onClick={stepBackward}
        disabled={!canPlay || currentStep === 0}
        aria-label="Step back"
      >
        <SkipBack className="size-4" />
      </Button>

      <Button
        variant="gradient"
        size="icon"
        onClick={togglePlay}
        disabled={!canPlay}
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={stepForward}
        disabled={!canPlay || currentStep >= totalSteps - 1}
        aria-label="Step forward"
      >
        <SkipForward className="size-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={reset}
        disabled={!canPlay}
        aria-label="Reset"
      >
        <RotateCcw className="size-4" />
      </Button>

      {/* Scrubber */}
      <div className="flex flex-1 items-center gap-3 px-1">
        <Slider
          value={[currentStep]}
          onValueChange={([v]) => setStep(v)}
          max={Math.max(0, totalSteps - 1)}
          min={0}
          step={1}
          disabled={!canPlay}
          className="flex-1"
          aria-label="Timeline scrubber"
        />
        <span className="whitespace-nowrap font-mono text-xs text-muted-foreground min-w-[52px] text-right">
          {canPlay ? `${displayStep} / ${totalSteps}` : '— / —'}
        </span>
      </div>

      {/* Speed selector */}
      <Select
        value={String(speed)}
        onValueChange={(v) => setSpeed(Number(v))}
        disabled={!canPlay}
      >
        <SelectTrigger className="h-8 w-[70px]" aria-label="Playback speed">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0.5">0.5×</SelectItem>
          <SelectItem value="1">1×</SelectItem>
          <SelectItem value="2">2×</SelectItem>
          <SelectItem value="4">4×</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
