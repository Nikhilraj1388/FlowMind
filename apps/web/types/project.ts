import type { Language } from './index';

/** Project entity matching Prisma schema */
export interface Project {
  id: string;
  userId: string;
  title: string;
  code: string;
  language: Language;
  isTemplate: boolean;
  isPublic: boolean;
  shareToken: string | null;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectInput {
  title?: string;
  language: Language;
  code?: string;
}

export interface UpdateProjectInput {
  title?: string;
  code?: string;
  language?: Language;
  version: number;
}
