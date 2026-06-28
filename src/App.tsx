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
import ImageBanner from './components/ImageBanner';

// Newly added regulatory, navigational, and assistant components
import PolicyModal from './components/PolicyModal';
import SitemapModal from './components/SitemapModal';
import CookieBanner from './components/CookieBanner';
import ChatWidget from './components/ChatWidget';

// Curated high-quality image URLs for the scrolling banners
const BANNER_IMAGES_WEB_CRAFT = [
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80', // Laptop, workspace
  'https://images.unsplash.com/photo-1541462608141-275d72e2302a?auto=format&fit=crop&w=800&q=80', // Designer workspace layout
  'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80', // Drawing tablet, sleek style
  'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80', // UI interface elements
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80', // Technical design clean code
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80', // Laptop development setup
];

const BANNER_IMAGES_BRAND_ART = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80', // Abstract violet and mauve shape
  'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80', // Colorful fluid backdrop
  'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80', // Minimal design and lines
  'https://images.unsplash.com/photo-1618005198143-e5283b519a7f?auto=format&fit=crop&w=800&q=80', // Pastel 3D background
  'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80', // Fluid 3D elements
  'https://images.unsplash.com/photo-1561070791-26c113006238?auto=format&fit=crop&w=800&q=80', // Designing palettes and layouts
];

const BANNER_IMAGES_SOCIAL_STRATEGY = [
  'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80', // UX wireframe draft
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80', // Office collaboration
  'https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?auto=format&fit=crop&w=800&q=80', // Desk coffee cup and tech
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', // Dashboard graph
  'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80', // Bright tech meeting room
  'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80', // Brainstorming whiteboard session
];

export default function App() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isCookieOpen, setIsCookieOpen] = useState(false);
  const [isSitemapOpen, setIsSitemapOpen] = useState(false);

  const [currentView, setCurrentView] = useState<'home' | 'blog'>(() => {
    return typeof window !== 'undefined' && window.location.hash.startsWith('#blog') ? 'blog' : 'home';
  });

  const [isHighContrast, setIsHighContrast] = useState(() => {
    try {
      return localStorage.getItem('erbagatta_high_contrast') === 'true';
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

      {currentView === 'home' ? (
        <>
          {/* Hero Section */}
          <Hero />

          {/* Services Section */}
          <Services />

          {/* Web Craft & Design Image Banner */}
          <ImageBanner images={BANNER_IMAGES_WEB_CRAFT} direction="left" />

          {/* Portfolio Grid */}
          <Portfolio />

          {/* About Section */}
          <About />

          {/* Branding & Abstract Art Image Banner */}
          <ImageBanner images={BANNER_IMAGES_BRAND_ART} direction="right" />

          {/* Testimonials Flip Grid */}
          <Testimonials />

          {/* Marketing Strategy & Social Lead Generation Image Banner */}
          <ImageBanner images={BANNER_IMAGES_SOCIAL_STRATEGY} direction="left" />

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
