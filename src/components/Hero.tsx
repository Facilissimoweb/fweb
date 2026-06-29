import React from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import heroBg from '../assets/images/hero_urban_bg_1782650227937.jpg';

export default function Hero() {
  // Parallax background logic using Framer Motion hooks to avoid React re-renders on scroll
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, (value) => value * 0.15);

  // 3D Tilt logic using MotionValues and Springs for high-performance interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, (val) => val / 10);
  const rotateY = useTransform(springX, (val) => -val / 10);
  const scale = useSpring(1, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    mouseX.set(e.clientX - rect.left - centerX);
    mouseY.set(e.clientY - rect.top - centerY);
    scale.set(1.05);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    scale.set(1);
  };

  const handleScrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
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
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 text-center relative pt-20 pb-8 md:pt-32 md:pb-20 overflow-hidden scroll-mt-[110px]"
    >
      {/* Parallax Background Cover with Gradient Blend & Subtle Overlay */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <motion.img
          src={heroBg}
          alt="Facilissimo Web Design Hero Background"
          className="absolute inset-0 w-full h-[120%] object-cover object-center grayscale contrast-[120%]"
          style={{
            y: backgroundY,
          }}
          referrerPolicy="no-referrer"
        />
        {/* Soft, safe tint mask to keep readability perfect and unify the theme */}
        <div className="absolute inset-0 bg-surface-bright/35 dark:bg-neutral-950/55 backdrop-blur-[1.5px] transition-colors duration-300" />
        
        {/* Smooth gradient blend that fades the cover background into the page background */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none" />
      </div>

      {/* 3D Tilting tribal mascot floating gracefully */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          y: [0, -10, 0] 
        }}
        transition={{
          opacity: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
          scale: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
          y: {
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 5,
            ease: 'easeInOut'
          }
        }}
        className="relative cursor-pointer transition-transform duration-200 ease-out perspective-1000 z-10"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          scale,
        }}
      >
        <img
          alt="FACILISSIMO WEB Logo"
          className="w-40 sm:w-56 md:w-96 max-h-[22vh] object-contain drop-shadow-[0_45px_45px_rgba(255,255,255,0.45)] dark:drop-shadow-[0_45px_45px_rgba(221,242,71,0.25)] select-none pointer-events-none hover:brightness-105 transition-all"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBos-jXdjS_tI-hPLWgL2uWCIJI6jUT2uojWh8eCaDMeP1J4jhLQVAGOn8z-EJKps4SVmpJfSPv50P5w1ThqCBS7XGkwvhxIkofnLulVgXXPV6LKlwJkWvrwoTxcXrYLPxBLMPrZ2PPqMuHxOTy19duxmnqph0L6pX0XsuR9zNWtI-siKPZjsHrHNFG_kAIsHXYgYVdjlz2-4OotE4R-H-eDa8xZiqwDdqYTV25f87_UMQSMuWE-HPYmDL3v9XTZJYePhGQtwDim5o"
        />
      </motion.div>

      {/* High-End Frosted Glass Container with staggered reveal */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className="mt-6 md:mt-10 backdrop-blur-[24px] bg-white/30 dark:bg-white/5 border border-white/45 dark:border-white/10 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.1)] p-5 sm:p-8 md:p-10 rounded-3xl md:rounded-[36px] w-full max-w-sm sm:max-w-2xl md:max-w-3xl mx-auto space-y-3 md:space-y-4 z-10 transition-all duration-300 hover:border-[#DDF247]/40"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="font-headline text-[2.6rem] min-[380px]:text-[3.2rem] sm:text-6xl md:text-8xl lg:text-[6.5rem] font-black text-primary tracking-widest leading-none uppercase break-words select-none"
        >
          FACILISSIMO<br />WEB ///
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="pt-2 md:pt-4 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            onClick={handleScrollToServices}
            className="inline-block bg-primary text-on-primary px-7 py-3 sm:px-9 sm:py-4 rounded-full font-headline text-lg sm:text-xl md:text-2xl font-bold shadow-lg cursor-pointer hover:bg-secondary transition-colors relative overflow-hidden group w-full sm:w-auto"
          >
            <span className="relative z-10 font-bold uppercase tracking-wider">Servizi</span>
            <div className="absolute inset-0 bg-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            onClick={handleScrollToPortfolio}
            className="inline-block bg-secondary text-on-secondary px-7 py-3 sm:px-9 sm:py-4 rounded-full font-headline text-lg sm:text-xl md:text-2xl font-bold shadow-lg cursor-pointer hover:bg-primary transition-colors relative overflow-hidden group w-full sm:w-auto"
          >
            <span className="relative z-10 font-bold uppercase tracking-wider">Proposte</span>
            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            onClick={handleScrollToConsulenze}
            className="inline-block bg-surface-container border border-outline-variant/30 text-on-surface px-7 py-3 sm:px-9 sm:py-4 rounded-full font-headline text-lg sm:text-xl md:text-2xl font-bold shadow-md cursor-pointer hover:bg-primary hover:text-on-primary hover:border-transparent transition-colors relative overflow-hidden group w-full sm:w-auto"
          >
            <span className="relative z-10 font-bold uppercase tracking-wider">Consulenze</span>
            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Ambient decorative glowing nodes */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-secondary-container/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-tertiary-container/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
    </section>
  );
}
