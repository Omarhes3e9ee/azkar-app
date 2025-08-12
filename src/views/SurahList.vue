<template>
  <div class="container mx-auto p-6">
    <!-- Page Title -->
    <h1 class="text-4xl font-bold text-center mb-8">قائمة السور</h1>

    <!-- Loading and Error Messages -->
    <div v-if="loading" class="text-center text-xl text-gray-500">جاري التحميل...</div>
    <div v-if="error" class="text-center text-red-500 text-xl">خطأ: {{ error }}</div>

    <!-- Surah List -->
    <div v-if="surahs" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div
        v-for="surah in surahs"
        :key="surah.index"
        class="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
        @click="goToSurahDetail(surah.index)"
      >
        <!-- Surah Content -->
        <div class="flex flex-col md:flex-row justify-between items-start">
          <div class="flex-1 mb-4 md:mb-0">
            <!-- Surah Title and Arabic Name -->
            <p class="text-xl font-semibold text-gray-800">{{ surah.title }}</p>
            <p class="text-lg text-gray-600">{{ surah.titleAr }}</p>

            <!-- Additional Information -->
            <p class="text-sm text-gray-500">{{ surah.place }} • {{ surah.type }} • {{ surah.count }} آية</p>
          </div>

          <!-- Surah Index and Page -->
          <div class="text-right md:text-left">
            <span class="text-2xl font-bold text-green-600">{{ surah.index }}</span>
            <p class="text-xs text-gray-400">الصفحة {{ surah.pages }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import surahData from '../assets/surah.json';

export default {
  name: 'SurahList',
  setup() {
    const surahs = ref(null);
    const loading = ref(true);
    const error = ref(null);
    const router = useRouter();

    onMounted(async () => {
      try {
        // Use the imported JSON data directly
        surahs.value = surahData;
      } catch (err) {
        error.value = err.message;
      } finally {
        loading.value = false;
      }
    });

    const goToSurahDetail = (surahNumber) => {
      router.push(`/surah/${surahNumber}`);
    };

    return {
      surahs,
      loading,
      error,
      goToSurahDetail,
    };
  },
};
</script>

<style scoped>
/* Additional custom styling */
.container {
  max-width: 1280px; /* Control container width */
}

.bg-white {
  background-color: #ffffff;
}

.text-gray-800 {
  color: #2d3748;
}

.text-gray-500 {
  color: #6b7280;
}

.text-gray-600 {
  color: #4a5568;
}

.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.hover\:shadow-lg:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

@media (min-width: 640px) {
  /* Adjust layout for medium screens (sm) */
  .container {
    padding: 1.5rem;
  }
}

@media (min-width: 1024px) {
  /* Adjust layout for large screens (lg) */
  .container {
    padding: 2rem;
  }
}
</style>
