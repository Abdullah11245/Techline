# Tech Line Website - Getting Started Guide

Welcome to the Tech Line website project! This guide will help you get up and running in minutes.

## Prerequisites

- **Node.js 18+** ([Download](https://nodejs.org))
- **npm** (comes with Node.js)
- A text editor (VS Code recommended)
- Git (optional, for version control)

## Quick Setup (1 minute)

### Windows
```bash
cd "Tech Line"
scripts\setup.bat
```

### macOS/Linux
```bash
cd "Tech Line"
chmod +x scripts/setup.sh
./scripts/setup.sh
```

Or manually:
```bash
npm install
cp .env.example .env.local
```

## Development

Start the development server:
```bash
npm run dev
```

Open your browser to `http://localhost:5173` - changes save automatically with hot reload.

## Understanding the Project

### Folder Structure
```
src/
├── components/      # Reusable UI components (Button, FeatureCard, etc.)
├── pages/          # Page components (Home, About, services, etc.)
├── layouts/        # Layout wrapper (Header, Footer)
├── data/           # Content & configuration (site config, services, FAQs, SLAs)
├── utils/          # Helper functions (SEO, form submission)
├── App.tsx         # Main router setup
├── main.tsx        # Entry point
└── index.css       # Global styles (Tailwind)

public/
└── [images, logos, icons]

```

### Key Configuration Files

1. **`src/data/site.ts`** - Company info, navigation, footer links
2. **`src/data/services.ts`** - Service categories and descriptions
3. **`src/data/faqs.ts`** - FAQ content
4. **`src/data/slas.ts`** - SLA tiers and pricing
5. **`.env.local`** - Environment variables (phone, email, API endpoint)
6. **`tailwind.config.js`** - Tailwind customization
7. **`vite.config.ts`** - Vite build configuration

## Making Changes

### Update Company Information

Edit `src/data/site.ts`:
```typescript
export const siteConfig = {
  name: 'Tech Line',
  phone: '+353 (0)123 456 789',  // Update this
  email: 'info@tline.ie',      // Update this
  // ... more config
};
```

### Add/Edit Services

Edit `src/data/services.ts`:
```typescript
export const services: Record<string, Service> = {
  'my-service': {
    id: 'my-service',
    title: 'Service Title',
    description: 'Short description',
    items: ['Item 1', 'Item 2', 'Item 3'],
  },
};
```

### Update FAQs

Edit `src/data/faqs.ts`:
```typescript
export const faqs: FAQ[] = [
  {
    id: 'faq-1',
    category: 'general',
    question: 'Your question?',
    answer: 'Your answer here.',
  },
];
```

### Update SLA Pricing

Edit `src/data/slas.ts`:
```typescript
export const slas: SLA[] = [
  {
    id: 'standard',
    name: 'Standard',
    description: '...',
    responseTime: '8 hours',
    features: ['Feature 1', 'Feature 2'],
    price: 'From €299/month',
  },
];
```

### Replace Brand Assets

1. Go to `/public/` folder
2. Replace `logo.svg` with your logo
3. Replace `hero-bg.jpg` with your hero image
4. Replace client logos (client-logo-*.png)
5. Replace certification badges

### Edit Pages

All pages are in `src/pages/`:
- `Home.tsx` - Homepage with hero, sections, CTAs
- `services/*.tsx` - Service detail pages
- `About.tsx` - About page
- `Contact.tsx` - Contact page with form
- `ThankYou.tsx` - Success page after form
- `Privacy.tsx` - Privacy policy

Pages use the same layout structure:
1. Hero section with `<Section>`
2. Content sections with `<Section>`
3. CTA bands with `<CtaBand>`
4. FAQ sections with `<FaqAccordion>`

Example:
```typescript
<Section darkBg className="py-24">
  <h2>My Section</h2>
  <p>Content here</p>
</Section>
```

### Customize Colors

Edit `src/index.css`:
```css
:root {
  --color-primary: 211 63 100%;    /* Hue Saturation Lightness */
  --color-accent: 135 47 50%;
}
```

Or edit `tailwind.config.js` for Tailwind color palette.

## Building for Production

```bash
npm run build
```

This creates optimized files in the `dist/` folder. These are what you upload to Hostinger.

## Testing Before Deploy

```bash
npm run preview
```

This runs the production build locally so you can test it.

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

```env
# Optional: Backend form endpoint (if using API instead of mailto)
VITE_CONTACT_ENDPOINT=

# Email for form fallback (mailto)
VITE_CONTACT_EMAIL=info@tline.ie

# Phone number displayed throughout site
VITE_PHONE_NUMBER=+353 (0)XX XXX XXXX
```

### Form Submission Options

**Option 1: Email Fallback (Default - No backend needed)**
- Just leave `VITE_CONTACT_ENDPOINT` empty
- Form opens user's email client with pre-filled email

**Option 2: Custom Backend API**
- Set `VITE_CONTACT_ENDPOINT` to your API URL
- API must accept POST with JSON body:
  ```json
  {
    "name": "...",
    "company": "...",
    "email": "...",
    "phone": "...",
    "service": "...",
    "message": "..."
  }
  ```
- API should return: `{ success: true, message: "..." }`

## Styling

### Tailwind CSS

The site uses Tailwind for styling. Common utilities:

```html
<!-- Spacing -->
<div className="p-4">Padding</div>
<div className="mt-6">Margin top</div>

<!-- Colors -->
<div className="text-primary-600">Text color</div>
<div className="bg-accent-500">Background</div>

<!-- Responsive -->
<div className="md:grid md:grid-cols-2">
  Responsive grid
</div>

<!-- States -->
<button className="hover:bg-primary-600 focus:ring-2">Button</button>
```

Reference: https://tailwindcss.com/docs

### Components

Pre-built components available in `src/components/`:

```typescript
import { Button } from '@components/Button';
import { Section } from '@components/Section';
import { FeatureCard } from '@components/FeatureCard';
import { CtaBand } from '@components/CtaBand';
import { LeadForm } from '@components/LeadForm';
import { FaqAccordion } from '@components/FaqAccordion';
```

## Animation & Motion

Uses Framer Motion for smooth animations. Examples:

```typescript
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Animated content
</motion.div>
```

Animations automatically respect `prefers-reduced-motion` for accessibility.

## Common Tasks

### Add a New Service Page

1. Create `src/pages/services/MyService.tsx`
2. Add to `services` object in `src/data/services.ts`
3. Import and add route in `src/App.tsx`
4. Update navigation/footer in `src/data/site.ts`

### Change Brand Colors

Update CSS variables in `src/index.css`:
```css
:root {
  --color-primary: 211 63 100%;    /* Your new primary */
  --color-accent: 135 47 50%;      /* Your new accent */
}
```

### Add a New Page

1. Create `src/pages/MyPage.tsx`
2. Add route in `src/App.tsx`:
   ```typescript
   <Route path="/my-page" element={<MyPage />} />
   ```
3. Update navigation if needed

### Change Fonts

Edit `src/index.css`:
```css
body {
  font-family: 'Your Font', sans-serif;
}
```

Or update `tailwind.config.js`:
```javascript
theme: {
  fontFamily: {
    sans: ['Your Font', 'sans-serif'],
  },
}
```

## SEO Tips

1. **Meta Tags**: Automatically set per page via `updateMetaTags()`
2. **Sitemap**: Generate with `npm run generate-sitemap`
3. **Keywords**: Include in page descriptions and content
4. **Images**: Use meaningful alt text
5. **Schema**: JSON-LD already included for Organization and LocalBusiness

## Performance

- ✅ Route-based code splitting (lazy loading)
- ✅ Optimized production build with Terser
- ✅ Images recommended to be optimized externally
- ✅ CSS/JS minified automatically
- ✅ Modern browser support only (smaller bundles)

Test with Lighthouse:
1. Open DevTools (F12)
2. Click "Lighthouse" tab
3. Click "Generate report"
4. Target: 90+ on all metrics

## Accessibility

- ✅ Keyboard navigation throughout
- ✅ ARIA labels on interactive elements
- ✅ Proper heading hierarchy (h1, h2, h3...)
- ✅ Color contrast meets WCAG AA
- ✅ Respects `prefers-reduced-motion`

## Troubleshooting

### Port 5173 already in use
```bash
npm run dev -- --port 5174
```

### Module not found errors
Make sure imports use correct path aliases:
```typescript
import { Button } from '@components/Button';  // ✓
import { Button } from './components/Button'; // ✗
```

### Styles not applying
1. Clear cache: `npm run build && npm run preview`
2. Verify Tailwind config paths
3. Check class names are correct

### Form not submitting
1. Check browser console for errors
2. Verify `VITE_CONTACT_EMAIL` is set
3. Test in incognito mode
4. Check if email client is installed (for mailto)

## Next Steps

1. **Customize everything** - Update all content, images, colors
2. **Test thoroughly** - Check all pages, links, forms
3. **Optimize images** - Compress and optimize all media
4. **Build** - Run `npm run build`
5. **Deploy** - Upload `dist/` folder to Hostinger
6. **Monitor** - Set up analytics and error tracking

## Resources

- **Vite**: https://vitejs.dev
- **React**: https://react.dev
- **Tailwind**: https://tailwindcss.com
- **Framer Motion**: https://www.framer.com/motion
- **Radix UI**: https://www.radix-ui.com
- **React Router**: https://reactrouter.com

## Support

Need help?
- Check README.md for detailed documentation
- Review DEPLOYMENT_CHECKLIST.md before going live
- Examine existing pages for patterns
- Test in different browsers

---

Happy coding! 🚀
