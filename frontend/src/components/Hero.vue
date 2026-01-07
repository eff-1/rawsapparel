<template>
  <section class="bg-jet-black text-soft-warm-gray py-20 lg:py-32">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- Text Content -->
        <div class="space-y-8">
          <h1 class="text-champagne-gold">
            Tailored Elegance for Every Style
          </h1>
          <p class="text-xl leading-relaxed max-w-lg">
            Crafting premium African and international wears with precision and passion. 
            From elegant agbadas to sophisticated suits, we bring your vision to life.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <button class="btn-primary">
              Get Your Design
            </button>
            <button class="btn-secondary">
              View Collections
            </button>
          </div>
        </div>
        
        <!-- Hero Image -->
        <div class="relative">
          <div class="rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600&h=700&fit=crop&crop=center"
              alt="Elegant tailored suit"
              class="w-full h-[500px] object-cover"
            />
          </div>
          <!-- Decorative elements -->
          <div class="absolute -top-4 -right-4 w-24 h-24 border-2 border-champagne-gold rounded-full opacity-30"></div>
          <div class="absolute -bottom-4 -left-4 w-16 h-16 bg-champagne-gold/20 rounded-full"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Hero'
}
</script>