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

<div class="row" id="row-option-socioeconomica" style="margin-top: 70px; display: none">
    <div class="col-12">
        <div class="row" id="div-evaluaciones-socieconomica">
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
        <div class="row" id="div-preguntas-evaluacion-socieconomica">
            <h5>hOLA</h5>
        </div>
    </div>
    <div class="col-12 text-center" id="div-selected-evaluation-socie">
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