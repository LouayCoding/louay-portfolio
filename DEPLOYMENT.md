# 🚀 Deployment Guide

This guide covers multiple deployment options for your cinematic portfolio.

## Quick Deploy Options

### 1. Vercel (Recommended - Easiest)

Vercel is made by the creators of Next.js and offers the smoothest deployment experience.

**Steps**:

1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Visit [vercel.com](https://vercel.com)
3. Sign in with GitHub
4. Click "New Project"
5. Import your repository
6. Click "Deploy"

**That's it!** Your site will be live in ~2 minutes.

**Custom Domain** (Optional):
- Go to Project Settings → Domains
- Add your custom domain
- Follow DNS configuration instructions

---

### 2. Netlify

Another excellent option with great performance.

**Steps**:

1. Push code to GitHub (if not done already)
2. Visit [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select your repo
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click "Deploy"

---

### 3. GitHub Pages (Static Export)

For free hosting on GitHub Pages, you'll need to configure static export.

**Update `next.config.js`**:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // ... rest of config
};

module.exports = nextConfig;
```

**Deploy**:

```bash
npm run build
npm install -g gh-pages
gh-pages -d out
```

Configure GitHub Pages:
- Go to repo Settings → Pages
- Source: Deploy from branch
- Branch: gh-pages / root

---

### 4. Railway

Great for full-stack projects with backend needs.

**Steps**:

1. Visit [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository
6. Railway auto-detects Next.js and deploys

---

### 5. DigitalOcean App Platform

**Steps**:

1. Visit [cloud.digitalocean.com](https://cloud.digitalocean.com)
2. Create App → GitHub
3. Select repository
4. Configure:
   - Build command: `npm run build`
   - Run command: `npm start`
5. Click "Deploy"

---

## Environment Variables

If you add any environment variables (like API keys), remember to add them in your deployment platform:

**Vercel**: Project Settings → Environment Variables
**Netlify**: Site Settings → Environment Variables
**Railway**: Project Settings → Variables

Example `.env.local`:
```
NEXT_PUBLIC_SITE_URL=https://yoursite.com
```

---

## Build Optimization

Before deploying, ensure optimal performance:

### 1. Check Build
```bash
npm run build
```

Should complete without errors.

### 2. Test Production Locally
```bash
npm run build
npm start
```

Visit `http://localhost:3000` to test.

### 3. Optimize Images
Place images in `/public` folder and use Next.js Image component:
```tsx
import Image from 'next/image';

<Image src="/your-image.jpg" alt="Description" width={500} height={300} />
```

### 4. Analyze Bundle Size
```bash
npm install -D @next/bundle-analyzer
```

Update `next.config.js`:
```javascript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);
```

Run analysis:
```bash
ANALYZE=true npm run build
```

---

## Custom Domain Setup

### Vercel
1. Project Settings → Domains
2. Add your domain
3. Update DNS:
   - Type: `A` Record
   - Name: `@`
   - Value: `76.76.21.21`
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`

### Netlify
1. Site Settings → Domain Management
2. Add custom domain
3. Update DNS:
   - Type: `A` Record
   - Name: `@`
   - Value: `75.2.60.5`
   - Type: `CNAME`
   - Name: `www`
   - Value: `your-site.netlify.app`

---

## Performance Checklist

Before going live:

- [ ] Test on multiple devices (mobile, tablet, desktop)
- [ ] Check loading time (<3 seconds)
- [ ] Verify all links work
- [ ] Test audio control
- [ ] Check animations are smooth
- [ ] Verify modal functionality
- [ ] Test with slow 3G network
- [ ] Run Lighthouse audit (Chrome DevTools)
- [ ] Check console for errors
- [ ] Verify meta tags for SEO

---

## Troubleshooting

### Build Fails

**Error**: "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Error**: Three.js SSR issues
- Already handled with `dynamic` import in `app/page.tsx`

### Performance Issues

1. Reduce star count in `components/Scene.tsx`
2. Disable animations on low-end devices
3. Compress audio file
4. Use WebP images

### Audio Doesn't Play

- Browser autoplay policy blocks audio
- User must interact with page first
- Solution: Already implemented with mute button

---

## Monitoring

After deployment, monitor your site:

### Vercel Analytics
- Enable in Project Settings → Analytics
- Track page views, performance, Web Vitals

### Google Analytics
Add to `app/layout.tsx`:
```tsx
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
```

---

## Cost Estimates

| Platform | Free Tier | Bandwidth | Custom Domain |
|----------|-----------|-----------|---------------|
| **Vercel** | ✅ Yes | 100GB/mo | ✅ Yes |
| **Netlify** | ✅ Yes | 100GB/mo | ✅ Yes |
| **Railway** | ⚠️ Trial | 100GB/mo | ✅ Yes |
| **GitHub Pages** | ✅ Yes | Soft limit | ✅ Yes |
| **DigitalOcean** | ❌ No | Varies | ✅ Yes |

---

## Next Steps After Deployment

1. Share your portfolio on social media
2. Add to LinkedIn profile
3. Submit to portfolio showcases:
   - [Awwwards](https://www.awwwards.com)
   - [CSS Design Awards](https://www.cssdesignawards.com)
   - [One Page Love](https://onepagelove.com)
4. Get feedback from communities:
   - r/webdev
   - Designer News
   - Dev.to

---

**Congratulations on deploying your cinematic portfolio! 🎉**

For updates and support, check the main README.md or open an issue on GitHub.

