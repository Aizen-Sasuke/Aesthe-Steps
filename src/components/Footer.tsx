import React, { useState } from 'react';
import { MapPin, Phone, Mail, ArrowRight, Heart, Sparkles, ShieldCheck, RotateCcw, FileText } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onOpenSizeGuide: () => void;
  onOpenPolicy?: (policy: 'privacy' | 'refund' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSizeGuide, onOpenPolicy }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#FFF9FA] dark:bg-[#08080A] border-t border-pink-200/80 dark:border-zinc-800 text-[#18181B] dark:text-zinc-300 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Dhaka Drop Alert */}
        <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-pink-200/80 dark:border-zinc-800 mb-16 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#DB2777] dark:text-pink-400 font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Next Dhaka Drop Alert
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif-display text-[#18181B] dark:text-zinc-50">
              Get Notified on New Footwear Drops
            </h3>
            <p className="text-xs text-[#18181B]/70 dark:text-zinc-400">
              Limited micro-runs sell out fast in Dhanmondi & Banani. Be first in line.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email or phone"
              className="bg-[#FAF6F0] dark:bg-zinc-800 border border-pink-200 dark:border-zinc-700 rounded-full px-5 py-3 text-xs text-[#18181B] dark:text-zinc-100 placeholder-[#18181B]/40 dark:placeholder-zinc-500 focus:outline-none focus:border-[#F472B6] min-w-[260px]"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-[#18181B] dark:bg-pink-600 hover:bg-[#F472B6] dark:hover:bg-pink-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>{subscribed ? 'Subscribed!' : 'Join The Drop'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 pb-12 border-b border-pink-200/60 dark:border-zinc-800">
          
          {/* Brand Info with Wordmark */}
          <div className="space-y-4">
            <BrandLogo size="md" />
            <p className="text-xs text-[#18181B]/70 dark:text-zinc-400 leading-relaxed">
              Footwear for Dhaka's urban Gen-Z. Founded by <strong className="text-[#18181B] dark:text-zinc-200 font-bold">Hax + Mahin</strong>. Elevated silhouettes, cloud-soft footbeds, and friendly prices.
            </p>
            <p className="text-xs font-semibold text-[#DB2777] dark:text-pink-400">
              Dhaka, Bangladesh • COD Across All Districts
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#18181B] dark:text-zinc-100">
              Drop 01 Silhouettes
            </h4>
            <ul className="space-y-2 text-xs text-[#18181B]/70 dark:text-zinc-400 font-medium">
              <li><a href="#collection-section" className="hover:text-[#DB2777] dark:hover:text-pink-400 transition-colors">Pink Crystal Dn Series</a></li>
              <li><a href="#collection-section" className="hover:text-[#DB2777] dark:hover:text-pink-400 transition-colors">Midnight Shimmer Mule</a></li>
              <li><a href="#collection-section" className="hover:text-[#DB2777] dark:hover:text-pink-400 transition-colors">Olive Ribbon Bow Slider</a></li>
              <li><a href="#collection-section" className="hover:text-[#DB2777] dark:hover:text-pink-400 transition-colors">Pearl Whisper Minimalist</a></li>
              <li><a href="#collection-section" className="hover:text-[#DB2777] dark:hover:text-pink-400 transition-colors">Champagne Peach Serenade</a></li>
            </ul>
          </div>

          {/* Customer Care / Sizing & Legal Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#18181B] dark:text-zinc-100">
              Sizing & Policies
            </h4>
            <ul className="space-y-2 text-xs text-[#18181B]/70 dark:text-zinc-400 font-medium">
              <li>
                <button 
                  onClick={onOpenSizeGuide} 
                  className="hover:text-[#DB2777] dark:hover:text-pink-400 transition-colors text-left font-bold text-[#DB2777] dark:text-pink-400 cursor-pointer"
                >
                  Bangladesh Size Guide (EU 36-41)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenPolicy?.('refund')} 
                  className="hover:text-[#DB2777] dark:hover:text-pink-400 transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3 h-3 text-[#DB2777] dark:text-pink-400" />
                  Refund &amp; Exchange Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenPolicy?.('privacy')} 
                  className="hover:text-[#DB2777] dark:hover:text-pink-400 transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3 h-3 text-[#DB2777] dark:text-pink-400" />
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenPolicy?.('terms')} 
                  className="hover:text-[#DB2777] dark:hover:text-pink-400 transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <FileText className="w-3 h-3 text-[#DB2777] dark:text-pink-400" />
                  Terms of Service
                </button>
              </li>
              <li className="pt-0.5">
                <span className="text-[11px] text-[#18181B]/60 dark:text-zinc-500">
                  Inspect Before Paying • Free 7-Day COD Swaps
                </span>
              </li>
            </ul>
          </div>

          {/* Dhaka Hub */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#18181B] dark:text-zinc-100">
              Dhaka Flagship Hub
            </h4>
            <ul className="space-y-2.5 text-xs text-[#18181B]/70 dark:text-zinc-400 font-medium">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#DB2777] dark:text-pink-400 flex-shrink-0 mt-0.5" />
                <span>Banani 11 & Dhanmondi 27, Dhaka</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#DB2777] dark:text-pink-400 flex-shrink-0" />
                <span>+880 1735-765566 </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#DB2777] dark:text-pink-400 flex-shrink-0" />
                <a 
                  href="mailto:aesthesteps@gmail.com"
                  className="hover:text-[#DB2777] dark:hover:text-pink-400 transition-colors"
                >
                  aesthesteps@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#18181B]/60 dark:text-zinc-500 font-medium">
          <p>© 2026 AESTHÉ STEPS. Founded by Hax + Mahin. All rights reserved.</p>
          
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="flex items-center gap-1.5 text-[#DB2777] dark:text-pink-400 font-bold">
              <Heart className="w-3.5 h-3.5 fill-[#F472B6] text-[#F472B6]" /> Built for Dhaka Gen-Z
            </span>
            <button
              onClick={() => onOpenPolicy?.('privacy')}
              className="hover:text-[#DB2777] dark:hover:text-pink-400 transition-colors cursor-pointer"
            >
              Privacy
            </button>
            <button
              onClick={() => onOpenPolicy?.('refund')}
              className="hover:text-[#DB2777] dark:hover:text-pink-400 transition-colors cursor-pointer"
            >
              Refund Policy
            </button>
            <button
              onClick={() => onOpenPolicy?.('terms')}
              className="hover:text-[#DB2777] dark:hover:text-pink-400 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

