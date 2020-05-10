<%-- 
    Document   : comida.jsp
    Created on : 28/08/2019, 09:48:09 AM
    Author     : Andres
--%>

<div class="row">
    <div class="col-xl-12 p-0">
        <!-- Card -->
        <div class="overflow-hidden" id="btnListaPersonal">
            <!-- Card Header -->
            <div class="card-header bg-transparent">
                <h4 class="mb-0" id="titleManagerPersonal">[ 0 ] PERSONAL</h4>
                <input type="hidden" id="pagePersonal" value="1">
            </div>
            <!-- /card header -->
            <!-- Card Body -->
            <div class=" card-body p-0">
                <form id="FrmPersonal">
                    <div class="input-group search-box mw-100">
                        <input type="search" id="txtFilterDniPersonal" class="form-control form-control-sm"
                            placeholder="FILTRO DNI" data-toggle="tooltip" data-placement="left"
                            data-original-title="Buscar">
                        <button type="submit" class="search-icon">
                            <i class="icon icon-search icon-lg"></i></button>
                        <div class="input-group-append">
                            <select class="form-control form-control-sm" id="txtFilterEstadoPersonal">
                                <option selected value="1">ACTIVOS</option>
                                <option value="0">INACTIVOS</option>
                                <option value="-1">TODOS</option>
                            </select>
                        </div>
                        <button type="button" class="btn btn-primary btn-sm ml-4" id="btnOpenNewPersonal"
                            data-toggle="tooltip" title="Agregar Personal"><i class="icon icon-addnew"></i></button>
                    </div>
                </form>


                <div class="w-100 ps-custom-scrollbar mb-0 ps pb-5">
                    <!-- Card Body -->
                    <div class="dt-card__body mt-4 p-0  dt-social-card border border-w-2 border-light-teal"
                        style="min-width: 725px;">

                        <!-- Card Heading -->
                        <div class="dt-card__heading">

                            <!-- Widget Item -->
                            <div class="dt-widget__item border-bottom bg-primary pl-4 m-0 pb-2 pt-2 pr-1">

                                <!-- Widget Info -->
                                <div class="dt-widget__info text-truncate">
                                    <p class="dt-card__title text-white f-14">DNI</p>
                                </div>
                                <!-- /widget info -->

                                <!-- Widget Info -->
                                <div class="dt-widget__info text-truncate">
                                    <p class="dt-card__title text-white f-14">NOMBRE /<br>CARGO</p>
                                </div>
                                <!-- /widget info -->

                                <!-- Widget Info -->
                                <div class="dt-widget__info text-truncate">
                                    <p class="dt-card__title text-white f-14">&Aacute;REA</p>
                                </div>
                                <!-- /widget info -->

                            </div>
                            <!-- /widgets item -->

                        </div>
                        <!-- /card heading -->
                        <!-- Widget -->
                        <div class="dt-widget dt-widget-hover  " id="tbodyPersonal">
                        </div>
                        <!-- /widget -->
                        <!-- /card body -->
                    </div>
                </div>
                <!-- /card -->


                <div class="row mt-2">
                    <div class="col-md-2 col-sm-3 col-4">
                        <select id="sizePagePersonal" class="form-control form-control-sm select2-single">
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                    <div class="col-md-10 col-sm-9 col-8">
                        <nav aria-label="Page navigation example">
                            <ul id="paginationPersonal" class="pagination pagination-sm justify-content-end">
                            </ul>
                        </nav>
                    </div>
                </div>

                <!-- /card body -->
            </div>
            <!-- /card -->
        </div>


        <!-- Card -->
        <div class="card " id="btnOpenPersonalDetalle" style="display:none">
            <!-- Card Header -->
            <div class="dt-card__header mb-0 p-0 pt-5 pb-3">
                <!-- Card Tools -->
                <div class="dt-card__tools">
                    <button type="button" class="btn btn-primary btn-sm dt-avatar" id="btnRegresarLista"
                        data-toggle="tooltip" title="Regresar a la Lista">
                        <i class="icon icon-reply icon-lg"></i></button>
                </div>
                <!-- /card tools -->
                <!-- Card Heading -->
                <div class="dt-card__heading">
                    <h4 class="dt-card__title text-primary text-center" id="txtTituloModalPersonal">[ 0 ] PERSONAL
                    </h4>
                </div>
                <!-- /card heading -->

            </div>

            <!-- /card header -->
            <!-- Card Body -->
            <div class=" card-body p-0">

                <div class="tabs-container">
                    <!-- Card Header -->
                    <div class="card-header">
                        <!-- Tab Navigation -->
                        <ul class="card-header-pills nav nav-pills nav-fill" role="tablist">
                            <div class="col-6">
                                <li class="nav-item">
                                    <a class="nav-link  active" id="btnDatosGenerales" data-toggle="tab"
                                        href="#tab-datos-generales" role="tab" aria-controls="tab-datos-generales"
                                        aria-="true">DATOS GENERALES</a>
                                </li>
                            </div>
                            <div class="col-6">
                                <li class="nav-item">
                                    <a class="nav-link" id="btnDatosLaborales" data-toggle="tab"
                                        href="#tab-datos-laborales" role="tab" aria-controls="tab-datos-laborales"
                                        aria-="true">DATOS LABORALES</a>
                                </li>
                            </div>
                            <div class="col-12">
                                <li class="nav-item">
                                    <a class="nav-link" id="btnDatosAcceso" data-toggle="tab" href="#tab-datos-acceso"
                                        role="tab" aria-controls="tab-datos-acceso" aria-="true">DATOS DE ACCESO</a>
                                </li>
                            </div>
                        </ul>
                        <!-- /tab navigation -->
                    </div>
                    <!-- /card header -->

                    <!-- Tab Content -->
                    <div class="tab-content">
                        <form id="FrmPersonalModal">
                            <!-- Tab Pane DATOS GENERALES-->
                            <div id="tab-datos-generales">
                                <div class="card-body p-3">
                                    <div class="row">
                                        <div class="form-group col-lg-3 col-sm-4 col-6">
                                            <label for="txtTipoDocumento">TIPO</label>
                                            <select class="form-control form-control-sm" id="txtTipoDocumento">
                                                <option selected value="1">DNI</option>
                                                <option value="2">CARNET DE EXTRANJERIA</option>
                                                <option value="3">OTRO</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-lg-3 col-sm-4 col-6">
                                            <label for="txtDniPersonal">N� DOCUMENTO</label>
                                            <input maxlength="8" class="form-control form-control-sm"
                                                id="txtDniPersonal" type="text" placeholder="N� DOCUMENTO">
                                        </div>

                                        <div class="form-group col-lg-3 col-sm-4 col-6 mb-3">
                                            <label for="txtFechaNaciPersonal">Fecha de Nacimiento</label>
                                            <div class="input-group">
                                                <input type="text" class="form-control form-control-sm"
                                                    id="txtFechaNaciPersonal" placeholder="DD/MM/AAAA">
                                                <div class="input-group-append">
                                                    <button type="button" id="btnEliminarFechaNoticia"
                                                        data-toggle="tooltip" title="Eliminar Fecha"
                                                        class="btn btn-primary btn-sm"><i
                                                            class="fa fa-trash"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group col-lg-3 col-sm-4 col-6">
                                            <label for="txtApPaternoPersonal">AP. PATERNO</label>
                                            <input class="form-control form-control-sm" id="txtApPaternoPersonal"
                                                type="text" placeholder="AP. PATERNO">
                                        </div>
                                        <div class="form-group col-lg-3 col-sm-4 col-6">
                                            <label for="txtApMaternoPersonal">AP. MATERNO</label>
                                            <input class="form-control form-control-sm" id="txtApMaternoPersonal"
                                                type="text" placeholder="AP. MATERNO">
                                        </div>
                                        <div class="form-group col-lg-3 col-sm-4 col-6">
                                            <label for="txtNombrePersonal">NOMBRES</label>
                                            <input class="form-control form-control-sm" id="txtNombrePersonal"
                                                type="text" placeholder="NOMBRES">
                                        </div>
                                        <div class="form-group col-lg-3 col-sm-4 col-6">
                                            <label for="txtSexoPersonal">SEXO</label>
                                            <select class="form-control form-control-sm" id="txtSexoPersonal">
                                                <option selected value="-1">seleccione...</option>
                                                <option value="1">MASCULINO</option>
                                                <option value="0">FEMENINO</option>
                                            </select>
                                        </div>

                                        <div class="form-group col-lg-3 col-sm-4 col-6 mb-3">
                                            <label for="txtCelularPersonal">CELULAR</label>
                                            <div class="input-group input-group-sm mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text bg-primary"><i
                                                            class="text-white icon icon-phone-o"></i></span>
                                                </div>
                                                <input type="text" maxlength="9"
                                                    class="form-control form-control-sm soloNumeros"
                                                    id="txtCelularPersonal" aria-label="Small" placeholder="CELULAR">
                                            </div>
                                        </div>
                                        <div class="form-group col-lg-6 col-sm-4">
                                            <label for="txtEmailPersonal">EMAIL</label>
                                            <div class="input-group input-group-sm mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text bg-primary"><i
                                                            class="text-white icon icon-mail"></i></span>
                                                </div>
                                                <input type="text" class="form-control form-control-sm"
                                                    id="txtEmailPersonal" aria-label="Small" placeholder="EMAIL">
                                            </div>
                                        </div>
                                        <div class="form-group col-lg-6 col-sm-12 ">
                                            <label for="txtDireccionPersonal">DIRECCI�N</label>
                                            <input class="form-control form-control-sm" id="txtDireccionPersonal"
                                                type="text" placeholder="DIRECCI�N">
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <!-- /tab pane-->

                            <!-- Tab Pane DATOS LABORALES-->
                            <div id="tab-datos-laborales" style="display:none">

                                <div class="card-body p-3 ">

                                    <div class="row ml-5 mr-5 pr-5 pl-5">
                                        <div class="form-group col-lg-6 col-sm-6 ">
                                            <label for="txtAreaPersonal">�REA
                                            </label>
                                            <div class="input-group">
                                                <input type="text" class="form-control form-control-sm"
                                                    id="txtAreaPersonal" aria-describedby="nombre"
                                                    placeholder="Click en el bot�n para seleccionar. . ." disabled="">
                                                <div class="input-group-append">
                                                    <button type="button" id="btnSeleccionarArea"
                                                        class="btn btn-primary btn-sm"><i
                                                            class="icon icon-subscribe"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group col-lg-6 col-sm-6 ">
                                            <label for="txtCargoPersonal">CARGO
                                            </label>
                                            <div class="input-group">
                                                <input type="text" class="form-control form-control-sm"
                                                    id="txtCargoPersonal" aria-describedby="nombre"
                                                    placeholder="Click en el bot�n para seleccionar. . ." disabled="">
                                                <div class="input-group-append">
                                                    <button type="button" id="btnSeleccionarCargo"
                                                        class="btn btn-primary btn-sm"><i
                                                            class="icon icon-subscribe"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group col-lg-6 col-sm-6 ">
                                            <label for="txtTipoPersonal">TIPO DE PERSONAL</label>
                                            <select class="form-control form-control-sm" id="txtTipoPersonal">
                                                <option selected value="-1">Seleccione...</option>
                                                <option value="1">NOMBRADO</option>
                                                <option value="2">CONTRATADO</option>
                                                <option value="3">PRACTICANTE</option>
                                            </select>
                                        </div>

                                        <div class="form-group col-lg-6 col-sm-6 ">
                                            <label for="txtEstadoPersonal">ESTADO</label>
                                            <select class="form-control form-control-sm" id="txtEstadoPersonal">
                                                <option selected value="-1">Seleccione...</option>
                                                <option value="1">ACTIVO</option>
                                                <option value="0">INACTIVO</option>
                                            </select>
                                        </div>


                                        <div class="form-group col-12 text-center">
                                            <button type="submit" id="btnGuardarUsuario"
                                                class="btn btn-primary btn-sm">GUARDAR</button>
                                        </div>


                                    </div>


                                </div>
                            </div>
                            <!-- /tab pane-->
                        </form>
                        <!-- Tab Pane DATOS ACCESO-->
                        <div id="tab-datos-acceso" style="display:none">
                            <div class="card-body ">
                                <form id="FrmUsuarioModal">
                                    <div class="row">
                                        <div class="form-group col-lg-4 col-sm-6">
                                            <label for="txtNombreUsuario">NOMBRE USUARIO</label>
                                            <input class="form-control form-control-sm" id="txtNombreUsuario"
                                                type="text" placeholder="NOMBRE USUARIO">
                                        </div>
                                        <div class="form-group col-lg-4 col-sm-6 col-6 ">
                                            <label for="txtLoginUsuario">LOGIN </label>
                                            <div class="input-group input-group-sm mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text bg-primary"><i
                                                            class="text-white icon icon-user"></i></span>
                                                </div>
                                                <input type="text" class="form-control form-control-sm"
                                                    id="txtLoginUsuario" placeholder="LOGIN" aria-label="Small">
                                            </div>

                                        </div>
                                        <div class="form-group col-lg-4 col-sm-6 col-6">
                                            <label for="txtPassUsuario">CONTRASE�A</label>
                                            <div class="input-group">
                                                <input class="form-control form-control-sm" id="txtPassUsuario"
                                                    type="text" placeholder="Ingrese password. . .">
                                                <div class="input-group-append">
                                                    <button type="button" class="btn btn-sm btn-primary"
                                                        id="btnMostrarPass">
                                                        <i id="icono_mostrar_pass" class="fas fa-eye-slash"></i>
                                                    </button>
                                                </div>
                                            </div>

                                        </div>

                                        <div class="form-group col-lg-4 col-sm-6 ">
                                            <label for="txtPerfilUsuario">PERFIL
                                            </label>
                                            <div class="input-group">
                                                <input type="text" class="form-control form-control-sm"
                                                    id="txtPerfilUsuario" aria-describedby="nombre"
                                                    placeholder="Click en el bot�n para seleccionar. . ." disabled="">
                                                <div class="input-group-append">
                                                    <button type="button" id="btnSeleccionarPerfil"
                                                        class="btn btn-primary btn-sm"><i
                                                            class="icon icon-subscribe"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group col-lg-4 col-sm-6">
                                            <label for="txtTipoPerfilUsuario">TIPO PERFIL</label>
                                            <select class="form-control form-control-sm" id="txtTipoPerfilUsuario">
                                                <option selected value="-1">Seleccione...</option>
                                                <option style="display:none" value="0">SISTEMAS</option>
                                                <option value="1">ADMIN</option>
                                                <option value="2">FARMACIA</option>
                                                <option value="3">ODONTOLOG�A</option>
                                                <option value="4">OBSTETR�CIA</option>
                                                <option value="5">SOCIAL</option>
                                                <option value="6">COMEDOR</option>
                                                <option value="7">DEPORTE</option>
                                                <option value="100">Invitado(solo el inicio)</option>
                                                <option value="10">Todo el Servicio M�dico(enfermeria, medicina,
                                                    farmacia, obstetricia))</option>
                                                <option value="11">Psicopedagogia (medicina, psicopedagogia, social)
                                                </option>

                                            </select>
                                        </div>
                                        <div class="form-group col-lg-4 col-sm-6">
                                            <label for="txtEstadoUsuario">ESTADO</label>
                                            <select class="form-control form-control-sm" id="txtEstadoUsuario">
                                                <option selected value="1">HABILITADO</option>
                                                <option value="2">DESHABILITADO</option>

                                            </select>
                                        </div>
                                        <div class="form-group col-12 text-center">
                                            <button type="submit" id="btnGuardarUsuario"
                                                class="btn btn-primary btn-sm">ACTUALIZAR</button>
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                        <!-- /tab pane-->
                    </div>
                    <!-- /tab content -->
                </div>
                <!-- /card body -->
            </div>
            <!-- /card -->
        </div>
    </div>
