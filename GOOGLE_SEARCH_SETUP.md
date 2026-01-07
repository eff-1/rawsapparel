# Google Custom Search API Setup Guide

This guide will help you set up Google Custom Search API to power your fashion image search with the same quality results as Google Images.

## Why Google Custom Search?

- **Same results as Google Images**: Access to Google's massive image index
- **High quality**: Better image quality and relevance than other APIs
- **Reliable**: Google's infrastructure ensures consistent uptime
- **Free tier**: 100 searches per day for free
- **Geo-targeted**: Results can be customized by location (Nigeria, US, etc.)

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Name it something like "Raws Apparel Search"

## Step 2: Enable Custom Search API

1. In Google Cloud Console, go to **APIs & Services** > **Library**
2. Search for "Custom Search API"
3. Click on "Custom Search API" and click **Enable**

## Step 3: Create API Key

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **API Key**
3. Copy the API key (keep it secure!)
4. Optional: Restrict the key to Custom Search API only for security

## Step 4: Create Custom Search Engine

1. Go to [Google Custom Search Engine](https://cse.google.com/cse/)
2. Click **Add** to create a new search engine
3. **Sites to search**: Enter `*.com` (to search the entire web)
4. **Name**: "Raws Apparel Fashion Search"
5. Click **Create**

## Step 5: Configure Search Engine

1. After creation, click **Control Panel**
2. Go to **Setup** tab
3. Turn ON **Image search**
4. Turn ON **SafeSearch** (recommended for fashion content)
5. In **Sites to search**, you can add specific fashion sites like:
   - `pinterest.com`
   - `instagram.com`
   - `fashionnova.com`
   - `zara.com`
   - Or keep `*.com` for all sites

## Step 6: Get Search Engine ID

1. In the Control Panel, go to **Setup** tab
2. Copy the **Search engine ID** (looks like: `017576662512468239146:omuauf_lfve`)

## Step 7: Update Environment Variables

Add these to your `backend/.env` file:

```env
# Google Custom Search API
GOOGLE_API_KEY=your_api_key_from_step_3
GOOGLE_SEARCH_ENGINE_ID=your_search_engine_id_from_step_6
```

## Step 8: Test the Setup

1. Start your backend server:
   ```bash
   cd backend
   npm start
   ```

2. Test the API endpoint:
   ```bash
   curl "http://localhost:5003/api/search/images?query=ankara dress&limit=5"
   ```

3. You should see Google image results in the response!

## Pricing & Limits

### Free Tier
- **100 searches per day** for free
- Perfect for development and small-scale testing

### Paid Tier
- **$5 per 1,000 additional queries**
- Up to 10,000 queries per day
- Great for production use

## Advanced Configuration

### Image Filters
You can customize image search in `backend/services/googleSearchService.js`:

```javascript
// Image size options
imgSize: 'small' | 'medium' | 'large' | 'xlarge'

// Image type options  
imgType: 'photo' | 'face' | 'clipart' | 'lineart' | 'animated'

// Safe search levels
safe: 'active' | 'high' | 'medium' | 'off'
```

### Geo-targeting
Results are automatically geo-targeted based on user location:
- Nigeria users get Nigerian fashion results
- US users get American fashion results
- And so on...

## Troubleshooting

### "API key not valid" Error
- Check that Custom Search API is enabled in Google Cloud Console
- Verify the API key is correct in your `.env` file
- Make sure there are no extra spaces in the API key

### "Search engine not found" Error
- Verify the Search Engine ID is correct
- Make sure the search engine has image search enabled

### "Quota exceeded" Error
- You've used your daily 100 free searches
- Either wait until tomorrow or upgrade to paid tier
- The system will automatically fall back to backup APIs (Unsplash, Pexels)

### No results returned
- Try different search terms
- Check that your search engine is set to search the entire web (`*.com`)
- Verify SafeSearch settings aren't too restrictive

## Benefits for Your Fashion Business

1. **Better Results**: Google's algorithm finds the most relevant fashion images
2. **Location-Aware**: Nigerian users see Nigerian fashion, US users see American fashion
3. **High Quality**: Professional fashion photography and styling
4. **Reliable**: Google's infrastructure ensures consistent service
5. **Scalable**: Can handle growth from 100 to 10,000+ searches per day

## Next Steps

Once set up, your fashion search will:
- Show high-quality fashion images from across the web
- Automatically adapt to user location (Nigerian fashion for Nigerian users)
- Fall back to backup APIs if Google quota is exceeded
- Provide clickable images that send WhatsApp messages to your business

The search experience will be similar to Google Images but with your custom UI and direct integration to your WhatsApp business flow!