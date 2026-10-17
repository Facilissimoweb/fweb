## 2025-05-18 - Offload high-frequency scroll & mouse interaction state in Hero component to Framer Motion hooks

**Learning:** Managing continuous high-frequency events (like parallax scroll or 3D cursor tilt) with React `useState` triggers ~60 re-renders per second on the main thread during scrolling or hovering. By replacing `useState` with Framer Motion hooks (`useScroll`, `useTransform`, `useMotionValue`, `useSpring`), transformation updates bypass React component render cycles entirely and are offloaded directly to motion values.

**Action:** Whenever implementing parallax, mouse tilt, or interactive scroll effects in components using Framer Motion, use `useScroll`/`useMotionValue` and `useTransform`/`useSpring` instead of standard React state listeners (`useState` + `addEventListener`) to keep component re-renders at zero during active interactions.
