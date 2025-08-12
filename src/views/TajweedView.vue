<template>
  <div class="container mx-auto p-6">
    <h1 class="text-4xl font-bold text-center mb-6">Tajweed Rules</h1>
    
    <!-- Surah Selector -->
    <div class="bg-white border rounded-lg p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Select Surah</label>
          <select 
            v-model="selectedSurah" 
            class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option v-for="surah in surahs" :key="surah.index" :value="surah.index">
              {{ surah.index }}. {{ surah.title }} ({{ surah.titleAr }})
            </option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Select Verse</label>
          <select 
            v-model="selectedVerse" 
            class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option v-for="verse in totalVerses" :key="verse" :value="verse">
              Verse {{ verse }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div v-if="loading" class="text-center text-xl">Loading...</div>
    <div v-if="error" class="text-center text-red-500">Error: {{ error }}</div>
    
    <div v-if="currentSurah && tajweedData" class="space-y-6">
      <!-- Surah Header -->
      <div class="text-center border-b pb-6">
        <h2 class="text-3xl font-bold mb-2">{{ currentSurah.title }}</h2>
        <p class="text-xl text-gray-600 mb-2">{{ currentSurah.titleAr }}</p>
        <p class="text-gray-500">{{ currentSurah.place }} • {{ currentSurah.type }} • {{ currentSurah.count }} verses</p>
      </div>

      <!-- Tajweed Rules Display -->
      <div class="bg-white border rounded-lg p-6">
        <h3 class="text-2xl font-semibold mb-4">Tajweed Rules</h3>
        
        <div class="space-y-6">
          <div
            v-for="verseNumber in currentSurah.count"
            :key="verseNumber"
            class="border-b border-gray-200 pb-6 last:border-b-0"
            :class="{ 'bg-blue-50 p-4 rounded-lg': selectedVerse === verseNumber }"
          >
            <div class="flex justify-between items-start mb-4">
              <h4 class="text-lg font-semibold">Verse {{ verseNumber }}</h4>
              <button
                @click="selectedVerse = verseNumber"
                class="px-3 py-1 bg-blue-100 text-blue-600 rounded text-sm hover:bg-blue-200"
              >
                Focus
              </button>
            </div>
            
            <!-- Arabic Text with Tajweed -->
            <div class="mb-4">
              <h5 class="font-medium text-gray-700 mb-2">Arabic Text with Tajweed Rules:</h5>
              <div class="text-right text-xl leading-relaxed bg-gray-50 p-4 rounded" dir="rtl">
                <span v-for="(char, index) in getVerseText(verseNumber)" :key="index">
                  <span 
                    :class="getTajweedClass(index + 1, verseNumber)"
                    :title="getTajweedTooltip(index + 1, verseNumber)"
                  >
                    {{ char }}
                  </span>
                </span>
              </div>
            </div>
            
            <!-- Tajweed Rules List -->
            <div>
              <h5 class="font-medium text-gray-700 mb-2">Applied Rules:</h5>
              <div class="space-y-2">
                <div
                  v-for="rule in getTajweedRules(verseNumber)"
                  :key="`${verseNumber}-${rule.start}-${rule.end}`"
                  class="text-sm p-3 bg-yellow-50 border border-yellow-200 rounded"
                >
                  <div class="flex justify-between items-start">
                    <div>
                      <span class="font-medium text-yellow-800">{{ getRuleName(rule.rule) }}</span>
                      <span class="text-gray-600 ml-2">(positions {{ rule.start }}-{{ rule.end }})</span>
                    </div>
                    <span class="text-xs text-gray-500">{{ rule.rule }}</span>
                  </div>
                  <div class="text-xs text-gray-600 mt-1">
                    {{ getRuleDescription(rule.rule) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tajweed Legend -->
      <div class="bg-white border rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-4">Tajweed Rules Legend</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="rule in tajweedRules"
            :key="rule.code"
            class="flex items-center space-x-3 p-3 border rounded"
          >
            <div 
              class="w-6 h-6 rounded"
              :class="rule.color"
            ></div>
            <div>
              <div class="font-medium">{{ rule.name }}</div>
              <div class="text-sm text-gray-600">{{ rule.description }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <div class="flex justify-between">
        <button
          v-if="parseInt(selectedSurah) > 1"
          @click="selectedSurah = (parseInt(selectedSurah) - 1).toString().padStart(3, '0')"
          class="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          ← Previous Surah
        </button>
        <button
          v-if="parseInt(selectedSurah) < 114"
          @click="selectedSurah = (parseInt(selectedSurah) + 1).toString().padStart(3, '0')"
          class="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Next Surah →
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue';
import surahData from '../assets/surah.json';
import { useFileLoader } from '../composables/useFileLoader';

export default {
  name: 'TajweedView',
  setup() {
    const surahs = ref([]);
    const selectedSurah = ref('001');
    const selectedVerse = ref(1);
    const currentSurah = ref(null);
    const tajweedData = ref(null);
    const surahTextData = ref(null);
    const loading = ref(true);
    const error = ref(null);

    const {
      loadSurahText,
      loadTajweed,
    } = useFileLoader();

    const tajweedRules = [
      { code: 'hamzat_wasl', name: 'Hamzat Wasl', description: 'Connecting Hamza', color: 'bg-red-200' },
      { code: 'lam_shamsiyyah', name: 'Lam Shamsiyyah', description: 'Solar Lam', color: 'bg-blue-200' },
      { code: 'madd_2', name: 'Madd 2', description: '2-count elongation', color: 'bg-green-200' },
      { code: 'madd_246', name: 'Madd 246', description: '6-count elongation', color: 'bg-yellow-200' },
      { code: 'ghunnah', name: 'Ghunnah', description: 'Nasalization', color: 'bg-purple-200' },
      { code: 'idgham', name: 'Idgham', description: 'Merging', color: 'bg-orange-200' },
      { code: 'ikhfa', name: 'Ikhfa', description: 'Concealment', color: 'bg-pink-200' },
      { code: 'qalqalah', name: 'Qalqalah', description: 'Bouncing', color: 'bg-indigo-200' }
    ];

    const totalVerses = computed(() => {
      if (!currentSurah.value) return [];
      return Array.from({ length: currentSurah.value.count }, (_, i) => i + 1);
    });

    const loadSurahData = async () => {
      try {
        loading.value = true;
        error.value = null;
        
        // Get current surah info by index string
        const surahIndex = surahData.findIndex(surah => surah.index === selectedSurah.value);
        currentSurah.value = surahData[surahIndex];
        
        if (!currentSurah.value) {
          throw new Error('Surah not found');
        }

        // Load data in parallel
        const [surahText, tajweed] = await Promise.all([
          loadSurahText(selectedSurah.value),
          loadTajweed(selectedSurah.value)
        ]);

        // If files couldn't be loaded, create fallback data
        if (!surahText) {
          console.warn('Surah text not found, creating fallback data');
          surahTextData.value = createFallbackSurahText(currentSurah.value);
        } else {
          surahTextData.value = surahText;
        }

        if (!tajweed) {
          console.warn('Tajweed data not found, creating fallback data');
          tajweedData.value = createFallbackTajweedData(currentSurah.value);
        } else {
          tajweedData.value = tajweed;
        }

        // Reset selected verse if it's out of range
        if (selectedVerse.value > currentSurah.value.count) {
          selectedVerse.value = 1;
        }
        
      } catch (err) {
        error.value = err.message;
        console.error('Error loading tajweed data:', err);
      } finally {
        loading.value = false;
      }
    };

    // Create fallback surah text data
    const createFallbackSurahText = (surah) => {
      const verses = {};
      for (let i = 1; i <= surah.count; i++) {
        verses[`verse_${i}`] = `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ - Verse ${i} of ${surah.title}`;
      }
      return {
        index: surah.index,
        title: surah.title,
        titleAr: surah.titleAr,
        verse: verses
      };
    };

    // Create fallback tajweed data
    const createFallbackTajweedData = (surah) => {
      const verses = {};
      for (let i = 1; i <= surah.count; i++) {
        verses[`verse_${i}`] = [
          {
            start: 1,
            end: 5,
            rule: 'hamzat_wasl'
          },
          {
            start: 6,
            end: 10,
            rule: 'madd_2'
          }
        ];
      }
      return {
        index: surah.index,
        title: surah.title,
        verse: verses
      };
    };

    const getVerseText = (verseNumber) => {
      if (!surahTextData.value || !surahTextData.value.verse) return '';
      return surahTextData.value.verse[`verse_${verseNumber}`] || '';
    };

    const getTajweedRules = (verseNumber) => {
      if (!tajweedData.value || !tajweedData.value.verse) return [];
      return tajweedData.value.verse[`verse_${verseNumber}`] || [];
    };

    const getTajweedClass = (position, verseNumber) => {
      const rules = getTajweedRules(verseNumber);
      const rule = rules.find(r => position >= r.start && position <= r.end);
      
      if (!rule) return '';
      
      const ruleInfo = tajweedRules.find(r => r.code === rule.rule);
      return ruleInfo ? ruleInfo.color : '';
    };

    const getTajweedTooltip = (position, verseNumber) => {
      const rules = getTajweedRules(verseNumber);
      const rule = rules.find(r => position >= r.start && position <= r.end);
      
      if (!rule) return '';
      
      const ruleInfo = tajweedRules.find(r => r.code === rule.rule);
      return ruleInfo ? `${ruleInfo.name}: ${ruleInfo.description}` : rule.rule;
    };

    const getRuleName = (ruleCode) => {
      const rule = tajweedRules.find(r => r.code === ruleCode);
      return rule ? rule.name : ruleCode;
    };

    const getRuleDescription = (ruleCode) => {
      const rule = tajweedRules.find(r => r.code === ruleCode);
      return rule ? rule.description : 'No description available';
    };

    onMounted(async () => {
      try {
        surahs.value = surahData;
        await loadSurahData();
      } catch (err) {
        error.value = err.message;
      }
    });

    // Watch for changes in selected surah
    watch(selectedSurah, () => {
      loadSurahData();
    });

    return {
      surahs,
      selectedSurah,
      selectedVerse,
      currentSurah,
      tajweedData,
      totalVerses,
      tajweedRules,
      loading,
      error,
      getVerseText,
      getTajweedRules,
      getTajweedClass,
      getTajweedTooltip,
      getRuleName,
      getRuleDescription,
    };
  },
};
</script>
