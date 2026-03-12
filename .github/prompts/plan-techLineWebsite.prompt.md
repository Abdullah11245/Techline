## Plan: Production Tech Line Website Build (Vite + React + Tailwind)

**TL;DR:** Scaffold a Vite+React18 project from scratch with full TypeScript support, configure Tailwind with custom brand colors, build a 9-page website using React Router v6 with motion-heavy animations, implement a sticky header and mobile CTA bars, create a lead form with mailto fallback, and provide optional Node/Express email handler. Deliver static-ready build optimized for Hostinger Cloud Startup.

### Steps

1. **Scaffold Vite project** with React 18, TypeScript, ESLint, Babel, and Terser; create root `package.json`, `vite.config.ts`, `tsconfig.json`, `.eslintrc.cjs`, and `index.html`.

2. **Configure Tailwind CSS** with custom theme using CSS variables for brand colors (`#004b6a` primary, `#3eaf47` accent); set up base styles, globals, and white background default.

3. **Set up React Router v6** with outlet-based layout structure; create [main layout component](src/layouts/RootLayout.tsx) with header, footer, and route definitions in `src/App.tsx`.

4. **Build core layout components:**
   - [Header with sticky positioning](src/components/Header.tsx) (logo, nav, sticky phone + "Book assessment" CTA on desktop)
   - [Footer](src/components/Footer.tsx) (full sitemap, contact info, social placeholders)
   - [Mobile sticky CTA bar](src/components/MobileCtaBar.tsx) (bottom bar with Call + Book buttons)
   - [Section wrapper](src/components/Section.tsx) with motion entrance animations

5. **Create reusable UI primitives:**
   - [Button component](src/components/Button.tsx) (variant system: primary, secondary, ghost; sizes)
   - [FeatureCard](src/components/FeatureCard.tsx) with hover lift + spring animations
   - [CTA band](src/components/CtaBand.tsx) with staggered content
   - [LeadForm](src/components/LeadForm.tsx) (Name, Company, Email, Phone, Service dropdown, Message) with validation, loading state, success/error toasts
   - [LogoGrid](src/components/LogoGrid.tsx) (carousel/grid for client logos + certifications)
   - [SLA/Pricing Table](src/components/SlaTable.tsx) (3 tiers: Standard, Priority, Premium)
   - [FAQ Accordion](src/components/FaqAccordion.tsx) using Radix Accordion

6. **Build data-driven structure:**
   - [src/data/site.ts](src/data/site.ts) (company name, phone, email, service area)
   - [src/data/services.ts](src/data/services.ts) (6 service categories with bullet items)
   - [src/data/faqs.ts](src/data/faqs.ts) (6–8 FAQ items)
   - [src/data/slas.ts](src/data/slas.ts) (3 SLA tiers with response times)

7. **Implement 9 pages:**
   - [/ (Home)](src/pages/Home.tsx) with hero, 3-path decision tree cards, "How we work" timeline, trust section (logos + certifications), CTA band, FAQ preview
   - [/services/it-support-infrastructure](src/pages/services/ItSupport.tsx)
   - [/services/cyber-security](src/pages/services/CyberSecurity.tsx) with ISO 27001 emphasis
   - [/services/backup-business-continuity](src/pages/services/Bcdr.tsx)
   - [/services/microsoft-365-collaboration](src/pages/services/Microsoft365.tsx)
   - [/services/telecom-cloud-telephony](src/pages/services/Telecom.tsx)
   - [/services/digital-services](src/pages/services/DigitalServices.tsx)
   - [/about](src/pages/About.tsx)
   - [/contact](src/pages/Contact.tsx) (lead form focused)
   - [/thank-you](src/pages/ThankYou.tsx) (next steps + lead nurture CTA)

8. **Implement motion & accessibility:**
   - Use Framer Motion for animated headlines, section scroll entrances, card hovers, button transitions
   - Respect `prefers-reduced-motion` media query; disable animations for users who opt-in
   - Add Radix UI for accessible menus, dialogs, accordions with proper ARIA labels and focus states
   - Ensure keyboard navigation throughout

