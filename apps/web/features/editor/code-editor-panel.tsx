'use client';

import dynamic from 'next/dynamic';
import { useCallback, useRef } from 'react';
import { Play, Upload, Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { languages } from '@/config/site';
import { useEditorStore } from '@/store/editor-store';
import { useAutoSave } from '@/hooks/use-auto-save';
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts';
import { registerFlowMindTheme } from './monaco-theme';
import type { OnMount } from '@monaco-editor/react';
import type { Language } from '@/types';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-muted/20 font-mono text-sm text-muted-foreground">
      <Loader2 className="mr-2 size-4 animate-spin" />
      Loading editor...
    </div>
  ),
});

interface CodeEditorPanelProps {
  onRun?: () => void;
  isRunning?: boolean;
}

/**
 * Monaco code editor panel with:
 * - Custom FlowMind dark theme
 * - Language selector (JS, Python, C++, Java)
 * - Auto-save with debounce
 * - Keyboard shortcuts (Ctrl+Enter to run, Ctrl+S to save)
 */
export function CodeEditorPanel({ onRun, isRunning = false }: CodeEditorPanelProps) {
  const { language, code, isSaving, isDirty, setLanguage, setCode, markSaved } = useEditorStore();
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);

  const monacoLanguage =
    language === 'cpp' ? 'cpp' : language === 'javascript' ? 'javascript' : language;

  /** Auto-save handler — Phase 5+ will POST to API */
  const handleSave = useCallback(
    (_value: string) => {
      // Placeholder: In Phase 5, this will call api.projects.update()
      markSaved();
    },
    [markSaved],
  );

  const { forceSave } = useAutoSave({
    value: code,
    delay: 2000,
    onSave: handleSave,
  });

  /** Keyboard shortcuts */
  useKeyboardShortcuts([
    {
      key: 'Enter',
      ctrl: true,
      handler: () => onRun?.(),
    },
    {
      key: 's',
      ctrl: true,
      handler: forceSave,
    },
  ]);

  /** Register custom theme when Monaco mounts */
  const handleEditorMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    registerFlowMindTheme(monaco);
    monaco.editor.setTheme('flowmind-dark');
    editor.focus();
  };

  return (
    <div className="flex h-full flex-col border-r border-border/50 bg-card/20">
      {/* Toolbar */}
      <div className="space-y-3 border-b border-border/50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">Code Editor</h3>
            {/* Save status indicator */}
            <span className="text-xs text-muted-foreground">
              {isSaving ? (
                <span className="flex items-center gap-1">
                  <Loader2 className="size-3 animate-spin" /> Saving...
                </span>
              ) : isDirty ? (
                '● Unsaved'
              ) : (
                '✓ Saved'
              )}
            </span>
          </div>
          <Select value={language} onValueChange={(v) => setLanguage(v as Language)}>
            <SelectTrigger className="h-8 w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button variant="gradient" className="flex-1" onClick={onRun} disabled={isRunning}>
            {isRunning ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Play className="size-4" />
            )}
            {isRunning ? 'Running…' : 'Run'}
            {!isRunning && <span className="ml-auto hidden text-xs opacity-60 sm:inline">Ctrl+↵</span>}
          </Button>
          <Button variant="outline" size="icon" aria-label="Save" onClick={forceSave}>
            <Save className="size-4" />
          </Button>
          <Button variant="outline" size="icon" aria-label="Upload file">
            <Upload className="size-4" />
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="min-h-0 flex-1">
        <MonacoEditor
          height="100%"
          language={monacoLanguage}
          value={code}
          onChange={(value: string | undefined) => setCode(value ?? '')}
          onMount={handleEditorMount}
          theme="flowmind-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "'JetBrains Mono', monospace",
            fontLigatures: true,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 16 },
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            smoothScrolling: true,
            renderLineHighlight: 'gutter',
            bracketPairColorization: { enabled: true },
            guides: { bracketPairs: true },
            wordWrap: 'on',
            tabSize: 2,
          }}
        />
      </div>
    </div>
  );
}
