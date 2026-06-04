import type { editor } from 'monaco-editor';

/**
 * FlowMind custom dark theme for Monaco Editor.
 * Matches the design system from Section 12 of the documentation.
 */
export const flowmindDarkTheme: editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: '', foreground: 'f5f5f7', background: '0a0a0f' },
    { token: 'comment', foreground: '6b7280', fontStyle: 'italic' },
    { token: 'keyword', foreground: 'c084fc' },
    { token: 'keyword.control', foreground: 'c084fc' },
    { token: 'string', foreground: '22d3ee' },
    { token: 'number', foreground: 'f59e0b' },
    { token: 'type', foreground: '60a5fa' },
    { token: 'type.identifier', foreground: '60a5fa' },
    { token: 'function', foreground: '60a5fa' },
    { token: 'variable', foreground: 'f5f5f7' },
    { token: 'constant', foreground: 'f59e0b' },
    { token: 'operator', foreground: 'a1a1aa' },
    { token: 'delimiter', foreground: 'a1a1aa' },
    { token: 'delimiter.bracket', foreground: 'a1a1aa' },
    { token: 'tag', foreground: 'ef4444' },
    { token: 'attribute.name', foreground: '60a5fa' },
    { token: 'attribute.value', foreground: '22d3ee' },
    { token: 'regexp', foreground: '22c55e' },
    /* Python specific */
    { token: 'keyword.python', foreground: 'c084fc' },
    { token: 'string.python', foreground: '22d3ee' },
    { token: 'decorator.python', foreground: 'f59e0b' },
    /* Java / C++ specific */
    { token: 'keyword.cpp', foreground: 'c084fc' },
    { token: 'keyword.java', foreground: 'c084fc' },
  ],
  colors: {
    'editor.background': '#0a0a0f',
    'editor.foreground': '#f5f5f7',
    'editor.lineHighlightBackground': '#1c1c2410',
    'editor.selectionBackground': '#60a5fa30',
    'editor.inactiveSelectionBackground': '#60a5fa15',
    'editorCursor.foreground': '#60a5fa',
    'editorWhitespace.foreground': '#27272a',
    'editorIndentGuide.background': '#27272a',
    'editorIndentGuide.activeBackground': '#52525b',
    'editorLineNumber.foreground': '#52525b',
    'editorLineNumber.activeForeground': '#a1a1aa',
    'editor.selectionHighlightBackground': '#60a5fa20',
    'editorBracketMatch.background': '#60a5fa20',
    'editorBracketMatch.border': '#60a5fa50',
    'editorGutter.background': '#0a0a0f',
    'editorWidget.background': '#121218',
    'editorWidget.border': '#27272a',
    'editorSuggestWidget.background': '#121218',
    'editorSuggestWidget.border': '#27272a',
    'editorSuggestWidget.selectedBackground': '#1c1c24',
    'editorHoverWidget.background': '#121218',
    'editorHoverWidget.border': '#27272a',
    'scrollbar.shadow': '#00000000',
    'scrollbarSlider.background': '#52525b40',
    'scrollbarSlider.hoverBackground': '#52525b80',
    'scrollbarSlider.activeBackground': '#52525bcc',
    'minimap.background': '#0a0a0f',
  },
};

/** Register FlowMind theme with Monaco instance */
export function registerFlowMindTheme(monaco: typeof import('monaco-editor')) {
  monaco.editor.defineTheme('flowmind-dark', flowmindDarkTheme);
}
