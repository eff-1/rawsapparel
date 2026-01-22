<template>
  <nav class="sticky top-0 z-50 bg-jet-black/90 backdrop-blur-sm border-b border-champagne-gold/20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link to="/" class="text-champagne-gold font-playfair text-2xl font-bold">
          Raws Apparel
        </router-link>
        
        <!-- Desktop Menu -->
        <div class="hidden md:flex space-x-8">
          <router-link 
            v-for="item in menuItems" 
            :key="item.name"
            :to="item.path"
            class="text-soft-warm-gray hover:text-champagne-gold transition-colors duration-200 font-medium"
            :class="{ 'text-champagne-gold border-b-2 border-champagne-gold': $route.path === item.path }"
          >
            {{ item.name }}
          </router-link>
        </div>
        
        <!-- Mobile Menu Button -->
        <button 
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden text-soft-warm-gray hover:text-champagne-gold"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      
      <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="md:hidden py-4 border-t border-champagne-gold/20">
        <router-link 
          v-for="item in menuItems" 
          :key="item.name"
          :to="item.path"
          @click="mobileMenuOpen = false"
          class="block py-2 text-soft-warm-gray hover:text-champagne-gold transition-colors duration-200"
        >
          {{ item.name }}
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      mobileMenuOpen: false,
      menuItems: [
        { name: 'Home', path: '/' },
        { name: 'Collections', path: '/collections' },
        { name: 'Search', path: '/search' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' }
      ]
    }
  }
}
</script>