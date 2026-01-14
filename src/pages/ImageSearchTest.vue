<template>
  <div class="min-h-screen bg-soft-warm-gray py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-jet-black mb-4">🌍 Multi-Source Fashion Search Test</h1>
        <p class="text-gray-600 mb-6">
          Geo-intelligent fashion search powered by Unsplash, Pexels, and Pixabay
        </p>
        
        <!-- Search Form -->
        <div class="max-w-2xl mx-auto">
          <div class="flex gap-4 mb-4">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Try: mama styles, ankara dress, wedding gown, business suit..."
              class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-champagne-gold text-lg"
              @keyup.enter="testSearch"
            />
            <button 
              @click="testSearch"
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
              @click="searchQuery = example; testSearch()"
              class="px-3 py-1 bg-white border border-champagne-gold text-champagne-gold rounded-full text-sm hover:bg-champagne-gold hover:text-white transition-colors"
            >
              {{ example }}
            </button>
          </div>
        </div>
      </div>
      
      <!-- Search Info -->
      <div v-if="searchResults" class="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div class="grid md:grid-cols-3 gap-6">
          <div>
            <h3 class="font-medium mb-2">🔍 Search Details</h3>
            <ul class="text-sm text-gray-600 space-y-1">
              <li><strong>Query:</strong> "{{ searchResults.query }}"</li>
              <li><strong>Country:</strong> {{ getCountryName(searchResults.country) }}</li>
              <li><strong>Total Results:</strong> {{ searchResults.totalResults.toLocaleString() }}</li>
              <li><strong>Current Page:</strong> {{ searchResults.currentPage }} of {{ searchResults.totalPages }}</li>
            </ul>
          </div>
          <div>
            <h3 class="font-medium mb-2">📊 Source Breakdown</h3>
            <div class="space-y-1 text-sm">
              <div class="flex justify-between">
                <span>Unsplash:</span>
                <span class="text-blue-600">{{ getSourceCount('unsplash') }}</span>
              </div>
              <div class="flex justify-between">
                <span>Pexels:</span>
                <span class="text-green-600">{{ getSourceCount('pexels') }}</span>
              </div>
              <div class="flex justify-between">
                <span>Pixabay:</span>
                <span class="text-purple-600">{{ getSourceCount('pixabay') }}</span>
              </div>
            </div>
          </div>
          <div>
            <h3 class="font-medium mb-2">⚡ Performance</h3>
            <ul class="text-sm text-gray-600 space-y-1">
              <li><strong>Search Time:</strong> {{ searchTime }}ms</li>
              <li><strong>Images Loaded:</strong> {{ loadedImages }}/{{ searchResults.images.length }}</li>
              <li><strong>Status:</strong> <span class="text-green-600">✅ Active</span></li>
            </ul>
          </div>
        </div>
      </div>
      
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-champagne-gold"></div>
        <p class="mt-4 text-gray-600">Searching fashion images worldwide...</p>
        <p class="text-sm text-gray-500 mt-2">Combining results from multiple sources</p>
      </div>
      
      <!-- Results Grid -->
      <div v-else-if="searchResults && searchResults.images.length > 0">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
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
                <!-- Image Info -->
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
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Pagination -->
        <div v-if="searchResults.totalPages > 1" class="flex justify-center">
          <nav class="flex items-center space-x-2">
            <!-- Previous Button -->
            <button 
              @click="goToPage(searchResults.currentPage - 1)"
              :disabled="searchResults.currentPage === 1"
              class="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <!-- Page Numbers -->
            <button 
              v-for="page in getVisiblePages()" 
              :key="page"
              @click="goToPage(page)"
              :class="[
                'px-3 py-2 text-sm font-medium rounded-md',
                page === searchResults.currentPage 
                  ? 'bg-champagne-gold text-white' 
                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
              ]"
            >
              {{ page }}
            </button>
            
            <!-- Next Button -->
            <button 
              @click="goToPage(searchResults.currentPage + 1)"
              :disabled="!searchResults.hasNextPage"
              class="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </nav>
        </div>
      </div>
      
      <!-- No Results -->
      <div v-else-if="searchResults && searchResults.images.length === 0" class="text-center py-12">
        <svg class="mx-auto h-24 w-24 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <h3 class="text-xl font-medium text-gray-900 mb-2">No images found</h3>
        <p class="text-gray-600">Try a different search term or check your connection</p>
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
export default {
  name: 'ImageSearchTest',
  data() {
    return {
      searchQuery: 'mama styles',
      loading: false,
      searchResults: null,
      searchTime: 0,
      loadedImages: 0,
      showImageModal: false,
      selectedImage: null,
      exampleQueries: [
        'mama styles',
        'ankara dress',
        'wedding gown',
        'business suit',
        'traditional agbada',
        'casual wear',
        'evening dress',
        'african print'
      ]
    }
  },
  methods: {
    async testSearch() {
      if (!this.searchQuery.trim()) return
      
      this.loading = true
      this.loadedImages = 0
      const startTime = Date.now()
      
      try {
        console.log(`🔍 Testing multi-source search: "${this.searchQuery}"`)
        
        const response = await fetch(`http://localhost:5003/api/search/images?query=${encodeURIComponent(this.searchQuery)}&page=1&limit=20`)
        const data = await response.json()
        
        this.searchTime = Date.now() - startTime
        
        if (data.success) {
          this.searchResults = data
          console.log(`✅ Search successful:`, data)
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
    
    async goToPage(page) {
      if (!this.searchResults || page < 1 || page > this.searchResults.totalPages || page === this.searchResults.currentPage) return
      
      this.loading = true
      const startTime = Date.now()
      
      try {
        const response = await fetch(`http://localhost:5003/api/search/images?query=${encodeURIComponent(this.searchQuery)}&page=${page}&limit=20`)
        const data = await response.json()
        
        this.searchTime = Date.now() - startTime
        
        if (data.success) {
          this.searchResults = data
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      } catch (error) {
        console.error('Pagination error:', error)
      } finally {
        this.loading = false
      }
    },
    
    getVisiblePages() {
      if (!this.searchResults) return []
      
      const pages = []
      const current = this.searchResults.currentPage
      const total = this.searchResults.totalPages
      const start = Math.max(1, current - 2)
      const end = Math.min(total, current + 2)
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      return pages
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
        unsplash: 'bg-blue-500 text-white',
        pexels: 'bg-green-500 text-white',
        pixabay: 'bg-purple-500 text-white',
        demo: 'bg-gray-500 text-white'
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
    }
  },
  
  mounted() {
    // Auto-search on load
    this.testSearch()
  }
}
</script>




