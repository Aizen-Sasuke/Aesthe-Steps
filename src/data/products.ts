import { Product } from '../types';

// Isolated Base Cutouts
import pinkCrystalIsolated from '../assets/images/pink_crystal_isolated_1788758971009.jpg';
import blackCrystalToe from '../assets/images/black_crystal_toe_1788760722626.jpg';
import whiteCrystalToe from '../assets/images/white_crystal_toe_1788760735173.jpg';
import peachCrystalToe from '../assets/images/peach_crystal_toe_1788760783470.jpg';

import blackGlitterIsolated from '../assets/images/black_glitter_isolated_1788758986595.jpg';
import silverCrossSlide from '../assets/images/silver_crisscross_slide_1788760748592.jpg';
import goldCrossSlide from '../assets/images/gold_crisscross_slide_1788760770325.jpg';
import roseCrossSlide from '../assets/images/rose_crisscross_slide_1788760850215.jpg';

import oliveBowIsolated from '../assets/images/olive_bow_isolated_1788759008077.jpg';
import caramelBowSlide from '../assets/images/caramel_bow_slide_1788760666127.jpg';
import creamBowSlide from '../assets/images/cream_bow_slide_1788760685768.jpg';
import blackBowSlide from '../assets/images/black_bow_slide_1788760700426.jpg';

// Lifestyle / Lookbook Images
import feetPinkImg from '../assets/images/feet_pink_rhinestone_slide_1788758041451.jpg';
import feetBlackImg from '../assets/images/feet_black_shimmer_slide_1788758058098.jpg';
import feetOliveImg from '../assets/images/feet_olive_bow_slide_1788758072989.jpg';
import campaignBannerImg from '../assets/images/campaign_dhaka_girls_slides_1788758089570.jpg';
import sandalsPaletteImg from '../assets/images/sandals_color_palette_1788760801656.jpg';

// New Drops
import pearlRhinestoneSlide from '../assets/images/pearl_rhinestone_slide_1788761807920.jpg';
import roseGoldBowSlide from '../assets/images/rose_gold_bow_slide_1788761834885.jpg';
import silverBowSlide from '../assets/images/silver_bow_slide_1788761856060.jpg';
import blackNewBowSlide from '../assets/images/black_bow_slide_1788761884766.jpg';
import pinkNewBowSlide from '../assets/images/pink_bow_slide_1788761907540.jpg';

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'aesthe-pink-crystal',
    name: 'Aesthé Crystal Dn',
    tagline: 'Embellished Toe-Ring Flat Slide',
    category: "Crystal Toe-Ring",
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
    variants: [
      {
        id: 'blush-pink',
        name: 'Blush Pink',
        colorHex: '#F472B6',
        image: pinkCrystalIsolated,
        badge: 'Viral Hit'
      },
      {
        id: 'obsidian-noir',
        name: 'Obsidian Noir',
        colorHex: '#18181B',
        image: blackCrystalToe,
        badge: 'Diamond Cluster'
      },
      {
        id: 'pearl-ivory',
        name: 'Pearl Ivory',
        colorHex: '#F5F5F0',
        image: whiteCrystalToe,
        badge: 'Pure Pavé'
      },
      {
        id: 'champagne-peach',
        name: 'Champagne Peach',
        colorHex: '#F0B2A6',
        image: peachCrystalToe,
        badge: 'Warm Glow'
      }
    ],
    badge: 'DROP 01 • 4 COLORWAYS',
    description: 'Our iconic silhouette. High-gloss patent footbed with crystal-encrusted midfoot strap and delicate toe loop. 180g featherlight cloud-cushioned footbed built for walking Dhaka all day without friction.',
    details: [
      'Real glass rhinestone heat-press (stays on)',
      '180g featherlight cloud foam footbed',
      'Square-toe chunky edge with toe grip',
      'Wipes clean easily with damp cloth',
      'Available in 4 curated shades'
    ],
    inStock: true,
    rating: 4.9,
    reviewsCount: 128
  },
  {
    id: 'aesthe-midnight-glitter',
    name: 'Aesthé Midnight Shimmer',
    tagline: 'Criss-Cross Glitter Mule Slide',
    category: "Criss-Cross Shimmer",
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
    variants: [
      {
        id: 'onyx-silver',
        name: 'Onyx & Silver',
        colorHex: '#18181B',
        image: blackGlitterIsolated,
        badge: 'Dhaka Nights'
      },
      {
        id: 'sterling-silver',
        name: 'Sterling Silver',
        colorHex: '#D1D5DB',
        image: silverCrossSlide,
        badge: 'Ice Diamond'
      },
      {
        id: 'champagne-gold',
        name: 'Champagne Gold',
        colorHex: '#D4AF37',
        image: goldCrossSlide,
        badge: 'Starlight Gold'
      },
      {
        id: 'rose-bronze',
        name: 'Rose Bronze',
        colorHex: '#B76E79',
        image: roseCrossSlide,
        badge: 'Copper Glow'
      }
    ],
    badge: 'DHAKA NIGHTS • 4 COLORWAYS',
    description: 'Dual criss-cross straps thickly dusted in light-catching glitter shimmer. Soft micro-suede inner lining prevents any skin irritation, while the plush padded footbed offers all-night comfort.',
    details: [
      'Soft-lined inner straps (zero skin rubbing)',
      'Dual criss-cross arch-hug design',
      'Anti-slip textured rubber base',
      'Low 1-inch chunky platform lift',
      'Available in 4 lustrous metallics'
    ],
    inStock: true,
    rating: 4.8,
    reviewsCount: 94
  },
  {
    id: 'aesthe-olive-ribbon',
    name: 'Aesthé Ribbon Bow Slider',
    tagline: 'Sculpted Canvas Knot Bow Slide',
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
    variants: [
      {
        id: 'sage-olive',
        name: 'Sage Olive',
        colorHex: '#65A30D',
        image: oliveBowIsolated,
        badge: 'Original'
      },
      {
        id: 'caramel-tan',
        name: 'Caramel Tan',
        colorHex: '#B37D4E',
        image: caramelBowSlide,
        badge: 'Warm Biscuit'
      },
      {
        id: 'oatmeal-cream',
        name: 'Oatmeal Cream',
        colorHex: '#E5DAC8',
        image: creamBowSlide,
        badge: 'Butter Nude'
      },
      {
        id: 'onyx-noir',
        name: 'Onyx Noir',
        colorHex: '#18181B',
        image: blackBowSlide,
        badge: 'High Contrast'
      }
    ],
    badge: 'SUMMER DROP • 4 COLORWAYS',
    description: 'Chic woven canvas topped with our signature puffy knotted statement bow. The butter-cream cushioned base feels like stepping on foam mattresses from step one.',
    details: [
      'Puffy woven canvas statement bow',
      'Butter-cream double-cushioned footbed',
      'Clean contrast perimeter stitch',
      'Lightweight shock-absorbing sole',
      'Available in 4 versatile neutrals'
    ],
    inStock: true,
    rating: 5.0,
    reviewsCount: 76
  }
];

