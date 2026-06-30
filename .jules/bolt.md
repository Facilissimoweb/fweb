## 2025-06-30 - [Performance Anti-Pattern: High-Frequency Re-renders on Scroll]
**Learning:** Updating React state within a scroll event listener (e.g., for a progress bar) triggers a full component re-render on every scroll tick. This is extremely inefficient, especially for top-level components like the Navbar.
**Action:** Use Framer Motion's `useScroll` and `useSpring` hooks. These drive DOM updates (like CSS transforms) via MotionValues, offloading animations to the compositor and eliminating React re-renders for high-frequency UI updates.
