'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
    /** Small label above the title, e.g. "01 — About". */
    eyebrow?: string;
    title: string;
    className?: string;
}

const SectionTitle = ({ eyebrow, title, className }: SectionTitleProps) => {
    const rootRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.from('.section-title-line', {
                yPercent: 110,
                duration: 0.9,
                ease: 'expo.out',
                stagger: 0.08,
                scrollTrigger: { trigger: rootRef.current, start: 'top 85%' },
            });

            gsap.from('.section-title-eyebrow', {
                opacity: 0,
                x: -20,
                duration: 0.6,
                ease: 'power2.out',
                scrollTrigger: { trigger: rootRef.current, start: 'top 85%' },
            });
        },
        { scope: rootRef },
    );

    return (
        <div ref={rootRef} className={cn('mb-14 md:mb-20', className)}>
            {eyebrow && (
                <p className="section-title-eyebrow mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">
                    {eyebrow}
                </p>
            )}

            <h2 className="font-display text-heading uppercase leading-none">
                {title.split(' ').map((word, index) => (
                    <span key={`${word}-${index}`} className="mr-[0.25em] inline-block overflow-hidden">
                        <span className="section-title-line inline-block">{word}</span>
                    </span>
                ))}
            </h2>
        </div>
    );
};

export default SectionTitle;
