<script setup>
import RadiosList from './RadiosList.vue';

import { onMounted, reactive} from 'vue';
import api from "../api/axios";
const props = defineProps({
  isMenuOpen: {
    type: Boolean,
    required: true
  }
});

const stations = reactive({ data: [] }); // Criando um objeto reativo com uma chave 'data'

onMounted(async () => {
  try {
    const response = await api.get('search?limit=10');
    stations.data = response.data; // Atualizando a propriedade interna do objeto reativo
    console.log(stations.data);
  } catch (error) {
    console.error("Erro ao buscar estações:", error);
  }
})
const emit = defineEmits(['close-menu']);
</script>

<template>
  
  <aside v-if="props.isMenuOpen"
  
    class="bg-gray-800 sm:w-1/4 w-full sm:relative fixed h-full p-6 left-0 top-0 transition-all">
    <button class="absolute top-5 right-5" @click="emit('close-menu')">
      <i class="mdi mdi-close text-3xl text-gray-400"></i>
    </button>
   {{ stations }}
    <div class="w-full mt-10 flex justify-center">
      <input placeholder="Busque estações..." type="text"
        class="w-full h-12 text-gray-700 px-2 font-medium rounded-lg text-2xl bg-gray-400 placeholder-gray-500" />
    </div>

    <h3 class="text-2xl mt-5 text-white font-semibold">Stations</h3>
  
    <!--stations-->
    <div class="   w-full mt-3  " v-for="station in stations.data" :key="station.name">
     <RadiosList :station="station"/>
    </div>

  </aside>
</template>
