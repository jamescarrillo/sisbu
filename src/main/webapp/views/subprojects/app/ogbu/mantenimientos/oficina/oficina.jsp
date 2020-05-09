<%-- 
    Document   : area
    Created on : 23 ago. 2019, 15:21:05
    Author     : James Carrillo
--%>

<div class="row">
    <div class="col-xl-12 p-0">

        <!-- Card -->
        <div class="overflow-hidden">

            <!-- Card Header -->
            <div class="card-header bg-transparent">
                <h4 class="mb-0" id="titleManagerOficina">[ 0 ] OFICINAS</h4>
                <input type="hidden" id="pageOficina" value="1">
            </div>
            <!-- /card header -->

            <!-- Card Body -->
            <div class="card-body p-0">
                <form id="FrmOficina">
                    <div class="input-group  search-box" style="max-width: 100%;">
                        <input type="search" id="txtFilterOficina" class="form-control form-control-sm"
                            placeholder="FILTRO. . ." data-toggle="tooltip" data-placement="left"
                            data-original-title="Buscar">
                        <button type="submit" class="search-icon">
                            <i class="icon icon-search icon-lg"></i></button>
                        <button type="button" class="btn btn-primary btn-sm ml-4" id="btnOpenNewOficina"
                            data-toggle="tooltip" data-original-title="Agregar Oficina"><i
                                class="icon icon-addnew"></i></button>
                    </div>
                </form>

                <!-- Card -->
                <div class="dt-card mt-4 p-0">
                    <!-- Card Body -->
                    <div class="dt-card__body p-0  ">
                        <!-- Widget -->
                        <div class="dt-widget dt-widget-hl-item-space dt-widget-mb-item dt-widget-hover-bg dt-social-card border border-w-2 border-light-teal"
                            id="tbodyOficina">
                        </div>
                        <!-- /widget -->
                        <!-- /card body -->
                    </div>

                </div>
                <!-- /card -->
                <div class="row mt-2">
                    <div class="col-md-2 col-sm-3 col-4">
                        <select id="sizePageOficina"
                            class="form-control form-control-sm select-pagination sisbu-cursor-mano">
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

<div class="modal fade" id="ventanaModalOficina" data-backdrop="static" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <form id="FrmOficinaModal">
                <div class="modal-header">
                    <h6 class="modal-title" id="txtTituloModalMan"></h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">�</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="form-group col-12">
                            <label for="txtNombreOficinaER">NOMBRE</label>
                            <input class="form-control form-control-sm" id="txtNombreOficinaER" type="text"
                                placeholder="NOMBRE">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-primary btn-sm" data-dismiss="modal">CANCELAR</button>
                    <button type="submit" id="btnGuardar" class="btn btn-primary btn-sm">GUARDAR</button>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="modal fade" id="modalCargandoOficina" data-backdrop="static" data-keyboard="false" tabindex="-1"
    role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                        aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Cargando Oficinas. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>