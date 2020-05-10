<%-- 
    Document   : paciente.jsp
    Created on : 06/12/2019, 09:48:09 AM
    Author     : JamesCarrillo
--%>

<div class="row">
    <!--TAB PACIENTES-->
    <div class="col-xl-12 p-0" id="btnListaAtendido">
        <!-- Card Header -->
        <div class="card-header bg-transparent pt-0">
            <h4 class="mb-0" id="titleManagerPaciente">[ 0 ] PACIENTES</h4>
            <input type="hidden" id="pagePaciente" value="1">
        </div>
        <!-- /card header -->
        <!-- Card Body -->
        <div class="card-body p-0">
            <form id="FrmPaciente">
                <div class="form-row">
                    <div class="col-lg-4 col-12 form-group">
                        <label for="txtEscuelaAtendido">ESCUELA

                        </label>
                        <div class="input-group">
                            <input type="text" class="form-control form-control-sm" id="txtEscuelaAtendido"
                                aria-describedby="nombre" placeholder="Click en el bot�n para seleccionar. . ."
                                disabled="">
                            <div class="input-group-append">
                                <button type="button" id="btnSeleccionarEscuela" class="btn btn-primary btn-sm"><i
                                        class="icon icon-subscribe"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-12 form-group">
                        <label for="txtCicloAcademicoPaciente">Ciclo

                        </label>
                        <div class="input-group">
                            <input type="text" class="form-control form-control-sm" id="txtCicloAcademicoPaciente"
                                aria-describedby="nombre" placeholder="Click en el bot�n para seleccionar. . ."
                                disabled="">
                            <div class="input-group-append">
                                <button type="button" id="btnSeleccionarCicloAcademico"
                                    class="btn btn-primary btn-sm"><i class="icon icon-subscribe"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="col-4 form-group">
                        <label for="txtFilterTipoPersonaPaciente">Tipo de Paciente</label>
                        <select class="form-control form-control-sm sisbu-cursor-mano"
                            id="txtFilterTipoPersonaPaciente">
                            <option value="-1">Seleccione... </option>
                            <option selected value="1">ALUMNO</option>
                            <option value="2">DOCENTE</option>
                            <option value="3">ADMINISTRATIVO</option>
                            <option value="4">FAMILIAR DOCENTE</option>
                            <option value="5">FAMILIAR ADMINISTRATIVO</option>
                            <option value="6">OTRO</option>
                        </select>
                    </div>
                    <div class="col-12 form-group">
                        <div class="input-group search-box mw-100">
                            <input type="search" id="txtFilterPaciente" class="form-control form-control-sm w-50"
                                placeholder="Filtrar Paciente ...">
                            <select class="form-control form-control-sm sisbu-cursor-mano" id="txtFilterEstadoPaciente">
                                <option value="-1">Seleccione... </option>
                                <option selected value="1">ATENDIDO</option>
                                <option value="0">SIN ATENDER</option>

                            </select>
                            <button type="submit" class="search-icon"><i class="icon icon-search icon-fw"></i></button>
                            <!--button type="button" class="btn btn-primary btn-sm ml-3" id="btnReportePaciente"
                                data-toggle="tooltip" title="Reporte Paciente">
                                <i class="icon icon-addnew"></i></button-->
                        </div>
                    </div>
                </div>

            </form>
            <!-- Card -->
            <div class="dt-card m-0">
                <!-- Card Body -->
                <div class="dt-card__body p-0  ">
                    <!-- Widget -->
                    <div class="dt-widget dt-widget-hl-item-space dt-widget-mb-item dt-widget-hover-bg"
                        id="tbodyPaciente">
                    </div>
                    <!-- /widget -->
                    <!-- /card body -->
                </div>

            </div>
            <!-- /card -->
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

</div>

<div class="modal fade" id="modalCargandoPaciente" data-backdrop="static" data-keyboard="false" tabindex="-1"
    role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                        aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Cargando Pacientes. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!--T: CICLO ACADEMICO SELECTED-->
