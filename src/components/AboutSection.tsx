import React from 'react';
import { Sparkles, Ruler, Truck } from 'lucide-react';
import { STORE_CONTACT, DELIVERY_RATES } from '../data/products';

export const AboutSection: React.FC = () => {
  return (
    <section 
      id="about-section" 
      className="relative py-12 sm:py-16 bg-[#FAF6F0] dark:bg-[#0A0A0D] border-t border-pink-200/50 dark:border-zinc-800/80 transition-colors duration-300 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-pink-100/40 dark:bg-pink-950/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-pink-100/30 dark:bg-zinc-800/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Brand Story Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-10 sm:mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#DB2777] dark:text-pink-400">
            Our Story
          </p>

          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#18181B] dark:text-zinc-50 tracking-tight leading-[1.15] [text-wrap:balance]">
            AESTHÉ STEPS <br className="hidden sm:inline" />
            <span className="italic font-normal text-[#DB2777] dark:text-pink-400">
              Curated in Dhaka.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#18181B]/80 dark:text-zinc-300 leading-relaxed font-normal pt-1">
            Co-founded by {STORE_CONTACT.partners}, AESTHÉ STEPS pairs sharp contemporary silhouettes with gentle cushioning—bringing considered design straight to your door across Bangladesh.
          </p>

          <div className="pt-1 text-xs font-semibold uppercase tracking-wider text-[#DB2777] dark:text-pink-400">
            Partners: {STORE_CONTACT.partners} · {STORE_CONTACT.location}
          </div>
        </div>

        {/* Equal-Height 3 Boutique Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          
          <div className="p-6 sm:p-7 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-pink-200/70 dark:border-zinc-800 hover:border-[#F472B6] dark:hover:border-pink-500/60 transition-all duration-300 group shadow-xs flex flex-col h-full">
            <div className="w-12 h-12 rounded-xl bg-[#FDF2F4] dark:bg-zinc-800/80 border border-pink-200 dark:border-zinc-700/60 flex items-center justify-center text-[#DB2777] dark:text-pink-400 mb-4 group-hover:scale-105 transition-transform duration-300 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#18181B] dark:text-zinc-100 mb-2">
              Balanced Silhouettes
            </h3>
            <p className="text-xs sm:text-sm text-[#18181B]/75 dark:text-zinc-400 leading-relaxed flex-1">
              Clean pointed mules, delicate crystal straps, and cushioned block slides curated from ৳690 to ৳990 with elevated everyday polish.
            </p>
          </div>

          <div className="p-6 sm:p-7 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-pink-200/70 dark:border-zinc-800 hover:border-[#F472B6] dark:hover:border-pink-500/60 transition-all duration-300 group shadow-xs flex flex-col h-full">
            <div className="w-12 h-12 rounded-xl bg-[#FDF2F4] dark:bg-zinc-800/80 border border-pink-200 dark:border-zinc-700/60 flex items-center justify-center text-[#DB2777] dark:text-pink-400 mb-4 group-hover:scale-105 transition-transform duration-300 shrink-0">
              <Ruler className="w-5 h-5" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#18181B] dark:text-zinc-100 mb-2">
              Sizes 6–11 &amp; Oversize
            </h3>
            <p className="text-xs sm:text-sm text-[#18181B]/75 dark:text-zinc-400 leading-relaxed flex-1">
              Consistent sizing spanning Sizes 6–11 (EU 36–41) plus dedicated Oversize fits across every silhouette, backed by 7-day size exchanges.
            </p>
          </div>

          <div className="p-6 sm:p-7 rounded-2xl bg-white/80 dark:bg-zinc-900/60 border border-pink-200/70 dark:border-zinc-800 hover:border-[#F472B6] dark:hover:border-pink-500/60 transition-all duration-300 group shadow-xs flex flex-col h-full">
            <div className="w-12 h-12 rounded-xl bg-[#FDF2F4] dark:bg-zinc-800/80 border border-pink-200 dark:border-zinc-700/60 flex items-center justify-center text-[#DB2777] dark:text-pink-400 mb-4 group-hover:scale-105 transition-transform duration-300 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#18181B] dark:text-zinc-100 mb-2">
              Doorstep COD &amp; Care
            </h3>
            <p className="text-xs sm:text-sm text-[#18181B]/75 dark:text-zinc-400 leading-relaxed flex-1">
              Flat ৳{DELIVERY_RATES.insideDhaka} inside Dhaka &amp; ৳{DELIVERY_RATES.outsideDhaka} nationwide delivery. Call or message{' '}
              <a
                href={`https://wa.me/${STORE_CONTACT.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#DB2777] dark:text-pink-400 underline underline-offset-2"
              >
                {STORE_CONTACT.primaryPhone}
              </a>{' '}
              anytime.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
