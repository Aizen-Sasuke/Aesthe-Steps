export interface ProductColorVariant {
  id: string;
  name: string;
  colorHex: string;
  secondaryHex?: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: string;
  priceBDT: number; // Retail price per pair in BDT
  image: string;
  lifestyleImage?: string;
  colorScheme: {
    primary: string;
    accent: string;
    glow: string;
    ringColor: string;
  };
  sizes: (number | string)[];
  oversizeAvailable?: boolean;
  variants?: ProductColorVariant[];
  badge?: 'Bestseller' | 'New' | 'Trending';
  campaignLabel?: string;
  description: string;
  details: string[];
  inStock: boolean;
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  product: Product;
  selectedSize: number | string;
  selectedVariant?: ProductColorVariant;
  quantity: number; // Quantity in individual pairs
  customEngraving?: string;
}

export type ActiveNavTab = 'home' | 'shop' | 'collections' | 'customize' | 'favourites';