</div>

<div class="modal fade" id="modalCargandoPersonal" data-backdrop="static" data-keyboard="false" tabindex="-1"
    role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                        aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Cargando Personales. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modalCargandoUsuario" data-backdrop="static" data-keyboard="false" tabindex="-1"
    role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                        aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Cargando usuarios. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--T: AREA SELECTED-->
<div id="ventanaModalSelectedAreaC" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
    data-keyboard="false" style="padding-top: 2%; overflow-y: visible;background-color: rgba(0,0,0,.2)">
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="border-color: #0085c1; border-width: 4px;">
            <div class="modal-header">
                <h5 class="mb-0" id="titleManagerAreaC"><strong>[ 0 ]
                        �REAS</strong></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pb-0 pt-0">
                <div class="row">
                    <div class="col-12">
                        <input type="hidden" id="pageAreaC" value="1">
                        <form id="FrmAreaC">
                            <div class="row mt-3">
                                <div class="input-group col-12">
                                    <input type="text" id="txtFilterAreaC" class="form-control form-control-sm mr-3"
                                        placeholder="INGRESE FILTRO . . .">
                                    <button type="submit" id="btnBuscarAreaC" class="btn btn-primary btn-xs"
                                        data-toggle="tooltip" title="Buscar Pregunta"><i class="fa fa-search"
                                            aria-hidden="true"></i>
                                        BUSCAR</button>
                                </div>
                            </div>
                        </form>
                        <div class="row pl-5 pr-5 mb-2">
                            <div class="table-responsive">
                                <table class="table mb-0 table-fluid">
                                    <thead>
                                        <tr>
                                            <th class="align-middle text-left">�rea</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyAreaC">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row mt-2 mb-2" style="display: none">
                            <div class="col-sm-4 mt-2">
                                <select id="sizePageAreaC"
                                    class="form-control form-control-sm sisbu-cursor-mano combo-paginar">
                                    <option value="5">05</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>
                            <div class="col-sm-8 mt-2">
                                <nav aria-label="Page navigation">
                                    <ul id="paginationAreaC" class="pagination justify-content-end">
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal"
                    id="btnCancelSelectionAreaC"><i class="fas fa-ban"></i>
                    CANCELAR</button>
                <button type="button" id="btn-selecionar-areac" class="btn btn-primary btn-xs"><i
                        class="fas fa-check"></i> SELECCIONAR</button>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoSelectedAreaC" data-backdrop="static" data-keyboard="false" tabindex="-1"
    role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.3)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                        aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Cargando �reas. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--T: CARGO SELECTED-->
