import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import CookieBanner from './components/CookieBanner';
import PolicyModal from './components/PolicyModal';
import SitemapModal from './components/SitemapModal';

// Pages
import Home from './pages/Home';
import Panorama from './pages/Panorama';
import ROISimulator from './pages/ROISimulator';

export default function App() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isCookieOpen, setIsCookieOpen] = useState(false);
  const [isSitemapOpen, setIsSitemapOpen] = useState(false);

  const [isHighContrast, setIsHighContrast] = useState(() => {
    try {
      return localStorage.getItem('erbagatta_high_contrast') === 'true';
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    const handleToggleContrast = () => {
      setIsHighContrast((prev) => !prev);
    };
    window.addEventListener('toggle-high-contrast', handleToggleContrast);
    return () => {
      window.removeEventListener('toggle-high-contrast', handleToggleContrast);
    };
  }, []);

  useEffect(() => {
    try {
      if (isHighContrast) {
        document.documentElement.classList.add('high-contrast');
      } else {
        document.documentElement.classList.remove('high-contrast');
      }
      localStorage.setItem('erbagatta_high_contrast', String(isHighContrast));
    } catch (e) {
      console.warn('High contrast write failed:', e);
    }
  }, [isHighContrast]);

  return (
    <Router>
      <div className="text-on-surface bg-background min-h-screen relative overflow-x-hidden selection:bg-secondary/20 selection:text-secondary">
        <Loader />
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/panorama" element={<Panorama />} />
            <Route path="/roi-simulator" element={<ROISimulator />} />
          </Routes>
        </main>

        <Footer
          onOpenPrivacy={() => setIsPrivacyOpen(true)}
          onOpenCookie={() => setIsCookieOpen(true)}
          onOpenSitemap={() => setIsSitemapOpen(true)}
        />

        <ChatWidget />
        <CookieBanner
          onOpenPrivacy={() => setIsPrivacyOpen(true)}
          onOpenCookie={() => setIsCookieOpen(true)}
        />
        <PolicyModal
          isOpen={isPrivacyOpen}
          onClose={() => setIsPrivacyOpen(false)}
          type="privacy"
        />
        <PolicyModal
          isOpen={isCookieOpen}
          onClose={() => setIsCookieOpen(false)}
          type="cookie"
        />
        <SitemapModal
          isOpen={isSitemapOpen}
          onClose={() => setIsSitemapOpen(false)}
          onOpenPrivacy={() => setIsPrivacyOpen(true)}
          onOpenCookie={() => setIsCookieOpen(true)}
        />
      </div>
    </Router>
  );
}
