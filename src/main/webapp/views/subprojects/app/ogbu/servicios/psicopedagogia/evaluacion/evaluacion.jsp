<%-- 
    Document   : evaluacion
    Created on : 12 set. 2019, 23:31:05
    Author     : James Carrillo
--%>
<!-- Page Header -->
<div class="row" id="row-text-selected-option" style="margin-top: 30px">
    <div class="col-12 text-center">
        <h1 class="dt-page__title">Selecciona una opción</h1>
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
                                    <button class="btn btn-default text-success dt-fab-btn" title="Editar Evaluación" data-toggle="tooltip">
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
                    <label for="txtUsaAlternativasGlobalesRU">¿USA ALTERNATIVAS GLOBALES?</label>
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
                    <label for="txtUsaParametrosInconsistenciaRU">¿USA PREGUNTAS DE INCONSISTENCIAS?</label>
                    <select class="form-control form-control-sm sisbu-cursor-mano" id="txtUsaParametrosInconsistenciaRU">
                        <option value="N">NO</option>
                        <option value="S">SI</option>
                    </select>
                </div>
            </div>
            <div class="col-md-6 col-12 div-parametro-inconsistencia">
                <div class="form-group">
                    <label for="txtOperacionInconsistenciaRU">OPERACIÓN ALGEBRAICA</label>
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
                    <input type="number" class="form-control form-control-sm" id="txtValorInconsistenciaRU" aria-describedby="nombre" placeholder="Ingrese número . . .">
                </div>
            </div>
            <div class="col-12 div-others-parameters">
                <div class="form-group">
                    <label for="txtUsaParametrosCriticidadRU">¿USA PREGUNTAS CRITICAS?</label>
                    <select class="form-control form-control-sm sisbu-cursor-mano" id="txtUsaParametrosCriticidadRU">
                        <option value="N">NO</option>
                        <option value="S">SI</option>
                    </select>
                </div>
            </div>
            <div class="col-12 div-parametro-criticidad">
                <div class="form-group">
                    <label for="txtValorCriticidadRU">VALOR MINIMO DE PREGUNTAS CRITICAS</label>
                    <input type="number" class="form-control form-control-sm" id="txtValorCriticidadRU" aria-describedby="nombre" placeholder="Ingrese número . . .">
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

<div class="row" id="row-configurations" style="display: none">
    <!-- Grid Item -->
    <div class="col-12 order-xl-3">

        <!-- Card -->
        <div class="dt-card pb-4">

            <!-- Card Header -->
            <div class="dt-card__header mb-0">
                <!-- Card Heading -->
                <div class="dt-card__heading">
                    <h3 class="dt-card__title">[0] Configuraciones</h3>
                </div>
                <!-- /card heading -->

            </div>
            <div class="mb-5 pt-5 pl-3 pr-3">
                <div class="col-12">
                    <form id="FrmEvaluacion">
                        <div class="input-group" style="max-width: 100%;">
                            <select class="form-control form-control-sm">
                                <option value="">Seleccione. . . .</option>
                            </select>
                            <button type="submit" class="btn btn-primary btn-sm">BUSCAR</button>
                        </div>
                    </form>
                </div>
            </div>
            <!-- /card header -->

            <!-- Card Body -->
            <div class="dt-card__body p-0">
                <!-- Widget -->
                <div class="dt-widget dt-widget-hl-item dt-widget-hl-item-space dt-widget-mb-item dt-widget-hover-bg" id="div-container-evaluaciones">

                    <!-- Widget Item -->
                    <div class="dt-widget__item border-success">

                        <!-- Widget Info -->
                        <div class="dt-widget__info text-truncate">
                            <div class="dt-widget__title f-16 font-weight-500 text-truncate">
                                2018-II
                            </div>
                            <p class="mb-0 text-truncate text-light-gray">
                                10/09/2019 - 24/12/2019 
                            </p>
                        </div>
                        <!-- /widget info -->

                        <!-- Widget Extra -->
                        <div class="dt-widget__extra text-right">
                            <!-- Show Content -->
                            <div class="show-content">
                                <span class="d-block text-dark">150</span>
                                <span class="d-block">Evaluaciones</span>
                            </div>
                            <!-- /show content -->
                            <!-- Hide Content -->
                            <div class="hide-content">
                                <!-- Action Button Group -->
                                <div class="action-btn-group">
                                    <button class="btn btn-default text-danger dt-fab-btn" title="Configurar Evaluaciones" data-toggle="tooltip">
                                        <i class="icon icon-assignment icon-xl"></i>
                                    </button>
                                </div>
                                <!-- /action button group -->
                            </div>
                            <!-- /hide content -->
                        </div>
                        <!-- /widget extra -->

                    </div>
                    <!-- /widgets item -->


                </div>
                <!-- /widget -->
            </div>
            <!-- /card body -->

        </div>
        <!-- /card -->

    </div>
    <!-- /grid item -->
</div>

<div class="row mb-3" id="row-navigation-options" style="display: none">
    <div class="col-12 text-center">
        <button class="btn btn-primary btn-xs" id="btn-regresar-principal"><i class="icon icon-reply"></i> Regresar Inicio</button>
    </div>
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


