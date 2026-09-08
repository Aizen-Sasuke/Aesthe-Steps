import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Sparkles, Filter, Footprints } from 'lucide-react';
import { Product, ProductColorVariant } from '../types';

interface CollectionGridProps {
  products: Product[];
  onSelectProduct: (product: Product, variant?: ProductColorVariant) => void;
  onQuickBuy: (product: Product, variant?: ProductColorVariant) => void;
  onToggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  searchQuery: string;
}

export const CollectionGrid: React.FC<CollectionGridProps> = ({
  products,
  onSelectProduct,
  onQuickBuy,
  onToggleFavorite,
  isFavorite,
  searchQuery
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceFilter, setPriceFilter] = useState<'all' | 'under2500' | 'statement'>('all');
  const [activeViewMode, setActiveViewMode] = useState<Record<string, 'shoe' | 'feet'>>({});
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  const categories = [
    { id: 'all', label: 'All 5 Drops' },
    { id: 'Crystal Toe-Ring', label: 'Crystal Toe-Ring' },
    { id: 'Criss-Cross Shimmer', label: 'Criss-Cross' },
    { id: 'Bow Slides', label: 'Bow Slides' },
    { id: 'Embellished Heels', label: 'Lumière Pearl' },
    { id: 'Leather Block Heels', label: 'Chloé Bow Heel' }
  ];

  // Filter products by category, price, and search query
  const filteredProducts = products.filter((item) => {
    const matchesSearch = searchQuery
      ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

    const matchesPrice =
      priceFilter === 'all'
        ? true
        : priceFilter === 'under2500'
        ? item.priceBDT <= 2450
        : item.priceBDT > 2450;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const toggleProductView = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveViewMode((prev) => ({
      ...prev,
      [productId]: prev[productId] === 'feet' ? 'shoe' : 'feet'
    }));
  };

  return (
    <section id="collection-section" className="pt-10 sm:pt-14 pb-12 sm:pb-16 bg-[#FAF6F0] dark:bg-[#0E0E12] relative overflow-hidden transition-colors duration-300">
      
      {/* Background ambient blush wash - gentle open field, no boxes */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#FDF2F4] dark:bg-pink-950/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-pink-100/40 dark:bg-zinc-800/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: Open Editorial Layout (No card boxes) */}
        <div className="text-center space-y-3 mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FDF2F4] dark:bg-zinc-900 border border-pink-200 dark:border-zinc-800 text-[#DB2777] dark:text-pink-400 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            Complete Collection • Drops 01 & 02
          </div>

          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#18181B] dark:text-zinc-50 tracking-tight">
            The 5 Designer Silhouettes
          </h2>

          <p className="text-sm sm:text-base text-[#18181B]/70 dark:text-zinc-400 max-w-lg mx-auto leading-relaxed">
            Lightweight cloud cushioning, real crystal detailing, and zero blister drama. Designed for the streets of Dhaka by Hax & Mahin.
          </p>
        </div>

        {/* Minimalist Filter Bar - Open & Unboxed */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-8 sm:mb-10 border-b border-pink-200/50 dark:border-zinc-800">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`filter-category-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? 'bg-[#18181B] dark:bg-pink-600 text-[#FAF6F0] dark:text-white'
                    : 'text-[#18181B]/70 dark:text-zinc-300 hover:text-[#18181B] dark:hover:text-white hover:bg-pink-100/50 dark:hover:bg-zinc-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick Price Filter */}
          <div className="flex items-center gap-2 text-xs font-medium">
            <span className="text-[#18181B]/60 dark:text-zinc-400 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-[#DB2777] dark:text-pink-400" /> Filter:
            </span>
            <button
              onClick={() => setPriceFilter(priceFilter === 'under2500' ? 'all' : 'under2500')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                priceFilter === 'under2500'
                  ? 'bg-[#18181B] dark:bg-pink-600 text-white'
                  : 'text-[#18181B]/70 dark:text-zinc-300 hover:text-[#18181B] dark:hover:text-white hover:bg-pink-100/50 dark:hover:bg-zinc-800'
              }`}
            >
              Under ৳ 2,500
            </button>
            <button
              onClick={() => setPriceFilter(priceFilter === 'statement' ? 'all' : 'statement')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                priceFilter === 'statement'
                  ? 'bg-[#18181B] dark:bg-pink-600 text-white'
                  : 'text-[#18181B]/70 dark:text-zinc-300 hover:text-[#18181B] dark:hover:text-white hover:bg-pink-100/50 dark:hover:bg-zinc-800'
              }`}
            >
              Statement Drops
            </button>
          </div>
        </div>

        {/* Box-Free Editorial Product Showcase */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#18181B]/70 dark:text-zinc-400 text-sm">No footwear matches your current filter.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setPriceFilter('all');
              }}
              className="mt-4 px-6 py-2 rounded-full bg-[#18181B] dark:bg-pink-600 text-white text-xs font-bold hover:bg-[#F472B6]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-12 gap-y-8 sm:gap-y-12 lg:gap-y-16">
            {filteredProducts.map((product) => {
              const favorited = isFavorite(product.id);
              const viewMode = activeViewMode[product.id] || 'shoe';
              const activeVariantId = selectedVariants[product.id];
              const currentVariant = product.variants?.find((v) => v.id === activeVariantId) || product.variants?.[0];
              const cardDisplayImage = (viewMode === 'shoe' && currentVariant) ? currentVariant.image : product.image;

              return (
                <div
                  key={product.id}
                  id={`product-card-${product.id}`}
                  className="group relative flex flex-col items-center text-center select-none"
                >
                  {/* Top Bar: Minimal Badge & Heart (Float freely, no card border) */}
                  <div className="w-full flex items-center justify-between px-1 mb-1.5 z-20 gap-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                      {product.badge && (
                        <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider flex-shrink-0 ${
                          product.badge === 'Bestseller'
                            ? 'bg-[#FDF2F4] text-[#DB2777] border border-pink-300 dark:bg-pink-950/70 dark:text-pink-300 dark:border-pink-800 shadow-2xs'
                            : product.badge === 'New'
                            ? 'bg-amber-50 text-amber-800 border border-amber-300 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-800'
                            : 'bg-zinc-100 text-zinc-800 border border-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700'
                        }`}>
                          {product.badge === 'Bestseller' && <Sparkles className="w-2.5 h-2.5 text-[#DB2777] dark:text-pink-400" />}
                          {product.badge}
                        </span>
                      )}
                      <span className="text-[9px] sm:text-[11px] font-bold tracking-wider uppercase text-[#DB2777] dark:text-pink-400 truncate">
                        {currentVariant?.badge || product.campaignLabel || 'Drop 01'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      {/* On-Feet / Studio Toggle */}
                      {product.lifestyleImage && (
                        <button
                          onClick={(e) => toggleProductView(product.id, e)}
                          className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-white/85 dark:bg-zinc-900/85 hover:bg-white dark:hover:bg-zinc-800 text-[9px] sm:text-[10px] font-bold text-[#18181B]/70 dark:text-zinc-300 hover:text-[#18181B] dark:hover:text-white transition-all flex items-center gap-1 shadow-2xs border border-pink-200/40 dark:border-zinc-800"
                          title="Toggle On-Feet View"
                        >
                          <Footprints className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#DB2777] dark:text-pink-400" />
                          <span className="hidden min-[420px]:inline">{viewMode === 'shoe' ? 'Feet' : 'Shoe'}</span>
                        </button>
                      )}

                      {/* Wishlist Heart */}
                      <button
                        id={`fav-btn-${product.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(product.id);
                        }}
                        className="p-1 sm:p-1.5 text-[#18181B]/50 dark:text-zinc-400 hover:text-[#DB2777] dark:hover:text-pink-400 hover:scale-110 transition-all"
                        title={favorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
                      >
                        <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${favorited ? 'fill-[#F472B6] text-[#F472B6]' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Clean Footwear Floating Silhouette (NO BOXES, NO BORDERS, NO CARDS) */}
                  <div
                    onClick={() => onSelectProduct(product, currentVariant)}
                    className="relative w-full h-44 sm:h-64 lg:h-76 flex items-center justify-center cursor-pointer group/shoe my-1 sm:my-2"
                  >
                    {/* Natural ambient blur shadow beneath shoe */}
                    <div className="absolute bottom-2 sm:bottom-4 w-28 sm:w-44 h-3 sm:h-5 rounded-full bg-[#18181B]/10 dark:bg-pink-500/10 blur-md sm:blur-xl transition-all duration-500 group-hover:scale-110" />

                    {/* Soft illuminated stage behind shoe for dark mode & light mode */}
                    <div className="absolute inset-2 sm:inset-4 rounded-full bg-radial from-white/90 via-white/70 to-transparent dark:from-white/95 dark:via-white/80 dark:to-transparent blur-lg sm:blur-xl pointer-events-none opacity-80 dark:opacity-90 transition-opacity" />

                    {viewMode === 'feet' && product.lifestyleImage ? (
                      <div className="relative w-full max-w-[150px] sm:max-w-[240px] h-38 sm:h-56 md:h-64 rounded-xl sm:rounded-2xl overflow-hidden shadow-md animate-fadeIn z-10">
                        <img
                          src={product.lifestyleImage}
                          alt={`${product.name} on feet in Dhaka`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute bottom-1.5 inset-x-1.5 py-0.5 px-1 bg-black/60 backdrop-blur-xs text-white text-center text-[8px] sm:text-[10px] font-bold rounded">
                          On Feet
                        </div>
                      </div>
                    ) : (
                      /* Footwear cutout using mix-blend-multiply to completely remove white background */
                      <div className="relative z-10 w-full h-36 sm:h-56 md:h-64 flex items-center justify-center transition-all duration-300 p-1 sm:p-2">
                        <img
                          src={cardDisplayImage}
                          alt={currentVariant ? `${product.name} - ${currentVariant.name}` : product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain mix-blend-multiply filter drop-shadow-md group-hover:-translate-y-2 group-hover:scale-105 transition-all duration-300 ease-out"
                        />
                      </div>
                    )}

                    {/* Minimalist View Specs Overlay hint */}
                    <div className="absolute bottom-0 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 hidden sm:block">
                      <span className="px-3 py-1 rounded-full bg-[#18181B] dark:bg-zinc-800 text-white text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 shadow-md border border-pink-200/30 dark:border-zinc-700">
                        <Eye className="w-3 h-3 text-[#F472B6]" /> Tap for Specs
                      </span>
                    </div>
                  </div>

                  {/* Open Editorial Typography (No boxed card footer) */}
                  <div className="w-full pt-1 sm:pt-4 space-y-1.5 sm:space-y-2.5">
                    <div>
                      <h3
                        onClick={() => onSelectProduct(product, currentVariant)}
                        className="font-serif-display text-sm sm:text-xl lg:text-2xl font-normal text-[#18181B] dark:text-zinc-100 hover:text-[#DB2777] dark:hover:text-pink-400 transition-colors cursor-pointer line-clamp-1"
                      >
                        {product.name}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-[#18181B]/60 dark:text-zinc-400 font-normal pt-0.5 line-clamp-1">
                        {product.tagline}
                      </p>
                    </div>

                    {/* Professional Color Swatches */}
                    {product.variants && product.variants.length > 0 && (
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center justify-center gap-1.5 flex-wrap">
                          {product.variants.map((v) => {
                            const isSelected = currentVariant?.id === v.id;
                            return (
                              <button
                                key={v.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedVariants((prev) => ({ ...prev, [product.id]: v.id }));
                                  setActiveViewMode((prev) => ({ ...prev, [product.id]: 'shoe' }));
                                }}
                                className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full transition-all duration-200 flex items-center justify-center ${
                                  isSelected
                                    ? 'ring-2 ring-[#DB2777] dark:ring-pink-400 scale-110'
                                    : 'ring-1 ring-black/10 dark:ring-white/20 hover:scale-105'
                                }`}
                                title={`${v.name} - ${v.badge || ''}`}
                              >
                                <span
                                  className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full"
                                  style={{ backgroundColor: v.colorHex }}
                                />
                              </button>
                            );
                          })}
                        </div>
                        <span className="text-[9px] sm:text-[10px] font-semibold text-[#18181B]/60 dark:text-zinc-400 tracking-wider truncate max-w-full">
                          Shade: <span className="text-[#DB2777] dark:text-pink-400">{currentVariant?.name}</span>
                        </span>
                      </div>
                    )}

                    {/* Price and Minimal Bag It Button */}
                    <div className="pt-1 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 w-full">
                      <div className="text-sm sm:text-base lg:text-lg font-bold text-[#18181B] dark:text-zinc-100">
                        ৳ {product.priceBDT.toLocaleString()}
                      </div>

                      <button
                        id={`card-buy-${product.id}`}
                        onClick={() => onQuickBuy(product, currentVariant)}
                        className="w-full sm:w-auto px-3 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#18181B] dark:bg-pink-600 text-white hover:bg-[#DB2777] dark:hover:bg-pink-500 font-bold text-[10px] sm:text-xs uppercase tracking-wider transition-all duration-200 shadow-2xs active:scale-95 flex items-center justify-center gap-1"
                      >
                        <span>Bag It</span>
                        <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};

