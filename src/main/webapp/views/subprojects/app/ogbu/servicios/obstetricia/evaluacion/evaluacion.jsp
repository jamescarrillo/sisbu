<%-- 
    Document   : evaluacion
    Created on : 12 set. 2019, 23:31:05
    Author     : James Carrillo
--%>
<!-- Page Header -->
<div class="row" id="row-text-selected-option" style="margin-top: 30px">
    <div class="col-12 text-center">
        <h1 class="dt-page__title">Selecciona una opci�n</h1>
    </div>
</div>
<!-- /page header -->

<!-- Grid -->
<div class="row justify-content-center" id="row-options-selected" style="margin-top: 50px">
    <!-- Grid Item -->
    <div class="col-xl-3 col-sm-6 col-md-4 col-lg-3">
        <!-- Card -->
        <div class="dt-card sisbu-cursor-mano" id="btnIrRepositorio">
            <!-- Card Body -->
            <div class="dt-card__body d-flex flex-sm-column text-center">
                <div class="mb-sm-7">
                    <i class="icon icon-basic-components dt-icon-bg bg-primary text-primary"></i>
                </div>
                <a class="h2 mb-0 font-weight-500">Repositorio</a>
            </div>
            <!-- /card body -->

        </div>
        <!-- /card -->
    </div>
    <!-- /grid item -->
    <!-- Grid Item -->
    <div class="col-xl-3 col-sm-6 col-md-4 col-lg-3">
        <!-- Card -->
        <div class="dt-card sisbu-cursor-mano" id="btnIrConfiguraciones">
            <!-- Card Body -->
            <div class="dt-card__body d-flex flex-sm-column text-center">
                <div class="mb-sm-7">
                    <i class="icon icon-attendance dt-icon-bg bg-primary text-primary"></i>
                </div>
                <a class="h2 mb-0 font-weight-500">Configuraciones</a>
            </div>
            <!-- /card body -->

        </div>
        <!-- /card -->
    </div>
    <!-- /grid item -->
    <!-- Grid Item -->
    <div class="col-xl-3 col-sm-6 col-md-4 col-lg-3">
        <!-- Card -->
        <div class="dt-card sisbu-cursor-mano" id="btnIrResultados">
            <!-- Card Body -->
            <div class="dt-card__body d-flex flex-sm-column text-center">
                <div class="mb-sm-7">
                    <i class="icon icon-list dt-icon-bg bg-primary text-primary"></i>
                </div>
                <a class="h2 mb-0 font-weight-500">Resultados</a>
            </div>
            <!-- /card body -->
        </div>
        <!-- /card -->
    </div>
    <!-- /grid item -->
</div>

<div class="row" id="row-evaluaciones" style="display: none">
    <!-- Grid Item -->
    <div class="col-12 order-xl-3">
        <!-- Card -->
        <div class="dt-card pb-4">
            <!-- Card Header -->
            <div class="dt-card__header mb-0">
                <!-- Card Heading -->
                <div class="dt-card__heading">
                    <h3 class="dt-card__title" id="titleManagerEvaluacion">[0] EVALUACIONES</h3>
                </div>
                <!-- /card heading -->
                <!-- Card Tools -->
                <div class="dt-card__tools">
                    <button type="button" class="btn btn-primary btn-xs" id="btnOpenNewEvaluacion"><i class="icon icon-addnew"></i> AGREGAR</button>
                </div>
                <!-- /card tools -->
            </div>
            <div class="mb-5 pt-5 pl-3 pr-3">
                <div class="col-12">
                    <form id="FrmEvaluacion">
                        <div class="input-group search-box" style="max-width: 100%;">
                            <input type="search" id="txtFilterEvaluacion" class="form-control form-control-sm" placeholder="FILTRO. . .">
                            <span class="search-icon"><i class="icon icon-search icon-lg"></i></span>
                            <div class="input-group-append">
                                <button type="submit" id="btnBuscarEvaluacion" class="btn btn-primary btn-sm">BUSCAR</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <!-- /card header -->
            <!-- Card Body -->
            <div class="dt-card__body p-0">
                <!-- Widget -->
                <div class="dt-widget dt-widget-hl-item dt-widget-hl-item-space dt-widget-mb-item dt-widget-hover-bg" 
                     id="div-container-evaluaciones">
                    <!--div class="dt-widget__item border-success">
                        <div class="dt-widget__info text-truncate">
                            <div class="dt-widget__title f-16 font-weight-500 text-truncate">
                                BaronIce
                            </div>
                            <p class="mb-0 text-truncate text-light-gray">
                                Usa Alternativas Globales
                            </p>
                        </div>
                        <div class="dt-widget__extra text-right">
                            <div class="show-content">
                                <span class="d-block text-dark">150</span>
                                <span class="d-block">Preguntas</span>
                            </div>
                            <div class="hide-content">
                                <div class="action-btn-group">
                                    <button class="btn btn-default text-success dt-fab-btn" title="Editar Evaluaci�n" data-toggle="tooltip">
                                        <i class="icon icon-editors icon-1x"></i>
                                    </button>
                                    <button class="btn btn-default text-danger dt-fab-btn" title="Editar Preguntas" data-toggle="tooltip">
                                        <i class="icon icon-assignment icon-xl"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div-->
                </div>
                <!-- /widget -->
            </div>
            <div class="row mt-2" style="padding: 30px">
                <input type="hidden" id="pageEvaluacion" value="1">
                <div class="col-lg-2 col-sm-3 mt-2">
                    <select id="sizePageEvaluacion" class="form-control form-control-sm sisbu-cursor-mano">
                        <option value="5">05</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </div>
                <div class="col-lg-10 col-sm-9 mt-2">
                    <nav aria-label="Page navigation example">
                        <ul id="paginationEvaluacion" class="pagination justify-content-end">
                        </ul>
                    </nav>  
                </div>
            </div>
            <!-- /card body -->
        </div>
        <!-- /card -->
    </div>
    <!-- /grid item -->
</div>

<div class="row" id="row-resultados" style="display: none">
    <div class="col-12 order-xl-3">
        <div class="dt-card pb-4">
            <div class="dt-card__header mb-0">
                <div class="dt-card__heading">
                    <h3 class="dt-card__title ml-0" id="titleManageResultados">PARAMETROS</h3>
                </div>
            </div>
            <div class="mb-5 pt-5 pl-3 pr-3">
                <div class="col-12 mb-2">
                    <label for="txtEvaluacionResultados">EVALUACION</label>
                    <div class="input-group">
                        <input type="text" class="form-control form-control-sm" id="txtEvaluacionResultados" aria-describedby="nombre" placeholder="Click en el bot�n para seleccionar. . ." disabled="">
                        <div class="input-group-append">
                            <button type="button" id="btnSeleccionarEvaluacionResultados" class="btn btn-primary btn-sm"><i class="icon icon-subscribe"></i></button>
                        </div>
                    </div>
                </div>
                <div class="col-12 mb-2">
                    <label for="txtCicloAcademicoResultados">CICLO ACADEMICO</label>
                    <div class="input-group">
                        <input type="text" class="form-control form-control-sm" id="txtCicloAcademicoResultados" aria-describedby="nombre" placeholder="Click en el bot�n para seleccionar. . ." disabled="">
                        <div class="input-group-append">
                            <button type="button" id="btnSeleccionarCicloAcademicoResultados" class="btn btn-primary btn-sm"><i class="icon icon-subscribe"></i></button>
                        </div>
                    </div>
                </div>
                <div class="col-12 mb-2">
                    <label for="txtFacultadResultados">FACULTAD</label>
                    <div class="input-group">
                        <input type="text" class="form-control form-control-sm" id="txtFacultadResultados" aria-describedby="nombre" placeholder="Click en el bot�n para seleccionar. . ." disabled="">
                        <div class="input-group-append">
                            <button type="button" id="btnSeleccionarFacultadResultados" class="btn btn-primary btn-sm"><i class="icon icon-subscribe"></i></button>
                        </div>
                    </div>
                </div>
                <div class="col-12 mb-2">
                    <label for="txtEscuelaResultados">ESCUELA</label>
                    <div class="input-group">
                        <input type="text" class="form-control form-control-sm" id="txtEscuelaResultados" aria-describedby="nombre" placeholder="Click en el bot�n para seleccionar. . ." disabled="">
                        <div class="input-group-append">
                            <button type="button" id="btnSeleccionarEscuelaResultados" class="btn btn-primary btn-sm"><i class="icon icon-subscribe"></i></button>
                        </div>
                    </div>
                </div>
                <div class="col-12 mb-2 mt-4 text-center">
                    <button type="button" id="btnDownloadResultadosGenericos" class="btn btn-warning btn-sm text-white"><i class="icon icon-download"></i> EXPORTAR RESULTADOS</button>
                </div>
            </div>
            <div class="dt-card__body p-0">
                <!-- Widget -->
                <div class="dt-widget dt-widget-hl-item dt-widget-hl-item-space dt-widget-mb-item dt-widget-hover-bg" 
                     id="div-container-resultados">

                </div>
            </div>
        </div>
    </div>
