<script setup>
const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true
    },
    selectedStation: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['close-modal', 'save-edit']);
</script>

<template>
    <div v-if="props.isOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 class="text-xl font-bold mb-4">Editar Rádio</h2>
            <input v-model="props.selectedStation.name" class="border p-2 w-full" />
            <div class="mt-4 flex justify-between">
                <button @click="emit('close-modal')" class="bg-red-500 text-white px-4 py-2 rounded">
                    Fechar
                </button>
                <button @click="emit('save-edit', props.selectedStation)" class="bg-blue-500 text-white px-4 py-2 rounded">
                    Salvar
                </button>
            </div>
        </div>
    </div>
</template>
