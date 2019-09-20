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

                        <div class="dt-card__tools text-center pt-2">
                            <!-- Toggle Button -->
                            <a href="javascript:void(0)"  class="btn btn-primary dt-fab-btn shadow-lg mt-n2"id="regresar-central">
                                <span class="show"><i class="icon icon-chevrolet-left"></i></span>
                            </a>
                            <!-- /toggle button -->
                        </div>
                        <form id="FrmMenuSemanalModal">
                            <div class="row  pt-5 mt-2 ">
                                <div class="form-group col-lg-6 col-sm-6">
                                    <label for="txtTipoMenuSemanal">DÍA DE LA SEMANA INICIAL (LUNES)</label>
                                    <input class="form-control btn-sm" placeholder="Filter..." id="txtMenuSemanalFechaI"  type="date">
                                </div>

                                <div class="form-group col-lg-6 col-sm-6">
                                    <label for="txtTipoMenuSemanal">DÍA DE LA SEMANA FINAL (VIERNES)</label>
                                    <input class="form-control btn-sm" placeholder="Filter..." id="txtMenuSemanalFechaF"  type="date">
                                </div>
                                <div class="form-group col-lg-12 col-xs-12">
                                    <label for="txtTipoMenuSemanal">OBSERVACIÓN</label>
                                    <input class="form-control btn-sm" placeholder="OBSERVACION" id="txtMenuSemanalObservacion"  type="text">
                                </div>

                            </div>

                            <!-- /tab pane-->
                            <div class="dt-card dt-card__full-height mt-5">
                                <!-- Card Body -->
                                <div class="dt-card__body p-0 ps ps--active-y">
                                    <!-- Widget -->
                                    <div class="dt-widget  text-light-gray">
                                        <div class="dt-widget__item bg-primary ">
                                            <div class="dt-widget__info "  style="margin-right: -20%;">
                                                <div class="dt-widget__title text-white">
                                                    FECHA
                                                </div>
                                            </div>
                                            <div class="dt-widget__info ">
                                                <div class="dt-widget__title text-white">
                                                    DESAYUNO
                                                </div>
                                            </div>
                                            <div class="dt-widget__info ">
                                                <div class="dt-widget__title text-white">
                                                    ALMUERZO
                                                </div>
                                            </div>
                                            <div class="dt-widget__info ">
                                                <div class="dt-widget__title text-white">
                                                    CENA
                                                </div>
                                            </div>

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

                    <!-- Tab OPENLISTA-->
                    <div id="tab-pane-OpenBuscaMenuSemanal" class="tab-pane ">
                        <div class="dt-card__tools text-center pt-2 mb-4">
                            <!-- Toggle Button -->
                            <a href="javascript:void(0)"  class="btn btn-primary dt-fab-btn shadow-lg mt-n2 " id="regresar-central2">
                                <span class="show"><i class="icon icon-chevrolet-left"></i></span>
                            </a>
                            <!-- /toggle button -->
                        </div>

                        <form id="FrmMenuSemanal">
                            <div class="input-group">
                                <input class="form-control btn-sm" placeholder="Filter..." id="txtFilterFechaI"  type="date">
                                <input class="form-control btn-sm" placeholder="Filter..." id="txtFilterFechaF"  type="date">
                                <button type="submit" class="btn btn-primary btn-sm mr-1 mb-0"><i class="icon icon-search icon-fw"></i> BUSCAR</button>

                            </div>
                        </form>

                        <!-- /tab pane-->
                        <div class="dt-card dt-card__full-height mt-5">
                            <!-- Card Body -->
                            <div class="dt-card__body p-0 ">
                                <!-- Widget -->
                                <div class="dt-widget dt-widget-hover-bg text-light-gray ">
                                    <!-- Tables -->
                                    <div class="table-responsive ps-custom-scrollbar ps ps--active-y">

                                        <table class="table mb-0">
                                            <thead id="theadMenuSemanal">

                                            </thead>
                                            <tbody id="tbodyMenuSemanal">
                                            </tbody>
                                        </table>
                                    </div>
                                    <!-- /tables -->

                                </div>
                                <!-- /widget -->
                                <!-- /card body -->
                            </div>
                        </div>
                        <!-- /tab pane-->

                    </div>
                    <!-- /tab content -->
                </div>
            </div>
            <!-- fin -->
        </div>
        <!-- /card -->
    </div>
