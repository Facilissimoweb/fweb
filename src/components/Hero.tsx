import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export default function Hero() {
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [scrollY, setScrollY] = useState(0);

  // Parallax scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    setTiltStyle({
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'rotateX(0deg) rotateY(0deg) scale(1)',
      transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
    });
  };

  const handleScrollToServices = () => {
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToConsulenze = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      // Dispatch event to automatically open 'consulenze'
      setTimeout(() => {
        const event = new CustomEvent('open-service', { detail: 'consulenze' });
        window.dispatchEvent(event);
      }, 500);
    }
  };

  const handleScrollToPortfolio = () => {
    const el = document.getElementById('portfolio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 text-center relative pt-20 pb-8 md:pt-32 md:pb-20 overflow-hidden"
    >
      {/* Parallax Background Cover with Gradient Blend & Subtle Overlay */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <img 
          src="/src/assets/images/web_design_hero_1782380129253.jpg"
          alt="Facilissimo Web Design Hero Background"
          className="absolute inset-0 w-full h-[120%] object-cover object-center transition-transform duration-75 ease-out"
          style={{
            transform: `translateY(${scrollY * 0.15}px) translateZ(0)`,
          }}
          referrerPolicy="no-referrer"
        />
        {/* Soft, safe tint mask to keep readability perfect and unify the theme */}
        <div className="absolute inset-0 bg-surface-bright/35 dark:bg-neutral-950/55 backdrop-blur-[1.5px] transition-colors duration-300" />
        
        {/* Smooth gradient blend that fades the cover background into the page background */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none" />
      </div>

      {/* 3D Tilting tribal mascot floating gracefully */}
      <div
        className="relative cursor-pointer transition-transform duration-200 ease-out perspective-1000 z-10"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={tiltStyle}
      >
        <img
          alt="FACILISSIMO WEB Logo"
          className="w-40 sm:w-56 md:w-96 max-h-[22vh] object-contain drop-shadow-[0_45px_45px_rgba(113,83,129,0.45)] select-none pointer-events-none hover:brightness-105 transition-all"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBos-jXdjS_tI-hPLWgL2uWCIJI6jUT2uojWh8eCaDMeP1J4jhLQVAGOn8z-EJKps4SVmpJfSPv50P5w1ThqCBS7XGkwvhxIkofnLulVgXXPV6LKlwJkWvrwoTxcXrYLPxBLMPrZ2PPqMuHxOTy19duxmnqph0L6pX0XsuR9zNWtI-siKPZjsHrHNFG_kAIsHXYgYVdjlz2-4OotE4R-H-eDa8xZiqwDdqYTV25f87_UMQSMuWE-HPYmDL3v9XTZJYePhGQtwDim5o"
        />
      </div>

      {/* High-End Frosted Glass Container to isolate text and ensure maximum legibility */}
      <div className="mt-6 md:mt-10 backdrop-blur-md bg-surface/70 dark:bg-surface-container-low/70 border border-outline-variant/15 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.1)] p-5 sm:p-8 md:p-10 rounded-3xl md:rounded-[36px] w-full max-w-sm sm:max-w-xl mx-auto space-y-3 md:space-y-4 z-10 transition-all duration-300 hover:border-primary/20">
        <h1 className="font-headline text-3xl sm:text-4xl md:text-6xl font-black text-primary tracking-tight leading-none uppercase">
          Facilissimo<br />Web
        </h1>
        <p className="font-sans text-sm sm:text-lg md:text-xl text-on-surface-variant max-w-md mx-auto lowercase tracking-wide font-medium">
          freelance web designer
        </p>

        <div className="pt-2 md:pt-4 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={handleScrollToServices}
            className="inline-block bg-primary text-on-primary px-6 py-2.5 sm:px-8 sm:py-3.5 rounded-full font-headline text-xs sm:text-sm font-bold cat-pounce shadow-lg cursor-pointer hover:bg-secondary transition-all relative overflow-hidden group w-full sm:w-auto"
          >
            <span className="relative z-10 font-bold uppercase tracking-wider">Servizi</span>
            <div className="absolute inset-0 bg-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <button
            onClick={handleScrollToPortfolio}
            className="inline-block bg-secondary text-on-secondary px-6 py-2.5 sm:px-8 sm:py-3.5 rounded-full font-headline text-xs sm:text-sm font-bold cat-pounce shadow-lg cursor-pointer hover:bg-primary transition-all relative overflow-hidden group w-full sm:w-auto"
          >
            <span className="relative z-10 font-bold uppercase tracking-wider">Proposte</span>
            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <button
            onClick={handleScrollToConsulenze}
            className="inline-block bg-surface-container border border-outline-variant/30 text-on-surface px-6 py-2.5 sm:px-8 sm:py-3.5 rounded-full font-headline text-xs sm:text-sm font-bold cat-pounce shadow-md cursor-pointer hover:bg-primary hover:text-on-primary hover:border-transparent transition-all relative overflow-hidden group w-full sm:w-auto"
          >
            <span className="relative z-10 font-bold uppercase tracking-wider">Consulenze</span>
            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      {/* Ambient decorative glowing nodes */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-secondary-container/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-tertiary-container/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
    </section>
  );
}
