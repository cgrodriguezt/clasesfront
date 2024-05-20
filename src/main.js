import { createApp } from "vue";
import { createPinia } from "pinia";
import { Tooltip } from "bootstrap";
import axios from "axios";
import App from "./App.vue";

/*
TIP: To get started with clean router change path to @/router/clean.ts.
 */
import router from "@/router";

//imports for app initialization
import ApiService from "@/core/services/ApiService";

axios.defaults.baseURL = import.meta.env.BASE_URL;

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Verifica si la respuesta tiene un status 401 (No autorizado)
    if (error.response.status === 401) {
      // Redirige a la página de inicio de sesión u otra acción
      // Puedes ajustar esto según tus necesidades
      window.location.href = "/inicio";
    }
    return Promise.reject(error);
  }
);

const app = createApp(App);

app.config.globalProperties.$axios = axios;

app.use(createPinia());
app.use(router);

ApiService.init(app);

app.directive("tooltip", (el) => {
  new Tooltip(el);
});

app.mount("#app");