<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
      <nav class="navbar navbar-expand-lg bg-dark w-100 m-0 p-0" style="height: 70px !important; z-index: 0; position: absolute;">
      </nav>
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark" style="width: 290px !important; z-index: 1024;">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 min-vh-100">
                <div class="d-flex w-100 justify-content-center">
                  <a href="/" class="pb-3 w-50">
                      <img alt="Vue logo" class="logo" src="../../assets/logo.png" width="125" height="125" />
                  </a>
                </div>
                <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li class="nav-item">
                        <a href="/" class="nav-link align-middle px-0">
                            <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">Inicio</span>
                        </a>
                    </li>
                    <li>
                        <a href="#submenu1" data-bs-toggle="collapse" class="nav-link px-0 align-middle">
                            <i class="fs-4 bi bi-building-fill-gear"></i> <span class="ms-1 d-none d-sm-inline">Administración</span> </a>
                        <ul class="collapse nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                            <li class="w-100">
                                <a href="/productos" class="nav-link px-0"> <span class="d-none d-sm-inline">Productos</span></a>
                            </li>
                            <li>
                                <a href="/roles" class="nav-link px-0"> <span class="d-none d-sm-inline">Roles</span></a>
                            </li>
                            <li>
                                <a href="/usuarios" class="nav-link px-0"> <span class="d-none d-sm-inline">Usuarios</span></a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="/movimientos" class="nav-link px-0 align-middle">
                            <i class="fs-4 bi-table"></i> <span class="ms-1 d-none d-sm-inline">Movimientos</span></a>
                    </li>
                </ul>
                <hr>
                <div class="d-flex justify-content-center w-100 mb-4">
                  <button type="button" class="btn btn-secondary">Cerrar Sesión</button>
                </div>
            </div>
        </div>
        <div class="col py-3 w-100 h-100 d-flex justify-content-center card m-5" style="margin-top: 3cm !important;">
          <div class="card-body">
            <RouterView />
          </div>
        </div>
    </div>
</div>
</template>