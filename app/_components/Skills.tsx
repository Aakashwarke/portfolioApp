'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { skillGroups } from '@/config/site';
import SectionTitle from '@/components/SectionTitle';

const Skills = () => {
    const rootRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.from('.skill-group', {
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: 'power3.out',
                stagger: 0.12,
                scrollTrigger: { trigger: '.skill-grid', start: 'top 85%' },
            });

            gsap.from('.skill-pill', {
                opacity: 0,
                scale: 0.9,
                duration: 0.4,
                ease: 'back.out(1.6)',
                stagger: 0.02,
                scrollTrigger: { trigger: '.skill-grid', start: 'top 80%' },
            });
        },
        { scope: rootRef },
    );

    return (
        <section id="skills" ref={rootRef} className="section-padding relative">
            <div className="container">
                <SectionTitle eyebrow="02 — Skills" title="What I work with" />

                <div className="skill-grid grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
                    {skillGroups.map((group, index) => (
                        <div key={group.title} className="skill-group bg-background p-8 md:p-10">
                            <div className="mb-6 flex items-baseline gap-3">
                                <span className="font-mono text-xs text-accent">
                                    0{index + 1}
                                </span>
                                <h3 className="font-display text-2xl uppercase">{group.title}</h3>
                            </div>

                            <ul className="flex flex-wrap gap-2">
                                {group.skills.map((skill) => (
                                    <li
                                        key={skill}
                                        className="skill-pill rounded-full border border-border px-4 py-2 text-sm text-muted transition-colors duration-300 hover:border-accent hover:text-accent"
                                    >
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
