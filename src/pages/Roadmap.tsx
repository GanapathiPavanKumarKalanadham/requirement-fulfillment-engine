import { useCallback, useMemo, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
  type Node,
  type Edge,
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import dagre from "dagre";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Lock, CheckCircle2, PlayCircle, Sparkles, RefreshCw } from "lucide-react";

// Custom Node Component
const RoadmapNode = ({ data }: { data: { label: string; status: string; progress: number; description: string } }) => {
  const isCompleted = data.status === "completed";
  const isActive = data.status === "active";
  const isLocked = data.status === "locked";

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      className={`
        w-64 p-4 rounded-xl border transition-all duration-300 cursor-pointer
        ${isCompleted ? "bg-success/10 border-success/50 glow-sm" : ""}
        ${isActive ? "bg-primary/10 border-primary/50 glow" : ""}
        ${isLocked ? "bg-muted/50 border-border opacity-60" : ""}
        ${!isLocked && !isCompleted && !isActive ? "bg-card border-border hover:border-primary/30" : ""}
      `}
    >
      <div className="flex items-start justify-between mb-2">
        <span className="font-semibold text-sm">{data.label}</span>
        {isCompleted && <CheckCircle2 className="w-5 h-5 text-success" />}
        {isActive && <PlayCircle className="w-5 h-5 text-primary animate-pulse" />}
        {isLocked && <Lock className="w-5 h-5 text-muted-foreground" />}
      </div>
      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{data.description}</p>
      {!isLocked && (
        <div className="space-y-1">
          <Progress value={data.progress} className="h-1.5" />
          <span className="text-xs text-muted-foreground">{data.progress}% complete</span>
        </div>
      )}
      {isLocked && (
        <Badge variant="locked" className="text-xs">Complete prerequisites</Badge>
      )}
    </motion.div>
  );
};

const nodeTypes = {
  roadmapNode: RoadmapNode,
};

// Initial nodes data
const initialNodesData = [
  { id: "1", label: "Python Fundamentals", status: "completed", progress: 100, description: "Variables, data types, control flow, and basic syntax" },
  { id: "2", label: "Data Structures", status: "completed", progress: 100, description: "Lists, dictionaries, sets, and tuples" },
  { id: "3", label: "Object-Oriented Programming", status: "completed", progress: 100, description: "Classes, inheritance, polymorphism" },
  { id: "4", label: "Algorithms", status: "active", progress: 60, description: "Sorting, searching, recursion, dynamic programming" },
  { id: "5", label: "Database Fundamentals", status: "active", progress: 30, description: "SQL, PostgreSQL, data modeling" },
  { id: "6", label: "REST API Development", status: "locked", progress: 0, description: "FastAPI, endpoints, authentication" },
  { id: "7", label: "System Design Basics", status: "locked", progress: 0, description: "Scalability, load balancing, caching" },
  { id: "8", label: "Cloud & Deployment", status: "locked", progress: 0, description: "Docker, Kubernetes, AWS/GCP" },
  { id: "9", label: "Microservices", status: "locked", progress: 0, description: "Service architecture, message queues" },
  { id: "10", label: "Interview Preparation", status: "locked", progress: 0, description: "Mock interviews, problem solving" },
];

const initialEdgesData = [
  { source: "1", target: "2" },
  { source: "2", target: "3" },
  { source: "3", target: "4" },
  { source: "3", target: "5" },
  { source: "4", target: "6" },
  { source: "5", target: "6" },
  { source: "6", target: "7" },
  { source: "7", target: "8" },
  { source: "7", target: "9" },
  { source: "8", target: "10" },
  { source: "9", target: "10" },
];

// Dagre layout function
const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: "TB", nodesep: 80, ranksep: 100 });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 256, height: 120 });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - 128,
        y: nodeWithPosition.y - 60,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
};

const Roadmap = () => {
  const [selectedNode, setSelectedNode] = useState<typeof initialNodesData[0] | null>(null);

  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => {
    const nodes: Node[] = initialNodesData.map((node) => ({
      id: node.id,
      type: "roadmapNode",
      position: { x: 0, y: 0 },
      data: node,
    }));

    const edges: Edge[] = initialEdgesData.map((edge, index) => ({
      id: `e${edge.source}-${edge.target}`,
      source: edge.source,
      target: edge.target,
      type: "smoothstep",
      animated: initialNodesData.find((n) => n.id === edge.source)?.status === "active",
      style: { stroke: "hsl(var(--muted-foreground))", strokeWidth: 2 },
      markerEnd: { type: MarkerType.ArrowClosed, color: "hsl(var(--muted-foreground))" },
    }));

    return getLayoutedElements(nodes, edges);
  }, []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick = useCallback((_: any, node: Node) => {
    const nodeData = initialNodesData.find((n) => n.id === node.id);
    setSelectedNode(nodeData || null);
  }, []);

  const completedCount = initialNodesData.filter((n) => n.status === "completed").length;
  const totalCount = initialNodesData.length;
  const overallProgress = Math.round((completedCount / totalCount) * 100);

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-3rem)] flex flex-col gap-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              Backend Engineering Roadmap
            </h1>
            <p className="text-muted-foreground">AI-generated personalized learning path</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Overall Progress</p>
              <p className="text-2xl font-bold text-gradient">{overallProgress}%</p>
            </div>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Regenerate
            </Button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex gap-4">
          {/* Flow Canvas */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex-1 rounded-xl border border-border overflow-hidden bg-background/50"
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onNodeClick={onNodeClick}
              nodeTypes={nodeTypes}
              fitView
              fitViewOptions={{ padding: 0.2 }}
              minZoom={0.3}
              maxZoom={1.5}
            >
              <Background color="hsl(var(--border))" gap={20} />
              <Controls className="glass" />
              <MiniMap
                nodeColor={(node) => {
                  const status = (node.data as any).status;
                  if (status === "completed") return "hsl(var(--success))";
                  if (status === "active") return "hsl(var(--primary))";
                  return "hsl(var(--muted))";
                }}
                className="glass rounded-lg"
              />
              <Panel position="top-left" className="glass rounded-lg p-3">
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-success" />
                    <span>Completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                    <span>In Progress</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-muted" />
                    <span>Locked</span>
                  </div>
                </div>
              </Panel>
            </ReactFlow>
          </motion.div>

          {/* Details Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="w-80 hidden lg:block"
          >
            <Card variant="glass" className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Module Details</CardTitle>
                <CardDescription>Click a node to view details</CardDescription>
              </CardHeader>
              <CardContent>
                {selectedNode ? (
                  <motion.div
                    key={selectedNode.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-2">
                      {selectedNode.status === "completed" && <Badge variant="completed">Completed</Badge>}
                      {selectedNode.status === "active" && <Badge variant="glow">In Progress</Badge>}
                      {selectedNode.status === "locked" && <Badge variant="locked">Locked</Badge>}
                    </div>
                    <h3 className="text-xl font-semibold">{selectedNode.label}</h3>
                    <p className="text-muted-foreground">{selectedNode.description}</p>
                    
                    {selectedNode.status !== "locked" && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span className="text-primary">{selectedNode.progress}%</span>
                        </div>
                        <Progress value={selectedNode.progress} />
                      </div>
                    )}

                    {selectedNode.status === "active" && (
                      <Button variant="hero" className="w-full">
                        Continue Learning
                      </Button>
                    )}
                    {selectedNode.status === "completed" && (
                      <Button variant="outline" className="w-full">
                        Review Material
                      </Button>
                    )}
                  </motion.div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Select a module to view its details</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Roadmap;
