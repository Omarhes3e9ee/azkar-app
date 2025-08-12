<template>
  <div class="container mx-auto p-6">
    <h1 class="text-4xl font-bold text-center mb-6">List of Surahs</h1>
    <div v-if="loading" class="text-center text-xl">Loading...</div>
    <div v-if="error" class="text-center text-red-500">Error: {{ error }}</div>
    <ul v-if="surahs" class="space-y-4">
      <li
        v-for="surah in surahs"
        :key="surah.index"
        class="p-4 border border-gray-200 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
        @click="goToSurahDetail(surah.index)"
      >
        <div class="flex justify-between items-center">
          <div>
            <p class="text-xl font-semibold">{{ surah.title }}</p>
            <p class="text-lg text-gray-600">{{ surah.titleAr }}</p>
            <p class="text-sm text-gray-500">{{ surah.place }} • {{ surah.type }} • {{ surah.count }} verses</p>
          </div>
          <div class="text-right">
            <span class="text-2xl font-bold text-green-600">{{ surah.index }}</span>
            <p class="text-xs text-gray-400">Page {{ surah.pages }}</p>
          </div>
        </div>
      </li>
    </ul>
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
