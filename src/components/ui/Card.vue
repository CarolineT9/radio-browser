<template>
  <div class="bg-surface/70 rounded-[58px] p-8" :class="props.class">
    <div>
      <div class="leading-[1]">
        <span
          class="text-[42px] text-bg tracking-widest origin-right -rotate-2 font-semibold max-[1380px]:text-[32px] max-[1380px]:rotate-0 max-[1380px]:origin-center"
        >
          {{ props.title }}
        </span>
        <span
          v-if="props.subtitle"
          class="block text-[34px] text-primary tracking-widest font-thin origin-right -rotate-1 -translate-y-0.5 max-[1380px]:text-[24px] max-[1380px]:rotate-0 max-[1380px]:translate-y-0"
        >
          {{ props.subtitle }}
        </span>
      </div>
      <div class="mt-9 flex items-center gap-4">
        <img src="../../../public/Rectangle 5.png" class="bg-surface w-[116px] h-[84px] rounded-[28px]"/>
        <div class="flex flex-col">
          <span class="text-bg tracking-widest">{{ nameStation }}</span>
          <div class="mt-2 flex items-center gap-2">
            <button
              v-if="props.showFavorite"
              @click="onFavoriteToggle"
              class="p-2 rounded-xl bg-white/10 hover:bg-white/15 transition-colors"
              aria-label="Toggle favorite"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6" :class="props.isFavorite ? 'text-primary' : 'text-bg'" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6.02 3.99 4 6.5 4c1.74 0 3.41.81 4.5 2.09C12.09 4.81 13.76 4 15.5 4 18.01 4 20 6.02 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>
            <button
              v-if="props.showEdit"
              @click="emit('edit', props.nameStation)"
              class="p-2 rounded-xl bg-white/10 hover:bg-white/15 transition-colors text-bg"
              aria-label="Edit"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6" fill="currentColor">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z"/>
              </svg>
            </button>
            <button
              v-if="props.showDelete"
              @click="emit('delete', props.nameStation)"
              class="p-2 rounded-xl bg-white/10 hover:bg-white/15 transition-colors text-bg"
              aria-label="Delete"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6" fill="currentColor">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const emit = defineEmits(['edit', 'delete', 'favorite-toggle'])
const props = defineProps({
  class: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: 'Your',
  },
  subtitle: {
    type: String,
    default: 'Favorite',
  },
  nameStation: {
    type: String,
    default: 'Radio Station',
  },
  showEdit: {
    type: Boolean,
    default: true,
  },
  showDelete: {
    type: Boolean,
    default: true,
  },
  showFavorite: {
    type: Boolean,
    default: false,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
})

const onFavoriteToggle = () => {
  emit('favorite-toggle', !props.isFavorite)
}
</script>