<script setup>
import { ref } from "vue";

const props = defineProps({
    faveStation: {
        type: Object,
        required: true
    }
});


const isPlaying = ref(false);
const audio = ref(null);


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
                <button class="ml-2 mr-2 flex">
                    <i class="mdi mdi-pencil text-gray-400"></i>
                </button>
                <button class="flex">
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
</template>
