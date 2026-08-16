import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.to(imageRef.current, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-[#FAFAF9] pt-16 pb-24 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
          
          <div className="flex-1 flex flex-col gap-6 text-left">
            <h1 className="text-[40px] lg:text-[64px] leading-[1.05] lg:leading-[1.02] font-bold tracking-[-0.02em] font-['Satoshi'] text-[#0C0A09]">
              Your Weekend Escape in Koregaon Park.
            </h1>
            
            <p className="text-[16px] lg:text-[18px] font-['General_Sans'] text-[#64748B] max-w-lg leading-[1.6]">
              Join Pune's favourite travel-themed cafe, rated 4.7★ by over 1,200 food lovers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a 
                href="tel:+918596950267" 
                className="h-[56px] px-8 flex items-center justify-center bg-[#A16207] text-[#FFFFFF] rounded-[16px] font-medium transition-transform hover:scale-[1.02] hover:bg-[#855206] focus-visible:ring-4 focus-visible:ring-[#A16207]/50 outline-none"
              >
                Book a Table
              </a>
              <a 
                href="#menu" 
                className="h-[56px] px-8 flex items-center justify-center border border-[#1C1917] text-[#1C1917] rounded-[16px] font-medium transition-transform hover:scale-[1.02] focus-visible:ring-4 focus-visible:ring-[#1C1917]/20 outline-none"
              >
                Explore Our Menu
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-[#D6D3D1]">
              <p className="text-[13px] font-['JetBrains_Mono'] font-medium text-[#64748B]">
                4.7★ · 1,275+ Google Reviews · Lane 5, Koregaon Park
              </p>
            </div>
          </div>

          <div className="flex-1 w-full h-[400px] lg:h-[600px] rounded-[16px] overflow-hidden border border-[#D6D3D1] shadow-[0_4px_10px_rgba(0,0,0,0.1)] relative">
            <img 
              ref={imageRef}
              src="/assets/hero-cafe.webp"
              alt="Cozy interior of Cafe - The Voyage with warm lighting and travel-themed decor"
              width="800"
              height="600"
              fetchpriority="high"
              className="w-full h-full object-cover scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A09]/60 via-transparent to-transparent" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
