<template>
  <div class="home-page container mx-auto min-h-screen flex flex-col items-center justify-center px-6 text-center">
    <h1 class="home-title">أهلاً بك في تطبيق أذكار الصباح والمساء</h1>
    <p class="home-subtitle mt-4">
      تذكر أذكارك بسهولة ويسر، مع عدّ التكرارات والاحتفاظ بحالتك تلقائيًا حتى بعد إعادة الدخول.
    </p>
    <button @click="enterApp" class="enter-btn mt-8">
      ابدأ الآن
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function enterApp() {
  router.push({ name: 'Azkar' })
}
</script>

<style scoped>
.home-page {
  font-family: 'Cairo', sans-serif;
  background: linear-gradient(to bottom, #f0fff4, #ffffff);
}

.home-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2f855a;
}

.home-subtitle {
  font-size: 1.25rem;
  color: #4a5568;
}

.enter-btn {
  background-color: #38a169;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.125rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.enter-btn:hover {
  background-color: #2f855a;
}
</style>
