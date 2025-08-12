<template>
  <div class="container mx-auto p-6">
    <div v-if="loading" class="text-center text-xl">Loading...</div>
    <div v-if="error" class="text-center text-red-500">Error: {{ error }}</div>
    
    <div v-if="juz" class="space-y-6">
      <!-- Juz Header -->
      <div class="text-center border-b pb-6">
        <h1 class="text-4xl font-bold mb-2">Juz {{ juz.index }}</h1>
        <p class="text-xl text-gray-600">Part {{ juz.index }} of 30</p>
      </div>

      <!-- Juz Range Info -->
      <div class="bg-white border rounded-lg p-6">
        <h2 class="text-2xl font-semibold mb-4">Juz Range</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-green-50 p-4 rounded-lg">
            <h3 class="font-semibold text-green-800 mb-2">Starts with:</h3>
            <div class="text-lg font-medium">{{ juz.start.name }}</div>
            <div class="text-sm text-gray-600">Surah {{ juz.start.index }}, Verse {{ juz.start.verse.replace('verse_', '') }}</div>
          </div>
          
          <div class="bg-red-50 p-4 rounded-lg">
            <h3 class="font-semibold text-red-800 mb-2">Ends with:</h3>
            <div class="text-lg font-medium">{{ juz.end.name }}</div>
            <div class="text-sm text-gray-600">Surah {{ juz.end.index }}, Verse {{ juz.end.verse.replace('verse_', '') }}</div>
          </div>
        </div>
      </div>

      <!-- Surahs in this Juz -->
      <div class="bg-white border rounded-lg p-6">
        <h2 class="text-2xl font-semibold mb-4">Surahs in Juz {{ juz.index }}</h2>
        <div class="space-y-4">
          <div
            v-for="surah in surahsInJuz"
            :key="surah.index"
            class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
            @click="goToSurah(surah.index)"
          >
            <div class="flex justify-between items-center">
              <div>
                <h3 class="text-lg font-semibold">{{ surah.title }}</h3>
                <p class="text-gray-600">{{ surah.titleAr }}</p>
                <p class="text-sm text-gray-500">{{ surah.place }} • {{ surah.type }} • {{ surah.count }} verses</p>
              </div>
              <div class="text-right">
                <span class="text-2xl font-bold text-green-600">{{ surah.index }}</span>
                <p class="text-xs text-gray-400">Page {{ surah.pages }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <div class="flex justify-between">
        <button
          v-if="parseInt(juz.index) > 1"
          @click="goToJuz(parseInt(juz.index) - 1)"
          class="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          ← Previous Juz
        </button>
        <button
          v-if="parseInt(juz.index) < 30"
          @click="goToJuz(parseInt(juz.index) + 1)"
          class="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Next Juz →
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import juzData from '../assets/juz.json';
import surahData from '../assets/surah.json';

export default {
  name: 'JuzDetailView',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const juz = ref(null);
    const loading = ref(true);
    const error = ref(null);

    const juzNumber = computed(() => route.params.id);

    const surahsInJuz = computed(() => {
      if (!juz.value) return [];
      
      const startSurah = juz.value.start.index;
      const endSurah = juz.value.end.index;
      const surahs = [];
      
      // Find surahs by their index strings
      for (let i = parseInt(startSurah); i <= parseInt(endSurah); i++) {
        const surahIndex = surahData.findIndex(surah => surah.index === i.toString().padStart(3, '0'));
        if (surahIndex !== -1) {
          surahs.push(surahData[surahIndex]);
        }
      }
      
      return surahs;
    });

    onMounted(async () => {
      try {
        const juzIndex = parseInt(juzNumber.value) - 1;
        juz.value = juzData[juzIndex];
        
        if (!juz.value) {
          throw new Error('Juz not found');
        }
      } catch (err) {
        error.value = err.message;
      } finally {
        loading.value = false;
      }
    });

    const goToSurah = (surahNumber) => {
      router.push(`/surah/${surahNumber}`);
    };

    const goToJuz = (juzNumber) => {
      router.push(`/juz/${juzNumber}`);
    };

    return {
      juz,
      surahsInJuz,
      loading,
      error,
      goToSurah,
      goToJuz,
    };
  },
};
</script>
