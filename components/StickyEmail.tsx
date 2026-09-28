import { personal } from '@/config/site';

/** Vertical email rail pinned to the right edge on large screens. */
const StickyEmail = () => (
    <div className="fixed bottom-0 right-6 z-[60] hidden flex-col items-center gap-6 lg:flex">
        <a
            href={`mailto:${personal.email}`}
            className="vertical-rl font-mono text-xs uppercase tracking-[0.3em] text-muted transition-colors hover:text-accent"
        >
            {personal.email}
        </a>
        <span aria-hidden className="h-24 w-px bg-border" />
    </div>
);

export default StickyEmail;
