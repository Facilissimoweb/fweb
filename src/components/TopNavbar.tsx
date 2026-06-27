import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';

const PanoramaIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12Z" stroke="url(#paint0_linear_panorama)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 18V12L16 10" stroke="url(#paint1_linear_panorama)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="3" stroke="url(#paint2_linear_panorama)" strokeWidth="2"/>
    <defs>
      <linearGradient id="paint0_linear_panorama" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#A855F7"/>
        <stop offset="1" stopColor="#EC4899"/>
      </linearGradient>
      <linearGradient id="paint1_linear_panorama" x1="12" y1="10" x2="16" y2="18" gradientUnits="userSpaceOnUse">
        <stop stopColor="#A855F7"/>
        <stop offset="1" stopColor="#EC4899"/>
      </linearGradient>
      <linearGradient id="paint2_linear_panorama" x1="9" y1="9" x2="15" y2="15" gradientUnits="userSpaceOnUse">
        <stop stopColor="#A855F7"/>
        <stop offset="1" stopColor="#EC4899"/>
      </linearGradient>
    </defs>
  </svg>
);

const ROIIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2V22M12 2L15 5M12 2L9 5" stroke="url(#paint0_linear_roi)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 12H6M18 12L15 9M18 12L15 15M6 12L9 9M6 12L9 15" stroke="url(#paint1_linear_roi)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="paint0_linear_roi" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3B82F6"/>
        <stop offset="1" stopColor="#10B981"/>
      </linearGradient>
      <linearGradient id="paint1_linear_roi" x1="6" y1="12" x2="18" y2="12" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3B82F6"/>
        <stop offset="1" stopColor="#10B981"/>
      </linearGradient>
    </defs>
  </svg>
);

const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="url(#paint0_linear_home)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 22V12H15V22" stroke="url(#paint0_linear_home)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="paint0_linear_home" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F59E0B"/>
        <stop offset="1" stopColor="#EF4444"/>
      </linearGradient>
    </defs>
  </svg>
);

export default function TopNavbar() {
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/', icon: HomeIcon },
    { label: 'Panorama', path: '/panorama', icon: PanoramaIcon },
    { label: 'Simulatore ROI', path: '/roi-simulator', icon: ROIIcon },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center p-4 pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-2 px-6 py-2 bg-surface/80 dark:bg-surface-dim/80 backdrop-blur-xl border border-outline-variant/30 rounded-full shadow-2xl pointer-events-auto"
      >
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 group ${
                isActive ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon />
              </motion.div>
              <span className={`text-xs font-bold uppercase tracking-wider hidden sm:block ${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 border-2 border-primary/30 rounded-full"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          );
        })}
      </motion.nav>
    </div>
  );
}