<div id="ventanaModalSelectedCargoC" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
    data-keyboard="false" style="padding-top: 2%; overflow-y: visible;background-color: rgba(0,0,0,.2)">
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="border-color: #0085c1; border-width: 4px;">
            <div class="modal-header">
                <h5 class="mb-0" id="titleManagerCargoC"><strong>[ 0 ]
                        CARGOS</strong></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pb-0 pt-0">
                <div class="row">
                    <div class="col-12">
                        <input type="hidden" id="pageCargoC" value="1">
                        <form id="FrmCargoC">
                            <div class="row mt-3">
                                <div class="input-group col-12">
                                    <input type="text" id="txtFilterCargoC" class="form-control form-control-sm mr-3"
                                        placeholder="INGRESE FILTRO . . .">
                                    <button type="submit" id="btnBuscarCargoC" class="btn btn-primary btn-xs"
                                        data-toggle="tooltip" title="Buscar Pregunta"><i class="fa fa-search"
                                            aria-hidden="true"></i>
                                        BUSCAR</button>
                                </div>
                            </div>
                        </form>
                        <div class="row pl-5 pr-5 mb-2">
                            <div class="table-responsive">
                                <table class="table mb-0 table-fluid">
                                    <thead>
                                        <tr>
                                            <th class="align-middle text-left">Cargos</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyCargoC">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row mt-2 mb-2" style="display: none">
                            <div class="col-sm-4 mt-2">
                                <select id="sizePageCargoC"
                                    class="form-control form-control-sm sisbu-cursor-mano combo-paginar">
                                    <option value="5">05</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>
                            <div class="col-sm-8 mt-2">
                                <nav aria-label="Page navigation">
                                    <ul id="paginationCargoC" class="pagination justify-content-end">
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal"
                    id="btnCancelSelectionCargoC"><i class="fas fa-ban"></i>
                    CANCELAR</button>
                <button type="button" id="btn-selecionar-cargoc" class="btn btn-primary btn-xs"><i
                        class="fas fa-check"></i> SELECCIONAR</button>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoSelectedCargoC" data-backdrop="static" data-keyboard="false" tabindex="-1"
    role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.3)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                        aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Cargando Cargos. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--T: PERFIL SELECTED-->
