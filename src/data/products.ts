import { Product } from '../types';

import yslHeelImg from '../assets/images/batch2026/as_030_ysl_heel.jpg';
import strapSlideImg from '../assets/images/batch2026/as_031_strap_slide.jpg';
import pointedToeMuleImg from '../assets/images/batch2026/as_032_pointed_toe_mule.jpg';
import crystalStrapImg from '../assets/images/batch2026/as_033_crystal_strap.jpg';
import platformAnkleStrapImg from '../assets/images/batch2026/as_034_platform_ankle_strap.jpg';
import twoStrapBlockHeelImg from '../assets/images/batch2026/as_035_two_strap_block_heel.jpg';

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
    campaignLabel: '4 Colorways Available',
    description:
      'High-gloss patent pointed-toe heel finished with a structured bow and metallic monogram accent. Sold individually per pair in Sizes 6–11 with Oversize fit available.',
    details: [
      'Sold per pair · Cash on Delivery nationwide',
      'Sizes 6–11 (EU 36–41) · Oversize fit available',
      'Soft padded footbed for all-evening comfort',
      '4 classic shades: Maroon, Black, Chocolate Brown & Cream Ivory'
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
    campaignLabel: '3 Suede Shades',
    description:
      'Clean square-toe suede cross-strap slide set on an easy mid block heel. Lightweight slip-on construction crafted for campus runs, workdays, and weekend dinners.',
    details: [
      'Sold per pair · Cash on Delivery nationwide',
      'Sizes 6–11 (EU 36–41) · Oversize fit available',
      'Plush suede cross-strap upper with cushioned sole',
      'Available in Tan Brown, Black Suede & Cream Beige'
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
    campaignLabel: '4 Patent Shades',
    description:
      'Sleek pointed-toe slip-on mule featuring slender dual straps and a dainty knotted patent bow. Effortlessly pairs with linen trousers, kurtis, and tailored dresses.',
    details: [
      'Sold per pair · Cash on Delivery nationwide',
      'Sizes 6–11 (EU 36–41) · Oversize fit available',
      'Cushioned footbed with low block heel lift',
      'Available in Black, Cream Ivory, Chocolate Brown & Maroon'
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
    campaignLabel: '2 Crystal Finishes',
    description:
      'Double-strap open-toe heel trimmed with shimmering crystal rhinestone bands across both the front and instep straps for subtle evening sparkle.',
    details: [
      'Sold per pair · Cash on Delivery nationwide',
      'Sizes 6–11 (EU 36–41) · Oversize fit available',
      'Hand-set twin crystal rhinestone trim straps',
      'Available in Black Suede and Maroon Patent'
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
    campaignLabel: 'Limited Blush Edition',
    description:
      'Statement blush-pink pointed heel detailed with a crystal-center bow and supportive buckled ankle strap—designed for dawat nights, weddings, and dressed-up evenings.',
    details: [
      'Sold per pair · Cash on Delivery nationwide',
      'Sizes 6–11 (EU 36–41) · Oversize fit available',
      'Adjustable ankle strap with crystal bow centerpiece',
      'Signature Blush Pink finish'
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
    campaignLabel: '3 Everyday Shades',
    description:
      'Signature Aesthé Steps two-strap suede block heel with a soft scalloped cushioned footbed. Effortless balance of height, grip, and everyday ease.',
    details: [
      'Sold per pair · Cash on Delivery nationwide',
      'Sizes 6–11 (EU 36–41) · Oversize fit available',
      'Signature Aesthé Steps cushioned insole',
      'Available in Tan Brown, Black Suede & Maroon Suede'
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
