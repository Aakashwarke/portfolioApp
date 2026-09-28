'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

/**
 * A template (rather than a layout) remounts on every navigation, which is what
 * lets this entrance animation replay for each page.
 */
const Template = ({ children }: { children: React.ReactNode }) => {
    const rootRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.fromTo(
                rootRef.current,
                { opacity: 0, y: 24 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
            );
        },
        { scope: rootRef },
    );

    return <div ref={rootRef}>{children}</div>;
};

export default Template;