9. **Set up SEO & performance:**
   - Create SEO utility function (meta tags, OG, JSON-LD Organization + LocalBusiness)
   - Add per-page meta descriptions and titles
   - Create [robots.txt template](public/robots.txt) and [sitemap.xml generator script](scripts/generate-sitemap.ts)
   - Enable route-based code splitting (React.lazy + Suspense for service pages)
   - Optimize images (store in `public/`, reference from components)

10. **Implement form submission pipeline:**
    - LeadForm validates inputs, shows inline errors and loading state
    - On submit: attempt POST to `VITE_CONTACT_ENDPOINT` (JSON body: name, company, email, phone, service, message)
    - If endpoint missing or fails: fallback to `mailto:` with encoded subject/body using `VITE_CONTACT_EMAIL`
    - On success: navigate to `/thank-you` and show success toast
    - Store placeholder `.env.example` for `VITE_CONTACT_ENDPOINT`, `VITE_CONTACT_EMAIL`, `VITE_PHONE_NUMBER`

11. **Create optional Node/Express email handler:**
    - [/server/index.ts](server/index.ts) (Express + nodemailer or Microsoft Graph API for SMTP via Microsoft 365)
    - Single `/api/contact` POST endpoint accepting form JSON
    - Response: `{ success: true, message: "Email sent" }` or error
    - Document both SMTP and Graph API approaches; implement simplest (SMTP via nodemailer)
    - Keep optional; static build alone should function

12. **Set up build & deployment:**
    - Create [.env.example](.env.example) with placeholder values
    - Create [.gitignore](.gitignore)
    - Add npm scripts: `dev`, `build`, `preview`, `lint`, `type-check`
    - Create [README.md](README.md) with:
      - Project overview
      - Tech stack
      - Development setup (install, `npm run dev`)
      - Build for Hostinger (npm run build; deploy `dist/` folder)
      - Environment variables explained
      - Optional server setup (if using email handler)
      - SEO checklist (replace placeholders, generate sitemap)

13. **Create placeholder assets** in `public/`:**
    - `logo.svg` or `logo.png` (Tech Line branding)
    - `hero-bg.jpg` (background for hero section)
    - `client-logo-1.png`, `client-logo-2.png`, etc. (5–6 placeholder client logos)
    - `iso-27001-badge.png`, `compliance-badge.png` (certification placeholders)
    - Fallback icons/SVGs for services (use Lucide icons where applicable)

### Further Considerations

1. **Form submission strategy:** Should we implement the optional Node/Express server initially, or start with mailto-only fallback and document server as optional add-on? Recommendation: **Start with mailto fallback** (no backend needed for initial static deployment); provide optional server code as documented add-on.

2. **Styling approach:** Shall we use CSS-in-JS with Tailwind utilities, or pure Tailwind class-based styling? Recommendation: **Pure Tailwind** (no Styled Components) for performance and simplicity; use CSS variables for brand colors in tailwind.config.

3. **Animation scope:** Motion-heavy as specified—should animations on service pages be full-page scroll triggers, or lighter entrance animations? Recommendation: **Scroll-triggered staggered animations** for section cards; button/nav animations always on (no prefers-reduced-motion bypass for micro-interactions, but full respect for layout animations).

4. **Image optimization:** Should we include an image optimization library (e.g., `vite-plugin-image-optimization`), or rely on manual optimization + `<img>` tags? Recommendation: **Manual optimization** for now; document best practices in README; can add plugin later if needed.

5. **TypeScript strictness:** Should we enable strict mode in `tsconfig.json`? Recommendation: **Yes, strict: true** for production readiness; this improves maintainability.

6. **Deployment checklist:** Before final build for Hostinger, should we include a pre-build validation script (e.g., check for missing .env vars, validate meta tags)? Recommendation: **Document in README**; implement as optional npm script `type-check` + `lint`.

### Decision Points

- [ ] Proceed with mailto fallback form (no server initially)?
- [ ] Any adjustments to animation scope or styling approach?
- [ ] Any additional service items or copy changes before implementation?
