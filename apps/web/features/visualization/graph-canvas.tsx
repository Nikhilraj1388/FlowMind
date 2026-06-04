'use client';

/**
 * GraphCanvas — Phase 8
 * Renders execution graph using a Web Worker with dagre layout for premium performance.
 * Falls back to mock graph when no trace is loaded.
 */
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  type NodeTypes,
  type Node,
  type Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { usePlaybackStore } from '@/store/playback-store';
import { FlowNodeComponent } from './flow-node';
import { mockNodes, mockEdges } from './mock-graph';

// Register our custom node type
const nodeTypes: NodeTypes = {
  flowNode: FlowNodeComponent as unknown as NodeTypes['flowNode'],
};

export function GraphCanvas() {
  const { trace, hasTrace } = usePlaybackStore();
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [isLayouting, setIsLayouting] = useState(false);

  useEffect(() => {
    if (!hasTrace || !trace) {
      setNodes(mockNodes);
      setEdges(mockEdges);
      setIsLayouting(false);
      return;
    }

    setIsLayouting(true);

    // Spawn graph layout builder Web Worker
    const worker = new Worker(
      new URL('../../lib/trace/graph.worker.ts', import.meta.url)
    );

    worker.postMessage({ trace });

    worker.onmessage = (event) => {
      const { success, result, error } = event.data;
      if (success && result) {
        setNodes(result.nodes);
        setEdges(result.edges);
      } else {
        console.error('Failed to compute graph layout in Web Worker:', error);
      }
      setIsLayouting(false);
      worker.terminate();
    };

    return () => {
      worker.terminate();
    };
  }, [trace, hasTrace, setNodes, setEdges]);

  // When trace changes, we need fresh state — key on trace id
  const key = trace?.metadata.executionId ?? 'mock';

  if (isLayouting) {
    return (
      <div className="flex h-full min-h-[400px] w-full items-center justify-center rounded-xl border border-border/30 bg-muted/10 font-mono text-sm text-muted-foreground">
        <Loader2 className="mr-2 size-4 animate-spin text-[var(--electric-blue)]" />
        Computing graph layout...
      </div>
    );
  }

  return (
    <div className="h-full min-h-[400px] w-full rounded-xl border border-border/30 bg-muted/10">
      <ReactFlow
        key={key}
        nodes={nodes}
        edges={edges}
        onNodesChange={hasTrace ? undefined : onNodesChange}
        onEdgesChange={hasTrace ? undefined : onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        proOptions={{ hideAttribution: true }}
        className="bg-transparent"
        minZoom={0.3}
        maxZoom={2}
      >
        <Background gap={20} color="var(--border)" />
        <Controls className="!border-border !bg-card" />
        <MiniMap
          className="!bg-card"
          nodeColor={(n) => {
            const nt = (n.data as { nodeType?: string })?.nodeType;
            if (nt === 'call') return 'var(--electric-blue)';
            if (nt === 'return') return 'var(--cyan-glow)';
            if (nt === 'condition') return '#eab308';
            return 'var(--border)';
          }}
        />
      </ReactFlow>
    </div>
  );
}
