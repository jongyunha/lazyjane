import React from 'react';
import { useTranslation } from 'react-i18next';
import { Star } from 'lucide-react';

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

interface ProductInfoProps {
  product: Product;
}

import './ProductInfo.css';
export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const { i18n } = useTranslation();

  const formatPrice = (price: number) => {
    const currency = i18n.language === 'ko' ? '원' : '$';
    const formattedPrice = i18n.language === 'ko' 
      ? price.toLocaleString('ko-KR')
      : Math.floor(price / 1300).toLocaleString('en-US');
    
    return i18n.language === 'ko' ? `${formattedPrice}${currency}` : `${currency}${formattedPrice}`;
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} size={16} className="star filled" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" size={16} className="star half-filled" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} size={16} className="star empty" />
      );
    }

    return stars;
  };

  return (
    <div className="product-info">
      <div className="product-badges">
        {product.isNewArrival && (
          <span className="badge badge-new">New</span>
        )}
        {product.isOnSale && (
          <span className="badge badge-sale">Sale</span>
        )}
        {product.isFeatured && (
          <span className="badge badge-featured">Featured</span>
        )}
      </div>

      <h1 className="product-title">{product.name}</h1>
      
      <div className="product-rating">
        <div className="stars">
          {renderStars(product.rating)}
        </div>
        <span className="rating-text">
          {product.rating} ({product.reviewCount} reviews)
        </span>
      </div>

      <div className="product-price">
        <span className="current-price">
          {formatPrice(product.price)}
        </span>
        {product.originalPrice && (
          <span className="original-price">
            {formatPrice(product.originalPrice)}
          </span>
        )}
        {product.isOnSale && product.originalPrice && (
          <span className="discount">
            {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
          </span>
        )}
      </div>

      <div className="product-description">
        <p>{product.description}</p>
      </div>
    </div>
  );
};