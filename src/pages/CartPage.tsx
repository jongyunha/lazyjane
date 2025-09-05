import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { CartItem } from '../components/Cart/CartItem';
import { CartSummary } from '../components/Cart/CartSummary';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import './CartPage.css';

export const CartPage: React.FC = () => {
  const { state, clearCart } = useCart();
  const navigate = useNavigate();

  if (state.items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <button 
            className="back-button"
            onClick={() => navigate('/')}
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
            <span>Continue Shopping</span>
          </button>

          <div className="empty-cart">
            <div className="empty-cart-icon">
              <ShoppingBag size={80} />
            </div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <button 
              className="btn btn-primary btn-lg"
              onClick={() => navigate('/')}
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <div className="cart-nav">
            <button 
              className="back-button"
              onClick={() => navigate('/')}
              aria-label="Go back"
            >
              <ArrowLeft size={20} />
              <span>Continue Shopping</span>
            </button>
          </div>
          
          <div className="cart-header-main">
            <div className="cart-title-section">
              <h1 className="cart-title">Shopping Cart</h1>
              <p className="cart-subtitle">
                {state.itemCount} {state.itemCount === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>

            <button 
              className="clear-cart-button"
              onClick={clearCart}
              aria-label="Clear all items from cart"
            >
              Clear Cart
            </button>
          </div>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {state.items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="cart-sidebar">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
};