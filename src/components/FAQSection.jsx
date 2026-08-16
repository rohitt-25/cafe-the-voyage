import React, { useState } from 'react';

const faqData = [
  {
    question: "Do you take walk-ins or only bookings?",
    answer: "We love walk-ins! While we always try to accommodate you on arrival, we recommend booking a table during weekends to ensure you get your favourite spot."
  },
  {
    question: "Is outdoor seating available?",
    answer: "Yes, our Koregaon Park location features a beautiful outdoor seating area perfect for enjoying the Pune weather."
  },
  {
    question: "Do you cater to dietary preferences (vegan/gluten-free)?",
    answer: "We strive to make our menu inclusive. Many of our dishes can be modified, and we have several dedicated vegan and gluten-free options. Please inform your server of any allergies when ordering."
  },
  {
    question: "Is parking available near Lane 5?",
    answer: "Lane 5 can get quite busy. There is limited street parking available, so we recommend using ride-sharing services if possible for a stress-free arrival."
  },
  {
    question: "Can I order online or only dine in?",
    answer: "You can enjoy our food from the comfort of your home! We offer online ordering directly through our WhatsApp link."
  }
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="py-24 bg-[#FAFAF9]" aria-labelledby="faq-heading">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="scroll-reveal">
            <h2 id="faq-heading" className="text-[28px] md:text-[40px] font-bold font-['Satoshi'] text-[#0C0A09] tracking-[-0.02em] mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-[16px] md:text-[18px] text-[#64748B] font-['General_Sans'] leading-[1.6]">
              Everything you need to know about visiting Cafe - The Voyage. Still have questions? Feel free to reach out via WhatsApp.
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div 
                key={index}
                className="border border-[#D6D3D1] rounded-[16px] bg-[#FFFFFF] shadow-[0_4px_10px_rgba(0,0,0,0.1)] overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  aria-expanded={activeIndex === index}
                  aria-controls={`faq-answer-${index}`}
                  className="w-full text-left p-6 flex justify-between items-center font-['Satoshi'] font-bold text-[#0C0A09] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A16207]"
                >
                  {item.question}
                  <span className="text-[#44403C] transition-transform duration-300" aria-hidden="true">
                    {activeIndex === index ? '−' : '+'}
                  </span>
                </button>
                <div 
                  id={`faq-answer-${index}`}
                  className={`grid transition-all duration-300 ease-in-out ${activeIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 pt-0 text-[16px] text-[#64748B] font-['General_Sans'] leading-[1.6] border-t border-[#E8ECF0]">
                      <div className="pt-4">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
