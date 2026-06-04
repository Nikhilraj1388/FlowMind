import type { Edge, Node } from '@xyflow/react';

/** Mock graph data for UI placeholder — replaced by trace builder in Phase 8 */

export const mockNodes: Node[] = [
  { id: '1', position: { x: 250, y: 0 }, data: { label: 'main()' }, type: 'default' },
  { id: '2', position: { x: 100, y: 100 }, data: { label: 'fib(5)' }, type: 'default' },
  { id: '3', position: { x: 400, y: 100 }, data: { label: 'n <= 1?' }, type: 'default' },
  { id: '4', position: { x: 250, y: 200 }, data: { label: 'return' }, type: 'default' },
];

export const mockEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e3-4', source: '3', target: '4', animated: true },
];
