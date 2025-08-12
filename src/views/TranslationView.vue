<template>
  <div class="container mx-auto p-6">
    <h1 class="text-4xl font-bold text-center mb-6">Quran Translations</h1>
    
    <!-- Language and Surah Selector -->
    <div class="bg-white border rounded-lg p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Language Selector -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Language</label>
          <select 
            v-model="selectedLanguage" 
            class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="en">English</option>
            <option value="ar">Arabic</option>
            <option value="id">Indonesian</option>
          </select>
        </div>
        
        <!-- Surah Selector -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Surah</label>
          <select 
            v-model="selectedSurah" 
            class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option v-for="surah in surahs" :key="surah.index" :value="surah.index">
              {{ surah.index }}. {{ surah.title }} ({{ surah.titleAr }})
            </option>
          </select>
        </div>
        
        <!-- Verse Selector -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Verse</label>
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
    
    <div v-if="currentSurah && translationData" class="space-y-6">
      <!-- Surah Header -->
      <div class="text-center border-b pb-6">
        <h2 class="text-3xl font-bold mb-2">{{ currentSurah.title }}</h2>
        <p class="text-xl text-gray-600 mb-2">{{ currentSurah.titleAr }}</p>
        <p class="text-gray-500">{{ currentSurah.place }} • {{ currentSurah.type }} • {{ currentSurah.count }} verses</p>
      </div>

      <!-- Translation Display -->
      <div class="bg-white border rounded-lg p-6">
        <h3 class="text-2xl font-semibold mb-4">
          Translation in {{ getLanguageName(selectedLanguage) }}
        </h3>
        
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
            
            <!-- Arabic Text -->
            <div class="mb-4">
              <h5 class="font-medium text-gray-700 mb-2">Arabic Text:</h5>
              <div class="text-right text-xl leading-relaxed bg-gray-50 p-4 rounded" dir="rtl">
                {{ getVerseText(verseNumber) }}
              </div>
            </div>
            
            <!-- Translation -->
            <div>
              <h5 class="font-medium text-gray-700 mb-2">Translation:</h5>
              <div class="text-gray-800 leading-relaxed bg-white p-4 border rounded">
                {{ getTranslation(verseNumber) }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Language Comparison -->
      <div class="bg-white border rounded-lg p-6">
        <h3 class="text-2xl font-semibold mb-4">Compare Translations</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            v-for="lang in languages"
            :key="lang.code"
            class="border border-gray-200 rounded-lg p-4"
          >
            <h4 class="font-semibold mb-2">{{ lang.name }}</h4>
            <div class="text-sm text-gray-600">
              {{ getTranslationInLanguage(selectedVerse, lang.code) }}
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
  name: 'TranslationView',
  setup() {
    const surahs = ref([]);
    const selectedLanguage = ref('ar');
    const selectedSurah = ref('001');
    const selectedVerse = ref(1);
    const currentSurah = ref(null);
    const translationData = ref(null);
    const surahTextData = ref(null);
    const loading = ref(true);
    const error = ref(null);

    const {
      loadSurahText,
      loadTranslation,
    } = useFileLoader();

    const languages = [
      { code: 'en', name: 'English' },
      { code: 'ar', name: 'Arabic' },
      { code: 'id', name: 'Indonesian' }
    ];

    const totalVerses = computed(() => {
      if (!currentSurah.value) return [];
      return Array.from({ length: currentSurah.value.count }, (_, i) => i + 1);
    });

    const loadSurahData = async () => {
      try {
        loading.value = true;
        
        // Get current surah info by index string
        const surahIndex = surahData.findIndex(surah => surah.index === selectedSurah.value);
        currentSurah.value = surahData[surahIndex];
        
        if (!currentSurah.value) {
          throw new Error('Surah not found');
        }

        // Load data in parallel
        const [surahText, translation] = await Promise.all([
          loadSurahText(selectedSurah.value),
          loadTranslation(selectedLanguage.value, selectedSurah.value)
        ]);

        // If files couldn't be loaded, create fallback data
        if (!surahText) {
          console.warn('Surah text not found, creating fallback data');
          surahTextData.value = createFallbackSurahText(currentSurah.value);
        } else {
          surahTextData.value = surahText;
        }

        if (!translation) {
          console.warn('Translation not found, creating fallback data');
          translationData.value = createFallbackTranslationData(currentSurah.value, selectedLanguage.value);
        } else {
          translationData.value = translation;
        }

        // Reset selected verse if it's out of range
        if (selectedVerse.value > currentSurah.value.count) {
          selectedVerse.value = 1;
        }
        
      } catch (err) {
        error.value = err.message;
        console.error('Error loading translation data:', err);
      } finally {
        loading.value = false;
      }
    };

    const getLanguageName = (code) => {
      const lang = languages.find(l => l.code === code);
      return lang ? lang.name : code;
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

    // Create fallback translation data
    const createFallbackTranslationData = (surah, language) => {
      const verses = {};
      const languageNames = {
        en: 'English',
        ar: 'Arabic',
        id: 'Indonesian'
      };
      
      for (let i = 1; i <= surah.count; i++) {
        verses[`verse_${i}`] = `[${languageNames[language] || language}] Translation of verse ${i} from ${surah.title}`;
      }
      return {
        index: surah.index,
        title: surah.title,
        language: language,
        verse: verses
      };
    };

    const getVerseText = (verseNumber) => {
      if (!surahTextData.value || !surahTextData.value.verse) return '';
      return surahTextData.value.verse[`verse_${verseNumber}`] || '';
    };

    const getTranslation = (verseNumber) => {
      if (!translationData.value || !translationData.value.verse) return '';
      return translationData.value.verse[`verse_${verseNumber}`] || '';
    };

    const getTranslationInLanguage = async (verseNumber, langCode) => {
      try {
        // Use the useFileLoader for consistent file loading
        const translationData = await loadTranslation(langCode, selectedSurah.value);
        if (translationData && translationData.verse) {
          return translationData.verse[`verse_${verseNumber}`] || '';
        }
      } catch (error) {
        console.error('Error loading translation:', error);
      }
      return '';
    };

    onMounted(async () => {
      try {
        surahs.value = surahData;
        await loadSurahData();
      } catch (err) {
        error.value = err.message;
      }
    });

    // Watch for changes in selected surah or language
    watch([selectedSurah, selectedLanguage], () => {
      loadSurahData();
    });

    return {
      surahs,
      selectedLanguage,
      selectedSurah,
      selectedVerse,
      currentSurah,
      translationData,
      totalVerses,
      languages,
      loading,
      error,
      getLanguageName,
      getVerseText,
      getTranslation,
      getTranslationInLanguage,
    };
  },
};
</script>
