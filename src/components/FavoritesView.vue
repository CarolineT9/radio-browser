<template>
    <div>
        <!-- Favoritos -->
        <div class="bg-gray-700 rounded-lg p-5 min-h-20">
            <h2 class="text-2xl font-semibold text-white">Rádios Favoritas</h2>
            <input
                class="w-full text-2xl px-2 mt-2 h-12 text-gray-700 font-medium rounded-lg bg-gray-400 placeholder-gray-500"
                type="text" placeholder="Pesquise estações favoritas" />
        </div>
        <div class="mt-5">
            <div class="bg-gray-700 rounded-lg h-full p-5 min-h-20 flex justify-between">
                <div class="flex h-full">
                    <div class="bg-gray-500 w-16 h-12 mr-3 rounded-md"></div>
                    <div class="flex">
                        <div>
                            <p class="font-semibold text-white">Titulo da radio</p>
                            <p class="text-white text-sm -mt-px">informações</p>
                        </div>
                        <button class="ml-2 mr-2 flex">
                            <i class="mdi mdi-pencil  text-gray-400"></i>
                        </button>
                        <button class="flex">
                            <i class="mdi mdi-delete  text-gray-400"></i>
                        </button>
                    </div>
                </div>
                <div class="h-full p-2 flex align-middle">
                    <button class="w-10 h-10 flex ">
                        <i class="mdi mdi-stop text-3xl text-gray-400"></i>
                    </button>
                    <button class="w-10 h-10 flex ">
                        <i class="mdi mdi-play text-3xl text-gray-400"></i>
                    </button>

                </div>
                

            </div>

        </div>
    </div>
</template>