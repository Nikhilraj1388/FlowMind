'use client';

/**
 * useExecution hook — Phase 7
 * Submits code to POST /api/v1/executions, then polls GET /:id/status
 * until the execution reaches a terminal state.
 * On completion, calls onTrace with the parsed FlowTrace.
 */
import { useState, useCallback, useRef } from 'react';
import { useAuth } from '@clerk/nextjs';
import type { FlowTrace } from '@/lib/trace/types';

type ExecutionStatus = 'idle' | 'submitting' | 'running' | 'completed' | 'failed' | 'timeout';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api/v1';
const POLL_INTERVAL_MS = 1000;
const MAX_POLLS = 60; // 60s timeout on frontend

interface UseExecutionOptions {
  onTrace?: (trace: FlowTrace) => void;
  onError?: (message: string) => void;
}

export function useExecution({ onTrace, onError }: UseExecutionOptions = {}) {
  const { getToken } = useAuth();
  const [status, setStatus] = useState<ExecutionStatus>('idle');
  const [executionId, setExecutionId] = useState<string | null>(null);
  const [stdout, setStdout] = useState<string>('');
  const [stderr, setStderr] = useState<string>('');
  const [durationMs, setDurationMs] = useState<number | null>(null);
  const [stepCount, setStepCount] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pollCountRef = useRef(0);

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearTimeout(pollRef.current);
      pollRef.current = null;
    }
    pollCountRef.current = 0;
  }, []);

  const poll = useCallback(
    async (id: string, token: string) => {
      if (pollCountRef.current >= MAX_POLLS) {
        stopPolling();
        setStatus('timeout');
        onError?.('Execution timed out waiting for result');
        return;
      }
      pollCountRef.current += 1;

      try {
        const res = await fetch(`${API_BASE}/executions/${id}/status`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(`Status check failed: ${res.status}`);

        const { data } = await res.json();
        const execStatus: string = data.status;

        if (execStatus === 'COMPLETED') {
          stopPolling();
          setStatus('completed');
          setStdout(data.stdout ?? '');
          setStderr(data.stderr ?? '');
          setDurationMs(data.durationMs ?? null);
          setStepCount(data.stepCount ?? null);

          if (data.traceData) {
            onTrace?.(data.traceData as FlowTrace);
          }
        } else if (execStatus === 'FAILED' || execStatus === 'TIMEOUT' || execStatus === 'CANCELLED') {
          stopPolling();
          setStatus(execStatus === 'TIMEOUT' ? 'timeout' : 'failed');
          setStderr(data.stderr ?? data.errorMessage ?? 'Execution failed');
          setErrorMessage(data.errorMessage ?? null);
          onError?.(data.errorMessage ?? 'Execution failed');
        } else {
          // Still QUEUED or RUNNING — poll again
          setStatus('running');
          pollRef.current = setTimeout(() => poll(id, token), POLL_INTERVAL_MS);
        }
      } catch (err) {
        stopPolling();
        setStatus('failed');
        const msg = (err as Error).message;
        setErrorMessage(msg);
        onError?.(msg);
      }
    },
    [stopPolling, onTrace, onError],
  );

  const run = useCallback(
    async (params: { projectId?: string; code: string; language: string }) => {
      stopPolling();
      setStatus('submitting');
      setStdout('');
      setStderr('');
      setDurationMs(null);
      setStepCount(null);
      setErrorMessage(null);

      try {
        const token = await getToken();
        if (!token) throw new Error('Not authenticated');

        // Use a placeholder projectId for the demo workspace (no project context)
        const body = {
          projectId: params.projectId ?? 'cm00000000000000000000demo1',
          code: params.code,
          language: params.language.toUpperCase(),
          stdin: '',
        };

        const res = await fetch(`${API_BASE}/executions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err?.error?.message ?? `Submission failed: ${res.status}`);
        }

        const { data } = await res.json();
        setExecutionId(data.id);
        setStatus('running');

        // Begin polling
        pollCountRef.current = 0;
        pollRef.current = setTimeout(() => poll(data.id, token!), POLL_INTERVAL_MS);
      } catch (err) {
        setStatus('failed');
        const msg = (err as Error).message;
        setErrorMessage(msg);
        onError?.(msg);
      }
    },
    [getToken, poll, stopPolling, onError],
  );

  const reset = useCallback(() => {
    stopPolling();
    setStatus('idle');
    setExecutionId(null);
    setStdout('');
    setStderr('');
    setDurationMs(null);
    setStepCount(null);
    setErrorMessage(null);
  }, [stopPolling]);

  return {
    run,
    reset,
    status,
    executionId,
    stdout,
    stderr,
    durationMs,
    stepCount,
    errorMessage,
    isRunning: status === 'submitting' || status === 'running',
  };
}
