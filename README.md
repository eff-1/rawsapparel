# Raws Apparel - Fashion Search & Tailoring Platform

A premium fashion search and tailoring platform for Raws Apparel, featuring **Google-powered image search** that lets customers find and order custom fashion pieces through WhatsApp.

## 🌟 Key Features

- **🔍 Google Custom Search**: High-quality fashion image search powered by Google's API
- **🌍 Location-Aware**: Nigerian users see Nigerian fashion, US users see American styles
- **📱 WhatsApp Integration**: One-click ordering through WhatsApp Business
- **🎨 Premium UI/UX**: Modern, minimal design with Ebony Gold theme
- **⚡ Fast & Reliable**: Built with Vue 3, Node.js, and Google's infrastructure

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)
```bash
# Clone the repository
git clone <your-repo-url>
cd raws-apparel

# Run the setup script
node setup-google-search.js

# Start the servers
cd backend && npm start
cd frontend && npm run dev
```

### Option 2: Manual Setup
1. Follow [Google Search Setup Guide](./GOOGLE_SEARCH_SETUP.md)
2. Configure environment variables
3. Start backend and frontend servers

## 🏗️ Project Structure

```
/raws-apparel
├── /frontend                 # Vue 3 + Tailwind CSS
├── /backend                  # Node.js + Express API
│   ├── /services
│   │   ├── googleSearchService.js    # Google Custom Search
│   │   ├── imageSearchService.js     # Multi-source search
│   │   └── whatsappService.js        # WhatsApp integration
│   └── /routes
├── /design-assets
├── GOOGLE_SEARCH_SETUP.md    # Google API setup guide
└── DEPLOYMENT.md             # Deployment instructions
```

## 🛠️ Tech Stack

### Frontend
- **Vue 3** - Modern reactive framework
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **Responsive Design** - Mobile-first approach

### Backend
- **Node.js + Express** - RESTful API server
- **Google Custom Search API** - Primary image search
- **Unsplash/Pexels APIs** - Backup image sources
- **Firebase Firestore** - Database
- **Cloudinary** - Image storage

### Search Technology
- **Primary**: Google Custom Search API (100 free searches/day)
- **Backup**: Unsplash + Pexels APIs (when Google quota exceeded)
- **Geo-targeting**: Location-aware fashion results
- **Smart Queries**: Cultural context for better results

## 🎨 Design System - Ebony Gold

- **Primary**: Jet Black `#0E0E0E`
- **Accent**: Champagne Gold `#E4B169`
- **Secondary**: Rich Bronze `#A66A2F`
- **Background**: Soft Warm Gray `#FAF8F6`
- **Action**: WhatsApp Green `#25D366`

**Typography**: Playfair Display (headings) + Inter (body)

## 🔧 API Endpoints

### Search
- `GET /api/search/images?query=ankara dress` - Multi-source image search
- `GET /api/google-test/setup` - Test Google API configuration
- `GET /api/google-test/search?query=fashion` - Test Google search

### Business
- `POST /api/whatsapp-link` - Generate WhatsApp order links
- `GET /api/styles` - Get custom styles database

## 🌍 How It Works

1. **Customer searches** for fashion (e.g., "ankara dress", "wedding gown")
2. **Google Custom Search** finds high-quality images from across the web
3. **Location detection** shows relevant regional fashion styles
4. **Customer clicks** on desired style
5. **WhatsApp message** is auto-generated with style details
6. **Business receives** order inquiry via WhatsApp
7. **Custom tailoring** process begins

## 📊 Search Performance

- **Primary**: Google Custom Search (high quality, 100/day free)
- **Backup**: Unsplash + Pexels (when Google quota exceeded)
- **Fallback**: Demo images (for development)
- **Response time**: < 2 seconds average
- **Results quality**: Professional fashion photography

## 🚀 Deployment

### Development
```bash
# Backend (http://localhost:5003)
cd backend && npm start

# Frontend (http://localhost:5173)
cd frontend && npm run dev
```

### Production
- **Frontend**: Netlify (automatic deployment)
- **Backend**: Render/Railway (Node.js hosting)
- **Database**: Firebase (managed)
- **Images**: Cloudinary (CDN)

## 📚 Documentation

- [Google Search Setup](./GOOGLE_SEARCH_SETUP.md) - Complete API setup guide
- [Frontend Setup](./frontend/README.md) - Vue.js development
- [Backend Setup](./backend/README.md) - Node.js API setup
- [Deployment Guide](./DEPLOYMENT.md) - Production deployment

## 🤝 Business Model

1. **Free Search**: Customers browse fashion styles for free
2. **WhatsApp Orders**: Direct communication with business
3. **Custom Tailoring**: Personalized fashion creation
4. **Premium Experience**: High-quality search results and UI

## 🔮 Future Enhancements

- **AI Style Recommendations** based on user preferences
- **Virtual Try-On** using AR technology
- **Fabric Selection** integrated into search
- **Order Tracking** through WhatsApp bot
- **Multi-language Support** for international customers

---

**Built with ❤️ for the fashion industry in Nigeria and beyond.**