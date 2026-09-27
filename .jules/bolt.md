## 2025-05-18 - Scroll Progress Bar Optimization in Navbar
**Learning:** React state updates driven by global scroll events cause full component tree re-renders on every pixel scroll. Offloading scroll tracking to Framer Motion's `useScroll` and `useSpring` motion values updates DOM styles directly without triggering React render cycles.
**Action:** Use Framer Motion motion values (`useScroll`, `useSpring`, `useTransform`) for any scroll-driven progress bars or parallax effects instead of React `useState` scroll handlers.
