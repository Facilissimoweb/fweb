## 2025-02-18 - Offloading Parallax Scroll and Mouse Tilt from React State to Framer Motion Hooks
**Learning:** High-frequency scroll and mouse move listeners updating React state cause unnecessary component re-renders on every animation frame (~60 FPS), consuming main thread time and risking frame drops.
**Action:** Use Framer Motion hooks (`useScroll`, `useTransform`, `useMotionValue`, `useSpring`) to handle continuous scroll and interactive mouse movement. This updates DOM transforms directly without triggering React re-renders.