export const NEW_PRODUCTS: Product[] = [
  {
    id: 'lumiere-pearl-block',
    name: 'Lumière Pearl Slip-on',
    tagline: 'Bridal & Evening Ready Block Heel',
    category: 'Embellished Heels',
    priceBDT: 3200,
    priceUSD: 29,
    image: pearlRhinestoneSlide,
    lifestyleImage: feetPinkImg,
    colorScheme: {
      primary: '#FDF2F4',
      accent: '#9CA3AF',
      glow: '#F3F4F6',
      ringColor: 'from-gray-100 to-gray-300'
    },
    sizes: [36, 37, 38, 39, 40],
    variants: [
      {
        id: 'ivory-pearl',
        name: 'Ivory Pearl',
        colorHex: '#F3F4F6',
        image: pearlRhinestoneSlide,
        badge: 'Bridal Exclusive'
      }
    ],
    badge: 'NEW ARRIVAL',
    description: 'Elevate any evening look with this pristine white slip-on block heel, meticulously detailed with a pearl and rhinestone encrusted strap.',
    details: [
      'Hand-applied pearl and rhinestone strap',
      'Comfortable 1.5-inch block heel',
      'Premium faux-leather footbed',
      'Anti-slip resin outsole'
    ],
    inStock: true,
    rating: 4.9,
    reviewsCount: 24
  },
  {
    id: 'chloe-bow-block-heel',
    name: 'Chloé Bow Block Heel',
    tagline: 'Signature Leather Bow Slide',
    category: 'Leather Block Heels',
    priceBDT: 2850,
    priceUSD: 26,
    image: roseGoldBowSlide,
    lifestyleImage: feetOliveImg,
    colorScheme: {
      primary: '#FCA5A5',
      accent: '#EF4444',
      glow: '#FEE2E2',
      ringColor: 'from-rose-300 to-pink-200'
    },
    sizes: [36, 37, 38, 39, 40, 41],
    variants: [
      {
        id: 'rose-gold',
        name: 'Rose Gold',
        colorHex: '#FBB6CE',
        image: roseGoldBowSlide,
        badge: 'Best Seller'
      },
      {
        id: 'metallic-silver',
        name: 'Metallic Silver',
        colorHex: '#E5E7EB',
        image: silverBowSlide
      },
      {
        id: 'blush-pink',
        name: 'Blush Pink',
        colorHex: '#F472B6',
        image: pinkNewBowSlide
      },
      {
        id: 'obsidian-black',
        name: 'Obsidian Black',
        colorHex: '#18181B',
        image: blackNewBowSlide
      }
    ],
    badge: 'FALL COLLECTION • 4 SHADES',
    description: 'A striking statement bow adorns this metallic block heel. Crafted from supple premium faux leather with a perfectly balanced 1.5-inch heel for all-day chic.',
    details: [
      'Prominent knotted statement bow',
      '1.5-inch block heel for perfect elevation',
      'Metallic and matte finish options',
      'Breathable ultra-soft lining'
    ],
    inStock: true,
    rating: 5.0,
    reviewsCount: 112
  }
];

export const ALL_PRODUCTS: Product[] = [...INITIAL_PRODUCTS, ...NEW_PRODUCTS];
export const HERO_PRODUCTS: Product[] = ALL_PRODUCTS;

export const CAMPAIGN_BANNER_IMG = campaignBannerImg;
export const PALETTE_LOOKBOOK_IMG = sandalsPaletteImg;

export const LOOKBOOK_IMAGES = {
  lookbook1: feetPinkImg,
  lookbook2: feetBlackImg,
  lookbook3: feetOliveImg,
  lookbook4: sandalsPaletteImg,
  paletteLookbook: sandalsPaletteImg,
  campaignHero: campaignBannerImg
};

