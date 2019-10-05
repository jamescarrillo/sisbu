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
            <a href="<%=request.getContextPath()%>/app/ate/videos-tutoriales">
                <i class="icon icon-arrow-right icon-fw mr-2 mr-sm-1"></i> Videos Tutoriales
            </a>
            o dale click al boton que dice ¡Mirar Videos Tutoriales!
        </p>
    </div>
    <div class="col-12 text-center">
        <button class="btn btn-primary mr-4 mb-2" id="btnEmpezarEvaluaciones"><i class="icon icon-send"></i> ¡Empezar Ahora!</button>
        <a href="<%=request.getContextPath()%>/app/ate/videos-tutoriales" class="btn btn-light mb-2" >
            <i class="icon icon-youtube"></i>
            ¡Ver Videos Tutoriales!
        </a>
    </div>
</div>

<div class="row justify-content-center" id="row-options-evaluaciones" style="margin-top: 70px; display: none">
    <!--div class="col-12 text-center">
        <img src="<%=request.getContextPath()%>/resources/prod/custom_app/evaluaciones.jpg" class="img-fluid" alt="Fam. Pedro Ruiz Gallo">
    </div-->
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
        <button class="btn btn-primary mr-4 mb-2" id="btnRegresarHome">
            <i class="icon icon-reply"></i>
            Regresar Saludo Inicial
        </button>
        <a href="<%=request.getContextPath()%>/app/ate/videos-tutoriales" class="btn btn-light mr-4 mb-2" >
            <i class="icon icon-youtube"></i>
            ¡Ver Videos Tutoriales!
        </a>
        <a href="<%=request.getContextPath()%>/app/ate/documentos" class="btn btn-success mb-2"
           data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="¿Ya has completado todas tus evaluaciones virtuales?. Si es así dale click para ir a tus documentos. Ahí es donde encontrarás tus constancias." style="cursor: pointer" data-original-title="">
            <i class="icon icon-send"></i>
            Ir a mis documentos
        </a>
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
            Seleccionar otra evaluación
        </button>
    </div>
</div>

