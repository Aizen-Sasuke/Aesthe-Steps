import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product, ProductColorVariant } from '../types';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  products: Product[];
  onToggleFavorite: (productId: string) => void;
  onSelectProduct: (product: Product, variant?: ProductColorVariant) => void;
  onQuickBuy: (product: Product, variant?: ProductColorVariant) => void;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  favorites,
  products,
  onToggleFavorite,
  onSelectProduct,
  onQuickBuy
}) => {
  if (!isOpen) return null;

  const favProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-[#FAF6F0] dark:bg-[#121217] border border-pink-200 dark:border-zinc-800 rounded-3xl p-6 z-10 shadow-2xl space-y-5 max-h-[85vh] flex flex-col text-[#18181B] dark:text-zinc-100 transition-colors">
        <div className="flex items-center justify-between border-b border-pink-200/80 dark:border-zinc-800 pb-4">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-[#F472B6] text-[#F472B6]" />
            <h3 className="text-lg font-bold text-[#18181B] dark:text-zinc-50 font-serif-display">
              Saved Wishlist ({favProducts.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#18181B]/60 dark:text-zinc-400 hover:text-[#18181B] dark:hover:text-zinc-100 hover:bg-pink-100/50 dark:hover:bg-zinc-800"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3">
          {favProducts.length === 0 ? (
            <div className="text-center py-12 text-[#18181B]/65 dark:text-zinc-400 text-xs">
              No styles saved yet. Tap the heart icon on any silhouette to save your favorite pairs here.
            </div>
          ) : (
            favProducts.map((shoe) => (
              <div
                key={shoe.id}
                className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-pink-200/80 dark:border-zinc-800 flex items-center justify-between gap-3 shadow-2xs"
              >
                <div 
                  onClick={() => {
                    onSelectProduct(shoe, shoe.variants?.[0]);
                    onClose();
                  }}
                  className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                >
                  <div className="w-16 h-12 rounded-xl overflow-hidden bg-[#FFF5F7] dark:bg-zinc-800 border border-pink-100 dark:border-zinc-700 shrink-0">
                    <img
                      src={shoe.image}
                      alt={shoe.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-[#18181B] dark:text-zinc-100 font-serif-display truncate">
                      {shoe.name}
                    </h4>
                    <p className="text-xs text-[#DB2777] dark:text-pink-400 font-bold tabular-nums">
                      ৳ {shoe.priceBDT.toLocaleString()} <span className="text-[#18181B]/55 dark:text-zinc-400 font-normal">per pair</span>
                    </p>
                    
                    {shoe.variants && shoe.variants.length > 0 && (
                      <div className="flex items-center gap-1 pt-1">
                        {shoe.variants.map((v) => (
                          <span
                            key={v.id}
                            className="w-2.5 h-2.5 rounded-full border border-black/10 dark:border-white/20 inline-block"
                            style={{ backgroundColor: v.colorHex }}
                            title={v.name}
                          />
                        ))}
                        <span className="text-[10px] text-[#18181B]/60 dark:text-zinc-400 ml-1 font-medium">
                          {shoe.variants.length} {shoe.variants.length === 1 ? 'shade' : 'shades'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => {
                      onQuickBuy(shoe, shoe.variants?.[0]);
                      onClose();
                    }}
                    className="w-9 h-9 rounded-xl bg-[#18181B] dark:bg-pink-600 hover:bg-[#DB2777] dark:hover:bg-pink-500 text-white flex items-center justify-center transition-colors"
                    title="Add Pair to Bag"
                    aria-label="Add Pair to Bag"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onToggleFavorite(shoe.id)}
                    className="w-9 h-9 rounded-xl text-[#18181B]/45 dark:text-zinc-500 hover:text-rose-500 flex items-center justify-center transition-colors"
                    title="Remove from favorites"
                    aria-label="Remove from favorites"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
