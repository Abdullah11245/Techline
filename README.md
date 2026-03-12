# Tech Line Website

Production-ready website for Tech Line - IT Support & ISO 27001 Compliance services for Irish businesses.

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (with custom theme and CSS variables for brand colors)
- **UI Primitives**: Radix UI (accessible components)
- **Animation**: Framer Motion (motion-heavy, scroll-triggered animations)
- **Icons**: Lucide React
- **Routing**: React Router v6
- **Linting**: ESLint + TypeScript
- **Tooling**: Babel, Terser (minification)

## Features

- **9-Page Website**:
  - Home (with hero, decision tree, trust section, how we work timeline, SLA tiers, FAQ preview)
  - 6 Service pages (IT Support, Cyber Security, Backup & BCDR, Microsoft 365, Telecom, Digital)
  - About page
  - Contact page (with validated lead form)
  - Thank You page (after form submission)
  - Privacy Policy page

- **Lead Generation**:
  - Contact form with client-side validation
  - Fallback to mailto if no backend endpoint configured
  - Success/error messaging
  - Auto-redirect to thank you page

- **Performance & SEO**:
  - Route-based code splitting (lazy loading)
  - Per-page meta tags and Open Graph
  - JSON-LD schema (Organization, LocalBusiness)
  - Mobile-responsive design
  - Accessibility (ARIA labels, focus states, keyboard nav)
  - Respects `prefers-reduced-motion`

- **UI/UX**:
  - Sticky header with desktop CTA (phone + book button)
  - Mobile sticky bottom CTA bar
  - Animated sections on scroll
  - Hover lift effects on cards
  - Button variants (primary, secondary, ghost, accent)
  - SLA comparison table with pricing
  - FAQ accordion
  - Logo grid for client logos and certifications

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. Clone or download the project

```bash
cd "Tech Line"
npm install
```

2. Create a `.env.local` file (copy from `.env.example`):

```bash
cp .env.example .env.local
```

3. Update environment variables:
   - `VITE_CONTACT_ENDPOINT`: (Optional) URL to your backend contact form endpoint
   - `VITE_CONTACT_EMAIL`: Email to use for mailto fallback (default: info@tline.ie)
   - `VITE_PHONE_NUMBER`: Display phone number (default: +353 (0)XX XXX XXXX)

### Development

```bash
npm run dev
```

This opens the dev server at `http://localhost:5173` with hot module reloading.

### Build for Production

```bash
npm run build
```

Outputs optimized static files to `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

### Linting & Type Checking

```bash
npm run lint
npm run type-check
```

## Deployment to Hostinger Cloud Startup

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Upload to Hostinger**:
   - Log in to Hostinger Cloud Startup dashboard
   - Go to File Manager
   - Navigate to your public web root (typically `public_html/`)
   - Delete existing files (if any)
   - Upload all contents of the `dist/` folder

3. **Configure Environment** (if using backend form handler):
   - Set environment variables in Hostinger dashboard if your form handler is on a separate domain
   - Or use the mailto fallback approach (no backend needed)

4. **Verify SEO**:
   - Check `sitemap.xml` is accessible at `https://tline.ie/sitemap.xml`
   - Verify `robots.txt` at `https://tline.ie/robots.txt`
   - Submit to Google Search Console

## Project Structure

```
src/
├── components/
│   ├── Button.tsx              # Button with variants
│   ├── Section.tsx             # Animated section wrapper
│   ├── Header.tsx              # Sticky header
│   ├── Footer.tsx              # Footer with sitemap
│   ├── MobileCtaBar.tsx        # Mobile sticky CTA bar
│   ├── LeadForm.tsx            # Contact form
│   ├── FeatureCard.tsx         # Service cards
│   ├── CtaBand.tsx             # CTA banner sections
│   ├── LogoGrid.tsx            # Client/cert logos
│   ├── SlaTable.tsx            # SLA pricing table
│   └── FaqAccordion.tsx        # FAQ accordion
├── pages/
│   ├── Home.tsx                # Homepage
│   ├── services/
│   │   ├── ItSupport.tsx
│   │   ├── CyberSecurity.tsx
│   │   ├── Bcdr.tsx
│   │   ├── Microsoft365.tsx
│   │   ├── Telecom.tsx
│   │   └── DigitalServices.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── ThankYou.tsx
│   └── Privacy.tsx
├── layouts/
│   └── RootLayout.tsx          # App layout with header/footer
├── data/
│   ├── site.ts                 # Site config, nav, footer links
│   ├── services.ts             # Service categories & items
│   ├── faqs.ts                 # FAQ content
│   └── slas.ts                 # SLA tiers & pricing
├── utils/
│   ├── seo.ts                  # Meta tags, JSON-LD
│   └── form.ts                 # Form submission handler
├── App.tsx                     # Router setup
├── main.tsx                    # Entry point
└── index.css                   # Base styles (Tailwind)

public/
├── logo.svg                    # Brand logo
├── hero-bg.jpg                 # Hero section background
├── client-logo-*.png           # Client logos (placeholders)
├── iso-27001-badge.png         # Certification badges
└── robots.txt                  # Search engine rules

```

