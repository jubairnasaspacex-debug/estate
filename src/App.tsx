import { useCallback, useEffect, useState } from 'react';
import { GALLERY_PLATES, type Development, type GalleryPlate } from './data/developments';
import { initLenisAndScrollTrigger, smoothScrollToSection } from './utils/motion';
import { Preloader } from './components/Preloader';
import { ScrollProgressRail } from './components/ScrollProgressRail';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TypologyShowcaseSection } from './components/TypologyShowcaseSection';
import { ManifestoSection } from './components/ManifestoSection';
import { DevelopmentsSection } from './components/DevelopmentsSection';
import { DevelopmentModal } from './components/DevelopmentModal';
import { StorytellingSection } from './components/StorytellingSection';
import { PhilosophySection } from './components/PhilosophySection';
import { LifestyleSection } from './components/LifestyleSection';
import { CredibilitySection } from './components/CredibilitySection';
import { GallerySection } from './components/GallerySection';
import { LightboxModal } from './components/LightboxModal';
import { EnquirySection } from './components/EnquirySection';
import { Footer } from './components/Footer';

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [selectedDevelopment, setSelectedDevelopment] = useState<Development | null>(null);
  const [selectedPlate, setSelectedPlate] = useState<GalleryPlate | null>(null);
  const [preselectedDevelopmentId, setPreselectedDevelopmentId] = useState('villa-aurelia');

  useEffect(() => {
    const cleanup = initLenisAndScrollTrigger();
    return cleanup;
  }, []);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  const handleEnquireFromNavbar = () => {
    smoothScrollToSection('#enquiry');
  };

  const handleEnquireForDevelopment = (developmentId: string) => {
    setSelectedDevelopment(null);
    setPreselectedDevelopmentId(developmentId);
    setTimeout(() => {
      smoothScrollToSection('#enquiry');
    }, 60);
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-[#F6F3EC] text-[#141413]">
      <CustomCursor />
      <ScrollProgressRail />
      <Preloader onComplete={handleIntroComplete} />
      <Navbar onEnquireClick={handleEnquireFromNavbar} />

      <main>
        <HeroSection ready={introComplete} />
        <TypologyShowcaseSection onSelectDevelopment={setSelectedDevelopment} />
        <ManifestoSection />
        <DevelopmentsSection onSelectDevelopment={setSelectedDevelopment} />
        <StorytellingSection />
        <PhilosophySection />
        <LifestyleSection />
        <CredibilitySection />
        <GallerySection onOpenPlate={setSelectedPlate} />
        <EnquirySection preselectedDevelopmentId={preselectedDevelopmentId} />
      </main>

      <Footer onSelectDevelopment={setSelectedDevelopment} />

      <DevelopmentModal
        development={selectedDevelopment}
        onClose={() => setSelectedDevelopment(null)}
        onEnquireForDevelopment={handleEnquireForDevelopment}
      />

      <LightboxModal
        plate={selectedPlate}
        plates={GALLERY_PLATES}
        onClose={() => setSelectedPlate(null)}
        onNavigate={setSelectedPlate}
      />
    </div>
  );
}
