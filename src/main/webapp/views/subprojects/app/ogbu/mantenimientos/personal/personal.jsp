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
                <h4 class="mb-0" id="titleManagerPersonal">[ 0 ] PERSONAL</h4>
                <input type="hidden" id="pagePersonal" value="1">
            </div>
            <!-- /card header -->
            <!-- Card Body -->
            <div class=" pt-0">
                <form id="FrmPersonal" class="card-body">
                    <div class="input-group search-box" style="max-width: 100%;">
                        <input type="search" id="txtFilterDniPersonal" class="form-control form-control-sm" placeholder="FILTRO DNI">
                        <span class="search-icon"><i class="icon icon-search icon-lg"></i></span>
                        <select class="form-control form-control-sm col-2" id="txtFilterEstadoPersonal">
                            <option selected value="1">ACTIVOS</option>
                            <option value="0">INACTIVOS</option>
                            <option value="-1">TODOS</option>
                        </select>
                        <button type="submit" class="btn btn-primary btn-sm mr-2"><i class="icon icon-search icon-fw"></i> BUSCAR</button>
                        <button type="button" class="btn btn-primary btn-sm" id="btnOpenNewPersonal"><i class="icon icon-plus icon-fw"></i></button>
                    </div>
                </form>

                <div class="order-xl-1 ">

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
                                        <h3 class="dt-card__title">DNI</h3>
                                    </div>
                                    <!-- /widget info -->

                                    <!-- Widget Info -->
                                    <div class="dt-widget__info text-truncate">
                                        <h3 class="dt-card__title">NOMBRE</h3>
                                    </div>
                                    <!-- /widget info -->

                                    <!-- Widget Info -->
                                    <div class="dt-widget__info text-truncate">
                                        <h3 class="dt-card__title">ÁREA</h3>
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
                            <div class="dt-widget dt-widget-hover ps-custom-scrollbar ps ps--active-y" id="tbodyPersonal">

                            </div>
                            <!-- /widget -->
                            <!-- /card body -->

                        </div>
                        <!-- /card -->

                    </div>



                    <div class="row mt-2">
                        <div class="col-md-2 col-sm-3 col-4">
                            <select id="sizePagePersonal" class="form-control form-control-sm select2-single">
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                            </select>
                        </div>
                        <div class="col-md-10 col-sm-9 col-8">
                            <nav aria-label="Page navigation example">
                                <ul id="paginationPersonal" class="pagination pagination-sm justify-content-end">
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
    <div class="modal fade" id="ventanaModalPersonal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <form id="FrmPersonalModal">
                    <div class="modal-header">
                        <h6 class="modal-title" id="txtTituloModalMan"></h6>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body p-0">
                        <div class="tabs-container">
                            <!-- Card Header -->
                            <div class="card-header">
                                <!-- Tab Navigation -->
                                <ul class="card-header-pills nav nav-pills nav-fill" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link show active" data-toggle="tab" href="#tab-pane-15" role="tab" aria-controls="tab-pane-15" aria-selected="true">DATOS GENERALES</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" data-toggle="tab" href="#tab-pane-16" role="tab" aria-controls="tab-pane-16" aria-selected="false">DATOS LABORALES</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" data-toggle="tab" href="#tab-pane-17" role="tab" aria-controls="tab-pane-17" aria-selected="false">USUARIO ACCESO</a>
                                    </li>
                                </ul>
                                <!-- /tab navigation -->
                            </div>
                            <!-- /card header -->

                            <!-- Tab Content -->
                            <div class="tab-content">

                                <!-- Tab Pane -->
                                <div id="tab-pane-15" class="tab-pane show active">
                                    <div class="card-body pr-3 pl-3">
                                        <div class="row">
                                            <div class="form-group col-6">
                                                <label for="txtTipoDocumento">TIPO</label>
                                                <select class="form-control form-control-sm" id="txtTipoDocumento">
                                                    <option selected="0" value="1">DNI</option>
                                                    <option value="2">CARNET DE EXTRANJERIA</option>
                                                    <option value="3">OTRO</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-6">
                                                <label for="txtDniPersonal">N° DNI</label>
                                                <input class="form-control form-control-sm" id="txtDniPersonal" type="text" placeholder="DESCRIPCION">
                                            </div>
                                            <div class="form-group col-6">
                                                <label for="txtApPaternoPersonal">AP. PATERNO</label>
                                                <input class="form-control form-control-sm" id="txtApPaternoPersonal" type="text" placeholder="AP. PATERNO">
                                            </div>
                                            <div class="form-group col-6">
                                                <label for="txtApMaternoPersonal">AP. MATERNO</label>
                                                <input class="form-control form-control-sm" id="txtApMaternoPersonal" type="text" placeholder="AP. MATERNO">
                                            </div>
                                            <div class="form-group col-6">
                                                <label for="txtNombrePersonal">NOMBRES</label>
                                                <input class="form-control form-control-sm" id="txtNombrePersonal" type="text" placeholder="NOMBRES">
                                            </div>
                                            <div class="form-group col-6">
                                                <label for="txtSexoPersonal">SEXO</label>
                                                <select class="form-control form-control-sm" id="txtSexoPersonal">
                                                    <option selected="0" value="-1">seleccione...</option>
                                                    <option value="1">MASCULINO</option>
                                                    <option value="0">FEMENINO</option>
                                                </select>
                                            </div>
                                            <div class="form-group col-6">
                                                <label for="txtFechaNaciPersonal">FECHA NACIMIENTO</label>
                                                <div class="input-group date" id="date-time-picker-1" data-target-input="nearest">
                                                    <input id="txtFechaNaciaPersonal" type="text" class="form-control form-control-sm datetimepicker-input" data-target="#date-time-picker-1">
                                                    <div class="input-group-append" data-target="#date-time-picker-1" data-toggle="datetimepicker">
                                                        <div class="input-group-text"><i class="icon icon-calendar"></i></div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="form-group col-6">
                                                <label for="txtEstadoPersonal">ESTADO</label>
                                                <select class="form-control form-control-sm" id="txtEstadoPersonal">
                                                    <option selected="1"  value="1">ACTIVO</option>
                                                    <option value="0">INACTIVO</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- /tab pane-->

                                <!-- Tab Pane -->
                                <div id="tab-pane-16" class="tab-pane">
                                    <div class="card-body pr-3 pl-3">
                                        <div class="search-box " style="max-width: 100%;">
                                            <div class="row">
                                                <div class="form-group col-12">
                                                    <label for="txtAreaPersonal">AREA</label>
                                                    <div class="input-group">
                                                        <input class="form-control form-control-sm" placeholder="Filter..." id="txtFilterArea"  type="search">
                                                        <span class="search-icon"><i class="icon icon-search icon-lg"></i></span>
                                                    </div>
                                                    <div id="ResultadoArea" class="list-group position-absolute w-100 bg-light overflow-auto" style="z-index:2;max-height: 85px;"> 
                                                    </div>
                                                </div>
                                                <div class="form-group col-12">
                                                    <label for="txtCargoPersonal">CARGO</label>
                                                    <div class="input-group">
                                                        <input class="form-control form-control-sm" placeholder="Filter..." id="txtFilterCargo"  type="search">
                                                        <span class="search-icon"><i class="icon icon-search icon-lg"></i></span>
                                                    </div>
                                                    <div id="ResultadoCargo" class="list-group position-absolute w-100 bg-light overflow-auto" style="z-index:2;max-height: 85px;"> 
                                                    </div>
                                                </div>
                                                <div class="form-group col-6">
                                                    <label for="txtTipoPersonal">TIPO DE PERSONAL</label>
                                                    <select class="form-control form-control-sm" id="txtTipoPersonal">
                                                        <option selected="1"  value="-1">Seleccione...</option>
                                                        <option value="1">NOMBRADO</option>
                                                        <option value="2">CONTRATADO</option>
                                                        <option value="3">PRACTICANTE</option>
                                                    </select>
                                                </div>
                                                <div class="form-group col-6">
                                                    <label for="txtCelularPersonal">Celular</label>
                                                    <div class="input-group input-group-sm mb-3">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text" ><i class="icon icon-phone-o"></i></span>
                                                        </div>
                                                        <input type="text" class="form-control" id="txtCelularPersonal" aria-label="Small" >
                                                    </div>
                                                </div>
                                                <div class="form-group col-12">
                                                    <label for="txtEmailPersonal">EMAIL</label>
                                                    <div class="input-group input-group-sm mb-3">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text" ><i class="icon icon-mail"></i></span>
                                                        </div>
                                                        <input type="text" class="form-control" id="txtEmailPersonal" aria-label="Small" >
                                                    </div>
                                                </div>
                                                <div class="form-group col-12">
                                                    <label for="txtDireccionPersonal">DIRECCIÓN</label>

                                                    <textarea class="form-control" id="textDireccionPersonal" rows="3" placeholder="Textarea"></textarea>

                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <!-- /tab pane-->

                                <!-- /tab pane-->

                                <!-- Tab Pane -->
                                <div id="tab-pane-17" class="tab-pane">
                                    <div class="card-body ">
                                        <div class="row">
                                            <div class="form-group col-12">
                                                <label for="txtUserPersonal">USUARIO</label>
                                               
                                                    <input type="text" class="form-control" id="txtUserPersonal" placeholder="USUARIO" aria-label="Small" >
                                                
                                            </div>
                                            <div class="form-group col-6">
                                                <label for="txtLoginPersonal">lOGIN</label>
                                                <div class="input-group input-group-sm mb-3">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text" ><i class="icon icon-user"></i></span>
                                                    </div>
                                                    <input type="text" class="form-control" id="txtLoginPersonal" placeholder="LOGIN" aria-label="Small" >
                                                </div>
                                            </div>
                                            <div class="form-group col-6">
                                                <label for="txtPassUPersonal">PASS</label>
                                                <div class="input-group input-group-sm mb-3">
                                                    <div class="input-group-prepend">
                                                        <span class="input-group-text" >*</span>
                                                    </div>
                                                    <input type="text" class="form-control" id="txtPassUPersonal" placeholder="PASSWORD"aria-label="Small" >
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <!-- /tab pane-->

                            </div>
                            <!-- /tab content -->

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
    <div class="modal fade" id="modalCargandoPersonal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="progress" style="margin-bottom: 0px;">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                            Cargando Personals. . .
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
