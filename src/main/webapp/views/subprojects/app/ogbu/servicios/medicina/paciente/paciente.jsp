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
                <h4 class="mb-0" id="titleManagerPaciente">[ 2 ] PACIENTES</h4>
                <input type="hidden" id="pagePaciente" value="1">
            </div>
            <!-- /card header -->
            <!-- Card Body -->
            <div class="card-body pt-0">
                <form id="FrmPaciente">
                    <div class="input-group search-box" style="max-width: 100%;">
                        <input type="search" id="txtFilterPaciente" class="form-control form-control-sm" placeholder="FILTRO. . .">
                        <span class="search-icon"><i class="icon icon-search icon-lg"></i></span>
                        <button type="submit" class="btn btn-primary btn-sm mr-2"><i class="icon icon-search icon-fw"></i> BUSCAR</button>
                        <button type="button" class="btn btn-primary btn-sm" id="btnOpenNewPaciente"><i class="icon icon-plus icon-fw"></i></button>
                    </div>
                </form>
                <!-- Tables -->
                <div class="table-responsive">
                    <table class="table mb-0 mt-2">
                        <thead>
                            <tr>
                                <th class="text-uppercase" scope="col" style="width: 10%">ACCION</th>
                                <th class="text-uppercase" scope="col" >NOMBRE</th>
                            </tr>
                        </thead>
                        <tbody id="tbodyPaciente">
                        </tbody>
                    </table>
                </div>
                <!-- /tables -->
                <div class="row mt-2">
                    <div class="col-md-2 col-sm-3 col-4">
                        <select id="sizePagePaciente" class="form-control form-control-sm select2-single">
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                    <div class="col-md-10 col-sm-9 col-8">
                        <nav aria-label="Page navigation example">
                            <ul id="paginationPaciente" class="pagination pagination-sm justify-content-end">
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
<div class="modal fade" id="ventanaModalPaciente" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <form id="FrmPacienteModal">
                <div class="modal-header">
                    <h6 class="modal-title" id="txtTituloModalMan"></h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">�</span>
                    </button>
                </div>
                <div class="modal-body">

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
                                        DATOS DE FILIACI�N</a>
                                </li>
                                <li class="nav-item">
                                    <a id="buttonAlmuerzo" class="nav-link" data-toggle="tab" href="#tab-pane-16" 
                                       role="tab" aria-controls="tab-pane-16" aria-selected="false">
                                        ANTECEDENTES CL�NICOS</a>
                                </li>
                                <li class="nav-item">
                                    <a id="buttonCena" class="nav-link" data-toggle="tab" href="#tab-pane-17" 
                                       role="tab" aria-controls="tab-pane-17" aria-selected="false">
                                        DIAGN�STICOS</a>
                                </li>
                                <li class="nav-item">
                                    <a id="buttonCena" class="nav-link" data-toggle="tab" href="#tab-pane-18" 
                                       role="tab" aria-controls="tab-pane-18" aria-selected="false">
                                        RESULTADO DE AN�LISIS</a>
                                </li>
                                <input type="hidden" id="IndexMenuSemanal" value="0">
                            </ul>
                            <!-- /tab navigation -->
                        </div>
                        <!-- /card header -->

                        <!-- Tab Content -->
                        <div class="tab-content ">

                            <!-- Tab FILIACION -->
                            <div id="tab-pane-15" class="tab-pane show active">
                                <div class="row pt-4 pr-1 pl-1">
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <label for="email-1">TIPO DE DOCUMENTO</label>
                                            <select class="form-control form-control-sm" id="simple-select">
                                                <option selected  value="1">DNI</option>
                                                <option  value="2">CARNET DE EXTRANJERIA</option>
                                                <option  value="3">OTRO</option>
                                            </select>
                                        </div>
                                    </div>
                                       <div class="col-lg-6">
                                        <div class="form-group">
                                            <label for="email-1">TIPO DE USUARIO</label>
                                            <select class="form-control form-control-sm" id="simple-select">
                                                <option selected  value="1">ALUMNO</option>
                                                <option  value="2">DOCENTE</option>
                                                <option  value="3">ADMINISTRATIVO</option>
                                                <option  value="4">FAMILIAR DOCENTE</option>
                                                <option  value="5">FAMILIAR ADMINISTRATIVO</option>
                                            </select>
                                        </div>
                                    </div>
                                       <div class="col-lg-6">
                                        <div class="form-group">
                                            <label for="email-1">SUBTIPO DE USUARIO</label>
                                            <select class="form-control form-control-sm" id="simple-select">
                                                <option selected  value="1">NOMBRADO</option>
                                                <option  value="2">CONTRATADO</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                      <div class="col-lg-6">
                                        <div class="form-group">
                                            <label for="email-1">ESTADO CIVIL</label>
                                            <select class="form-control form-control-sm" id="simple-select">
                                                <option selected  value="1">SOLTERO(A)</option>
                                                <option  value="2">CASADO(A)</option>
                                                <option  value="3">DIVORSIADO(A)</option>
                                                <option  value="4">VIUDO(A)</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                       <div class="col-lg-6">
                                        <div class="form-group">
                                            <label for="email-1">C�DIGO</label>
                                          <input type="email" class="form-control" id="normal-input-1" placeholder="Enter email">
                                        </div>
                                    </div>
                                      <div class="col-lg-6">
                                        <div class="form-group">
                                            <label for="email-1">N� DOCUMENTO</label>
                                          <input type="email" class="form-control" id="normal-input-1" placeholder="Enter email">
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <label for="email-1">AP. PATERNO</label>
                                          <input type="email" class="form-control" id="normal-input-1" placeholder="Enter email">
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <label for="email-1">AP. MATERNO</label>
                                          <input type="email" class="form-control" id="normal-input-1" placeholder="Enter email">
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <label for="email-1">NOMBRES</label>
                                          <input type="email" class="form-control" id="normal-input-1" placeholder="Enter email">
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <label for="email-1">SEXO</label>
                                            <select class="form-control form-control-sm" id="simple-select">
                                                <option selected  value="1">MASCULINO</option>
                                                <option  value="2">FEMENINO</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <label for="email-1">FECHA DE NACIMIENTO</label>
                                          <input type="email" class="form-control" id="normal-input-1" placeholder="Enter email">
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <label for="email-1">CELULAR</label>
                                          <input type="email" class="form-control" id="normal-input-1" placeholder="Enter email">
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <label for="email-1">EMAIL</label>
                                          <input type="email" class="form-control" id="normal-input-1" placeholder="Enter email">
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="form-group">
                                            <label for="email-1">ESCUELA</label>
                                            <select class="form-control form-control-sm" id="simple-select">
                                                <option selected  value="1">MASCULINO</option>
                                                <option  value="2">FEMENINO</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- /tab pane-->

                            <!-- Tab ANTECEDENTES -->
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
                                                        <th class="text-uppercase" scope="col" >ACCI�N</th>
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

                            <!-- Tab DIAGNOSTICO -->
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
                                                        <th class="text-uppercase" scope="col" >ACCI�N</th>
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

                            <!-- Tab ANALISIS -->
                            <div id="tab-pane-18" class="tab-pane">
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
                                                        <th class="text-uppercase" scope="col" >ACCI�N</th>
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
                    <button type="button" class="btn btn-outline-secondary btn-sm" data-dismiss="modal">CANCELAR</button>
                    <button type="submit" id="btnGuardar" class="btn btn-outline-primary btn-sm"><i class="fa fa-floppy-o"></i> GUARDAR</button>
                </div>
            </form>
        </div>
    </div>
</div>
<div class="modal fade" id="modalCargandoPaciente" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Cargando Pacientes. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
