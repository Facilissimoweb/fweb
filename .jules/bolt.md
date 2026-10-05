## 2026-06-28 - Scroll Progress Bar Optimization with Framer Motion MotionValues

**Learning:** Storing continuous scroll progress as a floating-point React state causes the entire component (and its subtree) to re-render 60+ times per second during scroll. Furthermore, updating element `width` causes browser layout reflows on every frame.
**Action:** Replace React scroll state with Framer Motion's `useScroll()` hook (`scrollYProgress`) and render a `<motion.div style={{ scaleX: scrollYProgress, transformOrigin: '0%' }} />`. This updates the CSS transform directly in the DOM outside React's render loop and leverages hardware-accelerated GPU compositing.
