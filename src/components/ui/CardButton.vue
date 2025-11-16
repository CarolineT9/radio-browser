<template>
  <button
    class="p-2 rounded-xl bg-white/10 hover:bg-white/15 transition-colors"
    :aria-label="emitEvent"
    @click="onClick"
  >
    <svg-icon
      v-if="iconPath"
      type="mdi"
      :path="iconPath"
      class="w-6 h-6 text-primary"
    />
    <i v-else class="text-primary" :class="icon" />
  </button>
</template>
<script setup>
defineProps({
  nameStation: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: ""
  },
  iconPath: {
    type: String,
    default: ""
  },
  emitEvent: {
    type: String,
    default: "click"
  },
  emitPayload: {
    type: [String, Number, Boolean, Object, Array, null],
    default: null
  }
});
const emit = defineEmits();
const onClick = () => {
  const payload = emitPayload !== null ? emitPayload : (nameStation || undefined);
  emit(emitEvent, payload);
};
</script>
