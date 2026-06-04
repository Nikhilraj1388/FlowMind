import { motion } from "motion/react";
import { Card } from "./ui/card";
import { 
  Zap, 
  Brain, 
  Globe, 
  Box, 
  Users, 
  GraduationCap,
  GitBranch,
  Clock
} from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Time Travel Debugging",
    description: "Step backward and forward through code execution to understand every state change",
    gradient: "from-[var(--electric-blue)] to-[var(--cyan-glow)]",
    size: "large",
  },
  {
    icon: Zap,
    title: "Real-time Execution",
    description: "Watch your code execute in real-time with animated visualizations",
    gradient: "from-[var(--cyan-glow)] to-[var(--neon-purple)]",
    size: "small",
  },
  {
    icon: Brain,
    title: "AI-Powered Explanation",
    description: "Get intelligent insights about your code's behavior and performance",
    gradient: "from-[var(--neon-purple)] to-[var(--electric-blue)]",
    size: "small",
  },
  {
    icon: Globe,
    title: "Multi-language Support",
    description: "Visualize Python, JavaScript, Java, C++, and more",
    gradient: "from-[var(--electric-blue)] to-[var(--neon-purple)]",
    size: "medium",
  },
  {
    icon: Box,
    title: "3D Graph View",
    description: "Explore complex data structures in immersive 3D space",
    gradient: "from-[var(--cyan-glow)] to-[var(--electric-blue)]",
    size: "medium",
  },
  {
    icon: Users,
    title: "Collaboration Mode",
    description: "Share visualizations and debug together in real-time",
    gradient: "from-[var(--neon-purple)] to-[var(--cyan-glow)]",
    size: "small",
  },
  {
    icon: GraduationCap,
    title: "Interview Preparation",
    description: "Master algorithms with interactive problem sets and solutions",
    gradient: "from-[var(--electric-blue)] to-[var(--neon-purple)]",
    size: "small",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 px-6 relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[var(--electric-blue)]/10 to-[var(--neon-purple)]/10 border border-[var(--electric-blue)]/20">
            <GitBranch className="w-4 h-4" style={{ color: "var(--electric-blue)" }} />
            <span className="text-sm" style={{ color: "var(--electric-blue)" }}>Powerful Features</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold">
            <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Everything You Need to
            </span>
            <br />
            <span className="bg-gradient-to-r from-[var(--electric-blue)] to-[var(--neon-purple)] bg-clip-text text-transparent">
              Master Code Execution
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A complete toolkit for understanding, debugging, and optimizing your code
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const sizeClasses = {
              large: "md:col-span-2 md:row-span-2",
              medium: "md:col-span-2",
              small: "",
            };

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={sizeClasses[feature.size as keyof typeof sizeClasses]}
              >
                <Card className="group relative h-full overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-[var(--electric-blue)]/50 transition-all duration-300">
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.gradient}`} />
                  </div>

                  <div className="relative h-full p-6 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-[1px] group-hover:scale-110 transition-transform duration-300`}>
                        <div className="w-full h-full bg-card rounded-xl flex items-center justify-center">
                          <Icon className="w-6 h-6" style={{ color: "var(--electric-blue)" }} />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold">{feature.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>

                    {feature.size === "large" && (
                      <div className="mt-6">
                        {/* Mini visualization for large card */}
                        <div className="grid grid-cols-3 gap-2">
                          {[1, 2, 3].map((i) => (
                            <motion.div
                              key={i}
                              className={`h-2 rounded-full bg-gradient-to-r ${feature.gradient} opacity-50`}
                              animate={{
                                scaleX: [1, 1.2, 1],
                                opacity: [0.5, 0.8, 0.5],
                              }}
                              transition={{
                                duration: 2,
                                delay: i * 0.2,
                                repeat: Infinity,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
