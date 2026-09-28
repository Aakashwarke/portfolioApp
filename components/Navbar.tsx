'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGSAP } from '@gsap/react';
import { Menu, X } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import { scrollToSection } from '@/lib/smooth-scroll';
import { navLinks, personal, socials } from '@/config/site';
import { cn } from '@/lib/utils';
import SocialIcon from '@/components/SocialIcon';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const isHome = pathname === '/';

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close the overlay whenever the route changes underneath it.
    useEffect(() => setMenuOpen(false), [pathname]);

    useGSAP(
        () => {
            if (!menuOpen) return;

            gsap.from('.mobile-menu-link', {
                yPercent: 100,
                opacity: 0,
                duration: 0.6,
                ease: 'expo.out',
                stagger: 0.07,
            });
        },
        { scope: menuRef, dependencies: [menuOpen] },
    );

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [menuOpen]);

    const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (!href.startsWith('#')) return;

        // Anchors only resolve on the home page; elsewhere let the link navigate.
        if (!isHome) return;

        event.preventDefault();
        setMenuOpen(false);
        scrollToSection(href);
    };

    return (
        <>
            <header
                className={cn(
                    'fixed inset-x-0 top-0 transition-all duration-500 ease-smooth',
                    // The header owns a stacking context, so it has to sit above the
                    // mobile overlay for its close button to stay clickable.
                    menuOpen ? 'z-[95]' : 'z-[80]',
                    scrolled && !menuOpen
                        ? 'border-b border-border bg-background/80 py-3 backdrop-blur-md'
                        : 'border-b border-transparent py-6',
                )}
            >
                <nav className="container flex items-center justify-between">
                    <Link
                        href="/"
                        className="font-display text-xl uppercase tracking-tight transition-colors hover:text-accent"
                    >
                        {personal.firstName}
                        <span className="text-accent">.</span>
                    </Link>

                    <ul className="hidden items-center gap-8 md:flex">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={isHome ? link.href : `/${link.href}`}
                                    onClick={(event) => handleNavClick(event, link.href)}
                                    className="link-underline font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-foreground"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <button
                        type="button"
                        onClick={() => setMenuOpen((open) => !open)}
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={menuOpen}
                        className="md:hidden"
                    >
                        {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
                    </button>
                </nav>
            </header>

            {menuOpen && (
                <div
                    ref={menuRef}
                    className="fixed inset-0 z-[90] flex flex-col justify-between bg-background px-6 pb-10 pt-28 md:hidden"
                >
                    <ul className="flex flex-col gap-2">
                        {navLinks.map((link, index) => (
                            <li key={link.href} className="overflow-hidden">
                                <Link
                                    href={isHome ? link.href : `/${link.href}`}
                                    onClick={(event) => handleNavClick(event, link.href)}
                                    className="mobile-menu-link flex items-baseline gap-4 py-2 font-display text-4xl uppercase"
                                >
                                    <span className="font-mono text-xs text-accent">
                                        0{index + 1}
                                    </span>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center gap-6">
                        {socials.map((social) => (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.name}
                                className="text-muted transition-colors hover:text-accent"
                            >
                                <SocialIcon icon={social.icon} />
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
