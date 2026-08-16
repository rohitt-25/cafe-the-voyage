import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { REVIEWS } from '../lib/design';

/**
 * Day / Night toggle.
 *
 * A generic "dark mode" switch on a curated warm palette is usually a liability
 * — two palettes to maintain, neither loved. Framed as the cafe's own two
 * moods it earns its place: brunch light and evening dark are real states of
 * this room, and the whole page shifts rather than just inverting.
 */
export function AtmosphereToggle() {
  const [night, setNight] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('voyage-atmosphere');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setNight(saved ? saved === 'night' : prefersDark);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.atmosphere = night ? 'night' : 'day';
    localStorage.setItem('voyage-atmosphere', night ? 'night' : 'day');
  }, [night]);

  return (
    <button
      type="button"
      onClick={() => setNight((v) => !v)}
      role="switch"
      aria-checked={night}
      aria-label={night ? 'Switch to day' : 'Switch to night'}
      title={night ? 'Day' : 'Night'}
      className="relative flex h-11 min-w-[76px] items-center rounded-full border border-current/20 px-1.5 font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.14em] transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#A16207]/40"
    >
      <span
        aria-hidden="true"
        className="absolute h-8 w-8 rounded-full bg-[#A16207] transition-transform duration-500 ease-out"
        style={{ transform: night ? 'translateX(36px)' : 'translateX(0)' }}
      />
      <span aria-hidden="true" className="relative z-10 w-9 text-center">Day</span>
      <span aria-hidden="true" className="relative z-10 w-9 text-center">Nite</span>
    </button>
  );
}

/** Endless ribbon of what the place actually is. The page's signature detail. */
export function Marquee() {
  const items = ['Filter coffee', 'All-day brunch', 'Garden seating', 'Travel-themed', 'Koregaon Park', 'Since Lane 5'];
  return (
    <div
      aria-hidden="true"
      className="marquee border-y border-[color:var(--line)] bg-[color:var(--bg)] py-5 overflow-hidden"
    >
      <div className="marquee__track flex w-max gap-10 whitespace-nowrap">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex gap-10">
            {items.map((t) => (
              <span
                key={t}
                className="font-['JetBrains_Mono'] text-[13px] uppercase tracking-[0.24em] text-[color:var(--ink-soft)]"
              >
                {t} <span className="text-[#A16207] px-4">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Reviews as pull quotes, one at a time and set large.
 * Three real Google reviews carry more weight shown properly than nine in a
 * grid of cards nobody reads.
 */
export function Voices() {
  const root = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-quote]', {
        opacity: 0,
        y: 44,
        duration: 0.9,
        stagger: 0.15,
        ease: 'expo.out',
        scrollTrigger: { trigger: root.current, start: 'top 72%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="reviews" ref={root} className="bg-[color:var(--bg)] py-28 md:py-40">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[color:var(--line)] pb-8">
          <h2
            className="font-['Satoshi'] font-bold leading-[0.9] tracking-[-0.04em] text-[color:var(--ink)]"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
          >
            In their words
          </h2>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Cafe+The+Voyage+Koregaon+Park+Pune"
            target="_blank"
            rel="noreferrer"
            className="font-['JetBrains_Mono'] text-[13px] uppercase tracking-[0.16em] text-[color:var(--ink-soft)] hover:text-[#A16207] transition-colors pb-3 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#A16207]/30 rounded-full"
          >
            All 1,275 reviews →
          </a>
        </div>

        <div className="mt-16 space-y-20 md:space-y-28">
          {REVIEWS.map((r, i) => (
            <figure key={i} data-quote className="grid gap-6 md:grid-cols-12 md:gap-12">
              <div className="md:col-span-2">
                <span className="font-['JetBrains_Mono'] text-[13px] tracking-[0.2em] text-[#A16207]">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <blockquote className="md:col-span-10">
                <p
                  className="font-['Satoshi'] font-medium leading-[1.15] tracking-[-0.03em] text-[color:var(--ink)]"
                  style={{ fontSize: 'clamp(1.5rem, 3.4vw, 2.75rem)' }}
                >
                  “{r.text}”
                </p>
                <figcaption className="mt-6 font-['JetBrains_Mono'] text-[13px] uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">
                  {r.author} · 5 ★ on Google
                </figcaption>
              </blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
