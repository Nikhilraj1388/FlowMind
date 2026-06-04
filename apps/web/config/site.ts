export const siteConfig = {
  name: 'FlowMind',
  description:
    'AI-powered multi-language code execution visualization. Understand algorithms through animated graphs, variable tracking, and trace-grounded explanations.',
  url: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  links: {
    github: 'https://github.com',
    docs: '#',
  },
} as const;

export const languages = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
] as const;
