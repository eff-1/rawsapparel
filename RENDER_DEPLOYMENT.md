# Deploy to Render - Complete Guide

## Overview

Render is a modern cloud platform that makes deployment easy. We'll deploy:
- **Backend** → Render Web Service (Node.js)
- **Frontend** → Render Static Site (or Vercel/Netlify)

## Prerequisites

1. GitHub account
2. Render account (free tier available)
3. Push your code to GitHub repository

## Step 1: Prepare Backend for Render

### Create `render.yaml` in project root:

```yaml
services:
  # Backend API Service
  - type: web
    name: raws-apparel-backend
    env: node
    region: oregon
    plan: free
    buildCommand: cd backend && npm install
    startCommand: cd backend && npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 5003
      - key: GOOGLE_API_KEY
        sync: false
      - key: GOOGLE_SEARCH_ENGINE_ID
        sync: false
      - key: FIREBASE_API_KEY
        sync: false
      - key: FIREBASE_AUTH_DOMAIN
        sync: false
      - key: FIREBASE_PROJECT_ID
        sync: false
      - key: FIREBASE_STORAGE_BUCKET
        sync: false
      - key: FIREBASE_MESSAGING_SENDER_ID
        sync: false
      - key: FIREBASE_APP_ID
        sync: false
      - key: FIREBASE_DATABASE_URL
        sync: false
      - key: CLOUDINARY_CLOUD_NAME
        sync: false
      - key: CLOUDINARY_API_KEY
        sync: false
      - key: CLOUDINARY_API_SECRET
        sync: false
      - key: BUSINESS_WHATSAPP_NUMBER
        value: 2348128653553
```

### Update `backend/package.json`:

Make sure you have these scripts:

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### Update `backend/index.js` to use PORT from environment:

```javascript
const PORT = process.env.PORT || 5003
```

## Step 2: Deploy Backend to Render

### Option A: Using Render Dashboard (Recommended)

1. **Go to Render Dashboard**
   - Visit: https://dashboard.render.com/
   - Sign up or log in

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your repository

3. **Configure Service**
   - **Name:** `raws-apparel-backend`
   - **Region:** Oregon (US West) or closest to you
   - **Branch:** `main` or `master`
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free

4. **Add Environment Variables**
   Click "Advanced" → "Add Environment Variable" and add:
   
   ```
   NODE_ENV=production
   PORT=5003
   GOOGLE_API_KEY=your_google_api_key_here
   GOOGLE_SEARCH_ENGINE_ID=92da924ffc63e42af
   FIREBASE_API_KEY=AIzaSyCKKiqwD0tz1cKjzayKCQOn7oL4argQWMI
   FIREBASE_AUTH_DOMAIN=rawsapparel.firebaseapp.com
   FIREBASE_PROJECT_ID=rawsapparel
   FIREBASE_STORAGE_BUCKET=rawsapparel.firebasestorage.app
   FIREBASE_MESSAGING_SENDER_ID=512977009543
   FIREBASE_APP_ID=1:512977009543:web:56450066ac604daeabf122
   FIREBASE_DATABASE_URL=https://rawsapparel-default-rtdb.firebaseio.com
   CLOUDINARY_CLOUD_NAME=dkapgx4vn
   CLOUDINARY_API_KEY=132131563484835
   CLOUDINARY_API_SECRET=xGDIBKuexe-e2RvxwxO68yVezYQ
   BUSINESS_WHATSAPP_NUMBER=2348128653553
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - You'll get a URL like: `https://raws-apparel-backend.onrender.com`

### Option B: Using render.yaml (Blueprint)

1. Push `render.yaml` to your repository
2. Go to Render Dashboard → "Blueprints"
3. Click "New Blueprint Instance"
4. Connect your repository
5. Render will automatically detect `render.yaml` and deploy

## Step 3: Deploy Frontend

### Option 1: Deploy to Render (Static Site)

1. **Update `frontend/.env.production`:**

```env
VITE_API_URL=https://raws-apparel-backend.onrender.com/api
VITE_FIREBASE_API_KEY=AIzaSyCKKiqwD0tz1cKjzayKCQOn7oL4argQWMI
VITE_FIREBASE_AUTH_DOMAIN=rawsapparel.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=rawsapparel
VITE_FIREBASE_STORAGE_BUCKET=rawsapparel.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=512977009543
VITE_FIREBASE_APP_ID=1:512977009543:web:56450066ac604daeabf122
```

