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
            About Us
          </span>
        </div>
        <h1 class="text-5xl md:text-6xl font-bold text-white mb-6 animate-fadeInUp">
          Our <span class="text-transparent bg-clip-text bg-gradient-to-r from-champagne-gold to-yellow-300">Story</span>
        </h1>
        <p class="text-xl text-gray-300 leading-relaxed animate-fadeInUp" style="animation-delay: 0.2s;">
          Crafting exceptional garments that celebrate both tradition and innovation, one stitch at a time.
        </p>
      </div>
    </section>
    
    <!-- Mission Section -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div class="order-2 lg:order-1">
            <div class="relative">
              <div class="absolute -inset-4 bg-gradient-to-r from-champagne-gold/20 to-rich-bronze/20 rounded-3xl blur-2xl"></div>
              <img 
                src="/images/model1.jpeg"
                alt="Master tailor at work"
                class="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover"
              />
            </div>
          </div>
          
          <div class="order-1 lg:order-2 space-y-6">
            <h2 class="text-4xl font-bold text-gray-900">
              Crafting <span class="text-champagne-gold">Confidence</span>
            </h2>
            <p class="text-lg text-gray-600 leading-relaxed">
              At Raws Apparel, we believe that great clothing is more than fabric and thread—it's about confidence, 
              expression, and celebrating your unique style. Founded with a passion for exceptional craftsmanship, 
              we've dedicated ourselves to creating garments that tell your story.
            </p>
            <p class="text-lg text-gray-600 leading-relaxed">
              Our journey began with a simple vision: to bridge the gap between traditional African tailoring 
              techniques and contemporary fashion sensibilities. Today, we're proud to serve clients who appreciate 
              the artistry of bespoke tailoring and the beauty of well-crafted clothing.
            </p>
            <p class="text-lg text-gray-600 leading-relaxed">
              Every piece that leaves our atelier is a testament to our commitment to quality, attention to detail, 
              and respect for the craft that has been passed down through generations.
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Values Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Our <span class="text-champagne-gold">Values</span></h2>
          <p class="text-xl text-gray-600">The principles that guide everything we do</p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <div class="group text-center p-8 rounded-3xl bg-gradient-to-br from-champagne-gold/5 to-transparent hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-champagne-gold to-rich-bronze rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Quality</h3>
            <p class="text-gray-600 leading-relaxed">
              We use only the finest materials and time-tested techniques to ensure every garment meets our exacting standards.
            </p>
          </div>
          
          <div class="group text-center p-8 rounded-3xl bg-gradient-to-br from-champagne-gold/5 to-transparent hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-champagne-gold to-rich-bronze rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Passion</h3>
            <p class="text-gray-600 leading-relaxed">
              Our love for the craft drives us to continuously innovate while respecting traditional tailoring methods.
            </p>
          </div>
          
          <div class="group text-center p-8 rounded-3xl bg-gradient-to-br from-champagne-gold/5 to-transparent hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-champagne-gold to-rich-bronze rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Service</h3>
            <p class="text-gray-600 leading-relaxed">
              We're committed to providing personalized service that makes every client feel valued and understood.
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Process Section -->
    <section class="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Our <span class="text-champagne-gold">Process</span></h2>
          <p class="text-xl text-gray-600">From concept to creation in four simple steps</p>
        </div>
        
        <div class="grid md:grid-cols-4 gap-8">
          <div class="relative text-center group">
            <div class="relative z-10">
              <div class="w-16 h-16 bg-gradient-to-br from-champagne-gold to-rich-bronze text-white rounded-2xl flex items-center justify-center mx-auto mb-6 font-bold text-2xl shadow-xl group-hover:scale-110 transition-transform duration-300">
                1
              </div>
              <h4 class="text-xl font-bold text-gray-900 mb-3">Consultation</h4>
              <p class="text-gray-600">
                We discuss your vision, style preferences, and requirements.
              </p>
            </div>
            <div class="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-champagne-gold/50 to-transparent -z-10"></div>
          </div>
          
          <div class="relative text-center group">
            <div class="relative z-10">
              <div class="w-16 h-16 bg-gradient-to-br from-champagne-gold to-rich-bronze text-white rounded-2xl flex items-center justify-center mx-auto mb-6 font-bold text-2xl shadow-xl group-hover:scale-110 transition-transform duration-300">
                2
              </div>
              <h4 class="text-xl font-bold text-gray-900 mb-3">Design</h4>
              <p class="text-gray-600">
                Our designers create a custom pattern tailored to your measurements.
              </p>
            </div>
            <div class="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-champagne-gold/50 to-transparent -z-10"></div>
          </div>
          
          <div class="relative text-center group">
            <div class="relative z-10">
              <div class="w-16 h-16 bg-gradient-to-br from-champagne-gold to-rich-bronze text-white rounded-2xl flex items-center justify-center mx-auto mb-6 font-bold text-2xl shadow-xl group-hover:scale-110 transition-transform duration-300">
                3
              </div>
              <h4 class="text-xl font-bold text-gray-900 mb-3">Crafting</h4>
              <p class="text-gray-600">
                Master tailors bring your design to life with precision and care.
              </p>
            </div>
            <div class="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-champagne-gold/50 to-transparent -z-10"></div>
          </div>
          
          <div class="text-center group">
            <div class="w-16 h-16 bg-gradient-to-br from-champagne-gold to-rich-bronze text-white rounded-2xl flex items-center justify-center mx-auto mb-6 font-bold text-2xl shadow-xl group-hover:scale-110 transition-transform duration-300">
              4
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Delivery</h4>
            <p class="text-gray-600">
              Final fitting and delivery of your perfect garment.
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Gallery Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Our <span class="text-champagne-gold">Work</span></h2>
          <p class="text-xl text-gray-600">A glimpse of our craftsmanship</p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div v-for="i in 6" :key="i" class="group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <img :src="`/images/model${i}.jpeg`" :alt="`Gallery ${i}`" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
          Ready to Experience <span class="text-champagne-gold">Excellence?</span>
        </h2>
        <p class="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Join thousands of satisfied clients who trust Raws Apparel for their tailoring needs.
        </p>
        <a 
          href="https://wa.me/2348128653553?text=Hello%20Raws%20Apparel!%20I'd%20like%20to%20learn%20more%20about%20your%20services."
          target="_blank"
          class="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-600 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl hover:shadow-green-500/50"
        >
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
          Get In Touch
        </a>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
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

.animate-fadeInUp {
  animation: fadeInUp 1s ease-out;
}
</style>
