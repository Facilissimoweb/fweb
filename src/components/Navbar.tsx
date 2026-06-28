import { useState, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon, ChevronDown, Languages, Home, Mail, Phone, MessageSquare, PersonStanding } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SubMenuItem {
  label: string;
  id: string;
  type: 'service' | 'proposal';
}

interface NavLinkItem {
  label: string;
  target: string;
  subItems?: SubMenuItem[];
}

interface LangItem {
  code: string;
  label: string;
  flag: string;
}

const LANGUAGES: LangItem[] = [
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
  { code: 'zh-CN', label: '中文', flag: '🇨🇳' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'ar', label: 'العربية', flag: '🇦🇪' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' }
];

const getActiveLanguage = (): string => {
  if (typeof document === 'undefined') return 'it';
  const match = document.cookie.match(/googtrans=([^;]+)/);
  if (match) {
    const val = match[1];
    const parts = val.split('/');
    if (parts.length >= 3) {
      return parts[2];
    }
  }
  return 'it';
};

const WhatsAppIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.76.458 3.41 1.258 4.858L2 22l5.312-1.394c1.402.766 2.998 1.206 4.7 1.206 5.506 0 9.988-4.482 9.988-9.988C22 6.482 17.518 2 12.012 2zm6.208 14.154c-.254.71-1.48 1.38-2.032 1.458-.512.072-1.18.12-3.41-.804-2.85-1.182-4.636-4.084-4.78-4.272-.132-.18-1.122-1.494-1.122-2.85 0-1.356.71-2.022.96-2.292.252-.27.558-.336.744-.336.186 0 .372.006.534.012.168.006.39-.066.612.468.228.558.78 1.902.846 2.04.066.138.108.3.018.48-.09.18-.198.3-.312.432-.114.138-.24.306-.342.42-.114.114-.234.24-.102.468.132.228.588.972 1.26 1.572.864.774 1.59 1.014 1.812 1.128.222.114.354.096.486-.054.132-.15.57-.666.72-.894.15-.228.3-.192.51-.114.21.078 1.332.63 1.56.744.228.114.384.168.438.264.054.096.054.558-.2 1.266z" />
  </svg>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTopBar, setShowTopBar] = useState(true);
  const lastScrollYRef = useRef(0);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('it');

  const changeLanguage = (langCode: string) => {
    setCurrentLang(langCode);
    localStorage.setItem('preferred_language', langCode);

    const cookieValue = langCode === 'it' ? '' : `/it/${langCode}`;
    document.cookie = `googtrans=${cookieValue}; path=/;`;
    document.cookie = `googtrans=${cookieValue}; path=/; domain=${window.location.hostname};`;
    
    if (window.location.hostname.includes('.')) {
      const domainParts = window.location.hostname.split('.');
      if (domainParts.length > 2) {
        const rootDomain = domainParts.slice(-2).join('.');
        document.cookie = `googtrans=${cookieValue}; path=/; domain=.${rootDomain};`;
      }
    }

    const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
    if (combo) {
      combo.value = langCode === 'it' ? '' : langCode;
      combo.dispatchEvent(new Event('change'));
    } else {
      // Fallback if not loaded yet
      setTimeout(() => {
        const retryCombo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
        if (retryCombo) {
          retryCombo.value = langCode === 'it' ? '' : langCode;
          retryCombo.dispatchEvent(new Event('change'));
        } else {
          window.location.reload();
        }
      }, 150);
    }
  };
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({});
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (target: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveSubmenu(target);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveSubmenu(null);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('erbagatta_theme');
      if (saved === 'light') return 'light';
      if (saved === 'dark') return 'dark';
    } catch (e) {
      console.warn('localStorage theme read failed:', e);
    }
    return 'dark';
  });

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      
      // Se si scrolla verso l'alto o si è vicini all'inizio, mostra la Top Bar
      if (currentScrollY <= 50) {
        setShowTopBar(true);
      } else if (currentScrollY > lastScrollYRef.current + 8) {
        // Scroll verso il basso di almeno 8px -> nascondi
        setShowTopBar(false);
      } else if (currentScrollY < lastScrollYRef.current - 8) {
        // Scroll verso l'alto di almeno 8px -> mostra
        setShowTopBar(true);
      }

      lastScrollYRef.current = Math.max(0, currentScrollY);
      
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (currentScrollY / totalHeight) * 100;
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleHashCheck = () => {
      if (window.location.hash.startsWith('#blog')) {
        setActiveSection('blog');
      }
    };
    window.addEventListener('hashchange', handleHashCheck);
    handleHashCheck();
    return () => window.removeEventListener('hashchange', handleHashCheck);
  }, []);

  useEffect(() => {
    const sections = ['hero', 'services', 'portfolio', 'about', 'blog'];
    const observerOptions = {
      root: null,
      rootMargin: '-25% 0px -40% 0px',
      threshold: 0.05,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (window.location.hash.startsWith('#blog')) {
        setActiveSection('blog');
        return;
      }
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  useEffect(() => {
    try {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('erbagatta_theme', theme);
    } catch (e) {
      console.warn('theme write failed:', e);
    }
  }, [theme]);

  useEffect(() => {
    const savedLang = localStorage.getItem('preferred_language') || getActiveLanguage() || 'it';
    setCurrentLang(savedLang);

    const styleId = 'google-translate-custom-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `
        .skiptranslate, .goog-te-banner-frame, #goog-gt-tt, .goog-te-balloon-frame {
          display: none !important;
          visibility: hidden !important;
        }
        body {
          top: 0px !important;
        }
        .goog-tooltip, .goog-tooltip:hover {
          display: none !important;
        }
        .goog-text-highlight {
          background-color: transparent !important;
          box-shadow: none !important;
        }
        iframe.goog-te-banner-frame {
          display: none !important;
        }
      `;
      document.head.appendChild(style);
    }

    const scriptId = 'google-translate-script';
    if (!document.getElementById(scriptId)) {
      (window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement({
          pageLanguage: 'it',
          layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false
        }, 'google_translate_element');
      };

      const addScript = document.createElement('script');
      addScript.id = scriptId;
      addScript.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      addScript.async = true;
      document.body.appendChild(addScript);
    }

    // Periodically poll for the combo element to initialize with savedLang
    const interval = setInterval(() => {
      const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      if (combo) {
        const targetValue = savedLang === 'it' ? '' : savedLang;
        if (combo.value !== targetValue) {
          combo.value = targetValue;
          combo.dispatchEvent(new Event('change'));
        }
        clearInterval(interval);
      }
    }, 200);

    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 12000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const handleScrollTo = (id: string) => {
    setIsOpen(false);
    if (id === 'blog') {
      window.location.hash = '#blog';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (window.location.hash.startsWith('#blog')) {
        window.location.hash = `#${id}`;
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      } else {
        window.location.hash = `#${id}`;
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const handleSubItemClick = (id: string, type: 'service' | 'proposal', target: string) => {
    setIsOpen(false);
    setActiveSubmenu(null);
    
    // First, scroll to the parent section
    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Then dispatch the custom event to open the details modal
    setTimeout(() => {
      const eventName = type === 'service' ? 'open-service' : 'open-proposal';
      window.dispatchEvent(new CustomEvent(eventName, { detail: id }));
    }, 300);
  };

  const navLinks: NavLinkItem[] = [
    { label: 'Home', target: 'hero' },
    { 
      label: 'Servizi', 
      target: 'services',
      subItems: [
        { label: 'Web Design', id: 'web-design', type: 'service' },
        { label: 'Branding', id: 'branding', type: 'service' },
        { label: 'Social Lead Generation', id: 'social-lead-generation', type: 'service' },
        { label: 'Consulenze', id: 'consulenze', type: 'service' }
      ]
    },
    { 
      label: 'Proposte', 
      target: 'portfolio',
      subItems: [
        { label: 'Lux Aura (Web)', id: 'lux-aura', type: 'proposal' },
        { label: 'Tribal Identity (Logo)', id: 'tribal-identity', type: 'proposal' },
        { label: 'MindFlow App (UX)', id: 'mindflow-app', type: 'proposal' },
        { label: 'Agile Motion (Lottie)', id: 'agile-motion', type: 'proposal' },
        { label: "Social Lead's Gen.", id: 'social-leads-generation', type: 'proposal' }
      ]
    },
    { label: 'Chi Sono', target: 'about' },
    { label: 'Blog', target: 'blog' },
  ];

  const footerTabs = [
    { id: 'phone', label: 'telefono', icon: Phone, action: () => { window.location.href = 'tel:+393793603321'; } },
    { id: 'whatsapp', label: 'whatsapp', icon: WhatsAppIcon, action: () => { window.open('https://wa.me/393793603321', '_blank', 'noopener,noreferrer'); } },
    { id: 'email', label: 'scrivimi', icon: Mail, action: () => { window.location.href = 'mailto:facilissimoweb.mc@gmail.com'; } },
    { id: 'chat', label: 'chat ai', icon: MessageSquare, action: () => { window.dispatchEvent(new CustomEvent('toggle-chat-widget')); } },
    { id: 'accessibility', label: 'leggibile', icon: PersonStanding, action: () => { window.dispatchEvent(new CustomEvent('toggle-high-contrast')); } },
  ];

  return (
    <>
      {/* Subtle Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-primary/10 dark:bg-primary-container/10 z-[100] pointer-events-none">
        <div 
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-75 ease-out rounded-r-full shadow-[0_1px_6px_rgba(113,83,129,0.3)]" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 flex flex-col w-full pointer-events-none">
        {/* Top Info Bar */}
        <motion.div
          initial={false}
          animate={{ 
            height: showTopBar ? 'auto' : 0, 
            opacity: showTopBar ? 1 : 0
          }}
          transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
          className="overflow-hidden bg-surface-container-low/95 dark:bg-surface-container-high/95 backdrop-blur-md border-b border-outline-variant/10 px-4 sm:px-6 lg:px-16 py-2 text-center select-none pointer-events-auto"
        >
          <div className="max-w-7xl mx-auto flex flex-col gap-0.5 sm:gap-1">
            <h1 className="font-headline text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-primary leading-tight">
              FACILISSIMO WEB
            </h1>
            <p className="font-sans text-[8px] sm:text-[9px] md:text-xs text-on-surface-variant font-medium tracking-wider uppercase leading-snug">
              di M. Teresa Rogani — FREE LANCE WEB GRAPHIC DESIGN / LEAD GENERATION / SOLUZIONI INTEGRATE NATIVE
            </p>
          </div>
        </motion.div>

        {/* Main Navigation Bar */}
        <nav
          className={`flex items-center justify-between w-full px-6 md:px-16 py-2.5 transition-all duration-300 pointer-events-auto border-y-2 ${
            isScrolled || isOpen
              ? 'bg-surface/95 dark:bg-surface-dim/95 backdrop-blur-md shadow-md shadow-secondary/5 border-[#DDF247]'
              : 'bg-transparent border-transparent'
          }`}
        >
          {/* Circular Home Button on the Left */}
          <button
            onClick={() => {
              setIsOpen(false);
              handleScrollTo('hero');
            }}
            className="w-10 h-10 rounded-full border-2 border-[#DDF247] flex items-center justify-center bg-surface hover:bg-surface-container transition-all text-on-surface cursor-pointer shadow-sm focus:outline-none"
            aria-label="Home"
          >
            <Home size={16} className="stroke-[2.2]" />
          </button>

          {/* Right Side Controls */}
          <div className="flex items-center gap-2.5">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                onBlur={() => setTimeout(() => setLangDropdownOpen(false), 250)}
                className="w-10 h-10 rounded-full border-2 border-[#DDF247] flex items-center justify-center bg-surface hover:bg-surface-container text-on-surface transition-all cursor-pointer shadow-sm focus:outline-none"
                title="Cambia lingua"
              >
                <span className="text-base leading-none select-none">
                  {LANGUAGES.find(l => l.code === currentLang)?.flag || '🇮🇹'}
                </span>
              </button>
              
              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-48 bg-surface dark:bg-surface-container-high rounded-[20px] p-1.5 border border-outline-variant/20 shadow-2xl z-50 flex flex-col gap-0.5 max-h-80 overflow-y-auto"
                  >
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all cursor-pointer ${
                          currentLang === lang.code
                            ? 'bg-primary/10 text-primary'
                            : 'text-on-surface-variant hover:bg-secondary/5 dark:hover:bg-secondary/10 hover:text-secondary'
                        }`}
                      >
                        <span className="text-base leading-none">{lang.flag}</span>
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="w-10 h-10 rounded-full border-2 border-[#DDF247] flex items-center justify-center bg-surface hover:bg-surface-container text-on-surface transition-all cursor-pointer shadow-sm focus:outline-none"
              aria-label="Cambia tema"
              title={theme === 'light' ? 'Passa alla modalità scura' : 'Passa alla modalità chiara'}
            >
              {theme === 'light' ? <Moon size={16} className="stroke-[2.2]" /> : <Sun size={16} className="stroke-[2.2]" />}
            </button>

            {/* Hamburger/Close Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 rounded-full border-2 border-[#DDF247] flex items-center justify-center text-on-surface hover:bg-surface-container transition-all cursor-pointer focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={20} className="stroke-[2.2]" /> : <Menu size={20} className="stroke-[2.2]" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Full-screen Overlay Hamburger Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-0 bg-surface/98 dark:bg-surface-dim/98 backdrop-blur-xl z-40 overflow-y-auto px-6 sm:px-12 pt-24 pb-16 flex flex-col justify-start"
          >
            <div className="max-w-xl mx-auto w-full flex flex-col gap-1.5 mt-4">
              {navLinks.map((link) => {
                const hasSub = !!link.subItems;
                const isExpanded = !!mobileExpanded[link.target];
                const isActive = activeSection === link.target;

                return (
                  <div key={link.target} className="flex flex-col border-b border-outline-variant/15 pb-1">
                    <div className="flex items-center justify-between py-1.5">
                      <button
                        onClick={() => {
                          if (hasSub) {
                            setMobileExpanded(prev => ({ ...prev, [link.target]: !prev[link.target] }));
                          } else {
                            handleScrollTo(link.target);
                          }
                        }}
                        className={`text-left text-2xl sm:text-3xl font-black tracking-wide font-headline uppercase transition-colors select-none cursor-pointer focus:outline-none flex-grow ${
                          isActive ? 'text-primary' : 'text-on-surface hover:text-primary'
                        }`}
                      >
                        <span>{link.label}</span>
                      </button>
                      
                      {hasSub && (
                        <button
                          onClick={() => setMobileExpanded(prev => ({ ...prev, [link.target]: !prev[link.target] }))}
                          className="p-1.5 text-on-surface hover:text-primary rounded-full hover:bg-surface-container transition-colors cursor-pointer focus:outline-none"
                          aria-label={`Espandi sotto-menù ${link.label}`}
                        >
                          <ChevronDown 
                            size={20} 
                            className={`transition-transform duration-250 ${
                              isExpanded ? 'rotate-180 text-primary' : 'text-on-surface-variant/60'
                            }`} 
                          />
                        </button>
                      )}
                    </div>
                    
                    {hasSub && (
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className="overflow-hidden pl-4 pr-3 flex flex-col gap-2 ml-1 mb-3 mt-1 border-l-2 border-primary/20"
                          >
                            <button
                              onClick={() => handleScrollTo(link.target)}
                              className="text-left py-1.5 px-2.5 rounded-xl text-xs font-bold text-primary hover:bg-surface-container transition-colors cursor-pointer uppercase tracking-wider"
                            >
                              Mostra tutto {link.label}
                            </button>
                            {(link.subItems || []).map((sub) => (
                              <button
                                key={sub.id}
                                onClick={() => handleSubItemClick(sub.id, sub.type, link.target)}
                                className="text-left py-1.5 px-2.5 rounded-xl text-xs font-semibold text-on-surface-variant hover:bg-surface-container hover:text-primary transition-all cursor-pointer uppercase tracking-wide"
                              >
                                {sub.label}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                );
              })}

              <div className="mt-4 mb-2">
                <button
                  onClick={() => handleScrollTo('contact')}
                  className="w-full bg-primary text-on-primary hover:bg-secondary hover:text-on-secondary text-center py-3.5 rounded-[32px] font-headline font-bold text-lg tracking-wide active:scale-[0.99] transition-all shadow-lg shadow-primary/10 cursor-pointer uppercase"
                >
                  Contattami
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Elegant Color-Harmonized Bottom Navigation Bar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-xs h-[48px] flex items-center justify-between px-1.5 bg-surface/90 dark:bg-surface-dim/90 backdrop-blur-md border-2 border-[#DDF247] rounded-full shadow-lg shadow-secondary/15 select-none">
        {footerTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              onClick={tab.action}
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.85 }}
              transition={{ type: 'spring', stiffness: 450, damping: 15 }}
              className="flex-1 h-full flex items-center justify-center text-[#DDF247] hover:text-primary dark:hover:text-white transition-colors cursor-pointer focus:outline-none"
              aria-label={tab.label}
            >
              <div className="p-1.5 rounded-full hover:bg-primary/10 active:bg-primary/20 transition-all duration-200">
                <Icon size={17} className="stroke-[2.2] text-[#DDF247]" />
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Hidden container for Google Translate to load into */}
      <div id="google_translate_element" className="opacity-0 pointer-events-none absolute -z-50 w-1 h-1 overflow-hidden" />
    </>
  );
}
