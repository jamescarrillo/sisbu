<%-- 
    Document   : index
    Created on : 21 set. 2019, 13:08:49
    Author     : James Carrillo
--%>
<div class="row justify-content-center" id="row-home-evaluaciones" style="margin-top: 30px">
    <div class="col-sm-6">
        <div class="row">
            <div class="col-12 text-center">
                <img src="<%=request.getContextPath()%>/resources/prod/custom_app/pedritojr_blanco_feliz.png" class="img-fluid" alt="Pedrito Jr.">
                <p class="text-center" style="font-size: 18px">
                    <span class="text-primary" id="lblNameUserSession"></span>, tu información es importante
                    para brindarte un mejor servicio. Agradecemos tu sinceridad al momento de 
                    responder las distintas evaluaciones virtuales.
                </p>
            </div>
        </div>
        <!--p class="text-center text-danger" style="font-size: 12px">
            ***Nota: Te sugerimos ver los videos tutoriales sobre como llenar correctamente las evaluaciones, 
            si aún no lo has hecho, dale click a este enlace 
            <a href="<%=request.getContextPath()%>/app/ate/videos-tutoriales">
                <i class="icon icon-arrow-right icon-fw mr-2 mr-sm-1"></i> Videos Tutoriales
            </a>
            o dale click al boton que dice ¡Mirar Videos Tutoriales!
        </p-->
    </div>
    <div class="col-12 text-center mt-4">
        <button class="btn btn-primary mr-4 mb-2" id="btnEmpezarEvaluaciones"><i class="icon icon-send"></i> ¡Empezar Ahora!</button>
        <a  style="display: none" href="<%=request.getContextPath()%>/app/ate/videos-tutoriales" class="btn btn-light mb-2" >
            <i class="icon icon-youtube"></i>
            ¡Ver Videos Tutoriales!
        </a>
    </div>
</div>

