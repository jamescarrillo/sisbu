<%-- 
    Document   : comida.jsp
    Created on : 28/08/2019, 09:48:09 AM
    Author     : Andres
--%>

<div class="row">
    <div class="col-xl-12 p-0">
        <!-- Card -->

        <div class="overflow-hidden" id="ListaUsuario">
            <!-- Card Header -->
            <div class="card-header bg-transparent pl-0">
                <h4 class="mb-0" id="titleManagerUsuario">[ 0 ] USUARIOS</h4>
                <input type="hidden" id="pageUsuario" value="1">
            </div>
            <!-- /card header -->
            <!-- Card Body -->
            <div class="card-body p-0">
                <form id="FrmUsuario">
                    <div class="input-group search-box mw-100">
                        <input type="search" id="txtFilterUsuario" class="form-control form-control-sm"
                            placeholder="Filtrar Usuario. . ." data-toggle="tooltip" data-original-title="Buscar"
                            data-placement="left">
                        <button type="submit" class="search-icon"><i class="icon icon-search icon-fw"></i></button>
                    </div>
                </form>
                <!-- Card -->
                <div class="dt-card mt-4">
                    <!-- Card Body -->
                    <div class="dt-card__body p-0  ">
                        <div class="w-100 ps-custom-scrollbar mb-0 ps pb-5">
                            <!-- Widget -->
                            <div class="dt-widget dt-widget-hl-item-space dt-widget-mb-item dt-widget-hover-bg"
                                id="tbodyUsuario" style="min-width: 725px;">
                            </div>
                            <!-- /widget -->
                        </div>

                    </div>
                    <!-- /card body -->
                </div>
                <!-- /card -->
                <div class="row mt-2">
                    <div class="col-md-2 col-sm-3 col-4">
                        <select id="sizePageUsuario" class="form-control form-control-sm select2-single">
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                    <div class="col-md-10 col-sm-9 col-8">
                        <nav aria-label="Page navigation example">
                            <ul id="paginationUsuario" class="pagination pagination-sm justify-content-end">
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            <!-- /card body -->
        </div>
        <!-- /card -->

        <!-- Card -->
        <div class="card mb-0 " id="openUsuario" style="display: none">
            <!-- Card Header -->
            <div class="card-header">
                <!-- Tab Navigation -->
                <ul class="card-header-pills nav nav-pills nav-fill" role="tablist">
                    <li class="pr-2">
                        <button data-toggle="tooltip" title="Regresar" type="button" id="btnCerrar"
                            class="btn btn-outline-primary btn-sm dt-avatar"> <i
                                class="icon icon-reply icon-lg"></i></button>
                    </li>

                    <li class="nav-item">
                        <a id="buttonFiliacion" class="nav-link show active" data-toggle="tab" href="#tab-pane-15"
                            role="tab" aria-controls="tab-pane-15" aria-="true">
                            DATOS DE FILIACION</a>
                    </li>
                    <li class="nav-item">
                        <a id="buttonDeporte" class="nav-link" data-toggle="tab" href="#OpenListaDeporteDetalle"
                            role="tab" aria-controls="OpenListaDeporteDetalle" aria-="false">
                            DEPORTES</a>
                    </li>
                    <li class="nav-item">
                        <a id="buttonAficion" class="nav-link" data-toggle="tab" href="#OpenListaAficionDetalle"
                            role="tab" aria-controls="OpenListaAficionDetalle" aria-="false">
                            AFICIONES</a>
                    </li>
                </ul>
                <!-- /tab navigation -->
            </div>
            <!-- /card header -->

            <!-- Tab Content -->
            <div class="tab-content p-5 ">

                <!-- Tab FILIACION -->
                <div id="tab-pane-15" class="tab-pane active ">
                    <div class="row">
                        <div class="col-lg-4 col-sm-6">
                            <div class="form-group">
                                <label for="txtTipoDocumentoUsuario">TIPO DE DOCUMENTO</label>
                                <select disabled class="form-control form-control-sm" id="txtTipoDocumentoUsuario">
                                    <option value="1">DNI</option>
                                    <option value="2">CARNET DE EXTRANJERIA</option>
                                    <option value="3">OTRO</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-6">
                            <div class="form-group">
                                <label for="txtUsuarioUsuario">TIPO DE USUARIO</label>
                                <select disabled class="form-control form-control-sm" id="txtUsuarioUsuario">
                                    <option value="1">ALUMNO</option>
                                    <option value="2">DOCENTE</option>
                                    <option value="3">ADMINISTRATIVO</option>
                                    <option value="4">FAMILIAR DOCENTE</option>
                                    <option value="5">FAMILIAR ADMINISTRATIVO</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-6">
                            <div class="form-group">
                                <label for="txtSubusuarioUsuario">SUBTIPO DE USUARIO</label>
                                <select disabled class="form-control form-control-sm" id="txtSubusuarioUsuario">
                                    <option value="1">NOMBRADO</option>
                                    <option value="2">CONTRATADO</option>
                                    <option value="3">NINGUNO</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-lg-4 col-sm-6">
                            <div class="form-group">
                                <label for="txtEstadoUsuario">ESTADO CIVIL</label>
                                <select disabled class="form-control form-control-sm" id="txtEstadoUsuario">
                                    <option value="-1">Seleccionar...</option>
                                    <option value="1">SOLTERO(A)</option>
                                    <option value="2">CASADO(A)</option>
                                    <option value="3">DIVORSIADO(A)</option>
                                    <option value="4">VIUDO(A)</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-lg-4 col-sm-6">
                            <div class="form-group">
                                <label for="txtCodigoUsuario">CxDIGO</label>
                                <input disabled type="text" class="form-control form-control-sm" id="txtCodigoUsuario"
                                    placeholder="CODIGO">
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-6">
                            <div class="form-group">
                                <label for="txtNumeroDocumentoUsuario">Nx DOCUMENTO</label>
                                <input disabled type="text" class="form-control form-control-sm"
                                    id="txtNumeroDocumentoUsuario" placeholder="Nx DOCUMENTO">
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-6">
                            <div class="form-group">
                                <label for="txtApPaternoUsuario">AP. PATERNO</label>
                                <input disabled type="text" class="form-control form-control-sm"
                                    id="txtApPaternoUsuario" placeholder="AP. PATERNO">
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-6">
                            <div class="form-group">
                                <label for="txtApMaternoUsuario">AP. MATERNO</label>
                                <input disabled type="text" class="form-control form-control-sm"
                                    id="txtApMaternoUsuario" placeholder="AP. MATERNO">
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-6">
                            <div class="form-group">
                                <label for="txtNombreUsuario">NOMBRES</label>
                                <input disabled type="email" class="form-control form-control-sm" id="txtNombreUsuario"
                                    placeholder="NOMBRES">
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-6">
                            <div class="form-group">
                                <label for="txtSexoUsuario">SEXO</label>
                                <select disabled class="form-control form-control-sm" id="txtSexoUsuario">
                                    <option value="1">MASCULINO</option>
                                    <option value="2">FEMENINO</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-6">
                            <div class="form-group">
                                <label for="txtFechaNacUsuario">FECHA DE NACIMIENTO</label>
                                <input disabled type="email" class="form-control form-control-sm"
                                    id="txtFechaNacUsuario" placeholder="Enter email">
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-6">
                            <div class="form-group">
                                <label for="txtCelularUsuario">CELULAR</label>
                                <input disabled type="text" class="form-control form-control-sm" id="txtCelularUsuario"
                                    placeholder="CELULAR">
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-12">
                            <div class="form-group">
                                <label for="txtEmailUsuario">EMAIL</label>
                                <input disabled type="email" class="form-control form-control-sm" id="txtEmailUsuario"
                                    placeholder="Enter email">
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-12">
                            <div class="form-group">
                                <label for="txtEscuelaUsuario">ESCUELA</label>
                                <input disabled type="text" class="form-control form-control-sm" id="txtEscuelaUsuario"
                                    placeholder="ESCUELA">
                            </div>
                        </div>

                    </div>
                </div>

                <!-- /tab pane-->

                <!-- Tab DEPORTES -->
                <div id="OpenListaDeporteDetalle" class="tab-pane ">
                    <div class="form-group justify-content-center">
                        <div class="float-right">
                            <button type="button" class="btn btn-primary btn-sm" id="btnOpenDeporteDetalle"
                                data-toggle="tooltip" data-original-title="Agregar Deporte"><i
                                    class="icon icon-addnew"></i> </button>
                        </div>
                        <div class="text-center">
                            <label for="normal-input-3"
                                class="col-form-label col-form-label-lg text-sm-center text-primary">LISTA DE
                                DEPORTES</label>
                            <input type="hidden" id="pageDeporteDetalle" value="1">
                        </div>

                    </div>
                    <!-- Card -->
                    <div class="dt-card mt-4">
                        <!-- Card Body -->
                        <div class="dt-card__body p-0  ">
                            <!-- Widget -->
                            <div class="dt-widget dt-widget-hl-item-space dt-widget-mb-item dt-widget-hover-bg"
                                id="tbodyDeporte">
                            </div>
                            <!-- /widget -->
                            <!-- /card body -->
                        </div>

                    </div>
                    <!-- /card -->

                    <div class="mt-2 form-row">
                        <div class="col-md-2 col-sm-3 col-4">
                            <select id="sizePageDeporteDetalle" class="form-control form-control-sm select2-single">
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                            </select>
                        </div>
                        <div class="col-md-10 col-sm-9 col-8">
                            <nav aria-label="Page navigation example">
                                <ul id="paginationDeporteDetalle" class="pagination pagination-sm justify-content-end">
                                </ul>
                            </nav>
                        </div>
                    </div>

                </div>
                <div id="OpenDeporteDetalle" class="tab-pane">
                    <div class="justify-content-center form-row">
                        <div class="col-lg-5 col-12">
                            <div class="card-header bg-transparent pl-0 ">
                                <h4 class="mb-0 text-primary" id="tittleDeporteDetalle"></h4>
                            </div>
                            <form id="FrmDeporteDetalleModal">
                                <div class="row">
                                    <div class="form-group col-12">
                                        <label for="txtEstadoDeporteDetalle">ESTADO</label>
                                        <div class="input-group">
                                            <select class="form-control form-control-sm" id="txtEstadoDeporteDetalle">
                                                <option value="-1">seleccione...</option>
                                                <option value="1">LO PRACTICO</option>
                                                <option value="2">ME GUSTARIA APRENDER</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group col-12">
                                        <label for="txtDeporteDetalle">DEPORTE
                                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover"
                                                data-trigger="hover" data-placement="top" title=""
                                                data-content="Deporte que practicas " style="cursor: pointer"
                                                data-original-title=""></i>
                                        </label>
                                        <div class="input-group">
                                            <input type="text" class="form-control form-control-sm"
                                                id="txtDeporteDetalle" aria-describedby="nombre"
                                                placeholder="Click en el botxn para seleccionar. . ." disabled="">
                                            <div class="input-group-append">
                                                <button type="button" id="btnSeleccionarDeporte"
                                                    class="btn btn-primary btn-sm"><i
                                                        class="icon icon-subscribe"></i></button>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group col-12 text-center">
                                        <button type="button" id="btnCancelarDeporteUsuario"
                                            class="ml-5 btn btn-outline-primary btn-sm"><i class="icon icon-reply"></i>
                                            LISTA DE
                                            DEPORTES</button>
                                        <button type="submit" id="btnGuardarDeporteUsuario"
                                            class="ml-5 btn btn-primary btn-sm">GUARDAR</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>


                </div>
                <!-- /tab pane-->

                <!-- Tab AFICIONES -->
                <div id="OpenListaAficionDetalle" class="tab-pane ">
                    <div class="form-group justify-content-center">
                        <div class="float-right">
                            <button type="button" class="btn btn-primary btn-sm" id="btnOpenAficionDetalle"
                                data-toggle="tooltip" title="Agregar Deporte"><i class="icon icon-addnew"></i> </button>
                        </div>
                        <div class="text-center">
                            <label id="titleManagerAficion" for="normal-input-3"
                                class="col-form-label col-form-label-lg text-sm-center text-primary">LISTA DE
                                AFICIONES</label>
                            <input type="hidden" id="pageAficionDetalle" value="1">
                        </div>


                    </div>
                    <!-- Card -->
                    <div class="dt-card mt-4">

                        <!-- Card Body -->
                        <div class="dt-card__body p-0  ">
                            <!-- Widget -->
                            <div class="dt-widget dt-widget-hl-item-space dt-widget-mb-item dt-widget-hover-bg"
                                id="tbodyAficion">
                            </div>
                            <!-- /widget -->
                            <!-- /card body -->
                        </div>

                    </div>
                    <!-- /card -->

                    <div class="mt-2 form-row">
                        <div class="col-md-2 col-sm-3 col-4">
                            <select id="sizePageAficionDetalle" class="form-control form-control-sm select2-single">
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                            </select>
                        </div>
                        <div class="col-md-10 col-sm-9 col-8">
                            <nav aria-label="Page navigation example">
                                <ul id="paginationAficionDetalle" class="pagination pagination-sm justify-content-end">
                                </ul>
                            </nav>
                        </div>
                    </div>

                </div>
                <div id="OpenAficionDetalle" class="tab-pane ">
                    <div class="justify-content-center form-row">
                        <div class="col-lg-5 col-12">
                            <div class="card-header bg-transparent pl-0 ">
                                <h4 class="mb-0 text-primary" id="tittleAficionDetalle"></h4>
                            </div>
                            <form id="FrmAficionDetalleModal">
                                <div class="row">
                                    <div class="form-group col-12">
                                        <label for="txtEstadoAficionDetalle">ESTADO</label>
                                        <div class="input-group">
                                            <select class="form-control form-control-sm" id="txtEstadoAficionDetalle">
                                                <option value="-1">seleccione...</option>
                                                <option value="1">LO PRACTICO</option>
                                                <option value="2">ME GUSTARIA APRENDER</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group col-12">
                                        <label for="txtAficionDetalle">AFICION
                                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover"
                                                data-trigger="hover" data-placement="top" title=""
                                                data-content="Aficion que practicas " style="cursor: pointer"
                                                data-original-title=""></i>
                                        </label>
                                        <div class="input-group">
                                            <input type="text" class="form-control form-control-sm"
                                                id="txtAficionDetalle" aria-describedby="nombre"
                                                placeholder="Click en el botxn para seleccionar. . ." disabled="">
                                            <div class="input-group-append">
                                                <button type="button" id="btnSeleccionarAficiones"
                                                    class="btn btn-primary btn-sm"><i
                                                        class="icon icon-subscribe"></i></button>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group text-center col-12">
                                        <button type="button" id="btnCancelarAficionUsuario"
                                            class="ml-5 btn btn-outline-primary btn-sm"><i class="icon icon-reply"></i>
                                            LISTA DE
                                            AFICIONES</button>
                                        <button type="submit" id="btnGuardarAficionUsuario"
                                            class="ml-5 btn btn-primary btn-sm">GUARDAR</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <!-- /tab pane-->
            </div>
        </div>
        <!-- /tab content -->
    </div>
    <!-- /card -->
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
                        Cargando Usuarios. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>



