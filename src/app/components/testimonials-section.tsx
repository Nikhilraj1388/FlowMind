import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Senior Software Engineer @ Google",
    initials: "SC",
    content: "FlowMind has completely transformed how I debug complex algorithms. The visual execution flow makes it so much easier to understand what's happening at each step.",
    gradient: "from-[var(--electric-blue)] to-[var(--cyan-glow)]",
  },
  {
    name: "Marcus Rodriguez",
    role: "CS Professor @ MIT",
    initials: "MR",
    content: "I use FlowMind to teach data structures to my students. The interactive visualizations help them grasp concepts that would take weeks to understand otherwise.",
    gradient: "from-[var(--cyan-glow)] to-[var(--neon-purple)]",
  },
  {
    name: "Aisha Patel",
    role: "Tech Lead @ Netflix",
    initials: "AP",
    content: "The AI-powered explanations are incredible. It's like having a senior engineer sitting next to you, explaining every decision your code makes.",
    gradient: "from-[var(--neon-purple)] to-[var(--electric-blue)]",
  },
  {
    name: "Jake Morrison",
    role: "Bootcamp Graduate",
    initials: "JM",
    content: "As someone new to programming, FlowMind made recursion and dynamic programming finally click for me. I aced my technical interviews thanks to this tool.",
    gradient: "from-[var(--electric-blue)] to-[var(--neon-purple)]",
  },
  {
    name: "Elena Volkov",
    role: "Staff Engineer @ Meta",
    initials: "EV",
    content: "Time travel debugging is a game changer. Being able to step backward through execution has saved me countless hours of debugging complex state issues.",
    gradient: "from-[var(--cyan-glow)] to-[var(--electric-blue)]",
  },
  {
    name: "David Kim",
    role: "Algorithm Researcher",
    initials: "DK",
    content: "The 3D graph visualizations are phenomenal. I can finally see the entire execution tree at once, which has helped me optimize several key algorithms.",
    gradient: "from-[var(--neon-purple)] to-[var(--cyan-glow)]",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--deep-charcoal)]/30 to-transparent" />
      
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[var(--electric-blue)]/10 to-[var(--neon-purple)]/10 border border-[var(--electric-blue)]/20">
            <Quote className="w-4 h-4" style={{ color: "var(--electric-blue)" }} />
            <span className="text-sm" style={{ color: "var(--electric-blue)" }}>Loved by Developers</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold">
            <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              What Developers
            </span>
            <br />
            <span className="bg-gradient-to-r from-[var(--electric-blue)] to-[var(--neon-purple)] bg-clip-text text-transparent">
              Are Saying
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of developers who are already visualizing their code execution
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group relative h-full overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-[var(--electric-blue)]/50 transition-all duration-300 p-6">
                {/* Quote icon */}
                <div className="absolute top-4 right-4 opacity-10">
                  <Quote className="w-12 h-12" />
                </div>

                <div className="relative space-y-4">
                  {/* Avatar and Name */}
                  <div className="flex items-center gap-3">
                    <div className={`p-[2px] rounded-full bg-gradient-to-br ${testimonial.gradient}`}>
                      <Avatar className="w-12 h-12 border-2 border-background">
                        <AvatarFallback className="bg-muted">
                          {testimonial.initials}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>

                  {/* Content */}
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  {/* Bottom gradient line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className={`h-full bg-gradient-to-r ${testimonial.gradient}`} />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