<div class="row" id="row-option-deportiva" style="display: none">
    <div class="col-12">
        <div class="row justify-content-center" id="div-imagen-general-ed">
            <div class="col-lg-4 col-md-6 col-sm-8">
                <img src="<%=request.getContextPath()%>/resources/prod/custom_app/deportes.gif" class="img-fluid" alt="Fam. Pedro Ruiz Gallo">
            </div>
        </div>
        <div class="row justify-content-center" id="div-evaluacion-deportiva">
            <div class="col-xl-3 col-sm-6 col-lg-3">
                <div class="dt-card sisbu-cursor-mano" id="div-ed-option-deportes">
                    <div class="dt-card__body d-flex flex-sm-column text-center">
                        <div class="mb-sm-7">
                            <i class="icon icon-assignment dt-icon-bg text-primary"></i>
                        </div>
                        <a class="h2 mb-0 font-weight-500">¿Cuáles deportes practico?</a>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-sm-6 col-lg-3">
                <div class="dt-card sisbu-cursor-mano" id="div-ed-option-aficiones">
                    <div class="dt-card__body d-flex flex-sm-column text-center">
                        <div class="mb-sm-7">
                            <i class="icon icon-assignment dt-icon-bg text-primary"></i>
                        </div>
                        <a class="h2 mb-0 font-weight-500">¿Cuáles son mis aficiones?</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="row " id="div-content-ev-deportes" style="display: none">
            <!-- Tab DATOS ATENDIDO -->
            <!-- Card -->
            <div class="card overflow-hidden col-12" id="OpenListaDeporteDetalle">

                <div class="form-row pt-5 ">
                    <div class="col-11 text-center">
                        <label  for="normal-input-3" class="col-form-label col-form-label-lg text-sm-center text-primary">LISTA DE DEPORTES</label>
                        <input type="hidden" id="pageDeporteDetalle" value="1">
                    </div>
                    <div class="float-right">
                        <button type="button" id="btnOpenDeporteDetalle" class="btn btn-primary btn-sm" data-toggle="tooltip" title="Agregar Deporte" ><i class="icon icon-plus icon-fw"></i></button>
                    </div>
                </div>
                <!-- /card header -->
                <!-- Card Body -->
                <div class="card-body pt-0 ">
                    <!-- Tables -->
                    <!-- Card -->
                    <div class=" pb-4 ">
                        <!-- Card Header -->
                        <div class="dt-card__header mb-3 p-0">
                            <!-- Card Heading -->
                            <div class="dt-card__heading pt-0">
                                <!-- Widget Item -->
                                <div class="dt-widget__item border bg-primary " >
                                    <!-- Widget Info -->
                                    <div class="dt-widget__info text-truncate ml-5">
                                        <h3 class="dt-card__title text-white ">DEPORTE</h3>
                                    </div>
                                    <!-- /widget info -->
                                    <!-- Widget Info -->
                                    <div class="dt-widget__info text-truncate ml-5">
                                        <h3 class="dt-card__title text-white ">ESTADO</h3>
                                    </div>
                                    <!-- /widget info -->

                                </div>
                            </div>
                            <!-- /card heading -->
                        </div>
                        <!-- /card header -->

                        <div class="dt-card__body p-0" >
                            <!-- Widget -->
                            <div class="dt-widget dt-widget-hover ps-custom-scrollbar ps ps--active-y" id="tbodyDeporte">

                            </div>
                            <!-- /widget -->
                        </div>
                        <!-- /card -->
                    </div>

                    <!-- /tables -->
                    <div class="row mt-2">
                        <div class="col-md-2 col-sm-3 col-4">
                            <select id="sizePageDeporteDetalle" class="form-control form-control-sm select2-single">
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                            </select>
                        </div>
                        <div class="col-md-10 col-sm-9 col-8">
                            <nav aria-label="Page navigation example">
                                <ul id="paginationDeporteDetalle" class="pagination pagination-sm justify-content-end">
                                </ul>
                            </nav>  
                        </div>
                    </div>
                </div>
                <!-- /card body -->
            </div>
            <!-- /card -->

            <div class=" col-12" id="OpenDeporteDetalle" style="display:none"> 
                <!-- Card -->
                <div class="col-12 text-center">
                    <label id="tittleDeporteDetalle" for="normal-input-3" class="col-form-label col-form-label-lg text-sm-center text-primary">DEPORTE</label>
                </div>
                <div class="form-row">
                    <div class="col-lg-3 col-sm-2"></div>
                    <div class="card overflow-hidden col-lg-6 col-sm-8"  >
                        <!-- Card Header -->
                        <div class="card-header bg-transparent">
                            <form id="FrmDeporteDetalleModal">
                                <div class="row">
                                    <div class="form-group col-12">
                                        <label for="txtEstadoDeporteDetalle">ESTADO</label>
                                        <div class="input-group">
                                            <select class="form-control form-control-sm" id="txtEstadoDeporteDetalle">
                                                <option value="-1">seleccione...</option>
                                                <option value="1">LO PRACTICO</option>
                                                <option value="2">ME GUSTARÍA APRENDER</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group col-12">
                                        <label for="txtDeporteDetalle">DEPORTE
                                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="Deporte que practicas " style="cursor: pointer" data-original-title=""></i>
                                        </label>
                                        <div class="input-group">
                                            <input type="text" class="form-control form-control-sm" id="txtDeporteDetalle" aria-describedby="nombre" placeholder="Click en el botón para seleccionar. . ." disabled="">
                                            <div class="input-group-append">
                                                <button type="button" id="btnSeleccionarDeporte" class="btn btn-primary btn-sm"><i class="icon icon-subscribe"></i></button>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group col-12 text-center">
                                        <button type="button" id="btnCancelarDeporteDetalle" class="ml-5 btn btn-outline-primary btn-sm"><i class="icon icon-reply"></i> CANCELAR</button>
                                        <button type="submit" id="btnGuardarDeporteDetalle" class="ml-5 btn btn-primary btn-sm">GUARDAR</button>
                                    </div>  
                                </div>
                            </form>
                        </div>
                        <!-- /card header -->
                    </div>
                </div>
                <!-- /card -->
            </div> 
        </div>

        <div class="row" id="div-content-ev-aficiones" style="display: none">
            <!-- Tab DATOS ATENDIDO -->
            <!-- Card -->
            <div class="card overflow-hidden col-12" id="OpenListaAficionDetalle">

                <div class="form-row  pt-5">
                    <div class="col-11 text-center">
                        <label  for="normal-input-3" class="col-form-label col-form-label-lg text-sm-center text-primary">LISTA DE AFICIONES</label>
                        <input type="hidden" id="pageAficionDetalle" value="1">
                    </div>
                    <div class="float-right">
                        <button type="button" id="btnOpenAficionDetalle" class="btn btn-primary btn-sm"data-toggle="tooltip" title="Agregar Aficion" ><i class="icon icon-plus icon-fw"></i></button>
                    </div>
                </div>
                <!-- /card header -->

                <!-- Card Body -->
                <div class="card-body pt-0 ">
                    <!-- Tables -->
                    <!-- Card -->
                    <div class=" pb-4 ">
                        <!-- Card Header -->
                        <div class="dt-card__header mb-3 p-0">
                            <!-- Card Heading -->
                            <div class="dt-card__heading pt-0">
                                <!-- Widget Item -->
                                <div class="dt-widget__item border bg-primary " >
                                    <!-- Widget Info -->
                                    <div class="dt-widget__info text-truncate">
                                        <h3 class="dt-card__title text-white">AFICION</h3>
                                    </div>
                                    <!-- /widget info -->
                                    <!-- Widget Info -->
                                    <div class="dt-widget__info text-truncate">
                                        <h3 class="dt-card__title text-white">ESTADO</h3>
                                    </div>
                                    <!-- /widget info -->

                                </div>
                            </div>
                            <!-- /card heading -->
                        </div>
                        <!-- /card header -->

                        <div class="dt-card__body p-0" >
                            <!-- Widget -->
                            <div class="dt-widget dt-widget-hover ps-custom-scrollbar ps ps--active-y" id="tbodyAficion">

                            </div>
                            <!-- /widget -->
                        </div>
                        <!-- /card -->
                    </div>

                    <!-- /tables -->
                    <div class="row mt-2">
                        <div class="col-md-2 col-sm-3 col-4">
                            <select id="sizePageAficionDetalle" class="form-control form-control-sm select2-single">
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                            </select>
                        </div>
                        <div class="col-md-10 col-sm-9 col-8">
                            <nav aria-label="Page navigation example">
                                <ul id="paginationAficionDetalle" class="pagination pagination-sm justify-content-end">
                                </ul>
                            </nav>  
                        </div>
                    </div>
                </div>
                <!-- /card body -->
            </div>
            <!-- /card -->

            <!-- Card -->
            <div class="col-12" id="OpenAficionDetalle" style="display:none"> 
                <div class="col-12 text-center">
                    <label id="tittleAficionDetalle" for="normal-input-3" class="col-form-label col-form-label-lg text-sm-center text-primary">AFICION</label>
                </div>
                <div class="form-row">
                    <div class="col-lg-3 col-sm-2"></div>
                    <div class="card overflow-hidden col-lg-6 col-sm-8" >
                        <!-- Card Header -->
                        <div class="card-header bg-transparent">
                            <form id="FrmAficionDetalleModal">
                                <div class="row">
                                    <div class="form-group col-12">
                                        <label for="txtEstadoAficionDetalle">ESTADO</label>
                                        <div class="input-group">
                                            <select class="form-control form-control-sm" id="txtEstadoAficionDetalle">
                                                <option value="-1">seleccione...</option>
                                                <option value="1">LO PRACTICO</option>
                                                <option value="2">ME GUSTARÍA APRENDER</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group col-12">
                                        <label for="txtAficionDetalle">AFICION
                                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="Aficion que practicas " style="cursor: pointer" data-original-title=""></i>
                                        </label>
                                        <div class="input-group">
                                            <input type="text" class="form-control form-control-sm" id="txtAficionDetalle" aria-describedby="nombre" placeholder="Click en el botón para seleccionar. . ." disabled="">
                                            <div class="input-group-append">
                                                <button type="button" id="btnSeleccionarAficiones" class="btn btn-primary btn-sm"><i class="icon icon-subscribe"></i></button>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group text-center col-12">
                                        <button type="button" id="btnCancelarAficionDetalle" class="ml-5 btn btn-outline-primary btn-sm"><i class="icon icon-reply"></i> CANCELAR</button>
                                        <button type="submit" id="btnGuardarAficionDetalle" class="ml-5 btn btn-primary btn-sm">GUARDAR</button>
                                    </div>  
                                </div>
                            </form>

                        </div>
                        <!-- /card header -->

                    </div>
                    <!-- /card -->
                </div>
            </div>

        </div>
        <div class="row" id="div-regresar-selected-option-ed" style="display: none">
            <div class="col-12 text-center">
                <button class="btn btn-outline-primary" id="btnRegresarSelectedOptionED">
                    <i class="icon icon-reply"></i>
                    Regresar a seleccionar otra opción
                </button>
            </div>
        </div>
    </div>
    <div class="col-12 text-center" id="div-regresar-selected-evaluation-deporte">
        <button class="btn btn-outline-primary btn-regresar-selected-evaluation">
            <i class="icon icon-reply"></i>
            Regresar a seleccionar evaluación
        </button>
    </div>
