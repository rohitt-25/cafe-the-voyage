import React from 'react';
import MotionController from './components/MotionController';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import MenuSection from './components/MenuSection';
import StorySection from './components/StorySection';
import SanctuarySection from './components/SanctuarySection';
import ReviewsSection from './components/ReviewsSection';
import FAQSection from './components/FAQSection';
import WhatsAppButton from './components/WhatsAppButton';
import { SkipLink, ScrollProgress, BackToTop, useImageFadeIn } from './components/SiteChrome';

function App() {
  useImageFadeIn();

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#0C0A09] font-['General_Sans'] overflow-x-hidden selection:bg-[#A16207] selection:text-[#FFFFFF]">
      <SkipLink />
      <ScrollProgress />
      <MotionController />
      
      <div className="noise-overlay" aria-hidden="true" />

      <Header />
      
      <main id="main">
        <Hero 
          subcopy="Join Pune's favorite travel-themed cafe, rated 4.7 stars by over 1,200 food lovers."
        />
        <TrustStrip />
        <MenuSection />
        <StorySection />
        <SanctuarySection 
          title="Secure Your Table"
          images={{
            img1: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlcbQLbduUxhN6Kd-T7saMIvXydhIQo6LpnW5QZ4GOOB2U4lBOqoBKmc0VftYkjxpihhP8B3rr6zFHs5yn-qvpphpPzJspqtBgwcY3ANiBjRGpd-mnXLt8cEyg3zFMXCXPMc0CF=w1920-h1080-k-no",
            img2: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWkh0wps4miMr3DDnRKmDPVwMn6DplmZl2ucnUkGnm5O1MkSqPJk7RwQnP-mkQjs-QZkO3wpKWj7DSZemKXkjJWwHfVA-2uGK__xdbff3JXKqSH9AvbjV77km1LA_yfyHO2Ng08=w1920-h1080-k-no",
            img3: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWlruEBH5KnECx5xhOuYPyGlYPK1KDhnYZg3YoUiQXp4TJX6oA8etAN_xzR5jQWreJu4-ulvS9xQ2Ifr31Lg-yJTQpouUiYcmPmcRfCEuzMgbl7P8hdbCLtPiHNplngUWVguXqIz=w1920-h1080-k-no",
            img4: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWksle9BOpnUz_H4nvGcYZUhVDCQfmWZjWusY-MM6D2Y76SD4v8ru4FWsgf_7tHyJ5VAeaGHXVPFjwCcC3b3mZYW-tR4Fg9fmVevEugVRhwVbF0eZ_233jVvOGfwDR3JwBByEqrFkM47mPnX=w1920-h1080-k-no",
            img5: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWm5CoSaO2UANmn0P-GEZ47MKK_w4IUlXLGvLw0vN1qJ47DqygRHKz3Tx2lJJsAg5VH_gtoz8Wq-bqtrqWYGARaMjRzkhprAi45epOBVzF9bA85nl3erIst7Fk0WpzbkKTqMXHRaA2ZV3QU=w1920-h1080-k-no",
            img6: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWm0GGfVOmB2bHxYNi-AYZyBTbtVSWyJ9HyP_-QjJbcrpX5DOXVVAUAgpQLwobtkivEtWHY4ERNPJn1eLosheSTUgL-yDrzrStg7C7J1CB5Rjsbnayn2vio4bApNYCzrthwwEwgerngC9zm4=w1920-h1080-k-no",
            img7: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWl4wiAj8AQ9Rq-kbXftJyiEy3MjQxncO-fuxgMyXDYzFKII_3T7HIKjC6tC6WT7yHzRNtbZHQxMkD9iZ6v2lO7a8Q63mb5juKlUPcvUR681yQy7ecdvwmaealwsqRgdGkwIptuJ=w1920-h1080-k-no"
          }}
        />
        <ReviewsSection />
        <FAQSection />
      </main>

      <BackToTop />
      <WhatsAppButton />
    </div>
  );
}

export default App;
