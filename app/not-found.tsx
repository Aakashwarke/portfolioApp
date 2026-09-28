import Button from '@/components/Button';

const NotFound = () => (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-6 text-center">
        <p className="font-display text-display uppercase leading-none text-stroke-accent">404</p>
        <div>
            <h1 className="mb-3 font-display text-subheading uppercase">Page not found</h1>
            <p className="max-w-md text-muted">
                That link points somewhere that doesn&apos;t exist — it may have moved, or never
                been here at all.
            </p>
        </div>
        <Button href="/" withArrow>
            Back home
        </Button>
    </main>
);

export default NotFound;
