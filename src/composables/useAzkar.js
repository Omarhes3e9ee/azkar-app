// src/composables/useAzkar.js
import { ref, computed, onMounted, onBeforeUpdate, watch, shallowRef } from 'vue'
import azkarJson from '../assets/azkar.json'

const STORAGE_KEY = 'azkar_data'
const SELECTED_KEY = 'azkar_selected_section'

export function useAzkar() {
  const azkar = ref([])
  const selectedSectionId = ref(null)
  const audioRefs = shallowRef([])

  // Normalize IDs to number and ensure count is present
  function prepareData(data) {
    return data.map(section => ({
      ...section,
      id: Number(section.id),
      array: section.array.map(entry => ({
        ...entry,
        id: Number(entry.id),
        count: Number(entry.count) || 0,
      })),
    }))
  }

  onMounted(() => {
    const savedAzkar = localStorage.getItem(STORAGE_KEY)
    const savedSelected = localStorage.getItem(SELECTED_KEY)

    if (savedAzkar) {
      try {
        azkar.value = JSON.parse(savedAzkar)
      } catch {
        azkar.value = prepareData(azkarJson)
      }
    } else {
      azkar.value = prepareData(azkarJson)
    }

    selectedSectionId.value =
      savedSelected !== null ? Number(savedSelected) : azkar.value[0]?.id || null
  })

  const selectedSection = computed(() =>
    azkar.value.find(section => section.id === selectedSectionId.value)
  )

  function selectSection(id) {
    selectedSectionId.value = id
    saveState()
  }

  function onAudioPlay(entryId, event) {
    const current = event.target

    audioRefs.value.forEach(audio => {
      if (audio !== current && !audio.paused) {
        audio.pause()
      }
    })

    const entry = selectedSection.value?.array.find(e => e.id === entryId)
    if (entry) {
      entry.count++
      saveState()
    }
  }

  onBeforeUpdate(() => {
    audioRefs.value = []
  })

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(azkar.value))
      localStorage.setItem(SELECTED_KEY, String(selectedSectionId.value))
    } catch (error) {
      console.error('Failed to save state:', error)
    }
  }

  watch(selectedSection, (section) => {
    if (section) {
      document.title = `📖 ${section.category}`
      saveState()
    } else {
      document.title = 'أذكار الصباح والمساء'
    }
  })

  return {
    azkar,
    selectedSectionId,
    selectedSection,
    audioRefs,
    selectSection,
    onAudioPlay,
  }
}
