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
                <h4 class="mb-0" id="titleManagerPersonal">[ 2 ] COMIDAS</h4>
                <input type="hidden" id="pagePersonal" value="1">
            </div>
            <!-- /card header -->
            <!-- Card Body -->
            <div class="card-body pt-0">
                <form id="FrmPersonal">
                    <div class="input-group search-box" style="max-width: 100%;">
                        <input type="search" id="txtFilterDniPersonal" class="form-control " placeholder="FILTRO DNI">
                        <span class="search-icon"><i class="icon icon-search icon-lg"></i></span>
                        <select class="custom-select col-2" id="txtFilterEstadoPersonal">
                            <option selected value="1">ACTIVOS</option>
                            <option value="0">INACTIVOS</option>
                            <option value="-1">TODOS</option>
                        </select>
                        <button type="submit" class="btn btn-primary btn-sm mr-2"><i class="icon icon-search icon-fw"></i> BUSCAR</button>
                        <button type="button" class="btn btn-primary btn-sm" id="btnOpenNewPersonal"><i class="icon icon-plus icon-fw"></i></button>
                    </div>
                </form>
                <!-- Tables -->
                <div class="table-responsive">
                    <table class="table table-bordered mb-0 mt-2">
                        <thead>
                            <tr>
                                <th class="text-uppercase" scope="col" >DNI</th>
                                <th class="text-uppercase" scope="col" >AP. PATERNO</th>
                                <th class="text-uppercase" scope="col" >AP. MATERNO</th>
                                <th class="text-uppercase" scope="col" >NOMBRES</th>
                                <th class="text-uppercase" scope="col" >CARGO</th>
                                <th class="text-uppercase" scope="col" >AREA</th>
                                <th class="text-uppercase" scope="col" >TIPO PERSONAL</th>
                                <th class="text-uppercase" scope="col" colspan="2" style="width: 20%">ACCION</th>
                            </tr>
                        </thead>
                        <tbody id="tbodyPersonal">
                        </tbody>
                    </table>
                </div>
                <!-- /tables -->
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
            </div>
            <!-- /card body -->
        </div>
        <!-- /card -->
    </div>
</div>
<div class="modal fade" id="ventanaModalPersonal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <form id="FrmPersonalModal">
                <div class="modal-header">
                    <h6 class="modal-title" id="txtTituloModalMan"></h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="form-group col-12">
                            <label for="txtDescripcionPersonal">DESCRIPCION</label>
                            <input class="form-control form-control-sm" id="txtDescripcionPersonal" type="text" placeholder="DESCRIPCION">
                        </div>
                        <div class="form-group col-12">
                            <label for="txtTipoPersonal">TIPO</label>
                            <select class="custom-select" id="txtTipoPersonal">
                                <option selected="0" value="0">seleccione...</option>
                                <option value="1">SEGUNDO</option>
                                <option value="2">BEBIDA</option>
                                <option value="3">POSTRE</option>
                                <option value="4">SOPA</option>
                            </select>
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
<div class="modal fade" id="modalCargandoPersonal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Cargando Personals. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
