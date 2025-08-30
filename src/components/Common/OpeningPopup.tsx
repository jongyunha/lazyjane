import React from 'react';
import './OpeningPopup.css';

interface OpeningPopupProps {
  onClose: () => void;
}

export const OpeningPopup: React.FC<OpeningPopupProps> = ({ onClose }) => {
  return (
    <div className="opening-popup-overlay" onClick={onClose}>
      <div className="opening-popup" onClick={(e) => e.stopPropagation()}>
        <button className="opening-popup-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className="opening-popup-content">
          <div className="opening-popup-header">
            <h2 className="opening-popup-title">LAZY JANE</h2>
            <p className="opening-popup-subtitle">Coming Soon</p>
          </div>
          
          <div className="opening-popup-body">
            <div className="opening-popup-date">
              <span className="opening-popup-month">NOVEMBER</span>
              <span className="opening-popup-year">2025</span>
            </div>
            
            <p className="opening-popup-description">
              새로운 패션의 시작<br />
              LAZY JANE이 곧 여러분을 찾아갑니다
            </p>
            
            <div className="opening-popup-features">
              <div className="opening-popup-feature">
                <span className="opening-popup-feature-icon">✨</span>
                <span>독특한 디자인</span>
              </div>
              <div className="opening-popup-feature">
                <span className="opening-popup-feature-icon">🎯</span>
                <span>합리적인 가격</span>
              </div>
              <div className="opening-popup-feature">
                <span className="opening-popup-feature-icon">🚀</span>
                <span>빠른 배송</span>
              </div>
            </div>
          </div>
          
          <div className="opening-popup-footer">
            <button className="opening-popup-cta" onClick={onClose}>
              알림 받기
            </button>
            <p className="opening-popup-note">
              오픈 소식을 가장 먼저 받아보세요
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
