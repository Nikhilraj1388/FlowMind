'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Clock, Play, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useApiClient } from '@/lib/api/client';
import { formatRelativeDate } from '@/lib/utils/format-date';

interface ExecutionHistoryProps {
  projectId: string;
}

interface ExecutionItem {
  id: string;
  status: string;
  durationMs: number | null;
  stepCount: number | null;
  createdAt: string;
}

const statusVariant = (status: string) => {
  switch (status) {
    case 'COMPLETED':
      return 'success' as const;
    case 'FAILED':
    case 'TIMEOUT':
      return 'error' as const;
    case 'RUNNING':
    case 'QUEUED':
      return 'warning' as const;
    default:
      return 'secondary' as const;
  }
};

export function ExecutionHistory({ projectId }: ExecutionHistoryProps) {
  const api = useApiClient();
  const router = useRouter();
  const [executions, setExecutions] = useState<ExecutionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchExecutions() {
      try {
        setIsLoading(true);
        setError(null);
        const res = await api.projects.listExecutions(projectId);
        if (!cancelled) {
          setExecutions(res.data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load executions');
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchExecutions();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const handleReplay = (executionId: string) => {
    router.push(`/project/${projectId}?execution=${executionId}`);
  };

  if (isLoading) {
    return (
      <Card className="border-border/50 bg-card/50">
        <CardHeader>
          <CardTitle className="text-base">Execution History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full rounded-lg" />
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-border/50 bg-card/50">
        <CardHeader>
          <CardTitle className="text-base">Execution History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm text-destructive">
            <AlertCircle className="size-4" />
            {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (executions.length === 0) {
    return (
      <Card className="border-border/50 bg-card/50">
        <CardHeader>
          <CardTitle className="text-base">Execution History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-2 py-8 text-center">
            <Clock className="size-8 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">No executions yet</p>
            <p className="text-xs text-muted-foreground/70">
              Run your code to see execution history here
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50 bg-card/50">
      <CardHeader>
        <CardTitle className="text-base">Execution History</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {executions.map((exec) => (
          <div
            key={exec.id}
            className="flex items-center justify-between rounded-lg border border-border/30 p-3 transition-colors hover:bg-accent/30"
          >
            <div className="flex items-center gap-3">
              <Badge variant={statusVariant(exec.status)}>
                {exec.status}
              </Badge>
              <div className="text-xs text-muted-foreground">
                {exec.durationMs != null && (
                  <span className="font-mono">{exec.durationMs}ms</span>
                )}
                {exec.stepCount != null && exec.stepCount > 0 && (
                  <span className="ml-2 font-mono">{exec.stepCount} steps</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {formatRelativeDate(exec.createdAt)}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="size-7"
                onClick={() => handleReplay(exec.id)}
                aria-label="Replay execution"
              >
                <Play className="size-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
