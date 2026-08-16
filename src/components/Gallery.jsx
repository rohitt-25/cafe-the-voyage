import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { PHOTOS, PHOTO_GRADE, sized } from '../lib/design';

/**
 * Horizontal scroll gallery, pinned and scrubbed.
 *
 * This is the section that makes a page feel commissioned rather than
 * assembled — vertical scroll drives horizontal travel, so the visitor is
 * moving through the room. Pinning is disabled under prefers-reduced-motion
 * and below the md breakpoint, where it becomes an ordinary swipe strip
 * (hijacking scroll on a phone is hostile, not immersive).
 */
export default function Gallery() {
  const root = useRef(null);
  const track = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        const distance = () => track.current.scrollWidth - window.innerWidth + 80;
        const tween = gsap.to(track.current, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        return () => tween.kill();
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="gallery" className="relative overflow-hidden bg-[#0C0A09] py-20 md:py-0 md:h-[100svh] md:flex md:items-center">
      <div className="w-full">
        <div className="mx-auto mb-10 w-full max-w-[1400px] px-6 md:mb-14 md:px-10">
          <p className="font-['JetBrains_Mono'] text-[13px] uppercase tracking-[0.22em] text-white/50">
            The room
          </p>
          <h2
            className="mt-3 font-['Satoshi'] font-bold leading-[0.9] tracking-[-0.04em] text-white"
            style={{ fontSize: 'clamp(2.25rem, 6vw, 5rem)' }}
          >
            Somewhere to stay a while
          </h2>
        </div>

        <div
          ref={track}
          className="flex gap-5 overflow-x-auto px-6 pb-4 md:overflow-visible md:px-10 md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {PHOTOS.slice(0, 6).map((p, i) => (
            <figure
              key={i}
              className={`group relative shrink-0 overflow-hidden rounded-2xl ${
                i % 3 === 1 ? 'h-[52vh] w-[74vw] md:h-[60vh] md:w-[38vw]' : 'h-[44vh] w-[66vw] md:h-[46vh] md:w-[28vw]'
              }`}
            >
              <img
                src={sized(p, 1200, 900)}
                alt={`Inside Cafe — The Voyage, view ${i + 1}`}
                loading={i < 2 ? 'eager' : 'lazy'}
                decoding="async"
                width="1200"
                height="900"
                className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
                style={{ filter: PHOTO_GRADE }}
              />
              <figcaption className="absolute bottom-4 left-4 font-['JetBrains_Mono'] text-[12px] uppercase tracking-[0.18em] text-white/80">
                {String(i + 1).padStart(2, '0')}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
