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
                <h4 class="mb-0" id="titleManagerComida">[ 2 ] COMIDAS</h4>
                <input type="hidden" id="pageComida" value="1">
            </div>
            <!-- /card header -->
            <!-- Card Body -->
            <div class="card-body pt-0">
                <form id="FrmComida">
                    <div class="input-group">
                        <select class="custom-select " id="txtFilterTipoComida">
                            <option value="">seleccione tipo...</option>
                            <option selected  value="1">SEGUNDO</option>
                            <option value="2">BEBIDA</option>
                            <option value="3">POSTRE</option>
                            <option value="4">SOPA</option>
                        </select>
                        <input type="text" id="txtFilterComida" class="form-control " placeholder="FILTRO. . .">
                        <button type="submit" class="btn btn-primary btn-sm mr-2"><i class="icon icon-search icon-fw"></i> BUSCAR</button>
                        <button type="button" class="btn btn-primary btn-sm" id="btnOpenNewComida"><i class="icon icon-plus icon-fw"></i></button>
                    </div>
                </form>
                <!-- Tables -->
                <div class="table-responsive">
                    <table class="table mb-0">
                        <thead>
                            <tr>
                                <th class="text-uppercase" scope="col" >TIPO</th>
                                <th class="text-uppercase" scope="col" >DESCRIPCION</th>
                                <th class="text-uppercase" scope="col" colspan="2" style="width: 20%">ACCION</th>
                            </tr>
                        </thead>
                        <tbody id="tbodyComida">
                        </tbody>
                    </table>
                </div>
                <!-- /tables -->
                <div class="row mt-2">
                    <div class="col-md-2 col-sm-3 col-4">
                        <select id="sizePageComida" class="form-control form-control-sm select2-single">
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                    <div class="col-md-10 col-sm-9 col-8">
                        <nav aria-label="Page navigation example">
                            <ul id="paginationComida" class="pagination pagination-sm justify-content-end">
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
<div class="modal fade" id="ventanaModalComida" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <form id="FrmComidaModal">
                <div class="modal-header">
                    <h6 class="modal-title" id="txtTituloModalMan"></h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">�</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="form-group col-12">
                            <label for="txtDescripcionComida">DESCRIPCION</label>
                            <input class="form-control form-control-sm" id="txtDescripcionComida" type="text" placeholder="DESCRIPCION">
                        </div>
                        <div class="form-group col-12">
                            <label for="txtTipoComida">TIPO</label>
                            <select class="custom-select" id="txtTipoComida">
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
<div class="modal fade" id="modalCargandoComida" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Cargando Comidas. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>