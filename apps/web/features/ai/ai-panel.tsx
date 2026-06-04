'use client';

/**
 * AI Panel — Phase 9
 * Shows streaming Claude Opus 4 explanations + interactive chat + complexity analysis.
 * Auto-explains on every completed execution.
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { Brain, Send, Sparkles, Loader2, StopCircle, Trash2, BarChart3 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { VariablePanel } from '@/features/visualization/variable-panel';
import { useAIStream } from '@/hooks/use-ai-stream';
import { useExecutionStore } from '@/store/execution-store';
import { cn } from '@/lib/utils';

// ── Simple markdown renderer (bold + line breaks only) ───────────────────────
function Markdown({ text }: { text: string }) {
  const lines = text.split('\n');
  return (
    <div className="space-y-1 text-sm leading-relaxed">
      {lines.map((line, i) => {
        // Bold **text**
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        return (
          <p key={i} className={line.startsWith('## ') ? 'font-semibold text-foreground mt-2' : line.startsWith('- ') ? 'pl-3' : ''}>
            {parts.map((part, j) =>
              part.startsWith('**') && part.endsWith('**') ? (
                <strong key={j}>{part.slice(2, -2)}</strong>
              ) : (
                <span key={j}>{part.replace(/^## /, '').replace(/^- /, '• ')}</span>
              ),
            )}
          </p>
        );
      })}
    </div>
  );
}

// ── Message bubble ────────────────────────────────────────────────────────────
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
}

function MessageBubble({ msg }: { msg: Message }) {
  if (msg.role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-lg bg-[var(--electric-blue)]/20 px-3 py-2 text-sm">
          {msg.content}
        </div>
      </div>
    );
  }
  return (
    <div className="flex gap-2">
      <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--electric-blue)] to-[var(--neon-purple)]">
        <Brain className="size-3.5" />
      </div>
      <div className="min-w-0 flex-1 rounded-lg bg-muted/40 px-3 py-2">
        {msg.content ? (
          <Markdown text={msg.content} />
        ) : (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Loader2 className="size-3 animate-spin" />
            Thinking…
          </div>
        )}
        {msg.isStreaming && msg.content && (
          <span className="inline-block h-3.5 w-0.5 animate-pulse bg-current align-middle" />
        )}
      </div>
    </div>
  );
}

const SUGGESTIONS = [
  'Explain this recursion step',
  'What is the time complexity?',
  'Suggest an iterative solution',
  'Why did this branch execute?',
];

// ── Stable project ID for the demo workspace ─────────────────────────────────
const DEMO_PROJECT_ID = 'cm00000000000000000000demo1';

export function AIPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [activeTab, setActiveTab] = useState('ai');
  const [complexityText, setComplexityText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const executionStore = useExecutionStore();

  const {
    text: streamText,
    isStreaming,
    explain,
    chat,
    analyzeComplexity,
    cancel,
    reset: resetStream,
  } = useAIStream({
    onDone: (fullText) => {
      // If we're on the complexity tab, store it there
      if (activeTab === 'complexity') {
        setComplexityText(fullText);
      } else {
        setMessages((prev) =>
          prev.map((m) =>
            m.isStreaming ? { ...m, content: fullText, isStreaming: false } : m,
          ),
        );
      }
    },
  });

  // Update streaming message content in real-time
  useEffect(() => {
    if (isStreaming && streamText) {
      if (activeTab === 'complexity') {
        setComplexityText(streamText);
      } else {
        setMessages((prev) =>
          prev.map((m) => (m.isStreaming ? { ...m, content: streamText } : m)),
        );
      }
    }
  }, [streamText, isStreaming, activeTab]);

  // Auto-scroll on new content
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Auto-explain when a new execution completes
  useEffect(() => {
    if (executionStore.status !== 'completed' || !executionStore.executionId) return;

    const executionId = executionStore.executionId;
    const streamingId = `explain-${executionId}`;

    // Don't re-explain if already shown
    if (messages.some((m) => m.id === streamingId)) return;

    setActiveTab('ai');

    const placeholderMsg: Message = {
      id: streamingId,
      role: 'assistant',
      content: '',
      isStreaming: true,
    };
    setMessages((prev) => [...prev, placeholderMsg]);

    explain(executionId, DEMO_PROJECT_ID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [executionStore.status, executionStore.executionId]);

  const handleSend = useCallback(async () => {
    const msg = input.trim();
    if (!msg || isStreaming) return;
    setInput('');

    const userMsg: Message = { id: `user-${Date.now()}`, role: 'user', content: msg };
    const assistantId = `assistant-${Date.now()}`;
    const assistantMsg: Message = { id: assistantId, role: 'assistant', content: '', isStreaming: true };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);

    await chat(msg, DEMO_PROJECT_ID, executionStore.executionId ?? undefined);
  }, [input, isStreaming, chat, executionStore.executionId]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClear = () => {
    cancel();
    resetStream();
    setMessages([]);
  };

  const handleComplexityAnalysis = useCallback(() => {
    if (isStreaming || !executionStore.executionId) return;
    setComplexityText('');
    setActiveTab('complexity');
    analyzeComplexity(executionStore.executionId, DEMO_PROJECT_ID);
  }, [isStreaming, executionStore.executionId, analyzeComplexity]);

  return (
    <div className="flex h-full w-full flex-col border-l border-border/50 bg-card/20">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-1 flex-col overflow-hidden">
        <TabsList className="w-full shrink-0 rounded-none border-b border-border/50 bg-transparent">
          <TabsTrigger value="ai" className="flex-1 gap-2">
            <Brain className="size-4" />
            AI
            {isStreaming && activeTab !== 'complexity' && <Loader2 className="size-3 animate-spin text-[var(--neon-purple)]" />}
          </TabsTrigger>
          <TabsTrigger value="complexity" className="flex-1 gap-2">
            <BarChart3 className="size-4" />
            Complexity
            {isStreaming && activeTab === 'complexity' && <Loader2 className="size-3 animate-spin text-[var(--neon-purple)]" />}
          </TabsTrigger>
          <TabsTrigger value="variables" className="flex-1">
            Variables
          </TabsTrigger>
        </TabsList>

        {/* AI Tab */}
        <TabsContent value="ai" className="m-0 flex min-h-0 flex-1 flex-col overflow-hidden">
          {/* Messages */}
          <ScrollArea className="flex-1 p-3" ref={scrollRef as React.RefObject<HTMLDivElement>}>
            <div className="space-y-3">
              {messages.length === 0 && (
                <div className="py-6 text-center">
                  <Brain className="mx-auto mb-3 size-8 text-muted-foreground/40" />
                  <p className="text-xs text-muted-foreground">
                    {executionStore.status === 'idle'
                      ? 'Run your code — I\'ll explain the execution automatically'
                      : executionStore.status === 'running' || executionStore.status === 'submitting'
                      ? 'Executing your code…'
                      : 'Ask me anything about this code'}
                  </p>
                </div>
              )}

              {messages.map((msg) => (
                <MessageBubble key={msg.id} msg={msg} />
              ))}
            </div>
          </ScrollArea>

          {/* Suggestions */}
          {messages.length === 0 && (
            <div className="border-t border-border/30 px-3 py-2">
              <div className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-[var(--neon-purple)]">
                <Sparkles className="size-3" />
                Quick prompts
              </div>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setInput(s)}
                    className="rounded-full border border-border/50 px-2.5 py-1 text-xs hover:border-[var(--electric-blue)]/50 hover:bg-muted/40 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input area */}
          <div className="shrink-0 border-t border-border/50 p-3">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isStreaming ? 'Claude is responding…' : 'Ask about this execution…'}
                disabled={isStreaming}
                className={cn(
                  'flex-1 rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm outline-none',
                  'focus:ring-2 focus:ring-[var(--electric-blue)]/50 disabled:opacity-50',
                )}
                aria-label="AI chat input"
              />
              {isStreaming ? (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={cancel}
                  aria-label="Stop generation"
                  className="shrink-0 border-red-500/50 hover:bg-red-500/10"
                >
                  <StopCircle className="size-4 text-red-400" />
                </Button>
              ) : (
                <Button
                  variant="gradient"
                  size="icon"
                  onClick={handleSend}
                  disabled={!input.trim()}
                  aria-label="Send message"
                  className="shrink-0"
                >
                  <Send className="size-4" />
                </Button>
              )}
            </div>
            {messages.length > 0 && (
              <button
                type="button"
                onClick={handleClear}
                className="mt-2 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Trash2 className="size-3" />
                Clear conversation
              </button>
            )}
          </div>
        </TabsContent>

        {/* Complexity Tab */}
        <TabsContent value="complexity" className="m-0 flex min-h-0 flex-1 flex-col overflow-hidden">
          <ScrollArea className="flex-1 p-3">
            {complexityText ? (
              <Markdown text={complexityText} />
            ) : (
              <div className="py-6 text-center">
                <BarChart3 className="mx-auto mb-3 size-8 text-muted-foreground/40" />
                <p className="mb-4 text-xs text-muted-foreground">
                  {executionStore.executionId
                    ? 'Analyze the Big-O time and space complexity of your code.'
                    : 'Run your code first to analyze its complexity.'}
                </p>
                <Button
                  variant="gradient"
                  size="sm"
                  disabled={!executionStore.executionId || isStreaming}
                  onClick={handleComplexityAnalysis}
                  className="gap-2"
                >
                  <BarChart3 className="size-4" />
                  {isStreaming && activeTab === 'complexity' ? (
                    <>
                      <Loader2 className="size-3 animate-spin" />
                      Analyzing…
                    </>
                  ) : (
                    'Analyze Complexity'
                  )}
                </Button>
              </div>
            )}
            {isStreaming && activeTab === 'complexity' && complexityText && (
              <span className="inline-block h-3.5 w-0.5 animate-pulse bg-current align-middle" />
            )}
          </ScrollArea>
        </TabsContent>

        {/* Variables Tab */}
        <TabsContent value="variables" className="m-0 min-h-0 flex-1 overflow-hidden">
          <VariablePanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}
