<%-- 
    Document   : categoria
    Created on : 23/10/2019, 06:15:02 PM
    Author     : Andres
--%>


<div class="row" id="btnListaCategoria">
    <!-- Card -->
    <div class="col-12 p-0">
        <!-- Card Header -->
        <div class="card-header bg-transparent pl-0">
            <h4 class="mb-0" id="titleManagerCategoria">[ 0 ] CATEGORIAS</h4>
            <input type="hidden" id="pageCategoria" value="1">
        </div>
        <!-- /card header -->
        <!-- Card Body -->
        <div class="card-body p-0">
            <form id="FrmCategoria" class="search-box mw-100 left-side-icon">
                <div class="input-group">
                    <input type="search" id="txtFilterCategoria" class="form-control form-control-sm"
                        placeholder="Filter Nombre..." data-toggle="tooltip" data-placement="left"
                        data-original-title="Buscar" />
                    <button type="submit" class="search-icon">
                        <i class="icon icon-search icon-lg"></i></button>
                    <div class="input-group-append">
                        <button type="button" class="btn btn-primary btn-sm ml-5" id="btnOpenNewCategoria"
                            data-toggle="tooltip" title="Agregar Categor�a"><i class="icon icon-addnew"></i></button>
                    </div>

                </div>
            </form>
            <div class="dt-card mt-4">
                <!-- Card Body -->
                <div class="dt-card__body p-0  ">
                    <!-- Widget -->
                    <div class="dt-widget dt-widget-hl-item-space dt-widget-mb-item dt-widget-hover-bg"
                        id="tbodyCategoria">
                    </div>
                    <!-- /widget -->
                    <!-- /card body -->
                </div>

            </div>
            <!-- /card -->
            <!-- /tables -->
            <div class="row mt-2">
                <div class="col-md-2 col-sm-3 col-4">
                    <select id="sizePageCategoria" class="form-control form-control-sm select2-single">
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>
                <div class="col-md-10 col-sm-9 col-8">
                    <nav aria-label="Page navigation example">
                        <ul id="paginationCategoria" class="pagination pagination-sm justify-content-end">
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
        <!-- /card body -->
    </div>
    <!-- /card -->
</div>

<div class="row justify-content-center" id="btnOpenCategoria" style="display: none;">
    <div class="col-lg-5 col-md-6 col-sm-8 col-12">
        <form id="FrmCategoriaModal" class="card dt-card dt-social-card border border-w-2 border-light-teal p-1 m-0">

            <h4 id="txtTituloModalMan" class="card-header m-1 text-center text-primary">CATEGOR�AS</h4>
            <div class="card-body p-2">
                <div class="form-group col-lg-12">
                </div>
                <div class="form-group col-lg-12">
                    <label for="txtNombreCategoria">Nombre</label>
                    <input class="form-control form-control-sm" id="txtNombreCategoria" type="text"
                        placeholder="NOMBRE">
                </div>

                <div class="form-group col-12 text-center">
                    <button type="submit" class="btn btn-primary btn-sm"><i class="fas fa-check"></i>
                        GUARDAR</button>
                    <button type="button" id="btnRegresar" class="btn btn-outline-secondary btn-sm"><i
                            class="icon icon-reply"></i> CANCELAR</button>

                </div>
            </div>

        </form>
    </div>
</div>

<div class="modal fade" id="modalCargandoCategoria" data-backdrop="static" data-keyboard="false" tabindex="-1"
    role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                        aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Cargando Categorias. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>