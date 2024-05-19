<template>
    <div @click="getAction($event, id)">
        <div class="d-flex justify-content-between" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <h2>
                Productos
            </h2>
            <button class="btn btn-primary">Crear Producto</button>
        </div>

        <DataTable
            :columns="columns"
            :data = "data"
            class="table table-hover w-50"            
        />
    </div>

        <ModalProductosVue v-bind:products="products" @saved="dataTable"></ModalProductosVue>
</template>

<script>
import axios from 'axios';
import ModalProductosVue from '../../../components/productos/ModalProductos.vue'
import { onMounted, ref } from 'vue';
import DataTable from 'datatables.net-vue3'
import Select from 'datatables.net-select';
import 'datatables.net-responsive';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
 
DataTable.use(Select);

export default {
    name: "productos-listing",
    components: {
        DataTable,
        ModalProductosVue
    },
    setup(){
        const data = ref([]);
        let products = ref({});
        const columns = [
            {
                title: "<span class='text-start text-gray-500 fw-bold fs-7 text-uppercase gs-0'>Nombre</span>",
                data: "name",
                className: "text-center"
            },
            {
                title: "<span class='text-start text-gray-500 fw-bold fs-7 text-uppercase gs-0'>Stock</span>",
                data: "amount",
                className: "text-center"
            },
            {
                title: "<span class='text-start text-gray-500 fw-bold fs-7 text-uppercase gs-0'>Estado</span>",
                data: "state",
                className: "text-center",
                render: function(data) {
                    let mensaje = (data == 'A') ? `<div class="alert alert-success" role="alert">Activo</div>` : `<div class="alert alert-danger" role="alert">Inactivo</div>`;

                    return mensaje;
                }
            },
            {
                title: "<span class='text-start text-gray-500 fw-bold fs-7 text-uppercase gs-0'>Acciones</span>",
                data: "amount",
                className: "text-center",
                render: function(data, row, full) {
                    let esilo = (full.state == 'A') ? 'btn-danger' : 'btn-success';

                    let activar = `<a href="javascript:void(0)" data-id="${full.id}" data-nombre="${full.name}" data-action="estado" title="Cambio de estado" class="button btn ${esilo}">
                            <i class="button bi bi-shield-fill-x"></i>
                        </a>`;

                        let editar = `<a href="javascript:void(0)" data-id="${full.id}" data-nombre="${full.name}" data-amount="${full.amount}" data-action="editar" title="Editar" class="btn btn-primary button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <i class="bi bi-pencil-square button"></i>
                    </a>`;

                    return `<div class="btn-group">${activar}${editar}</div>`;
                }
            },
        ];

        const getAction = (event) => {
            let target = event.target;
            const id = ref(0);
            
            if(target.classList.contains('button')){
                let dataEdit = (target.parentNode.tagName == 'A') ? target.parentNode.dataset : target.dataset;

                switchCase(dataEdit.action, dataEdit.id, dataEdit.nombre, dataEdit.amount);
            }
        }

        const reloadDataTable = async () => {
            await dataTable();
        };

        const dataTable = async () => {
            try {
                let response = await axios.get('http://localhost:8080/productos/todos');
                data.value = response.data; 
            } catch (error) {
                console.error("Error Al Obtener los productos: ", error);
            }
        }; 

        const switchCase = (action, id, nombre, amount) => {
            switch (action) {
                case 'estado':
                    return cambiarEstado(id);
                case 'editar':
                    products.value.id = id;
                    products.value.name = nombre;
                    products.value.amount = amount;
                    products.value.action = action;
                    break;            
                default:
                    break;
            }
        }

        const cambiarEstado = async (id) => {
            Swal.fire({
                title: "¿Esta Seguro De Cambiar De Estado?",
                text: "Podra Cambiar El Estado En Un Futuro!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si"
            }).then(async (result) => {
                if(result.isConfirmed) {
                    let response = await axios.put(`http://localhost:8080/productos/cambioEstado/${id}`)
                                                .catch(function(error){
                                                    console.log(error)
                                                    mensajes('error', error.code, error.message);
                                                });

                    mensajes('success', 'Cambio de estado exitoso', 'Se realizó el cambio de estado');
                    reloadDataTable();
                    
                }
            });
        }

        const mensajes = (icon, title, description) => {
            Swal.fire({
                icon: icon,
                text: title,
                html: description,
                buttonsStyling: true,
                confirmButtonText: "Continuar!",
                heightAuto: false,
                customClass: {
                    confirmButton: "btn fw-semibold btn-light-primary",
                }
            });
        }

        onMounted(async() => {
            dataTable();
        });

        return {
            data,
            products,
            columns,
            reloadDataTable,
            dataTable,
            getAction
        }
    }
}
</script>

<style>
@import 'datatables.net-dt';
</style>
