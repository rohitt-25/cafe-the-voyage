import React, { useState, useMemo, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const reviews = [
  { name: "Adrika Gupta", date: "21 Apr 2026", text: "The food and the vibe were really good. Talking about the staff, they were courteous. We really loved their service. The manager was also really sweet. He helped us with really good suggestions. We tried pizza (8/10), burger (10/10 - not a burger lover but had an entire burger myself), nachos (11/10) The doggo there was a cherry on top. Wish I could take him home :P Highly recommend this place." },
  { name: "Krishna", date: "27 Jan 2026", text: "What a beautiful cafe! Hidden in plain sight, right on the north main road. Cannot believe I missed it for so long. The food is simply delicious! Loved the smoothie bowl, the egg bhurji, the loaded nachos. A lot of healthy options too! The juices feel delightfully fresh! Definitely on my must visit again and again list now." },
  { name: "Hiral Rani", date: "16 Feb 2026", text: "Luved The Entire Space. Food Was Incredible. Must Visit. ✡️ SKINNY RECOMMENDATION ⬇️⬇️ 1️⃣ Strawberry Pitaya Smoothie Bowl 2️⃣ Jamaican Creamy Chicken Tacos 3️⃣ Prawn Garlic Butter Sauce Pasta 4️⃣ Egg Pomidor Margarita Pizza 5️⃣ Blue Berry Cheese Cake SKINNY APPROVED ✔️✔️ SKINNYDOTCOM" },
  { name: "shampa das", date: "26 Apr 2026", text: "A perfect place for me and my friends meet after a long time. The warm atmosphere with beautiful ambience and good food and great hospitality made our evening a good one." },
  { name: "Gabriel Zuniga", date: "21 Mar 2026", text: "Honestly one of the best Cafés ive been to. The Pesto recipe they have is amazinf and very authentic. I ordered Pesto pasta, and Pesto pizza and it was delicious. The iced coffee drinks were also 10/10. I am visiting from canada and I recommend this Café to anyone visiting or living in Pune. The Manager was extremely friendly and personally attended to my order and provided excellent service." },
  { name: "Mohammed Ghufran", date: "21 Feb 2026", text: "Had a great time at The Voyage! The food was delicious and the staff were incredibly friendly and welcoming. Love the vibe here. Definitely worth a visit!" }
];

export default function ReviewsSection() {
  const [page, setPage] = useState(0);
  const containerRef = useRef(null);
  const itemsPerPage = 4;

  const paginatedReviews = useMemo(() => {
    const start = page * itemsPerPage;
    return reviews.slice(start, start + itemsPerPage);
  }, [page]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      const items = containerRef.current.querySelectorAll('.grid-item');
      gsap.fromTo(items, 
        { opacity: 0, scale: 0.92, y: 16 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          duration: 0.4, 
          stagger: { each: 0.06, from: 'start' }, 
          ease: 'back.out(1.4)',
          scrollTrigger: { trigger: containerRef.current, start: 'top 85%' }
        }
      );
    }
  }, [page]);

  return (
    <section id="reviews" className="py-20 bg-[#FAFAF9] overflow-hidden" aria-labelledby="reviews-heading">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 id="reviews-heading" className="text-4xl font-bold font-['Satoshi'] text-[#0C0A09] mb-4">Loved by 1,200+ Locals</h2>
            <p className="text-lg text-[#475569] font-['General_Sans'] mb-6">
              4.7★ average from 1,275 Google reviews — real words, zero filters.
            </p>
            <a 
              href="https://www.google.com/maps/search/?api=1&query=Cafe%20-%20The%20Voyage&query_place_id=ChIJqUxTFuXBwjsRBE5MLhGy0W0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-[#A16207] font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-[#A16207] focus:ring-offset-2 rounded-sm underline-offset-4"
              aria-label="See all 1,275 reviews on Google Maps (opens in new tab)"
            >
              See all 1,275 reviews on Google →
            </a>
          </div>

          <div className="lg:col-span-8" ref={containerRef}>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {paginatedReviews.map((review, index) => (
                <article 
                  key={`${page}-${index}`} 
                  className="grid-item bg-[#FFFFFF] border border-[#D6D3D1] rounded-2xl p-6 shadow-sm"
                >
                  <p className="text-[#1C1917] font-['General_Sans'] leading-relaxed mb-4">"{review.text}"</p>
                  <footer className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#0C0A09] font-['Satoshi']">{review.name}</span>
                    <time className="text-[13px] text-[#64748B] font-['JetBrains_Mono']">{review.date}</time>
                  </footer>
                </article>
              ))}
            </div>
            
            {reviews.length > itemsPerPage && (
              <div className="flex gap-4">
                <button 
                  onClick={() => setPage(p => Math.max(0, p - 1))}
                  disabled={page === 0}
                  className="px-6 py-3 bg-[#1C1917] text-[#FFFFFF] rounded-full text-sm font-medium disabled:opacity-30 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1C1917]"
                  aria-label="Previous reviews"
                >
                  Previous
                </button>
                <button 
                  onClick={() => setPage(p => Math.min(Math.ceil(reviews.length / itemsPerPage) - 1, p + 1))}
                  disabled={(page + 1) * itemsPerPage >= reviews.length}
                  className="px-6 py-3 bg-[#1C1917] text-[#FFFFFF] rounded-full text-sm font-medium disabled:opacity-30 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1C1917]"
                  aria-label="Next reviews"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
