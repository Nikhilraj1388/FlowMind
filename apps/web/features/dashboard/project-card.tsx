'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MoreHorizontal, Play, Trash2, Copy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownItem } from '@/components/ui/dropdown-menu';
import { formatRelativeDate } from '@/lib/utils/format-date';
import type { Project } from '@/types/project';
import type { Language } from '@/types';

const languageColors: Record<Language, string> = {
  javascript: 'var(--electric-blue)',
  python: 'var(--cyan-glow)',
  java: 'var(--neon-purple)',
  cpp: '#f97316',
};

const languageLabels: Record<Language, string> = {
  javascript: 'JavaScript',
  python: 'Python',
  java: 'Java',
  cpp: 'C++',
};

interface ProjectCardProps {
  project: Project;
  index?: number;
  onDelete?: (id: string) => void;
}

export function ProjectCard({ project, index = 0, onDelete }: ProjectCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  // API returns UPPERCASE ('JAVASCRIPT'), normalize to lowercase for lookup
  const lang = project.language.toLowerCase() as Language;
  const color = languageColors[lang] ?? 'var(--electric-blue)';
  const label = languageLabels[lang] ?? project.language;

  const handleDelete = async () => {
    if (!onDelete) return;
    setIsDeleting(true);
    try {
      await onDelete(project.id);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="group border-border/50 bg-card/50 transition-all hover:border-[var(--electric-blue)]/40 hover:shadow-lg hover:shadow-[var(--electric-blue)]/5">
        <CardContent className="p-5">
          <div className="mb-3 flex items-start justify-between">
            <Badge
              variant="outline"
              className="font-mono text-xs"
              style={{ borderColor: `${color}40`, color }}
            >
              {label}
            </Badge>
            <DropdownMenu
              trigger={
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 opacity-0 group-hover:opacity-100"
                  aria-label="More options"
                >
                  <MoreHorizontal className="size-4" />
                </Button>
              }
            >
              <DropdownItem onClick={handleDelete} destructive>
                <Trash2 className="size-4" />
                {isDeleting ? 'Deleting…' : 'Delete'}
              </DropdownItem>
            </DropdownMenu>
          </div>
          <h3 className="mb-1 font-semibold group-hover:text-[var(--electric-blue)]">
            {project.title}
          </h3>
          <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
            <span>{formatRelativeDate(project.updatedAt)}</span>
            <span>v{project.version}</span>
          </div>
          <Link href={`/project/${project.id}`} className="mt-2 block">
            <Button
              variant="outline"
              size="sm"
              className="w-full group-hover:border-[var(--electric-blue)]/50"
            >
              <Play className="size-4" />
              Open
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}
