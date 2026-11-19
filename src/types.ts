export interface ProductColorVariant {
  id: string;
  name: string;
  colorHex: string;
  secondaryHex?: string;
  image?: string;
}

export interface ProductColorScheme {
  primary: string;
  accent: string;
  glow: string;
  ringColor: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: string;
  priceBDT: number;
  image: string;
  lifestyleImage?: string;
  colorScheme?: ProductColorScheme;
  sizes: (number | string)[];
  outOfStockSizes?: (number | string)[];
  oversizeAvailable?: boolean;
  variants?: ProductColorVariant[];
  badge?: 'Popular Pick' | 'New' | string;
  campaignLabel?: string;
  description: string;
  details: string[];
  inStock: boolean;
  isPublished?: boolean;
  rating: number;
  reviewsCount: number;
  sortOrder?: number;
  updatedAt?: unknown;
}

export interface CartItem {
  product: Product;
  selectedSize: number | string;
  selectedVariant?: ProductColorVariant;
  quantity: number;
}

export interface PromoRule {
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  maxDiscountBDT?: number;
  label: string;
  active: boolean;
}

export interface StoreConfig {
  insideDhakaFee: number;
  outsideDhakaFee: number;
  primaryPhone: string;
  secondaryPhone: string;
  whatsappNumber: string;
  email: string;
  location: string;
  partners: string;
  promoCodes: PromoRule[];
  updatedAt?: unknown;
}

export type OrderStatus = 'pending' | 'confirmed' | 'dispatched' | 'delivered' | 'cancelled';

export interface OrderItemRecord {
  productId: string;
  productName: string;
  variantName?: string;
  size: number | string;
  quantity: number;
  unitPriceBDT: number;
  lineTotalBDT: number;
}

export interface OrderRecord {
  id?: string;
  orderCode: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customerNote?: string;
  deliveryArea: 'inside_dhaka' | 'outside_dhaka';
  deliveryFee: number;
  promoCode?: string;
  discountBDT: number;
  subtotalBDT: number;
  totalBDT: number;
  items: OrderItemRecord[];
  status: OrderStatus;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface AdminAllowlistEntry {
  id?: string;
  email: string;
  displayName: string;
  role: 'partner' | 'owner';
  addedAt?: unknown;
  addedBy: string;
}

export type ActiveNavTab = 'home' | 'collection' | 'lookbook' | 'about';
