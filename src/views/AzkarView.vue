<template>
  <div class="flex flex-col md:flex-row min-h-screen rtl font-sans bg-gradient-to-b from-green-50 to-white">
    <!-- Sidebar -->
    <aside
      class="w-full md:w-64 bg-white border-l md:border-r-0 border-green-200 p-6 shadow-sm overflow-y-auto max-h-screen"
    >
      <h2 class="text-2xl font-bold text-green-800 mb-6 text-center">الأقسام</h2>
      <ul class="space-y-4">
        <li v-for="section in azkar" :key="section.id">
          <button
            @click="selectSection(section.id)"
            :class="[
                'w-full text-right px-4 py-2 rounded-md font-medium transition border',
                selectedSectionId === section.id
                  ? 'bg-green-100 text-green-900 font-bold active-section'
                  : 'hover:bg-green-50 text-green-700 border-transparent',
              ]"
          >
            📖 {{ section.category }}
          </button>
        </li>
      </ul>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6 md:p-10">
      <h1 class="text-4xl font-extrabold text-green-900 mb-10 text-center">
        {{ selectedSection?.category || 'أذكار الصباح والمساء' }}
      </h1>

      <transition name="fade" mode="out-in">
        <div v-if="selectedSection" :key="selectedSection.id" class="grid gap-8 sm:grid-cols-2">
          <div
            v-for="entry in selectedSection.array"
            :key="entry.id"
            class="bg-white rounded-xl shadow-lg border border-green-100 p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <audio
              ref="audioRefs"
              :src="entry.audio"
              controls
              preload="none"
              class="mb-4 audio border border-green-200 shadow-inner"
              @play="onAudioPlay(entry.id, $event)"
            ></audio>

            <p
              class="text-right text-lg leading-relaxed text-gray-900 whitespace-pre-line"
              style="line-height: 1.8"
            >
              {{ entry.text }}
            </p>

            <p class="text-sm text-right text-green-700 mt-4 font-semibold tracking-wide select-none">
              🔁 التكرار: {{ entry.count }}
            </p>
          </div>
        </div>
      </transition>
    </main>
  </div>
</template>

<script setup>
import { useAzkar } from '../composables/useAzkar'

const {
  azkar,
  selectedSectionId,
  selectedSection,
  audioRefs,
  selectSection,
  onAudioPlay,
} = useAzkar()
</script>

<style src="../assets/styles/azkar.css" scoped></style>
