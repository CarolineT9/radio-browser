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
        }
    }


})