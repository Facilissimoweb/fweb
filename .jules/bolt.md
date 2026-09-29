## 2025-05-18 - Replacing React `useState` with Framer Motion MotionValues for High-Frequency Events
**Learning:** Updating React component state on high-frequency events like window `scroll` or mouse `mousemove` causes full component re-renders at 60–120Hz, leading to main-thread congestion and layout thrashing.
**Action:** Use Framer Motion's `useScroll`, `useMotionValue`, `useSpring`, and `useTransform` hooks to bind interactive CSS transforms directly to compositor layers without triggering React re-renders.
