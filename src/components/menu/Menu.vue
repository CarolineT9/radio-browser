<script setup>
import RadiosList from './RadiosList.vue';
import { onMounted, ref, computed, watch } from 'vue';
import StationsService from '../../services/StationsService';
import Spiner from '../ui/Spiner.vue'

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
const filterSelected = ref("name")

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
    class="bg-zinc-800 md:w-1/2 lg:w-1/4 w-full sm:relative fixed h-full p-6 left-0 top-0 transition-all overflow-y-auto">
    <button class="absolute top-4 right-5" @click="emit('close-menu')">
      <i class="mdi mdi-close text-2xl text-gray-400"></i>
    </button>

    <div class="w-full mt-10 flex justify-center">
      <input v-model="searchQuery" @input="filterInput" placeholder="Busque estações..." type="text"
        class="w-full h-10 text-zinc-100 px-2 font-medium rounded-lg  bg-zinc-700 placeholder-zinc-100" />
    </div>

    <div class="w-full mt-5 flex justify-center">
      <select v-model="filterSelected" class="w-full h-10 text-zinc-100 px-2 font-medium rounded-lg bg-zinc-700">
        <option v-for="filter in filters" :key="filter.value" :value="filter.value">
          {{ filter.name }}
        </option>
      </select>
    </div>

    <h3 class="text-2xl mt-5 text-green-500 font-semibold">Rádios ao vivo</h3>
    <div v-if="loading" class="w-full spiner">
      <Spiner />
    </div>

    <div v-else class="w-full mt-3">
      <RadiosList v-for="station in paginatedStations" :key="station.stationuuid" :station="station" />
    </div>

    <VueAwesomePaginate :total-items="filteredStations.length" :items-per-page="itemsPerPage" :max-pages-shown="2"
      :show-breakpoint-buttons="false" v-model="currentPage" @update:modelValue="onPageChange" />
  </aside>
</template>

<style>

.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  column-gap: 20px;
  margin-top: 30px;
}

.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 10px;
  cursor: pointer;
  background-color: #3F3F46;
  color: white;
}

.paginate-buttons:hover {
  background-color: #09090B;
}

.active-page {
  background-color: #A1A1AA;
  color: #09090B;
}

.active-page:hover {
  background-color: #22C55E;
  color: #09090B;
}

.spiner {
  display: flex;
  height: 50%;
  align-items: center;
  justify-content: center;
}
</style>