<div id="ventanaModalSelectedPerfilC" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
    data-keyboard="false" style="padding-top: 2%; overflow-y: visible;background-color: rgba(0,0,0,.2)">
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="border-color: #0085c1; border-width: 4px;">
            <div class="modal-header">
                <h5 class="mb-0" id="titleManagerPerfilC"><strong>[ 0 ]
                        PERFIL</strong></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pb-0 pt-0">
                <div class="row">
                    <div class="col-12">
                        <input type="hidden" id="pagePerfilC" value="1">
                        <form id="FrmPerfilC">
                            <div class="row mt-3">
                                <div class="input-group col-12">
                                    <input type="text" id="txtFilterPerfilC" class="form-control form-control-sm mr-3"
                                        placeholder="INGRESE FILTRO . . .">
                                    <button type="submit" id="btnBuscarPerfilC" class="btn btn-primary btn-xs"
                                        data-toggle="tooltip" title="Buscar Pregunta"><i class="fa fa-search"
                                            aria-hidden="true"></i>
                                        BUSCAR</button>
                                </div>
                            </div>
                        </form>
                        <div class="row pl-5 pr-5 mb-2">
                            <div class="table-responsive">
                                <table class="table mb-0 table-fluid">
                                    <thead>
                                        <tr>
                                            <th class="align-middle text-left">Perfil</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyPerfilC">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row mt-2 mb-2" style="display: none">
                            <div class="col-sm-4 mt-2">
                                <select id="sizePagePerfilC"
                                    class="form-control form-control-sm sisbu-cursor-mano combo-paginar">
                                    <option value="5">05</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>
                            <div class="col-sm-8 mt-2">
                                <nav aria-label="Page navigation">
                                    <ul id="paginationPerfilC" class="pagination justify-content-end">
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal"
                    id="btnCancelSelectionPerfilC"><i class="fas fa-ban"></i>
                    CANCELAR</button>
                <button type="button" id="btn-selecionar-perfilc" class="btn btn-primary btn-xs"><i
                        class="fas fa-check"></i> SELECCIONAR</button>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoSelectedPerfilC" data-backdrop="static" data-keyboard="false" tabindex="-1"
    role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.3)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                        aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Cargando Perfiles. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>