import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const MenuSection = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  const menuItems = [
    {
      title: "Artisanal Brews",
      desc: "Specialty single-origin coffees crafted by expert Pune baristas.",
      price: "Ask your server"
    },
    {
      title: "Global Comfort Food",
      desc: "A curated menu spanning gourmet continental favourites.",
      price: "Ask your server"
    },
    {
      title: "Weekend Brunching",
      desc: "The perfect lively atmosphere for social gatherings.",
      price: "Ask your server"
    },
    {
      title: "Bespoke Desserts",
      desc: "Handcrafted pastries and treats to end your journey.",
      price: "Ask your server"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section Entrance
      gsap.from(sectionRef.current.querySelectorAll('.reveal-trigger'), {
        opacity: 0,
        y: 12,
        duration: 0.35,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      });

      // Staggered Grid Reveal
      gsap.from('.grid-item', {
        opacity: 0,
        scale: 0.92,
        y: 16,
        duration: 0.4,
        stagger: { each: 0.06, from: 'start', grid: 'auto' },
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="menu" ref={sectionRef} className="py-24 px-6 md:px-12 bg-[#FAFAF9]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        
        <div className="flex flex-col justify-center reveal-trigger">
          <h2 className="text-[28px] md:text-[40px] font-bold text-[#0C0A09] leading-[1.1] mb-6 font-['Satoshi']">
            On the Plate.
          </h2>
          <p className="text-[16px] md:text-[18px] text-[#0C0A09] font-['General_Sans'] leading-[1.6] mb-8">
            From single-origin brews to plates that taste like a trip abroad — here's what Pune keeps coming back for.
          </p>
          <a 
            href="https://wa.me/918596950267?utm_source=website&utm_medium=cta&utm_campaign=book_table"
            className="inline-flex items-center justify-center w-fit px-6 py-3 bg-[#1C1917] text-[#FFFFFF] rounded-full text-[14px] font-['JetBrains_Mono'] uppercase tracking-[0.04em] hover:scale-102 transition-transform active:scale-96"
          >
            Order Online via WhatsApp
          </a>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {menuItems.map((item, index) => (
            <div 
              key={index}
              className={`grid-item p-6 border border-[#D6D3D1] rounded-[16px] bg-[#FFFFFF] shadow-[0_4px_10px_rgba(0,0,0,0.1)] ${index % 2 !== 0 ? 'md:mt-12' : ''}`}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-[20px] font-bold text-[#0C0A09] font-['Satoshi']">{item.title}</h3>
                <span className="text-[14px] font-['JetBrains_Mono'] text-[#64748B] uppercase tracking-[0.04em]">
                  {item.price}
                </span>
              </div>
              <p className="text-[16px] text-[#44403C] font-['General_Sans'] leading-[1.6]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default MenuSection;
