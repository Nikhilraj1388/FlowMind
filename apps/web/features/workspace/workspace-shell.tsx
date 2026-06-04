'use client';

import Link from 'next/link';
import { useState, useCallback, useEffect, useRef } from 'react';
import {
  Download,
  Home,
  Maximize2,
  RotateCcw,
  Upload,
  PanelLeftClose,
  PanelLeftOpen,
  Loader2,
  CheckCircle2,
  XCircle,
  Save,
} from 'lucide-react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { FlowMindLogo } from '@/components/layout/flowmind-logo';
import { CodeEditorPanel } from '@/features/editor/code-editor-panel';
import { GraphCanvas } from '@/features/visualization/graph-canvas';
import { RecursionTree } from '@/features/visualization/recursion-tree';
import { TimelineControls } from '@/features/visualization/timeline-controls';
import { OutputPanel } from '@/features/visualization/output-panel';
import { AIPanel } from '@/features/ai/ai-panel';
import { useUIStore } from '@/store/ui-store';
import { usePlaybackStore } from '@/store/playback-store';
import { useExecutionStore } from '@/store/execution-store';
import { useEditorStore } from '@/store/editor-store';
import { useProjectStore } from '@/store/project-store';
import { useExecution } from '@/hooks/use-execution';
import { useApiClient } from '@/lib/api/client';
import type { VizTab } from '@/types';
import type { Language } from '@/types';
import type { FlowTrace } from '@/lib/trace/types';

interface WorkspaceShellProps {
  projectId?: string;
}

