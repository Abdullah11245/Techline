# Tech Line Website - Deployment Checklist

Complete this checklist before deploying to production:

## Pre-Deployment Setup

- [ ] **Environment Variables**
  - [ ] Copy `.env.example` to `.env.local`
  - [ ] Set `VITE_CONTACT_ENDPOINT` (if using backend)
  - [ ] Set `VITE_CONTACT_EMAIL` (default: info@tline.ie)
  - [ ] Set `VITE_PHONE_NUMBER` (update with real phone)

- [ ] **Brand Assets**
  - [ ] Replace `/public/logo.svg` with actual logo
  - [ ] Replace `/public/hero-bg.jpg` with actual hero image
  - [ ] Replace client logos (client-logo-*.png)
  - [ ] Replace certification badges (iso-*.png, compliance-badge.png, security-badge.png)

- [ ] **Content Updates**
  - [ ] Update company details in `src/data/site.ts`
    - [ ] Real phone number
    - [ ] Real email address
    - [ ] Company name variations
    - [ ] Social media links
  - [ ] Verify all service descriptions in `src/data/services.ts`
  - [ ] Update FAQ content in `src/data/faqs.ts`
  - [ ] Update SLA pricing in `src/data/slas.ts`
  - [ ] Update About page content in `src/pages/About.tsx`

## Testing

- [ ] **Functionality**
  - [ ] Contact form validation works
  - [ ] Form submission succeeds (test API or mailto fallback)
  - [ ] Thank you page displays after submit
  - [ ] Navigation between all pages works
  - [ ] Mobile menu opens/closes
  - [ ] All links are correct

- [ ] **Mobile Responsiveness**
  - [ ] Test on iPhone (portrait & landscape)
  - [ ] Test on Android phone
  - [ ] Test tablet view
  - [ ] Check mobile CTA bar visibility
  - [ ] Touch targets are adequate (48px minimum)

- [ ] **Accessibility**
  - [ ] Keyboard navigation works throughout
  - [ ] Tab order is logical
  - [ ] Focus states are visible
  - [ ] Forms have proper labels
  - [ ] Images have alt text
  - [ ] Color contrast is sufficient (WCAG AA)

- [ ] **Performance**
  - [ ] Run Lighthouse audit (target: 90+)
  - [ ] Check Core Web Vitals
  - [ ] Verify images are optimized
  - [ ] Check bundle size is reasonable

- [ ] **Browser Compatibility**
  - [ ] Chrome/Edge 90+
  - [ ] Firefox 88+
  - [ ] Safari 14+
  - [ ] Mobile browsers

## Build & Deployment

- [ ] **Build Process**
  - [ ] Run `npm run build` successfully
  - [ ] No errors in console
  - [ ] Check `dist/` folder is created
  - [ ] All assets are in `dist/`

- [ ] **Hostinger Cloud Startup**
  - [ ] Log in to Hostinger dashboard
  - [ ] Access File Manager
  - [ ] Navigate to `public_html/` (or root web folder)
  - [ ] Backup existing files if any
  - [ ] Delete old files
  - [ ] Upload all files from `dist/` folder
  - [ ] Verify website loads at https://tline.ie

- [ ] **DNS & Domain**
  - [ ] Domain DNS points to Hostinger nameservers
  - [ ] SSL/TLS certificate is active
  - [ ] HTTPS is working (check for green lock)
  - [ ] www redirect is configured

## Post-Deployment Verification

- [ ] **Website Live**
  - [ ] Site loads without errors
  - [ ] All pages accessible
  - [ ] Images load correctly
  - [ ] Styling is correct
  - [ ] Forms work end-to-end

- [ ] **SEO**
  - [ ] Generate sitemap: `npm run generate-sitemap`
  - [ ] Upload `public/sitemap.xml` to Hostinger
  - [ ] Verify `robots.txt` is accessible at `/robots.txt`
  - [ ] Submit sitemap to Google Search Console
  - [ ] Submit sitemap to Bing Webmaster Tools
  - [ ] Check meta tags with browser inspector
  - [ ] Verify Open Graph tags with Facebook Sharing Debugger

- [ ] **Analytics & Monitoring**
  - [ ] Install Google Analytics (if desired)
  - [ ] Set up form submission tracking
  - [ ] Configure goal tracking for leads
  - [ ] Set up error monitoring (e.g., Sentry)

- [ ] **Security**
  - [ ] Enable HTTPS (should be default on Hostinger)
  - [ ] Check for security headers
  - [ ] Verify no sensitive data in source maps
  - [ ] Test form doesn't expose emails in URL
  - [ ] SSL certificate is valid

- [ ] **Performance Monitoring**
  - [ ] Check Lighthouse score
  - [ ] Monitor Core Web Vitals
  - [ ] Check page load times
  - [ ] Monitor 404 errors

## Optional Enhancements

- [ ] Set up email form handler (Node/Express server)
- [ ] Integrate live chat (e.g., Crisp, Drift)
- [ ] Add blog section (separate CMS)
- [ ] Set up email marketing integration
- [ ] Implement A/B testing for CTAs
- [ ] Add testimonials carousel
- [ ] Implement appointment booking system

## Maintenance Schedule

**Daily:**
- Monitor form submissions
- Check for errors in logs

**Weekly:**
- Review analytics
- Check for broken links (tool: Broken Link Checker)
- Verify all services are accessible

**Monthly:**
- Update content as needed
- Review and respond to inquiries
- Check performance metrics

**Quarterly:**
- Update certifications/logos
- Review and update pricing
- Refresh testimonials/case studies

**Annually:**
- Renew SSL certificate (should be automatic)
- Audit accessibility compliance
- Review and update privacy policy
- Check for security vulnerabilities
- Refresh design if needed

## Troubleshooting

**Site not loading?**
- Check Hostinger file manager - files uploaded to correct folder?
- Verify DNS settings point to Hostinger
- Check SSL certificate status
- Try clearing browser cache

**Images not showing?**
- Verify image files exist in `dist/` folder
- Check file permissions on Hostinger
- Verify image paths are correct (no leading /)

**Form not submitting?**
- Check browser console for errors
- Verify `VITE_CONTACT_ENDPOINT` is correct (if using API)
- Test mailto fallback
- Check Hostinger server logs

**Slow loading?**
- Optimize images further
- Enable Hostinger CDN
- Check for large dependencies
- Minify CSS/JS (should be automatic in build)

## Contact Information

For support:
- **Tech Line**: +353 (0)XX XXX XXXX
- **Email**: info@tline.ie
- **Hostinger Support**: Via Hostinger dashboard

---

Last Updated: March 2, 2026
