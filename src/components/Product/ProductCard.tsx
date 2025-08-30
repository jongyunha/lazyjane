import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, Star } from 'lucide-react';
import './ProductCard.css';

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

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
  onToggleFavorite?: (productId: string) => void;
  isFavorite?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onToggleFavorite,
  isFavorite = false,
}) => {
  const { t, i18n } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formatPrice = (price: number) => {
    const currency = i18n.language === 'ko' ? '원' : '$';
    const formattedPrice = i18n.language === 'ko' 
      ? price.toLocaleString('ko-KR')
      : Math.floor(price / 1300).toLocaleString('en-US');
    
    return i18n.language === 'ko' ? `${formattedPrice}${currency}` : `${currency}${formattedPrice}`;
  };

  const handleImageHover = () => {
    if (product.images.length > 1) {
      setCurrentImageIndex(1);
    }
  };

  const handleImageLeave = () => {
    setCurrentImageIndex(0);
  };

  return (
    <div className="product-card">
      <div className="product-card-header">
        <div 
          className="product-image-container"
          onMouseEnter={handleImageHover}
          onMouseLeave={handleImageLeave}
        >
          <img
            src={product.images[currentImageIndex]}
            alt={product.name}
            className="product-image"
            loading="lazy"
          />
          
          {product.isOnSale && (
            <div className="product-badge sale-badge">
              SALE
            </div>
          )}
          
          {product.isNewArrival && !product.isOnSale && (
            <div className="product-badge new-badge">
              NEW
            </div>
          )}

          <button
            className={`favorite-button ${isFavorite ? 'favorite-active' : ''}`}
            onClick={() => onToggleFavorite?.(product.id)}
            aria-label="Toggle favorite"
          >
            <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>

          <div className="product-overlay">
            <button
              className="quick-add-button btn btn-primary btn-sm"
              onClick={() => onAddToCart?.(product.id)}
            >
              {t('common.addToCart')}
            </button>
          </div>
        </div>
      </div>

      <div className="product-card-content">
        <div className="product-colors">
          {product.colors.slice(0, 3).map((color) => (
            <div
              key={color.id}
              className="color-dot"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
          {product.colors.length > 3 && (
            <span className="color-count">+{product.colors.length - 3}</span>
          )}
        </div>

        <h3 className="product-name">
          <a href={`/product/${product.id}`} className="product-link">
            {product.name}
          </a>
        </h3>

        <div className="product-rating">
          <div className="rating-stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                fill={i < Math.floor(product.rating) ? '#fbbf24' : 'none'}
                stroke={i < Math.floor(product.rating) ? '#fbbf24' : '#d1d5db'}
              />
            ))}
          </div>
          <span className="rating-text">
            ({product.reviewCount})
          </span>
        </div>

        <div className="product-pricing">
          <span className="product-price">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="original-price">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        <div className="product-sizes">
          {product.sizes.filter(size => size.available).length === 0 ? (
            <span className="out-of-stock">
              {t('product.outOfStock')}
            </span>
          ) : (
            <span className="available-sizes">
              {product.sizes
                .filter(size => size.available)
                .map(size => size.name)
                .join(', ')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};