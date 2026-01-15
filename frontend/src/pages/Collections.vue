<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-champagne-gold/5">
    <!-- Hero Section -->
    <section class="relative py-32 bg-gradient-to-br from-jet-black via-gray-900 to-jet-black overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, rgba(228, 177, 105, 0.15) 1px, transparent 0); background-size: 40px 40px;"></div>
      </div>
      
      <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="inline-block mb-6">
          <span class="px-4 py-2 bg-champagne-gold/20 backdrop-blur-sm border border-champagne-gold/30 rounded-full text-champagne-gold text-sm font-medium">
            Our Collections
          </span>
        </div>
        <h1 class="text-5xl md:text-6xl font-bold text-white mb-6">
          Explore Our <span class="text-transparent bg-clip-text bg-gradient-to-r from-champagne-gold to-yellow-300">Styles</span>
        </h1>
        <p class="text-xl text-gray-300 max-w-2xl mx-auto">
          Discover curated collections of premium African and international designs, each piece crafted with precision and passion.
        </p>
      </div>
    </section>
    
    <!-- Search & Filter Section -->
    <section class="py-12 bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Search Bar -->
        <div class="max-w-2xl mx-auto mb-8">
          <div class="flex shadow-lg rounded-2xl overflow-hidden bg-white">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search collections..."
              class="flex-1 px-6 py-4 text-lg focus:outline-none"
              @input="filterCollections"
            />
            <button class="px-8 py-4 bg-gradient-to-r from-champagne-gold to-rich-bronze text-white">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Category Filter -->
        <div class="flex flex-wrap justify-center gap-3">
          <button 
            v-for="category in categories" 
            :key="category"
            @click="selectedCategory = category"
            :class="[
              'px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-sm',
              selectedCategory === category 
                ? 'bg-gradient-to-r from-champagne-gold to-rich-bronze text-white shadow-lg transform scale-105' 
                : 'bg-white text-gray-600 hover:bg-champagne-gold/10 hover:shadow-md'
            ]"
          >
            {{ category }}
          </button>
        </div>
      </div>
    </section>
    
    <!-- Collections Grid -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div 
            v-for="style in filteredStyles" 
            :key="style.id"
            @click="openStyleModal(style)"
            class="group cursor-pointer"
          >
            <div class="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <img :src="style.imageURL" :alt="style.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <!-- Info Overlay -->
              <div class="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 class="text-xl font-bold mb-2">{{ style.title }}</h3>
                <p class="text-sm text-gray-200 mb-3">{{ style.description }}</p>
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="tag in style.tags.slice(0, 2)" 
                    :key="tag"
                    class="px-3 py-1 bg-champagne-gold/20 backdrop-blur-sm border border-champagne-gold/30 rounded-full text-xs"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Empty State -->
        <div v-if="filteredStyles.length === 0" class="text-center py-20">
          <svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <h3 class="text-2xl font-bold text-gray-900 mb-2">No styles found</h3>
          <p class="text-gray-600">Try adjusting your search or filters</p>
        </div>
      </div>
    </section>
    
    <!-- Load More -->
    <section v-if="hasMore && filteredStyles.length > 0" class="pb-16">
      <div class="text-center">
        <button 
          @click="loadMore" 
          class="px-10 py-4 bg-gradient-to-r from-champagne-gold to-rich-bronze text-white rounded-xl font-semibold hover:from-rich-bronze hover:to-champagne-gold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
        >
          Load More Styles
        </button>
      </div>
    </section>
    
    <!-- Style Modal -->
    <div v-if="showModal && selectedStyle" 
         class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" 
         @click="showModal = false">
      <div class="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl" @click.stop>
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b">
          <h3 class="text-2xl font-bold text-gray-900">{{ selectedStyle.title }}</h3>
          <button 
            @click="showModal = false"
            class="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <!-- Modal Content -->
        <div class="flex flex-col md:flex-row max-h-[calc(90vh-80px)]">
          <!-- Image -->
          <div class="md:flex-1 bg-gray-50 flex items-center justify-center p-6">
            <img 
              :src="selectedStyle.imageURL" 
              :alt="selectedStyle.title" 
              class="max-w-full max-h-96 object-contain rounded-2xl"
            />
          </div>
          
          <!-- Details -->
          <div class="md:w-80 p-6 space-y-6">
            <div>
              <h4 class="font-bold text-gray-900 mb-2">Description</h4>
              <p class="text-gray-600">{{ selectedStyle.description }}</p>
            </div>
            
            <div>
              <h4 class="font-bold text-gray-900 mb-2">Category</h4>
              <span class="inline-block px-4 py-2 bg-champagne-gold/10 text-champagne-gold rounded-lg font-medium">
                {{ selectedStyle.category }}
              </span>
            </div>
            
            <div>
              <h4 class="font-bold text-gray-900 mb-3">Tags</h4>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="tag in selectedStyle.tags" 
                  :key="tag"
                  class="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
            
            <!-- Order Button -->
            <button 
              @click="orderStyle(selectedStyle)"
              class="w-full bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-4 rounded-xl font-semibold hover:from-green-700 hover:to-green-600 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
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
export default {
  name: 'Collections',
  data() {
    return {
      searchQuery: '',
      selectedCategory: 'All',
      categories: ['All', 'Traditional', 'Formal', 'Casual', 'Evening', 'Business', 'Wedding'],
      hasMore: true,
      showModal: false,
      selectedStyle: null,
      styles: [
        {
          id: 1,
          title: 'Royal Agbada',
          category: 'Traditional',
          imageURL: '/images/royal_agb.jpeg',
          description: 'Elegant traditional agbada with intricate embroidery and premium fabric',
          tags: ['Traditional', 'Formal', 'Embroidery', 'Premium'],
          featured: true
        },
        {
          id: 2,
          title: 'Executive Suit',
          category: 'Business',
          imageURL: '/images/model2.jpeg',
          description: 'Sharp tailored suit perfect for business meetings and formal events',
          tags: ['Business', 'Formal', 'Modern', 'Professional'],
          featured: true
        },
        {
          id: 3,
          title: 'Evening Gown',
          category: 'Evening',
          imageURL: '/images/model3.jpeg',
          description: 'Stunning evening gown for special occasions and red carpet events',
          tags: ['Evening', 'Formal', 'Elegant', 'Luxury'],
          featured: true
        },
        {
          id: 4,
          title: 'Casual Elegance',
          category: 'Casual',
          imageURL: '/images/model4.jpeg',
          description: 'Comfortable yet stylish outfit for everyday wear',
          tags: ['Casual', 'Comfortable', 'Everyday', 'Chic'],
          featured: false
        },
        {
          id: 5,
          title: 'Wedding Perfection',
          category: 'Wedding',
          imageURL: '/images/model5.jpeg',
          description: 'Perfect attire for your special day, crafted with love',
          tags: ['Wedding', 'Formal', 'Special', 'Bridal'],
          featured: true
        },
        {
          id: 6,
          title: 'Traditional Dress',
          category: 'Traditional',
          imageURL: '/images/model6.jpeg',
          description: 'Beautiful traditional African dress with modern touches',
          tags: ['Traditional', 'African', 'Cultural', 'Modern'],
          featured: false
        },
        {
          id: 7,
          title: 'Ankara Styles',
          category: 'Casual',
          imageURL: '/images/model1.jpeg',
          description: 'Vibrant Ankara designs that celebrate African heritage',
          tags: ['Ankara', 'Casual', 'Colorful', 'African'],
          featured: true
        },
        {
          id: 8,
          title: 'Corporate Chic',
          category: 'Business',
          imageURL: '/images/model2.jpeg',
          description: 'Professional attire that makes a statement',
          tags: ['Business', 'Professional', 'Chic', 'Modern'],
          featured: false
        }
      ]
    }
  },
  computed: {
    filteredStyles() {
      let filtered = this.styles
      
      // Filter by category
      if (this.selectedCategory !== 'All') {
        filtered = filtered.filter(style => style.category === this.selectedCategory)
      }
      
      // Filter by search query
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(style => 
          style.title.toLowerCase().includes(query) ||
          style.description.toLowerCase().includes(query) ||
          style.tags.some(tag => tag.toLowerCase().includes(query))
        )
      }
      
      return filtered
    }
  },
  methods: {
    filterCollections() {
      // Filtering is handled by computed property
    },
    
    openStyleModal(style) {
      this.selectedStyle = style
      this.showModal = true
    },
    
    orderStyle(style) {
      const message = encodeURIComponent(`Hello Raws Apparel!\n\nI'm interested in ordering:\n\n${style.title}\n${style.description}\n\nPlease let me know about measurements, fabric options, pricing and timeline.\n\nThank you!`)
      const whatsappLink = `https://wa.me/2348128653553?text=${message}`
      window.open(whatsappLink, '_blank')
      this.showModal = false
    },
    
    loadMore() {
      // In a real app, this would fetch more data from the API
      console.log('Loading more styles...')
      this.hasMore = false
    }
  }
}
</script>