<div class="row" id="row-options-evaluaciones" style="margin-top: 10px; display: none">
    <!--div class="col-12 text-center">
        <img src="<%=request.getContextPath()%>/resources/prod/custom_app/evaluaciones.jpg" class="img-fluid" alt="Fam. Pedro Ruiz Gallo">
    </div-->
    <div class="col-12">
        <div class="row justify-content-center" id="row-evaluaciones-1">
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
            <div class="col-xl-3 col-sm-6 col-lg-3" style="display: block">
                <div class="dt-card sisbu-cursor-mano option-evaluation" evaluation="deportiva">
                    <div class="dt-card__body d-flex flex-sm-column text-center">
                        <div class="mb-sm-7">
                            <i class="icon icon-ripple dt-icon-bg text-primary"></i>
                        </div>
                        <a class="h2 mb-0 font-weight-500">Evaluación<br>Deportiva</a>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-sm-6 col-lg-3" style="display: block">
                <div class="dt-card sisbu-cursor-mano option-evaluation" evaluation="psicologica">
                    <div class="dt-card__body d-flex flex-sm-column text-center">
                        <div class="mb-sm-7">
                            <i class="icon icon-heart-o dt-icon-bg text-primary"></i>
                        </div>
                        <a class="h2 mb-0 font-weight-500">Evaluación<br>Psicológica</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="row justify-content-center" id="row-evaluaciones-2">
            <div class="col-xl-3 col-sm-6 col-lg-3" style="display: block">
                <div class="dt-card sisbu-cursor-mano option-evaluation" evaluation="obstetricia">
                    <div class="dt-card__body d-flex flex-sm-column text-center">
                        <div class="mb-sm-7">
                            <i class="icon icon-contacts-app dt-icon-bg text-primary"></i>
                        </div>
                        <a class="h2 mb-0 font-weight-500">Evaluación<br>Obstetricia</a>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-sm-6 col-lg-3" style="display: block">
                <div class="dt-card sisbu-cursor-mano option-evaluation" evaluation="otondologia">
                    <div class="dt-card__body d-flex flex-sm-column text-center">
                        <div class="mb-sm-7">
                            <i class="icon icon-link dt-icon-bg text-primary"></i>
                        </div>
                        <a class="h2 mb-0 font-weight-500">Evaluación<br>Odontólogica</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-12 text-center">
        <button class="btn btn-primary mr-4 mb-2" id="btnRegresarHome">
            <i class="icon icon-reply"></i>
            Regresar Saludo Inicial
        </button>
        <a style="display: none" href="<%=request.getContextPath()%>/app/ate/videos-tutoriales" class="btn btn-light mr-4 mb-2" >
            <i class="icon icon-youtube"></i>
            ¡Ver Videos Tutoriales!
        </a>
        <a style="display: none" href="<%=request.getContextPath()%>/app/ate/documentos" class="btn btn-success mb-2"
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
                <div class="dt-card">
                    <div class="dt-card__body">
                        <div class="dt-widget dt-widget-hl-item dt-widget-hl-item-space dt-widget-mb-item dt-widget-hover-bg" 
                             id="div-content-evaluacion-socioeconomico">
                            <div class="row">
                                <div class="col-12">
                                    <h6 class="text-primary mb-0">DATOS GENERALES</h6>
                                    <hr class="mt-1">
                                </div>
                                <div class="col-12 mb-4">
                                    <label for="slctTienesHijos">¿Tienes hijo(s)?</label>
                                    <div class="input-group">
                                        <select  class="form-control form-control-sm sisbu-cursor-mano" id="slctTienesHijos">
                                            <option  value="-1">Seleccionar...</option>
                                            <option  value="SI">SI</option>
                                            <option  value="NO">NO</option>
                                        </select>
                                        <input style="display: none" type="number" class="form-control form-control-sm" id="txtCantHijosFichaSocioeconomica" placeholder="Ingrese cant hijos. . ." maxlength="2">
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-group">
                                        <label for="txtNombreColegioFichaSocioeconomica">NOMBRE DE COLEGIO DE PROCEDENCIA
                                        </label>
                                        <input  type="text" class="form-control form-control-sm text-uppercase" id="txtNombreColegioFichaSocioeconomica" placeholder="" maxlength="300">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <h6 class="text-primary mb-0">ASPECTO ACADEMICO</h6>
                                    <hr class="mt-1">
                                </div>
                                <div class="col-lg-4 col-md-6">
                                    <div class="form-group">
                                        <label for="slctAnioIngresoFichaSocioeconomica">AÑO DE INGRESO</label>
                                        <select  class="form-control form-control-sm sisbu-cursor-mano" id="slctAnioIngresoFichaSocioeconomica">
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6">
                                    <div class="form-group">
                                        <label for="slctCicloEstudioFichaSocioeconomica">CICLO DE ESTUDIOS
                                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="Indique el ciclo del curso de menor nivel" style="cursor: pointer" data-original-title=""></i>
                                        </label>
                                        <select  class="form-control form-control-sm sisbu-cursor-mano" id="slctCicloEstudioFichaSocioeconomica">
                                            <option value="-1">Seleccionar...</option>
                                            <option value="I">I</option>
                                            <option value="II">II</option>
                                            <option value="III">III</option>
                                            <option value="IV">IV</option>
                                            <option value="V">V</option>
                                            <option value="VI">VI</option>
                                            <option value="VII">VII</option>
                                            <option value="VIII">VIII</option>
                                            <option value="IX">IX</option>
                                            <option value="X">X</option>
                                            <option value="XI">XI</option>
                                            <option value="XII">XII</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6">
                                    <div class="form-group">
                                        <label for="slctTipoCreditos">¿TIPO DE CREDITOS?</label>
                                        <select  class="form-control form-control-sm sisbu-cursor-mano" id="slctTipoCreditos">
                                            <option  value="-1">Seleccionar...</option>
                                            <option  value="S">SEMESTRALES</option>
                                            <option  value="A">ANUALES</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6">
                                    <div class="form-group">
                                        <label for="txtCanCreditosMatriculados">N° CRÉDITOS MATRICULADOS
                                        </label>
                                        <input  type="number" class="form-control form-control-sm" id="txtCanCreditosMatriculados" maxlength="3">
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6">
                                    <div class="form-group">
                                        <label for="txtNumCursosDesaprobadosFichaSocieconomica">N° CURSOS DESAPROBADOS
                                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="Indica la cantidad de cursos desaprobados en todo tu historial académico. Si no tienes ningún curso ingresa 0" style="cursor: pointer" data-original-title=""></i>
                                        </label>
                                        <input  type="number" class="form-control form-control-sm" id="txtNumCursosDesaprobadosFichaSocieconomica" maxlength="3">
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6">
                                    <div class="form-group">
                                        <label for="txtNumCursosAbandonadosFichaSocieconomica">N° CURSOS ABANDONADOS
                                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="Indica la cantidad de cursos abandonados en todo tu historial académico. Si no tienes ningún curso ingresa 0" style="cursor: pointer" data-original-title=""></i>
                                        </label>
                                        <input  type="number" class="form-control form-control-sm" id="txtNumCursosAbandonadosFichaSocieconomica" maxlength="3">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <h6 class="text-primary mb-0">ASPECTO FAMILIAR</h6>
                                    <hr class="mt-1">
                                </div>
                                <div class="col-12">
                                    <div class="form-group">
                                        <label for="txtDomicilioPadreFichaSocieconomica">DOMICILIO DEL PADRE
                                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="Indica el domicilio actual del padre. Si no tienes esta información deja la caja de texto en blanco" style="cursor: pointer" data-original-title=""></i>
                                        </label>
                                        <input  type="text" class="form-control form-control-sm text-uppercase" id="txtDomicilioPadreFichaSocieconomica" maxlength="200">
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-group">
                                        <label for="txtDomicilioMadreFichaSocieconomica">DOMICILIO DE LA MADRE
                                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="Indica el domicilio actual de la madre. Si no tienes esta información deja la caja de texto en blanco" style="cursor: pointer" data-original-title=""></i>
                                        </label>
                                        <input  type="text" class="form-control form-control-sm text-uppercase" id="txtDomicilioMadreFichaSocieconomica" maxlength="200">
                                    </div>
                                </div>
                                <div class="col-lg-6 col-12 mb-4">
                                    <label for="txtDistritoPadre">DISTRITO DONDE VIVE EL PADRE</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control form-control-sm" id="txtDistritoPadre" aria-describedby="nombre" placeholder="Click en el botón para seleccionar. . ." disabled="">
                                        <div class="input-group-append">
                                            <button type="button" id="btnSeleccionarDistritoPadre" class="btn btn-primary btn-sm pulse-primary"><i class="icon icon-subscribe"></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-12 mb-4">
                                    <label for="txtDistritoMadre">DISTRITO DONDE VIVE LA MADRE</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control form-control-sm" id="txtDistritoMadre" aria-describedby="nombre" placeholder="Click en el botón para seleccionar. . ." disabled="">
                                        <div class="input-group-append">
                                            <button type="button" id="btnSeleccionarDistritoMadre" class="btn btn-primary btn-sm pulse-primary"><i class="icon icon-subscribe"></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-sm-6">
                                    <div class="form-group">
                                        <label for="txtRelacionPadresFichaSocieconomica">RELACIÓN DE PADRES</label>
                                        <select  class="form-control form-control-sm sisbu-cursor-mano" id="txtRelacionPadresFichaSocieconomica">
                                            <option value="-1">Seleccionar...</option>
                                            <option value="CONVIVIENTES">CONVIVIENTES</option>
                                            <option value="SEPARADOS">SEPARADOS</option>
                                            <option value="DIVORCIADO">DIVORCIADO</option>
                                            <option value="ORFANDAD PARCIAL">ORFANDAD PARCIAL</option>
                                            <option value="ORFANDAD TOTAL">ORFANDAD TOTAL</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-8 mb-4">
                                    <label for="slctConQuienViveFichaSocieconomica">¿CON QUIEN VIVES?</label>
                                    <div class="input-group">
                                        <select  class="form-control form-control-sm sisbu-cursor-mano" id="slctConQuienViveFichaSocieconomica">
                                            <option  value="-1">Seleccionar...</option>
                                            <option  value="AMBOS PADRES">AMBOS PADRES</option>
                                            <option  value="PADRE">PADRE</option>
                                            <option  value="MADRE">MADRE</option>
                                            <option  value="HERMANOS">HERMANOS</option>
                                            <option  value="CONYUQUE">CONYUQUE</option>
                                            <option  value="SOLO(A)">SOLO(A)</option>
                                            <option  value="OTRO">OTRA OPCIÓN</option>
                                        </select>
                                        <input style="display: none"  type="text" class="form-control form-control-sm text-uppercase" id="txtConQuienViveFichaSocieconomica" maxlength="100" placeholder="Ingesa con quien vives. . .">
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-group">
                                        <label for="slctRelacionFamiliaresFichaSocieconomica">LAS RELACIONES FAMILIARES SON</label>
                                        <select  class="form-control form-control-sm sisbu-cursor-mano" id="slctRelacionFamiliaresFichaSocieconomica">
                                            <option  value="-1">Seleccionar...</option>
                                            <option  value="BUENAS">BUENAS</option>
                                            <option  value="REGULARES">REGULARES</option>
                                            <option  value="MALAS">MALAS</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <h6 class="text-primary mb-0">ASPECTO ECONÓMICO</h6>
                                    <hr class="mt-1">
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="slctDependenciaEconomicaFichaSocioeconomica">DEPENDENCIA ECONÓMICA</label>
                                        <select  class="form-control form-control-sm" id="slctDependenciaEconomicaFichaSocioeconomica">
                                            <option value="-1">Seleccionar. . .</option>
                                            <option value="AMBOS PADRES">AMBOS PADRES</option>
                                            <option value="SOLO PAPÁ">SOLO PAPÁ</option>
                                            <option value="SOLO MAMÁ">SOLO MAMÁ</option>
                                            <option value="HERMANOS">HERMANOS</option>
                                            <option value="TIO">TIO</option>
                                            <option value="TIA">TIA</option>
                                            <option value="OTRO FAMILIAR">OTRO FAMILIAR</option>
                                            <option value="NADIE">NADIE</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="slctApoyoRecibeFichaSocioeconomica">EL APOYO QUE RECIBES ES</label>
                                        <select  class="form-control form-control-sm" id="slctApoyoRecibeFichaSocioeconomica">
                                            <option value="-1">Seleccionar. . .</option>
                                            <option value="INTEGRAL">INTEGRAL</option>
                                            <option value="PARCIAL">PARCIAL</option>
                                            <option value="NINGUNO">NINGUNO</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-12 mb-4">
                                    <label for="slctTrabajas">TRABAJAS</label>
                                    <div class="input-group">
                                        <select  class="form-control form-control-sm" id="slctTrabajas">
                                            <option value="-1">Seleccionar. . .</option>
                                            <option value="SI">SI</option>
                                            <option value="NO">NO</option>
                                        </select>
                                        <input style="display: none" type="text" class="form-control form-control-sm text-uppercase" id="txtActividadEconomicaDesempeniaFichaSocioeconomica" placeholder="Ingresa como trabajas. . ." maxlength="50">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <h6 class="text-primary mb-0">ASPECTO VIVIENDA ACTUAL</h6>
                                    <hr class="mt-1">
                                </div>
                                <div class="col-md-6 mb-4">
                                    <label for="slctTenenciaVivienda">TENENCIA DE VIVIENDA</label>
                                    <div class="input-group">
                                        <select  class="form-control form-control-sm" id="slctTenenciaVivienda">
                                            <option value="-1">Seleccionar. . .</option>
                                            <option value="PROPIA">PROPIA</option>
                                            <option value="ALQUILADA">ALQUILADA</option>
                                            <option value="ALQUILER VENTA">ALQUILER VENTA</option>
                                            <option value="ANTICRECES">ANTICRECES</option>
                                            <option value="GUARDERIA">GUARDERIA</option>
                                            <option value="OTRO">OTRO</option>
                                        </select>
                                        <input style="display: none" type="text" class="form-control form-control-sm text-uppercase" id="txtTenenciaViviendaFichaSocieconomica" maxlength="50" placeholder="Ingrese tipo de tenencia de vivienda">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="slctTipoViviendaFichaSocioeconomica">TIPO DE VIVIENDA</label>
                                        <select  class="form-control form-control-sm" id="slctTipoViviendaFichaSocioeconomica">
                                            <option value="-1">Seleccionar. . .</option>
                                            <option value="CASA">CASA</option>
                                            <option value="DEPARTAMENTO">DEPARTAMENTO</option>
                                            <option value="HABITACION">HABITACION</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label for="slctMaterialVivienda">MATERIAL DE VIVIENDA</label>
                                    <div class="input-group">
                                        <select  class="form-control form-control-sm" id="slctMaterialVivienda">
                                            <option value="-1">Seleccionar. . .</option>
                                            <option value="NOBLE">NOBLE</option>
                                            <option value="SILLAR">SILLAR</option>
                                            <option value="BLOQUETAS">BLOQUETAS</option>
                                            <option value="OTRO">OTRO</option>
                                        </select>
                                        <input style="display: none" type="text" class="form-control form-control-sm text-uppercase" id="txtMaterialViviendaFichaSocioeconomica" maxlength="50" placeholder="Ingresa el material de tu vivienda. . .">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="slctEstadoConstruccionFichaSocioeconomica">ESTADO DE CONSTRUCCIÓN</label>
                                        <select  class="form-control form-control-sm" id="slctEstadoConstruccionFichaSocioeconomica">
                                            <option value="-1">Seleccionar. . .</option>
                                            <option value="TERMINADA">TERMINADA</option>
                                            <option value="EN CONSTRUCCION">EN CONSTRUCCION</option>
                                            <option value="PROVICIONAL">PROVICIONAL</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <label for="txtServiciosViviendaFichaSocieconomica">SERVICIOS DE VIVIENDA</label>
                                    <div class="row mt-1">
                                        <div class="col-lg-2 col-md-3 col-sm-4">
                                            <div class="form-group custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input check-servicio-fs" id="checkboxLuzService" service="LUZ">
                                                <label class="custom-control-label sisbu-cursor-mano" for="checkboxLuzService">Luz</label>
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-3 col-sm-4">
                                            <div class="form-group custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input check-servicio-fs" id="checkboxAguaService" service="AGUA">
                                                <label class="custom-control-label sisbu-cursor-mano" for="checkboxAguaService">Agua</label>
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-3 col-sm-4">
                                            <div class="form-group custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input check-servicio-fs" id="checkboxDesagueService" service="DESAGUE">
                                                <label class="custom-control-label sisbu-cursor-mano" for="checkboxDesagueService">Desague</label>
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-3 col-sm-4">
                                            <div class="form-group custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input check-servicio-fs" id="checkboxTelefonoService" service="TELEFONO">
                                                <label class="custom-control-label sisbu-cursor-mano" for="checkboxTelefonoService">Teléfono</label>
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-3 col-sm-4">
                                            <div class="form-group custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input check-servicio-fs" id="checkboxTvPorCableService" service="TV POR CABLE">
                                                <label class="custom-control-label sisbu-cursor-mano" for="checkboxTvPorCableService">TV por cable</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-sm-6">
                                    <div class="form-group">
                                        <label for="slctServicioInternetFichaSocioeconomica">¿CUENTAS CON SERVICIO DE INTERNET?</label>
                                        <select  class="form-control form-control-sm" id="slctServicioInternetFichaSocioeconomica">
                                            <option value="-1">Seleccionar. . .</option>
                                            <option value="SI">SI</option>
                                            <option value="NO">NO</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-sm-6">
                                    <div class="form-group">
                                        <label for="slctTieneLaptopFichaSocioeconomica">¿CUENTAS CON LAPTOP O PC?</label>
                                        <select  class="form-control form-control-sm" id="slctTieneLaptopFichaSocioeconomica">
                                            <option value="-1">Seleccionar. . .</option>
                                            <option value="SI">SI</option>
                                            <option value="NO">NO</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-sm-6">
                                    <div class="form-group">
                                        <label for="slctCelPlanDatosFichaSocioeconomica">¿TIENES UN CEL. CON PLAN DE DATOS?</label>
                                        <select  class="form-control form-control-sm" id="slctCelPlanDatosFichaSocioeconomica">
                                            <option value="-1">Seleccionar. . .</option>
                                            <option value="SI">SI</option>
                                            <option value="NO">NO</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <h6 class="text-primary mb-0">DATOS SOBRE SALUD</h6>
                                    <hr class="mt-1">
                                </div>
                                <div class="col-lg-4 col-sm-6 mb-4">
                                    <label for="slctTipoSeguroFichaSocioeconomica">TIPO DE SEGURO</label>
                                    <div class="input-group">
                                        <select  class="form-control form-control-sm sisbu-cursor-mano" id="slctTipoSeguroFichaSocioeconomica">
                                            <option  value="-1">Seleccionar...</option>
                                            <option  value="ESSALUD">ESSALUD</option>
                                            <option  value="SIS">SIS</option>
                                            <option  value="SEGURO VOLUNTARIO UNIVERSITARIO">SEGURO VOLUNTARIO UNIVERSITARIO</option>
                                            <option  value="NO TENGO SEGURO">NO TENGO SEGURO</option>
                                            <option  value="OTRO">OTRO</option>
                                        </select>
                                        <input style="display: none" type="text" class="form-control form-control-sm" id="txtTipoSeguroFichaSocioeconomica" maxlength="50" placeholder="Ingresa tu tipo de seguro. . .">
                                    </div>
                                </div>
                                <div class="col-lg-8">
                                    <label for="slctPresentaDiscapacidad">¿TIENES ALGUNA DISCAPACIDAD?</label>
                                    <div class="input-group">
                                        <select  class="form-control form-control-sm" id="slctPresentaDiscapacidad">
                                            <option value="-1">Seleccionar. . .</option>
                                            <option value="SI">SI</option>
                                            <option value="NO">NO</option>
                                        </select>
                                        <input style="display: none" type="text" class="form-control form-control-sm" id="txtDiscapacidadFichaSocioeconomica" maxlength="100" placeholder="Ingresa tu discapacidad. . .">
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-12 text-right">
                                    <button class="btn btn-primary pulse-primary" id="btn-finalize-evuacion-socioeconomica">
                                        <i class="fas fa-check"></i>
                                        FANALIZAR
                                    </button>
                                </div>
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
                <div class="dt-card__header mb-0 pt-5 pb-5">
                    <!-- Card Heading -->
                    <div class="dt-card__heading">
                        <h3 class="dt-card__title  text-primary text-center" >LISTA DE DEPORTES</h3>
                        <input type="hidden" id="pageDeporteDetalle" value="1">
                    </div>
                    <!-- /card heading -->
                    <!-- Card Tools -->
                    <div class="dt-card__tools">
                        <button type="button" id="btnOpenDeporteDetalle" class="btn btn-primary btn-sm" data-toggle="tooltip" title="Agregar Deporte" ><i class="icon icon-addnew"></i> AGREGAR</button>
                    </div>
                    <!-- /card tools -->
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
                                <option value="5">05</option>
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
                                        <button type="button" id="btnCancelarDeporteDetalle" class="ml-5 btn btn-outline-primary btn-sm"><i class="icon icon-reply"></i> LISTA DE DEPORTES</button>
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
                <div class="dt-card__header mb-0 pt-5 pb-5">
                    <!-- Card Heading -->
                    <div class="dt-card__heading">
                        <h3 class="dt-card__title  text-primary text-center" >LISTA DE AFICIONES</h3>
                        <input type="hidden" id="pageAficionDetalle" value="1">
                    </div>
                    <!-- /card heading -->
                    <!-- Card Tools -->
                    <div class="dt-card__tools">
                        <button type="button" id="btnOpenAficionDetalle" class="btn btn-primary btn-sm"data-toggle="tooltip" title="Agregar Aficion" ><i class="icon icon-addnew"></i> AGREGAR</button>
                    </div>
                    <!-- /card tools -->
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
                                        <button type="button" id="btnCancelarAficionDetalle" class="ml-5 btn btn-outline-primary btn-sm"><i class="icon icon-reply"></i> LISTA DE AFICIONES</button>
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

