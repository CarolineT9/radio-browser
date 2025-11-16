<script setup>
import { ref, computed } from "vue";
import { useFavoritesStore } from "../../store/favorites";
import { usePlayerStore } from "../../store/player";
import EditModal from "./EditModal.vue";

const props = defineProps({
    faveStation: {
        type: Object,
        required: true
    }
});

const player = usePlayerStore();
const useFavorite = useFavoritesStore();
const selectedStation = ref(null);
const isCurrent = computed(() => player.currentStation && player.currentStation.stationuuid === props.faveStation.stationuuid);
const isPlaying = computed(() => isCurrent.value && player.isPlaying);

const toggleRadio = () => {
    if (!isCurrent.value || !player.isPlaying) {
        player.play(props.faveStation);
    } else {
        player.pause();
    }
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
    <div class="bg-zinc-800 rounded-xl h-full p-5 mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between border border-zinc-700 hover:bg-zinc-700/70 transition-colors">

        <div class="flex items-center">
            <img class="w-12 h-10 sm:w-16 sm:h-12 rounded-md mr-2" :src="props.faveStation.favicon" alt="Icon image">
            <p class="font-semibold text-white text-sm sm:text-base">{{ props.faveStation.name }}</p>
            <div class="flex ml-2">
                <button class="ml-1 sm:ml-2 flex w-9 h-9 items-center justify-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900" @click="openModal(props.faveStation)">
                    <i class="mdi mdi-pencil text-white text-sm sm:text-base"></i>
                </button>
                <button class="ml-1 sm:ml-2 flex w-9 h-9 items-center justify-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900" @click="deleteFavorite(props.faveStation.stationuuid)">
                    <i class="mdi mdi-delete text-white text-sm sm:text-base"></i>
                </button>
            </div>
        </div>


        <div class="flex justify-center sm:justify-start mt-2 sm:mt-0">
            <button class="w-14 h-14 sm:w-10 sm:h-10 flex justify-center items-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900" @click="toggleRadio">
                <i :class="`mdi ${isPlaying ? 'mdi-pause' : 'mdi-play'} text-4xl sm:text-3xl ${isPlaying ? 'text-emerald-400' : 'text-white'}`"></i>
            </button>
        </div>
    </div>

    

    <EditModal :is-open="isOpen" :selected-station="selectedStation" @close-modal="closeModal" @save-edit="saveEdit" />
</template>
