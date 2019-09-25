<%-- 
    Document   : index
    Created on : 21 set. 2019, 13:08:49
    Author     : James Carrillo
--%>
<div class="row justify-content-center" id="row-home-evaluaciones" style="margin-top: 70px">
    <div class="col-lg-4 col-sm-6">
        <h2 class="text-center">Hola <span class="text-info" id="lblNameUserIndex">User</span>, felicicidades por tu ingreso a nuestra UNPRG. 
        </h2>
        <p class="text-center" style="font-size: 18px">
            Tu información es importante
            para brindarte un mejor servicio. Agradecemos tu sinceridad al momento de 
            responder las distintas evaluaciones virtuales.
        </p>
        <p class="text-center text-danger" style="font-size: 12px">
            ***Nota: Te sugerimos ver los videos tutoriales sobre como llenar correctamente las evaluaciones, 
            si aún no lo has hecho, dale click a este enlace 
            <a href="<%=request.getContextPath()%>/app/ate/tutoriales-sisbu-cachimbo"><i class="icon icon-arrow-right icon-fw mr-2 mr-sm-1"></i> Videos Tutoriales</a>
        </p>
    </div>
    <div class="col-12 text-center">
        <button class="btn btn-primary" id="btnEmpezarEvaluaciones">Empezar</button>
    </div>
</div>

<div class="row justify-content-center" id="row-options-evaluaciones" style="margin-top: 70px; display: none">
    <div class="col-xl-3 col-sm-6 col-lg-3">
        <div class="dt-card sisbu-cursor-mano option-evaluation" evaluation="socieconomica">
            <div class="dt-card__body d-flex flex-sm-column text-center">
                <div class="mb-sm-7">
                    <i class="icon icon-wallpage dt-icon-bg text-primary"></i>
                </div>
                <a class="h2 mb-0 font-weight-500">Evaluación Socieconómica</a>
            </div>
        </div>
    </div>
    <div class="col-xl-3 col-sm-6 col-lg-3">
        <div class="dt-card sisbu-cursor-mano option-evaluation" evaluation="deportiva">
            <div class="dt-card__body d-flex flex-sm-column text-center">
                <div class="mb-sm-7">
                    <i class="icon icon-ripple dt-icon-bg text-primary"></i>
                </div>
                <a class="h2 mb-0 font-weight-500">Evaluación Deportiva</a>
            </div>
        </div>
    </div>
    <div class="col-xl-3 col-sm-6 col-lg-3">
        <div class="dt-card sisbu-cursor-mano option-evaluation" evaluation="psicologica">
            <div class="dt-card__body d-flex flex-sm-column text-center">
                <div class="mb-sm-7">
                    <i class="icon icon-heart-o dt-icon-bg text-primary"></i>
                </div>
                <a class="h2 mb-0 font-weight-500">Evaluación Psicológica</a>
            </div>
        </div>
    </div>
    <div class="col-xl-3 col-sm-6 col-lg-3">
        <div class="dt-card sisbu-cursor-mano option-evaluation" evaluation="obstetricia">
            <div class="dt-card__body d-flex flex-sm-column text-center">
                <div class="mb-sm-7">
                    <i class="icon icon-link dt-icon-bg text-primary"></i>
                </div>
                <a class="h2 mb-0 font-weight-500">Evaluación Obstetricia</a>
            </div>
        </div>
    </div>
    <div class="col-12 text-center">
        <button class="btn btn-outline-primary" id="btnRegresarHome">
            <i class="icon icon-home"></i>
            Inicio
        </button>
    </div>
</div>

