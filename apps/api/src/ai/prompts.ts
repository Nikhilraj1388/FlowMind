/**
 * Prompt templates — Section 9.3
 * All prompts ground Claude in actual trace data — never invent execution paths.
 */
import type { TraceSummary } from './trace-summarizer';

const SYSTEM_PROMPT = `You are FlowMind AI, an expert code execution analyst built into an interactive code visualization platform.

You explain code behavior based STRICTLY on the actual execution trace provided — never invent steps, variable values, or control flow paths that aren't in the trace data.

Rules:
- Reference specific step numbers, function names, and variable values from the trace
- Explain WHY conditional branches were taken (based on actual values)
- Highlight key variable mutations and recursion patterns
- Use clear, educational language with markdown formatting
- Keep explanations concise but thorough
- If the code has errors, explain what went wrong based on the actual error in the trace`;

export function buildExplainMessages(
  code: string,
  summary: TraceSummary,
): Array<{ role: 'user' | 'assistant'; content: string }> {
  const prompt = `Explain the execution of this ${summary.language} code:

\`\`\`${summary.language}
${code.slice(0, 3000)}
\`\`\`

**Execution Summary:**
- Total steps traced: ${summary.totalSteps}
- Duration: ${summary.durationMs}ms
- Functions called: ${summary.functionCalls.join(', ') || 'none'}
- Max recursion depth: ${summary.maxDepth}
- Had exception: ${summary.hadException}
- Final output: ${summary.output || '(none)'}

**Key Execution Steps (sampled):**
${summary.keySteps.map((s) => `Step ${s.index} [${s.type}] L${s.line}: ${s.description}`).join('\n')}

${summary.hadException ? '⚠️ The execution encountered an error — explain what went wrong.' : ''}

Please explain what this code does and how it executes step by step.`;

  return [{ role: 'user', content: prompt }];
}

export function buildDebugMessages(
  code: string,
  summary: TraceSummary,
  userMessage: string,
  history: Array<{ role: 'user' | 'assistant'; content: string }>,
): Array<{ role: 'user' | 'assistant'; content: string }> {
  const context = `[Code context - ${summary.language}]
\`\`\`${summary.language}
${code.slice(0, 2000)}
\`\`\`
Execution: ${summary.totalSteps} steps, depth ${summary.maxDepth}, output: "${summary.output.slice(0, 200)}"
${summary.hadException ? `Error occurred during execution.` : ''}`;

  const messages: Array<{ role: 'user' | 'assistant'; content: string }> = [];

  // First turn — inject context
  if (history.length === 0) {
    messages.push({ role: 'user', content: `${context}\n\n${userMessage}` });
  } else {
    // Subsequent turns — append history with context prefix on first user message
    messages.push(...history);
    messages.push({ role: 'user', content: userMessage });
  }

  return messages;
}

export function buildComplexityMessages(
  code: string,
  summary: TraceSummary,
): Array<{ role: 'user' | 'assistant'; content: string }> {
  return [
    {
      role: 'user',
      content: `Analyze the time and space complexity of this ${summary.language} code:

\`\`\`${summary.language}
${code.slice(0, 2000)}
\`\`\`

Execution data: ${summary.totalSteps} steps traced, max depth ${summary.maxDepth}, ${summary.functionCalls.length} unique functions.

Provide Big-O analysis with brief justification.`,
    },
  ];
}

export { SYSTEM_PROMPT };
