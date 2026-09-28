import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { projects, seo } from '@/config/site';
import Button from '@/components/Button';
import TransitionLink from '@/components/TransitionLink';
import RevealOnScroll from '@/components/RevealOnScroll';

interface PageProps {
    // Next 15 hands route params over as a promise.
    params: Promise<{ slug: string }>;
}

export const generateStaticParams = () => projects.map((project) => ({ slug: project.slug }));

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
    const { slug } = await params;
    const project = projects.find((item) => item.slug === slug);

    if (!project) return { title: 'Project not found' };

    return {
        title: project.title,
        description: project.tagline,
        openGraph: {
            title: project.title,
            description: project.tagline,
            url: `${seo.url}/projects/${project.slug}`,
            images: [{ url: project.thumbnail, alt: project.title }],
        },
    };
};

const ProjectPage = async ({ params }: PageProps) => {
    const { slug } = await params;
    const project = projects.find((item) => item.slug === slug);

    if (!project) notFound();

    const currentIndex = projects.findIndex((item) => item.slug === slug);
    const nextProject = projects[(currentIndex + 1) % projects.length];

    return (
        <main className="pt-32 md:pt-40">
            <article className="container">
                <TransitionLink
                    href="/#projects"
                    className="mb-12 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-muted transition-colors hover:text-accent"
                >
                    <ArrowLeft className="size-4" aria-hidden />
                    All projects
                </TransitionLink>

                <header className="mb-14">
                    <div className="mb-6 flex flex-wrap items-center gap-4 font-mono text-xs uppercase tracking-[0.25em] text-muted">
                        <span className="text-accent">{project.year}</span>
                        <span className="h-px w-8 bg-border" />
                        <span>{project.role}</span>
                    </div>

                    <h1 className="mb-6 font-display text-heading uppercase leading-none">
                        {project.title}
                    </h1>

                    <p className="max-w-2xl text-lg leading-relaxed text-muted">{project.tagline}</p>

                    {(project.liveUrl || project.sourceUrl) && (
                        <div className="mt-8 flex flex-wrap gap-4">
                            {project.liveUrl && (
                                <Button href={project.liveUrl} external withArrow>
                                    Live site
                                </Button>
                            )}
                            {project.sourceUrl && (
                                <Button href={project.sourceUrl} external variant="outline">
                                    <Github className="size-4" aria-hidden />
                                    Source
                                </Button>
                            )}
                        </div>
                    )}
                </header>

                <div className="relative mb-20 aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-card">
                    <Image
                        src={project.thumbnail}
                        alt={`${project.title} cover`}
                        fill
                        priority
                        sizes="(max-width: 1280px) 100vw, 1280px"
                        className="object-cover"
                    />
                </div>

                <div className="grid gap-16 lg:grid-cols-[1.6fr_1fr] lg:gap-24">
                    <RevealOnScroll className="space-y-6">
                        <h2 className="font-display text-2xl uppercase">Overview</h2>
                        {project.description.map((paragraph, index) => (
                            <p key={index} className="leading-relaxed text-muted">
                                {paragraph}
                            </p>
                        ))}

                        <h2 className="pt-6 font-display text-2xl uppercase">Highlights</h2>
                        <ul className="space-y-3">
                            {project.highlights.map((highlight, index) => (
                                <li key={index} className="flex gap-3 leading-relaxed text-muted">
                                    <span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-accent" />
                                    {highlight}
                                </li>
                            ))}
                        </ul>
                    </RevealOnScroll>

                    <RevealOnScroll delay={0.1}>
                        <aside className="sticky top-32 space-y-8 rounded-2xl border border-border bg-card p-8">
                            <div>
                                <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">
                                    Built with
                                </h2>
                                <ul className="flex flex-wrap gap-2">
                                    {project.tech.map((tech) => (
                                        <li
                                            key={tech}
                                            className="rounded-full border border-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide text-muted"
                                        >
                                            {tech}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <dl className="space-y-4 border-t border-border pt-6 text-sm">
                                <div className="flex justify-between gap-4">
                                    <dt className="text-muted">Year</dt>
                                    <dd>{project.year}</dd>
                                </div>
                                <div className="flex justify-between gap-4">
                                    <dt className="text-muted">Role</dt>
                                    <dd>{project.role}</dd>
                                </div>
                            </dl>

                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
                                >
                                    Visit project
                                    <ExternalLink className="size-4" aria-hidden />
                                </a>
                            )}
                        </aside>
                    </RevealOnScroll>
                </div>

                {project.images && project.images.length > 0 && (
                    <div className="mt-20 grid gap-6 md:grid-cols-2">
                        {project.images.map((image, index) => (
                            <div
                                key={image}
                                className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-card"
                            >
                                <Image
                                    src={image}
                                    alt={`${project.title} screenshot ${index + 1}`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </article>

            <section className="section-padding mt-10 border-t border-border">
                <div className="container">
                    <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">
                        Next project
                    </p>
                    <TransitionLink
                        href={`/projects/${nextProject.slug}`}
                        className="group inline-block font-display text-heading uppercase leading-none transition-colors hover:text-accent"
                    >
                        {nextProject.title}
                    </TransitionLink>
                </div>
            </section>
        </main>
    );
};

export default ProjectPage;
