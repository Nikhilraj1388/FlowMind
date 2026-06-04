/**
 * Docker Container Manager — Section 7.3
 * Manages the full lifecycle of sandboxed execution containers.
 */
import Dockerode from 'dockerode';
import { createHash } from 'crypto';
import path from 'path';
import { logger } from '../utils/logger';
import { ExecutionError } from '../utils/errors';
import type { Language, ContainerResult } from './types';

// ── Security config per Section 7.3 ─────────────────────────────────────────

const MEMORY_LIMITS: Record<Language, number> = {
  JAVASCRIPT: 256 * 1024 * 1024,  // 256 MB
  PYTHON: 256 * 1024 * 1024,
  CPP: 256 * 1024 * 1024,
  JAVA: 512 * 1024 * 1024,         // 512 MB (JVM overhead)
};

const TIMEOUT_MS: Record<Language, number> = {
  JAVASCRIPT: 10_000,
  PYTHON: 10_000,
  CPP: 15_000,
  JAVA: 15_000,
};

const IMAGE_MAP: Record<Language, string> = {
  JAVASCRIPT: 'flowmind-node:latest',
  PYTHON: 'flowmind-python:latest',
  CPP: 'flowmind-node:latest',   // placeholder — C++ Phase 7+
  JAVA: 'flowmind-node:latest',  // placeholder — Java Phase 7+
};

const FILE_MAP: Record<Language, string> = {
  JAVASCRIPT: 'user_code.js',
  PYTHON: 'user_code.py',
  CPP: 'user_code.cpp',
  JAVA: 'UserCode.java',
};

// ── Container manager ────────────────────────────────────────────────────────

export class ContainerManager {
  private docker: Dockerode;

  constructor() {
    // On Windows Docker Desktop, the named pipe path is used
    this.docker = new Dockerode(
      process.platform === 'win32'
        ? { socketPath: '//./pipe/docker_engine' }
        : { socketPath: '/var/run/docker.sock' },
    );
  }

  /**
   * Execute instrumented code in a sandboxed container.
   * Full lifecycle: create → copy code → start → wait → extract trace → remove.
   */
  async execute(params: {
    executionId: string;
    language: Language;
    instrumentedCode: string;
    stdin?: string;
    timeoutMs?: number;
  }): Promise<ContainerResult> {
    const { executionId, language, instrumentedCode, timeoutMs } = params;
    const timeout = timeoutMs ?? TIMEOUT_MS[language];
    const memLimit = MEMORY_LIMITS[language];
    const image = IMAGE_MAP[language];
    const filename = FILE_MAP[language];

    const startTime = Date.now();
    let container: Dockerode.Container | null = null;

    try {
      // 1. Create container
      container = await this.docker.createContainer({
        Image: image,
        name: `flowmind-exec-${executionId}`,
        Cmd: this.getRunCommand(language, filename),
        AttachStdout: true,
        AttachStderr: true,
        OpenStdin: false,
        HostConfig: {
          Memory: memLimit,
          MemorySwap: memLimit,         // no swap
          CpuQuota: 50000,              // 0.5 CPU
          CpuPeriod: 100000,
          NetworkMode: 'none',          // no network
          ReadonlyRootfs: false,        // needs /tmp writeable
          Tmpfs: { '/tmp': 'size=50m,mode=1777' },
          SecurityOpt: ['no-new-privileges'],
          CapDrop: ['ALL'],
          PidsLimit: 64,
          AutoRemove: false,
        },
        User: '1001:1001',
      });

      // 2. Copy instrumented code into container /tmp/<filename>
      await this.copyFileToContainer(container, filename, instrumentedCode);

      // 3. Start container
      await container.start();

      // 4. Wait for completion or timeout
      const result = await this.waitWithTimeout(container, timeout);

      // 5. Extract trace.json written by the collector runtime
      const traceJson = await this.extractTrace(container);

      return {
        stdout: result.stdout,
        stderr: result.stderr,
        exitCode: result.exitCode,
        durationMs: Date.now() - startTime,
        traceJson,
      };
    } catch (err) {
      if ((err as Error).message?.includes('ETIMEDOUT') || (err as Error).message?.includes('timeout')) {
        throw new ExecutionError('Execution timed out', { timeoutMs: timeout });
      }
      logger.error('Container execution error', { executionId, message: (err as Error).message });
      throw err;
    } finally {
      if (container) {
        container.remove({ force: true }).catch(() => {/* ignore cleanup errors */});
      }
    }
  }

  /** Copy a single file into a running/stopped container via tar stream. */
  private async copyFileToContainer(
    container: Dockerode.Container,
    filename: string,
    content: string,
  ): Promise<void> {
    // Build a minimal tar archive in-memory
    const tar = buildTar(filename, content);
    await container.putArchive(tar, { path: '/tmp' });
  }

