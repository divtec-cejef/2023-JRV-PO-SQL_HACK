const state = {
    messages: []
};

const mutations = {
    addMessage(state, message) {
        state.messages.push({
            id: state.messages.length + 1,
            text: message,
            sender: 'You'
        });
    }
};

const actions = {};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
