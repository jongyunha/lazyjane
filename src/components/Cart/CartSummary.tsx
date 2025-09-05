import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { CreditCard, Shield, Truck } from 'lucide-react';
import './CartSummary.css';

export const CartSummary: React.FC = () => {
  const { state } = useCart();

  const formatPrice = (price: number) => {
    return `${price.toLocaleString('ko-KR')}원`;
  };

  const subtotal = state.total;
  const shippingFee = subtotal >= 50000 ? 0 : 3000;
  const finalTotal = subtotal + shippingFee;

  const handleCheckout = () => {
    // TODO: Implement checkout functionality
    alert('Checkout functionality will be implemented soon!');
  };

  return (
    <div className="cart-summary">
      <h3 className="summary-title">Order Summary</h3>
      
      <div className="summary-line">
        <span>Subtotal ({state.itemCount} items)</span>
        <span>{formatPrice(subtotal)}</span>
      </div>

      <div className="summary-line">
        <span>Shipping</span>
        <span>
          {shippingFee === 0 ? (
            <span className="free-shipping">FREE</span>
          ) : (
            formatPrice(shippingFee)
          )}
        </span>
      </div>

      {subtotal < 50000 && (
        <div className="shipping-notice">
          <p>🚚 Free shipping on orders over 50,000원</p>
          <p className="remaining-amount">
            Add {formatPrice(50000 - subtotal)} more for free shipping!
          </p>
        </div>
      )}

      <hr className="summary-divider" />

      <div className="summary-line total-line">
        <span>Total</span>
        <span className="total-amount">{formatPrice(finalTotal)}</span>
      </div>

      <button 
        className="checkout-btn btn btn-primary btn-lg"
        onClick={handleCheckout}
      >
        <CreditCard size={20} />
        Proceed to Checkout
      </button>

      <div className="trust-badges">
        <div className="trust-badge">
          <Shield size={16} />
          <span>Secure Payment</span>
        </div>
        <div className="trust-badge">
          <Truck size={16} />
          <span>Fast Delivery</span>
        </div>
      </div>

      <div className="payment-methods">
        <p>We accept:</p>
        <div className="payment-icons">
          <span className="payment-method">💳 Credit Card</span>
          <span className="payment-method">📱 KakaoPay</span>
          <span className="payment-method">🏦 Bank Transfer</span>
        </div>
      </div>
    </div>
  );
};