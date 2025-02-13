<script setup>
const props = defineProps({
  isMenuOpen: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['closeMenu']);
</script>

<template>
  <aside 
    v-if="props.isMenuOpen" 
    class="bg-gray-800 sm:w-1/4 w-full sm:relative fixed h-full p-4 left-0 top-0 transition-all"
  >
    <button class="absolute top-5 right-5" @click="emit('closeMenu')">
      <i class="mdi mdi-close text-3xl text-gray-400"></i>
    </button>
  </aside>
</template>
