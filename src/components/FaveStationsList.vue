<script setup>
import { ref } from "vue";
import { useFavoritesStore } from "../store/favorites";
import EditModal from "./EditModal.vue";
const props = defineProps({
    faveStation: {
        type: Object,
        required: true
    }
});
const isPlaying = ref(false);
const audio = ref(null);
const useFavorite = useFavoritesStore();
const selectedStation = ref(null);

const toggleRadio = () => {
    if (!audio.value) {
        audio.value = new Audio(props.faveStation.url);
    }

    if (isPlaying.value) {
        audio.value.pause();
    } else {
        audio.value.play().catch(error => console.error("Erro ao reproduzir rádio:", error));
    }

    isPlaying.value = !isPlaying.value;
    
};

const deleteFavorite = (id) =>{
    useFavorite.deleteFavorite(id)
}

const isOpen = ref(false);

const openModal = (station) => {
    
    selectedStation.value = station
    isOpen.value = true;
  
};

const closeModal = () => {
  isOpen.value = false;
};
const saveEdit = (updatedStation) => {
    useFavorite.editFavorite(updatedStation.stationuuid, updatedStation.name);
    closeModal();
};
</script>

<template>
    <div class="bg-gray-700 rounded-lg h-full p-5 min-h-20 mt-4 flex justify-between">
        <div class="flex h-full">
            <img class="w-16 h-12 mr-3 rounded-md" :src="props.faveStation.favicon" alt="Icon image">

            <div class="flex">
                <div>
                    <p class="font-semibold text-white">{{ props.faveStation.name }}</p>
                    <p class="text-white text-sm -mt-px">Votes: {{ props.faveStation.votes }}</p>
                </div>
                <button class="ml-2 mr-2 flex" @click="openModal(props.faveStation)">
                    <i class="mdi mdi-pencil text-gray-400"></i>
                </button>
                <button class="flex" @click="deleteFavorite(props.faveStation.stationuuid)">
                    <i class="mdi mdi-delete text-gray-400"></i>
                </button>
            </div>
        </div>

        <div class="h-full p-2 flex align-middle">
            <button class="w-10 h-10 flex" @click="toggleRadio">
                <i :class="`mdi ${isPlaying ? 'mdi-stop' : 'mdi-play'} text-3xl text-gray-400`"></i>
            </button>
        </div>
    </div>
    <EditModal 
    :is-open="isOpen" 
    :selected-station="selectedStation"  
    @close-modal="closeModal"
    @save-edit="saveEdit"
/>
</template>

