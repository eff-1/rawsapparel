# Raws Apparel Frontend

Vue 3 + Vite + Tailwind CSS frontend for the Raws Apparel tailoring website.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Fill in your Firebase and API configuration.

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/          # Reusable Vue components
│   ├── Navbar.vue      # Navigation component
│   ├── Hero.vue        # Hero section
│   ├── SearchBar.vue   # Search functionality
│   ├── StyleCard.vue   # Style display card
│   ├── AdminCard.vue   # Admin style card
│   └── Footer.vue      # Footer component
├── pages/              # Page components
│   ├── Home.vue        # Homepage
│   ├── Search.vue      # Search results page
│   ├── Collections.vue # Collections page
│   ├── About.vue       # About page
│   └── Admin.vue       # Admin panel
├── utils/              # Utility functions
│   ├── api.js          # API client
│   └── firebase.js     # Firebase configuration
├── App.vue             # Root component
├── main.js             # Application entry point
└── style.css           # Global styles
```

## Key Features

- **Responsive Design:** Mobile-first approach with Tailwind CSS
- **Search Integration:** Unified search across Firebase and Pinterest
- **WhatsApp Integration:** Direct contact with style images
- **Admin Panel:** Content management for styles
- **Firebase Integration:** Authentication and data storage
- **Cloudinary Integration:** Optimized image delivery

## Environment Variables

Create a `.env` file with:

```env
VITE_API_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Development

### Adding New Components

1. Create component in `src/components/`
2. Import and use in pages or other components
3. Follow the established naming conventions

### Styling Guidelines

- Use Tailwind CSS classes
- Follow the Ebony Gold color palette
- Maintain responsive design principles
- Use the custom CSS classes defined in `style.css`

### API Integration

Use the API utility functions from `src/utils/api.js`:

```javascript
import { searchStyles, getStyles } from '@/utils/api'

// Search for styles
const results = await searchStyles('agbada')

// Get all styles
const styles = await getStyles()
```

## Deployment

See [DEPLOYMENT.md](../DEPLOYMENT.md) for detailed deployment instructions.

## Color Palette

- **Primary/Dark:** `#0E0E0E` (jet-black)
- **Brand Accent/Gold:** `#E4B169` (champagne-gold)
- **Secondary/Bronze:** `#A66A2F` (rich-bronze)
- **Base Background:** `#FAF8F6` (soft-warm-gray)
- **Action/WhatsApp:** `#25D366` (whatsapp-green)

## Typography

- **Headings:** Playfair Display (serif)
- **Body:** Inter (sans-serif)

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+