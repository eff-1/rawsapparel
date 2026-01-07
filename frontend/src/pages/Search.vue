<template>
  <div class="min-h-screen bg-soft-warm-gray py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Search Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-jet-black mb-4">Find Your Perfect Style</h1>
        <SearchBar @search="handleSearch" />
        
        <!-- Collapsible Filters - Mobile Optimized -->
        <div v-if="currentQuery" class="mt-6">
          <!-- Filter Toggle Button -->
          <div class="flex justify-center mb-4">
            <button 
              @click="showFilters = !showFilters"
              class="flex items-center gap-2 px-4 py-2 bg-white border border-champagne-gold text-champagne-gold rounded-full text-sm font-medium hover:bg-champagne-gold hover:text-white transition-all duration-200"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"></path>
              </svg>
              {{ showFilters ? 'Hide Filters' : 'Show Filters' }}
              <svg :class="{ 'rotate-180': showFilters }" class="w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
          </div>
          
          <!-- Filter Options - Collapsible -->
          <div v-show="showFilters" class="bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <!-- Custom Category Dropdown -->
              <div class="relative">
                <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <div class="relative">
                  <button 
                    @click="toggleDropdown('category')"
                    class="w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-champagne-gold focus:border-champagne-gold transition-all duration-200"
                  >
                    <span class="block truncate">{{ getCategoryLabel(selectedCategory) }}</span>
                    <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  
                  <div v-show="dropdownOpen === 'category'" class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg">
                    <div class="py-1">
                      <button 
                        v-for="option in categoryOptions" 
                        :key="option.value"
                        @click="selectOption('category', option.value)"
                        class="w-full px-4 py-2 text-left hover:bg-champagne-gold hover:text-white transition-colors duration-200"
                      >
                        {{ option.label }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Custom Style Dropdown -->
              <div class="relative">
                <label class="block text-sm font-medium text-gray-700 mb-2">Style</label>
                <div class="relative">
                  <button 
                    @click="toggleDropdown('style')"
                    class="w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-champagne-gold focus:border-champagne-gold transition-all duration-200"
                  >
                    <span class="block truncate">{{ getStyleLabel(selectedStyle) }}</span>
                    <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  
                  <div v-show="dropdownOpen === 'style'" class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg">
                    <div class="py-1">
                      <button 
                        v-for="option in styleOptions" 
                        :key="option.value"
                        @click="selectOption('style', option.value)"
                        class="w-full px-4 py-2 text-left hover:bg-champagne-gold hover:text-white transition-colors duration-200"
                      >
                        {{ option.label }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Custom Location Dropdown -->
              <div class="relative">
                <label class="block text-sm font-medium text-gray-700 mb-2">Origin</label>
                <div class="relative">
                  <button 
                    @click="toggleDropdown('location')"
                    class="w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-champagne-gold focus:border-champagne-gold transition-all duration-200"
                  >
                    <span class="block truncate">{{ getLocationLabel(selectedLocation) }}</span>
                    <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  
                  <div v-show="dropdownOpen === 'location'" class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg">
                    <div class="py-1">
                      <button 
                        v-for="option in locationOptions" 
                        :key="option.value"
                        @click="selectOption('location', option.value)"
                        class="w-full px-4 py-2 text-left hover:bg-champagne-gold hover:text-white transition-colors duration-200"
                      >
                        {{ option.label }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Clear Filters Button -->
            <div class="mt-4 text-center">
              <button 
                @click="clearFilters"
                class="px-4 py-2 text-sm text-gray-600 hover:text-jet-black transition-colors duration-200"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-champagne-gold"></div>
        <p class="mt-4 text-gray-600">Finding perfect styles for you...</p>
      </div>
      
      <!-- Results -->
      <div v-else-if="searchResults.length > 0">
        <!-- Results Header -->
        <div class="mb-6">
          <div class="flex justify-between items-center mb-4">
            <div>
              <p class="text-gray-900 font-medium">
                {{ totalResults.toLocaleString() }} styles found for "{{ currentQuery }}"
              </p>
              <p class="text-sm text-gray-600">
                Page {{ currentPage }} of {{ totalPages }}
              </p>
            </div>
          </div>
        </div>
        
        <!-- Modern Image Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-8">
          <div 
            v-for="image in searchResults" 
            :key="image.id"
            @click="selectImage(image)"
            class="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <!-- High Quality Image -->
            <div class="relative aspect-[3/4] overflow-hidden">
              <img 
                :src="getHighQualityImage(image)" 
                :alt="image.title"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                @error="handleImageError"
                loading="lazy"
              />
              
              <!-- Hover Overlay -->
              <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div class="bg-white rounded-full p-3 shadow-lg">
                    <svg class="w-6 h-6 text-jet-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Image Info -->
            <div class="p-3">
              <h3 class="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
                {{ cleanTitle(image.title) }}
              </h3>
              
              <!-- Action Buttons -->
              <div class="flex gap-2">
                <button 
                  @click.stop="sendToWhatsApp(image)"
                  class="flex-1 bg-green-500 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-green-600 transition-colors duration-200 flex items-center justify-center gap-1"
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
        
        <!-- Pagination -->
        <div v-if="totalPages > 1" class="mt-8 flex justify-center">
          <nav class="flex items-center space-x-2">
            <button 
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            
            <button 
              v-for="page in getVisiblePages()" 
              :key="page"
              @click="goToPage(page)"
              :class="[
                'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                page === currentPage 
                  ? 'bg-champagne-gold text-jet-black' 
                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
              ]"
            >
              {{ page }}
            </button>
            
            <button 
              @click="goToPage(currentPage + 1)"
              :disabled="!hasNextPage"
              class="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </nav>
        </div>
      </div>
      
      <!-- No Results -->
      <div v-else-if="currentQuery && !loading" class="text-center py-12">
        <svg class="mx-auto h-24 w-24 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <h3 class="text-xl font-medium text-gray-900 mb-2">No styles found</h3>
        <p class="text-gray-600 mb-6">Try different keywords or adjust your filters</p>
        <button @click="showSuggestions = true" class="btn-secondary">
          View Suggestions
        </button>
      </div>
      
      <!-- Search Suggestions -->
      <div v-if="showSuggestions" class="mt-8">
        <h3 class="text-xl font-medium text-jet-black mb-4">Popular Searches</h3>
        <div class="flex flex-wrap gap-3">
          <button 
            v-for="suggestion in suggestions" 
            :key="suggestion"
            @click="handleSearch(suggestion)"
            class="px-4 py-2 bg-white border border-champagne-gold text-champagne-gold rounded-full hover:bg-champagne-gold hover:text-white transition-colors"
          >
            {{ suggestion }}
          </button>
        </div>
      </div>
    </div>
    
    <!-- Modern Image Modal -->
    <div v-if="showImageModal && selectedImage" 
         class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" 
         @click="showImageModal = false">
      <div class="max-w-4xl max-h-full w-full" @click.stop>
        <div class="bg-white rounded-2xl overflow-hidden shadow-2xl max-h-full flex flex-col">
          <!-- Modal Header -->
          <div class="flex justify-between items-center p-4 border-b">
            <h3 class="font-semibold text-lg text-gray-900 truncate pr-4">
              {{ cleanTitle(selectedImage.title) }}
            </h3>
            <button 
              @click="showImageModal = false"
              class="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <!-- Modal Content -->
          <div class="flex-1 overflow-auto">
            <div class="md:flex">
              <!-- Image -->
              <div class="md:flex-1 bg-gray-50 flex items-center justify-center p-4">
                <img 
                  :src="selectedImage.imageURL || selectedImage.thumbnailURL" 
                  :alt="selectedImage.title" 
                  class="max-w-full max-h-96 object-contain rounded-lg shadow-lg"
                />
              </div>
              
              <!-- Details -->
              <div class="md:w-80 p-6 space-y-4">
                <div>
                  <h4 class="font-medium text-gray-900 mb-2">Style Details</h4>
                  <p class="text-gray-600 text-sm">{{ selectedImage.description }}</p>
                </div>
                
                <div>
                  <h4 class="font-medium text-gray-900 mb-2">Specifications</h4>
                  <div class="space-y-1 text-sm text-gray-600">
                    <p><span class="font-medium">Dimensions:</span> {{ selectedImage.width }}×{{ selectedImage.height }}</p>
                    <p><span class="font-medium">Source:</span> {{ selectedImage.photographer }}</p>
                  </div>
                </div>
                
                <!-- Order Button -->
                <button 
                  @click="sendToWhatsApp(selectedImage); showImageModal = false"
                  class="w-full bg-green-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-600 transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg"
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
    </div>
  </div>
</template>

<script>
import SearchBar from '../components/SearchBar.vue'
import StyleCard from '../components/StyleCard.vue'

export default {
  name: 'Search',
  components: {
    SearchBar,
    StyleCard
  },
  data() {
    return {
      searchResults: [],
      loading: false,
      currentQuery: '',
      showSuggestions: false,
      currentPage: 1,
      totalPages: 1,
      totalResults: 0,
      hasNextPage: false,
      userCountry: 'NG',
      showImageModal: false,
      selectedImage: null,
      
      // Filter system
      showFilters: false,
      dropdownOpen: null,
      selectedCategory: '',
      selectedStyle: '',
      selectedLocation: '',
      
      // Filter options
      categoryOptions: [
        { value: '', label: 'All Categories' },
        { value: 'female', label: 'Female Fashion' },
        { value: 'male', label: 'Male Fashion' },
        { value: 'children', label: 'Children\'s Wear' },
        { value: 'traditional', label: 'Traditional Wear' },
        { value: 'modern', label: 'Modern Style' }
      ],
      
      styleOptions: [
        { value: '', label: 'All Styles' },
        { value: 'casual', label: 'Casual' },
        { value: 'formal', label: 'Formal' },
        { value: 'wedding', label: 'Wedding' },
        { value: 'party', label: 'Party' },
        { value: 'business', label: 'Business' }
      ],
      
      locationOptions: [
        { value: '', label: 'Nigerian Focus' },
        { value: 'local', label: 'Local Nigerian' },
        { value: 'african', label: 'African' },
        { value: 'western', label: 'Western' },
        { value: 'latest', label: 'Latest Trends' }
      ],
      
      suggestions: [
        'ankara dress',
        'wedding gown',
        'traditional agbada',
        'party dress',
        'casual wear',
        'formal wear',
        'children fashion',
        'african print'
      ]
    }
  },
  mounted() {
    // Check for query parameter
    if (this.$route.query.q) {
      this.handleSearch(this.$route.query.q)
    }
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', this.handleClickOutside)
  },
  
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  },
  methods: {
    async handleSearch(query, page = 1) {
      if (!query.trim()) return
      
      this.loading = true
      this.currentQuery = query
      this.currentPage = page
      this.showSuggestions = false
      
      // Build enhanced query with filters
      const enhancedQuery = this.buildEnhancedQuery(query)
      
      try {
        console.log(`🔍 Searching for: "${enhancedQuery}" (page ${page})`)
        
        const response = await fetch(`http://localhost:5003/api/search/images?query=${encodeURIComponent(enhancedQuery)}&page=${page}&limit=24`)
        const data = await response.json()
        
        if (data.success) {
          this.searchResults = data.images
          this.totalResults = data.totalResults
          this.currentPage = data.currentPage
          this.totalPages = data.totalPages
          this.hasNextPage = data.hasNextPage
          this.userCountry = data.country
          
          console.log(`✅ Found ${data.totalResults} results, showing page ${data.currentPage}`)
        } else {
          throw new Error(data.message)
        }
      } catch (error) {
        console.error('Search error:', error)
        this.searchResults = []
        this.totalResults = 0
      } finally {
        this.loading = false
      }
    },
    
    buildEnhancedQuery(baseQuery) {
      let query = baseQuery
      
      // Default focus: Nigerian female fashion (Raws Apparel specialty)
      const isMaleQuery = /\b(men|male|gentleman|guy|boy)\b/i.test(baseQuery)
      const isChildQuery = /\b(child|kid|baby|toddler)\b/i.test(baseQuery)
      
      if (!isMaleQuery && !isChildQuery) {
        // Default to Nigerian female fashion
        query += ' women ladies female dress gown blouse skirt outfit clothing fashion wear'
      } else if (isMaleQuery) {
        query += ' men male shirt suit trouser clothing fashion wear'
      } else if (isChildQuery) {
        query += ' children kids clothing dress shirt fashion wear'
      }
      
      // Always add clothing-specific terms
      query += ' clothing fashion dress outfit wear garment textile fabric'
      
      // Always add Nigerian/African context (Raws Apparel focus)
      query += ' nigerian african traditional modern ankara'
      
      // STRICT filtering - remove ALL non-clothing items
      query += ' -money -cash -currency -dollar -naira -coin -bill -bank -finance -wallet -purse'
      query += ' -shoes -sandals -slippers -boots -sneakers -heels'
      query += ' -bag -handbag -backpack -purse -luggage -suitcase'
      query += ' -jewelry -necklace -earrings -bracelet -ring -watch -chain'
      query += ' -makeup -cosmetics -lipstick -foundation -powder'
      query += ' -food -drink -restaurant -kitchen -cooking -recipe'
      query += ' -car -vehicle -transport -phone -computer -electronics'
      query += ' -house -building -furniture -chair -table -bed'
      query += ' -animal -pet -dog -cat -bird -nature -tree -flower'
      query += ' -sport -football -basketball -gym -exercise'
      query += ' -book -paper -document -text -writing'
      query += ' -tool -equipment -machine -device'
      
      // Add category filters
      if (this.selectedCategory) {
        const categoryTerms = {
          female: 'women ladies female dress gown blouse skirt',
          male: 'men male gentleman shirt suit trouser',
          children: 'kids children child',
          traditional: 'traditional cultural ethnic ankara agbada gele',
          modern: 'modern contemporary trendy stylish'
        }
        query += ` ${categoryTerms[this.selectedCategory]}`
      }
      
      // Add style filters
      if (this.selectedStyle) {
        const styleTerms = {
          casual: 'casual everyday comfortable',
          formal: 'formal elegant sophisticated',
          wedding: 'wedding bridal marriage ceremony',
          party: 'party celebration festive',
          business: 'business professional corporate office'
        }
        query += ` ${styleTerms[this.selectedStyle] || this.selectedStyle}`
      }
      
      // Add location filters
      if (this.selectedLocation) {
        const locationTerms = {
          local: 'nigerian african local indigenous',
          african: 'african traditional ethnic cultural',
          western: 'western european american international',
          latest: 'latest 2024 trending modern contemporary'
        }
        query += ` ${locationTerms[this.selectedLocation]}`
      }
      
      return query
    },
    
    applyFilters() {
      if (this.currentQuery) {
        this.handleSearch(this.currentQuery, 1)
      }
    },
    
    clearFilters() {
      this.selectedCategory = ''
      this.selectedStyle = ''
      this.selectedLocation = ''
      this.showFilters = false
      this.dropdownOpen = null
      if (this.currentQuery) {
        this.handleSearch(this.currentQuery, 1)
      }
    },
    
    // Custom dropdown methods
    toggleDropdown(type) {
      this.dropdownOpen = this.dropdownOpen === type ? null : type
    },
    
    selectOption(type, value) {
      if (type === 'category') {
        this.selectedCategory = value
      } else if (type === 'style') {
        this.selectedStyle = value
      } else if (type === 'location') {
        this.selectedLocation = value
      }
      
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
    
    getLocationLabel(value) {
      const option = this.locationOptions.find(opt => opt.value === value)
      return option ? option.label : 'Nigerian Focus'
    },
    
    handleClickOutside(event) {
      if (!event.target.closest('.relative')) {
        this.dropdownOpen = null
      }
    },
    
    getHighQualityImage(image) {
      // Use the full imageURL for better quality, fallback to thumbnail
      return image.imageURL || image.thumbnailURL
    },
    
    cleanTitle(title) {
      if (!title) return 'Fashion Style'
      
      // Remove common noise words and clean up
      return title
        .replace(/\s+/g, ' ')
        .replace(/[^\w\s-]/g, '')
        .trim()
        .substring(0, 60)
    },
    
    async goToPage(page) {
      if (page < 1 || page > this.totalPages || page === this.currentPage) return
      await this.handleSearch(this.currentQuery, page)
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    
    getVisiblePages() {
      const pages = []
      const start = Math.max(1, this.currentPage - 2)
      const end = Math.min(this.totalPages, this.currentPage + 2)
      
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
        const imageUrl = image.imageURL || image.thumbnailURL
        const message = encodeURIComponent(`Hello Raws Apparel 👋

I found this beautiful style and would like to get it made:

📸 Style: ${this.cleanTitle(image.title)}
🎨 Description: ${image.description || 'Custom Nigerian fashion piece'}

Image: ${imageUrl}

Please let me know about:
• Measurements needed
• Fabric options available
• Pricing details
• Timeline for completion

Thank you!`)
        
        const whatsappLink = `https://wa.me/2348128653553?text=${message}`
        window.open(whatsappLink, '_blank')
        
        console.log('📱 WhatsApp message sent for:', image.title)
      } catch (error) {
        console.error('WhatsApp error:', error)
      }
    },
    
    handleImageError(event) {
      console.log('❌ Image failed to load, trying proxy')
      const originalSrc = event.target.src
      
      // If it's already a proxy URL or placeholder, don't retry
      if (originalSrc.includes('localhost:5003/api/image-proxy') || 
          originalSrc.includes('picsum.photos') || 
          originalSrc.includes('via.placeholder.com')) {
        event.target.src = `https://picsum.photos/400/600?random=${Math.floor(Math.random() * 1000)}`
        return
      }
      
      // Try using the image proxy for Google images
      if (originalSrc.includes('gstatic.com') || 
          originalSrc.includes('googleusercontent.com') || 
          originalSrc.includes('alibaba.com') ||
          originalSrc.includes('pinimg.com')) {
        event.target.src = `http://localhost:5003/api/image-proxy/google?url=${encodeURIComponent(originalSrc)}`
      } else {
        // Use a reliable placeholder
        event.target.src = `https://picsum.photos/400/600?random=${Math.floor(Math.random() * 1000)}`
      }
    }
  },
  watch: {
    '$route.query.q'(newQuery) {
      if (newQuery) {
        this.handleSearch(newQuery)
      }
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

.btn-secondary {
  @apply bg-white text-champagne-gold border border-champagne-gold px-6 py-3 rounded-lg font-medium hover:bg-champagne-gold hover:text-white transition-colors duration-200;
}

/* Modern card hover effects */
.group:hover {
  transform: translateY(-4px);
}

/* Smooth transitions for all interactive elements */
* {
  transition: all 0.2s ease-in-out;
}

/* Custom scrollbar for modal */
.overflow-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-auto::-webkit-scrollbar-thumb {
  background: #E4B169;
  border-radius: 3px;
}

.overflow-auto::-webkit-scrollbar-thumb:hover {
  background: #d4a155;
}

/* Aspect ratio utility */
.aspect-\[3\/4\] {
  aspect-ratio: 3 / 4;
}

/* Rotation utility */
.rotate-180 {
  transform: rotate(180deg);
}

/* Mobile responsive adjustments */
@media (max-width: 640px) {
  .grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem;
  }
  
  .p-3 {
    padding: 0.5rem;
  }
  
  .text-sm {
    font-size: 0.75rem;
  }
  
  /* Ensure tags don't wrap too much on mobile */
  .flex-wrap {
    max-height: 4rem;
    overflow: hidden;
  }
  
  /* Better spacing for mobile filters */
  .grid-cols-1 {
    gap: 1rem;
  }
}

/* Ensure dropdowns appear above other content */
.relative .absolute {
  z-index: 50;
}
</style>