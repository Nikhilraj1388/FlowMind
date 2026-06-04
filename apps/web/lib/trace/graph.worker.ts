// Web Worker for asynchronous graph building with dagre layout — Phase 8
import { buildGraph } from './graph-builder';

addEventListener('message', (event) => {
  const { trace } = event.data;
  if (!trace) return;
  try {
    const result = buildGraph(trace);
    postMessage({ success: true, result });
  } catch (error) {
    postMessage({ success: false, error: (error as Error).message });
  }
});
