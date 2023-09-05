import { createApp } from 'vue';
import App from './App.vue';
import './assets/main.css';
import Home from "@/pages/Home.vue";
import { createWebHistory, createRouter } from "vue-router";
import Cinematique from "@/pages/cinématique/cinématique.vue";
import Constructeur from "@/pages/constructeur/constructeur.vue";
import store from '@/chatBox/store';



const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', component: Home, name: "home" },
        { path: '/cinématique', component: Cinematique, name: "cinematique" },
        { path: '/constructeur-test', component: Constructeur, name:"constructeur-test"}
    ]
});

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
