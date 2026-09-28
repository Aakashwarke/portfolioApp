'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

/**
 * Tailwind stores the theme colors as bare HSL channels ("75 97% 65%"), and
 * GSAP cannot parse `hsl(var(--x))` — it needs a literal, comma-separated color.
 */
const themeColor = (variable: string) => {
    const channels = getComputedStyle(document.documentElement)
        .getPropertyValue(variable)
        .trim();

    return `hsl(${channels.split(/\s+/).join(', ')})`;
};

/**
 * A dot that tracks the pointer exactly plus a ring that lags behind it.
 * Hidden entirely on touch devices, where there is no pointer to replace.
 */
const CustomCursor = () => {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        if (!isFinePointer) return;

        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        document.body.classList.add('custom-cursor-active');

        const accentColor = themeColor('--accent');
        const foregroundColor = themeColor('--foreground');

        const moveDotX = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power3.out' });
        const moveDotY = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power3.out' });
        const moveRingX = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3.out' });
        const moveRingY = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3.out' });

        let revealed = false;

        const onMove = (event: MouseEvent) => {
            if (!revealed) {
                // Jump to the pointer before fading in, so it never streaks in from 0,0.
                gsap.set([dot, ring], { x: event.clientX, y: event.clientY });
                gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
                revealed = true;
            }

            moveDotX(event.clientX);
            moveDotY(event.clientY);
            moveRingX(event.clientX);
            moveRingY(event.clientY);
        };

        const interactiveSelector = 'a, button, [data-cursor="hover"], input, textarea';

        const onOver = (event: MouseEvent) => {
            const target = event.target as HTMLElement | null;
            if (target?.closest(interactiveSelector)) {
                gsap.to(ring, { scale: 2.2, borderColor: accentColor, duration: 0.3 });
                gsap.to(dot, { scale: 0, duration: 0.3 });
            }
        };

        const onOut = (event: MouseEvent) => {
            const target = event.target as HTMLElement | null;
            if (target?.closest(interactiveSelector)) {
                gsap.to(ring, { scale: 1, borderColor: foregroundColor, duration: 0.3 });
                gsap.to(dot, { scale: 1, duration: 0.3 });
            }
        };

        const onLeaveWindow = () => gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
        const onEnterWindow = () => {
            // Only re-show a cursor that has already been placed at a real position.
            if (revealed) gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
        };

        window.addEventListener('mousemove', onMove);
        document.addEventListener('mouseover', onOver);
        document.addEventListener('mouseout', onOut);
        document.addEventListener('mouseleave', onLeaveWindow);
        document.addEventListener('mouseenter', onEnterWindow);

        return () => {
            document.body.classList.remove('custom-cursor-active');
            window.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseover', onOver);
            document.removeEventListener('mouseout', onOut);
            document.removeEventListener('mouseleave', onLeaveWindow);
            document.removeEventListener('mouseenter', onEnterWindow);
        };
    }, []);

    return (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
            <div
                ref={ringRef}
                className="absolute -left-4 -top-4 h-8 w-8 rounded-full border border-foreground/60 opacity-0"
            />
            <div ref={dotRef} className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-accent opacity-0" />
        </div>
    );
};

export default CustomCursor;
