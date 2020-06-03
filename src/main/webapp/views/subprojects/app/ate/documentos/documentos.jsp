<%-- 
    Document   : perfil
    Created on : 26 set. 2019, 12:40:25
    Author     : James Carrillo
--%>
<div class="row justify-content-center" id="row-options-evaluaciones" style="display: flex">
    <div class="col-12">
        <h2 class="text-center text-primary mb-4">Mis Documentos</h2>
        <!--h5 class="text-warning">*Nota: Cada constancia tiene un código de barras para verificar la autenticidad del documento.</h5-->
        <h5 class="text-warning">*Nota: Debido a la coyuntura pandémica, no se entregarán CONSTANCIAS de las evaluaciones virtuales en la Oficina General de Bienestar Universitario.</h5>
    </div>
    <div class="col-12">
        <div class="dt-card">
            <div class="dt-card__body p-0">
                <div class="dt-widget dt-widget-hl-item dt-widget-hl-item-space dt-widget-mb-item dt-widget-hover-bg" 
                     id="div-content-evaluaciones-completadas" style="display: none">
                    <div class="dt-widget__item border-success sisbu-cursor-mano">
                        <div class="dt-widget__info text-truncate">
                            <div class="dt-widget__title f-16 font-weight-500 text-truncate">
                                EVALUACIÓN SOCIOECONOMICA
                            </div>
                            <p class="mb-0 text-truncate text-light-gray">
                                Entregarás 3 documentos: Constancia (Botón verde) + Respuestas (Botón Rojo) + Lista de Familiares (Botón Azúl)
                            </p>
                        </div>
                        <div class="dt-widget__extra text-right">
                            <div class="show-content">
                                <span class="d-block text-dark">3</span>
                                <span class="d-block">Archivos</span>
                            </div>
                            <div class="hide-content">
                                <div class="action-btn-group">
                                    <button class="btn btn-default text-success dt-fab-btn" id="btn-download-constancia-socioeconomica" idarea='7' title="Click para descargar constancia" data-toggle="tooltip">
                                        <i class="icon icon-assignment icon-1x"></i>
                                    </button>
                                    <button class="btn btn-default text-danger dt-fab-btn" id="btn-download-preguntas-socioeconomica" idarea='7' title="Click para descargar mis respuestas" data-toggle="tooltip">
                                        <i class="icon icon-assignment icon-xl"></i>
                                    </button>
                                    <button class="btn btn-default text-primary dt-fab-btn" id="btn-download-familiares-socioeconomica" title="Click para descargar mis familiares" data-toggle="tooltip">
                                        <i class="icon icon-assignment icon-xl"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="dt-widget__item border-success sisbu-cursor-mano">
                        <div class="dt-widget__info text-truncate">
                            <div class="dt-widget__title f-16 font-weight-500 text-truncate">
                                EVALUACIÓN DEPORTIVA
                            </div>
                            <p class="mb-0 text-truncate text-light-gray">
                                Entregarás 2 documentos: Constancia (Botón verde) + Lista de deportes y aficiones (Botón Rojo)
                            </p>
                        </div>
                        <div class="dt-widget__extra text-right">
                            <div class="show-content">
                                <span class="d-block text-dark">2</span>
                                <span class="d-block">Archivos</span>
                            </div>
                            <div class="hide-content">
                                <div class="action-btn-group">
                                    <button class="btn btn-default text-success dt-fab-btn" id="btn-download-constancia-deportiva" title="Click para descargar constancia" data-toggle="tooltip">
                                        <i class="icon icon-assignment icon-1x"></i>
                                    </button>
                                    <button class="btn btn-default text-danger dt-fab-btn" id="btn-download-deportes-aficiones"  title="Click para descargar mis deportes y aficiones" data-toggle="tooltip">
                                        <i class="icon icon-assignment icon-xl"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="dt-widget__item border-success sisbu-cursor-mano">
                        <div class="dt-widget__info text-truncate">
                            <div class="dt-widget__title f-16 font-weight-500 text-truncate">
                                EVALUACIÓN PSICOLOGICA
                            </div>
                            <p class="mb-0 text-truncate text-light-gray">
                                Entregarás 1 documentos: Constancia (Botón verde)
                            </p>
                        </div>
                        <div class="dt-widget__extra text-right">
                            <div class="show-content">
                                <span class="d-block text-dark">1</span>
                                <span class="d-block">Archivo</span>
                            </div>
                            <div class="hide-content">
                                <div class="action-btn-group">
                                    <button class="btn btn-default text-success dt-fab-btn btn-download-constancia-directa" idarea='6' title="Click para descargar constancia" data-toggle="tooltip">
                                        <i class="icon icon-assignment icon-1x"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="dt-widget__item border-success sisbu-cursor-mano">
                        <div class="dt-widget__info text-truncate">
                            <div class="dt-widget__title f-16 font-weight-500 text-truncate">
                                EVALUACIÓN OBSTETRICIA
                            </div>
                            <p class="mb-0 text-truncate text-light-gray">
                                Entregarás 2 documentos: Constancia (Botón verde) + Respuestas (Botón Rojo)
                            </p>
                        </div>
                        <div class="dt-widget__extra text-right">
                            <div class="show-content">
                                <span class="d-block text-dark">2</span>
                                <span class="d-block">Archivos</span>
                            </div>
                            <div class="hide-content">
                                <div class="action-btn-group">
                                    <button class="btn btn-default text-success dt-fab-btn btn-download-constancia-directa" idarea='4' title="Click para descargar constancia" data-toggle="tooltip">
                                        <i class="icon icon-assignment icon-1x"></i>
                                    </button>
                                    <button class="btn btn-default text-danger dt-fab-btn" id="btn-download-preguntas-obstetricia" idarea='4' title="Click para descargar mis respuestas" data-toggle="tooltip">
                                        <i class="icon icon-assignment icon-xl"></i>
                                    </button>
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
        <a href="<%=request.getContextPath()%>/app/ate/evaluaciones" class="btn btn-primary mb-2"
           >
            <i class="icon icon-send"></i>
            Ir a mis evaluaciones
        </a>
    </div>
    <div class="col-12 mt-4">
        <h4 class="text-primary mb-0">Información Adicional:</h4>
        <!--h5 class="mb-0 text-danger">Descarga e imprime los documentos. Llévalos a dejar a la oficina de bienestar según el cronograma establecido.</h5-->
        <h5 class="mb-0 text-danger">Siguenos en facebook <a href="https://web.facebook.com/BienestarUNPRG" target="_blank">Bienestar Universitario</a> para mantenerte informado. </h5>
        <h5 class="mb-0 text-danger">Recuerda puedes solicitar citas virtuales <a href="<%=request.getContextPath()%>/app/ate/reservas">Aquí</a>. </h5>
    </div>
