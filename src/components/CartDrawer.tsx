import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, MapPin, Truck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, size: number, quantity: number, variantId?: string) => void;
  onRemoveItem: (productId: string, size: number, variantId?: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [deliveryArea, setDeliveryArea] = useState<'inside_dhaka' | 'outside_dhaka'>('inside_dhaka');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'card'>('cod');
  
  // Checkout form fields
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const subtotalBDT = cartItems.reduce(
    (acc, item) => acc + item.product.priceBDT * item.quantity,
    0
  );

  const deliveryFee = subtotalBDT > 4000 ? 0 : deliveryArea === 'inside_dhaka' ? 70 : 120;
  
  let discountBDT = 0;
  if (appliedPromo === 'DHAKAGENZ') {
    discountBDT = Math.round(subtotalBDT * 0.1);
  } else if (appliedPromo === 'HAXMAHIN') {
    discountBDT = 200;
  }

  const totalBDT = Math.max(0, subtotalBDT + deliveryFee - discountBDT);

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'DHAKAGENZ' || code === 'HAXMAHIN') {
      setAppliedPromo(code);
    } else {
      alert('Invalid code! Try "DHAKAGENZ" for 10% off or "HAXMAHIN" for ৳ 200 off.');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert('Please fill in your delivery name, phone number, and Dhaka address.');
      return;
    }

    const generatedId = `AST-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setOrderPlaced(true);
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF6F0] dark:bg-[#121217] border-l border-pink-200 dark:border-zinc-800 text-[#18181B] dark:text-zinc-100 shadow-2xl flex flex-col justify-between transition-colors">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-pink-200/80 dark:border-zinc-800 flex items-center justify-between bg-[#FDF2F4] dark:bg-zinc-900">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#DB2777] dark:text-pink-400" />
              <h2 className="text-lg font-bold font-serif-display tracking-tight text-[#18181B] dark:text-zinc-50">
                Your Aesthé Bag
              </h2>
              <span className="text-xs bg-white dark:bg-zinc-800 text-[#DB2777] dark:text-pink-400 border border-pink-200 dark:border-zinc-700 px-2.5 py-0.5 rounded-full font-bold">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#18181B]/60 dark:text-zinc-400 hover:text-[#18181B] dark:hover:text-zinc-100 hover:bg-pink-100/60 dark:hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            
            {orderPlaced ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold font-serif-display text-[#18181B] dark:text-zinc-50">Order Confirmed!</h3>
                <p className="text-xs text-[#18181B]/70 dark:text-zinc-400 max-w-xs mx-auto">
                  Thank you, <span className="text-[#18181B] dark:text-zinc-100 font-bold">{customerName}</span>! Your Aesthé Steps order <span className="text-[#DB2777] dark:text-pink-400 font-mono font-bold">{orderId}</span> is being prepared for dispatch in Dhaka.
                </p>
                <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-pink-200 dark:border-zinc-800 text-left space-y-2 text-xs shadow-2xs">
                  <div className="flex justify-between text-[#18181B]/70 dark:text-zinc-400">
                    <span>Payment Method:</span>
                    <span className="text-[#18181B] dark:text-zinc-200 font-semibold uppercase">{paymentMethod}</span>
                  </div>
                  <div className="flex justify-between text-[#18181B]/70 dark:text-zinc-400">
                    <span>Total Payable:</span>
                    <span className="text-[#18181B] dark:text-zinc-100 font-bold">৳ {totalBDT.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#18181B]/70 dark:text-zinc-400">
                    <span>Delivery Address:</span>
                    <span className="text-[#18181B] dark:text-zinc-200 text-right font-medium">{customerAddress}</span>
                  </div>
                </div>
                <p className="text-[11px] text-[#18181B]/60 dark:text-zinc-400">
                  Our dispatch rider will ring {customerPhone} before arriving.
                </p>
                <button
                  onClick={() => {
                    setOrderPlaced(false);
                    onClose();
                  }}
                  className="w-full py-3 rounded-full bg-[#18181B] dark:bg-pink-600 hover:bg-[#F472B6] dark:hover:bg-pink-500 text-white font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-white dark:bg-zinc-800 border border-pink-200 dark:border-zinc-700 text-[#18181B]/40 dark:text-zinc-400 flex items-center justify-center mx-auto shadow-2xs">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-[#18181B] dark:text-zinc-50 font-serif-display">Your bag is empty</h3>
                <p className="text-xs text-[#18181B]/60 dark:text-zinc-400 max-w-xs mx-auto">
                  Pick your favorite slides from Drop 01 to checkout.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-[#18181B] dark:bg-pink-600 text-white hover:bg-[#F472B6] dark:hover:bg-pink-500 text-xs font-bold transition-all uppercase tracking-wider"
                >
                  Explore Drops
                </button>
              </div>
            ) : (
              <>
                {/* Cart Items List */}
                <div className="space-y-3">
                  {cartItems.map((item) => {
                    const itemImage = item.selectedVariant?.image || item.product.image;
                    const itemKey = `${item.product.id}-${item.selectedSize}-${item.selectedVariant?.id || 'std'}-${item.customEngraving || ''}`;

                    return (
                      <div
                        key={itemKey}
                        className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-pink-200/80 dark:border-zinc-800 flex items-center gap-3 shadow-2xs"
                      >
                        <div className="w-16 h-16 rounded-xl bg-[#FFF5F7] dark:bg-zinc-800 p-1 flex items-center justify-center border border-pink-100 dark:border-zinc-700 flex-shrink-0">
                          <img
                            src={itemImage}
                            alt={item.selectedVariant ? `${item.product.name} in ${item.selectedVariant.name}` : item.product.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-[#18181B] dark:text-zinc-100 font-serif-display truncate">
                            {item.product.name}
                          </h4>

                          {/* Variant & Size details */}
                          <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#18181B]/70 dark:text-zinc-400 pt-0.5">
                            {item.selectedVariant && (
                              <span className="inline-flex items-center gap-1 font-semibold text-[#DB2777] dark:text-pink-400">
                                <span
                                  className="w-2.5 h-2.5 rounded-full border border-black/10 dark:border-white/20 inline-block"
                                  style={{ backgroundColor: item.selectedVariant.colorHex }}
                                />
                                <span>{item.selectedVariant.name}</span>
                              </span>
                            )}
                            <span>EU {item.selectedSize}</span>
                            {item.customEngraving && (
                              <span className="text-[#DB2777] dark:text-pink-400 text-[10px] bg-pink-50 dark:bg-zinc-800 px-1.5 py-0.5 rounded border border-pink-200 dark:border-zinc-700">
                                Stamp: {item.customEngraving}
                              </span>
                            )}
                          </div>
                          <div className="text-xs font-bold text-[#18181B] dark:text-zinc-100 pt-1">
                            ৳ {(item.product.priceBDT * item.quantity).toLocaleString()}
                          </div>
                        </div>

                        {/* Quantity & Remove */}
                        <div className="flex flex-col items-end gap-2">
                          <button
                            onClick={() => onRemoveItem(item.product.id, item.selectedSize, item.selectedVariant?.id)}
                            className="text-[#18181B]/40 dark:text-zinc-500 hover:text-rose-500 p-1 transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                          <div className="flex items-center gap-1.5 bg-[#FAF6F0] dark:bg-zinc-800 px-2 py-1 rounded-lg border border-pink-200 dark:border-zinc-700">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.quantity - 1, item.selectedVariant?.id)}
                              className="text-[#18181B]/70 dark:text-zinc-300 hover:text-[#18181B] dark:hover:text-white"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-[#18181B] dark:text-zinc-100 min-w-[14px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, item.quantity + 1, item.selectedVariant?.id)}
                              className="text-[#18181B]/70 dark:text-zinc-300 hover:text-[#18181B] dark:hover:text-white"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Delivery Destination Options */}
                <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-pink-200/80 dark:border-zinc-800 space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#18181B] dark:text-zinc-200">
                    <span className="flex items-center gap-1.5 font-bold">
                      <Truck className="w-4 h-4 text-[#DB2777] dark:text-pink-400" /> Bangladesh Delivery
                    </span>
                    {subtotalBDT > 4000 && (
                      <span className="text-[10px] text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded font-bold">
                        FREE Over ৳ 4,000
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setDeliveryArea('inside_dhaka')}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        deliveryArea === 'inside_dhaka'
                          ? 'border-[#F472B6] bg-[#FDF2F4] dark:bg-zinc-800 text-[#18181B] dark:text-pink-300 font-bold'
                          : 'border-pink-200 dark:border-zinc-800 bg-[#FAF6F0] dark:bg-zinc-950/50 text-[#18181B]/70 dark:text-zinc-400 hover:text-[#18181B]'
                      }`}
                    >
                      <div className="font-bold">Inside Dhaka</div>
                      <div className="text-[10px] text-[#18181B]/60 dark:text-zinc-400">24-48h • ৳ 70</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryArea('outside_dhaka')}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        deliveryArea === 'outside_dhaka'
                          ? 'border-[#F472B6] bg-[#FDF2F4] dark:bg-zinc-800 text-[#18181B] dark:text-pink-300 font-bold'
                          : 'border-pink-200 dark:border-zinc-800 bg-[#FAF6F0] dark:bg-zinc-950/50 text-[#18181B]/70 dark:text-zinc-400 hover:text-[#18181B]'
                      }`}
                    >
                      <div className="font-bold">Outside Dhaka</div>
                      <div className="text-[10px] text-[#18181B]/60 dark:text-zinc-400">48-72h • ৳ 120</div>
                    </button>
                  </div>
                </div>

                {/* Promo Code Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Coupon (try DHAKAGENZ)"
                    className="flex-1 bg-white dark:bg-zinc-900 border border-pink-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs text-[#18181B] dark:text-zinc-100 placeholder-[#18181B]/40 dark:placeholder-zinc-500 focus:outline-none focus:border-[#F472B6] uppercase"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-4 py-2 rounded-xl bg-[#18181B] dark:bg-pink-600 hover:bg-[#F472B6] dark:hover:bg-pink-500 text-xs font-bold text-white transition-colors uppercase tracking-wider"
                  >
                    Apply
                  </button>
                </div>

                {appliedPromo && (
                  <div className="text-[11px] text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 px-3 py-1.5 rounded-lg flex justify-between items-center font-medium">
                    <span>Coupon '{appliedPromo}' applied!</span>
                    <button onClick={() => setAppliedPromo(null)} className="text-[#18181B]/60 dark:text-zinc-400 hover:text-[#18181B]">
                      ✕
                    </button>
                  </div>
                )}

                {/* Customer Checkout Form */}
                <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#18181B]/70 dark:text-zinc-400">
                    Delivery & Contact Details
                  </h4>

                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Your Full Name"
                    className="w-full bg-white dark:bg-zinc-900 border border-pink-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs text-[#18181B] dark:text-zinc-100 placeholder-[#18181B]/40 dark:placeholder-zinc-500 focus:outline-none focus:border-[#F472B6]"
                  />

                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Mobile Number (e.g. 017XXXXXXXX)"
                    className="w-full bg-white dark:bg-zinc-900 border border-pink-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs text-[#18181B] dark:text-zinc-100 placeholder-[#18181B]/40 dark:placeholder-zinc-500 focus:outline-none focus:border-[#F472B6]"
                  />

                  <textarea
                    required
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="Delivery Address (House, Road, Area, Dhaka / District)"
                    rows={2}
                    className="w-full bg-white dark:bg-zinc-900 border border-pink-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs text-[#18181B] dark:text-zinc-100 placeholder-[#18181B]/40 dark:placeholder-zinc-500 focus:outline-none focus:border-[#F472B6]"
                  />

                  {/* Payment Method */}
                  <div className="space-y-1.5 pt-1">
                    <label className="text-[11px] font-bold text-[#18181B]/70 dark:text-zinc-400 uppercase tracking-wider">Payment Option</label>
                    <div className="grid grid-cols-3 gap-2 text-[11px]">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        className={`p-2 rounded-xl border text-center font-bold ${
                          paymentMethod === 'cod'
                            ? 'border-[#F472B6] bg-[#FDF2F4] dark:bg-zinc-800 text-[#DB2777] dark:text-pink-400'
                            : 'border-pink-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-[#18181B]/70 dark:text-zinc-400'
                        }`}
                      >
                        Cash on Delivery
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('bkash')}
                        className={`p-2 rounded-xl border text-center font-bold ${
                          paymentMethod === 'bkash'
                            ? 'border-[#F472B6] bg-[#FDF2F4] dark:bg-zinc-800 text-[#DB2777] dark:text-pink-400'
                            : 'border-pink-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-[#18181B]/70 dark:text-zinc-400'
                        }`}
                      >
                        bKash / Nagad
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-2 rounded-xl border text-center font-bold ${
                          paymentMethod === 'card'
                            ? 'border-[#F472B6] bg-[#FDF2F4] dark:bg-zinc-800 text-[#DB2777] dark:text-pink-400'
                            : 'border-pink-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-[#18181B]/70 dark:text-zinc-400'
                        }`}
                      >
                        Card / POS
                      </button>
                    </div>
                  </div>
                </form>
              </>
            )}

          </div>

          {/* Drawer Footer / Summary */}
          {!orderPlaced && cartItems.length > 0 && (
            <div className="p-5 border-t border-pink-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3">
              <div className="space-y-1 text-xs text-[#18181B]/70 dark:text-zinc-400">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="text-[#18181B] dark:text-zinc-100 font-bold">৳ {subtotalBDT.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery ({deliveryArea === 'inside_dhaka' ? 'Dhaka' : 'Outside'}):</span>
                  <span>{deliveryFee === 0 ? 'FREE' : `৳ ${deliveryFee}`}</span>
                </div>
                {discountBDT > 0 && (
                  <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-bold">
                    <span>Discount:</span>
                    <span>- ৳ {discountBDT.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-[#18181B] dark:text-zinc-100 pt-2 border-t border-pink-100 dark:border-zinc-800">
                  <span>Total Payable:</span>
                  <span className="text-[#DB2777] dark:text-pink-400 text-base font-bold">৳ {totalBDT.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                className="w-full py-3.5 rounded-full bg-[#18181B] dark:bg-pink-600 hover:bg-[#F472B6] dark:hover:bg-pink-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Confirm Order (COD)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#18181B]/60 dark:text-zinc-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#DB2777] dark:text-pink-400" />
                <span>Inspect your pair before paying the courier</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
