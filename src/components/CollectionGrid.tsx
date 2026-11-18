import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Filter } from 'lucide-react';
import { Product, ProductColorVariant } from '../types';
import { STORE_CONTACT } from '../data/products';

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
  const [priceFilter, setPriceFilter] = useState<'all' | 'under800' | '800plus'>('all');
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  const categories = [
    { id: 'all', label: `All Styles (${products.length})` },
    { id: 'Pointed Heels', label: 'Pointed Heels' },
    { id: 'Block Slides', label: 'Block Slides' },
    { id: 'Mules', label: 'Mules' }
  ];

  // Filter products by category, price tier, and search query
  const filteredProducts = products.filter((item) => {
    const matchesSearch = searchQuery
      ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

    const matchesPrice =
      priceFilter === 'all'
        ? true
        : priceFilter === 'under800'
        ? item.priceBDT < 800
        : item.priceBDT >= 800;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <section id="collection-section" className="py-12 sm:py-16 bg-[#FAF6F0] dark:bg-[#0E0E12] relative overflow-hidden transition-colors duration-300">
      
      {/* Background ambient blush wash */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#FDF2F4] dark:bg-pink-950/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-pink-100/40 dark:bg-zinc-800/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-2.5 mb-8 sm:mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#DB2777] dark:text-pink-400">
            The Collection
          </p>

          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#18181B] dark:text-zinc-50 tracking-tight [text-wrap:balance]">
            Curated Footwear Lineup
          </h2>

          <p className="text-sm sm:text-base text-[#18181B]/70 dark:text-zinc-400 max-w-lg mx-auto leading-relaxed">
            Shop individually by the pair in Sizes 6–11 &amp; Oversize. Designed in Dhaka by {STORE_CONTACT.partners}.
          </p>
        </div>

        {/* Symmetric Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-5 mb-8 sm:mb-10 border-b border-pink-200/60 dark:border-zinc-800">
          
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
                    : 'bg-white/60 dark:bg-zinc-900/60 text-[#18181B]/75 dark:text-zinc-300 hover:text-[#18181B] dark:hover:text-white hover:bg-pink-100/50 dark:hover:bg-zinc-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Retail Price Tier Filter */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
            <span className="text-[#18181B]/65 dark:text-zinc-400 flex items-center gap-1.5 mr-1 whitespace-nowrap">
              <Filter className="w-3.5 h-3.5 text-[#DB2777] dark:text-pink-400" /> Price:
            </span>
            <button
              onClick={() => setPriceFilter(priceFilter === 'under800' ? 'all' : 'under800')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors whitespace-nowrap shrink-0 tabular-nums ${
                priceFilter === 'under800'
                  ? 'bg-[#18181B] dark:bg-pink-600 text-white'
                  : 'bg-white/60 dark:bg-zinc-900/60 text-[#18181B]/75 dark:text-zinc-300 hover:bg-pink-100/50 dark:hover:bg-zinc-800'
              }`}
            >
              Under ৳ 800
            </button>
            <button
              onClick={() => setPriceFilter(priceFilter === '800plus' ? 'all' : '800plus')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors whitespace-nowrap shrink-0 tabular-nums ${
                priceFilter === '800plus'
                  ? 'bg-[#18181B] dark:bg-pink-600 text-white'
                  : 'bg-white/60 dark:bg-zinc-900/60 text-[#18181B]/75 dark:text-zinc-300 hover:bg-pink-100/50 dark:hover:bg-zinc-800'
              }`}
            >
              ৳ 800+
            </button>
          </div>
        </div>

        {/* Equal-Height Aligned Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#18181B]/70 dark:text-zinc-400 text-sm">No footwear matches your current filter.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setPriceFilter('all');
              }}
              className="mt-4 px-6 py-2.5 rounded-full bg-[#18181B] dark:bg-pink-600 text-white text-xs font-bold hover:bg-[#DB2777]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {filteredProducts.map((product) => {
              const favorited = isFavorite(product.id);
              const activeVariantId = selectedVariants[product.id];
              const currentVariant = product.variants?.find((v) => v.id === activeVariantId) || product.variants?.[0];
              const cardDisplayImage = currentVariant ? currentVariant.image : product.image;

              return (
                <article
                  key={product.id}
                  id={`product-card-${product.id}`}
                  className="group relative flex flex-col h-full bg-white/80 dark:bg-zinc-900/70 rounded-3xl p-4 sm:p-5 border border-pink-200/70 dark:border-zinc-800 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 select-none"
                >
                  {/* Top Bar: Quiet Category/Tag Left + Wishlist Heart Right */}
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

                    {/* Subtle Quick View Affordance */}
                    <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
                      <span className="px-3 py-1 rounded-full bg-[#18181B]/90 dark:bg-zinc-800/95 text-white text-[10px] font-bold tracking-wider uppercase inline-flex items-center gap-1 shadow-sm">
                        <Eye className="w-3 h-3 text-[#F472B6]" /> Quick View
                      </span>
                    </div>
                  </div>

                  {/* Card Body with Reserved Uniform Heights for Row Alignment */}
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

                    {/* Colorway Selector Slot (Fixed Min Height Across All Cards) */}
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
                            Shade: <span className="text-[#DB2777] dark:text-pink-400 font-semibold">{currentVariant?.name}</span>
                          </span>
                        </>
                      )}
                    </div>

                    <p className="text-[11px] font-medium text-[#18181B]/60 dark:text-zinc-400 pt-2">
                      Sizes 6–11 · Oversize available
                    </p>

                    {/* Pinned Card Footer: Aligned Baseline Across All Columns */}
                    <div className="mt-auto pt-4 mt-4 border-t border-pink-200/60 dark:border-zinc-800 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-lg sm:text-xl font-bold text-[#18181B] dark:text-zinc-100 tabular-nums leading-none">
                          ৳ {product.priceBDT.toLocaleString()}
                        </div>
                        <span className="text-[11px] text-[#18181B]/55 dark:text-zinc-400">
                          Per pair
                        </span>
                      </div>

                      <button
                        id={`card-buy-${product.id}`}
                        onClick={() => onQuickBuy(product, currentVariant)}
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
