<template>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" ref="modalProductos" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Crear Producto</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="formCrear" @submit.prevent="guardar()">
                    <div class="mb-3">
                        <label for="nombre" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="nombre" v-model="productos.name">
                    </div>
                    <div class="mb-3">
                        <label for="amount" class="form-label">stock</label>
                        <input type="text" class="form-control" id="amount" v-model="productos.amount">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="submit" form="formCrear" class="btn btn-primary">Guardar</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted, watchEffect } from 'vue';
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';

export default defineComponent({
    name: 'modal-products',
    props:{
        products: {}
    },
    setup(props, { emit }) {
        const productos = ref({});
        const modalProductos = ref(null);
        const action = ref('');

        // const onModalShown = (async () => {
        //     productos.value = { ...props.products };
        // })
        
        // onMounted(async() => {
        //     modalProductos.value.addEventListener('shown.bs.modal', onModalShown);
        // });

        watchEffect(() => {
            productos.value = { ...props.products };
            productos.value.edit = (props.products.action == 'editar');
        });
        
        const guardar = async() => {
            let ruta = (props.products.action == 'editar') ? `editar/${props.products.id}` : 'crear';
            let peticion = (props.products.action == 'editar') ? axios.put : axios.post;
            try {
                let response = await peticion(`http://localhost:8080/productos/${ruta}`, productos.value);

                Swal.fire({
                    title: response.data.message.title,
                    text: response.data.message.description,
                    icon: "success"
                }).then(() => {
                    hideModal(modalProductos.value);
                    emit('saved');
                    productos.value = {};
                });
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: error.message.description,
                    icon: "error"
                });
            }
            
        }

        const hideModal = (modalEl) => {
            if (!modalEl) {
                return;
            }

            const myModal = Modal.getInstance(modalEl);
            myModal?.hide();
        };

        return {
            guardar,
            productos,
            modalProductos
        }
    }
})
</script>