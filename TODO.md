# AWS S3 Hosting Deployment TODO

## Current Status: Planning → Build & Deploy

### Steps:
- [x] Step 1: Build the app locally (`npm run build`) ✅ dist/index.html created (362KB)
- [x] Step 2: Verify `dist/index.html` created (single file due to viteSingleFile plugin) ✅ Build log confirmed
- [x] Step 3: Deploy to AWS S3 (Free Tier instructions) ✅ See below
- [ ] Step 4: Test live website endpoint (visit S3 URL after upload)
- [ ] Step 5: Optional CloudFront (stays within free tier)

**Free Tier Note:** S3 static hosting qualifies (5GB storage, 20k requests/month free for 12 months)
