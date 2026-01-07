<template>
  <div class="min-h-screen bg-soft-warm-gray py-8">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-jet-black mb-4">Admin Panel</h1>
        <p class="text-gray-600">Manage your styles and content</p>
      </div>
      
      <!-- Login Form (if not authenticated) -->
      <div v-if="!isAuthenticated" class="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 class="text-center text-champagne-gold mb-6">Admin Login</h2>
        <form @submit.prevent="login">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-medium mb-2">Email</label>
            <input 
              v-model="loginForm.email"
              type="email" 
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-champagne-gold"
            />
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-medium mb-2">Password</label>
            <input 
              v-model="loginForm.password"
              type="password" 
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-champagne-gold"
            />
          </div>
          <button type="submit" class="w-full btn-primary">
            Login
          </button>
        </form>
      </div>
      
      <!-- Admin Dashboard (if authenticated) -->
      <div v-else>
        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-4 mb-8">
          <button 
            @click="showUploadModal = true"
            class="btn-primary"
          >
            Upload New Style
          </button>
          <button 
            @click="refreshStyles"
            class="btn-secondary"
          >
            Refresh Styles
          </button>
          <button 
            @click="logout"
            class="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
        
        <!-- Styles Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AdminCard 
            v-for="style in adminStyles" 
            :key="style.id" 
            :style="style"
            @edit="editStyle"
            @delete="deleteStyle"
          />
        </div>
      </div>
      
      <!-- Upload Modal -->
      <div v-if="showUploadModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
          <h3 class="text-xl font-medium mb-6">Upload New Style</h3>
          <form @submit.prevent="uploadStyle">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-medium mb-2">Title</label>
              <input 
                v-model="uploadForm.title"
                type="text" 
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-champagne-gold"
              />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-medium mb-2">Category</label>
              <select 
                v-model="uploadForm.category"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-champagne-gold"
              >
                <option value="">Select Category</option>
                <option value="Traditional">Traditional</option>
                <option value="Formal">Formal</option>
                <option value="Casual">Casual</option>
                <option value="Evening">Evening</option>
                <option value="Business">Business</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-medium mb-2">Description</label>
              <textarea 
                v-model="uploadForm.description"
                rows="3"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-champagne-gold"
              ></textarea>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-medium mb-2">Tags (comma separated)</label>
              <input 
                v-model="uploadForm.tags"
                type="text" 
                placeholder="elegant, formal, wedding"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-champagne-gold"
              />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-medium mb-2">Image</label>
              <input 
                @change="handleImageUpload"
                type="file" 
                accept="image/*"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-champagne-gold"
              />
            </div>
            <div class="mb-6">
              <label class="flex items-center">
                <input 
                  v-model="uploadForm.featured"
                  type="checkbox"
                  class="mr-2"
                />
                <span class="text-sm">Featured Style</span>
              </label>
            </div>
            <div class="flex gap-4">
              <button type="submit" class="flex-1 btn-primary">
                Upload Style
              </button>
              <button 
                type="button"
                @click="showUploadModal = false"
                class="flex-1 btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminCard from '../components/AdminCard.vue'

export default {
  name: 'Admin',
  components: {
    AdminCard
  },
  data() {
    return {
      isAuthenticated: false,
      showUploadModal: false,
      loginForm: {
        email: '',
        password: ''
      },
      uploadForm: {
        title: '',
        category: '',
        description: '',
        tags: '',
        featured: false,
        imageFile: null
      },
      adminStyles: []
    }
  },
  mounted() {
    // Check if user is already authenticated
    const savedAuth = localStorage.getItem('adminAuth')
    if (savedAuth) {
      this.isAuthenticated = true
      this.loadStyles()
    }
  },
  methods: {
    async login() {
      try {
        const response = await fetch('http://localhost:5003/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.loginForm.email,
            password: this.loginForm.password
          })
        })
        
        const data = await response.json()
        
        if (response.ok && data.success) {
          this.isAuthenticated = true
          localStorage.setItem('adminAuth', JSON.stringify(data.admin))
          this.loadStyles()
          alert('Login successful!')
        } else {
          alert(data.error || 'Invalid credentials')
        }
      } catch (error) {
        console.error('Login error:', error)
        alert('Login failed. Please try again.')
      }
    },
    
    logout() {
      this.isAuthenticated = false
      this.loginForm = { email: '', password: '' }
      localStorage.removeItem('adminAuth')
    },
    
    async loadStyles() {
      try {
        const response = await fetch('http://localhost:5003/api/styles')
        const styles = await response.json()
        this.adminStyles = styles
      } catch (error) {
        console.error('Error loading styles:', error)
        alert('Failed to load styles')
      }
    },
    
    handleImageUpload(event) {
      this.uploadForm.imageFile = event.target.files[0]
    },
    
    async uploadStyle() {
      try {
        let imageURL = 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=500&fit=crop' // Default placeholder
        
        // Upload image to Cloudinary if file is selected
        if (this.uploadForm.imageFile) {
          console.log('📤 Uploading image...')
          const formData = new FormData()
          formData.append('image', this.uploadForm.imageFile)
          
          const uploadResponse = await fetch('http://localhost:5003/api/upload/image', {
            method: 'POST',
            body: formData
          })
          
          if (uploadResponse.ok) {
            const uploadResult = await uploadResponse.json()
            imageURL = uploadResult.imageURL
            console.log('✅ Image uploaded:', imageURL)
          } else {
            const uploadError = await uploadResponse.json()
            alert('Image upload failed: ' + uploadError.message)
            return
          }
        }
        
        // Create style with uploaded image URL
        const styleData = {
          title: this.uploadForm.title,
          category: this.uploadForm.category,
          description: this.uploadForm.description,
          tags: this.uploadForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
          featured: this.uploadForm.featured,
          imageURL: imageURL
        }
        
        const response = await fetch('http://localhost:5003/api/styles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(styleData)
        })
        
        if (response.ok) {
          const newStyle = await response.json()
          this.adminStyles.unshift(newStyle)
          this.showUploadModal = false
          this.uploadForm = {
            title: '',
            category: '',
            description: '',
            tags: '',
            featured: false,
            imageFile: null
          }
          alert('Style uploaded successfully!')
        } else {
          const error = await response.json()
          alert(error.error || 'Upload failed')
        }
      } catch (error) {
        console.error('Upload error:', error)
        alert('Upload failed. Please try again.')
      }
    },
    
    editStyle(style) {
      // Open edit modal with style data
      console.log('Edit style:', style)
    },
    
    async deleteStyle(styleId) {
      if (confirm('Are you sure you want to delete this style?')) {
        try {
          const response = await fetch(`http://localhost:5003/api/styles/${styleId}`, {
            method: 'DELETE'
          })
          
          if (response.ok) {
            this.adminStyles = this.adminStyles.filter(style => style.id !== styleId)
            alert('Style deleted successfully!')
          } else {
            const error = await response.json()
            alert(error.error || 'Delete failed')
          }
        } catch (error) {
          console.error('Delete error:', error)
          alert('Delete failed. Please try again.')
        }
      }
    },
    
    refreshStyles() {
      this.loadStyles()
    }
  }
}
</script>