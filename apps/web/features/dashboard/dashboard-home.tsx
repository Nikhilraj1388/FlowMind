'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, Clock, TrendingUp, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { PageContainer } from '@/components/layout/page-container';
import { ProjectCard } from './project-card';
import { useApiClient } from '@/lib/api/client';
import type { Project } from '@/types/project';

export function DashboardHome() {
  const api = useApiClient();
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Usage stats from /users/me
  const [stats, setStats] = useState({
    projectCount: 0,
    executionsToday: 0,
    aiRequestsToday: 0,
  });

  const fetchProjects = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [projectsRes, userRes] = await Promise.all([
        api.projects.list(),
        api.users.me(),
      ]);

      setProjects(projectsRes.data);
      setStats({
        projectCount: projectsRes.data.length,
        executionsToday: userRes.data.usage?.executionsToday ?? 0,
        aiRequestsToday: userRes.data.usage?.aiRequestsToday ?? 0,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load projects');
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleNewProject = async () => {
    try {
      setIsCreating(true);
      const res = await api.projects.create({
        title: 'Untitled Project',
        language: 'javascript',
      });
      router.push(`/project/${res.data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create project');
      setIsCreating(false);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      await api.projects.delete(projectId);
      await fetchProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete project');
    }
  };

  // ── Loading state ───────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <PageContainer className="py-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Skeleton className="mb-2 h-8 w-40" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-xl" />
          ))}
        </div>

        <section>
          <Skeleton className="mb-4 h-6 w-32" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-xl" />
            ))}
          </div>
        </section>
      </PageContainer>
    );
  }

  // ── Main view ───────────────────────────────────────────────────────────────
  return (
    <PageContainer className="py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Dashboard</h1>
          <p className="text-muted-foreground">Your projects and recent activity</p>
        </div>
        <Button variant="gradient" onClick={handleNewProject} disabled={isCreating}>
          <Plus className="size-4" />
          {isCreating ? 'Creating…' : 'New Project'}
        </Button>
      </div>

      {/* Error banner */}
      {error && (
        <div className="mb-6 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Stats cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Projects', value: stats.projectCount, icon: TrendingUp },
          { label: 'Runs today', value: stats.executionsToday, icon: Clock },
          { label: 'AI insights', value: stats.aiRequestsToday, icon: TrendingUp },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="border-border/50 bg-card/50">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex size-10 items-center justify-center rounded-lg bg-[var(--electric-blue)]/10">
                  <Icon className="size-5 text-[var(--electric-blue)]" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Projects section */}
      <section className="mb-10">
        <h2 className="mb-4 text-lg font-semibold">Your Projects</h2>

        {projects.length === 0 ? (
          /* Empty state */
          <Card className="border-border/50 bg-card/50">
            <CardContent className="flex flex-col items-center gap-4 py-16">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-muted/50">
                <FolderOpen className="size-8 text-muted-foreground/50" />
              </div>
              <div className="text-center">
                <p className="text-lg font-medium">No projects yet</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Create your first project to start visualizing code execution
                </p>
              </div>
              <Button variant="gradient" onClick={handleNewProject} disabled={isCreating}>
                <Plus className="size-4" />
                {isCreating ? 'Creating…' : 'Create Your First Project'}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onDelete={handleDeleteProject}
              />
            ))}
          </div>
        )}
      </section>

      {/* Quick Start Templates */}
      <section>
        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle className="text-base">Quick Start Templates</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {['Binary Search', 'Fibonacci', 'BFS Graph', 'Merge Sort'].map((name) => (
              <Link
                key={name}
                href="/workspace"
                className="rounded-lg border border-border/30 p-3 text-sm transition-colors hover:border-[var(--electric-blue)]/40 hover:bg-[var(--electric-blue)]/5"
              >
                {name}
              </Link>
            ))}
          </CardContent>
        </Card>
      </section>
    </PageContainer>
  );
}
