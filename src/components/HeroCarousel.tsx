import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight, Heart, Sparkles, Footprints, Eye, Palette } from 'lucide-react';
import { Product, ProductColorVariant } from '../types';

interface HeroCarouselProps {
  products: Product[];
  onSelectProduct: (product: Product, variant?: ProductColorVariant) => void;
  onQuickBuy: (product: Product, variant?: ProductColorVariant) => void;
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
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);

  const currentProduct = products[currentIndex];
  const total = products.length;

  // Reset selected variant when product changes
  useEffect(() => {
    if (currentProduct?.variants && currentProduct.variants.length > 0) {
      setSelectedVariantId(currentProduct.variants[0].id);
    } else {
      setSelectedVariantId(null);
    }
  }, [currentIndex, currentProduct]);

  const activeVariant = currentProduct.variants?.find(v => v.id === selectedVariantId) || currentProduct.variants?.[0];
  const displayImage = (viewMode === 'product' && activeVariant) ? activeVariant.image : currentProduct.image;

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
    <section className="relative min-h-[86vh] lg:min-h-[90vh] w-full overflow-hidden bg-[#FAF6F0] dark:bg-[#0E0E12] flex flex-col justify-between py-6 sm:py-10 transition-colors duration-300">
      
      {/* Soft warm blush ambient light (no neon) */}
      <div className="absolute top-10 right-1/4 w-96 h-96 rounded-full bg-[#FDF2F4] dark:bg-pink-950/20 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-[#FCE7F3]/60 dark:bg-zinc-800/20 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex-1 flex flex-col justify-center">
        
        {/* Main Grid: Left copy & Right Orbit Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center pt-2 pb-6">
          
          {/* Left Column: Typography & Story */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left space-y-4 sm:space-y-5 z-20">
            
            {/* Dhaka Gen-Z Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FDF2F4] dark:bg-zinc-900 border border-pink-200 dark:border-zinc-800 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#F472B6]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#DB2777] dark:text-pink-400">
                Drop 01 & 02 • All 5 Silhouettes
              </span>
            </div>

            {/* Main Quirky Fashion Editorial Serif Headline */}
            <div className="space-y-1.5 sm:space-y-2">
              <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-normal text-[#18181B] dark:text-zinc-50 leading-[1.05] tracking-tight">
                Cute shoes. <br />
                <span className="italic font-normal text-[#DB2777] dark:text-pink-400">
                  Zero blister drama.
                </span>
              </h1>
              <p className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#18181B]/60 dark:text-zinc-400 uppercase pt-0.5">
                AESTHÉ STEPS • BY HAX & MAHIN
              </p>
            </div>

            {/* Direct, Punchy Gen-Z Copy */}
            <p className="text-sm sm:text-base text-[#18181B]/80 dark:text-zinc-300 max-w-md leading-relaxed font-normal">
              Every cute sandal in Dhaka used to bite your heels. We built slides with 180g featherlight cloud soles and heat-pressed glass crystals that actually stay on when you walk.
            </p>

            {/* Micro Badges (Cash on Delivery & Swaps) - Rhythmic consistent spacing */}
            <div className="flex flex-wrap gap-2 text-xs text-[#18181B] dark:text-zinc-200">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF5EE] dark:bg-zinc-900 border border-pink-200/70 dark:border-zinc-800/80 font-medium text-[11px] sm:text-xs shadow-2xs">
                🛵 Cash on Delivery (All BD)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF5EE] dark:bg-zinc-900 border border-pink-200/70 dark:border-zinc-800/80 font-medium text-[11px] sm:text-xs shadow-2xs">
                ⚡ Free 7-Day Size Swaps
              </span>
            </div>

            {/* CTA Buttons - Harmonized height & responsive wrapping */}
            <div className="flex flex-col min-[380px]:flex-row items-stretch min-[380px]:items-center gap-2.5 sm:gap-3 pt-0.5">
              <button
                id="hero-explore-btn"
                onClick={onScrollToCollection}
                className="group flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-[#18181B] dark:bg-pink-600 text-[#FAF6F0] dark:text-white font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#F472B6] dark:hover:bg-pink-500 hover:text-white transition-all duration-300 shadow-sm"
              >
                <span>Shop The Lineup ({total})</span>
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-3 h-3" />
                </span>
              </button>

              <button
                id="hero-toggle-view"
                onClick={() => setViewMode(viewMode === 'product' ? 'feet' : 'product')}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#FAF5EE] dark:bg-zinc-900 border border-pink-300/80 dark:border-zinc-700 text-xs font-bold text-[#DB2777] dark:text-pink-300 hover:bg-pink-100/60 dark:hover:bg-zinc-800 transition-colors"
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
          <div className="lg:col-span-7 relative flex flex-col items-center justify-center min-h-[400px] sm:min-h-[460px]">
            
            {/* Ambient soft glow wash */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[320px] sm:w-[480px] h-[320px] sm:h-[480px] rounded-full bg-gradient-to-br from-[#FDF5E8]/60 via-pink-100/30 to-transparent dark:from-pink-950/20 dark:via-zinc-900/20 dark:to-transparent blur-3xl opacity-100 dark:opacity-60" />
            </div>

            {/* Carousel Stage (Controls overlaid & docked to image presentation area) */}
            <div className="relative w-full max-w-lg flex items-center justify-center px-0 sm:px-2 z-20">
              
              {/* Orbiting Left Preview Footwear (Desktop only) */}
              <div 
                onClick={handlePrev}
                className="hidden md:block absolute -left-10 lg:-left-16 top-1/2 -translate-y-1/2 scale-65 opacity-35 hover:opacity-90 hover:scale-75 transition-all duration-300 cursor-pointer z-10"
                title={`Switch to ${prevProduct.name}`}
              >
                <div className="w-36 h-36 flex items-center justify-center rotate-[-15deg]">
                  <img
                    src={prevProduct.image}
                    alt={prevProduct.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                  />
                </div>
              </div>

              {/* Center Main Stage Area with Docked Arrow Controls */}
              <div className="relative w-full max-w-[320px] sm:max-w-[380px] md:max-w-[420px] flex items-center justify-center py-2 sm:py-4">
                
                {/* Left Arrow Button - Physically docked & overlaid with subtle frosted scrim */}
                <button
                  id="hero-carousel-prev"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FAF6F0]/85 dark:bg-zinc-900/85 backdrop-blur-md border border-pink-200/60 dark:border-zinc-800 text-[#18181B] dark:text-zinc-200 hover:bg-[#18181B] dark:hover:bg-white hover:text-white dark:hover:text-[#18181B] flex items-center justify-center shadow-xs transition-all duration-200 hover:scale-105 active:scale-95 z-30"
                  aria-label="Previous shoe"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Subtle soft warm pedestal that integrates naturally into cream background */}
                <div className="absolute inset-2 sm:inset-4 rounded-3xl bg-gradient-to-b from-[#F7EFE6]/50 via-[#FAF6F0]/20 to-transparent dark:from-zinc-800/20 dark:via-zinc-900/10 dark:to-transparent pointer-events-none" />

                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={`${currentProduct.id}-${viewMode}-${selectedVariantId || 'default'}`}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 60, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -direction * 60, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-64 h-64 sm:w-76 sm:h-76 md:w-88 md:h-88 flex items-center justify-center select-none cursor-pointer group"
                    onClick={() => onSelectProduct(currentProduct, activeVariant)}
                  >
                    {/* Natural organic ground shadow */}
                    <div className="absolute bottom-5 w-3/5 h-5 rounded-full bg-[#18181B]/4 dark:bg-black/25 blur-lg transition-all duration-500 group-hover:scale-105" />

                    {/* Shoe Presentation - Integrated cleanly without harsh white box or heavy shadow */}
                    {viewMode === 'product' ? (
                      <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        className="relative z-10 w-full h-full flex items-center justify-center p-2"
                      >
                        <img
                          src={displayImage}
                          alt={activeVariant ? `${currentProduct.name} in ${activeVariant.name}` : currentProduct.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-300"
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative z-10 w-60 h-76 sm:w-68 sm:h-84 rounded-2xl overflow-hidden border border-pink-200/50 dark:border-zinc-800/80 shadow-xs"
                      >
                        <img
                          src={currentProduct.lifestyleImage || currentProduct.image}
                          alt={`${currentProduct.name} on feet`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute bottom-3 left-3 right-3 py-1.5 px-3 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-full text-center text-[11px] font-bold text-[#18181B] dark:text-zinc-100 shadow-2xs">
                          Styled On Feet in Dhaka
                        </div>
                      </motion.div>
                    )}

                    {/* Quick view tooltip */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xs text-[#18181B] dark:text-zinc-100 px-3 py-1 rounded-full text-[11px] font-bold shadow-2xs">
                      Tap for specs
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Right Arrow Button - Physically docked & overlaid with subtle frosted scrim */}
                <button
                  id="hero-carousel-next"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FAF6F0]/85 dark:bg-zinc-900/85 backdrop-blur-md border border-pink-200/60 dark:border-zinc-800 text-[#18181B] dark:text-zinc-200 hover:bg-[#18181B] dark:hover:bg-white hover:text-white dark:hover:text-[#18181B] flex items-center justify-center shadow-xs transition-all duration-200 hover:scale-105 active:scale-95 z-30"
                  aria-label="Next shoe"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Orbiting Right Preview Footwear (Desktop only) */}
              <div 
                onClick={handleNext}
                className="hidden md:block absolute -right-10 lg:-right-16 top-1/2 -translate-y-1/2 scale-65 opacity-35 hover:opacity-90 hover:scale-75 transition-all duration-300 cursor-pointer z-10"
                title={`Switch to ${nextProduct.name}`}
              >
                <div className="w-36 h-36 flex items-center justify-center rotate-[15deg]">
                  <img
                    src={nextProduct.image}
                    alt={nextProduct.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                  />
                </div>
              </div>
            </div>

            {/* Active Shoe Details & Immediate BUY Pill */}
            <div className="mt-1 sm:mt-2 text-center space-y-1.5 z-20">
              <h2 className="font-serif-display text-2xl sm:text-3xl font-normal text-[#18181B] dark:text-zinc-100 tracking-tight">
                {currentProduct.name}
              </h2>

              {/* Professional Colorway Swatch Bar */}
              {currentProduct.variants && currentProduct.variants.length > 0 && (
                <div className="flex flex-col items-center gap-1.5 pt-1">
                  <div className="flex items-center gap-1.5 flex-wrap justify-center">
                    <span className="text-[11px] font-bold text-[#18181B]/60 dark:text-zinc-400 uppercase tracking-wider mr-1">
                      Color:
                    </span>
                    {currentProduct.variants.map((variant) => {
                      const isSelected = activeVariant?.id === variant.id;
                      return (
                        <button
                          key={variant.id}
                          id={`hero-color-${variant.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedVariantId(variant.id);
                            setViewMode('product');
                          }}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
                            isSelected
                              ? 'bg-white dark:bg-zinc-800 shadow-sm ring-1 ring-[#DB2777] dark:ring-pink-400 text-[#DB2777] dark:text-pink-400 scale-105'
                              : 'bg-white/60 dark:bg-zinc-900/60 hover:bg-white dark:hover:bg-zinc-800 text-[#18181B]/70 dark:text-zinc-300 hover:text-[#18181B] dark:hover:text-white'
                          }`}
                          title={`${variant.name} (${variant.badge || 'Colorway'})`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/10 dark:border-white/20 shadow-2xs flex-shrink-0"
                            style={{ backgroundColor: variant.colorHex }}
                          />
                          <span className="text-[11px] font-medium">{variant.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Price & Buy Action */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl sm:text-2xl font-bold text-[#18181B] dark:text-zinc-100">
                    ৳ {currentProduct.priceBDT.toLocaleString()}
                  </span>
                  <span className="text-xs text-[#18181B]/50 dark:text-zinc-400 font-medium">
                    (${currentProduct.priceUSD} USD)
                  </span>
                </div>

                <button
                  id={`hero-buy-${currentProduct.id}`}
                  onClick={() => onQuickBuy(currentProduct, activeVariant)}
                  className="px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#18181B] dark:bg-pink-600 text-white hover:bg-[#DB2777] dark:hover:bg-pink-500 hover:text-white transition-all shadow-sm hover:scale-105 active:scale-95 flex items-center gap-1.5"
                >
                  <span>Bag It</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onToggleFavorite(currentProduct.id)}
                  className="p-2 text-[#18181B]/50 dark:text-zinc-400 hover:text-[#DB2777] dark:hover:text-pink-400 hover:scale-110 transition-all"
                  title="Save to Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFavorite(currentProduct.id) ? 'fill-[#F472B6] text-[#F472B6]' : ''}`} />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Silhouette Selector - Open & Minimalist (Features ALL models in the lineup) */}
        <div className="pt-6 pb-2 border-t border-pink-200/40 dark:border-zinc-800/80 mt-4">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-[11px] font-mono tracking-widest text-[#18181B]/70 dark:text-zinc-400 uppercase font-bold">
              Lineup Silhouettes ({currentIndex + 1}/{total})
            </span>
            <span className="text-xs text-[#DB2777] dark:text-pink-400 font-semibold hidden sm:inline-block">
              Tap any pair to inspect in orbit
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {products.map((shoe, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <div
                  key={shoe.id}
                  id={`preview-card-${shoe.id}`}
                  onClick={() => handleSelect(idx)}
                  className={`group relative p-2.5 rounded-xl cursor-pointer transition-all duration-200 flex items-center justify-between gap-2.5 border ${
                    isSelected
                      ? 'bg-pink-100/70 dark:bg-zinc-800/90 border-pink-300 dark:border-pink-500/50 shadow-sm'
                      : 'bg-white/50 dark:bg-zinc-900/60 hover:bg-pink-50/60 dark:hover:bg-zinc-800/60 border-pink-200/40 dark:border-zinc-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {/* Floating Silhouette Thumbnail (mix-blend-multiply with soft circular backdrop) */}
                    <div className="w-12 h-12 rounded-full bg-white/90 dark:bg-white/95 flex items-center justify-center p-1 flex-shrink-0 group-hover:scale-110 transition-transform shadow-2xs">
                      <img
                        src={shoe.image}
                        alt={shoe.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>

                    {/* Info */}
                    <div className="text-left min-w-0">
                      <p className={`text-xs font-bold transition-colors truncate ${isSelected ? 'text-[#DB2777] dark:text-pink-400' : 'text-[#18181B] dark:text-zinc-200'}`}>
                        {shoe.name}
                      </p>
                      <p className="text-[10px] text-[#18181B]/60 dark:text-zinc-400 font-medium truncate">
                        {shoe.tagline}
                      </p>
                      <p className="text-xs font-bold text-[#18181B] dark:text-zinc-100 pt-0.5">
                        ৳ {shoe.priceBDT.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Indicator Dot */}
                  <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 transition-all ${
                    isSelected
                      ? 'bg-[#DB2777] dark:bg-pink-400 scale-125'
                      : 'bg-pink-300/60 dark:bg-zinc-700 group-hover:bg-[#18181B] dark:group-hover:bg-white'
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

