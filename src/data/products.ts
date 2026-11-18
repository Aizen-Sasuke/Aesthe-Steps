import { Product } from '../types';

import {
  yslHeelImg,
  strapSlideImg,
  pointedToeMuleImg,
  crystalStrapImg,
  platformAnkleStrapImg,
  twoStrapBlockHeelImg,
} from './batch2026Images';

export const STORE_CONTACT = {
  partners: 'Hax, Mahin & Mahadi',
  primaryPhone: '01613-817630',
  secondaryPhone: '01618007003',
  whatsappNumber: '8801613817630',
  location: 'Dhaka, Bangladesh',
  email: 'aesthesteps@gmail.com',
};

export const DELIVERY_RATES = {
  insideDhaka: 70,
  outsideDhaka: 120,
};

export const ALL_PRODUCTS: Product[] = [
  {
    id: 'ysl-heel',
    name: 'YSL Heel',
    tagline: 'Patent pointed mule with bow & gold monogram hardware',
    category: 'Pointed Heels',
    priceBDT: 920,
    image: yslHeelImg,
    colorScheme: {
      primary: '#7F1D1D',
      accent: '#DB2777',
      glow: '#FDF2F4',
      ringColor: 'from-rose-900 to-pink-500'
    },
    sizes: [6, 7, 8, 9, 10, 11, 'Oversize'],
    oversizeAvailable: true,
    variants: [
      {
        id: 'ysl-heel-maroon',
        name: 'Maroon Patent',
        colorHex: '#7F1D1D',
        image: yslHeelImg,
      },
      {
        id: 'ysl-heel-black',
        name: 'Black Patent',
        colorHex: '#18181B',
        image: yslHeelImg,
      },
      {
        id: 'ysl-heel-brown',
        name: 'Chocolate Brown',
        colorHex: '#4A2C2A',
        image: yslHeelImg,
      },
      {
        id: 'ysl-heel-cream',
        name: 'Cream Ivory',
        colorHex: '#F3ECE1',
        image: yslHeelImg,
      }
    ],
    badge: 'Bestseller',
    campaignLabel: 'Patent & Bow Edit',
    description:
      'High-gloss patent pointed-toe silhouette crowned with a sculpted bow and metallic monogram hardware. Cushioned inside for effortless evening poise.',
    details: [
      'Glossy patent upper with sculpted bow hardware',
      'Padded contoured insole for all-evening wear',
      'Sizes 6–11 (EU 36–41) · Oversize fit available',
      'Four finishes: Maroon, Black, Chocolate Brown & Cream Ivory'
    ],
    inStock: true,
    rating: 4.9,
    reviewsCount: 64
  },
  {
    id: 'strap-slide',
    name: 'Strap Slide',
    tagline: 'Square-toe suede wide-strap block heel for everyday wear',
    category: 'Block Slides',
    priceBDT: 750,
    image: strapSlideImg,
    colorScheme: {
      primary: '#9A5B25',
      accent: '#18181B',
      glow: '#FAF6F0',
      ringColor: 'from-amber-700 to-zinc-800'
    },
    sizes: [6, 7, 8, 9, 10, 11, 'Oversize'],
    oversizeAvailable: true,
    variants: [
      {
        id: 'strap-slide-tan',
        name: 'Tan Brown',
        colorHex: '#9A5B25',
        image: strapSlideImg,
      },
      {
        id: 'strap-slide-black',
        name: 'Black Suede',
        colorHex: '#18181B',
        image: strapSlideImg,
      },
      {
        id: 'strap-slide-cream',
        name: 'Cream Beige',
        colorHex: '#D8C3AD',
        image: strapSlideImg,
      }
    ],
    badge: 'New',
    campaignLabel: 'Soft Suede Edit',
    description:
      'Architectural square-toe slide with a wide, soft-suede cross strap set on a steady mid block heel. Built to take you from morning errands to dinner effortlessly.',
    details: [
      'Velvety matte suede cross-strap upper',
      'Stable mid-height block heel with cushioned sole',
      'Sizes 6–11 (EU 36–41) · Oversize fit available',
      'Three neutral shades: Tan Brown, Black Suede & Cream Beige'
    ],
    inStock: true,
    rating: 4.8,
    reviewsCount: 42
  },
  {
    id: 'pointed-toe-mule',
    name: 'Pointed Toe Mule',
    tagline: 'Glossy patent mule with delicate tied bow & dual straps',
    category: 'Mules',
    priceBDT: 850,
    image: pointedToeMuleImg,
    colorScheme: {
      primary: '#18181B',
      accent: '#7F1D1D',
      glow: '#FDF2F4',
      ringColor: 'from-zinc-900 to-rose-900'
    },
    sizes: [6, 7, 8, 9, 10, 11, 'Oversize'],
    oversizeAvailable: true,
    variants: [
      {
        id: 'pointed-mule-black',
        name: 'Black Patent',
        colorHex: '#18181B',
        image: pointedToeMuleImg,
      },
      {
        id: 'pointed-mule-cream',
        name: 'Cream Ivory',
        colorHex: '#F3ECE1',
        image: pointedToeMuleImg,
      },
      {
        id: 'pointed-mule-brown',
        name: 'Chocolate Brown',
        colorHex: '#523228',
        image: pointedToeMuleImg,
      },
      {
        id: 'pointed-mule-maroon',
        name: 'Maroon Patent',
        colorHex: '#7F1D1D',
        image: pointedToeMuleImg,
      }
    ],
    badge: 'Trending',
    campaignLabel: 'Minimalist Mule',
    description:
      'Sharp pointed-toe slip-on mule finished with slender dual straps and a delicate knotted bow. Pairs seamlessly with relaxed linen trousers, sarees, or tailored dresses.',
    details: [
      'Slip-on pointed profile with dual slender straps',
      'Cushioned footbed paired with a low walkable heel lift',
      'Sizes 6–11 (EU 36–41) · Oversize fit available',
      'Four patent tones: Black, Cream Ivory, Chocolate Brown & Maroon'
    ],
    inStock: true,
    rating: 4.9,
    reviewsCount: 51
  },
  {
    id: 'crystal-strap',
    name: 'Crystal Strap',
    tagline: 'Twin rhinestone band block heel slide in suede & patent',
    category: 'Block Slides',
    priceBDT: 790,
    image: crystalStrapImg,
    colorScheme: {
      primary: '#7F1D1D',
      accent: '#18181B',
      glow: '#FDF2F4',
      ringColor: 'from-rose-900 to-zinc-800'
    },
    sizes: [6, 7, 8, 9, 10, 11, 'Oversize'],
    oversizeAvailable: true,
    variants: [
      {
        id: 'crystal-strap-black',
        name: 'Black Suede',
        colorHex: '#18181B',
        image: crystalStrapImg,
      },
      {
        id: 'crystal-strap-maroon',
        name: 'Maroon Patent',
        colorHex: '#7F1D1D',
        image: crystalStrapImg,
      }
    ],
    badge: 'New',
    campaignLabel: 'Evening Sparkle',
    description:
      'Open-toe twin-strap block heel traced with fine crystal rhinestone trim across both bands—bringing understated shimmer to dinners, dawats, and festive nights.',
    details: [
      'Hand-set twin crystal rhinestone bands across both straps',
      'Balanced block heel for confident movement all night',
      'Sizes 6–11 (EU 36–41) · Oversize fit available',
      'Available in Black Suede & Maroon Patent'
    ],
    inStock: true,
    rating: 4.8,
    reviewsCount: 37
  },
  {
    id: 'platform-ankle-strap',
    name: 'Platform Ankle Strap',
    tagline: 'Pointed blush pump with crystal bow & ankle buckle',
    category: 'Pointed Heels',
    priceBDT: 990,
    image: platformAnkleStrapImg,
    colorScheme: {
      primary: '#F472B6',
      accent: '#DB2777',
      glow: '#FDF2F4',
      ringColor: 'from-pink-400 to-rose-400'
    },
    sizes: [6, 7, 8, 9, 10, 11, 'Oversize'],
    oversizeAvailable: true,
    variants: [
      {
        id: 'platform-ankle-pink',
        name: 'Blush Pink',
        colorHex: '#F472B6',
        image: platformAnkleStrapImg,
      }
    ],
    badge: 'New',
    campaignLabel: 'Occasion Signature',
    description:
      'Statement blush-pink pointed pump adorned with a sparkling crystal bow centerpiece and an adjustable buckled ankle strap for refined security at weddings and evening events.',
    details: [
      'Crystal-encrusted bow centerpiece on a satin-smooth pointed toe',
      'Adjustable buckled ankle strap for a secure custom fit',
      'Sizes 6–11 (EU 36–41) · Oversize fit available',
      'Signature Blush Pink edition'
    ],
    inStock: true,
    rating: 4.9,
    reviewsCount: 29
  },
  {
    id: 'two-strap-block-heel',
    name: '2 Strap Block Heel',
    tagline: 'Scalloped-edge cushioned slide in soft matte suede',
    category: 'Block Slides',
    priceBDT: 690,
    image: twoStrapBlockHeelImg,
    colorScheme: {
      primary: '#8C5028',
      accent: '#6B1D2F',
      glow: '#FAF6F0',
      ringColor: 'from-amber-800 to-rose-900'
    },
    sizes: [6, 7, 8, 9, 10, 11, 'Oversize'],
    oversizeAvailable: true,
    variants: [
      {
        id: 'two-strap-brown',
        name: 'Tan Brown',
        colorHex: '#8C5028',
        image: twoStrapBlockHeelImg,
      },
      {
        id: 'two-strap-black',
        name: 'Black Suede',
        colorHex: '#18181B',
        image: twoStrapBlockHeelImg,
      },
      {
        id: 'two-strap-maroon',
        name: 'Maroon Suede',
        colorHex: '#6B1D2F',
        image: twoStrapBlockHeelImg,
      }
    ],
    badge: 'Bestseller',
    campaignLabel: 'Everyday Icon',
    description:
      'Our signature two-strap suede block heel featuring a scalloped-edge cushioned footbed. Lightweight stability engineered for long campus hours and relaxed weekends.',
    details: [
      'Scalloped-edge Aesthé Steps cushioned footbed',
      'Plush matte suede dual straps for gentle hold',
      'Sizes 6–11 (EU 36–41) · Oversize fit available',
      'Three core hues: Tan Brown, Black Suede & Maroon Suede'
    ],
    inStock: true,
    rating: 5.0,
    reviewsCount: 73
  }
];

export const HERO_PRODUCTS: Product[] = ALL_PRODUCTS;

export const LOOKBOOK_IMAGES = {
  lookbook1: yslHeelImg,
  lookbook2: pointedToeMuleImg,
  lookbook3: twoStrapBlockHeelImg,
  lookbook4: strapSlideImg,
  paletteLookbook: crystalStrapImg,
  campaignHero: yslHeelImg
};
