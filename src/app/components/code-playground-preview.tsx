import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Play, Pause, SkipForward, SkipBack, Settings } from "lucide-react";
import { Slider } from "./ui/slider";

export function CodePlaygroundPreview() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[var(--deep-charcoal)]/20 to-background" />
      
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 space-y-4"
        >
          <h2 className="text-4xl md:text-6xl font-bold">
            <span className="bg-gradient-to-r from-[var(--electric-blue)] to-[var(--neon-purple)] bg-clip-text text-transparent">
              Interactive Code Playground
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Write code, watch it execute, understand every step
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-xl">
            <div className="grid lg:grid-cols-3 gap-0">
              {/* Code Editor Panel */}
              <div className="lg:col-span-1 border-b lg:border-b-0 lg:border-r border-border/50 p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Code Editor</h3>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {/* Mock code editor */}
                  <div className="bg-muted/30 rounded-lg p-4 font-mono text-sm space-y-2">
                    <div className="flex gap-2">
                      <span className="text-muted-foreground">1</span>
                      <span className="text-[var(--neon-purple)]">function</span>
                      <span className="text-[var(--cyan-glow)]">fibonacci</span>
                      <span>(n) {'{'}</span>
                    </div>
                    <div className="flex gap-2 pl-4">
                      <span className="text-muted-foreground">2</span>
                      <span className="text-[var(--neon-purple)]">if</span>
                      <span>(n {'<='} 1)</span>
                      <span className="text-[var(--neon-purple)]">return</span>
                      <span>n;</span>
                    </div>
                    <div className="flex gap-2 pl-4">
                      <span className="text-muted-foreground">3</span>
                      <span className="text-[var(--neon-purple)]">return</span>
                      <span className="text-[var(--cyan-glow)]">fibonacci</span>
                      <span>(n-1) +</span>
                    </div>
                    <div className="flex gap-2 pl-8">
                      <span className="text-muted-foreground">4</span>
                      <span className="text-[var(--cyan-glow)]">fibonacci</span>
                      <span>(n-2);</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-muted-foreground">5</span>
                      <span>{'}'}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-[var(--electric-blue)] to-[var(--cyan-glow)]">
                    <Play className="w-4 h-4 mr-2" />
                    Run Visualization
                  </Button>
                </div>
              </div>

              {/* Visualization Canvas */}
              <div className="lg:col-span-2 p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Execution Flow</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Step 3 of 8</span>
                    </div>
                  </div>

                  {/* Visualization area */}
                  <div className="bg-muted/20 rounded-lg p-8 min-h-[300px] relative overflow-hidden">
                    {/* Recursion tree visualization */}
                    <div className="flex flex-col items-center gap-8">
                      {/* Root node */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="relative"
                      >
                        <div 
                          className="w-20 h-20 rounded-2xl flex items-center justify-center font-mono text-lg font-bold shadow-lg"
                          style={{
                            background: `linear-gradient(135deg, var(--electric-blue), var(--cyan-glow))`,
                            boxShadow: `0 0 30px var(--electric-blue)`,
                          }}
                        >
                          fib(5)
                        </div>
                      </motion.div>

                      {/* Child nodes */}
                      <div className="flex gap-24">
                        {[4, 3].map((num, i) => (
                          <motion.div
                            key={num}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3 + i * 0.2 }}
                            className="relative"
                          >
                            <div 
                              className="w-16 h-16 rounded-xl flex items-center justify-center font-mono text-sm font-semibold"
                              style={{
                                background: i === 0 
                                  ? `linear-gradient(135deg, var(--cyan-glow), var(--neon-purple))`
                                  : `var(--muted)`,
                                boxShadow: i === 0 ? `0 0 20px var(--cyan-glow)` : 'none',
                              }}
                            >
                              fib({num})
                            </div>
                            
                            {/* Connection line */}
                            <motion.div
                              initial={{ scaleY: 0 }}
                              animate={{ scaleY: 1 }}
                              transition={{ delay: 0.2 + i * 0.2 }}
                              className="absolute bottom-full left-1/2 w-0.5 h-8 -translate-x-1/2 mb-2"
                              style={{ backgroundColor: 'var(--electric-blue)' }}
                            />
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Floating particles */}
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full"
                        style={{
                          backgroundColor: i % 2 === 0 ? 'var(--electric-blue)' : 'var(--cyan-glow)',
                          left: `${20 + i * 15}%`,
                          top: `${30 + i * 10}%`,
                        }}
                        animate={{
                          y: [-10, 10, -10],
                          opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                          duration: 2 + i * 0.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>

                  {/* Timeline Controls */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Button variant="outline" size="sm" className="w-10 h-10 p-0">
                        <SkipBack className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        className="w-10 h-10 p-0 bg-gradient-to-r from-[var(--electric-blue)] to-[var(--cyan-glow)]"
                      >
                        <Pause className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="w-10 h-10 p-0">
                        <SkipForward className="w-4 h-4" />
                      </Button>
                      
                      <div className="flex-1">
                        <Slider defaultValue={[37]} max={100} step={1} />
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Speed</span>
                        <Slider defaultValue={[50]} max={100} step={1} className="w-20" />
                      </div>
                    </div>

                    {/* AI Explanation */}
                    <div className="bg-muted/30 rounded-lg p-4 border border-[var(--electric-blue)]/20">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[var(--electric-blue)] to-[var(--neon-purple)] flex items-center justify-center flex-shrink-0">
                          <span className="text-xs">AI</span>
                        </div>
                        <div className="space-y-1 flex-1">
                          <p className="text-sm font-medium">Current Step Explanation</p>
                          <p className="text-xs text-muted-foreground">
                            The function is now calculating fib(4) by recursively calling fib(3) and fib(2). 
                            Notice how the call stack is building up...
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
