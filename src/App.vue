<script setup>
import { ref } from 'vue';
import Menu from './components/Menu.vue';
import FavoritesView from './components/FavoritesView.vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <div class="flex h-screen">
    <Menu :isMenuOpen="isMenuOpen" @close-menu="toggleMenu" />
    <button v-if="!isMenuOpen" class="fixed top-4    left-5 sm:left-10 " @click="toggleMenu">
      <i class="mdi mdi-menu text-4xl text-zinc-100"></i>
    </button>
    <main class="flex flex-col min-h-screen p-5 sm:p-5 bg-zinc-950" :class="isMenuOpen ? 'md:w-1/2 lg:w-3/4' : 'w-full'">
      <div class="flex w-full justify-center">
        <h1 class="text-2xl text-green-500 font-bold -ml-8 mb-3 sm:text-4xl  sm:mb-5 ">Radio Browser</h1>
      </div>
      <FavoritesView />
    </main>
  </div>
</template>
