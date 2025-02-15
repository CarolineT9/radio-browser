<script setup>
import { ref } from 'vue';
import { useFavoritesStore } from '../store/favorites';
const props = defineProps({
  station: {
    type: Object,
    required: true
  }
});

const faveStore = useFavoritesStore()
function addFavorites(data) {
  faveStore.addFavorite(data)
}

</script>

<template>
  <div class="flex mt-3 justify-between items-center bg-gray-700 h-12 w-full rounded-lg px-2">
    <p class="text-white truncate">{{ station.name }}</p>
    <button class="w-10 h-10 flex items-center justify-center" @click="addFavorites(station)"
      aria-label="Adicionar aos favoritos">
      <i class="mdi mdi-heart text-3xl text-gray-400"></i>
    </button>
  </div>
</template>