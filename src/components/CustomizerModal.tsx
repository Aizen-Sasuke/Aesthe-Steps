import React, { useState } from 'react';
import { X, Sparkles, Check, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddCustomizedToCart: (product: Product, size: number, customStamp: string, tone: string) => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddCustomizedToCart
}) => {
  if (!isOpen) return null;

  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);
  const [insoleInitials, setInsoleInitials] = useState('');
  const [accentTone, setAccentTone] = useState<'blush' | 'silver' | 'emerald' | 'gold'>('blush');
  const [selectedSize, setSelectedSize] = useState(38);

  const toneGlows = {
    blush: { label: 'Blush Rose Crystals', color: '#f472b6', border: 'border-pink-500' },
    silver: { label: 'Holographic Silver Shimmer', color: '#e0e7ff', border: 'border-indigo-300' },
    emerald: { label: 'Emerald Dhaka Lime', color: '#34d399', border: 'border-emerald-400' },
    gold: { label: 'Imperial Champagne Glitz', color: '#fbbf24', border: 'border-amber-400' }
  };

  const handleApplyCustom = () => {
    onAddCustomizedToCart(
      selectedProduct,
      selectedSize,
      insoleInitials.trim() || 'Aesthé',
      toneGlows[accentTone].label
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-4xl bg-[#FAF6F0] dark:bg-[#121217] border border-pink-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-2xl z-10 my-6 text-[#18181B] dark:text-zinc-100 transition-colors">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-pink-200/80 dark:border-zinc-800 flex items-center justify-between bg-[#FDF2F4] dark:bg-zinc-900">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white dark:bg-zinc-800 border border-pink-200 dark:border-zinc-700 text-[#DB2777] dark:text-pink-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-serif-display text-[#18181B] dark:text-zinc-50">
                Aesthé Custom Studio
              </h3>
              <p className="text-xs text-[#18181B]/70 dark:text-zinc-400">
                Personalize your footwear drop with custom insole laser-stamping
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#18181B]/60 dark:text-zinc-400 hover:text-[#18181B] dark:hover:text-zinc-100 hover:bg-pink-100/60 dark:hover:bg-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left: Interactive Preview */}
          <div className="lg:col-span-6 p-8 bg-[#FFF9FA] dark:bg-zinc-900/50 flex flex-col items-center justify-center relative border-b lg:border-b-0 lg:border-r border-pink-200/80 dark:border-zinc-800">
            
            {/* Soft pink highlight */}
            <div 
              className="absolute w-64 h-64 rounded-full blur-[80px] opacity-25 transition-all duration-500"
              style={{ backgroundColor: toneGlows[accentTone].color }}
            />

            <div className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal drop-shadow-[0_15px_30px_rgba(219,39,119,0.15)]"
              />

              {/* Dynamic Insole Monogram Stamp Overlay simulation */}
              <div className="absolute bottom-12 px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-zinc-900/95 border border-pink-200 dark:border-zinc-700 text-[11px] font-mono text-[#DB2777] dark:text-pink-400 font-bold tracking-widest shadow-md uppercase">
                {insoleInitials ? `STAMP: ${insoleInitials}` : 'STAMP: AESTHÉ STEPS'}
              </div>
            </div>

            <div className="mt-4 text-center">
              <span className="text-xs font-semibold text-[#18181B]/70 dark:text-zinc-400">
                Selected: <strong className="text-[#18181B] dark:text-zinc-100">{selectedProduct.name}</strong>
              </span>
              <p className="text-[11px] font-bold text-[#DB2777] dark:text-pink-400">
                Tone: {toneGlows[accentTone].label}
              </p>
            </div>
          </div>

          {/* Right: Customization Controls */}
          <div className="lg:col-span-6 p-6 sm:p-8 space-y-6">
            
            {/* 1. Base Silhouette Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#18181B]/70 dark:text-zinc-400">
                1. Select Base Silhouette
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {products.map((shoe) => (
                  <button
                    key={shoe.id}
                    onClick={() => setSelectedProduct(shoe)}
                    className={`p-2 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      selectedProduct.id === shoe.id
                        ? 'border-[#F472B6] bg-[#FDF2F4] dark:bg-pink-950/40 ring-2 ring-[#F472B6]/40'
                        : 'border-pink-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-[#F472B6]'
                    }`}
                  >
                    <div className="w-10 h-10 flex items-center justify-center">
                      <img src={shoe.image} alt={shoe.name} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                    </div>
                    <span className="text-[10px] font-bold text-[#18181B] dark:text-zinc-200 truncate w-full">
                      {shoe.name.replace('Aesthé ', '')}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Custom Laser Insole Stamp */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-[#18181B]/70 dark:text-zinc-400">
                  2. Custom Insole Stamp (Optional)
                </label>
                <span className="text-[10px] text-[#18181B]/50 dark:text-zinc-500">Max 10 chars</span>
              </div>
              <input
                type="text"
                maxLength={10}
                value={insoleInitials}
                onChange={(e) => setInsoleInitials(e.target.value.toUpperCase())}
                placeholder="e.g. HAX, MAHIN, OR YOUR NAME"
                className="w-full bg-white dark:bg-zinc-800 border border-pink-200 dark:border-zinc-700 rounded-xl px-4 py-2.5 text-xs text-[#18181B] dark:text-zinc-100 uppercase placeholder-[#18181B]/40 dark:placeholder-zinc-500 focus:outline-none focus:border-[#F472B6] font-mono"
              />
              <p className="text-[11px] text-[#18181B]/60 dark:text-zinc-400">
                Laser-etched into the memory foam footbed.
              </p>
            </div>

            {/* 3. Accent Finish */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#18181B]/70 dark:text-zinc-400">
                3. Accent Finish Tone
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(toneGlows) as Array<keyof typeof toneGlows>).map((key) => {
                  const tone = toneGlows[key];
                  return (
                    <button
                      key={key}
                      onClick={() => setAccentTone(key)}
                      className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                        accentTone === key
                          ? 'border-[#F472B6] bg-[#FDF2F4] dark:bg-pink-950/40 text-[#18181B] dark:text-zinc-100 font-bold'
                          : 'border-pink-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-[#18181B]/70 dark:text-zinc-300 hover:border-[#F472B6]'
                      }`}
                    >
                      <span 
                        className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: tone.color }}
                      />
                      <span className="text-xs">{tone.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Size Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#18181B]/70 dark:text-zinc-400">
                4. Select Size (EU)
              </label>
              <div className="grid grid-cols-6 gap-2">
                {[36, 37, 38, 39, 40, 41].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedSize === size
                        ? 'bg-[#18181B] dark:bg-pink-600 text-white'
                        : 'bg-white dark:bg-zinc-900 border border-pink-200 dark:border-zinc-800 text-[#18181B]/70 dark:text-zinc-300 hover:border-[#F472B6]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add Customized Button */}
            <div className="pt-2">
              <button
                id="customizer-add-to-bag"
                onClick={handleApplyCustom}
                className="w-full py-3.5 rounded-full bg-[#18181B] dark:bg-pink-600 hover:bg-[#F472B6] dark:hover:bg-pink-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Customized Pair (৳ {selectedProduct.priceBDT.toLocaleString()})</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
