'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
    text: string;
    className?: string;
    /** Delay before the stagger starts, in seconds. */
    delay?: number;
    /** Animate on mount instead of when scrolled into view. */
    immediate?: boolean;
}

/**
 * Splits text into words and slides each one up from behind a mask.
 * Words (not characters) keep the markup light enough for long headlines.
 */
const AnimatedText = ({ text, className, delay = 0, immediate = false }: AnimatedTextProps) => {
    const rootRef = useRef<HTMLSpanElement>(null);

    useGSAP(
        () => {
            gsap.from('.animated-word', {
                yPercent: 110,
                duration: 1,
                ease: 'expo.out',
                stagger: 0.05,
                delay,
                ...(immediate
                    ? {}
                    : { scrollTrigger: { trigger: rootRef.current, start: 'top 88%' } }),
            });
        },
        { scope: rootRef, dependencies: [text] },
    );

    return (
        <span ref={rootRef} className={cn('inline-block', className)}>
            {text.split(' ').map((word, index) => (
                <span key={`${word}-${index}`} className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em]">
                    <span className="animated-word inline-block">{word}</span>
                </span>
            ))}
        </span>
    );
};

export default AnimatedText;
