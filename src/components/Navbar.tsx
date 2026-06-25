import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, ChevronDown, Languages, Home } from 'lucide-react';
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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({});
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('erbagatta_theme');
      if (saved === 'dark') return 'dark';
    } catch (e) {
      console.warn('localStorage theme read failed:', e);
    }
    return 'light';
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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

  return (
    <>
      {/* Subtle Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-primary/10 dark:bg-primary-container/10 z-[100] pointer-events-none">
        <div 
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-75 ease-out rounded-r-full shadow-[0_1px_6px_rgba(113,83,129,0.3)]" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full px-6 lg:px-16 py-4 transition-all duration-300 ${
          isScrolled
            ? 'bg-surface/90 dark:bg-surface-dim/90 backdrop-blur-md shadow-md shadow-secondary/10'
            : 'bg-transparent'
        }`}
      >
        <div
          onClick={() => handleScrollTo('hero')}
          className="cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-2 shrink-0"
        >
          {/* Logo text hidden on mobile, displayed on tablets and desktop */}
          <span className="hidden sm:inline font-headline text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold tracking-tight text-primary">
            FACILISSIMO WEB
          </span>
          {/* Beautiful SVG Home Button displayed only on cellphone */}
          <span className="sm:hidden flex items-center justify-center p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all border border-primary/25">
            <Home size={18} />
          </span>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex gap-8 items-center font-sans text-sm font-semibold tracking-wide">
          {navLinks.map((link) => (
            <div
              key={link.target}
              className="relative"
              onMouseEnter={() => link.subItems && setActiveSubmenu(link.target)}
              onMouseLeave={() => link.subItems && setActiveSubmenu(null)}
            >
              <button
                onClick={() => handleScrollTo(link.target)}
                className="text-on-surface-variant hover:text-secondary hover:scale-105 transition-all cursor-pointer flex items-center gap-1 py-2"
              >
                {link.label}
                {link.subItems && (
                  <ChevronDown 
                    size={14} 
                    className={`transition-transform duration-300 ${
                      activeSubmenu === link.target ? 'rotate-180 text-secondary' : 'text-on-surface-variant/50'
                    }`} 
                  />
                )}
              </button>

              {link.subItems && (
                <AnimatePresence>
                  {activeSubmenu === link.target && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-1 w-64 bg-surface dark:bg-surface-container-high rounded-[24px] p-2 border border-outline-variant/15 shadow-xl z-50 flex flex-col gap-1"
                    >
                      {link.subItems.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => handleSubItemClick(sub.id, sub.type, link.target)}
                          className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold text-on-surface-variant hover:text-secondary hover:bg-secondary/5 dark:hover:bg-secondary/10 transition-all cursor-pointer"
                        >
                          {sub.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}

          {/* Language Selector Desktop */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              onBlur={() => setTimeout(() => setLangDropdownOpen(false), 250)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/15 text-on-surface cursor-pointer active:scale-95 transition-all shadow-sm text-xs font-semibold"
              title="Cambia lingua"
            >
              <Languages size={15} className="text-primary" />
              <span>{LANGUAGES.find(l => l.code === currentLang)?.flag || '🇮🇹'}</span>
              <span className="uppercase">{currentLang.split('-')[0]}</span>
              <ChevronDown size={12} className={`transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {langDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-48 bg-surface dark:bg-surface-container-high rounded-2xl p-1.5 border border-outline-variant/15 shadow-xl z-50 flex flex-col gap-0.5 max-h-80 overflow-y-auto"
                >
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all cursor-pointer ${
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

          {/* Theme Toggle Desktop */}
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-2.5 rounded-full bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/15 text-primary hover:text-secondary cursor-pointer active:scale-90 transition-all shadow-sm"
            aria-label="Cambia tema"
            title={theme === 'light' ? 'Passa alla modalità scura' : 'Passa alla modalità chiara'}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <button
            onClick={() => handleScrollTo('contact')}
            className="bg-primary text-on-primary px-6 py-2.5 rounded-full cat-pounce shadow-md cursor-pointer text-sm font-semibold"
          >
            Contattami
          </button>
        </div>

        {/* Mobile Controls (Toggle & Menu) */}
        <div className="flex lg:hidden items-center gap-2 sm:gap-3">
          {/* Language Selector Mobile */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              onBlur={() => setTimeout(() => setLangDropdownOpen(false), 250)}
              className="flex items-center gap-1 p-2 rounded-full bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/15 text-on-surface cursor-pointer active:scale-95 transition-all shadow-sm text-xs font-semibold"
              title="Cambia lingua"
            >
              <span>{LANGUAGES.find(l => l.code === currentLang)?.flag || '🇮🇹'}</span>
              <span className="uppercase text-[9px]">{currentLang.split('-')[0]}</span>
            </button>
            
            <AnimatePresence>
              {langDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-44 bg-surface dark:bg-surface-container-high rounded-2xl p-1.5 border border-outline-variant/15 shadow-xl z-50 flex flex-col gap-0.5 max-h-64 overflow-y-auto"
                >
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all cursor-pointer ${
                        currentLang === lang.code
                          ? 'bg-primary/10 text-primary'
                          : 'text-on-surface-variant hover:bg-secondary/5 dark:hover:bg-secondary/10'
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

          {/* Theme Toggle Mobile */}
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-2.5 rounded-full bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/15 text-primary cursor-pointer active:scale-90 transition-all shadow-sm"
            aria-label="Cambia tema"
            title={theme === 'light' ? 'Passa alla modalità scura' : 'Passa alla modalità chiara'}
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-primary focus:outline-none cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 150 }}
            className="fixed inset-x-0 top-[70px] z-40 bg-surface-container-highest border-b border-outline-variant/20 p-6 shadow-xl flex flex-col gap-4 lg:hidden max-h-[85vh] overflow-y-auto"
          >
            {navLinks.map((link) => {
              const hasSub = !!link.subItems;
              const isExpanded = mobileExpanded[link.target];
              return (
                <div key={link.target} className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleScrollTo(link.target)}
                      className="text-left py-3 px-4 rounded-xl text-on-surface font-semibold hover:bg-surface-container-high transition-colors flex-grow"
                    >
                      {link.label}
                    </button>
                    {hasSub && (
                      <button
                        onClick={() => setMobileExpanded(prev => ({ ...prev, [link.target]: !prev[link.target] }))}
                        className="p-3 text-primary hover:bg-surface-container-high rounded-xl transition-colors"
                      >
                        <ChevronDown 
                          size={18} 
                          className={`transition-transform duration-300 ${
                            isExpanded ? 'rotate-180 text-secondary' : 'text-on-surface-variant/70'
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
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden pl-6 pr-4 flex flex-col gap-1 border-l-2 border-secondary-container/30 ml-4 mb-2"
                        >
                          {link.subItems?.map((sub) => (
                            <button
                              key={sub.id}
                              onClick={() => handleSubItemClick(sub.id, sub.type, link.target)}
                              className="text-left py-2.5 px-3 rounded-lg text-xs font-semibold text-on-surface-variant hover:bg-surface-container-high transition-colors"
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
            <button
              onClick={() => handleScrollTo('contact')}
              className="w-full bg-primary text-on-primary text-center py-3.5 rounded-full cat-pounce font-headline font-semibold shadow-md mt-2"
            >
              Contattami
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden container for Google Translate to load into */}
      <div id="google_translate_element" className="opacity-0 pointer-events-none absolute -z-50 w-1 h-1 overflow-hidden" />
    </>
  );
}
