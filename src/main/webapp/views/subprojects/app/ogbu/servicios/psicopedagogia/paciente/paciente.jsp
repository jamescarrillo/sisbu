<%-- 
    Document   : paciente.jsp
    Created on : 06/12/2019, 09:48:09 AM
    Author     : JamesCarrillo
--%>

<div class="row">

    <!--TAB PACIENTES-->
    <div class="col-xl-12 p-0" id="btnListaAtendido">
        <!-- Card -->
        <div class="overflow-hidden" id="ListaPaciente">
            <!-- Card Header -->
            <div class="card-header bg-transparent">
                <h4 class="mb-0" id="titleManagerPaciente">[ 0 ] PACIENTES</h4>
                <input type="hidden" id="pagePaciente" value="1">
            </div>
            <!-- /card header -->
            <!-- Card Body -->
            <div class="card-body p-0">
                <form id="FrmPaciente" class="search-box mw-100 left-side-icon">
                    <div class="input-group search-box" style="max-width: 100%;">
                        <input type="search" id="txtFilterPaciente" class="form-control form-control-sm"
                            placeholder="FILTRO. . ." data-toggle="tooltip" data-placement="left"
                            data-original-title="Buscar">
                        <button type="submit" class="search-icon">
                            <i class="icon icon-search icon-lg"></i></button>

                    </div>
                </form>
                <!-- Card -->
                <div class="dt-card mt-4">
                    <!-- Card Body -->
                    <div class="dt-card__body p-0  ">
                        <!-- Widget -->
                        <div class="dt-widget dt-widget-hl-item-space dt-widget-mb-item dt-widget-hover-bg dt-social-card border border-w-2 border-light-teal"
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
    <div class="col-lg-12  p-0" id="row-evaluaciones" style="display: none">
        <!-- Grid Item -->
        <div class="col-12 p-0 order-xl-3">
            <!-- Card Header EVALUACIONES -->
            <!-- /card heading -->
            <div class="dt-card__header ">
                <!-- Card Tools -->
                <div class="dt-card__tools">
                    <button data-toggle="tooltip" title="Regresar" type="button" id="btnCerrar"
                        class="btn btn-outline-primary btn-sm dt-avatar">
                        <i class="icon icon-reply icon-lg"></i></button>
                </div>
                <!-- /card tools -->
                <!-- Card Heading -->
                <div class="dt-card__heading">
                    <h3 class="dt-card__title  text-primary text-center">EVALUACIONES</h3>
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
    <div class="col-lg-12 p-0" id="row-resultado-evaluacione" style="display: none">
        <!-- Card -->
        <div class="col-lg-12 p-0">

            <!-- Card -->
            <div class="dt-card">

                <!-- Card Header -->
                <div class="dt-card__header ">
                    <!-- Card Tools -->
                    <div class="dt-card__tools">
                        <button data-toggle="tooltip" title="Regresar" type="button" class="btn btn-outline-primary btn-sm 
                                dt-avatar btn-close-resultados">
                            <i class="icon icon-reply icon-lg"></i></button>
                    </div>
                    <!-- /card tools -->
                    <div class="dt-card__heading text-center">
                        <h3 class="dt-card__title text-primary">Puntajes por &Aacute;reas</h3>
                    </div>

                    <span id="btnOpenListaPregunta" data-toggle="tooltip" data-placement="bottom"
                        data-original-title="Lista de Respuestas"
                        class="badge badge-secondary badge-top-right sisbu-cursor-mano pulse-info">Lista de Preguntas
                        con
                        Respuesta</span>
                </div>
                <!-- /card header -->

                <!-- Card Body -->
                <div class="dt-card__body ">
                    <!-- Widget -->
                    <div class="dt-widget form-row ">
                        <div class="col-lg-3 col-4">
                            <!-- Widget Item -->
                            <div class="dt-widget__item p-1">
                                <!-- Widget Info -->
                                <div class="dt-widget__info text-truncate" style="min-width: 100%;">
                                    <span class="h6 font-weight-500">&Aacute;REA
                                    </span>
                                </div>
                                <!-- /widget info -->
                            </div>
                            <!-- /widgets item -->
                        </div>
                        <div class="col-lg-9 col-8">
                            <!-- Widget Item -->
                            <div class="dt-widget__item p-1">
                                <!-- Widget Info -->
                                <div class="dt-widget__info text-truncate">
                                    <span class="h6 font-weight-500">SUB&Aacute;REA
                                    </span>
                                </div>
                                <!-- /widget info -->
                                <!-- Widget Info -->
                                <div class="dt-widget__info text-truncate">
                                    <span class="h6 font-weight-500">N° ITEMS
                                    </span>
                                </div>
                                <!-- /widget info -->
                                <!-- Widget Info -->
                                <div class="dt-widget__info text-truncate ">
                                    <span class="h6 font-weight-500">VALOR ACUMULADO
                                    </span>
                                </div>
                                <!-- /widget info -->
                                <!-- Widget Info -->
                                <div class="dt-widget__info text-truncate">
                                    <span class="h6 font-weight-500">OPERACI&oacute;N
                                    </span>
                                </div>
                                <!-- /widget info -->


                                <!-- Widget Info -->
                                <div class="dt-widget__info text-truncate">
                                    <span class="h6 font-weight-500">PUNTAJE M&Aacute;XIMO
                                    </span>
                                </div>
                                <!-- /widget info -->
                                <!-- Widget Info -->
                                <div class="dt-widget__info text-truncate">
                                    <span class="h6 font-weight-500">INTERPRETACI&Oacute;N
                                    </span>
                                </div>
                                <!-- /widget info -->
                            </div>
                            <!-- /widgets item -->
                        </div>
                    </div>
                    <!-- /widget -->

                    <!-- Widget -->
                    <div id="tbodyPuntajeArea" class="dt-widget-hover form-row ">

                    </div>

                    <!-- /widget -->


                </div>
                <!-- /card body -->
                <!-- /card -->

            </div>
        </div>
        <!-- /card -->
    </div>
    <!-- Tab RESULTADO DE EVALUACIONES -->
    <div class="col-lg-12 p-0" id="row-resultado-evaluacione-preguntas" style="display: none">
        <!-- Grid Item -->
        <div class="col-lg-12 p-0 order-xl-3">
            <!-- Card Header EVALUACIONES -->
            <!-- /card heading -->
            <div class="dt-card__header ">
                <!-- Card Tools -->
                <div class="dt-card__tools">
                    <button data-toggle="tooltip" title="Regresar" type="button" class="btn btn-outline-primary btn-sm 
                            dt-avatar btn-close-resultados-evaluacion">
                        <i class="icon icon-reply icon-lg"></i></button>
                </div>
                <!-- /card tools -->
                <!-- Card Heading -->
                <div class="dt-card__heading">
                    <h3 id="title-respuesta-evaluacion" class="dt-card__title  text-primary text-center">RESULTADO DE
                        EVALUACI�N</h3>
                </div>
                <!-- /card heading -->
            </div>

            <!-- /card header -->
            <!-- Card -->
            <div class="dt-card ">

                <!-- Card Body -->
                <div class="dt-card__body pb-3">
                    <div class="row mt-3">
                        <div class="col-12">
                            <ul class="list-group list-group-flush pb-4" id="content-respuesta-evaluacion-psicologico">
                                <!--li class="list-group-item">
                                    <label class="mb-2 text-primary">1. �Cuando tengo que hacer una tarea, normalmente la dejo para �ltimo minuto?
                                    </label>
                                    <div class="form-group custom-control custom-checkbox mb-2">
                                        <input type="checkbox" class="custom-control-input check-279" id="1101" idpregunta="279">
                                        <label class="custom-control-label sisbu-cursor-mano" for="1101">Nunca
                                        </label>
                                    </div>
                                </li-->
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- /card body -->
            </div>
            <!-- /card -->
        </div>
        <!-- /grid item -->
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