</div>

<div class="row" id="row-crud-evaluaciones" style="display: none">
    <!-- Card -->
    <div class="dt-card" style="padding: 30px">
        <div class="row">
            <div class="col-12">
                <h4 class="text-primary" id="titleCrudEvaluaciones">TITLE</h4>
            </div>
            <div class="col-lg-9 col-12">
                <div class="form-group">
                    <label for="txtDescripcionRU">Nombre</label>
                    <input type="text" class="form-control form-control-sm" id="txtDescripcionRU" aria-describedby="nombre" placeholder="Ingrese nombre . . .">
                </div>
            </div>
            <div class="col-lg-3 col-12">
                <div class="form-group">
                    <label for="txtTipoRU">TIPO</label>
                    <select class="form-control form-control-sm sisbu-cursor-mano" id="txtTipoRU">
                        <option value="-1">Seleccione. . . </option>
                        <option value="1">PRESENCIAL</option>
                        <option value="2">ONLINE</option>
                    </select>
                </div>
            </div>
            <div class="col-12">
                <div class="form-group">
                    <label for="txtComentarioRU">COMENTARIO</label>
                    <textarea class="form-control" id="txtComentarioRU" placeholder="Ingrese comentario. . ." rows="2" maxlength="500">
                    </textarea>
                </div>
            </div>
            <div class="col-lg-3 col-12">
                <div class="form-group">
                    <label for="txtEstadoRU">ESTADO</label>
                    <select class="form-control form-control-sm sisbu-cursor-mano" id="txtEstadoRU">
                        <option value="-1">Seleccione. . . </option>
                        <option value="V">VIGENTE</option>
                        <option value="A">ANULADO</option>
                    </select>
                </div>
            </div>
            <div class="col-lg-9 col-12">
                <div class="form-group">
                    <label for="txtUsaAlternativasGlobalesRU">�USA ALTERNATIVAS GLOBALES?</label>
                    <select class="form-control form-control-sm sisbu-cursor-mano" id="txtUsaAlternativasGlobalesRU">
                        <option value="-1">Seleccione. . . </option>
                        <option value="1">SI</option>
                        <option value="0">NO</option>
                    </select>
                </div>
            </div>
            <div class="col-12" id="div-alternativas-globales">
                <div class="form-group">
                    <div class="row">
                        <div class="col-sm-4 col-12">
                            <h5 class="mb-0 mt-1">ALTERNATIVAS GLOBALES</h5>
                        </div>
                        <div class="col-sm-8 col-12 text-right">
                            <button class="btn btn-primary btn-xs" id="btnAgregarAlternativaGlobal"><i class="icon icon-addnew"></i> Agregar (Ctrl+Shift+A)</button>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="table mb-0 mt-2 table-bordered table-sm">
                            <thead>
                                <tr>
                                    <th class="text-uppercase" scope="col" >NOMBRE</th>
                                    <th class="text-uppercase text-center" scope="col" style="width: 20%">VALOR</th>
                                    <th class="text-uppercase text-center" scope="col" style="width: 20%">ELIMINAR</th>
                                </tr>
                            </thead>
                            <tbody id="tbodyAlternativasGlobales">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-12 mb-4">
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input sisbu-cursor-mano" id="checkParametersAvanzados" name="example1">
                    <label class="custom-control-label sisbu-cursor-mano text-warning" for="checkParametersAvanzados">PARAMETROS AVANZADOS</label>
                </div>
            </div>
            <div class="col-12 div-others-parameters">
                <div class="form-group">
                    <label for="txtUsaParametrosInconsistenciaRU">�USA PREGUNTAS DE INCONSISTENCIAS?</label>
                    <select class="form-control form-control-sm sisbu-cursor-mano" id="txtUsaParametrosInconsistenciaRU">
                        <option value="N">NO</option>
                        <option value="S">SI</option>
                    </select>
                </div>
            </div>
            <div class="col-md-6 col-12 div-parametro-inconsistencia">
                <div class="form-group">
                    <label for="txtOperacionInconsistenciaRU">OPERACI�N ALGEBRAICA</label>
                    <select class="form-control form-control-sm sisbu-cursor-mano" id="txtOperacionInconsistenciaRU">
                        <option value="-1">Seleccione. . . </option>
                        <option value="+">SUMA (+)</option>
                        <option value="-">RESTA (-)</option>
                    </select>
                </div>
            </div>
            <div class="col-md-6 col-12 div-parametro-inconsistencia">
                <div class="form-group">
                    <label for="txtValorInconsistenciaRU">VALOR DIVISIONAL DE INCONSISTENCIA</label>
                    <input type="number" class="form-control form-control-sm" id="txtValorInconsistenciaRU" aria-describedby="nombre" placeholder="Ingrese n�mero . . .">
                </div>
            </div>
            <div class="col-12 div-others-parameters">
                <div class="form-group">
                    <label for="txtUsaParametrosCriticidadRU">�USA PREGUNTAS CRITICAS?</label>
                    <select class="form-control form-control-sm sisbu-cursor-mano" id="txtUsaParametrosCriticidadRU">
                        <option value="N">NO</option>
                        <option value="S">SI</option>
                    </select>
                </div>
            </div>
            <div class="col-12 div-parametro-criticidad">
                <div class="form-group">
                    <label for="txtValorCriticidadRU">VALOR MINIMO DE PREGUNTAS CRITICAS</label>
                    <input type="number" class="form-control form-control-sm" id="txtValorCriticidadRU" aria-describedby="nombre" placeholder="Ingrese n�mero . . .">
                </div>
            </div>
            <div class="col-12">
                <h5>INSTRUCCIONES</h5>
                <div id="txtInstrucciones">

                </div>
            </div>
            <div class="col-12 text-right">
                <button class="btn btn-outline-primary btn-xs" id="btnCancelarCrudEvaluacion">CANCELAR</button>
                <button class="btn btn-primary btn-xs" id="btnGuardarEvaluacion">GUARDAR</button>
            </div>
        </div>
    </div>
    <!-- /card -->
</div>

<div class="modal fade" id="modalCargandoEvaluacion" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div id="lblModalCargandoEvaluacion" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Procesando solicitud. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row" id="row-configurations" style="display: none">
    <!-- Grid Item -->
    <div class="col-12 order-xl-3">

        <!-- Card -->
        <div class="dt-card pb-4">

            <!-- Card Header -->
            <div class="dt-card__header mb-0">
                <!-- Card Heading -->
                <div class="dt-card__heading">
                    <h3 class="dt-card__title" id="titleManagerProcedimientoCiclo">[0] CONFIGURACIONES</h3>
                </div>
                <!-- /card heading -->
                <!-- Card Tools -->
                <div class="dt-card__tools">
                    <button type="button" class="btn btn-primary btn-xs" id="btnOpenNewProcedimientoCiclo"><i class="icon icon-addnew"></i> AGREGAR</button>
                </div>
                <!-- /card tools -->
            </div>
            <div class="mb-5 pt-5 pl-3 pr-3">
                <div class="col-12">
                    <form id="FrmProcedimientoCiclo">
                        <div class="input-group search-box" style="max-width: 100%;">
                            <input type="search" id="txtFilterProcedimientoCiclo" class="form-control form-control-sm" placeholder="FILTRO. . .">
                            <span class="search-icon"><i class="icon icon-search icon-lg"></i></span>
                            <div class="input-group-append">
                                <button type="submit" id="btnBuscarProcedimientoCiclo" class="btn btn-primary btn-sm">BUSCAR</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <!-- Card Body -->
            <div class="dt-card__body p-0">
                <!-- Widget -->
                <div class="dt-widget dt-widget-hl-item dt-widget-hl-item-space dt-widget-mb-item dt-widget-hover-bg" 
                     id="div-container-procedimiento_ciclo">
                </div>
                <!-- /widget -->
                <div class="row mt-2" style="padding: 30px">
                    <input type="hidden" id="pageProcedimientoCiclo" value="1">
                    <div class="col-lg-2 col-sm-3 mt-2">
                        <select id="sizePageProcedimientoCiclo" class="form-control form-control-sm sisbu-cursor-mano">
                            <option value="5">05</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </div>
                    <div class="col-lg-10 col-sm-9 mt-2">
                        <nav aria-label="Page navigation example">
                            <ul id="paginationProcedimientoCiclo" class="pagination justify-content-end">
                            </ul>
                        </nav>  
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- /grid item -->
</div>

