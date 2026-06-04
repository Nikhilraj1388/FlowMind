'use client';

/**
 * useAIStream hook — Phase 9
 * Consumes Server-Sent Events from /api/v1/ai/explain, /api/v1/ai/chat,
 * or /api/v1/ai/analyze-complexity.
 * Progressively appends streamed text chunks to state.
 */
import { useState, useCallback, useRef } from 'react';
import { useAuth } from '@clerk/nextjs';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api/v1';

interface UseAIStreamOptions {
  onDone?: (fullText: string) => void;
  onError?: (msg: string) => void;
}

export function useAIStream({ onDone, onError }: UseAIStreamOptions = {}) {
  const { getToken } = useAuth();
  const [text, setText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const reset = useCallback(() => {
    setText('');
    setError(null);
    setIsStreaming(false);
  }, []);

  const stream = useCallback(
    async (endpoint: string, body: Record<string, unknown>) => {
      // Cancel any previous stream
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      reset();
      setIsStreaming(true);

      try {
        const token = await getToken();
        if (!token) throw new Error('Not authenticated');

        const res = await fetch(`${API_BASE}${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
          signal: controller.signal,
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err?.error?.message ?? `AI request failed: ${res.status}`);
        }

        const reader = res.body?.getReader();
        if (!reader) throw new Error('No response body');

        const decoder = new TextDecoder();
        let buffer = '';
        let fullText = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() ?? '';

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue;
            const data = line.slice(6).trim();
            if (data === '[DONE]') {
              setIsStreaming(false);
              onDone?.(fullText);
              return;
            }
            try {
              const parsed = JSON.parse(data) as { text?: string; error?: string };
              if (parsed.error) {
                setError(parsed.error);
                onError?.(parsed.error);
                setIsStreaming(false);
                return;
              }
              if (parsed.text) {
                fullText += parsed.text;
                setText((prev) => prev + parsed.text);
              }
            } catch {
              // Ignore malformed SSE lines
            }
          }
        }

        setIsStreaming(false);
        onDone?.(fullText);
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
        const msg = (err as Error).message;
        setError(msg);
        onError?.(msg);
        setIsStreaming(false);
      }
    },
    [getToken, reset, onDone, onError],
  );

  const explain = useCallback(
    (executionId: string, projectId: string) =>
      stream('/ai/explain', { executionId, projectId }),
    [stream],
  );

  const chat = useCallback(
    (message: string, projectId: string, executionId?: string) =>
      stream('/ai/chat', { message, projectId, executionId }),
    [stream],
  );

  const analyzeComplexity = useCallback(
    (executionId: string, projectId: string) =>
      stream('/ai/analyze-complexity', { executionId, projectId }),
    [stream],
  );

  const cancel = useCallback(() => {
    abortRef.current?.abort();
    setIsStreaming(false);
  }, []);

  return { text, isStreaming, error, explain, chat, analyzeComplexity, cancel, reset };
}
