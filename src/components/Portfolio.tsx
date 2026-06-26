import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PORTFOLIO_ITEMS } from '../data';
import { X, Calendar, User, Cpu, ArrowRight, MessageCircle, Eye, Globe, TrendingUp, Sparkles, CheckCircle } from 'lucide-react';

type CategoryFilter = 'Tutti' | 'Web' | 'Logo';

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('Tutti');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  // Handle body scroll locking when modal is open
  useEffect(() => {
    if (selectedItemId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedItemId]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedItemId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle custom 'open-proposal' event from Navbar/Menu
  useEffect(() => {
    const handleOpenProposal = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setSelectedItemId(customEvent.detail);
        const element = document.getElementById('portfolio');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    window.addEventListener('open-proposal', handleOpenProposal);
    return () => window.removeEventListener('open-proposal', handleOpenProposal);
  }, []);

  const filteredItems = PORTFOLIO_ITEMS.filter((item) => {
    if (activeFilter === 'Tutti') return true;
    return item.category === activeFilter;
  });

  const activeItem = PORTFOLIO_ITEMS.find((item) => item.id === selectedItemId);

  return (
    <section id="portfolio" className="py-24 bg-background relative scroll-mt-[110px]">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        {/* Header and Filter Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <h2 className="font-headline text-3xl md:text-4xl font-semibold text-primary mb-4">
              Le Proposte d'Élite
            </h2>
            <div className="h-1 w-20 bg-secondary rounded-full mb-3"></div>
            <p className="font-sans text-base text-on-surface-variant max-w-lg">
              Una selezione delle mie proposte e soluzioni digitali d'eccellenza. Clicca su ciascun progetto per rivelare i segreti tecnici e i dettagli dello sviluppo.
            </p>
          </div>

          {/* Filter Actions */}
          <div className="flex gap-4 font-sans text-sm font-semibold tracking-wide">
            {(['Tutti', 'Web', 'Logo'] as CategoryFilter[]).map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2 rounded-full transition-all cursor-pointer shadow-sm ${
                    isActive
                      ? 'bg-secondary text-on-secondary shadow-md hover:translate-y-[-2px]'
                      : 'bg-surface-container text-on-surface-variant hover:bg-secondary-container hover:text-on-secondary-container'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="masonry-grid min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  duration: 0.5,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                key={item.id}
                className="masonry-item animate-hover"
                onClick={() => setSelectedItemId(item.id)}
              >
                <div className="group relative overflow-hidden rounded-[32px] cursor-pointer shadow-md bg-white border border-outline-variant/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(113,83,129,0.2)] hover:border-primary/20 dark:hover:border-primary-container/30">
                  <img
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full transform group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] object-cover"
                    src={item.image}
                    title={item.altText}
                  />
                  {/* Visual Indicator Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/60 to-black/20 opacity-0 group-hover:opacity-100 group-hover:backdrop-blur-[3px] transition-all duration-500 flex flex-col justify-between p-8">
                    <span className="self-end bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full tracking-wider uppercase">
                      Vedi Dettagli Tecnici
                    </span>
                    <div className="text-white">
                      <h4 className="font-headline text-2xl font-bold tracking-wide">
                        {item.title}
                      </h4>
                      <p className="font-sans text-xs opacity-90 tracking-widest uppercase mt-1.5">
                        {item.category === 'Web' ? 'Web Experience' : 'Branding & Design'}
                      </p>
                    </div>
                  </div>

                  {/* Fallback indicator for mobile screens (static ribbon at the bottom) */}
                  <div className="p-5 md:hidden flex justify-between items-center bg-surface-container/30 border-t border-outline-variant/10">
                    <div>
                      <h4 className="font-headline text-base font-bold text-on-surface">
                        {item.title}
                      </h4>
                      <p className="font-sans text-[10px] text-on-surface-variant tracking-wider uppercase">
                        {item.category === 'Web' ? 'Web Experience' : 'Branding'}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-secondary flex items-center gap-1">
                      Dettagli <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Technical Detail Sheet Modal */}
      <AnimatePresence>
        {selectedItemId && activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-inverse-surface/85 backdrop-blur-md z-[110] flex items-center justify-center p-4 md:p-8 overflow-y-auto"
          >
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.95, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 40 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="bg-white rounded-[40px] w-full max-w-3xl max-h-[90vh] md:max-h-[85vh] shadow-2xl overflow-hidden flex flex-col relative text-on-surface"
            >
              {/* Close Button */}
              <div className="absolute top-6 right-6 z-20">
                <button
                  onClick={() => setSelectedItemId(null)}
                  className="w-10 h-10 rounded-full bg-surface-container/60 hover:bg-surface-container text-on-surface flex items-center justify-center transition-all shadow-sm cursor-pointer border border-outline-variant/10 active:scale-90"
                  aria-label="Chiudi"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable body content */}
              <div className="overflow-y-auto p-6 md:p-10 space-y-8 scrollbar-thin">
                {/* Header Information */}
                <div className="border-b border-outline-variant/15 pb-6">
                  <span className="text-xs font-semibold text-secondary uppercase tracking-widest block mb-1">
                    SCHEDA DI PROPOSTA — {activeItem.category === 'Web' ? 'WEB EXPERIENCE' : 'BRANDING'}
                  </span>
                  <h2 className="font-headline text-3xl font-bold text-primary">
                    {activeItem.title}
                  </h2>
                </div>

                {/* Main Visual Preview */}
                <div className="w-full h-48 md:h-64 rounded-3xl overflow-hidden bg-surface-container shadow-inner border border-outline-variant/10 relative">
                  <img
                    alt={activeItem.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    src={activeItem.image}
                  />
                  <div className="absolute top-4 left-4 bg-black/50 text-white text-[11px] font-sans font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                    {activeItem.category === 'Web' ? 'Sito Web / Interfaccia' : 'Logo & Grafica Vettoriale'}
                  </div>
                </div>

                {/* Metadata Row */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-surface-container-low/50 p-5 rounded-3xl border border-outline-variant/10 text-xs font-sans text-on-surface-variant">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-secondary" />
                    <div>
                      <span className="block text-[10px] opacity-70 font-semibold uppercase">Cliente</span>
                      <span className="font-bold">{activeItem.client || 'Studio Prototipo'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-secondary" />
                    <div>
                      <span className="block text-[10px] opacity-70 font-semibold uppercase">Anno</span>
                      <span className="font-bold">{activeItem.year || '2026'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                    <Cpu className="w-4 h-4 text-secondary" />
                    <div>
                      <span className="block text-[10px] opacity-70 font-semibold uppercase">Settore</span>
                      <span className="font-bold">{activeItem.category === 'Web' ? 'Digital/Tech' : 'Branding Visual'}</span>
                    </div>
                  </div>
                </div>

                {/* Rich Details columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column: Challenge & Solution */}
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <h4 className="font-headline text-sm font-bold text-primary uppercase tracking-wider">
                        La Sfida Strategica
                      </h4>
                      <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed">
                        {activeItem.challenge || 'Definire un posizionamento ad altissimo livello di contrasto e impatto.'}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-headline text-sm font-bold text-primary uppercase tracking-wider">
                        La Soluzione d'Autore
                      </h4>
                      <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed">
                        {activeItem.solution || 'Progettazione su misura con layout fluidi ed estetica esclusiva.'}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Tech Stack & Tools used */}
                  <div className="space-y-4">
                    <h4 className="font-headline text-sm font-bold text-primary uppercase tracking-wider">
                      Dettagli Tecnici & Strumenti
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeItem.techStack ? (
                        activeItem.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="bg-primary/5 text-primary border border-primary/10 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide"
                          >
                            {tech}
                          </span>
                        ))
                      ) : (
                        <span className="bg-primary/5 text-primary border border-primary/10 px-3.5 py-1.5 rounded-full text-xs font-semibold">
                          Figma, Adobe Illustrator
                        </span>
                      )}
                    </div>

                    <div className="bg-secondary/5 rounded-2xl p-4 border border-secondary/10 mt-4">
                      <span className="text-[10px] font-bold text-secondary uppercase tracking-wider block mb-1">
                        Nota dell'Autrice:
                      </span>
                      <p className="font-sans text-xs text-on-surface-variant/90 leading-relaxed italic">
                        "L'istinto del design richiede precisione e agilità. Ogni pixel è calibrato per massimizzare la fluidità visiva e le prestazioni sui dispositivi mobili."
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Footer Call-To-Action */}
                <div className="border-t border-outline-variant/15 pt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="text-center sm:text-left">
                    <p className="font-headline text-xs md:text-sm font-bold text-on-surface">
                      Ti piace questo approccio tecnico?
                    </p>
                    <p className="font-sans text-xs text-on-surface-variant/70">
                      Parla del tuo progetto e ottieni soluzioni su misura.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <a
                      href={activeItem.id === 'social-leads-generation'
                        ? "https://wa.me/393793603321?text=Ciao%20M.Teresa,%20vorrei%20maggiori%20informazioni%20sulla%20strategia%20di%20Social%20Lead%20Generation"
                        : `https://wa.me/393793603321?text=Ciao%20M.Teresa,%20ho%20visto%20la%20tua%20proposta%20${encodeURIComponent(activeItem.title)}%20e%20vorrei%20informazioni%20per%20un%20servizio%20simile`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold text-xs md:text-sm px-6 py-3.5 rounded-full flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md hover:shadow-lg cursor-pointer"
                    >
                      <MessageCircle size={18} />
                      {activeItem.id === 'social-leads-generation' ? 'Attiva Conversioni su WhatsApp' : 'Discuti questa Proposta'}
                    </a>

                    <button
                      onClick={() => setSelectedItemId(null)}
                      className="bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-xs md:text-sm px-6 py-3.5 rounded-full transition-all cursor-pointer text-center"
                    >
                      Chiudi
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .masonry-grid {
          column-count: 1;
          column-gap: 24px;
        }
        @media (min-width: 768px) {
          .masonry-grid {
            column-count: 2;
          }
        }
        @media (min-width: 1024px) {
          .masonry-grid {
            column-count: 2;
          }
        }
        .masonry-item {
          break-inside: avoid;
          margin-bottom: 24px;
        }
      `}</style>
    </section>
  );
}
