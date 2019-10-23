<%-- 
    Document   : comida.jsp
    Created on : 28/08/2019, 09:48:09 AM
    Author     : Andres
--%>

<div class="row">
    <div class="col-xl-12">
        <!-- Card -->
        <div class="card overflow-hidden">

            <!-- Card Body -->
            <div class="card-body ">

                <!-- Card Header -->
                <div class="card-header card-nav bg-transparent mb-5">
                    <ul class="card-header-links nav nav-underline text-uppercase border-bottom"
                        role="tablist">
                        <li class="nav-item">
                            <a class="nav-link" id="titleManagerDepartamento" style="cursor: pointer"
                               >DEPARTAMENTOS</a>
                            <input type="hidden" id="pageDepartamento" value="1">
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="titleManagerProvincia" style="cursor: pointer"
                               >PROVINCIAS</a>
                            <input type="hidden" id="pageProvincia" value="1">
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active"  id="titleManagerDistrito"style="cursor: pointer"
                               >DISTRITOS </a>
                            <input type="hidden" id="pageDistrito" value="1">
                        </li>

                    </ul>
                </div>
                <!-- /card header -->

                <!-- Tab Content-->
                <div class="tab-content">

                    <!-- Tab panel departamento-->
                    <div id="tab-departamentos" style="display: none">

                        <!-- Contact Container -->

                        <form id="FrmDepartamento">
                            <div class="input-group search-box" style="max-width: 100%;">
                                <input type="search" id="txtFilterNombreDepartamento" class="form-control form-control-sm" placeholder="FILTRO...">
                                <span class="search-icon"><i class="icon icon-search icon-lg"></i></span>
                                <div class="input-group-prepend">
                                    <button type="submit" class="btn btn-primary btn-sm mr-2"><i class="icon icon-search icon-fw"></i> BUSCAR</button>
                                    <button type="button" class="btn btn-primary btn-sm" id="btnOpenNewDepartamento"data-toggle="tooltip" title="Agregar Departamento" ><i class="icon icon-addnew"></i></button>
                                </div>
                            </div>
                        </form>

                        <!-- Card -->
                        <div class="dt-card mt-4">
                            <!-- Card Body -->
                            <div class="dt-card__body p-0  " >
                                <!-- Widget -->
                                <div class="dt-widget dt-widget-hl-item-space dt-widget-mb-item dt-widget-hover-bg"
                                     id="tbodyDepartamento">
                                </div>
                                <!-- /widget -->
                                <!-- /card body -->
                            </div>

                        </div>
                        <!-- /card -->

                        <div class="row mt-2">
                            <div class="col-md-2 col-sm-3 col-4">
                                <select id="sizePageDepartamento" class="form-control form-control-sm select2-single">
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                    <option value="20">20</option>
                                    <option value="200"></option>
                                </select>
                            </div>
                            <div class="col-md-10 col-sm-9 col-8">
                                <nav aria-label="Page navigation example">
                                    <ul id="paginationDepartamento" class="pagination pagination-sm justify-content-end">
                                    </ul>
                                </nav>  
                            </div>
                        </div>

                        <!-- /contact container -->
                    </div>

                    <!-- /Agregar container -->
                    <div class=" col-12" id="OpenDepartamentoDetalle" style="display: none"> 
                        <!-- Card -->
                        <div class="col-12 text-center pb-5">
                            <h3 class="modal-title text-primary" id="txtTituloModalDepartamento"></h3>
                        </div>
                        <div class="form-row">
                            <div class="col-lg-3 col-sm-2"></div>
                            <div class="card overflow-hidden col-lg-6 col-sm-8"  >
                                <!-- Card Header -->
                                <div class="card-header bg-transparent">
                                    <form id="FrmDepartamentoModal">
                                        <div class="row">
                                            <div class="form-group col-12">
                                                <label for="txtNombreDepartamento">DEPARTAMENTO</label>
                                                <input class="form-control form-control-sm" id="txtNombreDepartamento" type="text" placeholder="NOMBRE">
                                            </div>

                                            <div class="form-group col-12 text-center">
                                                <button type="button" id="btnCancelarDepartamento"class="btn btn-outline-primary btn-sm" ><i class="icon icon-reply"></i> CANCELAR</button>
                                                <button type="submit" id="btnGuardarDepartamento" class="btn btn-primary btn-sm">GUARDAR</button>

                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <!-- /card header -->
                            </div>
                        </div>
                        <!-- /card -->
                    </div> 
                    <!-- /Agregarcontainer -->
                    <!-- /tab panel -->

                    <!-- Tab panel provincia-->
                    <div id="tab-provincias" style="display: none" >

                        <!-- Contact Container -->
                        <!-- Card Body -->
                        <form id="FrmProvincia">
                            <div class="input-group search-box" style="max-width: 100%;">
                                <input type="search" id="txtFilterNombreProvincia" class="form-control form-control-sm" placeholder="FILTRO. . .">
                                <span class="search-icon"><i class="icon icon-search icon-lg"></i></span>
                                <div class="input-group-prepend">
                                    <button type="submit" class="btn btn-primary btn-sm mr-2"><i class="icon icon-search icon-sisbu"></i> BUSCAR</button>
                                    <button type="button" class="btn btn-primary btn-sm" id="btnOpenNewProvincia"data-toggle="tooltip" title="Agregar Provincia" ><i class="icon icon-addnew"></i></button>
                                </div>
                            </div>
                        </form>

                        <!-- Card -->
                        <div class="dt-card mt-4">
                            <!-- Card Body -->
                            <div class="dt-card__body p-0  " >
                                <!-- Widget -->
                                <div class="dt-widget dt-widget-hl-item-space dt-widget-mb-item dt-widget-hover-bg"
                                     id="tbodyProvincia">
                                </div>
                                <!-- /widget -->
                                <!-- /card body -->
                            </div>

                        </div>
                        <!-- /card -->

                        <div class="row mt-2">
                            <div class="col-md-2 col-sm-3 col-4">
                                <select id="sizePageProvincia" class="form-control form-control-sm select2-single">
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                    <option value="20">20</option>
                                </select>
                            </div>
                            <div class="col-md-10 col-sm-9 col-8">
                                <nav aria-label="Page navigation example">
                                    <ul id="paginationProvincia" class="pagination pagination-sm justify-content-end">
                                    </ul>
                                </nav>  
                            </div>
                        </div>
                        <!-- /contact container -->

                    </div>
                    <!-- /Agregar container -->
                    <div class=" col-12" id="OpenProvinciaDetalle" style="display: none"> 
                        <!-- Card -->
                        <div class="col-12 text-center pb-5">
                            <h3 class="modal-title text-primary" id="txtTituloModalProvincia"></h3>
                        </div>
                        <div class="form-row">
                            <div class="col-lg-3 col-sm-2"></div>
                            <div class="card overflow-hidden col-lg-6 col-sm-8"  >
                                <!-- Card Header -->
                                <div class="card-header bg-transparent">
                                    <form id="FrmProvinciaModal">
                                        <div class="row">
                                            <div class="form-group col-12">
                                                <label for="txtNombreProvincia">PROVINCIA</label>
                                                <input class="form-control form-control-sm" id="txtNombreProvincia" type="text" placeholder="NOMBRE">
                                            </div>
                                            <div class=" form-group col-lg-12 ">
                                                <label for="txtDepartamentoProvincia">DEPARTAMENTO
                                                </label>
                                                <div class="input-group">
                                                    <input type="text" class="form-control form-control-sm" id="txtDepartamentoProvincia" aria-describedby="nombre" placeholder="Click en el botón para seleccionar. . ." disabled="">
                                                    <div class="input-group-append">
                                                        <button type="button" id="btnSeleccionarDepartamento" class="btn btn-primary btn-sm"><i class="icon icon-subscribe"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group col-12 text-center">
                                                <button type="button" id="btnCancelarProvincia"class="btn btn-outline-primary btn-sm" ><i class="icon icon-reply"></i> CANCELAR</button>
                                                <button type="submit" id="btnGuardarProvincia" class="btn btn-primary btn-sm">GUARDAR</button>

                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <!-- /card header -->
                            </div>
                        </div>
                        <!-- /card -->
                    </div> 
                    <!-- /Agregarcontainer -->
                    <!-- /tab panel -->

                    <!-- Tab panel distrito-->
                    <div id="tab-distritos">

                        <!-- Listar Container -->

                        <form id="FrmDistrito">
                            <div class="input-group search-box" style="max-width: 100%;">
                                <input type="search" id="txtFilterNombreDistrito" class="form-control form-control-sm" placeholder="FILTRO...">
                                <span class="search-icon"><i class="icon icon-search icon-lg"></i></span>
                                <div class="input-group-prepend">
                                    <button type="submit" class="btn btn-primary btn-sm mr-2"><i class="icon icon-search icon-fw"></i> BUSCAR</button>
                                    <button type="button" class="btn btn-primary btn-sm" id="btnOpenNewDistrito"data-toggle="tooltip" title="Agregar Distrito" ><i class="icon icon-addnew"></i></button>
                                </div>
                            </div>
                        </form>
                        <!-- Card -->
                        <div class="dt-card mt-4">
                            <!-- Card Body -->
                            <div class="dt-card__body p-0  " >
                                <!-- Widget -->
                                <div class="dt-widget dt-widget-hl-item-space dt-widget-mb-item dt-widget-hover-bg"
                                     id="tbodyDistrito">
                                </div>
                                <!-- /widget -->
                                <!-- /card body -->
                            </div>

                        </div>
                        <!-- /card -->

                        <div class="row mt-2">
                            <div class="col-md-2 col-sm-3 col-4">
                                <select id="sizePageDistrito" class="form-control form-control-sm select2-single">
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                    <option value="20">20</option>
                                </select>
                            </div>
                            <div class="col-md-10 col-sm-9 col-8">
                                <nav aria-label="Page navigation example">
                                    <ul id="paginationDistrito" class="pagination pagination-sm justify-content-end">
                                    </ul>
                                </nav>  
                            </div>
                        </div>

                        <!-- /Listar container -->
                    </div>
                    <!-- /tab panel -->

                    <!-- /Agregar container -->
                    <div class=" col-12" id="OpenDistritoDetalle" style="display: none"> 
                        <!-- Card -->
                        <div class="col-12 text-center pb-5">
                            <h3 class="modal-title text-primary" id="txtTituloModalDistrito">DISTRITO</h3>
                        </div>
                        <div class="form-row">
                            <div class="col-lg-3 col-sm-2"></div>
                            <div class="card overflow-hidden col-lg-6 col-sm-8"  >
                                <!-- Card Header -->
                                <div class="card-header bg-transparent">
                                    <form id="FrmDistritoModal">
                                        <div class="row">
                                            <div class="form-group col-12">
                                                <label for="txtNombreDistrito">DISTRITO</label>
                                                <input class="form-control form-control-sm" id="txtNombreDistrito" type="text" placeholder="NOMBRE">
                                            </div>
                                            <div class="form-group  col-lg-12 ">
                                                <label for="txtProvinciaDistrito">PROVINCIA
                                                </label>
                                                <div class="input-group">
                                                    <input type="text" class="form-control form-control-sm" id="txtProvinciaDistrito" aria-describedby="nombre" placeholder="Click en el botón para seleccionar. . ." disabled="">
                                                    <div class="input-group-append">
                                                        <button type="button" id="btnSeleccionarProvincia" class="btn btn-primary btn-sm"><i class="icon icon-subscribe"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group  col-lg-12 text-center">
                                                <button type="button" id="btnCancelarDistrito" class="btn btn-outline-primary btn-sm" ><i class="icon icon-reply"></i> CANCELAR</button>
                                                <button type="submit" id="btnGuardarDistrito" class="btn btn-primary btn-sm">GUARDAR</button>

                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <!-- /card header -->
                            </div>
                        </div>
                        <!-- /card -->
                    </div> 
                    <!-- /Agregarcontainer -->

                </div>
                <!-- /tab content-->
            </div>
            <!-- /card body -->
        </div>
        <!-- /card -->
    </div>
