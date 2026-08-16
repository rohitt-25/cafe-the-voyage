import React from 'react';

/**
 * Reusable Card Component
 * Implements the design system:
 * - 1px solid #D6D3D1 border
 * - 16px outer corner radius
 * - 24px outer padding
 * - Inner surface #FFFFFF with 12px radius
 * - Soft shadow (y-offset 4, blur 10, opacity 0.1)
 * 
 * Accessibility:
 * - Ensures focus-visible states for keyboard navigation
 * - Maintains semantic structure for interactive content
 */
const Card = ({ children, className = "", innerClassName = "", onClick, role = "article" }) => {
  const isInteractive = !!onClick;

  return (
    <div 
      role={role}
      onClick={onClick}
      tabIndex={isInteractive ? 0 : -1}
      onKeyDown={(e) => {
        if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`
        border border-[#D6D3D1] 
        rounded-[16px] 
        p-[24px] 
        bg-[#FAFAF9] 
        transition-all duration-300 ease-out 
        hover:scale-[1.02] 
        hover:rounded-[20px]
        hover:shadow-[0_4px_10px_rgba(0,0,0,0.1)]
        active:scale-[0.98]
        focus-visible:outline-none 
        focus-visible:ring-4 
        focus-visible:ring-[#A16207]/30
        ${isInteractive ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      <div className={`bg-[#FFFFFF] rounded-[12px] h-full ${innerClassName}`}>
        {children}
      </div>
    </div>
  );
};

export default Card;
