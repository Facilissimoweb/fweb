## 2026-03-31 - Memoize Landing Page Components & Static Computations
**Learning:** In React 19 apps with top-level modal state changes (like privacy policies or cookie consents in `App.tsx`), unmemoized child components cause unnecessary full-tree re-renders on state toggles. Wrapping key display components in `React.memo` and callbacks in `useCallback` keeps the DOM tree stable.
**Action:** When top-level layout state changes frequently or triggers modal renders, memoize heavy landing page sections and stabilize callback props.
