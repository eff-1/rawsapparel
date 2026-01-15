# Deployment Guide for Raws Apparel

This guide will walk you through deploying the Raws Apparel website to production.

## Prerequisites

1. **Accounts needed:**
   - [Netlify](https://netlify.com) account (for frontend)
   - [Render](https://render.com) account (for backend)
   - [Firebase](https://firebase.google.com) project
   - [Cloudinary](https://cloudinary.com) account
   - GitHub account

2. **Local setup:**
   - Node.js 18+ installed
   - Git installed

## Step 1: Set up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project called "raws-apparel"
3. Enable Firestore Database:
   - Go to Firestore Database
   - Create database in production mode
   - Choose your region
4. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Email/Password
5. Get your Firebase config:
   - Go to Project Settings > General
   - Scroll to "Your apps" and click "Web app"
   - Copy the config object

## Step 2: Set up Cloudinary

1. Sign up at [Cloudinary](https://cloudinary.com)
2. Go to Dashboard
3. Note down:
   - Cloud name
   - API Key
   - API Secret

## Step 3: Deploy Backend to Render

1. Push your code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com)
3. Click "New +" > "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name:** raws-apparel-api
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free (for testing)

6. Add Environment Variables:
   ```
   NODE_ENV=production
   FIREBASE_API_KEY=your_firebase_api_key
   FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   FIREBASE_APP_ID=your_app_id
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   BUSINESS_WHATSAPP_NUMBER=2348012345678
   ```

7. Click "Create Web Service"
8. Note the deployed URL (e.g., `https://raws-apparel-api.onrender.com`)

## Step 4: Deploy Frontend to Netlify

1. Go to [Netlify](https://app.netlify.com)
2. Click "New site from Git"
3. Connect your GitHub repository
4. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Base directory:** `frontend`

5. Add Environment Variables:
   ```
   VITE_API_URL=https://your-render-app.onrender.com/api
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

6. Click "Deploy site"
7. Your site will be available at a Netlify URL

## Step 5: Configure Custom Domain (Optional)

### For Netlify (Frontend):
1. Go to Site settings > Domain management
2. Add custom domain (e.g., `rawsapparel.com`)
3. Follow DNS configuration instructions

### For Render (Backend):
1. Go to your service settings
2. Add custom domain (e.g., `api.rawsapparel.com`)
3. Update DNS records as instructed

## Step 6: Set up Firebase Security Rules

1. Go to Firestore Database > Rules
2. Update rules:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Allow read access to styles collection
       match /styles/{document} {
         allow read: if true;
         allow write: if request.auth != null;
       }
     }
   }
   ```

## Step 7: Test Your Deployment

1. Visit your Netlify URL
2. Test search functionality
3. Test WhatsApp integration
4. Test admin panel (use admin@rawsapparel.com / admin123)

## Step 8: Set up Monitoring (Optional)

### Backend Monitoring:
- Render provides basic monitoring
- Consider adding error tracking (Sentry)

### Frontend Monitoring:
- Netlify provides analytics
- Consider Google Analytics

## Environment Variables Summary

### Backend (.env):
```
NODE_ENV=production
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
BUSINESS_WHATSAPP_NUMBER=2348012345678
```

### Frontend (.env):
```
VITE_API_URL=https://your-render-app.onrender.com/api
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## Troubleshooting

### Common Issues:

1. **CORS Errors:**
   - Ensure backend CORS is configured for your frontend domain

2. **Firebase Connection Issues:**
   - Double-check all Firebase environment variables
   - Ensure Firestore rules allow read access

3. **Image Upload Issues:**
   - Verify Cloudinary credentials
   - Check file size limits

4. **WhatsApp Links Not Working:**
   - Ensure phone number is in international format
   - Test URL encoding

## Next Steps

1. **Custom Domain:** Set up your custom domain
2. **SSL Certificate:** Ensure HTTPS is enabled
3. **Analytics:** Add Google Analytics
4. **SEO:** Optimize meta tags and sitemap
5. **Performance:** Monitor and optimize loading times

## Support

For deployment issues:
- Check Render/Netlify logs
- Review Firebase console for errors
- Test API endpoints directly

Your Raws Apparel website should now be live and fully functional!