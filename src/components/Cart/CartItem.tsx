import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, X } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import type { CartItem as CartItemType } from '../../contexts/CartContext';
import './CartItem.css';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeItem, updateQuantity } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  const formatPrice = (price: number) => {
    return `${price.toLocaleString('ko-KR')}원`;
  };

  const subtotal = item.price * item.quantity;

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <Link to={`/product/${item.productId}`}>
          <img
            src={item.image}
            alt={item.name}
            className="item-image"
          />
        </Link>
      </div>

      <div className="cart-item-details">
        <div className="item-info">
          <h3 className="item-name">
            <Link to={`/product/${item.productId}`} className="item-link">
              {item.name}
            </Link>
          </h3>
          
          <div className="item-options">
            <span className="item-option">Color: {item.selectedColor}</span>
            {item.selectedSize && (
              <span className="item-option">Size: {item.selectedSize}</span>
            )}
          </div>

          <div className="item-price-section">
            <span className="item-price">{formatPrice(item.price)}</span>
            {item.originalPrice && (
              <span className="item-original-price">
                {formatPrice(item.originalPrice)}
              </span>
            )}
          </div>
        </div>

        <div className="item-actions">
          <div className="quantity-controls">
            <button
              className="quantity-btn"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            
            <span className="quantity-display">{item.quantity}</span>
            
            <button
              className="quantity-btn"
              onClick={() => handleQuantityChange(item.quantity + 1)}
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="item-subtotal">
            {formatPrice(subtotal)}
          </div>

          <button
            className="remove-btn"
            onClick={() => removeItem(item.id)}
            aria-label="Remove item from cart"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};