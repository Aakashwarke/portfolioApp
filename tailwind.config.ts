import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './config/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        container: {
            center: true,
            padding: { DEFAULT: '1.25rem', lg: '2.5rem' },
            screens: { '2xl': '1280px' },
        },
        extend: {
            colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                accent: 'hsl(var(--accent))',
                muted: 'hsl(var(--muted))',
                border: 'hsl(var(--border))',
                card: 'hsl(var(--card))',
            },
            fontFamily: {
                sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
                display: ['var(--font-display)', 'Impact', 'sans-serif'],
                mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
            },
            fontSize: {
                // fluid display sizes used by the hero and section titles
                display: ['clamp(3rem, 12vw, 11rem)', { lineHeight: '0.88', letterSpacing: '-0.02em' }],
                heading: ['clamp(2.25rem, 6vw, 5rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
                subheading: ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.1' }],
            },
            keyframes: {
                marquee: {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(-50%)' },
                },
                'spin-slow': {
                    from: { transform: 'rotate(0deg)' },
                    to: { transform: 'rotate(360deg)' },
                },
                blink: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0' },
                },
            },
            animation: {
                marquee: 'marquee var(--marquee-duration, 30s) linear infinite',
                'spin-slow': 'spin-slow 14s linear infinite',
                blink: 'blink 1s step-end infinite',
            },
            transitionTimingFunction: {
                smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
};

export default config;
