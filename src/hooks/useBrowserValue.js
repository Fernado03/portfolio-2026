import { useSyncExternalStore } from "react";

const never = () => () => {};

// Reads browser-only state (the clock, a media query) without breaking hydration of the pre-rendered
// HTML: the static markup and the hydration pass both use `fallback`, then React re-renders with the
// live value. `read` and `subscribe` must be stable (module-level) functions.
export default function useBrowserValue(read, fallback, subscribe = never) {
    return useSyncExternalStore(subscribe, read, () => fallback);
}
