import { useState } from 'react';
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
