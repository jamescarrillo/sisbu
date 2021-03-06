<%-- 
    Document   : comida.jsp
    Created on : 28/08/2019, 09:48:09 AM
    Author     : Andres
--%>

<div class="row">
    <div class="col-xl-12 p-0" id="btnListaVideoTutorial">
        <!-- Card -->
        <div class="overflow-hidden">
            <!-- Card Header -->
            <div class="card-header bg-transparent pl-0">
                <h4 class="mb-0" id="titleManagerVideoTutorial">[ 0 ] VIDEO TUTORIALES</h4>
                <input type="hidden" id="pageVideoTutorial" value="1">
            </div>
            <!-- /card header -->
            <!-- Card Body -->
            <div class="card-body  p-0">
                <form id="FrmVideoTutorial">
                    <div class="input-group search-box mw-100">
                        <input type="search" id="txtFilterVideoTutorial" class="form-control form-control-sm"
                            placeholder="Filter..." data-toggle="tooltip" data-placement="left"
                            data-original-title="Buscar">
                        <button type="submit" class="search-icon">
                            <i class="icon icon-search icon-lg"></i></button>
                        <button type="button" class="btn btn-primary btn-sm ml-4" id="btnOpenNewVideoTutorial"
                            data-toggle="tooltip" title="Agregar Video"><i class="icon icon-addnew"></i></button>
                    </div>
                </form>
                <div class="dt-card mt-4  p-0">
                    <!-- Card Body -->
                    <div class="dt-card__body p-0  ">
                        <!-- Widget -->
                        <div class="dt-widget dt-widget-hl-item-space dt-widget-mb-item dt-widget-hover-bg dt-social-card border border-w-2 border-light-teal"
                            id="tbodyVideoTutorial">
                        </div>
                        <!-- /widget -->
                        <!-- /card body -->
                    </div>

                </div>
                <!-- /card -->
                <!-- /tables -->
                <div class="row mt-2">
                    <div class="col-md-2 col-sm-3 col-4">
                        <select id="sizePageVideoTutorial" class="form-control form-control-sm select2-single">
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                    <div class="col-md-10 col-sm-9 col-8">
                        <nav aria-label="Page navigation example">
                            <ul id="paginationVideoTutorial" class="pagination pagination-sm justify-content-end">
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            <!-- /card body -->
        </div>
        <!-- /card -->

    </div>

    <div class="col-xl-12 p-0" id="btnOpenVideoTutorial" style="display:none;">
        <!-- Card -->
        <div class="card overflow-hidden p-5">
            <div class="card-header bg-transparent">
                <h4 class="mb-0 text-center" id="txtTituloModalMan"> VIDEO TUTORIALES</h4>

            </div>
            <form id="FrmVideoTutorialModal">
                <div class="row">
                    <div class="form-group col-6">
                        <label for="txtTituloVideoTutorial">Titulo</label>
                        <input class="form-control form-control-sm" id="txtTituloVideoTutorial" type="text"
                            placeholder="">
                    </div>
                    <div class="form-group col-6">
                        <label for="txtLinkVideoTutorial">Link</label>
                        <input class="form-control form-control-sm" id="txtLinkVideoTutorial" type="text"
                            placeholder="">
                    </div>
                    <div class="form-group col-12">
                        <label for="txtDescripcionVideoTutorial">Descripcion</label>
                        <textarea class="form-control" id="txtDescripcionVideoTutorial" rows="3"
                            placeholder=""></textarea>
                    </div>
                    <div class="form-group col-12 text-center">
                        <button type="button" id="btnRegresar" class="btn btn-outline-primary btn-sm"><i
                                class="icon icon-reply"></i> CANCELAR</button>
                        <button type="submit" id="btnGuardar" class="btn btn-primary btn-sm"><i
                                class="fas fa-check"></i> GUARDAR</button>
                    </div>
                </div>
            </form>

        </div>
        <!-- /card -->



    </div>


</div>

<div class="modal fade" id="modalCargandoVideoTutorial" data-backdrop="static" data-keyboard="false" tabindex="-1"
    role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                        aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Cargando Videos tutoriales. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>