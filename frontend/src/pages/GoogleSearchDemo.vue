<template>
  <div class="min-h-screen bg-soft-warm-gray py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-jet-black mb-4">🌐 Google-Powered Fashion Search</h1>
        <p class="text-xl text-gray-600 mb-6">
          Experience the same high-quality image search as Google Images, but for fashion!
        </p>
        
        <!-- API Status -->
        <div class="bg-white rounded-2xl shadow-lg p-6 mb-8 max-w-4xl mx-auto">
          <h2 class="text-2xl font-semibold mb-4">🔧 API Configuration Status</h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h3 class="font-medium mb-2">🌐 Google Custom Search API</h3>
              <div v-if="apiStatus.google" class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span>API Key:</span>
                  <span :class="apiStatus.google.apiKey === 'Configured' ? 'text-green-600' : 'text-red-600'">
                    {{ apiStatus.google.apiKey }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span>Search Engine ID:</span>
                  <span :class="apiStatus.google.searchEngineId === 'Configured' ? 'text-green-600' : 'text-red-600'">
                    {{ apiStatus.google.searchEngineId }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span>Status:</span>
                  <span :class="apiStatus.google.isConfigured ? 'text-green-600' : 'text-orange-600'">
                    {{ apiStatus.google.isConfigured ? '✅ Ready' : '⚠️ Demo Mode' }}
                  </span>
                </div>
              </div>
              <div v-else class="text-gray-500">Loading...</div>
            </div>
            
            <div>
              <h3 class="font-medium mb-2">📊 Search Performance</h3>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span>Primary Source:</span>
                  <span class="text-blue-600">Google Custom Search</span>
                </div>
                <div class="flex justify-between">
                  <span>Backup Sources:</span>
                  <span class="text-green-600">Unsplash + Pexels</span>
                </div>
                <div class="flex justify-between">
                  <span>Daily Limit:</span>
                  <span class="text-gray-600">100 searches (free)</span>
                </div>
              </div>
            </div>
          </div>
          
          <div v-if="!apiStatus.google?.isConfigured" class="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <p class="text-orange-800 text-sm">
              <strong>Demo Mode:</strong> Google API not configured. Using placeholder images. 
              <a href="/GOOGLE_SEARCH_SETUP.md" class="underline">Setup Google API</a> for real results.
            </p>
          </div>
        </div>
        
        <!-- Search Form -->
        <div class="max-w-2xl mx-auto mb-8">
          <div class="flex gap-4 mb-4">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Try: ankara dress, wedding gown, business suit, mama styles..."
              class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-champagne-gold text-lg"
              @keyup.enter="performSearch"
              @input="onSearchInput"
            />
            <button 
              @click="performSearch"
              :disabled="loading"
              class="btn-primary px-8 py-3 text-lg"
            >
              {{ loading ? 'Searching...' : 'Search' }}
            </button>
          </div>
          
          <!-- Quick Test Buttons -->
          <div class="flex flex-wrap gap-2 justify-center">
            <button 
              v-for="example in exampleQueries" 
              :key="example"
              @click="searchQuery = example; performSearch()"
              class="px-3 py-1 bg-white border border-champagne-gold text-champagne-gold rounded-full text-sm hover:bg-champagne-gold hover:text-white transition-colors"
            >
              {{ example }}
            </button>
          </div>
        </div>
      </div>
      
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-champagne-gold"></div>
        <p class="mt-4 text-gray-600">Searching fashion images worldwide...</p>
        <p class="text-sm text-gray-500 mt-2">Powered by Google Custom Search API</p>
      </div>
      
      <!-- Search Results -->
      <div v-else-if="searchResults">
        <!-- Results Info -->
        <div class="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div class="grid md:grid-cols-3 gap-6">
            <div>
              <h3 class="font-medium mb-2">🔍 Search Details</h3>
              <ul class="text-sm text-gray-600 space-y-1">
                <li><strong>Query:</strong> "{{ searchResults.query }}"</li>
                <li><strong>Results Found:</strong> {{ searchResults.totalResults.toLocaleString() }}</li>
                <li><strong>Search Method:</strong> {{ searchResults.searchMethod || 'google-custom-search' }}</li>
                <li><strong>Response Time:</strong> {{ searchTime }}ms</li>
              </ul>
            </div>
            <div>
              <h3 class="font-medium mb-2">📊 Source Breakdown</h3>
              <div class="space-y-1 text-sm">
                <div class="flex justify-between">
                  <span>Google:</span>
                  <span class="text-blue-600">{{ getSourceCount('google') }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Unsplash:</span>
                  <span class="text-green-600">{{ getSourceCount('unsplash') }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Pexels:</span>
                  <span class="text-purple-600">{{ getSourceCount('pexels') }}</span>
                </div>
                <div class="flex justify-between">
                  <span>Demo:</span>
                  <span class="text-gray-600">{{ getSourceCount('demo') }}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 class="font-medium mb-2">🌍 Location & Quality</h3>
              <ul class="text-sm text-gray-600 space-y-1">
                <li><strong>Country:</strong> {{ getCountryName(searchResults.country) }}</li>
                <li><strong>Images Loaded:</strong> {{ loadedImages }}/{{ searchResults.images.length }}</li>
                <li><strong>Quality:</strong> <span class="text-green-600">High Definition</span></li>
                <li><strong>Status:</strong> <span class="text-green-600">✅ Active</span></li>
              </ul>
            </div>
          </div>
        </div>
        
        <!-- Results Grid -->
        <div v-if="searchResults.images.length > 0">
          <!-- Pagination Info -->
          <div class="flex justify-between items-center mb-6">
            <div class="text-sm text-gray-600">
              Showing {{ ((currentPage - 1) * resultsPerPage) + 1 }}-{{ Math.min(currentPage * resultsPerPage, searchResults.totalResults) }} 
              of {{ searchResults.totalResults.toLocaleString() }} results
            </div>
            <div class="text-sm text-gray-500">
              Page {{ currentPage }} of {{ searchResults.totalPages }}
            </div>
          </div>
          
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-4 mb-8">
            <div 
              v-for="image in searchResults.images" 
              :key="image.id"
              class="group cursor-pointer"
              @click="selectImage(image)"
            >
              <div class="bg-white rounded-2xl shadow-lg overflow-hidden card-hover">
                <!-- Image Container -->
                <div class="relative overflow-hidden">
                  <img 
                    :src="image.thumbnailURL || image.imageURL" 
                    :alt="image.title"
                    class="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
                    @error="handleImageError"
                    @load="handleImageLoad"
                    loading="lazy"
                    decoding="async"
                    :data-src="image.imageURL"
                  />
                  
                  <!-- Source Badge -->
                  <div class="absolute top-2 right-2">
                    <span :class="getSourceBadgeClass(image.source)" class="px-2 py-1 rounded text-xs font-medium">
                      {{ image.source }}
                    </span>
                  </div>
                </div>
                
                <!-- Content -->
                <div class="p-4">
                  <h3 class="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                    {{ image.title }}
                  </h3>
                  <p class="text-xs text-gray-500 mb-3">
                    {{ image.photographer }} • {{ image.width }}×{{ image.height }}
                  </p>
                  
                  <!-- Action Buttons -->
                  <div class="flex gap-2">
                    <button 
                      @click.stop="selectImage(image)"
                      class="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
                    >
                      👁️ View
                    </button>
                    
                    <button 
                      @click.stop="sendToWhatsApp(image)"
                      class="flex-1 bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors duration-200 flex items-center justify-center gap-1"
                    >
                      📱 Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Pagination Controls -->
          <div class="flex justify-center items-center space-x-4 mb-8">
            <button 
              @click="prevPage"
              :disabled="currentPage <= 1"
              class="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ← Previous
            </button>
            
            <!-- Page Numbers -->
            <div class="flex space-x-2">
              <template v-for="page in getVisiblePages()" :key="page">
                <span 
                  v-if="page === '...'"
                  class="px-3 py-2 text-sm text-gray-500"
                >
                  ...
                </span>
                <button 
                  v-else
                  @click="goToPage(page)"
                  :class="[
                    'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    page === currentPage 
                      ? 'bg-champagne-gold text-jet-black' 
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  ]"
                >
                  {{ page }}
                </button>
              </template>
            </div>
            
            <button 
              @click="nextPage"
              :disabled="!searchResults.hasNextPage"
              class="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next →
            </button>
          </div>
          
          <!-- Preload Status -->
          <div v-if="Object.keys(preloadedPages).length > 0" class="text-center text-sm text-gray-500 mb-4">
            ⚡ Pages {{ Object.keys(preloadedPages).join(', ') }} preloaded for instant navigation
          </div>
        </div>
        
        <!-- No Results -->
        <div v-else class="text-center py-12">
          <svg class="mx-auto h-24 w-24 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <h3 class="text-xl font-medium text-gray-900 mb-2">No images found</h3>
          <p class="text-gray-600">Try a different search term or check your API configuration</p>
        </div>
      </div>
    </div>
    
    <!-- Image Modal -->
    <div v-if="showImageModal && selectedImage" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" @click="showImageModal = false">
      <div class="max-w-2xl max-h-screen p-4" @click.stop>
        <div class="bg-white rounded-2xl overflow-hidden">
          <div class="relative">
            <img :src="selectedImage.imageURL || selectedImage.thumbnailURL" :alt="selectedImage.title" class="w-full h-auto max-h-96 object-cover">
            <button 
              @click="showImageModal = false"
              class="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75"
            >
              ✕
            </button>
            <!-- Source Badge in Modal -->
            <div class="absolute top-4 left-4">
              <span :class="getSourceBadgeClass(selectedImage.source)" class="px-3 py-1 rounded text-sm font-medium">
                {{ selectedImage.source }}
              </span>
            </div>
          </div>
          <div class="p-6">
            <h3 class="font-medium text-2xl mb-2">{{ selectedImage.title }}</h3>
            <p class="text-champagne-gold mb-2">{{ selectedImage.photographer }}</p>
            <p class="text-gray-600 mb-4">{{ selectedImage.width }}×{{ selectedImage.height }} • {{ selectedImage.source }}</p>
            <p v-if="selectedImage.description" class="text-gray-600 mb-6">{{ selectedImage.description }}</p>
            <button 
              @click="sendToWhatsApp(selectedImage); showImageModal = false"
              class="w-full bg-green-500 text-white px-4 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              Order This Style via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiRequest, API_ENDPOINTS } from '../utils/api.js'

export default {
  name: 'GoogleSearchDemo',
  data() {
    return {
      searchQuery: 'ankara dress',
      lastSearchQuery: '',
      loading: false,
      searchResults: null,
      searchTime: 0,
      loadedImages: 0,
      showImageModal: false,
      selectedImage: null,
      apiStatus: {},
      // Preloading system
      preloadedPages: {},
      preloadingPages: new Set(),
      currentPage: 1,
      resultsPerPage: 12, // 12 results per page as requested
      exampleQueries: [
        'ankara dress',
        'wedding gown', 
        'business suit',
        'mama styles',
        'traditional agbada',
        'casual wear',
        'evening dress',
        'african print',
        'lace styles',
        'aso ebi',
        'corporate wear',
        'party dress'
      ]
    }
  },
  
  async mounted() {
    await this.checkApiStatus()
    // Auto-search on load
    this.performSearch()
  },
  
  methods: {
    async checkApiStatus() {
      try {
        const response = await apiRequest(API_ENDPOINTS.googleTestSetup())
        const data = await response.json()
        this.apiStatus.google = data.setup
      } catch (error) {
        console.error('Failed to check API status:', error)
        this.apiStatus.google = { apiKey: 'Error', searchEngineId: 'Error', isConfigured: false }
      }
    },
    
    onSearchInput() {
      // Clear preloaded pages when search query changes
      if (this.searchQuery.trim() !== this.lastSearchQuery) {
        this.preloadedPages = {}
        this.preloadingPages.clear()
        this.lastSearchQuery = this.searchQuery.trim()
      }
    },
    
    async performSearch(page = 1) {
      if (!this.searchQuery.trim()) return
      
      // If we have preloaded data for this page, use it instantly
      if (page > 1 && this.preloadedPages[page]) {
        console.log(`⚡ Using preloaded data for page ${page}`)
        this.searchResults = this.preloadedPages[page]
        this.currentPage = page
        this.loadedImages = 0
        // Continue preloading next pages
        this.preloadNextPages(page)
        return
      }
      
      this.loading = true
      this.loadedImages = 0
      this.currentPage = page
      const startTime = Date.now()
      
      try {
        console.log(`🔍 Direct CSE search: "${this.searchQuery}" (page ${page})`)
        
        const response = await apiRequest(API_ENDPOINTS.searchImages(this.searchQuery, page, this.resultsPerPage))
        const data = await response.json()
        
        this.searchTime = Date.now() - startTime
        
        if (data.success) {
          this.searchResults = data
          console.log(`✅ Search successful: ${data.images.length} images in ${this.searchTime}ms`)
          
          // Start aggressive preloading for instant navigation
          if (page === 1) {
            this.preloadNextPages(1)
          }
        } else {
          throw new Error(data.message)
        }
      } catch (error) {
        console.error('Search error:', error)
        alert('Search failed: ' + error.message)
      } finally {
        this.loading = false
      }
    },
    
    async preloadNextPages(currentPage = 1) {
      // Preload next 3-5 pages aggressively for instant navigation
      const pagesToPreload = []
      for (let i = currentPage + 1; i <= currentPage + 5; i++) {
        if (!this.preloadedPages[i] && !this.preloadingPages.has(i)) {
          pagesToPreload.push(i)
        }
      }
      
      if (pagesToPreload.length === 0) return
      
      try {
        console.log(`🚀 Preloading pages ${pagesToPreload.join(', ')} for instant loading...`)
        
        // Mark pages as being preloaded
        pagesToPreload.forEach(page => this.preloadingPages.add(page))
        
        const response = await apiRequest(API_ENDPOINTS.preloadPages(this.searchQuery, pagesToPreload, this.resultsPerPage))
        const data = await response.json()
        
        if (data.success) {
          // Store preloaded data for instant access
          this.preloadedPages = { ...this.preloadedPages, ...data.pageData }
          console.log(`✅ Preloaded ${data.totalPreloaded} images across ${pagesToPreload.length} pages`)
        }
      } catch (error) {
        console.error('Preload failed:', error)
        // Preload failure is not critical, search still works
      } finally {
        // Remove from preloading set
        pagesToPreload.forEach(page => this.preloadingPages.delete(page))
      }
    },
    
    goToPage(page) {
      if (page < 1 || (this.searchResults && page > this.searchResults.totalPages)) return
      
      console.log(`📄 Navigating to page ${page}`)
      this.performSearch(page)
    },
    
    nextPage() {
      if (this.searchResults && this.searchResults.hasNextPage) {
        this.goToPage(this.currentPage + 1)
      }
    },
    
    prevPage() {
      if (this.currentPage > 1) {
        this.goToPage(this.currentPage - 1)
      }
    },
    
    selectImage(image) {
      console.log('🖼️ Selected image:', image.title)
      this.selectedImage = image
      this.showImageModal = true
    },
    
    async sendToWhatsApp(image) {
      try {
        const message = encodeURIComponent(`Hello Raws Apparel 👋\n\nI found this beautiful style and would like to get it made:\n\n📸 Style: ${image.title}\n🎨 Description: ${image.description}\n\nPlease let me know about:\n• Measurements needed\n• Fabric options\n• Pricing\n• Timeline\n\nThank you!`)
        
        const whatsappLink = `https://wa.me/2348128653553?text=${message}`
        window.open(whatsappLink, '_blank')
        
        console.log('📱 WhatsApp message sent for:', image.title)
      } catch (error) {
        console.error('WhatsApp error:', error)
      }
    },
    
    handleImageError(event) {
      console.log('❌ Image failed to load')
      event.target.src = `https://via.placeholder.com/400x600/f3f4f6/9ca3af?text=Fashion+Style`
    },
    
    handleImageLoad() {
      this.loadedImages++
    },
    
    getSourceCount(source) {
      if (!this.searchResults) return 0
      return this.searchResults.images.filter(img => img.source === source).length
    },
    
    getSourceBadgeClass(source) {
      const classes = {
        google: 'bg-blue-600 text-white',
        unsplash: 'bg-blue-500 text-white',
        pexels: 'bg-green-500 text-white',
        pixabay: 'bg-purple-500 text-white',
        demo: 'bg-gray-500 text-white',
        backup: 'bg-orange-500 text-white'
      }
      return classes[source] || 'bg-gray-500 text-white'
    },
    
    getCountryName(code) {
      const countries = {
        NG: 'Nigeria 🇳🇬',
        US: 'United States 🇺🇸',
        GB: 'United Kingdom 🇬🇧',
        IN: 'India 🇮🇳'
      }
      return countries[code] || `${code} 🌍`
    },
    
    getVisiblePages() {
      if (!this.searchResults) return []
      
      const totalPages = this.searchResults.totalPages
      const current = this.currentPage
      const visible = []
      
      // Always show first page
      if (current > 3) visible.push(1)
      
      // Show ellipsis if needed
      if (current > 4) visible.push('...')
      
      // Show pages around current
      for (let i = Math.max(1, current - 2); i <= Math.min(totalPages, current + 2); i++) {
        visible.push(i)
      }
      
      // Show ellipsis if needed
      if (current < totalPages - 3) visible.push('...')
      
      // Always show last page
      if (current < totalPages - 2) visible.push(totalPages)
      
      return visible.filter((page, index, arr) => arr.indexOf(page) === index)
    }
  }
}
</script>

<style scoped>
.card-hover {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.btn-primary {
  @apply bg-champagne-gold text-jet-black px-6 py-3 rounded-lg font-medium hover:bg-champagne-gold/80 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed;
}
</style>