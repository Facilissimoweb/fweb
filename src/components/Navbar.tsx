import { useState, useEffect, useRef, ElementType } from 'react';
import { Menu, X, Sun, Moon, ChevronDown, Home, Mail, Phone, MessageSquare, PersonStanding, Briefcase, FolderOpen, User, Newspaper } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SubMenuItem {
  label: string;
  id: string;
  type: 'service' | 'proposal';
}

interface NavLinkItem {
  label: string;
  target: string;
  icon: ElementType;
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
  const [mobileSidebarSubmenu, setMobileSidebarSubmenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({});
  const sidebarRef = useRef<HTMLDivElement>(null);
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setMobileSidebarSubmenu(null);
        setLangDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
      if (saved === 'dark') return 'dark';
    } catch (e) {
      console.warn('localStorage theme read failed:', e);
    }
    return 'light';
  });

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = Math.max(0, window.scrollY);
      setIsScrolled(currentScrollY > 50);
      
      const diff = currentScrollY - lastScrollYRef.current;

      // Se si scrolla verso l'alto o si è vicini all'inizio, mostra la Top Bar
      if (currentScrollY <= 50) {
        setShowTopBar(true);
        lastScrollYRef.current = currentScrollY;
      } else if (diff > 8) {
        // Scroll verso il basso di almeno 8px accumulati -> nascondi
        setShowTopBar(false);
        lastScrollYRef.current = currentScrollY;
      } else if (diff < -8) {
        // Scroll verso l'alto di almeno 8px accumulati -> mostra
        setShowTopBar(true);
        lastScrollYRef.current = currentScrollY;
      }
      
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
    const sections = ['hero', 'services', 'portfolio', 'about', 'blog'];
    const observerOptions = {
      root: null,
      rootMargin: '-25% 0px -40% 0px',
      threshold: 0.05,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
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
    setMobileSidebarSubmenu(null);
    const element = document.getElementById(id);
    if (element) {
      // Use a slightly larger scroll offset for better visibility
      const top = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleSubItemClick = (id: string, type: 'service' | 'proposal', target: string) => {
    setIsOpen(false);
    setActiveSubmenu(null);
    setMobileSidebarSubmenu(null);
    
    // First, scroll to the parent section with offset
    const element = document.getElementById(target);
    if (element) {
      const top = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    
    // Then dispatch the custom event to open the details modal
    // Increased delay slightly to ensure scroll has started/stabilized
    setTimeout(() => {
      const eventName = type === 'service' ? 'open-service' : 'open-proposal';
      window.dispatchEvent(new CustomEvent(eventName, { detail: id }));
    }, 450);
  };

  const navLinks: NavLinkItem[] = [
    { label: 'Home', target: 'hero', icon: Home },
    { 
      label: 'Servizi', 
      target: 'services',
      icon: Briefcase,
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
      icon: FolderOpen,
      subItems: [
        { label: 'Lux Aura (Web)', id: 'lux-aura', type: 'proposal' },
        { label: 'Tribal Identity (Logo)', id: 'tribal-identity', type: 'proposal' },
        { label: 'MindFlow App (UX)', id: 'mindflow-app', type: 'proposal' },
        { label: 'Agile Motion (Lottie)', id: 'agile-motion', type: 'proposal' },
        { label: "Social Lead's Gen.", id: 'social-leads-generation', type: 'proposal' }
      ]
    },
    { label: 'Chi Sono', target: 'about', icon: User },
    { label: 'Blog', target: 'blog', icon: Newspaper },
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
      {/* Vertical Sidebar for Mobile/Tablet */}
      <div
        ref={sidebarRef}
        className="fixed left-0 top-[12%] bottom-[12%] z-[60] w-12 bg-surface/90 dark:bg-surface-dim/90 backdrop-blur-lg border border-l-0 border-outline-variant/20 flex flex-col items-center py-8 gap-6 md:hidden pointer-events-auto shadow-[10px_0_30px_rgba(0,0,0,0.1)] rounded-r-[32px]"
      >
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = activeSection === link.target;
          const hasSub = !!link.subItems;

          return (
            <div key={link.target} className="relative group">
              <button
                onClick={() => {
                  if (hasSub) {
                    setMobileSidebarSubmenu(mobileSidebarSubmenu === link.target ? null : link.target);
                  } else {
                    handleScrollTo(link.target);
                    setMobileSidebarSubmenu(null);
                  }
                }}
                className={`w-10 h-10 rounded-[14px] flex items-center justify-center transition-all duration-300 relative cursor-pointer active:scale-90 ${
                  isActive
                    ? 'bg-primary text-on-primary shadow-lg shadow-primary/20 scale-110'
                    : 'text-on-surface-variant hover:bg-primary/10 hover:text-primary'
                }`}
                aria-label={link.label}
              >
                <Icon size={18} className="stroke-[2.2]" />
                {hasSub && (
                  <div className={`absolute -right-0.5 -bottom-0.5 w-2.5 h-2.5 rounded-full border border-surface bg-secondary transition-transform duration-300 ${mobileSidebarSubmenu === link.target ? 'rotate-180' : ''}`}>
                    <ChevronDown size={6} className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                )}
              </button>

              {/* Lateral Submenu Expansion */}
              <AnimatePresence>
                {mobileSidebarSubmenu === link.target && link.subItems && (
                  <motion.div
                    initial={{ opacity: 0, x: -10, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -10, scale: 0.95 }}
                    className="absolute left-14 top-0 w-60 bg-surface/95 dark:bg-surface-container-high/95 backdrop-blur-xl rounded-[24px] p-3 border border-outline-variant/20 shadow-2xl z-[70] flex flex-col gap-1.5"
                  >
                    <div className="px-4 py-2 mb-1 border-b border-outline-variant/10">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">{link.label}</p>
                    </div>
                    {link.subItems.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => handleSubItemClick(sub.id, sub.type, link.target)}
                        className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-all active:scale-[0.98]"
                      >
                        {sub.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {/* Separator */}
        <div className="w-6 h-[1px] bg-outline-variant/20 my-1" />

        {/* Theme Toggle in Sidebar */}
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="w-10 h-10 rounded-[14px] flex items-center justify-center text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-all cursor-pointer active:scale-90"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {/* Language in Sidebar (Simplified) */}
        <button
          onClick={() => setLangDropdownOpen(!langDropdownOpen)}
          className="w-10 h-10 rounded-[14px] flex items-center justify-center bg-surface-container-low border border-outline-variant/20 text-xs font-black cursor-pointer active:scale-90"
        >
          {LANGUAGES.find(l => l.code === currentLang)?.flag || '🇮🇹'}
        </button>

        {/* Language Dropdown for Sidebar */}
        <AnimatePresence>
          {langDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="absolute left-14 bottom-0 w-48 bg-surface dark:bg-surface-container-high rounded-[24px] p-2 border border-outline-variant/20 shadow-2xl z-[70] flex flex-col gap-1 max-h-[60vh] overflow-y-auto"
            >
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    changeLanguage(lang.code);
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-3 transition-all ${
                    currentLang === lang.code ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-secondary/5'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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
          className={`flex items-center justify-between w-full px-6 md:px-16 py-4 transition-[background-color,border-color,box-shadow,padding] duration-300 pointer-events-auto ${
            isScrolled || isOpen
              ? 'bg-surface/95 dark:bg-surface-dim/95 backdrop-blur-md shadow-md shadow-secondary/5 border-b border-outline-variant/10'
              : 'bg-transparent'
          } ${/* Hidden on mobile/tablet because of the sidebar */ 'hidden md:flex'}`}
        >
          {/* Circular Home Button on the Left */}
          <button
            onClick={() => {
              setIsOpen(false);
              handleScrollTo('hero');
            }}
            className="w-12 h-12 rounded-full border border-outline-variant/30 flex items-center justify-center bg-surface hover:bg-surface-container transition-[background-color,transform] text-on-surface cursor-pointer shadow-sm focus:outline-none"
            aria-label="Home"
          >
            <Home size={18} className="stroke-[2.2]" />
          </button>

          {/* Desktop Textual Menu */}
          <div className="hidden md:flex items-center gap-8 ml-8">
            {navLinks.map((link) => (
              <div
                key={link.target}
                className="relative"
                onMouseEnter={() => handleMouseEnter(link.target)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => handleScrollTo(link.target)}
                  className={`flex items-center gap-1.5 text-sm font-bold tracking-tight transition-colors cursor-pointer focus:outline-none ${
                    activeSection === link.target ? 'text-primary' : 'text-on-surface hover:text-primary'
                  }`}
                >
                  {link.label}
                  {link.subItems && (
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${
                        activeSubmenu === link.target ? 'rotate-180' : ''
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
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 mt-4 w-56 bg-surface/95 dark:bg-surface-container-high/95 backdrop-blur-md rounded-[20px] p-2 border border-outline-variant/20 shadow-2xl z-50 flex flex-col gap-1"
                      >
                        {link.subItems.map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => handleSubItemClick(sub.id, sub.type, link.target)}
                            className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-all cursor-pointer"
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
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                onBlur={() => setTimeout(() => setLangDropdownOpen(false), 250)}
                className="flex items-center gap-1.5 h-12 px-4 rounded-full border border-outline-variant/30 bg-surface hover:bg-surface-container text-on-surface transition-all cursor-pointer shadow-sm text-xs font-extrabold uppercase select-none focus:outline-none"
                title="Cambia lingua"
              >
                <span className="text-base leading-none">
                  {LANGUAGES.find(l => l.code === currentLang)?.flag || '🇮🇹'}
                </span>
                <span className="text-[11px] font-extrabold tracking-wide text-on-surface">
                  {currentLang.split('-')[0]}
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
              className="w-12 h-12 rounded-full border border-outline-variant/30 flex items-center justify-center bg-surface hover:bg-surface-container text-on-surface transition-all cursor-pointer shadow-sm focus:outline-none"
              aria-label="Cambia tema"
              title={theme === 'light' ? 'Passa alla modalità scura' : 'Passa alla modalità chiara'}
            >
              {theme === 'light' ? <Moon size={18} className="stroke-[2.2]" /> : <Sun size={18} className="stroke-[2.2]" />}
            </button>

            {/* Hamburger/Close Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-12 h-12 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container transition-all cursor-pointer focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} className="stroke-[2.2]" /> : <Menu size={24} className="stroke-[2.2]" />}
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
            className="fixed inset-0 bg-surface/98 dark:bg-surface-dim/98 backdrop-blur-md z-40 overflow-y-auto px-6 sm:px-12 pt-36 pb-32 flex flex-col justify-start"
          >
            <div className="max-w-xl mx-auto w-full flex flex-col gap-4 mt-8">
              {navLinks.map((link) => {
                const hasSub = !!link.subItems;
                const isExpanded = !!mobileExpanded[link.target];
                const isActive = activeSection === link.target;

                return (
                  <div key={link.target} className="flex flex-col border-b border-outline-variant/15 pb-2">
                    <div className="flex items-center justify-between py-3">
                      <button
                        onClick={() => {
                          if (hasSub) {
                            setMobileExpanded(prev => ({ ...prev, [link.target]: !prev[link.target] }));
                          } else {
                            handleScrollTo(link.target);
                          }
                        }}
                        className={`text-left text-lg sm:text-xl font-bold tracking-tight font-headline transition-colors select-none cursor-pointer focus:outline-none flex-grow ${
                          isActive ? 'text-primary' : 'text-on-surface hover:text-primary'
                        }`}
                      >
                        <span>{link.label}</span>
                      </button>
                      
                      {hasSub && (
                        <button
                          onClick={() => setMobileExpanded(prev => ({ ...prev, [link.target]: !prev[link.target] }))}
                          className="p-3 text-on-surface hover:text-primary rounded-full hover:bg-surface-container transition-colors cursor-pointer focus:outline-none"
                          aria-label={`Espandi sotto-menù ${link.label}`}
                        >
                          <ChevronDown 
                            size={22} 
                          className={`transition-transform duration-300 ${
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
                            className="overflow-hidden pl-6 pr-4 flex flex-col gap-3 ml-2 mb-4 mt-1 border-l-2 border-primary/20"
                          >
                            <button
                              onClick={() => handleScrollTo(link.target)}
                              className="text-left py-2 px-3 rounded-xl text-sm font-bold text-primary hover:bg-surface-container transition-colors cursor-pointer"
                            >
                              Mostra tutto {link.label}
                            </button>
                            {(link.subItems || []).map((sub) => (
                              <button
                                key={sub.id}
                                onClick={() => handleSubItemClick(sub.id, sub.type, link.target)}
                                className="text-left py-2.5 px-3 rounded-xl text-sm font-semibold text-on-surface-variant hover:bg-surface-container hover:text-primary transition-all cursor-pointer"
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

              <div className="mt-8 mb-4">
                <button
                  onClick={() => handleScrollTo('contact')}
                  className="w-full bg-[#11052C] dark:bg-[#1C103F] text-white text-center py-5 rounded-[32px] font-headline font-bold text-lg tracking-wide hover:opacity-95 active:scale-[0.99] transition-all shadow-lg shadow-primary/10 cursor-pointer"
                >
                  Contattami
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Elegant Color-Harmonized Bottom Navigation Bar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-sm h-[56px] flex items-center justify-between px-2 bg-surface/90 dark:bg-surface-dim/90 backdrop-blur-md border border-outline-variant/20 rounded-full shadow-lg shadow-secondary/15 select-none">
        {footerTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              onClick={tab.action}
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.85 }}
              transition={{ type: 'spring', stiffness: 450, damping: 15 }}
              className="flex-1 h-full flex items-center justify-center text-on-surface-variant hover:text-primary dark:hover:text-primary transition-colors cursor-pointer focus:outline-none"
              aria-label={tab.label}
            >
              <div className="p-2 rounded-full hover:bg-primary/10 active:bg-primary/20 transition-all duration-200">
                <Icon size={20} className="stroke-[2.2]" />
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
