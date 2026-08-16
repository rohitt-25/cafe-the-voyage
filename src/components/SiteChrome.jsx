import React, { useEffect, useState, useCallback } from 'react';

/**
 * Page furniture: skip link, scroll progress, back-to-top, and a copy button.
 *
 * Everything here is CSS-transform based and listens passively, so it costs
 * nothing on the mid-range Android most of these visitors are on.
 */

/** Keyboard users shouldn't have to tab the whole header to reach content. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-[#0C0A09] focus:text-white focus:px-4 focus:py-3 focus:rounded-lg focus:outline-none focus:ring-4 focus:ring-[#A16207]/50"
    >
      Skip to content
    </a>
  );
}

/** Reading-progress bar. Transform-only, so it never triggers layout. */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full bg-[#A16207] origin-left transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

/** Appears once the hero is behind you; respects reduced-motion. */
export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      className={`fixed bottom-6 left-6 z-40 h-12 w-12 rounded-full bg-[#1C1917] text-white flex items-center justify-center shadow-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#A16207]/50 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}

/**
 * Copy-to-clipboard for the address and phone. On a cafe site this is the one
 * genuinely useful place for it — people copy the address into Maps.
 */
export function CopyButton({ value, label }) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the text is still selectable on the page */
    }
  }, [value]);

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
      className="inline-flex items-center gap-1.5 min-h-[44px] px-3 text-sm text-[#57534E] hover:text-[#A16207] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A16207] rounded-lg"
    >
      {copied ? (
        <>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          Copy {label}
        </>
      )}
    </button>
  );
}

/** Images fade in once decoded, so slow connections don't flash empty boxes. */
export function useImageFadeIn() {
  useEffect(() => {
    const imgs = Array.from(document.querySelectorAll('img[data-fade]'));
    for (const img of imgs) {
      if (img.complete) {
        img.style.opacity = '1';
      } else {
        img.addEventListener('load', () => (img.style.opacity = '1'), { once: true });
        img.addEventListener('error', () => (img.style.opacity = '1'), { once: true });
      }
    }
  }, []);
}
