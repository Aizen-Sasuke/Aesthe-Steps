import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
}) => {
  const sizeClasses = {
    sm: {
      wordmark: 'text-base sm:text-xl md:text-2xl',
      tagline: 'text-[7px] sm:text-[8px] md:text-[9px] tracking-[0.2em] sm:tracking-[0.22em] mt-0.5',
    },
    md: {
      wordmark: 'text-[17px] min-[380px]:text-[19px] sm:text-2xl md:text-3xl',
      tagline: 'text-[7.5px] min-[380px]:text-[8.5px] sm:text-[9px] md:text-[10px] tracking-[0.2em] sm:tracking-[0.24em] mt-0.5 sm:mt-1',
    },
    lg: {
      wordmark: 'text-2xl sm:text-3xl md:text-4xl',
      tagline: 'text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.24em] sm:tracking-[0.26em] mt-1 sm:mt-1.5',
    },
  }[size];

  return (
    <div className={`flex flex-col items-start leading-none select-none flex-shrink-0 ${className}`}>
      {/* Serif Italic Wordmark matching reference logo */}
      <span 
        className={`font-serif-display italic font-medium tracking-tight text-[#18181B] dark:text-[#FAF6F0] group-hover:text-[#DB2777] dark:group-hover:text-pink-400 transition-colors leading-[1.05] whitespace-nowrap ${sizeClasses.wordmark}`}
        style={{ fontFamily: "'Playfair Display', 'Fraunces', Georgia, serif" }}
      >
        Aesthé Steps
      </span>

      {/* Small letter-spaced caps tagline */}
      {showSubtitle && (
        <span 
          className={`font-sans uppercase font-medium text-[#52525B] dark:text-zinc-400 pl-0.5 transition-colors whitespace-nowrap ${sizeClasses.tagline}`}
        >
          Walk Aesthetic
        </span>
      )}
    </div>
  );
};
