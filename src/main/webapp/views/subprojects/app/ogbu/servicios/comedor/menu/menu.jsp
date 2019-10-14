<%-- 
    Document   : menusemanal
    Created on : 29/08/2019, 10:48:29 AM
    Author     : Andres
--%>


<!-- Card -->
<div class="overflow-hidden">
    <div class="dt-module__container" style="max-width: 100%;">
        <!-- Module Header -->
        <div class="pt-1 " id="module-header-content" >
            <div class="row">
                <div class="col-lg-2 col-sm-2">
                </div>
                <div class="dt-card  col-sm-3 col-lg-3  mb-0 ">
                    <!-- Card Body -->
                    <a id="btnOpenNewMenuSemanal" 
                       data-toggle="tab" 
                       href="#tab-pane-OpenNewMenuSemanal" 
                       role="tab" aria-controls="tab-pane-OpenNewMenuSemanal"
                       aria-selected="false">
                        <div class="dt-card__body bg- d-flex flex-sm-column ">
                            <div class="mb-sm-7 mr-7 mr-sm-0">
                                <i class="icon icon-users dt-icon-bg bg-primary text-primary"></i>
                            </div>
                            <div class="flex-1">
                                <div class="d-flex align-items-center mb-2">
                                    <span class="h2 mb-0 font-weight-500 mr-2">Registrar</span>
                                </div>
                                <div class="h5 mb-2">Menú Semanal</div>
                            </div>
                        </div> 
                    </a>
                    <!-- /card body -->
                </div>
                <div class="col-lg-1 col-sm-1">
                </div>
                <div class="dt-card  col-sm-3 col-lg-3  mb-0 ">
                    <a id="btnOpenBuscaMenuSemanal"  data-toggle="tab"
                       href="#tab-pane-OpenBuscaMenuSemanal" role="tab" aria-controls="tab-pane-OpenBuscaMenuSemanal"
                       aria-selected="false">
                        <!-- Card Body -->
                        <div class="dt-card__body d-flex flex-sm-column">
                            <div class="mb-sm-7 mr-7 mr-sm-0">
                                <i class="icon icon-invoice-new dt-icon-bg bg-primary text-primary"></i>
                            </div>
                            <div class="flex-1">
                                <div class="d-flex align-items-center mb-2">
                                    <span class="h2 mb-0 font-weight-500 mr-2">Listar</span>
                                </div>
                                <div class="h5 mb-2">Menu Semanal</div>
                            </div>
                        </div>
                        <!-- /card body -->
                    </a>
                </div>
            </div>
            <!-- /tab navigation -->
        </div>
        <!-- /module header -->
        <!-- Module Content -->
        <div class="dt-module__content " >
            <!-- Module Content Inner -->
            <div class="dt-module__content-inner pt-0">
                <!-- Tab Content -->
                <div class="tab-content">
                    <!-- Tab OPENMENU -->
                    <div id="tab-pane-OpenNewMenuSemanal" class="tab-pane ">
                        <form id="FrmMenuSemanalModal">
                            <div class="row  pt-5 mt-2 ">
                                <div class="dt-card__header col-12 mb-3 pt-0">
                                    <!-- Card Tools -->
                                    <div class="dt-card__tools">
                                        <button data-toggle="tooltip" title="Regresar" type="button" id="regresar-central" class="btn btn-outline-primary btn-sm dt-avatar" > 
                                            <i class="icon icon-reply icon-lg"></i></button>
                                    </div>
                                    <!-- /card tools -->
                                    <!-- Card Heading -->
                                    <div class="dt-card__heading ">
                                        <h3 id="titleManagerMenu"   class="dt-card__title  text-primary text-center">MENU SEMANAL</h3>
                                    </div>
                                    <!-- /card heading -->
                                     <!-- Card Tools -->
                                    <div class="dt-card__tools">
                                        <button data-toggle="tooltip" title="Eliminar Menu Semanal" 
                                                type="button" id="btneliminar-menu" style="display: none"
                                                class="btn btn-danger btn-sm dt-avatar eliminar-menu" > 
                                            <i class="icon icon-trash-filled icon-lg"></i></button>
                                    </div>
                                    <!-- /card tools -->
                                </div>
                                <div class="form-group col-lg-12 col-xs-12"id="borrarObservacion">
                                    <label for="txtMenuSemanalObservacion" >OBSERVACIÓN</label>
                                    <input class="form-control btn-sm" placeholder="OBSERVACION" id="txtMenuSemanalObservacion"  type="text">
                                </div>
                                <div class="form-group col-lg-6 col-sm-6">
                                    <label for="txtMenuSemanalFechaI">DÍA DE LA SEMANA FINAL (VIERNES)</label>
                                    <div class="input-group">
                                        <input  type="text" class="form-control form-control-sm" id="txtMenuSemanalFechaI" placeholder="DD/MM/AAAA">
                                        <div class="input-group-append">
                                            <button type="button" id="btnEliminarFechaI" data-toggle="tooltip" title="Eliminar Fecha" class="btn btn-primary btn-sm"><i class="fa fa-trash"></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group col-lg-6 col-sm-6">
                                    <label for="txtMenuSemanalFechaF">DÍA DE LA SEMANA FINAL (VIERNES)</label>
                                    <div class="input-group">
                                        <input  type="text" class="form-control form-control-sm" id="txtMenuSemanalFechaF" placeholder="DD/MM/AAAA">
                                        <div class="input-group-append">
                                            <button type="button" id="btnEliminarFechaF" data-toggle="tooltip" title="Eliminar Fecha" class="btn btn-primary btn-sm"><i class="fa fa-trash"></i></button>
                                        </div>

                                    </div>

                                </div>


                            </div>

                            <!-- /tab pane-->
                            <div class="dt-card dt-card__full-height mt-5">
                                <!-- Card Body -->
                                <div class="dt-card__body p-0 ps ps--active-y">
                                    <!-- Widget -->
                                    <div class="dt-widget  text-light-gray" >
                                        <div class="" id="theadMenuSemanal">
                                        </div>

                                        <div id="tbodyCronograma" class="dt-widget dt-widget-hover-bg text-light-gray">
                                        </div>

                                    </div>
                                    <!-- /widget -->
                                    <!-- /card body -->
                                </div>
                            </div>
                            <!-- /tab pane-->
                            <div class="col-12 text-center">
                                <button type="submit" id="btnGuardar" class="btn btn-primary btn-sm"><i class="fa fa-floppy-o"></i> GUARDAR</button>
                            </div>
                        </form>
                    </div>
                    <!-- /tab pane-->

                </div>
            </div>
            <!-- fin -->
        </div>
        <!-- /card -->
    </div>
