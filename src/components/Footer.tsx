import React, { useState } from 'react';
import { MapPin, Phone, Mail, ArrowRight, Heart, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenSizeGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSizeGuide }) => {
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
    <footer className="bg-[#FFF9FA] border-t border-pink-200/80 text-[#18181B] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Dhaka Drop Alert */}
        <div className="p-8 rounded-3xl bg-white border border-pink-200/80 mb-16 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#DB2777] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Next Dhaka Drop Alert
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif-display text-[#18181B]">
              Get Notified on New Footwear Drops
            </h3>
            <p className="text-xs text-[#18181B]/70">
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
              className="bg-[#FAF6F0] border border-pink-200 rounded-full px-5 py-3 text-xs text-[#18181B] placeholder-[#18181B]/40 focus:outline-none focus:border-[#F472B6] min-w-[260px]"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-[#18181B] hover:bg-[#F472B6] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>{subscribed ? 'Subscribed!' : 'Join The Drop'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 pb-12 border-b border-pink-200/60">
          
          {/* Brand Info with Wordmark */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="font-serif-display text-2xl font-black tracking-tight text-[#18181B] leading-none">
                AESTHÉ
              </span>
              <span className="text-[10px] font-sans font-bold tracking-[0.28em] text-[#DB2777] uppercase -mt-0.5">
                STEPS
              </span>
            </div>
            <p className="text-xs text-[#18181B]/70 leading-relaxed">
              Footwear for Dhaka's urban Gen-Z. Founded by <strong className="text-[#18181B] font-bold">Hax + Mahin</strong>. Elevated silhouettes, cloud-soft footbeds, and friendly prices.
            </p>
            <p className="text-xs font-semibold text-[#DB2777]">
              Dhaka, Bangladesh • COD Across All Districts
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#18181B]">
              Drop 01 Silhouettes
            </h4>
            <ul className="space-y-2 text-xs text-[#18181B]/70 font-medium">
              <li><a href="#collection-section" className="hover:text-[#DB2777] transition-colors">Pink Crystal Dn Series</a></li>
              <li><a href="#collection-section" className="hover:text-[#DB2777] transition-colors">Midnight Shimmer Mule</a></li>
              <li><a href="#collection-section" className="hover:text-[#DB2777] transition-colors">Olive Ribbon Bow Slider</a></li>
              <li><a href="#collection-section" className="hover:text-[#DB2777] transition-colors">Limited Dhaka Drops</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#18181B]">
              Sizing & Policies
            </h4>
            <ul className="space-y-2 text-xs text-[#18181B]/70 font-medium">
              <li>
                <button onClick={onOpenSizeGuide} className="hover:text-[#DB2777] transition-colors text-left font-bold text-[#DB2777]">
                  Bangladesh Size Guide (EU 36-41)
                </button>
              </li>
              <li><span>Free 7-Day Doorstep Size Swaps</span></li>
              <li><span>Inspect Before Paying (COD)</span></li>
              <li><span>Rhinestone & Insole Care</span></li>
            </ul>
          </div>

          {/* Dhaka Hub */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#18181B]">
              Dhaka Flagship Hub
            </h4>
            <ul className="space-y-2.5 text-xs text-[#18181B]/70 font-medium">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#DB2777] flex-shrink-0 mt-0.5" />
                <span>Banani 11 & Dhanmondi 27, Dhaka</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#DB2777] flex-shrink-0" />
                <span>+880 1700-AESTHE (237843)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#DB2777] flex-shrink-0" />
                <span>hello@aesthesteps.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#18181B]/60 font-medium">
          <p>© 2026 AESTHÉ STEPS. Founded by Hax + Mahin. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-[#DB2777] font-bold">
              <Heart className="w-3.5 h-3.5 fill-[#F472B6] text-[#F472B6]" /> Built for Dhaka Gen-Z
            </span>
            <span>Privacy</span>
            <span>Terms of Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

