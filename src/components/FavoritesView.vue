<script setup>
import {ref, computed} from 'vue'
import { useFavoritesStore } from '../store/favorites';
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
    {{  }}
    <div >   
        <div class="bg-gray-700 rounded-lg p-5 min-h-20">
            <h2 class="text-2xl font-semibold text-white">Rádios Favoritas</h2>
            <input
                class="w-full text-2xl px-2 mt-2 h-12 text-gray-700 font-medium rounded-lg bg-gray-400 placeholder-gray-500"
                type="text" placeholder="Pesquise estações favoritas" />
        </div>
        <div class="mt-5">        
               <FaveStationsList v-for="faveStation in paginatedStations" :key="stationuuid" :fave-station="faveStation"/>
        </div>
        <VueAwesomePaginate
      :total-items="favorites.length"
      :items-per-page="itemsPerPage"
      :max-pages-shown="2"
      :show-jump-buttons="false"
      :show-breakpoint-buttons="false"   
      v-model="currentPage"
      @update:modelValue="onPageChange"
    />

    </div>
</template>