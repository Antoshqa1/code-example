// export function registerUser(credentials) {
//     return new Promise((res, rej) => {
//         axios.post('/api/auth/register', credentials)
//             .then(response => {
//                 res(response.data);
//             })
//             .catch(err => {
//                 rej('An error occured.. try again later.')
//             })
//     })
// }

// export function login(credentials) {
//     return new Promise((res, rej) => {
//         axios.post('/api/auth/login', credentials)
//             .then(response => {
//                 res(response.data);
//             })
//             .catch(err => {
//                 rej('Wrong Email/Password combination.')
//             })
//     })
// }

// export function getLoggedinUser() {
//     const userStr = localStorage.getItem('user');

//     if (!userStr) {
//         return null
//     }

//     return JSON.parse(userStr);
// }


export default {
    namespaced: true,

    state: {
        token: null,
        user: null,
        cabinets: null,
        currentCabinet: null
    },
    getters: {
        authenticated(state) {
            return state.token && state.user;
        },
        user(state) {
            return state.user;
        },
        allCabinets(state) {
            return state.cabinets
        },
        currentCabinet(state) {
            return state.currentCabinet
        }
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
        },
        SET_USER(state, data) {
            state.user = data;
        },
        SET_CABINETS(state, cabinet) {
            state.cabinets = cabinet;
        },
        SET_CURRENT_CABINET(state, currentCabinet) {
            state.currentCabinet = currentCabinet
        },
        SET_VKTOKEN(state, VkToken) {
            state.VkToken = VkToken;
        }
    },
    actions: {
        async signIn({ dispatch }, credentials) {
            let response = await axios.post("/api/auth/signin", credentials);
            return dispatch('attempt', response.data.token)
        },
        async attempt({ commit, state }, token) {
            if (token) {
                commit('SET_TOKEN', token);
            }

            if (!state.token) {
                return
            }

            try {
                let response = await axios.get('/api/auth/me')

                commit('SET_USER', response.data.user)
                commit('SET_CABINETS', response.data.cabinets)
                commit('SET_CURRENT_CABINET', response.data.current_cabinet)

            } catch (e) {
                commit('SET_TOKEN', null);
                commit('SET_USER', null);
            }
        },
        signOut({ commit }) {
            return axios.post('/api/auth/signout').then(() => {
                commit('SET_TOKEN', null);
                commit('SET_USER', null);
                commit('SET_CURRENT_CABINET', null);
                commit('SET_CABINETS', null);
                localStorage.removeItem("mtToken");
                localStorage.removeItem("ymToken");
                localStorage.removeItem("vkToken");
            })
        },
        register() {

        }
    }
}