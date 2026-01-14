<template>
  <div>
    <!-- Hero Section -->
    <Hero />
    
    <!-- Search Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-champagne-gold mb-4">Find Your Perfect Style</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Search through our curated collection and Pinterest inspiration to find the perfect design for your next outfit.
          </p>
        </div>
        <SearchBar @search="handleSearch" />
      </div>
    </section>
    
    <!-- Featured Styles -->
    <section class="py-16 bg-soft-warm-gray">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-jet-black mb-4">Our Signature Looks</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Handpicked designs from our portfolio showcasing the finest in African and international tailoring.
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <StyleCard 
            v-for="style in featuredStyles" 
            :key="style.id" 
            :style="style" 
          />
        </div>
        
        <div class="text-center mt-12">
          <router-link to="/collections" class="btn-secondary">
            View All Collections
          </router-link>
        </div>
      </div>
    </section>
    
    <!-- About Preview -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&h=400&fit=crop"
              alt="Tailor at work"
              class="rounded-2xl shadow-xl"
            />
          </div>
          <div>
            <h2 class="text-champagne-gold mb-6">Crafting Confidence</h2>
            <p class="text-gray-600 mb-6 leading-relaxed">
              At Raws Apparel, we believe that great clothing is more than fabric and thread—it's about confidence, 
              expression, and celebrating your unique style. Our master tailors combine traditional techniques with 
              modern design to create pieces that tell your story.
            </p>
            <p class="text-gray-600 mb-8 leading-relaxed">
              From elegant agbadas that honor our heritage to sharp business suits that command respect, 
              every piece is crafted with meticulous attention to detail and an unwavering commitment to quality.
            </p>
            <router-link to="/about" class="btn-primary">
              Learn Our Story
            </router-link>
          </div>
        </div>
      </div>
    </section>
    
    <!-- CTA Banner -->
    <section class="py-16 bg-jet-black">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-champagne-gold mb-6">Ready to Create Your Perfect Look?</h2>
        <p class="text-soft-warm-gray text-xl mb-8 max-w-2xl mx-auto">
          Let's bring your vision to life. Contact us today and start your journey to exceptional tailoring.
        </p>
        <a 
          href="https://wa.me/2348128653553?text=Hello%20Raws%20Apparel!%20I'm%20interested%20in%20your%20tailoring%20services."
          target="_blank"
          class="btn-primary inline-flex items-center gap-3"
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
import Hero from '../components/Hero.vue'
import SearchBar from '../components/SearchBar.vue'
import StyleCard from '../components/StyleCard.vue'

export default {
  name: 'Home',
  components: {
    Hero,
    SearchBar,
    StyleCard
  },
  data() {
    return {
      featuredStyles: []
    }
  },
  async mounted() {
    await this.loadFeaturedStyles()
  },
  methods: {
    async loadFeaturedStyles() {
      try {
        const response = await fetch('http://localhost:5003/api/styles')
        const allStyles = await response.json()
        // Show only featured styles on homepage
        this.featuredStyles = allStyles.filter(style => style.featured).slice(0, 3)
      } catch (error) {
        console.error('Error loading featured styles:', error)
        // Fallback to sample data if API fails
        this.featuredStyles = [
          {
            id: 1,
            title: 'Royal Agbada',
            category: 'Traditional',
            imageURL: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=500&fit=crop',
            description: 'Elegant traditional agbada with intricate embroidery',
            tags: ['Traditional', 'Formal', 'Embroidery'],
            featured: true
          }
        ]
      }
    },
    handleSearch(query) {
      this.$router.push({ path: '/search', query: { q: query } })
    }
  }
}
</script>