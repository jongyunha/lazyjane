import React from 'react';
import { useTranslation } from 'react-i18next';
import noticeImage from '../../assets/notice.png';
import './Hero.css';

export const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="hero">
      <div className="hero-background">
        <img
          src={noticeImage}
          alt="LazyJane Fashion Model"
          className="hero-image"
        />
        <div className="hero-overlay" />
      </div>
      
      <div className="hero-content">
        <div className="container">
          <div className="hero-text">
            <h1 className="hero-title">
              {t('home.hero.title')}
            </h1>
            <p className="hero-subtitle">
              {t('home.hero.subtitle')}
            </p>
            <a href="/women" className="hero-cta btn btn-primary btn-lg">
              {t('home.hero.cta')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};