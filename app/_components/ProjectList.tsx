'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { projects } from '@/config/site';
import SectionTitle from '@/components/SectionTitle';
import ProjectCard from './ProjectCard';

const ProjectList = () => {
    const rootRef = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.utils.toArray<HTMLElement>('.project-card').forEach((card) => {
                gsap.from(card, {
                    opacity: 0,
                    y: 64,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: card, start: 'top 82%' },
                });
            });
        },
        { scope: rootRef },
    );

    return (
        <section id="projects" ref={rootRef} className="section-padding relative">
            <div className="container">
                <SectionTitle eyebrow="04 — Work" title="Selected projects" />

                <div className="space-y-24 md:space-y-32">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.slug} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectList;