<div id="ventanaModalPreviewReporte" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
    data-keyboard="false" style="overflow-y: visible; background-color: rgba(0, 0, 0, 0.1); display: none;"
    aria-hidden="true">
    <div class="modal-dialog modal-lg-sisbu" role="document">
        <div class="modal-content" style="border-color: #2962FF; border-width: 3px;border-radius: 7px;">
            <form class="needs-validation" novalidate="">
                <div class="modal-body pb-2">
                    <h5 id="titleModalPreviewReporte"></h5>
                    <!--FRAME PARA EL PREVIEW DEL REPORTE-->
                    <div class="row" id="row_frame_report" style="display: none">
                        <div class="col-12">
                            <!--div class="embed-responsive embed-responsive-1by1">
                            </div-->
                            <iframe class="embed-responsive-item" src="" id="idframe_reporte" height="480"
                                width="100%"></iframe>
                        </div>
                    </div>
                </div>
                <div class="modal-footer pt-2 pb-2">
                    <button type="button" class="btn btn-primary btn-xs" id="btn-cerrar-printer-comprobante"
                        data-dismiss="modal">
                        <i class="fas fa-times"></i>
                        CERRAR</button>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoVDYA" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog"
    aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.1)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                        aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Verificando Usuario. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoDeporteDetalle" data-backdrop="static" data-keyboard="false" tabindex="-1"
    role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.2)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                        aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Cargando deportes que practicas. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoAficionDetalle" data-backdrop="static" data-keyboard="false" tabindex="-1"
    role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.2)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                        aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Cargando aficion que practicas. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--T: DEPORTE SELECTED-->
