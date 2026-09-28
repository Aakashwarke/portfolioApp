import { cn } from '@/lib/utils';

interface MarqueeProps {
    items: string[];
    /** Seconds for one full loop. Lower is faster. */
    duration?: number;
    className?: string;
    separator?: string;
}

/**
 * Renders the list twice and translates by -50%, so the loop is seamless.
 * Pure CSS — no JS ticker to keep alive while off screen.
 */
const Marquee = ({ items, duration = 30, className, separator = '✦' }: MarqueeProps) => (
    <div className={cn('relative flex overflow-hidden border-y border-border py-6', className)}>
        <div
            className="flex shrink-0 animate-marquee items-center gap-8 pr-8"
            style={{ '--marquee-duration': `${duration}s` } as React.CSSProperties}
        >
            {[...items, ...items].map((item, index) => (
                <span
                    key={`${item}-${index}`}
                    className="flex items-center gap-8 font-display text-3xl uppercase tracking-tight md:text-5xl"
                >
                    {item}
                    <span className="text-accent" aria-hidden>
                        {separator}
                    </span>
                </span>
            ))}
        </div>
    </div>
);

export default Marquee;