<div class="row" id="row-option-socioeconomica" style="display: none;">
    <div class="col-12">
        <div class="row" id="div-evaluaciones-socieconomica">
            <div class="col-12">
                <div class="dt-card dt-card__full-height">
                    <div class="dt-card__header mb-2 pt-4">
                        <div class="dt-card__heading">
                            <h3 class="dt-card__title">Avance</h3>
                        </div>
                    </div>
                    <div class="dt-card__body pb-4">
                        <div class="row">
                            <div class="col-xl-4 col-md-12 col-sm-4">
                                <!-- Chart -->
                                <canvas class="mx-auto mb-5 mb-sm-0 mb-md-5 mb-xl-0"
                                        id="estimation-socie" data-fill="0"
                                        height="110" width="110"></canvas>
                            </div>
                            <div class="col-xl-8 col-md-12 col-sm-8">
                                <div class="pb-3 mb-3 border-bottom">
                                    <span class="display-4 d-inline-block mr-2 font-weight-500 text-dark" id="lblNumProcedimientosSocie">12</span><span
                                        class="font-weight-light f-16">Fichas</span>
                                </div>
                                <ul class="dt-list dt-list-col-6">
                                    <li class="dt-list__item">
                                        <span class="dot-shape dot-shape-lg bg-light-green mr-2"></span>
                                        <span class="d-inline-block" id="lblNumRespondidasSocie">0 Realizadas</span>
                                    </li>
                                    <li class="dt-list__item">
                                        <span class="dot-shape dot-shape-lg bg-light-pink mr-2"></span>
                                        <span class="d-inline-block" id="lblNumPendientesSocie">5 Pendientes</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="dt-card">
                    <div class="dt-card__body p-0">
                        <div class="dt-widget dt-widget-hl-item dt-widget-hl-item-space dt-widget-mb-item dt-widget-hover-bg" 
                             id="div-content-evaluacion-socioeconomica">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" id="div-preguntas-evaluacion-socieconomica" style="display: none">
            <div class="col-12" style="">

                <!-- Card -->
                <div class="dt-card">

                    <!-- Card Header -->
                    <div class="dt-card__header bg-primary pb-7 mb-0 rounded-top">

                        <!-- Card Heading -->
                        <div class="dt-card__heading">
                            <div class="d-flex align-items-center">
                                <i class="icon icon-invoice-new icon-fw icon-2x text-white mr-2"></i>
                                <h3 class="dt-card__title text-white" style="text-transform: none">Lista de Preguntas</h3>
                            </div>
                        </div>
                        <!-- /card heading -->
                    </div>
                    <!-- /card header -->

                    <!-- Card Body -->
                    <div class="dt-card__body pb-3">
                        <div class="row mt-3">
                            <div class="col-12">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">
                                        <div class="form-group mb-2">
                                            <label class="mb-2">1. ¿Como estas en todo este proceso de aprendizaje?</label>
                                            <select class="form-control form-control-sm">
                                                <option>Respuesta...</option>
                                                <option>OPCION 1</option>
                                                <option>OPCION 2</option>
                                                <option>OPCION 3</option>
                                                <option>OPCION 4</option>
                                            </select>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="form-group mb-2">
                                            <label class="mb-2">1. ¿Como estas en todo este proceso de NUEVO?</label>
                                            <input class="form-control form-control-sm">
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <label class="mb-2">1. ¿Como estas en todo este proceso de NUEVO?
                                            <i class="icon icon-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-placement="top" 
                                               title="" data-content="Mensaje de ayuda" 
                                               style="cursor: pointer" data-original-title=""></i>
                                        </label>
                                        <div class="form-group custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="checkbox-1">
                                            <label class="custom-control-label sisbu-cursor-mano" for="checkbox-1">Siempre</label>
                                        </div>
                                        <div class="form-group custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="checkbox-2">
                                            <label class="custom-control-label" for="checkbox-2">Casi Siempre</label>
                                        </div>
                                        <div class="form-group custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="checkbox-3">
                                            <label class="custom-control-label" for="checkbox-3">Aveces</label>
                                        </div>
                                        <div class="form-group custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id="checkbox-4">
                                            <label class="custom-control-label" for="checkbox-4">Nose xd</label>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 text-center" id="div-cancelar-evaluation-socie" style="display: none">
            <button class="btn btn-outline-primary" id="btn-cancelar-evaluation-socie">
                <i class="icon icon-reply"></i>
                Salir
            </button>
        </div>
    </div>
    <div class="col-12 text-center" id="div-regresar-selected-evaluation-socie">
        <button class="btn btn-outline-primary btn-regresar-selected-evaluation">
            <i class="icon icon-reply"></i>
            Regresar a seleccionar evaluación
        </button>
    </div>
