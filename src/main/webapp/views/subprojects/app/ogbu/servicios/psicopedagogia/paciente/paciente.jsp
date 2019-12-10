<%-- 
    Document   : paciente.jsp
    Created on : 06/12/2019, 09:48:09 AM
    Author     : JamesCarrillo
--%>

<div class="row">

    <!--TAB PACIENTES-->
    <div class="col-xl-12" id="btnListaAtendido">
        <!-- Card -->
        <div class="card overflow-hidden" id="ListaPaciente">
            <!-- Card Header -->
            <div class="card-header bg-transparent">
                <h4 class="mb-0" id="titleManagerPaciente">[ 0 ] PACIENTES</h4>
                <input type="hidden" id="pagePaciente" value="1">
            </div>
            <!-- /card header -->
            <!-- Card Body -->
            <div class="card-body pt-0">
                <form id="FrmPaciente">
                    <div class="input-group search-box" style="max-width: 100%;">
                        <input type="search" id="txtFilterPaciente" class="form-control form-control-sm" placeholder="FILTRO. . .">
                        <div class="input-group-append">
                            <span class="search-icon"><i class="icon icon-search icon-lg"></i></span>
                            <button type="submit" class="btn btn-primary btn-sm "><i class="icon icon-search icon-fw"></i> BUSCAR</button>
                        </div>
                    </div>
                </form>
                <!-- Card -->
                <div class="dt-card mt-4">
                    <!-- Card Body -->
                    <div class="dt-card__body p-0  " >
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
        <!-- /card -->
    </div>

    <!-- Tab EVALUACIONES -->
    <div class="col-12 row" id="row-evaluaciones" style="display: none">
        <!-- Grid Item -->
        <div class="col-12 order-xl-3">
            <!-- Card Header EVALUACIONES -->
            <!-- /card heading -->
            <div class="dt-card__header ">
                <!-- Card Tools -->
                <div class="dt-card__tools">
                    <button data-toggle="tooltip" title="Regresar" type="button" id="btnCerrar" class="btn btn-outline-primary btn-sm dt-avatar" > 
                        <i class="icon icon-reply icon-lg"></i></button>
                </div>
                <!-- /card tools -->
                <!-- Card Heading -->
                <div class="dt-card__heading">
                    <h3  class="dt-card__title  text-primary text-center">EVALUACIONES</h3>
                </div>
                <!-- /card heading -->
            </div>

            <!-- /card header -->
            <!-- Card -->
            <div class="dt-card ">

                <!-- Card Body -->
                <div class="dt-card__body p-0">
                    <!-- Widget -->
                    <div class="dt-widget dt-widget-hl-item dt-widget-hl-item-space dt-widget-mb-item dt-widget-hover-bg" 
                         id="div-container-evaluaciones">

                    </div>
                    <!-- /widget -->
                </div>
                <!-- /card body -->
            </div>
            <!-- /card -->
        </div>
        <!-- /grid item -->
    </div>
    
    <!-- Tab RESULTADO DE EVALUACIONES -->
    <div class="col-12 row" id="row-resultado-evaluacione" style="display: none">
        <!-- Grid Item -->
        <div class="col-12 order-xl-3">
            <!-- Card Header EVALUACIONES -->
            <!-- /card heading -->
            <div class="dt-card__header ">
                <!-- Card Tools -->
                <div class="dt-card__tools">
                    <button data-toggle="tooltip" title="Regresar" type="button" class="btn btn-outline-primary btn-sm dt-avatar btn-close-resultados-evaluacion" > 
                        <i class="icon icon-reply icon-lg"></i></button>
                </div>
                <!-- /card tools -->
                <!-- Card Heading -->
                <div class="dt-card__heading">
                    <h3  class="dt-card__title  text-primary text-center">RESULTADO DE EVALUACIÓN</h3>
                </div>
                <!-- /card heading -->
            </div>

            <!-- /card header -->
            <!-- Card -->
            <div class="dt-card ">

                <!-- Card Body -->
                <div class="dt-card__body p-0">
                    <!-- Widget -->
                    <div class="dt-widget dt-widget-hl-item dt-widget-hl-item-space dt-widget-mb-item dt-widget-hover-bg" 
                         id="div-container-resultado-evaluacion">

                    </div>
                    <!-- /widget -->
                </div>
                <!-- /card body -->
            </div>
            <!-- /card -->
        </div>
        <!-- /grid item -->
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

<!--MODAL CARGANDO EVALUACION-->
<div class="modal fade" id="modalCargandoEvaluacion" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Procesando solicitud. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--MODAL CARGANDO RESPUESTA EVALUACION-->
<div class="modal fade" id="modalCargandoRespuestaEvaluacion" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Procesando solicitud. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--MODAL CARGANDO REMOVE EVALUACION-->
<div class="modal fade" id="modalCargandoRemoveEvaluacion" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Procesando solicitud. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>