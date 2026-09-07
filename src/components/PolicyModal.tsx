import React, { useEffect } from 'react';
import { X, ShieldCheck, RotateCcw, FileText, Lock, CheckCircle2, Phone, Mail, Sparkles } from 'lucide-react';

export type PolicyType = 'privacy' | 'refund' | 'terms';

interface PolicyModalProps {
  isOpen: boolean;
  activePolicy: PolicyType;
  onClose: () => void;
  onSelectPolicy: (policy: PolicyType) => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({
  isOpen,
  activePolicy,
  onClose,
  onSelectPolicy
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-[#FAF6F0] dark:bg-[#121217] border border-pink-200 dark:border-zinc-800 rounded-3xl shadow-2xl z-10 flex flex-col max-h-[90vh] text-[#18181B] dark:text-zinc-100 transition-colors my-auto overflow-hidden">
        
        {/* Header with Title and Tabs */}
        <div className="p-5 sm:p-6 border-b border-pink-200/80 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 backdrop-blur-md">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#FDF2F4] dark:bg-zinc-800 border border-pink-200 dark:border-zinc-700 flex items-center justify-center text-[#DB2777] dark:text-pink-400">
                <Sparkles className="w-4 h-4" />
              </span>
              <div>
                <h2 className="font-serif-display text-xl sm:text-2xl font-bold text-[#18181B] dark:text-zinc-50">
                  Legal &amp; Store Policies
                </h2>
                <p className="text-[11px] text-[#18181B]/60 dark:text-zinc-400">
                  AESTHÉ STEPS • Dhaka, Bangladesh
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#18181B]/60 dark:text-zinc-400 hover:text-[#18181B] dark:hover:text-white hover:bg-pink-100/50 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => onSelectPolicy('privacy')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                activePolicy === 'privacy'
                  ? 'bg-[#18181B] text-white dark:bg-pink-600 dark:text-white shadow-xs'
                  : 'bg-white dark:bg-zinc-800 text-[#18181B]/70 dark:text-zinc-300 border border-pink-200/60 dark:border-zinc-700 hover:border-pink-300'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#F472B6]" />
              <span>Privacy Policy</span>
            </button>

            <button
              onClick={() => onSelectPolicy('refund')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                activePolicy === 'refund'
                  ? 'bg-[#18181B] text-white dark:bg-pink-600 dark:text-white shadow-xs'
                  : 'bg-white dark:bg-zinc-800 text-[#18181B]/70 dark:text-zinc-300 border border-pink-200/60 dark:border-zinc-700 hover:border-pink-300'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#F472B6]" />
              <span>Refund &amp; Exchange</span>
            </button>

            <button
              onClick={() => onSelectPolicy('terms')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                activePolicy === 'terms'
                  ? 'bg-[#18181B] text-white dark:bg-pink-600 dark:text-white shadow-xs'
                  : 'bg-white dark:bg-zinc-800 text-[#18181B]/70 dark:text-zinc-300 border border-pink-200/60 dark:border-zinc-700 hover:border-pink-300'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-[#F472B6]" />
              <span>Terms of Service</span>
            </button>
          </div>
        </div>

        {/* Scrollable Policy Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm leading-relaxed text-[#18181B]/80 dark:text-zinc-300">
          
          {/* ================= PRIVACY POLICY ================= */}
          {activePolicy === 'privacy' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-pink-200/60 dark:border-zinc-800 pb-4">
                <div className="inline-flex items-center gap-1.5 text-xs text-[#DB2777] dark:text-pink-400 font-bold uppercase tracking-wider mb-1">
                  <Lock className="w-3.5 h-3.5" /> Data Protection &amp; Confidentiality
                </div>
                <h3 className="font-serif-display text-2xl font-bold text-[#18181B] dark:text-zinc-50">
                  Privacy Policy
                </h3>
                <p className="text-xs text-[#18181B]/60 dark:text-zinc-400 mt-1">
                  Last Updated: September 2026 • Applies to all customers across Bangladesh
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-base text-[#18181B] dark:text-zinc-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F472B6]" />
                  1. Information We Collect at Checkout
                </h4>
                <p>
                  When you prepare an order through our storefront checkout flow, we request the minimal personal data necessary to process delivery:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li><strong>Full Name:</strong> Required on the parcel label for courier identification and doorstep handover.</li>
                  <li><strong>Phone Number:</strong> Essential for our team to verify your order on WhatsApp and for the delivery rider to contact you prior to arrival.</li>
                  <li><strong>Delivery Address &amp; District:</strong> Full street address, apartment details, and city/district for dispatch routing.</li>
                  <li><strong>Optional Custom Inscription:</strong> Text for personalized laser engraving requests on select footbeds.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-base text-[#18181B] dark:text-zinc-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F472B6]" />
                  2. How Your Information Is Used
                </h4>
                <p>
                  Your information is exclusively utilized to:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-pink-200/70 dark:border-zinc-800 text-xs">
                    <strong className="block text-[#DB2777] dark:text-pink-400 mb-1">WhatsApp Order Fulfillment</strong>
                    Pre-populate the formatted order dispatch summary sent directly to our official WhatsApp helpline (+880 1735-765566).
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-pink-200/70 dark:border-zinc-800 text-xs">
                    <strong className="block text-[#DB2777] dark:text-pink-400 mb-1">Courier Logistics</strong>
                    Generate the shipping consignment with verified domestic delivery carriers (Steadfast, Pathao, or Paperfly).
                  </div>
                </div>
              </div>

              <div className="space-y-3 p-4 rounded-2xl bg-pink-50/70 dark:bg-zinc-900/80 border border-pink-200 dark:border-zinc-800">
                <h4 className="font-bold text-sm text-[#DB2777] dark:text-pink-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  3. Zero Data Sharing or Sale
                </h4>
                <p className="text-xs sm:text-sm text-[#18181B]/80 dark:text-zinc-300">
                  We maintain a strict zero-tolerance policy against commercial data exploitation. <strong>We do not sell, rent, lease, or distribute your personal details, phone numbers, or purchase histories to any third-party advertisers, data brokers, or marketing networks.</strong>
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-base text-[#18181B] dark:text-zinc-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F472B6]" />
                  4. Data Rights &amp; Contact
                </h4>
                <p className="text-xs sm:text-sm">
                  You have the right to request deletion of your order records or update your contact details at any point by messaging our support line on WhatsApp at <strong>+880 1735-765566</strong> or emailing <strong>aesthesteps@gmail.com</strong>.
                </p>
              </div>
            </div>
          )}

          {/* ================= REFUND & EXCHANGE POLICY ================= */}
          {activePolicy === 'refund' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-pink-200/60 dark:border-zinc-800 pb-4">
                <div className="inline-flex items-center gap-1.5 text-xs text-[#DB2777] dark:text-pink-400 font-bold uppercase tracking-wider mb-1">
                  <RotateCcw className="w-3.5 h-3.5" /> Customer Happiness &amp; Fit Guarantee
                </div>
                <h3 className="font-serif-display text-2xl font-bold text-[#18181B] dark:text-zinc-50">
                  Refund &amp; Exchange Policy
                </h3>
                <p className="text-xs text-[#18181B]/60 dark:text-zinc-400 mt-1">
                  Hassle-free 7-day size swaps and doorstep inspection across Bangladesh
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-base text-[#18181B] dark:text-zinc-100 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#DB2777] dark:text-pink-400" />
                  1. 7-Day Size &amp; Product Exchange Window
                </h4>
                <p>
                  We understand that finding the dream fit is essential. You may exchange any purchased pair within <strong>7 days of delivery</strong> for:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>A different size (from EU 36 up to EU 41).</li>
                  <li>An alternative silhouette or colorway of equal value (or settle the difference for higher-priced designs).</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-pink-200 dark:border-zinc-800 space-y-2">
                <h4 className="font-bold text-sm text-[#18181B] dark:text-zinc-100 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  2. Cash-on-Delivery: Inspect at Your Doorstep
                </h4>
                <p className="text-xs sm:text-sm text-[#18181B]/80 dark:text-zinc-300">
                  With our Cash on Delivery model, you are welcome to inspect your footwear parcel when the rider arrives. If the product arrived damaged, defective, or noticeably incorrect, <strong>you may refuse the parcel on the spot with absolutely zero penalty or cancellation fees</strong>.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-base text-[#18181B] dark:text-zinc-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F472B6]" />
                  3. Condition Requirements for Exchange
                </h4>
                <p>
                  To protect sanitary standards and guarantee brand craftsmanship for all customers:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li><strong>Footwear must be completely unworn outdoors:</strong> We strongly advise trying on slides indoors on clean, carpeted surfaces.</li>
                  <li><strong>Zero Refunds on Used / Worn Items:</strong> Products displaying dirt, scuffed outsoles, creased footbeds, or missing crystal stones cannot be accepted for refund or exchange.</li>
                  <li><strong>Original Packaging:</strong> Please preserve the original shoe dust bag and brand box.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-base text-[#18181B] dark:text-zinc-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F472B6]" />
                  4. How to Initiate an Exchange
                </h4>
                <p className="text-xs sm:text-sm">
                  Simply send a message to our WhatsApp team at <strong>+880 1735-765566</strong> with your order name and desired replacement size. Inside Dhaka, our courier handles direct doorstep swaps (delivering the new pair while retrieving the original). Outside Dhaka, return pickup is coordinated via local express parcel hubs.
                </p>
              </div>
            </div>
          )}

          {/* ================= TERMS OF SERVICE ================= */}
          {activePolicy === 'terms' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-pink-200/60 dark:border-zinc-800 pb-4">
                <div className="inline-flex items-center gap-1.5 text-xs text-[#DB2777] dark:text-pink-400 font-bold uppercase tracking-wider mb-1">
                  <FileText className="w-3.5 h-3.5" /> Terms &amp; Conditions
                </div>
                <h3 className="font-serif-display text-2xl font-bold text-[#18181B] dark:text-zinc-50">
                  Terms of Service
                </h3>
                <p className="text-xs text-[#18181B]/60 dark:text-zinc-400 mt-1">
                  Official operational terms for AESTHÉ STEPS customers
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-base text-[#18181B] dark:text-zinc-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F472B6]" />
                  1. Order Acceptance &amp; Confirmation
                </h4>
                <p>
                  Placing an order through our digital catalog prepares an order inquiry sent via WhatsApp. Orders are officially accepted once verified and confirmed by our customer representative, subject to real-time physical inventory availability in our Dhaka fulfillment hub.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-base text-[#18181B] dark:text-zinc-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F472B6]" />
                  2. Pricing &amp; Currency
                </h4>
                <p>
                  All product prices displayed on the storefront are strictly in <strong>Bangladeshi Taka (BDT)</strong>. Standard delivery fees are:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li><strong>Dhaka Metropolitan Area:</strong> 70 BDT flat delivery charge.</li>
                  <li><strong>Nationwide (Outside Dhaka):</strong> 130 BDT flat delivery charge covering all 64 districts.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-base text-[#18181B] dark:text-zinc-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F472B6]" />
                  3. Delivery Timelines
                </h4>
                <p>
                  Estimated doorstep transit schedules from time of WhatsApp dispatch confirmation:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-pink-200/70 dark:border-zinc-800 text-xs">
                    <strong className="block text-[#18181B] dark:text-zinc-100 font-bold mb-0.5">Inside Dhaka</strong>
                    24 to 48 hours for standard express delivery.
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-pink-200/70 dark:border-zinc-800 text-xs">
                    <strong className="block text-[#18181B] dark:text-zinc-100 font-bold mb-0.5">Outside Dhaka</strong>
                    3 to 5 business days across all nationwide districts.
                  </div>
                </div>
              </div>

              <div className="space-y-3 p-4 rounded-2xl bg-pink-50/70 dark:bg-zinc-900/80 border border-pink-200 dark:border-zinc-800">
                <h4 className="font-bold text-sm text-[#DB2777] dark:text-pink-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  4. Right of Cancellation
                </h4>
                <p className="text-xs sm:text-sm text-[#18181B]/80 dark:text-zinc-300">
                  AESTHÉ STEPS reserves the explicit right to cancel, refuse, or hold any order suspected of fraudulent activity, invalid or repeatedly unreachable contact telephone numbers, unverified addresses, or repeated bad-faith COD rejections.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-base text-[#18181B] dark:text-zinc-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F472B6]" />
                  5. Intellectual Property &amp; Brand Rights
                </h4>
                <p className="text-xs sm:text-sm">
                  All trademarks, wordmarks ("AESTHÉ STEPS"), footwear designs, lifestyle photography, and editorial copy are the intellectual property of founders Hax &amp; Mahin. Any unauthorized commercial reproduction, imitation, or redistribution is strictly prohibited.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-pink-200/80 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3 text-[#18181B]/70 dark:text-zinc-400">
            <span className="flex items-center gap-1.5 font-medium">
              <Phone className="w-3.5 h-3.5 text-[#DB2777] dark:text-pink-400" />
              +880 1735-765566
            </span>
            <span className="text-pink-300 dark:text-zinc-700">•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <Mail className="w-3.5 h-3.5 text-[#DB2777] dark:text-pink-400" />
              aesthesteps@gmail.com
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#18181B] hover:bg-[#DB2777] dark:bg-zinc-800 dark:hover:bg-pink-600 text-white font-bold transition-all text-xs"
          >
            Close Policy
          </button>
        </div>

      </div>
    </div>
  );
};
