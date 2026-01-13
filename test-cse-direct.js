#!/usr/bin/env node

// Test script to understand what parameters the direct CSE uses
// Run this to see the exact API calls made by the direct CSE

const fetch = require('node-fetch')

async function testDirectCSE() {
    console.log('🧪 Testing Direct CSE Parameters...')
    
    const apiKey = process.env.GOOGLE_API_KEY || 'YOUR_API_KEY'
    const cx = '92da924ffc63e42af'
    const query = 'ankara dress'
    
    // Test different parameter combinations to match direct CSE
    const testConfigs = [
        {
            name: 'Minimal Parameters (like direct CSE)',
            params: {
                key: apiKey,
                cx: cx,
                q: query,
                searchType: 'image',
                num: 10,
                start: 1
            }
        },
        {
            name: 'With Country & Language',
            params: {
                key: apiKey,
                cx: cx,
                q: query,
                searchType: 'image',
                num: 10,
                start: 1,
                gl: 'ng',
                hl: 'en'
            }
        },
        {
            name: 'With All Filters',
            params: {
                key: apiKey,
                cx: cx,
                q: query,
                searchType: 'image',
                num: 10,
                start: 1,
                gl: 'ng',
                hl: 'en',
                filter: '1',
                safe: 'active',
                imgSize: 'medium',
                imgType: 'photo'
            }
        }
    ]
    
    for (const config of testConfigs) {
        console.log(`\n📋 Testing: ${config.name}`)
        
        const searchParams = new URLSearchParams(config.params)
        const url = `https://www.googleapis.com/customsearch/v1?${searchParams}`
        
        console.log(`🔗 URL: ${url}`)
        
        try {
            const response = await fetch(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    'Referer': 'https://cse.google.com/'
                }
            })
            
            if (response.ok) {
                const data = await response.json()
                console.log(`✅ Success: ${data.items?.length || 0} results`)
                console.log(`📊 Total: ${data.searchInformation?.totalResults || 'unknown'}`)
                console.log(`⏱️  Time: ${data.searchInformation?.searchTime || 'unknown'}s`)
                
                if (data.items && data.items.length > 0) {
                    console.log(`🖼️  First result: ${data.items[0].title}`)
                    console.log(`🔗 Image URL: ${data.items[0].link}`)
                }
            } else {
                console.log(`❌ Failed: ${response.status} ${response.statusText}`)
            }
        } catch (error) {
            console.log(`❌ Error: ${error.message}`)
        }
        
        // Wait between requests to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000))
    }
}

// Run the test
testDirectCSE().catch(console.error)