</div>


<!-- distrito-->

<div class="modal fade" id="modalCargandoDistrito" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Cargando Distritos. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- distrito-->

<!-- provincia-->
<div class="modal fade" id="modalCargandoProvincia" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Cargando Provincias. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- provincia-->

<!-- departamento-->

<div class="modal fade" id="modalCargandoDepartamento" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Cargando Departamentos. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- departamento-->


<!--T: PROVINCIA SELECTED-->
<div id="ventanaModalSelectedProvinciaC" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
     data-keyboard="false" style="padding-top: 2%; overflow-y: visible;background-color: rgba(0,0,0,.2)">
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="border-color: #0085c1; border-width: 4px;">
            <div class="modal-header">
                <h5 class="mb-0" id="titleManagerProvinciaC"><strong>[ 0 ]
                        PROVINCIA</strong></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pb-0 pt-0">
                <div class="row">
                    <div class="col-12">
                        <input type="hidden" id="pageProvinciaC"
                               value="1">
                        <form id="FrmDoctorC">
                            <div class="row mt-3">
                                <div class="input-group col-12">
                                    <input type="text" id="txtFilterProvinciaC"
                                           class="form-control form-control-sm mr-3" placeholder="INGRESE FILTRO . . .">
                                    <button type="submit" id="btnBuscarProvinciaC"
                                            class="btn btn-primary btn-xs" data-toggle="tooltip"
                                            title="Buscar Pregunta"><i class="fa fa-search" aria-hidden="true"></i>
                                        BUSCAR</button>
                                </div>
                            </div>
                        </form>
                        <div class="row pl-5 pr-5 mb-2">
                            <div class="table-responsive">
                                <table class="table mb-0 table-fluid">
                                    <thead>
                                        <tr>
                                            <th class="align-middle text-left">Provincia</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyProvinciaC">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row mt-2 mb-2" style="display: none">
                            <div class="col-sm-4 mt-2">
                                <select id="sizePageProvinciaC"
                                        class="form-control form-control-sm sisbu-cursor-mano combo-paginar">
                                    <option value="5">05</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>
                            <div class="col-sm-8 mt-2">
                                <nav aria-label="Page navigation">
                                    <ul id="paginationProvinciaC"
                                        class="pagination justify-content-end">

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal" id="btnCancelSelectionProvinciaC"><i class="fas fa-ban"></i>
                    CANCELAR</button>
                <button type="button" id="btn-selecionar-provinciac" class="btn btn-primary btn-xs"><i
                        class="fas fa-check"></i> SELECCIONAR</button>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoSelectedProvinciaC" data-backdrop="static" data-keyboard="false" tabindex="-1"
     role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.3)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Cargando provincias. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--T: PROVINCIA SELECTED-->
