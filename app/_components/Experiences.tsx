'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { MapPin } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import { experiences } from '@/config/site';
import SectionTitle from '@/components/SectionTitle';

const Experiences = () => {
    const rootRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            // The timeline spine draws itself as the section scrolls past.
            gsap.from('.timeline-spine', {
                scaleY: 0,
                transformOrigin: 'top center',
                ease: 'none',
                scrollTrigger: {
                    trigger: '.timeline',
                    start: 'top 70%',
                    end: 'bottom 80%',
                    scrub: 0.6,
                },
            });

            gsap.utils.toArray<HTMLElement>('.timeline-item').forEach((item) => {
                gsap.from(item, {
                    opacity: 0,
                    y: 48,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: item, start: 'top 85%' },
                });

                gsap.from(item.querySelector('.timeline-dot'), {
                    scale: 0,
                    duration: 0.5,
                    ease: 'back.out(2)',
                    scrollTrigger: { trigger: item, start: 'top 85%' },
                });
            });
        },
        { scope: rootRef },
    );

    return (
        <section id="experience" ref={rootRef} className="section-padding relative">
            <div className="container">
                <SectionTitle eyebrow="03 — Experience" title="Where I've worked" />

                <div className="timeline relative pl-8 md:pl-12">
                    <span
                        aria-hidden
                        className="timeline-spine absolute bottom-2 left-0 top-2 w-px bg-gradient-to-b from-accent via-border to-transparent md:left-1"
                    />

                    <ol className="space-y-16">
                        {experiences.map((experience) => (
                            <li key={`${experience.company}-${experience.from}`} className="timeline-item relative">
                                <span
                                    aria-hidden
                                    className="timeline-dot absolute -left-8 top-2 size-3 rounded-full border-2 border-accent bg-background md:-left-[3.1rem]"
                                />

                                <div className="mb-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                                    <h3 className="font-display text-2xl uppercase md:text-3xl">
                                        {experience.role}
                                    </h3>
                                    <span className="text-accent">@ {experience.company}</span>
                                </div>

                                <div className="mb-5 flex flex-wrap items-center gap-4 font-mono text-xs uppercase tracking-[0.15em] text-muted">
                                    <span>
                                        {experience.from} — {experience.to}
                                    </span>
                                    {experience.location && (
                                        <span className="inline-flex items-center gap-1.5">
                                            <MapPin className="size-3.5" aria-hidden />
                                            {experience.location}
                                        </span>
                                    )}
                                </div>

                                <p className="mb-5 max-w-2xl text-muted">{experience.description}</p>

                                <ul className="mb-6 space-y-2.5">
                                    {experience.achievements.map((achievement, index) => (
                                        <li key={index} className="flex gap-3 text-sm leading-relaxed text-muted">
                                            <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                                            {achievement}
                                        </li>
                                    ))}
                                </ul>

                                <ul className="flex flex-wrap gap-2">
                                    {experience.stack.map((item) => (
                                        <li
                                            key={item}
                                            className="rounded-full bg-card px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide text-muted"
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
};

export default Experiences;
