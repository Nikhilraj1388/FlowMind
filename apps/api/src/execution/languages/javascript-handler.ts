/**
 * JavaScript language handler — Section 7.4 / 7.5
 */
import { createHash } from 'crypto';
import { containerManager } from '../container-manager';
import { instrumentJavaScript } from '../instrumentation/javascript/instrumenter';
import { validateCode } from '../validator';
import { TraceProcessor } from '../trace-processor';
import type { LanguageHandler, ExecuteParams, ExecuteResult, ValidationResult } from '../types';

const traceProcessor = new TraceProcessor();

export const javascriptHandler: LanguageHandler = {
  language: 'JAVASCRIPT',
  fileExtension: 'js',
  maxCodeSize: 102_400,
  defaultTimeoutMs: 10_000,
  memoryLimitMb: 256,

  validate(code: string): ValidationResult {
    return validateCode(code, 'JAVASCRIPT');
  },

  instrument(code: string, executionId: string) {
    const { code: instrumented, error } = instrumentJavaScript(code);
    if (error) {
      // Syntax error — return as-is, container will report the error
      return { code };
    }
    return { code: instrumented };
  },

  async execute(params: ExecuteParams): Promise<ExecuteResult> {
    const { executionId, code, timeoutMs } = params;
    const startedAt = new Date().toISOString();

    // Validate
    const validation = this.validate(code);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    // Instrument
    const { code: instrumentedCode } = this.instrument(code, executionId);

    // Run in Docker
    const result = await containerManager.execute({
      executionId,
      language: 'JAVASCRIPT',
      instrumentedCode,
      stdin: params.stdin,
      timeoutMs: timeoutMs ?? this.defaultTimeoutMs,
    });

    const completedAt = new Date().toISOString();

    // Parse and build FlowTrace
    const trace = traceProcessor.process(
      result.traceJson,
      {
        language: 'javascript',
        executionId,
        startedAt,
        completedAt,
        durationMs: result.durationMs,
        exitCode: result.exitCode,
        instrumentationVersion: '1.0.0',
      },
      {
        original: code,
        lineCount: code.split('\n').length,
        hash: `sha256:${createHash('sha256').update(code).digest('hex')}`,
      },
    );

    return {
      trace,
      stdout: result.stdout,
      stderr: result.stderr,
      exitCode: result.exitCode,
      durationMs: result.durationMs,
    };
  },
};