<div id="ventanaModalPreviewReporte" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
    data-keyboard="false" style="overflow-y: visible; background-color: rgba(0, 0, 0, 0.1); display: none;"
    aria-hidden="true">
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
                            <iframe class="embed-responsive-item" src="" id="idframe_reporte" height="480"
                                width="100%"></iframe>
                        </div>
                    </div>
                </div>
                <div class="modal-footer pt-2 pb-2">
                    <button type="button" class="btn btn-primary btn-xs" id="btn-cerrar-printer-comprobante"
                        data-dismiss="modal">
                        <i class="fas fa-times"></i>
                        CERRAR</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!--MODAL CARGANDO EVALUACION-->
<div class="modal fade" id="modalCargandoEvaluacion" data-backdrop="static" data-keyboard="false" tabindex="-1"
    role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                        aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Procesando solicitud. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--MODAL CARGANDO RESPUESTA EVALUACION-->
<div class="modal fade" id="modalCargandoRespuestaEvaluacion" data-backdrop="static" data-keyboard="false" tabindex="-1"
    role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                        aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Procesando solicitud. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--MODAL CARGANDO REMOVE EVALUACION-->
<div class="modal fade" id="modalCargandoRemoveEvaluacion" data-backdrop="static" data-keyboard="false" tabindex="-1"
    role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                        aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Procesando solicitud. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>