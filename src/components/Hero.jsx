import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { PHOTOS, PHOTO_GRADE, WHATSAPP, sized, srcSetFor } from '../lib/design';

/**
 * Full-bleed cinematic hero.
 *
 * Three things do the work: an oversized clamp type scale, a word-by-word mask
 * reveal, and a slow parallax on the image so the frame feels like it has
 * depth rather than being a photo in a box. Everything animates on transform
 * and opacity only, so it holds 60fps on a mid-range Android.
 */
const WORDS = ['Your', 'Weekend', 'Escape', 'in', 'Koregaon', 'Park.'];

export default function Hero() {
  const root = useRef(null);
  const image = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      tl.from('[data-word] > span', {
        yPercent: 118,
        duration: 1.15,
        stagger: 0.07,
      })
        .from('[data-hero-meta]', { opacity: 0, y: 18, duration: 0.7, stagger: 0.08 }, '-=0.65')
        .from('[data-hero-frame]', { clipPath: 'inset(14% 14% 14% 14%)', duration: 1.4 }, 0.1)
        .from(image.current, { scale: 1.22, duration: 1.8 }, 0.1);

      // Background drifts slower than the page — the classic depth cue.
      gsap.to(image.current, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('[data-hero-copy]', {
        yPercent: -14,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#FAFAF9] flex flex-col justify-end"
    >
      <div data-hero-frame className="absolute inset-0 will-change-[clip-path]">
        <img
          ref={image}
          src={sized(PHOTOS[0], 2000, 1200)}
          srcSet={srcSetFor(PHOTOS[0])}
          sizes="100vw"
          alt="Guests at Cafe — The Voyage in Koregaon Park, Pune"
          fetchpriority="high"
          decoding="async"
          width="2000"
          height="1200"
          className="h-full w-full object-cover will-change-transform"
          style={{ filter: PHOTO_GRADE }}
        />
        {/* Bottom-weighted scrim: keeps the headline past 4.5:1 whatever the photo does. */}
        {/* Top scrim so the fixed header stays legible over any photo. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-40"
          style={{ background: 'linear-gradient(to bottom, rgba(12,10,9,.55), transparent)' }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(12,10,9,.92) 0%, rgba(12,10,9,.72) 30%, rgba(12,10,9,.28) 62%, rgba(12,10,9,.12) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-10 pb-16 md:pb-24">
        <div data-hero-copy>
          <p
            data-hero-meta
            className="font-['JetBrains_Mono'] text-[14px] tracking-[0.22em] uppercase text-white/70 mb-8"
          >
            Koregaon Park · Pune · Est. Lane 5
          </p>

          <h1 className="text-white font-['Satoshi'] font-bold leading-[0.88] tracking-[-0.045em] max-w-[16ch]"
              style={{ fontSize: 'clamp(3rem, 9.5vw, 10rem)' }}>
            {WORDS.map((w, i) => (
              <span key={i} data-word className="inline-block overflow-hidden pr-[0.22em] align-bottom">
                <span className="inline-block">{w}</span>
              </span>
            ))}
          </h1>

          <p
            data-hero-meta
            className="mt-7 max-w-[46ch] font-['General_Sans'] text-[17px] md:text-[19px] leading-relaxed text-white/80"
          >
            Pune's favourite travel-themed cafe — filter coffee, all-day brunch and garden seating,
            rated 4.7★ by over 1,200 people.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
            <a
              data-hero-meta
              data-magnetic
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex h-[60px] items-center justify-center rounded-full bg-[#FAFAF9] px-9 font-['General_Sans'] font-medium text-[#0C0A09] transition-colors hover:bg-[#A16207] hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
            >
              Reserve a table
              <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
            </a>

            <a
              data-hero-meta
              href="#menu"
              className="inline-flex h-[60px] items-center font-['General_Sans'] text-white/85 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40 rounded-full px-2"
            >
              <span className="relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-right after:scale-x-100 after:bg-current after:transition-transform hover:after:origin-left">
                Explore the menu
              </span>
            </a>
          </div>

          <div
            data-hero-meta
            className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-3 border-t border-white/15 pt-6 font-['JetBrains_Mono'] text-[13px] uppercase tracking-[0.16em] text-white/65"
          >
            <span className="text-white">4.7 ★ Google</span>
            <span>1,275+ reviews</span>
            <span>Open 7 days</span>
          </div>
        </div>
      </div>
    </section>
  );
}
