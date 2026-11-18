import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroCarousel } from './components/HeroCarousel';
import { LookbookSection } from './components/LookbookSection';
import { AboutSection } from './components/AboutSection';
import { CollectionGrid } from './components/CollectionGrid';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { FavoritesModal } from './components/FavoritesModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { PolicyModal, PolicyType } from './components/PolicyModal';
import { Footer } from './components/Footer';

import { ALL_PRODUCTS, DELIVERY_RATES } from './data/products';
import { Product, CartItem, ActiveNavTab, ProductColorVariant } from './types';
import { Check, ShoppingBag } from 'lucide-react';
import { trackAddToCart } from './utils/analytics';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveNavTab>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('aesthe_cart');
      if (!saved) return [];
      const parsed: CartItem[] = JSON.parse(saved);
      const validIds = new Set(ALL_PRODUCTS.map((p) => p.id));
      return parsed
        .filter((item) => validIds.has(item.product?.id))
        .map(({ product, selectedSize, quantity, selectedVariant }) => ({
          product,
          selectedSize,
          quantity,
          selectedVariant,
        }));
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aesthe_favs');
      if (!saved) return [];
      const parsed: string[] = JSON.parse(saved);
      const validIds = new Set(ALL_PRODUCTS.map((p) => p.id));
      return parsed.filter((id) => validIds.has(id));
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
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

  // Sync cart & favorites to localStorage
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

  // Scroll-spy syncing active navbar indicator with viewport section
  useEffect(() => {
    const handleScrollSpy = () => {
      const collectionEl = document.getElementById('collection-section');
      const lookbookEl = document.getElementById('lookbook-section');
      const aboutEl = document.getElementById('about-section');

      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 40;
      if (nearBottom && aboutEl) {
        setActiveTab('about');
        return;
      }

      const offset = 180;
      if (aboutEl && aboutEl.getBoundingClientRect().top <= offset) {
        setActiveTab('about');
      } else if (lookbookEl && lookbookEl.getBoundingClientRect().top <= offset) {
        setActiveTab('lookbook');
      } else if (collectionEl && collectionEl.getBoundingClientRect().top <= offset) {
        setActiveTab('collection');
      } else {
        setActiveTab('home');
      }
    };

    handleScrollSpy();
    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  // Route & Hash detection for legal/policy pages
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
    selectedSize: number | string,
    quantity: number = 1,
    variant?: ProductColorVariant
  ) => {
    const activeVariant = variant || product.variants?.[0];

    // Fire GA4 'add_to_cart' and Meta Pixel 'AddToCart'
    trackAddToCart({
      productId: product.id,
      productName: product.name,
      price: product.priceBDT,
      quantity,
      variant: activeVariant?.name,
    });

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedVariant?.id === activeVariant?.id
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }

      return [
        ...prev,
        { product, selectedSize, quantity, selectedVariant: activeVariant },
      ];
    });

    const variantLabel = activeVariant ? ` (${activeVariant.name})` : '';
    showToast(`Added ${product.name}${variantLabel} — Size ${selectedSize} to bag`);
  };

  const handleQuickBuy = (
    product: Product,
    size: number | string,
    variant?: ProductColorVariant
  ) => {
    const activeVariant = variant || product.variants?.[0];
    handleAddToCart(product, size, 1, activeVariant);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (
    productId: string,
    size: number | string,
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

  const handleRemoveItem = (productId: string, size: number | string, variantId?: string) => {
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
        showToast('Removed from wishlist');
        return prev.filter((id) => id !== productId);
      }
      showToast('Saved to your wishlist');
      return [...prev, productId];
    });
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToCollection = () => {
    scrollToSection('collection-section');
  };

  const handleTabNavigation = (tab: ActiveNavTab) => {
    setActiveTab(tab);
    if (tab === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'collection') {
      scrollToSection('collection-section');
    } else if (tab === 'lookbook') {
      scrollToSection('lookbook-section');
    } else if (tab === 'about') {
      scrollToSection('about-section');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#18181B] dark:bg-zinc-950 dark:text-zinc-100 flex flex-col selection:bg-[#F472B6] selection:text-white transition-colors duration-300">
      
      {/* Slim Top Announcement Strip */}
      <div className="bg-[#FDF2F4] dark:bg-zinc-900 border-b border-pink-200/70 dark:border-zinc-800 py-2 px-4 text-center text-xs font-medium text-[#18181B] dark:text-zinc-200 flex items-center justify-center gap-2 transition-colors duration-300 tabular-nums">
        <span className="truncate">
          AESTHÉ STEPS · Curated in Dhaka · Cash on Delivery ৳{DELIVERY_RATES.insideDhaka} Dhaka / ৳{DELIVERY_RATES.outsideDhaka} Outside
        </span>
      </div>

      {/* Main Navbar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={handleTabNavigation}
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
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Main Page Body */}
      <main className="flex-1">
        {/* 1. Hero Showcase */}
        <HeroCarousel
          products={ALL_PRODUCTS}
          onSelectProduct={(p, v) => {
            setSelectedProductForDetail(p);
            setSelectedProductVariant(v);
          }}
          onQuickBuy={handleQuickBuy}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={isFavorite}
          onScrollToCollection={handleScrollToCollection}
          onSizeNeeded={(name) => showToast(`Please pick a size for ${name} first`)}
        />

        {/* 2. Collection Grid */}
        <CollectionGrid
          products={ALL_PRODUCTS}
          onSelectProduct={(p, v) => {
            setSelectedProductForDetail(p);
            setSelectedProductVariant(v);
          }}
          onQuickBuy={handleQuickBuy}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={isFavorite}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
          onSizeNeeded={(name) => showToast(`Please pick a size for ${name} first`)}
        />

        {/* 3. Lookbook & Styling */}
        <LookbookSection
          products={ALL_PRODUCTS}
          onSelectProduct={(p) => {
            setSelectedProductForDetail(p);
            setSelectedProductVariant(p.variants?.[0]);
          }}
          onShopNow={handleScrollToCollection}
        />

        {/* 4. Brand Story & Pillars */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onSelectProduct={(p) => {
          setSelectedProductForDetail(p);
          setSelectedProductVariant(p.variants?.[0]);
        }}
        onOpenPolicy={handleOpenPolicy}
      />

      {/* Floating Quick Bag Trigger */}
      {totalCartCount > 0 && !isCartOpen && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-5 right-5 z-40 px-4 py-3 rounded-full bg-[#18181B] dark:bg-pink-600 text-white shadow-xl hover:bg-[#DB2777] dark:hover:bg-pink-500 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border-2 border-white dark:border-zinc-800"
        >
          <ShoppingBag className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Bag</span>
          <span className="min-w-[20px] h-5 px-1 bg-[#F472B6] dark:bg-white text-white dark:text-[#18181B] rounded-full text-xs font-extrabold flex items-center justify-center tabular-nums">
            {totalCartCount}
          </span>
        </button>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] px-5 py-3 rounded-full bg-[#18181B] dark:bg-zinc-800 border border-pink-400 dark:border-pink-500/50 text-white text-xs font-bold shadow-2xl flex items-center gap-2">
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
        onAddToCart={handleAddToCart}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={selectedProductForDetail ? isFavorite(selectedProductForDetail.id) : false}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
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
