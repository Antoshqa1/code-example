export default {
    namespaced: true,

    state: {
        clients: null,
    },
    getters: {
        clients(state) {
            return state.clients;
        },
    },
    mutations: {
        SET_CLIENTS(state, clients) {
            state.clients = clients;
        },
    },
    actions: {
        // signIn() {},
    }
}