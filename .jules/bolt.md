## 2026-03-31 - Offload High-Frequency Interactions to Framer Motion MotionValues

**Learning:** Replacing React state (`useState`) with Framer Motion hooks (`useScroll`, `useTransform`, `useMotionValue`, `useSpring`) for high-frequency user events (scroll and 3D mouse tilt) offloads transform calculations directly to MotionValues, eliminating ~60 React re-renders/sec on the main thread during interaction.

**Action:** Whenever implementing parallax, mouse tilt, or dynamic scroll effects with Framer Motion, avoid `useState` or `window.addEventListener('scroll')`. Use `useScroll`, `useMotionValue`, and `useSpring` directly on `motion` components and ensure element `className` does not include CSS `transition-transform` properties to prevent animation jitter.
