<template>
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

        <ModalProductosVue @saved="reloadDatatable"></ModalProductosVue>
</template>

<script>
import axios from 'axios';
import ModalProductosVue from '../../../components/productos/ModalProductos.vue'
import { onMounted, ref } from 'vue';
import DataTable from 'datatables.net-vue3'
import Select from 'datatables.net-select';
import 'datatables.net-responsive';
 
DataTable.use(Select);

export default {
    name: "productos-listing",
    components: {
        DataTable,
        ModalProductosVue
    },
    setup(){
        const data = ref([]);
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
                render: function(data) {
                    let activar = `<button type="button" class="btn btn-success">Success</button>`;

                    return activar;
                }
            },
        ];

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
        }

        onMounted(async() => {
            dataTable();
        });

        return {
            data,
            columns,
            reloadDataTable
        }
    }
}
</script>

<style>
@import 'datatables.net-dt';
</style>
