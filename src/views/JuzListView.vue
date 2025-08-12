<template>
  <div class="mx-auto p-6">
    <h1 class="text-4xl font-bold text-center mb-6">الأجزاء الـ 30 من القرآن</h1>
    <div v-if="loading" class="text-center text-xl">جاري التحميل...</div>
    <div v-if="error" class="text-center text-red-500">خطأ: {{ error }}</div>
    
    <div v-if="juzList" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="juz in juzList"
        :key="juz.index"
        class="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
        @click="goToJuzDetail(juz.index)"
      >
        <div class="text-center mb-4">
          <div class="text-3xl font-bold text-green-600 mb-2">الجزء {{ juz.index }}</div>
          <div class="text-sm text-gray-500">الجزء {{ juz.index }} من 30</div>
        </div>
        
        <div class="space-y-3">
          <div class="border-t pt-3">
            <h3 class="font-semibold text-gray-700 mb-2">يبدأ بـ:</h3>
            <div class="text-sm">
              <span class="font-medium">{{ juz.start.name }}</span>
              <span class="text-gray-500"> (سورة {{ juz.start.index }})</span>
              <div class="text-xs text-gray-400">الآية {{ juz.start.verse.replace('verse_', '') }}</div>
            </div>
          </div>
          
          <div class="border-t pt-3">
            <h3 class="font-semibold text-gray-700 mb-2">ينتهي بـ:</h3>
            <div class="text-sm">
              <span class="font-medium">{{ juz.end.name }}</span>
              <span class="text-gray-500"> (سورة {{ juz.end.index }})</span>
              <div class="text-xs text-gray-400">الآية {{ juz.end.verse.replace('verse_', '') }}</div>
            </div>
          </div>
        </div>
        
        <div class="mt-4 pt-3 border-t">
          <div class="flex justify-between text-xs text-gray-500">
            <span>سورة {{ juz.start.index }}</span>
            <span>سورة {{ juz.end.index }}</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-1 mt-1">
            <div 
              class="bg-green-600 h-1 rounded-full"
              :style="{ width: `${((parseInt(juz.end.index) - parseInt(juz.start.index) + 1) / 114) * 100}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import juzData from '../assets/juz.json';

export default {
  name: 'JuzListView',
  setup() {
    const juzList = ref(null);
    const loading = ref(true);
    const error = ref(null);
    const router = useRouter();

    onMounted(async () => {
      try {
        juzList.value = juzData;
      } catch (err) {
        error.value = err.message;
      } finally {
        loading.value = false;
      }
    });

    const goToJuzDetail = (juzNumber) => {
      router.push(`/juz/${juzNumber}`);
    };

    return {
      juzList,
      loading,
      error,
      goToJuzDetail,
    };
  },
};
</script>

<style scoped>
.container {
  font-family: 'Cairo', sans-serif;
}

h1 {
  color: #2b6cb0;
  font-size: 2.5rem;
}

.text-center {
  text-align: center;
}

.bg-gray-200 {
  background-color: #edf2f7;
}

.bg-green-600 {
  background-color: #48bb78;
}

.border-t {
  border-top: 1px solid #e2e8f0;
}

.pt-3 {
  padding-top: 0.75rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.text-sm {
  font-size: 0.875rem;
}

.text-xs {
  font-size: 0.75rem;
}

.text-gray-500 {
  color: #a0aec0;
}

.text-gray-700 {
  color: #4a5568;
}

.text-gray-400 {
  color: #e2e8f0;
}

.space-y-3 > :not(:last-child) {
  margin-bottom: 0.75rem;
}

.cursor-pointer {
  cursor: pointer;
}

.hover\:shadow-lg:hover {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.transition-shadow {
  transition: box-shadow 0.3s ease;
}

.w-full {
  width: 100%;
}

.h-1 {
  height: 0.25rem;
}

.rounded-full {
  border-radius: 9999px;
}

.mt-1 {
  margin-top: 0.25rem;
}
</style>
