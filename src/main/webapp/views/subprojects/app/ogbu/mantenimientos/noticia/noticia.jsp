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
                <h4 class="mb-0" id="titleManagerNoticia">[ 0 ] NOTICIAS</h4>
                <input type="hidden" id="pageNoticia" value="1">
            </div>
            <!-- /card header -->
            <!-- Card Body -->
            <div class="card-body pt-0">
                <form id="FrmNoticia">
                    <div class="input-group search-box" style="max-width: 100%;">
                        <div class="input-group col-10 pr-0 pl-0">
                            <div class="input-group-append">
                                <button type="button" id="btnEliminarFilterNoticia" data-toggle="tooltip" title="Eliminar Fecha" class="btn btn-primary btn-sm"><i class="fa fa-trash"></i></button>
                            </div>
                            <input type="text" id="txtFilterInicialNoticia" class="form-control form-control-sm" placeholder="Filter fecha Inicial...DD/MM/AAAA">
                            <input type="text" id="txtFilterFinalNoticia" class="form-control form-control-sm" placeholder="Filter fecha Final...DD/MM/AAAA">
                        </div>
                        <div class="input-group-append">
                            <button type="submit" class="btn btn-primary btn-sm mr-5"><i class="icon icon-search icon-fw"></i> BUSCAR</button>
                        </div>
                        <button type="button" class="btn btn-primary btn-sm" id="btnOpenNewNoticia"data-toggle="tooltip" title="Agregar Noticia" ><i class="icon icon-addnew"></i></button>
                    </div>
                </form>

                <!-- Card -->
                <div class="dt-card mt-4">
                    <!-- Card Body -->
                    <div class="dt-card__body p-0  " >
                        <!-- Widget -->
                        <div class="dt-widget dt-widget-hl-item-space dt-widget-mb-item dt-widget-hover-bg"
                             id="tbodyNoticia">
                        </div>
                        <!-- /widget -->
                        <!-- /card body -->
                    </div>

                </div>
                <!-- /card -->
                <!-- /tables -->
                <div class="row mt-2">
                    <div class="col-md-2 col-sm-3 col-4">
                        <select id="sizePageNoticia" class="form-control form-control-sm select2-single">
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                    <div class="col-md-10 col-sm-9 col-8">
                        <nav aria-label="Page navigation example">
                            <ul id="paginationNoticia" class="pagination pagination-sm justify-content-end">
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
<div class="modal fade" id="ventanaModalNoticia" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <form id="FrmNoticiaModal">
                <div class="modal-header">
                    <h6 class="modal-title" id="txtTituloModalMan"></h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="form-group col-12">
                            <label for="txtTituloNoticia">Título</label>
                            <input class="form-control form-control-sm" id="txtTituloNoticia" type="text" placeholder="TÍTULO">
                        </div>

                        <div class="form-group col-6">
                            <label for="txtFuenteNoticia">Fuente</label>
                            <input class="form-control form-control-sm" id="txtFuenteNoticia" type="text" placeholder="FUENTE">
                        </div>
                        <div class="form-group col-lg-6 col-sm-6 mb-3">
                            <label for="txtFechaNoticia">Fecha de Publicación</label>
                            <div class="input-group">
                                <input  type="text" class="form-control form-control-sm" id="txtFechaNoticia" placeholder="DD/MM/AAAA">
                                <div class="input-group-append">
                                    <button type="button" id="btnEliminarFechaNoticia" data-toggle="tooltip" title="Eliminar Fecha" class="btn btn-primary btn-sm"><i class="fa fa-trash"></i></button>
                                </div>
                            </div>
                        </div>
                        <div class="form-group col-12">
                            <label for="txtDescripcionNoticia">Descripción</label>
                            <textarea class="form-control" id="txtDescripcionNoticia" rows="3" placeholder="DESCRIPCIÓN"></textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-primary btn-sm" data-dismiss="modal"><i class="icon icon-reply"></i> CANCELAR</button>
                    <button type="submit" id="btnGuardar" class="btn btn-primary btn-sm"><i class="fas fa-check"></i> GUARDAR</button>
                </div>
            </form>
        </div>
    </div>
</div>
<div class="modal fade" id="modalCargandoNoticia" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Cargando Noticias. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
