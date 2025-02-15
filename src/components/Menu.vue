<script setup>
import RadiosList from './RadiosList.vue';
import { onMounted, ref, computed, watch } from 'vue';
import StationsService from '../services/StationsService';

const props = defineProps({
  isMenuOpen: {
    type: Boolean,
    required: true
  }
});
const emit = defineEmits(['close-menu']);

const stations = ref([]); 
const filteredStations = ref([]); 
const currentPage = ref(1);
const itemsPerPage = 10;
const loading = ref(false);
const searchQuery = ref("")
const filterSelected =  ref("name")

const filters = ref([
  { name: "Nome", value: "name" },
  { name: "País", value: "country" },
  { name: "Idioma", value: "language" },
]);




const fetchAllStations = async () => {
  loading.value = true;
  try {
    const { data } = await StationsService.getStations();
    stations.value = data;
    filteredStations.value = data; 
  } catch (error) {
    console.error("Erro ao buscar rádios:", error);
  } finally {
    loading.value = false;
  }
};


const filterInput = async () => {
  if (searchQuery.value.length < 3) return;
  loading.value = true;

  try {
    let response;
    if (filterSelected.value === "name") {
      response = await StationsService.getStationByName(searchQuery.value);
    } else if (filterSelected.value === "language") {
      response = await StationsService.getStationByLang(searchQuery.value);
    } else if (filterSelected.value === "country") {
      response = await StationsService.getStationsByCountry(searchQuery.value);
    }

    if (response) {
      filteredStations.value = response.data;
    }
  } catch (error) {
    console.error("Erro ao buscar rádios:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchAllStations);

watch(searchQuery, filterInput)

const paginatedStations = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredStations.value.slice(start, end);
});


const onPageChange = (page) => {
  currentPage.value = page;
};

</script>

<template>
  <aside v-if="props.isMenuOpen"
    class="bg-gray-800 sm:w-1/4 w-full sm:relative fixed h-full p-6 left-0 top-0 transition-all">
    <button class="absolute top-5 right-5" @click="emit('close-menu')">
      <i class="mdi mdi-close text-3xl text-gray-400"></i>
    </button>
    
    <div class="w-full mt-10 flex justify-center">
      <input  v-model="searchQuery" @input="filterInput" placeholder="Busque estações..." type="text"
        class="w-full h-12 text-gray-700 px-2 font-medium rounded-lg text-2xl bg-gray-400 placeholder-gray-500" />
    </div>
    {{ filterSelected }}
    <div class="w-full mt-10 flex justify-center">
      <select v-model="filterSelected"
        class="w-full h-12 text-gray-700 px-2 font-medium rounded-lg bg-gray-400">
        <option v-for="filter in filters" :key="filter.value" :value="filter.value">
          {{ filter.name }}
        </option>
      </select>
    </div>

    <h3 class="text-2xl mt-5 text-white font-semibold">Stations</h3>

    <div v-if="loading" class="text-white mt-3">Carregando estações...</div>

    <div v-else class="w-full mt-3">
      <RadiosList v-for="station in paginatedStations" 
        :key="station.stationuuid" 
        :station="station"/>
    </div>

    <VueAwesomePaginate
      :total-items="filteredStations.length"
      :items-per-page="itemsPerPage"
      :max-pages-shown="2"
      :show-breakpoint-buttons="false"
      v-model="currentPage"
      @update:modelValue="onPageChange"
    />
  </aside>
</template>

<style>
  .pagination-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
   
    column-gap: 20px;
    margin-top: 20px;
  }

  .paginate-buttons {
    height: 40px;
    width: 40px;
    border-radius: 10px;
    cursor: pointer;
    background-color: #374151;
    
    color: white;
  }

  .paginate-buttons:hover {
    background-color: #111827;
  }

  .active-page {
    background-color: #9ca3af;
    color: #111827;
  }

  .active-page:hover {
    background-color: #2988c8;
  }
</style>