import { Experience, NavLink, Project, SkillGroup, SocialLink } from '@/types';

/* -------------------------------------------------------------------------- */
/*  ⚠️  EDIT ME — this file holds 100% of the personal content on the site.     */
/*  Nothing below is hard-coded anywhere else. Values marked TODO are           */
/*  placeholders that should be replaced before the site goes live.             */
/* -------------------------------------------------------------------------- */

export const personal = {
    name: 'Aakash Warke', // TODO: confirm spelling / preferred display name
    firstName: 'Aakash',
    lastName: 'Warke',
    role: 'Full-Stack Developer',
    /** Shown under the hero headline. Keep it to one or two short sentences. */
    tagline:
        'I design and build end-to-end web products — from the data model up to the last pixel of the interface.',
    location: 'India', // TODO: city, country
    email: 'aakashwarke@gmail.com',
    /** Optional. Leave as an empty string to hide it. */
    phone: '',
    /** Put the file in /public and reference it like '/resume.pdf'. */
    resumeUrl: '/resume.pdf',
    /** Years of professional experience, shown in the stats strip. */
    yearsOfExperience: '3+', // TODO
    projectsShipped: '15+', // TODO
    availability: 'Open to new opportunities', // TODO
} as const;

export const seo = {
    title: `${personal.name} — ${personal.role}`,
    description: personal.tagline,
    /** Used for canonical URLs, sitemap and Open Graph. */
    url: 'https://aakashwarke.vercel.app', // TODO: final domain
    ogImage: '/og.png',
    keywords: [
        personal.name,
        'full-stack developer',
        'portfolio',
        'React',
        'Next.js',
        'TypeScript',
        'Node.js',
    ],
};

