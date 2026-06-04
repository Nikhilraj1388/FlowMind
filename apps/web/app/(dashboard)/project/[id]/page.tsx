import { WorkspaceShell } from '@/features/workspace/workspace-shell';

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { id } = await params;
  return { title: `Project ${id}` };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  return <WorkspaceShell projectId={id} />;
}
