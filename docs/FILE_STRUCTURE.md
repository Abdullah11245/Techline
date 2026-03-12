# Tech Line Website - File Structure Reference

```
Tech Line/
│
├── 📄 Configuration Files (Root Level)
│   ├── package.json                 ← Dependencies and npm scripts
│   ├── tsconfig.json                ← TypeScript configuration
│   ├── vite.config.ts               ← Build configuration
│   ├── tailwind.config.js           ← Tailwind CSS theme
│   ├── postcss.config.js            ← CSS processing
│   ├── .eslintrc.cjs                ← Code linting rules
│   ├── .env.example                 ← Environment variables template
│   ├── .gitignore                   ← Git ignore rules
│   └── index.html                   ← HTML entry point
│
├── 📁 src/                          ← Source code (TypeScript/React)
│   │
│   ├── 📄 main.tsx                  ← App entry point (renders Root)
│   ├── 📄 App.tsx                   ← Router setup with all routes
│   ├── 📄 index.css                 ← Global styles (Tailwind)
│   │
│   ├── 📁 components/               ← Reusable UI components
│   │   ├── Button.tsx               ← Button with variants
│   │   ├── Section.tsx              ← Section wrapper with animations
│   │   ├── Header.tsx               ← Sticky navigation header
│   │   ├── Footer.tsx               ← Footer with sitemap
│   │   ├── MobileCtaBar.tsx         ← Fixed mobile CTA bar
│   │   ├── LeadForm.tsx             ← Contact form with validation
│   │   ├── FeatureCard.tsx          ← Service feature cards
│   │   ├── CtaBand.tsx              ← Full-width CTA sections
│   │   ├── LogoGrid.tsx             ← Logo/certification grids
│   │   ├── SlaTable.tsx             ← SLA pricing table
│   │   └── FaqAccordion.tsx         ← FAQ accordion
│   │
│   ├── 📁 layouts/                  ← Layout wrappers
│   │   └── RootLayout.tsx           ← Main app layout (Header + Outlet + Footer)
│   │
│   ├── 📁 pages/                    ← Page components
│   │   ├── Home.tsx                 ← Homepage (/
│   │   ├── About.tsx                ← About page (/about)
│   │   ├── Contact.tsx              ← Contact page (/contact)
│   │   ├── ThankYou.tsx             ← Success page (/thank-you)
│   │   ├── Privacy.tsx              ← Privacy policy (/privacy)
│   │   └── 📁 services/             ← Service detail pages
│   │       ├── ItSupport.tsx        ← IT Support (/services/it-support-infrastructure)
│   │       ├── CyberSecurity.tsx    ← Cyber Security (/services/cyber-security)
│   │       ├── Bcdr.tsx             ← Backup & BCDR (/services/backup-business-continuity)
│   │       ├── Microsoft365.tsx     ← Microsoft 365 (/services/microsoft-365-collaboration)
│   │       ├── Telecom.tsx          ← Telecom (/services/telecom-cloud-telephony)
│   │       └── DigitalServices.tsx  ← Digital Services (/services/digital-services)
│   │
│   ├── 📁 data/                     ← Content & configuration data
│   │   ├── site.ts                  ← Company info, navigation, footer links
│   │   ├── services.ts              ← Service categories and feature lists
│   │   ├── faqs.ts                  ← FAQ content organized by category
│   │   └── slas.ts                  ← SLA tiers and pricing
│   │
│   └── 📁 utils/                    ← Utility functions
│       ├── seo.ts                   ← Meta tags, JSON-LD schema management
│       └── form.ts                  ← Form submission handler (API + mailto fallback)
│
├── 📁 public/                       ← Static assets
│   ├── logo.svg                     ← Brand logo (UPDATE THIS)
│   ├── hero-bg.jpg                  ← Hero background image (UPDATE THIS)
│   ├── client-logo-1.png            ← Client 1 logo (UPDATE - 6 total)
│   ├── client-logo-2.png
│   ├── client-logo-3.png
│   ├── client-logo-4.png
│   ├── client-logo-5.png
│   ├── client-logo-6.png
│   ├── iso-27001-badge.png          ← ISO certification badge
│   ├── iso-9001-badge.png           ← ISO 9001 badge
│   ├── compliance-badge.png         ← GDPR compliance badge
│   ├── security-badge.png           ← Security partner badge
│   ├── robots.txt                   ← SEO robots rules
│   └── sitemap.xml                  ← Generated via npm script
│
├── 📁 scripts/                      ← Build & setup scripts
│   ├── generate-sitemap.js          ← Create sitemap.xml
│   ├── setup.sh                     ← Setup script (macOS/Linux)
│   └── setup.bat                    ← Setup script (Windows)
│
├── 📁 .github/                      ← GitHub config (optional)
│   └── prompts/                     ← Documentation prompts
│       └── plan-techLineWebsite.prompt.md
│
└── 📄 Documentation Files
    ├── README.md                    ← Full project documentation
    ├── GETTING_STARTED.md           ← Step-by-step customization guide
    ├── DEPLOYMENT_CHECKLIST.md      ← Pre-deployment verification
    ├── IMPLEMENTATION_SUMMARY.md    ← This project overview
    └── FILE_STRUCTURE.md            ← This file

```

