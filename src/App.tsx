import { useState, useEffect } from 'react';
import { Layout } from './components/Layout/Layout';
import { Home } from './pages/Home';
import { OpeningPopup } from './components/Common/OpeningPopup';
import './App.css';

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ProductDetail } from './pages/ProductDetail';
import { CartPage } from './pages/CartPage';
import { CartProvider, useCart } from './contexts/CartContext';
import { CategoryPage } from './pages/CategoryPage';

const ScrollToTop: React.FC = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname]);
  return null;
};

const AppContent: React.FC = () => {
  const { state } = useCart();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Show popup after a short delay on every page refresh
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Scroll handled by ScrollToTop component

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout cartItemCount={state.itemCount}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:category" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Layout>
      {showPopup && <OpeningPopup onClose={handleClosePopup} />}
    </BrowserRouter>
  );
};

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;