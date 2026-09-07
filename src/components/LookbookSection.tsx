import React from 'react';
import { ArrowRight, Sparkles, MapPin, Feather, HeartHandshake } from 'lucide-react';
import { LOOKBOOK_IMAGES } from '../data/products';

interface LookbookSectionProps {
  onShopNow: () => void;
}

export const LookbookSection: React.FC<LookbookSectionProps> = ({ onShopNow }) => {
  return (
    <section className="relative py-16 sm:py-24 bg-[#FFF9FA] border-t border-b border-pink-200/50 overflow-hidden">
      
      {/* Background ambient light */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-pink-100/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: 3 Vertical Rounded Triptych Cards */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="grid grid-cols-3 gap-3 sm:gap-4 h-[380px] sm:h-[480px]">
              
              {/* Card 1: Urban Portrait On-Feet Pink Crystal */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden group shadow-md border border-pink-200/80 hover:border-[#F472B6] transition-all duration-300 hover:-translate-y-1">
                <img
                  src={LOOKBOOK_IMAGES.lookbook1}
                  alt="Aesthe Steps Crystal Dn Styled in Dhaka"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex flex-col justify-end p-3 sm:p-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-pink-300">
                    Dhanmondi
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-white leading-snug">
                    Crystal Dn
                  </p>
                </div>
              </div>

              {/* Card 2: Handcrafted Midnight Shimmer */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden group shadow-md border border-pink-200/80 hover:border-[#F472B6] transition-all duration-300 hover:-translate-y-2 mt-4 sm:mt-6">
                <img
                  src={LOOKBOOK_IMAGES.lookbook2}
                  alt="Aesthe Steps Midnight Shimmer Slide"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex flex-col justify-end p-3 sm:p-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-pink-300">
                    Dhaka Nights
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-white leading-snug">
                    Shimmer Slide
                  </p>
                </div>
              </div>

              {/* Card 3: Sage Bow Slider */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden group shadow-md border border-pink-200/80 hover:border-[#F472B6] transition-all duration-300 hover:-translate-y-1">
                <img
                  src={LOOKBOOK_IMAGES.lookbook3}
                  alt="Aesthe Steps Sage Bow Slider"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex flex-col justify-end p-3 sm:p-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-pink-300">
                    Gulshan
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-white leading-snug">
                    Sage Bow
                  </p>
                </div>
              </div>

            </div>

            {/* Micro Caption under triptych */}
            <div className="flex items-center justify-between text-xs text-[#18181B]/60 pt-3 px-1">
              <span className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#DB2777]" /> Captured across Dhaka streets
              </span>
              <span className="font-semibold text-[#DB2777]">Drop 01 // All 3 In Stock</span>
            </div>
          </div>

          {/* Right Column: Narrative & SHOP NOW CTA */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6 text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FDF2F4] border border-pink-200 text-[#DB2777] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              The Founders' Philosophy
            </div>

            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#18181B] tracking-tight leading-[1.12]">
              Comfort Awaits <br />
              <span className="italic font-normal text-[#DB2777]">
                Everyday
              </span>
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#18181B]/80 leading-relaxed font-normal">
              <p>
                Hax and Mahin started AESTHÉ STEPS right here in Dhaka with one frustration: every pretty heel or sparkly slide in town gave you brutal blisters after twenty minutes, or cost three times a student budget.
              </p>
              <p>
                We rebuilt everyday sandals from the ground up: 180g featherlight memory foam insoles, cushioned arch contouring, and anti-slip ribbed grip so you can walk from university straight to evening café plans without thinking about your feet.
              </p>
            </div>

            {/* Value Props - Unboxed Open Layout */}
            <div className="grid grid-cols-2 gap-6 pt-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#DB2777]">
                  <Feather className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">180g Featherlight</span>
                </div>
                <p className="text-xs text-[#18181B]/70 leading-normal">
                  Zero fatigue when walking across Banani, Dhanmondi, or campus.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#DB2777]">
                  <HeartHandshake className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Inspect Before Paying</span>
                </div>
                <p className="text-xs text-[#18181B]/70 leading-normal">
                  Cash on delivery anywhere in Bangladesh. Try on at your doorstep.
                </p>
              </div>
            </div>

            {/* SHOP NOW Button */}
            <div className="pt-2">
              <button
                id="lookbook-shop-now-btn"
                onClick={onShopNow}
                className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#18181B] text-white font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#F472B6] transition-all duration-300 shadow-md"
              >
                <span>Shop The Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