export const navLinks: NavLink[] = [
    { label: 'Home', href: '#banner' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
];

export const socials: SocialLink[] = [
    { name: 'GitHub', url: 'https://github.com/aakashwarke', icon: 'github' }, // TODO: confirm handle
    { name: 'LinkedIn', url: 'https://linkedin.com/in/aakashwarke', icon: 'linkedin' }, // TODO
    { name: 'X', url: 'https://x.com/aakashwarke', icon: 'twitter' }, // TODO
    { name: 'Email', url: `mailto:${personal.email}`, icon: 'mail' },
];

/** Paragraphs of the About section. Each string renders as its own <p>. */
export const about: string[] = [
    // TODO: rewrite in your own voice.
    `I'm a full-stack developer who likes owning a feature end to end — talking through the problem, shaping the schema, writing the API, and then building an interface that makes the whole thing feel obvious to use.`,
    `Most of my work sits in the TypeScript ecosystem: React and Next.js on the front, Node.js and Postgres behind it, deployed on cloud infrastructure with CI that I actually trust. I care about the unglamorous parts — types that catch mistakes early, migrations that don't lose data, and pages that stay fast on a bad connection.`,
    `Outside of shipping features, I spend time reading other people's codebases, tightening my own tooling, and mentoring developers who are a couple of steps behind me on the same path.`,
];

/** Words that scroll past in the hero marquee. */
export const marqueeWords: string[] = [
    'Full-Stack',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'PostgreSQL',
    'AWS',
    'Docker',
];

export const skillGroups: SkillGroup[] = [
    {
        title: 'Frontend',
        skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit', 'GSAP', 'Framer Motion'],
    },
    {
        title: 'Backend',
        skills: ['Node.js', 'Express', 'NestJS', 'REST', 'GraphQL', 'Python', 'FastAPI'],
    },
    {
        title: 'Data',
        skills: ['PostgreSQL', 'MongoDB', 'Prisma', 'Redis', 'SQL', 'Elasticsearch'],
    },
    {
        title: 'DevOps & Tooling',
        skills: ['Docker', 'AWS', 'GitHub Actions', 'Vercel', 'Nginx', 'Jest', 'Playwright', 'Git'],
    },
];

export const experiences: Experience[] = [
    // TODO: replace with your real roles, in reverse-chronological order.
    {
        company: 'Company Name',
        role: 'Senior Full-Stack Developer',
        from: 'Jan 2024',
        to: 'Present',
        location: 'Remote',
        description:
            'Lead engineer on a customer-facing platform, responsible for the React front end and the Node services behind it.',
        achievements: [
            'Cut median page load from 4.1s to 1.3s by moving the dashboard to server components and adding query-level caching.',
            'Designed and shipped a multi-tenant permissions model now used across every product surface.',
            'Set up CI that runs type checks, unit and end-to-end tests on every pull request, dropping regressions reaching production to near zero.',
        ],
        stack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
    },
    {
        company: 'Previous Company',
        role: 'Full-Stack Developer',
        from: 'Jun 2022',
        to: 'Dec 2023',
        location: 'Pune, India',
        description:
            'Built and maintained internal tools and customer portals for a mid-sized product team.',
        achievements: [
            'Rebuilt the reporting module, replacing hand-written SQL with a typed query layer and cutting support tickets by half.',
            'Introduced a shared component library that three product teams still build on.',
            'Migrated a legacy monolith route-by-route onto a modern stack with no downtime.',
        ],
        stack: ['React', 'Express', 'MongoDB', 'Docker'],
    },
    {
        company: 'First Company',
        role: 'Junior Developer',
        from: 'Jul 2021',
        to: 'May 2022',
        location: 'Pune, India',
        description: 'Started out on the front end and gradually took on backend work.',
        achievements: [
            'Shipped the marketing site and the first version of the customer onboarding flow.',
            'Added the first automated test suite the team had, covering the checkout path.',
        ],
        stack: ['JavaScript', 'React', 'Node.js'],
    },
];

export const projects: Project[] = [
    // TODO: replace with your real projects. `slug` becomes /projects/<slug>.
    {
        slug: 'commerce-platform',
        title: 'Commerce Platform',
        tagline: 'A multi-tenant storefront and admin suite handling live inventory and payments.',
        description: [
            'A full commerce stack built for teams that outgrew off-the-shelf storefronts but do not want to run their own infrastructure. Each tenant gets an isolated catalogue, theme and payment configuration behind a shared control plane.',
            'The interesting engineering problem was inventory: stock has to stay correct while several customers check out the same item at once. Reservations are held in Redis with a short TTL and only committed to Postgres once payment settles, so an abandoned cart releases stock automatically.',
        ],
        year: '2024',
        role: 'Lead developer',
        tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Redis', 'Stripe', 'AWS'],
        highlights: [
            'Serves multiple tenants from one deployment with per-tenant theming and domains.',
            'Race-condition-safe checkout backed by Redis reservations and Postgres transactions.',
            'Admin dashboard with live order and inventory updates over websockets.',
        ],
        thumbnail: '/projects/commerce-platform.svg',
        liveUrl: '',
        sourceUrl: '',
        featured: true,
    },
    {
        slug: 'analytics-dashboard',
        title: 'Analytics Dashboard',
        tagline: 'Self-serve product analytics over a billion-row event table, without the wait.',
        description: [
            'An internal analytics product that lets non-technical teammates build funnels and retention reports without writing SQL. Queries are composed from a typed builder and compiled down to parameterised SQL, so the UI can never emit a query the database cannot plan.',
            'Pre-aggregated rollups run nightly, and the query planner picks between a rollup and the raw event table based on the requested granularity — most reports now return in under a second.',
        ],
        year: '2023',
        role: 'Full-stack developer',
        tech: ['React', 'Node.js', 'ClickHouse', 'Redis', 'Docker', 'D3'],
        highlights: [
            'Visual funnel and retention builder that compiles to safe, parameterised SQL.',
            'Nightly rollups cut median report time from 40s to under 1s.',
            'Shareable, permission-aware report links used daily across the company.',
        ],
        thumbnail: '/projects/analytics-dashboard.svg',
        liveUrl: '',
        sourceUrl: '',
        featured: true,
    },
    {
        slug: 'realtime-collaboration',
        title: 'Realtime Collaboration',
        tagline: 'A collaborative document editor with offline support and conflict-free merges.',
        description: [
            'A document editor where several people can type at once, including while offline. Edits are modelled as CRDT operations, so two clients that have drifted apart converge to the same document when they reconnect — no locking, no "someone else edited this" dialogs.',
            'The sync server is a thin Node process that fans operations out over websockets and persists compacted snapshots, keeping the replay cost bounded as documents grow.',
        ],
        year: '2023',
        role: 'Full-stack developer',
        tech: ['TypeScript', 'React', 'Node.js', 'WebSockets', 'CRDT', 'IndexedDB'],
        highlights: [
            'Conflict-free merges using CRDTs, with full offline editing.',
            'Presence, cursors and comments streamed over a single websocket connection.',
            'Snapshot compaction keeps load time flat as document history grows.',
        ],
        thumbnail: '/projects/realtime-collaboration.svg',
        liveUrl: '',
        sourceUrl: '',
        featured: true,
    },
    {
        slug: 'devops-toolkit',
        title: 'Deploy Toolkit',
        tagline: 'An opinionated CLI that takes a service from an empty repo to a running deployment.',
        description: [
            'A command-line tool that scaffolds a service, wires up CI, provisions the infrastructure and performs zero-downtime deploys, so a new service is production-shaped on day one instead of month three.',
            'Everything it generates is plain, readable configuration that a team can take over and edit — the tool is a starting point, deliberately not a framework you are locked into.',
        ],
        year: '2022',
        role: 'Creator',
        tech: ['Node.js', 'TypeScript', 'Docker', 'Terraform', 'GitHub Actions'],
        highlights: [
            'One command from empty repository to a deployed, monitored service.',
            'Generates readable config the team owns, with no runtime lock-in.',
            'Blue-green deploys with automatic rollback on failed health checks.',
        ],
        thumbnail: '/projects/devops-toolkit.svg',
        liveUrl: '',
        sourceUrl: '',
        featured: false,
    },
];

export const featuredProjects = projects.filter((project) => project.featured);
