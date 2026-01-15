<template>
  <div class="min-h-screen bg-soft-warm-gray py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-jet-black mb-4">Pinterest RSS Scraper Test</h1>
        <p class="text-gray-600">Testing Pinterest RSS feed scraping with HD image extraction</p>
      </div>
      
      <!-- Test Form -->
      <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div class="flex gap-4 mb-6">
          <input
            v-model="testQuery"
            type="text"
            placeholder="Enter search term (e.g., fashion, dress, suit)"
            class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-champagne-gold"
          />
          <button 
            @click="testPinterestAPI"
            :disabled="loading"
            class="btn-primary px-8"
          >
            {{ loading ? 'Scraping...' : 'Test Pinterest RSS' }}
          </button>
        </div>
        
        <!-- API Status -->
        <div v-if="apiStatus" class="mb-6 p-4 rounded-lg" :class="apiStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
          <h3 class="font-medium mb-2">{{ apiStatus.success ? '✅ Fashion Search: Working' : '❌ Fashion Search: Failed' }}</h3>
          <p class="text-sm">{{ apiStatus.message }}</p>
          <p class="text-xs mt-1">Method: {{ apiStatus.apiKey }}</p>
        </div>
      </div>
      
      <!-- Loading -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-champagne-gold"></div>
        <p class="mt-4 text-gray-600">Testing Pinterest API...</p>
      </div>
      
      <!-- Error -->
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-8">
        <h3 class="font-medium mb-2">❌ Pinterest API Error</h3>
        <p class="mb-2">{{ error.message }}</p>
        <details class="text-sm">
          <summary class="cursor-pointer">Show technical details</summary>
          <pre class="mt-2 bg-red-50 p-2 rounded text-xs overflow-auto">{{ JSON.stringify(error, null, 2) }}</pre>
        </details>
      </div>
      
      <!-- Raw API Response -->
      <div v-if="rawResponse" class="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 class="text-xl font-medium mb-4">🔍 Raw Pinterest API Response</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <h3 class="font-medium mb-2">Query Info:</h3>
            <ul class="text-sm text-gray-600 space-y-1">
              <li><strong>Search Term:</strong> {{ rawResponse.query }}</li>
              <li><strong>Working Endpoint:</strong> {{ rawResponse.workingEndpoint || 'None found' }}</li>
              <li><strong>Ping Result:</strong> {{ rawResponse.pingResult ? 'Success' : 'Failed' }}</li>
            </ul>
          </div>
          <div>
            <h3 class="font-medium mb-2">API Response:</h3>
            <details class="text-sm">
              <summary class="cursor-pointer text-champagne-gold">Show full response</summary>
              <pre class="mt-2 bg-gray-50 p-2 rounded text-xs overflow-auto max-h-40">{{ JSON.stringify(rawResponse.rawResults, null, 2) }}</pre>
            </details>
          </div>
        </div>
      </div>
      
      <!-- Processed Results -->
      <div v-if="processedResults.length > 0" class="bg-white rounded-2xl shadow-lg p-8">
        <h2 class="text-xl font-medium mb-6">📌 Processed Pinterest Results ({{ processedResults.length }})</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="result in processedResults" 
            :key="result.id"
            class="border border-gray-200 rounded-lg overflow-hidden"
          >
            <img 
              :src="result.imageURL" 
              :alt="result.title"
              class="w-full h-48 object-cover"
              @error="handleImageError"
            />
            <div class="p-4">
              <h3 class="font-medium text-sm mb-1">{{ result.title }}</h3>
              <p class="text-xs text-gray-600 mb-2">{{ result.description }}</p>
              <div class="flex flex-wrap gap-1 mb-2">
                <span 
                  v-for="tag in result.tags" 
                  :key="tag"
                  class="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs"
                >
                  {{ tag }}
                </span>
              </div>
              <!-- Pinterest Link Button -->
              <button 
                v-if="result.pinterestLink"
                @click="openPinterestLink(result.pinterestLink)"
                class="w-full bg-purple-600 text-white px-3 py-1 rounded text-xs hover:bg-purple-700 transition-colors"
              >
                📌 View on Pinterest
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- No Results -->
      <div v-if="!loading && !error && processedResults.length === 0 && rawResponse" class="text-center py-12">
        <h3 class="text-xl font-medium text-gray-900 mb-2">No Pinterest Results Found</h3>
        <p class="text-gray-600">The API responded but returned no usable image data.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PinterestTest',
  data() {
    return {
      testQuery: 'fashion',
      loading: false,
      error: null,
      rawResponse: null,
      processedResults: [],
      apiStatus: null
    }
  },
  methods: {
    async testPinterestAPI() {
      this.loading = true
      this.error = null
      this.rawResponse = null
      this.processedResults = []
      this.apiStatus = null
      
      try {
        console.log(`🔍 Testing fashion inspiration search for: ${this.testQuery}`)
        
        const response = await fetch(`http://localhost:5003/api/search/pinterest?query=${encodeURIComponent(this.testQuery)}`)
        const data = await response.json()
        
        if (response.ok && data.success) {
          this.rawResponse = {
            query: this.testQuery,
            workingEndpoint: 'Curated Fashion Database with Pinterest Links',
            pingResult: true,
            rawResults: data.results
          }
          
          this.apiStatus = {
            success: true,
            message: `Successfully generated ${data.results.length} fashion inspiration results`,
            apiKey: 'Curated Database + Pinterest Links'
          }
          
          // Process the results
          this.processedResults = data.results.map(result => ({
            id: result.id,
            title: result.title,
            imageURL: result.imageURL,
            description: result.description,
            tags: result.tags,
            pinterestLink: result.pinterestLink,
            actionText: result.actionText
          }))
          
        } else {
          this.error = {
            message: data.message || 'Fashion search failed',
            details: data
          }
          this.apiStatus = {
            success: false,
            message: data.message || 'Fashion search failed',
            apiKey: 'Curated Database'
          }
        }
      } catch (err) {
        this.error = {
          message: 'Network error: ' + err.message,
          details: err
        }
        this.apiStatus = {
          success: false,
          message: 'Network connection failed'
        }
      } finally {
        this.loading = false
      }
    },
    
    async tryDirectPinterestSearch() {
      try {
        console.log(`🔄 Trying direct Pinterest search with CORS proxy...`)
        
        // Use a CORS proxy for direct Pinterest access
        const proxyUrl = 'https://api.allorigins.win/raw?url='
        const pinterestUrl = `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(this.testQuery)}&source_id=rss`
        const fullUrl = proxyUrl + encodeURIComponent(pinterestUrl)
        
        console.log(`📡 Fetching via proxy: ${fullUrl}`)
        
        const response = await fetch(fullUrl)
        
        if (!response.ok) {
          throw new Error(`Proxy request failed: ${response.status}`)
        }
        
        const responseText = await response.text()
        console.log(`✅ Got response (${responseText.length} chars), parsing...`)
        
        // Try to extract Pinterest pins from the response
        const results = this.extractPinterestPins(responseText)
        
        if (results.length > 0) {
          this.rawResponse = {
            query: this.testQuery,
            workingEndpoint: 'Direct Pinterest via CORS Proxy',
            pingResult: true,
            rawResults: { responseLength: responseText.length, extractedPins: results.length }
          }
          
          this.apiStatus = {
            success: true,
            message: `Successfully extracted ${results.length} Pinterest pins via direct method`,
            apiKey: 'Direct Pinterest (No API Key)'
          }
          
          this.processedResults = results
        } else {
          throw new Error('No Pinterest pins found in response')
        }
        
      } catch (directError) {
        console.error('Direct Pinterest search failed:', directError)
        
        this.error = {
          message: 'All Pinterest methods failed: ' + directError.message,
          details: directError
        }
        
        this.apiStatus = {
          success: false,
          message: 'Both backend and direct methods failed'
        }
        
        // Show some demo results so user can see the UI
        this.showDemoResults()
      }
    },
    
    extractPinterestPins(responseText) {
      const results = []
      
      try {
        // Look for Pinterest pin URLs
        const pinUrlRegex = /https:\/\/www\.pinterest\.com\/pin\/(\d+)/g
        const pinMatches = [...responseText.matchAll(pinUrlRegex)]
        
        // Get unique pin IDs
        const uniquePinIds = [...new Set(pinMatches.map(match => match[1]))]
        console.log(`📌 Found ${uniquePinIds.length} unique Pinterest pins`)
        
        uniquePinIds.slice(0, 12).forEach((pinId, index) => {
          results.push({
            id: `pinterest-${pinId}`,
            title: `${this.testQuery} Style ${index + 1}`,
            imageURL: `https://i.pinimg.com/736x/${pinId}.jpg`,
            description: `Fashion inspiration for ${this.testQuery}`,
            tags: ['Pinterest', 'Direct', this.testQuery],
            pinId: pinId,
            originalLink: `https://www.pinterest.com/pin/${pinId}`
          })
        })
        
      } catch (error) {
        console.error('Pin extraction error:', error)
      }
      
      return results
    },
    
    showDemoResults() {
      // Show demo results so user can see the interface works
      this.processedResults = [
        {
          id: 'demo-1',
          title: `${this.testQuery} Fashion Demo`,
          imageURL: 'https://images.unsplash.com/photo-1566479179817-c0b5b4b4b1e5?w=400&h=500&fit=crop',
          description: 'Demo result - Pinterest integration in progress',
          tags: ['Demo', this.testQuery]
        },
        {
          id: 'demo-2', 
          title: `Modern ${this.testQuery} Style`,
          imageURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
          description: 'Demo result - showing UI functionality',
          tags: ['Demo', this.testQuery]
        }
      ]
      
      this.apiStatus = {
        success: false,
        message: 'Showing demo results - Pinterest integration needs refinement'
      }
    },
    
    processResults(rawData) {
      // This method is no longer needed as we process results directly in testPinterestAPI
      console.log('Raw data received:', rawData)
    },
    
    openPinterestLink(url) {
      console.log('🔗 Opening Pinterest link:', url)
      window.open(url, '_blank')
    },
    
    handleImageError(event) {
      event.target.src = 'https://via.placeholder.com/400x500?text=Image+Error'
    }
  }
}
</script>