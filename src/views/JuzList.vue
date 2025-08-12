<template>
  <div class="container mx-auto p-6">
    <h1 class="text-4xl font-bold text-center mb-6">Juz List</h1>
    <div v-if="loading" class="text-center text-xl">Loading...</div>
    <div v-if="error" class="text-center text-red-500">Error: {{ error }}</div>
    <ul v-if="juzData" class="space-y-4">
      <li
        v-for="juz in juzData"
        :key="juz.number"
        class="p-4 border border-gray-200 rounded-lg"
      >
        <p class="text-xl font-semibold">Juz {{ juz.number }}</p>
        <p>{{ juz.translation }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'JuzList',
  setup() {
    const juzData = ref(null);
    const loading = ref(true);
    const error = ref(null);

    onMounted(async () => {
      try {
        const response = await fetch('/src/assets/juz.json');
        if (!response.ok) {
          throw new Error('Failed to fetch Juz data');
        }
        juzData.value = await response.json();
      } catch (err) {
        error.value = err.message;
      } finally {
        loading.value = false;
      }
    });

    return {
      juzData,
      loading,
      error,
    };
  },
};
</script>