</div>

<!-- Card -->
<div class="card pt-5" id="OpenComidaDiaria" style="display:none">
    <h3 id="title-comida-diaria" class="text-center text-info">DIA ACTUAL</h3>
    <!-- Card Header -->
    <div class="card-header">
        <!-- Tab Navigation -->
        <ul class="card-header-pills nav nav-pills nav-fill" role="tablist">
            <li class="nav-item">
                <a id="buttonDesayuno" class="nav-link show active" data-toggle="tab" 
                   href="#tab-pane-15" role="tab" aria-controls="tab-pane-15"
                   aria-selected="true">
                    <i class="icon icon-plus icon-fw"></i> DESAYUNO</a>
            </li>
            <li class="nav-item">
                <a id="buttonAlmuerzo" class="nav-link" data-toggle="tab" href="#tab-pane-16" 
                   role="tab" aria-controls="tab-pane-16" aria-selected="false">
                    <i class="icon icon-plus icon-fw"></i> ALMUERZO</a>
            </li>
            <li class="nav-item">
                <a id="buttonCena" class="nav-link" data-toggle="tab" href="#tab-pane-17" 
                   role="tab" aria-controls="tab-pane-17" aria-selected="false">
                    <i class="icon icon-plus icon-fw"></i> CENA</a>
            </li>
        </ul>
        <!-- /tab navigation -->
    </div>
    <!-- /card header -->

    <!-- Tab Content -->
    <div class="tab-content ">
        <!-- Tab DESAYUNO -->
        <div id="tab-pane-15" class="tab-pane show active">
            <div class="pt-4 pr-1 pl-1">
                <div class="form-group col-12">
                    <label for="txtComidaDetalle">COMIDA
                        <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="Aficion que practicas " style="cursor: pointer" data-original-title=""></i>
                    </label>
                    <div class="input-group">
                        <input type="text" class="form-control form-control-sm" id="txtComidaDetalle" aria-describedby="nombre" placeholder="Click en el botón para seleccionar. . ." disabled="">
                        <div class="input-group-append">
                            <button type="button" id="btnSeleccionarComida" class="btn btn-primary btn-sm"><i class="icon icon-subscribe"></i></button>
                            <button type="button" id="btnAgregarComida" class="ml-5 btn btn-outline-primary btn-sm"><i class="icon icon-plus"></i></button>
                        </div>
                    </div>
                </div>
                <div class="form-group col-12 ">
                    <!-- Tables -->
                    <div class="table-responsive">
                        <table class="table mb-0">
                            <thead>
                                <tr>
                                    <th class="text-uppercase" scope="col" >TIPO</th>
                                    <th class="text-uppercase" scope="col" >DESCRIPCION</th>
                                    <th class="text-uppercase" scope="col" >ACCIÓN</th>
                                </tr>
                            </thead>
                            <tbody class="tbodyComidaDesayuno overflow-auto " style="height: 139px;">
                            </tbody>
                        </table>
                    </div>
                    <!-- /tables -->
                </div>


            </div>
        </div>
        <!-- /tab pane-->

        <!-- Tab ALMUERZO -->
        <div id="tab-pane-16" class="tab-pane">
            <div class="pt-4 pr-1 pl-1">
                <div class="form-group col-12">
                    <label for="txtComidaAlmuerzoDetalle">COMIDA
                        <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="Aficion que practicas " style="cursor: pointer" data-original-title=""></i>
                    </label>
                    <div class="input-group">
                        <input type="text" class="form-control form-control-sm" id="txtComidaAlmuerzoDetalle" aria-describedby="nombre" placeholder="Click en el botón para seleccionar. . ." disabled="">
                        <div class="input-group-append">
                            <button type="button" id="btnSeleccionarComidaAlmuerzo" class="btn btn-primary btn-sm"><i class="icon icon-subscribe"></i></button>
                            <button type="button" id="btnAgregarComidaAlmuerzo" class="ml-5 btn btn-outline-primary btn-sm"><i class="icon icon-plus"></i></button>
                        </div>
                    </div>
                </div>
                <div class="form-group col-12 ">
                    <!-- Tables -->
                    <div class="table-responsive">
                        <table class="table mb-0">
                            <thead>
                                <tr>
                                    <th class="text-uppercase" scope="col" >TIPO</th>
                                    <th class="text-uppercase" scope="col" >DESCRIPCION</th>
                                    <th class="text-uppercase" scope="col" >ACCIÓN</th>
                                </tr>
                            </thead>
                            <tbody class="tbodyComidaAlmuerzo overflow-auto" style="height: 139px;">
                            </tbody>
                        </table>
                    </div>
                    <!-- /tables -->
                </div>
            </div>
        </div>
        <!-- /tab pane-->

        <!-- Tab CENA -->
        <div id="tab-pane-17" class="tab-pane">
            <div class="pt-4 pr-1 pl-1">
                <div class="form-group col-12">
                    <label for="txtComidaCenaDetalle">COMIDA
                        <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="Aficion que practicas " style="cursor: pointer" data-original-title=""></i>
                    </label>
                    <div class="input-group">
                        <input type="text" class="form-control form-control-sm" id="txtComidaCenaDetalle" aria-describedby="nombre" placeholder="Click en el botón para seleccionar. . ." disabled="">
                        <div class="input-group-append">
                            <button type="button" id="btnSeleccionarComidaCena" class="btn btn-primary btn-sm"><i class="icon icon-subscribe"></i></button>
                            <button type="button" id="btnAgregarComidaCena" class="ml-5 btn btn-outline-primary btn-sm"><i class="icon icon-plus"></i></button>
                        </div>
                    </div>
                </div>
                <div class="form-group col-12 ">
                    <!-- Tables -->
                    <div class="table-responsive">
                        <table class="table mb-0">
                            <thead>
                                <tr>
                                    <th class="text-uppercase" scope="col" >TIPO</th>
                                    <th class="text-uppercase" scope="col" >DESCRIPCION</th>
                                    <th class="text-uppercase" scope="col" >ACCIÓN</th>
                                </tr>
                            </thead>
                            <tbody class="tbodyComidaCena overflow-auto" style="height: 139px;">
                            </tbody>
                        </table>
                    </div>
                    <!-- /tables -->
                </div>
            </div>
        </div>
        <!-- /tab pane-->

    </div>
    <!-- /tab content -->

    <div class="form-group col-lg-12 text-center">
        <button type="button" class="btn btn-outline-primary btn-sm" id="btnRegresarMenu"><i class="icon icon-reply"></i> CANCELAR</button>

    </div>  