<!--CRUD CONFIGURACIONES-->
<div class="row" id="row-crud-configurations" style="display: none">
    <div class="col-12">
        <!-- Card -->
        <div class="dt-card" style="padding: 30px">
            <div class="row">
                <div class="col-12">
                    <h4 class="text-primary" id="titleCrudProcedimientoCiclo">TITLE</h4>
                </div>
                <div class="col-12">
                    <label for="txtCicloAcademico">CICLO ACAD�MICO</label>
                    <div class="input-group">
                        <input type="text" class="form-control form-control-sm" id="txtCicloAcademico" aria-describedby="nombre" placeholder="Click en el bot�n para seleccionar. . ." disabled="">
                        <div class="input-group-append">
                            <button type="button" id="btnSeleccionarCicloAcademico" class="btn btn-primary btn-sm"><i class="icon icon-subscribe"></i></button>
                        </div>
                    </div>
                </div>
                <div class="col-12 mt-4 text-right">
                    <button class="btn btn-outline-primary btn-xs" id="btnCancelarCrudProcedimientoCiclo">CANCELAR</button>
                    <button class="btn btn-primary btn-xs" id="btnGuardarProcedimientoCiclo">GUARDAR</button>
                </div>
            </div>
        </div>
        <!-- /card -->
    </div>
</div>

<!--SELECTED CICLO ACADEMICO-->
<div id="ventanaModalCicloAcademico" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
     data-keyboard="false" style="overflow-y: visible;background-color: rgba(0,0,0,.3)">
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="border-color: #757575; border-width: 4px;border-radius: 10px">
            <div class="modal-header">
                <h5 class="mb-0" id="titleManagerCicloAcademico"><strong>[ 0 ]
                        CICLOS ACADEMICOS</strong></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pb-0 pt-0">
                <div class="row">
                    <div class="col-12">
                        <input type="hidden" id="pageCicloAcademico"
                               value="1">
                        <form id="FrmCicloAcademico">
                            <div class="row mt-3">
                                <div class="input-group col-12">
                                    <input type="text" id="txtFilterCicloAcademico"
                                           class="form-control form-control-sm mr-3" placeholder="INGRESE FILTRO . . .">
                                    <button type="submit" id="btnBuscarCicloAcademico"
                                            class="btn btn-primary btn-xs mr-3" data-toggle="tooltip"
                                            title="Buscar Ciclo"><i class="fa fa-search" aria-hidden="true"></i>
                                        BUSCAR</button>
                                    <button type="button" id="btnOpenNewCicloAcademico" class="btn btn-primary btn-xs"
                                            data-toggle="tooltip" title="Agregar Ciclo"><i class="icon icon-plus"
                                                                                   aria-hidden="true"></i></button>
                                </div>
                            </div>
                        </form>
                        <div class="row pl-5 pr-5">
                            <div class="table-responsive">
                                <table class="table mb-0 table-fluid">
                                    <thead>
                                        <tr>
                                            <th class="align-middle text-left">Nombre</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyCicloAcademico">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row mt-2 mb-2">
                            <div class="col-sm-3 col-4 mt-2">
                                <select id="sizePageCicloAcademico"
                                        class="form-control form-control-sm sisbu-cursor-mano combo-paginar">
                                    <option value="6">06</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>
                            <div class="col-sm-9 col-8 mt-2">
                                <nav aria-label="Page navigation Area">
                                    <ul id="paginationCicloAcademico"
                                        class="pagination justify-content-end">

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal"><i class="fas fa-ban"></i>
                    CANCELAR</button>
                <button type="button" id="btn-selecionar-ciclo-academico" class="btn btn-primary btn-xs"><i
                        class="fas fa-check"></i> SELECCIONAR</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modalCargandoCicloAcademico" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="padding-top: 18%; overflow-y: visible; display: none; background-color: rgba(0,0,0,.2)" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div id="lblModalCargandoEvaluacion" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Procesando solicitud. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modalCargandoProcedimientoCiclo" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div id="lblModalCargandoEvaluacion" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Procesando solicitud. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row mb-3" id="row-navigation-options" style="display: none">
    <div class="col-12 text-center">
        <button class="btn btn-primary btn-xs" id="btn-regresar-principal"><i class="icon icon-reply"></i> Regresar Inicio</button>
    </div>
</div>

<div class="modal fade" id="ventanaModalAddAlternativaGlobal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h6 class="modal-title">AGREGAR ALTERNATIVA GLOBAL</h6>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">�</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-12 mb-2">
                        <label for="txtDescripcionAlternativaGlobal">DESCRIPCION</label>
                        <input class="form-control form-control-sm" id="txtDescripcionAlternativaGlobal" type="text" placeholder="DESCRIPCI�N" maxlength="100">
                    </div>
                    <div class="col-12">
                        <label for="txtValorAlternativaGlobal">VALOR</label>
                        <input class="form-control form-control-sm" id="txtValorAlternativaGlobal" type="number" placeholder="VALOR">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary btn-sm" data-dismiss="modal">CANCELAR</button>
                <button type="button" id="btnIngresarAlternativaGlobal" class="btn btn-outline-primary btn-sm"><i class="fa fa-floppy-o"></i> GUARDAR</button>
            </div>
        </div>
    </div>
</div>


<div class="row" id="row-preguntas" style="display: flex">
    <!-- Grid Item -->
    <div class="col-12 order-xl-3">
        <!-- Card -->
        <div class="dt-card pb-4">
            <h3 class="text-center mb-0 mt-4 pt-5 text-primary" style="font-weight: 500" id="titleNameEvaluacionInPreguntas">Nombre de la evaluacion</h3>
            <!-- Card Header -->
            <div class="dt-card__header mb-0 pt-2">
                <!-- Card Heading -->
                <div class="dt-card__heading">
                    <h3 class="dt-card__title" id="titleManagerPregunta">[0] PREGUNTAS</h3>
                </div>
                <!-- /card heading -->
                <!-- Card Tools -->
                <div class="dt-card__tools">
                    <button type="button" class="btn btn-outline-primary btn-xs" id="btnCancelarPregunta"><i class="icon icon-reply"></i> CANCELAR</button>
                    <button type="button" class="btn btn-primary btn-xs" id="btnOpenNewPregunta"><i class="icon icon-addnew"></i> AGREGAR</button>
                </div>
                <!-- /card tools -->
            </div>
            <div class="mb-2 pt-5 pl-3 pr-3">
                <div class="col-12">
                    <form id="FrmPregunta">
                        <div class="input-group search-box" style="max-width: 100%;">
                            <input type="search" id="txtFilterPregunta" class="form-control form-control-sm" placeholder="FILTRO. . .">
                            <span class="search-icon"><i class="icon icon-search icon-lg"></i></span>
                            <div class="input-group-append">
                                <button type="submit" id="btnBuscarPregunta" class="btn btn-primary btn-sm">BUSCAR</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <!-- /card header -->
            <!-- Card Body -->
            <div class="dt-card__body pt-0 pb-0">
                <div class="table-responsive">
                    <table class="table mb-0 table-fluid">
                        <thead>
                            <tr>
                                <th scope="col">N�</th>
                                <th scope="col">Enunciado</th>
                                <th scope="col" class="text-center">Tipo Respuesta</th>
                                <th scope="col">Acci�n</th>
                            </tr>
                        </thead>
                        <tbody id="tbodyPregunta">
                            <!--tr>
                                <td>486</td>
                                <td class="text-dark">Setu Infracon</td>
                                <td class="text-center">10 Sep 2018</td>
                                <td class="">$565</td>
                                <td>
                                    <ul class="dt-list dt-list-cm-0">
                                        <li class="dt-list__item">
                                            <a class="text-light-gray" href="javascript:void(0)">
                                                <i class="icon icon-editors "></i>
                                            </a>
                                        </li>
                                        <li class="dt-list__item">
                                            <a class="text-light-gray" href="javascript:void(0)">
                                                <i class="icon icon-trash-filled"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </td>
                            </tr-->
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="row mt-2" style="padding: 30px">
                <input type="hidden" id="pagePregunta" value="1">
                <div class="col-lg-2 col-sm-3 mt-2">
                    <select id="sizePagePregunta" class="form-control form-control-sm sisbu-cursor-mano">
                        <option value="5">05</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </div>
                <div class="col-lg-10 col-sm-9 mt-2">
                    <nav aria-label="Page navigation example">
                        <ul id="paginationPregunta" class="pagination justify-content-end">
                        </ul>
                    </nav>  
                </div>
            </div>
            <!-- /card body -->
        </div>
        <!-- /card -->
    </div>
    <!-- /grid item -->
</div>

