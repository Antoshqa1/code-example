// import { getLoggedinUser } from './components/auth';

// const user = getLoggedinUser();

import auth from './auth.js'
import tokens from './tokens.js'
import clients from './clients.js'

export default {
    state: {

    },
    getters: {
        cerrentCabinet(state) {
            return auth.state.currentCabinet
        }
    },
    mutations: {
        // login(state) {
        //     state.loading = true;
        //     state.auth_error = null;
        // },
        // loginSuccess(state, payload) {
        //     state.auth_error = null;
        //     state.isLoggedin = true;
        //     state.loading = false;
        //     state.currentUser = Object.assign({}, payload.user, { token: payload.access_token });

        //     localStorage.setItem("user", JSON.stringify(state.currentUser));
        // },
        // loginFailed(state, payload) {
        //     state.loading = false;
        //     state.auth_error = payload.error;
        // },
        // logout(state) {
        //     localStorage.removeItem("user");
        //     state.isLoggedin = false;
        //     state.currentUser = null;
        // },
        // registerSuccess(state, payload) {
        //     state.reg_error = null;
        //     state.registeredUser = payload.user;
        // },
        // registerFailed(state, payload) {
        //     state.reg_error = payload.error;
        // },
    },
    actions: {
        // login(context) {
        //     context.commit("login");
        // }
    },
    modules: {
        auth,
        tokens,
        clients
    }
};