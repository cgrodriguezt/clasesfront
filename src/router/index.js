import { createRouter, createWebHistory } from 'vue-router';
import productos from '@/Pages/administracion/productos/productos.vue';

const routes = [
    { path: '/productos', component: productos },
    { path: '/usuarios', component: productos },
    { path: '/roles', component: productos },
    { path: '/movimientos', component: productos },
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;