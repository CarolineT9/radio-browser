<template>
  <div class="flex h-screen">
    <!-- Menu lateral -->
    <aside class="bg-gray-800 sm:w-1/4 w-full sm:relative fixed h-full p-4">
      menu
    </aside>

    <!-- Conteúdo principal -->
    <main class="flex flex-col w-full sm:w-3/4 min-h-screen p-10 bg-gray-900">
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
            class="w-full text-2xl px-2 mt-2 h-12 text-gray-700 font-medium rounded-lg bg-gray-400 placeholder-gray-500 "
            type="text"
            placeholder="Pesquise uma estação"
          />
        </div>

        <!-- Outra seção -->
        <div class="mt-5">
          <div class="bg-gray-700 rounded-lg p-5 min-h-20"></div>
        </div>
      </div>
    </main>
  </div>
</template>
