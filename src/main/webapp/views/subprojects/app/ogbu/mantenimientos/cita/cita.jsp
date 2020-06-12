<%-- 
    Document   : cit.jsp
    Created on : 28/04/2020, 09:48:09 AM
    Author     : Andres
--%>

<div class="row">
    <div class="col-xl-12">
        <!-- Card -->
        <div class="card overflow-hidden">
            <!-- Card Header -->
            <div class="card-header bg-transparent">
                <h4 class="mb-0" id="titleManagerCita">[ 0 ] CITAS</h4>
                <input type="hidden" id="pageCita" value="1">
            </div>
            <!-- /card header -->
            <!-- Card Body -->
            <div class="card-body pt-0">
                <form id="FrmCita">
                    <div class="row">
                        <div class="col-lg-3 col-sm-6 col-12 mb-2">
                            <label for="txtFechaIFilterCita">Desde</label>
                            <div class="input-group input-group-sm">
                                <input type="text" id="txtFechaIFilterCita" class="form-control form-control-sm"
                                       placeholder="DD/MM/AAAA">
                                <div class="input-group-append">
                                    <button class="btn btn-dark btn-sm input-ii" type="button"
                                            id="btnEliminarFechaIFilterCita" data-toggle="tooltip" title="Eliminar Fecha">
                                        <i class="icon icon-trash"></i></button>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-6 col-12 mb-2">
                            <label for="txtFechaFFilterCita">Hasta</label>
                            <div class="input-group input-group-sm">
                                <input type="text" id="txtFechaFFilterCita" class="form-control form-control-sm"
                                       placeholder="DD/MM/AAAA">
                                <div class="input-group-append">
                                    <button class="btn btn-dark btn-sm input-ii" type="button"
                                            id="btnEliminarFechaFFilterCita" data-toggle="tooltip" title="Eliminar Fecha">
                                        <i class="icon icon-trash"></i></button>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-12">
                            <label for="txtAreaFilterCita">AREA</label>
                            <div class="input-group" style="max-width: 100%;">
                                <select id="txtAreaFilterCita" class="form-control form-control-sm sisbu-cursor-mano">
                                </select>
                            </div>
                        </div>
                        <div class="col-12">
                            <label for="txtTypeRequestCita">TIPO DE FILTRO</label>
                            <div class="input-group" style="max-width: 100%;">
                                <select id="txtTypeRequestCita" class="form-control form-control-sm sisbu-cursor-mano mr-4">
                                    <option value="solititud">FECHA SOLICITUD</option>
                                    <option value="programada">FECHA PROGRAMADA</option>
                                </select>
                                <div class="input-group-append">
                                    <button type="submit" class="btn btn-primary btn-sm mr-2"><i class="icon icon-search icon-fw"></i> BUSCAR</button>
                                </div>
                                <button type="button" class="btn btn-primary btn-sm" id="btnOpenNewCita"data-toggle="tooltip" title="Agregar Cita" ><i class="icon icon-addnew"></i></button>
                            </div>
                        </div>
                    </div>
                </form>
                <div class="table-responsive mt-3">
                    <table class="table mb-0">
                        <thead class="bg-primary ">
                            <tr> 
                                <th class="text-uppercase text-center text-white pt-3 pb-2" colspan="2">ACCION</th>
                                <th class="text-uppercase text-white pt-3 pb-2" scope="col" >USUARIO</th>
                                <th style="font-size: 10px" class="text-uppercase text-white pt-3 pb-2" scope="col" >F. SOLICITUD <br>Y ACEPTACION</th>
                                <th style="font-size: 10px" class="text-uppercase text-white pt-3 pb-2" scope="col" >F. PROGRAMACIÓN <br>Y ATENCIÓN</th>
                                <th class="text-uppercase text-white pt-3 pb-2" scope="col" >AREA</th>
                            </tr>
                        </thead>
                        <tbody id="tbodyCita">
                        </tbody>
                    </table>
                </div>
                <div class="row mt-2">
                    <div class="col-md-2 col-sm-3 col-4">
                        <select id="sizePageCita" class="form-control form-control-sm select2-single">
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                    <div class="col-md-10 col-sm-9 col-8">
                        <nav aria-label="Page navigation example">
                            <ul id="paginationCita" class="pagination  justify-content-end">
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

