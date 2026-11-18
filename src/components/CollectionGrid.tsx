import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Filter, ArrowUpDown, X } from 'lucide-react';
import { Product, ProductColorVariant } from '../types';
import { STORE_CONTACT } from '../data/products';

interface CollectionGridProps {
  products: Product[];
  onSelectProduct: (product: Product, variant?: ProductColorVariant) => void;
  onQuickBuy: (product: Product, size: number | string, variant?: ProductColorVariant) => void;
  onToggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  searchQuery: string;
  onClearSearch?: () => void;
  onSizeNeeded?: (productName: string) => void;
}

type SortOption = 'featured' | 'price_asc' | 'price_desc' | 'rating';

export const CollectionGrid: React.FC<CollectionGridProps> = ({
  products,
  onSelectProduct,
  onQuickBuy,
  onToggleFavorite,
  isFavorite,
  searchQuery,
  onClearSearch,
  onSizeNeeded
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceFilter, setPriceFilter] = useState<'all' | 'under800' | '800plus'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [selectedSizes, setSelectedSizes] = useState<Record<string, number | string>>({});
  const [promptProductId, setPromptProductId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: `All (${products.length})` },
    { id: 'Pointed Heels', label: 'Pointed Heels' },
    { id: 'Block Slides', label: 'Block Slides' },
    { id: 'Mules', label: 'Mules' }
  ];

  // Filter and sort products
  const filteredProducts = products
    .filter((item) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch = q
        ? item.name.toLowerCase().includes(q) ||
          item.tagline.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.variants?.some((v) => v.name.toLowerCase().includes(q))
        : true;

      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

      const matchesPrice =
        priceFilter === 'all'
          ? true
          : priceFilter === 'under800'
          ? item.priceBDT < 800
          : item.priceBDT >= 800;

      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'price_asc') return a.priceBDT - b.priceBDT;
      if (sortBy === 'price_desc') return b.priceBDT - a.priceBDT;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  const handleCardAdd = (product: Product, variant?: ProductColorVariant) => {
    const pickedSize = selectedSizes[product.id];
    if (!pickedSize) {
      setPromptProductId(product.id);
      onSizeNeeded?.(product.name);
      return;
    }
    setPromptProductId(null);
    onQuickBuy(product, pickedSize, variant);
  };

  return (
    <section id="collection-section" className="py-12 sm:py-16 bg-[#FAF6F0] dark:bg-[#0E0E12] relative overflow-hidden transition-colors duration-300">
      
      {/* Background ambient wash */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#FDF2F4] dark:bg-pink-950/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-pink-100/40 dark:bg-zinc-800/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-2.5 mb-8 sm:mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#DB2777] dark:text-pink-400">
            The Collection
          </p>

          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#18181B] dark:text-zinc-50 tracking-tight [text-wrap:balance]">
            Curated Footwear Edit
          </h2>

          <p className="text-sm sm:text-base text-[#18181B]/70 dark:text-zinc-400 max-w-lg mx-auto leading-relaxed">
            Defined silhouettes, cushioned insoles, and versatile tones curated by {STORE_CONTACT.partners}.
          </p>
        </div>

        {/* Active Search Bar Indicator */}
        {searchQuery.trim() && (
          <div className="mb-5 flex items-center justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-pink-200 dark:border-zinc-800 text-xs text-[#18181B]/80 dark:text-zinc-300 shadow-2xs">
              <span>
                Showing results for <strong className="text-[#DB2777] dark:text-pink-400">&ldquo;{searchQuery.trim()}&rdquo;</strong>
              </span>
              {onClearSearch && (
                <button
                  type="button"
                  onClick={onClearSearch}
                  className="p-0.5 rounded-full hover:bg-pink-100 dark:hover:bg-zinc-800 text-[#18181B]/60 dark:text-zinc-400"
                  aria-label="Clear search query"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Symmetric Filter & Sort Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-5 mb-8 sm:mb-10 border-b border-pink-200/60 dark:border-zinc-800">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`filter-category-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-[#18181B] dark:bg-pink-600 text-[#FAF6F0] dark:text-white shadow-xs'
                    : 'bg-white/70 dark:bg-zinc-900/70 text-[#18181B]/75 dark:text-zinc-300 hover:text-[#18181B] dark:hover:text-white hover:bg-pink-100/50 dark:hover:bg-zinc-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Right Controls: Price Tiers, Sort, and Count */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-medium">
            <span className="text-[#18181B]/60 dark:text-zinc-400 hidden sm:inline tabular-nums mr-1">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'style' : 'styles'}
            </span>

            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-[#DB2777] dark:text-pink-400 shrink-0" />
              <button
                onClick={() => setPriceFilter(priceFilter === 'under800' ? 'all' : 'under800')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors whitespace-nowrap shrink-0 tabular-nums ${
                  priceFilter === 'under800'
                    ? 'bg-[#18181B] dark:bg-pink-600 text-white'
                    : 'bg-white/70 dark:bg-zinc-900/70 text-[#18181B]/75 dark:text-zinc-300 hover:bg-pink-100/50 dark:hover:bg-zinc-800'
                }`}
              >
                Under ৳ 800
              </button>
              <button
                onClick={() => setPriceFilter(priceFilter === '800plus' ? 'all' : '800plus')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors whitespace-nowrap shrink-0 tabular-nums ${
                  priceFilter === '800plus'
                    ? 'bg-[#18181B] dark:bg-pink-600 text-white'
                    : 'bg-white/70 dark:bg-zinc-900/70 text-[#18181B]/75 dark:text-zinc-300 hover:bg-pink-100/50 dark:hover:bg-zinc-800'
                }`}
              >
                ৳ 800+
              </button>
            </div>

            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 dark:bg-zinc-900 border border-pink-200/70 dark:border-zinc-800 text-[#18181B]/80 dark:text-zinc-200">
              <ArrowUpDown className="w-3 h-3 text-[#DB2777] dark:text-pink-400 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                aria-label="Sort collection"
                className="bg-transparent text-xs font-semibold focus:outline-none cursor-pointer pr-1"
              >
                <option value="featured" className="bg-white dark:bg-zinc-900">Featured</option>
                <option value="price_asc" className="bg-white dark:bg-zinc-900">Price: Low to High</option>
                <option value="price_desc" className="bg-white dark:bg-zinc-900">Price: High to Low</option>
                <option value="rating" className="bg-white dark:bg-zinc-900">Top Rated</option>
              </select>
            </label>
          </div>
        </div>

        {/* Equal-Height Aligned Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <p className="text-[#18181B]/70 dark:text-zinc-400 text-sm">No silhouettes match your current selection.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setPriceFilter('all');
                setSortBy('featured');
                onClearSearch?.();
              }}
              className="px-6 py-2.5 rounded-full bg-[#18181B] dark:bg-pink-600 text-white text-xs font-bold hover:bg-[#DB2777] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {filteredProducts.map((product) => {
              const favorited = isFavorite(product.id);
              const activeVariantId = selectedVariants[product.id];
              const currentVariant = product.variants?.find((v) => v.id === activeVariantId) || product.variants?.[0];
              const cardDisplayImage = currentVariant ? currentVariant.image : product.image;
              const pickedSize = selectedSizes[product.id];
              const showSizeError = promptProductId === product.id && !pickedSize;

              return (
                <article
                  key={product.id}
                  id={`product-card-${product.id}`}
                  className="group relative flex flex-col h-full bg-white/85 dark:bg-zinc-900/70 rounded-3xl p-4 sm:p-5 border border-pink-200/70 dark:border-zinc-800 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 select-none"
                >
                  {/* Top Bar: Quiet Category/Badge Left + Wishlist Right */}
                  <div className="w-full h-7 flex items-center justify-between mb-3 gap-2">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#DB2777] dark:text-pink-400 truncate">
                      <span>{product.category}</span>
                      {product.badge && (
                        <>
                          <span aria-hidden="true" className="text-pink-300 dark:text-zinc-600">·</span>
                          <span className="text-[#18181B]/70 dark:text-zinc-300">{product.badge}</span>
                        </>
                      )}
                    </div>

                    <button
                      id={`fav-btn-${product.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(product.id);
                      }}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[#18181B]/50 dark:text-zinc-400 hover:text-[#DB2777] dark:hover:text-pink-400 hover:bg-pink-50 dark:hover:bg-zinc-800 transition-colors shrink-0"
                      title={favorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
                      aria-label={favorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    >
                      <Heart className={`w-4 h-4 ${favorited ? 'fill-[#F472B6] text-[#F472B6]' : ''}`} />
                    </button>
                  </div>

                  {/* Uniform 4:3 Photo Frame */}
                  <div
                    onClick={() => onSelectProduct(product, currentVariant)}
                    className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white dark:bg-zinc-950 border border-pink-100/80 dark:border-zinc-800 cursor-pointer shrink-0"
                  >
                    <img
                      src={cardDisplayImage}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
                      <span className="px-3 py-1 rounded-full bg-[#18181B]/90 dark:bg-zinc-800/95 text-white text-[10px] font-bold tracking-wider uppercase inline-flex items-center gap-1 shadow-sm">
                        <Eye className="w-3 h-3 text-[#F472B6]" /> Quick View
                      </span>
                    </div>
                  </div>

                  {/* Middle Card Content */}
                  <div className="flex-1 flex flex-col pt-4 text-left">
                    <h3
                      onClick={() => onSelectProduct(product, currentVariant)}
                      className="font-serif-display text-lg sm:text-xl font-medium text-[#18181B] dark:text-zinc-100 hover:text-[#DB2777] dark:hover:text-pink-400 transition-colors cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h3>

                    <p className="text-xs text-[#18181B]/70 dark:text-zinc-400 leading-relaxed pt-1 line-clamp-2 min-h-[2.5rem]">
                      {product.tagline}
                    </p>

                    {/* Shade Swatches (Uniform Fixed Height) */}
                    <div className="pt-3 min-h-[3.25rem] flex flex-col justify-center gap-1.5">
                      {product.variants && product.variants.length > 0 && (
                        <>
                          <div className="flex items-center gap-2 flex-wrap">
                            {product.variants.map((v) => {
                              const isSelected = currentVariant?.id === v.id;
                              return (
                                <button
                                  key={v.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedVariants((prev) => ({ ...prev, [product.id]: v.id }));
                                  }}
                                  className={`w-5 h-5 rounded-full transition-all duration-150 flex items-center justify-center ${
                                    isSelected
                                      ? 'ring-2 ring-[#DB2777] dark:ring-pink-400 scale-110'
                                      : 'ring-1 ring-black/15 dark:ring-white/20 hover:scale-105'
                                  }`}
                                  title={v.name}
                                  aria-label={`Select color ${v.name}`}
                                >
                                  <span
                                    className="w-3.5 h-3.5 rounded-full"
                                    style={{ backgroundColor: v.colorHex }}
                                  />
                                </button>
                              );
                            })}
                          </div>
                          <span className="text-[11px] font-medium text-[#18181B]/65 dark:text-zinc-400 truncate">
                            Finish: <span className="text-[#DB2777] dark:text-pink-400 font-semibold">{currentVariant?.name}</span>
                          </span>
                        </>
                      )}
                    </div>

                    {/* Inline Size Picker Row */}
                    <div className="pt-3 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className={`font-semibold uppercase tracking-wider ${showSizeError ? 'text-[#DB2777] dark:text-pink-400' : 'text-[#18181B]/65 dark:text-zinc-400'}`}>
                          {showSizeError ? 'Select a size first' : pickedSize ? `Size ${pickedSize}` : 'Select Size'}
                        </span>
                        <span className="text-[#18181B]/50 dark:text-zinc-500">UK / OS</span>
                      </div>

                      <div
                        className={`grid grid-cols-7 gap-1 p-1 rounded-xl transition-all ${
                          showSizeError
                            ? 'ring-2 ring-[#DB2777] bg-pink-50/70 dark:bg-pink-950/30'
                            : 'bg-[#FAF6F0]/80 dark:bg-zinc-950/60 border border-pink-100/80 dark:border-zinc-800'
                        }`}
                      >
                        {product.sizes.map((size) => {
                          const isSizePicked = pickedSize === size;
                          const shortLabel = size === 'Oversize' ? 'OS' : size;
                          return (
                            <button
                              key={size}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedSizes((prev) => ({ ...prev, [product.id]: size }));
                                if (promptProductId === product.id) setPromptProductId(null);
                              }}
                              title={size === 'Oversize' ? 'Oversize (EU 42+)' : `Size ${size}`}
                              className={`h-7 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all tabular-nums flex items-center justify-center ${
                                isSizePicked
                                  ? 'bg-[#18181B] dark:bg-pink-600 text-white shadow-2xs'
                                  : 'text-[#18181B]/75 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-800'
                              }`}
                            >
                              {shortLabel}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Pinned Equal-Baseline Card Footer */}
                    <div className="mt-auto pt-4 mt-4 border-t border-pink-200/60 dark:border-zinc-800 flex items-center justify-between gap-3">
                      <div className="text-lg sm:text-xl font-bold text-[#18181B] dark:text-zinc-100 tabular-nums leading-none">
                        ৳ {product.priceBDT.toLocaleString()}
                      </div>

                      <button
                        id={`card-buy-${product.id}`}
                        onClick={() => handleCardAdd(product, currentVariant)}
                        className="px-4 py-2.5 rounded-full bg-[#18181B] dark:bg-pink-600 text-white hover:bg-[#DB2777] dark:hover:bg-pink-500 font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-2xs active:scale-95 flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
                      >
                        <span>Add to Bag</span>
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </article>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
