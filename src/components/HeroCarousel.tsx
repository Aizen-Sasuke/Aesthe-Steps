import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight, Heart, Eye } from 'lucide-react';
import { Product, ProductColorVariant } from '../types';

interface HeroCarouselProps {
  products: Product[];
  onSelectProduct: (product: Product, variant?: ProductColorVariant) => void;
  onQuickBuy: (product: Product, size: number | string, variant?: ProductColorVariant) => void;
  onToggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  onScrollToCollection: () => void;
  onSizeNeeded?: (productName: string) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  products,
  onSelectProduct,
  onQuickBuy,
  onToggleFavorite,
  isFavorite,
  onScrollToCollection,
  onSizeNeeded
}) => {
  const bestsellerIndex = products.findIndex((p) => p.badge === 'Bestseller');
  const [currentIndex, setCurrentIndex] = useState(bestsellerIndex >= 0 ? bestsellerIndex : 0);
  const [direction, setDirection] = useState(1);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | string | null>(null);
  const [needsSizePrompt, setNeedsSizePrompt] = useState(false);

  const currentProduct = products[currentIndex];
  const total = products.length;

  useEffect(() => {
    if (currentProduct?.variants && currentProduct.variants.length > 0) {
      setSelectedVariantId(currentProduct.variants[0].id);
    } else {
      setSelectedVariantId(null);
    }
    setSelectedSize(null);
    setNeedsSizePrompt(false);
  }, [currentIndex, currentProduct]);

  const activeVariant = currentProduct.variants?.find((v) => v.id === selectedVariantId) || currentProduct.variants?.[0];
  const displayImage = activeVariant ? activeVariant.image : currentProduct.image;

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const handleHeroAdd = () => {
    if (!selectedSize) {
      setNeedsSizePrompt(true);
      onSizeNeeded?.(currentProduct.name);
      return;
    }
    onQuickBuy(currentProduct, selectedSize, activeVariant);
  };

  const prevIndex = (currentIndex - 1 + total) % total;
  const nextIndex = (currentIndex + 1) % total;
  const prevProduct = products[prevIndex];
  const nextProduct = products[nextIndex];

  return (
    <section
      id="hero-section"
      className="relative min-h-[82vh] lg:min-h-[86vh] w-full overflow-hidden bg-[#FAF6F0] dark:bg-[#0E0E12] flex flex-col justify-center py-8 sm:py-12 transition-colors duration-300"
    >
      {/* Soft ambient blush wash */}
      <div className="absolute top-12 right-1/4 w-96 h-96 rounded-full bg-[#FDF2F4] dark:bg-pink-950/20 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-12 left-10 w-80 h-80 rounded-full bg-[#FCE7F3]/50 dark:bg-zinc-800/20 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Story */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left space-y-5 z-20">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#DB2777] dark:text-pink-400">
              Aesthé Steps · Dhaka
            </p>

            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-normal text-[#18181B] dark:text-zinc-50 leading-[1.06] tracking-tight [text-wrap:balance]">
              Sculpted Heels, <br />
              <span className="italic font-normal text-[#DB2777] dark:text-pink-400">
                Effortless Poise.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#18181B]/80 dark:text-zinc-300 max-w-md leading-relaxed">
              Modern pointed silhouettes, soft suede slides, and crystal-trimmed heels cushioned for all-day ease—curated by us in Dhaka.
            </p>

            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-medium text-[#18181B]/65 dark:text-zinc-400">
              <span>Patent &amp; Soft Suede</span>
              <span aria-hidden="true">·</span>
              <span>Sizes 6–11 &amp; Oversize</span>
              <span aria-hidden="true">·</span>
              <span>Nationwide COD</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                id="hero-explore-btn"
                onClick={onScrollToCollection}
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-[#18181B] dark:bg-pink-600 text-[#FAF6F0] dark:text-white font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#DB2777] dark:hover:bg-pink-500 transition-all duration-200 shadow-sm whitespace-nowrap shrink-0"
              >
                <span>Shop the Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-view-specs"
                onClick={() => onSelectProduct(currentProduct, activeVariant)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/80 dark:bg-zinc-900 border border-pink-300/80 dark:border-zinc-700 text-xs font-bold text-[#DB2777] dark:text-pink-300 hover:bg-pink-50 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap shrink-0"
              >
                <Eye className="w-4 h-4" />
                <span>View Details</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Showcase */}
          <div className="lg:col-span-7 relative flex flex-col items-center justify-center">
            
            <div className="relative w-full max-w-xl flex items-center justify-center z-20">
              
              {/* Symmetric Left Preview */}
              <button
                type="button"
                onClick={handlePrev}
                className="hidden md:block absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 scale-90 opacity-45 hover:opacity-95 hover:scale-95 transition-all duration-200 z-10"
                title={`Previous: ${prevProduct.name}`}
                aria-label={`Preview previous style: ${prevProduct.name}`}
              >
                <div className="w-24 h-20 rounded-2xl overflow-hidden shadow-md border border-pink-200/70 dark:border-zinc-800 rotate-[-6deg] bg-white dark:bg-zinc-900">
                  <img
                    src={prevProduct.image}
                    alt={prevProduct.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </button>

              {/* Center Featured Stage */}
              <div className="relative w-full max-w-[330px] sm:max-w-[400px] md:max-w-[440px] flex items-center justify-center">
                
                <button
                  id="hero-carousel-prev"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute -left-4 sm:-left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#FAF6F0]/95 dark:bg-zinc-900/95 backdrop-blur-md border border-pink-200/80 dark:border-zinc-700 text-[#18181B] dark:text-zinc-200 hover:bg-[#18181B] dark:hover:bg-white hover:text-white dark:hover:text-[#18181B] flex items-center justify-center shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 z-30"
                  aria-label="Previous style"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={`${currentProduct.id}-${selectedVariantId || 'default'}`}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 48, scale: 0.97 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -direction * 48, scale: 0.97 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full aspect-[4/3] select-none cursor-pointer group"
                    onClick={() => onSelectProduct(currentProduct, activeVariant)}
                  >
                    <div className="relative z-10 w-full h-full rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-pink-200/80 dark:border-zinc-800 shadow-lg">
                      <img
                        src={displayImage}
                        alt={currentProduct.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="absolute bottom-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xs text-[#18181B] dark:text-zinc-100 px-3 py-1 rounded-full text-[11px] font-bold shadow-sm border border-pink-200/60 dark:border-zinc-700">
                      Quick View
                    </div>
                  </motion.div>
                </AnimatePresence>

                <button
                  id="hero-carousel-next"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute -right-4 sm:-right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#FAF6F0]/95 dark:bg-zinc-900/95 backdrop-blur-md border border-pink-200/80 dark:border-zinc-700 text-[#18181B] dark:text-zinc-200 hover:bg-[#18181B] dark:hover:bg-white hover:text-white dark:hover:text-[#18181B] flex items-center justify-center shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 z-30"
                  aria-label="Next style"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Symmetric Right Preview */}
              <button
                type="button"
                onClick={handleNext}
                className="hidden md:block absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 scale-90 opacity-45 hover:opacity-95 hover:scale-95 transition-all duration-200 z-10"
                title={`Next: ${nextProduct.name}`}
                aria-label={`Preview next style: ${nextProduct.name}`}
              >
                <div className="w-24 h-20 rounded-2xl overflow-hidden shadow-md border border-pink-200/70 dark:border-zinc-800 rotate-[6deg] bg-white dark:bg-zinc-900">
                  <img
                    src={nextProduct.image}
                    alt={nextProduct.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </button>
            </div>

            {/* Active Shoe Metadata, Inline Shade & Size Selector, CTA */}
            <div className="mt-5 text-center space-y-3 w-full max-w-md z-20">
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#DB2777] dark:text-pink-400">
                  <span>{currentProduct.category}</span>
                  {currentProduct.badge && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{currentProduct.badge}</span>
                    </>
                  )}
                </div>
                <h2 className="font-serif-display text-2xl sm:text-3xl font-normal text-[#18181B] dark:text-zinc-100 tracking-tight">
                  {currentProduct.name}
                </h2>
              </div>

              {/* Shade Selector */}
              {currentProduct.variants && currentProduct.variants.length > 0 && (
                <div className="flex items-center justify-center gap-1.5 flex-wrap">
                  {currentProduct.variants.map((variant) => {
                    const isSelected = activeVariant?.id === variant.id;
                    return (
                      <button
                        key={variant.id}
                        id={`hero-color-${variant.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedVariantId(variant.id);
                        }}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all duration-200 whitespace-nowrap ${
                          isSelected
                            ? 'bg-white dark:bg-zinc-800 shadow-xs ring-1 ring-[#DB2777] dark:ring-pink-400 text-[#DB2777] dark:text-pink-400 font-semibold'
                            : 'bg-white/60 dark:bg-zinc-900/60 hover:bg-white dark:hover:bg-zinc-800 text-[#18181B]/75 dark:text-zinc-300'
                        }`}
                        title={variant.name}
                      >
                        <span
                          className="w-3 h-3 rounded-full border border-black/10 dark:border-white/20 shrink-0"
                          style={{ backgroundColor: variant.colorHex }}
                        />
                        <span>{variant.name}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Inline Size Picker Before Adding */}
              <div className="pt-0.5 space-y-1.5">
                <div
                  className={`inline-flex items-center justify-center gap-1 flex-wrap p-1.5 rounded-2xl transition-all ${
                    needsSizePrompt && !selectedSize
                      ? 'ring-2 ring-[#DB2777] bg-pink-50/90 dark:bg-pink-950/30'
                      : ''
                  }`}
                >
                  {currentProduct.sizes.map((size) => {
                    const isPicked = selectedSize === size;
                    const shortLabel = size === 'Oversize' ? 'OS' : size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => {
                          setSelectedSize(size);
                          setNeedsSizePrompt(false);
                        }}
                        title={size === 'Oversize' ? 'Oversize (EU 42+)' : `Size ${size}`}
                        className={`min-w-[32px] h-7 px-2 rounded-lg text-[11px] font-bold transition-all tabular-nums ${
                          isPicked
                            ? 'bg-[#18181B] dark:bg-pink-600 text-white shadow-2xs'
                            : 'bg-white/80 dark:bg-zinc-900 border border-pink-200/70 dark:border-zinc-700 text-[#18181B]/80 dark:text-zinc-300 hover:border-[#DB2777]'
                        }`}
                      >
                        {shortLabel}
                      </button>
                    );
                  })}
                </div>
                {needsSizePrompt && !selectedSize && (
                  <p className="text-[11px] font-semibold text-[#DB2777] dark:text-pink-400">
                    Choose a size before adding to bag
                  </p>
                )}
              </div>

              {/* Price + Action Baseline */}
              <div className="flex items-center justify-center gap-4 pt-1">
                <div className="text-xl sm:text-2xl font-bold text-[#18181B] dark:text-zinc-100 tabular-nums leading-none">
                  ৳ {currentProduct.priceBDT.toLocaleString()}
                </div>

                <button
                  id={`hero-buy-${currentProduct.id}`}
                  onClick={handleHeroAdd}
                  className="px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#18181B] dark:bg-pink-600 text-white hover:bg-[#DB2777] dark:hover:bg-pink-500 transition-all shadow-sm hover:scale-[1.02] active:scale-95 flex items-center gap-1.5 whitespace-nowrap shrink-0"
                >
                  <span>{selectedSize ? `Add Size ${selectedSize}` : 'Add to Bag'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onToggleFavorite(currentProduct.id)}
                  className="w-10 h-10 rounded-full border border-pink-200/80 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900 flex items-center justify-center text-[#18181B]/60 dark:text-zinc-400 hover:text-[#DB2777] dark:hover:text-pink-400 transition-colors shrink-0"
                  title="Save to Wishlist"
                  aria-label="Save to Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFavorite(currentProduct.id) ? 'fill-[#F472B6] text-[#F472B6]' : ''}`} />
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
