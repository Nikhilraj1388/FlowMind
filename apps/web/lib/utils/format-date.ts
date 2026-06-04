/**
 * Relative date formatter — converts ISO strings to human-readable "X ago" format.
 */
export function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

/**
 * Map API uppercase language to display label.
 */
const languageDisplayNames: Record<string, string> = {
  JAVASCRIPT: 'JavaScript',
  PYTHON: 'Python',
  CPP: 'C++',
  JAVA: 'Java',
  javascript: 'JavaScript',
  python: 'Python',
  cpp: 'C++',
  java: 'Java',
};

export function formatLanguageLabel(language: string): string {
  return languageDisplayNames[language] ?? language;
}
