import React from 'react';
import { ArrowRight, MapPin, Truck, Phone } from 'lucide-react';
import { LOOKBOOK_IMAGES, STORE_CONTACT, DELIVERY_RATES } from '../data/products';

interface LookbookSectionProps {
  onShopNow: () => void;
}

export const LookbookSection: React.FC<LookbookSectionProps> = ({ onShopNow }) => {
  return (
    <section className="relative py-12 sm:py-16 bg-[#FFF9FA] dark:bg-[#0A0A0D] border-t border-pink-200/50 dark:border-zinc-800/80 overflow-hidden transition-colors duration-300">
      
      {/* Background ambient light */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-pink-100/60 dark:bg-pink-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Symmetric 3-Card Triptych */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="grid grid-cols-3 gap-3 sm:gap-4 h-[320px] sm:h-[400px] items-stretch">
              
              {/* Card 1: YSL Heel */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden group shadow-md border border-pink-200/80 dark:border-zinc-800 hover:border-[#F472B6] transition-all duration-300">
                <img
                  src={LOOKBOOK_IMAGES.lookbook1}
                  alt="YSL Heel"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-end p-3 sm:p-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-pink-300 tabular-nums">
                    ৳ 920
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-white leading-snug">
                    YSL Heel
                  </p>
                </div>
              </div>

              {/* Card 2: Pointed Toe Mule */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden group shadow-md border border-pink-200/80 dark:border-zinc-800 hover:border-[#F472B6] transition-all duration-300">
                <img
                  src={LOOKBOOK_IMAGES.lookbook2}
                  alt="Pointed Toe Mule"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-end p-3 sm:p-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-pink-300 tabular-nums">
                    ৳ 850
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-white leading-snug">
                    Pointed Toe Mule
                  </p>
                </div>
              </div>

              {/* Card 3: 2 Strap Block Heel */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden group shadow-md border border-pink-200/80 dark:border-zinc-800 hover:border-[#F472B6] transition-all duration-300">
                <img
                  src={LOOKBOOK_IMAGES.lookbook3}
                  alt="2 Strap Block Heel"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-end p-3 sm:p-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-pink-300 tabular-nums">
                    ৳ 690
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-white leading-snug">
                    2 Strap Block Heel
                  </p>
                </div>
              </div>

            </div>

            {/* Aligned Caption under triptych */}
            <div className="flex items-center justify-between text-xs text-[#18181B]/65 dark:text-zinc-400 pt-3.5 px-1">
              <span className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#DB2777] dark:text-pink-400" /> Dhaka Boutique Lookbook
              </span>
              <span className="font-semibold text-[#DB2777] dark:text-pink-400">Sizes 6–11 &amp; Oversize</span>
            </div>
          </div>

          {/* Right Column: Boutique Story & Doorstep Delivery Info */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6 text-left">
            
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#DB2777] dark:text-pink-400">
              Effortless Everyday Style
            </p>

            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#18181B] dark:text-zinc-50 tracking-tight leading-[1.12] [text-wrap:balance]">
              Styled For <br />
              <span className="italic font-normal text-[#DB2777] dark:text-pink-400">
                Every Step.
              </span>
            </h2>

            <div className="space-y-3 text-sm sm:text-base text-[#18181B]/80 dark:text-zinc-300 leading-relaxed font-normal">
              <p>
                Order any silhouette piece by piece—pick your exact shade and size from Sizes 6–11 or Oversize and check out straight to WhatsApp with Cash on Delivery.
              </p>
              <p>
                Curated by {STORE_CONTACT.partners}, every pair blends cushioned all-day comfort with clean Dhaka editorial polish.
              </p>
            </div>

            {/* Equal-Height Boutique Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 items-stretch">
              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-pink-200/80 dark:border-zinc-800 flex flex-col justify-between space-y-1.5 shadow-2xs h-full">
                <div className="flex items-center gap-2 text-[#DB2777] dark:text-pink-400">
                  <Phone className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Customer Care</span>
                </div>
                <p className="text-sm font-bold text-[#18181B] dark:text-zinc-100">
                  {STORE_CONTACT.partners}
                </p>
                <p className="text-xs text-[#18181B]/75 dark:text-zinc-300 font-mono tabular-nums">
                  {STORE_CONTACT.primaryPhone} / {STORE_CONTACT.secondaryPhone}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-pink-200/80 dark:border-zinc-800 flex flex-col justify-between space-y-1.5 shadow-2xs h-full">
                <div className="flex items-center gap-2 text-[#DB2777] dark:text-pink-400">
                  <Truck className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Flat Delivery Fee</span>
                </div>
                <p className="text-sm font-bold text-[#18181B] dark:text-zinc-100 tabular-nums">
                  ৳{DELIVERY_RATES.insideDhaka} Dhaka · ৳{DELIVERY_RATES.outsideDhaka} Outside
                </p>
                <p className="text-xs text-[#18181B]/75 dark:text-zinc-300">
                  Inspect on doorstep with COD
                </p>
              </div>
            </div>

            {/* Primary Browse CTA */}
            <div className="pt-1">
              <button
                id="lookbook-shop-now-btn"
                onClick={onShopNow}
                className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#18181B] dark:bg-pink-600 text-white font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#DB2777] dark:hover:bg-pink-500 transition-all duration-300 shadow-sm"
              >
                <span>Explore Full Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>

        {/* Equal-Height Split Colorway Feature Card */}
        {LOOKBOOK_IMAGES.paletteLookbook && (
          <div className="mt-14 sm:mt-16 pt-12 border-t border-pink-200/60 dark:border-zinc-800">
            <div className="relative rounded-3xl overflow-hidden bg-[#FAF6F0] dark:bg-zinc-900 border border-pink-200/80 dark:border-zinc-800 shadow-lg grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* Left Column: Copy & Shades */}
              <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-center space-y-5 text-left order-2 lg:order-1">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#DB2777] dark:text-pink-400">
                  Signature Palette
                </p>

                <h3 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-normal text-[#18181B] dark:text-zinc-100 tracking-tight [text-wrap:balance]">
                  Patent, Suede &amp; Crystal. <br />
                  <span className="italic text-[#DB2777] dark:text-pink-400">Curated For Your Wardrobe.</span>
                </h3>

                <p className="text-sm text-[#18181B]/80 dark:text-zinc-300 leading-relaxed font-normal">
                  From glossy Maroon and Chocolate Brown patent mules to soft Black, Tan, and Cream suede block heels, find shades tailored for effortless everyday outfits and festive evenings.
                </p>

                {/* Color Chips */}
                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-bold text-[#18181B]/60 dark:text-zinc-400 uppercase tracking-wider">
                    Available Shades:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: 'Maroon', color: '#7F1D1D' },
                      { name: 'Black', color: '#18181B' },
                      { name: 'Chocolate Brown', color: '#4A2C2A' },
                      { name: 'Cream Ivory', color: '#F3ECE1' },
                      { name: 'Tan Brown', color: '#9A5B25' },
                      { name: 'Cream Beige', color: '#D8C3AD' },
                      { name: 'Blush Pink', color: '#F472B6' }
                    ].map((shade, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white dark:bg-zinc-800 border border-pink-200 dark:border-zinc-700 text-[11px] font-medium text-[#18181B] dark:text-zinc-200 shadow-2xs"
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-black/10 dark:border-white/20 shrink-0"
                          style={{ backgroundColor: shade.color }}
                        />
                        <span>{shade.name}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onShopNow}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#18181B] dark:bg-pink-600 text-white hover:bg-[#DB2777] dark:hover:bg-pink-500 text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
                  >
                    <span>Browse All Styles</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Column: Full-Bleed Stretched Feature Image */}
              <div className="lg:col-span-6 min-h-[280px] sm:min-h-[360px] lg:min-h-full relative overflow-hidden order-1 lg:order-2">
                <img
                  src={LOOKBOOK_IMAGES.paletteLookbook}
                  alt="Crystal Strap Heels in Black Suede and Maroon Patent"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:hidden" />
                <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6 px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xs text-[#18181B] dark:text-zinc-100 text-[11px] font-bold shadow-md border border-pink-200/50 dark:border-zinc-700 tabular-nums">
                  Crystal Strap · ৳ 790
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