<div class="row" id="row-crud-preguntas" style="display: none">
    <!-- Card -->
    <div class="dt-card" style="padding: 30px">
        <div class="row">
            <div class="col-12">
                <h4 class="text-primary" id="titleCrudPreguntas">TITLE</h4>
            </div>
            <div class="col-lg-4 col-sm-6 col-12">
                <div class="form-group">
                    <label for="txtOrdenPregunta">Orden</label>
                    <input type="text" class="form-control form-control-sm" id="txtOrdenPregunta" aria-describedby="nombre" placeholder="Ingrese orden . . ." disabled="">
                </div>
            </div>
            <div class="col-lg-4 col-sm-6 col-12">
                <div class="form-group">
                    <label for="txtEstadoPregunta">Estado</label>
                    <select class="form-control form-control-sm sisbu-cursor-mano" id="txtEstadoPregunta">
                        <option value="-1">Seleccione. . . </option>
                        <option value="1">Vigente</option>
                        <option value="2">Anulado</option>
                    </select>
                </div>
            </div>
            <div class="col-lg-4 col-12">
                <div class="form-group">
                    <label for="txtItemNegativoPregunta">�Item Negativo?</label>
                    <select class="form-control form-control-sm sisbu-cursor-mano" id="txtItemNegativoPregunta">
                        <option value="-1">Seleccione. . . </option>
                        <option value="N">NO</option>
                        <option value="S">SI</option>
                    </select>
                </div>
            </div>
            <div class="col-12">
                <div class="form-group">
                    <label for="txtEnunciadoPregunta">Enunciado</label>
                    <input type="text" class="form-control form-control-sm" id="txtEnunciadoPregunta" aria-describedby="nombre" placeholder="Ingrese descripci�n . . .">
                </div>
            </div>
            <div class="col-lg-6 col-12">
                <div class="form-group">
                    <label for="txtTooltipPregunta">Texto de Ayuda</label>
                    <input type="text" class="form-control form-control-sm" id="txtTooltipPregunta" aria-describedby="nombre" placeholder="Ingrese texto de ayuda . . .">
                </div>
            </div>
            <div class="col-lg-6 col-12">
                <div class="form-group">
                    <label for="txtPlaceholderPregunta">Texto Transparente</label>
                    <input type="text" class="form-control form-control-sm" id="txtPlaceholderPregunta" aria-describedby="nombre" placeholder="Ingrese texto transparente . . .">
                </div>
            </div>
            <div class="col-lg-6 col-12">
                <div class="form-group">
                    <label for="txtTipoRespuestaPregunta">Tipo de Respuesta</label>
                    <select class="form-control form-control-sm sisbu-cursor-mano" id="txtTipoRespuestaPregunta">
                        <option value="-1">Seleccione. . . </option>
                        <option value="1">TEXT</option>
                        <option value="2">CHECK BOX</option>
                        <!--option value="3">TABLA</option-->
                        <option value="4">LISTA DESPLEGABLE</option>
                        <option value="100">OTRO</option>
                    </select>
                </div>
            </div>
            <div class="col-lg-6 col-12">
                <div class="form-group">
                    <label for="txtColumnasPregunta">Columnas
                        <i class="icon icon-question-circle" aria-hidden="true" data-toggle="popover" 
                           data-trigger="hover" data-placement="top" 
                           title="" data-content="La versi�n 2.0 de Sisbu solo soporta 12 columnas, esto significa que ocupar� todo el ancho de la pantalla" 
                           style="cursor: pointer" data-original-title="">
                        </i>
                    </label>
                    <input type="number" class="form-control form-control-sm" id="txtColumnasPregunta" aria-describedby="nombre" placeholder="Ingrese n� columnas . . .">
                </div>
            </div>
            <div class="col-12 mb-4">
                <label for="txtSubAreaPregunta">SUBAREA</label>
                <div class="input-group">
                    <input type="text" class="form-control form-control-sm" id="txtSubAreaPregunta" aria-describedby="nombre" placeholder="Click en el bot�n para seleccionar. . ." disabled="">
                    <div class="input-group-append">
                        <button type="button" id="btnSeleccionarSubArea" class="btn btn-primary btn-sm"><i class="icon icon-subscribe"></i></button>
                    </div>
                </div>
            </div>
            <div class="col-12 text-right">
                <button class="btn btn-outline-primary btn-xs" id="btnCancelarCrudPregunta">CANCELAR</button>
                <button class="btn btn-primary btn-xs" id="btnGuardarPregunta">GUARDAR</button>
            </div>
        </div>
    </div>
    <!-- /card -->
</div>

<div class="modal" id="modalCargandoPregunta" data-backdrop="static" data-keyboard="false" tabindex="-1"
     role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.1)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Cargando preguntas. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoCountPregunta" data-backdrop="static" data-keyboard="false" tabindex="-1"
     role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.3)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Obteniendo n� de pregunta. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--T: SUBAREAPSI-->
<div id="ventanaModalSubAreaPsi" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
     data-keyboard="false" style="padding-top: 1%; overflow-y: visible;background-color: rgba(0,0,0,.1)">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content" style="border-color: #0085c1; border-width: 4px;">
            <div class="modal-header">
                <h5 class="mb-0" id="titleManagerSubAreaPsi"><strong>[ 0 ]
                        SUBAREAS</strong></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pb-0 pt-0">
                <div class="row">
                    <div class="col-12">
                        <input type="hidden" id="pageSubAreaPsi"
                               value="1">
                        <form id="FrmSubAreaPsi">
                            <div class="row mt-3">
                                <div class="input-group col-12">
                                    <input type="text" id="txtFilterSubAreaPsi"
                                           class="form-control form-control-sm mr-3" placeholder="INGRESE FILTRO . . .">
                                    <button type="submit" id="btnBuscarSubAreaPsi"
                                            class="btn btn-primary btn-xs mr-3" data-toggle="tooltip"
                                            title="Buscar SubArea"><i class="fa fa-search" aria-hidden="true"></i>
                                        BUSCAR</button>
                                    <button type="button" id="btnOpenNewSubAreaPsi" class="btn btn-primary btn-xs"
                                            data-toggle="tooltip" title="Agregar SubArea"><i class="icon icon-plus"
                                                                                     aria-hidden="true"></i></button>
                                </div>
                            </div>
                        </form>
                        <div class="row pl-5 pr-5">
                            <div class="table-responsive">
                                <table class="table mb-0 table-fluid">
                                    <thead>
                                        <tr>
                                            <th class="align-middle">Nombre</th>
                                            <th style="width: 15%" colspan="2" class="text-center align-middle">
                                                Acci�n
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodySubAreaPsi">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row mt-2 mb-2">
                            <div class="col-sm-4 mt-2">
                                <select id="sizePageSubAreaPsi"
                                        class="form-control form-control-sm sisbu-cursor-mano combo-paginar">
                                    <option value="8">08</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>
                            <div class="col-sm-8 mt-2">
                                <nav aria-label="Page navigation Area">
                                    <ul id="paginationSubAreaPsi"
                                        class="pagination justify-content-end">

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal" id="btnCancelSelectionSubArea"><i class="fas fa-ban"></i>
                    CANCELAR</button>
                <button type="button" id="btn-selecionar-subarea-psi" class="btn btn-primary btn-xs"><i
                        class="fas fa-check"></i> SELECCIONAR</button>
            </div>
        </div>
    </div>
</div>

