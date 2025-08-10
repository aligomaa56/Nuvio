import { BackgroundEffects } from './background-effects';
import SpaceBackground from '@/components/features/landing/components/space-background';
import HeroSectionFooter from '@/components/features/landing/components/hero-section-footer';
import { HeroSectionHeader } from './HeroSectionHeader';
import MainHeroSectionContent from './MainHeroSectionContent';

export default function HeroSection() {
  return (
    <main className="overflow-hidden min-h-screen bg-background text-foreground relative flex flex-col">
      <SpaceBackground />
      <BackgroundEffects />
      <HeroSectionHeader />
      <MainHeroSectionContent />
      <HeroSectionFooter />
    </main>
  );
}
