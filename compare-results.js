#!/usr/bin/env node

// Compare API results with what you expect from direct CSE
const fetch = require('node-fetch')

async function compareResults() {
    console.log('🔍 Comparing API Results with Expected CSE Results...')
    console.log('=' .repeat(60))
    
    const query = 'ankara dress'
    
    try {
        // Test our API
        console.log(`\n📡 Testing our API for "${query}"...`)
        const response = await fetch(`http://localhost:5003/api/search/images?query=${encodeURIComponent(query)}&page=1&limit=12`)
        const data = await response.json()
        
        if (data.success && data.images.length > 0) {
            console.log(`✅ API returned ${data.images.length} results`)
            console.log(`📊 Total available: ${data.totalResults}`)
            console.log(`⏱️  Search time: ${data.searchTime}s`)
            
            console.log(`\n🖼️  API Results:`)
            data.images.forEach((img, i) => {
                console.log(`${i + 1}. ${img.title}`)
                console.log(`   📸 ${img.imageURL}`)
                console.log(`   🏷️  ${img.photographer} | ${img.width}x${img.height}`)
                console.log(`   📝 ${img.description?.substring(0, 80)}...`)
                console.log('')
            })
            
            // Analysis
            console.log(`\n📊 Analysis:`)
            console.log(`- Results per page: ${data.images.length}`)
            console.log(`- Search method: ${data.searchMethod}`)
            console.log(`- Country: ${data.country}`)
            
            const sources = {}
            data.images.forEach(img => {
                sources[img.source] = (sources[img.source] || 0) + 1
            })
            console.log(`- Sources:`, sources)
            
            // Quality check
            const realImages = data.images.filter(img => 
                img.imageURL && 
                !img.imageURL.includes('placeholder') && 
                !img.imageURL.includes('via.placeholder')
            )
            console.log(`- Real images: ${realImages.length}/${data.images.length}`)
            
            if (realImages.length === data.images.length) {
                console.log(`✅ All images are real (no placeholders)`)
            } else {
                console.log(`⚠️  Some placeholder images detected`)
            }
            
        } else {
            console.log(`❌ API failed: ${data.message || 'Unknown error'}`)
        }
        
    } catch (error) {
        console.log(`❌ Test failed: ${error.message}`)
    }
    
    console.log(`\n💡 To compare with direct CSE:`)
    console.log(`1. Go to: https://cse.google.com/cse?cx=92da924ffc63e42af`)
    console.log(`2. Search for: "${query}"`)
    console.log(`3. Compare the titles and images with the API results above`)
    console.log(`4. Check if the results are similar in quality and relevance`)
}

compareResults()