</div>

<div id="ventanaModalPreviewReporte" class="modal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" style="overflow-y: visible; background-color: rgba(0, 0, 0, 0.1); display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg-sisbu" role="document">
        <div class="modal-content" style="border-color: #2962FF; border-width: 3px;border-radius: 7px;">
            <form class="needs-validation" novalidate="">
                <div class="modal-body pb-2">
                    <h5 id="titleModalPreviewReporte"></h5>
                    <!--FRAME PARA EL PREVIEW DEL REPORTE-->
                    <div class="row" id="row_frame_report" style="display: none">
                        <div class="col-12">
                            <!--div class="embed-responsive embed-responsive-1by1">
                            </div-->
                            <iframe class="embed-responsive-item" src="" id="idframe_reporte" height="480" width="100%"></iframe>
                        </div>
                    </div>
                </div>
                <div class="modal-footer pt-2 pb-2">
                    <button type="button" class="btn btn-primary btn-xs" id="btn-cerrar-printer-comprobante" data-dismiss="modal">
                        <i class="fas fa-times"></i>
                        CERRAR</button>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoVE" data-backdrop="static" data-keyboard="false" tabindex="-1"
     role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.1)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Verificando la evaluación completada. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoVDYA" data-backdrop="static" data-keyboard="false" tabindex="-1"
     role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.1)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Verificando evaluación deportiva. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoVDP" data-backdrop="static" data-keyboard="false" tabindex="-1"
     role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.1)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Verificando datos personales. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoVDF" data-backdrop="static" data-keyboard="false" tabindex="-1"
     role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.1)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Verificando datos familiares. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="ventanaModalDatosFaltantesAtendido" class="modal" tabindex="-1" role="dialog" 
     data-backdrop="static" data-keyboard="false" 
     style="overflow-y: visible; background-color: rgba(0, 0, 0, 0.1); margin-top: 1%" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="border-color: #2962FF; border-width: 3px;border-radius: 7px;">
            <div class="modal-header">
                <h3 class="modal-title mb-0"><i class="icon icon-assignment mb-1"></i> Validación de Datos Personales</h3>
            </div>
            <div class="modal-body pb-2">
                <div class="row">
                    <div class="col-12">
                        <h5 class="text-danger mb-2">*Los siguientes datos aún no han sido ingresados. Dale click en el botón azul de abajo para completar tu información.</h5>
                    </div>
                    <div class="col-12">
                        <ul class="list-group list-group-flush" id="datos-faltantes-atendido">
                            <!--li class="list-group-item">Datos</li-->
                        </ul>
                    </div>
                    <div class="col-12 text-center mt-4 mb-2">
                        <a href="<%=request.getContextPath()%>/app/ate/datos" class="btn btn-primary btn-sm">
                            <i class="icon icon-arrow-right"></i> ir a mis Mis Datos
                        </a>
                    </div>
                </div>
            </div>
            <div class="modal-footer pt-2 pb-2">
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal">
                    <i class="fas fa-times"></i>
                    CERRAR</button>
            </div>
        </div>
    </div>
</div>

<div id="ventanaModalDatosFaltantesFamiliaresAtendido" class="modal" tabindex="-1" role="dialog" 
     data-backdrop="static" data-keyboard="false" 
     style="overflow-y: visible; background-color: rgba(0, 0, 0, 0.1); margin-top: 5%" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="border-color: #2962FF; border-width: 3px;border-radius: 7px;">
            <div class="modal-header">
                <h3 class="modal-title mb-0"><i class="icon icon-assignment mb-1"></i> Validación de Datos Familiares</h3>
            </div>
            <div class="modal-body pb-2">
                <div class="row">
                    <div class="col-12">
                        <h5 class="text-danger mb-2">*Aún no has completado la lista de tus familiares. Recuerda registrar a todos 
                            los de primer orden: Papá, Mamá, hermanos</h5>
                        <h6 class="text-danger mb-2">
                            *Dale click al botón azúl y ve al apartado Familiares y completa tu información.
                        </h6>
                    </div>
                    <div class="col-12 text-center mt-4 mb-2">
                        <a href="<%=request.getContextPath()%>/app/ate/datos" class="btn btn-primary btn-sm">
                            <i class="icon icon-arrow-right"></i> ir a mis Mis Datos
                        </a>
                    </div>
                </div>
            </div>
            <div class="modal-footer pt-2 pb-2">
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal">
                    <i class="fas fa-times"></i>
                    CERRAR</button>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoVDPOtrasPruebas" data-backdrop="static" data-keyboard="false" tabindex="-1"
     role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.1)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Verificando datos personales. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>