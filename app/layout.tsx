import type { Metadata, Viewport } from 'next';
import { Anton, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { personal, seo, socials } from '@/config/site';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Preloader from '@/components/Preloader';
import CustomCursor from '@/components/CustomCursor';
import SmoothScroll from '@/components/SmoothScroll';
import ScrollProgressIndicator from '@/components/ScrollProgressIndicator';
import StickyEmail from '@/components/StickyEmail';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-sans',
    display: 'swap',
});

const anton = Anton({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-display',
    display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-mono',
    display: 'swap',
});

export const metadata: Metadata = {
    metadataBase: new URL(seo.url),
    title: {
        default: seo.title,
        template: `%s — ${personal.name}`,
    },
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: personal.name, url: seo.url }],
    creator: personal.name,
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: seo.url,
        title: seo.title,
        description: seo.description,
        siteName: personal.name,
        // Open Graph image comes from app/opengraph-image.tsx via the file convention.
    },
    twitter: {
        card: 'summary_large_image',
        title: seo.title,
        description: seo.description,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
};

export const viewport: Viewport = {
    themeColor: '#0a0a0a',
    width: 'device-width',
    initialScale: 1,
};

const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personal.name,
    jobTitle: personal.role,
    email: `mailto:${personal.email}`,
    url: seo.url,
    sameAs: socials.filter((social) => social.icon !== 'mail').map((social) => social.url),
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
    <html lang="en" className={`${inter.variable} ${anton.variable} ${jetbrainsMono.variable}`}>
        <body className="grain">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />

            <Preloader />
            <SmoothScroll />
            <CustomCursor />
            <ScrollProgressIndicator />

            <Navbar />
            <StickyEmail />

            {children}

            <Footer />
        </body>
    </html>
);

export default RootLayout;
