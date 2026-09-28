import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        // The placeholder project covers in /public are SVGs we author ourselves.
        // The sandbox + CSP below keep the optimizer from serving anything scriptable.
        dangerouslyAllowSVG: true,
        contentDispositionType: 'attachment',
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        remotePatterns: [
            { protocol: 'https', hostname: 'images.unsplash.com' },
            { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
        ],
    },
};

export default nextConfig;
