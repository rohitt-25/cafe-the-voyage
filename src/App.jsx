import React from 'react';
import MotionController from './components/MotionController';
import Header from './components/Header';
import Hero from './components/Hero';
import MenuIndex from './components/MenuIndex';
import StorySection from './components/StorySection';
import Gallery from './components/Gallery';
import Reserve from './components/Reserve';
import FAQSection from './components/FAQSection';
import WhatsAppButton from './components/WhatsAppButton';
import Footer from './components/Footer';
import { Marquee, Voices } from './components/Atmosphere';
import { SkipLink, ScrollProgress, BackToTop, useImageFadeIn } from './components/SiteChrome';

/**
 * Composition only — every child owns its own section, container and spacing.
 *
 * Order follows the database's conversion rule for this pattern: social proof
 * earns the ask, so the reservation section sits AFTER the reviews rather than
 * before them.
 */
function App() {
  useImageFadeIn();

  return (
    <div className="bg-[color:var(--bg)] text-[color:var(--ink)] font-['General_Sans'] overflow-x-hidden">
      <SkipLink />
      <ScrollProgress />
      <MotionController />
      <div className="noise-overlay" aria-hidden="true" />

      <Header />

      <main id="main">
        <Hero />
        <Marquee />
        <MenuIndex />
        <StorySection />
        <Gallery />
        <Voices />
        <Reserve />
        <FAQSection />
      </main>

      <Footer />

      <BackToTop />
      <WhatsAppButton />
    </div>
  );
}

export default App;