<div id="ventanaModalManSubAreaPsi" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
     data-keyboard="false" style="padding-top: 1.5%; overflow-y: visible;background-color: rgba(0,0,0,.2)">
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="border-color: #ffbc34; border-width: 4px;">
            <form id="FrmSubAreaPsiModal">
                <div class="modal-header">
                    <h6 class="modal-title" id="txtTituloModalManArePsi"></h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-row">
                        <div class="col-12 mb-2">
                            <label for="txtNombreSubAreaPsi">Nombre</label>
                            <input type="text" id="txtNombreSubAreaPsi"
                                   class="form-control form-control-sm" placeholder="Ingrese nombre. . ." maxlength="100">
                        </div>
                        <div class="col-12 mb-2">
                            <label for="txtDescripcionSubAreaPsi">Descripci�n</label>
                            <textarea id="txtDescripcionSubAreaPsi" class="form-control" placeholder="Ingrese descripci�n. . ." maxlength="300">
                            </textarea>
                        </div>
                        <div class="col-12 mb-2">
                            <label for="txtAbreviaturaSubAreaPsi">Abreviatura</label>
                            <input type="text" id="txtAbreviaturaSubAreaPsi"
                                   class="form-control form-control-sm" placeholder="Ingrese abreviatura. . ." maxlength="5">
                        </div>
                        <div class="col-lg-6 col-12 mb-2">
                            <label for="txtPuntajeMinimoSubAreaPsi">Puntaje m�nimo</label>
                            <input type="number" id="txtPuntajeMinimoSubAreaPsi"
                                   class="form-control form-control-sm" placeholder="Ingrese puntaje m�nimo. . ." maxlength="10">
                        </div>
                        <div class="col-lg-6 col-12 mb-2">
                            <label for="txtPuntajeMaximoSubAreaPsi">Puntaje m�ximo</label>
                            <input type="number" id="txtPuntajeMaximoSubAreaPsi"
                                   class="form-control form-control-sm" placeholder="Ingrese puntaje m�ximo. . ." maxlength="10">
                        </div>
                        <div class="col-12 mb-4">
                            <label for="txtAreaSubAreaPsi">�rea</label>
                            <div class="input-group">
                                <input type="text" class="form-control form-control-sm" id="txtAreaSubAreaPsi" aria-describedby="nombre" placeholder="Click en el bot�n para seleccionar. . ." disabled="">
                                <div class="input-group-append">
                                    <button type="button" id="btnSeleccionarAreaPsi" class="btn btn-primary btn-sm"><i class="icon icon-subscribe"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal"><i
                            class="fas fa-ban"></i>
                        CANCELAR</button>
                    <button type="submit" class="btn btn-primary btn-xs"><i class="fas fa-save"></i> GUARDAR</button>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoSubAreaPsi" data-backdrop="static" data-keyboard="false" tabindex="-1"
     role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.3)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Cargando subareas. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="ventanaModalAreaPsi" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
     data-keyboard="false" style="padding-top: 4%; overflow-y: visible;background-color: rgba(0,0,0,.3)">
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="border-color: #757575; border-width: 4px;border-radius: 10px">
            <div class="modal-header">
                <h5 class="mb-0" id="titleManagerAreaPsi"><strong>[ 0 ]
                        AREAS</strong></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pb-0 pt-0">
                <div class="row">
                    <div class="col-12">
                        <input type="hidden" id="pageAreaPsi"
                               value="1">
                        <form id="FrmAreaPsi">
                            <div class="row mt-3">
                                <div class="input-group col-12">
                                    <input type="text" id="txtFilterAreaPsi"
                                           class="form-control form-control-sm mr-3" placeholder="INGRESE FILTRO . . .">
                                    <button type="submit" id="btnBuscarAreaPsi"
                                            class="btn btn-primary btn-xs mr-3" data-toggle="tooltip"
                                            title="Buscar Area"><i class="fa fa-search" aria-hidden="true"></i>
                                        BUSCAR</button>
                                    <button type="button" id="btnOpenNewAreaPsi" class="btn btn-primary btn-xs"
                                            data-toggle="tooltip" title="Agregar Area"><i class="icon icon-plus"
                                                                                  aria-hidden="true"></i></button>
                                </div>
                            </div>
                        </form>
                        <div class="row pl-5 pr-5">
                            <div class="table-responsive">
                                <table class="table mb-0 table-fluid">
                                    <thead>
                                        <tr>
                                            <th class="align-middle">Nombre</th>
                                            <th style="width: 15%" colspan="2" class="text-center align-middle">
                                                Acci�n
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyAreaPsi">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row mt-2 mb-2">
                            <div class="col-sm-3 col-4 mt-2">
                                <select id="sizePageAreaPsi"
                                        class="form-control form-control-sm sisbu-cursor-mano combo-paginar">
                                    <option value="8">8</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>
                            <div class="col-sm-9 col-8 mt-2">
                                <nav aria-label="Page navigation Area">
                                    <ul id="paginationAreaPsi"
                                        class="pagination justify-content-end">

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal"><i class="fas fa-ban"></i>
                    CANCELAR</button>
                <button type="button" id="btn-selecionar-area-psi" class="btn btn-primary btn-xs"><i
                        class="fas fa-check"></i> SELECCIONAR</button>
            </div>
        </div>
    </div>
</div>

<div id="ventanaModalManAreaPsi" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
     data-keyboard="false" style="padding-top: 4.5%; overflow-y: visible;background-color: rgba(0,0,0,.4)">
    <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content" style="border-color: #ffbc34; border-width: 4px;border-radius: 10px">
            <form id="FrmAreaPsiModal">
                <div class="modal-header">
                    <h6 class="modal-title" id="txtTituloModalManAreaPsi"></h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-row">
                        <div class="col-12 mb-2">
                            <label for="txtNombreAreaPsi">Nombre</label>
                            <input type="text" id="txtNombreAreaPsi"
                                   class="form-control form-control-sm" placeholder="Ingrese nombre. . ." maxlength="100">
                        </div>
                        <div class="col-12 mb-2">
                            <label for="txtDescripcionAreaPsi">Descripci�n</label>
                            <textarea id="txtDescripcionAreaPsi" class="form-control" placeholder="Ingrese descripci�n. . ." maxlength="300" rows="4">
                            </textarea>
                        </div>
                        <div class="col-12 mb-2">
                            <label for="txtAbreviaturaAreaPsi">Abreviatura</label>
                            <input type="text" id="txtAbreviaturaAreaPsi"
                                   class="form-control form-control-sm" placeholder="Ingrese abreviatura. . ." maxlength="5">
                        </div>
                        <div class="col-lg-6 col-12 mb-2">
                            <label for="txtPuntajeMinimoAreaPsi">Puntaje m�nimo</label>
                            <input type="number" id="txtPuntajeMinimoAreaPsi"
                                   class="form-control form-control-sm" placeholder="Ingrese puntaje m�nimo. . ." maxlength="10">
                        </div>
                        <div class="col-lg-6 col-12 mb-2">
                            <label for="txtPuntajeMaximoAreaPsi">Puntaje m�ximo</label>
                            <input type="number" id="txtPuntajeMaximoAreaPsi"
                                   class="form-control form-control-sm" placeholder="Ingrese puntaje m�ximo. . ." maxlength="10">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal"><i
                            class="fas fa-ban"></i>
                        CANCELAR</button>
                    <button type="submit" class="btn btn-primary btn-xs"><i class="fas fa-save"></i> GUARDAR</button>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoAreaPsi" data-backdrop="static" data-keyboard="false" tabindex="-1"
     role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.5)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Cargando areas. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--CRUD ALTERNATIVA-->
<div id="ventanaModalAlternativa" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
     data-keyboard="false" style="padding-top: 1%; overflow-y: visible;background-color: rgba(0,0,0,.3)">
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="border-color: #757575; border-width: 4px;border-radius: 10px">
            <div class="modal-header">
                <h5 class="mb-0" id="titleManagerAlternativa"><strong>[ 0 ]
                        ALTERNATIVAS</strong></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pb-0 pt-0">
                <div class="row">
                    <div class="col-12">
                        <input type="hidden" id="pageAlternativa"
                               value="1">
                        <form id="FrmAlternativa">
                            <div class="row mt-3">
                                <div class="input-group col-12">
                                    <input type="text" id="txtFilterAlternativa"
                                           class="form-control form-control-sm mr-3" placeholder="INGRESE FILTRO . . .">
                                    <button type="submit" id="btnBuscarAlternativa"
                                            class="btn btn-primary btn-xs mr-3" data-toggle="tooltip"
                                            title="Buscar Area"><i class="fa fa-search" aria-hidden="true"></i>
                                        BUSCAR</button>
                                    <button type="button" id="btnOpenNewAlternativa" class="btn btn-primary btn-xs"
                                            data-toggle="tooltip" title="Agregar Area"><i class="icon icon-plus"
                                                                                  aria-hidden="true"></i></button>
                                </div>
                            </div>
                        </form>
                        <div class="row pl-5 pr-5">
                            <div class="table-responsive">
                                <table class="table mb-0 table-fluid">
                                    <thead>
                                        <tr>
                                            <th class="align-middle">Nombre</th>
                                            <th style="width: 15%" colspan="2" class="text-center align-middle">
                                                Acci�n
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyAlternativa">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row mt-2 mb-2">
                            <div class="col-sm-3 col-4 mt-2">
                                <select id="sizePageAlternativa"
                                        class="form-control form-control-sm sisbu-cursor-mano combo-paginar">
                                    <option value="8">8</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>
                            <div class="col-sm-9 col-8 mt-2">
                                <nav aria-label="Page navigation Alternativa">
                                    <ul id="paginationAlternativa"
                                        class="pagination justify-content-end">

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal"><i class="fas fa-ban"></i>
                    CANCELAR</button>
                <button type="button" id="btn-selecionar-area-psi" class="btn btn-primary btn-xs"><i
                        class="fas fa-check"></i> SELECCIONAR</button>
            </div>
        </div>
    </div>
</div>

<div id="ventanaModalManAlternativa" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
     data-keyboard="false" style="padding-top: 1.5%; overflow-y: visible;background-color: rgba(0,0,0,.4)">
    <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content" style="border-color: #ffbc34; border-width: 4px;border-radius: 10px">
            <form id="FrmAlternativaModal">
                <div class="modal-header">
                    <h6 class="modal-title" id="txtTituloModalManAlternativa"></h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-row">
                        <div class="col-12 mb-2">
                            <label for="txtDescripcionAlternativa">Descripci�n</label>
                            <input type="text" id="txtDescripcionAlternativa"
                                   class="form-control form-control-sm" placeholder="Ingrese descripci�n. . ." maxlength="100">
                        </div>
                        <div class="col-12 mb-2">
                            <label for="txtValorAlternativa">Valor Num�rico</label>
                            <input type="number" id="txtValorAlternativa"
                                   class="form-control form-control-sm" placeholder="Ingrese valor num�rico. . ." maxlength="10">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal"><i
                            class="fas fa-ban"></i>
                        CANCELAR</button>
                    <button type="submit" class="btn btn-primary btn-xs"><i class="fas fa-save"></i> GUARDAR</button>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoAlternativa" data-backdrop="static" data-keyboard="false" tabindex="-1"
     role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.5)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Cargando alternativas. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--CRUD CRITICO-->
