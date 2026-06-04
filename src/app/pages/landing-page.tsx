import { ThemeProvider } from "next-themes";
import { Navigation } from "../components/navigation";
import { HeroSection } from "../components/hero-section";
import { CodePlaygroundPreview } from "../components/code-playground-preview";
import { VisualizationsSection } from "../components/visualizations-section";
import { FeaturesSection } from "../components/features-section";
import { TestimonialsSection } from "../components/testimonials-section";
import { CTASection } from "../components/cta-section";
import { PricingSection } from "../components/pricing-section";
import { Footer } from "../components/footer";

export default function LandingPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        
        <main>
          <HeroSection />
          <CodePlaygroundPreview />
          <div id="visualizations">
            <VisualizationsSection />
          </div>
          <div id="features">
            <FeaturesSection />
          </div>
          <TestimonialsSection />
          <CTASection />
          <div id="pricing">
            <PricingSection />
          </div>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}