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
    <div v-if="props.isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 backdrop-blur-sm p-4">
        <div class="bg-zinc-900 w-full max-w-md rounded-xl shadow-2xl border border-zinc-800 p-6" role="dialog" aria-modal="true" aria-labelledby="edit-title">
            <h2 id="edit-title" class="text-white text-xl font-semibold">Editar Rádio</h2>
            <div class="mt-4">
                <label class="text-sm text-zinc-300">Nome</label>
                <input v-model="props.selectedStation.name" placeholder="Digite o novo nome" type="text" class="w-full h-11 text-white px-3 font-medium rounded-lg bg-zinc-800 placeholder-zinc-400 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
            </div>
            <div class="mt-6 flex justify-end gap-3">
                <button @click="emit('close-modal')" class="px-4 h-10 rounded-md bg-zinc-700 text-white hover:bg-zinc-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900" aria-label="Fechar">
                    Fechar
                </button>
                <button @click="emit('save-edit', props.selectedStation)" class="px-4 h-10 rounded-md bg-emerald-500 text-white hover:bg-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900" aria-label="Salvar">
                    Salvar
                </button>
            </div>
        </div>
    </div>
</template>
