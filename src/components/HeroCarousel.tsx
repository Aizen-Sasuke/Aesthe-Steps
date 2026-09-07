import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight, Heart, Sparkles, Footprints, Eye } from 'lucide-react';
import { Product } from '../types';

interface HeroCarouselProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onQuickBuy: (product: Product) => void;
  onToggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  onScrollToCollection: () => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  products,
  onSelectProduct,
  onQuickBuy,
  onToggleFavorite,
  isFavorite,
  onScrollToCollection
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [viewMode, setViewMode] = useState<'product' | 'feet'>('product');

  const currentProduct = products[currentIndex];
  const total = products.length;

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const handleSelect = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const prevIndex = (currentIndex - 1 + total) % total;
  const nextIndex = (currentIndex + 1) % total;
  const prevProduct = products[prevIndex];
  const nextProduct = products[nextIndex];

  return (
    <section className="relative min-h-[86vh] lg:min-h-[90vh] w-full overflow-hidden bg-[#FAF6F0] flex flex-col justify-between py-6 sm:py-10">
      
      {/* Soft warm blush ambient light (no neon) */}
      <div className="absolute top-10 right-1/4 w-96 h-96 rounded-full bg-[#FDF2F4] blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-[#FCE7F3]/60 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex-1 flex flex-col justify-center">
        
        {/* Main Grid: Left copy & Right Orbit Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center pt-2 pb-6">
          
          {/* Left Column: Typography & Story */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left space-y-5 z-20">
            
            {/* Dhaka Gen-Z Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FDF2F4] border border-pink-200 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#F472B6]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#DB2777]">
                Drop 01 • Dhaka Gen-Z Footwear
              </span>
            </div>

            {/* Main Quirky Fashion Editorial Serif Headline */}
            <div className="space-y-2">
              <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-normal text-[#18181B] leading-[1.05] tracking-tight">
                Cute shoes. <br />
                <span className="italic font-normal text-[#DB2777]">
                  Zero blister drama.
                </span>
              </h1>
              <p className="text-xs font-bold tracking-[0.2em] text-[#18181B]/60 uppercase pt-1">
                AESTHÉ STEPS • BY HAX & MAHIN
              </p>
            </div>

            {/* Direct, Punchy Gen-Z Copy */}
            <p className="text-sm sm:text-base text-[#18181B]/80 max-w-md leading-relaxed font-normal">
              Every cute sandal in Dhaka used to bite your heels. We built slides with 180g featherlight cloud soles and heat-pressed glass crystals that actually stay on when you walk.
            </p>

            {/* Micro Badges (Cash on Delivery & Swaps) */}
            <div className="flex flex-wrap gap-2 text-xs text-[#18181B] pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-pink-200/80 font-medium shadow-2xs">
                🛵 Cash on Delivery (All BD)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-pink-200/80 font-medium shadow-2xs">
                ⚡ Free 7-Day Size Swaps
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                id="hero-explore-btn"
                onClick={onScrollToCollection}
                className="group flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#18181B] text-[#FAF6F0] font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#F472B6] hover:text-white transition-all duration-300 shadow-md hover:shadow-pink-300"
              >
                <span>Shop The Lineup</span>
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>

              <button
                id="hero-toggle-view"
                onClick={() => setViewMode(viewMode === 'product' ? 'feet' : 'product')}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#FDF2F4] border border-pink-300/80 text-xs font-bold text-[#DB2777] hover:bg-pink-100 transition-colors"
              >
                {viewMode === 'product' ? (
                  <>
                    <Footprints className="w-4 h-4" />
                    <span>See On Feet</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    <span>See Shoe Angle</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Clean Product Showcase (Unboxed, open luxury editorial) */}
          <div className="lg:col-span-7 relative flex flex-col items-center justify-center min-h-[420px] sm:min-h-[480px]">
            
            {/* Ambient soft glow wash (NO concentric ring borders or dashed circles) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[360px] sm:w-[500px] h-[360px] sm:h-[500px] rounded-full bg-gradient-to-br from-[#FDF2F4] via-pink-50/40 to-transparent blur-2xl" />
            </div>

            {/* Carousel Stage Controls */}
            <div className="relative w-full max-w-xl flex items-center justify-between px-2 sm:px-4 z-20">
              
              {/* Left Arrow Button (Minimal unboxed aesthetic) */}
              <button
                id="hero-carousel-prev"
                onClick={handlePrev}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-[#18181B] text-[#18181B] hover:text-white flex items-center justify-center shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 z-30"
                aria-label="Previous shoe"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Orbiting Left Preview Footwear (Clickable floating silhouette) */}
              <div 
                onClick={handlePrev}
                className="hidden sm:block absolute left-2 md:left-6 top-1/2 -translate-y-1/2 -translate-x-1/4 scale-65 opacity-40 hover:opacity-90 hover:scale-75 transition-all duration-300 cursor-pointer z-10"
                title={`Switch to ${prevProduct.name}`}
              >
                <div className="w-40 h-40 flex items-center justify-center rotate-[-15deg]">
                  <img
                    src={prevProduct.image}
                    alt={prevProduct.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain mix-blend-multiply filter drop-shadow-md"
                  />
                </div>
              </div>

              {/* Center Main Hero Shoe with Levitation & Lifestyle Toggle */}
              <div className="relative flex-1 flex flex-col items-center justify-center py-4">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={`${currentProduct.id}-${viewMode}`}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 80, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -direction * 80, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center select-none cursor-pointer group"
                    onClick={() => onSelectProduct(currentProduct)}
                  >
                    {/* Natural organic ground shadow */}
                    <div className="absolute bottom-6 w-3/4 h-7 rounded-full bg-[#18181B]/8 blur-xl transition-all duration-500 group-hover:scale-110" />

                    {/* Shoe Cutout with Background Removed (mix-blend-multiply) or Full-Bleed Styled Photo */}
                    {viewMode === 'product' ? (
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        className="relative z-10 w-full h-full flex items-center justify-center"
                      >
                        <img
                          src={currentProduct.image}
                          alt={currentProduct.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain mix-blend-multiply filter drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative z-10 w-64 h-80 sm:w-72 sm:h-92 rounded-3xl overflow-hidden shadow-xl"
                      >
                        <img
                          src={currentProduct.lifestyleImage || currentProduct.image}
                          alt={`${currentProduct.name} on feet`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute bottom-3 left-3 right-3 py-1.5 px-3 bg-white/90 backdrop-blur-md rounded-full text-center text-[11px] font-bold text-[#18181B] shadow">
                          Styled On Feet in Dhaka
                        </div>
                      </motion.div>
                    )}

                    {/* Quick view tooltip */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-xs text-[#18181B] px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                      Tap for specs
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Orbiting Right Preview Footwear (Clickable) */}
              <div 
                onClick={handleNext}
                className="hidden sm:block absolute right-2 md:right-6 top-1/2 -translate-y-1/2 translate-x-1/4 scale-65 opacity-40 hover:opacity-90 hover:scale-75 transition-all duration-300 cursor-pointer z-10"
                title={`Switch to ${nextProduct.name}`}
              >
                <div className="w-40 h-40 flex items-center justify-center rotate-[15deg]">
                  <img
                    src={nextProduct.image}
                    alt={nextProduct.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain mix-blend-multiply filter drop-shadow-md"
                  />
                </div>
              </div>

              {/* Right Arrow Button (Minimal unboxed aesthetic) */}
              <button
                id="hero-carousel-next"
                onClick={handleNext}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-[#18181B] text-[#18181B] hover:text-white flex items-center justify-center shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 z-30"
                aria-label="Next shoe"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Active Shoe Details & Immediate BUY Pill */}
            <div className="mt-2 text-center space-y-1.5 z-20">
              <div className="flex items-center justify-center gap-2">
                <span className="text-xs font-bold tracking-wider text-[#DB2777] uppercase">
                  {currentProduct.badge || 'Drop 01'}
                </span>
                <span className="text-pink-300">•</span>
                <span className="text-xs text-[#18181B]/70 font-medium">
                  {currentProduct.category}
                </span>
              </div>

              <h2 className="font-serif-display text-2xl sm:text-3xl font-normal text-[#18181B] tracking-tight">
                {currentProduct.name}
              </h2>

              {/* Price & Buy Action */}
              <div className="flex items-center justify-center gap-3 pt-1">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl sm:text-2xl font-bold text-[#18181B]">
                    ৳ {currentProduct.priceBDT.toLocaleString()}
                  </span>
                  <span className="text-xs text-[#18181B]/50 font-medium">
                    (${currentProduct.priceUSD} USD)
                  </span>
                </div>

                <button
                  id={`hero-buy-${currentProduct.id}`}
                  onClick={() => onQuickBuy(currentProduct)}
                  className="px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#18181B] text-white hover:bg-[#DB2777] hover:text-white transition-all shadow-sm hover:scale-105 active:scale-95 flex items-center gap-1.5"
                >
                  <span>Bag It</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onToggleFavorite(currentProduct.id)}
                  className="p-2 text-[#18181B]/50 hover:text-[#DB2777] hover:scale-110 transition-all"
                  title="Save to Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFavorite(currentProduct.id) ? 'fill-[#F472B6] text-[#F472B6]' : ''}`} />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Silhouette Selector - Open & Minimalist (NO heavy boxed cards) */}
        <div className="pt-6 pb-2 border-t border-pink-200/40 mt-4">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-[11px] font-mono tracking-widest text-[#18181B]/70 uppercase font-bold">
              Select Drop ({currentIndex + 1}/{total})
            </span>
            <span className="text-xs text-[#DB2777] font-semibold hidden sm:inline-block">
              Tap any pair to swap
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {products.map((shoe, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <div
                  key={shoe.id}
                  id={`preview-card-${shoe.id}`}
                  onClick={() => handleSelect(idx)}
                  className={`group relative p-2.5 rounded-xl cursor-pointer transition-all duration-200 flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-pink-100/50 shadow-2xs'
                      : 'hover:bg-pink-50/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Floating Silhouette Thumbnail (mix-blend-multiply) */}
                    <div className="w-14 h-14 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <img
                        src={shoe.image}
                        alt={shoe.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>

                    {/* Info */}
                    <div className="text-left">
                      <p className={`text-xs font-bold transition-colors line-clamp-1 ${isSelected ? 'text-[#DB2777]' : 'text-[#18181B]'}`}>
                        {shoe.name}
                      </p>
                      <p className="text-[10px] text-[#18181B]/60 font-medium">
                        {shoe.tagline}
                      </p>
                      <p className="text-xs font-bold text-[#18181B] pt-0.5">
                        ৳ {shoe.priceBDT.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Indicator Dot */}
                  <div className={`w-2.5 h-2.5 rounded-full transition-all ${
                    isSelected
                      ? 'bg-[#DB2777] scale-125'
                      : 'bg-pink-300/60 group-hover:bg-[#18181B]'
                  }`} />
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

