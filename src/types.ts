export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: string;
  priceBDT: number;
  priceUSD: number;
  image: string;
  lifestyleImage?: string;
  colorScheme: {
    primary: string;
    accent: string;
    glow: string;
    ringColor: string;
  };
  sizes: number[];
  badge?: string;
  description: string;
  details: string[];
  inStock: boolean;
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  product: Product;
  selectedSize: number;
  quantity: number;
  customEngraving?: string;
}

export type ActiveNavTab = 'home' | 'shop' | 'collections' | 'customize' | 'favourites';
