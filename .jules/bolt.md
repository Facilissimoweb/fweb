## 2026-03-31 - Offloading high-frequency mouse and scroll handlers in Hero to Framer Motion hooks
**Learning:** In React components with high-frequency interactions (like 3D mouse tilt and scroll parallax), updating React `useState` on every mouse movement or scroll frame causes ~60 component re-renders per second, bottlenecking the main thread.
**Action:** Use Framer Motion's `useScroll`, `useMotionValue`, `useTransform`, and `useSpring` hooks to drive transforms directly on Motion elements without triggering React render cycles.
