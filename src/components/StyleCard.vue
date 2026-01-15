<template>
  <div class="bg-white rounded-2xl shadow-lg overflow-hidden card-hover gold-glow">
    <!-- Image -->
    <div class="relative overflow-hidden">
      <img 
        :src="style.imageURL" 
        :alt="style.title"
        class="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
        @error="handleImageError"
        @load="handleImageLoad"
      />
      <div v-if="imageError" class="absolute inset-0 bg-gray-200 flex items-center justify-center">
        <div class="text-center text-gray-500">
          <svg class="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
          </svg>
          <p class="text-xs">Image unavailable</p>
          <p class="text-xs text-purple-600" v-if="style.source === 'pinterest'">Pinterest</p>
        </div>
      </div>
      <div v-if="style.featured" class="absolute top-4 left-4">
        <span class="bg-champagne-gold text-jet-black px-3 py-1 rounded-full text-sm font-medium">
          Our Work
        </span>
      </div>
      <div v-if="style.source === 'pinterest'" class="absolute top-4 right-4">
        <span class="bg-purple-600 text-white px-2 py-1 rounded text-xs">
          📌 Pinterest
        </span>
      </div>
    </div>
    
    <!-- Content -->
    <div class="p-6">
      <h3 class="font-playfair font-medium text-xl mb-2">{{ style.title }}</h3>
      
      <!-- Tags -->
      <div class="flex flex-wrap gap-2 mb-4">
        <span 
          v-for="tag in style.tags" 
          :key="tag"
          class="bg-rich-bronze/20 text-rich-bronze px-2 py-1 rounded-full text-sm"
        >
          {{ tag }}
        </span>
      </div>
      
      <!-- Description -->
      <p v-if="style.description" class="text-gray-600 mb-4 line-clamp-2">
        {{ style.description }}
      </p>
      
      <!-- Action Buttons -->
      <div class="flex gap-2">
        <button 
          @click="showImageModal = true"
          class="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
        >
          👁️ View
        </button>
        
        <!-- Pinterest Link Button (only for Pinterest results) -->
        <button 
          v-if="style.pinterestLink"
          @click="openPinterest"
          class="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          📌 Pinterest
        </button>
        
        <button 
          @click="sendToWhatsApp"
          class="flex-1 btn-primary flex items-center justify-center gap-2"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
          Order
        </button>
      </div>
    </div>
    
    <!-- Image Modal -->
    <div v-if="showImageModal" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" @click="showImageModal = false">
      <div class="max-w-2xl max-h-screen p-4" @click.stop>
        <div class="bg-white rounded-2xl overflow-hidden">
          <div class="relative">
            <img :src="style.imageURL" :alt="style.title" class="w-full h-auto max-h-96 object-cover">
            <button 
              @click="showImageModal = false"
              class="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75"
            >
              ✕
            </button>
          </div>
          <div class="p-6">
            <h3 class="font-playfair font-medium text-2xl mb-2">{{ style.title }}</h3>
            <p class="text-champagne-gold mb-4">{{ style.category }}</p>
            <p class="text-gray-600 mb-6">{{ style.description }}</p>
            <button 
              @click="sendToWhatsApp(); showImageModal = false"
              class="w-full btn-primary flex items-center justify-center gap-2"
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
  name: 'StyleCard',
  props: {
    style: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showImageModal: false,
      imageError: false
    }
  },
  methods: {
    handleImageError(event) {
      console.log('❌ Image failed to load:', this.style.imageURL)
      this.imageError = true
      
      // Use simple, reliable placeholders
      if (this.style.source === 'pinterest') {
        // Use Picsum for Pinterest placeholders (more reliable than via.placeholder)
        event.target.src = `https://picsum.photos/400/500?random=${Math.floor(Math.random() * 1000)}&blur=1`
      } else {
        // Use a simple placeholder for our styles
        event.target.src = 'https://picsum.photos/400/500?random=999&grayscale'
      }
    },
    
    handleImageLoad() {
      this.imageError = false
      console.log('✅ Image loaded successfully:', this.style.imageURL)
    },
    
    openPinterest() {
      if (this.style.pinterestLink) {
        console.log('🔗 Opening Pinterest link:', this.style.pinterestLink)
        window.open(this.style.pinterestLink, '_blank')
      }
    },
    
    async sendToWhatsApp() {
      try {
        const response = await fetch('http://localhost:5003/api/whatsapp-link', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            imageURL: this.style.imageURL,
            title: this.style.title,
            category: this.style.category,
            description: this.style.description,
            optionalMessage: `I'd like to get this ${this.style.category} made. Please let me know about measurements and pricing.`
          })
        })
        
        const data = await response.json()
        window.open(data.whatsappLink, '_blank')
      } catch (error) {
        console.error('Error generating WhatsApp link:', error)
        // Fallback direct link
        const message = encodeURIComponent(`Hello Raws Apparel 👋\nI found this design on your website:\n${this.style.imageURL}\nI'd like to get this made. Please advise on price and availability.`)
        const whatsappLink = `https://wa.me/2348128653553?text=${message}`
        window.open(whatsappLink, '_blank')
      }
    }
  }
}
</script>