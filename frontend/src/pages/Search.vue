<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Section -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="text-center">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Fashion Search</h1>
          <p class="text-gray-600 mb-6">Discover millions of fashion styles powered by Google Images</p>
          
          <!-- Search Bar -->
          <div class="max-w-2xl mx-auto relative">
            <div class="flex">
              <div class="relative flex-1">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search for fashion styles..."
                  class="w-full px-4 py-3 pr-12 border-2 border-champagne-gold rounded-l-lg focus:outline-none focus:ring-2 focus:ring-champagne-gold focus:border-champagne-gold"
                  @keyup.enter="performSearch"
                  @input="onSearchInput"
                  @focus="showSuggestions = true"
                  @blur="hideSuggestions"
                />
                
                <!-- Search Suggestions Dropdown -->
                <div v-if="showSuggestions && filteredSuggestions.length > 0" 
                     class="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1">
                  <div class="py-2 max-h-64 overflow-y-auto">
                    <button 
                      v-for="suggestion in filteredSuggestions" 
                      :key="suggestion"
                      @mousedown="selectSuggestion(suggestion)"
                      class="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-sm flex items-center"
                    >
                      <svg class="w-4 h-4 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                      {{ suggestion }}
                    </button>
                  </div>
                </div>
              </div>
              
              <button 
                @click="performSearch"
                :disabled="loading"
                class="px-6 py-3 bg-champagne-gold text-jet-black rounded-r-lg hover:bg-champagne-gold/90 focus:outline-none focus:ring-2 focus:ring-champagne-gold disabled:opacity-50 transition-colors font-medium"
              >
                <svg v-if="!loading" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <svg v-else class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </button>
            </div>
            
            <!-- Quick Suggestions - Responsive -->
            <div class="mt-4 flex flex-wrap justify-center gap-2">
              <button 
                v-for="(suggestion, index) in quickSuggestions" 
                :key="suggestion"
                v-show="index < 4 || (index < 6 && !isMobile)"
                @click="searchQuery = suggestion; performSearch()"
                class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-champagne-gold hover:text-white transition-colors"
              >
                {{ suggestion }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters Section -->
    <div v-if="currentQuery" class="bg-white border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-6">
            <!-- Category Filter -->
            <div class="relative">
              <button 
                @click="toggleDropdown('category')"
                class="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14-4l-3 3.5L13 6m6 5l-3-3.5L13 11"></path>
                </svg>
                <span class="text-sm font-medium">{{ getCategoryLabel(selectedCategory) }}</span>
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              <div v-show="dropdownOpen === 'category'" class="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-40">
                <div class="py-1">
                  <button 
                    v-for="option in categoryOptions" 
                    :key="option.value"
                    @click="selectOption('category', option.value)"
                    class="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors flex items-center"
                  >
                    <component :is="option.icon" class="w-4 h-4 mr-3 text-gray-400" />
                    {{ option.label }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Style Filter -->
            <div class="relative">
              <button 
                @click="toggleDropdown('style')"
                class="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                </svg>
                <span class="text-sm font-medium">{{ getStyleLabel(selectedStyle) }}</span>
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              <div v-show="dropdownOpen === 'style'" class="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-40">
                <div class="py-1">
                  <button 
                    v-for="option in styleOptions" 
                    :key="option.value"
                    @click="selectOption('style', option.value)"
                    class="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors flex items-center"
                  >
                    <component :is="option.icon" class="w-4 h-4 mr-3 text-gray-400" />
                    {{ option.label }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Clear Filters -->
            <button 
              v-if="selectedCategory || selectedStyle"
              @click="clearFilters"
              class="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Clear filters
            </button>
          </div>

          <!-- Results Count -->
          <div v-if="!loading && searchResults.length > 0" class="text-sm text-gray-600">
            {{ totalResults.toLocaleString() }} results found
          </div>
        </div>
      </div>
    </div>

    <!-- API Quota Warning -->
    <div v-if="quotaExceeded" class="bg-orange-50 border-l-4 border-orange-400 p-4 mx-4 mt-4 rounded">
      <div class="flex">
        <svg class="w-5 h-5 text-orange-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
        </svg>
        <div>
          <h3 class="text-sm font-medium text-orange-800">API Quota Exceeded</h3>
          <p class="text-sm text-orange-700">Daily search limit reached. Please try again later.</p>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-champagne-gold mb-4"></div>
          <p class="text-gray-600">Searching for styles...</p>
        </div>
      </div>

      <!-- Results Grid -->
      <div v-else-if="searchResults.length > 0">
        <!-- Results Info -->
        <div class="mb-6 flex justify-between items-center">
          <h2 class="text-lg font-semibold text-gray-900">
            Search Results for "{{ currentQuery }}"
          </h2>
          <div class="text-sm text-gray-500">
            Page {{ currentPage }} of {{ totalPages }}
          </div>
        </div>

        <!-- Product Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          <div 
            v-for="image in searchResults" 
            :key="image.id"
            class="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden cursor-pointer"
            @click="selectImage(image)"
          >
            <!-- Image Container -->
            <div class="aspect-w-3 aspect-h-4 bg-gray-200 overflow-hidden">
              <img 
                :src="image.imageURL || image.thumbnailURL" 
                :alt="image.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                @error="handleImageError"
                @load="handleImageLoad"
                loading="lazy"
              />
            </div>
            
            <!-- Product Info -->
            <div class="p-4">
              <h3 class="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
                {{ cleanTitle(image.title) }}
              </h3>
              <p class="text-xs text-gray-500 mb-3">
                {{ image.width }} × {{ image.height }}
              </p>
              
              <!-- Action Buttons -->
              <div class="flex space-x-2">
                <button 
                  @click.stop="selectImage(image)"
                  class="flex-1 px-3 py-2 text-xs font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                >
                  View
                </button>
                <button 
                  @click.stop="sendToWhatsApp(image)"
                  class="flex-1 px-3 py-2 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700 transition-colors"
                >
                  Order
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="mt-12 flex justify-center">
          <nav class="flex items-center space-x-2">
            <button 
              @click="prevPage"
              :disabled="currentPage === 1"
              class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
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
                  'px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  page === currentPage 
                    ? 'bg-champagne-gold text-jet-black font-semibold' 
                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                ]"
              >
                {{ page }}
              </button>
            </template>
            
            <button 
              @click="nextPage"
              :disabled="!hasNextPage"
              class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </nav>
        </div>

        <!-- Preload Status -->
        <div v-if="Object.keys(preloadedPages).length > 0" class="mt-6 text-center">
          <p class="text-xs text-gray-500">
            Pages {{ Object.keys(preloadedPages).join(', ') }} preloaded for faster browsing
          </p>
        </div>
      </div>

      <!-- No Results -->
      <div v-else-if="currentQuery && !loading" class="text-center py-20">
        <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No results found</h3>
        <p class="text-gray-600">Try adjusting your search terms or filters</p>
      </div>
    </div>

    <!-- Compact Image Modal -->
    <div v-if="showImageModal && selectedImage" 
         class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" 
         @click="showImageModal = false">
      <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden" @click.stop>
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-4 border-b">
          <h3 class="text-lg font-semibold text-gray-900 truncate">
            {{ cleanTitle(selectedImage.title) }}
          </h3>
          <button 
            @click="showImageModal = false"
            class="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <!-- Modal Content -->
        <div class="flex flex-col md:flex-row max-h-[calc(90vh-80px)]">
          <!-- Image -->
          <div class="md:flex-1 bg-gray-50 flex items-center justify-center p-4">
            <img 
              :src="selectedImage.imageURL || selectedImage.thumbnailURL" 
              :alt="selectedImage.title" 
              class="max-w-full max-h-80 object-contain rounded"
            />
          </div>
          
          <!-- Details -->
          <div class="md:w-80 p-4 space-y-4">
            <div>
              <h4 class="font-medium text-gray-900 mb-2">Style Information</h4>
              <p class="text-sm text-gray-600 mb-3">{{ selectedImage.description || selectedImage.title }}</p>
            </div>
            
            <div>
              <h4 class="font-medium text-gray-900 mb-2">Specifications</h4>
              <div class="space-y-2 text-sm text-gray-600">
                <div class="flex justify-between">
                  <span class="font-medium">Dimensions:</span>
                  <span>{{ selectedImage.width }} × {{ selectedImage.height }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-medium">Source:</span>
                  <span>{{ selectedImage.photographer }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="font-medium">Quality:</span>
                  <span class="text-green-600">High Definition</span>
                </div>
                <div v-if="selectedImage.contextLink" class="flex justify-between">
                  <span class="font-medium">Origin:</span>
                  <a :href="selectedImage.contextLink" target="_blank" class="text-champagne-gold hover:underline">View Source</a>
                </div>
              </div>
            </div>
            
            <div v-if="selectedImage.tags && selectedImage.tags.length > 0">
              <h4 class="font-medium text-gray-900 mb-2">Style Tags</h4>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="tag in selectedImage.tags.slice(0, 5)" 
                  :key="tag"
                  class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
            
            <!-- Order Button -->
            <button 
              @click="sendToWhatsApp(selectedImage); showImageModal = false"
              class="w-full bg-green-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              <span>Order via WhatsApp</span>
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
  name: 'Search',
  data() {
    return {
      searchQuery: 'ankara dress',
      currentQuery: '',
      loading: false,
      searchResults: [],
      searchTime: 0,
      loadedImages: 0,
      showImageModal: false,
      selectedImage: null,
      quotaExceeded: false,
      
      // Pagination
      currentPage: 1,
      totalPages: 1,
      totalResults: 0,
      hasNextPage: false,
      userCountry: 'NG',
      
      // Preloading system
      preloadedPages: {},
      preloadingPages: new Set(),
      
      // Filters
      dropdownOpen: null,
      selectedCategory: '',
      selectedStyle: '',
      
      // Search suggestions - expanded list like Google CSE
      showSuggestions: false,
      allSuggestions: [
        // Nigerian Fashion
        'Wedding gown',
        'Traditional wear',
        'Latest Ankara styles',
        'Party dress',
        'Stoned dresses',
        'Casual wear',
        'Aso ebi styles',
        'Lace styles',
        'Nigerian wedding dress',
        'Ankara gown',
        'Agbada styles',
        'Senator wear',
        'Kaftan styles',
        'Bubu gown',
        'Dashiki',
        'African print dress',
        'Ankara skirt and blouse',
        'Iro and buba',
        'Gele styles',
        'Nigerian traditional attire',
        // Modern Fashion
        'Evening dress',
        'Cocktail dress',
        'Maxi dress',
        'Mini dress',
        'Midi dress',
        'Bodycon dress',
        'A-line dress',
        'Ball gown',
        'Prom dress',
        'Bridesmaid dress',
        'Mother of bride dress',
        'Church dress',
        'Office wear',
        'Business suit',
        'Corporate wear',
        'Blazer styles',
        'Trouser styles',
        'Jumpsuit',
        'Romper',
        'Two piece set',
        // Casual & Others
        'Casual dress',
        'Summer dress',
        'Beach wear',
        'Vacation outfit',
        'Denim styles',
        'Leather jacket',
        'Coat styles',
        'Cardigan',
        'Blouse styles',
        'Top styles',
        'Skirt styles',
        'Palazzo pants',
        'Wide leg pants',
        'Pencil skirt',
        'Pleated skirt',
        // Special Occasions
        'Birthday dress',
        'Anniversary dress',
        'Graduation dress',
        'Dinner dress',
        'Red carpet dress',
        'Gala dress',
        'Formal gown',
        'Semi formal dress',
        // Trending
        'Latest fashion trends',
        'New arrival styles',
        'Trendy outfits',
        'Fashion 2024',
        'Designer dress',
        'Luxury fashion',
        'High fashion',
        'Runway styles',
        'Celebrity fashion',
        'Instagram fashion'
      ],
      
      quickSuggestions: [
        'Wedding gown',
        'Traditional wear', 
        'Latest Ankara styles',
        'Party dress',
        'Stoned dresses',
        'Casual wear'
      ],
      
      categoryOptions: [
        { value: '', label: 'All Categories', icon: 'AllIcon' },
        { value: 'female', label: 'Women\'s Fashion', icon: 'FemaleIcon' },
        { value: 'male', label: 'Men\'s Fashion', icon: 'MaleIcon' },
        { value: 'traditional', label: 'Traditional Wear', icon: 'TraditionalIcon' },
        { value: 'modern', label: 'Modern Style', icon: 'ModernIcon' }
      ],
      
      styleOptions: [
        { value: '', label: 'All Styles', icon: 'AllIcon' },
        { value: 'casual', label: 'Casual', icon: 'CasualIcon' },
        { value: 'formal', label: 'Formal', icon: 'FormalIcon' },
        { value: 'wedding', label: 'Wedding', icon: 'WeddingIcon' },
        { value: 'party', label: 'Party', icon: 'PartyIcon' }
      ]
    }
  },
  
  computed: {
    filteredSuggestions() {
      if (!this.searchQuery.trim()) return this.allSuggestions.slice(0, 10)
      
      const query = this.searchQuery.toLowerCase()
      return this.allSuggestions
        .filter(suggestion => suggestion.toLowerCase().includes(query))
        .slice(0, 10)
    },
    
    isMobile() {
      return window.innerWidth < 768
    }
  },
  
  async mounted() {
    // Auto-search on load
    this.performSearch()
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', this.handleClickOutside)
  },
  
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  },
  
  methods: {
    onSearchInput() {
      this.showSuggestions = true
      
      // Clear preloaded pages when search query changes
      if (this.searchQuery.trim() !== this.currentQuery) {
        this.preloadedPages = {}
        this.preloadingPages.clear()
      }
    },
    
    selectSuggestion(suggestion) {
      this.searchQuery = suggestion
      this.showSuggestions = false
      this.performSearch()
    },
    
    hideSuggestions() {
      setTimeout(() => {
        this.showSuggestions = false
      }, 200)
    },
    
    async performSearch(page = 1) {
      if (!this.searchQuery.trim()) return
      
      // If we have preloaded data for this page, use it instantly
      if (page > 1 && this.preloadedPages[page]) {
        console.log(`Using preloaded data for page ${page}`)
        this.searchResults = this.preloadedPages[page].images
        this.totalResults = this.preloadedPages[page].totalResults
        this.currentPage = page
        this.totalPages = this.preloadedPages[page].totalPages
        this.hasNextPage = this.preloadedPages[page].hasNextPage
        this.loadedImages = 0
        this.preloadNextPages(page)
        return
      }
      
      this.loading = true
      this.loadedImages = 0
      this.currentPage = page
      this.currentQuery = this.searchQuery.trim()
      this.quotaExceeded = false
      const startTime = Date.now()
      
      try {
        console.log(`Clean Google search: "${this.currentQuery}" (page ${page})`)
        
        // Use API utility for consistent URL handling
        const response = await apiRequest(API_ENDPOINTS.searchImages(this.currentQuery, page, 12))
        const data = await response.json()
        
        this.searchTime = Date.now() - startTime
        
        if (data.success) {
          this.searchResults = data.images
          this.totalResults = data.totalResults
          this.currentPage = data.currentPage
          this.totalPages = data.totalPages
          this.hasNextPage = data.hasNextPage
          this.userCountry = data.country
          
          console.log(`Search successful: ${data.images.length} images in ${this.searchTime}ms`)
          
          // Start preloading for instant navigation
          if (page === 1) {
            this.preloadNextPages(1)
          }
        } else {
          if (data.message && data.message.includes('quota exceeded')) {
            this.quotaExceeded = true
          }
          throw new Error(data.message)
        }
      } catch (error) {
        console.error('Search error:', error)
        
        if (error.message.includes('quota exceeded')) {
          this.quotaExceeded = true
        }
        
        this.searchResults = []
        this.totalResults = 0
      } finally {
        this.loading = false
      }
    },
    
    async preloadNextPages(currentPage = 1) {
      const pagesToPreload = []
      for (let i = currentPage + 1; i <= currentPage + 3; i++) {
        if (!this.preloadedPages[i] && !this.preloadingPages.has(i)) {
          pagesToPreload.push(i)
        }
      }
      
      if (pagesToPreload.length === 0) return
      
      try {
        console.log(`Preloading pages ${pagesToPreload.join(', ')}...`)
        
        pagesToPreload.forEach(page => this.preloadingPages.add(page))
        
        // Use API utility for consistent URL handling
        const response = await apiRequest(API_ENDPOINTS.preloadPages(this.currentQuery, pagesToPreload, 12))
        const data = await response.json()
        
        if (data.success) {
          this.preloadedPages = { ...this.preloadedPages, ...data.pageData }
          console.log(`Preloaded ${data.totalPreloaded} images`)
        }
      } catch (error) {
        console.error('Preload failed:', error)
      } finally {
        pagesToPreload.forEach(page => this.preloadingPages.delete(page))
      }
    },
    
    // Filter methods
    toggleDropdown(type) {
      this.dropdownOpen = this.dropdownOpen === type ? null : type
    },
    
    selectOption(type, value) {
      if (type === 'category') {
        this.selectedCategory = value
      } else if (type === 'style') {
        this.selectedStyle = value
      }
      
      this.dropdownOpen = null
      this.applyFilters()
    },
    
    applyFilters() {
      if (this.currentQuery) {
        // Build enhanced query with selected filters
        let enhancedQuery = this.currentQuery
        
        // Add category filter to query
        if (this.selectedCategory) {
          const categoryTerms = {
            female: 'women ladies female',
            male: 'men male gentleman',
            traditional: 'traditional african nigerian',
            modern: 'modern contemporary trendy'
          }
          enhancedQuery += ` ${categoryTerms[this.selectedCategory]}`
        }
        
        // Add style filter to query
        if (this.selectedStyle) {
          const styleTerms = {
            casual: 'casual everyday',
            formal: 'formal elegant',
            wedding: 'wedding bridal',
            party: 'party celebration'
          }
          enhancedQuery += ` ${styleTerms[this.selectedStyle]}`
        }
        
        // Update search query and perform search
        this.searchQuery = enhancedQuery
        this.performSearch(1)
      }
    },
    
    clearFilters() {
      this.selectedCategory = ''
      this.selectedStyle = ''
      this.dropdownOpen = null
      this.applyFilters()
    },
    
    getCategoryLabel(value) {
      const option = this.categoryOptions.find(opt => opt.value === value)
      return option ? option.label : 'All Categories'
    },
    
    getStyleLabel(value) {
      const option = this.styleOptions.find(opt => opt.value === value)
      return option ? option.label : 'All Styles'
    },
    
    handleClickOutside(event) {
      if (!event.target.closest('.relative')) {
        this.dropdownOpen = null
      }
    },
    
    // Navigation methods
    goToPage(page) {
      if (page < 1 || (this.totalPages && page > this.totalPages)) return
      this.performSearch(page)
    },
    
    nextPage() {
      if (this.hasNextPage) {
        this.goToPage(this.currentPage + 1)
      }
    },
    
    prevPage() {
      if (this.currentPage > 1) {
        this.goToPage(this.currentPage - 1)
      }
    },
    
    getVisiblePages() {
      if (!this.totalPages) return []
      
      const totalPages = this.totalPages
      const current = this.currentPage
      const visible = []
      
      if (current > 3) visible.push(1)
      if (current > 4) visible.push('...')
      
      for (let i = Math.max(1, current - 2); i <= Math.min(totalPages, current + 2); i++) {
        visible.push(i)
      }
      
      if (current < totalPages - 3) visible.push('...')
      if (current < totalPages - 2) visible.push(totalPages)
      
      return visible.filter((page, index, arr) => arr.indexOf(page) === index)
    },
    
    // Image methods
    selectImage(image) {
      console.log('Selected image:', image.title)
      this.selectedImage = image
      this.showImageModal = true
    },
    
    async sendToWhatsApp(image) {
      try {
        const message = encodeURIComponent(`Hello Raws Apparel!\n\nI found this style and would like to order:\n\nStyle: ${image.title}\n\nPlease let me know about measurements, fabric options, pricing and timeline.\n\nThank you!`)
        
        const whatsappLink = `https://wa.me/2348128653553?text=${message}`
        window.open(whatsappLink, '_blank')
        
        console.log('WhatsApp message sent for:', image.title)
      } catch (error) {
        console.error('WhatsApp error:', error)
      }
    },
    
    handleImageError(event) {
      event.target.src = `https://via.placeholder.com/300x400/f3f4f6/9ca3af?text=Fashion+Style`
    },
    
    handleImageLoad() {
      this.loadedImages++
    },
    
    cleanTitle(title) {
      if (!title) return 'Fashion Style'
      
      return title
        .replace(/\s+/g, ' ')
        .trim()
        .substring(0, 60)
    }
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.aspect-w-3 {
  position: relative;
  padding-bottom: 133.333333%; /* 4:3 Aspect Ratio */
}

.aspect-w-3 > * {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

/* Custom scrollbar for suggestions */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>