<div class="modal fade" id="ventanaModalAddAlternativaGlobal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h6 class="modal-title">AGREGAR ALTERNATIVA GLOBAL</h6>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-12 mb-2">
                        <label for="txtDescripcionAlternativaGlobal">DESCRIPCION</label>
                        <input class="form-control form-control-sm" id="txtDescripcionAlternativaGlobal" type="text" placeholder="DESCRIPCIÓN" maxlength="100">
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
                                <th scope="col">N°</th>
                                <th scope="col">Enunciado</th>
                                <th scope="col" class="text-center">Tipo Respuesta</th>
                                <th scope="col">Acción</th>
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
                    <label for="txtItemNegativoPregunta">¿Item Negativo?</label>
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
                    <input type="text" class="form-control form-control-sm" id="txtEnunciadoPregunta" aria-describedby="nombre" placeholder="Ingrese descripción . . .">
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
                    </select>
                </div>
            </div>
            <div class="col-lg-6 col-12">
                <div class="form-group">
                    <label for="txtColumnasPregunta">Columnas</label>
                    <input type="number" class="form-control form-control-sm" id="txtColumnasPregunta" aria-describedby="nombre" placeholder="Ingrese n° columnas . . .">
                </div>
            </div>
            <div class="col-12 mb-4">
                <label for="txtSubAreaPregunta">SUBAREA</label>
                <div class="input-group">
                    <input type="text" class="form-control form-control-sm" id="txtSubAreaPregunta" aria-describedby="nombre" placeholder="Click en el botón para seleccionar. . ." disabled="">
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
                                                Acción
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
                            <label for="txtDescripcionSubAreaPsi">Descripción</label>
                            <textarea id="txtDescripcionSubAreaPsi" class="form-control" placeholder="Ingrese descripción. . ." maxlength="300">
                            </textarea>
                        </div>
                        <div class="col-12 mb-2">
                            <label for="txtAbreviaturaSubAreaPsi">Abreviatura</label>
                            <input type="text" id="txtAbreviaturaSubAreaPsi"
                                   class="form-control form-control-sm" placeholder="Ingrese abreviatura. . ." maxlength="5">
                        </div>
                        <div class="col-lg-6 col-12 mb-2">
                            <label for="txtPuntajeMinimoSubAreaPsi">Puntaje mínimo</label>
                            <input type="number" id="txtPuntajeMinimoSubAreaPsi"
                                   class="form-control form-control-sm" placeholder="Ingrese puntaje mínimo. . ." maxlength="10">
                        </div>
                        <div class="col-lg-6 col-12 mb-2">
                            <label for="txtPuntajeMaximoSubAreaPsi">Puntaje máximo</label>
                            <input type="number" id="txtPuntajeMaximoSubAreaPsi"
                                   class="form-control form-control-sm" placeholder="Ingrese puntaje máximo. . ." maxlength="10">
                        </div>
                        <div class="col-12 mb-4">
                            <label for="txtAreaSubAreaPsi">Área</label>
                            <div class="input-group">
                                <input type="text" class="form-control form-control-sm" id="txtAreaSubAreaPsi" aria-describedby="nombre" placeholder="Click en el botón para seleccionar. . ." disabled="">
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
                                                Acción
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
                            <label for="txtDescripcionAreaPsi">Descripción</label>
                            <textarea id="txtDescripcionAreaPsi" class="form-control" placeholder="Ingrese descripción. . ." maxlength="300" rows="4">
                            </textarea>
                        </div>
                        <div class="col-12 mb-2">
                            <label for="txtAbreviaturaAreaPsi">Abreviatura</label>
                            <input type="text" id="txtAbreviaturaAreaPsi"
                                   class="form-control form-control-sm" placeholder="Ingrese abreviatura. . ." maxlength="5">
                        </div>
                        <div class="col-lg-6 col-12 mb-2">
                            <label for="txtPuntajeMinimoAreaPsi">Puntaje mínimo</label>
                            <input type="number" id="txtPuntajeMinimoAreaPsi"
                                   class="form-control form-control-sm" placeholder="Ingrese puntaje mínimo. . ." maxlength="10">
                        </div>
                        <div class="col-lg-6 col-12 mb-2">
                            <label for="txtPuntajeMaximoAreaPsi">Puntaje máximo</label>
                            <input type="number" id="txtPuntajeMaximoAreaPsi"
                                   class="form-control form-control-sm" placeholder="Ingrese puntaje máximo. . ." maxlength="10">
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
                                                Acción
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
                            <label for="txtDescripcionAlternativa">Descripción</label>
                            <input type="text" id="txtDescripcionAlternativa"
                                   class="form-control form-control-sm" placeholder="Ingrese descripción. . ." maxlength="100">
                        </div>
                        <div class="col-lg-6 col-12 mb-2">
                            <label for="txtValorAlternativa">Valor Numérico</label>
                            <input type="number" id="txtValorAlternativa"
                                   class="form-control form-control-sm" placeholder="Ingrese valor numérico. . ." maxlength="10">
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