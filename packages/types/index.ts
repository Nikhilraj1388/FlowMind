/**
 * @flowmind/types — Shared TypeScript types
 * 
 * Imported by both frontend and backend.
 * This package provides the canonical type definitions for:
 * - FlowTrace execution trace schema
 * - API request/response types
 * - Shared enums and constants
 */

// Re-export from individual modules as they are built
export type Language = 'JAVASCRIPT' | 'PYTHON' | 'CPP' | 'JAVA';

export type ExecutionStatus = 'QUEUED' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'TIMEOUT' | 'CANCELLED';

export type Plan = 'FREE' | 'PRO' | 'TEAM' | 'EDUCATION';