## Key Files to Customize

### 🔥 High Priority (Update First)
1. `public/logo.svg` - Your brand logo
2. `public/hero-bg.jpg` - Hero section background
3. `src/data/site.ts` - Phone, email, company details
4. `.env.local` - Environment variables
5. `public/` - All client logos and certification badges

### 📝 Content Updates (Customize)
1. `src/data/services.ts` - Service descriptions
2. `src/data/faqs.ts` - FAQ content
3. `src/data/slas.ts` - SLA pricing
4. `src/pages/About.tsx` - Company information
5. `src/pages/services/*.tsx` - Service page copy

### 🎨 Theme & Style (Optional)
1. `src/index.css` - CSS variables for colors
2. `tailwind.config.js` - Tailwind theme customization
3. `src/components/*.tsx` - Component styling

### 🔧 Configuration (If Needed)
1. `vite.config.ts` - Build settings
2. `package.json` - Dependencies
3. `.env.local` - API endpoints and secrets

---

## How to Use This Structure

### Adding New Content
1. Add new FAQ: Edit `src/data/faqs.ts`
2. Add new service: Edit `src/data/services.ts` + create page in `src/pages/services/`
3. Update pricing: Edit `src/data/slas.ts`
4. Update company info: Edit `src/data/site.ts`

### Adding New Pages
1. Create file in `src/pages/MyPage.tsx`
2. Add route to `src/App.tsx`
3. Update navigation in `src/data/site.ts` if needed

### Styling
- Global styles: `src/index.css`
- Component styles: Tailwind classes directly in components
- Colors: CSS variables in `src/index.css`
- Custom theme: `tailwind.config.js`

### Images
- All images in `public/` folder
- Reference as `/image-name.png` in code
- Optimize external images before adding

---

## Development Workflow

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
# → Opens http://localhost:5173 with hot reload

# 3. Make changes to files
# → Changes auto-reload in browser

# 4. Build for production
npm run build
# → Creates optimized files in dist/

# 5. Preview production build locally
npm run preview
# → Tests production build before deploying

# 6. Deploy dist/ folder to Hostinger
# → Upload contents to public_html/

# 7. Verify live site
# → Visit https://tline.ie
```

---

## Important Notes

- **Path Aliases**: Use `@components`, `@pages`, `@data`, `@utils` for clean imports
- **Environment Variables**: Copy `.env.example` to `.env.local` and update
- **Placeholder Images**: All images in `public/` are placeholders - replace with real assets
- **Type Safety**: Full TypeScript - all files have proper types
- **Accessibility**: All components follow WCAG AA standards

---

Last Updated: March 2, 2026
