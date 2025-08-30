import React from 'react';
import { ProductCard } from './ProductCard';
import './ProductGrid.css';

interface Color {
  id: string;
  name: string;
  hex: string;
  image?: string;
}

interface Size {
  id: string;
  name: string;
  available: boolean;
}

interface Product {
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

interface ProductGridProps {
  products: Product[];
  onAddToCart?: (productId: string) => void;
  onToggleFavorite?: (productId: string) => void;
  favorites?: string[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onAddToCart,
  onToggleFavorite,
  favorites = [],
}) => {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onToggleFavorite={onToggleFavorite}
          isFavorite={favorites.includes(product.id)}
        />
      ))}
    </div>
  );
};