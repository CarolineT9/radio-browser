<template>
  <div :class="props.space">
    <template v-if="Array.isArray(props.sections) && props.sections.length">
      <div
        v-for="section in props.sections"
        :key="section.title"
        class="border-b border-zinc-600 pb-4"
      >
        <h3 class="text-primary tracking-widest text-lg font-semibold mb-3 ">{{ section.title }}</h3>
        <ul :class="props.class" class="tracking-widest font-thin">
          <li v-for="(href, label) in section.links" :key="label">
            <a :href="href" class="text-secondary hover:text-primary transition-colors">
              {{ label }}
            </a>
          </li>
        </ul>
      </div>
    </template>
    <template v-else>
      <slot />
    </template>
  </div>
  
</template>
<script setup>
const props = defineProps({
  sections: {
    type: Array,
    required: false,
    default: () => [],
  },
  class: {
    type: String,
    default: '',
  },
  space: {
    type: String,
    default: 'space-y-6',
  },
});
</script>
