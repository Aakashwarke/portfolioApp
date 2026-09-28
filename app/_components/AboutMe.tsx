'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { about, personal } from '@/config/site';
import SectionTitle from '@/components/SectionTitle';
import Button from '@/components/Button';

const stats = [
    { value: personal.yearsOfExperience, label: 'Years building for the web' },
    { value: personal.projectsShipped, label: 'Projects shipped end to end' },
    { value: personal.location, label: 'Based in' },
];

const AboutMe = () => {
    const rootRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.from('.about-paragraph', {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power3.out',
                stagger: 0.15,
                scrollTrigger: { trigger: '.about-body', start: 'top 85%' },
            });

            gsap.from('.about-stat', {
                opacity: 0,
                y: 24,
                duration: 0.7,
                ease: 'power3.out',
                stagger: 0.12,
                scrollTrigger: { trigger: '.about-stats', start: 'top 90%' },
            });

            // Slow rotation on the decorative badge, tied to scroll.
            gsap.to('.about-badge', {
                rotate: 180,
                ease: 'none',
                scrollTrigger: { trigger: rootRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
            });
        },
        { scope: rootRef },
    );

    return (
        <section id="about" ref={rootRef} className="section-padding relative">
            <div className="container">
                <SectionTitle eyebrow="01 — About" title="Who I am" />

                <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
                    <div className="about-body space-y-6">
                        {about.map((paragraph, index) => (
                            <p
                                key={index}
                                className="about-paragraph text-base leading-relaxed text-muted md:text-lg"
                            >
                                {paragraph}
                            </p>
                        ))}

                        <div className="about-paragraph flex flex-wrap gap-4 pt-4">
                            <Button href={personal.resumeUrl} external variant="outline" withArrow>
                                Download résumé
                            </Button>
                        </div>
                    </div>

                    <div className="about-stats relative">
                        {/* Rotating stamp, purely decorative. */}
                        <div
                            aria-hidden
                            className="about-badge absolute -top-10 right-0 hidden size-28 items-center justify-center rounded-full border border-dashed border-accent/40 lg:flex"
                        >
                            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                                {personal.role.split(' ')[0]}
                            </span>
                        </div>

                        <dl className="divide-y divide-border border-y border-border">
                            {stats.map((stat) => (
                                <div key={stat.label} className="about-stat flex items-baseline gap-6 py-6">
                                    <dt className="sr-only">{stat.label}</dt>
                                    <dd className="font-display text-4xl uppercase text-accent md:text-5xl">
                                        {stat.value}
                                    </dd>
                                    <span className="text-sm text-muted">{stat.label}</span>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
