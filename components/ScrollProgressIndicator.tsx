'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

/** Thin accent bar across the top of the viewport tracking page scroll. */
const ScrollProgressIndicator = () => {
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const bar = barRef.current;
        if (!bar) return;

        const setScale = gsap.quickSetter(bar, 'scaleX');

        const update = () => {
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
            setScale(Math.min(1, Math.max(0, progress)));
        };

        update();
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);

        return () => {
            window.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, []);

    return (
        <div aria-hidden className="fixed inset-x-0 top-0 z-[70] h-0.5 bg-transparent">
            <div ref={barRef} className="h-full w-full origin-left scale-x-0 bg-accent" />
        </div>
    );
};

export default ScrollProgressIndicator;
