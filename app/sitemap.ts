import type { MetadataRoute } from 'next';
import { projects, seo } from '@/config/site';

const sitemap = (): MetadataRoute.Sitemap => {
    const lastModified = new Date();

    return [
        { url: seo.url, lastModified, changeFrequency: 'monthly', priority: 1 },
        ...projects.map((project) => ({
            url: `${seo.url}/projects/${project.slug}`,
            lastModified,
            changeFrequency: 'yearly' as const,
            priority: 0.8,
        })),
    ];
};

export default sitemap;
