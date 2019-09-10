<%-- 
    Document   : menusemanal
    Created on : 29/08/2019, 11:42:21 AM
    Author     : Andres
--%>

<%-- 
    Document   : menusemanal
    Created on : 29/08/2019, 10:48:29 AM
    Author     : Andres
--%>


<div class="row">
    <div class="col-xl-12">
        <!-- Card -->
        <div class="card overflow-hidden">
            <!-- Card Header -->
            <div class="card-header bg-transparent">
                <h4 class="mb-0" id="titleManagerMenuSemanal">[ 2 ] MENUSEMANAL</h4>
                <input type="hidden" id="pageMenuSemanal" value="1">
            </div>
            <!-- /card header -->
            <!-- Card Body -->
            <div class="card-body pt-0">
                <form id="FrmMenuSemanal">
                    <div class="input-group">
                        <input type="text" id="txtFilterFechaInicial" class="form-control form-control-sm" placeholder="FILTRO. . . FECHA INICIAL">
                        <input type="text" id="txtFilterFechaFinal" class="form-control form-control-sm" placeholder="FILTRO. . . FECHA FINAL">
                        <button type="submit" class="btn btn-primary btn-sm mr-2"><i class="icon icon-search icon-fw"></i> BUSCAR</button>
                        <button type="button" class="btn btn-primary btn-sm" id="btnOpenNewMenuSemanal"><i class="icon icon-plus icon-fw"></i></button>
                    </div>
                </form>
                <!-- Tables -->
                <div class="table-responsive">
                    <table class="table mb-0">
                        <thead>
                            <tr>
                                <th class="text-uppercase" scope="col" >FECHA INICIAL</th>
                                <th class="text-uppercase" scope="col" >FECHA FINAL</th>
                                <th class="text-uppercase" scope="col" >OBSERVACIÓN</th>
                                <th class="text-uppercase" scope="col" colspan="2" style="width: 20%">ACCION</th>
                            </tr>
                        </thead>
                        <tbody id="tbodyMenuSemanal">
                        </tbody>
                    </table>
                </div>
                <!-- /tables -->
                <div class="row mt-2">
                    <div class="col-md-2 col-sm-3 col-4">
                        <select id="sizePageMenuSemanal" class="form-control form-control-sm select2-single">
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                    <div class="col-md-10 col-sm-9 col-8">
                        <nav aria-label="Page navigation example">
                            <ul id="paginationMenuSemanal" class="pagination pagination-sm justify-content-end">
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
<div class="modal fade" id="ventanaModalMenuSemanal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <form id="FrmMenuSemanalModal">
                <div class="modal-header">
                    <h6 class="modal-title" id="txtTituloModalMan"></h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="form-group col-lg-6 col-xs-12">
                            <label for="txtFechaInicialMenuSemanal">FECHA INICIAL</label>
                            <input class="form-control form-control-sm" id="txtFechaInicialMenuSemanal" type="date" placeholder="DESCRIPCION">
                        </div>
                        <div class="form-group col-lg-6 col-xs-12">
                            <label for="txtFechaFinalMenuSemanal">FECHA FINAL</label>
                            <input class="form-control form-control-sm" id="txtFechaFinalMenuSemanal" type="date" placeholder="DESCRIPCION">
                        </div>
                        <div class="form-group col-12">
                            <label for="txtObservacionMenuSemanal">OBSERVACIÓN</label>
                            <input class="form-control form-control-sm" id="txtObservacionMenuSemanal" type="text" placeholder="OBSERVACION">
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
<div class="modal fade" id="modalCargandoMenuSemanal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Cargando Menu Semanal. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
