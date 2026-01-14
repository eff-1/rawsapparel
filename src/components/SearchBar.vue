<template>
  <div class="max-w-3xl mx-auto px-4 py-6">
    <div class="relative">
      <input
        v-model="searchQuery"
        @keyup.enter="handleSearch"
        type="text"
        placeholder="Search Nigerian fashion: gowns, ankara, traditional..."
        class="w-full px-6 py-4 pr-14 text-lg border-2 border-champagne-gold rounded-2xl 
               focus:outline-none focus:ring-4 focus:ring-champagne-gold/20 focus:border-champagne-gold
               bg-white shadow-lg transition-all duration-200 placeholder-gray-400"
      />
      <button 
        @click="handleSearch"
        class="absolute right-3 top-1/2 transform -translate-y-1/2 
               bg-champagne-gold text-jet-black p-3 rounded-xl 
               hover:bg-champagne-gold/90 hover:scale-105 transition-all duration-200 shadow-md"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </button>
    </div>
    
    <!-- Quick Search Tags - Mobile Optimized -->
    <div class="mt-4">
      <div class="flex flex-wrap justify-center gap-2 max-w-full overflow-hidden">
        <button 
          v-for="tag in quickTags" 
          :key="tag"
          @click="selectTag(tag)"
          class="px-3 py-1.5 bg-white/90 border border-champagne-gold/40 text-champagne-gold rounded-full text-sm font-medium
                 hover:bg-champagne-gold hover:text-white hover:border-champagne-gold transition-all duration-200 
                 hover:scale-105 shadow-sm whitespace-nowrap"
        >
          {{ tag }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      searchQuery: '',
      quickTags: [
        'Ankara Dress',
        'Wedding Gown', 
        'Traditional',
        'Party Dress',
        'Casual Wear',
        'Agbada'
      ]
    }
  },
  methods: {
    handleSearch() {
      if (this.searchQuery.trim()) {
        this.$emit('search', this.searchQuery.trim())
      }
    },
    selectTag(tag) {
      this.searchQuery = tag
      this.handleSearch()
    }
  }
}
</script>