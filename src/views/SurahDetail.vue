<template>
  <div class="container mx-auto p-6">
    <!-- Loading and Error Messages -->
    <div v-if="loading" class="text-center text-xl text-gray-600">
      <span>جاري التحميل...</span>
      <svg class="w-6 h-6 text-blue-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="12" cy="12" r="10" stroke-width="4" class="text-gray-300"></circle>
        <path d="M4 12a8 8 0 1 0 16 0 8 8 0 0 0-16 0z" stroke="currentColor" class="text-blue-500"></path>
      </svg>
    </div>
    <div v-if="error" class="text-center text-red-500 text-xl">
      خطأ: {{ error }}
    </div>

    <div v-if="surah" class="space-y-6">
      <!-- Surah Header -->
      <div class="text-center border-b pb-6">
        <h1 class="text-4xl font-bold mb-2 text-gray-800">{{ surah.title }}</h1>
        <p class="text-2xl text-gray-600 mb-2">{{ surah.titleAr }}</p>
        <p class="text-gray-500">{{ surah.place }} • {{ surah.type }} • {{ surah.count }} آية</p>
      </div>

      <!-- Language Selector -->
      <div class="bg-white border rounded-lg p-4 shadow-md">
        <h3 class="text-lg font-semibold mb-4 text-gray-700">اختيار لغة الترجمة</h3>
        <div class="flex gap-2 justify-center">
          <button
            v-for="lang in languages"
            :key="lang.code"
            @click="selectedLanguage = lang.code"
            :class="[
              'px-4 py-2 rounded text-sm',
              selectedLanguage === lang.code ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
            ]"
          >
            {{ lang.name }}
          </button>
        </div>
      </div>

      <!-- Audio Controls -->
      <div class="bg-gray-50 p-4 rounded-lg shadow-md">
        <h3 class="text-lg font-semibold mb-4 text-gray-700">مشغل الصوت</h3>
        <div class="space-y-4">
          <div class="flex gap-2">
            <button
              @click="playCurrentVerse"
              :disabled="!currentVerse || isAutoPlaying"
              class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
            >
              {{ isPlaying ? 'إيقاف' : 'تشغيل' }} الآية الحالية
            </button>
            <button 
              @click="stopAudio"
              class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              إيقاف
            </button>
          </div>
          
          <div v-if="currentVerse" class="text-sm text-gray-600">
            جاري التشغيل: الآية {{ currentVerse }}
          </div>
          
          <!-- Progress Bar -->
          <div v-if="duration > 0" class="space-y-2">
            <div class="flex justify-between text-sm text-gray-500">
              <span>{{ formatTime(currentTime) }}</span>
              <span>{{ formatTime(duration) }}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div 
                class="bg-green-600 h-2 rounded-full transition-all"
                :style="{ width: `${(currentTime / duration) * 100}%` }"
              ></div>
            </div>
          </div>

          <!-- Auto-play button -->
          <div class="flex justify-center gap-2 mt-4">
            <button 
              @click="startAutoPlay"
              :disabled="isAutoPlaying || loading"
              class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              {{ isAutoPlaying ? 'إيقاف التشغيل التلقائي' : 'تشغيل كل الآيات' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Verse Selection -->
      <div class="bg-white border rounded-lg p-4 shadow-md">
        <h3 class="text-lg font-semibold mb-4 text-gray-700">اختر الآية</h3>
        <div class="grid grid-cols-6 gap-2">
          <button
            v-for="verse in surah.count"
            :key="verse"
            @click="selectVerse(verse)"
            :class="[
              'px-3 py-2 rounded text-sm',
              currentVerse === verse ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
            ]"
          >
            {{ verse }}
          </button>
        </div>
      </div>

      <!-- Verses Display -->
      <div v-if="surahTextData" class="space-y-6">
        <div
          v-for="verseNumber in surah.count"
          :key="verseNumber"
          class="bg-white border rounded-lg p-6 shadow-md"
          :class="{ 'ring-2 ring-blue-500': currentVerse === verseNumber }"
        >
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-lg font-semibold text-gray-700">الآية {{ verseNumber }}</h3>
            <button
              @click="selectVerse(verseNumber)"
              class="px-3 py-1 bg-blue-100 text-blue-600 rounded text-sm hover:bg-blue-200"
            >
              تشغيل
            </button>
          </div>
          
          <!-- Arabic Text -->
          <div class="mb-4">
            <h4 class="font-medium text-gray-700 mb-2">النص العربي:</h4>
            <div class="text-right text-xl leading-relaxed" dir="rtl">
              {{ getVerseText(verseNumber) }}
            </div>
          </div>
          
          <!-- Translation -->
          <div v-if="translation" class="mb-4">
            <h4 class="font-medium text-gray-700 mb-2">الترجمة ({{ getLanguageName(selectedLanguage) }}):</h4>
            <div class="text-gray-800 leading-relaxed">
              {{ getTranslation(verseNumber) }}
            </div>
          </div>
          
          <!-- Tajweed Rules -->
          <div v-if="tajweedData" class="mb-4">
            <h4 class="font-medium text-gray-700 mb-2">أحكام التجويد:</h4>
            <div class="space-y-2">
              <div
                v-for="rule in getTajweedRules(verseNumber)"
                :key="`${verseNumber}-${rule.start}-${rule.end}`"
                class="text-sm p-2 bg-yellow-50 border border-yellow-200 rounded"
              >
                <span class="font-medium">{{ rule.rule }}</span>
                <span class="text-gray-600"> (من {{ rule.start }} إلى {{ rule.end }})</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Audio Files Info -->
      <div class="bg-white border rounded-lg p-4 shadow-md">
        <h3 class="text-lg font-semibold mb-4 text-gray-700">ملفات الصوت المتاحة</h3>
        <div v-if="audioIndex" class="space-y-2">
          <p class="text-sm text-gray-600">إجمالي الآيات مع الصوت: {{ audioIndex.count }}</p>
          <div class="grid grid-cols-4 gap-2">
            <div 
              v-for="(verse, key) in audioIndex.verse" 
              :key="key"
              class="text-xs p-2 bg-gray-50 rounded"
            >
              <div class="font-medium">{{ key.replace('verse_', '') }}</div>
              <div class="text-gray-500">{{ verse.unit }}</div>
            </div>
          </div>
        </div>
        <div v-else class="text-gray-500">جاري تحميل معلومات الصوت...</div>
      </div>

      <!-- Surah Details -->
      <div class="bg-white border rounded-lg p-4 shadow-md">
        <h3 class="text-lg font-semibold mb-4 text-gray-700">تفاصيل السورة</h3>
        <div class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span class="font-medium">الصفحات:</span> {{ surah.pages }}
          </div>
          <div>
            <span class="font-medium">جزء:</span> 
            <span v-for="(juz, index) in surah.juz" :key="juz.index">
              {{ juz.index }}{{ index < surah.juz.length - 1 ? ', ' : '' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import surahData from '../assets/surah.json';
import { useAudio } from '../composables/useAudio';
import { useFileLoader } from '../composables/useFileLoader';

export default {
  name: 'SurahDetail',
  setup() {
    const route = useRoute();
    const surah = ref(null);
    const surahTextData = ref(null);
    const translation = ref(null);
    const tajweedData = ref(null);
    const audioIndex = ref(null);
    const currentVerse = ref(null);
    const selectedLanguage = ref('en');
    const loading = ref(true);
    const error = ref(null);
    const isAutoPlaying = ref(false);

    const languages = [
      { code: 'en', name: 'English' },
      { code: 'ar', name: 'Arabic' },
      { code: 'id', name: 'Indonesian' }
    ];

    const {
      isPlaying,
      currentTime,
      duration,
      playAudio,
      stopAudio,
    } = useAudio();

    const {
      loadSurahText,
      loadTranslation,
      loadTajweed,
      loadAudioIndex,
    } = useFileLoader();

    const surahNumber = computed(() => route.params.id);

    onMounted(async () => {
      try {
        loading.value = true;
        error.value = null;

        // Find the surah data by index string
        const surahIndex = surahData.findIndex(surah => surah.index === surahNumber.value);
        surah.value = surahData[surahIndex];
        
        if (!surah.value) {
          throw new Error(`Surah not found for index: ${surahNumber.value}`);
        }

        // Load all data in parallel
        const [surahText, translationData, tajweedDataResult, audioIndexResult] = await Promise.all([
          loadSurahText(surahNumber.value),
          loadTranslation(selectedLanguage.value, surahNumber.value),
          loadTajweed(surahNumber.value),
          loadAudioIndex(surahNumber.value)
        ]);

        surahTextData.value = surahText;
        translation.value = translationData;
        tajweedData.value = tajweedDataResult;
        audioIndex.value = audioIndexResult;
        
        // Set first verse as default
        currentVerse.value = 1;
        
      } catch (err) {
        error.value = err.message;
      } finally {
        loading.value = false;
      }
    });

    const selectVerse = (verse) => {
      currentVerse.value = verse;
    };

    const playCurrentVerse = () => {
      if (!currentVerse.value) return;
      
      const audioPath = `/src/assets/audio/${surahNumber.value.toString().padStart(3, '0')}/${currentVerse.value.toString().padStart(3, '0')}.mp3`;
      playAudio(audioPath);
    };

    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getVerseText = (verseNumber) => {
      if (!surahTextData.value || !surahTextData.value.verse) return '';
      return surahTextData.value.verse[`verse_${verseNumber}`] || '';
    };

    const getTranslation = (verseNumber) => {
      if (!translation.value || !translation.value.verse) return '';
      return translation.value.verse[`verse_${verseNumber}`] || '';
    };

    const getTajweedRules = (verseNumber) => {
      if (!tajweedData.value || !tajweedData.value.verse) return [];
      return tajweedData.value.verse[`verse_${verseNumber}`] || [];
    };

    const startAutoPlay = async () => {
      isAutoPlaying.value = true;
      for (let i = 1; i <= surah.value.count; i++) {
        currentVerse.value = i;
        playCurrentVerse();
        await new Promise(resolve => setTimeout(resolve, 3000));  // Wait for 3 seconds before next verse
      }
      isAutoPlaying.value = false;
    };

    const stopAutoPlay = () => {
      stopAudio();
      isAutoPlaying.value = false;
    };

    const getLanguageName = (code) => {
      const lang = languages.find(l => l.code === code);
      return lang ? lang.name : code;
    };

    return {
      surah,
      surahTextData,
      translation,
      tajweedData,
      audioIndex,
      currentVerse,
      selectedLanguage,
      languages,
      loading,
      error,
      isPlaying,
      currentTime,
      duration,
      selectVerse,
      playCurrentVerse,
      stopAudio,
      formatTime,
      getVerseText,
      getTranslation,
      getTajweedRules,
      startAutoPlay,
      stopAutoPlay,
      getLanguageName,
      isAutoPlaying
    };
  },
};
</script>


<style scoped>
.bg-green-600 {
  background-color: #38a169;
}

.bg-blue-600 {
  background-color: #3182ce;
}

.bg-red-600 {
  background-color: #e53e3e;
}

.bg-yellow-50 {
  background-color: #faf089;
}

.bg-gray-100 {
  background-color: #f7fafc;
}

.text-gray-600 {
  color: #4a5568;
}

.text-gray-700 {
  color: #2d3748;
}

.text-gray-800 {
  color: #1a202c;
}

.text-red-500 {
  color: #f56565;
}

.text-blue-600 {
  color: #3182ce;
}

.text-green-600 {
  color: #38a169;
}
</style>
