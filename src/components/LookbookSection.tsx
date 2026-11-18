import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { LOOKBOOK_IMAGES } from '../data/products';
import { Product } from '../types';

interface LookbookSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onShopNow: () => void;
}

export const LookbookSection: React.FC<LookbookSectionProps> = ({
  products,
  onSelectProduct,
  onShopNow
}) => {
  const openProductById = (id: string) => {
    const found = products.find((p) => p.id === id);
    if (found) onSelectProduct(found);
  };

  const triptychItems = [
    { id: 'ysl-heel', name: 'YSL Heel', price: 920, image: LOOKBOOK_IMAGES.lookbook1 },
    { id: 'pointed-toe-mule', name: 'Pointed Toe Mule', price: 850, image: LOOKBOOK_IMAGES.lookbook2 },
    { id: 'two-strap-block-heel', name: '2 Strap Block Heel', price: 690, image: LOOKBOOK_IMAGES.lookbook3 },
  ];

  const crystalProduct = products.find((p) => p.id === 'crystal-strap');

  return (
    <section
      id="lookbook-section"
      className="relative py-12 sm:py-16 bg-[#FFF9FA] dark:bg-[#0A0A0D] border-t border-pink-200/50 dark:border-zinc-800/80 overflow-hidden transition-colors duration-300"
    >
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-pink-100/60 dark:bg-pink-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Clickable 3-Card Triptych */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="grid grid-cols-3 gap-3 sm:gap-4 h-[320px] sm:h-[400px] items-stretch">
              {triptychItems.map((card) => (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => openProductById(card.id)}
                  className="relative rounded-2xl sm:rounded-3xl overflow-hidden group shadow-md border border-pink-200/80 dark:border-zinc-800 hover:border-[#F472B6] transition-all duration-300 text-left cursor-pointer focus:outline-none"
                  aria-label={`View ${card.name}`}
                >
                  <img
                    src={card.image}
                    alt={card.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-end p-3 sm:p-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-pink-300 tabular-nums">
                      ৳ {card.price}
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-white leading-snug">
                      {card.name}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-[#18181B]/65 dark:text-zinc-400 pt-3.5 px-1">
              <span className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#DB2777] dark:text-pink-400" /> Tap any look to view details
              </span>
              <span className="font-semibold text-[#DB2777] dark:text-pink-400">Dhaka Lookbook</span>
            </div>
          </div>

          {/* Right Column: Editorial Styling Story */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6 text-left">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#DB2777] dark:text-pink-400">
              Editorial Lookbook
            </p>

            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#18181B] dark:text-zinc-50 tracking-tight leading-[1.12] [text-wrap:balance]">
              Poise From <br />
              <span className="italic font-normal text-[#DB2777] dark:text-pink-400">
                Morning to Dusk.
              </span>
            </h2>

            <div className="space-y-3 text-sm sm:text-base text-[#18181B]/80 dark:text-zinc-300 leading-relaxed font-normal">
              <p>
                Built around balanced mid-heels, clean square-toe profiles, and cushioned insoles—every silhouette transitions smoothly from daily errands to formal evenings.
              </p>
              <p>
                Styled by us for effortless wardrobe pairing across neutral suedes and high-shine patents.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-1 items-stretch">
              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-pink-200/80 dark:border-zinc-800 space-y-1 shadow-2xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#DB2777] dark:text-pink-400 block">
                  Daywear Suede
                </span>
                <p className="text-xs sm:text-sm font-semibold text-[#18181B] dark:text-zinc-100">
                  Tan, Cream Beige &amp; Jet Black
                </p>
                <p className="text-[11px] text-[#18181B]/65 dark:text-zinc-400">
                  Soft matte straps for breathable daily wear
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-pink-200/80 dark:border-zinc-800 space-y-1 shadow-2xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#DB2777] dark:text-pink-400 block">
                  Evening Patent
                </span>
                <p className="text-xs sm:text-sm font-semibold text-[#18181B] dark:text-zinc-100">
                  Deep Maroon, Ivory &amp; Blush
                </p>
                <p className="text-[11px] text-[#18181B]/65 dark:text-zinc-400">
                  Sleek sheen accented with crystal &amp; hardware
                </p>
              </div>
            </div>

            <div className="pt-1">
              <button
                id="lookbook-shop-now-btn"
                onClick={onShopNow}
                className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#18181B] dark:bg-pink-600 text-white font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#DB2777] dark:hover:bg-pink-500 transition-all duration-300 shadow-sm"
              >
                <span>Back to All Styles</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>

        {/* Interactive Feature Split Banner */}
        {LOOKBOOK_IMAGES.paletteLookbook && (
          <div className="mt-14 sm:mt-16 pt-12 border-t border-pink-200/60 dark:border-zinc-800">
            <div className="relative rounded-3xl overflow-hidden bg-[#FAF6F0] dark:bg-zinc-900 border border-pink-200/80 dark:border-zinc-800 shadow-lg grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-center space-y-5 text-left order-2 lg:order-1">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#DB2777] dark:text-pink-400">
                  Signature Palette
                </p>

                <h3 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-normal text-[#18181B] dark:text-zinc-100 tracking-tight [text-wrap:balance]">
                  Patent, Suede &amp; Crystal. <br />
                  <span className="italic text-[#DB2777] dark:text-pink-400">Refined For Every Occasion.</span>
                </h3>

                <p className="text-sm text-[#18181B]/80 dark:text-zinc-300 leading-relaxed font-normal">
                  Whether paired with crisp tailoring, linen silhouettes, or traditional drapes, our seven-shade palette stays timeless across every season.
                </p>

                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-bold text-[#18181B]/60 dark:text-zinc-400 uppercase tracking-wider">
                    Palette Spectrum:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: 'Maroon', color: '#7F1D1D' },
                      { name: 'Black', color: '#18181B' },
                      { name: 'Chocolate Brown', color: '#4A2C2A' },
                      { name: 'Cream Ivory', color: '#F3ECE1' },
                      { name: 'Tan Brown', color: '#9A5B25' },
                      { name: 'Cream Beige', color: '#D8C3AD' },
                      { name: 'Blush Pink', color: '#F472B6' }
                    ].map((shade, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white dark:bg-zinc-800 border border-pink-200 dark:border-zinc-700 text-[11px] font-medium text-[#18181B] dark:text-zinc-200 shadow-2xs"
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-black/10 dark:border-white/20 shrink-0"
                          style={{ backgroundColor: shade.color }}
                        />
                        <span>{shade.name}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {crystalProduct && (
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => onSelectProduct(crystalProduct)}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#18181B] dark:bg-pink-600 text-white hover:bg-[#DB2777] dark:hover:bg-pink-500 text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
                    >
                      <span>View Crystal Strap</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => crystalProduct && onSelectProduct(crystalProduct)}
                className="lg:col-span-6 min-h-[280px] sm:min-h-[360px] lg:min-h-full relative overflow-hidden order-1 lg:order-2 group cursor-pointer text-left"
                aria-label="View Crystal Strap product details"
              >
                <img
                  src={LOOKBOOK_IMAGES.paletteLookbook}
                  alt="Crystal Strap Heels in Black Suede and Maroon Patent"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:hidden" />
                <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6 px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xs text-[#18181B] dark:text-zinc-100 text-[11px] font-bold shadow-md border border-pink-200/50 dark:border-zinc-700 tabular-nums">
                  Crystal Strap · ৳ 790
                </div>
              </button>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
