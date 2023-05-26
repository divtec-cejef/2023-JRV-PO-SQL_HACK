import {createApp} from 'vue'
import App from './App.vue'

import './assets/main.css'

import Home from "@/pages/Home.vue";
import CinematiqueDebut from "@/pages/cinématique/cinématique.vue";
import {createWebHistory, createRouter} from "vue-router";
import ConstructeurTest from "@/pages/constructeur/constructeur.vue";
import Cinématique from "@/pages/cinématique/cinématique.vue";
import Constructeur from "@/pages/constructeur/constructeur.vue";

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', component: Home, name: "home" },
        { path: '/cinématique', component: Cinématique, name: "cinematique" },
        { path: '/constructeur-test', component: Constructeur, name:"constructeur-test"}
    ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')