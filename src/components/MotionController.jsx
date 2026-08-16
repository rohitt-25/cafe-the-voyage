import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Global motion: smooth scroll, magnetic buttons, and section reveals.
 *
 * Lenis and ScrollTrigger MUST be wired to each other. Without these three
 * lines Lenis hijacks scrolling, ScrollTrigger never recalculates, and every
 * scroll-triggered reveal stays stuck at its opacity-0 start state — the whole
 * page below the hero silently renders invisible.
 */
export default function MotionController() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (reduce) return;

    let lenis;
    let cleanupMagnets = () => {};

    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({ duration: 1.15, smoothWheel: true });

      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
      ScrollTrigger.refresh();
    });

    // Buttons lean toward the cursor — the cheapest micro-interaction that
    // reads as expensive. Pointer-fine only; it means nothing on touch.
    if (fine) {
      const magnets = Array.from(document.querySelectorAll('[data-magnetic]'));
      const handlers = magnets.map((el) => {
        const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
        const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
        const move = (e) => {
          const r = el.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * 0.22);
          yTo((e.clientY - (r.top + r.height / 2)) * 0.32);
        };
        const reset = () => {
          xTo(0);
          yTo(0);
        };
        el.addEventListener('mousemove', move);
        el.addEventListener('mouseleave', reset);
        return () => {
          el.removeEventListener('mousemove', move);
          el.removeEventListener('mouseleave', reset);
        };
      });
      cleanupMagnets = () => handlers.forEach((fn) => fn());
    }

    // Any section can opt into a reveal without importing GSAP itself.
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 36,
          duration: 0.85,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 82%' },
        });
      });
    });

    return () => {
      cleanupMagnets();
      ctx.revert();
      lenis?.destroy();
    };
  }, []);

  return null;
}
