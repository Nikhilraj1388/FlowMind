import { motion } from "motion/react";
import { Button } from "./ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router";

export function CTASection() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[var(--electric-blue)]/20 via-[var(--neon-purple)]/20 to-[var(--cyan-glow)]/20 blur-3xl rounded-full" />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative overflow-hidden rounded-3xl border border-[var(--electric-blue)]/20 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl p-12 md:p-16">
            {/* Animated border gradient */}
            <div className="absolute inset-0 opacity-50">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--electric-blue)] to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--neon-purple)] to-transparent" />
            </div>

            <div className="relative text-center space-y-8 max-w-3xl mx-auto">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center"
              >
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--electric-blue)] to-[var(--neon-purple)] flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  {/* Pulse effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-[var(--electric-blue)]"
                    animate={{
                      scale: [1, 1.3],
                      opacity: [0.5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                </div>
              </motion.div>

              {/* Heading */}
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold">
                  <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                    Ready to Transform
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-[var(--electric-blue)] via-[var(--cyan-glow)] to-[var(--neon-purple)] bg-clip-text text-transparent">
                    Your Coding Experience?
                  </span>
                </h2>
                
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Join thousands of developers who are already visualizing their code execution 
                  and learning faster than ever before.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/dashboard">
                  <Button 
                    size="lg"
                    className="group bg-gradient-to-r from-[var(--electric-blue)] to-[var(--cyan-glow)] hover:shadow-2xl hover:shadow-[var(--electric-blue)]/30 transition-all px-8"
                  >
                    Start Visualizing Now
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-[var(--neon-purple)]/30 hover:border-[var(--neon-purple)] hover:bg-[var(--neon-purple)]/10 px-8"
                >
                  View Documentation
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border/30">
                {[
                  { value: "10K+", label: "Developers" },
                  { value: "50K+", label: "Visualizations" },
                  { value: "99%", label: "Satisfaction" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="space-y-1"
                  >
                    <div className="text-3xl font-bold bg-gradient-to-r from-[var(--electric-blue)] to-[var(--cyan-glow)] bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
