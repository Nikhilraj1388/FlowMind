/**
 * Python language handler — Section 7.4 / 7.6
 * Instrumentation is done inside the container using the Python instrumenter.py script.
 */
import { createHash } from 'crypto';
import { containerManager } from '../container-manager';
import { validateCode } from '../validator';
import { TraceProcessor } from '../trace-processor';
import type { LanguageHandler, ExecuteParams, ExecuteResult, ValidationResult, InstrumentResult } from '../types';

const traceProcessor = new TraceProcessor();

export const pythonHandler: LanguageHandler = {
  language: 'PYTHON',
  fileExtension: 'py',
  maxCodeSize: 102_400,
  defaultTimeoutMs: 10_000,
  memoryLimitMb: 256,

  validate(code: string): ValidationResult {
    return validateCode(code, 'PYTHON');
  },

  instrument(code: string, _executionId: string): InstrumentResult {
    // Python instrumentation happens inside the container via instrumenter.py
    // The containerManager runs: python instrumenter.py user_code.py instrumented_code.py
    // Here we just prepend the sys.path insert header manually for simple cases
    const header = `import sys as _sys\n_sys.path.insert(0, '/opt/flowmind')\nfrom trace_collector import trace\n\n`;
    return { code: header + code };
  },

  async execute(params: ExecuteParams): Promise<ExecuteResult> {
    const { executionId, code, timeoutMs } = params;
    const startedAt = new Date().toISOString();

    const validation = this.validate(code);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    const { code: instrumentedCode } = this.instrument(code, executionId);

    const result = await containerManager.execute({
      executionId,
      language: 'PYTHON',
      instrumentedCode,
      stdin: params.stdin,
      timeoutMs: timeoutMs ?? this.defaultTimeoutMs,
    });

    const completedAt = new Date().toISOString();

    const trace = traceProcessor.process(
      result.traceJson,
      {
        language: 'python',
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
