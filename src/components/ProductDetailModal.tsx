import React, { useState, useEffect } from 'react';
import { X, Heart, ShoppingBag, Check, Truck, RefreshCw, Star, Footprints, Eye } from 'lucide-react';
import { Product, ProductColorVariant } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  initialVariant?: ProductColorVariant;
  onClose: () => void;
  onAddToCart: (product: Product, size: number, quantity: number, variant?: ProductColorVariant) => void;
  onToggleFavorite: (productId: string) => void;
  isFavorite: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  initialVariant,
  onClose,
  onAddToCart,
  onToggleFavorite,
  isFavorite
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[0] || 38);
  const [selectedVariant, setSelectedVariant] = useState<ProductColorVariant | undefined>(
    initialVariant || product.variants?.[0]
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [photoView, setPhotoView] = useState<'shoe' | 'feet'>('shoe');

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || 38);
      setSelectedVariant(initialVariant || product.variants?.[0]);
      setPhotoView('shoe');
    }
  }, [product, initialVariant]);

  const activeImage = (photoView === 'shoe' && selectedVariant) ? selectedVariant.image : product.image;

  const handleAdd = () => {
    onAddToCart(product, selectedSize, quantity, selectedVariant);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-[#FAF6F0] border border-pink-200 rounded-3xl overflow-hidden shadow-2xl z-10 my-8">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 border border-pink-200 text-[#18181B]/70 hover:text-[#18181B] transition-colors shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          
          {/* Left Column: Image & On-Feet Stage */}
          <div className="md:col-span-6 p-6 sm:p-8 bg-[#FFF5F7] flex flex-col items-center justify-between relative overflow-hidden border-b md:border-b-0 md:border-r border-pink-200/80">
            
            {/* View Switcher Pill */}
            <div className="flex items-center gap-1.5 p-1 bg-white border border-pink-200 rounded-full text-xs font-bold shadow-2xs z-10 self-start">
              <button
                onClick={() => setPhotoView('shoe')}
                className={`px-3 py-1 rounded-full transition-colors flex items-center gap-1 ${
                  photoView === 'shoe'
                    ? 'bg-[#18181B] text-white'
                    : 'text-[#18181B]/70 hover:text-[#18181B]'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Shoe</span>
              </button>
              <button
                onClick={() => setPhotoView('feet')}
                className={`px-3 py-1 rounded-full transition-colors flex items-center gap-1 ${
                  photoView === 'feet'
                    ? 'bg-[#18181B] text-white'
                    : 'text-[#18181B]/70 hover:text-[#18181B]'
                }`}
              >
                <Footprints className="w-3.5 h-3.5" />
                <span>On Feet</span>
              </button>
            </div>

            {/* Main Picture Display */}
            <div className="relative z-10 w-64 h-64 sm:w-72 sm:h-72 my-4 flex items-center justify-center transition-all duration-300">
              {photoView === 'shoe' ? (
                <img
                  src={activeImage}
                  alt={selectedVariant ? `${product.name} in ${selectedVariant.name}` : product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain mix-blend-multiply filter drop-shadow-lg"
                />
              ) : (
                <div className="w-full h-full rounded-2xl overflow-hidden shadow-md">
                  <img
                    src={product.lifestyleImage || product.image}
                    alt={`${product.name} on feet`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDF2F4] border border-pink-200 text-[#DB2777] text-xs font-bold uppercase tracking-wider">
              {selectedVariant?.badge || product.badge || 'Drop 01'} • True to Size
            </div>
          </div>

          {/* Right Column: Specs, Sizing, and Order */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-4 bg-[#FAF6F0]">
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#DB2777] uppercase tracking-wider">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-[#18181B]/60 font-normal">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#18181B]">
                {product.name}
              </h3>

              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[#18181B]">
                  ৳ {product.priceBDT.toLocaleString()}
                </span>
                <span className="text-xs text-[#18181B]/50 font-medium">
                  (${product.priceUSD} USD)
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#18181B]/80 leading-relaxed font-normal">
                {product.description}
              </p>

              {/* Colorway Swatch Selector */}
              {product.variants && product.variants.length > 0 && (
                <div className="pt-2 border-t border-pink-200/60">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#18181B]">
                      Colorway: <span className="text-[#DB2777] font-semibold">{selectedVariant?.name}</span>
                    </label>
                    {selectedVariant?.badge && (
                      <span className="text-[10px] uppercase font-bold text-[#DB2777] bg-[#FDF2F4] px-2 py-0.5 rounded-full border border-pink-200">
                        {selectedVariant.badge}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {product.variants.map((variant) => {
                      const isSelected = selectedVariant?.id === variant.id;
                      return (
                        <button
                          key={variant.id}
                          onClick={() => {
                            setSelectedVariant(variant);
                            setPhotoView('shoe');
                          }}
                          className={`p-2 rounded-xl text-left border transition-all flex items-center gap-2 ${
                            isSelected
                              ? 'border-[#DB2777] bg-white ring-2 ring-[#DB2777]/20 shadow-2xs'
                              : 'border-pink-200 bg-white/60 hover:bg-white hover:border-pink-300'
                          }`}
                        >
                          <span
                            className="w-4 h-4 rounded-full border border-black/10 flex-shrink-0"
                            style={{ backgroundColor: variant.colorHex }}
                          />
                          <span className="text-[11px] font-semibold text-[#18181B] truncate">
                            {variant.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Craft Specifications */}
              <div className="space-y-1.5 pt-2 border-t border-pink-200/60">
                <span className="text-[11px] font-bold text-[#18181B]/70 uppercase tracking-wider">
                  Construction Specs:
                </span>
                <ul className="space-y-1 text-xs text-[#18181B]/80 font-medium">
                  {product.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#DB2777] flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Size Selector */}
              <div className="pt-2">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#18181B]">
                    Select Size (EU)
                  </label>
                  <span className="text-[11px] text-[#DB2777] font-semibold">Standard Fit</span>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        selectedSize === size
                          ? 'bg-[#18181B] text-white shadow-sm'
                          : 'bg-white border border-pink-200 text-[#18181B]/80 hover:bg-pink-50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-3 border-t border-pink-200/60">
              <div className="flex items-center gap-3">
                <button
                  id="modal-add-to-cart-btn"
                  onClick={handleAdd}
                  disabled={addedAnimation}
                  className={`flex-1 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-sm ${
                    addedAnimation
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#18181B] text-white hover:bg-[#F472B6]'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{addedAnimation ? 'Added to Bag!' : `Bag It (${selectedVariant?.name || 'Selected'})`}</span>
                </button>

                <button
                  onClick={() => onToggleFavorite(product.id)}
                  className="p-3.5 rounded-full bg-white border border-pink-200 text-[#18181B] hover:text-[#DB2777] transition-colors shadow-2xs"
                  title="Save to Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-[#F472B6] text-[#F472B6]' : ''}`} />
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#18181B]/70 px-1 pt-1 font-medium">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#DB2777]" /> Cash on Delivery (All BD)
                </span>
                <span className="flex items-center gap-1">
                  <RefreshCw className="w-3.5 h-3.5 text-[#DB2777]" /> 7-Day Size Exchange
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

