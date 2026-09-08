import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroCarousel } from './components/HeroCarousel';
import { LookbookSection } from './components/LookbookSection';
import { AboutSection } from './components/AboutSection';
import { CollectionGrid } from './components/CollectionGrid';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CustomizerModal } from './components/CustomizerModal';
import { FavoritesModal } from './components/FavoritesModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { PolicyModal, PolicyType } from './components/PolicyModal';
import { Footer } from './components/Footer';

import { HERO_PRODUCTS, ALL_PRODUCTS } from './data/products';
import { Product, CartItem, ActiveNavTab, ProductColorVariant } from './types';
import { Check, Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveNavTab>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('aesthe_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aesthe_favs');
      return saved ? JSON.parse(saved) : ['aesthe-pink-crystal'];
    } catch {
      return ['aesthe-pink-crystal'];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [activePolicyModal, setActivePolicyModal] = useState<PolicyType | null>(null);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [selectedProductVariant, setSelectedProductVariant] = useState<ProductColorVariant | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');

  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('aesthe_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Apply dark mode class to html element
  useEffect(() => {
    try {
      localStorage.setItem('aesthe_theme', isDarkMode ? 'dark' : 'light');
    } catch (e) {
      console.error(e);
    }
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('aesthe_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('aesthe_favs', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  // Route & Hash detection for legal/policy pages (e.g. #privacy-policy, /privacy-policy)
  useEffect(() => {
    const handleUrlRoute = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();

      if (hash.includes('privacy') || path.includes('privacy')) {
        setActivePolicyModal('privacy');
      } else if (
        hash.includes('refund') || 
        hash.includes('exchange') || 
        path.includes('refund') || 
        path.includes('exchange')
      ) {
        setActivePolicyModal('refund');
      } else if (hash.includes('terms') || path.includes('terms')) {
        setActivePolicyModal('terms');
      }
    };

    handleUrlRoute();
    window.addEventListener('hashchange', handleUrlRoute);
    window.addEventListener('popstate', handleUrlRoute);
    return () => {
      window.removeEventListener('hashchange', handleUrlRoute);
      window.removeEventListener('popstate', handleUrlRoute);
    };
  }, []);

  const handleOpenPolicy = (policy: PolicyType) => {
    setActivePolicyModal(policy);
    try {
      window.history.pushState(null, '', `#${policy}-policy`);
    } catch {
      // ignore
    }
  };

  const handleClosePolicy = () => {
    setActivePolicyModal(null);
    try {
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    } catch {
      // ignore
    }
  };

  // Cart operations
  const handleAddToCart = (
    product: Product,
    selectedSize: number,
    quantity: number = 1,
    variant?: ProductColorVariant,
    customEngraving?: string
  ) => {
    const activeVariant = variant || product.variants?.[0];

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedVariant?.id === activeVariant?.id &&
          item.customEngraving === customEngraving
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          { product, selectedSize, quantity, selectedVariant: activeVariant, customEngraving }
        ];
      }
    });

    const variantLabel = activeVariant ? ` (${activeVariant.name})` : '';
    showToast(`Added ${product.name}${variantLabel} to bag!`);
  };

  const handleQuickBuy = (product: Product, variant?: ProductColorVariant) => {
    const activeVariant = variant || product.variants?.[0];
    handleAddToCart(product, product.sizes[0] || 38, 1, activeVariant);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (
    productId: string,
    size: number,
    quantity: number,
    variantId?: string
  ) => {
    if (quantity <= 0) {
      handleRemoveItem(productId, size, variantId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId &&
        item.selectedSize === size &&
        item.selectedVariant?.id === variantId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: string, size: number, variantId?: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedVariant?.id === variantId
          )
      )
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Favorite toggle
  const handleToggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from favourites');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your favourites list');
        return [...prev, productId];
      }
    });
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleScrollToCollection = () => {
    const el = document.getElementById('collection-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#18181B] dark:bg-zinc-950 dark:text-zinc-100 flex flex-col selection:bg-[#F472B6] selection:text-white transition-colors duration-300">
      
      {/* Top Banner: Dhaka Delivery & Brand Founders Notice */}
      <div className="bg-[#FDF2F4] dark:bg-zinc-900 border-b border-pink-200/70 dark:border-zinc-800 py-2.5 px-4 text-center text-xs font-semibold text-[#18181B] dark:text-zinc-200 flex items-center justify-center gap-3 transition-colors duration-300">
        <span className="inline-block w-2 h-2 rounded-full bg-[#F472B6] animate-pulse" />
        <span>
          AESTHÉ STEPS by <strong className="text-[#DB2777] dark:text-pink-400">Hax + Mahin</strong> — Cash on Delivery across Dhaka & all Bangladesh • Free 7-day swaps
        </span>
        <span className="hidden md:inline text-pink-300 dark:text-zinc-700">|</span>
        <span className="hidden md:inline text-[11px] font-mono text-[#18181B]/70 dark:text-zinc-400">
          Use code <span className="text-[#DB2777] dark:text-pink-400 font-bold">DHAKAGENZ</span> for 10% OFF
        </span>
      </div>

      {/* Main Navbar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === 'shop' || tab === 'collections') {
            handleScrollToCollection();
          } else if (tab === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q.trim()) {
            handleScrollToCollection();
          }
        }}
        onOpenCustomize={() => setIsCustomizeOpen(true)}
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Main Page Body */}
      <main className="flex-1">
        {/* 1. Hero Circular Arc Orbit Carousel */}
        <HeroCarousel
          products={ALL_PRODUCTS}
          onSelectProduct={(p, v) => {
            setSelectedProductForDetail(p);
            setSelectedProductVariant(v);
          }}
          onQuickBuy={(p, v) => handleQuickBuy(p, v)}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={isFavorite}
          onScrollToCollection={handleScrollToCollection}
        />

        {/* 2. Collection Grid: Products shown immediately */}
        <CollectionGrid
          products={ALL_PRODUCTS}
          onSelectProduct={(p, v) => {
            setSelectedProductForDetail(p);
            setSelectedProductVariant(v);
          }}
          onQuickBuy={(p, v) => handleQuickBuy(p, v)}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={isFavorite}
          searchQuery={searchQuery}
        />

        {/* 3. Lookbook Section: "Comfort Awaits Everyday" */}
        <LookbookSection
          onShopNow={handleScrollToCollection}
        />

        {/* 4. Brand Story & Value Pillars (at the very end of the page) */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer 
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)} 
        onOpenPolicy={handleOpenPolicy}
      />

      {/* Floating Quick Bag Trigger for Mobile / Easy Access */}
      {totalCartCount > 0 && !isCartOpen && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-[#18181B] dark:bg-pink-600 text-white shadow-xl hover:bg-[#F472B6] dark:hover:bg-pink-500 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border-2 border-white dark:border-zinc-800"
        >
          <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">Bag</span>
          <span className="w-5 h-5 bg-[#F472B6] text-white rounded-full text-xs font-extrabold flex items-center justify-center">
            {totalCartCount}
          </span>
        </button>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-[#18181B] dark:bg-zinc-800 border border-pink-400 dark:border-pink-500/50 text-white text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-[#F472B6]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onShowToast={showToast}
      />

      <ProductDetailModal
        product={selectedProductForDetail}
        initialVariant={selectedProductVariant}
        onClose={() => {
          setSelectedProductForDetail(null);
          setSelectedProductVariant(undefined);
        }}
        onAddToCart={(prod, size, qty, variant) => handleAddToCart(prod, size, qty, variant)}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={selectedProductForDetail ? isFavorite(selectedProductForDetail.id) : false}
      />

      <CustomizerModal
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        products={HERO_PRODUCTS}
        onAddCustomizedToCart={(product, size, stamp, tone) => {
          handleAddToCart(product, size, 1, undefined, `${stamp} (${tone})`);
          setIsCartOpen(true);
        }}
      />

      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        products={ALL_PRODUCTS}
        onToggleFavorite={handleToggleFavorite}
        onSelectProduct={(p, v) => {
          setSelectedProductForDetail(p);
          setSelectedProductVariant(v);
        }}
        onQuickBuy={(p, v) => handleQuickBuy(p, v)}
      />

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      <PolicyModal
        isOpen={activePolicyModal !== null}
        activePolicy={activePolicyModal || 'privacy'}
        onClose={handleClosePolicy}
        onSelectPolicy={(policy) => {
          setActivePolicyModal(policy);
          try {
            window.history.replaceState(null, '', `#${policy}-policy`);
          } catch {
            // ignore
          }
        }}
      />

    </div>
  );
}
