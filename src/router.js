import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from './components/HomePage.vue';
import LoginPage from './components/LoginPage.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: LoginPage },
    { path: '/home', component: HomePage, meta: { requiresAuth: true } },
];

const router = new VueRouter({
    routes,
    mode: 'history',
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const isAuthenticated = !!localStorage.getItem('authToken');

        if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
            next({ path: '/' });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
