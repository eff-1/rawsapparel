<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section - Single Screen Height -->
    <section class="relative h-screen flex items-center justify-center overflow-hidden">
      <!-- Background Images with Crossfade -->
      <div class="absolute inset-0">
        <div
          v-for="(bg, index) in heroBackgrounds"
          :key="index"
          class="absolute inset-0 transition-opacity duration-1000"
          :style="{
            opacity: currentBgIndex === index ? 1 : 0,
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }"
        ></div>
        <!-- Overlay -->
        <div class="absolute inset-0 bg-gradient-to-br from-black/75 via-black/60 to-gray-900/70"></div>
      </div>

      <!-- Hero Content - Centered & Concise -->
      <div class="relative z-10 w-full max-w-4xl mx-auto px-4 text-center">
        <div class="space-y-6 animate-fadeIn">
          <!-- Badge -->
          <div class="inline-block">
            <span class="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-sm font-medium">
              ✨ Premium Fashion Tailoring
            </span>
          </div>

          <!-- Main Heading -->
          <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Discover Your
            <span class="block mt-2 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent">
              Perfect Style
            </span>
          </h1>

          <!-- Subheading -->
          <p class="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto">
            From traditional elegance to modern sophistication. Search millions of styles and bring your vision to life.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              @click="scrollToSearch"
              class="px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-amber-500/40 transition-all duration-300 transform hover:scale-105"
            >
              Start Searching
            </button>
            <a
              href="https://wa.me/2348128653553?text=Hello%20Raws%20Apparel!"
              target="_blank"
              rel="noopener noreferrer"
              class="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
            >
              Contact Us
            </a>
          </div>

          <!-- Stats - Compact -->
          <div class="flex justify-center gap-8 pt-8">
            <div class="text-center">
              <div class="text-2xl sm:text-3xl font-bold text-amber-400">10K+</div>
              <div class="text-xs sm:text-sm text-gray-300">Happy Clients</div>
            </div>
            <div class="text-center">
              <div class="text-2xl sm:text-3xl font-bold text-amber-400">50K+</div>
              <div class="text-xs sm:text-sm text-gray-300">Styles</div>
            </div>
            <div class="text-center">
              <div class="text-2xl sm:text-3xl font-bold text-amber-400">4.9★</div>
              <div class="text-xs sm:text-sm text-gray-300">Rating</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg class="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>

    <!-- Search Section -->
    <section ref="searchSection" class="py-16 sm:py-20 bg-gradient-to-b from-white to-amber-50/30">
      <div class="max-w-4xl mx-auto px-4">
        <div class="text-center mb-10">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Find Your <span class="text-amber-600">Perfect Style</span>
          </h2>
          <p class="text-gray-600 text-lg">
            Search millions of fashion styles powered by Google Images
          </p>
        </div>

        <!-- Search Bar -->
        <div class="mb-6">
          <div :class="['flex rounded-xl overflow-hidden shadow-xl bg-white transition-all duration-300', isSearchFocused ? 'ring-2 ring-amber-500' : '']">
            <input
              v-model="searchQuery"
              @focus="isSearchFocused = true"
              @blur="isSearchFocused = false"
              @keyup.enter="handleSearch"
              type="text"
              placeholder="Try: Ankara dress, Wedding gown..."
              class="flex-1 px-4 sm:px-6 py-4 text-base sm:text-lg focus:outline-none"
            />
            <button
              @click="handleSearch"
              class="px-6 sm:px-10 py-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-semibold hover:from-amber-600 hover:to-yellow-700 transition-all"
            >
              <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Quick Suggestions -->
        <div class="flex flex-wrap justify-center gap-2 sm:gap-3">
          <button
            v-for="suggestion in quickSuggestions"
            :key="suggestion"
            @click="searchQuery = suggestion; handleSearch()"
            class="px-3 sm:px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-full text-sm hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all transform hover:scale-105 shadow-sm"
          >
            {{ suggestion }}
          </button>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="py-16 sm:py-20 bg-white">
      <div class="max-w-6xl mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Popular Categories</h2>
          <p class="text-gray-600">Explore our most sought-after styles</p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          <button
            v-for="category in categories"
            :key="category.name"
            @click="searchCategory(category.query)"
            class="group"
          >
            <div class="relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <img 
                :src="category.image" 
                :alt="category.name" 
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div class="absolute inset-0 flex items-end p-4">
                <h3 class="font-bold text-white text-base sm:text-lg">{{ category.name }}</h3>
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="py-16 sm:py-20 bg-gradient-to-b from-amber-50/50 to-white">
      <div class="max-w-6xl mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Why Choose Raws Apparel</h2>
          <p class="text-gray-600">Excellence in every stitch</p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
          >
            <div class="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl text-white mb-4">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="feature.iconPath" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 sm:py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
          Ready to Create Your <span class="text-amber-400">Perfect Look?</span>
        </h2>
        <p class="text-base sm:text-lg text-gray-300 mb-8 sm:mb-10 max-w-2xl mx-auto">
          Let's bring your vision to life. Contact us today and start your journey to exceptional tailoring.
        </p>
        <a
          href="https://wa.me/2348128653553?text=Hello%20Raws%20Apparel!%20I'm%20interested%20in%20your%20tailoring%20services."
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-green-500/50"
        >
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
          </svg>
          <span class="hidden sm:inline">Start Your Design Journey</span>
          <span class="sm:hidden">Get Started</span>
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
      currentBgIndex: 0,
      isSearchFocused: false,
      heroBackgrounds: [
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
      ],
      features: [
        {
          iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
          title: 'Premium Quality',
          description: 'Expert craftsmanship with attention to every detail'
        },
        {
          iconPath: 'M13 10V3L4 14h7v7l9-11h-7z',
          title: 'Fast Delivery',
          description: 'Quick turnaround without compromising quality'
        },
        {
          iconPath: 'M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5',
          title: '100% Satisfaction',
          description: 'Your happiness is our guarantee'
        }
      ]
    }
  },
  mounted() {
    // Auto-rotate hero images
    setInterval(() => {
      this.currentBgIndex = (this.currentBgIndex + 1) % this.heroBackgrounds.length
    }, 5000)
  },
  methods: {
    handleSearch() {
      if (this.searchQuery.trim()) {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(this.searchQuery + ' fashion')}&tbm=isch`, '_blank')
      }
    },
    searchCategory(query) {
      this.searchQuery = query
      window.open(`https://www.google.com/search?q=${encodeURIComponent(query + ' fashion')}&tbm=isch`, '_blank')
    },
    scrollToSearch() {
      this.$refs.searchSection.scrollIntoView({ behavior: 'smooth' })
    }
  }
}
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 1s ease-out;
}
</style>