<div id="ventanaModalCriticoPsi" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
     data-keyboard="false" style="padding-top: 1%; overflow-y: visible;background-color: rgba(0,0,0,.1)">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content" style="border-color: #757575; border-width: 4px;border-radius: 10px">
            <div class="modal-header">
                <h5 class="mb-0" id="titleManagerCriticoPsi"><strong>[ 0 ]
                        ITEMS CRITICOS</strong></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pb-0 pt-0">
                <div class="row">
                    <div class="col-12">
                        <input type="hidden" id="pageCriticoPsi"
                               value="1">
                        <form id="FrmCriticoPsi">
                            <div class="row mt-3">
                                <div class="input-group col-12">
                                    <input type="text" id="txtFilterCriticoPsi"
                                           class="form-control form-control-sm mr-3" placeholder="INGRESE FILTRO . . .">
                                    <button type="submit" id="btnBuscarCriticoPsi"
                                            class="btn btn-primary btn-xs mr-3" data-toggle="tooltip"
                                            title="Buscar"><i class="fa fa-search" aria-hidden="true"></i>
                                        BUSCAR</button>
                                    <button type="button" id="btnOpenNewCriticoPsi" class="btn btn-primary btn-xs"
                                            data-toggle="tooltip" title="Agregar Par"><i class="icon icon-plus"
                                                                                 aria-hidden="true"></i></button>
                                </div>
                            </div>
                        </form>
                        <div class="row pl-5 pr-5">
                            <div class="table-responsive">
                                <table class="table mb-0 table-fluid">
                                    <thead>
                                        <tr>
                                            <th class="align-middle" style="width: 35%">NOMBRE/DESCRIPCI�N</th>
                                            <th class="align-middle">PARES</th>
                                            <th style="width: 15%" colspan="2" class="text-center align-middle">
                                                Acci�n
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyCriticoPsi">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row mt-2 mb-2">
                            <div class="col-sm-3 col-4 mt-2">
                                <select id="sizePageCriticoPsi"
                                        class="form-control form-control-sm sisbu-cursor-mano combo-paginar">
                                    <option value="8">8</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>
                            <div class="col-sm-9 col-8 mt-2">
                                <nav aria-label="Page navigation CriticoPsi">
                                    <ul id="paginationCriticoPsi"
                                        class="pagination justify-content-end">

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal"><i class="fas fa-ban"></i>
                    CERRAR</button>
            </div>
        </div>
    </div>
</div>

<div id="ventanaModalManCriticoPsi" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
     data-keyboard="false" style="padding-top: 1.5%; overflow-y: visible;background-color: rgba(0,0,0,.2)">
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="border-color: #ffbc34; border-width: 4px;border-radius: 10px">
            <form id="FrmCriticoPsiModal">
                <div class="modal-header">
                    <h6 class="modal-title" id="txtTituloModalManCriticoPsi"></h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-row">
                        <div class="col-12 mb-2">
                            <label for="txtNombreCriticoPsi">Nombre</label>
                            <input type="text" id="txtNombreCriticoPsi"
                                   class="form-control form-control-sm" placeholder="Ingrese nombre. . ." maxlength="100">
                        </div>
                        <div class="col-12 mb-2">
                            <label for="txtDescripcionCriticoPsi">Descripci�n</label>
                            <textarea type="text" id="txtDescripcionCriticoPsi"
                                      class="form-control form-control-sm" placeholder="Ingrese descripci�n. . ." maxlength="200" rows="3">
                            </textarea>
                        </div>
                        <div class="col-12 mb-2">
                            <label for="txtPreguta1CriticoPsi">PREGUNTA 1</label>
                            <div class="input-group">
                                <input type="text" class="form-control form-control-sm" id="txtPreguta1CriticoPsi" aria-describedby="nombre" placeholder="Click en el bot�n para seleccionar. . ." disabled="">
                                <div class="input-group-append">
                                    <button type="button" id="btnSeleccionarPregunta1" class="btn btn-primary btn-sm"><i class="icon icon-subscribe"></i></button>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 mb-2">
                            <label for="txtPreguta2CriticoPsi">PREGUNTA 2</label>
                            <div class="input-group">
                                <input type="text" class="form-control form-control-sm" id="txtPreguta2CriticoPsi" aria-describedby="nombre" placeholder="Click en el bot�n para seleccionar. . ." disabled="">
                                <div class="input-group-append">
                                    <button type="button" id="btnSeleccionarPregunta2" class="btn btn-primary btn-sm"><i class="icon icon-subscribe"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal"><i
                            class="fas fa-ban"></i>
                        CANCELAR</button>
                    <button type="submit" class="btn btn-primary btn-xs"><i class="fas fa-save"></i> GUARDAR</button>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoCriticoPsi" data-backdrop="static" data-keyboard="false" tabindex="-1"
     role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.3)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Procesando Solicitud. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--CRUD INCONSISTENCIA-->
<div id="ventanaModalInconsistenciaPsi" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
     data-keyboard="false" style="padding-top: 1%; overflow-y: visible;background-color: rgba(0,0,0,.1)">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content" style="border-color: #757575; border-width: 4px;border-radius: 10px">
            <div class="modal-header">
                <h5 class="mb-0" id="titleManagerInconsistenciaPsi"><strong>[ 0 ]
                        ITEMS INCONSISTENCIA</strong></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pb-0 pt-0">
                <div class="row">
                    <div class="col-12">
                        <input type="hidden" id="pageInconsistenciaPsi"
                               value="1">
                        <form id="FrmInconsistenciaPsi">
                            <div class="row mt-3">
                                <div class="input-group col-12">
                                    <input type="text" id="txtFilterInconsistenciaPsi"
                                           class="form-control form-control-sm mr-3" placeholder="INGRESE FILTRO . . .">
                                    <button type="submit" id="btnBuscarInconsistenciaPsi"
                                            class="btn btn-primary btn-xs mr-3" data-toggle="tooltip"
                                            title="Buscar"><i class="fa fa-search" aria-hidden="true"></i>
                                        BUSCAR</button>
                                    <button type="button" id="btnOpenNewInconsistenciaPsi" class="btn btn-primary btn-xs"
                                            data-toggle="tooltip" title="Agregar Par"><i class="icon icon-plus"
                                                                                 aria-hidden="true"></i></button>
                                </div>
                            </div>
                        </form>
                        <div class="row pl-5 pr-5">
                            <div class="table-responsive">
                                <table class="table mb-0 table-fluid">
                                    <thead>
                                        <tr>
                                            <th class="align-middle">PARES</th>
                                            <th style="width: 15%" colspan="2" class="text-center align-middle">
                                                Acci�n
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyInconsistenciaPsi">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row mt-2 mb-2">
                            <div class="col-sm-3 col-4 mt-2">
                                <select id="sizePageInconsistenciaPsi"
                                        class="form-control form-control-sm sisbu-cursor-mano combo-paginar">
                                    <option value="8">8</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>
                            <div class="col-sm-9 col-8 mt-2">
                                <nav aria-label="Page navigation InconsistenciaPsi">
                                    <ul id="paginationInconsistenciaPsi"
                                        class="pagination justify-content-end">

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal"><i class="fas fa-ban"></i>
                    CERRAR</button>
            </div>
        </div>
    </div>
</div>

<div id="ventanaModalManInconsistenciaPsi" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
     data-keyboard="false" style="padding-top: 1.5%; overflow-y: visible;background-color: rgba(0,0,0,.2)">
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="border-color: #ffbc34; border-width: 4px;border-radius: 10px">
            <form id="FrmInconsistenciaPsiModal">
                <div class="modal-header">
                    <h6 class="modal-title" id="txtTituloModalManInconsistenciaPsi"></h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-row">
                        <!--div class="col-12 mb-2">
                            <label for="txtNombreInconsistenciaPsi">Nombre</label>
                            <input type="text" id="txtNombreInconsistenciaPsi"
                                   class="form-control form-control-sm" placeholder="Ingrese nombre. . ." maxlength="100">
                        </div>
                        <div class="col-12 mb-2">
                            <label for="txtDescripcionInconsistenciaPsi">Descripci�n</label>
                            <textarea type="text" id="txtDescripcionInconsistenciaPsi"
                                      class="form-control form-control-sm" placeholder="Ingrese descripci�n. . ." maxlength="200" rows="3">
                            </textarea>
                        </div-->
                        <div class="col-12 mb-2">
                            <label for="txtPreguta1InconsistenciaPsi">PREGUNTA 1</label>
                            <div class="input-group">
                                <input type="text" class="form-control form-control-sm" id="txtPreguta1InconsistenciaPsi" aria-describedby="nombre" placeholder="Click en el bot�n para seleccionar. . ." disabled="">
                                <div class="input-group-append">
                                    <button type="button" id="btnSeleccionarPreguntaI1" class="btn btn-primary btn-sm"><i class="icon icon-subscribe"></i></button>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 mb-2">
                            <label for="txtPreguta2InconsistenciaPsi">PREGUNTA 2</label>
                            <div class="input-group">
                                <input type="text" class="form-control form-control-sm" id="txtPreguta2InconsistenciaPsi" aria-describedby="nombre" placeholder="Click en el bot�n para seleccionar. . ." disabled="">
                                <div class="input-group-append">
                                    <button type="button" id="btnSeleccionarPreguntaI2" class="btn btn-primary btn-sm"><i class="icon icon-subscribe"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal"><i
                            class="fas fa-ban"></i>
                        CANCELAR</button>
                    <button type="submit" class="btn btn-primary btn-xs"><i class="fas fa-save"></i> GUARDAR</button>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoInconsistenciaPsi" data-backdrop="static" data-keyboard="false" tabindex="-1"
     role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.3)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Procesando Solicitud. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--PREGUNTAS SELECTED-->
