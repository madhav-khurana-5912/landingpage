import { useState, useEffect, memo } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';

// Pages
import Home from './pages/Home';
import Concept from './pages/Concept';
import Menu from './pages/Menu';
import Gallery from './pages/Gallery';

// Components
import { Layout } from './components/Layout';

// --- HARDWARE / PERFORMANCE DETECTION ---
const useHardwareTier = () => {
    const prefersReducedMotion = useReducedMotion();
    const [tier, setTier] = useState<'high' | 'low'>('high');

    useEffect(() => {
        const cores = navigator.hardwareConcurrency || 4;
        const isLowPower = cores < 4 || prefersReducedMotion;
        setTier(isLowPower ? 'low' : 'high');
        
        // We keep the cursor as 'none' globally to ensure our custom cursor 
        // which is standard for the AETHER experience always shows.
        document.body.style.cursor = 'none';
    }, [prefersReducedMotion]);

    return tier;
};

// Scroll to top on navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  const tier = useHardwareTier();

  return (
    <Router>
      <ScrollToTop />
      <Layout tier={tier}>
        <Routes>
          <Route path="/" element={<Home tier={tier} />} />
          <Route path="/concept" element={<Concept tier={tier} />} />
          <Route path="/menu" element={<Menu tier={tier} />} />
          <Route path="/gallery" element={<Gallery tier={tier} />} />
        </Routes>
      </Layout>
    </Router>
  );
}
