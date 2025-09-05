import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import './ProductActions.css';

interface ProductActionsProps {
  onAddToCart: () => void;
  onToggleFavorite: () => void;
  isFavorite: boolean;
}

export const ProductActions: React.FC<ProductActionsProps> = ({
  onAddToCart,
  onToggleFavorite,
  isFavorite,
}) => {
  return (
    <div className="product-actions">
      <button
        className="btn btn-primary btn-lg add-to-cart-btn"
        onClick={onAddToCart}
      >
        <ShoppingCart size={20} />
        Add to Cart
      </button>
      
      <button
        className={`btn btn-outline favorite-btn ${isFavorite ? 'favorited' : ''}`}
        onClick={onToggleFavorite}
        aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart 
          size={20} 
          className={isFavorite ? 'heart-filled' : 'heart-empty'} 
        />
        {isFavorite ? 'Added to Wishlist' : 'Add to Wishlist'}
      </button>
    </div>
  );
};