</div>

<div class="row" id="row-option-deportiva" style="margin-top: 70px; display: none">
    <div class="col-12">
        <div class="row justify-content-center" id="div-evaluacion-deportiva-deportes">
            <div class="col-xl-3 col-sm-6 col-lg-3">
                <div class="dt-card sisbu-cursor-mano" id="div-evaluacion-deportiva-deportes">
                    <div class="dt-card__body d-flex flex-sm-column text-center">
                        <div class="mb-sm-7">
                            <i class="icon icon-assignment dt-icon-bg text-primary"></i>
                        </div>
                        <a class="h2 mb-0 font-weight-500">¿Cuáles deportes practico?</a>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-sm-6 col-lg-3">
                <div class="dt-card sisbu-cursor-mano" id="div-evaluacion-deportiva-aficiones">
                    <div class="dt-card__body d-flex flex-sm-column text-center">
                        <div class="mb-sm-7">
                            <i class="icon icon-assignment dt-icon-bg text-primary"></i>
                        </div>
                        <a class="h2 mb-0 font-weight-500">¿Cuáles son mis aficiones?</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" id="div-content-evaluacion-deportiva">

        </div>
    </div>
    <div class="col-12 text-center">
        <button class="btn btn-outline-primary btn-regresar-selected-evaluation">
            <i class="icon icon-reply"></i>
            Regresar a seleccionar evaluación
        </button>
    </div>
</div>

<div class="row" id="row-option-psicologica" style="margin-top: 70px; display: none">
    <div class="col-12">
        <div class="row justify-content-center" id="div-content-evaluacion-psicologica">
            <div class="col-xl-3 col-sm-6 col-lg-3">
                <div class="dt-card sisbu-cursor-mano">
                    <div class="dt-card__body d-flex flex-sm-column text-center">
                        <div class="mb-sm-7">
                            <i class="icon icon-assignment dt-icon-bg text-primary"></i>
                        </div>
                        <a class="h2 mb-0 font-weight-500">Test Baron Ice</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" id="div-preguntas-evaluacion-psicologica">

        </div>
    </div>
    <div class="col-12 text-center">
        <button class="btn btn-outline-primary btn-regresar-selected-evaluation">
            <i class="icon icon-reply"></i>
            Regresar a seleccionar evaluación
        </button>
    </div>
</div>
<div class="row" id="row-option-obstetricia" style="margin-top: 70px; display: none">
    <div class="col-12">
        <div class="row justify-content-center" id="div-content-evaluacion-obstetricia">
            <div class="col-xl-3 col-sm-6 col-lg-3">
                <div class="dt-card sisbu-cursor-mano">
                    <div class="dt-card__body d-flex flex-sm-column text-center">
                        <div class="mb-sm-7">
                            <i class="icon icon-assignment dt-icon-bg text-primary"></i>
                        </div>
                        <a class="h2 mb-0 font-weight-500">Examen Inicial</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" id="div-preguntas-evaluacion-obstetricia">

        </div>
    </div>
    <div class="col-12 text-center">
        <button class="btn btn-outline-primary btn-regresar-selected-evaluation">
            <i class="icon icon-reply"></i>
            Regresar a seleccionar evaluación
        </button>
    </div>
</div>

<!--MODALES CARGNADO-->
<div class="modal" id="modalCargandoProcedimientoCicloSocie" data-backdrop="static" data-keyboard="false" tabindex="-1"
     role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.1)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Preparando evaluación. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoProcedimientoCicloPsico" data-backdrop="static" data-keyboard="false" tabindex="-1"
     role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.1)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Preparando evaluación psicológica. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoProcedimientoCicloObste" data-backdrop="static" data-keyboard="false" tabindex="-1"
     role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.1)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Preparando evaluación de obstetricia. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>