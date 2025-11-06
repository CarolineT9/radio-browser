<template>
  <div class="layout-bg flex flex-col w-full">
    <!-- Mobile hamburger menu overlay -->
    <div 
      v-if="isMobileMenuOpen"
      class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm max-[855px]:block hidden"
      @click.self="toggleMobileMenu"
    >
      <div 
        class="absolute top-0 left-0 w-full bg-surface/90 backdrop-blur-md p-6"
        @click.stop
      >
        <div class="flex justify-between items-center mb-8">
          <span class="text-primary text-2xl font-semibold tracking-widest">Menu</span>
          <button 
            @click="toggleMobileMenu"
            class="text-secondary hover:text-primary transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <nav class="space-y-6">
          <NavLink 
            :sections="mobileNav" 
            :class="'space-y-2 ml-4'"
          />
          <NavLink>
            <div class="border-b border-zinc-600 pb-4">
              <h3 class="text-primary text-lg font-semibold mb-3">Stations by Name</h3>
              <Input 
              :placeholder="'Search'" 
              :type="'text'" />
            </div>
          </NavLink>
        </nav>
      </div>
    </div>

    <div
      class="text-secondary p-[60px] h-[150px] w-full flex items-center justify-between gap-8 max-[800px]:flex-col max-[800px]:items-start max-[800px]:p-[24px] max-[800px]:gap-6"
    >
      <!-- Hamburger menu button for mobile -->
      <button 
        @click="toggleMobileMenu"
        class="hidden max-[820px]:block fixed top-6 right-6 z-40 p-2 bg-surface/70 backdrop-blur-sm rounded-lg"
      >
        <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      <!-- Desktop menu - hidden on mobile -->
      <div class="max-[820px]:hidden w-full flex items-center justify-between gap-8">
      <div
        class="group relative flex flex-col mt-[50px] ml-[30px] leading-[1] cursor-pointer select-none max-[1380px]:mt-[30px] max-[800px]:ml-0"
      >
        <span
          class="text-[40px] text-primary origin-right -rotate-2 font-semibold transition-transform duration-300 ease-out group-hover:-translate-y-0.5 max-[1380px]:text-[32px] max-[1380px]:rotate-0 max-[1380px]:origin-center max-[1380px]:group-hover:translate-y-0"
          >S t a t i o n s
        </span>
        <span
          class="text-[32px] text-secondary font-thin origin-right -rotate-1 -translate-y-0.5 transition-transform duration-300 ease-out group-hover:-rotate-3 group-hover:-translate-y-1 max-[1380px]:text-[24px] max-[1380px]:rotate-0 max-[1380px]:translate-y-0 max-[1380px]:group-hover:rotate-0 max-[1380px]:group-hover:translate-y-0"
          >b y c o u n t r y</span
        >
        <div
          class="absolute left-1/2 top-[100%] -translate-x-1/2 mt-3 w-[220px] bg-surface/70 rounded-[24px] p-4 shadow-lg backdrop-blur-sm opacity-0 pointer-events-none transition-all duration-300 ease-out group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 translate-y-1 max-[1380px]:w-[200px] max-[800px]:left-0 max-[800px]:-translate-x-0 max-[800px]:w-[90vw] max-[800px]:p-3"
        >
          <ul class="flex flex-col gap-2">
            <li>
              <a
                href="#"
                class="block px-3 py-2 rounded-md text-secondary hover:bg-white/10"
                >Ver todos</a
              >
            </li>
            <li>
              <a
                href="#"
                class="block px-3 py-2 rounded-md text-secondary hover:bg-white/10"
                >Top 10</a
              >
            </li>
            <li>
              <a
                href="#"
                class="block px-3 py-2 rounded-md text-secondary hover:bg-white/10"
                >Explorar</a
              >
            </li>
          </ul>
        </div>
      </div>

      <div
        class="group relative flex flex-col mt-[50px] mr-[30px] leading-[1] cursor-pointer select-none max-[1380px]:mt-[30px] max-[800px]:mr-0"
      >
        <span
          class="text-[40px] text-primary origin-right -rotate-2 font-semibold transition-transform duration-300 ease-out group-hover:-translate-y-0.5 max-[1380px]:text-[32px] max-[1380px]:rotate-0 max-[1380px]:origin-center max-[1380px]:group-hover:translate-y-0"
          >S t a t i o n s
        </span>
        <span
          class="text-[32px] text-secondary font-thin origin-right -rotate-1 -translate-y-0.5 transition-transform duration-300 ease-out group-hover:-rotate-3 group-hover:-translate-y-1 max-[1380px]:text-[24px] max-[1380px]:rotate-0 max-[1380px]:translate-y-0 max-[1380px]:group-hover:rotate-0 max-[1380px]:group-hover:translate-y-0"
          >b y n a m e</span
        >
        <div
          class="absolute left-1/2 top-[100%] -translate-x-1/2 mt-3 w-[280px] bg-surface/70 rounded-[24px] p-4 shadow-lg backdrop-blur-sm opacity-0 pointer-events-none transition-all duration-300 ease-out group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 translate-y-1 max-[1380px]:w-[220px] max-[800px]:left-0 max-[800px]:-translate-x-0 max-[800px]:w-[90vw] max-[800px]:p-3"
        >
          <ul class="flex text-secondary flex-col gap-2">
            <li>
              <a
                href="#"
                class="block px-3 py-2 rounded-md tracking-[3.8px] text-secondary font-thin hover:bg-white/10"
                >Ver todos</a
              >
            </li>
            <hr class=" border-t border-zinc-600"/>
            <li>
              <a
                href="#"
                class="block px-3 py-2 rounded-md tracking-[3.8px] text-secondary font-thin hover:bg-white/10"
                >Top 10</a
              >
            </li>
            <hr class=" border-t border-zinc-600"/>
            <li>
              <a
                href="#"
                class="block px-3 py-2 rounded-md font-thin tracking-[3.8px] text-secondary hover:bg-white/10"
                >Explorar</a
              >
            </li>
          </ul>
        </div>
      </div>
      <div
        class="group relative flex flex-col mt-[50px] mr-[30px] leading-[1] cursor-pointer select-none max-[1380px]:mt-[30px] max-[800px]:mr-0"
      >
        <span
          class="text-[40px] text-primary origin-right -rotate-2 font-semibold transition-transform duration-300 ease-out group-hover:-translate-y-0.5 max-[1380px]:text-[32px] max-[1380px]:rotate-0 max-[1380px]:origin-center max-[1380px]:group-hover:translate-y-0"
          >S t a t i o n s
        </span>
        <span
          class="text-[32px] text-secondary font-thin origin-right -rotate-2 -translate-y-0.5 transition-transform duration-300 ease-out group-hover:-rotate-3 group-hover:-translate-y-1 max-[1380px]:text-[24px] max-[1380px]:rotate-0 max-[1380px]:translate-y-0 max-[1380px]:group-hover:rotate-0 max-[1380px]:group-hover:translate-y-0"
          >b y l a n g u a g e</span
        >
        <div
          class="absolute left-1/2 top-[100%] -translate-x-1/2 mt-3 w-[220px] bg-surface/70 rounded-[24px] p-4 shadow-lg backdrop-blur-sm opacity-0 pointer-events-none transition-all duration-300 ease-out group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 translate-y-1 max-[1380px]:w-[200px] max-[800px]:left-0 max-[800px]:-translate-x-0 max-[800px]:w-[90vw] max-[800px]:p-3"
        >
          <ul class="flex flex-col gap-2">
            <li>
              <a
                href="#"
                class="block px-3 py-2 rounded-md text-secondary hover:bg-white/10"
                >Ver todos</a
              >
            </li>
            <li>
              <a
                href="#"
                class="block px-3 py-2 rounded-md text-secondary hover:bg-white/10"
                >Top 10</a
              >
            </li>
            <li>
              <a
                href="#"
                class="block px-3 py-2 rounded-md text-secondary hover:bg-white/10"
                >Explorar</a
              >
            </li>
          </ul>
        </div>
      </div>
      </div>
    </div>
    <div class="flex-1 w-full flex items-center justify-center">
      <div class="flex justify-center items-end gap-[56px] max-[1080px]:flex-col max-[1080px]:items-center max-[1080px]:gap-6">
        <div class="bg-surface/70 w-[clamp(280px,28vw,400px)] max-[1080px]:w-[min(92vw,420px)] h-[500px] rounded-[58px] p-6">
          primeiro card
        </div>
        <div class="bg-surface/70 w-[clamp(280px,28vw,400px)] max-[1080px]:w-[min(92vw,420px)] h-[550px] rounded-[58px] p-6">
          segundo card
        </div>
        <div class="bg-surface/70 w-[clamp(280px,28vw,400px)] max-[1080px]:w-[min(92vw,420px)] h-[600px] rounded-[58px] p-6">
          terceiro card
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import NavLink from '../components/ui/NavLink.vue'
import Input from '../components/ui/Input.vue'
// Config único para gerar todas as seções/links do menu mobile
const mobileNav = [
  {
    title: 'Stations by Country',
    links: {
      'Ver todos': '#',
      'Top 10': '#',
      'Explorar': '#',
    },
  },
  {
    title: 'Stations by Language',
    links: {
      'Ver todos': '#',
      'Top 10': '#',
      'Explorar': '#',
    },
  },
]

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>
<style scoped>
.layout-bg {
  background-image: radial-gradient(
      ellipse at center,
      rgba(9, 9, 11, 0) 40%,
      rgba(9, 9, 11, 0.75) 100%
    ),
    url("/bg_1920 1.png");
  background-color: var(--color-bg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
}
</style>