<div class="row" id="row-option-odontologia" style="display: none">
    <div class="col-12">
        <div class="row" id="div-evaluaciones-odontologia">
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
                                        id="estimation-odontologia" data-fill="0"
                                        height="110" width="110"></canvas>
                            </div>
                            <div class="col-xl-8 col-md-12 col-sm-8">
                                <div class="pb-3 mb-3 border-bottom">
                                    <span class="display-4 d-inline-block mr-2 font-weight-500 text-dark" id="lblNumProcedimientosOdontologia">0</span><span
                                        class="font-weight-light f-16">Fichas</span>
                                </div>
                                <ul class="dt-list dt-list-col-6">
                                    <li class="dt-list__item">
                                        <span class="dot-shape dot-shape-lg bg-light-green mr-2"></span>
                                        <span class="d-inline-block" id="lblNumRespondidasOdontologia">0 Realizadas</span>
                                    </li>
                                    <li class="dt-list__item">
                                        <span class="dot-shape dot-shape-lg bg-light-pink mr-2"></span>
                                        <span class="d-inline-block" id="lblNumPendientesOdontologia">0 Pendientes</span>
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
                             id="div-content-evaluacion-odontologia">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" id="div-preguntas-evaluacion-odontologia" style="display: none">
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
                                <ul class="list-group list-group-flush" id="content-preguntas-evaluacion-odontologia">

                                </ul>
                            </div>
                            <div class="col-12 text-right">
                                <button class="btn btn-outline-primary" id="btn-cancelar-evaluation-odontologia">
                                    <i class="icon icon-reply"></i>
                                    Salir
                                </button>
                                <button class="btn btn-primary" id="btn-finalizar-evaluation-odontologia">
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
    <div class="col-12 text-center" id="div-regresar-selected-evaluation-odontologia">
        <button class="btn btn-outline-primary btn-regresar-selected-evaluation">
            <i class="icon icon-reply"></i>
            Seleccionar otra evaluación
        </button>
    </div>