<div class="modal fade" id="ventanaModalCita" data-backdrop="static" tabindex="-1" role="dialog" 
     aria-labelledby="exampleModalLabel" aria-hidden="true" style="padding-top: 0%;overflow-y: visible;">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <form id="FrmCitaModal">
                <div class="modal-header">
                    <h6 class="modal-title" id="txtTituloModalMan"></h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12 mb-3">
                            <label for="txtAtendidoCita">Usuario
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="Usuario de ogbu(Alumno, administrativo u otro)" style="cursor: pointer" data-original-title=""></i>
                            </label>
                            <div class="input-group">
                                <input type="text" class="form-control form-control-sm" id="txtAtendidoCita" aria-describedby="nombre" placeholder="Click en el botón para seleccionar. . ." disabled="">
                                <div class="input-group-append">
                                    <button type="button" id="btnSeleccionarAtendido" class="btn btn-primary btn-sm"><i class="icon icon-subscribe"></i></button>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 mb-2">
                            <label for="txtAreaCita">Área
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="Seleccione el Área al cuál se le asignará esta cita" style="cursor: pointer" data-original-title=""></i>
                            </label>
                            <div class="input-group">
                                <input type="text" class="form-control form-control-sm" id="txtAreaCita" aria-describedby="nombre" placeholder="Click en el botón para seleccionar. . ." disabled="">
                                <div class="input-group-append">
                                    <button type="button" id="btnSeleccionarArea" class="btn btn-primary btn-sm"><i class="icon icon-subscribe"></i></button>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 mb-2">
                            <label for="txtPersonalEncargadoCita">Personal Atención</label>
                            <div class="input-group">
                                <input type="text" class="form-control form-control-sm" id="txtPersonalEncargadoCita" aria-describedby="nombre" placeholder="Click en el botón para seleccionar. . ." disabled="">
                                <div class="input-group-append">
                                    <button type="button" id="btnSeleccionarPersonal" class="btn btn-primary btn-sm"><i class="icon icon-subscribe"></i></button>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-12 mb-2">
                            <label for="txtFechaProgramadaDateCita">Fecha</label>
                            <div class="input-group input-group-sm">
                                <input type="text" id="txtFechaProgramadaDateCita" class="form-control form-control-sm"
                                       placeholder="DD/MM/AAAA">
                                <div class="input-group-append">
                                    <button class="btn btn-dark btn-sm input-ii" type="button"
                                            id="btnEliminarFechaProgramadaDateCita" data-toggle="tooltip" title="Eliminar Fecha">
                                        <i class="icon icon-trash"></i></button>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-12 mb-2">
                            <label for="txtFechaProgramadaTimeCita">Hora</label>
                            <div class="input-group input-group-sm">
                                <input type="text" id="txtFechaProgramadaTimeCita" class="form-control form-control-sm"
                                       placeholder="DD/MM/AAAA">
                                <div class="input-group-append">
                                    <button class="btn btn-dark btn-sm input-ii" type="button"
                                            id="btnEliminarFechaProgramadaTimeCita" data-toggle="tooltip" title="Eliminar Fecha">
                                        <i class="icon icon-trash"></i></button> 
                                </div>
                            </div>
                        </div>
                        <div class="col-12 mb-2">
                            <label for="txtEstadoCita">Estado</label>
                            <select id="txtEstadoCita" class="form-control form-control-sm sisbu-cursor-mano">
                                <option value="PEN">PENDIENTE</option>
                                <option value="ATE">ATENDIDA</option>
                                <option value="CAN">CANCELADA</option>
                            </select>
                        </div>
                        <div class="col-12 mb-2">
                            <label for="txtMotivoCita">Motivo</label>
                            <textarea id="txtMotivoCita" class="form-control" rows="3" maxlength="300" 
                                      placeholder="">
                            </textarea>
                        </div>
                        <div class="col-12 mb-2">
                            <label for="txtObservacionProgramacionCita">Observación de Programación</label>
                            <textarea id="txtObservacionProgramacionCita" class="form-control" rows="3" maxlength="300" 
                                      placeholder="">
                            </textarea>
                        </div>
                        <div class="col-12">
                            <label for="txtObservacionAtencionCita">Observación de Atención</label>
                            <textarea id="txtObservacionAtencionCita" class="form-control" rows="3" maxlength="300" 
                                      placeholder="">
                            </textarea>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-primary btn-sm" data-dismiss="modal"><i class="icon icon-reply"></i> CANCELAR</button>
                    <button type="submit" id="btnGuardar" class="btn btn-primary btn-sm">GUARDAR</button>
                </div>
            </form>
        </div>
    </div>
