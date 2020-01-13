<%-- 
    Document   : perfil
    Created on : 26 set. 2019, 12:40:25
    Author     : James Carrillo
--%>
<div class="row justify-content-center" id="row-list-solicitud-cita" style="display: flex">
    <div class="col-12">
        <h2 class="text-center text-primary mb-4">Mis Solicitudes de citas <button class="btn btn-xs btn-primary" id="btn-nueva-solicitud-cita"><i class="icon icon-plus"></i>NUEVA</button> </h2>
        <h5 class="text-warning">***Nota: Las solicitudes con la barra vertical verde han sido aprobadas.</h5>
    </div>
    <div class="col-12">
        <div class="dt-card">
            <div class="dt-card__body p-0">
                <div class="dt-widget dt-widget-hl-item dt-widget-hl-item-space dt-widget-mb-item dt-widget-hover-bg" 
                     id="div-content-evaluaciones-completadas">
                    <div class="dt-widget__item border-success sisbu-cursor-mano">
                        <div class="dt-widget__info text-truncate">
                            <div class="dt-widget__title f-16 font-weight-500 text-truncate">
                                SERVICIO DE MEDICINA
                            </div>
                            <p class="mb-0 text-truncate text-light-gray">
                                Dr. Edson Días
                            </p>
                        </div>
                        <div class="dt-widget__extra text-right">
                            <div class="show-content">
                                <span class="d-block">21/09/1996</span>
                                <span class="d-block">11:00 AM</span>
                            </div>
                            <div class="hide-content">
                                <div class="action-btn-group">
                                    <button class="btn btn-default text-success dt-fab-btn" id="btn-download-constancia-socioeconomica" idarea='7' title="Editar solicitud" data-toggle="tooltip">
                                        <i class="icon icon-assignment icon-1x"></i>
                                    </button>
                                    <button class="btn btn-default text-danger dt-fab-btn" id="btn-download-preguntas-socioeconomica" idarea='7' title="Eliminar solicitud" data-toggle="tooltip">
                                        <i class="icon icon-assignment icon-xl"></i>
                                    </button>
                                    <!--button class="btn btn-default text-primary dt-fab-btn" id="btn-download-familiares-socioeconomica" title="Click para descargar mis familiares" data-toggle="tooltip">
                                        <i class="icon icon-assignment icon-xl"></i>
                                    </button-->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-12 text-center mb-4">
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
    <div class="col-12 mt-4">
        <h4 class="text-primary mb-0">Información Adicional:</h4>
        <h5 class="mb-0 text-danger">Solo se muestran las últimas 5 solicitudes de citas</h5>
    </div>
</div>

<div class="row justify-content-center" id="row-crud-solicitud-cita" style="display: none">
    <div class="col-lg-4 col-md-6 col-sm-8 col-12">
        <div class="row">
            <div class="col-12" style="margin-top: 30px">
                <h2 class="text-center text-primary mb-4">Registro de Solicitud de Cita</h2>
            </div>
            <div class="col-12">
                <div class="form-group">
                    <label for="txtAreaSolicitudCita">SERVICIO</label>
                    <select  class="form-control form-control-sm sisbu-cursor-mano" id="txtSexoPaciente">
                        <option value="-1">Seleccione un servicio. . .</option>
                        <option value="1">MEDICINA</option>
                        <!--option value="2">ODONTOLOGIA</option-->
                        <option value="6">PSICOLOGÍA</option>
                        <!--option value="3">OBSTETRICIA</option-->
                    </select>
                </div>
            </div>
            <div class="col-12 mb-3">
                <label for="txtFechaSolicitudCita">FECHA</label>
                <div class="input-group">
                    <input  type="text" class="form-control form-control-sm" id="txtFechaNacPaciente" placeholder="DD/MM/AAAA">
                    <div class="input-group-append">
                        <button type="button" id="btnEliminarFechaNacPaciente" data-toggle="tooltip" title="Eliminar Fecha" class="btn btn-primary btn-sm"><i class="fa fa-trash"></i></button>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="form-group">
                    <label for="txtDireccionProcePaciente">MOTIVO
                        <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="Dirección de donde vienes. Si vienes de un caserío ingresa tu dirección y luego agrega tu caserío separado por un guión. Ejm: #LOS ROSALES - SAN JUAN" style="cursor: pointer" data-original-title=""></i>
                    </label>
                    <textarea class="form-control" maxlength="100" placeholder="Ingrese motivo. . .">
                        
                    </textarea>
                </div>
            </div>
            <div class="col-12">
                <button class="btn btn-xs btn-primary">GUARDAR</button>
                <button class="btn btn-xs btn-warning" id="btn-cancelar-crud" style="color: white">CANCELAR</button>
            </div>
        </div>
    </div>
</div>