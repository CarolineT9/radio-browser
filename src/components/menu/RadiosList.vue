<script setup>
import { ref, watchEffect, computed } from 'vue';
import { useFavoritesStore } from '../../store/favorites';
import { usePlayerStore } from '../../store/player';

const props = defineProps({
  station: {
    type: Object,
    required: true
  }
});

const faveStore = useFavoritesStore();
const player = usePlayerStore();
const icon = ref(false);
const isCurrent = computed(() => player.currentStation && player.currentStation.stationuuid === props.station.stationuuid);
const isPlaying = computed(() => isCurrent.value && player.isPlaying);

watchEffect(() => {

  icon.value = faveStore.favoritesStations.some(
    (s) => s.stationuuid === props.station.stationuuid
  );
});
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

function togglePlay(data) {
  if (!isCurrent.value || !player.isPlaying) {
    player.play(data);
  } else {
    player.pause();
  }
}
</script>

<template>
  <div class="flex mt-3 justify-between items-center bg-zinc-700 h-12 w-full rounded-lg px-2">
    <p class="text-zinc-100 truncate">{{ station.name }}</p>
    <div class="flex items-center gap-2">
      <button class="w-10 h-10 flex items-center justify-center" @click="togglePlay(station)" aria-label="Tocar/Pausar">
        <i :class="`mdi ${isPlaying ? 'mdi-pause' : 'mdi-play'} text-3xl ${isCurrent ? 'text-green-500' : 'text-zinc-100'}`"></i>
      </button>
      <button class="w-10 h-10 flex items-center justify-center" @click="toggleFavorite(station)"
        aria-label="Adicionar/Remover dos favoritos">
        <i class="mdi mdi-heart text-3xl" :class="icon ? 'text-red-600' : 'text-zinc-100'"></i>
      </button>
    </div>
  </div>
</template>
