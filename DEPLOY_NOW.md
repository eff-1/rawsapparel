# 🚀 Deploy Raws Apparel Now!

## Step 1: Push Backend to GitHub

**Windows:**
```bash
push-backend.bat
```

**Mac/Linux:**
```bash
chmod +x push-backend.sh
./push-backend.sh
```

## Step 2: Deploy Backend on Render

1. **Go to**: https://render.com/
2. **Sign in** with GitHub
3. **Click "New +"** > **"Web Service"**
4. **Connect** `eff-1/rawsbackend` repository
5. **Configure**:
   - **Name**: `raws-apparel-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

6. **Add Environment Variables**:
```env
NODE_ENV=production
PORT=5003
GOOGLE_API_KEY=AIzaSyD5fY2ulqabVp1fxjRaUZdJ8040mL0u6Kw
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

7. **Click "Create Web Service"**
8. **Copy the deployed URL** (e.g., `https://raws-apparel-api.onrender.com`)

## Step 3: Deploy Frontend on Netlify

1. **Go to**: https://app.netlify.com/
2. **Sign in** with GitHub
3. **Click "New site from Git"**
4. **Connect** `eff-1/rawsapparel` repository
5. **Configure**:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`

6. **Add Environment Variables**:
```env
VITE_API_URL=https://your-render-url.onrender.com/api
VITE_FIREBASE_API_KEY=AIzaSyCKKiqwD0tz1cKjzayKCQOn7oL4argQWMI
VITE_FIREBASE_AUTH_DOMAIN=rawsapparel.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=rawsapparel
VITE_FIREBASE_STORAGE_BUCKET=rawsapparel.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=512977009543
VITE_FIREBASE_APP_ID=1:512977009543:web:56450066ac604daeabf122
```

7. **Click "Deploy site"**

## Step 4: Update Frontend API URL

After backend is deployed:
1. **Copy your Render backend URL**
2. **Go to Netlify** > **Site settings** > **Environment variables**
3. **Update** `VITE_API_URL` to your Render URL
4. **Redeploy** the site

## 🎉 You're Live!

Your Google-powered Nigerian fashion search is now live:
- **Frontend**: Your Netlify URL
- **Backend**: Your Render URL
- **Features**: Google Custom Search, WhatsApp integration, Mobile-optimized

## 🧪 Test Your Deployment

1. **Visit your Netlify URL**
2. **Search for**: "ankara dress", "wedding gown", "traditional"
3. **Test WhatsApp**: Click "Order" on any image
4. **Test filters**: Use the collapsible filter system

## 🔧 If Something Goes Wrong

**Backend Issues:**
- Check Render logs
- Verify environment variables
- Test API endpoints directly

**Frontend Issues:**
- Check Netlify deploy logs
- Verify API URL is correct
- Check browser console for errors

**Your Nigerian fashion search platform is ready to serve customers! 🇳🇬👗✨**