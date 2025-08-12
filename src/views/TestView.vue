<template>
  <div class="container mx-auto p-6">
    <h1 class="text-4xl font-bold text-center mb-6">Quran App Testing & Diagnostics</h1>
    
    <!-- Test Controls -->
    <div class="bg-white border rounded-lg p-6 mb-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-semibold">Test Controls</h2>
        <button
          @click="runTests"
          :disabled="isRunning"
          class="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {{ isRunning ? 'Running Tests...' : 'Run All Tests' }}
        </button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="text-center">
          <div class="text-2xl font-bold text-green-600">{{ testResults.filePaths.length }}</div>
          <div class="text-sm text-gray-600">Files Found</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-red-600">{{ testResults.errors.length }}</div>
          <div class="text-sm text-gray-600">Errors</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-yellow-600">{{ testResults.warnings.length }}</div>
          <div class="text-sm text-gray-600">Warnings</div>
        </div>
      </div>
    </div>

    <!-- Test Results -->
    <div v-if="testResults.errors.length > 0" class="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
      <h3 class="text-xl font-semibold text-red-800 mb-4">❌ Errors Found</h3>
      <div class="space-y-2">
        <div
          v-for="(error, index) in testResults.errors"
          :key="index"
          class="text-red-700 bg-red-100 p-3 rounded"
        >
          {{ error }}
        </div>
      </div>
    </div>

    <div v-if="testResults.warnings.length > 0" class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
      <h3 class="text-xl font-semibold text-yellow-800 mb-4">⚠️ Warnings</h3>
      <div class="space-y-2">
        <div
          v-for="(warning, index) in testResults.warnings"
          :key="index"
          class="text-yellow-700 bg-yellow-100 p-3 rounded"
        >
          {{ warning }}
        </div>
      </div>
    </div>

    <!-- File Path Results -->
    <div v-if="testResults.filePaths.length > 0" class="bg-white border rounded-lg p-6 mb-6">
      <h3 class="text-xl font-semibold mb-4">✅ Files Successfully Found</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="(file, index) in testResults.filePaths"
          :key="index"
          class="bg-green-50 border border-green-200 rounded p-3"
        >
          <div class="font-medium text-green-800">
            {{ getFileTypeLabel(file.type) }}
          </div>
          <div class="text-sm text-green-600">
            {{ getFileDescription(file) }}
          </div>
          <div class="text-xs text-green-500 mt-1 truncate">
            {{ file.path }}
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Test -->
    <div class="bg-white border rounded-lg p-6 mb-6">
      <h3 class="text-xl font-semibold mb-4">🧭 Navigation Test</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          v-for="route in testRoutes"
          :key="route.path"
          @click="testNavigation(route.path)"
          class="px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
        >
          {{ route.name }}
        </button>
      </div>
    </div>

    <!-- Data Validation -->
    <div class="bg-white border rounded-lg p-6 mb-6">
      <h3 class="text-xl font-semibold mb-4">📊 Data Validation</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 class="font-semibold mb-2">Surah Data</h4>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span>Total Surahs:</span>
              <span class="font-medium">{{ surahData.length }}</span>
            </div>
            <div class="flex justify-between">
              <span>Expected:</span>
              <span class="font-medium">114</span>
            </div>
            <div class="flex justify-between">
              <span>Status:</span>
              <span :class="surahData.length === 114 ? 'text-green-600' : 'text-red-600'">
                {{ surahData.length === 114 ? '✅ Valid' : '❌ Invalid' }}
              </span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 class="font-semibold mb-2">Juz Data</h4>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span>Total Juz:</span>
              <span class="font-medium">{{ juzData.length }}</span>
            </div>
            <div class="flex justify-between">
              <span>Expected:</span>
              <span class="font-medium">30</span>
            </div>
            <div class="flex justify-between">
              <span>Status:</span>
              <span :class="juzData.length === 30 ? 'text-green-600' : 'text-red-600'">
                {{ juzData.length === 30 ? '✅ Valid' : '❌ Invalid' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Performance Metrics -->
    <div class="bg-white border rounded-lg p-6">
      <h3 class="text-xl font-semibold mb-4">⚡ Performance Metrics</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="text-center">
          <div class="text-2xl font-bold text-blue-600">{{ loadTime }}ms</div>
          <div class="text-sm text-gray-600">Test Load Time</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-purple-600">{{ successRate }}%</div>
          <div class="text-sm text-gray-600">Success Rate</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-green-600">{{ totalTests }}</div>
          <div class="text-sm text-gray-600">Total Tests</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import surahData from '../assets/surah.json';
import juzData from '../assets/juz.json';

export default {
  name: 'TestView',
  setup() {
    const router = useRouter();
    const isRunning = ref(false);
    const testResults = ref({
      filePaths: [],
      errors: [],
      warnings: []
    });
    const loadTime = ref(0);

    const testRoutes = [
      { path: '/', name: 'Home' },
      { path: '/surah', name: 'Surah List' },
      { path: '/juz', name: 'Juz List' },
      { path: '/translation', name: 'Translation' },
      { path: '/tajweed', name: 'Tajweed' },
      { path: '/azkar', name: 'Azkar' },
      { path: '/surah/001', name: 'Surah Detail' },
      { path: '/juz/01', name: 'Juz Detail' }
    ];

    const totalTests = computed(() => {
      return testResults.value.filePaths.length + 
             testResults.value.errors.length + 
             testResults.value.warnings.length;
    });

    const successRate = computed(() => {
      if (totalTests.value === 0) return 0;
      return Math.round((testResults.value.filePaths.length / totalTests.value) * 100);
    });

    const runTests = async () => {
      isRunning.value = true;
      const startTime = Date.now();
      
      try {
        // Try to import and run tests dynamically
        const { runAppTests } = await import('../utils/testUtils.js');
        const results = await runAppTests();
        testResults.value = results;
      } catch (error) {
        console.error('Test execution error:', error);
        testResults.value.errors.push(`Test execution failed: ${error.message}`);
        
        // Fallback: run basic tests manually
        await runBasicTests();
      } finally {
        loadTime.value = Date.now() - startTime;
        isRunning.value = false;
      }
    };

    const runBasicTests = async () => {
      console.log('Running basic tests...');
      
      // Test basic data loading
      try {
        if (surahData && Array.isArray(surahData) && surahData.length === 114) {
          testResults.value.filePaths.push({
            type: 'surah_data',
            status: 'success',
            path: 'surah.json'
          });
        } else {
          testResults.value.errors.push('Surah data is invalid or missing');
        }
      } catch (error) {
        testResults.value.errors.push(`Surah data test failed: ${error.message}`);
      }

      try {
        if (juzData && Array.isArray(juzData) && juzData.length === 30) {
          testResults.value.filePaths.push({
            type: 'juz_data',
            status: 'success',
            path: 'juz.json'
          });
        } else {
          testResults.value.errors.push('Juz data is invalid or missing');
        }
      } catch (error) {
        testResults.value.errors.push(`Juz data test failed: ${error.message}`);
      }

      // Test file accessibility
      const testFiles = [
        '/src/assets/surah/surah_1.json',
        '/src/assets/surah/surah_001.json',
        '/src/assets/translation/en/en_translation_1.json',
        '/src/assets/tajweed/surah_1.json'
      ];

      for (const file of testFiles) {
        try {
          const response = await fetch(file);
          if (response.ok) {
            testResults.value.filePaths.push({
              type: 'file_access',
              status: 'success',
              path: file
            });
          } else {
            testResults.value.warnings.push(`File not accessible: ${file}`);
          }
        } catch (error) {
          testResults.value.warnings.push(`File access error: ${file} - ${error.message}`);
        }
      }
    };

    const testNavigation = (path) => {
      router.push(path);
    };

    const getFileTypeLabel = (type) => {
      const labels = {
        surah: 'Surah Text',
        translation: 'Translation',
        tajweed: 'Tajweed Rules',
        audio_index: 'Audio Index',
        audio_file: 'Audio File',
        surah_data: 'Surah Data',
        juz_data: 'Juz Data',
        file_access: 'File Access'
      };
      return labels[type] || type;
    };

    const getFileDescription = (file) => {
      switch (file.type) {
        case 'surah':
          return `Surah ${file.number}`;
        case 'translation':
          return `${file.language.toUpperCase()} - Surah ${file.surah}`;
        case 'tajweed':
          return `Surah ${file.surah}`;
        case 'audio_index':
          return `Surah ${file.surah}`;
        case 'audio_file':
          return `Surah ${file.surah} Verse ${file.verse}`;
        case 'surah_data':
          return 'Main surah metadata';
        case 'juz_data':
          return 'Main juz metadata';
        case 'file_access':
          return 'File accessibility test';
        default:
          return 'Unknown file type';
      }
    };

    onMounted(() => {
      // Auto-run tests on mount
      runTests();
    });

    return {
      isRunning,
      testResults,
      loadTime,
      testRoutes,
      surahData,
      juzData,
      totalTests,
      successRate,
      runTests,
      testNavigation,
      getFileTypeLabel,
      getFileDescription
    };
  }
};
</script>
