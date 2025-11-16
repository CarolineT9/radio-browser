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
  <div v-if="hasStation" class="fixed bottom-0 left-0 right-0 bg-zinc-800 border-t border-zinc-700 p-3">
    <div class="max-w-5xl mx-auto flex items-center gap-4">
      <img v-if="player.currentStation?.favicon" :src="player.currentStation.favicon" alt="favicon" class="w-8 h-8 rounded" />
      <div class="flex-1 min-w-0">
        <p class="text-zinc-100 font-medium truncate">{{ player.currentStation?.name }}</p>
        <div class="flex items-center gap-4 mt-2">
          <button class="w-10 h-10 flex items-center justify-center" @click="togglePlay" aria-label="Tocar/Pausar">
            <i :class="`mdi ${player.isPlaying ? 'mdi-pause' : 'mdi-play'} text-2xl text-zinc-100`"></i>
          </button>
          <div class="flex-1">
            <input type="range" :value="player.elapsed" min="0" :max="Math.max(player.elapsed, 60)" disabled class="w-full h-1 accent-zinc-100" />
            <div class="flex justify-between text-xs text-zinc-200 mt-1">
              <span>{{ formatTime(player.elapsed) }}</span>
              <span>Ao vivo</span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button class="w-8 h-8 flex items-center justify-center" @click="player.toggleMute()" aria-label="Mutar">
              <i :class="`mdi ${player.isMuted ? 'mdi-volume-off' : 'mdi-volume-high'} text-xl text-zinc-100`"></i>
            </button>
            <input type="range" min="0" max="1" step="0.01" :value="player.volume" @input="onVolumeInput" class="w-24 accent-zinc-100" />
            <button class="w-8 h-8 flex items-center justify-center" @click="player.stop()" aria-label="Parar">
              <i class="mdi mdi-stop text-xl text-zinc-100"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>