'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { personal, socials } from '@/config/site';
import Button from '@/components/Button';
import SocialIcon from '@/components/SocialIcon';

const Contact = () => {
    const rootRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.from('.contact-line', {
                yPercent: 110,
                duration: 1,
                ease: 'expo.out',
                stagger: 0.1,
                scrollTrigger: { trigger: rootRef.current, start: 'top 75%' },
            });

            gsap.from('.contact-detail', {
                opacity: 0,
                y: 24,
                duration: 0.7,
                ease: 'power3.out',
                stagger: 0.1,
                scrollTrigger: { trigger: rootRef.current, start: 'top 65%' },
            });
        },
        { scope: rootRef },
    );

    return (
        <section id="contact" ref={rootRef} className="section-padding relative overflow-hidden">
            <div
                aria-hidden
                className="pointer-events-none absolute -left-40 bottom-0 size-[32rem] rounded-full bg-accent/10 blur-[140px]"
            />

            <div className="container relative text-center">
                <p className="contact-detail mb-6 font-mono text-xs uppercase tracking-[0.3em] text-accent">
                    05 — Contact
                </p>

                <h2 className="font-display text-heading uppercase leading-none">
                    <span className="block overflow-hidden">
                        <span className="contact-line block">Have a project</span>
                    </span>
                    <span className="block overflow-hidden">
                        <span className="contact-line block text-stroke-accent">in mind?</span>
                    </span>
                </h2>

                <p className="contact-detail mx-auto mt-8 max-w-xl leading-relaxed text-muted">
                    I&apos;m {personal.availability.toLowerCase()}. Tell me what you&apos;re
                    building and I&apos;ll get back to you within a day or two.
                </p>

                <div className="contact-detail mt-10 flex flex-wrap items-center justify-center gap-4">
                    <Button href={`mailto:${personal.email}`} size="lg" withArrow>
                        {personal.email}
                    </Button>
                    {personal.phone && (
                        <Button href={`tel:${personal.phone}`} size="lg" variant="outline">
                            {personal.phone}
                        </Button>
                    )}
                </div>

                <ul className="contact-detail mt-12 flex items-center justify-center gap-6">
                    {socials.map((social) => (
                        <li key={social.name}>
                            <a
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.name}
                                className="text-muted transition-colors hover:text-accent"
                            >
                                <SocialIcon icon={social.icon} className="size-6" />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Contact;
