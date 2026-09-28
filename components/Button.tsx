'use client';

import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
    'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium uppercase tracking-wide transition-colors duration-300 ease-smooth disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                primary: 'bg-accent text-background hover:bg-accent/90',
                outline: 'border border-border text-foreground hover:border-accent hover:text-accent',
                ghost: 'text-foreground hover:text-accent',
            },
            size: {
                sm: 'px-5 py-2.5 text-xs',
                md: 'px-7 py-3.5 text-sm',
                lg: 'px-9 py-4 text-base',
            },
        },
        defaultVariants: { variant: 'primary', size: 'md' },
    },
);

interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    href?: string;
    /** Opens in a new tab and adds the usual rel attributes. */
    external?: boolean;
    withArrow?: boolean;
}

const Button = ({
    className,
    variant,
    size,
    href,
    external,
    withArrow = false,
    children,
    ...props
}: ButtonProps) => {
    const content = (
        <>
            <span className="relative z-10">{children}</span>
            {withArrow && (
                <ArrowUpRight
                    className="relative z-10 size-4 transition-transform duration-300 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                />
            )}
        </>
    );

    const classes = cn(buttonVariants({ variant, size }), className);

    if (href) {
        if (external || href.startsWith('http') || href.startsWith('mailto:')) {
            return (
                <a
                    href={href}
                    target={href.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className={classes}
                >
                    {content}
                </a>
            );
        }

        return (
            <Link href={href} className={classes}>
                {content}
            </Link>
        );
    }

    return (
        <button className={classes} {...props}>
            {content}
        </button>
    );
};

export default Button;
export { buttonVariants };
