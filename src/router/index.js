// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// Import your views
import HomeView from '../views/HomeView.vue'
import AzkarView from '../views/AzkarView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/azkar', name: 'Azkar', component: AzkarView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
