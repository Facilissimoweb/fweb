import { useState, useEffect } from 'react';
import { Accessibility } from 'lucide-react';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Newly added regulatory, navigational, and assistant components
import PolicyModal from './components/PolicyModal';
import SitemapModal from './components/SitemapModal';
import CookieBanner from './components/CookieBanner';
import ChatWidget from './components/ChatWidget';

export default function App() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isCookieOpen, setIsCookieOpen] = useState(false);
  const [isSitemapOpen, setIsSitemapOpen] = useState(false);

  const [currentView, setCurrentView] = useState<'home' | 'blog'>(() => {
    return typeof window !== 'undefined' && window.location.hash.startsWith('#blog') ? 'blog' : 'home';
  });

  const [isHighContrast, setIsHighContrast] = useState(() => {
    try {
      return localStorage.getItem('facilissimoweb_high_contrast') === 'true';
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    const handleHashChange = () => {
      const isBlog = window.location.hash.startsWith('#blog');
      setCurrentView(isBlog ? 'blog' : 'home');
      if (isBlog) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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
      localStorage.setItem('facilissimoweb_high_contrast', String(isHighContrast));
    } catch (e) {
      console.warn('High contrast write failed:', e);
    }
  }, [isHighContrast]);

  return (
    <div className="text-on-surface bg-background min-h-screen relative overflow-x-hidden selection:bg-secondary/20 selection:text-secondary">
      {/* Page Loader */}
      <Loader />

      {/* Top App Bar Navigation */}
      <Navbar />

      {currentView === 'home' ? (
        <>
          {/* Hero Section */}
          <Hero />

          {/* Services Section */}
          <Services />

          {/* Portfolio Grid */}
          <Portfolio />

          {/* About Section */}
          <About />

          {/* Contact Section */}
          <Contact />
        </>
      ) : (
        /* Dedicated Blog Page view */
        <Blog isPageMode={true} />
      )}

      {/* Footer Section with regulatory details */}
      <Footer
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenCookie={() => setIsCookieOpen(true)}
        onOpenSitemap={() => setIsSitemapOpen(true)}
      />

      {/* Interactive Floating Chatbot Widget */}
      <ChatWidget />



      {/* Automated Cookie Consent Overlay Banner */}
      <CookieBanner
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenCookie={() => setIsCookieOpen(true)}
      />

      {/* Privacy Policy Modal */}
      <PolicyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
        type="privacy"
      />

      {/* Cookie Policy Modal */}
      <PolicyModal
        isOpen={isCookieOpen}
        onClose={() => setIsCookieOpen(false)}
        type="cookie"
      />

      {/* Visual Sitemap navigation guide */}
      <SitemapModal
        isOpen={isSitemapOpen}
        onClose={() => setIsSitemapOpen(false)}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenCookie={() => setIsCookieOpen(true)}
      />
    </div>
  );
}
