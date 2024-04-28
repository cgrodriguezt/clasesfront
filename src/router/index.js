import { createRouter, createWebHistory } from 'vue-router';
import productos from '@/Pages/administracion/productos/productos.vue';
import App from '@/App.vue';

const routes = [
    { path: '/productos', component: productos }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;