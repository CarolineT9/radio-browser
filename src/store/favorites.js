import { defineStore } from "pinia";

export const useFavoritesStore = defineStore("favorite", {
  state: () => ({
    favoritesStations: JSON.parse(localStorage.getItem("favoritesStations")) || [],
  }),
  actions: {
    saveToLocalStorage() {
      localStorage.setItem("favoritesStations", JSON.stringify(this.favoritesStations));
    },
    addFavorite(station) {
      if (!this.favoritesStations.some((s) => s.stationuuid === station.stationuuid)) {
        this.favoritesStations.push(station);
        this.saveToLocalStorage();
      }
    },
    deleteFavorite(stationId) {
      this.favoritesStations = this.favoritesStations.filter((s) => s.stationuuid !== stationId);
      this.saveToLocalStorage();
    },
    editFavorite(stationId, newName) {
      const station = this.favoritesStations.find((s) => s.stationuuid === stationId);
      if (station) {
        station.name = newName;
        this.saveToLocalStorage();
      }
    },
  },
});

