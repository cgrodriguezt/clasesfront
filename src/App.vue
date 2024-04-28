<template>
  <div class="w-75">
    <div class="d-flex w-100 align-content-center justify-content-center">
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
    </div>
    <div>
      <productos />
    </div>
  </div>
</template>

<script setup>
import productos from './Pages/administracion/productos/productos.vue';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
</script>