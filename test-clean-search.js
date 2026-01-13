// Test clean search vs enhanced search
const https = require('https')

function makeRequest(query) {
    return new Promise((resolve, reject) => {
        const url = `http://localhost:5003/api/search/images?query=${encodeURIComponent(query)}&page=1&limit=5`
        
        console.log(`\n🔍 Testing query: "${query}"`)
        console.log(`🔗 URL: ${url}`)
        
        const http = require('http')
        http.get(url, (res) => {
            let data = ''
            res.on('data', chunk => data += chunk)
            res.on('end', () => {
                try {
                    const result = JSON.parse(data)
                    if (result.success && result.images.length > 0) {
                        console.log(`✅ Got ${result.images.length} results`)
                        console.log(`📊 Total available: ${result.totalResults}`)
                        console.log(`🖼️  First result: "${result.images[0].title}"`)
                        console.log(`🔗 Image URL: ${result.images[0].imageURL}`)
                    } else {
                        console.log(`❌ No results: ${result.message}`)
                    }
                    resolve(result)
                } catch (error) {
                    reject(error)
                }
            })
        }).on('error', reject)
    })
}

async function testBothQueries() {
    console.log('🧪 Testing Clean vs Enhanced Queries')
    console.log('=' .repeat(50))
    
    // Test 1: Clean query (what GoogleSearchDemo should send)
    await makeRequest('ankara dress')
    
    // Test 2: Enhanced query (what Search.vue sends)
    await makeRequest('ankara dress women ladies female dress gown blouse skirt outfit clothing fashion wear -money -cash -currency')
    
    console.log('\n💡 The first query should give you normal Google results')
    console.log('💡 The second query gives filtered/modified results')
}

testBothQueries().catch(console.error)