</div>

<div class="row" id="row-option-psicologica" style="display: none">
    <div class="col-12">
        <div class="row" id="div-evaluaciones-psicologico">
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
                                        id="estimation-psicologico" data-fill="0"
                                        height="110" width="110"></canvas>
                            </div>
                            <div class="col-xl-8 col-md-12 col-sm-8">
                                <div class="pb-3 mb-3 border-bottom">
                                    <span class="display-4 d-inline-block mr-2 font-weight-500 text-dark" id="lblNumProcedimientosPsicologico">0</span><span
                                        class="font-weight-light f-16">Test</span>
                                </div>
                                <ul class="dt-list dt-list-col-6">
                                    <li class="dt-list__item">
                                        <span class="dot-shape dot-shape-lg bg-light-green mr-2"></span>
                                        <span class="d-inline-block" id="lblNumRespondidasPsicologico">0 Realizadas</span>
                                    </li>
                                    <li class="dt-list__item">
                                        <span class="dot-shape dot-shape-lg bg-light-pink mr-2"></span>
                                        <span class="d-inline-block" id="lblNumPendientesPsicologico">0 Pendientes</span>
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
                             id="div-content-evaluacion-psicologico">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" id="div-preguntas-evaluacion-psicologico" style="display: none">
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
                                <ul class="list-group list-group-flush" id="content-preguntas-evaluacion-psicologico">

                                </ul>
                            </div>
                            <div class="col-12 text-right">
                                <button class="btn btn-outline-primary" id="btn-cancelar-evaluation-psicologico">
                                    <i class="icon icon-reply"></i>
                                    Salir
                                </button>
                                <button class="btn btn-primary" id="btn-finalizar-evaluation-psicologico">
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
    <div class="col-12 text-center" id="div-regresar-selected-evaluation-psicologico">
        <button class="btn btn-outline-primary btn-regresar-selected-evaluation">
            <i class="icon icon-reply"></i>
            Seleccionar otra evaluación
        </button>
    </div>
