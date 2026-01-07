#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

console.log(`
🚀 Raws Apparel - Google Custom Search Setup
============================================

This script will help you set up Google Custom Search API for your fashion image search.
You'll get the same high-quality results as Google Images with your custom UI!

Benefits:
✅ Access to Google's massive image database
✅ High-quality fashion photography
✅ Location-aware results (Nigerian fashion for Nigerian users)
✅ 100 free searches per day
✅ Reliable Google infrastructure

Let's get started!
`)

const questions = [
  {
    key: 'GOOGLE_API_KEY',
    question: 'Enter your Google API Key (from Google Cloud Console): ',
    required: true
  },
  {
    key: 'GOOGLE_SEARCH_ENGINE_ID', 
    question: 'Enter your Custom Search Engine ID (from Google CSE): ',
    required: true
  },
  {
    key: 'UNSPLASH_ACCESS_KEY',
    question: 'Enter your Unsplash Access Key (optional, for backup): ',
    required: false
  },
  {
    key: 'PEXELS_API_KEY',
    question: 'Enter your Pexels API Key (optional, for backup): ',
    required: false
  }
]

async function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim())
    })
  })
}

async function setupEnvironment() {
  const envPath = path.join(__dirname, 'backend', '.env')
  const envExamplePath = path.join(__dirname, 'backend', '.env.example')
  
  // Read existing .env or create from example
  let envContent = ''
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8')
    console.log('📝 Found existing .env file, will update it...')
  } else if (fs.existsSync(envExamplePath)) {
    envContent = fs.readFileSync(envExamplePath, 'utf8')
    console.log('📝 Creating .env file from .env.example...')
  } else {
    console.log('❌ No .env.example file found. Please make sure you\'re in the project root directory.')
    process.exit(1)
  }

  console.log('\n📋 Please provide the following API credentials:\n')

  const answers = {}
  
  for (const q of questions) {
    let answer = await askQuestion(q.question)
    
    if (q.required && !answer) {
      console.log(`❌ ${q.key} is required. Please provide a valid value.`)
      answer = await askQuestion(q.question)
    }
    
    if (answer) {
      answers[q.key] = answer
    }
  }

  // Update environment variables
  let updatedEnvContent = envContent
  
  for (const [key, value] of Object.entries(answers)) {
    const regex = new RegExp(`^${key}=.*$`, 'm')
    if (regex.test(updatedEnvContent)) {
      updatedEnvContent = updatedEnvContent.replace(regex, `${key}=${value}`)
    } else {
      updatedEnvContent += `\n${key}=${value}`
    }
  }

  // Write updated .env file
  fs.writeFileSync(envPath, updatedEnvContent)
  console.log('\n✅ Environment variables updated successfully!')

  return answers
}

async function testSetup(apiKey, searchEngineId) {
  console.log('\n🧪 Testing Google Custom Search API setup...')
  
  try {
    const fetch = require('node-fetch')
    
    const testUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=fashion&searchType=image&num=1`
    
    const response = await fetch(testUrl)
    const data = await response.json()
    
    if (response.ok && data.items && data.items.length > 0) {
      console.log('✅ Google Custom Search API is working!')
      console.log(`📊 Test search returned ${data.searchInformation.totalResults} total results`)
      console.log(`⏱️  Search completed in ${data.searchInformation.searchTime} seconds`)
      return true
    } else {
      console.log('❌ API test failed:', data.error?.message || 'Unknown error')
      return false
    }
  } catch (error) {
    console.log('❌ API test failed:', error.message)
    return false
  }
}

async function showNextSteps() {
  console.log(`
🎉 Setup Complete!
==================

Your Google Custom Search API is now configured. Here's what you can do next:

1. 🚀 Start your backend server:
   cd backend && npm start

2. 🧪 Test the API:
   curl "http://localhost:5003/api/google-test/setup"

3. 🔍 Try a search:
   curl "http://localhost:5003/api/search/images?query=ankara dress&limit=5"

4. 🌐 Start your frontend:
   cd frontend && npm run dev

5. 📱 Test the full experience:
   - Search for fashion items
   - Click on images
   - Send WhatsApp messages to your business

📊 API Limits:
- Free tier: 100 searches per day
- Paid tier: $5 per 1,000 additional searches
- Perfect for development and small-scale production

🔧 Configuration Files:
- Backend: backend/.env (your API keys)
- Frontend: frontend/.env (API endpoints)

📚 Documentation:
- Google Setup: GOOGLE_SEARCH_SETUP.md
- Project Setup: SETUP_GUIDE.md

Happy searching! 🎨👗👔
`)
}

async function main() {
  try {
    const answers = await setupEnvironment()
    
    if (answers.GOOGLE_API_KEY && answers.GOOGLE_SEARCH_ENGINE_ID) {
      const testPassed = await testSetup(answers.GOOGLE_API_KEY, answers.GOOGLE_SEARCH_ENGINE_ID)
      
      if (testPassed) {
        await showNextSteps()
      } else {
        console.log(`
❌ Setup completed but API test failed.

Please check:
1. Your Google API Key is correct
2. Custom Search API is enabled in Google Cloud Console
3. Your Search Engine ID is correct
4. Your search engine has image search enabled

Refer to GOOGLE_SEARCH_SETUP.md for detailed instructions.
`)
      }
    } else {
      console.log('\n⚠️  Setup completed but Google API credentials are missing.')
      console.log('Please refer to GOOGLE_SEARCH_SETUP.md for setup instructions.')
    }
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message)
  } finally {
    rl.close()
  }
}

// Run the setup
main()