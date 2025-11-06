<template>
  <div class="contents">
    <div
      v-for="(section, idx) in sectionsNormalized"
      :key="idx"
      :class="[
        'group relative flex flex-col mt-[50px] leading-[1] cursor-pointer select-none max-[1380px]:mt-[30px] max-[800px]:ml-0',
        section.containerClass || 'ml-[30px]',
      ]"
    >
      <span
        class="text-[40px] text-primary tracking-widest origin-right -rotate-2 font-semibold transition-transform duration-300 ease-out group-hover:-translate-y-0.5 max-[1380px]:text-[32px] max-[1380px]:rotate-0 max-[1380px]:origin-center max-[1380px]:group-hover:translate-y-0"
      >
        {{ section.title }}
      </span>
      <span
        v-if="section.subtitle"
        class="text-[32px] text-secondary tracking-widest font-thin origin-right -rotate-1 -translate-y-0.5 transition-transform duration-300 ease-out group-hover:-rotate-3 group-hover:-translate-y-1 max-[1380px]:text-[24px] max-[1380px]:rotate-0 max-[1380px]:translate-y-0 max-[1380px]:group-hover:rotate-0 max-[1380px]:group-hover:translate-y-0"
      >
        {{ section.subtitle }}
      </span>

      <div
        :class="[
          'absolute left-1/2 top-[100%] -translate-x-1/2 mt-3',
          section.dropdownWidthClass || 'w-[220px]',
          'bg-surface/70 rounded-[24px] p-4 shadow-lg backdrop-blur-sm opacity-0 pointer-events-none transition-all duration-300 ease-out group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 translate-y-1',
          'max-[1380px]:p-3',
          'max-[800px]:left-0 max-[800px]:-translate-x-0 max-[800px]:w-[90vw]',
        ]"
      >
        <ul class="flex text-secondary flex-col gap-2">
          <template v-for="(item, i) in section.linksArr" :key="item.label">
            <li>
              <a
                :href="item.href"
                class="block px-3 py-2 rounded-md tracking-[3.8px] text-secondary font-thin hover:bg-white/10"
                >{{ item.label }}</a
              >
            </li>
            <hr
              v-if="section.separators && i < section.linksArr.length - 1"
              class="border-t border-zinc-600"
            />
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  sections: { 
    type: Array, 
    default: () => [] },
  
  separators: { 
    type: Boolean, 
    default: false },
});

const normalizeLinks = (links) => {
  if (!links || typeof links !== "object") return [];
  return Object.entries(links).map(([label, href]) => ({ label, href }));
};

const sectionsNormalized = computed(() => {
  return (props.sections || []).map((item) => ({
    title: item.title || "",
    subtitle: item.subtitle || "",
    linksArr: normalizeLinks(item.links),
    separators:
      item.separators !== undefined
        ? Boolean(item.separators)
        : props.separators,
    containerClass: item.containerClass || "",
    dropdownWidthClass: item.dropdownWidthClass || "w-[220px]",
  }));
});
</script>

<style scoped></style>
