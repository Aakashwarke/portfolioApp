'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { setLenisInstance } from '@/lib/smooth-scroll';

/**
 * Drives Lenis from GSAP's ticker so smooth scrolling and ScrollTrigger share
 * one clock — running them on separate rAF loops causes pinned sections to jitter.
 */
const SmoothScroll = () => {
    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const lenis = new Lenis({
            duration: 1.1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            touchMultiplier: 1.6,
        });

        setLenisInstance(lenis);
        lenis.on('scroll', ScrollTrigger.update);

        const raf = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(raf);
            lenis.destroy();
            setLenisInstance(null);
        };
    }, []);

    return null;
};

export default SmoothScroll;
