<script setup>
import { ref } from 'vue';
import Menu from './components/Menu.vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <div class="flex h-screen">
    <!-- Menu lateral -->
    <Menu :isMenuOpen="isMenuOpen" @close-menu="toggleMenu"/>

    <!-- Botão para abrir o menu -->
    <button
      v-if="!isMenuOpen"
      class="fixed top-5 left-10 "
      @click="toggleMenu"
    >
      <i class="mdi mdi-menu text-4xl text-gray-400"></i>
    </button>

    <!-- Conteúdo principal -->
    <main
      class="flex flex-col min-h-screen p-10 bg-gray-900"
      :class="isMenuOpen ? 'sm:w-3/4' : 'w-full'"
    >
      <!-- Título -->
      <div class="flex w-full justify-center">
        <h1 class="text-4xl text-white font-bold mb-5">Radio Browser</h1>
      </div>

      <!-- Área da rádio -->
      <div>
        <!-- Favoritos -->
        <div class="bg-gray-700 rounded-lg p-5 min-h-20">
          <h2 class="text-2xl font-semibold text-white">Rádios Favoritas</h2>
          <input
            class="w-full text-2xl px-2 mt-2 h-12 text-gray-700 font-medium rounded-lg bg-gray-400 placeholder-gray-500"
            type="text"
            placeholder="Pesquise estações favoritas"
          />
        </div>

       
        <div class="mt-5">
          <div class="bg-gray-700 rounded-lg p-5 min-h-20"></div>
        </div>
      </div>
    </main>
  </div>
</template>
