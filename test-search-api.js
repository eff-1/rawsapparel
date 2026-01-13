#!/usr/bin/env node

// Quick test to verify the search API is working with 12 results
const fetch = require('node-fetch')

async function testSearchAPI() {
    console.log('🧪 Testing Search API for 12 results...')
    
    try {
        const response = await fetch('http://localhost:5003/api/search/images?query=ankara%20dress&page=1&limit=12')
        const data = await response.json()
        
        if (data.success) {
            console.log(`✅ Success: ${data.images.length} images returned`)
            console.log(`📊 Total results: ${data.totalResults}`)
            console.log(`📄 Current page: ${data.currentPage}`)
            console.log(`🔍 Search method: ${data.searchMethod}`)
            
            if (data.images.length > 0) {
                console.log(`\n🖼️  First few results:`)
                data.images.slice(0, 3).forEach((img, i) => {
                    console.log(`${i + 1}. ${img.title}`)
                    console.log(`   Source: ${img.source}`)
                    console.log(`   URL: ${img.imageURL}`)
                })
            }
            
            if (data.images.length === 12) {
                console.log(`\n🎉 Perfect! Got exactly 12 results as requested.`)
            } else {
                console.log(`\n⚠️  Expected 12 results, got ${data.images.length}`)
            }
        } else {
            console.log(`❌ API Error: ${data.message}`)
        }
    } catch (error) {
        console.log(`❌ Request failed: ${error.message}`)
        console.log('Make sure your backend server is running on port 5003')
    }
}

testSearchAPI()