/**
 * AI Service — Section 9.5
 * Claude Opus 4 with streaming SSE, Redis cache, DB persistence.
 */
import OpenAI from 'openai';
import { createHash } from 'crypto';
import { prisma } from '../config/prisma';
import { redis } from '../config/redis';
import { logger } from '../utils/logger';
import { summarizeTrace } from './trace-summarizer';
import {
  SYSTEM_PROMPT,
  buildExplainMessages,
  buildDebugMessages,
  buildComplexityMessages,
} from './prompts';
import type { FlowTrace } from '../execution/types';

// ── OpenAI / OpenRouter client ───────────────────────────────────────────────

const openai = new OpenAI({
  baseURL: process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY || '',
  defaultHeaders: {
    'HTTP-Referer': 'https://flowmind.dev',
    'X-Title': 'FlowMind',
  },
});

// OpenRouter model endpoints
const OPUS_MODEL = 'anthropic/claude-3.5-sonnet'; // Claude 3.5 Sonnet
const HAIKU_MODEL = 'anthropic/claude-3-haiku';   // Claude 3 Haiku

// ── Cache helpers ────────────────────────────────────────────────────────────

function cacheKey(feature: string, ...parts: string[]): string {
  const hash = createHash('sha256')
    .update(parts.join('|'))
    .digest('hex')
    .slice(0, 16);
  return `ai:${feature}:${hash}`;
}

function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

// ── SSE event emitter ────────────────────────────────────────────────────────

export type SSEEmitter = (event: string) => void;

// ── Main AI service ──────────────────────────────────────────────────────────

