<%-- 

    Document   : comida.jsp
    Created on : 28/08/2019, 09:48:09 AM
    Author     : Andres
--%>

<div class="row">
    <div class="col-xl-12">
        <!-- Card -->
        <div class="card overflow-hidden">
            <!-- Card Header -->
            <div class="card-header bg-transparent">
                <h4 class="mb-0" id="titleManagerOficina">[ 2 ] OFICINAS</h4>
                <input type="hidden" id="pageOficina" value="1">
            </div>
            <!-- /card header -->
            <!-- Card Body -->
            <div class="card-body pt-0">
                <form id="FrmOficina">
                    <div class="input-group search-box" style="max-width: 100%;">
                        <input type="search" id="txtFilterNombreOficina" class="form-control form-control-sm" placeholder="FILTRO...">
                        <span class="search-icon"><i class="icon icon-search icon-lg"></i></span>
                        <div class="input-group-prepend">
                            <button type="submit" class="btn btn-primary btn-sm mr-2"><i class="icon icon-search icon-fw"></i> BUSCAR</button>
                            <button type="button" class="btn btn-primary btn-sm" id="btnOpenNewOficina"><i class="icon icon-plus icon-fw"></i></button>
                        </div>
                    </div>
                </form>
                <!-- Tables -->
                <div class="table-responsive">
                    <table class="table mb-0">
                        <thead>
                            <tr> 
                                <th class="text-uppercase text-center" scope="col" colspan="2" style="width: 20%">ACCION</th>
                                <th class="text-uppercase" scope="col" >OFICINAS</th>
                                <th class="text-uppercase text-center" scope="col" >ÁREA</th>
                            </tr>
                        </thead>
                        <tbody id="tbodyOficina">
                        </tbody>
                    </table>
                </div>
                <!-- /tables -->
                <div class="row mt-2">
                    <div class="col-md-2 col-sm-3 col-4">
                        <select id="sizePageOficina" class="form-control form-control-sm select2-single">
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                    <div class="col-md-10 col-sm-9 col-8">
                        <nav aria-label="Page navigation example">
                            <ul id="paginationOficina" class="pagination pagination-sm justify-content-end">
                            </ul>
                        </nav>  
                    </div>
                </div>
            </div>
            <!-- /card body -->
        </div>
        <!-- /card -->
    </div>
</div>
<div class="modal fade" id="ventanaModalOficina" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <form id="FrmOficinaModal">
                <div class="modal-header">
                    <h6 class="modal-title" id="txtTituloModalMan"></h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="form-group col-12">
                            <label for="txtNombreOficina">NOMBRE</label>
                            <input class="form-control form-control-sm" id="txtNombreOficina" type="text" placeholder="NOMBRE">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary btn-sm" data-dismiss="modal">CANCELAR</button>
                    <button type="submit" id="btnGuardar" class="btn btn-outline-primary btn-sm"><i class="fa fa-floppy-o"></i> GUARDAR</button>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="modal fade" id="ventanaModalArea" data-backdrop="static" style="overflow-y:auto;" 
     tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h6 class="modal-title" id="txtTituloModalArea"></h6>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body" >
                <!-- Card Header -->
                <div class="card-header bg-transparent pt-1 pl-1">
                    <h4 class="mb-0" id="titleManagerArea">[ 2 ] ÁREAS</h4>
                    <input type="hidden" id="pageArea" value="1">
                </div>
                <!-- Card Body -->
                <form id="FrmArea">
                    <div class="input-group search-box" style="max-width: 100%;">
                        <input type="search" id="txtFilterNombreArea" class="form-control form-control-sm" placeholder="FILTRO. . .">
                        <span class="search-icon"><i class="icon icon-search icon-lg"></i></span>
                        <div class="input-group-prepend">
                            <button type="submit" class="btn btn-primary btn-sm mr-2"><i class="icon icon-search icon-sisbu"></i> BUSCAR</button>
                            <button type="button" class="btn btn-primary btn-sm" id="btnOpenNewArea"><i class="icon icon-plus icon-sisbu"></i></button>
                        </div>
                    </div>
                </form>
                <div class="row mt-2">
                    <div class="col-12">
                        <!-- Tables -->
                        <div class="table-responsive">
                            <table class="table table-sm mb-0 ">
                                <thead class="bg-primary">
                                    <tr >
                                        <th class="text-uppercase text-white pt-3 text-center" scope="col" colspan="2" style="width: 20%">ACCION</th>
                                        <th class="text-uppercase text-white pt-3" scope="col" >NOMBRE</th>
                                        <th class="text-uppercase text-white pt-3" scope="col" >ABREVIADO</th>
                                    </tr>
                                </thead>
                                <tbody id="tbodyArea">
                                </tbody>
                            </table>
                        </div>
                        <!-- /tables -->

                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary btn-sm" data-dismiss="modal">CANCELAR</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="ventanaModalAreaCRUD" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <form id="FrmAreaModal">
                <div class="modal-header">
                    <h6 class="modal-title" id="txtTituloModalAreaCRUD"></h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="form-group col-12">
                            <label for="txtNombreArea">NOMBRE</label>
                            <input class="form-control form-control-sm" id="txtNombreArea" type="text" placeholder="NOMBRE">
                        </div>
                        <div class="form-group col-12">
                            <label for="txtAbreviadoArea">ABREVIADO</label>
                            <input class="form-control form-control-sm" id="txtAbreviadoArea" type="text" placeholder="ABREVIADO">
                        </div>

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary btn-sm" data-dismiss="modal">CANCELAR</button>
                    <button type="submit" id="btnGuardarArea" class="btn btn-outline-primary btn-sm"><i class="fa fa-floppy-o"></i> GUARDAR</button>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="modal fade" id="modalCargandoOficina" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Cargando Oficinas. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="modalCargandoArea" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Cargando Area. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
