interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenCookie: () => void;
  onOpenSitemap: () => void;
}

export default function Footer({ onOpenPrivacy, onOpenCookie, onOpenSitemap }: FooterProps) {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-surface-container-low dark:bg-surface-dim border-t border-outline-variant/10 flex flex-col items-center gap-6 py-12 px-6 text-center mt-20 pl-12 md:pl-0">
      {/* Small Logo */}
      <div
        onClick={handleScrollToTop}
        className="w-20 opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
      >
        <img
          alt="FACILISSIMO WEB Logo"
          className="w-full"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBos-jXdjS_tI-hPLWgL2uWCIJI6jUT2uojWh8eCaDMeP1J4jhLQVAGOn8z-EJKps4SVmpJfSPv50P5w1ThqCBS7XGkwvhxIkofnLulVgXXPV6LKlwJkWvrwoTxcXrYLPxBLMPrZ2PPqMuHxOTy19duxmnqph0L6pX0XsuR9zNWtI-siKPZjsHrHNFG_kAIsHXYgYVdjlz2-4OotE4R-H-eDa8xZiqwDdqYTV25f87_UMQSMuWE-HPYmDL3v9XTZJYePhGQtwDim5o"
        />
      </div>

      <div className="font-headline text-lg text-primary/60 font-semibold tracking-wider uppercase">
        FACILISSIMO WEB
      </div>

      {/* Social Links */}
      <div className="flex gap-8 font-sans text-xs md:text-sm font-semibold text-on-surface-variant">
        <a
          href="https://instagram.com/facilissimoweb"
          target="_blank"
          rel="noreferrer"
          className="hover:text-secondary transition-colors"
        >
          Instagram
        </a>
        <a
          href="https://dribbble.com"
          target="_blank"
          rel="noreferrer"
          className="hover:text-secondary transition-colors"
        >
          Dribbble
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noreferrer"
          className="hover:text-secondary transition-colors"
        >
          LinkedIn
        </a>
      </div>

      {/* Additional Links */}
      <div className="flex flex-wrap justify-center gap-6 font-sans text-xs font-semibold text-on-surface-variant/70">
        <button
          onClick={onOpenPrivacy}
          className="hover:text-secondary transition-colors cursor-pointer"
        >
          Privacy Policy
        </button>
        <button
          onClick={onOpenCookie}
          className="hover:text-secondary transition-colors cursor-pointer"
        >
          Cookie Policy
        </button>
        <button
          onClick={onOpenSitemap}
          className="hover:text-secondary transition-colors cursor-pointer text-primary"
        >
          Mappa del Sito (Sitemap)
        </button>
      </div>

      {/* Payment Methods */}
      <div className="flex flex-col items-center gap-3.5 my-4 max-w-xl">
        <span className="font-headline text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-widest block">
          Pagamenti Sicuri & Tracciabili
        </span>
        <div className="flex flex-wrap justify-center items-center gap-2.5">
          {/* Bonifico SEPA */}
          <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-surface-container dark:bg-surface-container-high border border-outline-variant/10 text-on-surface-variant/80 hover:text-primary hover:border-primary/20 transition-all duration-300">
            <span className="font-mono text-[9px] font-extrabold uppercase tracking-wider text-secondary">SEPA</span>
            <span className="font-sans text-[10px] font-semibold">Bonifico Bancario</span>
          </div>

          {/* Carte di Credito */}
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-surface-container dark:bg-surface-container-high border border-outline-variant/10 text-on-surface-variant/80 hover:text-primary hover:border-primary/20 transition-all duration-300">
            <svg className="w-5 h-3.5 opacity-90" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="15" rx="2" fill="#1E2022" />
              <circle cx="8" cy="7.5" r="4" fill="#EB001B" />
              <circle cx="14" cy="7.5" r="4" fill="#F79E1B" fillOpacity="0.8" />
            </svg>
            <span className="font-sans text-[10px] font-semibold">Carte di Credito</span>
          </div>

          {/* Stripe */}
          <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-surface-container dark:bg-surface-container-high border border-outline-variant/10 text-on-surface-variant/80 hover:text-primary hover:border-primary/20 transition-all duration-300">
            <span className="font-sans text-[11px] font-extrabold tracking-tight text-[#635BFF] dark:text-[#8F89FF]">stripe</span>
          </div>

          {/* PayPal */}
          <div className="flex items-center gap-1 px-3.5 py-2 rounded-full bg-surface-container dark:bg-surface-container-high border border-outline-variant/10 text-on-surface-variant/80 hover:text-primary hover:border-primary/20 transition-all duration-300">
            <span className="font-sans text-[10px] italic font-black text-[#003087] dark:text-[#00457C]">Pay</span>
            <span className="font-sans text-[10px] italic font-black text-[#0079C1] dark:text-[#0079C1] -ml-0.5">Pal</span>
          </div>

          {/* Satispay */}
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-surface-container dark:bg-surface-container-high border border-outline-variant/10 text-on-surface-variant/80 hover:text-primary hover:border-primary/20 transition-all duration-300">
            <div className="w-3.5 h-3.5 rounded-full bg-[#E83C56] flex items-center justify-center shadow-sm">
              <span className="text-[8px] text-white font-extrabold leading-none">s</span>
            </div>
            <span className="font-sans text-[10px] font-semibold">Satispay</span>
          </div>
        </div>
      </div>

      {/* Copyright & Legal statements */}
      <div className="space-y-1 mt-4">
        <p className="font-headline text-xs font-bold text-on-surface-variant/80">
          FACILISSIMO WEB di M.Teresa Rogani
        </p>
        <p className="font-sans text-xs text-on-surface-variant/60">
          Partita IVA: 02136780430 • Il web semplice e accessibile.
        </p>
        <p className="font-sans text-[10px] text-on-surface-variant/40">
          © 2026 Tutti i diritti riservati.
        </p>
      </div>
    </footer>
  );
}
