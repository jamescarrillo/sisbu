<%-- 
    Document   : index
    Created on : 21 set. 2019, 13:08:49
    Author     : James Carrillo
--%>
<div class="row justify-content-center" id="row-home-evaluaciones" style="margin-top: 30px">
    <div class="col-sm-6">
        <div class="row">
            <div class="col-lg-4 text-center">
                <img src="<%=request.getContextPath()%>/resources/prod/custom_app/pedritojr_blanco_feliz.png" class="img-fluid" alt="Pedrito Jr.">
            </div>
            <div class="col-lg-8">
                <br>
                <h2 class="text-center">
                    ¡Felicidades por tu ingreso <span class="text-info" id="lblNameUserIndex">User</span>!
                    Estamos encantados de recibirte en nuestra UNPRG. 
                </h2>
                <p class="text-center" style="font-size: 18px">
                    Tu información es importante
                    para brindarte un mejor servicio. Agradecemos tu sinceridad al momento de 
                    responder las distintas evaluaciones virtuales.
                </p>

            </div>
        </div>
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
        <div class="dt-card sisbu-cursor-mano option-evaluation" evaluation="socioconomica">
            <div class="dt-card__body d-flex flex-sm-column text-center">
                <div class="mb-sm-7">
                    <i class="icon icon-wallpage dt-icon-bg text-primary"></i>
                </div>
                <a class="h2 mb-0 font-weight-500">Evaluación<br>Socioeconómica</a>
            </div>
        </div>
    </div>
    <div class="col-xl-3 col-sm-6 col-lg-3">
        <div class="dt-card sisbu-cursor-mano option-evaluation" evaluation="deportiva">
            <div class="dt-card__body d-flex flex-sm-column text-center">
                <div class="mb-sm-7">
                    <i class="icon icon-ripple dt-icon-bg text-primary"></i>
                </div>
                <a class="h2 mb-0 font-weight-500">Evaluación<br>Deportiva</a>
            </div>
        </div>
    </div>
    <div class="col-xl-3 col-sm-6 col-lg-3">
        <div class="dt-card sisbu-cursor-mano option-evaluation" evaluation="psicologica">
            <div class="dt-card__body d-flex flex-sm-column text-center">
                <div class="mb-sm-7">
                    <i class="icon icon-heart-o dt-icon-bg text-primary"></i>
                </div>
                <a class="h2 mb-0 font-weight-500">Evaluación<br>Psicológica</a>
            </div>
        </div>
    </div>
    <div class="col-xl-3 col-sm-6 col-lg-3">
        <div class="dt-card sisbu-cursor-mano option-evaluation" evaluation="obstetricia">
            <div class="dt-card__body d-flex flex-sm-column text-center">
                <div class="mb-sm-7">
                    <i class="icon icon-link dt-icon-bg text-primary"></i>
                </div>
                <a class="h2 mb-0 font-weight-500">Evaluación<br>Obstetricia</a>
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

<div class="row" id="row-option-socioeconomico" style="display: none;">
    <div class="col-12">
        <div class="row" id="div-evaluaciones-socioeconomico">
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
                                        id="estimation-socioeconomico" data-fill="0"
                                        height="110" width="110"></canvas>
                            </div>
                            <div class="col-xl-8 col-md-12 col-sm-8">
                                <div class="pb-3 mb-3 border-bottom">
                                    <span class="display-4 d-inline-block mr-2 font-weight-500 text-dark" id="lblNumProcedimientosSocioeconomico">0</span><span
                                        class="font-weight-light f-16">Fichas</span>
                                </div>
                                <ul class="dt-list dt-list-col-6">
                                    <li class="dt-list__item">
                                        <span class="dot-shape dot-shape-lg bg-light-green mr-2"></span>
                                        <span class="d-inline-block" id="lblNumRespondidasSocioeconomico">0 Realizadas</span>
                                    </li>
                                    <li class="dt-list__item">
                                        <span class="dot-shape dot-shape-lg bg-light-pink mr-2"></span>
                                        <span class="d-inline-block" id="lblNumPendientesSocioeconomico">0 Pendientes</span>
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
                             id="div-content-evaluacion-socioeconomico">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" id="div-preguntas-evaluacion-socioeconomico" style="display: none">
            <div class="col-12" style="">
                <div class="dt-card">
                    <div class="dt-card__header bg-primary pb-7 mb-0 rounded-top">
                        <div class="dt-card__heading">
                            <div class="d-flex align-items-center">
                                <i class="icon icon-invoice-new icon-fw icon-2x text-white mr-2"></i>
                                <h3 class="dt-card__title text-white" style="text-transform: none">Lista de Preguntas</h3>
                            </div>
                        </div>
                    </div>
                    <div class="dt-card__body pb-3">
                        <div class="row mt-3">
                            <div class="col-12">
                                <ul class="list-group list-group-flush" id="content-preguntas-evaluacion-socioeconomico">
                                    <!--li class="list-group-item">
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
                                    </li-->
                                </ul>
                            </div>
                            <div class="col-12 text-right">
                                <button class="btn btn-outline-primary" id="btn-cancelar-evaluation-socioeconomico">
                                    <i class="icon icon-reply"></i>
                                    Salir
                                </button>
                                <button class="btn btn-primary" id="btn-finalizar-evaluation-socioeconomico">
                                    <i class="icon icon-double-arrow-right mb-1"></i>
                                    Finalizar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-12 text-center" id="div-regresar-selected-evaluation-socioeconomico">
        <button class="btn btn-outline-primary btn-regresar-selected-evaluation">
            <i class="icon icon-reply"></i>
            Mis Evaluaciones
        </button>
    </div>
</div>

<div class="row" id="row-option-deportiva" style="display: none">
    <div class="col-12">
        <div class="row justify-content-center">
            <div class="col-lg-4 col-md-6 col-sm-8">
                <img src="<%=request.getContextPath()%>/resources/prod/custom_app/deportes.gif" class="img-fluid" alt="Fam. Pedro Ruiz Gallo">
            </div>
        </div>
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
<div class="modal" id="modalCargandoProcedimientoSocioeconomico" data-backdrop="static" data-keyboard="false" tabindex="-1"
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

<div class="modal" id="modalCargandoProcedimientoPsicologico" data-backdrop="static" data-keyboard="false" tabindex="-1"
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

<div class="modal" id="modalCargandoProcedimientoObstetricia" data-backdrop="static" data-keyboard="false" tabindex="-1"
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

<div class="modal" id="modalCargandoIntentoEvaluacion" data-backdrop="static" data-keyboard="false" tabindex="-1"
     role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.1)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Configurando la evaluación para empezar. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoEvaluacionAtendidoSocioeconomico" data-backdrop="static" data-keyboard="false" tabindex="-1"
     role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.1)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Finalizando. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="ventanaModalInstruccionesProcedimiento" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
     data-keyboard="false" style="padding-top: 2.5%; overflow-y: visible;background-color: rgba(0,0,0,.4)">
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="border-color: #ffbc34; border-width: 4px;border-radius: 10px">
            <div class="modal-header">
                <h6 class="modal-title">INSTRUCCIONES</h6>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-12" id="html_instrucciones">

                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal"><i
                        class="fas fa-ban"></i>
                    Cerrar</button>
            </div>
        </div>
    </div>
</div>