=======
    Document   : area
    Created on : 23 ago. 2019, 15:21:05
    Author     : James Carrillo
--%>

<div class="row">
    <div class="col-xl-12">

        <!-- Card -->
        <div class="card overflow-hidden">

            <!-- Card Header -->
            <div class="card-header bg-transparent">
                <h4 class="mb-0" id="titleManagerOficina">[ 0 ] OFICINAS</h4>
                <input type="hidden" id="pageOficina" value="1">
            </div>
            <!-- /card header -->

            <!-- Card Body -->
            <div class="card-body pt-0">
                <form id="FrmOficina">
                    <div class="input-group">
                        <input type="text" id="txtFilterOficina" class="form-control form-control-sm" placeholder="FILTRO. . .">
                        <div class="input-group-prepend">
                            <button type="submit" class="btn btn-primary btn-sm mr-2"><i class="icon icon-search icon-sisbu"></i> BUSCAR</button>
                            <button type="button" class="btn btn-primary btn-sm" id="btnOpenNewOficina"><i class="icon icon-plus icon-sisbu"></i></button>
                        </div>
                    </div>
                </form>
                <div class="row mt-2">
                    <div class="col-12">
                        <!-- Tables -->
                        <div class="table-responsive">
                            <table class="table table-bordered table-sm mb-0">
                                <thead class="bg-primary">
                                    <tr>
                                        <th class="text-uppercase text-white" scope="col" >NOMBRE</th>
                                        <th class="text-uppercase text-white text-center" scope="col" colspan="2" style="width: 20%">ACCION</th>
                                    </tr>
                                </thead>
                                <tbody id="tbodyOficina">
                                </tbody>
                            </table>
                        </div>
                        <!-- /tables -->
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col-md-2 col-sm-3 col-4">
                        <select id="sizePageOficina" class="form-control form-control-sm select-pagination sisbu-cursor-mano">
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                    <div class="col-md-10 col-sm-9 col-8">
                        <nav aria-label="Page navigation example">
                            <ul id="paginationOficina" class="pagination pagination-sm justify-content-end">
                            </ul>
                        </nav>  
                    </div>
                </div>

            </div>
            <!-- /card body -->

        </div>
        <!-- /card -->

    </div>
</div>

<div class="modal fade" id="ventanaModalOficina" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <form id="FrmOficinaModal">
                <div class="modal-header">
                    <h6 class="modal-title" id="txtTituloModalMan"></h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="form-group col-12">
                            <label for="txtNombreOficinaER">NOMBRE</label>
                            <input class="form-control form-control-sm" id="txtNombreOficinaER" type="text" placeholder="NOMBRE">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary btn-sm" data-dismiss="modal">CANCELAR</button>
                    <button type="submit" id="btnGuardar" class="btn btn-outline-primary btn-sm"><i class="fa fa-floppy-o"></i> GUARDAR</button>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="modal fade" id="modalCargandoOficina" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Cargando Oficinas. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

