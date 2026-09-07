import React from 'react';
import { Gem, Feather, Truck, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section 
      id="about-section" 
      className="relative py-16 sm:py-24 bg-[#FAF6F0] dark:bg-[#0A0A0D] border-t border-b border-pink-200/50 dark:border-zinc-800/80 transition-colors duration-300 overflow-hidden"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-pink-100/40 dark:bg-pink-950/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-pink-100/30 dark:bg-zinc-800/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Brand Story Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FDF2F4] dark:bg-zinc-900 border border-pink-200 dark:border-zinc-800 text-[#DB2777] dark:text-pink-400 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            Our Brand Story
          </div>

          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#18181B] dark:text-zinc-50 tracking-tight leading-[1.15]">
            Editorial Footwear, <br className="hidden sm:inline" />
            <span className="italic font-normal text-[#DB2777] dark:text-pink-400">
              Made for Dhaka.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#18181B]/80 dark:text-zinc-300 leading-relaxed font-normal pt-1">
            AESTHÉ STEPS is a Dhaka-based footwear brand founded by Hax and Mahin, built for Gen-Z women who want editorial-looking slides without the luxury price tag or endless import wait. We craft runway-ready silhouettes on ultra-cushioned soles engineered for university days, café hops, and city walks.
          </p>

          <div className="pt-2 text-xs font-semibold uppercase tracking-wider text-[#DB2777] dark:text-pink-400">
            Founded by Hax &amp; Mahin • Designed in Dhaka, Bangladesh
          </div>
        </div>

        {/* 3 Trust & Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Pillar 1: Real Crystal Detailing */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white/70 dark:bg-zinc-900/60 border border-pink-200/70 dark:border-zinc-800 hover:border-[#F472B6] dark:hover:border-pink-500/60 transition-all duration-300 group shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#FDF2F4] dark:bg-zinc-800/80 border border-pink-200 dark:border-zinc-700/60 flex items-center justify-center text-[#DB2777] dark:text-pink-400 mb-4 group-hover:scale-105 transition-transform duration-300">
              <Gem className="w-5 h-5" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#18181B] dark:text-zinc-100 mb-2">
              Real Crystal Detailing
            </h3>
            <p className="text-xs sm:text-sm text-[#18181B]/70 dark:text-zinc-400 leading-relaxed">
              Hand-set pavé clusters and genuine faceted crystals that maintain their brilliant luster through everyday wear.
            </p>
          </div>

          {/* Pillar 2: Cloud-Cushioned Comfort */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white/70 dark:bg-zinc-900/60 border border-pink-200/70 dark:border-zinc-800 hover:border-[#F472B6] dark:hover:border-pink-500/60 transition-all duration-300 group shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#FDF2F4] dark:bg-zinc-800/80 border border-pink-200 dark:border-zinc-700/60 flex items-center justify-center text-[#DB2777] dark:text-pink-400 mb-4 group-hover:scale-105 transition-transform duration-300">
              <Feather className="w-5 h-5" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#18181B] dark:text-zinc-100 mb-2">
              Cloud-Cushioned Comfort
            </h3>
            <p className="text-xs sm:text-sm text-[#18181B]/70 dark:text-zinc-400 leading-relaxed">
              180g featherlight high-rebound foam soles contoured with anatomical arch support for all-day zero-blister wear.
            </p>
          </div>

          {/* Pillar 3: Cash on Delivery, Nationwide */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white/70 dark:bg-zinc-900/60 border border-pink-200/70 dark:border-zinc-800 hover:border-[#F472B6] dark:hover:border-pink-500/60 transition-all duration-300 group shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-[#FDF2F4] dark:bg-zinc-800/80 border border-pink-200 dark:border-zinc-700/60 flex items-center justify-center text-[#DB2777] dark:text-pink-400 mb-4 group-hover:scale-105 transition-transform duration-300">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#18181B] dark:text-zinc-100 mb-2">
              Cash on Delivery, Nationwide
            </h3>
            <p className="text-xs sm:text-sm text-[#18181B]/70 dark:text-zinc-400 leading-relaxed">
              Direct doorstep delivery across all districts in Bangladesh with zero advance payment and hassle-free size swaps.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
