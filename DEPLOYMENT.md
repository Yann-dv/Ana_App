# Ana Fitness App - GitHub Pages Deployment Guide

## Overview
This guide explains how to deploy the Ana Fitness App to GitHub Pages as a static Progressive Web App (PWA).

## Prerequisites
- GitHub repository with the Ana Fitness App code
- GitHub Pages enabled for your repository
- Node.js 18+ installed locally

## Deployment Configuration

The app has been configured for static export with the following changes:

### 1. Next.js Configuration (`next.config.js`)
```javascript
const nextConfig = {
  output: 'export',           // Enable static export
  trailingSlash: true,        // Required for GitHub Pages
  skipTrailingSlashRedirect: true,
  distDir: 'out',            // Output directory
  images: {
    unoptimized: true,        // Required for static export
  },
}
```

### 2. Package.json Scripts
- `npm run export` - Builds the static export
- `npm run deploy` - Builds and adds .nojekyll file

### 3. GitHub Actions Workflow
Automated deployment is configured in `.github/workflows/deploy.yml`:
- Triggers on push to main branch
- Builds the app using Node.js 18
- Deploys to GitHub Pages

### 4. Mock Authentication
Since GitHub Pages only supports static files, API routes have been replaced with a mock authentication service:
- Demo credentials: `demo@ana-fitness.com` / `demo123`
- Test credentials: `test@ana-fitness.com` / `test123`

## Manual Deployment Steps

1. **Build the static export:**
   ```bash
   npm run build
   ```

2. **Add .nojekyll file:**
   ```bash
   touch out/.nojekyll
   ```

3. **Deploy to GitHub Pages:**
   - Push the `out` folder contents to the `gh-pages` branch
   - Or use the automated GitHub Actions workflow

## Automated Deployment

1. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Set source to "GitHub Actions"

2. **Push to main branch:**
   ```bash
   git add .
   git commit -m "Configure for GitHub Pages deployment"
   git push origin main
   ```

3. **Monitor deployment:**
   - Check the Actions tab for deployment status
   - App will be available at `https://[username].github.io/[repository-name]/`

## Features Available in Static Deployment

✅ **Working Features:**
- Progressive Web App (PWA) functionality
- Offline support with service worker
- Responsive design for all devices
- Mock authentication system
- All UI components and navigation
- Subscription management (frontend only)
- Program browsing and video player
- Progress tracking (local storage)
- Install prompt for mobile devices

❌ **Limitations:**
- No real backend authentication
- No persistent data storage
- No real payment processing
- No server-side features

## PWA Features

The app maintains full PWA functionality:
- **Installable:** Users can install on mobile/desktop
- **Offline:** Works without internet connection
- **Responsive:** Optimized for all screen sizes
- **Fast:** Cached resources for quick loading

## Testing Locally

1. **Build and serve static export:**
   ```bash
   npm run build
   npx serve out
   ```

2. **Test PWA features:**
   - Open in Chrome/Edge
   - Check install prompt
   - Test offline functionality
   - Verify responsive design

## Troubleshooting

### Common Issues:

1. **404 errors on refresh:**
   - Ensure `trailingSlash: true` in next.config.js
   - Check that .nojekyll file exists

2. **Images not loading:**
   - Verify `images.unoptimized: true` in config
   - Use relative paths for images

3. **Service worker issues:**
   - Clear browser cache
   - Check console for SW registration errors

4. **Authentication not working:**
   - Use demo credentials: demo@ana-fitness.com / demo123
   - Check browser console for errors

## Production Considerations

For a production deployment, consider:
- Setting up a real backend API
- Implementing proper authentication
- Adding payment processing
- Using a CDN for better performance
- Setting up monitoring and analytics

## Support

For deployment issues:
1. Check GitHub Actions logs
2. Verify GitHub Pages settings
3. Test locally with `npx serve out`
4. Check browser console for errors