import axios from "axios";

const api = axios.create({
    baseURL: 'http://de1.api.radio-browser.info/xml/stations/'
})
export default api