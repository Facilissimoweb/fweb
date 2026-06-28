import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, ShieldAlert } from 'lucide-react';

interface CookieBannerProps {
  onOpenPrivacy: () => void;
  onOpenCookie: () => void;
}

export default function CookieBanner({ onOpenPrivacy, onOpenCookie }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show banner after a short delay if no choice is saved
    try {
      const consent = localStorage.getItem('erbagatta_cookie_consent');
      if (!consent) {
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 3000); // 3 seconds delay for maximum elegant entry
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.warn('localStorage is not available:', e);
      // Fallback: show the banner if storage is blocked/unaccessible
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('erbagatta_cookie_consent', 'accepted');
    } catch (e) {
      console.warn('Could not save consent to localStorage:', e);
    }
    setIsVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('erbagatta_cookie_consent', 'declined');
    } catch (e) {
      console.warn('Could not save consent to localStorage:', e);
    }
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 150, delay: 0.2 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-[420px] bg-white/75 dark:bg-[#1C122C]/75 backdrop-blur-lg border-2 border-[#DDF247] rounded-[28px] p-6 shadow-[0_0_30px_rgba(221,242,71,0.25)] z-[90] text-on-surface"
        >
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-secondary-container/50 flex items-center justify-center text-secondary shrink-0">
              <Cookie size={22} className="animate-pulse" />
            </div>
            <div className="space-y-2">
              <h4 className="font-headline font-bold text-sm text-primary tracking-wide">
                Consenso per i Cookie
              </h4>
              <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                Su <strong>FACILISSIMO WEB di M.Teresa Rogani (P.Iva 02136780430)</strong> utilizzo i cookie tecnici e analitici per garantirti un'esperienza di navigazione fluida, semplice e sicura. Leggi la{' '}
                <button
                  onClick={onOpenPrivacy}
                  className="text-secondary underline font-medium hover:text-primary transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>{' '}
                e{' '}
                <button
                  onClick={onOpenCookie}
                  className="text-secondary underline font-medium hover:text-primary transition-colors cursor-pointer"
                >
                  Cookie Policy
                </button>
                .
              </p>
            </div>
          </div>

          <div className="flex gap-3 mt-5 font-headline text-xs font-semibold justify-end">
            <button
              onClick={handleDecline}
              className="px-4 py-2 rounded-full border border-outline-variant text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-all cursor-pointer"
            >
              Rifiuta
            </button>
            <button
              onClick={handleAccept}
              className="px-5 py-2 rounded-full bg-primary text-on-primary hover:bg-secondary hover:shadow-md transition-all cursor-pointer cat-pounce"
            >
              Accetta Tutto
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
