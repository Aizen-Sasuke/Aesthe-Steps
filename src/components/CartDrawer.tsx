import React, { useState, useEffect } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  ArrowRight, 
  ArrowLeft, 
  MessageCircle, 
  AlertCircle
} from 'lucide-react';
import { CartItem } from '../types';
import { trackBeginCheckout, trackPurchase } from '../utils/analytics';
import { STORE_CONTACT, DELIVERY_RATES } from '../data/products';

export const WHATSAPP_PHONE_NUMBER = STORE_CONTACT.whatsappNumber;

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, size: number | string, quantity: number, variantId?: string) => void;
  onRemoveItem: (productId: string, size: number | string, variantId?: string) => void;
  onClearCart: () => void;
  onShowToast?: (message: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onShowToast
}) => {
  const [step, setStep] = useState<'cart' | 'checkout'>('cart');
  const [deliveryArea, setDeliveryArea] = useState<'inside_dhaka' | 'outside_dhaka'>('inside_dhaka');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerNote, setCustomerNote] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || cartItems.length === 0) {
      setStep('cart');
      setValidationError(null);
      setPromoError(null);
    }
  }, [isOpen, cartItems.length]);

  if (!isOpen) return null;

  const subtotalBDT = cartItems.reduce(
    (acc, item) => acc + item.product.priceBDT * item.quantity,
    0
  );

  const deliveryFee =
    deliveryArea === 'inside_dhaka' ? DELIVERY_RATES.insideDhaka : DELIVERY_RATES.outsideDhaka;
  
  let discountBDT = 0;
  if (appliedPromo === 'DHAKAGENZ') {
    discountBDT = Math.min(Math.round(subtotalBDT * 0.1), 100);
  } else if (appliedPromo === 'HAXMAHIN') {
    discountBDT = 200;
  }

  const totalBDT = Math.max(0, subtotalBDT + deliveryFee - discountBDT);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const applyPromoValue = (rawCode: string) => {
    const code = rawCode.trim().toUpperCase();
    if (code === 'DHAKAGENZ' || code === 'HAXMAHIN') {
      setAppliedPromo(code);
      setPromoCode(code);
      setPromoError(null);
    } else {
      setPromoError('Invalid promo code. Use DHAKAGENZ or HAXMAHIN below.');
    }
  };

  const buildWhatsAppOrderMessage = (): string => {
    const areaLabel = deliveryArea === 'inside_dhaka' ? 'Inside Dhaka' : 'Outside Dhaka';

    const itemsSummary = cartItems
      .map((item, index) => {
        const variantText = item.selectedVariant ? ` (${item.selectedVariant.name})` : '';
        const itemTotal = item.product.priceBDT * item.quantity;
        return `${index + 1}. *${item.product.name}*${variantText}
   • Size: ${item.selectedSize}
   • Quantity: ${item.quantity}
   • Price: ৳${item.product.priceBDT.toLocaleString()} — Subtotal: ৳${itemTotal.toLocaleString()}`;
      })
      .join('\n\n');

    let message = `🛍️ *NEW ORDER - AESTHÉ STEPS*\n`;
    message += `==============================\n\n`;
    message += `*CUSTOMER DETAILS:*\n`;
    message += `• *Full Name:* ${customerName.trim()}\n`;
    message += `• *Phone Number:* ${customerPhone.trim()}\n`;
    message += `• *Delivery Address:* ${customerAddress.trim()}\n`;
    if (customerNote.trim()) {
      message += `• *Order Note:* ${customerNote.trim()}\n`;
    }
    message += `\n*ORDERED ITEMS:*\n`;
    message += `${itemsSummary}\n\n`;
    message += `==============================\n`;
    message += `*BILLING SUMMARY:*\n`;
    message += `• Subtotal: ৳${subtotalBDT.toLocaleString()}\n`;
    message += `• Delivery Fee (${areaLabel}): ৳${deliveryFee}\n`;
    if (discountBDT > 0 && appliedPromo) {
      message += `• Discount (${appliedPromo}): -৳${discountBDT.toLocaleString()}\n`;
    }
    message += `• *TOTAL PAYABLE:* ৳${totalBDT.toLocaleString()}\n`;
    message += `• *Payment Method:* Cash on Delivery (COD)\n\n`;
    message += `Please confirm my order and share the expected delivery schedule. Thank you!`;

    return message;
  };

  const handleOpenCheckout = () => {
    trackBeginCheckout({
      itemsCount: totalCount,
      value: totalBDT,
      currency: 'BDT',
    });
    setStep('checkout');
  };

  const handleWhatsAppCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const name = customerName.trim();
    const phone = customerPhone.trim();
    const address = customerAddress.trim();

    if (!name || !phone || !address) {
      setValidationError('Please fill in your full name, phone number, and delivery address.');
      return;
    }

    const orderMessage = buildWhatsAppOrderMessage();
    const encodedMessage = encodeURIComponent(orderMessage);
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    trackPurchase({
      value: totalBDT,
      currency: 'BDT',
      itemsCount: totalCount,
    });

    onClearCart();
    setStep('cart');
    setCustomerName('');
    setCustomerPhone('');
    setCustomerAddress('');
    setCustomerNote('');

    onClose();
    onShowToast?.('Order sent via WhatsApp! We will confirm your delivery shortly.');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-8 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FAF6F0] dark:bg-[#121217] border-l border-pink-200 dark:border-zinc-800 text-[#18181B] dark:text-zinc-100 shadow-2xl flex flex-col justify-between transition-colors">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-pink-200/80 dark:border-zinc-800 flex items-center justify-between bg-[#FDF2F4] dark:bg-zinc-900">
            {step === 'checkout' ? (
              <button
                type="button"
                onClick={() => {
                  setStep('cart');
                  setValidationError(null);
                }}
                className="flex items-center gap-1.5 text-xs font-bold text-[#DB2777] dark:text-pink-400 hover:opacity-80 transition-opacity"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Bag</span>
              </button>
            ) : (
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-[#DB2777] dark:text-pink-400" />
                <h2 className="text-lg font-bold font-serif-display tracking-tight text-[#18181B] dark:text-zinc-50">
                  Shopping Bag
                </h2>
                <span className="text-xs bg-white dark:bg-zinc-800 text-[#DB2777] dark:text-pink-400 border border-pink-200 dark:border-zinc-700 px-2.5 py-0.5 rounded-full font-bold tabular-nums">
                  {totalCount}
                </span>
              </div>
            )}

            {step === 'checkout' && (
              <span className="text-xs font-bold uppercase tracking-wider text-[#18181B]/70 dark:text-zinc-300">
                Checkout
              </span>
            )}

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#18181B]/60 dark:text-zinc-400 hover:text-[#18181B] dark:hover:text-zinc-100 hover:bg-pink-100/60 dark:hover:bg-zinc-800 transition-colors"
              title="Close bag"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-white dark:bg-zinc-800 border border-pink-200 dark:border-zinc-700 text-[#18181B]/40 dark:text-zinc-400 flex items-center justify-center mx-auto shadow-2xs">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-[#18181B] dark:text-zinc-50 font-serif-display">Your shopping bag is empty</h3>
                <p className="text-xs text-[#18181B]/65 dark:text-zinc-400 max-w-xs mx-auto leading-relaxed">
                  Explore our latest silhouettes and choose your size to start your order.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-[#18181B] dark:bg-pink-600 text-white hover:bg-[#DB2777] dark:hover:bg-pink-500 text-xs font-bold transition-all uppercase tracking-wider"
                >
                  Explore Collection
                </button>
              </div>
            ) : step === 'cart' ? (
              <>
                <div className="space-y-3">
                  {cartItems.map((item) => {
                    const itemImage = item.selectedVariant?.image || item.product.image;
                    const itemKey = `${item.product.id}-${item.selectedSize}-${item.selectedVariant?.id || 'std'}`;

                    return (
                      <div
                        key={itemKey}
                        className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-pink-200/80 dark:border-zinc-800 flex items-center gap-3 shadow-2xs"
                      >
                        <div className="w-16 h-14 rounded-xl overflow-hidden bg-[#FFF5F7] dark:bg-zinc-800 border border-pink-100 dark:border-zinc-700 shrink-0">
                          <img
                            src={itemImage}
                            alt={item.selectedVariant ? `${item.product.name} in ${item.selectedVariant.name}` : item.product.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-[#18181B] dark:text-zinc-100 font-serif-display truncate">
                            {item.product.name}
                          </h4>

                          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-[#18181B]/70 dark:text-zinc-400 pt-0.5">
                            {item.selectedVariant && (
                              <span className="inline-flex items-center gap-1 font-semibold text-[#DB2777] dark:text-pink-400">
                                <span
                                  className="w-2.5 h-2.5 rounded-full border border-black/10 dark:border-white/20 inline-block"
                                  style={{ backgroundColor: item.selectedVariant.colorHex }}
                                />
                                <span>{item.selectedVariant.name}</span>
                              </span>
                            )}
                            <span>Size {item.selectedSize}</span>
                          </div>
                          <div className="text-xs font-bold text-[#18181B] dark:text-zinc-100 pt-1 tabular-nums">
                            ৳ {(item.product.priceBDT * item.quantity).toLocaleString()}
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <button
                            onClick={() => onRemoveItem(item.product.id, item.selectedSize, item.selectedVariant?.id)}
                            className="text-[#18181B]/45 dark:text-zinc-500 hover:text-rose-500 p-1 transition-colors"
                            title="Remove item"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                          <div className="flex items-center gap-1.5 bg-[#FAF6F0] dark:bg-zinc-800 px-2 py-1 rounded-lg border border-pink-200 dark:border-zinc-700 tabular-nums">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.quantity - 1, item.selectedVariant?.id)}
                              className="text-[#18181B]/70 dark:text-zinc-300 hover:text-[#18181B] dark:hover:text-white"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-[#18181B] dark:text-zinc-100 min-w-[16px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.quantity + 1, item.selectedVariant?.id)}
                              className="text-[#18181B]/70 dark:text-zinc-300 hover:text-[#18181B] dark:hover:text-white"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Delivery Region Selector */}
                <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-pink-200/80 dark:border-zinc-800 space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#18181B] dark:text-zinc-200">
                    <span className="flex items-center gap-1.5 font-bold">
                      <Truck className="w-4 h-4 text-[#DB2777] dark:text-pink-400" /> Delivery Area
                    </span>
                    <span className="text-[11px] text-[#18181B]/60 dark:text-zinc-400 font-medium">
                      Cash on Delivery
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 text-xs">
                    <button
                      type="button"
                      onClick={() => setDeliveryArea('inside_dhaka')}
                      className={`p-3 rounded-xl border text-left transition-all tabular-nums ${
                        deliveryArea === 'inside_dhaka'
                          ? 'border-[#F472B6] bg-[#FDF2F4] dark:bg-zinc-800 text-[#18181B] dark:text-pink-300 font-bold'
                          : 'border-pink-200 dark:border-zinc-800 bg-[#FAF6F0] dark:bg-zinc-950/50 text-[#18181B]/75 dark:text-zinc-400 hover:text-[#18181B]'
                      }`}
                    >
                      <div className="font-bold">Inside Dhaka</div>
                      <div className="text-[11px] text-[#18181B]/65 dark:text-zinc-400 mt-0.5">24–48h · ৳ {DELIVERY_RATES.insideDhaka}</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryArea('outside_dhaka')}
                      className={`p-3 rounded-xl border text-left transition-all tabular-nums ${
                        deliveryArea === 'outside_dhaka'
                          ? 'border-[#F472B6] bg-[#FDF2F4] dark:bg-zinc-800 text-[#18181B] dark:text-pink-300 font-bold'
                          : 'border-pink-200 dark:border-zinc-800 bg-[#FAF6F0] dark:bg-zinc-950/50 text-[#18181B]/75 dark:text-zinc-400 hover:text-[#18181B]'
                      }`}
                    >
                      <div className="font-bold">Outside Dhaka</div>
                      <div className="text-[11px] text-[#18181B]/65 dark:text-zinc-400 mt-0.5">48–72h · ৳ {DELIVERY_RATES.outsideDhaka}</div>
                    </button>
                  </div>
                </div>

                {/* Promo Code Input & One-Tap Offer Chips */}
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => {
                        setPromoCode(e.target.value);
                        if (promoError) setPromoError(null);
                      }}
                      placeholder="Promo code"
                      className="flex-1 bg-white dark:bg-zinc-900 border border-pink-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-[#18181B] dark:text-zinc-100 placeholder-[#18181B]/40 dark:placeholder-zinc-500 focus:outline-none focus:border-[#F472B6] uppercase"
                    />
                    <button
                      type="button"
                      onClick={() => applyPromoValue(promoCode)}
                      className="px-4 py-2.5 rounded-xl bg-[#18181B] dark:bg-pink-600 hover:bg-[#DB2777] dark:hover:bg-pink-500 text-xs font-bold text-white transition-colors uppercase tracking-wider shrink-0"
                    >
                      Apply
                    </button>
                  </div>

                  {promoError && (
                    <p className="text-[11px] font-medium text-rose-600 dark:text-rose-400 px-1">
                      {promoError}
                    </p>
                  )}

                  {!appliedPromo ? (
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-[#18181B]/65 dark:text-zinc-400">
                      <span>Available:</span>
                      <button
                        type="button"
                        onClick={() => applyPromoValue('DHAKAGENZ')}
                        className="px-2 py-0.5 rounded-md bg-white dark:bg-zinc-800 border border-pink-200 dark:border-zinc-700 font-mono font-semibold text-[#DB2777] dark:text-pink-400 hover:border-[#DB2777] transition-colors"
                      >
                        DHAKAGENZ
                      </button>
                      <button
                        type="button"
                        onClick={() => applyPromoValue('HAXMAHIN')}
                        className="px-2 py-0.5 rounded-md bg-white dark:bg-zinc-800 border border-pink-200 dark:border-zinc-700 font-mono font-semibold text-[#DB2777] dark:text-pink-400 hover:border-[#DB2777] transition-colors"
                      >
                        HAXMAHIN
                      </button>
                    </div>
                  ) : (
                    <div className="text-[11px] text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 px-3 py-2 rounded-xl flex justify-between items-center font-medium tabular-nums">
                      <span>Code &apos;{appliedPromo}&apos; applied ({appliedPromo === 'DHAKAGENZ' ? '10% off up to ৳100' : '৳200 off'})</span>
                      <button
                        type="button"
                        onClick={() => {
                          setAppliedPromo(null);
                          setPromoCode('');
                        }}
                        className="text-[#18181B]/60 dark:text-zinc-400 hover:text-[#18181B]"
                        aria-label="Remove promo code"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* STEP 2: CHECKOUT FORM */
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-pink-200/80 dark:border-zinc-800 space-y-2.5 shadow-2xs tabular-nums">
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-pink-100 dark:border-zinc-800">
                    <span className="font-bold text-[#18181B] dark:text-zinc-100 flex items-center gap-1.5">
                      <ShoppingBag className="w-3.5 h-3.5 text-[#DB2777] dark:text-pink-400" />
                      Order Summary ({totalCount} {totalCount === 1 ? 'item' : 'items'})
                    </span>
                    <span className="font-bold text-[#DB2777] dark:text-pink-400">
                      ৳ {totalBDT.toLocaleString()}
                    </span>
                  </div>

                  <div className="space-y-1.5 max-h-28 overflow-y-auto pr-1">
                    {cartItems.map((item) => (
                      <div 
                        key={`${item.product.id}-${item.selectedSize}-${item.selectedVariant?.id || 'std'}`}
                        className="flex items-center justify-between text-[11px] text-[#18181B]/80 dark:text-zinc-300 gap-2"
                      >
                        <span className="truncate">
                          {item.quantity} × {item.product.name} (Size {item.selectedSize}{item.selectedVariant ? `, ${item.selectedVariant.name}` : ''})
                        </span>
                        <span className="font-semibold text-[#18181B] dark:text-zinc-100 shrink-0">
                          ৳ {(item.product.priceBDT * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-pink-100 dark:border-zinc-800 space-y-1 text-[11px] text-[#18181B]/70 dark:text-zinc-400">
                    <div className="flex items-center justify-between">
                      <span>Delivery ({deliveryArea === 'inside_dhaka' ? `Inside Dhaka · ৳${DELIVERY_RATES.insideDhaka}` : `Outside Dhaka · ৳${DELIVERY_RATES.outsideDhaka}`})</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">Cash on Delivery</span>
                    </div>
                    {discountBDT > 0 && (
                      <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                        <span>Discount {appliedPromo === 'DHAKAGENZ' ? '(10% off up to ৳100)' : `(${appliedPromo})`}:</span>
                        <span>- ৳ {discountBDT.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>

                <form id="whatsapp-checkout-form" onSubmit={handleWhatsAppCheckout} className="space-y-3.5">
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#18181B] dark:text-zinc-100">
                      Delivery Details
                    </h3>
                    <p className="text-[11px] text-[#18181B]/65 dark:text-zinc-400">
                      Complete your details below to send your order directly on WhatsApp.
                    </p>
                  </div>

                  {validationError && (
                    <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 dark:text-rose-400" />
                      <span>{validationError}</span>
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#18181B]/80 dark:text-zinc-300 block">
                      Full Name <span className="text-[#DB2777] dark:text-pink-400">*</span>
                    </label>
                    <input
                      id="checkout-name"
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => {
                        setCustomerName(e.target.value);
                        if (validationError) setValidationError(null);
                      }}
                      placeholder="e.g. Ayesha Rahman"
                      className="w-full bg-white dark:bg-zinc-900 border border-pink-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-[#18181B] dark:text-zinc-100 placeholder-[#18181B]/40 dark:placeholder-zinc-500 focus:outline-none focus:border-[#F472B6]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#18181B]/80 dark:text-zinc-300 block">
                      Phone Number <span className="text-[#DB2777] dark:text-pink-400">*</span>
                    </label>
                    <input
                      id="checkout-phone"
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => {
                        setCustomerPhone(e.target.value);
                        if (validationError) setValidationError(null);
                      }}
                      placeholder="e.g. 017XXXXXXXX"
                      className="w-full bg-white dark:bg-zinc-900 border border-pink-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-[#18181B] dark:text-zinc-100 placeholder-[#18181B]/40 dark:placeholder-zinc-500 focus:outline-none focus:border-[#F472B6]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#18181B]/80 dark:text-zinc-300 block">
                      Delivery Address <span className="text-[#DB2777] dark:text-pink-400">*</span>
                    </label>
                    <textarea
                      id="checkout-address"
                      required
                      rows={3}
                      value={customerAddress}
                      onChange={(e) => {
                        setCustomerAddress(e.target.value);
                        if (validationError) setValidationError(null);
                      }}
                      placeholder="House, Road, Area, Thana, Dhaka / District"
                      className="w-full bg-white dark:bg-zinc-900 border border-pink-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-[#18181B] dark:text-zinc-100 placeholder-[#18181B]/40 dark:placeholder-zinc-500 focus:outline-none focus:border-[#F472B6] resize-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#18181B]/80 dark:text-zinc-300">
                        Order Note
                      </label>
                      <span className="text-[10px] text-[#18181B]/50 dark:text-zinc-500">Optional</span>
                    </div>
                    <textarea
                      id="checkout-note"
                      rows={2}
                      value={customerNote}
                      onChange={(e) => setCustomerNote(e.target.value)}
                      placeholder="e.g. Call before arrival / deliver after 4 PM"
                      className="w-full bg-white dark:bg-zinc-900 border border-pink-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-[#18181B] dark:text-zinc-100 placeholder-[#18181B]/40 dark:placeholder-zinc-500 focus:outline-none focus:border-[#F472B6] resize-none"
                    />
                  </div>

                  <div className="p-3 rounded-2xl bg-[#FFF5F7] dark:bg-zinc-900 border border-pink-200/80 dark:border-zinc-800 flex items-start gap-2.5 text-[11px] text-[#18181B]/75 dark:text-zinc-400">
                    <MessageCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      Submitting opens WhatsApp directly with us ({STORE_CONTACT.primaryPhone}) to confirm availability.
                    </p>
                  </div>
                </form>
              </div>
            )}

          </div>

          {/* Drawer Footer */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-pink-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3 tabular-nums">
              {step === 'cart' ? (
                <>
                  <div className="space-y-1.5 text-xs text-[#18181B]/75 dark:text-zinc-400">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-[#18181B] dark:text-zinc-100 font-bold">৳ {subtotalBDT.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery ({deliveryArea === 'inside_dhaka' ? 'Dhaka' : 'Outside'})</span>
                      <span className="font-semibold text-[#18181B] dark:text-zinc-200">৳ {deliveryFee}</span>
                    </div>
                    {discountBDT > 0 && (
                      <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-bold">
                        <span>Discount {appliedPromo === 'DHAKAGENZ' ? '(10% off up to ৳100)' : appliedPromo ? `(${appliedPromo})` : ''}</span>
                        <span>- ৳ {discountBDT.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm font-bold text-[#18181B] dark:text-zinc-100 pt-2 border-t border-pink-100 dark:border-zinc-800">
                      <span>Total Payable</span>
                      <span className="text-[#DB2777] dark:text-pink-400 text-base font-bold">৳ {totalBDT.toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    id="cart-place-order-btn"
                    type="button"
                    onClick={handleOpenCheckout}
                    className="w-full py-3.5 rounded-full bg-[#18181B] dark:bg-pink-600 hover:bg-[#DB2777] dark:hover:bg-pink-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-[#18181B]/65 dark:text-zinc-400 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#DB2777] dark:text-pink-400" />
                    <span>Inspect before paying the courier</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between text-xs text-[#18181B]/80 dark:text-zinc-300">
                    <span className="font-medium">Total Payable (COD)</span>
                    <span className="text-[#DB2777] dark:text-pink-400 text-base font-bold">৳ {totalBDT.toLocaleString()}</span>
                  </div>

                  <button
                    id="checkout-submit-whatsapp"
                    type="submit"
                    form="whatsapp-checkout-form"
                    className="w-full py-3.5 rounded-full bg-[#18181B] dark:bg-pink-600 hover:bg-[#DB2777] dark:hover:bg-pink-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>Send Order via WhatsApp</span>
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-[#18181B]/65 dark:text-zinc-400 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#DB2777] dark:text-pink-400" />
                    <span>Cash on Delivery · 7-Day Size Exchange</span>
                  </div>
                </>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
