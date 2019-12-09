<%-- 
    Document   : comida.jsp
    Created on : 28/08/2019, 09:48:09 AM
    Author     : Andres
--%>

<div class="row">
    <div class="col-xl-12" id="btnListaProducto">
        <!-- Card -->
        <div class="card overflow-hidden">
            <!-- Card Header -->
            <div class="card-header bg-transparent">
                <h4 class="mb-0" id="titleManagerProducto">[ 0 ] PRODUCTOS</h4>
                <input type="hidden" id="pageProducto" value="1">
            </div>
            <!-- /card header -->
            <!-- Card Body -->
            <div class="card-body pt-0">
                <form id="FrmProducto">
                    <div class="input-group search-box" style="max-width: 100%;">
                        <input type="search" id="txtFilterProducto" class="form-control form-control-sm" placeholder="Filter Nombre...">
                        <div class="input-group-append">
                            <span class="search-icon"><i class="icon icon-search icon-lg"></i></span>
                            <button type="submit" class="btn btn-primary btn-sm mr-2"><i class="icon icon-search icon-fw"></i> BUSCAR</button>
                        </div>
                        <button type="button" class="btn btn-primary btn-sm" id="btnOpenNewProducto"data-toggle="tooltip" title="Agregar Producto" ><i class="icon icon-addnew"></i></button>
                    </div>
                </form>
                <div class="dt-card mt-4">
                    <!-- Card Body -->
                    <div class="dt-card__body p-0  " >
                        <!-- Widget -->
                        <div class="dt-widget dt-widget-hl-item-space dt-widget-mb-item dt-widget-hover-bg"
                             id="tbodyProducto">
                        </div>
                        <!-- /widget -->
                        <!-- /card body -->
                    </div>

                </div>
                <!-- /card -->
                <!-- /tables -->
                <div class="row mt-2">
                    <div class="col-md-2 col-sm-3 col-4">
                        <select id="sizePageProducto" class="form-control form-control-sm select2-single">
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                    <div class="col-md-10 col-sm-9 col-8">
                        <nav aria-label="Page navigation example">
                            <ul id="paginationProducto" class="pagination pagination-sm justify-content-end">
                            </ul>
                        </nav>  
                    </div>
                </div>
            </div>
            <!-- /card body -->
        </div>
        <!-- /card -->

    </div>

    <div class="col-xl-12" id="btnOpenProducto" style="display: none">
        <!-- Card -->
        <div class="card overflow-hidden p-5">
            <div class="card-header bg-transparent">
                <h4 class="mb-0 text-center text-primary" id="txtTituloModalMan"> PRODUCTO</h4>

            </div>
            <form id="FrmProductoModal"> 
                <div class="row">
                    <div class="form-group col-lg-4 col-sm-4">
                        <label for="txtCodigoProducto">Código</label>
                        <input class="form-control form-control-sm" id="txtCodigoProducto" type="text" placeholder="CÓDIGO">
                    </div>
                    <div class="form-group col-lg-4  col-sm-4">
                        <label for="txtNombreProducto">Nombre</label>
                        <input class="form-control form-control-sm" id="txtNombreProducto" type="text" placeholder="NOMBRE">
                    </div>

                    <div class="form-group col-lg-4  col-sm-4">
                        <label for="txtCantidadProducto">Cantidad Mínima</label>
                        <input class="form-control form-control-sm" id="txtCantidadProducto" type="text" placeholder="CANTIDAD MÍNIMA" maxlength="6">
                    </div>
                    <div class="form-group col-lg-4  col-sm-4">
                        <label for="txtFactorProducto">Factor de Conversión</label>
                        <input  class="form-control form-control-sm" id="txtFactorProducto" type="text" placeholder="FACTOR" maxlength="6">
                    </div>
                    <div class="form-group col-lg-4  col-sm-4">
                        <label for="txtEstadoProducto">ESTADO</label>
                        <select class="form-control form-control-sm" id="txtEstadoProducto">
                            <option value="-1">Seleccione...</option>
                            <option value="1">ACTIVO</option>
                            <option value="0">INACTIVO</option>
                        </select>
                    </div>
                   
                    <div class="form-group col-lg-4  col-sm-4">
                        <label for="txtCategoriaProducto">Categoría
                        </label>
                        <div class="input-group">
                            <input type="text" class="form-control form-control-sm" id="txtCategoriaProducto" aria-describedby="nombre" placeholder="Click en el botón para seleccionar. . ." disabled="">
                            <div class="input-group-append">
                                <button type="button" id="btnSeleccionarCategoria" class="btn btn-primary btn-sm"><i class="icon icon-subscribe"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-lg-6 col-sm-6 ">
                        <label for="txtUnidadMedidaIProducto">Unidad de Medida de Ingreso
                        </label>
                        <div class="input-group">
                            <input type="text" class="form-control form-control-sm" id="txtUnidadMedidaIProducto" aria-describedby="nombre" placeholder="Click en el botón para seleccionar. . ." disabled="">
                            <div class="input-group-append">
                                <button type="button" id="btnSeleccionarUnidadMedidaI" class="btn btn-primary btn-sm"><i class="icon icon-subscribe"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-lg-6 col-sm-6 ">
                        <label for="txtUnidadMedidaSProducto">Unidad de Medida de Salida
                        </label>
                        <div class="input-group">
                            <input type="text" class="form-control form-control-sm" id="txtUnidadMedidaSProducto" aria-describedby="nombre" placeholder="Click en el botón para seleccionar. . ." disabled="">
                            <div class="input-group-append">
                                <button type="button" id="btnSeleccionarUnidadMedidaS" class="btn btn-primary btn-sm"><i class="icon icon-subscribe"></i></button>
                            </div>
                        </div>
                    </div>
                     <div class="form-group col-lg-12">
                        <label for="txtDescripcionProducto">Descripción</label>
                        <textarea class="form-control" id="txtDescripcionProducto" rows="2" placeholder="DESCRIPCIÓN"></textarea>
                    </div>
                    <div class="form-group col-12 text-center">
                        <button type="button" id="btnRegresar" class="btn btn-outline-primary btn-sm" ><i class="icon icon-reply"></i> CANCELAR</button>
                        <button type="submit" id="btnGuardar" class="btn btn-primary btn-sm"><i class="fas fa-check"></i> GUARDAR</button>
                    </div>
                </div>
            </form>

        </div>
        <!-- /card -->



    </div>