<div id="ventanaModalSelectedDeporteC" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
    data-keyboard="false" style="padding-top: 2%; overflow-y: visible;background-color: rgba(0,0,0,.1)">
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="border-color: #0085c1; border-width: 4px;">
            <div class="modal-header">
                <h5 class="mb-0" id="titleManagerDeporteC"><strong>[ 0 ]
                        DEPORTES</strong></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pb-0 pt-0">
                <div class="row">
                    <div class="col-12">
                        <input type="hidden" id="pageDeporteC" value="1">
                        <form id="FrmDeporteC" class="search-box mw-100">
                            <div class="input-group mt-3">
                                <input type="search" id="txtFilterDeporteC" class="form-control form-control-sm "
                                    placeholder="INGRESE FILTRO . . ." data-toggle="tooltip"
                                    data-original-title="Buscar" data-placement="left">
                                <button type="submit" class="search-icon"><i
                                        class="icon icon-search icon-fw"></i></button>
                            </div>

                        </form>
                        <div class="row pl-5 pr-5 mb-2">
                            <div class="table-responsive">
                                <table class="table mb-0 table-fluid">
                                    <thead>
                                        <tr>
                                            <th class="align-middle text-left">Deporte</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyDeporteC">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row mt-2 mb-2" style="display: none">
                            <div class="col-sm-4 mt-2">
                                <select id="sizePageDeporteC"
                                    class="form-control form-control-sm sisbu-cursor-mano combo-paginar">
                                    <option value="5">05</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>
                            <div class="col-sm-8 mt-2">
                                <nav aria-label="Page navigation">
                                    <ul id="paginationDeporteC" class="pagination justify-content-end">

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal"
                    id="btnCancelSelectionDeporteC"><i class="fas fa-ban"></i>
                    CANCELAR</button>
                <button type="button" id="btn-selecionar-deportec" class="btn btn-primary btn-xs"><i
                        class="fas fa-check"></i> SELECCIONAR</button>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoSelectedDeporteC" data-backdrop="static" data-keyboard="false" tabindex="-1"
    role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.2)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                        aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Cargando deportes. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--T: AFICION SELECTED-->