## Configuration

### Tailwind Theme

Brand colors are defined in `tailwind.config.js` with CSS variables:

- **Primary**: `#004b6a` (deep blue)
- **Accent**: `#3eaf47` (green)

Customize colors in `src/index.css`:
```css
:root {
  --color-primary: 211 63 100%;    /* HSL values */
  --color-accent: 135 47 50%;
}
```

### Environment Variables

| Variable | Default | Required | Purpose |
|---|---|---|---|
| `VITE_CONTACT_ENDPOINT` | (none) | No | Backend API endpoint for form submission (if omitted, uses mailto) |
| `VITE_CONTACT_EMAIL` | info@tline.ie | No | Email for mailto fallback |
| `VITE_PHONE_NUMBER` | +353 (0)XX XXX XXXX | No | Display phone number across site |

## SEO Checklist

- [ ] Replace placeholder images in `/public/` with actual brand assets
- [ ] Update site config in `src/data/site.ts` with real phone, email, address
- [ ] Customize service descriptions and bullet items in `src/data/services.ts`
- [ ] Update FAQ content in `src/data/faqs.ts`
- [ ] Update pricing in `src/data/slas.ts`
- [ ] Update company info and social links in `src/data/site.ts`
- [ ] Generate and submit `sitemap.xml` to Google Search Console
- [ ] Update meta descriptions for better click-through rates
- [ ] Test on mobile devices for responsiveness
- [ ] Verify form submission (both API and mailto fallback)
- [ ] Check Lighthouse score for performance

## Optional: Email Form Handler

If you want to use a backend handler instead of mailto, you can use the optional `/server` setup:

1. **Install dependencies**:
   ```bash
   npm install express nodemailer cors dotenv
   npm install -D @types/express @types/node
   ```

2. **Create `server/index.ts`** (see example below)

3. **Deploy separately** (e.g., Heroku, Render, AWS Lambda)

4. **Set `VITE_CONTACT_ENDPOINT`** to your server URL

Example server (Node + Express + nodemailer):

```typescript
// server/index.ts
import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT || '587'),
  secure: process.env.MAIL_SECURE === 'true',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

app.post('/api/contact', async (req, res) => {
  const { name, company, email, phone, service, message } = req.body;

  try {
    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.CONTACT_EMAIL,
      subject: `New Lead: ${name} - ${service}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service Interest:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Mail error:', error);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running on port', process.env.PORT || 3000);
});
```

## Performance Tips

1. **Images**: Optimize and compress all images before uploading
2. **Fonts**: Use system fonts (defined in Tailwind) to avoid extra requests
3. **Code Splitting**: Service pages are lazy-loaded via React.lazy
4. **Caching**: Configure cache headers in Hostinger for static assets
5. **CDN**: Enable Hostinger CDN for faster global delivery

## Accessibility

- All interactive elements are keyboard navigable
- Form fields have proper labels and error messages
- Icons have aria-labels where needed
- Color contrast meets WCAG AA standards
- Animations respect `prefers-reduced-motion` media query

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android 90+)

## Troubleshooting

**Form not submitting?**
- Check browser console for errors
- Verify `VITE_CONTACT_ENDPOINT` is set correctly
- Ensure backend server is running if using custom endpoint
- Check that `VITE_CONTACT_EMAIL` is valid for mailto fallback

**Styles not loading?**
- Clear browser cache and rebuild: `npm run build`
- Ensure Tailwind config paths are correct in `tailwind.config.js`

**Images not showing?**
- Place all images in `/public/` folder
- Reference as `/image-name.png` in code
- Verify image format and file names match code

## License

© 2026 Tech Line. All rights reserved.

## Support

For questions or issues:
- Phone: +353 (0)XX XXX XXXX
- Email: info@tline.ie
- Website: https://tline.ie
