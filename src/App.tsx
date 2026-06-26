import { useState, useEffect } from 'react';
import { Accessibility } from 'lucide-react';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Testimonials from './components/Testimonials';
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
    <div className="text-on-surface bg-background min-h-screen relative overflow-x-hidden selection:bg-secondary/20 selection:text-secondary">
      {/* Page Loader */}
      <Loader />

      {/* Top App Bar Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <Services />

      {/* Portfolio Grid */}
      <Portfolio />

      {/* About Section */}
      <About />

      {/* Testimonials Flip Grid */}
      <Testimonials />

      {/* Blog Section */}
      <Blog />

      {/* Contact Section */}
      <Contact />

      {/* Footer Section with regulatory details */}
      <Footer
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenCookie={() => setIsCookieOpen(true)}
        onOpenSitemap={() => setIsSitemapOpen(true)}
      />

      {/* Interactive Floating Chatbot Widget */}
      <ChatWidget />

      {/* Floating Accessibility Controls for WCAG AA High Contrast */}
      <div id="accessibility-controls" className="fixed bottom-6 left-6 max-lg:bottom-[92px] max-lg:left-4 z-50 flex flex-col gap-2 pointer-events-none">
        <div className="pointer-events-auto group relative">
          <button
            onClick={() => setIsHighContrast(!isHighContrast)}
            className={`p-3.5 rounded-full shadow-xl transition-all duration-300 flex items-center justify-center border-2 cursor-pointer ${
              isHighContrast
                ? 'bg-black text-white border-white scale-110 shadow-black/40'
                : 'bg-white text-black border-neutral-950 hover:bg-neutral-100 hover:scale-105 shadow-md'
            }`}
            aria-label="Attiva alto contrasto per accessibilità WCAG AA"
            title="Accessibilità: Alto Contrasto (WCAG AA)"
          >
            <Accessibility 
              size={24} 
              style={{ color: isHighContrast ? '#ffffff' : '#000000', stroke: isHighContrast ? '#ffffff' : '#000000' }} 
              className={isHighContrast ? 'animate-pulse text-white' : 'text-black'} 
              strokeWidth={3} 
            />
          </button>
          
          {/* Elegant Tooltip / Badge */}
          <div className="absolute left-14 top-1/2 -translate-y-1/2 ml-2 bg-slate-900/95 dark:bg-black/95 text-white text-[11px] font-medium py-1.5 px-3 rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 flex flex-col gap-0.5 border border-white/10">
            <span className="font-bold text-xs">Accessibilità WCAG AA</span>
            <span className="text-white/80">
              {isHighContrast ? 'Disattiva Alto Contrasto' : 'Attiva Alto Contrasto (Testo Leggibile)'}
            </span>
          </div>
        </div>
      </div>

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