2. **Create New Static Site on Render:**
   - Click "New +" → "Static Site"
   - Connect your GitHub repository
   - **Name:** `raws-apparel-frontend`
   - **Root Directory:** `frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `frontend/dist`

3. **Add Environment Variables:**
   Add the same variables from `.env.production`

4. **Deploy**
   - Click "Create Static Site"
   - You'll get a URL like: `https://raws-apparel-frontend.onrender.com`

### Option 2: Deploy to Vercel (Recommended for Frontend)

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Deploy:**
```bash
cd frontend
vercel
```

3. **Add Environment Variables in Vercel Dashboard:**
   - Go to your project settings
   - Add all variables from `.env.production`

4. **Set Production URL:**
   - Update `VITE_API_URL` to your Render backend URL

### Option 3: Deploy to Netlify

1. **Create `netlify.toml` in frontend folder:**

```toml
[build]
  base = "frontend"
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

2. **Deploy:**
   - Connect repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `frontend/dist`
   - Add environment variables

## Step 4: Update Frontend to Use Production API

### Update `frontend/src/pages/Search.vue`:

For production, we need to use the full backend URL:

```javascript
// In performSearch method
const apiUrl = import.meta.env.PROD 
  ? `${import.meta.env.VITE_API_URL}/search/images?query=${encodeURIComponent(this.currentQuery)}&page=${page}&limit=12`
  : `/api/search/images?query=${encodeURIComponent(this.currentQuery)}&page=${page}&limit=12`

const response = await fetch(apiUrl)
```

### Update `frontend/vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5003',
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
})
```

## Step 5: Enable CORS on Backend

Update `backend/index.js` to allow requests from your frontend domain:

```javascript
const cors = require('cors')

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://raws-apparel-frontend.onrender.com',
    'https://your-vercel-domain.vercel.app',
    'https://your-netlify-domain.netlify.app'
  ],
  credentials: true,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
```

## Step 6: Test Deployment

1. **Test Backend:**
   ```bash
   curl https://raws-apparel-backend.onrender.com/api/search/images?query=ankara%20dress&page=1&limit=12
   ```

2. **Test Frontend:**
   - Visit your frontend URL
   - Try searching for "ankara dress"
   - Check browser console for errors

## Render Free Tier Limitations

- **Backend (Web Service):**
  - 750 hours/month free
  - Spins down after 15 minutes of inactivity
  - First request after spin-down takes 30-60 seconds
  - 512 MB RAM

- **Frontend (Static Site):**
  - Unlimited bandwidth
  - Always on (no spin-down)
  - Free SSL certificate

## Upgrade Options

If you need better performance:

1. **Render Starter Plan ($7/month):**
   - No spin-down
   - Always on
   - Better performance

2. **Use Vercel for Frontend (Free):**
   - Better performance
   - Global CDN
   - Automatic deployments

## Troubleshooting

### Backend not responding?
- Check Render logs in dashboard
- Verify environment variables are set
- Check if service is sleeping (free tier)

### CORS errors?
- Add your frontend domain to CORS whitelist
- Check backend logs for CORS errors

### API calls failing?
- Verify `VITE_API_URL` is correct
- Check if backend is running
- Test backend URL directly in browser

### Images not loading?
- Check Google API quota
- Verify API keys are set correctly
- Check browser console for errors

## Production Checklist

- [ ] Backend deployed to Render
- [ ] Frontend deployed to Vercel/Netlify/Render
- [ ] Environment variables configured
- [ ] CORS enabled for frontend domain
- [ ] API URL updated in frontend
- [ ] Test search functionality
- [ ] Test WhatsApp integration
- [ ] Monitor API quota usage
- [ ] Set up custom domain (optional)

## Custom Domain Setup

### For Backend (Render):
1. Go to Render Dashboard → Your Service → Settings
2. Add custom domain
3. Update DNS records as instructed

### For Frontend (Vercel):
1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add custom domain
3. Update DNS records

## Monitoring

- **Render Dashboard:** Monitor backend logs and performance
- **Google Cloud Console:** Monitor API quota usage
- **Browser DevTools:** Check for frontend errors

## Cost Estimate

**Free Tier (Recommended for testing):**
- Backend: Free (with spin-down)
- Frontend: Free
- Total: $0/month

**Production (Recommended):**
- Backend: Render Starter ($7/month)
- Frontend: Vercel Free
- Total: $7/month

**Enterprise:**
- Backend: Render Pro ($25/month)
- Frontend: Vercel Pro ($20/month)
- Total: $45/month
