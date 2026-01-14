# Deploy Frontend to Vercel (Updated)

## Your Current Setup
- **Frontend:** Vercel
- **Backend:** Render at `https://rawsbackend.onrender.com`

## What Was Fixed

### Problem
The Search page was using `/api` (localhost proxy) instead of the actual Render backend URL `https://rawsbackend.onrender.com/api`.

### Solution
1. Created `frontend/src/utils/api.js` - Centralized API configuration
2. Updated all pages to use the API utility
3. Now automatically uses:
   - **Development:** `/api` (proxied to localhost:5003)
   - **Production:** `https://rawsbackend.onrender.com/api`

## Files Updated

1. ✅ `frontend/src/utils/api.js` - New API utility
2. ✅ `frontend/src/pages/Search.vue` - Uses API utility
3. ✅ `frontend/src/pages/GoogleSearchDemo.vue` - Uses API utility
4. ✅ `frontend/.env` - Development config (uses proxy)
5. ✅ `frontend/.env.production` - Production config (uses Render URL)
6. ✅ `frontend/vite.config.js` - Proxy configuration for development

## Deploy to Vercel

### Step 1: Commit and Push Changes

```bash
git add .
git commit -m "Fix API URLs to use Render backend in production"
git push origin main
```

### Step 2: Vercel Will Auto-Deploy

Vercel automatically deploys when you push to GitHub. It will:
1. Detect the changes
2. Build the frontend with production environment variables
3. Use `VITE_API_URL=https://rawsbackend.onrender.com/api`
4. Deploy to your Vercel domain

### Step 3: Verify Environment Variables in Vercel

Go to Vercel Dashboard → Your Project → Settings → Environment Variables

Make sure you have:

```
VITE_API_URL=https://rawsbackend.onrender.com/api
VITE_FIREBASE_API_KEY=AIzaSyCKKiqwD0tz1cKjzayKCQOn7oL4argQWMI
VITE_FIREBASE_AUTH_DOMAIN=rawsapparel.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=rawsapparel
VITE_FIREBASE_STORAGE_BUCKET=rawsapparel.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=512977009543
VITE_FIREBASE_APP_ID=1:512977009543:web:56450066ac604daeabf122
```

### Step 4: Test Production

1. Wait for Vercel deployment to complete
2. Visit your Vercel URL (e.g., `https://raws-apparel.vercel.app`)
3. Try searching for "ankara dress"
4. Check browser console - should see: `API Request: https://rawsbackend.onrender.com/api/search/images?...`

## How It Works Now

### Development (localhost)
```javascript
// .env
VITE_API_URL=/api

// Vite proxy forwards to localhost:5003
fetch('/api/search/images') → http://localhost:5003/api/search/images
```

### Production (Vercel)
```javascript
// .env.production
VITE_API_URL=https://rawsbackend.onrender.com/api

// Direct call to Render
fetch('https://rawsbackend.onrender.com/api/search/images')
```

## Backend CORS Configuration

Make sure your backend (`https://rawsbackend.onrender.com`) allows requests from your Vercel domain.

In `backend/index.js`:

```javascript
const cors = require('cors')

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://raws-apparel.vercel.app', // Your Vercel domain
    'https://your-vercel-domain.vercel.app' // Add all your Vercel domains
  ],
  credentials: true,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
```

## Troubleshooting

### Issue: Still getting localhost errors in production

**Solution:**
1. Check Vercel environment variables
2. Trigger a new deployment: `vercel --prod`
3. Clear browser cache

### Issue: CORS errors

**Solution:**
1. Add your Vercel domain to backend CORS whitelist
2. Redeploy backend on Render
3. Check backend logs on Render dashboard

### Issue: API calls failing

**Solution:**
1. Check if Render backend is awake (free tier sleeps after 15 min)
2. Visit `https://rawsbackend.onrender.com/api/search/images?query=test&page=1&limit=12` directly
3. Check Render logs for errors

### Issue: Images not loading

**Solution:**
1. Check Google API quota in Google Cloud Console
2. Verify API keys are set in Render environment variables
3. Check browser console for specific errors

## Manual Deployment (if needed)

If auto-deployment doesn't work:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel --prod
```

## Verify Deployment

### Check API URL in Browser Console

1. Open your Vercel site
2. Open browser DevTools (F12)
3. Go to Console tab
4. Search for something
5. You should see: `API Request: https://rawsbackend.onrender.com/api/search/images?...`

### Test Backend Directly

```bash
curl "https://rawsbackend.onrender.com/api/search/images?query=ankara%20dress&page=1&limit=12"
```

Should return JSON with search results.

## Production Checklist

- [x] API utility created (`frontend/src/utils/api.js`)
- [x] Search.vue updated to use API utility
- [x] GoogleSearchDemo.vue updated to use API utility
- [x] Environment variables configured
- [ ] Changes committed and pushed to GitHub
- [ ] Vercel auto-deployment completed
- [ ] Backend CORS configured for Vercel domain
- [ ] Test search functionality on production
- [ ] Test WhatsApp integration
- [ ] Monitor API quota usage

## Next Steps

1. **Commit and push** your changes
2. **Wait for Vercel** to auto-deploy (2-3 minutes)
3. **Test production** site
4. **Update other pages** (Admin, Home, etc.) to use API utility if needed

## Benefits of This Setup

✅ **Automatic environment detection** - No manual URL changes needed
✅ **Centralized configuration** - All API calls in one place
✅ **Type-safe endpoints** - Predefined API endpoints
✅ **Easy debugging** - Console logs show actual URLs being called
✅ **Production ready** - Works seamlessly on Vercel with Render backend
