import surahData from '../assets/surah.json';
import juzData from '../assets/juz.json';

export class QuranAppTester {
  constructor() {
    this.testResults = {
      surahData: false,
      juzData: false,
      filePaths: [],
      errors: [],
      warnings: []
    };
  }

  // Test basic data loading
  async testBasicData() {
    console.log('🧪 Testing basic data loading...');
    
    try {
      // Test surah data
      if (surahData && Array.isArray(surahData) && surahData.length === 114) {
        this.testResults.surahData = true;
        console.log('✅ Surah data loaded successfully:', surahData.length, 'surahs');
      } else {
        this.testResults.errors.push('Surah data is invalid or missing');
        console.log('❌ Surah data test failed');
      }

      // Test juz data
      if (juzData && Array.isArray(juzData) && juzData.length === 30) {
        this.testResults.juzData = true;
        console.log('✅ Juz data loaded successfully:', juzData.length, 'juz');
      } else {
        this.testResults.errors.push('Juz data is invalid or missing');
        console.log('❌ Juz data test failed');
      }
    } catch (error) {
      this.testResults.errors.push(`Basic data test error: ${error.message}`);
      console.log('❌ Basic data test error:', error);
    }
  }

  // Test file paths for individual surah files
  async testSurahFiles() {
    console.log('🧪 Testing surah file paths...');
    
    const testSurahs = [1, 2, 3, 10, 50, 100, 114]; // Test various surah numbers
    
    for (const surahNumber of testSurahs) {
      const paddedNumber = surahNumber.toString().padStart(3, '0');
      const unpaddedNumber = surahNumber.toString();
      
      const paths = [
        `/src/assets/surah/surah_${paddedNumber}.json`,
        `/src/assets/surah/surah_${unpaddedNumber}.json`,
        `./src/assets/surah/surah_${paddedNumber}.json`,
        `./src/assets/surah/surah_${unpaddedNumber}.json`,
      ];

      let found = false;
      for (const path of paths) {
        try {
          const response = await fetch(path);
          if (response.ok) {
            const data = await response.json();
            if (data && data.index) {
              this.testResults.filePaths.push({
                type: 'surah',
                number: surahNumber,
                path: path,
                status: 'success'
              });
              found = true;
              console.log(`✅ Surah ${surahNumber} found at: ${path}`);
              break;
            }
          }
        } catch (error) {
          // Continue to next path
        }
      }

      if (!found) {
        this.testResults.errors.push(`Surah ${surahNumber} not found in any path`);
        console.log(`❌ Surah ${surahNumber} not found`);
      }
    }
  }

  // Test translation files
  async testTranslationFiles() {
    console.log('🧪 Testing translation file paths...');
    
    const languages = ['en', 'ar', 'id'];
    const testSurahs = [1, 2, 3];
    
    for (const language of languages) {
      for (const surahNumber of testSurahs) {
        const paddedNumber = surahNumber.toString().padStart(3, '0');
        const unpaddedNumber = surahNumber.toString();
        
        const paths = [
          `/src/assets/translation/${language}/en_translation_${paddedNumber}.json`,
          `/src/assets/translation/${language}/en_translation_${unpaddedNumber}.json`,
        ];

        let found = false;
        for (const path of paths) {
          try {
            const response = await fetch(path);
            if (response.ok) {
              const data = await response.json();
              if (data && data.verse) {
                this.testResults.filePaths.push({
                  type: 'translation',
                  language: language,
                  surah: surahNumber,
                  path: path,
                  status: 'success'
                });
                found = true;
                console.log(`✅ Translation ${language} for Surah ${surahNumber} found at: ${path}`);
                break;
              }
            }
          } catch (error) {
            // Continue to next path
          }
        }

        if (!found) {
          this.testResults.warnings.push(`Translation ${language} for Surah ${surahNumber} not found`);
          console.log(`⚠️ Translation ${language} for Surah ${surahNumber} not found`);
        }
      }
    }
  }

  // Test tajweed files
  async testTajweedFiles() {
    console.log('🧪 Testing tajweed file paths...');
    
    const testSurahs = [1, 2, 3];
    
    for (const surahNumber of testSurahs) {
      const paddedNumber = surahNumber.toString().padStart(3, '0');
      const unpaddedNumber = surahNumber.toString();
      
      const paths = [
        `/src/assets/tajweed/surah_${paddedNumber}.json`,
        `/src/assets/tajweed/surah_${unpaddedNumber}.json`,
      ];

      let found = false;
      for (const path of paths) {
        try {
          const response = await fetch(path);
          if (response.ok) {
            const data = await response.json();
            if (data && data.verse) {
              this.testResults.filePaths.push({
                type: 'tajweed',
                surah: surahNumber,
                path: path,
                status: 'success'
              });
              found = true;
              console.log(`✅ Tajweed for Surah ${surahNumber} found at: ${path}`);
              break;
            }
          }
        } catch (error) {
          // Continue to next path
        }
      }

      if (!found) {
        this.testResults.warnings.push(`Tajweed for Surah ${surahNumber} not found`);
        console.log(`⚠️ Tajweed for Surah ${surahNumber} not found`);
      }
    }
  }

