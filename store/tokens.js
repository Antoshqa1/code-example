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

import axios from "axios";

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
        VkToken: null,
        YMToken: null,
        MTToken: null
    },
    getters: {
        mttoken(state) {
            return state.MTToken
        }
    },
    mutations: {
        SET_VKTOKEN(state, VkToken) {
            state.VkToken = VkToken;
        },
        SET_YMTOKEN(state, YMToken) {
            state.YMToken = YMToken;
        },
        SET_MTTOKEN(state, MTToken) {
            state.MTToken = MTToken;
        }
    },
    actions: {}
}