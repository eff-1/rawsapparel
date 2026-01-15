<template>
  <div class="bg-white rounded-2xl shadow-lg overflow-hidden relative">
    <!-- Admin Controls -->
    <div class="absolute top-2 right-2 z-10 flex gap-2">
      <button 
        @click="$emit('edit', style)"
        class="bg-champagne-gold text-jet-black p-2 rounded-full hover:bg-champagne-gold/80 transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
        </svg>
      </button>
      <button 
        @click="$emit('delete', style.id)"
        class="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
        </svg>
      </button>
    </div>
    
    <!-- Image -->
    <div class="relative overflow-hidden">
      <img 
        :src="style.imageURL" 
        :alt="style.title"
        class="w-full h-64 object-cover"
      />
      <div v-if="style.featured" class="absolute top-4 left-4">
        <span class="bg-champagne-gold text-jet-black px-3 py-1 rounded-full text-sm font-medium">
          Featured
        </span>
      </div>
    </div>
    
    <!-- Content -->
    <div class="p-6">
      <h3 class="font-playfair font-medium text-xl mb-2">{{ style.title }}</h3>
      <p class="text-champagne-gold text-sm mb-2">{{ style.category }}</p>
      
      <!-- Tags -->
      <div class="flex flex-wrap gap-2 mb-4">
        <span 
          v-for="tag in style.tags" 
          :key="tag"
          class="bg-rich-bronze/20 text-rich-bronze px-2 py-1 rounded-full text-xs"
        >
          {{ tag }}
        </span>
      </div>
      
      <!-- Description -->
      <p v-if="style.description" class="text-gray-600 text-sm line-clamp-2">
        {{ style.description }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminCard',
  props: {
    style: {
      type: Object,
      required: true
    }
  },
  emits: ['edit', 'delete']
}
</script>