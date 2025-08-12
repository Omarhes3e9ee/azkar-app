# Audio and Surah Data Usage Guide

This guide explains how to work with the audio files and surah data in your Vue.js application.

## File Structure

### Audio Files
```
src/assets/audio/
├── 001/          # Surah 1 (Al-Fatiha)
│   ├── 001.mp3   # Verse 1
│   ├── 002.mp3   # Verse 2
│   ├── ...
│   └── index.json # Audio metadata
├── 002/          # Surah 2 (Al-Baqara)
│   ├── 001.mp3   # Verse 1
│   ├── 002.mp3   # Verse 2
│   ├── ...
│   └── index.json
└── ...
```

### Surah Data
- `src/assets/surah.json` - Contains metadata for all 114 Surahs
- Each surah object contains: title, titleAr, place, type, count, pages, juz info

## How to Use

### 1. Import Surah Data
```javascript
import surahData from '@/assets/surah.json';

// Get specific surah (index 0-113)
const surah = surahData[surahNumber - 1];
```

### 2. Use the Audio Composable
```javascript
import { useAudio } from '@/composables/useAudio';

const {
  isPlaying,
  currentTime,
  duration,
  getAudioPath,
  getAudioIndex,
  playAudio,
  pauseAudio,
  stopAudio,
} = useAudio();
```

### 3. Play Audio Files
```javascript
// Get audio path for specific surah and verse
const audioPath = getAudioPath(1, 1); // Surah 1, Verse 1
// Returns: "/src/assets/audio/001/001.mp3"

// Play the audio
playAudio(audioPath);
```

### 4. Get Audio Metadata
```javascript
// Get audio index for a surah
const audioIndex = await getAudioIndex(1); // Surah 1
// Returns: { index: "001", verse: {...}, count: 7 }
```

## Example Components

### SurahList.vue
- Displays all 114 Surahs from `surah.json`
- Shows title, Arabic title, place, type, and verse count
- Click to navigate to surah detail

### SurahDetail.vue
- Shows detailed surah information
- Audio player with verse selection
- Displays available audio files
- Progress bar and time display

## Key Features

1. **Direct Import**: Use `import surahData from '@/assets/surah.json'` instead of fetch
2. **Audio Management**: The `useAudio` composable handles all audio operations
3. **Verse Selection**: Click on verse numbers to select and play specific verses
4. **Progress Tracking**: Real-time audio progress with time display
5. **Error Handling**: Proper error handling for missing files

## Audio File Naming Convention

- Surah directories: `001`, `002`, ..., `114` (padded with zeros)
- Verse files: `001.mp3`, `002.mp3`, etc. (padded with zeros)
- Index files: `index.json` in each surah directory

## Browser Compatibility

- Audio files are served as static assets
- Works with all modern browsers that support HTML5 Audio API
- Fallback handling for unsupported browsers
