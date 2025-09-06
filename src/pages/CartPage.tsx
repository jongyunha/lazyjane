import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { CartItem } from '../components/Cart/CartItem';
import { CartSummary } from '../components/Cart/CartSummary';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './CartPage.css';

export const CartPage: React.FC = () => {
  const { state } = useCart();
  const navigate = useNavigate();
  const { t } = useTranslation();

  if (state.items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <button 
            className="back-button"
            onClick={() => navigate('/')}
            aria-label={t('cart.page.continueShopping')}
          >
            <ArrowLeft size={20} />
            <span>{t('cart.page.continueShopping')}</span>
          </button>

          <div className="empty-cart">
            <div className="empty-cart-icon">
              <ShoppingBag size={80} />
            </div>
            <h2>{t('cart.page.emptyTitle')}</h2>
            <p>{t('cart.page.emptyDesc')}</p>
            <button 
              className="btn btn-primary btn-lg"
              onClick={() => navigate('/')}
            >
              {t('cart.page.startShopping')}
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
          <div className="cart-header-main">
            <button 
              className="back-icon-button"
              onClick={() => navigate('/')}
              aria-label={t('cart.page.continueShopping')}
              title={t('cart.page.continueShopping') as string}
            >
              <ArrowLeft size={20} />
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