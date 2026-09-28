export interface SocialLink {
    name: string;
    url: string;
    /** lucide-react icon name, or a custom key handled in components/SocialIcon.tsx */
    icon: 'github' | 'linkedin' | 'twitter' | 'mail' | 'instagram' | 'dribbble';
}

export interface SkillGroup {
    title: string;
    skills: string[];
}

export interface Experience {
    company: string;
    role: string;
    /** e.g. "Jan 2023" */
    from: string;
    /** e.g. "Present" */
    to: string;
    location?: string;
    description: string;
    achievements: string[];
    stack: string[];
}

export interface Project {
    slug: string;
    title: string;
    /** one-line pitch used on the home page card */
    tagline: string;
    /** full write-up used on /projects/[slug] */
    description: string[];
    year: string;
    role: string;
    tech: string[];
    highlights: string[];
    /** paths under /public, or remote URLs allowed in next.config.ts */
    thumbnail: string;
    images?: string[];
    liveUrl?: string;
    sourceUrl?: string;
    featured: boolean;
}

export interface NavLink {
    label: string;
    href: string;
}
