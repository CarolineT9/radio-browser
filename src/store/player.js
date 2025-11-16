import { defineStore } from "pinia";
import { Howl } from "howler";

export const usePlayerStore = defineStore("player", {
  state: () => ({
    currentStation: null,
    sound: null,
    isPlaying: false,
    volume: 1,
    isMuted: false,
    elapsed: 0,
    _timer: null,
  }),
  actions: {
    _clearTimer() {
      if (this._timer) {
        clearInterval(this._timer);
        this._timer = null;
      }
    },
    _startTimer() {
      this._clearTimer();
      this._timer = setInterval(() => {
        if (this.sound) {
          const pos = this.sound.seek() || 0;
          this.elapsed = Math.floor(pos);
        }
      }, 500);
    },
    _cleanupSound() {
      if (this.sound) {
        try {
          this.sound.unload();
        } catch {}
        this.sound = null;
      }
      this._clearTimer();
      this.elapsed = 0;
      this.isPlaying = false;
    },
    play(station) {
      if (!station || !station.url) return;
      if (this.sound) {
        this._cleanupSound();
      }
      this.currentStation = station;
      this.sound = new Howl({
        src: [station.url],
        html5: true,
      });
      this.sound.volume(this.volume);
      this.sound.mute(this.isMuted);
      this.sound.on("playerror", (_id, error) => {
        console.error("Erro ao reproduzir rádio:", error);
      });
      this.sound.on("play", () => {
        this.isPlaying = true;
        this._startTimer();
      });
      this.sound.on("pause", () => {
        this.isPlaying = false;
        this._clearTimer();
      });
      this.sound.on("stop", () => {
        this.isPlaying = false;
        this._clearTimer();
        this.elapsed = 0;
      });
      this.sound.play();
      this.isPlaying = true;
    },
    pause() {
      if (this.sound && this.isPlaying) {
        this.sound.pause();
        this.isPlaying = false;
        this._clearTimer();
      }
    },
    resume() {
      if (this.sound && !this.isPlaying) {
        this.sound.play();
        this.isPlaying = true;
        this._startTimer();
      }
    },
    stop() {
      if (this.sound) {
        try {
          this.sound.stop();
        } catch {}
      }
      this._cleanupSound();
    },
    setVolume(v) {
      this.volume = v;
      if (this.sound) this.sound.volume(v);
      if (this.isMuted && v > 0) {
        this.isMuted = false;
        if (this.sound) this.sound.mute(false);
      }
    },
    toggleMute() {
      this.isMuted = !this.isMuted;
      if (this.sound) this.sound.mute(this.isMuted);
    },
  },
});