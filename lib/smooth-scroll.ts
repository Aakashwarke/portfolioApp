import type Lenis from 'lenis';

/**
 * Module-level handle on the single Lenis instance created by <SmoothScroll />,
 * so nav links and buttons anywhere can drive the same scroll.
 */
let instance: Lenis | null = null;

export const setLenisInstance = (lenis: Lenis | null) => {
    instance = lenis;
};

export const scrollToSection = (target: string) => {
    if (instance) {
        instance.scrollTo(target, { duration: 1.4, offset: 0 });
        return;
    }

    // Lenis is disabled (reduced motion, or not mounted yet) — fall back to the platform.
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
