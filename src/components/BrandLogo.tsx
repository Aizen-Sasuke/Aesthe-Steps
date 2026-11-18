import React from 'react';
import { BRAND_LOGO_DATA_URI } from '../data/brandLogo';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
}) => {
  const heightClass = {
    sm: 'h-7 sm:h-8',
    md: 'h-9 sm:h-10',
    lg: 'h-11 sm:h-12',
  }[size];

  return (
    <div className={`inline-flex items-center select-none shrink-0 ${className}`}>
      <img
        src={BRAND_LOGO_DATA_URI}
        alt="Aesthé Steps"
        className={`${heightClass} w-auto object-contain object-left dark:brightness-125 transition-opacity duration-200 group-hover:opacity-85`}
        draggable={false}
      />
    </div>
  );
};