</div>
            
<!--MODALES CARGNADO-->
<div class="modal" id="modalCargandoSelectedFichaSocieconomica" data-backdrop="static" data-keyboard="false" tabindex="-1"
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
                        Cargando aficion que practicas. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--T: DEPORTE SELECTED-->
<div id="ventanaModalSelectedDeporteC" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
     data-keyboard="false" style="padding-top: 0%; overflow-y: visible;background-color: rgba(0,0,0,.1)">
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
                                    <option value="50">50</option>
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
     data-keyboard="false" style="padding-top: 0%; overflow-y: visible;background-color: rgba(0,0,0,.1)">
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
                                    <option value="50">50</option>
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

<!--T: DISTRITO SELECTED-->
<div id="ventanaModalSelectedDistritoC" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
     data-keyboard="false" style="padding-top: 1%; overflow-y: visible;background-color: rgba(0,0,0,.2)">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content" style="border-color: #0085c1; border-width: 4px;">
            <div class="modal-header">
                <h5 class="mb-0" id="titleManagerDistritoC"><strong>[ 0 ]
                        DISTRITOS</strong></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pb-0 pt-0">
                <div class="row">
                    <div class="col-12">
                        <input type="hidden" id="pageDistritoC"
                               value="1">
                        <form id="FrmDistritoC">
                            <div class="row mt-3">
                                <div class="input-group col-12">
                                    <input type="text" id="txtFilterDistritoC"
                                           class="form-control form-control-sm mr-3" placeholder="INGRESE FILTRO . . .">
                                    <button type="submit" id="btnBuscarDistritoC"
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
                                            <th class="align-middle text-left">DISTRITO</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyDistritoC">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row mt-2 mb-2" style="display: none">
                            <div class="col-sm-4 mt-2">
                                <select id="sizePageDistritoC"
                                        class="form-control form-control-sm sisbu-cursor-mano combo-paginar">
                                    <option value="5">05</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>
                            <div class="col-sm-8 mt-2">
                                <nav aria-label="Page navigation">
                                    <ul id="paginationDistritoC"
                                        class="pagination justify-content-end">

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal" id="btnCancelSelectionDistritoC"><i class="fas fa-ban"></i>
                    CANCELAR</button>
                <button type="button" id="btn-selecionar-distritoc" class="btn btn-primary btn-xs"><i
                        class="fas fa-check"></i> SELECCIONAR</button>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoSelectedDistritoC" data-backdrop="static" data-keyboard="false" tabindex="-1"
     role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.3)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Cargando distritos. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>