</div>
<div class="row" id="row-option-obstetricia" style="display: none">
    <div class="col-12">
        <div class="row" id="div-evaluaciones-obstetricia">
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
                                        id="estimation-obstetricia" data-fill="0"
                                        height="110" width="110"></canvas>
                            </div>
                            <div class="col-xl-8 col-md-12 col-sm-8">
                                <div class="pb-3 mb-3 border-bottom">
                                    <span class="display-4 d-inline-block mr-2 font-weight-500 text-dark" id="lblNumProcedimientosObstetricia">0</span><span
                                        class="font-weight-light f-16">Fichas</span>
                                </div>
                                <ul class="dt-list dt-list-col-6">
                                    <li class="dt-list__item">
                                        <span class="dot-shape dot-shape-lg bg-light-green mr-2"></span>
                                        <span class="d-inline-block" id="lblNumRespondidasObstetricia">0 Realizadas</span>
                                    </li>
                                    <li class="dt-list__item">
                                        <span class="dot-shape dot-shape-lg bg-light-pink mr-2"></span>
                                        <span class="d-inline-block" id="lblNumPendientesObstetricia">0 Pendientes</span>
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
                             id="div-content-evaluacion-obstetricia">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" id="div-preguntas-evaluacion-obstetricia" style="display: none">
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
                                <ul class="list-group list-group-flush" id="content-preguntas-evaluacion-obstetricia">

                                </ul>
                            </div>
                            <div class="col-12 text-right">
                                <button class="btn btn-outline-primary" id="btn-cancelar-evaluation-obstetricia">
                                    <i class="icon icon-reply"></i>
                                    Salir
                                </button>
                                <button class="btn btn-primary" id="btn-finalizar-evaluation-obstetricia">
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
    <div class="col-12 text-center" id="div-regresar-selected-evaluation-obstetricia">
        <button class="btn btn-outline-primary btn-regresar-selected-evaluation">
            <i class="icon icon-reply"></i>
            Seleccionar otra evaluación
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

