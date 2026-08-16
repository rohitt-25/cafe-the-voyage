import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LINKS = [
  { href: '#menu', label: 'Menu' },
  { href: '#story', label: 'Our Story' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#faq', label: 'FAQ' },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  // Close the menu on Escape and lock the page behind it while it is open.
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    ScrollTrigger.create({
      start: 'top -80px',
      onUpdate: (self) => {
        const header = document.querySelector('header');
        if (header) {
          header.style.backgroundColor = self.isActive 
            ? 'rgba(250, 250, 249, 0.8)' 
            : 'transparent';
          header.style.backdropFilter = self.isActive 
            ? 'blur(12px)' 
            : 'blur(0px)';
          header.style.borderColor = self.isActive 
            ? '#D6D3D1' 
            : 'transparent';
        }
      }
    });
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent">
      <nav className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between" aria-label="Main navigation">
        <a 
          href="/" 
          className="font-['Satoshi'] text-2xl font-bold text-[#1C1917] tracking-[-0.02em] focus-visible:ring-2 focus-visible:ring-[#A16207] focus-visible:outline-none rounded-lg"
        >
          Cafe - The Voyage
        </a>

        <ul className="hidden lg:flex items-center gap-8" role="list">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-['General_Sans'] text-[#1C1917] hover:text-[#A16207] transition-colors focus-visible:ring-2 focus-visible:ring-[#A16207] focus-visible:outline-none rounded-lg py-2"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 md:gap-6">
          <a 
            href="tel:+918596950267" 
            className="flex items-center justify-center min-h-[44px] min-w-[44px] text-[#1C1917] hover:text-[#A16207] transition-colors focus-visible:ring-2 focus-visible:ring-[#A16207] focus-visible:outline-none rounded-lg"
            aria-label="Call Cafe - The Voyage"
          >
            <span className="hidden md:block font-['General_Sans'] font-medium mr-2">+91 85969 50267</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </a>

          <a 
            href="#booking" 
            className="flex items-center justify-center min-h-[44px] px-6 bg-[#1C1917] text-[#FFFFFF] rounded-[16px] font-['General_Sans'] font-medium hover:bg-[#A16207] transition-all duration-300 active:scale-[0.96] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#A16207] focus-visible:outline-none"
          >
            Book a Table
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="lg:hidden flex items-center justify-center min-h-[44px] min-w-[44px] text-[#1C1917] rounded-lg focus-visible:ring-2 focus-visible:ring-[#A16207] focus-visible:outline-none"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? (
                <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
              ) : (
                <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
              )}
            </svg>
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="lg:hidden border-t border-[#D6D3D1] bg-[#FAFAF9]/95 backdrop-blur-md"
      >
        <ul className="px-4 py-3" role="list">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center min-h-[52px] font-['General_Sans'] text-lg text-[#1C1917] border-b border-[#E7E5E4] last:border-0 focus-visible:ring-2 focus-visible:ring-[#A16207] focus-visible:outline-none rounded-lg"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
