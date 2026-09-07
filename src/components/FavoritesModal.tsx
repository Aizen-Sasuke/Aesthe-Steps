import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  products: Product[];
  onToggleFavorite: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onQuickBuy: (product: Product) => void;
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
      
      <div className="relative w-full max-w-lg bg-[#FAF6F0] border border-pink-200 rounded-3xl p-6 z-10 shadow-2xl space-y-5 max-h-[85vh] flex flex-col text-[#18181B]">
        <div className="flex items-center justify-between border-b border-pink-200/80 pb-4">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 fill-[#F472B6] text-[#F472B6]" />
            <h3 className="text-lg font-bold text-[#18181B] font-serif-display">
              Saved Wishlist ({favProducts.length})
            </h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full text-[#18181B]/60 hover:text-[#18181B]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3">
          {favProducts.length === 0 ? (
            <div className="text-center py-12 text-[#18181B]/60 text-xs">
              No pairs saved yet. Click the heart icon on any silhouette to add it to your wishlist.
            </div>
          ) : (
            favProducts.map((shoe) => (
              <div
                key={shoe.id}
                className="p-3 rounded-2xl bg-white border border-pink-200/80 flex items-center justify-between gap-3 shadow-2xs"
              >
                <div 
                  onClick={() => {
                    onSelectProduct(shoe);
                    onClose();
                  }}
                  className="flex items-center gap-3 cursor-pointer flex-1"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#FFF5F7] p-1 flex items-center justify-center border border-pink-100">
                    <img src={shoe.image} alt={shoe.name} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#18181B] font-serif-display line-clamp-1">{shoe.name}</h4>
                    <p className="text-[11px] text-[#DB2777] font-bold">৳ {shoe.priceBDT.toLocaleString()}</p>
                    <span className="text-[10px] text-[#18181B]/60">{shoe.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      onQuickBuy(shoe);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl bg-[#18181B] hover:bg-[#F472B6] text-white text-xs font-bold flex items-center gap-1 transition-colors"
                    title="Quick Buy"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onToggleFavorite(shoe.id)}
                    className="p-2.5 rounded-xl text-[#18181B]/40 hover:text-rose-500 transition-colors"
                    title="Remove from favorites"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
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
