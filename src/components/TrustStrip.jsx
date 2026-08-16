import React from 'react';

const TrustStrip = () => {
  return (
    <div className="w-full border-b border-[#D6D3D1] bg-[#FAFAF9] py-4">
      <div className="mx-auto max-w-7xl px-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
        <div className="flex items-center gap-2 font-mono text-[14px] uppercase tracking-[0.04em] text-[#0C0A09]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A16207] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A16207]"></span>
          </span>
          4.7★ Google Rating
        </div>
        
        <div className="h-4 w-[1px] bg-[#D6D3D1] hidden sm:block"></div>
        
        <div className="font-mono text-[14px] uppercase tracking-[0.04em] text-[#0C0A09]">
          1,275+ Reviews
        </div>
        
        <div className="h-4 w-[1px] bg-[#D6D3D1] hidden sm:block"></div>
        
        <div className="font-mono text-[14px] uppercase tracking-[0.04em] text-[#0C0A09]">
          Koregaon Park, Pune
        </div>
      </div>
    </div>
  );
};

export default TrustStrip;
