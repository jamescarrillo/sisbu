<%-- 
    Document   : comida.jsp
    Created on : 28/08/2019, 09:48:09 AM
    Author     : Andres
--%>

<div class="row">
    <div class="col-xl-12" id="btnListaVideoTutorial">
        <!-- Card -->
        <div class="card overflow-hidden">
            <!-- Card Header -->
            <div class="card-header bg-transparent">
                <h4 class="mb-0" id="titleManagerVideoTutorial">[ 0 ] VIDEO TUTORIALES</h4>
                <input type="hidden" id="pageVideoTutorial" value="1">
            </div>
            <!-- /card header -->
            <!-- Card Body -->
            <div class="card-body pt-0">
                <form id="FrmVideoTutorial">
                    <div class="input-group search-box" style="max-width: 100%;">
                        <input type="text" id="txtFilterVideoTutorial" class="form-control form-control-sm" placeholder="Filter...">
                        <div class="input-group-append">
                            <button type="submit" class="btn btn-primary btn-sm mr-2"><i class="icon icon-search icon-fw"></i> BUSCAR</button>
                        </div>
                        <button data-toggle='tooltip' title='Agregar Video' type="button" class="btn btn-primary btn-sm" id="btnOpenNewVideoTutorial"><i class="icon icon-plus icon-fw"></i></button>
                    </div>
                </form>
                <!-- Tables -->
                <!-- Card -->
                <div class=" pb-4 ">

                    <!-- Card Header -->
                    <div class="dt-card__header mb-3">

                        <!-- Card Heading -->
                        <div class="dt-card__heading">

                            <!-- Widget Item -->
                            <div class="dt-widget__item border-bottom" >

                                <!-- Widget Info -->
                                <div class="dt-widget__info text-truncate">
                                    <h3 class="dt-card__title">TÍTULO</h3>
                                </div>
                                <!-- /widget info -->

                                <!-- Widget Info -->
                                <div class="dt-widget__info text-truncate">
                                    <h3 class="dt-card__title">DESCRIPCIÓN</h3>
                                </div>
                                <!-- /widget info -->
                                <!-- Widget Info -->
                                <div class="dt-widget__info text-truncate">
                                    <h3 class="dt-card__title">LINK</h3>
                                </div>
                                <!-- /widget info -->
                            </div>
                            <!-- /widgets item -->

                        </div>
                        <!-- /card heading -->

                    </div>
                    <!-- /card header -->

                    <!-- Card Body -->
                    <div class="dt-card__body p-0  " >
                        <!-- Widget -->
                        <div class="dt-widget dt-widget-hover ps-custom-scrollbar ps ps--active-y" id="tbodyVideoTutorial">

                        </div>
                        <!-- /widget -->
                        <!-- /card body -->

                    </div>
                    <!-- /card -->

                </div>

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

    <div class="col-xl-12" id="btnOpenVideoTutorial" style="display:none;">
        <!-- Card -->
        <div class="card overflow-hidden p-5">
            <div class="card-header bg-transparent">
                <h4 class="mb-0 text-center" id="txtTituloModalMan"> VIDEO TUTORIALES</h4>

            </div>
            <form id="FrmVideoTutorialModal"> 
                <div class="row">
                    <div class="form-group col-6">
                        <label for="txtTituloVideoTutorial">Título</label>
                        <input class="form-control form-control-sm" id="txtTituloVideoTutorial" type="text" placeholder="TÍTULO">
                    </div>
                    <div class="form-group col-6">
                        <label for="txtLinkVideoTutorial">Link</label>
                        <input class="form-control form-control-sm" id="txtLinkVideoTutorial" type="text" placeholder="LINK">
                    </div>
                    <div class="form-group col-12">
                        <label for="txtDescripcionVideoTutorial">Descripción</label>
                        <textarea class="form-control" id="txtDescripcionVideoTutorial" rows="3" placeholder="DESCRIPCIÓN"></textarea>
                    </div>
                    <div class="form-group col-12 text-center">
                        <button type="button" id="btnRegresar" class="btn btn-outline-primary btn-sm" >CANCELAR</button>
                        <button type="submit" id="btnGuardar" class="btn btn-primary btn-sm"><i class="fas fa-check"></i> GUARDAR</button>
                    </div>
                </div>
            </form>

        </div>
        <!-- /card -->



    </div>


</div>

<div class="modal fade" id="modalCargandoVideoTutorial" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Cargando VideoTutorials. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
