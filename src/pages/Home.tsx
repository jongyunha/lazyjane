import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Hero } from '../components/Home/Hero';
import { ProductGrid } from '../components/Product/ProductGrid';
import { mockProducts } from '../data/products';

export const Home: React.FC = () => {
  const { t } = useTranslation();
  const [favorites, setFavorites] = useState<string[]>([]);

  const featuredProducts = mockProducts.filter(product => product.isFeatured);
  const newArrivals = mockProducts.filter(product => product.isNewArrival);

  const handleAddToCart = (productId: string) => {
    console.log('Add to cart:', productId);
  };

  const handleToggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="home">
      <Hero />
      
      <section className="home-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('home.featured')}</h2>
            <p className="section-subtitle">
              Discover the most popular items this season
            </p>
          </div>
          <ProductGrid
            products={featuredProducts}
            onAddToCart={handleAddToCart}
            onToggleFavorite={handleToggleFavorite}
            favorites={favorites}
          />
        </div>
      </section>

      <section className="home-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('home.newArrivals')}</h2>
            <p className="section-subtitle">
              Be the first to discover our latest collection just arrived
            </p>
          </div>
          <ProductGrid
            products={newArrivals}
            onAddToCart={handleAddToCart}
            onToggleFavorite={handleToggleFavorite}
            favorites={favorites}
          />
        </div>
      </section>

      <section className="home-cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">
              Complete Your Style with LazyJane
            </h2>
            <p className="cta-description">
              Complete your unique style with sophisticated and trendy fashion.<br />
              New collections are updated weekly.
            </p>
            <div className="cta-actions">
              <a href="/women" className="btn btn-primary btn-lg">
                View Full Collection
              </a>
              <a href="/sale" className="btn btn-outline btn-lg">
                View Sale Items
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};