<div id="ventanaModalSelectedPreguntaC" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
     data-keyboard="false" style="padding-top: 2%; overflow-y: visible;background-color: rgba(0,0,0,.4)">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content" style="border-color: #0085c1; border-width: 4px;">
            <div class="modal-header">
                <h5 class="mb-0" id="titleManagerPreguntaC"><strong>[ 0 ]
                        PREGUNTAS</strong></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pb-0 pt-0">
                <div class="row">
                    <div class="col-12">
                        <input type="hidden" id="pagePreguntaC"
                               value="1">
                        <form id="FrmPreguntaC">
                            <div class="row mt-3">
                                <div class="input-group col-12">
                                    <input type="text" id="txtFilterPreguntaC"
                                           class="form-control form-control-sm mr-3" placeholder="INGRESE FILTRO . . .">
                                    <button type="submit" id="btnBuscarPreguntaC"
                                            class="btn btn-primary btn-xs" data-toggle="tooltip"
                                            title="Buscar Pregunta"><i class="fa fa-search" aria-hidden="true"></i>
                                        BUSCAR</button>
                                </div>
                            </div>
                        </form>
                        <div class="row pl-5 pr-5">
                            <div class="table-responsive">
                                <table class="table mb-0 table-fluid">
                                    <thead>
                                        <tr>
                                            <th class="align-middle text-left">Pregunta</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyPreguntaC">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row mt-2 mb-2">
                            <div class="col-sm-4 mt-2">
                                <select id="sizePagePreguntaC"
                                        class="form-control form-control-sm sisbu-cursor-mano combo-paginar">
                                    <option value="8">08</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>
                            <div class="col-sm-8 mt-2">
                                <nav aria-label="Page navigation Area">
                                    <ul id="paginationPreguntaC"
                                        class="pagination justify-content-end">

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal" id="btnCancelSelectionPreguntaC"><i class="fas fa-ban"></i>
                    CANCELAR</button>
                <button type="button" id="btn-selecionar-preguntac" class="btn btn-primary btn-xs"><i
                        class="fas fa-check"></i> SELECCIONAR</button>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoPreguntaC" data-backdrop="static" data-keyboard="false" tabindex="-1"
     role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.3)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Procesando Solicitud. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<!--T: DETALLE_PROCEDIMIENTO_CICLO-->
<div id="ventanaModalDetalleProcedimientoCiclo" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
     data-keyboard="false" style="padding-top: 1%; overflow-y: visible;background-color: rgba(0,0,0,.1)">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content" style="border-color: #0085c1; border-width: 4px;">
            <div class="modal-header">
                <h5 class="mb-0" id="titleManagerDetalleProcedimientoCiclo"><strong>[ 0 ]
                        EVALUACIONES</strong></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pb-0 pt-0">
                <div class="row">
                    <div class="col-12">
                        <input type="hidden" id="pageDetalleProcedimientoCiclo"
                               value="1">
                        <div class="row mt-3">
                            <div class="input-group col-12">
                                <input type="text" id="txtProcedimientoDetalleProcedimientoCiclo"
                                       class="form-control form-control-sm" placeholder="Click en el bot�n para seleccionar. . ." disabled="">
                                <button type="submit" id="btnSeleccionarDetalleProcedimientoCiclo"
                                        class="btn btn-warning btn-xs mr-3" data-toggle="tooltip"
                                        title="Seleccionar Evaluaci�n"><i class="fa fa-search" aria-hidden="true"></i>
                                    SELECCIONAR</button>
                                <button type="button" id="btnGuardarDetalleProcedimientoCiclo" class="btn btn-outline-primary btn-xs mr-3"
                                        data-toggle="tooltip" title="Agregar Evaluaci�n"><i class="icon icon-plus"
                                                                                    aria-hidden="true"></i>AGREGAR EVALUACI�N</button>
                                <button type="button" id="btnBuscarDetalleProcedimientoCiclo" class="btn btn-primary btn-xs"
                                        data-toggle="tooltip" title="Buscar"><i class="icon icon-search"
                                                                        aria-hidden="true"></i></button>
                            </div>
                        </div>
                        <div class="row pl-5 pr-5">
                            <div class="table-responsive">
                                <table class="table mb-0 table-fluid">
                                    <thead>
                                        <tr>
                                            <th class="align-middle">Evaluaci�n</th>
                                            <th style="width: 15%" colspan="2" class="align-middle">
                                                Eli
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyDetalleProcedimientoCiclo">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row mt-2 mb-2">
                            <div class="col-sm-4 mt-2">
                                <select id="sizePageDetalleProcedimientoCiclo"
                                        class="form-control form-control-sm sisbu-cursor-mano combo-paginar">
                                    <option value="6">06</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>
                            <div class="col-sm-8 mt-2">
                                <nav aria-label="Page navigation">
                                    <ul id="paginationDetalleProcedimientoCiclo"
                                        class="pagination justify-content-end">

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal"><i class="fas fa-ban"></i>
                    CERRAR</button>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoDetalleProcedimientoCiclo" data-backdrop="static" data-keyboard="false" tabindex="-1"
     role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.2)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Procesar solicitud. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<!--T: PROCEDIMIENTO_SELECTED-->
<div id="ventanaModalSelectedProcedimientoC" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
     data-keyboard="false" style="padding-top: 2%; overflow-y: visible;background-color: rgba(0,0,0,.3)">
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="border-color: #0085c1; border-width: 4px;">
            <div class="modal-header">
                <h5 class="mb-0" id="titleManagerProcedimientoC"><strong>[ 0 ]
                        EVALUACIONES</strong></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pb-0 pt-0">
                <div class="row">
                    <div class="col-12">
                        <input type="hidden" id="pageProcedimientoC"
                               value="1">
                        <form id="FrmProcedimientoC">
                            <div class="row mt-3">
                                <div class="input-group col-12">
                                    <input type="text" id="txtFilterProcedimientoC"
                                           class="form-control form-control-sm mr-3" placeholder="INGRESE FILTRO . . .">
                                    <button type="submit" id="btnBuscarProcedimientoC"
                                            class="btn btn-primary btn-xs" data-toggle="tooltip"
                                            title="Buscar Pregunta"><i class="fa fa-search" aria-hidden="true"></i>
                                        BUSCAR</button>
                                </div>
                            </div>
                        </form>
                        <div class="row pl-5 pr-5">
                            <div class="table-responsive">
                                <table class="table mb-0 table-fluid">
                                    <thead>
                                        <tr>
                                            <th class="align-middle text-left">Evaluaci�n</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyProcedimientoC">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row mt-2 mb-2">
                            <div class="col-sm-4 mt-2">
                                <select id="sizePageProcedimientoC"
                                        class="form-control form-control-sm sisbu-cursor-mano combo-paginar">
                                    <option value="5">05</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>
                            <div class="col-sm-8 mt-2">
                                <nav aria-label="Page navigation">
                                    <ul id="paginationProcedimientoC"
                                        class="pagination justify-content-end">

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal" id="btnCancelSelectionProcedimientoC"><i class="fas fa-ban"></i>
                    CANCELAR</button>
                <button type="button" id="btn-selecionar-procedimientoc" class="btn btn-primary btn-xs"><i
                        class="fas fa-check"></i> SELECCIONAR</button>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoSelectedProcedimientoC" data-backdrop="static" data-keyboard="false" tabindex="-1"
     role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.4)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Procesar solicitud. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--HTML RESULTADOS-->
