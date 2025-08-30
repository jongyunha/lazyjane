import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout/Layout';
import { Home } from './pages/Home';
import { OpeningPopup } from './components/Common/OpeningPopup';
import './App.css';

function App() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Show popup after a short delay on every page refresh
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <Layout cartItemCount={0}>
        <Home />
      </Layout>
      
      {showPopup && <OpeningPopup onClose={handleClosePopup} />}
    </>
  );
}

export default App;