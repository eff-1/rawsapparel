<template>
  <div class="min-h-screen bg-soft-warm-gray">
    <!-- Hero Section -->
    <section class="py-20 bg-jet-black text-soft-warm-gray">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-champagne-gold mb-6">Our Story</h1>
        <p class="text-xl leading-relaxed">
          Crafting exceptional garments that celebrate both tradition and innovation, 
          one stitch at a time.
        </p>
      </div>
    </section>
    
    <!-- Main Content -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Mission -->
        <div class="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 class="text-champagne-gold mb-6">Crafting Confidence</h2>
            <p class="text-gray-600 mb-6 leading-relaxed">
              At Raws Apparel, we believe that great clothing is more than fabric and thread—it's about confidence, 
              expression, and celebrating your unique style. Founded with a passion for exceptional craftsmanship, 
              we've dedicated ourselves to creating garments that tell your story.
            </p>
            <p class="text-gray-600 mb-6 leading-relaxed">
              Our journey began with a simple vision: to bridge the gap between traditional African tailoring 
              techniques and contemporary fashion sensibilities. Today, we're proud to serve clients who appreciate 
              the artistry of bespoke tailoring and the beauty of well-crafted clothing.
            </p>
            <p class="text-gray-600 leading-relaxed">
              Every piece that leaves our atelier is a testament to our commitment to quality, attention to detail, 
              and respect for the craft that has been passed down through generations.
            </p>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&h=400&fit=crop"
              alt="Master tailor at work"
              class="rounded-2xl shadow-xl"
            />
          </div>
        </div>
        
        <!-- Values -->
        <div class="mb-20">
          <h2 class="text-center text-champagne-gold mb-12">Our Values</h2>
          <div class="grid md:grid-cols-3 gap-8">
            <div class="text-center">
              <div class="w-16 h-16 bg-champagne-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-champagne-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="font-playfair font-medium text-xl mb-3">Quality</h3>
              <p class="text-gray-600">
                We use only the finest materials and time-tested techniques to ensure every garment meets our exacting standards.
              </p>
            </div>
            <div class="text-center">
              <div class="w-16 h-16 bg-champagne-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-champagne-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <h3 class="font-playfair font-medium text-xl mb-3">Passion</h3>
              <p class="text-gray-600">
                Our love for the craft drives us to continuously innovate while respecting traditional tailoring methods.
              </p>
            </div>
            <div class="text-center">
              <div class="w-16 h-16 bg-champagne-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-champagne-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 class="font-playfair font-medium text-xl mb-3">Service</h3>
              <p class="text-gray-600">
                We're committed to providing personalized service that makes every client feel valued and understood.
              </p>
            </div>
          </div>
        </div>
        
        <!-- Process -->
        <div class="mb-20">
          <h2 class="text-center text-champagne-gold mb-12">Our Process</h2>
          <div class="grid md:grid-cols-4 gap-8">
            <div class="text-center">
              <div class="w-12 h-12 bg-champagne-gold text-jet-black rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                1
              </div>
              <h4 class="font-medium mb-2">Consultation</h4>
              <p class="text-gray-600 text-sm">
                We discuss your vision, style preferences, and requirements.
              </p>
            </div>
            <div class="text-center">
              <div class="w-12 h-12 bg-champagne-gold text-jet-black rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                2
              </div>
              <h4 class="font-medium mb-2">Design</h4>
              <p class="text-gray-600 text-sm">
                Our designers create a custom pattern tailored to your measurements.
              </p>
            </div>
            <div class="text-center">
              <div class="w-12 h-12 bg-champagne-gold text-jet-black rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                3
              </div>
              <h4 class="font-medium mb-2">Crafting</h4>
              <p class="text-gray-600 text-sm">
                Master tailors bring your design to life with precision and care.
              </p>
            </div>
            <div class="text-center">
              <div class="w-12 h-12 bg-champagne-gold text-jet-black rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                4
              </div>
              <h4 class="font-medium mb-2">Delivery</h4>
              <p class="text-gray-600 text-sm">
                Final fitting and delivery of your perfect garment.
              </p>
            </div>
          </div>
        </div>
        
        <!-- Team -->
        <div class="text-center">
          <h2 class="text-champagne-gold mb-8">Meet Our Team</h2>
          <div class="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div class="text-center">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
                alt="Master Tailor"
                class="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h4 class="font-medium text-lg">Adebayo Ogundimu</h4>
              <p class="text-champagne-gold">Master Tailor</p>
              <p class="text-gray-600 text-sm mt-2">
                20+ years of experience in traditional and modern tailoring
              </p>
            </div>
            <div class="text-center">
              <img 
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face"
                alt="Design Director"
                class="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h4 class="font-medium text-lg">Kemi Adebisi</h4>
              <p class="text-champagne-gold">Design Director</p>
              <p class="text-gray-600 text-sm mt-2">
                Fashion design graduate with a passion for African aesthetics
              </p>
            </div>
            <div class="text-center">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
                alt="Customer Relations"
                class="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h4 class="font-medium text-lg">Tunde Fashola</h4>
              <p class="text-champagne-gold">Customer Relations</p>
              <p class="text-gray-600 text-sm mt-2">
                Ensuring every client receives exceptional service and care
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- CTA -->
    <section class="py-16 bg-jet-black">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-champagne-gold mb-6">Ready to Experience Excellence?</h2>
        <p class="text-soft-warm-gray text-lg mb-8 max-w-2xl mx-auto">
          Join hundreds of satisfied clients who trust Raws Apparel for their tailoring needs.
        </p>
        <a 
          href="https://wa.me/2348128653553?text=Hello%20Raws%20Apparel!%20I'd%20like%20to%20learn%20more%20about%20your%20services."
          target="_blank"
          class="btn-primary inline-flex items-center gap-3"
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