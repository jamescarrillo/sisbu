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
                    <ul class="card-header-links nav nav-underline text-uppercase"
                        role="tablist">
                        <li class="nav-item">
                            <a class="nav-link" id="titleManagerDepartamento" data-toggle="tab" href="#tab-departamentos" role="tab"
                               aria-controls="tab-departamentos"
                               aria-selected="true">DEPARTAMENTOS</a>
                            <input type="hidden" id="pageDepartamento" value="1">
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="titleManagerProvincia" data-toggle="tab" href="#tab-provincias" role="tab"
                               aria-controls="tab-provincias"
                               aria-selected="true">PROVINCIAS</a>
                            <input type="hidden" id="pageProvincia" value="1">
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active"  id="titleManagerDistrito" data-toggle="tab" href="#tab-distritos"
                               role="tab"
                               aria-controls="tab-distritos"
                               aria-selected="true">DISTRITOS </a>
                            <input type="hidden" id="pageDistrito" value="1">
                        </li>

                    </ul>
                </div>
                <!-- /card header -->

                <!-- Tab Content-->
                <div class="tab-content">

                    <!-- Tab panel departamento-->
                    <div id="tab-departamentos" class="tab-pane ">

                        <!-- Contact Container -->

                        <div class="dt-contacts__container ps-custom-scrollbar">
                            <form id="FrmDepartamento">
                                <div class="input-group search-box" style="max-width: 100%;">
                                    <input type="search" id="txtFilterNombreDepartamento" class="form-control form-control-sm" placeholder="FILTRO...">
                                    <span class="search-icon"><i class="icon icon-search icon-lg"></i></span>
                                    <div class="input-group-prepend">
                                        <button type="submit" class="btn btn-primary btn-sm mr-2"><i class="icon icon-search icon-fw"></i> BUSCAR</button>
                                        <button type="button" class="btn btn-primary btn-sm" id="btnOpenNewDepartamento"><i class="icon icon-plus icon-fw"></i></button>
                                    </div>
                                </div>
                            </form>
                            <!-- Tables -->
                            <div class="table-responsive">
                                <table class="table mb-0">
                                    <thead>
                                        <tr> 
                                            <th class="text-uppercase text-center" scope="col" style="width: 10%">ACCION</th>
                                            <th class="text-uppercase" scope="col" >DEPARTAMENTO</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyDepartamento">
                                    </tbody>
                                </table>
                            </div>
                            <!-- /tables -->

                        </div>

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
                    <!-- /tab panel -->

                    <!-- Tab panel provincia-->
                    <div id="tab-provincias" class="tab-pane ">

                        <!-- Contact Container -->
                        <div class="dt-contacts__container ps-custom-scrollbar">
                            <!-- Card Body -->
                            <form id="FrmProvincia">
                                <div class="input-group search-box" style="max-width: 100%;">
                                    <input type="search" id="txtFilterNombreProvincia" class="form-control form-control-sm" placeholder="FILTRO. . .">
                                    <span class="search-icon"><i class="icon icon-search icon-lg"></i></span>
                                    <div class="input-group-prepend">
                                        <button type="submit" class="btn btn-primary btn-sm mr-2"><i class="icon icon-search icon-sisbu"></i> BUSCAR</button>
                                        <button type="button" class="btn btn-primary btn-sm" id="btnOpenNewProvincia"><i class="icon icon-plus icon-sisbu"></i></button>
                                    </div>
                                </div>
                            </form>

                            <!-- Tables -->
                            <div class="table-responsive">
                                <table class="table mb-0 ">
                                    <thead >
                                        <tr >
                                            <th class="text-uppercase  text-center" scope="col" style="width: 10%">ACCION</th>
                                            <th class="text-uppercase " scope="col" >PROVINCIA</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyProvincia">
                                    </tbody>
                                </table>
                            </div>
                            <!-- /tables -->

                        </div>
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
                    <!-- /tab panel -->

                    <!-- Tab panel distrito-->
                    <div id="tab-distritos" class="tab-pane active">

                        <!-- Contact Container -->

                        <div class="dt-contacts__container ps-custom-scrollbar">
                            <form id="FrmDistrito">
                                <div class="input-group search-box" style="max-width: 100%;">
                                    <input type="search" id="txtFilterNombreDistrito" class="form-control form-control-sm" placeholder="FILTRO...">
                                    <span class="search-icon"><i class="icon icon-search icon-lg"></i></span>
                                    <div class="input-group-prepend">
                                        <button type="submit" class="btn btn-primary btn-sm mr-2"><i class="icon icon-search icon-fw"></i> BUSCAR</button>
                                        <button type="button" class="btn btn-primary btn-sm" id="btnOpenNewDistrito"><i class="icon icon-plus icon-fw"></i></button>
                                    </div>
                                </div>
                            </form>
                            <!-- Tables -->
                            <div class="table-responsive">
                                <table class="table mb-0">
                                    <thead>
                                        <tr> 
                                            <th class="text-uppercase text-center" scope="col"  style="width: 10%">ACCION</th>
                                            <th class="text-uppercase" scope="col" >DISTRITO</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyDistrito">
                                    </tbody>
                                </table>
                            </div>
                            <!-- /tables -->

                        </div>

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

                        <!-- /contact container -->

                    </div>
                    <!-- /tab panel -->

                </div>
                <!-- /tab content-->
            </div>
            <!-- /card body -->
        </div>
        <!-- /card -->
    </div>
