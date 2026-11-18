import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
}) => {
  const sizeStyles = {
    sm: {
      icon: 'h-7 w-auto',
      text: 'text-[19px] sm:text-[21px]',
      gap: 'gap-2',
    },
    md: {
      icon: 'h-9 sm:h-10 w-auto',
      text: 'text-[22px] sm:text-[26px]',
      gap: 'gap-2.5',
    },
    lg: {
      icon: 'h-11 sm:h-12 w-auto',
      text: 'text-[28px] sm:text-[32px]',
      gap: 'gap-3',
    },
  }[size];

  return (
    <div
      className={`inline-flex items-center ${sizeStyles.gap} text-[#C93674] dark:text-pink-400 group-hover:text-[#DB2777] dark:group-hover:text-pink-300 transition-colors duration-200 select-none shrink-0 ${className}`}
    >
      {/* Precision-traced Calligraphic Heel Mark */}
      <svg
        viewBox="0 0 118 156"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${sizeStyles.icon} shrink-0`}
        aria-hidden="true"
      >
        <circle cx="106.5" cy="11.5" r="8.8" fill="currentColor" />
        <path
          d="M 106 41
             C 98 39.5, 89 41, 81 52
             C 73 63, 68 82, 62 102
             C 56 124, 49 145, 31 151
             C 11 154, 0 140, 1 124
             C 1.5 116, 3.5 113, 4.5 113
             C 2.5 120, 2.5 134, 11 140
             C 22 147, 40 146, 51 133
             C 61 120, 67 98, 74 78
             C 80 60, 87 49, 97 48
             C 91 72, 85 102, 85 132
             C 85.5 144, 87 151, 88.5 151
             C 88.5 136, 90 110, 94 82
             C 98 62, 103 48, 106 41 Z"
          fill="currentColor"
        />
        <path
          d="M 27.5 100
             C 20 101, 16 104, 17.5 107.5
             C 19.5 110.5, 28 110, 34 108.5
             C 28 108.5, 21 108.5, 19.5 106.5
             C 18.5 104.5, 22 102, 27.5 100 Z"
          fill="currentColor"
        />
      </svg>

      {/* Crisp Editorial Serif Wordmark — Vertically Middle-Aligned */}
      <span
        className={`font-normal tracking-tight leading-none whitespace-nowrap pt-1 ${sizeStyles.text}`}
        style={{ fontFamily: "'Playfair Display', 'Fraunces', Georgia, serif" }}
      >
        Aesthé Steps
      </span>
    </div>
  );
};
