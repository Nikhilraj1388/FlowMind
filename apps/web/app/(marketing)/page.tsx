import { MarketingNavigation } from '@/features/marketing/navigation';
import { HeroSection } from '@/features/marketing/hero-section';
import {
  PlaygroundShowcaseSection,
  VisualizationsSection,
  FeaturesSection,
  AIShowcaseSection,
  TimelineShowcaseSection,
  DSAShowcaseSection,
  TestimonialsSection,
  CTASection,
  PricingSection,
  MarketingFooter,
} from '@/features/marketing/landing-sections';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <MarketingNavigation />
      <main>
        <HeroSection />
        <PlaygroundShowcaseSection />
        <VisualizationsSection />
        <FeaturesSection />
        <AIShowcaseSection />
        <TimelineShowcaseSection />
        <DSAShowcaseSection />
        <TestimonialsSection />
        <CTASection />
        <PricingSection />
      </main>
      <MarketingFooter />
    </div>
  );
}
