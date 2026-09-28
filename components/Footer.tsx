'use client';

import { ArrowUp } from 'lucide-react';
import { navLinks, personal, socials } from '@/config/site';
import { scrollToSection } from '@/lib/smooth-scroll';
import SocialIcon from '@/components/SocialIcon';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="relative border-t border-border pt-20">
            <div className="container">
                <div className="grid gap-12 pb-16 md:grid-cols-[1.5fr_1fr_1fr]">
                    <div>
                        <p className="mb-4 font-display text-subheading uppercase">
                            Let&apos;s build something
                            <span className="text-accent">.</span>
                        </p>
                        <a
                            href={`mailto:${personal.email}`}
                            className="link-underline font-mono text-sm text-muted hover:text-foreground"
                        >
                            {personal.email}
                        </a>
                    </div>

                    <nav aria-label="Footer">
                        <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">
                            Sitemap
                        </p>
                        <ul className="space-y-2">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <button
                                        type="button"
                                        onClick={() => scrollToSection(link.href)}
                                        className="text-sm text-muted transition-colors hover:text-foreground"
                                    >
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div>
                        <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">
                            Elsewhere
                        </p>
                        <ul className="space-y-2">
                            {socials.map((social) => (
                                <li key={social.name}>
                                    <a
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
                                    >
                                        <SocialIcon icon={social.icon} className="size-4" />
                                        {social.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Oversized wordmark that bleeds off the bottom of the page. */}
                <p
                    aria-hidden
                    className="select-none whitespace-nowrap text-center font-display text-display uppercase leading-[0.8] text-stroke"
                >
                    {personal.name}
                </p>

                <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-6 text-xs text-muted md:flex-row">
                    <p>
                        © {year} {personal.name}. All rights reserved.
                    </p>

                    <button
                        type="button"
                        onClick={() => scrollToSection('#banner')}
                        className="group inline-flex items-center gap-2 uppercase tracking-[0.2em] transition-colors hover:text-accent"
                    >
                        Back to top
                        <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
