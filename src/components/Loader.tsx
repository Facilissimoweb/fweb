import { useEffect, useState } from 'react';

export default function Loader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Page Loader simulation matching the exact 1.5s unfold duration + transition
    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 1800);

    const removeTimer = setTimeout(() => {
      setIsMounted(false);
    }, 2600);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div
      id="loader"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-surface to-[#e8dee8] transition-opacity duration-800 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="unfold w-48 md:w-64">
        <img
          alt="FACILISSIMO WEB Logo"
          className="w-full drop-shadow-2xl"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBos-jXdjS_tI-hPLWgL2uWCIJI6jUT2uojWh8eCaDMeP1J4jhLQVAGOn8z-EJKps4SVmpJfSPv50P5w1ThqCBS7XGkwvhxIkofnLulVgXXPV6LKlwJkWvrwoTxcXrYLPxBLMPrZ2PPqMuHxOTy19duxmnqph0L6pX0XsuR9zNWtI-siKPZjsHrHNFG_kAIsHXYgYVdjlz2-4OotE4R-H-eDa8xZiqwDdqYTV25f87_UMQSMuWE-HPYmDL3v9XTZJYePhGQtwDim5o"
        />
      </div>
      <div className="mt-8 text-primary font-headline text-2xl tracking-widest animate-pulse uppercase">
        CARICAMENTO...
      </div>

      <style>{`
        .unfold {
          animation: unfold-keyframes 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          transform-origin: center;
        }
        @keyframes unfold-keyframes {
          0% {
            transform: scaleY(0.005) scaleX(0);
            opacity: 0;
          }
          50% {
            transform: scaleY(0.005) scaleX(1);
            opacity: 1;
          }
          100% {
            transform: scaleY(1) scaleX(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
