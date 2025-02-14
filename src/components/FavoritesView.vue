<script setup>
import { useFavoritesStore } from '../store/favorites';
import FaveStationsList from './FaveStationsList.vue';

const faveStore = useFavoritesStore()

</script>
<template>
    <div >
        
        <div class="bg-gray-700 rounded-lg p-5 min-h-20">
            <h2 class="text-2xl font-semibold text-white">Rádios Favoritas</h2>
            <input
                class="w-full text-2xl px-2 mt-2 h-12 text-gray-700 font-medium rounded-lg bg-gray-400 placeholder-gray-500"
                type="text" placeholder="Pesquise estações favoritas" />
        </div>
        <div class="mt-5">
           
               <FaveStationsList v-for="faveStation in faveStore.favoritesStations" :key="stationuuid" :fave-station="faveStation"/>
            

        </div>
    </div>
</template>