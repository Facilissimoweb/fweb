## 2026-03-31 - Memoize Blog reading calculations and category extraction
**Learning:** Calculating reading times (string join/split/filter) and extracting unique category filters during component renders re-computes unnecessarily on every state change (e.g., toggling likes). Hoisting static array calculations to module scope and caching reading times in a Map avoids repeated garbage collection and string operations.
**Action:** Always hoist static data operations derived from constant arrays to module scope, and cache pure calculations using module-level Maps.
