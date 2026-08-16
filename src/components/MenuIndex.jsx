import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { MENU, PHOTO_GRADE, sized } from '../lib/design';

/**
 * The menu as an editorial index rather than a card grid.
 *
 * Numbered rows, oversized type, and a preview image that tracks the cursor —
 * the pattern high-end restaurants use because it puts the food one glance
 * away without spending vertical space on a gallery. The preview is desktop
 * only; on touch the photo sits inline instead, since there is no hover.
 */
export default function MenuIndex() {
  const root = useRef(null);
  const preview = useRef(null);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    const ctx = gsap.context(() => {
      if (!reduce) {
        gsap.from('[data-row]', {
          yPercent: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'expo.out',
          scrollTrigger: { trigger: root.current, start: 'top 75%' },
        });
      }

      if (!fine || reduce || !preview.current) return;

      // quickTo keeps the follow buttery without a tween per mousemove.
      const x = gsap.quickTo(preview.current, 'x', { duration: 0.55, ease: 'power3' });
      const y = gsap.quickTo(preview.current, 'y', { duration: 0.55, ease: 'power3' });
      const onMove = (e) => {
        x(e.clientX + 28);
        y(e.clientY - 130);
      };
      window.addEventListener('mousemove', onMove, { passive: true });
      return () => window.removeEventListener('mousemove', onMove);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="menu" ref={root} className="relative bg-[#FAFAF9] py-28 md:py-40">
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
        <div className="flex items-end justify-between gap-8 border-b border-[#E7E5E4] pb-8">
          <h2
            className="font-['Satoshi'] font-bold tracking-[-0.04em] leading-[0.9] text-[#0C0A09]"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
          >
            The Menu
          </h2>
          <p className="hidden md:block max-w-[34ch] font-['General_Sans'] text-[#57534E] pb-3">
            Four ways to spend an afternoon here. Ask your server for the full card.
          </p>
        </div>

        <ul className="mt-2" role="list">
          {MENU.map((item, i) => (
            <li key={item.no} data-row>
              <div
                className="group relative flex flex-col gap-3 border-b border-[#E7E5E4] py-9 md:py-11 md:flex-row md:items-baseline md:gap-10 transition-colors hover:bg-[#F5F5F4]/60 -mx-4 px-4 rounded-lg"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                <span className="font-['JetBrains_Mono'] text-[13px] tracking-[0.2em] text-[#A16207] md:w-16">
                  {item.no}
                </span>

                <h3
                  className="font-['Satoshi'] font-bold tracking-[-0.03em] leading-[1] text-[#0C0A09] md:flex-1 transition-transform duration-500 md:group-hover:translate-x-3"
                  style={{ fontSize: 'clamp(1.75rem, 4.2vw, 3.25rem)' }}
                >
                  {item.name}
                </h3>

                <p className="max-w-[38ch] font-['General_Sans'] text-[#57534E] leading-relaxed md:w-[34%]">
                  {item.note}
                </p>

                {/* Touch devices get the photo inline — there is no hover to reveal it. */}
                <img
                  src={sized(item.photo, 900, 600)}
                  alt={item.name}
                  loading="lazy"
                  decoding="async"
                  width="900"
                  height="600"
                  className="mt-3 h-52 w-full rounded-xl object-cover md:hidden"
                  style={{ filter: PHOTO_GRADE }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div
        ref={preview}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-30 hidden md:block"
        style={{ opacity: active === null ? 0 : 1, transition: 'opacity .4s ease' }}
      >
        <div className="h-[300px] w-[240px] overflow-hidden rounded-2xl shadow-2xl">
          {MENU.map((item, i) => (
            <img
              key={item.no}
              src={sized(item.photo, 720, 900)}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
              style={{ filter: PHOTO_GRADE, opacity: active === i ? 1 : 0 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
