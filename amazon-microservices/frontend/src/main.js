import { createApp } from 'vue';
import App from './App.vue';
import config from './app.config';
import axios from 'axios';
import router from './router';
import 'bootstrap';
import vue3StarRatings from "vue3-star-ratings";

createApp(App)
    .use(router)
    .component("vue3-star-ratings", vue3StarRatings)
    .mount('#app')

axios.defaults.baseURL = config.baseUrl;