<%-- 
    Document   : comida.jsp
    Created on : 28/08/2019, 09:48:09 AM
    Author     : Andres
--%>

<div class="row">
    <div class="col-xl-12 p-0">
        <!-- Card -->
        <div class="overflow-hidden" id="ListaCita">
            <!-- Card Header -->
            <div class="card-header bg-transparent pt-0">
                <h4 class="mb-0" id="titleManagerCita">[ 0 ] Citas</h4>
                <input type="hidden" id="pageCita" value="1">
            </div>
            <!-- /card header -->
            <!-- Card Body -->
            <div class="card-body p-1">
                <form id="FrmCita" class="search-box mw-100 left-side-icon">
                    <div class="row">
                        <div class="col-md-6 col-12">
                            <label for="txtFilterCita">Buscar Paciente</label>
                            <div class="input-group">
                                <input type="search" id="txtFilterCita" class="form-control form-control-sm"
                                    placeholder="Filtrar Paciente ..." data-toggle="tooltip" data-placement="left"
                                    data-original-title="Buscar" />
                                <button type="submit" class="search-icon">
                                    <i class="icon icon-search icon-lg"></i></button>
                                <div class="input-group-append">
                                    <select id="txtTypeRequestCita"
                                        class="form-control form-control-sm sisbu-cursor-mano mr-4">
                                        <option value="atendida">FECHA ATENDIDA</option>
                                        <option selected value="programada">FECHA PROGRAMADA</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-6 col-12 mb-2">
                            <label for="txtFechaIFilterCita">Desde</label>
                            <div class="input-group input-group-sm">
                                <input type="text" id="txtFechaIFilterCita" class="form-control form-control-sm"
                                    placeholder="DD/MM/AAAA" data-dtp="dtp_tb7R7">
                                <div class="input-group-append">
                                    <button class="btn btn-dark btn-sm input-ii" type="button"
                                        id="btnEliminarFechaIFilterCita" data-toggle="tooltip" title=""
                                        data-original-title="Eliminar Fecha">
                                        <i class="icon icon-trash"></i></button>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-6 col-12 mb-2">
                            <label for="txtFechaFFilterCita">Hasta</label>
                            <div class="input-group input-group-sm">
                                <input type="text" id="txtFechaFFilterCita" class="form-control form-control-sm"
                                    placeholder="DD/MM/AAAA" data-dtp="dtp_dYa6f">
                                <div class="input-group-append">
                                    <button class="btn btn-dark btn-sm input-ii" type="button"
                                        id="btnEliminarFechaFFilterCita" data-toggle="tooltip" title=""
                                        data-original-title="Eliminar Fecha">
                                        <i class="icon icon-trash"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>

                </form>
                <!-- Card -->
                <div class="dt-card mt-4">
                    <div class="w-100 ps-custom-scrollbar mb-0">
                        <!-- Card Body -->
                        <div class="dt-card__body p-0 " style="min-width: 725px;">
                            <!-- Widget -->
                            <div class="dt-widget dt-widget-hl-item-space dt-widget-mb-item dt-widget-hover-bg"
                                id="tbodyCita">
                            </div>
                            <!-- /widget -->
                            <!-- /card body -->
                        </div>
                    </div>
                </div>
                <!-- /card -->
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
                            <ul id="paginationCita" class="pagination pagination-sm justify-content-end">
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
                    <h6 class="modal-title" id="txtTituloModalMan">ATENCIÓN DE CITA</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
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

<div class="modal fade" id="modalCargandoCita" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog"
    style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                        aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Cargando Citas. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>