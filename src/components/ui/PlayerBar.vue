<script setup>
import { computed } from "vue";
import { usePlayerStore } from "../../store/player";

const player = usePlayerStore();

const hasStation = computed(() => !!player.currentStation);

const formatTime = (s) => {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m.toString().padStart(2, "0")}:${r.toString().padStart(2, "0")}`;
};

const togglePlay = () => {
  if (!player.sound && player.currentStation) {
    player.play(player.currentStation);
  } else if (player.isPlaying) {
    player.pause();
  } else {
    player.resume();
  }
};

const onVolumeInput = (e) => {
  const v = Number(e.target.value);
  player.setVolume(v);
};
</script>

<template>
  <div v-if="hasStation" class="fixed bottom-0 left-0 right-0 bg-zinc-900/80 backdrop-blur border-t border-zinc-700 p-3 shadow-lg">
    <div class="max-w-6xl mx-auto flex items-center gap-5">
      <img v-if="player.currentStation?.favicon" :src="player.currentStation.favicon" alt="favicon" class="w-9 h-9 rounded-md" />
      <div class="flex-1 min-w-0">
        <p class="text-white font-semibold truncate">{{ player.currentStation?.name }}</p>
        <div class="flex items-center gap-4 mt-2">
          <button class="w-10 h-10 flex items-center justify-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900" @click="togglePlay" aria-label="Tocar/Pausar">
            <i :class="`mdi ${player.isPlaying ? 'mdi-pause' : 'mdi-play'} text-2xl text-white`"></i>
          </button>
          <div class="flex-1">
            <input type="range" :value="player.elapsed" min="0" :max="Math.max(player.elapsed, 60)" disabled class="w-full h-1 accent-emerald-500" aria-label="Progresso ao vivo" />
            <div class="flex justify-between text-xs text-zinc-300 mt-1">
              <span>{{ formatTime(player.elapsed) }}</span>
              <span class="text-emerald-400">Ao vivo</span>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <button class="w-9 h-9 flex items-center justify-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900" @click="player.toggleMute()" aria-label="Mutar">
              <i :class="`mdi ${player.isMuted ? 'mdi-volume-off' : 'mdi-volume-high'} text-xl text-white`"></i>
            </button>
            <input type="range" min="0" max="1" step="0.01" :value="player.volume" @input="onVolumeInput" class="w-28 accent-emerald-500" aria-label="Volume" />
            <button class="w-9 h-9 flex items-center justify-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900" @click="player.stop()" aria-label="Parar">
              <i class="mdi mdi-stop text-xl text-white"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>