<div id="ventanaModalSelectedDepartamentoC" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
     data-keyboard="false" style="padding-top: 2%; overflow-y: visible;background-color: rgba(0,0,0,.2)">
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="border-color: #0085c1; border-width: 4px;">
            <div class="modal-header">
                <h5 class="mb-0" id="titleManagerDepartamentoC"><strong>[ 0 ]
                        Departamento</strong></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pb-0 pt-0">
                <div class="row">
                    <div class="col-12">
                        <input type="hidden" id="pageDepartamentoC"
                               value="1">
                        <form id="FrmDepartamentoC">
                            <div class="row mt-3">
                                <div class="input-group col-12">
                                    <input type="text" id="txtFilterDepartamentoC"
                                           class="form-control form-control-sm mr-3" placeholder="INGRESE FILTRO . . .">
                                    <button type="submit" id="btnBuscarDepartamentoC"
                                            class="btn btn-primary btn-xs" data-toggle="tooltip"
                                            title="Buscar Pregunta"><i class="fa fa-search" aria-hidden="true"></i>
                                        BUSCAR</button>
                                </div>
                            </div>
                        </form>
                        <div class="row pl-5 pr-5 mb-2">
                            <div class="table-responsive">
                                <table class="table mb-0 table-fluid">
                                    <thead>
                                        <tr>
                                            <th class="align-middle text-left">Departamento</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyDepartamentoC">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row mt-2 mb-2" style="display: none">
                            <div class="col-sm-4 mt-2">
                                <select id="sizePageDepartamentoC"
                                        class="form-control form-control-sm sisbu-cursor-mano combo-paginar">
                                    <option value="5">05</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>
                            <div class="col-sm-8 mt-2">
                                <nav aria-label="Page navigation">
                                    <ul id="paginationDepartamentoC"
                                        class="pagination justify-content-end">

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal" id="btnCancelSelectionDepartamentoC"><i class="fas fa-ban"></i>
                    CANCELAR</button>
                <button type="button" id="btn-selecionar-departamentoc" class="btn btn-primary btn-xs"><i
                        class="fas fa-check"></i> SELECCIONAR</button>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoSelectedDepartamentoC" data-backdrop="static" data-keyboard="false" tabindex="-1"
     role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.3)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Cargando Departamentos. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>