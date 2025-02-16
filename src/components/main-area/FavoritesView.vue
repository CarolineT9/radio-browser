<script setup>
import { ref, computed } from 'vue'
import { useFavoritesStore } from '../../store/favorites';
import FaveStationsList from './FaveStationsList.vue';

const faveStore = useFavoritesStore()
const favorites = faveStore.favoritesStations
const currentPage = ref(1);
const itemsPerPage = 5;

const paginatedStations = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return favorites.slice(start, end);
});

const onPageChange = (page) => {
  currentPage.value = page;
};

</script>
<template>
  <div>
    <h2 class="text-2xl  font-semibold text-zinc-100">Rádios Favoritas</h2>
    <div class="mt-5">
      <FaveStationsList v-for="faveStation in paginatedStations" :key="stationuuid" :fave-station="faveStation" />
    </div>
    <VueAwesomePaginate :total-items="favorites.length" :items-per-page="itemsPerPage" :max-pages-shown="2"
      :show-jump-buttons="false" :show-breakpoint-buttons="false" v-model="currentPage"
      @update:modelValue="onPageChange" />
  </div>
</template>