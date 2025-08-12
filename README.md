# Quran App - Complete Quran Reading & Learning Experience

A comprehensive Vue.js application for reading and learning the Quran with multiple features including Arabic text, translations, audio recitation, tajweed rules, and daily supplications.

## 🚀 Features

### 📖 **Surahs (114 Chapters)**
- Complete Arabic text for all 114 surahs
- Multi-language translations (English, Arabic, Indonesian)
- Audio recitation for each verse
- Surah metadata (place of revelation, type, verse count)
- Interactive navigation and search

### 📚 **Juz (30 Parts)**
- Complete Juz navigation
- Detailed Juz information with start/end points
- Surah listings within each Juz
- Progress tracking and visual indicators

### 🌍 **Multi-language Translations**
- Side-by-side translation comparison
- Support for English, Arabic, and Indonesian
- Verse-by-verse translation display
- Language switching functionality

### 🎵 **Tajweed Rules**
- Visual tajweed rule indicators
- Color-coded Arabic text
- Rule explanations and descriptions
- Interactive learning interface

### 🔊 **Audio Recitation**
- High-quality MP3 audio files
- Verse-by-verse playback
- Audio controls (play, pause, stop, seek)
- Progress tracking

### 🙏 **Azkar (Daily Supplications)**
- Morning and evening supplications
- Audio recitation for azkar
- Counter functionality
- Progress tracking

## 🛠 Technical Stack

- **Frontend**: Vue.js 3 with Composition API
- **Styling**: Tailwind CSS
- **Routing**: Vue Router 4
- **Build Tool**: Vite
- **Audio**: HTML5 Audio API
- **State Management**: Vue 3 Reactivity

## 📁 Project Structure

```
src/
├── assets/
│   ├── audio/           # Audio files (MP3)
│   ├── surah/           # Individual surah JSON files
│   ├── translation/     # Translation files (en, ar, id)
│   ├── tajweed/         # Tajweed rules JSON files
│   ├── surah.json       # Main surah metadata
│   └── juz.json         # Juz metadata
├── components/          # Reusable Vue components
├── composables/         # Vue 3 composables
├── router/             # Vue Router configuration
├── utils/              # Utility functions and test tools
├── views/              # Page components
└── main.js             # Application entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd azkar-omar-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🧪 Testing & Diagnostics

### Automated Testing
The application includes a comprehensive testing system accessible at `/test`:

1. **Navigate to Test Page**: Visit `http://localhost:5173/test`
2. **Run Tests**: Click "Run All Tests" button
3. **Review Results**: Check the test results dashboard

### Test Coverage
The testing system covers:

- ✅ **Basic Data Validation**
  - Surah data integrity (114 surahs)
  - Juz data integrity (30 juz)
  - Data structure validation

- ✅ **File Path Testing**
  - Individual surah files
  - Translation files (all languages)
  - Tajweed rule files
  - Audio files and indexes

- ✅ **Navigation Testing**
  - All route accessibility
  - Component loading
  - Parameter handling

- ✅ **Performance Metrics**
  - Load times
  - Success rates
  - Error tracking

### Manual Testing Checklist

#### 🏠 **Home Page (`/`)**
- [ ] All feature cards display correctly
- [ ] Navigation to all sections works
- [ ] Statistics display accurately
- [ ] Responsive design on mobile/tablet

#### 📖 **Surah List (`/surah`)**
- [ ] All 114 surahs display
- [ ] Surah metadata shows correctly
- [ ] Click navigation to detail pages
- [ ] Search/filter functionality (if implemented)

#### 📖 **Surah Detail (`/surah/:id`)**
- [ ] Arabic text displays correctly
- [ ] Translations load and display
- [ ] Audio player functions
- [ ] Tajweed rules highlight
- [ ] Navigation between surahs

#### 📚 **Juz List (`/juz`)**
- [ ] All 30 juz display
- [ ] Juz information shows correctly
- [ ] Navigation to detail pages

#### 📚 **Juz Detail (`/juz/:id`)**
- [ ] Juz range information
- [ ] Surah listings within juz
- [ ] Navigation between juz

#### 🌍 **Translation (`/translation`)**
- [ ] Language selector works
- [ ] Surah/verse selection
- [ ] Translation comparison
- [ ] Arabic text display

#### 🎵 **Tajweed (`/tajweed`)**
- [ ] Tajweed rules display
- [ ] Color coding works
- [ ] Rule explanations
- [ ] Interactive highlighting

#### 🙏 **Azkar (`/azkar`)**
- [ ] Azkar list displays
- [ ] Audio playback works
- [ ] Counter functionality
- [ ] Progress tracking

## 🔧 Development

### Adding New Features

1. **Create Component**: Add new Vue component in `src/views/` or `src/components/`
2. **Add Route**: Update `src/router/index.js`
3. **Update Navigation**: Modify `src/views/HomeView.vue`
4. **Test**: Run tests and verify functionality

### File Structure Guidelines

- **Views**: Page-level components in `src/views/`
- **Components**: Reusable components in `src/components/`
- **Composables**: Shared logic in `src/composables/`
- **Assets**: Static files in `src/assets/`
- **Utils**: Helper functions in `src/utils/`

### Error Handling

The application includes comprehensive error handling:

- **Error Display Component**: Shows errors and warnings
- **Loading States**: Spinner component for better UX
- **Error Logging**: Console logging for debugging
- **Error Export**: Export error reports for analysis

## 📊 Performance Optimization

### Current Optimizations
- Lazy loading of components
- Efficient data loading with composables
- Optimized audio file handling
- Responsive design for all devices

### Monitoring
- Performance metrics in test dashboard
- Load time tracking
- Success rate monitoring
- Error tracking and reporting

## 🐛 Troubleshooting

### Common Issues

1. **"Surah not found" Error**
   - Check file paths in `src/assets/surah/`
   - Verify surah index format (001, 002, etc.)
   - Run test diagnostics at `/test`

2. **Audio Not Playing**
   - Check audio file paths
   - Verify browser audio permissions
   - Check console for errors

3. **Translation Not Loading**
   - Verify translation file structure
   - Check language codes (en, ar, id)
   - Run file path tests

4. **Slow Loading**
   - Check network connectivity
   - Verify file sizes
   - Monitor performance metrics

### Debug Mode
Enable debug mode by adding to browser console:
```javascript
localStorage.setItem('debug', 'true');
```

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Run tests
5. Submit pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Quran data sources
- Audio recitation files
- Translation contributors
- Open source community

---

**For support and questions**: Check the test dashboard at `/test` for diagnostics and error reports.
