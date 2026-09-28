'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ArrowDown } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import { scrollToSection } from '@/lib/smooth-scroll';
import { personal, socials } from '@/config/site';
import Button from '@/components/Button';
import SocialIcon from '@/components/SocialIcon';

/** Matches the preloader's total runtime so the hero lands as the curtain lifts. */
const PRELOADER_DURATION = 2.5;

const Banner = () => {
    const rootRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const timeline = gsap.timeline({ delay: PRELOADER_DURATION });

            timeline
                .from('.banner-eyebrow', { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' })
                .from(
                    '.banner-line',
                    { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.12 },
                    '-=0.3',
                )
                .from(
                    '.banner-tagline',
                    { opacity: 0, y: 24, duration: 0.8, ease: 'power2.out' },
                    '-=0.6',
                )
                .from(
                    '.banner-cta',
                    { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out', stagger: 0.1 },
                    '-=0.4',
                )
                .from(
                    '.banner-social',
                    { opacity: 0, x: -16, duration: 0.5, ease: 'power2.out', stagger: 0.08 },
                    '-=0.4',
                )
                .from('.banner-scroll', { opacity: 0, duration: 0.6 }, '-=0.2');

            // Headline drifts up and fades as the next section arrives.
            gsap.to('.banner-parallax', {
                yPercent: -18,
                opacity: 0.25,
                ease: 'none',
                scrollTrigger: {
                    trigger: rootRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        },
        { scope: rootRef },
    );

    return (
        <section
            id="banner"
            ref={rootRef}
            className="relative flex min-h-screen items-center overflow-hidden pt-28"
        >
            {/* Accent glow behind the headline. */}
            <div
                aria-hidden
                className="pointer-events-none absolute -right-40 top-1/4 size-[36rem] rounded-full bg-accent/10 blur-[140px]"
            />

            <div className="container relative">
                <div className="banner-parallax">
                    <p className="banner-eyebrow mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
                        <span className="inline-block h-px w-10 bg-accent" />
                        {personal.availability}
                    </p>

                    <h1 className="font-display text-display uppercase">
                        <span className="block overflow-hidden">
                            <span className="banner-line block">{personal.firstName}</span>
                        </span>
                        <span className="block overflow-hidden">
                            <span className="banner-line block text-stroke-accent">
                                {personal.lastName}
                            </span>
                        </span>
                    </h1>

                    <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                        <p className="banner-tagline max-w-xl text-base leading-relaxed text-muted md:text-lg">
                            {personal.tagline}
                        </p>

                        <div className="flex flex-wrap items-center gap-4">
                            <div className="banner-cta">
                                <Button onClick={() => scrollToSection('#projects')} withArrow>
                                    View work
                                </Button>
                            </div>
                            <div className="banner-cta">
                                <Button href={`mailto:${personal.email}`} variant="outline">
                                    Get in touch
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 flex items-center justify-between">
                    <ul className="flex items-center gap-5">
                        {socials.map((social) => (
                            <li key={social.name} className="banner-social">
                                <a
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.name}
                                    className="text-muted transition-colors hover:text-accent"
                                >
                                    <SocialIcon icon={social.icon} />
                                </a>
                            </li>
                        ))}
                    </ul>

                    <button
                        type="button"
                        onClick={() => scrollToSection('#about')}
                        className="banner-scroll group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted transition-colors hover:text-accent"
                    >
                        Scroll
                        <ArrowDown className="size-4 animate-bounce group-hover:text-accent" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Banner;
