<template>
  <div class="flex items-center relative">
    <input 
      v-model="query"
      class="w-full px-4 py-2 pr-10 bg-bg rounded-md text-secondary font-thin tracking-widest border border-transparent focus:border-secondary focus:ring-2 focus:ring-secondary focus:outline-none transition-colors" 
      :type="props.type" 
      :placeholder="props.placeholder"
      @keyup.enter="onSearch"
    />
    <button 
      v-if="props.type === 'text'"
      type="button"
      @click="onSearch"
      class="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors"
      aria-label="Search"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18.5a7.5 7.5 0 006.15-3.85z" />
      </svg>
    </button>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const props = defineProps({
  placeholder: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
});

const emit = defineEmits(['search'])
const query = ref('')

const onSearch = () => {
  emit('search', query.value)
}
</script>
