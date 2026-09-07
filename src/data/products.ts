import { Product } from '../types';

import pinkCrystalIsolated from '../assets/images/pink_crystal_isolated_1788758971009.jpg';
import blackGlitterIsolated from '../assets/images/black_glitter_isolated_1788758986595.jpg';
import oliveBowIsolated from '../assets/images/olive_bow_isolated_1788759008077.jpg';

import feetPinkImg from '../assets/images/feet_pink_rhinestone_slide_1788758041451.jpg';
import feetBlackImg from '../assets/images/feet_black_shimmer_slide_1788758058098.jpg';
import feetOliveImg from '../assets/images/feet_olive_bow_slide_1788758072989.jpg';
import campaignBannerImg from '../assets/images/campaign_dhaka_girls_slides_1788758089570.jpg';

export const HERO_PRODUCTS: Product[] = [
  {
    id: 'aesthe-pink-crystal',
    name: 'Aesthé Crystal Dn',
    tagline: 'Blush Pink • Rhinestone Toe-Ring',
    category: "Chunky Slides",
    priceBDT: 2450,
    priceUSD: 22,
    image: pinkCrystalIsolated,
    lifestyleImage: feetPinkImg,
    colorScheme: {
      primary: '#f472b6',
      accent: '#db2777',
      glow: '#fdf2f4',
      ringColor: 'from-pink-400 to-rose-300'
    },
    sizes: [36, 37, 38, 39, 40, 41],
    badge: 'DROP 01 • VIRAL HIT',
    description: 'Our viral silhouette. Chunky blush pink patent slide with crystal-encrusted midfoot strap and delicate toe loop. 180g featherlight cloud-cushioned footbed built for walking Dhaka all day without friction.',
    details: [
      'Real glass rhinestone heat-press (stays on)',
      '180g featherlight cloud foam footbed',
      'Square-toe chunky edge with toe grip',
      'Wipes clean easily with damp cloth',
      'Designed in Dhaka by Hax & Mahin'
    ],
    inStock: true,
    rating: 4.9,
    reviewsCount: 128
  },
  {
    id: 'aesthe-midnight-glitter',
    name: 'Aesthé Midnight Shimmer',
    tagline: 'Onyx & Silver • Criss-Cross Mule',
    category: "Criss-Cross Slides",
    priceBDT: 2650,
    priceUSD: 24,
    image: blackGlitterIsolated,
    lifestyleImage: feetBlackImg,
    colorScheme: {
      primary: '#18181b',
      accent: '#f472b6',
      glow: '#faf6f0',
      ringColor: 'from-zinc-900 to-pink-500'
    },
    sizes: [36, 37, 38, 39, 40, 41],
    badge: 'DHAKA NIGHTS',
    description: 'Dual criss-cross straps in shimmering silver and jet glitter. Soft micro-suede inner lining prevents any skin irritation, while the plush padded footbed offers all-night comfort.',
    details: [
      'Soft-lined inner straps (zero skin rubbing)',
      'Dual criss-cross arch-hug design',
      'Anti-slip textured rubber base',
      'Low 1-inch chunky platform lift',
      'Goes with both kurtis and streetwear'
    ],
    inStock: true,
    rating: 4.8,
    reviewsCount: 94
  },
  {
    id: 'aesthe-olive-ribbon',
    name: 'Aesthé Sage Bow Slider',
    tagline: 'Olive Canvas • Sculpted Knot Bow',
    category: "Bow Slides",
    priceBDT: 2350,
    priceUSD: 21,
    image: oliveBowIsolated,
    lifestyleImage: feetOliveImg,
    colorScheme: {
      primary: '#65a30d',
      accent: '#f472b6',
      glow: '#fdfbf7',
      ringColor: 'from-lime-600 to-pink-400'
    },
    sizes: [36, 37, 38, 39, 40, 41],
    badge: 'SUMMER DROP',
    description: 'Chic sage olive canvas topped with our puffy knotted statement bow. The butter-cream cushioned base feels like stepping on foam mattresses from step one.',
    details: [
      'Puffy woven canvas statement bow',
      'Butter-cream double-cushioned footbed',
      'Clean contrast perimeter stitch',
      'Lightweight shock-absorbing sole',
      'Casual, summery, zero break-in time'
    ],
    inStock: true,
    rating: 5.0,
    reviewsCount: 76
  }
];

export const ALL_PRODUCTS: Product[] = [...HERO_PRODUCTS];

export const CAMPAIGN_BANNER_IMG = campaignBannerImg;

export const LOOKBOOK_IMAGES = {
  lookbook1: feetPinkImg,
  lookbook2: feetBlackImg,
  lookbook3: feetOliveImg,
  campaignHero: campaignBannerImg
};

