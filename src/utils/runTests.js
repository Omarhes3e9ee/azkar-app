// Comprehensive Test Runner for Quran App
// This script can be run in the browser console or as a module

export class QuranAppTestRunner {
  constructor() {
    this.results = {
      passed: 0,
      failed: 0,
      total: 0,
      tests: [],
      startTime: null,
      endTime: null
    };
  }

  // Test runner utilities
  async test(name, testFunction) {
    this.results.total++;
    const startTime = Date.now();
    
    try {
      await testFunction();
      this.results.passed++;
      this.results.tests.push({
        name,
        status: 'PASS',
        duration: Date.now() - startTime,
        error: null
      });
      console.log(`✅ ${name} - PASSED (${Date.now() - startTime}ms)`);
    } catch (error) {
      this.results.failed++;
      this.results.tests.push({
        name,
        status: 'FAIL',
        duration: Date.now() - startTime,
        error: error.message
      });
      console.log(`❌ ${name} - FAILED (${Date.now() - startTime}ms): ${error.message}`);
    }
  }

  // Test data loading
  async testDataLoading() {
    await this.test('Load Surah Data', async () => {
      const surahData = await import('../assets/surah.json');
      if (!surahData.default || !Array.isArray(surahData.default) || surahData.default.length !== 114) {
        throw new Error('Surah data is invalid or missing');
      }
    });

    await this.test('Load Juz Data', async () => {
      const juzData = await import('../assets/juz.json');
      if (!juzData.default || !Array.isArray(juzData.default) || juzData.default.length !== 30) {
        throw new Error('Juz data is invalid or missing');
      }
    });
  }

  // Test file accessibility
  async testFileAccessibility() {
    const testFiles = [
      '/src/assets/surah/surah_1.json',
      '/src/assets/surah/surah_001.json',
      '/src/assets/translation/en/en_translation_1.json',
      '/src/assets/translation/en/en_translation_001.json',
      '/src/assets/tajweed/surah_1.json',
      '/src/assets/tajweed/surah_001.json',
      '/src/assets/audio/001/index.json'
    ];

    for (const file of testFiles) {
      await this.test(`Access File: ${file}`, async () => {
        const response = await fetch(file);
        if (!response.ok) {
          throw new Error(`File not accessible: ${response.status} ${response.statusText}`);
        }
      });
    }
  }

  // Test router functionality
  async testRouter() {
    await this.test('Router Configuration', async () => {
      // This would need to be tested in the actual app context
      // For now, we'll just verify the router module can be imported
      const router = await import('../router/index.js');
      if (!router.default) {
        throw new Error('Router not properly configured');
      }
    });
  }

  // Test component loading
  async testComponentLoading() {
    const components = [
      '../views/HomeView.vue',
      '../views/SurahList.vue',
      '../views/SurahDetail.vue',
      '../views/JuzListView.vue',
      '../views/JuzDetailView.vue',
      '../views/TranslationView.vue',
      '../views/TajweedView.vue',
      '../views/TestView.vue'
    ];

    for (const component of components) {
      await this.test(`Load Component: ${component}`, async () => {
        try {
          await import(component);
        } catch (error) {
          throw new Error(`Component failed to load: ${error.message}`);
        }
      });
    }
  }

  // Test composables
  async testComposables() {
    await this.test('Load useFileLoader Composable', async () => {
      const { useFileLoader } = await import('../composables/useFileLoader.js');
      if (typeof useFileLoader !== 'function') {
        throw new Error('useFileLoader is not a function');
      }
    });

    await this.test('Load useAudio Composable', async () => {
      const { useAudio } = await import('../composables/useAudio.js');
      if (typeof useAudio !== 'function') {
        throw new Error('useAudio is not a function');
      }
    });

    await this.test('Load useErrorHandler Composable', async () => {
      const { useErrorHandler } = await import('../composables/useErrorHandler.js');
      if (typeof useErrorHandler !== 'function') {
        throw new Error('useErrorHandler is not a function');
      }
    });
  }

  // Test utilities
  async testUtilities() {
    await this.test('Load Test Utilities', async () => {
      const { QuranAppTester } = await import('./testUtils.js');
      if (typeof QuranAppTester !== 'function') {
        throw new Error('QuranAppTester is not a function');
      }
    });
  }

  // Test browser compatibility
  async testBrowserCompatibility() {
    await this.test('Check Fetch API', () => {
      if (typeof fetch !== 'function') {
        throw new Error('Fetch API not available');
      }
    });

    await this.test('Check Audio API', () => {
      if (typeof Audio !== 'function') {
        throw new Error('Audio API not available');
      }
    });

    await this.test('Check Local Storage', () => {
      if (typeof localStorage === 'undefined') {
        throw new Error('Local Storage not available');
      }
    });
  }

  // Performance tests
  async testPerformance() {
    await this.test('Data Load Performance', async () => {
      const startTime = Date.now();
      const surahData = await import('../assets/surah.json');
      const juzData = await import('../assets/juz.json');
      const duration = Date.now() - startTime;
      
      if (duration > 1000) {
        throw new Error(`Data loading too slow: ${duration}ms`);
      }
    });
  }

  // Run all tests
  async runAllTests() {
    console.log('🚀 Starting Quran App Comprehensive Tests...\n');
    
    this.results.startTime = Date.now();

    await this.testDataLoading();
    await this.testFileAccessibility();
    await this.testRouter();
    await this.testComponentLoading();
    await this.testComposables();
    await this.testUtilities();
    await this.testBrowserCompatibility();
    await this.testPerformance();

    this.results.endTime = Date.now();
    this.printResults();
    
    return this.results;
  }

  // Print test results
  printResults() {
    const duration = this.results.endTime - this.results.startTime;
    const successRate = ((this.results.passed / this.results.total) * 100).toFixed(1);

    console.log('\n📊 Test Results Summary');
    console.log('========================');
    console.log(`Total Tests: ${this.results.total}`);
    console.log(`Passed: ${this.results.passed} ✅`);
    console.log(`Failed: ${this.results.failed} ❌`);
    console.log(`Success Rate: ${successRate}%`);
    console.log(`Duration: ${duration}ms`);

    if (this.results.failed > 0) {
      console.log('\n❌ Failed Tests:');
      this.results.tests
        .filter(test => test.status === 'FAIL')
        .forEach(test => {
          console.log(`  - ${test.name}: ${test.error}`);
        });
    }

    console.log('\n✅ All tests completed!');
  }

  // Export results
  exportResults() {
    const report = {
      timestamp: new Date().toISOString(),
      results: this.results,
      summary: {
        total: this.results.total,
        passed: this.results.passed,
        failed: this.results.failed,
        successRate: ((this.results.passed / this.results.total) * 100).toFixed(1)
      }
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quran-app-test-report-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    return report;
  }
}

// Export for use in components
export const runComprehensiveTests = async () => {
  const runner = new QuranAppTestRunner();
  return await runner.runAllTests();
};

// Auto-run if in browser console
if (typeof window !== 'undefined') {
  window.QuranAppTestRunner = QuranAppTestRunner;
  window.runComprehensiveTests = runComprehensiveTests;
}
