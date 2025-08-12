import { ref } from 'vue';
import { useFileLoader } from './useFileLoader.js';

export function useAudio() {
  const currentAudio = ref(null);
  const isPlaying = ref(false);
  const currentTime = ref(0);
  const duration = ref(0);

  const { loadAudioIndex } = useFileLoader();

  // Function to get audio file path for a specific surah and verse
  const getAudioPath = (surahNumber, verseNumber) => {
    // Pad surah number with zeros to match directory structure
    const paddedSurah = surahNumber.toString().padStart(3, '0');
    const paddedVerse = verseNumber.toString().padStart(3, '0');
    
    // Return the path to the audio file - try different path strategies
    const paths = [
      `/src/assets/audio/${paddedSurah}/${paddedVerse}.mp3`,
      `./src/assets/audio/${paddedSurah}/${paddedVerse}.mp3`,
      `../src/assets/audio/${paddedSurah}/${paddedVerse}.mp3`,
    ];
    
    // For now, return the first path and let the audio element handle errors
    return paths[0];
  };

  // Function to get audio index for a surah
  const getAudioIndex = async (surahNumber) => {
    try {
      return await loadAudioIndex(surahNumber);
    } catch (error) {
      console.error('Error fetching audio index:', error);
      return null;
    }
  };

  // Function to play audio
  const playAudio = (audioPath) => {
    if (currentAudio.value) {
      currentAudio.value.pause();
    }

    currentAudio.value = new Audio(audioPath);
    
    currentAudio.value.addEventListener('loadedmetadata', () => {
      duration.value = currentAudio.value.duration;
    });

    currentAudio.value.addEventListener('timeupdate', () => {
      currentTime.value = currentAudio.value.currentTime;
    });

    currentAudio.value.addEventListener('ended', () => {
      isPlaying.value = false;
    });

    currentAudio.value.addEventListener('error', (e) => {
      console.error('Audio playback error:', e);
      isPlaying.value = false;
    });

    currentAudio.value.play().catch(error => {
      console.error('Error playing audio:', error);
      isPlaying.value = false;
    });
    isPlaying.value = true;
  };

  // Function to pause audio
  const pauseAudio = () => {
    if (currentAudio.value) {
      currentAudio.value.pause();
      isPlaying.value = false;
    }
  };

  // Function to stop audio
  const stopAudio = () => {
    if (currentAudio.value) {
      currentAudio.value.pause();
      currentAudio.value.currentTime = 0;
      isPlaying.value = false;
      currentTime.value = 0;
    }
  };

  // Function to seek to specific time
  const seekTo = (time) => {
    if (currentAudio.value) {
      currentAudio.value.currentTime = time;
      currentTime.value = time;
    }
  };

  return {
    currentAudio,
    isPlaying,
    currentTime,
    duration,
    getAudioPath,
    getAudioIndex,
    playAudio,
    pauseAudio,
    stopAudio,
    seekTo,
  };
}
