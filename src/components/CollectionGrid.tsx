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
    { id: 'all', label: 'All 3 Core Drops' },
    { id: 'Chunky Slides', label: 'Pink Crystal' },
    { id: 'Criss-Cross Slides', label: 'Midnight Shimmer' },
    { id: 'Bow Slides', label: 'Sage Bow' }
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
    <section id="collection-section" className="py-16 sm:py-24 bg-[#FAF6F0] relative overflow-hidden">
      
      {/* Background ambient blush wash - gentle open field, no boxes */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#FDF2F4] rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-pink-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: Open Editorial Layout (No card boxes) */}
        <div className="text-center space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FDF2F4] border border-pink-200 text-[#DB2777] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            Active Collection • Drop 01
          </div>

          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#18181B] tracking-tight">
            The Three Silhouettes
          </h2>

          <p className="text-sm sm:text-base text-[#18181B]/70 max-w-lg mx-auto leading-relaxed">
            Lightweight cloud cushioning, real crystal detailing, and zero blister drama. Designed for the streets of Dhaka by Hax & Mahin.
          </p>
        </div>

        {/* Minimalist Filter Bar - Open & Unboxed */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-12 border-b border-pink-200/50">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`filter-category-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? 'bg-[#18181B] text-[#FAF6F0]'
                    : 'text-[#18181B]/70 hover:text-[#18181B] hover:bg-pink-100/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick Price Filter */}
          <div className="flex items-center gap-2 text-xs font-medium">
            <span className="text-[#18181B]/60 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-[#DB2777]" /> Filter:
            </span>
            <button
              onClick={() => setPriceFilter(priceFilter === 'under2500' ? 'all' : 'under2500')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                priceFilter === 'under2500'
                  ? 'bg-[#18181B] text-white'
                  : 'text-[#18181B]/70 hover:text-[#18181B] hover:bg-pink-100/50'
              }`}
            >
              Under ৳ 2,500
            </button>
            <button
              onClick={() => setPriceFilter(priceFilter === 'statement' ? 'all' : 'statement')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                priceFilter === 'statement'
                  ? 'bg-[#18181B] text-white'
                  : 'text-[#18181B]/70 hover:text-[#18181B] hover:bg-pink-100/50'
              }`}
            >
              Statement Drops
            </button>
          </div>
        </div>

        {/* Box-Free Editorial Product Showcase */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#18181B]/70 text-sm">No footwear matches your current filter.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setPriceFilter('all');
              }}
              className="mt-4 px-6 py-2 rounded-full bg-[#18181B] text-white text-xs font-bold hover:bg-[#F472B6]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 lg:gap-16">
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
                  <div className="w-full flex items-center justify-between px-2 mb-2 z-20">
                    <span className="text-[11px] font-bold tracking-widest uppercase text-[#DB2777]">
                      {currentVariant?.badge || product.badge || 'Drop 01'}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {/* On-Feet / Studio Toggle */}
                      {product.lifestyleImage && (
                        <button
                          onClick={(e) => toggleProductView(product.id, e)}
                          className="px-2.5 py-1 rounded-full bg-white/80 hover:bg-white text-[10px] font-bold text-[#18181B]/70 hover:text-[#18181B] transition-all flex items-center gap-1 shadow-2xs"
                          title="Toggle On-Feet View"
                        >
                          <Footprints className="w-3 h-3 text-[#DB2777]" />
                          <span>{viewMode === 'shoe' ? 'On Feet' : 'Shoe'}</span>
                        </button>
                      )}

                      {/* Wishlist Heart */}
                      <button
                        id={`fav-btn-${product.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(product.id);
                        }}
                        className="p-1.5 text-[#18181B]/50 hover:text-[#DB2777] hover:scale-125 transition-all"
                        title={favorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
                      >
                        <Heart className={`w-4 h-4 ${favorited ? 'fill-[#F472B6] text-[#F472B6]' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Clean Footwear Floating Silhouette (NO BOXES, NO BORDERS, NO CARDS) */}
                  <div
                    onClick={() => onSelectProduct(product, currentVariant)}
                    className="relative w-full h-72 sm:h-80 flex items-center justify-center cursor-pointer group/shoe my-2"
                  >
                    {/* Natural ambient blur shadow beneath shoe */}
                    <div className="absolute bottom-4 w-44 h-5 rounded-full bg-[#18181B]/10 blur-xl transition-all duration-500 group-hover:scale-110 group-hover:bg-[#18181B]/15" />

                    {viewMode === 'feet' && product.lifestyleImage ? (
                      <div className="relative w-60 h-72 rounded-2xl overflow-hidden shadow-lg animate-fadeIn">
                        <img
                          src={product.lifestyleImage}
                          alt={`${product.name} on feet in Dhaka`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute bottom-2 inset-x-2 py-1 px-2 bg-black/60 backdrop-blur-xs text-white text-center text-[10px] font-bold rounded-lg">
                          Styled On Feet in Dhaka
                        </div>
                      </div>
                    ) : (
                      /* Footwear cutout using mix-blend-multiply to completely remove white background */
                      <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center transition-all duration-300">
                        <img
                          src={cardDisplayImage}
                          alt={currentVariant ? `${product.name} - ${currentVariant.name}` : product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain mix-blend-multiply filter drop-shadow-md group-hover:-translate-y-3 group-hover:scale-108 transition-all duration-400 ease-out"
                        />
                      </div>
                    )}

                    {/* Minimalist View Specs Overlay hint */}
                    <div className="absolute bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                      <span className="px-3 py-1 rounded-full bg-[#18181B] text-white text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 shadow-md">
                        <Eye className="w-3 h-3 text-[#F472B6]" /> Tap for Specs
                      </span>
                    </div>
                  </div>

                  {/* Open Editorial Typography (No boxed card footer) */}
                  <div className="w-full pt-4 space-y-2.5">
                    <div>
                      <h3
                        onClick={() => onSelectProduct(product, currentVariant)}
                        className="font-serif-display text-xl sm:text-2xl font-normal text-[#18181B] hover:text-[#DB2777] transition-colors cursor-pointer"
                      >
                        {product.name}
                      </h3>
                      <p className="text-xs text-[#18181B]/60 font-normal pt-0.5">
                        {product.tagline}
                      </p>
                    </div>

                    {/* Professional Color Swatches */}
                    {product.variants && product.variants.length > 0 && (
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center justify-center gap-2">
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
                                className={`w-5 h-5 rounded-full transition-all duration-200 flex items-center justify-center ${
                                  isSelected
                                    ? 'ring-2 ring-[#DB2777] scale-110'
                                    : 'ring-1 ring-black/10 hover:scale-105'
                                }`}
                                title={`${v.name} - ${v.badge || ''}`}
                              >
                                <span
                                  className="w-3.5 h-3.5 rounded-full"
                                  style={{ backgroundColor: v.colorHex }}
                                />
                              </button>
                            );
                          })}
                        </div>
                        <span className="text-[10px] font-semibold text-[#18181B]/60 tracking-wider">
                          Shade: <span className="text-[#DB2777]">{currentVariant?.name}</span>
                        </span>
                      </div>
                    )}

                    {/* Price and Minimal Bag It Button */}
                    <div className="pt-1 flex items-center justify-center gap-3">
                      <div className="text-base sm:text-lg font-bold text-[#18181B]">
                        ৳ {product.priceBDT.toLocaleString()}
                        <span className="text-[11px] text-[#18181B]/50 font-normal ml-1.5">
                          (${product.priceUSD})
                        </span>
                      </div>

                      <button
                        id={`card-buy-${product.id}`}
                        onClick={() => onQuickBuy(product, currentVariant)}
                        className="px-5 py-2 rounded-full bg-[#18181B] text-white hover:bg-[#DB2777] font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-xs active:scale-95 flex items-center gap-1.5"
                      >
                        <span>Bag It</span>
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Dhaka Delivery Perk */}
                    <p className="text-[10px] text-[#18181B]/50 font-medium">
                      Cash on Delivery across Dhaka & all BD
                    </p>
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

