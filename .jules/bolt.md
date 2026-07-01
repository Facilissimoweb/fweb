## 2025-05-23 - [Framer Motion Scroll Optimization]
**Learning:** Using React state for scroll-linked UI elements (like progress bars or navbar visibility toggles) triggers a React re-render on every scroll event, which can be 60+ times per second. Framer Motion's `useScroll` and `useSpring` hooks allow these updates to happen via Motion Values, which bypass the React render loop entirely for the animated elements.
**Action:** Always prefer `useScroll` Motion Values for scroll-linked animations and `useMotionValueEvent` for state toggles that only need to happen at specific scroll thresholds.