</div>
<div class="modal fade" id="modalCargandoCita" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Cargando Citas. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--T: AREA SELECTED-->
<div id="ventanaModalSelectedArea" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
     data-keyboard="false" style="padding-top: 1%; overflow-y: visible;background-color: rgba(0,0,0,.2)">
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="border-color: #0085c1; border-width: 4px;">
            <div class="modal-header">
                <h5 class="mb-0" id="titleManagerArea"><strong>[ 0 ]
                        AREAS</strong></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pb-0 pt-0">
                <div class="row">
                    <div class="col-12">
                        <input type="hidden" id="pageArea"
                               value="1">
                        <form id="FrmArea">
                            <div class="row mt-3">
                                <div class="input-group col-12">
                                    <input type="text" id="txtFilterArea"
                                           class="form-control form-control-sm mr-3" placeholder="INGRESE FILTRO . . .">
                                    <button type="submit" id="btnBuscarArea"
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
                                            <th class="align-middle text-left">AREA</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyArea">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row mt-2 mb-2" style="display: none">
                            <div class="col-sm-4 mt-2">
                                <select id="sizePageArea"
                                        class="form-control form-control-sm sisbu-cursor-mano combo-paginar">
                                    <option value="7">07</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>
                            <div class="col-sm-8 mt-2">
                                <nav aria-label="Page navigation">
                                    <ul id="paginationArea"
                                        class="pagination justify-content-end">

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal" id="btnCancelSelectionArea"><i class="fas fa-ban"></i>
                    CANCELAR</button>
                <button type="button" id="btn-selecionar-area" class="btn btn-primary btn-xs"><i
                        class="fas fa-check"></i> SELECCIONAR</button>
            </div>
        </div>
    </div>
</div>

<!--T: PERSONAL SELECTED-->
<div id="ventanaModalSelectedPersonal" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
     data-keyboard="false" style="padding-top: 1%; overflow-y: visible;background-color: rgba(0,0,0,.2)">
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="border-color: #0085c1; border-width: 4px;">
            <div class="modal-header">
                <h5 class="mb-0" id="titleManagerPersonal"><strong>[ 0 ]
                        PERSONAL</strong></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pb-0 pt-0">
                <div class="row">
                    <div class="col-12">
                        <input type="hidden" id="pagePersonal"
                               value="1">
                        <form id="FrmPersonal">
                            <div class="row mt-3">
                                <div class="input-group col-12">
                                    <input type="text" id="txtFilterPersonal"
                                           class="form-control form-control-sm mr-3" placeholder="INGRESE FILTRO . . .">
                                    <button type="submit" id="btnBuscarPersonal"
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
                                            <th class="align-middle text-left">PERSONAL</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyPersonal">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row mt-2 mb-2" style="display: none">
                            <div class="col-sm-4 mt-2">
                                <select id="sizePagePersonal"
                                        class="form-control form-control-sm sisbu-cursor-mano combo-paginar">
                                    <option value="7">07</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>
                            <div class="col-sm-8 mt-2">
                                <nav aria-label="Page navigation">
                                    <ul id="paginationPersonal"
                                        class="pagination  justify-content-end">

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal" id="btnCancelSelectionPersonal"><i class="fas fa-ban"></i>
                    CANCELAR</button>
                <button type="button" id="btn-selecionar-personal" class="btn btn-primary btn-xs"><i
                        class="fas fa-check"></i> SELECCIONAR</button>
            </div>
        </div>
    </div>
</div>

<!--T: ATENDIDO SELECTED-->
<div id="ventanaModalSelectedAtendido" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
     data-keyboard="false" style="padding-top: 0%; overflow-y: visible;background-color: rgba(0,0,0,.2)">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content" style="border-color: #0085c1; border-width: 4px;">
            <div class="modal-header">
                <h5 class="mb-0" id="titleManagerAtendido"><strong>[ 0 ]
                        USUARIOS</strong></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pb-0 pt-0">
                <div class="row">
                    <div class="col-12">
                        <input type="hidden" id="pageAtendido"
                               value="1">
                        <form id="FrmAtendido">
                            <div class="row mt-3">
                                <div class="input-group col-12">
                                    <input type="text" id="txtFilterAtendido"
                                           class="form-control form-control-sm mr-3" placeholder="INGRESE FILTRO . . .">
                                    <button type="submit" id="btnBuscarAtendido"
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
                                            <th class="align-middle text-left">USUARIO</th>
                                            <th class="align-middle text-left">RESIDENCIA</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyAtendido">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row mt-2 mb-2" style="display: none">
                            <div class="col-sm-4 mt-2">
                                <select id="sizePageAtendido"
                                        class="form-control form-control-sm sisbu-cursor-mano combo-paginar">
                                    <option value="5">05</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>
                            <div class="col-sm-8 mt-2">
                                <nav aria-label="Page navigation">
                                    <ul id="paginationAtendido"
                                        class="pagination  justify-content-end">

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal" id="btnCancelSelectionAtendido"><i class="fas fa-ban"></i>
                    CANCELAR</button>
                <button type="button" id="btn-selecionar-atendido" class="btn btn-primary btn-xs"><i
                        class="fas fa-check"></i> SELECCIONAR</button>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoSelectedArea" data-backdrop="static" data-keyboard="false" tabindex="-1"
     role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.3)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Cargando áreas. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoSelectedPersonal" data-backdrop="static" data-keyboard="false" tabindex="-1"
     role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.3)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Cargando personal. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoSelectedAtendido" data-backdrop="static" data-keyboard="false" tabindex="-1"
     role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.3)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Cargando atendidos. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>