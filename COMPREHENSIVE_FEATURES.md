# Comprehensive Quran Application Features

This application provides a complete Quran reading and learning experience with multiple features and data sources from the `src/assets` directory.

## 🏠 Home Page (`/`)

The main landing page provides access to all features:
- **Surahs**: Browse all 114 Quranic chapters
- **Juz**: Navigate through the 30 parts of the Quran
- **Translations**: Multi-language translations
- **Tajweed**: Learn Quranic recitation rules
- **Audio**: Listen to Quranic recitation
- **Azkar**: Daily supplications and remembrances

## 📖 Surahs Features

### Surah List (`/surah`)
- Displays all 114 Surahs with metadata
- Shows Arabic and English titles
- Includes place of revelation (Mecca/Medina)
- Displays verse count and page numbers
- Click to navigate to detailed view

### Surah Detail (`/surah/:id`)
- **Complete verse display** with Arabic text
- **Multi-language translations** (English, Arabic, Indonesian)
- **Audio player** with verse-by-verse playback
- **Tajweed rules** with visual indicators
- **Verse selection** for focused reading
- **Progress tracking** for audio playback
- **Surah metadata** (Juz, pages, type)

## 📚 Juz Features

### Juz List (`/juz`)
- Displays all 30 Juz (parts) of the Quran
- Shows start and end Surahs for each Juz
- Visual progress indicators
- Click to view detailed Juz information

### Juz Detail (`/juz/:id`)
- **Juz range information** (start/end points)
- **Surahs included** in the Juz
- **Navigation** between Juz
- **Direct links** to individual Surahs

## 🌍 Translation Features

### Translation View (`/translation`)
- **Language selector** (English, Arabic, Indonesian)
- **Surah and verse selection**
- **Side-by-side comparison** of translations
- **Arabic text display** with proper RTL formatting
- **Navigation** between Surahs
- **Focus mode** for specific verses

## 🎵 Tajweed Features

### Tajweed View (`/tajweed`)
- **Visual tajweed rules** with color coding
- **Interactive Arabic text** with hover tooltips
- **Rule explanations** and descriptions
- **Comprehensive legend** of tajweed rules
- **Verse-by-verse analysis**
- **Surah navigation**

## 🔊 Audio Features

### Audio Player (Integrated in Surah Detail)
- **Verse-by-verse playback**
- **Progress tracking** with time display
- **Play/pause/stop controls**
- **Audio file information** (size, duration)
- **Automatic verse selection**
- **High-quality MP3 files**

## 📁 Data Structure

### Audio Files (`src/assets/audio/`)
```
001/          # Surah 1 (Al-Fatiha)
├── 001.mp3   # Verse 1
├── 002.mp3   # Verse 2
├── ...
└── index.json # Audio metadata
```

### Surah Data (`src/assets/surah.json`)
```json
{
  "title": "Al-Fatiha",
  "titleAr": "الفاتحة",
  "place": "Mecca",
  "type": "Makkiyah",
  "count": 7,
  "pages": "1",
  "juz": [...]
}
```

### Individual Surah Files (`src/assets/surah/`)
```json
{
  "index": "001",
  "name": "al-Fatihah",
  "verse": {
    "verse_1": "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
    "verse_2": "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ"
  }
}
```

### Translations (`src/assets/translation/`)
```
en/           # English translations
├── en_translation_1.json
├── en_translation_2.json
└── ...

ar/           # Arabic translations
├── ar_translation_1.json
└── ...

id/           # Indonesian translations
├── id_translation_1.json
└── ...
```

### Tajweed Rules (`src/assets/tajweed/`)
```json
{
  "index": "001",
  "verse": {
    "verse_1": [
      {
        "start": 7,
        "end": 8,
        "rule": "hamzat_wasl"
      }
    ]
  }
}
```

### Juz Data (`src/assets/juz.json`)
```json
{
  "index": "01",
  "start": {
    "index": "001",
    "verse": "verse_1",
    "name": "Al-Fatiha"
  },
  "end": {
    "index": "002",
    "verse": "verse_141",
    "name": "Al-Baqara"
  }
}
```

## 🛠 Technical Features

### Vue.js Components
- **Composition API** for modern Vue 3 development
- **Reactive data management** with Vue 3 reactivity
- **Component-based architecture** for maintainability
- **Router integration** for seamless navigation

### Audio Management
- **Custom composable** (`useAudio.js`) for audio operations
- **HTML5 Audio API** integration
- **Progress tracking** and time display
- **Error handling** for missing audio files

### Data Loading
- **Dynamic imports** for JSON data
- **Fetch API** for remote data loading
- **Error boundaries** for graceful failure handling
- **Loading states** for better UX

### Responsive Design
- **Tailwind CSS** for styling
- **Mobile-first** responsive design
- **Arabic RTL** text support
- **Accessibility** considerations

## 🎯 Key Features Summary

1. **Complete Quran Coverage**: All 114 Surahs, 30 Juz, 6,236 verses
2. **Multi-language Support**: English, Arabic, Indonesian translations
3. **Audio Recitation**: High-quality MP3 files for all verses
4. **Tajweed Learning**: Visual rules with explanations
5. **Interactive Navigation**: Seamless movement between sections
6. **Modern UI/UX**: Clean, responsive design
7. **Performance Optimized**: Efficient data loading and caching
8. **Accessibility**: Screen reader friendly and keyboard navigation

## 🚀 Getting Started

1. **Navigate to Home**: Visit `/` to see all available features
2. **Choose a Feature**: Click on any feature card to explore
3. **Browse Surahs**: Start with `/surah` to see all chapters
4. **Listen to Audio**: Go to any Surah detail page for audio playback
5. **Learn Tajweed**: Visit `/tajweed` for recitation rules
6. **Compare Translations**: Use `/translation` for multi-language study

## 📱 Mobile Experience

The application is fully responsive and optimized for:
- **Mobile phones** (portrait and landscape)
- **Tablets** (all orientations)
- **Desktop computers** (all screen sizes)
- **Touch interactions** for mobile devices

## 🔧 Customization

The application can be easily customized by:
- **Adding new languages** to the translation system
- **Modifying tajweed rules** and color schemes
- **Updating audio files** with different reciters
- **Extending features** with additional data sources
