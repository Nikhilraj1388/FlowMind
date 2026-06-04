import { motion } from "motion/react";
import { Card } from "./ui/card";
import { 
  ListOrdered, 
  GitBranch, 
  Network, 
  Layers, 
  Database,
  Boxes
} from "lucide-react";

const visualizations = [
  {
    icon: ListOrdered,
    title: "Array Visualization",
    description: "See sorting algorithms and array operations come to life",
    color: "var(--electric-blue)",
  },
  {
    icon: GitBranch,
    title: "Binary Tree Traversal",
    description: "Watch tree traversals in pre-order, in-order, and post-order",
    color: "var(--cyan-glow)",
  },
  {
    icon: Network,
    title: "Graph Algorithms",
    description: "Visualize BFS, DFS, Dijkstra's, and pathfinding algorithms",
    color: "var(--neon-purple)",
  },
  {
    icon: Layers,
    title: "Stack/Queue Animation",
    description: "Understand LIFO and FIFO operations visually",
    color: "var(--electric-blue)",
  },
  {
    icon: Database,
    title: "Memory Allocation",
    description: "Track heap and stack memory in real-time",
    color: "var(--cyan-glow)",
  },
  {
    icon: Boxes,
    title: "Dynamic Programming",
    description: "See memoization and tabulation in action",
    color: "var(--neon-purple)",
  },
];

export function VisualizationsSection() {
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
          <h2 className="text-4xl md:text-6xl font-bold">
            <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Supported
            </span>
            <br />
            <span className="bg-gradient-to-r from-[var(--electric-blue)] to-[var(--neon-purple)] bg-clip-text text-transparent">
              Visualizations
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From basic data structures to complex algorithms, we've got you covered
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visualizations.map((viz, index) => {
            const Icon = viz.icon;
            
            return (
              <motion.div
                key={viz.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group relative h-full overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-[var(--electric-blue)]/50 transition-all duration-300 cursor-pointer">
                  {/* Animated gradient border */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: `linear-gradient(45deg, ${viz.color}, transparent)`,
                    }}
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  
                  <div className="relative h-full bg-card m-[1px] rounded-lg p-6">
                    {/* Icon with animated preview */}
                    <div className="mb-6 relative">
                      <motion.div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${viz.color}20, ${viz.color}10)`,
                        }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Icon className="w-8 h-8" style={{ color: viz.color }} />
                      </motion.div>

                      {/* Mini animated preview */}
                      <div className="mt-4 flex gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <motion.div
                            key={i}
                            className="flex-1 h-1 rounded-full"
                            style={{ backgroundColor: viz.color }}
                            initial={{ scaleY: 0.3, opacity: 0.3 }}
                            whileHover={{ scaleY: 1, opacity: 1 }}
                            transition={{
                              duration: 0.3,
                              delay: i * 0.05,
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold group-hover:text-[var(--electric-blue)] transition-colors">
                        {viz.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {viz.description}
                      </p>
                    </div>

                    {/* Hover effect indicator */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 rounded-full"
                      style={{ backgroundColor: viz.color }}
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
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