</div>

<div class="modal fade overflow-auto" id="ventanaModalMenuSemanal" data-backdrop="static"
     tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">

            <div class="modal-header">
                <h6 class="modal-title" id="txtTituloModalMan"></h6>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row" >

                    <div class="form-group col-lg-12">
                        <label >DIA ACTUAL</label>
                        <input class="form-control form-control-sm" placeholder="Filter..." id="txtMenuSemanalFecha"  type="date">
                    </div>
                </div>
                <!-- Card -->
                <div class="card mb-0">

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
                            <input type="hidden" id="IndexMenuSemanal" value="0">
                        </ul>
                        <!-- /tab navigation -->
                    </div>
                    <!-- /card header -->

                    <!-- Tab Content -->
                    <div class="tab-content ">

                        <!-- Tab DESAYUNO -->
                        <div id="tab-pane-15" class="tab-pane show active">
                            <div class="pt-4 pr-1 pl-1">
                               
                                    <div class="col-lg-12">
                                        <div class="form-group ">
                                            <select class="form-control form-control-sm" id="txtFilterTipoComidaDesayuno">
                                                <option value="-1">seleccione tipo...</option>
                                                <option selected  value="1">SEGUNDO</option>
                                                <option value="2">BEBIDA</option>
                                                <option value="3">POSTRE</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-lg-12 " >
                                        <div class="search-box " style="max-width: 100%;">
                                            <div class="input-group">
                                                <input class="form-control form-control-sm" placeholder="Filter..." id="txtFilterComidaDesayuno"  type="search">
                                                <span class="search-icon"><i class="icon icon-search icon-lg"></i></span>
                                            </div>
                                            <div id="ResultadoComidaDesayuno" class="list-group position-absolute w-100 bg-light overflow-auto" style="z-index:2;max-height: 85px;"> 
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
                                <div class="col-lg-12">
                                    <div class="form-group ">
                                        <select class="form-control form-control-sm" id="txtFilterTipoComidaAlmuerzo">
                                            <option value="-1">seleccione tipo...</option>
                                            <option selected  value="1">SEGUNDO</option>
                                            <option value="2">BEBIDA</option>
                                            <option value="3">POSTRE</option>
                                            <option value="4">SOPA</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-12 " >
                                    <div class="search-box " style="max-width: 100%;">
                                        <div class="input-group">
                                            <input class="form-control form-control-sm" placeholder="Filter..." id="txtFilterComidaAlmuerzo"  type="search">
                                            <span class="search-icon"><i class="icon icon-search icon-lg"></i></span>
                                        </div>
                                        <div id="ResultadoComidaAlmuerzo" class="list-group position-absolute w-100 bg-light overflow-auto" style="z-index:2;max-height: 85px;"> 
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
                                <div class="col-lg-12">
                                    <div class="form-group ">
                                        <select class="form-control form-control-sm " id="txtFilterTipoComidaCena">
                                            <option value="-1">seleccione tipo...</option>
                                            <option selected  value="1">SEGUNDO</option>
                                            <option value="2">BEBIDA</option>
                                            <option value="3">POSTRE</option>
                                            <option value="4">SOPA</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-12 " >
                                    <div class="search-box " style="max-width: 100%;">
                                        <div class="input-group">
                                            <input class="form-control form-control-sm" placeholder="Filter..." id="txtFilterComidaCena"  type="search">
                                            <span class="search-icon"><i class="icon icon-search icon-lg"></i></span>
                                        </div>
                                        <div id="ResultadoComidaCena" class="list-group position-absolute w-100 bg-light overflow-auto" style="z-index:2;max-height: 85px;"> 
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

                </div>
                <!-- /card -->
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary btn-sm" id="btnGuardarAddMenus">Guardar</button>
            </div>

        </div>
    </div>
</div>



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
