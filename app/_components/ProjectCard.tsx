'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/types';
import TransitionLink from '@/components/TransitionLink';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
    project: Project;
    index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
    const isReversed = index % 2 === 1;

    return (
        <article className="project-card group">
            <TransitionLink
                href={`/projects/${project.slug}`}
                className={cn(
                    'grid items-center gap-8 lg:grid-cols-2 lg:gap-16',
                    isReversed && 'lg:[&>*:first-child]:order-2',
                )}
            >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-card">
                    <Image
                        src={project.thumbnail}
                        alt={`${project.title} preview`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
                    />

                    {/* Accent wash that fades in on hover. */}
                    <div
                        aria-hidden
                        className="absolute inset-0 bg-accent/0 transition-colors duration-500 group-hover:bg-accent/10"
                    />
                </div>

                <div>
                    <div className="mb-4 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.25em] text-muted">
                        <span className="text-accent">0{index + 1}</span>
                        <span className="h-px w-8 bg-border" />
                        <span>{project.year}</span>
                        <span className="h-px w-8 bg-border" />
                        <span>{project.role}</span>
                    </div>

                    <h3 className="mb-4 flex items-start gap-3 font-display text-subheading uppercase transition-colors duration-300 group-hover:text-accent">
                        {project.title}
                        <ArrowUpRight
                            aria-hidden
                            className="mt-1 size-6 shrink-0 transition-transform duration-300 ease-smooth group-hover:-translate-y-1 group-hover:translate-x-1"
                        />
                    </h3>

                    <p className="mb-6 max-w-lg leading-relaxed text-muted">{project.tagline}</p>

                    <ul className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 6).map((tech) => (
                            <li
                                key={tech}
                                className="rounded-full border border-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide text-muted"
                            >
                                {tech}
                            </li>
                        ))}
                    </ul>
                </div>
            </TransitionLink>
        </article>
    );
};

export default ProjectCard;
