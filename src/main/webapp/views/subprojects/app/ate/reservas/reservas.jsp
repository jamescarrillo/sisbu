<%-- 
    Document   : perfil
    Created on : 26 set. 2019, 12:40:25
    Author     : James Carrillo
--%>
<div class="row justify-content-center p-0" id="row-list-solicitud-cita" style="display: flex">
    <div class="col-12">
        <h2 class="text-center text-primary self-item-center mb-0">Mis citas
        </h2>
    </div>
    <div class="col-12">
        <hr>
    </div>
    <div class="col-12 p-0">
        <form id="FrmCita">
            <div class="row justify-content-center mb-3">
                <div class="col-lg-4 col-sm-6">
                    <label for="txtFechaInicialCita">Desde</label>
                    <div class="input-group">
                        <input type="text" class="form-control form-control-sm" id="txtFechaInicialCita"
                               placeholder="DD/MM/AAAA">
                        <div class="input-group-append">
                            <button type="button" id="btnEliminarFechaInicialCita" data-toggle="tooltip"
                                    title="Eliminar Fecha" class="btn btn-primary btn-sm"><i
                                    class="icon icon-trash"></i></button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                    <label for="txtFechaFinalCita">Hasta</label>
                    <div class="input-group">
                        <input type="text" class="form-control form-control-sm" id="txtFechaFinalCita"
                               placeholder="DD/MM/AAAA">
                        <div class="input-group-append">
                            <button type="button" id="btnEliminarFechaFinalCita" data-toggle="tooltip"
                                    title="Eliminar Fecha" class="btn btn-primary btn-sm"><i
                                    class="icon icon-trash"></i></button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-sm-6">
                    <div style="margin-top: 23px">
                        <button type="submit" class="btn btn-sm btn-primary ml-2"> <i
                                class="icon icon-lg icon-search"></i> Buscar</button>
                        <button type="button" class="btn btn-xs dt-social-card border border-w-2 border-light-teal ml-8 pulse-primary"
                                id="btn-nueva-solicitud-cita"><i class="icon icon-addnew icon-1x text-primary pr-2 "></i><small
                                class="text-dark">SOLICITAR CITA</small>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <h5 class="col-12 text-info mb-1">Solo se muestran las &uacute;ltimas 5 citas</h5>
    <div class="col-12 mt-2">
        <div class="dt-card mb-2">
            <div class="dt-card__body p-0">
                <div class="dt-widget dt-widget-hl-item dt-widget-hl-item-space dt-widget-mb-item dt-widget-hover-bg"
                     id="div-content-evaluaciones-completadas">

                </div>

            </div>
        </div>
    </div>
    <div class="col-12">
        <h5 class="text-danger pt-2 mb-1">*Nota: Las solicitudes con la barra vertical rojo indica Solicitud Pendiente.
        </h5>
        <h5 class="text-primary mb-1">*Nota: Las solicitudes con la barra vertical azul indica Solicitud
            Aprobada.
        </h5>
        <h5 class="text-success mb-2">*Nota: Las solicitudes con la barra vertical verde indica Solicitud Programada.</h5>
    </div>
    <div class="col-12">
        <hr>
    </div>
    <div class="col-12 p-0 text-center mb-4">
        <a href="<%=request.getContextPath()%>/app/ate/perfil" class="btn btn-warning text-white mr-4 mb-2">
            <i class="icon icon-send"></i>
            Ir a mi perfil
        </a>
        <a href="<%=request.getContextPath()%>/app/ate/datos" class="btn btn-success mr-4 mb-2">
            <i class="icon icon-send"></i>
            Ir a mis Datos
        </a>
        <!--a href="<%=request.getContextPath()%>/app/ate/evaluaciones" class="btn btn-primary mb-2"
           >
            <i class="icon icon-send"></i>
            Ir a mis evaluaciones
        </a-->
    </div>

</div>

<div class="row justify-content-center" id="row-crud-solicitud-cita" style="display: none">
    <div class="col-lg-5 col-md-6 col-sm-8 col-12">
        <form id="FrmCitalModal" class="card dt-card dt-social-card border border-w-2 border-light-teal p-1 m-0">

            <h4 id="txtTituloCita" class="card-header m-1 text-center text-primary">Registro de Solicitud de Cita
            </h4>
            <div class="card-body p-2">

                <div class="col-12">
                    <div class="form-group">
                        <label for="txtServicioSolicitudCita">SERVICIO</label>
                        <select class="form-control form-control-sm sisbu-cursor-mano" id="txtServicioSolicitudCita">
                            <option value="-1">Seleccione un servicio. . .</option>
                            <option value="1">MEDICINA</option>
                            <option value="3">ODONTOLOGIA</option>
                            <option value="6">PSICOLOGIA</option>
                            <option value="4">OBSTETRICIA</option>
                        </select>
                    </div>
                </div>

                <div class="col-12">
                    <div class="form-group">
                        <label for="txtMotivoCita">MOTIVO
                        </label>
                        <textarea id="txtMotivoCita" class="form-control text-uppercase" maxlength="200"
                                  placeholder="Ingrese motivo. . ." rows="4">
                        </textarea>
                    </div>
                </div>
                <div class="col-12 text-center mb-3">
                    <button type="submit" class="btn btn-xs btn-primary">GUARDAR</button>
                    <button type="reset" class="btn btn-xs btn-warning" id="btn-cancelar-crud"
                            style="color: white">CANCELAR</button>
                </div>
            </div>

        </form>
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