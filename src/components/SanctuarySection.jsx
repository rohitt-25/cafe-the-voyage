import React from 'react';

const SanctuarySection = () => {
  return (
    <section id="booking" className="py-2xl md:py-3xl bg-[#FAFAF9]">
      <div className="max-w-7xl mx-auto px-md md:px-lg">
        <div className="relative flex flex-col md:flex-row items-center gap-lg md:gap-0">
          {/* Image Band */}
          <div className="w-full md:w-[65%] overflow-hidden rounded-2xl border border-[#D6D3D1]">
            <img data-fade 
              src="https://lh3.googleusercontent.com/gps-cs-s/AHRPTWn19jT9PySmtgYS3BMvw8ox18bqxJkJL9JwY9QcyMfHA680ND4yAao5F_ZR5cMVVLMZrj-LzJGo7vEArFk3kcKcYaDs14e966vg6o6Dy831ErtS9X5bKmSaprkOf11w2gsuBRtBSRCUVxlb=w1920-h1080-k-no"
              alt="Clean, well-lit interior and seating area of Cafe - The Voyage"
              className="w-full h-[400px] md:h-[500px] object-cover"
              loading="lazy"
            />
            <div className="px-md py-sm bg-[#FFFFFF] border-t border-[#D6D3D1]">
              <p className="font-['General_Sans'] text-[13px] text-[#64748B]">
                Ground Floor, Ashiyana Park, Koregaon Park, Pune 411001
              </p>
            </div>
          </div>

          {/* Overlapping Text Panel */}
          <div className="w-full md:w-[35%] md:-ml-xl z-10">
            <div className="bg-[#FFFFFF] p-lg md:p-xl rounded-2xl border border-[#D6D3D1] shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
              <h2 className="font-['Satoshi'] text-[28px] md:text-[40px] font-bold text-[#0C0A09] leading-[1.1] mb-md tracking-[-0.02em]">
                The Koregaon Park Sanctuary
              </h2>
              <p className="font-['General_Sans'] text-[16px] md:text-[18px] text-[#0C0A09] leading-[1.6]">
                Tucked into Lane 5 off North Main Road, our leafy, sunlit corner of Koregaon Park is built for slow mornings and long weekend lunches — travel-themed decor, warm textures, and a seat that feels like a layover you never want to leave.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SanctuarySection;
