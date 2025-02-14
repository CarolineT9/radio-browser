import { createApp } from 'vue'
import '@mdi/font/css/materialdesignicons.css'; 
import VueAwesomePaginate from "vue-awesome-paginate";
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()
app.use(VueAwesomePaginate)
app.use(pinia)
app.mount('#app')