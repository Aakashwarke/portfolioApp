'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { gsap } from '@/lib/gsap';
import { cn } from '@/lib/utils';

interface TransitionLinkProps extends React.ComponentProps<typeof Link> {
    href: string;
    children: React.ReactNode;
    className?: string;
}

/**
 * Fades the current page out before navigating, so the incoming page's
 * template animation doesn't cut in over a still-visible old page.
 */
const TransitionLink = ({ href, children, className, ...props }: TransitionLinkProps) => {
    const router = useRouter();

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        // Let the browser handle modified clicks (new tab, download, etc.).
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;

        event.preventDefault();

        const main = document.querySelector('main');
        if (!main) {
            router.push(href);
            return;
        }

        gsap.to(main, {
            opacity: 0,
            y: -20,
            duration: 0.35,
            ease: 'power2.in',
            onComplete: () => router.push(href),
        });
    };

    return (
        <Link href={href} onClick={handleClick} className={cn(className)} {...props}>
            {children}
        </Link>
    );
};

export default TransitionLink;
