'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { personal } from '@/config/site';

/**
 * Counts to 100, then lifts a curtain off the page. The page underneath is
 * already rendered, so this only ever delays the reveal, never the content.
 */
const Preloader = () => {
    const rootRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);
    const [done, setDone] = useState(false);

    useGSAP(
        () => {
            const counter = { value: 0 };
            document.body.style.overflow = 'hidden';

            const timeline = gsap.timeline({
                onComplete: () => {
                    document.body.style.overflow = '';
                    setDone(true);
                },
            });

            timeline
                .to(counter, {
                    value: 100,
                    duration: 1.6,
                    ease: 'power2.inOut',
                    onUpdate: () => setProgress(Math.round(counter.value)),
                })
                .to('.preloader-bar', { scaleX: 1, duration: 1.6, ease: 'power2.inOut' }, 0)
                .to('.preloader-content', { y: -40, opacity: 0, duration: 0.5, ease: 'power2.in' })
                .to(rootRef.current, {
                    yPercent: -100,
                    duration: 0.9,
                    ease: 'expo.inOut',
                });

            return () => {
                document.body.style.overflow = '';
            };
        },
        { scope: rootRef },
    );

    if (done) return null;

    return (
        <div
            ref={rootRef}
            className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background"
        >
            <div className="preloader-content flex flex-col items-center gap-6">
                <span className="font-display text-heading uppercase tracking-tight">
                    {personal.firstName}
                    <span className="text-accent">.</span>
                </span>
                <span className="font-mono text-sm text-muted">{progress}%</span>
            </div>

            <div className="absolute bottom-0 left-0 h-px w-full bg-border">
                <div className="preloader-bar h-full w-full origin-left scale-x-0 bg-accent" />
            </div>
        </div>
    );
};

export default Preloader;