</div>
<!-- /card -->


<div class="modal fade" id="modalCargandoMenuSemanal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Cargando Menu. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modalCargandoComida" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Cargando Comida. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--T: COMIDA SELECTED-->
<div id="ventanaModalSelectedComidac" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
     data-keyboard="false" style="padding-top: 2%; overflow-y: visible;background-color: rgba(0,0,0,.1)">
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="border-color: #0085c1; border-width: 4px;">
            <div class="modal-header">
                <h5 class="mb-0" id="titleManagerComidac"><strong>[ 0 ]
                        COMIDAS</strong></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pb-0 pt-0">
                <div class="row">
                    <div class="col-12">
                        <input type="hidden" id="pageComidac"
                               value="1">
                        <form id="FrmComidac">
                            <div class="row mt-3">
                                <div class="input-group col-12">
                                    <select class="form-control form-control-sm " id="txtFilterTipoComida">
                                        <option value="-1">seleccione tipo...</option>
                                        <option selected  value="1">SEGUNDO</option>
                                        <option value="2">BEBIDA</option>
                                        <option value="3">POSTRE</option>
                                        <option value="4">SOPA</option>
                                    </select>
                                    <input type="text" id="txtFilterComidac"
                                           class="form-control form-control-sm mr-3" placeholder="INGRESE FILTRO . . .">
                                    <button type="submit" id="btnBuscarComidac"
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
                                            <th class="align-middle text-left">Comida</th>
                                            <th class="align-middle text-left">Tipo</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyComidac">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row mt-2 mb-2" >
                            <div class="col-sm-4 mt-2">
                                <select id="sizePageComidac"
                                        class="form-control form-control-sm sisbu-cursor-mano combo-paginar">
                                    <option value="5">05</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>
                            <div class="col-sm-8 mt-2">
                                <nav aria-label="Page navigation">
                                    <ul id="paginationComidac"
                                        class="pagination justify-content-end">

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal" id="btnCancelSelectionComidac"><i class="fas fa-ban"></i>
                    CANCELAR</button>
                <button type="button" id="btn-selecionar-comidac" class="btn btn-primary btn-xs"><i
                        class="fas fa-check"></i> SELECCIONAR</button>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoSelectedComidac" data-backdrop="static" data-keyboard="false" tabindex="-1"
     role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.2)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Cargando comidas. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>