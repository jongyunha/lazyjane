import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, ShoppingBag, Menu, X, User, Globe } from 'lucide-react';

interface HeaderProps {
  cartItemCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ cartItemCount = 0 }) => {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'ko' ? 'en' : 'ko');
  };

  const navigation = [
    { key: 'women', href: '/women' },
    { key: 'bags', href: '/bags' },
    { key: 'shoes', href: '/shoes' },
    { key: 'accessories', href: '/accessories' },
    { key: 'sale', href: '/sale' },
  ];

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-button lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Logo */}
          <div className="logo">
            <a href="/" className="logo-text">
              LazyJane
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {navigation.map((item) => (
              <a key={item.key} href={item.href} className="nav-link">
                {t(`navigation.${item.key}`)}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="header-actions">
            <button 
              className="action-button"
              onClick={toggleLanguage}
              aria-label="Change language"
            >
              <Globe size={18} />
              <span className="action-text">
                {i18n.language === 'ko' ? 'EN' : '한국어'}
              </span>
            </button>

            <button className="action-button" aria-label="Search">
              <Search size={18} />
              <span className="action-text hidden sm:inline">
                {t('navigation.search')}
              </span>
            </button>

            <button className="action-button" aria-label="Account">
              <User size={18} />
              <span className="action-text hidden sm:inline">
                {t('navigation.account')}
              </span>
            </button>

            <button className="action-button cart-button" aria-label="Shopping cart">
              <div className="cart-icon-wrapper">
                <ShoppingBag size={18} />
                {cartItemCount > 0 && (
                  <span className="cart-badge">{cartItemCount}</span>
                )}
              </div>
              <span className="action-text hidden sm:inline">
                {t('navigation.cart')}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className={`mobile-nav ${isMobileMenuOpen ? 'active' : ''}`}>
          <div className="mobile-nav-header">
            <a href="/" className="logo-text">
              LazyJane
            </a>
            <button
              className="mobile-nav-close"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="mobile-nav-content">
            {navigation.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t(`navigation.${item.key}`)}
              </a>
            ))}
          </div>

          <div className="mobile-nav-actions">
            <button 
              className="action-button"
              onClick={toggleLanguage}
              aria-label="Change language"
            >
              <Globe size={20} />
              <span className="action-text">
                {i18n.language === 'ko' ? 'EN' : '한국어'}
              </span>
            </button>

            <button className="action-button" aria-label="Search">
              <Search size={20} />
              <span className="action-text">
                {t('navigation.search')}
              </span>
            </button>

            <button className="action-button" aria-label="Account">
              <User size={20} />
              <span className="action-text">
                {t('navigation.account')}
              </span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};