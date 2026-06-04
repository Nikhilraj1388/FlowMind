/**
 * AI controller — Section 9 SSE endpoints
 */
import type { Response, NextFunction } from 'express';
import type { AuthenticatedRequest } from '../middleware/auth';
import { aiService } from '../ai/ai.service';
import { prisma } from '../config/prisma';
import { explainSchema, chatSchema } from '../validation/ai.schema';
import { NotFoundError, ForbiddenError } from '../utils/errors';
import type { FlowTrace } from '../execution/types';

/** Set SSE headers and return a flush emitter */
function setupSSE(res: Response): (event: string) => void {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.flushHeaders();

  return (event: string) => {
    if (!res.writableEnded) res.write(event);
  };
}

export const aiController = {
  /**
   * POST /api/v1/ai/explain
   * Streams an explanation of the latest execution for a project.
   */
  async explain(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { executionId, projectId } = explainSchema.parse(req.body);

      // Fetch execution + verify ownership
      const execution = await prisma.execution.findUnique({ where: { id: executionId } });
      if (!execution) throw new NotFoundError('Execution');
      if (execution.userId !== req.user.id) throw new ForbiddenError();
      if (!execution.traceData) {
        res.status(422).json({ error: { code: 'NO_TRACE', message: 'Execution has no trace data yet' } });
        return;
      }

      // Fetch project code
      const project = await prisma.project.findUnique({ where: { id: projectId } });
      const code = project?.code ?? execution.code;

      const emit = setupSSE(res);

      await aiService.explain({
        userId: req.user.id,
        projectId,
        executionId,
        code,
        trace: execution.traceData as unknown as FlowTrace,
        emit,
      });

      res.end();
    } catch (err) {
      next(err);
    }
  },

  /**
   * POST /api/v1/ai/chat
   * Streams a chat response grounded in the current execution trace.
   */
  async chat(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { projectId, executionId, message } = chatSchema.parse(req.body);

      // Optionally load trace if executionId provided
      let trace: FlowTrace | null = null;
      let code = '';

      if (executionId) {
        const execution = await prisma.execution.findUnique({ where: { id: executionId } });
        if (execution && execution.userId === req.user.id) {
          trace = execution.traceData as unknown as FlowTrace | null;
          code = execution.code;
        }
      }

      if (!code) {
        const project = await prisma.project.findUnique({ where: { id: projectId } });
        code = project?.code ?? '';
      }

      const emit = setupSSE(res);

      await aiService.chat({
        userId: req.user.id,
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
  },

  /**
   * GET /api/v1/ai/conversations/:projectId
   */
  async getConversation(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await aiService.getHistory(req.params.projectId as string, req.user.id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  /**
   * DELETE /api/v1/ai/conversations/:projectId
   */
  async clearConversation(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      await aiService.clearHistory(req.params.projectId as string, req.user.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
