## 2025-05-18 - Framer Motion Hooks for High-Frequency Interaction

**Learning:** Storing window scroll offsets (`window.scrollY`) or mouse coordinates in React `useState` for parallax or 3D tilt effects triggers up to 60-120 re-renders per second on the main thread, degrading rendering performance. Replacing `useState` with Framer Motion motion values (`useScroll`, `useTransform`, `useMotionValue`, `useSpring`) updates element transforms directly in the Framer Motion animation pipeline without triggering React component re-renders.

**Action:** Whenever implementing parallax scrolling or continuous mouse-follow/tilt interactions, always use Framer Motion hooks (`useScroll`, `useMotionValue`, `useTransform`, `useSpring`) connected directly to `<motion.div>` style props instead of React component state.
