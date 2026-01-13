import { useSyncExternalStore } from 'react';

const mediaQueryCache = new Map<string, MediaQueryList>();

function getSnapshot(query: string) {
    if (typeof window === 'undefined') return false;

    // Memoize the MQL to prevent recreation
    if (!mediaQueryCache.has(query)) {
        mediaQueryCache.set(query, window.matchMedia(query));
    }

    const mql = mediaQueryCache.get(query);
    return mql ? mql.matches : false;
}

function subscribe(callback: () => void, query: string) {
    if (typeof window === 'undefined') return () => { };

    let mql = mediaQueryCache.get(query);
    if (!mql) {
        mql = window.matchMedia(query);
        mediaQueryCache.set(query, mql);
    }

    if (mql.addEventListener) {
        mql.addEventListener('change', callback);
        return () => mql?.removeEventListener('change', callback);
    } else {
        // Fallback for older browsers
        // Fallback for older browsers
        mql.addListener(callback);
        return () => mql.removeListener(callback);
    }
}

/**
 * Hook to detect if viewport matches mobile breakpoint.
 * Uses useSyncExternalStore for concurrent features support.
 * @param {number} [breakpoint=768]
 */
const useIsMobile = (breakpoint: number = 768) => {
    const query = `(max-width: ${breakpoint}px)`;

    return useSyncExternalStore(
        (cb) => subscribe(cb, query),
        () => getSnapshot(query),
        () => false, // server snapshot
    );
};

export default useIsMobile;
