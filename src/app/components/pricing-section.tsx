import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for learning and experimenting",
    features: [
      "5 visualizations per day",
      "Basic algorithms support",
      "Community support",
      "Export as image",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "For serious developers and students",
    features: [
      "Unlimited visualizations",
      "All algorithms & data structures",
      "AI-powered explanations",
      "Time travel debugging",
      "Priority support",
      "Collaboration mode",
      "Export & share",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Team",
    price: "$49",
    period: "/month",
    description: "For teams and organizations",
    features: [
      "Everything in Pro",
      "Up to 10 team members",
      "Shared workspaces",
      "Admin dashboard",
      "SSO integration",
      "Custom branding",
      "Dedicated support",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export function PricingSection() {
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
              Simple,
            </span>
            <br />
            <span className="bg-gradient-to-r from-[var(--electric-blue)] to-[var(--neon-purple)] bg-clip-text text-transparent">
              Transparent Pricing
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your needs. Always know what you'll pay.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={plan.highlighted ? "md:-mt-4 md:mb-4" : ""}
            >
              <Card 
                className={`relative h-full overflow-hidden transition-all duration-300 ${
                  plan.highlighted
                    ? "border-[var(--electric-blue)] bg-gradient-to-b from-card to-card/50 shadow-xl shadow-[var(--electric-blue)]/10"
                    : "border-border/50 bg-card/50 hover:border-[var(--electric-blue)]/30"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--electric-blue)] via-[var(--cyan-glow)] to-[var(--neon-purple)]" />
                )}

                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-[var(--electric-blue)] to-[var(--neon-purple)] text-white text-sm font-medium">
                      <Sparkles className="w-3 h-3" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-8 space-y-6">
                  {/* Header */}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-muted-foreground">{plan.period}</span>
                    )}
                  </div>

                  {/* CTA Button */}
                  <Button
                    className={`w-full ${
                      plan.highlighted
                        ? "bg-gradient-to-r from-[var(--electric-blue)] to-[var(--cyan-glow)] hover:shadow-lg hover:shadow-[var(--electric-blue)]/25"
                        : "bg-secondary hover:bg-secondary/80"
                    }`}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>

                  {/* Features */}
                  <div className="space-y-3 pt-4 border-t border-border/50">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <div 
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{
                            background: plan.highlighted 
                              ? "linear-gradient(135deg, var(--electric-blue), var(--cyan-glow))"
                              : "var(--muted)",
                          }}
                        >
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm text-foreground/90">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* FAQ note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground">
            All plans include a 14-day free trial. No credit card required.{" "}
            <a href="#" className="text-[var(--electric-blue)] hover:underline">
              View FAQ
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
