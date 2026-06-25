import { X, Map, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SitemapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPrivacy: () => void;
  onOpenCookie: () => void;
}

export default function SitemapModal({ isOpen, onClose, onOpenPrivacy, onOpenCookie }: SitemapModalProps) {
  const handleAnchorClick = (id: string) => {
    onClose();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white rounded-[32px] p-8 md:p-10 shadow-2xl z-10 flex flex-col text-on-surface"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-outline hover:text-primary transition-colors cursor-pointer rounded-full bg-surface-container"
              aria-label="Chiudi"
            >
              <X size={20} />
            </button>

            <div className="space-y-6 font-sans">
              <div className="flex items-center gap-3 text-primary">
                <Map size={26} />
                <h3 className="font-headline text-2xl md:text-3xl font-bold tracking-tight">
                  Mappa del Sito (Sitemap)
                </h3>
              </div>
              <div className="h-0.5 w-16 bg-secondary rounded-full"></div>

              <p className="text-sm text-on-surface-variant">
                Esplora la struttura dei contenuti di <strong>FACILISSIMO WEB di M.Teresa Rogani</strong>. Clicca su qualsiasi voce per navigare agilmente sul mio sito.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                {/* Sections */}
                <div className="space-y-4">
                  <h4 className="font-headline font-bold text-sm text-primary uppercase tracking-wider">
                    Sezioni Principali
                  </h4>
                  <ul className="space-y-2.5 text-sm">
                    <li>
                      <button
                        onClick={() => handleAnchorClick('hero')}
                        className="text-on-surface-variant hover:text-secondary font-medium transition-colors cursor-pointer"
                      >
                        • Inizio / Home Page
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleAnchorClick('services')}
                        className="text-on-surface-variant hover:text-secondary font-medium transition-colors cursor-pointer"
                      >
                        • Servizi su Misura
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleAnchorClick('portfolio')}
                        className="text-on-surface-variant hover:text-secondary font-medium transition-colors cursor-pointer"
                      >
                        • Archivio delle Idee (Proposte)
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleAnchorClick('about')}
                        className="text-on-surface-variant hover:text-secondary font-medium transition-colors cursor-pointer"
                      >
                        • Il Web Semplice (Chi Sono)
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleAnchorClick('blog')}
                        className="text-on-surface-variant hover:text-secondary font-medium transition-colors cursor-pointer"
                      >
                        • Il Taccuino delle Idee (Blog)
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleAnchorClick('contact')}
                        className="text-on-surface-variant hover:text-secondary font-medium transition-colors cursor-pointer"
                      >
                        • Contattami
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Policies & Technical */}
                <div className="space-y-4">
                  <h4 className="font-headline font-bold text-sm text-primary uppercase tracking-wider">
                    Documenti & Info Legali
                  </h4>
                  <ul className="space-y-2.5 text-sm">
                    <li>
                      <button
                        onClick={() => {
                          onClose();
                          onOpenPrivacy();
                        }}
                        className="text-on-surface-variant hover:text-secondary font-medium transition-colors cursor-pointer"
                      >
                        • Informativa sulla Privacy (Privacy Policy)
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          onClose();
                          onOpenCookie();
                        }}
                        className="text-on-surface-variant hover:text-secondary font-medium transition-colors cursor-pointer"
                      >
                        • Informativa sui Cookie (Cookie Policy)
                      </button>
                    </li>
                    <li>
                      <a
                        href="/sitemap.xml"
                        target="_blank"
                        rel="noreferrer"
                        className="text-on-surface-variant hover:text-secondary font-medium transition-colors flex items-center gap-1.5"
                      >
                        • Sitemap XML Tecnico <ExternalLink size={12} className="inline-block" />
                      </a>
                    </li>
                  </ul>

                  <div className="pt-4 border-t border-outline-variant/20">
                    <p className="text-[11px] text-on-surface-variant leading-relaxed">
                      <strong>Studio:</strong> FACILISSIMO WEB<br />
                      <strong>Titolare:</strong> M.Teresa Rogani<br />
                      <strong>P.Iva:</strong> 02136780430
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-outline-variant/20 flex justify-end">
              <button
                onClick={onClose}
                className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-headline font-semibold cat-pounce cursor-pointer shadow-md text-sm"
              >
                Chiudi Mappa
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
