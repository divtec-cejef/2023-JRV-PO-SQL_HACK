// store.js (dans votre fichier de configuration Vuex)
import { createStore } from 'vuex';

export default createStore({
    state: {
        messages: [] // Exemple de propriété 'messages' dans l'état
    },
    mutations: {
        addMessage(state, message) {
            state.messages.push(message);
        }
    },
    actions: {
        // Vos actions si nécessaire
    },
    getters: {
        // Vos getters si nécessaire
    }
});
