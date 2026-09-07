import React, { useState } from 'react';
import { ShoppingBag, Search, Heart, X, Menu, Sun, Moon } from 'lucide-react';
import { ActiveNavTab } from '../types';

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
    { id: 'shop', label: 'The Drops' },
    { id: 'collections', label: 'Lookbook' },
    { id: 'customize', label: 'Laser Stamp' },
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
    <header className="sticky top-0 z-50 w-full bg-[#FAF6F0]/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-pink-200/50 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Fashion Wordmark (No box/initials) */}
        <div 
          onClick={() => handleNavClick('home')}
          className="cursor-pointer group flex flex-col items-start leading-none select-none py-1"
          id="brand-logo-btn"
        >
          <div className="flex items-center gap-2">
            <span className="font-serif-display text-2xl sm:text-3xl font-bold tracking-[0.14em] text-[#18181B] dark:text-zinc-100 group-hover:text-[#DB2777] dark:group-hover:text-pink-400 transition-colors">
              AESTHÉ
            </span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#F472B6]" />
            <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#FDF2F4] dark:bg-zinc-800 text-[#DB2777] dark:text-pink-300 border border-pink-200/60 dark:border-pink-900/40">
              DHAKA
            </span>
          </div>
          <span className="text-[9px] tracking-[0.38em] font-bold text-[#F472B6] uppercase pl-0.5 mt-0.5">
            S T E P S
          </span>
        </div>

        {/* Center Pill Navigation (Warm Cream + Soft Pink) */}
        <nav className="hidden md:flex items-center p-1 bg-[#FFF5F7]/80 dark:bg-zinc-900/90 border border-pink-200/70 dark:border-zinc-800 rounded-full shadow-sm">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => handleNavClick(link.id)}
                className={`relative px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 select-none ${
                  isActive
                    ? 'bg-[#18181B] dark:bg-pink-600 text-[#FAF6F0] dark:text-white shadow-sm'
                    : 'text-[#18181B]/70 dark:text-zinc-300 hover:text-[#18181B] dark:hover:text-white hover:bg-pink-100/50 dark:hover:bg-zinc-800/60'
                }`}
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  {link.label}
                  {link.id === 'favourites' && favoritesCount > 0 && (
                    <span className={`inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold rounded-full ${
                      isActive ? 'bg-[#F472B6] text-white' : 'bg-[#F472B6] text-white'
                    }`}>
                      {favoritesCount}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Search, Wishlist, Cart, Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Dark Mode Toggle */}
          {toggleDarkMode && (
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-full text-[#18181B]/70 dark:text-zinc-300 hover:text-[#18181B] dark:hover:text-white hover:bg-pink-100/60 dark:hover:bg-zinc-800/60 transition-colors"
              title="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-zinc-700" />}
            </button>
          )}

          {/* Search Toggle */}
          {showSearchInput ? (
            <div className="relative flex items-center animate-fadeIn">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search slides, drops..."
                autoFocus
                className="w-36 sm:w-52 bg-[#FFF9FA] dark:bg-zinc-900 text-xs text-[#18181B] dark:text-zinc-100 placeholder-[#18181B]/40 dark:placeholder-zinc-500 px-3.5 py-2 pr-8 rounded-full border border-[#F472B6] focus:outline-none focus:ring-1 focus:ring-[#F472B6]"
              />
              <button
                onClick={() => {
                  setShowSearchInput(false);
                  onSearchChange('');
                }}
                className="absolute right-2.5 text-[#18181B]/50 dark:text-zinc-400 hover:text-[#18181B] dark:hover:text-zinc-100"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              id="search-toggle-btn"
              onClick={() => setShowSearchInput(true)}
              className="p-2.5 rounded-full text-[#18181B]/70 dark:text-zinc-300 hover:text-[#18181B] dark:hover:text-white hover:bg-pink-100/60 dark:hover:bg-zinc-800/60 transition-colors"
              title="Search collection"
            >
              <Search className="w-5 h-5" />
            </button>
          )}

          {/* Favourites Button */}
          <button
            id="nav-favourites-btn"
            onClick={onOpenFavorites}
            className="relative p-2.5 rounded-full text-[#18181B]/70 dark:text-zinc-300 hover:text-[#DB2777] dark:hover:text-pink-400 hover:bg-pink-100/60 dark:hover:bg-zinc-800/60 transition-colors"
            title="Saved Favourites"
          >
            <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'fill-[#F472B6] text-[#F472B6]' : ''}`} />
            {favoritesCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 text-[10px] font-bold bg-[#F472B6] text-white rounded-full flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Cart / Bag Button */}
          <button
            id="nav-cart-btn"
            onClick={onOpenCart}
            className="relative p-2.5 rounded-full bg-[#18181B] dark:bg-pink-600 text-[#FAF6F0] dark:text-white hover:bg-[#F472B6] dark:hover:bg-pink-500 transition-colors shadow-sm"
            title="Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 text-[11px] font-black bg-[#F472B6] text-white rounded-full flex items-center justify-center border-2 border-[#FAF6F0] dark:border-zinc-950">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-full text-[#18181B] dark:text-zinc-200 hover:bg-pink-100/60 dark:hover:bg-zinc-800/60"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-pink-200/50 dark:border-zinc-800 bg-[#FAF6F0] dark:bg-zinc-950 px-4 py-4 space-y-2 shadow-lg">
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
                <span className="text-xs bg-[#F472B6] text-white px-2 py-0.5 rounded-full font-bold">
                  {favoritesCount}
                </span>
              )}
            </button>
          ))}
          <div className="pt-3 border-t border-pink-200/40 dark:border-zinc-800 flex items-center justify-between text-xs text-[#18181B]/60 dark:text-zinc-400 px-2">
            <span>📍 Dhaka Express Cash on Delivery</span>
            <span className="text-[#DB2777] dark:text-pink-400 font-bold">By Hax & Mahin</span>
          </div>
        </div>
      )}
    </header>
  );
};