</div>


<!-- distrito-->
<div class="modal fade" id="ventanaModalDistrito" data-backdrop="static" style="overflow-y:auto;" 
     tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-md" role="document">
        <div class="modal-content">
            <form id="FrmDistritoModal">
                <div class="modal-header">
                    <h6 class="modal-title" id="txtTituloModalDistrito"></h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="form-group col-12">
                            <label for="txtNombreDistrito">DISTRITO</label>
                            <input class="form-control form-control-sm" id="txtNombreDistrito" type="text" placeholder="NOMBRE">
                        </div>
                        <div class="form-group col-12 " >
                            <label for="txtProvinciaDistrito">PROVINCIA</label>
                            <div class="search-box " style="max-width: 100%;">
                                <div class="input-group">
                                    <input class="form-control form-control-sm" placeholder="Filter..." id="txtFilterProvinciaER"  type="search">
                                    <span class="search-icon"><i class="icon icon-search icon-lg"></i></span>
                                </div>
                                <div id="ResultadoTablaProvincia" style="overflow-y: scroll;"> 
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary btn-sm" data-dismiss="modal">CANCELAR</button>
                    <button type="submit" id="btnGuardarDistrito" class="btn btn-outline-primary btn-sm"><i class="fa fa-floppy-o"></i> GUARDAR</button>
                </div>
            </form>
        </div>
    </div>
</div>

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

<div class="modal fade" id="ventanaModalProvincia" data-backdrop="static" style="overflow-y:auto;" 
     tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-md" role="document">
        <div class="modal-content">
            <form id="FrmProvinciaModal">
                <div class="modal-header">
                    <h6 class="modal-title" id="txtTituloModalProvincia"></h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="form-group col-12">
                            <label for="txtNombreProvincia">PROVINCIA</label>
                            <input class="form-control form-control-sm" id="txtNombreProvincia" type="text" placeholder="NOMBRE">
                        </div>
                        <div class="form-group col-12 " >
                            <label for="txtDepartamentoProvincia">DEPARTAMENTO</label>
                            <div class="search-box " style="max-width: 100%;">
                                <div class="input-group">
                                    <input class="form-control form-control-sm" placeholder="Filter..." id="txtFilterDepartamentoER"  type="search">
                                    <span class="search-icon"><i class="icon icon-search icon-lg"></i></span>
                                </div>
                                <div id="ResultadoTablaDepartamento" style="overflow-y: scroll;"> 
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary btn-sm" data-dismiss="modal">CANCELAR</button>
                    <button type="submit" id="btnGuardarProvincia" class="btn btn-outline-primary btn-sm"><i class="fa fa-floppy-o"></i> GUARDAR</button>
                </div>
            </form>
        </div>
    </div>
</div>

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

<div class="modal fade" id="ventanaModalDepartamento" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <form id="FrmDepartamentoModal">
                <div class="modal-header">
                    <h6 class="modal-title" id="txtTituloModalDepartamento"></h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="form-group col-12">
                            <label for="txtNombreDepartamento">DEPARTAMENTO</label>
                            <input class="form-control form-control-sm" id="txtNombreDepartamento" type="text" placeholder="NOMBRE">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary btn-sm" data-dismiss="modal">CANCELAR</button>
                    <button type="submit" id="btnGuardarDepartamento" class="btn btn-outline-primary btn-sm"><i class="fa fa-floppy-o"></i> GUARDAR</button>
                </div>
            </form>
        </div>
    </div>
</div>

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