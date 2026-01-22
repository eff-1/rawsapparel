import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'

// Import pages
import Home from './pages/Home.vue'
import Search from './pages/Search.vue'
import Collections from './pages/Collections.vue'
import About from './pages/About.vue'
import Admin from './pages/Admin.vue'
import PinterestTest from './pages/PinterestTest.vue'
import ImageSearchTest from './pages/ImageSearchTest.vue'
import GoogleSearchDemo from './pages/GoogleSearchDemo.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/search', component: Search },
  { path: '/collections', component: Collections },
  { path: '/about', component: About },
  { path: '/admin', component: Admin },
  { path: '/pinterest-test', component: PinterestTest },
  { path: '/image-search-test', component: ImageSearchTest },
  { path: '/google-demo', component: GoogleSearchDemo },
  { path: '/contact', redirect: '/about' },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

createApp(App).use(router).mount('#app')