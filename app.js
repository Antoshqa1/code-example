require('./bootstrap');
window.Vue = require('vue');

import VueRouter from 'vue-router';
import routes from './routes';
import Vuex from 'vuex';
import Vuetify from './vuetify'
import VueApexCharts from 'vue-apexcharts'
// import VeeValidate from 'vee-validate';

import storeData from './store/store';

Vue.component(
    'main-app',
    require('./components/MainApp.vue').default
);

Vue.use(VueRouter);
// Vue.use(VeeValidate); 
Vue.use(Vuex);
Vue.use(VueApexCharts)

const store = new Vuex.Store(storeData);
store.subscribe((mutation) => {
    switch (mutation.type) {
        case 'auth/SET_TOKEN':
            if (mutation.payload) {
                axios.defaults.headers.common['Authorization'] = 'Bearer' + mutation.payload
                localStorage.setItem('token', mutation.payload)
            } else {
                axios.defaults.headers.common['Authorization'] = null
                localStorage.removeItem('token')
            }
            break;
    }
})

store.dispatch('auth/attempt', localStorage.getItem('token')).then(() => {
    const app = new Vue({
        el: '#app',
        router: new VueRouter(routes),
        store: store,
        vuetify: Vuetify,

    });
})