'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { cn } from '@/lib/utils';

interface RevealOnScrollProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    y?: number;
}

/** Generic fade-and-rise entrance for blocks that don't need bespoke animation. */
const RevealOnScroll = ({ children, className, delay = 0, y = 40 }: RevealOnScrollProps) => {
    const rootRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.from(rootRef.current, {
                opacity: 0,
                y,
                duration: 0.9,
                delay,
                ease: 'power3.out',
                scrollTrigger: { trigger: rootRef.current, start: 'top 88%' },
            });
        },
        { scope: rootRef },
    );

    return (
        <div ref={rootRef} className={cn(className)}>
            {children}
        </div>
    );
};

export default RevealOnScroll;
