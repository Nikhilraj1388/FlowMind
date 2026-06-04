import { Router } from 'express';
import type { AuthenticatedRequest } from '../middleware/auth';
import type { Response, NextFunction, Request } from 'express';
import { prisma } from '../config/prisma';
import type { FlowTrace } from '../execution/types';

/**
 * AI routes — Section 9 / 11.5
 * Mounted at /api/v1/ai (auth applied in app.ts).
 *
 * POST /explain                   → SSE stream for code explanation
 * POST /chat                      → SSE stream for AI chat
 * GET  /conversations/:projectId  → Get conversation history
 * POST /analyze-complexity        → SSE stream for complexity analysis
 *
 * AI service implementation is in ../ai/ai.service.ts
 */
const router = Router();

const asAuth = (req: Request) => req as unknown as AuthenticatedRequest;

/** Helper: set up SSE headers and return an emit function. */
function setupSSE(res: Response): (event: string) => void {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  return (event: string) => {
    res.write(event);
  };
}

/** POST /api/v1/ai/explain — Explain code via SSE stream. */
router.post('/explain', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { aiService } = await import('../ai/ai.service');
    const authReq = asAuth(req);
    const userId = authReq.user.id;
    const { executionId, projectId } = req.body as { executionId: string; projectId: string };

    // Fetch execution to get code and trace data
    const execution = await prisma.execution.findUnique({
      where: { id: executionId },
      select: { code: true, traceData: true },
    });

    if (!execution) {
      res.status(404).json({ error: { message: 'Execution not found' } });
      return;
    }

    const emit = setupSSE(res);

    await aiService.explain({
      userId,
      projectId,
      executionId,
      code: execution.code,
      trace: execution.traceData as unknown as FlowTrace,
      emit,
    });

    res.end();
  } catch (err) {
    next(err);
  }
});

/** POST /api/v1/ai/chat — Chat with AI via SSE stream. */
router.post('/chat', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { aiService } = await import('../ai/ai.service');
    const authReq = asAuth(req);
    const userId = authReq.user.id;
    const { message, projectId, executionId } = req.body as {
      message: string;
      projectId: string;
      executionId?: string;
    };

    // If executionId is provided, load execution for code + trace context
    let code = '';
    let trace: FlowTrace | null = null;

    if (executionId) {
      const execution = await prisma.execution.findUnique({
        where: { id: executionId },
        select: { code: true, traceData: true },
      });

      if (execution) {
        code = execution.code;
        trace = execution.traceData as unknown as FlowTrace;
      }
    }

    const emit = setupSSE(res);

    await aiService.chat({
      userId,
      projectId,
      executionId,
      message,
      code,
      trace,
      emit,
    });

    res.end();
  } catch (err) {
    next(err);
  }
});

/** GET /api/v1/ai/conversations/:projectId — Get conversation history. */
router.get('/conversations/:projectId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { aiService } = await import('../ai/ai.service');
    const authReq = asAuth(req);
    const userId = authReq.user.id;
    const { projectId } = req.params;

    const result = await aiService.getHistory(projectId, userId);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

/** POST /api/v1/ai/analyze-complexity — Analyze code complexity via SSE stream. */
router.post('/analyze-complexity', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { aiService } = await import('../ai/ai.service');
    const authReq = asAuth(req);
    const userId = authReq.user.id;
    const { executionId, projectId } = req.body as { executionId: string; projectId: string };

    // Fetch execution to get code and trace data
    const execution = await prisma.execution.findUnique({
      where: { id: executionId },
      select: { code: true, traceData: true },
    });

    if (!execution) {
      res.status(404).json({ error: { message: 'Execution not found' } });
      return;
    }

    const emit = setupSSE(res);

    await aiService.analyzeComplexity({
      userId,
      projectId,
      executionId,
      code: execution.code,
      trace: execution.traceData as unknown as FlowTrace,
      emit,
    });

    res.end();
  } catch (err) {
    next(err);
  }
});

export { router as aiRoutes };
