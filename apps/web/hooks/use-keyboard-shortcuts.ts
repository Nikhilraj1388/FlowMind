import { useEffect } from 'react';

interface ShortcutConfig {
  key: string;
  ctrl?: boolean;
  meta?: boolean;
  shift?: boolean;
  handler: () => void;
  enabled?: boolean;
}

/** Register global keyboard shortcuts */
export function useKeyboardShortcuts(shortcuts: ShortcutConfig[]) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      for (const shortcut of shortcuts) {
        if (shortcut.enabled === false) continue;

        const keyMatch = e.key.toLowerCase() === shortcut.key.toLowerCase();
        const ctrlMatch = shortcut.ctrl ? (e.ctrlKey || e.metaKey) : true;
        const metaMatch = shortcut.meta ? e.metaKey : true;
        const shiftMatch = shortcut.shift ? e.shiftKey : true;

        if (keyMatch && ctrlMatch && metaMatch && shiftMatch) {
          e.preventDefault();
          shortcut.handler();
          return;
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}
