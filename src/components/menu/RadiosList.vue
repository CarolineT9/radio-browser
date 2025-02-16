<script setup>
import { ref } from 'vue';
import { useFavoritesStore } from '../../store/favorites';

const props = defineProps({
  station: {
    type: Object,
    required: true
  }
});

const faveStore = useFavoritesStore();
const icon = ref(false);

function toggleFavorite(data) {
  const stationFound = faveStore.favoritesStations.find(
    (s) => s.stationuuid === data.stationuuid
  );
  if (stationFound) {
    faveStore.deleteFavorite(data.stationuuid);
    icon.value = false
  } else {
    faveStore.addFavorite(data);
    icon.value = true
  }
}
</script>

<template>
  <div class="flex mt-3 justify-between items-center bg-zinc-700 h-12 w-full rounded-lg px-2">
    <p class="text-zinc-100 truncate">{{ station.name }}</p>
    <button class="w-10 h-10 flex items-center justify-center" @click="toggleFavorite(station)"
      aria-label="Adicionar/Remover dos favoritos">
      <i class="mdi mdi-heart text-3xl" :class="icon ? 'text-red-600' : 'text-zinc-100'"></i>
    </button>
  </div>
</template>
