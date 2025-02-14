import api from "../api/axios";

export default{
    getStations(){
        return api.get('search?limit=1000')
    },
    getStationsByCountry(nameCountry) {
        return api.get(`bycountry/${nameCountry}`);
    },
    getStationInput(query){
        return api.get(`byname/${query}`)
    }

}