## 2025-02-22 - Offload Navbar Scroll Progress to Framer Motion Hooks

**Learning:** Managing scroll progress state (`scrollProgress`) with React `useState` and standard `window.addEventListener('scroll')` causes continuous React re-renders on every pixel scrolled. Switching to Framer Motion's `useScroll()` (`scrollYProgress`) and `useSpring()` combined with `<motion.div style={{ scaleX }}>` completely decouples scroll progress rendering from the React component render cycle, driving GPU-accelerated CSS transforms directly.

**Action:** For high-frequency visual indicators (like reading progress bars, parallax offsets, or scroll indicators), always use Framer Motion motion values (`useScroll`, `useTransform`, `useSpring`) with `scaleX`/`transform` CSS properties instead of React state.
