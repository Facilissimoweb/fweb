## 2026-06-27 - [Hero Parallax & Tilt Optimization]
**Learning:** React components that trigger re-renders on every scroll or mouse move (e.g., via state updates in a scroll listener) cause significant main-thread overhead and jank. Framer Motion's `useScroll`, `useMotionValue`, and `useTransform` allow for hardware-accelerated animations that bypass React's reconciliation cycle.
**Action:** Always prefer `motion`'s hooks for scroll-linked or mouse-linked animations to achieve 60+ FPS without jank.