<!--SELECTED CICLO ACADEMICO-->
<div id="ventanaModalCicloAcademicoResultados" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
     data-keyboard="false" style="overflow-y: visible;background-color: rgba(0,0,0,.3)">
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="border-color: #757575; border-width: 4px;border-radius: 10px">
            <div class="modal-header">
                <h5 class="mb-0" id="titleManagerCicloAcademicoResultados"><strong>[ 0 ]
                        CICLOS ACADEMICOS</strong></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pb-0 pt-0">
                <div class="row">
                    <div class="col-12">
                        <input type="hidden" id="pageCicloAcademicoResultados"
                               value="1">
                        <form id="FrmCicloAcademicoResultados">
                            <div class="row mt-3">
                                <div class="input-group col-12">
                                    <input type="text" id="txtFilterCicloAcademicoResultados"
                                           class="form-control form-control-sm mr-3" placeholder="INGRESE FILTRO . . .">
                                    <button type="submit" id="btnBuscarCicloAcademicoResultados"
                                            class="btn btn-primary btn-xs mr-3" data-toggle="tooltip"
                                            title="Buscar Ciclo"><i class="fa fa-search" aria-hidden="true"></i>
                                        BUSCAR</button>
                                    <button type="button" id="btnOpenNewCicloAcademicoResultados" class="btn btn-primary btn-xs"
                                            data-toggle="tooltip" title="Agregar Ciclo"><i class="icon icon-plus"
                                                                                   aria-hidden="true"></i></button>
                                </div>
                            </div>
                        </form>
                        <div class="row pl-5 pr-5">
                            <div class="table-responsive">
                                <table class="table mb-0 table-fluid">
                                    <thead>
                                        <tr>
                                            <th class="align-middle text-left">Nombre</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyCicloAcademicoResultados">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row mt-2 mb-2">
                            <div class="col-sm-3 col-4 mt-2">
                                <select id="sizePageCicloAcademicoResultados"
                                        class="form-control form-control-sm sisbu-cursor-mano combo-paginar">
                                    <option value="6">06</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>
                            <div class="col-sm-9 col-8 mt-2">
                                <nav aria-label="Page navigation Area">
                                    <ul id="paginationCicloAcademicoResultados"
                                        class="pagination justify-content-end">

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal"><i class="fas fa-ban"></i>
                    CANCELAR</button>
                <button type="button" id="btn-selecionar-ciclo-academico-resultados" class="btn btn-primary btn-xs"><i
                        class="fas fa-check"></i> SELECCIONAR</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modalCargandoCicloAcademicoResultados" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="padding-top: 18%; overflow-y: visible; display: none; background-color: rgba(0,0,0,.2)" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div id="lblModalCargandoEvaluacion" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Procesando solicitud. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--T: PROCEDIMIENTO_SELECTED-->
<div id="ventanaModalSelectedProcedimientoC2" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
     data-keyboard="false" style="padding-top: 2%; overflow-y: visible;background-color: rgba(0,0,0,.3)">
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="border-color: #0085c1; border-width: 4px;">
            <div class="modal-header">
                <h5 class="mb-0" id="titleManagerProcedimientoC2"><strong>[ 0 ]
                        EVALUACIONES</strong></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pb-0 pt-0">
                <div class="row">
                    <div class="col-12">
                        <input type="hidden" id="pageProcedimientoC2"
                               value="1">
                        <form id="FrmProcedimientoC2">
                            <div class="row mt-3">
                                <div class="input-group col-12">
                                    <input type="text" id="txtFilterProcedimientoC2"
                                           class="form-control form-control-sm mr-3" placeholder="INGRESE FILTRO . . .">
                                    <button type="submit" id="btnBuscarProcedimientoC2"
                                            class="btn btn-primary btn-xs" data-toggle="tooltip"
                                            title="Buscar Pregunta"><i class="fa fa-search" aria-hidden="true"></i>
                                        BUSCAR</button>
                                </div>
                            </div>
                        </form>
                        <div class="row pl-5 pr-5">
                            <div class="table-responsive">
                                <table class="table mb-0 table-fluid">
                                    <thead>
                                        <tr>
                                            <th class="align-middle text-left">Evaluaci�n</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyProcedimientoC2">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row mt-2 mb-2">
                            <div class="col-sm-4 mt-2">
                                <select id="sizePageProcedimientoC2"
                                        class="form-control form-control-sm sisbu-cursor-mano combo-paginar">
                                    <option value="5">05</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>
                            <div class="col-sm-8 mt-2">
                                <nav aria-label="Page navigation">
                                    <ul id="paginationProcedimientoC2"
                                        class="pagination justify-content-end">

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal" id="btnCancelSelectionProcedimientoC2"><i class="fas fa-ban"></i>
                    CANCELAR</button>
                <button type="button" id="btn-selecionar-procedimientoc2" class="btn btn-primary btn-xs"><i
                        class="fas fa-check"></i> SELECCIONAR</button>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoSelectedProcedimientoC2" data-backdrop="static" data-keyboard="false" tabindex="-1"
     role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.4)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Procesar solicitud. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--T: ESCUELA SELECTED-->
<div id="ventanaModalSelectedEscuelaC" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
     data-keyboard="false" style="padding-top: 1%; overflow-y: visible;background-color: rgba(0,0,0,.2)">
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="border-color: #0085c1; border-width: 4px;">
            <div class="modal-header">
                <h5 class="mb-0" id="titleManagerEscuelaC"><strong>[ 0 ]
                        ESCUELAS</strong></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pb-0 pt-0">
                <div class="row">
                    <div class="col-12">
                        <input type="hidden" id="pageEscuelaC"
                               value="1">
                        <form id="FrmEscuelaC">
                            <div class="row mt-3">
                                <div class="input-group col-12">
                                    <input type="text" id="txtFilterEscuelaC"
                                           class="form-control form-control-sm mr-3" placeholder="INGRESE FILTRO . . .">
                                    <button type="submit" id="btnBuscarEscuelaC"
                                            class="btn btn-primary btn-xs" data-toggle="tooltip"
                                            title="Buscar Pregunta"><i class="fa fa-search" aria-hidden="true"></i>
                                        BUSCAR</button>
                                </div>
                            </div>
                        </form>
                        <div class="row pl-5 pr-5 mb-2">
                            <div class="table-responsive">
                                <table class="table mb-0 table-fluid">
                                    <thead>
                                        <tr>
                                            <th class="align-middle text-left">ESCUELA</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyEscuelaC">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row mt-2 mb-2" id="row-full-pagination" style="display: flex">
                            <div class="col-sm-4 mt-2">
                                <select id="sizePageEscuelaC"
                                        class="form-control form-control-sm sisbu-cursor-mano combo-paginar">
                                    <option value="5">05</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                    <option value="100">100</option>
                                </select>
                            </div>
                            <div class="col-sm-8 mt-2">
                                <nav aria-label="Page navigation">
                                    <ul id="paginationEscuelaC"
                                        class="pagination justify-content-end">

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal" id="btnCancelSelectionEscuelaC"><i class="fas fa-ban"></i>
                    CANCELAR</button>
                <button type="button" id="btn-selecionar-escuelac" class="btn btn-primary btn-xs"><i
                        class="fas fa-check"></i> SELECCIONAR</button>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoSelectedEscuelaC" data-backdrop="static" data-keyboard="false" tabindex="-1"
     role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.3)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Cargando escuelas. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--T: ESCUELA SELECTED-->
<div id="ventanaModalSelectedFacultadC" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
     data-keyboard="false" style="padding-top: 1%; overflow-y: visible;background-color: rgba(0,0,0,.2)">
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="border-color: #0085c1; border-width: 4px;">
            <div class="modal-header">
                <h5 class="mb-0" id="titleManagerFacultadC"><strong>[ 0 ]
                        ESCUELAS</strong></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pb-0 pt-0">
                <div class="row">
                    <div class="col-12">
                        <input type="hidden" id="pageFacultadC"
                               value="1">
                        <form id="FrmFacultadC">
                            <div class="row mt-3">
                                <div class="input-group col-12">
                                    <input type="text" id="txtFilterFacultadC"
                                           class="form-control form-control-sm mr-3" placeholder="INGRESE FILTRO . . .">
                                    <button type="submit" id="btnBuscarFacultadC"
                                            class="btn btn-primary btn-xs" data-toggle="tooltip"
                                            title="Buscar Pregunta"><i class="fa fa-search" aria-hidden="true"></i>
                                        BUSCAR</button>
                                </div>
                            </div>
                        </form>
                        <div class="row pl-5 pr-5 mb-2">
                            <div class="table-responsive">
                                <table class="table mb-0 table-fluid">
                                    <thead>
                                        <tr>
                                            <th class="align-middle text-left">ESCUELA</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyFacultadC">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row mt-2 mb-2" style="display: flex">
                            <div class="col-lg-3 col-sm-4 mt-2">
                                <select id="sizePageFacultadC"
                                        class="form-control form-control-sm sisbu-cursor-mano combo-paginar">
                                    <option value="5">05</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>
                            <div class="col-lg-9 col-sm-8 mt-2">
                                <nav aria-label="Page navigation">
                                    <ul id="paginationFacultadC"
                                        class="pagination justify-content-end">

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal" id="btnCancelSelectionFacultadC"><i class="fas fa-ban"></i>
                    CANCELAR</button>
                <button type="button" id="btn-selecionar-facultadc" class="btn btn-primary btn-xs"><i
                        class="fas fa-check"></i> SELECCIONAR</button>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoSelectedFacultadC" data-backdrop="static" data-keyboard="false" tabindex="-1"
     role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.3)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Cargando facultades. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>