export const aiService = {
  /**
   * Stream an execution explanation via SSE.
   * Caches result in Redis for 24h (same code + trace → instant replay).
   */
  async explain(params: {
    userId: string;
    projectId: string;
    executionId: string;
    code: string;
    trace: FlowTrace;
    emit: SSEEmitter;
  }): Promise<void> {
    const { userId, projectId, executionId, code, trace, emit } = params;
    const summary = summarizeTrace(trace);
    const key = cacheKey('explain', code, executionId);

    // Cache hit — stream cached response instantly
    const cached = await redis.get(key);
    if (cached) {
      logger.info('AI explain cache hit', { executionId });
      // Stream in 100-char chunks to simulate streaming
      for (let i = 0; i < cached.length; i += 80) {
        emit(`data: ${JSON.stringify({ text: cached.slice(i, i + 80) })}\n\n`);
        await new Promise((r) => setTimeout(r, 10));
      }
      emit('data: [DONE]\n\n');
      return;
    }

    const messages = buildExplainMessages(code, summary);
    let fullResponse = '';

    try {
      const stream = await openai.chat.completions.create({
        model: OPUS_MODEL,
        max_tokens: 1500,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      });

      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content || '';
        if (text) {
          fullResponse += text;
          emit(`data: ${JSON.stringify({ text })}\n\n`);
        }
      }

      emit('data: [DONE]\n\n');

      // Cache + persist async (don't block the response)
      setImmediate(async () => {
        try {
          await redis.setex(key, 86400, fullResponse); // 24h TTL
          await prisma.aIChatMessage.create({
            data: {
              projectId,
              userId,
              executionId,
              role: 'assistant',
              content: fullResponse,
              type: 'EXPLANATION',
              tokenCount: estimateTokens(fullResponse),
            },
          });
        } catch (err) {
          logger.error('AI persist error', { message: (err as Error).message });
        }
      });

      logger.info('AI explain completed', { executionId, chars: fullResponse.length });
    } catch (err) {
      logger.error('AI explain error', { message: (err as Error).message });
      emit(`data: ${JSON.stringify({ error: 'AI service error. Please try again.' })}\n\n`);
      emit('data: [DONE]\n\n');
    }
  },

  /**
   * Stream a chat response via SSE.
   * Loads conversation history from DB for context.
   */
  async chat(params: {
    userId: string;
    projectId: string;
    executionId?: string;
    message: string;
    code: string;
    trace?: FlowTrace | null;
    emit: SSEEmitter;
  }): Promise<void> {
    const { userId, projectId, executionId, message, code, trace, emit } = params;

    // Load recent conversation history (last 10 messages)
    const history = await prisma.aIChatMessage.findMany({
      where: { projectId, userId },
      orderBy: { createdAt: 'asc' },
      take: 10,
      select: { role: true, content: true },
    });

    const summary = trace ? summarizeTrace(trace) : null;
    const messages = buildDebugMessages(
      code,
      summary ?? {
        totalSteps: 0,
        durationMs: 0,
        functionCalls: [],
        output: '',
        keySteps: [],
        finalVariables: {},
        maxDepth: 0,
        hadException: false,
        language: 'javascript',
      },
      message,
      history.map((h) => ({ role: h.role as 'user' | 'assistant', content: h.content })),
    );

    let fullResponse = '';

    // Persist user message first
    await prisma.aIChatMessage.create({
      data: {
        projectId,
        userId,
        executionId: executionId ?? undefined,
        role: 'user',
        content: message,
        type: 'CHAT',
        tokenCount: estimateTokens(message),
      },
    });

    try {
      const stream = await openai.chat.completions.create({
        model: OPUS_MODEL,
        max_tokens: 2000,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      });

      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content || '';
        if (text) {
          fullResponse += text;
          emit(`data: ${JSON.stringify({ text })}\n\n`);
        }
      }

      emit('data: [DONE]\n\n');

      // Persist assistant response
      setImmediate(async () => {
        try {
          await prisma.aIChatMessage.create({
            data: {
              projectId,
              userId,
              executionId: executionId ?? undefined,
              role: 'assistant',
              content: fullResponse,
              type: 'CHAT',
              tokenCount: estimateTokens(fullResponse),
            },
          });
        } catch (err) {
          logger.error('AI chat persist error', { message: (err as Error).message });
        }
      });
    } catch (err) {
      logger.error('AI chat error', { message: (err as Error).message });
      emit(`data: ${JSON.stringify({ error: 'AI service error. Please try again.' })}\n\n`);
      emit('data: [DONE]\n\n');
    }
  },

  /**
   * Get conversation history for a project.
   */
  async getHistory(projectId: string, userId: string) {
    const messages = await prisma.aIChatMessage.findMany({
      where: { projectId, userId },
      orderBy: { createdAt: 'asc' },
      take: 50,
      select: {
        id: true,
        role: true,
        content: true,
        type: true,
        createdAt: true,
      },
    });
    return { data: messages };
  },

  /**
   * Clear conversation history for a project.
   */
  async clearHistory(projectId: string, userId: string) {
    await prisma.aIChatMessage.deleteMany({ where: { projectId, userId } });
  },

  /**
   * Stream a complexity analysis via SSE.
   * Uses HAIKU_MODEL (cheaper) and caches for 7 days.
   */
  async analyzeComplexity(params: {
    userId: string;
    projectId: string;
    executionId: string;
    code: string;
    trace: FlowTrace;
    emit: SSEEmitter;
  }): Promise<void> {
    const { userId, projectId, executionId, code, trace, emit } = params;
    const summary = summarizeTrace(trace);
    const key = cacheKey('complexity', code, executionId);

    // Cache hit — stream cached response instantly
    const cached = await redis.get(key);
    if (cached) {
      logger.info('AI complexity cache hit', { executionId });
      for (let i = 0; i < cached.length; i += 80) {
        emit(`data: ${JSON.stringify({ text: cached.slice(i, i + 80) })}\n\n`);
        await new Promise((r) => setTimeout(r, 10));
      }
      emit('data: [DONE]\n\n');
      return;
    }

    const messages = buildComplexityMessages(code, summary);
    let fullResponse = '';

    try {
      const stream = await openai.chat.completions.create({
        model: HAIKU_MODEL,
        max_tokens: 1200,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      });

      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content || '';
        if (text) {
          fullResponse += text;
          emit(`data: ${JSON.stringify({ text })}\n\n`);
        }
      }

      emit('data: [DONE]\n\n');

      // Cache for 7 days + persist async
      setImmediate(async () => {
        try {
          await redis.setex(key, 604800, fullResponse); // 7-day TTL
          await prisma.aIChatMessage.create({
            data: {
              projectId,
              userId,
              executionId,
              role: 'assistant',
              content: fullResponse,
              type: 'COMPLEXITY',
              tokenCount: estimateTokens(fullResponse),
            },
          });
        } catch (err) {
          logger.error('AI complexity persist error', { message: (err as Error).message });
        }
      });

      logger.info('AI complexity completed', { executionId, chars: fullResponse.length });
    } catch (err) {
      logger.error('AI complexity error', { message: (err as Error).message });
      emit(`data: ${JSON.stringify({ error: 'AI service error. Please try again.' })}\n\n`);
      emit('data: [DONE]\n\n');
    }
  },
};
