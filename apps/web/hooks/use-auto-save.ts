import { useEffect, useRef, useCallback } from 'react';
import { useDebounce } from '@/hooks/use-debounce';

interface UseAutoSaveOptions {
  /** Value to watch for changes */
  value: string;
  /** Debounce delay in ms (default 2000) */
  delay?: number;
  /** Called when value should be saved */
  onSave: (value: string) => void | Promise<void>;
  /** Whether auto-save is enabled */
  enabled?: boolean;
}

/**
 * Auto-save hook with debounced saving.
 * Returns the saving state for UI indicators ("Saved" / "Saving...").
 */
export function useAutoSave({ value, delay = 2000, onSave, enabled = true }: UseAutoSaveOptions) {
  const debouncedValue = useDebounce(value, delay);
  const initialMount = useRef(true);
  const lastSavedValue = useRef(value);

  useEffect(() => {
    // Skip initial mount — don't save the initial value
    if (initialMount.current) {
      initialMount.current = false;
      return;
    }

    if (!enabled) return;
    if (debouncedValue === lastSavedValue.current) return;

    lastSavedValue.current = debouncedValue;
    onSave(debouncedValue);
  }, [debouncedValue, onSave, enabled]);

  const isDirty = value !== lastSavedValue.current;

  const forceSave = useCallback(() => {
    if (value !== lastSavedValue.current) {
      lastSavedValue.current = value;
      onSave(value);
    }
  }, [value, onSave]);

  return { isDirty, forceSave };
}
