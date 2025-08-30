import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import './Header.css';
import './Footer.css';

interface LayoutProps {
  children: React.ReactNode;
  cartItemCount?: number;
}

export const Layout: React.FC<LayoutProps> = ({ children, cartItemCount }) => {
  return (
    <div className="layout">
      <Header cartItemCount={cartItemCount} />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};