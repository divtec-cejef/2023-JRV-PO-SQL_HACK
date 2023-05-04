import {createApp} from 'vue'
import App from './App.vue'

import './assets/main.css'

 import Home from "@/pages/Home.vue";
import CinematiqueDebut from "@/pages/cinématique-début.vue";
import {createWebHistory, createRouter} from "vue-router";

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', component: Home, name: "home" },
        { path: '/cinématique', component: CinematiqueDebut, name: "cinematique" },
    ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')