  // Test audio files
  async testAudioFiles() {
    console.log('🧪 Testing audio file paths...');
    
    const testSurahs = [1, 2, 3];
    
    for (const surahNumber of testSurahs) {
      const paddedNumber = surahNumber.toString().padStart(3, '0');
      
      // Test audio index
      const indexPaths = [
        `/src/assets/audio/${paddedNumber}/index.json`,
      ];

      let indexFound = false;
      for (const path of indexPaths) {
        try {
          const response = await fetch(path);
          if (response.ok) {
            const data = await response.json();
            if (data) {
              this.testResults.filePaths.push({
                type: 'audio_index',
                surah: surahNumber,
                path: path,
                status: 'success'
              });
              indexFound = true;
              console.log(`✅ Audio index for Surah ${surahNumber} found at: ${path}`);
              break;
            }
          }
        } catch (error) {
          // Continue to next path
        }
      }

      if (!indexFound) {
        this.testResults.warnings.push(`Audio index for Surah ${surahNumber} not found`);
        console.log(`⚠️ Audio index for Surah ${surahNumber} not found`);
      }

      // Test a few audio files
      const testVerses = [1, 2, 3];
      for (const verseNumber of testVerses) {
        const paddedVerse = verseNumber.toString().padStart(3, '0');
        const audioPath = `/src/assets/audio/${paddedNumber}/${paddedVerse}.mp3`;
        
        try {
          const response = await fetch(audioPath, { method: 'HEAD' });
          if (response.ok) {
            this.testResults.filePaths.push({
              type: 'audio_file',
              surah: surahNumber,
              verse: verseNumber,
              path: audioPath,
              status: 'success'
            });
            console.log(`✅ Audio file for Surah ${surahNumber} Verse ${verseNumber} found`);
          } else {
            this.testResults.warnings.push(`Audio file for Surah ${surahNumber} Verse ${verseNumber} not found`);
            console.log(`⚠️ Audio file for Surah ${surahNumber} Verse ${verseNumber} not found`);
          }
        } catch (error) {
          this.testResults.warnings.push(`Audio file for Surah ${surahNumber} Verse ${verseNumber} error: ${error.message}`);
          console.log(`⚠️ Audio file for Surah ${surahNumber} Verse ${verseNumber} error:`, error.message);
        }
      }
    }
  }

  // Test router functionality
  testRouter() {
    console.log('🧪 Testing router configuration...');
    
    const expectedRoutes = [
      { path: '/', name: 'Home' },
      { path: '/azkar', name: 'Azkar' },
      { path: '/surah', name: 'SurahList' },
      { path: '/surah/:id', name: 'SurahDetail' },
      { path: '/juz', name: 'JuzList' },
      { path: '/juz/:id', name: 'JuzDetail' },
      { path: '/translation', name: 'Translation' },
      { path: '/tajweed', name: 'Tajweed' }
    ];

    // This would need to be tested in the actual app context
    console.log('✅ Router test completed (manual verification needed)');
  }

  // Run all tests
  async runAllTests() {
    console.log('🚀 Starting comprehensive Quran App testing...\n');
    
    await this.testBasicData();
    await this.testSurahFiles();
    await this.testTranslationFiles();
    await this.testTajweedFiles();
    await this.testAudioFiles();
    this.testRouter();
    
    console.log('\n📊 Test Results Summary:');
    console.log('========================');
    console.log(`✅ Basic Data: ${this.testResults.surahData && this.testResults.juzData ? 'PASS' : 'FAIL'}`);
    console.log(`📁 Files Found: ${this.testResults.filePaths.length}`);
    console.log(`❌ Errors: ${this.testResults.errors.length}`);
    console.log(`⚠️ Warnings: ${this.testResults.warnings.length}`);
    
    if (this.testResults.errors.length > 0) {
      console.log('\n❌ Errors:');
      this.testResults.errors.forEach(error => console.log(`  - ${error}`));
    }
    
    if (this.testResults.warnings.length > 0) {
      console.log('\n⚠️ Warnings:');
      this.testResults.warnings.forEach(warning => console.log(`  - ${warning}`));
    }
    
    return this.testResults;
  }
}

// Export for use in components
export const runAppTests = async () => {
  const tester = new QuranAppTester();
  return await tester.runAllTests();
};
