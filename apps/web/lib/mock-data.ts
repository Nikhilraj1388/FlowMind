import type { Language } from '@/types';

export interface DashboardProject {
  id: string;
  title: string;
  language: Language;
  updatedAt: string;
  executionCount: number;
  description?: string;
}

export interface RecentExecution {
  id: string;
  projectTitle: string;
  language: Language;
  status: 'COMPLETED' | 'FAILED' | 'RUNNING';
  stepCount: number;
  durationMs: number;
  createdAt: string;
}

export const mockProjects: DashboardProject[] = [
  {
    id: '1',
    title: 'Binary Search',
    language: 'javascript',
    updatedAt: '2 hours ago',
    executionCount: 12,
    description: 'Classic divide-and-conquer search',
  },
  {
    id: '2',
    title: 'Fibonacci Recursion',
    language: 'javascript',
    updatedAt: 'Yesterday',
    executionCount: 28,
    description: 'Recursive tree visualization demo',
  },
  {
    id: '3',
    title: 'Merge Sort',
    language: 'python',
    updatedAt: '3 days ago',
    executionCount: 8,
  },
  {
    id: '4',
    title: 'BFS Graph Traversal',
    language: 'java',
    updatedAt: '1 week ago',
    executionCount: 5,
  },
  {
    id: '5',
    title: 'Linked List Insert',
    language: 'cpp',
    updatedAt: '2 weeks ago',
    executionCount: 3,
  },
  {
    id: '6',
    title: 'Quick Sort',
    language: 'python',
    updatedAt: '2 weeks ago',
    executionCount: 15,
  },
];

export const mockRecentExecutions: RecentExecution[] = [
  {
    id: 'e1',
    projectTitle: 'Fibonacci Recursion',
    language: 'javascript',
    status: 'COMPLETED',
    stepCount: 42,
    durationMs: 1240,
    createdAt: '10 min ago',
  },
  {
    id: 'e2',
    projectTitle: 'Binary Search',
    language: 'javascript',
    status: 'COMPLETED',
    stepCount: 18,
    durationMs: 320,
    createdAt: '1 hour ago',
  },
  {
    id: 'e3',
    projectTitle: 'Merge Sort',
    language: 'python',
    status: 'FAILED',
    stepCount: 0,
    durationMs: 0,
    createdAt: '3 hours ago',
  },
];

export const defaultSampleCode = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function main() {
  const result = fibonacci(5);
  console.log(result);
}

main();`;
