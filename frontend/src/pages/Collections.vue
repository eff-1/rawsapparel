<template>
  <div class="min-h-screen bg-soft-warm-gray py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-jet-black mb-4">Our Collections</h1>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Explore our curated collection of premium African and international designs, 
          each piece crafted with precision and passion.
        </p>
      </div>
      
      <!-- Category Filter -->
      <div class="flex flex-wrap justify-center gap-4 mb-12">
        <button 
          v-for="category in categories" 
          :key="category"
          @click="selectedCategory = category"
          :class="[
            'px-6 py-2 rounded-full font-medium transition-all duration-200',
            selectedCategory === category 
              ? 'bg-champagne-gold text-jet-black' 
              : 'bg-white text-gray-600 hover:bg-champagne-gold/10'
          ]"
        >
          {{ category }}
        </button>
      </div>
      
      <!-- Collections Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <StyleCard 
          v-for="style in filteredStyles" 
          :key="style.id" 
          :style="style" 
        />
      </div>
      
      <!-- Load More -->
      <div v-if="hasMore" class="text-center mt-12">
        <button @click="loadMore" class="btn-secondary">
          Load More Styles
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import StyleCard from '../components/StyleCard.vue'

export default {
  name: 'Collections',
  components: {
    StyleCard
  },
  data() {
    return {
      selectedCategory: 'All',
      categories: ['All', 'Traditional', 'Formal', 'Casual', 'Evening', 'Business'],
      hasMore: true,
      styles: [
        {
          id: 1,
          title: 'Royal Agbada',
          category: 'Traditional',
          imageURL: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=500&fit=crop',
          description: 'Elegant traditional agbada with intricate embroidery',
          tags: ['Traditional', 'Formal', 'Embroidery'],
          featured: true
        },
        {
          id: 2,
          title: 'Executive Suit',
          category: 'Business',
          imageURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
          description: 'Sharp tailored suit perfect for business meetings',
          tags: ['Business', 'Formal', 'Modern'],
          featured: true
        },
        {
          id: 3,
          title: 'Evening Gown',
          category: 'Evening',
          imageURL: 'https://images.unsplash.com/photo-1566479179817-c0b5b4b4b1e5?w=400&h=500&fit=crop',
          description: 'Stunning evening gown for special occasions',
          tags: ['Evening', 'Formal', 'Elegant'],
          featured: true
        },
        {
          id: 4,
          title: 'Casual Shirt',
          category: 'Casual',
          imageURL: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
          description: 'Comfortable casual shirt for everyday wear',
          tags: ['Casual', 'Comfortable', 'Everyday'],
          featured: false
        },
        {
          id: 5,
          title: 'Wedding Suit',
          category: 'Formal',
          imageURL: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=400&h=500&fit=crop',
          description: 'Perfect suit for your special day',
          tags: ['Wedding', 'Formal', 'Special'],
          featured: true
        },
        {
          id: 6,
          title: 'Traditional Dress',
          category: 'Traditional',
          imageURL: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=500&fit=crop',
          description: 'Beautiful traditional African dress',
          tags: ['Traditional', 'African', 'Cultural'],
          featured: false
        }
      ]
    }
  },
  computed: {
    filteredStyles() {
      if (this.selectedCategory === 'All') {
        return this.styles
      }
      return this.styles.filter(style => style.category === this.selectedCategory)
    }
  },
  methods: {
    loadMore() {
      // In a real app, this would fetch more data from the API
      console.log('Loading more styles...')
      this.hasMore = false
    }
  }
}
</script>