<div id="ventanaModalSelectedAficionC" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
    data-keyboard="false" style="padding-top: 2%; overflow-y: visible;background-color: rgba(0,0,0,.1)">
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="border-color: #0085c1; border-width: 4px;">
            <div class="modal-header">
                <h5 class="mb-0" id="titleManagerAficionC"><strong>[ 0 ]
                        AFICIONES</strong></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pb-0 pt-0">
                <div class="row">
                    <div class="col-12">
                        <input type="hidden" id="pageAficionC" value="1">
                        <form id="FrmAficionC" class="search-box mw-100">
                            <div class="input-group mt-3">
                                <input type="search" id="txtFilterAficionC" class="form-control form-control-sm"
                                    placeholder="INGRESE FILTRO . . ." data-toggle="tooltip"
                                    data-original-title="Buscar" data-placement="left">
                                <button type="submit" class="search-icon"><i
                                        class="icon icon-search icon-fw"></i></button>
                            </div>
                        </form>
                        <div class="row pl-5 pr-5 mb-2">
                            <div class="table-responsive">
                                <table class="table mb-0 table-fluid">
                                    <thead>
                                        <tr>
                                            <th class="align-middle text-left">Aficion</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyAficionC">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row mt-2 mb-2" style="display: none">
                            <div class="col-sm-4 mt-2">
                                <select id="sizePageAficionC"
                                    class="form-control form-control-sm sisbu-cursor-mano combo-paginar">
                                    <option value="5">05</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>
                            <div class="col-sm-8 mt-2">
                                <nav aria-label="Page navigation">
                                    <ul id="paginationAficionC" class="pagination justify-content-end">

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal"
                    id="btnCancelSelectionAficionC"><i class="fas fa-ban"></i>
                    CANCELAR</button>
                <button type="button" id="btn-selecionar-aficionc" class="btn btn-primary btn-xs"><i
                        class="fas fa-check"></i> SELECCIONAR</button>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoSelectedAficionC" data-backdrop="static" data-keyboard="false" tabindex="-1"
    role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.2)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                        aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Cargando aficiones. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="modal" id="modalCargandoVDYA" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog"
    aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.1)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                        aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Verificando evaluacion deportiva. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="ventanaModalPreviewReporte" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
    data-keyboard="false" style="overflow-y: visible; background-color: rgba(0, 0, 0, 0.1); display: none;"
    aria-hidden="true">
    <div class="modal-dialog modal-lg-sisbu" role="document">
        <div class="modal-content" style="border-color: #2962FF; border-width: 3px;border-radius: 7px;">
            <form class="needs-validation" novalidate="">
                <div class="modal-body pb-2">
                    <h5 id="titleModalPreviewReporte"></h5>
                    <!--FRAME PARA EL PREVIEW DEL REPORTE-->
                    <div class="row" id="row_frame_report" style="display: none">
                        <div class="col-12">
                            <!--div class="embed-responsive embed-responsive-1by1">
                            </div-->
                            <iframe class="embed-responsive-item" src="" id="idframe_reporte" height="480"
                                width="100%"></iframe>
                        </div>
                    </div>
                </div>
                <div class="modal-footer pt-2 pb-2">
                    <button type="button" class="btn btn-primary btn-xs" id="btn-cerrar-printer-comprobante"
                        data-dismiss="modal">
                        <i class="fas fa-times"></i>
                        CERRAR</button>
                </div>
            </form>
        </div>
    </div>
</div>