<div class="modal" id="modalCargandoEvaluacionAtendidoPsicologico" data-backdrop="static" data-keyboard="false" tabindex="-1"
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

<div class="modal" id="modalCargandoEvaluacionAtendidoObstetricia" data-backdrop="static" data-keyboard="false" tabindex="-1"
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

<div class="modal" id="modalCargandoDeporteDetalle" data-backdrop="static" data-keyboard="false" tabindex="-1"
     role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.2)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Cargando deportes que practicas. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoAficionDetalle" data-backdrop="static" data-keyboard="false" tabindex="-1"
     role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.2)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Cargando deportes que practicas. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--T: DEPORTE SELECTED-->
<div id="ventanaModalSelectedDeporteC" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
     data-keyboard="false" style="padding-top: 2%; overflow-y: visible;background-color: rgba(0,0,0,.1)">
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="border-color: #0085c1; border-width: 4px;">
            <div class="modal-header">
                <h5 class="mb-0" id="titleManagerDeporteC"><strong>[ 0 ]
                        DEPORTES</strong></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pb-0 pt-0">
                <div class="row">
                    <div class="col-12">
                        <input type="hidden" id="pageDeporteC"
                               value="1">
                        <form id="FrmDeporteC">
                            <div class="row mt-3">
                                <div class="input-group col-12">
                                    <input type="text" id="txtFilterDeporteC"
                                           class="form-control form-control-sm mr-3" placeholder="INGRESE FILTRO . . .">
                                    <button type="submit" id="btnBuscarDeporteC"
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
                                            <th class="align-middle text-left">Deporte</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyDeporteC">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row mt-2 mb-2" style="display: none">
                            <div class="col-sm-4 mt-2">
                                <select id="sizePageDeporteC"
                                        class="form-control form-control-sm sisbu-cursor-mano combo-paginar">
                                    <option value="5">05</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>
                            <div class="col-sm-8 mt-2">
                                <nav aria-label="Page navigation">
                                    <ul id="paginationDeporteC"
                                        class="pagination justify-content-end">

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal" id="btnCancelSelectionDeporteC"><i class="fas fa-ban"></i>
                    CANCELAR</button>
                <button type="button" id="btn-selecionar-deportec" class="btn btn-primary btn-xs"><i
                        class="fas fa-check"></i> SELECCIONAR</button>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoSelectedDeporteC" data-backdrop="static" data-keyboard="false" tabindex="-1"
     role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.2)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Cargando deportes. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--T: AFICION SELECTED-->
<div id="ventanaModalSelectedAficionC" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
     data-keyboard="false" style="padding-top: 2%; overflow-y: visible;background-color: rgba(0,0,0,.1)">
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="border-color: #0085c1; border-width: 4px;">
            <div class="modal-header">
                <h5 class="mb-0" id="titleManagerAficionC"><strong>[ 0 ]
                        AFICIONES</strong></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pb-0 pt-0">
                <div class="row">
                    <div class="col-12">
                        <input type="hidden" id="pageAficionC"
                               value="1">
                        <form id="FrmAficionC">
                            <div class="row mt-3">
                                <div class="input-group col-12">
                                    <input type="text" id="txtFilterAficionC"
                                           class="form-control form-control-sm mr-3" placeholder="INGRESE FILTRO . . .">
                                    <button type="submit" id="btnBuscarAficionC"
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
                                            <th class="align-middle text-left">Afición</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyAficionC">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row mt-2 mb-2" style="display: none">
                            <div class="col-sm-4 mt-2">
                                <select id="sizePageAficionC"
                                        class="form-control form-control-sm sisbu-cursor-mano combo-paginar">
                                    <option value="5">05</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>
                            <div class="col-sm-8 mt-2">
                                <nav aria-label="Page navigation">
                                    <ul id="paginationAficionC"
                                        class="pagination justify-content-end">

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal" id="btnCancelSelectionAficionC"><i class="fas fa-ban"></i>
                    CANCELAR</button>
                <button type="button" id="btn-selecionar-aficionc" class="btn btn-primary btn-xs"><i
                        class="fas fa-check"></i> SELECCIONAR</button>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoSelectedAficionC" data-backdrop="static" data-keyboard="false" tabindex="-1"
     role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.2)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Cargando aficiones. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>