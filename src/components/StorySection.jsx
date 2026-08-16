import React from 'react';

const StorySection = () => {
  return (
    <section id="story" className="px-6 py-16 md:py-24 bg-[color:var(--bg)]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* Editorial Content Block */}
        <div className="flex flex-col gap-6">
          <h2 className="text-[28px] md:text-[40px] font-bold text-[color:var(--ink)] leading-[1.1] font-['Satoshi'] tracking-[-0.02em]">
            Our Story
          </h2>
          <div className="text-[16px] md:text-[18px] text-[color:var(--ink)] leading-[1.6] font-['General_Sans'] space-y-6">
            <p>
              Cafe - The Voyage was built for people who want their coffee break to feel like a small trip — travel-themed corners, globally-inspired plates, and a team that treats every table like regulars. 
            </p>
            <p>
              Today we're one of Koregaon Park's most-loved weekend spots, trusted by over 1,200 reviewers on Google. We believe that a great cafe is more than just a place to eat; it's a departure point for conversation, connection, and the kind of comfort that makes you want to stay just a little bit longer.
            </p>
          </div>
        </div>

        {/* Decorative/Editorial Image Block */}
        <div className="relative border border-[#D6D3D1] rounded-[16px] p-6 bg-[#FFFFFF] shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
          <div className="rounded-[12px] overflow-hidden">
            <img data-fade 
              src="https://lh3.googleusercontent.com/gps-cs-s/AHRPTWn19jT9PySmtgYS3BMvw8ox18bqxJkJL9JwY9QcyMfHA680ND4yAao5F_ZR5cMVVLMZrj-LzJGo7vEArFk3kcKcYaDs14e966vg6o6Dy831ErtS9X5bKmSaprkOf11w2gsuBRtBSRCUVxlb=w1920-h1080-k-no" 
              alt="Cozy interior of Cafe - The Voyage with travel-themed decor"
              className="w-full h-auto object-cover aspect-[4/3]"
              loading="lazy"
            />
          </div>
          <div className="mt-6">
            <p className="text-[13px] font-medium text-[#64748B] font-['General_Sans']">
              Ground Floor, Ashiyana Park, Koregaon Park, Pune 411001
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