  /** Wait for container exit, collecting stdout/stderr, with timeout. */
  private async waitWithTimeout(
    container: Dockerode.Container,
    timeoutMs: number,
  ): Promise<{ stdout: string; stderr: string; exitCode: number }> {
    const logs = await container.logs({
      follow: true,
      stdout: true,
      stderr: true,
    });

    const stdoutChunks: Buffer[] = [];
    const stderrChunks: Buffer[] = [];

    const MAX_OUTPUT = 1024 * 1024; // 1 MB per stream

    await new Promise<void>((resolve, reject) => {
      const timer = setTimeout(() => {
        container.kill().catch(() => {});
        reject(new Error('timeout'));
      }, timeoutMs);

      (container as unknown as { modem: { demuxStream(stream: NodeJS.ReadableStream, stdout: NodeJS.WritableStream, stderr: NodeJS.WritableStream): void } }).modem.demuxStream(
        logs as unknown as NodeJS.ReadableStream,
        {
          write(chunk: Buffer) {
            if (stdoutChunks.reduce((a, c) => a + c.length, 0) < MAX_OUTPUT) {
              stdoutChunks.push(chunk);
            }
          },
        } as NodeJS.WritableStream,
        {
          write(chunk: Buffer) {
            if (stderrChunks.reduce((a, c) => a + c.length, 0) < MAX_OUTPUT) {
              stderrChunks.push(chunk);
            }
          },
        } as NodeJS.WritableStream,
      );

      (logs as NodeJS.ReadableStream).on('end', () => {
        clearTimeout(timer);
        resolve();
      });

      (logs as NodeJS.ReadableStream).on('error', (err) => {
        clearTimeout(timer);
        reject(err);
      });
    });

    const waitResult = await container.wait();

    return {
      stdout: Buffer.concat(stdoutChunks).toString('utf8'),
      stderr: Buffer.concat(stderrChunks).toString('utf8'),
      exitCode: waitResult.StatusCode,
    };
  }

  /** Extract /tmp/trace.json from the container after execution. */
  private async extractTrace(container: Dockerode.Container): Promise<string | null> {
    try {
      const stream = await container.getArchive({ path: '/tmp/trace.json' });
      const chunks: Buffer[] = [];
      await new Promise<void>((resolve, reject) => {
        (stream as NodeJS.ReadableStream).on('data', (chunk: Buffer) => chunks.push(chunk));
        (stream as NodeJS.ReadableStream).on('end', resolve);
        (stream as NodeJS.ReadableStream).on('error', reject);
      });
      // Untar the single-file tar archive
      const tarBuf = Buffer.concat(chunks);
      return extractFileFromTar(tarBuf, 'trace.json');
    } catch {
      return null;
    }
  }

  private getRunCommand(language: Language, filename: string): string[] {
    switch (language) {
      case 'JAVASCRIPT':
        return ['node', `/tmp/${filename}`];
      case 'PYTHON':
        return ['python', `/tmp/${filename}`];
      default:
        return ['node', `/tmp/${filename}`];
    }
  }
}

// ── Minimal in-memory tar builder ────────────────────────────────────────────

/**
 * Builds a minimal POSIX tar archive containing a single file.
 * Used to copy code into the container without touching the host filesystem.
 */
function buildTar(filename: string, content: string): Buffer {
  const contentBuf = Buffer.from(content, 'utf8');
  const nameBytes = Buffer.alloc(100);
  Buffer.from(filename).copy(nameBytes);

  // Encode size in octal, padded to 11 chars + null
  const sizeStr = contentBuf.length.toString(8).padStart(11, '0');

  const header = Buffer.alloc(512, 0);
  nameBytes.copy(header, 0);                          // name
  Buffer.from('0000755\0').copy(header, 100);          // mode
  Buffer.from('0001750\0').copy(header, 108);          // uid
  Buffer.from('0001750\0').copy(header, 116);          // gid
  Buffer.from(sizeStr + '\0').copy(header, 124);       // size
  Buffer.from('00000000000\0').copy(header, 136);      // mtime
  header[156] = 0x30;                                  // type = regular file
  Buffer.from('ustar\0').copy(header, 257);            // magic

  // Compute checksum
  let checksum = 0;
  for (let i = 0; i < 512; i++) checksum += header[i];
  Buffer.from(checksum.toString(8).padStart(6, '0') + '\0 ').copy(header, 148);

  // Pad content to 512-byte blocks
  const paddedSize = Math.ceil(contentBuf.length / 512) * 512;
  const contentPadded = Buffer.alloc(paddedSize, 0);
  contentBuf.copy(contentPadded);

  // Two 512-byte zero blocks = end of archive
  return Buffer.concat([header, contentPadded, Buffer.alloc(1024, 0)]);
}

/**
 * Extract a named file from a tar archive buffer.
 * Handles the simple single-file tar produced by Docker getArchive.
 */
function extractFileFromTar(tarBuf: Buffer, targetName: string): string | null {
  let offset = 0;
  while (offset + 512 <= tarBuf.length) {
    const header = tarBuf.slice(offset, offset + 512);
    const name = header.slice(0, 100).toString('utf8').replace(/\0+$/, '');
    const sizeOctal = header.slice(124, 136).toString('utf8').replace(/\0+$/, '').trim();
    const size = parseInt(sizeOctal, 8);
    if (!name && size === 0) break;

    const dataOffset = offset + 512;
    const paddedSize = Math.ceil(size / 512) * 512;

    if (name === targetName || name.endsWith('/' + targetName)) {
      return tarBuf.slice(dataOffset, dataOffset + size).toString('utf8');
    }
    offset = dataOffset + paddedSize;
  }
  return null;
}

export const containerManager = new ContainerManager();
