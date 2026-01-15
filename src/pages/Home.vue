<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-champagne-gold/5">
    <!-- Hero Section - Dynamic & Beautiful -->
    <section class="relative min-h-screen flex items-center overflow-hidden">
      <!-- Animated Background Grid -->
      <div class="absolute inset-0 bg-gradient-to-br from-jet-black via-gray-900 to-jet-black">
        <div class="absolute inset-0 opacity-10">
          <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, rgba(228, 177, 105, 0.15) 1px, transparent 0); background-size: 40px 40px;"></div>
        </div>
      </div>
      
      <!-- Hero Content -->
      <div class="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left: Text Content -->
          <div class="text-white space-y-8 animate-fadeInLeft">
            <div class="inline-block">
              <span class="px-4 py-2 bg-champagne-gold/20 backdrop-blur-sm border border-champagne-gold/30 rounded-full text-champagne-gold text-sm font-medium">
                Premium Fashion Tailoring
              </span>
            </div>
            
            <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Discover Your
              <span class="block text-transparent bg-clip-text bg-gradient-to-r from-champagne-gold via-yellow-300 to-champagne-gold animate-shimmer">
                Perfect Style
              </span>
            </h1>
            
            <p class="text-xl text-gray-300 leading-relaxed max-w-xl">
              From traditional elegance to modern sophistication. Search millions of fashion styles and bring your vision to life with expert tailoring.
            </p>
            
            <!-- Quick Search -->
            <div class="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                @click="scrollToSearch"
                class="px-8 py-4 bg-gradient-to-r from-champagne-gold to-rich-bronze text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-champagne-gold/50 transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                Start Searching
              </button>
              <a 
                href="https://wa.me/2348128653553?text=Hello%20Raws%20Apparel!"
                target="_blank"
                class="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
              >
                Contact Us
              </a>
            </div>
            
            <!-- Stats -->
            <div class="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div>
                <div class="text-3xl font-bold text-champagne-gold">10K+</div>
                <div class="text-sm text-gray-400">Happy Clients</div>
              </div>
              <div>
                <div class="text-3xl font-bold text-champagne-gold">50K+</div>
                <div class="text-sm text-gray-400">Styles Available</div>
              </div>
              <div>
                <div class="text-3xl font-bold text-champagne-gold">100%</div>
                <div class="text-sm text-gray-400">Satisfaction</div>
              </div>
            </div>
          </div>
          
          <!-- Right: Model Images Grid -->
          <div class="relative h-[600px] animate-fadeInRight">
            <!-- Main Featured Image -->
            <div class="absolute top-0 right-0 w-64 h-80 rounded-3xl overflow-hidden shadow-2xl transform rotate-6 hover:rotate-3 transition-transform duration-500 z-20">
              <img :src="modelImages[currentImageIndex]" alt="Fashion Model" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            
            <!-- Secondary Image -->
            <div class="absolute top-32 left-0 w-56 h-72 rounded-3xl overflow-hidden shadow-2xl transform -rotate-6 hover:-rotate-3 transition-transform duration-500 z-10">
              <img :src="modelImages[(currentImageIndex + 1) % modelImages.length]" alt="Fashion Model" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            
            <!-- Tertiary Image -->
            <div class="absolute bottom-0 right-12 w-48 h-64 rounded-3xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <img :src="modelImages[(currentImageIndex + 2) % modelImages.length]" alt="Fashion Model" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            
            <!-- Floating Badge -->
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 shadow-2xl z-30 animate-float">
              <div class="text-center">
                <div class="text-4xl font-bold text-champagne-gold mb-1">4.9★</div>
                <div class="text-sm text-gray-600">Customer Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg class="w-6 h-6 text-champagne-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>

    <!-- Search Section -->
    <section ref="searchSection" class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 animate-fadeInUp">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Find Your <span class="text-champagne-gold">Perfect Style</span>
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Search through millions of fashion styles powered by Google Images
          </p>
        </div>
        
        <!-- Integrated Search -->
        <div class="max-w-3xl mx-auto mb-12">
          <div class="flex shadow-2xl rounded-2xl overflow-hidden bg-white border border-gray-100">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Try: Ankara dress, Wedding gown, Business suit..."
              class="flex-1 px-6 py-5 text-lg focus:outline-none"
              @keyup.enter="handleSearch"
            />
            <button 
              @click="handleSearch"
              class="px-10 py-5 bg-gradient-to-r from-champagne-gold to-rich-bronze text-white font-semibold hover:from-rich-bronze hover:to-champagne-gold transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </div>
          
          <!-- Quick Suggestions -->
          <div class="flex flex-wrap justify-center gap-3 mt-6">
            <button 
              v-for="suggestion in quickSuggestions" 
              :key="suggestion"
              @click="searchQuery = suggestion; handleSearch()"
              class="px-5 py-2 bg-gray-50 border border-gray-200 text-gray-700 rounded-full text-sm hover:bg-champagne-gold hover:text-white hover:border-champagne-gold transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm hover:shadow-md"
            >
              {{ suggestion }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Categories -->
    <section class="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Popular Categories</h2>
          <p class="text-xl text-gray-600">Explore our most sought-after styles</p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <div 
            v-for="category in categories" 
            :key="category.name"
            @click="searchQuery = category.query; handleSearch()"
            class="group cursor-pointer"
          >
            <div class="relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <img :src="category.image" :alt="category.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div class="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 class="font-semibold text-lg">{{ category.name }}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Why Choose Raws Apparel</h2>
          <p class="text-xl text-gray-600">Excellence in every stitch</p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center p-8 rounded-2xl bg-gradient-to-br from-champagne-gold/5 to-transparent hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-champagne-gold/10 rounded-2xl mb-6">
              <svg class="w-8 h-8 text-champagne-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Premium Quality</h3>
            <p class="text-gray-600">Expert craftsmanship with attention to every detail</p>
          </div>
          
          <div class="text-center p-8 rounded-2xl bg-gradient-to-br from-champagne-gold/5 to-transparent hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-champagne-gold/10 rounded-2xl mb-6">
              <svg class="w-8 h-8 text-champagne-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Fast Delivery</h3>
            <p class="text-gray-600">Quick turnaround without compromising quality</p>
          </div>
          
          <div class="text-center p-8 rounded-2xl bg-gradient-to-br from-champagne-gold/5 to-transparent hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-champagne-gold/10 rounded-2xl mb-6">
              <svg class="w-8 h-8 text-champagne-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">100% Satisfaction</h3>
            <p class="text-gray-600">Your happiness is our guarantee</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-br from-jet-black via-gray-900 to-jet-black relative overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, rgba(228, 177, 105, 0.15) 1px, transparent 0); background-size: 40px 40px;"></div>
      </div>
      
      <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Create Your <span class="text-champagne-gold">Perfect Look?</span>
        </h2>
        <p class="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Let's bring your vision to life. Contact us today and start your journey to exceptional tailoring.
        </p>
        <a 
          href="https://wa.me/2348128653553?text=Hello%20Raws%20Apparel!%20I'm%20interested%20in%20your%20tailoring%20services."
          target="_blank"
          class="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-600 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl hover:shadow-green-500/50"
        >
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
          Start Your Design Journey
        </a>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      searchQuery: '',
      currentImageIndex: 0,
      modelImages: [
        '/images/model1.jpeg',
        '/images/model2.jpeg',
        '/images/model3.jpeg',
        '/images/model4.jpeg',
        '/images/model5.jpeg',
        '/images/model6.jpeg'
      ],
      quickSuggestions: [
        'Wedding Gown',
        'Ankara Dress',
        'Business Suit',
        'Traditional Wear',
        'Party Dress',
        'Casual Wear'
      ],
      categories: [
        { name: 'Wedding', query: 'wedding gown', image: '/images/model1.jpeg' },
        { name: 'Traditional', query: 'traditional wear', image: '/images/model2.jpeg' },
        { name: 'Casual', query: 'casual wear', image: '/images/model3.jpeg' },
        { name: 'Formal', query: 'business suit', image: '/images/model4.jpeg' },
        { name: 'Party', query: 'party dress', image: '/images/model5.jpeg' },
        { name: 'Ankara', query: 'ankara styles', image: '/images/model6.jpeg' }
      ]
    }
  },
  mounted() {
    // Auto-rotate hero images
    setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.modelImages.length
    }, 4000)
  },
  methods: {
    handleSearch() {
      if (this.searchQuery.trim()) {
        this.$router.push({ path: '/search', query: { q: this.searchQuery } })
      }
    },
    scrollToSearch() {
      this.$refs.searchSection.scrollIntoView({ behavior: 'smooth' })
    }
  }
}
</script>

<style scoped>
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translate(-50%, -50%) translateY(0px);
  }
  50% {
    transform: translate(-50%, -50%) translateY(-20px);
  }
}

@keyframes shimmer {
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
}

.animate-fadeInLeft {
  animation: fadeInLeft 1s ease-out;
}

.animate-fadeInRight {
  animation: fadeInRight 1s ease-out;
}

.animate-fadeInUp {
  animation: fadeInUp 1s ease-out;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-shimmer {
  background-size: 200% auto;
  animation: shimmer 3s linear infinite;
}
</style>
