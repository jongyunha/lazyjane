import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { CreditCard } from 'lucide-react';
import './CartSummary.css';
import { useTranslation } from 'react-i18next';
import { Modal } from '../Common/Modal';

export const CartSummary: React.FC = () => {
  const { state } = useCart();
  const { t, i18n } = useTranslation();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const formatPrice = (price: number) => {
    if (i18n.language === 'ko') return `${price.toLocaleString('ko-KR')}원`;
    return `$${Math.floor(price / 1300).toLocaleString('en-US')}`;
  };

  const subtotal = state.total;
  const shippingFee = subtotal >= 50000 ? 0 : 3000;
  const finalTotal = subtotal + shippingFee;

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  return (
    <>
      <div className="cart-summary">
        <h3 className="summary-title">{t('cart.summary.orderSummary')}</h3>
        
        <div className="summary-line">
          <span>{t('cart.summary.subtotal', { count: state.itemCount })}</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <div className="summary-line">
          <span>{t('cart.summary.shipping')}</span>
          <span>
            {shippingFee === 0 ? (
              <span className="free-shipping">{t('cart.summary.free')}</span>
            ) : (
              formatPrice(shippingFee)
            )}
          </span>
        </div>

        {subtotal < 50000 && (
          <div className="shipping-notice">
            <p>🚚 {t('cart.summary.freeShippingNotice')}</p>
            <p className="remaining-amount">
              {t('cart.summary.freeShippingRemain', { amount: formatPrice(50000 - subtotal) })}
            </p>
          </div>
        )}

        <hr className="summary-divider" />

        <div className="summary-line total-line">
          <span>{t('cart.summary.total')}</span>
          <span className="total-amount">{formatPrice(finalTotal)}</span>
        </div>

        <button 
          className="checkout-btn btn btn-primary btn-lg"
          onClick={handleCheckout}
        >
          <CreditCard size={20} />
          {t('cart.summary.proceedCheckout')}
        </button>

        {/* Simplified UI: trust badges and payment method list removed */}
      </div>

      {/* Mobile bottom fixed checkout bar */}
      <div className="mobile-checkout-bar" role="region" aria-label="Checkout actions">
        <div className="mobile-total">
          <span className="label">{t('cart.summary.mobile.totalLabel')}</span>
          <span className="amount">{formatPrice(finalTotal)}</span>
        </div>
        <button
          className="mobile-checkout-btn btn btn-primary"
          onClick={handleCheckout}
          aria-label={t('cart.summary.mobile.checkout')}
        >
          <CreditCard size={18} />
          {t('cart.summary.mobile.checkout')}
        </button>
      </div>

      {/* Checkout placeholder modal */}
      <Modal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        title={t('cart.summary.proceedCheckout') as string}
        footer={
          <>
            <button className="btn btn-outline" onClick={() => setIsCheckoutOpen(false)}>{t('common.cancel')}</button>
            <button className="btn btn-primary" onClick={() => setIsCheckoutOpen(false)}>{t('common.confirm')}</button>
          </>
        }
      >
        <p>{i18n.language === 'ko' ? '결제 기능은 곧 제공될 예정입니다.' : 'Checkout functionality will be available soon.'}</p>
      </Modal>
    </>
  );
};