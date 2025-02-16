<script setup>
import { ref } from "vue";
import { useFavoritesStore } from "../../store/favorites";
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

const deleteFavorite = (id) => {
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
    <div class="bg-zinc-700 rounded-lg h-full p-5 mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
       
        <div class="flex items-center">
            <img class="w-12 h-10 sm:w-16 sm:h-12 rounded-md mr-2" :src="props.faveStation.favicon" alt="Icon image">
            <p class="font-semibold text-zinc-100 text-sm sm:text-base">{{ props.faveStation.name }}</p>
            <div class="flex ml-2">
                <button class="ml-1 sm:ml-2 flex" @click="openModal(props.faveStation)">
                    <i class="mdi mdi-pencil text-zinc-100 text-sm sm:text-base"></i>
                </button>
                <button class="ml-1 sm:ml-2 flex" @click="deleteFavorite(props.faveStation.stationuuid)">
                    <i class="mdi mdi-delete text-zinc-100 text-sm sm:text-base"></i>
                </button>
            </div>
        </div>

     
        <div class="flex justify-center sm:justify-start mt-2 sm:mt-0">
            <button class="w-14 h-14 sm:w-10 sm:h-10 flex justify-center items-center" @click="toggleRadio">
                <i :class="`mdi ${isPlaying ? 'mdi-stop' : 'mdi-play'} text-4xl sm:text-3xl text-zinc-100`"></i>
            </button>
        </div>
    </div>

    <EditModal :is-open="isOpen" :selected-station="selectedStation" @close-modal="closeModal" @save-edit="saveEdit" />
</template>
