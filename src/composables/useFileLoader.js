import { ref } from 'vue';

export function useFileLoader() {
  const loading = ref(false);
  const error = ref(null);

  // Helper function to try dynamic imports
  const tryDynamicImport = async (path) => {
    try {
      console.log('Trying dynamic import:', path);
      const module = await import(path);
      return module.default || module;
    } catch (err) {
      console.log('Dynamic import failed for:', path, err.message);
      return null;
    }
  };

  // Helper function to try fetch with different base URLs
  const tryFetch = async (path) => {
    const baseUrls = [
      '', // relative to current page
      '/', // root
      '/src/assets/',
      '/public/',
    ];

    for (const baseUrl of baseUrls) {
      const fullPath = baseUrl + path;
      try {
        console.log('Trying fetch:', fullPath);
        const response = await fetch(fullPath);
        
        if (response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            console.log('Successfully loaded via fetch:', fullPath);
            return data;
          }
        }
      } catch (err) {
        console.log('Fetch failed for:', fullPath, err.message);
      }
    }
    return null;
  };

  const loadSurahText = async (surahNumber) => {
    // Convert to unpadded number (1, 2, 3 instead of 001, 002, 003)
    const unpaddedNumber = parseInt(surahNumber).toString();
    
    // Try different file naming patterns - prioritize unpadded numbers
    const filePatterns = [
      `../assets/surah/surah_${unpaddedNumber}.json`,
      `@/assets/surah/surah_${unpaddedNumber}.json`,
    ];

    // Try dynamic imports first
    for (const pattern of filePatterns) {
      const result = await tryDynamicImport(pattern);
      if (result) {
        return result;
      }
    }

    // Try fetch as fallback
    const fetchPatterns = [
      `surah/surah_${unpaddedNumber}.json`,
      `src/assets/surah/surah_${unpaddedNumber}.json`,
    ];

    for (const pattern of fetchPatterns) {
      const result = await tryFetch(pattern);
      if (result) {
        return result;
      }
    }

    console.error('Failed to load surah text for:', surahNumber);
    return null;
  };

  const loadTranslation = async (language, surahNumber) => {
    // Convert to unpadded number
    const unpaddedNumber = parseInt(surahNumber).toString();
    
    console.log(`Loading translation for language: ${language}, surah: ${surahNumber} (unpadded: ${unpaddedNumber})`);
    
    // Try different file naming patterns
    const filePatterns = [
      `../assets/translation/${language}/en_translation_${unpaddedNumber}.json`,
      `@/assets/translation/${language}/en_translation_${unpaddedNumber}.json`,
    ];

    // Try dynamic imports first
    for (const pattern of filePatterns) {
      console.log(`Trying dynamic import: ${pattern}`);
      const result = await tryDynamicImport(pattern);
      if (result) {
        console.log(`Successfully loaded translation via dynamic import: ${pattern}`);
        return result;
      }
    }

    // Try fetch as fallback
    const fetchPatterns = [
      `translation/${language}/en_translation_${unpaddedNumber}.json`,
      `src/assets/translation/${language}/en_translation_${unpaddedNumber}.json`,
    ];

    for (const pattern of fetchPatterns) {
      console.log(`Trying fetch: ${pattern}`);
      const result = await tryFetch(pattern);
      if (result) {
        console.log(`Successfully loaded translation via fetch: ${pattern}`);
        return result;
      }
    }

    console.error(`Failed to load translation for language: ${language}, surah: ${surahNumber}`);
    return null;
  };

  const loadTajweed = async (surahNumber) => {
    // Convert to unpadded number
    const unpaddedNumber = parseInt(surahNumber).toString();
    
    // Try different file naming patterns
    const filePatterns = [
      `../assets/tajweed/surah_${unpaddedNumber}.json`,
      `@/assets/tajweed/surah_${unpaddedNumber}.json`,
    ];

    // Try dynamic imports first
    for (const pattern of filePatterns) {
      const result = await tryDynamicImport(pattern);
      if (result) {
        return result;
      }
    }

    // Try fetch as fallback
    const fetchPatterns = [
      `tajweed/surah_${unpaddedNumber}.json`,
      `src/assets/tajweed/surah_${unpaddedNumber}.json`,
    ];

    for (const pattern of fetchPatterns) {
      const result = await tryFetch(pattern);
      if (result) {
        return result;
      }
    }

    console.error('Failed to load tajweed for:', surahNumber);
    return null;
  };

  const loadAudioIndex = async (surahNumber) => {
    // For audio, we might need padded numbers - let's try both
    const paddedNumber = surahNumber.toString().padStart(3, '0');
    const unpaddedNumber = parseInt(surahNumber).toString();
    
    // Try different file naming patterns
    const filePatterns = [
      `../assets/audio/${paddedNumber}/index.json`,
      `../assets/audio/${unpaddedNumber}/index.json`,
      `@/assets/audio/${paddedNumber}/index.json`,
      `@/assets/audio/${unpaddedNumber}/index.json`,
    ];

    // Try dynamic imports first
    for (const pattern of filePatterns) {
      const result = await tryDynamicImport(pattern);
      if (result) {
        return result;
      }
    }

    // Try fetch as fallback
    const fetchPatterns = [
      `audio/${paddedNumber}/index.json`,
      `audio/${unpaddedNumber}/index.json`,
      `src/assets/audio/${paddedNumber}/index.json`,
      `src/assets/audio/${unpaddedNumber}/index.json`,
    ];

    for (const pattern of fetchPatterns) {
      const result = await tryFetch(pattern);
      if (result) {
        return result;
      }
    }

    console.error('Failed to load audio index for:', surahNumber);
    return null;
  };

  return {
    loading,
    error,
    loadSurahText,
    loadTranslation,
    loadTajweed,
    loadAudioIndex,
  };
}
