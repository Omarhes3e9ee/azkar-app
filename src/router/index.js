// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// Import your views
import HomeView from '../views/HomeView.vue'
import AzkarView from '../views/AzkarView.vue'
import SurahList from '../views/SurahList.vue';
import SurahDetail from '../views/SurahDetail.vue';
import JuzList from '../views/JuzListView.vue';
import JuzDetail from '../views/JuzDetailView.vue';
import TranslationView from '../views/TranslationView.vue';
import TajweedView from '../views/TajweedView.vue';
import TestView from '../views/TestView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/azkar',
    name: 'Azkar',
    component: AzkarView
  },
  {
    path: '/surah',
    name: 'SurahList',
    component: SurahList
  },
  {
    path: '/surah/:id',
    name: 'SurahDetail',
    component: SurahDetail
  },
  {
    path: '/juz',
    name: 'JuzList',
    component: JuzList
  },
  {
    path: '/juz/:id',
    name: 'JuzDetail',
    component: JuzDetail
  },
  {
    path: '/translation',
    name: 'Translation',
    component: TranslationView
  },
  {
    path: '/tajweed',
    name: 'Tajweed',
    component: TajweedView
  },
  {
    path: '/test',
    name: 'Test',
    component: TestView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || '/'),
  routes
})

export default router
