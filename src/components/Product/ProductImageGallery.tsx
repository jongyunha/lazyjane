import React from 'react';
import './ProductImageGallery.css';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  selectedIndex: number;
  onImageSelect: (index: number) => void;
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  productName,
  selectedIndex,
  onImageSelect,
}) => {
  return (
    <div className="product-image-gallery">
      <div className="main-image">
        <img
          src={images[selectedIndex]}
          alt={productName}
          className="main-image-img"
        />
      </div>
      
      {images.length > 1 && (
        <div className="thumbnail-list">
          {images.map((image, index) => (
            <button
              key={index}
              className={`thumbnail ${index === selectedIndex ? 'active' : ''}`}
              onClick={() => onImageSelect(index)}
              aria-label={`View image ${index + 1}`}
            >
              <img
                src={image}
                alt={`${productName} - Image ${index + 1}`}
                className="thumbnail-img"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};