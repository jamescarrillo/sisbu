<%-- 
    Document   : perfil
    Created on : 26 set. 2019, 12:40:25
    Author     : James Carrillo
--%>
<div class="row justify-content-center" id="row-options-evaluaciones" style="margin-top: 40px; display: flex">
    <div class="col-12 mt-4">
        <h3 class="text-warning text-center">***Nota: Cada constancia tiene un <i class="fa fa-barcode"></i> (código de barras) , para verificar la autenticidad del documento.</h3>
        <!--h6 class="text-danger text-center">Nota: Cada constancia tiene un <i class="fa fa-barcode"></i> (código de barras) , para verificar la autenticidad del documento.</h6-->
    </div>
    <div class="col-12">
        <div class="dt-card">
            <div class="dt-card__body p-0">
                <div class="dt-widget dt-widget-hl-item dt-widget-hl-item-space dt-widget-mb-item dt-widget-hover-bg" 
                     id="div-content-evaluaciones-completadas">
                    <div class="dt-widget__item border-success sisbu-cursor-mano">
                        <div class="dt-widget__info text-truncate">
                            <div class="dt-widget__title f-16 font-weight-500 text-truncate">
                                EVALUACIÓN SOCIOECONOMICA
                            </div>
                            <p class="mb-0 text-truncate text-light-gray">
                                Debes haber completado las fichas de la evaluación antes de descargar
                            </p>
                        </div>
                        <div class="dt-widget__extra">
                            <div class="dt-task mt-3">
                                <div class="dt-task__number text-success">Descargar</div>
                                <a class="dt-task__redirect btn-descargar-constancia" 
                                   idarea="7" title="" data-toggle="tooltip" 
                                   href="javascript:void(0)" data-original-title="¡Click para descargar!">
                                    <i class="icon icon-download"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="dt-widget__item border-success sisbu-cursor-mano">
                        <div class="dt-widget__info text-truncate">
                            <div class="dt-widget__title f-16 font-weight-500 text-truncate">
                                EVALUACIÓN PSICOLOGICA
                            </div>
                            <p class="mb-0 text-truncate text-light-gray">
                                Debes haber completado los test de la evaluación antes de descargar
                            </p>
                        </div>
                        <div class="dt-widget__extra">
                            <div class="dt-task mt-3">
                                <div class="dt-task__number text-success">Descargar</div>
                                <a class="dt-task__redirect btn-descargar-constancia" 
                                   idarea="6" title="" data-toggle="tooltip" 
                                   href="javascript:void(0)" data-original-title="¡Click para descargar!">
                                    <i class="icon icon-download"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="dt-widget__item border-success sisbu-cursor-mano">
                        <div class="dt-widget__info text-truncate">
                            <div class="dt-widget__title f-16 font-weight-500 text-truncate">
                                EVALUACIÓN OBSTETRICIA
                            </div>
                            <p class="mb-0 text-truncate text-light-gray">
                                Debes haber completado las fichas de la evaluación antes de descargar
                            </p>
                        </div>
                        <div class="dt-widget__extra">
                            <div class="dt-task mt-3">
                                <div class="dt-task__number text-success">Descargar</div>
                                <a class="dt-task__redirect btn-descargar-constancia" 
                                   idarea="4" title="" data-toggle="tooltip" 
                                   href="javascript:void(0)" data-original-title="¡Click para descargar!">
                                    <i class="icon icon-download"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="ventanaModalPreviewReporte" class="modal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" style="overflow-y: visible; background-color: rgba(0, 0, 0, 0.1); display: none;" aria-hidden="true">
    <div class="modal-dialog modal-lg-sisbu" role="document">
        <div class="modal-content" style="border-color: #2962FF; border-width: 3px;border-radius: 7px;">
            <form class="needs-validation" novalidate="">
                <div class="modal-body pb-2">
                    <div class="d-flex no-block align-items-center m-b-10 p-r-5 p-l-5 alert-redpos-secondary">
                        <i class="mdi mdi-content-paste"></i> <strong id="titleModalPreviewReporte"></strong>
                    </div>
                    <!--FRAME PARA EL PREVIEW DEL REPORTE-->
                    <div class="row row-div-filtro" id="row_frame_report" style="display: none">
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
                        Verificando la evaluación. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>