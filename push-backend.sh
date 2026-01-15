#!/bin/bash

echo "🚀 Pushing Raws Apparel Backend to GitHub..."

# Navigate to backend directory
cd backend

# Initialize git if not already done
if [ ! -d ".git" ]; then
    git init
    echo "✅ Git initialized"
fi

# Add remote origin
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/eff-1/rawsbackend.git
echo "✅ Remote origin set"

# Add all files
git add .
echo "✅ Files staged"

# Commit
git commit -m "🎉 Initial deployment: Google-powered fashion search API

Features:
- Google Custom Search API integration
- Nigerian fashion focus
- Smart clothing-only filtering
- WhatsApp integration
- Geo-targeted results
- Production-ready deployment

Ready for Render deployment!"

echo "✅ Changes committed"

# Push to main branch
git branch -M main
git push -u origin main --force

echo "🎉 Backend successfully pushed to https://github.com/eff-1/rawsbackend"
echo ""
echo "Next steps:"
echo "1. Go to https://render.com"
echo "2. Connect the rawsbackend repo"
echo "3. Add environment variables"
echo "4. Deploy!"