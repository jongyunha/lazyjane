import React from 'react';
import './ProductOptions.css';

interface Color {
  id: string;
  name: string;
  hex: string;
  image?: string;
}

interface Size {
  id: string;
  name: string;
  available: boolean;
}

interface ProductOptionsProps {
  colors: Color[];
  sizes: Size[];
  selectedColor: string;
  selectedSize: string;
  onColorChange: (colorId: string) => void;
  onSizeChange: (sizeId: string) => void;
}

export const ProductOptions: React.FC<ProductOptionsProps> = ({
  colors,
  sizes,
  selectedColor,
  selectedSize,
  onColorChange,
  onSizeChange,
}) => {
  return (
    <div className="product-options">
      {colors.length > 0 && (
        <div className="option-group">
          <h3 className="option-title">Color</h3>
          <div className="color-options">
            {colors.map((color) => (
              <button
                key={color.id}
                className={`color-option ${selectedColor === color.id ? 'selected' : ''}`}
                onClick={() => onColorChange(color.id)}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={`Select ${color.name} color`}
              >
                {selectedColor === color.id && (
                  <div className="color-check">✓</div>
                )}
              </button>
            ))}
          </div>
          {selectedColor && (
            <p className="selected-option">
              Selected: {colors.find(c => c.id === selectedColor)?.name}
            </p>
          )}
        </div>
      )}

      {sizes.length > 1 && (
        <div className="option-group">
          <h3 className="option-title">Size</h3>
          <div className="size-options">
            {sizes.map((size) => (
              <button
                key={size.id}
                className={`size-option ${selectedSize === size.id ? 'selected' : ''} ${!size.available ? 'unavailable' : ''}`}
                onClick={() => size.available && onSizeChange(size.id)}
                disabled={!size.available}
                aria-label={`Select size ${size.name}${!size.available ? ' (unavailable)' : ''}`}
              >
                {size.name}
                {!size.available && <span className="unavailable-text">Out of stock</span>}
              </button>
            ))}
          </div>
          {selectedSize && (
            <p className="selected-option">
              Selected: {sizes.find(s => s.id === selectedSize)?.name}
            </p>
          )}
        </div>
      )}
    </div>
  );
};