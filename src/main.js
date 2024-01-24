import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "./assets/scss/app.scss";


Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
    render: (h) => h(App),
    router,
}).$mount('#app');
