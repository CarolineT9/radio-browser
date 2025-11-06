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
        <DesktopNavGroup 
          :sections="desktopNav"
          :separators="true" 
        />
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
import DesktopNavGroup from '../components/ui/DesktopNavGroup.vue'
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

// Config para menu desktop usando title/subtitle
const desktopNav = [
  {
    title: 'Stations',
    subtitle: 'by Country',
    links: {
      'Ver todos': '#',
      'Top 10': '#',
      'Explorar': '#',
    },
    separators: true,
    dropdownWidthClass: 'w-[280px]'
  },
  {
    title: 'Stations',
    subtitle: 'by Name',
    links: {
      'Ver todos': '#',
      'Top 10': '#',
      'Explorar': '#',
    },
    separators: true,
    dropdownWidthClass: 'w-[280px]'
  },
  {
    title: 'Stations',
    subtitle: 'by Language',
    links: {
      'Ver todos': '#',
      'Top 10': '#',
      'Explorar': '#',
    },
    separators: true,
    dropdownWidthClass: 'w-[280px]'
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