export function WorkspaceShell({ projectId }: WorkspaceShellProps) {
  const [vizTab, setVizTab] = useState<VizTab>('graph');
  const { aiPanelOpen, toggleAIPanel } = useUIStore();
  const { loadTrace } = usePlaybackStore();
  const executionStore = useExecutionStore();
  const { language, code, setCode: setEditorCode, setLanguage: setEditorLanguage } = useEditorStore();
  const projectStore = useProjectStore();
  const api = useApiClient();

  // Track whether we're in project mode or scratch mode
  const isProjectMode = !!projectId;

  // Ref to track the debounce timer
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Ref to avoid stale closures in debounce
  const latestCodeRef = useRef(code);
  latestCodeRef.current = code;

  // ── Fetch project on mount ────────────────────────────────────────────────
  useEffect(() => {
    if (!projectId) return;

    let cancelled = false;

    async function fetchProject() {
      try {
        projectStore.setLoading(true);
        const res = await api.projects.get(projectId!);
        if (cancelled) return;

        const p = res.data;
        projectStore.setProject({
          id: p.id,
          title: p.title,
          language: p.language,
          code: p.code,
          version: p.version,
        });

        // Sync editor store
        setEditorCode(p.code);
        setEditorLanguage(p.language.toLowerCase() as Language);
      } catch (err) {
        if (!cancelled) {
          console.error('Failed to load project:', err);
        }
      } finally {
        if (!cancelled) projectStore.setLoading(false);
      }
    }

    fetchProject();

    return () => {
      cancelled = true;
      projectStore.reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  // ── Auto-save debounce (2s after code changes) ───────────────────────────
  useEffect(() => {
    if (!isProjectMode || !projectStore.isDirty || projectStore.isSaving) return;

    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }

    saveTimerRef.current = setTimeout(async () => {
      try {
        projectStore.setSaving(true);
        const res = await api.projects.update(projectId!, {
          code: latestCodeRef.current,
          version: projectStore.version,
        });
        projectStore.markSaved(res.data.version);
      } catch (err) {
        console.error('Auto-save failed:', err);
        projectStore.setSaving(false);
      }
    }, 2000);

    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, projectStore.isDirty]);

  // Sync code changes from editor to project store
  useEffect(() => {
    if (isProjectMode && code !== projectStore.code) {
      projectStore.setCode(code);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  // Handle completed trace
  const handleTrace = useCallback(
    (trace: FlowTrace) => {
      loadTrace(trace);
      executionStore.setResult({
        executionId: trace.metadata.executionId,
        stdout: trace.steps
          .filter((s) => s.type === 'output' && s.stream === 'stdout')
          .map((s) => s.text ?? '')
          .join('\n'),
        stderr: '',
        durationMs: trace.metadata.durationMs,
        stepCount: trace.stats.totalSteps,
      });
      // Switch to graph tab to show results
      setVizTab('graph');
    },
    [loadTrace, executionStore],
  );

  const handleError = useCallback(
    (msg: string) => {
      executionStore.setError(msg);
    },
    [executionStore],
  );

  const { run, isRunning, status } = useExecution({
    onTrace: handleTrace,
    onError: handleError,
  });

  const handleRun = useCallback(() => {
    executionStore.reset();
    run({ code, language });
  }, [run, code, language, executionStore]);

  // Status indicator
  const statusIndicator = () => {
    if (isRunning) {
      return (
        <div className="hidden items-center gap-2 rounded-full bg-muted/50 px-3 py-1 sm:flex">
          <Loader2 className="size-3 animate-spin text-[var(--electric-blue)]" />
          <span className="text-xs text-muted-foreground">
            {status === 'submitting' ? 'Submitting…' : 'Running…'}
          </span>
        </div>
      );
    }
    if (status === 'completed') {
      return (
        <div className="hidden items-center gap-2 rounded-full bg-green-500/10 px-3 py-1 sm:flex">
          <CheckCircle2 className="size-3 text-green-400" />
          <span className="text-xs text-green-400">
            {executionStore.durationMs != null ? `${executionStore.durationMs}ms` : 'Done'}
            {executionStore.stepCount != null ? ` · ${executionStore.stepCount} steps` : ''}
          </span>
        </div>
      );
    }
    if (status === 'failed' || status === 'timeout') {
      return (
        <div className="hidden items-center gap-2 rounded-full bg-red-500/10 px-3 py-1 sm:flex">
          <XCircle className="size-3 text-red-400" />
          <span className="text-xs text-red-400">
            {status === 'timeout' ? 'Timed out' : 'Failed'}
          </span>
        </div>
      );
    }
    return (
      <div className="hidden items-center gap-2 rounded-full bg-muted/50 px-3 py-1 sm:flex">
        <div className="size-2 rounded-full bg-border" />
        <span className="text-xs text-muted-foreground">Ready</span>
      </div>
    );
  };

  // Save indicator for project mode
  const saveIndicator = () => {
    if (!isProjectMode) return null;
    if (projectStore.isSaving) {
      return (
        <div className="hidden items-center gap-1.5 sm:flex">
          <Loader2 className="size-3 animate-spin text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Saving…</span>
        </div>
      );
    }
    if (projectStore.isDirty) {
      return (
        <div className="hidden items-center gap-1.5 sm:flex">
          <Save className="size-3 text-yellow-500" />
          <span className="text-xs text-yellow-500">Unsaved</span>
        </div>
      );
    }
    if (projectStore.lastSavedAt) {
      return (
        <div className="hidden items-center gap-1.5 sm:flex">
          <CheckCircle2 className="size-3 text-green-400" />
          <span className="text-xs text-green-400">Saved</span>
        </div>
      );
    }
    return null;
  };

  // Loading state when fetching project
  if (isProjectMode && projectStore.isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <header className="shrink-0 border-b border-border/50 bg-card/30 backdrop-blur-xl">
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <div className="flex items-center gap-4">
              <FlowMindLogo href="/" showText={false} />
              <Skeleton className="h-5 w-32" />
            </div>
          </div>
        </header>
        <div className="flex flex-1 items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="size-8 animate-spin text-[var(--electric-blue)]" />
            <p className="text-sm text-muted-foreground">Loading project…</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="shrink-0 border-b border-border/50 bg-card/30 backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-4">
            <FlowMindLogo href="/" showText={false} />
            <div className="hidden h-6 w-px bg-border sm:block" />
            <span className="hidden text-sm text-muted-foreground sm:block">
              {isProjectMode ? projectStore.title : 'Scratch Pad'}
            </span>
            {saveIndicator()}
          </div>
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="sm" className="hidden md:flex">
                <Home className="size-4" />
                Home
              </Button>
            </Link>
            <Button variant="ghost" size="sm">
              <Upload className="size-4" />
              <span className="hidden md:inline">Import</span>
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="size-4" />
              <span className="hidden md:inline">Export</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleAIPanel} aria-label="Toggle AI panel">
              {aiPanelOpen ? <PanelLeftClose className="size-4" /> : <PanelLeftOpen className="size-4" />}
            </Button>
            <Button variant="gradient" size="sm">
              Share
            </Button>
          </div>
        </div>
      </header>

      {/* Main panels */}
      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        {/* Desktop: Resizable panels */}
        <div className="hidden min-h-0 flex-1 lg:flex">
          <PanelGroup direction="horizontal" autoSaveId="workspace-layout">
            {/* Code editor */}
            <Panel defaultSize={35} minSize={20} maxSize={60}>
              <CodeEditorPanel onRun={handleRun} isRunning={isRunning} />
            </Panel>

            <PanelResizeHandle className="w-1 bg-border/30 transition-colors hover:bg-[var(--electric-blue)]/40 active:bg-[var(--electric-blue)]/60" />

            {/* Visualization */}
            <Panel defaultSize={aiPanelOpen ? 40 : 65} minSize={30}>
              <div className="flex h-full flex-col">
                {/* Viz tabs + status */}
                <div className="flex items-center justify-between border-b border-border/50 bg-card/20 px-4 py-3 sm:px-6">
                  <Tabs value={vizTab} onValueChange={(v) => setVizTab(v as VizTab)}>
                    <TabsList className="bg-muted/50">
                      <TabsTrigger value="graph">Graph</TabsTrigger>
                      <TabsTrigger value="recursion">Recursion</TabsTrigger>
                      <TabsTrigger value="memory">Memory</TabsTrigger>
                      <TabsTrigger value="output">Output</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <div className="flex items-center gap-2">
                    {statusIndicator()}
                    <Button variant="ghost" size="icon" aria-label="Reset view">
                      <RotateCcw className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon" aria-label="Fullscreen">
                      <Maximize2 className="size-4" />
                    </Button>
                  </div>
                </div>

                {/* Viz content */}
                <div className="min-h-0 flex-1 flex flex-col">
                  {vizTab === 'graph' ? (
                    <div className="flex-1 min-h-0 p-4 sm:p-6">
                      <GraphCanvas />
                    </div>
                  ) : (
                    <ScrollArea className="min-h-0 flex-1">
                      <div className="p-4 sm:p-6">
                        {vizTab === 'recursion' && <RecursionTree />}
                        {vizTab === 'memory' && (
                          <div className="flex min-h-[400px] items-center justify-center rounded-xl border border-dashed border-border/50 text-muted-foreground">
                            Memory visualization — Phase 9
                          </div>
                        )}
                        {vizTab === 'output' && <OutputPanel />}
                      </div>
                    </ScrollArea>
                  )}
                </div>

                <TimelineControls />
              </div>
            </Panel>

            {/* AI Panel */}
            {aiPanelOpen && (
              <>
                <PanelResizeHandle className="w-1 bg-border/30 transition-colors hover:bg-[var(--neon-purple)]/40 active:bg-[var(--neon-purple)]/60" />
                <Panel defaultSize={25} minSize={18} maxSize={40}>
                  <AIPanel />
                </Panel>
              </>
            )}
          </PanelGroup>
        </div>

        {/* Mobile: Stacked layout */}
        <div className="flex flex-col lg:hidden">
          <div className="h-[40vh] shrink-0">
            <CodeEditorPanel onRun={handleRun} isRunning={isRunning} />
          </div>
          <div className="flex min-h-0 min-w-0 flex-1 flex-col">
            <div className="flex items-center justify-between border-b border-border/50 bg-card/20 px-4 py-3">
              <Tabs value={vizTab} onValueChange={(v) => setVizTab(v as VizTab)}>
                <TabsList className="bg-muted/50">
                  <TabsTrigger value="graph">Graph</TabsTrigger>
                  <TabsTrigger value="recursion">Tree</TabsTrigger>
                  <TabsTrigger value="output">Output</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="flex items-center">{statusIndicator()}</div>
            </div>
            <div className="min-h-0 flex-1 flex flex-col">
              {vizTab === 'graph' ? (
                <div className="flex-1 min-h-0 p-4">
                  <GraphCanvas />
                </div>
              ) : (
                <ScrollArea className="min-h-0 flex-1">
                  <div className="p-4">
                    {vizTab === 'recursion' && <RecursionTree />}
                    {vizTab === 'output' && <OutputPanel />}
                  </div>
                </ScrollArea>
              )}
            </div>
            <TimelineControls />
          </div>
        </div>
      </div>

      {/* Mobile AI info */}
      <div className="border-t border-border/50 bg-card/30 p-3 lg:hidden">
        <p className="text-center text-xs text-muted-foreground">
          Open on desktop for full AI panel and resizable editor experience
        </p>
      </div>
    </div>
  );
}
