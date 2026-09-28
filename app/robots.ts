import type { MetadataRoute } from 'next';
import { seo } from '@/config/site';

const robots = (): MetadataRoute.Robots => ({
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${seo.url}/sitemap.xml`,
});

export default robots;
