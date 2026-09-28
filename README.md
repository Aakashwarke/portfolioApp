# Portfolio

A dark, animation-led personal portfolio built with Next.js 15, TypeScript, Tailwind CSS and GSAP.

The design takes its cues from [Tajmirul/portfolio-2.0](https://github.com/Tajmirul/portfolio-2.0)
([tajmirul.site](https://tajmirul.site)) — the oversized display type, the lime-on-near-black
palette, the preloader and the sticky email rail. The implementation here is written from
scratch; credit for the original design direction belongs to Tajmirul.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router, React 19) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 3.4 with CSS-variable theming |
| Animation | GSAP 3 + ScrollTrigger, `@gsap/react` |
| Smooth scroll | Lenis, driven from the GSAP ticker |
| Icons | lucide-react, plus inline brand marks |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
npm run lint
```

## Editing your content

**Everything personal lives in [`config/site.ts`](config/site.ts).** No copy, link or project
detail is hard-coded in a component, so that one file is the only thing you need to touch:

| Export | What it drives |
| --- | --- |
| `personal` | Name, role, tagline, location, email, résumé link, the three stat figures |
| `seo` | Page title, description, canonical URL, keywords |
| `navLinks` | Navbar and footer navigation |
| `socials` | Social links in the hero, mobile menu, contact section and footer |
| `about` | About paragraphs (one string per `<p>`) |
| `marqueeWords` | The scrolling strip under the hero |
| `skillGroups` | The four skill cards |
| `experiences` | The experience timeline |
| `projects` | Project cards **and** their `/projects/<slug>` detail pages |

Values commented `// TODO` are placeholders — replace them before going live.

### Assets to add

- `public/resume.pdf` — the "Download résumé" button points here.
- `public/projects/<slug>.svg|png|jpg` — project covers. Four generated placeholders ship in
  `public/projects/`; swap them for real screenshots and update `thumbnail` in `config/site.ts`.
- The Open Graph image is generated at build time from your content by
  [`app/opengraph-image.tsx`](app/opengraph-image.tsx) — no static file to keep in sync.

## Structure

```
app/
  _components/      home page sections (Banner, AboutMe, Skills, Experiences, ProjectList, Contact)
  projects/[slug]/  statically generated project detail pages
  layout.tsx        fonts, metadata, JSON-LD, global chrome
  template.tsx      per-navigation page transition
  opengraph-image.tsx
components/         shared UI (Navbar, Footer, Preloader, CustomCursor, SmoothScroll, …)
config/site.ts      ← all personal content
lib/                gsap registration, Lenis handle, class-name helper
types/              shared TypeScript types
```

## Theming

Colors are CSS variables on `:root` in [`app/globals.css`](app/globals.css), exposed to Tailwind
as `background`, `foreground`, `accent`, `muted`, `border` and `card`. To change the accent from
lime to anything else, edit `--accent` — every component follows.

Note that GSAP cannot parse `hsl(var(--x))`, so any tween that animates a themed color must
resolve the variable first (see `themeColor()` in `components/CustomCursor.tsx`).

## Accessibility and motion

- Every entrance animation is decorative; content renders without JavaScript.
- `prefers-reduced-motion: reduce` collapses transitions and disables Lenis, falling back to
  native scrolling.
- The custom cursor only activates for fine pointers and is hidden on touch devices.

## Deploying to Vercel

Push the repository, import it at [vercel.com/new](https://vercel.com/new), and accept the
detected Next.js defaults — no environment variables are required. Set `seo.url` in
`config/site.ts` to the final domain so canonical URLs, the sitemap and Open Graph tags are right.
