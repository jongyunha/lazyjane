export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  currency: string;
  description: string;
  images: string[];
  colors: Color[];
  sizes: Size[];
  category: string;
  isOnSale?: boolean;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  rating: number;
  reviewCount: number;
  composition: string;
  careInstructions: string;
}

export interface Color {
  id: string;
  name: string;
  hex: string;
  image?: string;
}

export interface Size {
  id: string;
  name: string;
  available: boolean;
}

export interface CartItem {
  productId: string;
  colorId: string;
  sizeId: string;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  preferences: {
    language: 'ko' | 'en';
    currency: 'KRW' | 'USD';
  };
}

export type Category = 'women' | 'bags' | 'shoes' | 'accessories';