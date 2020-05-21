<%-- 
    Document   : comida.jsp
    Created on : 28/08/2019, 09:48:09 AM
    Author     : Andres
--%>
<div class="row">
    <div class="col-xl-12 p-0">
        <!-- Card -->
        <div class="overflow-hidden" id="ListaOpenComida">
            <!-- Card Header -->
            <div class="card-header bg-transparent pt-0 pl-0">
                <h4 class="mb-0" id="titleManagerComida">[ 0 ] COMIDAS</h4>
                <input type="hidden" id="pageComida" value="1">
            </div>
            <!-- /card header -->
            <!-- Card Body -->
            <div class="card-body p-0">
                <form id="FrmComida" class="search-box left-side-icon mw-100">
                    <div class="input-group">
                        <input type="search" id="txtFilterComida" class="form-control form-control-sm"
                            placeholder="Buscar comida..." data-toggle="tooltip" data-placement="left"
                            data-original-title="Buscar">

                        <button type="submit" class="search-icon"><i class="icon icon-search icon-lg"></i></button>
                        <div class="input-group-append ">
                            <select class=" form-control form-control-sm" id="txtFilterTipoComida">
                                <option selected value="-1">seleccione tipo...</option>
                                <option value="1">SEGUNDO</option>
                                <option value="2">BEBIDA</option>
                                <option value="3">POSTRE</option>
                                <option value="4">SOPA</option>
                            </select>
                            <button type="button" class="btn btn-primary btn-sm ml-4" id="btnOpenNewComida"
                                data-toggle="tooltip" data-placement="top" data-original-title="Agregar Comida"><i
                                    class="icon icon-addnew"></i></button>
                        </div>

                    </div>
                </form>
                <!-- Card -->
                <div class="dt-card mt-4">
                    <!-- Card Body -->
                    <div class="dt-card__body p-0  ">
                        <!-- Widget -->
                        <div class="dt-widget dt-widget-hl-item-space dt-widget-mb-item dt-widget-hover-bg border"
                            id="tbodyComida">
                        </div>
                        <!-- /widget -->
                        <!-- /card body -->
                    </div>

                </div>
                <!-- /card -->

                <div class="row mt-2">
                    <div class="col-md-2 col-sm-3 col-4">
                        <select id="sizePageComida" class="form-control form-control-sm select2-single">
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                    <div class="col-md-10 col-sm-9 col-8 ">
                        <nav aria-label="Page navigation example">
                            <ul id="paginationComida" class="pagination pagination-sm justify-content-center ">
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            <!-- /card body -->
        </div>
        <!-- /card -->

        <div class="form-row justify-content-center">
            <div class="card dt-card dt-social-card border border-w-4 border-light-teal">
                <!-- Card -->
                <div id="FormularioOpenComida">
                </div>
                <!-- /card -->
            </div>

        </div>

    </div>
</div>



<div class="modal fade" id="modalCargandoComida" data-backdrop="static" data-keyboard="false" tabindex="-1"
    role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                        aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Cargando Comidas. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>