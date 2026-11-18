import React, { useState } from 'react';
import { ShoppingBag, Search, Heart, X, Menu, Sun, Moon } from 'lucide-react';
import { ActiveNavTab } from '../types';
import { BrandLogo } from './BrandLogo';
import { STORE_CONTACT } from '../data/products';

interface NavbarProps {
  activeTab: ActiveNavTab;
  onTabChange: (tab: ActiveNavTab) => void;
  cartCount: number;
  onOpenCart: () => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenCustomize: () => void;
  isDarkMode?: boolean;
  toggleDarkMode?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  cartCount,
  onOpenCart,
  favoritesCount,
  onOpenFavorites,
  searchQuery,
  onSearchChange,
  onOpenCustomize,
  isDarkMode = false,
  toggleDarkMode
}) => {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: ActiveNavTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'collections', label: 'Collection' },
    { id: 'customize', label: 'Custom Studio' },
    { id: 'favourites', label: 'Wishlist' },
  ];

  const handleNavClick = (id: ActiveNavTab) => {
    if (id === 'customize') {
      onOpenCustomize();
    } else if (id === 'favourites') {
      onOpenFavorites();
    } else {
      onTabChange(id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAF6F0]/92 dark:bg-zinc-950/92 backdrop-blur-md border-b border-pink-200/50 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[72px] flex items-center justify-between gap-4 lg:gap-8">
        
        {/* Zone 1: Brand Wordmark */}
        <button 
          type="button"
          onClick={() => handleNavClick('home')}
          className="cursor-pointer group flex items-center leading-none select-none bg-transparent border-0 p-0 text-left shrink-0"
          id="brand-logo-btn"
          aria-label="Aesthé Steps Home"
        >
          <BrandLogo size="md" showSubtitle={false} />
        </button>

        {/* Zone 2: Clean Single-Line Typographic Nav Links */}
        <nav className="hidden md:flex items-center justify-center gap-6 lg:gap-8">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => handleNavClick(link.id)}
                className={`relative py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap shrink-0 flex items-center gap-1.5 select-none ${
                  isActive
                    ? 'text-[#DB2777] dark:text-pink-400 font-semibold'
                    : 'text-[#18181B]/75 dark:text-zinc-300 hover:text-[#18181B] dark:hover:text-white'
                }`}
              >
                <span>{link.label}</span>
                {link.id === 'favourites' && favoritesCount > 0 && (
                  <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold rounded-full bg-[#F472B6] text-white tabular-nums">
                    {favoritesCount}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#DB2777] dark:bg-pink-400" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Balanced Utility & Bag Actions */}
        <div className="flex items-center justify-end gap-1.5 sm:gap-2 shrink-0">
          
          {/* Dark Mode Toggle */}
          {toggleDarkMode && (
            <button
              onClick={toggleDarkMode}
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#18181B]/75 dark:text-zinc-300 hover:text-[#18181B] dark:hover:text-white hover:bg-pink-100/60 dark:hover:bg-zinc-800/70 transition-colors"
              title="Toggle Dark Mode"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          )}

          {/* Search Toggle */}
          {showSearchInput ? (
            <div className="relative flex items-center animate-fadeIn">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search heels, mules..."
                autoFocus
                className="w-32 sm:w-48 bg-white dark:bg-zinc-900 text-xs text-[#18181B] dark:text-zinc-100 placeholder-[#18181B]/40 dark:placeholder-zinc-500 px-3.5 py-2 pr-8 rounded-full border border-[#F472B6] focus:outline-none focus:ring-1 focus:ring-[#F472B6]"
              />
              <button
                onClick={() => {
                  setShowSearchInput(false);
                  onSearchChange('');
                }}
                className="absolute right-2.5 text-[#18181B]/50 dark:text-zinc-400 hover:text-[#18181B] dark:hover:text-zinc-100"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              id="search-toggle-btn"
              onClick={() => setShowSearchInput(true)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#18181B]/75 dark:text-zinc-300 hover:text-[#18181B] dark:hover:text-white hover:bg-pink-100/60 dark:hover:bg-zinc-800/70 transition-colors"
              title="Search collection"
              aria-label="Search collection"
            >
              <Search className="w-4 h-4" />
            </button>
          )}

          {/* Wishlist Icon */}
          <button
            id="nav-favourites-btn"
            onClick={onOpenFavorites}
            className="relative w-9 h-9 rounded-full flex items-center justify-center text-[#18181B]/75 dark:text-zinc-300 hover:text-[#DB2777] dark:hover:text-pink-400 hover:bg-pink-100/60 dark:hover:bg-zinc-800/70 transition-colors"
            title="Saved Wishlist"
            aria-label="Open Wishlist"
          >
            <Heart className={`w-4 h-4 ${favoritesCount > 0 ? 'fill-[#F472B6] text-[#F472B6]' : ''}`} />
            {favoritesCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 text-[9px] font-bold bg-[#F472B6] text-white rounded-full flex items-center justify-center tabular-nums">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Primary Action: Bag Button */}
          <button
            id="nav-cart-btn"
            onClick={onOpenCart}
            className="relative h-9 px-3.5 rounded-full bg-[#18181B] dark:bg-pink-600 text-[#FAF6F0] dark:text-white hover:bg-[#DB2777] dark:hover:bg-pink-500 transition-colors shadow-xs flex items-center gap-1.5 whitespace-nowrap shrink-0"
            title="Shopping Bag"
            aria-label="Open Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline text-xs font-semibold">Bag</span>
            {cartCount > 0 && (
              <span className="min-w-[18px] h-[18px] px-1 text-[10px] font-extrabold bg-[#F472B6] dark:bg-white text-white dark:text-[#18181B] rounded-full flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-[#18181B] dark:text-zinc-200 hover:bg-pink-100/60 dark:hover:bg-zinc-800/70"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-pink-200/50 dark:border-zinc-800 bg-[#FAF6F0] dark:bg-zinc-950 px-4 py-4 space-y-1.5 shadow-lg">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between ${
                activeTab === link.id
                  ? 'bg-[#FDF2F4] dark:bg-zinc-900 text-[#DB2777] dark:text-pink-400 border border-[#F472B6]/40'
                  : 'text-[#18181B] dark:text-zinc-200 hover:bg-pink-50 dark:hover:bg-zinc-900'
              }`}
            >
              <span>{link.label}</span>
              {link.id === 'favourites' && favoritesCount > 0 && (
                <span className="text-xs bg-[#F472B6] text-white px-2 py-0.5 rounded-full font-bold tabular-nums">
                  {favoritesCount}
                </span>
              )}
            </button>
          ))}
          <div className="pt-3 mt-2 border-t border-pink-200/40 dark:border-zinc-800 flex items-center justify-between text-xs text-[#18181B]/70 dark:text-zinc-400 px-2">
            <span>Cash on Delivery Nationwide</span>
            <span className="text-[#DB2777] dark:text-pink-400 font-semibold">By {STORE_CONTACT.partners}</span>
          </div>
        </div>
      )}
    </header>
  );
};
