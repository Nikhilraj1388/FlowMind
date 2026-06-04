import { useState } from "react";
import { motion } from "motion/react";
import Editor from "@monaco-editor/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Upload, 
  Download,
  Settings,
  Maximize2,
  Code2,
  Brain,
  RotateCcw,
  Home
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import { Link } from "react-router";

export function Dashboard() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(3);

  const sampleCode = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function main() {
  const result = fibonacci(5);
  console.log(result);
}

main();`;

  return (
    <div className="min-h-screen bg-background text-foreground font-['Inter',sans-serif]">
      {/* Top Navigation Bar */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--electric-blue)] to-[var(--neon-purple)] flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold">FlowMind</span>
            </Link>
            <div className="h-6 w-px bg-border hidden md:block" />
            <span className="text-sm text-muted-foreground hidden md:block">Untitled Project</span>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/">
              <Button variant="ghost" size="sm" className="hidden md:flex">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
            <Button variant="ghost" size="sm">
              <Upload className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Import</span>
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Export</span>
            </Button>
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Settings className="w-4 h-4" />
            </Button>
            <Button 
              size="sm"
              className="bg-gradient-to-r from-[var(--electric-blue)] to-[var(--cyan-glow)]"
            >
              Share
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-61px)]">
        {/* Left Panel - Code Editor */}
        <div className="w-[400px] border-r border-border/50 flex flex-col bg-card/20">
          <div className="p-4 border-b border-border/50">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Code Editor</h3>
              <Select defaultValue="javascript">
                <SelectTrigger className="w-[140px] h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="cpp">C++</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              className="w-full bg-gradient-to-r from-[var(--electric-blue)] to-[var(--cyan-glow)]"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              <Play className="w-4 h-4 mr-2" />
              Run Visualization
            </Button>
          </div>

          <div className="flex-1">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              defaultValue={sampleCode}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            />
          </div>
        </div>

        {/* Center Panel - Visualization Canvas */}
        <div className="flex-1 flex flex-col">
          {/* Visualization Header */}
          <div className="px-6 py-4 border-b border-border/50 bg-card/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h3 className="font-semibold">Execution Flow</h3>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-muted-foreground">Step {currentStep} of 8</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <RotateCcw className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Maximize2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Visualization Area */}
          <ScrollArea className="flex-1 p-6">
            <div className="min-h-[600px] bg-gradient-to-br from-muted/20 to-transparent rounded-xl p-8 relative overflow-hidden">
              {/* Grid background */}
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `
                    linear-gradient(var(--electric-blue) 1px, transparent 1px),
                    linear-gradient(90deg, var(--electric-blue) 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px',
                }}
              />

              {/* Execution Visualization - Recursion Tree */}
              <div className="relative z-10 flex flex-col items-center gap-12 py-8">
                {/* Root Node */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="relative"
                >
                  <div 
                    className="w-32 h-32 rounded-2xl flex flex-col items-center justify-center font-mono font-bold shadow-2xl relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, var(--electric-blue), var(--cyan-glow))`,
                      boxShadow: `0 0 40px var(--electric-blue)`,
                    }}
                  >
                    <span className="text-2xl">fib(5)</span>
                    <span className="text-xs opacity-80 mt-1">return: 5</span>
                    
                    {/* Pulse effect */}
                    <motion.div
                      className="absolute inset-0 border-4 border-white rounded-2xl"
                      animate={{
                        scale: [1, 1.2],
                        opacity: [0.5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  </div>
                </motion.div>

                {/* Level 1 Children */}
                <div className="flex gap-32 relative">
                  <svg className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 w-full h-12 pointer-events-none">
                    <line 
                      x1="50%" 
                      y1="0" 
                      x2="20%" 
                      y2="100%" 
                      stroke="var(--electric-blue)" 
                      strokeWidth="2"
                      opacity="0.5"
                    />
                    <line 
                      x1="50%" 
                      y1="0" 
                      x2="80%" 
                      y2="100%" 
                      stroke="var(--electric-blue)" 
                      strokeWidth="2"
                      opacity="0.5"
                    />
                  </svg>

                  {[
                    { val: 4, result: 3, active: true },
                    { val: 3, result: 2, active: false },
                  ].map((node, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3 + i * 0.2 }}
                      className="relative"
                    >
                      <div 
                        className="w-24 h-24 rounded-xl flex flex-col items-center justify-center font-mono font-semibold shadow-xl"
                        style={{
                          background: node.active 
                            ? `linear-gradient(135deg, var(--cyan-glow), var(--neon-purple))`
                            : `var(--muted)`,
                          boxShadow: node.active ? `0 0 30px var(--cyan-glow)` : 'none',
                        }}
                      >
                        <span className="text-lg">fib({node.val})</span>
                        <span className="text-xs opacity-70 mt-1">{node.result}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Level 2 Children - More nodes */}
                <div className="flex gap-16">
                  {[3, 2, 2, 1].map((val, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.7 + i * 0.15 }}
                    >
                      <div 
                        className="w-16 h-16 rounded-lg flex items-center justify-center font-mono text-sm font-medium shadow-lg"
                        style={{
                          background: i === 0 ? `var(--neon-purple)` : `var(--muted)`,
                          opacity: i === 0 ? 1 : 0.5,
                        }}
                      >
                        fib({val})
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Floating particles effect */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: i % 3 === 0 
                      ? 'var(--electric-blue)' 
                      : i % 3 === 1 
                        ? 'var(--cyan-glow)' 
                        : 'var(--neon-purple)',
                    left: `${15 + i * 10}%`,
                    top: `${20 + (i % 3) * 20}%`,
                  }}
                  animate={{
                    y: [-20, 20, -20],
                    x: [-10, 10, -10],
                    opacity: [0.2, 1, 0.2],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </ScrollArea>

          {/* Timeline Controls */}
          <div className="px-6 py-4 border-t border-border/50 bg-card/30 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-10 h-10 p-0"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              >
                <SkipBack className="w-4 h-4" />
              </Button>
              
              <Button 
                size="sm" 
                className="w-10 h-10 p-0 bg-gradient-to-r from-[var(--electric-blue)] to-[var(--cyan-glow)]"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-10 h-10 p-0"
                onClick={() => setCurrentStep(Math.min(8, currentStep + 1))}
              >
                <SkipForward className="w-4 h-4" />
              </Button>
              
              <div className="flex-1 px-4">
                <Slider 
                  value={[currentStep]} 
                  onValueChange={(val) => setCurrentStep(val[0])}
                  max={8} 
                  step={1} 
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground whitespace-nowrap">Speed</span>
                <Slider defaultValue={[50]} max={100} step={1} className="w-24" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - AI Explanation & State */}
        <div className="w-[360px] border-l border-border/50 bg-card/20 flex flex-col">
          <Tabs defaultValue="ai" className="flex-1 flex flex-col">
            <TabsList className="w-full rounded-none border-b border-border/50">
              <TabsTrigger value="ai" className="flex-1">
                <Brain className="w-4 h-4 mr-2" />
                AI Insights
              </TabsTrigger>
              <TabsTrigger value="state" className="flex-1">Variables</TabsTrigger>
            </TabsList>

            <TabsContent value="ai" className="flex-1 p-4 space-y-4 m-0">
              <ScrollArea className="h-full">
                <div className="space-y-4 pr-4">
                  {/* AI Message */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[var(--electric-blue)] to-[var(--neon-purple)] flex items-center justify-center flex-shrink-0">
                        <Brain className="w-4 h-4" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="bg-muted/50 rounded-lg p-3">
                          <p className="text-sm leading-relaxed">
                            <span className="font-semibold">Current Step:</span> Calculating fib(4)
                          </p>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-3">
                          <p className="text-sm leading-relaxed">
                            The function is making a recursive call to fib(3) and fib(2). 
                            This demonstrates the classic recursive pattern of Fibonacci.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[var(--electric-blue)] to-[var(--neon-purple)] flex items-center justify-center flex-shrink-0">
                        <Brain className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-muted/50 rounded-lg p-3">
                          <p className="text-sm leading-relaxed">
                            <span className="font-semibold text-yellow-500">⚠️ Performance Note:</span><br />
                            This recursive approach has O(2^n) time complexity. Consider using memoization to optimize!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="state" className="flex-1 p-4 m-0">
              <ScrollArea className="h-full">
                <div className="space-y-3 pr-4">
                  {/* Call Stack */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Call Stack</h4>
                    <div className="space-y-2">
                      {[
                        { fn: "fibonacci(5)", line: 2 },
                        { fn: "fibonacci(4)", line: 3, active: true },
                        { fn: "fibonacci(3)", line: 3 },
                        { fn: "main()", line: 7 },
                      ].map((call, i) => (
                        <Card 
                          key={i}
                          className={`p-3 ${
                            call.active 
                              ? "border-[var(--electric-blue)] bg-[var(--electric-blue)]/10" 
                              : "border-border/30"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-mono">{call.fn}</span>
                            <span className="text-xs text-muted-foreground">Line {call.line}</span>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Local Variables */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Local Variables</h4>
                    <div className="space-y-2">
                      <Card className="p-3 border-border/30">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">n</span>
                          <span className="text-sm font-mono" style={{ color: "var(--cyan-glow)" }}>4</span>
                        </div>
                      </Card>
                    </div>
                  </div>

                  {/* Memory Usage */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Memory</h4>
                    <Card className="p-3 border-border/30">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Stack</span>
                          <span className="font-mono">2.4 KB</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full"
                            style={{ 
                              width: "45%",
                              background: "linear-gradient(to right, var(--electric-blue), var(--cyan-glow))"
                            }}
                          />
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}