import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Heart,
  ShieldCheck,
  RotateCcw,
  FileText,
  MessageCircle,
  Ruler,
  Lock,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { ALL_PRODUCTS, DEFAULT_STORE_CONFIG } from '../data/products';
import { Product, StoreConfig } from '../types';

interface FooterProps {
  products?: Product[];
  storeConfig?: StoreConfig;
  onOpenSizeGuide: () => void;
  onSelectProduct: (product: Product) => void;
  onOpenPolicy?: (policy: 'privacy' | 'refund' | 'terms') => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  products = ALL_PRODUCTS,
  storeConfig = DEFAULT_STORE_CONFIG,
  onOpenSizeGuide,
  onSelectProduct,
  onOpenPolicy,
  onOpenAdmin,
}) => {
  const whatsappDigits = storeConfig.whatsappNumber || '8801613817630';
  const secondaryDigits = storeConfig.secondaryPhone.replace(/[^0-9]/g, '');

  return (
    <footer className="bg-[#FFF9FA] dark:bg-[#08080A] border-t border-pink-200/80 dark:border-zinc-800 text-[#18181B] dark:text-zinc-300 pt-12 sm:pt-14 pb-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Actionable Concierge Bar */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-pink-200/80 dark:border-zinc-800 mb-10 sm:mb-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-center md:text-left">
            <p className="text-xs text-[#DB2777] dark:text-pink-400 font-bold uppercase tracking-wider">
              Aesthé Steps Care
            </p>
            <h3 className="text-xl sm:text-2xl font-bold font-serif-display text-[#18181B] dark:text-zinc-50">
              Need Sizing Advice or Shade Help?
            </h3>
            <p className="text-xs text-[#18181B]/70 dark:text-zinc-400">
              Check our quick size chart or message us directly on WhatsApp ({storeConfig.primaryPhone}).
            </p>
          </div>

          <div className="w-full md:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              type="button"
              onClick={onOpenSizeGuide}
              className="px-6 py-3 rounded-full bg-[#FAF6F0] dark:bg-zinc-800 border border-pink-200 dark:border-zinc-700 hover:border-[#DB2777] text-xs font-bold uppercase tracking-wider text-[#18181B] dark:text-zinc-100 transition-colors flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
            >
              <Ruler className="w-4 h-4 text-[#DB2777] dark:text-pink-400" />
              <span>Size Guide</span>
            </button>
            <a
              href={`https://wa.me/${whatsappDigits}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-[#18181B] dark:bg-pink-600 hover:bg-[#DB2777] dark:hover:bg-pink-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 dark:text-white" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Symmetric 4-Column Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-12 border-b border-pink-200/60 dark:border-zinc-800">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <BrandLogo size="md" />
            <p className="text-xs text-[#18181B]/75 dark:text-zinc-400 leading-relaxed">
              Contemporary women&apos;s footwear selected by us in Dhaka, delivered across Bangladesh.
            </p>
            <p className="text-xs font-semibold text-[#DB2777] dark:text-pink-400">
              UK Sizes 6–11 · Nationwide COD
            </p>
          </div>

          {/* Column 2: Direct Product Shortcuts */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#18181B] dark:text-zinc-100">
              The Collection
            </h4>
            <ul className="space-y-2 text-xs text-[#18181B]/75 dark:text-zinc-400 font-medium tabular-nums">
              {products.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => onSelectProduct(item)}
                    className="w-full max-w-[230px] hover:text-[#DB2777] dark:hover:text-pink-400 transition-colors flex items-center justify-between gap-2 text-left cursor-pointer"
                  >
                    <span className="truncate">{item.name}</span>
                    <span className="font-semibold text-[#18181B]/85 dark:text-zinc-300 shrink-0">
                      ৳ {item.priceBDT}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Fit & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#18181B] dark:text-zinc-100">
              Sizing &amp; Policies
            </h4>
            <ul className="space-y-2 text-xs text-[#18181B]/75 dark:text-zinc-400 font-medium">
              <li>
                <button
                  onClick={onOpenSizeGuide}
                  className="hover:text-[#DB2777] dark:hover:text-pink-400 transition-colors text-left font-bold text-[#DB2777] dark:text-pink-400 cursor-pointer"
                >
                  Size Guide (UK 6–11)
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
              <li className="pt-0.5 tabular-nums">
                <span className="text-[11px] text-[#18181B]/60 dark:text-zinc-500">
                  Delivery: ৳{storeConfig.insideDhakaFee} Dhaka · ৳{storeConfig.outsideDhakaFee} Outside
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Customer Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#18181B] dark:text-zinc-100">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-[#18181B]/75 dark:text-zinc-400 font-medium">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#DB2777] dark:text-pink-400 shrink-0 mt-0.5" />
                <span>{storeConfig.location}</span>
              </li>
              <li className="flex items-center gap-2 tabular-nums">
                <MessageCircle className="w-4 h-4 text-[#DB2777] dark:text-pink-400 shrink-0" />
                <a
                  href={`https://wa.me/${whatsappDigits}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#DB2777] dark:hover:text-pink-400 transition-colors font-semibold text-[#18181B] dark:text-zinc-200"
                >
                  {storeConfig.primaryPhone} (WhatsApp &amp; Orders)
                </a>
              </li>
              {storeConfig.secondaryPhone && (
                <li className="flex items-center gap-2 tabular-nums">
                  <Phone className="w-4 h-4 text-[#DB2777] dark:text-pink-400 shrink-0" />
                  <a
                    href={`tel:+88${secondaryDigits}`}
                    className="hover:text-[#DB2777] dark:hover:text-pink-400 transition-colors"
                  >
                    {storeConfig.secondaryPhone} (Helpline)
                  </a>
                </li>
              )}
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#DB2777] dark:text-pink-400 shrink-0" />
                <a
                  href={`mailto:${storeConfig.email}`}
                  className="hover:text-[#DB2777] dark:hover:text-pink-400 transition-colors"
                >
                  {storeConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#18181B]/60 dark:text-zinc-500 font-medium">
          <p>© 2026 AESTHÉ STEPS. Partners: {storeConfig.partners}. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="flex items-center gap-1.5 text-[#DB2777] dark:text-pink-400 font-semibold">
              <Heart className="w-3.5 h-3.5 fill-[#F472B6] text-[#F472B6]" /> Crafted in Dhaka
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
            {onOpenAdmin && (
              <button
                type="button"
                id="footer-partner-portal-btn"
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1 text-[#18181B]/55 dark:text-zinc-500 hover:text-[#DB2777] dark:hover:text-pink-400 transition-colors cursor-pointer"
              >
                <Lock className="w-3 h-3" />
                <span>Partner Portal</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
