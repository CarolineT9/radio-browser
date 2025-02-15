import { defineStore } from "pinia";

export const useFavoritesStore = defineStore('favorite',{

    state: () =>({
        favoritesStations: ('station', [])
    }),

    actions:{
        addFavorite(station){
            const stationFound = this.favoritesStations.find(s => s.name === station.name)
            if(stationFound){
                return
            }else{
                this.favoritesStations.push(station)
            }
        },
        deleteFavorite(stationId){
            const index = this.favoritesStations.findIndex(s => s.stationuuid === stationId)
            this.favoritesStations.splice(index,1)
        },
        editFavorite(stationId, newName) {
            const stationIndex = this.favoritesStations.findIndex(s => s.stationuuid === stationId);
            if (stationIndex !== -1) {
                this.favoritesStations[stationIndex].name = newName;
            }
        }
    }


})