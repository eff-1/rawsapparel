# Raws Apparel - Complete Setup Guide

This guide will walk you through setting up the complete Raws Apparel tailoring website from scratch.

## 🚀 Quick Overview

You're building a premium tailoring website with:
- **Frontend:** Vue 3 + Tailwind CSS (elegant, responsive design)
- **Backend:** Node.js + Express (API server)
- **Database:** Firebase Firestore (styles and content)
- **Storage:** Cloudinary (optimized images)
- **Features:** Search, WhatsApp integration, admin panel

## 📋 Prerequisites

Before starting, ensure you have:
- Node.js 18+ installed
- Git installed
- A code editor (VS Code recommended)
- Accounts for: Firebase, Cloudinary, GitHub

## 🛠️ Step 1: Local Development Setup

### 1.1 Clone and Install

```bash
# Navigate to your project directory
cd raws-apparel

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 1.2 Set up Environment Variables

**Frontend (.env):**
```bash
cd frontend
cp .env.example .env
```

**Backend (.env):**
```bash
cd backend
cp .env.example .env
```

## 🔥 Step 2: Firebase Setup

### 2.1 Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project"
3. Name it "raws-apparel"
4. Disable Google Analytics (optional)
5. Click "Create project"

### 2.2 Enable Firestore Database
1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in production mode"
4. Select your region (choose closest to Nigeria)
5. Click "Done"

### 2.3 Enable Authentication
1. Go to "Authentication" > "Sign-in method"
2. Enable "Email/Password"
3. Click "Save"

### 2.4 Get Firebase Configuration
1. Go to Project Settings (gear icon)
2. Scroll to "Your apps" section
3. Click "Web app" icon (</>)
4. Register app as "raws-apparel-web"
5. Copy the config object

### 2.5 Update Environment Variables
Add Firebase config to both frontend and backend `.env` files:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## ☁️ Step 3: Cloudinary Setup

### 3.1 Create Cloudinary Account
1. Sign up at [Cloudinary](https://cloudinary.com)
2. Verify your email
3. Go to Dashboard

### 3.2 Get Cloudinary Credentials
1. In Dashboard, note down:
   - Cloud name
   - API Key
   - API Secret

### 3.3 Update Backend Environment
Add to `backend/.env`:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 📱 Step 4: WhatsApp Integration

### 4.1 Get WhatsApp Business Number
1. Set up WhatsApp Business account
2. Note your business phone number in international format
3. Example: `2348012345678` (for Nigerian number)

### 4.2 Update Backend Environment
Add to `backend/.env`:
```env
BUSINESS_WHATSAPP_NUMBER=2348012345678
```

## 🏃‍♂️ Step 5: Run the Application

### 5.1 Start Backend Server
```bash
cd backend
npm run dev
```
Server runs on: http://localhost:5000

### 5.2 Start Frontend Development Server
```bash
cd frontend
npm run dev
```
Frontend runs on: http://localhost:3000

### 5.3 Test the Application
1. Open http://localhost:3000
2. Test search functionality
3. Test WhatsApp integration
4. Access admin panel at http://localhost:3000/admin
   - Email: `admin@rawsapparel.com`
   - Password: `admin123`

## 🎨 Step 6: Customization

### 6.1 Update Brand Information
Edit these files to customize:
- `frontend/src/components/Navbar.vue` - Logo and navigation
- `frontend/src/components/Hero.vue` - Main headline and content
- `frontend/src/components/Footer.vue` - Contact information
- `frontend/src/pages/About.vue` - Company story and team

### 6.2 Update WhatsApp Number
Replace the phone number in:
- `backend/.env` - BUSINESS_WHATSAPP_NUMBER
- `frontend/src/components/Footer.vue` - WhatsApp link
- `frontend/src/pages/About.vue` - Contact section

### 6.3 Add Your Images
Replace placeholder images with your actual photos:
- Hero section images
- About page team photos
- Sample style images

## 📊 Step 7: Add Content

### 7.1 Using the Admin Panel
1. Go to http://localhost:3000/admin
2. Login with admin credentials
3. Click "Upload New Style"
4. Fill in style details:
   - Title (e.g., "Royal Agbada")
   - Category (Traditional, Formal, etc.)
   - Description
   - Tags (comma-separated)
   - Upload image
   - Mark as featured if desired

### 7.2 Bulk Content Addition
For adding multiple styles quickly, you can:
1. Use the Firebase Console directly
2. Create a script to import from CSV
3. Use the API endpoints programmatically

## 🚀 Step 8: Deployment (Optional)

When ready to go live, follow the [DEPLOYMENT.md](./DEPLOYMENT.md) guide to deploy to:
- **Frontend:** Netlify (free tier available)
- **Backend:** Render (free tier available)

## 🔧 Troubleshooting

### Common Issues:

**1. Firebase Connection Error:**
- Double-check all Firebase environment variables
- Ensure Firestore is enabled
- Check Firebase project ID

**2. Images Not Loading:**
- Verify Cloudinary credentials
- Check image URLs are accessible
- Ensure CORS is configured

**3. WhatsApp Links Not Working:**
- Verify phone number format (international)
- Test URL encoding
- Check if WhatsApp is installed

**4. Search Not Working:**
- Check backend server is running
- Verify API endpoints are accessible
- Check browser console for errors

### Getting Help:

1. Check browser console for errors
2. Check backend server logs
3. Verify all environment variables are set
4. Test API endpoints directly

## 📝 Next Steps

Once your site is running:

1. **Content:** Add your actual styles and photos
2. **Branding:** Customize colors, fonts, and messaging
3. **SEO:** Add meta tags and optimize for search
4. **Analytics:** Set up Google Analytics
5. **Domain:** Get a custom domain name
6. **SSL:** Ensure HTTPS is enabled
7. **Backup:** Set up regular backups

## 🎯 Key Features to Test

- [ ] Homepage loads correctly
- [ ] Search functionality works
- [ ] Style cards display properly
- [ ] WhatsApp integration opens correctly
- [ ] Admin panel login works
- [ ] Image upload in admin works
- [ ] Mobile responsiveness
- [ ] All navigation links work

## 📞 Support

If you encounter issues:
1. Check this guide first
2. Review error messages carefully
3. Test each component individually
4. Verify all environment variables

Your Raws Apparel website should now be fully functional! 🎉

## 🔄 Regular Maintenance

- Update dependencies monthly
- Monitor Firebase usage
- Check Cloudinary storage limits
- Backup your data regularly
- Monitor site performance