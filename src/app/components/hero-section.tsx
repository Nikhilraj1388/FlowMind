import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Play, Upload, Code2 } from "lucide-react";
import { AnimatedBackground } from "./animated-background";
import { Link } from "react-router";

export function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatedBackground />
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[var(--electric-blue)]/10 to-[var(--neon-purple)]/10 border border-[var(--electric-blue)]/20">
              <Code2 className="w-4 h-4" style={{ color: "var(--electric-blue)" }} />
              <span className="text-sm" style={{ color: "var(--electric-blue)" }}>AI-Powered Code Visualization</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                Visualize Your Code
              </span>
              <br />
              <span className="bg-gradient-to-r from-[var(--electric-blue)] via-[var(--cyan-glow)] to-[var(--neon-purple)] bg-clip-text text-transparent">
                Like Never Before
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
              Understand execution flow, recursion, memory, and algorithms through interactive visual animations.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/dashboard">
                <Button 
                  size="lg" 
                  className="group relative overflow-hidden bg-gradient-to-r from-[var(--electric-blue)] to-[var(--cyan-glow)] hover:shadow-lg hover:shadow-[var(--electric-blue)]/25 transition-all"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Try Demo
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                </Button>
              </Link>
              
              <Link to="/dashboard">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-[var(--neon-purple)]/30 hover:border-[var(--neon-purple)] hover:bg-[var(--neon-purple)]/10 transition-all"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Code
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-background bg-gradient-to-br from-[var(--electric-blue)] to-[var(--neon-purple)]"
                  />
                ))}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Trusted by <span className="font-semibold text-foreground">10,000+</span> developers
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square">
              {/* Glowing orb background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--electric-blue)]/20 via-[var(--neon-purple)]/20 to-[var(--cyan-glow)]/20 rounded-3xl blur-3xl" />
              
              {/* Code visualization preview */}
              <div className="relative bg-card/50 backdrop-blur-xl border border-border rounded-3xl p-8 shadow-2xl">
                <div className="space-y-4">
                  {/* Simulated code execution nodes */}
                  {[
                    { delay: 0, color: "var(--electric-blue)" },
                    { delay: 0.3, color: "var(--cyan-glow)" },
                    { delay: 0.6, color: "var(--neon-purple)" },
                  ].map((node, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: node.delay, duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                      className="flex items-center gap-4"
                    >
                      <div 
                        className="w-4 h-4 rounded-full shadow-lg"
                        style={{ 
                          backgroundColor: node.color,
                          boxShadow: `0 0 20px ${node.color}`
                        }}
                      />
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ delay: node.delay + 0.2, duration: 0.8, repeat: Infinity, repeatDelay: 2 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: node.color }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Floating elements */}
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-[var(--electric-blue)] to-[var(--cyan-glow)] rounded-2xl opacity-80 blur-sm"
                />
                
                <motion.div
                  animate={{ 
                    y: [0, 10, 0],
                    rotate: [0, -5, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-[var(--neon-purple)] to-[var(--electric-blue)] rounded-2xl opacity-80 blur-sm"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ height: ["20%", "80%", "20%"] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 bg-gradient-to-b from-[var(--electric-blue)] to-[var(--cyan-glow)] rounded-full"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}