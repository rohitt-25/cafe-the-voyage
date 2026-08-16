import { useEffect, useState } from 'react';

export default function MotionController() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Load GSAP dynamically to ensure it's not in the critical path
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        if (prefersReducedMotion) {
          gsap.globalTimeline.pause();
          setIsLoaded(true);
          return;
        }

        const ctx = gsap.context(() => {
          // 1. Hero Parallax
          const parallaxLayers = document.querySelectorAll('.parallax-layer');
          parallaxLayers.forEach((layer, i) => {
            gsap.to(layer, {
              yPercent: (i + 1) * -8,
              ease: 'none',
              scrollTrigger: {
                trigger: layer.parentElement,
                scrub: 0.5,
              },
            });
          });

          // 2. Section Entrances
          const revealElements = document.querySelectorAll('.reveal-section');
          revealElements.forEach((el) => {
            gsap.from(el, {
              opacity: 0,
              y: 12,
              duration: 0.35,
              ease: 'power1.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
              },
            });
          });

          // 3. Staggered Card Groups
          const gridGroups = document.querySelectorAll('.grid-container');
          gridGroups.forEach((group) => {
            const items = group.querySelectorAll('.grid-item');
            gsap.from(items, {
              opacity: 0,
              scale: 0.92,
              y: 16,
              duration: 0.4,
              stagger: {
                each: 0.06,
                from: 'start',
                grid: 'auto',
              },
              ease: 'back.out(1.4)',
              scrollTrigger: {
                trigger: group,
                start: 'top 85%',
              },
            });
          });
        });

        setIsLoaded(true);
        return () => ctx.revert();
      });
    });
  }, []);

  return null;
}
