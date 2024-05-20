import { createRouter, createWebHistory } from 'vue-router';
import productos from '@/Pages/administracion/productos/productos.vue';
import App from '@/App.vue';
import { useAuthStore } from "@/stores/auth";
import DefaultLayout from '@/components/layouts/defaultLayout.vue';
import AuthLayout from '@/components/layouts/authLayout.vue';
import SignIn from '@/Pages/authentication/SignIn.vue';

const routes = [
    {
        path: '/' ,
        redirect: '/inicio',
        component: DefaultLayout,
        meta: {
            middleware: "auth"
        },
        children: [
            { path: '/inicio', component: App },
            { path: '/productos', component: productos },
            { path: '/usuarios', component: productos },
            { path: '/roles', component: productos },
            { path: '/movimientos', component: productos },
        ]
    } ,
    {
        path: '/',
        component: AuthLayout,
        children: [
            {
                path: "/inicio-sesion",
                component: SignIn,
                name: "sign-in",
                meta: {
                    pageTitle: "Iniciar Sesion",
                },
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
  
    document.title = `SIV`;
    
    // authStore.verifyAuth();
  
    if (to.meta.middleware == "auth") {
      if (authStore.isAuthenticated) {
        next();
      } else {
        next({ name: "sign-in" });
      }
    } else {
      next();
    }
  
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });

export default router;