<script setup>
import RadiosList from './RadiosList.vue';
import { onMounted, ref, computed } from 'vue';
import api from "../api/axios";

const props = defineProps({
  isMenuOpen: {
    type: Boolean,
    required: true
  }
});
const emit = defineEmits(['close-menu']);

const stations = ref([]);
const currentPage = ref(1);
const itemsPerPage = 10; 


onMounted(async () => {
  try {
    const response = await api.get('search?limit=1000'); 
    stations.value = response.data; 
  } catch (error) {
    console.error("Erro ao buscar estações:", error);
  }
});


const paginatedStations = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return stations.value.slice(start, end);
});


const totalPages = computed(() => Math.ceil(stations.value.length / itemsPerPage));

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
      <input placeholder="Busque estações..." type="text"
        class="w-full h-12 text-gray-700 px-2 font-medium rounded-lg text-2xl bg-gray-400 placeholder-gray-500" />
    </div>

    <h3 class="text-2xl mt-5 text-white font-semibold">Stations</h3>

    <!-- Lista paginada de estações -->
    <div class="w-full mt-3">
      <RadiosList v-for="station in paginatedStations" 
        :key="station.stationuuid" 
        :station="station"/>
    </div>

    <!-- Paginação -->
    <VueAwesomePaginate
      :total-items="stations.length"
      :items-per-page="itemsPerPage"
      :max-pages-shown="1"
      :show-breakpoint-buttons="false"
      v-model="currentPage"
      @update:modelValue="onPageChange"
    />
  </aside>
</template>
<style>
  .pagination-container {
    display: flex;

    column-gap: 5px;
  }

  .paginate-buttons {
    height: 30px;

    width: 30px;

    border-radius: 20px;

    cursor: pointer;

    background-color: rgb(77, 73, 73);

    border: 1px solid rgb(217, 217, 217);

    color: black;
  }

  .paginate-buttons:hover {
    background-color: #d8d8d8;
  }

  .active-page {
    background-color: #3498db;

    border: 1px solid #3498db;

    color: white;
  }

  .active-page:hover {
    background-color: #2988c8;
  }
</style>
