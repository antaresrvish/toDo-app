import { createRouter, createWebHistory } from 'vue-router';
import Index from '../views/index.vue';
import Login from '../views/login.vue';
import Register from '../views/register.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Index,
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const isLoggedIn = localStorage.getItem('token') !== null;
    if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router;
