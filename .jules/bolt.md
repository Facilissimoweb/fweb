## 2025-05-14 - Optimizing high-frequency UI interactions
**Learning:** Replacing React `useState` and `useEffect` with Framer Motion hooks (`useScroll`, `useTransform`, `useMotionValue`, `useSpring`) for interactions like parallax scrolling and mouse-tilt effects bypasses the React render loop. This reduces re-renders from ~60/sec to near zero during these interactions, significantly improving performance and responsiveness.
**Action:** For any UI element that updates based on scroll or mouse position, prioritize Framer Motion's optimized hooks over standard React state.

## 2025-05-14 - Cleanup and Repository Hygiene
**Learning:** Verification artifacts such as Playwright scripts, screenshots, and temporary log files, as well as unapproved dependencies added during the exploration phase, must not be committed to the repository.
**Action:** Always perform a thorough cleanup of any internal verification tools and revert `package.json` changes before final submission.