</div>

<div class="modal fade" id="modalCargandoProducto" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Cargando Productos. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!--T: CATEGORIA SELECTED-->
<div id="ventanaModalSelectedCategoriaC" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
     data-keyboard="false" style="padding-top: 2%; overflow-y: visible;background-color: rgba(0,0,0,.2)">
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="border-color: #0085c1; border-width: 4px;">
            <div class="modal-header">
                <h5 class="mb-0" id="titleManagerCategoriaC"><strong>[ 0 ]
                        CATEGORÍAS</strong></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pb-0 pt-0">
                <div class="row">
                    <div class="col-12">
                        <input type="hidden" id="pageCategoriaC"
                               value="1">
                        <form id="FrmCategoriaC">
                            <div class="row mt-3">
                                <div class="input-group col-12">
                                    <input type="text" id="txtFilterCategoriaC"
                                           class="form-control form-control-sm mr-3" placeholder="INGRESE FILTRO . . .">
                                    <button type="submit" id="btnBuscarCategoriaC"
                                            class="btn btn-primary btn-xs" data-toggle="tooltip"
                                            title="Buscar Pregunta"><i class="fa fa-search" aria-hidden="true"></i>
                                        BUSCAR</button>
                                </div>
                            </div>
                        </form>
                        <div class="row pl-5 pr-5 mb-2">
                            <div class="table-responsive">
                                <table class="table mb-0 table-fluid">
                                    <thead>
                                        <tr>
                                            <th class="align-middle text-left">Categoría</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyCategoriaC">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row mt-2 mb-2" style="display: none">
                            <div class="col-sm-4 mt-2">
                                <select id="sizePageCategoriaC"
                                        class="form-control form-control-sm sisbu-cursor-mano combo-paginar">
                                    <option value="5">05</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>
                            <div class="col-sm-8 mt-2">
                                <nav aria-label="Page navigation">
                                    <ul id="paginationCategoriaC"
                                        class="pagination justify-content-end">
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal" id="btnCancelSelectionCategoriaC"><i class="fas fa-ban"></i>
                    CANCELAR</button>
                <button type="button" id="btn-selecionar-categoriac" class="btn btn-primary btn-xs"><i
                        class="fas fa-check"></i> SELECCIONAR</button>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoSelectedCategoriaC" data-backdrop="static" data-keyboard="false" tabindex="-1"
     role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.3)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Cargando Categorías. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!--T: UNIDAD DE MEDIDA SELECTED-->
<div id="ventanaModalSelectedUnidadMedidaC" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
     data-keyboard="false" style="padding-top: 2%; overflow-y: visible;background-color: rgba(0,0,0,.2)">
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="border-color: #0085c1; border-width: 4px;">
            <div class="modal-header">
                <h5 class="mb-0" id="titleManagerUnidadMedidaC"><strong>[ 0 ]
                        UNIDAD DE MEDIDA</strong></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pb-0 pt-0">
                <div class="row">
                    <div class="col-12">
                        <input type="hidden" id="pageUnidadMedidaC"
                               value="1">
                        <form id="FrmUnidadMedidaC">
                            <div class="row mt-3">
                                <div class="input-group col-12">
                                    <input type="text" id="txtFilterUnidadMedidaC"
                                           class="form-control form-control-sm mr-3" placeholder="INGRESE FILTRO . . .">
                                    <button type="submit" id="btnBuscarUnidadMedidaC"
                                            class="btn btn-primary btn-xs" data-toggle="tooltip"
                                            title="Buscar Pregunta"><i class="fa fa-search" aria-hidden="true"></i>
                                        BUSCAR</button>
                                </div>
                            </div>
                        </form>
                        <div class="row pl-5 pr-5 mb-2">
                            <div class="table-responsive">
                                <table class="table mb-0 table-fluid">
                                    <thead>
                                        <tr>
                                            <th class="align-middle text-left">Unidad de Medida</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyUnidadMedidaC">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row mt-2 mb-2" style="display: none">
                            <div class="col-sm-4 mt-2">
                                <select id="sizePageUnidadMedidaC"
                                        class="form-control form-control-sm sisbu-cursor-mano combo-paginar">
                                    <option value="5">05</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>
                            <div class="col-sm-8 mt-2">
                                <nav aria-label="Page navigation">
                                    <ul id="paginationUnidadMedidaC"
                                        class="pagination justify-content-end">
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal" id="btnCancelSelectionUnidadMedidaC"><i class="fas fa-ban"></i>
                    CANCELAR</button>
                <button type="button" id="btn-selecionar-unidadMedidac" class="btn btn-primary btn-xs"><i
                        class="fas fa-check"></i> SELECCIONAR</button>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoSelectedUnidadMedidaC" data-backdrop="static" data-keyboard="false" tabindex="-1"
     role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.3)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Cargando Unidad de Medida. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


