import api from "../api/axios";

export default{
    getStations(){
        return api.get('/search?limit=1000')
    },
    getStationsByCountry(country) {
        return api.get(`bycountry/${country}`);
    },
    getStationByName(name){
         return api.get(`byname/${name}`)
    },
    getStationByLang(language){
        return api.get(`bylanguage/${language}`)
    }
    

}