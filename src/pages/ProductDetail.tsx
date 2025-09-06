import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { mockProducts } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { ProductImageGallery } from '../components/Product/ProductImageGallery';
import { ProductInfo } from '../components/Product/ProductInfo';
import { ProductOptions } from '../components/Product/ProductOptions';
import { ProductActions } from '../components/Product/ProductActions';
import { Modal } from '../components/Common/Modal';
import { SEO } from '../components/Common/SEO';
import { useTranslation } from 'react-i18next';
import './ProductDetail.css';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { i18n } = useTranslation();
  
  const product = mockProducts.find(p => p.id === id);
  
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.id || '');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  if (!product) {
    return (
      <div className="product-not-found">
        <div className="container">
          <h2>Product not found</h2>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!product) return;
    
    // Check if size is required and selected
    if (!selectedSize && product.sizes.length > 1 && product.sizes[0].id !== 'onesize') {
      setModalMessage(i18n.language === 'ko' ? '사이즈를 선택해주세요.' : 'Please select a size');
      setModalOpen(true);
      return;
    }
    
    // Use default size if only one size available
    const finalSize = selectedSize || product.sizes[0]?.id || '';
    
    // Get selected color name
    const selectedColorName = product.colors.find(c => c.id === selectedColor)?.name || 'Default';
    const selectedSizeName = product.sizes.find(s => s.id === finalSize)?.name || '';
    
    // Add item to cart
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
      selectedColor: selectedColorName,
      selectedSize: selectedSizeName,
      quantity: 1,
    });
    
    // Show success message and optionally redirect
    setModalMessage(i18n.language === 'ko' ? '장바구니에 담았습니다.' : 'Product added to cart!');
    setModalOpen(true);
  };

  const handleToggleFavorite = () => {
    console.log('Toggle favorite:', product.id);
  };

  return (
    <div className="product-detail">
      <div className="container">
        <SEO
          title={`${product.name} - LazyJane`}
          description={product.description}
          canonical={typeof window !== 'undefined' ? `${window.location.origin}/product/${product.id}` : undefined}
          ogImage={product.images[0]}
          structuredData={{
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            image: product.images,
            description: product.description,
            brand: 'LazyJane',
            offers: {
              '@type': 'Offer',
              priceCurrency: 'KRW',
              price: product.price,
              availability: 'https://schema.org/InStock',
              url: typeof window !== 'undefined' ? `${window.location.origin}/product/${product.id}` : undefined
            }
          }}
        />
        <button 
          className="back-button"
          onClick={() => navigate('/')}
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        <div className="product-detail-content">
          <div className="product-images">
            <ProductImageGallery
              images={product.images}
              productName={product.name}
              selectedIndex={selectedImageIndex}
              onImageSelect={setSelectedImageIndex}
            />
          </div>

          <div className="product-details">
            <ProductInfo
              product={product}
            />
            
            <ProductOptions
              colors={product.colors}
              sizes={product.sizes}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
              onColorChange={setSelectedColor}
              onSizeChange={setSelectedSize}
            />

            <ProductActions
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={false}
            />

            <div className="product-specifications">
              <h3>Product Details</h3>
              <div className="spec-item">
                <span className="spec-label">Composition:</span>
                <span className="spec-value">{product.composition}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Care Instructions:</span>
                <span className="spec-value">{product.careInstructions}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={i18n.language === 'ko' ? '알림' : 'Notice'}
        footer={<button className="btn btn-primary" onClick={() => setModalOpen(false)}>{i18n.language === 'ko' ? '확인' : 'OK'}</button>}
      >
        <p>{modalMessage}</p>
      </Modal>
    </div>
  );
};