<div id="ventanaModalSelectedCicloAcademicoC" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
    data-keyboard="false" style="padding-top: 0%; overflow-y: visible;background-color: rgba(0,0,0,.2)">
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="border-color: #0085c1; border-width: 4px;">
            <div class="modal-header">
                <h5 class="mb-0" id="titleManagerCicloAcademicoC"><strong>[ 0 ]
                        CICLOS ACAD�MICOS</strong></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pb-0 pt-0">
                <div class="row">
                    <div class="col-12">
                        <input type="hidden" id="pageCicloAcademicoC" value="1">
                        <form id="FrmCicloAcademicoC">
                            <div class="row mt-3">
                                <div class="input-group col-12">
                                    <input type="text" id="txtFilterCicloAcademicoC"
                                        class="form-control form-control-sm mr-3" placeholder="INGRESE FILTRO . . .">
                                    <button type="submit" id="btnBuscarCicloAcademicoC" class="btn btn-primary btn-xs"
                                        data-toggle="tooltip" title="Buscar Pregunta"><i class="fa fa-search"
                                            aria-hidden="true"></i>
                                        BUSCAR</button>
                                </div>
                            </div>
                        </form>
                        <div class="row pl-5 pr-5 mb-2">
                            <div class="table-responsive">
                                <table class="table mb-0 table-fluid">
                                    <thead>
                                        <tr>
                                            <th class="align-middle text-left">CICLO ACAD�MICO</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyCicloAcademicoC">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row mt-2 mb-2" style="display: none">
                            <div class="col-sm-4 mt-2">
                                <select id="sizePageCicloAcademicoC"
                                    class="form-control form-control-sm sisbu-cursor-mano combo-paginar">
                                    <option value="7">07</option>
                                    <option value="10">10</option>
                                    <option value="50">30</option>
                                </select>
                            </div>
                            <div class="col-sm-8 mt-2">
                                <nav aria-label="Page navigation">
                                    <ul id="paginationCicloAcademicoC" class="pagination justify-content-end">

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal"
                    id="btnCancelSelectionCicloAcademicoC"><i class="fas fa-ban"></i>
                    CANCELAR</button>
                <button type="button" id="btn-selecionar-ciclo_academicoc" class="btn btn-primary btn-xs"><i
                        class="fas fa-check"></i> SELECCIONAR</button>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoSelectedCicloAcademicoC" data-backdrop="static" data-keyboard="false" tabindex="-1"
    role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.3)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                        aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Cargando ciclos acac�micos. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--T: ESCUELA SELECTED-->
<div id="ventanaModalSelectedEscuelaC" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
    data-keyboard="false" style="padding-top: 1%; overflow-y: visible;background-color: rgba(0,0,0,.2)">
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="border-color: #0085c1; border-width: 4px;">
            <div class="modal-header">
                <h5 class="mb-0" id="titleManagerEscuelaC"><strong>[ 0 ]
                        ESCUELAS</strong></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pb-0 pt-0">
                <div class="row">
                    <div class="col-12">
                        <input type="hidden" id="pageEscuelaC" value="1">
                        <form id="FrmEscuelaC">
                            <div class="row mt-3">
                                <div class="input-group col-12">
                                    <input type="text" id="txtFilterEscuelaC" class="form-control form-control-sm mr-3"
                                        placeholder="INGRESE FILTRO . . .">
                                    <button type="submit" id="btnBuscarEscuelaC" class="btn btn-primary btn-xs"
                                        data-toggle="tooltip" title="Buscar Pregunta"><i class="fa fa-search"
                                            aria-hidden="true"></i>
                                        BUSCAR</button>
                                </div>
                            </div>
                        </form>
                        <div class="row pl-5 pr-5 mb-2">
                            <div class="table-responsive">
                                <table class="table mb-0 table-fluid">
                                    <thead>
                                        <tr>
                                            <th class="align-middle text-left">ESCUELA</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyEscuelaC">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row mt-2 mb-2" style="display: none">
                            <div class="col-sm-4 mt-2">
                                <select id="sizePageEscuelaC"
                                    class="form-control form-control-sm sisbu-cursor-mano combo-paginar">
                                    <option value="5">05</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>
                            <div class="col-sm-8 mt-2">
                                <nav aria-label="Page navigation">
                                    <ul id="paginationEscuelaC" class="pagination justify-content-end">

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal"
                    id="btnCancelSelectionEscuelaC"><i class="fas fa-ban"></i>
                    CANCELAR</button>
                <button type="button" id="btn-selecionar-escuelac" class="btn btn-primary btn-xs"><i
                        class="fas fa-check"></i> SELECCIONAR</button>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoSelectedEscuelaC" data-backdrop="static" data-keyboard="false" tabindex="-1"
    role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.3)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                        aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Cargando escuelas. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>