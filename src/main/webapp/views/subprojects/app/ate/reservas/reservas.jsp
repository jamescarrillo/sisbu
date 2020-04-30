<%-- 
    Document   : perfil
    Created on : 26 set. 2019, 12:40:25
    Author     : James Carrillo
--%>
<div class="row justify-content-center p-0" id="row-list-solicitud-cita" style="display: flex">

    <h2 class="text-center text-primary self-item-center mb-4">Mis Solicitudes de citas
        <button class="btn btn-xs dt-social-card border border-w-2 border-light-teal ml-8 pulse-primary"
            id="btn-nueva-solicitud-cita"><i class="icon icon-addnew icon-1x text-primary pr-2 "></i><small
                class="text-dark">NUEVA</small>
        </button>
    </h2>
    <div class="col-12 p-0">
        <form id="FrmCita">

            <div class="form-row col-12 justify-content-center p-0">
                <div class="col-lg-4 col-sm-6 col-6">
                    <label for="txtFechaInicialCita">Fecha Inicial</label>
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
                <div class="col-lg-5 col-sm-6 col-6">
                    <label for="txtFechaFinalCita">Fecha Final</label>
                    <div class="input-group">
                        <input type="text" class="form-control form-control-sm" id="txtFechaFinalCita"
                            placeholder="DD/MM/AAAA">
                        <div class="input-group-append">
                            <button type="button" id="btnEliminarFechaFinalCita" data-toggle="tooltip"
                                title="Eliminar Fecha" class="btn btn-primary btn-sm"><i
                                    class="icon icon-trash"></i></button>
                            <button type="submit" class="btn btn-sm btn-outline-primary ml-2 p-1"> <i
                                    class="icon icon-lg icon-search"></i> Buscar</button>
                        </div>

                    </div>

                </div>
            </div>

        </form>
    </div>

    <h5 class="col-12 text-danger pt-2 mb-1">***Nota: Las solicitudes con la barra vertical rojo solicitud Pendiente.
    </h5>
    <h5 class="col-12 text-warning mb-1">***Nota: Las solicitudes con la barra vertical anaranjado solicitud
        Aprobada.
    </h5>
    <h5 class="col-12 text-success mb-2">***Nota: Las solicitudes con la barra vertical verde solicitud Programada.</h5>
    <h5 class="col-12 text-info mb-1">Solo se muestran las &uacute;ltimas 5 solicitudes de citas</h5>
    <div class="col-12 p-0">
        <div class="dt-card mb-2">
            <div class="dt-card__body p-0">
                <div class="dt-widget dt-widget-hl-item dt-widget-hl-item-space dt-widget-mb-item dt-widget-hover-bg"
                    id="div-content-evaluaciones-completadas">

                </div>

            </div>
        </div>
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
    <div class="col-lg-4 col-md-6 col-sm-8 col-12">
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
                            <option value="2">ODONTOLOGIA</option>
                            <option value="6">PSICOLOGIA</option>
                            <option value="3">OBSTETRICIA</option>
                        </select>
                    </div>
                </div>
                <div class="col-12 mb-3">
                    <label for="txtFechaSolicitudCita">FECHA</label>
                    <div class="input-group">
                        <input type="text" class="form-control form-control-sm" id="txtFechaSolicitudCita"
                            placeholder="DD/MM/AAAA">
                        <div class="input-group-append">
                            <button type="button" id="btnEliminarFechaSolicitudCita" data-toggle="tooltip"
                                title="Eliminar Fecha" class="btn btn-primary btn-sm"><i
                                    class="icon icon-trash"></i></button>
                        </div>
                    </div>
                </div>
                <div class="col-12">
                    <div class="form-group">
                        <label for="txtMotivoCita">MOTIVO
                            <!-- <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover"
                                data-trigger="hover" data-placement="top" title=""
                                data-content="Direcci�n de donde vienes. Si vienes de un caser�o ingresa tu direcci�n y luego agrega tu caser�o separado por un gui�n. Ejm: #LOS ROSALES - SAN JUAN"
                                style="cursor: pointer" data-original-title=""></i> -->
                        </label>
                        <textarea id="txtMotivoCita" class="form-control" maxlength="100"
                            placeholder="Ingrese motivo. . .">

                    </textarea>
                    </div>
                </div>
                <div class="col-12 text-center">
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