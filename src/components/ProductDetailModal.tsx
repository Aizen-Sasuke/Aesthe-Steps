import React, { useState, useEffect } from 'react';
import { X, Heart, ShoppingBag, Check, Truck, Phone, Star, Ruler, Minus, Plus } from 'lucide-react';
import { Product, ProductColorVariant } from '../types';
import { STORE_CONTACT, DELIVERY_RATES } from '../data/products';

interface ProductDetailModalProps {
  product: Product | null;
  initialVariant?: ProductColorVariant;
  onClose: () => void;
  onAddToCart: (product: Product, size: number | string, quantity: number, variant?: ProductColorVariant) => void;
  onToggleFavorite: (productId: string) => void;
  isFavorite: boolean;
  onOpenSizeGuide: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  initialVariant,
  onClose,
  onAddToCart,
  onToggleFavorite,
  isFavorite,
  onOpenSizeGuide
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<number | string>(product.sizes[0] || 6);
  const [selectedVariant, setSelectedVariant] = useState<ProductColorVariant | undefined>(
    initialVariant || product.variants?.[0]
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || 6);
      setSelectedVariant(initialVariant || product.variants?.[0]);
      setQuantity(1);
    }
  }, [product, initialVariant]);

  const activeImage = selectedVariant ? selectedVariant.image : product.image;

  const handleAdd = () => {
    onAddToCart(product, selectedSize, quantity, selectedVariant);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 550);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/55 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-[#FAF6F0] dark:bg-[#121217] border border-pink-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-2xl z-10 my-8 transition-colors">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 dark:bg-zinc-800/90 border border-pink-200 dark:border-zinc-700 text-[#18181B]/70 dark:text-zinc-300 hover:text-[#18181B] dark:hover:text-white flex items-center justify-center transition-colors shadow-sm"
          aria-label="Close product details"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
          
          {/* Left Column: Product Photography */}
          <div className="md:col-span-6 p-6 sm:p-8 bg-[#FFF5F7] dark:bg-zinc-950/60 flex flex-col items-center justify-between relative overflow-hidden border-b md:border-b-0 md:border-r border-pink-200/80 dark:border-zinc-800">
            
            <div className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#DB2777] dark:text-pink-400">
              <span>{product.category}</span>
              {product.badge && (
                <span className="text-[#18181B]/70 dark:text-zinc-300">{product.badge}</span>
              )}
            </div>

            <div className="relative z-10 w-full aspect-[4/3] my-5 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-pink-200/70 dark:border-zinc-800 shadow-md">
              <img
                src={activeImage}
                alt={selectedVariant ? `${product.name} in ${selectedVariant.name}` : product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-full flex items-center justify-between text-[11px] font-medium text-[#18181B]/70 dark:text-zinc-400">
              <span>{product.campaignLabel || 'Curated Edit'}</span>
              <span className="text-[#DB2777] dark:text-pink-400 font-semibold">Sizes 6–11 &amp; Oversize</span>
            </div>
          </div>

          {/* Right Column: Details, Size Guide & Bag Action */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-5 bg-[#FAF6F0] dark:bg-[#121217]">
            
            <div className="space-y-3.5">
              <div className="flex items-center justify-between pr-8">
                <div className="flex items-center gap-1 text-amber-500 text-xs font-bold tabular-nums">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-[#18181B]/60 dark:text-zinc-400 font-normal">({product.reviewsCount} reviews)</span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                  In Stock
                </span>
              </div>

              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#18181B] dark:text-zinc-50 leading-tight">
                {product.name}
              </h3>

              {/* Retail Price & Flat Delivery Row */}
              <div className="p-3.5 rounded-2xl bg-[#FDF2F4] dark:bg-zinc-900 border border-pink-200/80 dark:border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-[#18181B] dark:text-zinc-100 tabular-nums">
                    ৳ {product.priceBDT.toLocaleString()}
                  </span>
                </div>
                <div className="text-right text-[11px] text-[#18181B]/70 dark:text-zinc-400 tabular-nums">
                  <div className="font-semibold text-[#18181B] dark:text-zinc-200">Delivery</div>
                  <div>৳{DELIVERY_RATES.insideDhaka} Dhaka · ৳{DELIVERY_RATES.outsideDhaka} Outside</div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#18181B]/80 dark:text-zinc-300 leading-relaxed font-normal">
                {product.description}
              </p>

              {/* Colorway Selector */}
              {product.variants && product.variants.length > 0 && (
                <div className="pt-3 border-t border-pink-200/60 dark:border-zinc-800">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#18181B] dark:text-zinc-200">
                      Color: <span className="text-[#DB2777] dark:text-pink-400 font-semibold">{selectedVariant?.name}</span>
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {product.variants.map((variant) => {
                      const isSelected = selectedVariant?.id === variant.id;
                      return (
                        <button
                          key={variant.id}
                          onClick={() => setSelectedVariant(variant)}
                          className={`p-2 rounded-xl text-left border transition-all flex items-center gap-2 ${
                            isSelected
                              ? 'border-[#DB2777] dark:border-pink-400 bg-white dark:bg-zinc-800 ring-2 ring-[#DB2777]/20 shadow-2xs'
                              : 'border-pink-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 hover:bg-white dark:hover:bg-zinc-800 hover:border-pink-300 dark:hover:border-zinc-700'
                          }`}
                        >
                          <span
                            className="w-4 h-4 rounded-full border border-black/10 dark:border-white/20 shrink-0"
                            style={{ backgroundColor: variant.colorHex }}
                          />
                          <span className="text-[11px] font-semibold text-[#18181B] dark:text-zinc-200 truncate">
                            {variant.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Craft Details */}
              <div className="space-y-1.5 pt-3 border-t border-pink-200/60 dark:border-zinc-800">
                <span className="text-[11px] font-bold text-[#18181B]/70 dark:text-zinc-400 uppercase tracking-wider">
                  Craft &amp; Fit Notes:
                </span>
                <ul className="space-y-1 text-xs text-[#18181B]/80 dark:text-zinc-300 font-medium">
                  {product.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#DB2777] dark:text-pink-400 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Size Selector + In-Context Size Guide Trigger */}
              <div className="pt-2">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#18181B] dark:text-zinc-200">
                    Select Size
                  </label>
                  <button
                    type="button"
                    onClick={onOpenSizeGuide}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#DB2777] dark:text-pink-400 hover:underline underline-offset-2 cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size Guide</span>
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => {
                    const isWide = String(size).length > 3;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`${
                          isWide ? 'col-span-2 px-3' : 'px-2'
                        } py-2 rounded-xl text-[11px] font-bold transition-all tabular-nums whitespace-nowrap text-center ${
                          selectedSize === size
                            ? 'bg-[#18181B] dark:bg-pink-600 text-white shadow-sm'
                            : 'bg-white dark:bg-zinc-800 border border-pink-200 dark:border-zinc-700 text-[#18181B]/80 dark:text-zinc-200 hover:bg-pink-50 dark:hover:bg-zinc-700'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Action Bar with Quantity Stepper + Add to Bag */}
            <div className="space-y-3 pt-3 border-t border-pink-200/60 dark:border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center h-11 px-2 rounded-full bg-white dark:bg-zinc-800 border border-pink-200 dark:border-zinc-700 tabular-nums shrink-0">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[#18181B]/70 dark:text-zinc-300 hover:bg-pink-50 dark:hover:bg-zinc-700"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-7 text-center text-xs font-bold text-[#18181B] dark:text-zinc-100">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[#18181B]/70 dark:text-zinc-300 hover:bg-pink-50 dark:hover:bg-zinc-700"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  id="modal-add-to-cart-btn"
                  onClick={handleAdd}
                  disabled={addedAnimation}
                  className={`flex-1 h-11 px-4 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-sm whitespace-nowrap ${
                    addedAnimation
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#18181B] dark:bg-pink-600 text-white hover:bg-[#DB2777] dark:hover:bg-pink-500'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4 shrink-0" />
                  <span className="truncate">
                    {addedAnimation
                      ? 'Added to Bag!'
                      : `Add · ৳ ${(product.priceBDT * quantity).toLocaleString()}`}
                  </span>
                </button>

                <button
                  onClick={() => onToggleFavorite(product.id)}
                  className="w-11 h-11 rounded-full bg-white dark:bg-zinc-800 border border-pink-200 dark:border-zinc-700 text-[#18181B] dark:text-zinc-200 hover:text-[#DB2777] dark:hover:text-pink-400 flex items-center justify-center transition-colors shadow-2xs shrink-0"
                  title="Save to Wishlist"
                  aria-label="Save to Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-[#F472B6] text-[#F472B6]' : ''}`} />
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#18181B]/70 dark:text-zinc-400 px-1 font-medium">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#DB2777] dark:text-pink-400" /> Inspect Before Paying (COD)
                </span>
                <a
                  href={`https://wa.me/${STORE_CONTACT.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 tabular-nums hover:text-[#DB2777] dark:hover:text-pink-400"
                >
                  <Phone className="w-3.5 h-3.5 text-[#DB2777] dark:text-pink-400" /> {STORE_CONTACT.primaryPhone}
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
