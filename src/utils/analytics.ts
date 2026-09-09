/**
 * Analytics utility for Google Analytics 4 (gtag) and Meta Pixel (fbq).
 * Safely checks for window.gtag and window.fbq so calls never throw runtime errors.
 */

// Global type declarations for window
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export interface TrackAddToCartParams {
  productId?: string;
  productName: string;
  price: number;
  currency?: string;
  quantity?: number;
  variant?: string;
}

export interface TrackBeginCheckoutParams {
  itemsCount?: number;
  value?: number;
  currency?: string;
}

export interface TrackPurchaseParams {
  value: number;
  currency?: string;
  itemsCount?: number;
}

/**
 * Fires GA4 'add_to_cart' and Meta Pixel 'AddToCart'
 */
export const trackAddToCart = ({
  productId,
  productName,
  price,
  currency = 'BDT',
  quantity = 1,
  variant,
}: TrackAddToCartParams) => {
  try {
    // 1. Google Analytics 4
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'add_to_cart', {
        currency,
        value: price * quantity,
        items: [
          {
            item_id: productId,
            item_name: productName,
            price,
            quantity,
            item_variant: variant,
          },
        ],
      });
    }

    // 2. Meta Pixel
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'AddToCart', {
        content_name: productName,
        content_ids: productId ? [productId] : undefined,
        content_type: 'product',
        value: price * quantity,
        currency,
      });
    }
  } catch (error) {
    console.warn('Analytics trackAddToCart error:', error);
  }
};

/**
 * Fires GA4 'begin_checkout' and Meta Pixel 'InitiateCheckout'
 */
export const trackBeginCheckout = ({
  itemsCount = 0,
  value = 0,
  currency = 'BDT',
}: TrackBeginCheckoutParams = {}) => {
  try {
    // 1. Google Analytics 4
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'begin_checkout', {
        currency,
        value,
        items_count: itemsCount,
      });
    }

    // 2. Meta Pixel
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'InitiateCheckout', {
        num_items: itemsCount,
        value,
        currency,
      });
    }
  } catch (error) {
    console.warn('Analytics trackBeginCheckout error:', error);
  }
};

/**
 * Fires GA4 'purchase' and Meta Pixel 'Purchase'
 */
export const trackPurchase = ({
  value,
  currency = 'BDT',
  itemsCount = 0,
}: TrackPurchaseParams) => {
  try {
    // 1. Google Analytics 4
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'purchase', {
        transaction_id: `AS-${Date.now()}`,
        value,
        currency,
        items_count: itemsCount,
      });
    }

    // 2. Meta Pixel
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'Purchase', {
        value,
        currency,
        num_items: itemsCount,
      });
    }
  } catch (error) {
    console.warn('Analytics trackPurchase error:', error);
  }
};
