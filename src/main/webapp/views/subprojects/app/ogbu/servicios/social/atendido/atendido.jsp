<%-- 
    Document   : atendido.jsp
    Created on : 28/08/2019, 09:48:09 AM
    Author     : Andres
--%>
<!-- Tab DATOS ATENDIDO -->
<div class="row d-block" id="btnListaAtendido">
    <!-- Card -->
    <div class="col-12 p-0 overflow-hidden">
        <!-- Card Header -->
        <div class="card-header bg-transparent pl-0">
            <h4 class="mb-0" id="titleManagerAtendido">[ 0 ] ATENDIDOS</h4>
            <input type="hidden" id="pageAtendido" value="1">
        </div>
        <!-- /card header -->
        <!-- Card Body -->
        <div class="card-body m-0 p-0 ">
            <form id="FrmAtendido" class=" search-box mw-100">
                <div class="input-group">
                    <input type="search" id="txtFilterAtendido" class="form-control form-control-sm"
                        placeholder="Filtrar DNI ..." data-toggle="tooltip" data-placement="left"
                        data-original-title="Buscar" type="search" />
                    <button type="submit" class="search-icon">
                        <i class="icon icon-search text-primary icon-lg"></i></button>

                </div>
            </form>
            <!-- Tables -->
            <!-- Card -->
            <div class="dt-card mt-4 dt-social-card animate-slide border border-primary border-w-2 mb-4">
                <!-- Card Body -->
                <div class="dt-card__body p-0  ">
                    <!-- Widget -->
                    <div class="dt-widget dt-widget-hl-item-space dt-widget-mb-item dt-widget-hover-bg"
                        id="tbodyAtendido">
                    </div>
                    <!-- /widget -->
                    <!-- /card body -->
                </div>
                <!-- /card -->
            </div>

            <!-- /tables -->
            <div class="row mt-2">
                <div class="col-md-2 col-sm-3 col-4">
                    <select id="sizePageAtendido" class="form-control form-control-sm select2-single">
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>
                <div class="col-md-10 col-sm-9 col-8">
                    <nav aria-label="Page navigation example">
                        <ul id="paginationAtendido" class="pagination justify-content-end">
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
        <!-- /card body -->
    </div>
    <!-- /card -->
</div>

<div class="row d-none" id="btnOpenAtendido">
    <!-- Card -->
    <div class="card overflow-hidden p-5">
        <div class="card-header bg-transparent">
            <h4 class="mb-0 text-center" id="txtTituloModalMan"> ATENDIDO</h4>

        </div>
        <form id="FrmAtendidoModal" autocomplete="off">

            <div class="row">
                <div class="col-lg-4 col-sm-6">
                    <div class="form-group">
                        <label for="txtTipoDocumentoAtendido">TIPO DE DOCUMENTO</label>
                        <select class="form-control form-control-sm sisbu-cursor-mano" id="txtTipoDocumentoAtendido"
                            disabled="">
                            <option value="1">DNI</option>
                            <option value="2">CARNET DE EXTRANJERIA</option>
                            <option value="3">OTRO</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                    <div class="form-group">
                        <label for="txtModalidadAtendido">MODALIDAD DE INGRESO</label>
                        <select class="form-control form-control-sm sisbu-cursor-mano" id="txtModalidadAtendido">
                            <option value="100">Seleccione. . .</option>
                            <option value="1">EXAMEN ORDINARIO</option>
                            <option value="2">DEPORTISTA CALIFICADO</option>
                            <option value="3">PRIMEROS PUESTOS</option>
                            <option value="4">INGRESANTE CPU</option>
                            <option value="5">CAMBIO DE UNIVERSIDAD</option>
                            <option value="6">GRADUADOS O TITULADOS</option>
                            <option value="7">5TO DE SECUNDARIA</option>
                            <option value="8">OTRO</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                    <div class="form-group">
                        <label for="txtTipoColegioAtendido">TIPO DE COLEGIO</label>
                        <select class="form-control form-control-sm sisbu-cursor-mano" id="txtTipoColegioAtendido">
                            <option value="-1">Seleccione. . .</option>
                            <option value="1">NACIONAL</option>
                            <option value="2">PARTICULAR</option>
                            <option value="3">OTRO</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                    <div class="form-group">
                        <label for="txtEstadoAtendido">ESTADO CIVIL</label>
                        <select class="form-control form-control-sm sisbu-cursor-mano" id="txtEstadoAtendido">
                            <option value="-1">Seleccionar...</option>
                            <option value="1">SOLTERO(A)</option>
                            <option value="2">CASADO(A)</option>
                            <option value="3">DIVORSIADO(A)</option>
                            <option value="4">VIUDO(A)</option>
                        </select>
                    </div>
                </div>

                <div class="col-lg-4 col-sm-6">
                    <div class="form-group">
                        <label for="txtCodigoAtendido">Cï¿½DIGO
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover"
                                data-trigger="hover" data-placement="top" title=""
                                data-content="Es el cï¿½digo ï¿½nico de estudiante. Si aï¿½n no sabes cual es tu cï¿½digo, deja la caja de texto en blanco"
                                style="cursor: pointer" data-original-title=""></i>
                        </label>
                        <input type="text" class="form-control form-control-sm" id="txtCodigoAtendido"
                            placeholder="Ingrese Cï¿½digo. . ." maxlength="7">
                    </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                    <div class="form-group">
                        <label for="txtNumeroDocumentoAtendido">Nï¿½ DOCUMENTO</label>
                        <input type="text" class="form-control form-control-sm" id="txtNumeroDocumentoAtendido"
                            placeholder="Ingrese nï¿½ documento. . ." maxlength="8">
                    </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                    <div class="form-group">
                        <label for="txtApPaternoAtendido">AP. PATERNO</label>
                        <input type="text" class="form-control form-control-sm" id="txtApPaternoAtendido"
                            placeholder="AP. PATERNO" maxlength="45">
                    </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                    <div class="form-group">
                        <label for="txtApMaternoAtendido">AP. MATERNO</label>
                        <input type="text" class="form-control form-control-sm" id="txtApMaternoAtendido"
                            placeholder="AP. MATERNO" maxlength="45">
                    </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                    <div class="form-group">
                        <label for="txtNombreAtendido">NOMBRES</label>
                        <input type="text" class="form-control form-control-sm" id="txtNombreAtendido"
                            placeholder="NOMBRES" maxlength="45">
                    </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                    <div class="form-group">
                        <label for="txtSexoAtendido">SEXO</label>
                        <select class="form-control form-control-sm" id="txtSexoAtendido">
                            <option value="-1">Seleccione. . .</option>
                            <option value="1">MASCULINO</option>
                            <option value="2">FEMENINO</option>
                            <option value="3">OTRO</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-4 col-sm-6 mb-3">
                    <label for="txtFechaNacAtendido">FECHA DE NACIMIENTO</label>
                    <div class="input-group">
                        <input type="text" class="form-control form-control-sm " id="txtFechaNacAtendido"
                            placeholder="DD/MM/AAAA">
                        <div class="input-group-append">
                            <button type="button" id="btnEliminarFechaNacAtendido" data-toggle="tooltip"
                                title="Eliminar Fecha" class="btn btn-primary btn-sm"><i
                                    class="fa fa-trash"></i></button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                    <div class="form-group">
                        <label for="txtCelularAtendido">CELULAR</label>
                        <input type="number" class="form-control form-control-sm" id="txtCelularAtendido"
                            placeholder="Ingrese celular. . ." maxlength="9">
                    </div>
                </div>
                <div class="col-lg-4 col-sm-12">
                    <div class="form-group">
                        <label for="txtEmailAtendido">EMAIL</label>
                        <input type="email" class="form-control form-control-sm" id="txtEmailAtendido"
                            placeholder="EMAIL" maxlength="100">
                    </div>
                </div>
                <div class="col-lg-8 col-12 mb-3">
                    <label for="txtEscuelaAtendido">ESCUELA
                        <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover"
                            data-placement="top" title="" data-content="Carrera profesional a la que ingresaste"
                            style="cursor: pointer" data-original-title=""></i>
                    </label>
                    <div class="input-group">
                        <input type="text" class="form-control form-control-sm" id="txtEscuelaAtendido"
                            aria-describedby="nombre" placeholder="Click en el boton para seleccionar. . ." disabled="">
                        <div class="input-group-append">
                            <button type="button" id="btnSeleccionarEscuela" class="btn btn-primary btn-sm"><i
                                    class="icon icon-subscribe"></i></button>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="form-group">
                        <label for="txtDireccionActualAtendido">DIRECCION ACTUAL
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover"
                                data-trigger="hover" data-placement="top" title=""
                                data-content="Direcciï¿½n donde vives actualmente. Si vives en un caserï¿½o ingresa tu direcciï¿½n y luego agrega tu caserï¿½o separado por un guiï¿½n. Ejm: #LOS PINOS - SAN MARTï¿½N"
                                style="cursor: pointer" data-original-title=""></i>
                        </label>
                        <input type="text" class="form-control form-control-sm" id="txtDireccionActualAtendido"
                            placeholder="Ingrese direcciï¿½n actual. . ." maxlength="80">
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="form-group">
                        <label for="txtDireccionProceAtendido">DIRECCION PROCEDENCIA
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover"
                                data-trigger="hover" data-placement="top" title=""
                                data-content="Direcciï¿½n de donde vienes. Si vienes de un caserï¿½o ingresa tu direcciï¿½n y luego agrega tu caserï¿½o separado por un guiï¿½n. Ejm: #LOS ROSALES - SAN JUAN"
                                style="cursor: pointer" data-original-title=""></i>
                        </label>
                        <input type="text" class="form-control form-control-sm" id="txtDireccionProceAtendido"
                            placeholder="Ingrese direcciï¿½n de procedencia" maxlength="80">
                    </div>
                </div>
                <div class="col-lg-6 col-12 mb-3">
                    <label for="txtDistritoActualAtendido">DISTRITO ACTUAL</label>
                    <div class="input-group">
                        <input type="text" class="form-control form-control-sm" id="txtDistritoActualAtendido"
                            aria-describedby="nombre" placeholder="Click en el boton para seleccionar. . ." disabled="">
                        <div class="input-group-append">
                            <button type="button" id="btnSeleccionarDistritoActual" class="btn btn-primary btn-sm"><i
                                    class="icon icon-subscribe"></i></button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-12 mb-3">
                    <label for="txtDistritoProcedenciaAtendido">DISTRITO PROCEDENCIA</label>
                    <div class="input-group">
                        <input type="text" class="form-control form-control-sm" id="txtDistritoProcedenciaAtendido"
                            aria-describedby="nombre" placeholder="Click en el boton para seleccionar. . ." disabled="">
                        <div class="input-group-append">
                            <button type="button" id="btnSeleccionarDistritoProcedencia"
                                class="btn btn-primary btn-sm"><i class="icon icon-subscribe"></i></button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12 text-center mt-3">
                    <button type="button" id="btnRegresar" class="btn btn-outline-primary btn-sm"><i
                            class="icon icon-reply"></i> CANCELAR</button>
                    <button type="submit" class="btn btn-primary btn-sm" id="btnGuardarPersonales">ACTUALIZAR
                        DATOS</button>
                </div>

            </div>
        </form>
    </div>
    <!-- /card -->
</div>

<!-- Tab DATOS FAMILIARES -->
<div class="row p-0 d-none" id="btnOpenFamiliar">

    <div class=" dt-card__header row m-0 p-0">
        <div class="col-lg-8">
            <label class="text-warning mb-2 mt-2">*Registra a todos tus familiares de primer orden es decir a
                pap&aacute;,
                mam&aacute; y hermanos(as).</label>
        </div>
        <div class="col-lg-4 text-right">
            <button type="button" class="btn btn-primary btn-sm" id="btnOpenNewFamiliar" data-toggle="tooltip"
                title="Agregar Familiar"><i class="icon icon-addnew"></i></button>
            <button type="button" class="btn btn-danger btn-sm " id="btnReporteFamiliar" data-toggle="tooltip"
                title="Descargar Lista de Familiares"><i class="icon icon-assignment "></i></button>
        </div>
        <div class="col-12">
            <h4 class="text-center text-primary mb-2" id="titleManagerFamiliar">LISTA DE FAMILIARES</h4>
        </div>
    </div>
    <!-- Card -->
    <div class="dt-card">
        <!-- Card Body -->
        <div class="dt-card__body p-0">
            <!-- Widget -->
            <div class="dt-widget dt-widget-hl-item-space dt-widget-mb-item dt-widget-hover-bg"
                id="tbodyDatosFamiliares">
            </div>
            <!-- /widget -->
            <!-- /card body -->
        </div>
        <!-- /card -->
    </div>
    <div class="form-group col-12 text-center">
        <button type="button" id="btnRegresarFamiliar" class="btn btn-outline-primary btn-sm"><i
                class="icon icon-reply"></i> REGRESAR</button>

    </div>

</div>
<!-- FICHA SOCIOECONMICA -->
<div class="row d-none" id="row-option-socioeconomico">
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
                                    <label for="slctTienesHijos">Tienes hijo(s)?</label>
                                    <div class="input-group">
                                        <select class="form-control form-control-sm sisbu-cursor-mano"
                                            id="slctTienesHijos">
                                            <option value="-1">Seleccionar...</option>
                                            <option value="SI">SI</option>
                                            <option value="NO">NO</option>
                                        </select>
                                        <input style="display: none" type="number" class="form-control form-control-sm"
                                            id="txtCantHijosFichaSocioeconomica" placeholder="Ingrese cant hijos. . ."
                                            maxlength="2">
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-group">
                                        <label for="txtNombreColegioFichaSocioeconomica">NOMBRE DE COLEGIO DE
                                            PROCEDENCIA
                                        </label>
                                        <input type="text" class="form-control form-control-sm text-uppercase"
                                            id="txtNombreColegioFichaSocioeconomica" placeholder="" maxlength="300">
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
                                        <select class="form-control form-control-sm sisbu-cursor-mano"
                                            id="slctAnioIngresoFichaSocioeconomica">
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6">
                                    <div class="form-group">
                                        <label for="slctCicloEstudioFichaSocioeconomica">CICLO DE ESTUDIOS
                                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover"
                                                data-trigger="hover" data-placement="top" title=""
                                                data-content="Indique el ciclo del curso de menor nivel"
                                                style="cursor: pointer" data-original-title=""></i>
                                        </label>
                                        <select class="form-control form-control-sm sisbu-cursor-mano"
                                            id="slctCicloEstudioFichaSocioeconomica">
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
                                        <label for="slctTipoCreditos">TIPO DE CREDITOS?</label>
                                        <select class="form-control form-control-sm sisbu-cursor-mano"
                                            id="slctTipoCreditos">
                                            <option value="-1">Seleccionar...</option>
                                            <option value="S">SEMESTRALES</option>
                                            <option value="A">ANUALES</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6">
                                    <div class="form-group">
                                        <label for="txtCanCreditosMatriculados">N° CREDITOS MATRICULADOS
                                        </label>
                                        <input type="number" class="form-control form-control-sm"
                                            id="txtCanCreditosMatriculados" maxlength="3">
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6">
                                    <div class="form-group">
                                        <label for="txtNumCursosDesaprobadosFichaSocieconomica">N° CURSOS DESAPROBADOS
                                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover"
                                                data-trigger="hover" data-placement="top" title=""
                                                data-content="Indica la cantidad de cursos desaprobados en todo tu historial acadï¿½mico. Si no tienes ningï¿½n curso ingresa 0"
                                                style="cursor: pointer" data-original-title=""></i>
                                        </label>
                                        <input type="number" class="form-control form-control-sm"
                                            id="txtNumCursosDesaprobadosFichaSocieconomica" maxlength="3">
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6">
                                    <div class="form-group">
                                        <label for="txtNumCursosAbandonadosFichaSocieconomica">N° CURSOS ABANDONADOS
                                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover"
                                                data-trigger="hover" data-placement="top" title=""
                                                data-content="Indica la cantidad de cursos abandonados en todo tu historial acadï¿½mico. Si no tienes ningï¿½n curso ingresa 0"
                                                style="cursor: pointer" data-original-title=""></i>
                                        </label>
                                        <input type="number" class="form-control form-control-sm"
                                            id="txtNumCursosAbandonadosFichaSocieconomica" maxlength="3">
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
                                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover"
                                                data-trigger="hover" data-placement="top" title=""
                                                data-content="Indica el domicilio actual del padre. Si no tienes esta informaciï¿½n deja la caja de texto en blanco"
                                                style="cursor: pointer" data-original-title=""></i>
                                        </label>
                                        <input type="text" class="form-control form-control-sm text-uppercase"
                                            id="txtDomicilioPadreFichaSocieconomica" maxlength="200">
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-group">
                                        <label for="txtDomicilioMadreFichaSocieconomica">DOMICILIO DE LA MADRE
                                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover"
                                                data-trigger="hover" data-placement="top" title=""
                                                data-content="Indica el domicilio actual de la madre. Si no tienes esta informaciï¿½n deja la caja de texto en blanco"
                                                style="cursor: pointer" data-original-title=""></i>
                                        </label>
                                        <input type="text" class="form-control form-control-sm text-uppercase"
                                            id="txtDomicilioMadreFichaSocieconomica" maxlength="200">
                                    </div>
                                </div>
                                <div class="col-lg-6 col-12 mb-4">
                                    <label for="txtDistritoPadre">DISTRITO DONDE VIVE EL PADRE</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control form-control-sm" id="txtDistritoPadre"
                                            aria-describedby="nombre"
                                            placeholder="Click en el boton para seleccionar. . ." disabled="">
                                        <div class="input-group-append">
                                            <button type="button" id="btnSeleccionarDistritoPadre"
                                                class="btn btn-primary btn-sm pulse-primary"><i
                                                    class="icon icon-subscribe"></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-12 mb-4">
                                    <label for="txtDistritoMadre">DISTRITO DONDE VIVE LA MADRE</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control form-control-sm" id="txtDistritoMadre"
                                            aria-describedby="nombre"
                                            placeholder="Click en el boton para seleccionar. . ." disabled="">
                                        <div class="input-group-append">
                                            <button type="button" id="btnSeleccionarDistritoMadre"
                                                class="btn btn-primary btn-sm pulse-primary"><i
                                                    class="icon icon-subscribe"></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-sm-6">
                                    <div class="form-group">
                                        <label for="txtRelacionPadresFichaSocieconomica">RELACIÓN DE PADRES</label>
                                        <select class="form-control form-control-sm sisbu-cursor-mano"
                                            id="txtRelacionPadresFichaSocieconomica">
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
                                        <select class="form-control form-control-sm sisbu-cursor-mano"
                                            id="slctConQuienViveFichaSocieconomica">
                                            <option value="-1">Seleccionar...</option>
                                            <option value="AMBOS PADRES">AMBOS PADRES</option>
                                            <option value="PADRE">PADRE</option>
                                            <option value="MADRE">MADRE</option>
                                            <option value="HERMANOS">HERMANOS</option>
                                            <option value="CONYUQUE">CONYUQUE</option>
                                            <option value="SOLO(A)">SOLO(A)</option>
                                            <option value="OTRO">OTRA OPCIÓN</option>
                                        </select>
                                        <input style="display: none" type="text"
                                            class="form-control form-control-sm text-uppercase"
                                            id="txtConQuienViveFichaSocieconomica" maxlength="100"
                                            placeholder="Ingesa con quien vives. . .">
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-group">
                                        <label for="slctRelacionFamiliaresFichaSocieconomica">LAS RELACIONES FAMILIARES
                                            SON</label>
                                        <select class="form-control form-control-sm sisbu-cursor-mano"
                                            id="slctRelacionFamiliaresFichaSocieconomica">
                                            <option value="-1">Seleccionar...</option>
                                            <option value="BUENAS">BUENAS</option>
                                            <option value="REGULARES">REGULARES</option>
                                            <option value="MALAS">MALAS</option>
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
                                        <label for="slctDependenciaEconomicaFichaSocioeconomica">DEPENDENCIA
                                            ECONÓMICA</label>
                                        <select class="form-control form-control-sm"
                                            id="slctDependenciaEconomicaFichaSocioeconomica">
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
                                        <select class="form-control form-control-sm"
                                            id="slctApoyoRecibeFichaSocioeconomica">
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
                                        <select class="form-control form-control-sm" id="slctTrabajas">
                                            <option value="-1">Seleccionar. . .</option>
                                            <option value="SI">SI</option>
                                            <option value="NO">NO</option>
                                        </select>
                                        <input style="display: none" type="text"
                                            class="form-control form-control-sm text-uppercase"
                                            id="txtActividadEconomicaDesempeniaFichaSocioeconomica"
                                            placeholder="Ingresa la labor que desempeñas. . ." maxlength="50">
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
                                        <select class="form-control form-control-sm" id="slctTenenciaVivienda">
                                            <option value="-1">Seleccionar. . .</option>
                                            <option value="PROPIA">PROPIA</option>
                                            <option value="ALQUILADA">ALQUILADA</option>
                                            <option value="ALQUILER VENTA">ALQUILER VENTA</option>
                                            <option value="ANTICRECES">ANTICRECES</option>
                                            <option value="GUARDERIA">GUARDERIA</option>
                                            <option value="OTRO">OTRO</option>
                                        </select>
                                        <input style="display: none" type="text"
                                            class="form-control form-control-sm text-uppercase"
                                            id="txtTenenciaViviendaFichaSocieconomica" maxlength="50"
                                            placeholder="Ingrese tipo de tenencia de vivienda">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="slctTipoViviendaFichaSocioeconomica">TIPO DE VIVIENDA</label>
                                        <select class="form-control form-control-sm"
                                            id="slctTipoViviendaFichaSocioeconomica">
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
                                        <select class="form-control form-control-sm" id="slctMaterialVivienda">
                                            <option value="-1">Seleccionar. . .</option>
                                            <option value="NOBLE">NOBLE</option>
                                            <option value="SILLAR">SILLAR</option>
                                            <option value="BLOQUETAS">BLOQUETAS</option>
                                            <option value="OTRO">OTRO</option>
                                        </select>
                                        <input style="display: none" type="text"
                                            class="form-control form-control-sm text-uppercase"
                                            id="txtMaterialViviendaFichaSocioeconomica" maxlength="50"
                                            placeholder="Ingresa el material de tu vivienda. . .">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="slctEstadoConstruccionFichaSocioeconomica">ESTADO DE
                                            CONSTRUCCIÓN</label>
                                        <select class="form-control form-control-sm"
                                            id="slctEstadoConstruccionFichaSocioeconomica">
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
                                                <input type="checkbox" class="custom-control-input check-servicio-fs"
                                                    id="checkboxLuzService" service="LUZ">
                                                <label class="custom-control-label sisbu-cursor-mano"
                                                    for="checkboxLuzService">Luz</label>
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-3 col-sm-4">
                                            <div class="form-group custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input check-servicio-fs"
                                                    id="checkboxAguaService" service="AGUA">
                                                <label class="custom-control-label sisbu-cursor-mano"
                                                    for="checkboxAguaService">Agua</label>
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-3 col-sm-4">
                                            <div class="form-group custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input check-servicio-fs"
                                                    id="checkboxDesagueService" service="DESAGUE">
                                                <label class="custom-control-label sisbu-cursor-mano"
                                                    for="checkboxDesagueService">Desague</label>
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-3 col-sm-4">
                                            <div class="form-group custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input check-servicio-fs"
                                                    id="checkboxTelefonoService" service="TELEFONO">
                                                <label class="custom-control-label sisbu-cursor-mano"
                                                    for="checkboxTelefonoService">Teléfono</label>
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-3 col-sm-4">
                                            <div class="form-group custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input check-servicio-fs"
                                                    id="checkboxTvPorCableService" service="TV POR CABLE">
                                                <label class="custom-control-label sisbu-cursor-mano"
                                                    for="checkboxTvPorCableService">TV por cable</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-sm-6">
                                    <div class="form-group">
                                        <label for="slctServicioInternetFichaSocioeconomica">¿CUENTAS CON SERVICIO DE
                                            INTERNET?</label>
                                        <select class="form-control form-control-sm"
                                            id="slctServicioInternetFichaSocioeconomica">
                                            <option value="-1">Seleccionar. . .</option>
                                            <option value="SI">SI</option>
                                            <option value="NO">NO</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-sm-6">
                                    <div class="form-group">
                                        <label for="slctTieneLaptopFichaSocioeconomica">¿CUENTAS CON LAPTOP O
                                            PC?</label>
                                        <select class="form-control form-control-sm"
                                            id="slctTieneLaptopFichaSocioeconomica">
                                            <option value="-1">Seleccionar. . .</option>
                                            <option value="SI">SI</option>
                                            <option value="NO">NO</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-sm-6">
                                    <div class="form-group">
                                        <label for="slctCelPlanDatosFichaSocioeconomica">¿TIENES UN CEL. CON PLAN DE
                                            DATOS?</label>
                                        <select class="form-control form-control-sm"
                                            id="slctCelPlanDatosFichaSocioeconomica">
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
                                        <select class="form-control form-control-sm sisbu-cursor-mano"
                                            id="slctTipoSeguroFichaSocioeconomica">
                                            <option value="-1">Seleccionar...</option>
                                            <option value="ESSALUD">ESSALUD</option>
                                            <option value="SIS">SIS</option>
                                            <option value="SEGURO VOLUNTARIO UNIVERSITARIO">SEGURO VOLUNTARIO
                                                UNIVERSITARIO</option>
                                            <option value="NO TENGO SEGURO">NO TENGO SEGURO</option>
                                            <option value="OTRO">OTRO</option>
                                        </select>
                                        <input style="display: none" type="text" class="form-control form-control-sm"
                                            id="txtTipoSeguroFichaSocioeconomica" maxlength="50"
                                            placeholder="Ingresa tu tipo de seguro. . .">
                                    </div>
                                </div>
                                <div class="col-lg-8">
                                    <label for="slctPresentaDiscapacidad">¿TIENES ALGUNA DISCAPACIDAD?</label>
                                    <div class="input-group">
                                        <select class="form-control form-control-sm" id="slctPresentaDiscapacidad">
                                            <option value="-1">Seleccionar. . .</option>
                                            <option value="SI">SI</option>
                                            <option value="NO">NO</option>
                                        </select>
                                        <input style="display: none" type="text" class="form-control form-control-sm"
                                            id="txtDiscapacidadFichaSocioeconomica" maxlength="100"
                                            placeholder="Ingresa tu discapacidad. . .">
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-12 text-right">
                                    <button class="btn btn-primary pulse-primary"
                                        id="btn-finalize-evuacion-socioeconomica">
                                        <i class="fas fa-check"></i>
                                        FINALIZAR
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-12 text-center">
        <button id="div-regresar-selected-evaluation-socioeconomico" class="btn btn-outline-primary">

            <i class="icon icon-reply"></i>
            Seleccionar otra evaluaci&oacute;n
        </button>
    </div>
</div>
<!--T: modal cargando atendido-->
<div class="modal fade" id="modalCargandoAtendido" data-backdrop="static" data-keyboard="false" tabindex="-1"
    role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                        aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Cargando Atendidos. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--T: FAMILIARES SELECTED-->
<div class="modal fade overflow-auto" id="ventanaModalFamiliar" data-backdrop="static" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">

            <div class="modal-header">
                <h6 class="modal-title" id="txtTituloModalFamiliar"></h6>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">x</span>
                </button>
            </div>
            <form id="FrmFamiliarAtendido" autocomplete="off">
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="form-group ">
                                <label for="txtNombreFamiliar">NOMBRE COMPLETO</label>
                                <input type="text" class="form-control form-control-sm text-uppercase"
                                    id="txtNombreFamiliar" placeholder="Ingrese nombre completo. . ." maxlength="100">
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group ">
                                <label for="txtParentescoFamiliar">PARENTESCO</label>
                                <select class="form-control form-control-sm sisbu-cursor-mano"
                                    id="txtParentescoFamiliar">
                                    <option value="-1">Seleccione. . .</option>
                                    <option value="1">PAP&Aacute;</option>
                                    <option value="2">MAM&Aacute;</option>
                                    <option value="3">HERMANO(A)</option>
                                    <option value="4">TIO(A)</option>
                                    <option value="5">OTRO</option>

                                </select>
                            </div>
                        </div>
                        <div class="col-lg-6 mb-3">
                            <label for="txtFechaNaciFamiliar">FECHA NACIMIENTO
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover"
                                    data-trigger="hover" data-placement="top" title=""
                                    data-content="Si no sabes puedes dejar la caja de texto en blanco"
                                    style="cursor: pointer" data-original-title=""></i>
                            </label>
                            <div class="input-group ">
                                <input type="text" class="form-control form-control-sm" id="txtFechaNaciFamiliar"
                                    placeholder="DD/MM/AAAA">
                                <div class="input-group-append">
                                    <button type="button" id="btnEliminarFechaNacFamiliar" data-toggle="tooltip"
                                        title="Eliminar Fecha" class="btn btn-primary btn-sm"><i
                                            class="fa fa-trash"></i></button>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group ">
                                <label for="txtEstadoFamiliar">ESTADO CIVIL</label>
                                <select class="form-control form-control-sm sisbu-cursor-mano" id="txtEstadoFamiliar">
                                    <option value="-1">Seleccione. . .</option>
                                    <option value="1">SOLTERO</option>
                                    <option value="2">CASADO</option>
                                    <option value="3">DIVORCIADO</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group ">
                                <label for="txtNivelInstFamiliar">NIVEL INSTRUCCI&Oacute;N</label>
                                <select class="form-control form-control-sm sisbu-cursor-mano"
                                    id="txtNivelInstFamiliar">
                                    <option value="-1">Seleccione. . .</option>
                                    <option value="1">SIN ESTUDIOS</option>
                                    <option value="2">PRIMARIA</option>
                                    <option value="3">SECUNDARIA</option>
                                    <option value="4">T&Eacute;CNICO</option>
                                    <option value="5">UNIVERSIDAD</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group ">
                                <label for="txtIngresosFamiliar">INGRESOS
                                    <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover"
                                        data-trigger="hover" data-placement="top" title=""
                                        data-content="Coloca el monto mensual que tiene de ingresos tu familiar"
                                        style="cursor: pointer" data-original-title=""></i>
                                </label>
                                <input type="number" class="form-control form-control-sm" id="txtIngresosFamiliar"
                                    placeholder="INGRESOS">
                            </div>
                        </div>
                        <div class="col-lg-6 mb-3">
                            <label for="txtOcupacionFamiliarPaciente">OCUPACI&Oacute;N
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover"
                                    data-trigger="hover" data-placement="top" title=""
                                    data-content="Es a lo que se dedica tu familiar" style="cursor: pointer"
                                    data-original-title=""></i>
                            </label>
                            <div class="input-group">
                                <input type="text" class="form-control form-control-sm"
                                    id="txtOcupacionFamiliarPaciente" aria-describedby="nombre"
                                    placeholder="Click en el boton para seleccionar. . ." disabled="">
                                <div class="input-group-append">
                                    <button type="button" id="btnSeleccionarOcupacion" class="btn btn-primary btn-sm"><i
                                            class="icon icon-subscribe"></i></button>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group ">
                                <label for="slctSufreAlgunaEnfermedad">¿SUFRE ALGUNA ENFERMEDAD?
                                    <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover"
                                        data-trigger="hover" data-placement="top" title=""
                                        data-content="Indica si el familiar sufre de alguna enfermedad"
                                        style="cursor: pointer" data-original-title=""></i>
                                </label>
                                <select class="form-control form-control-sm sisbu-cursor-mano"
                                    id="slctSufreAlgunaEnfermedad">
                                    <option value="-1">Seleccione. . .</option>
                                    <option value="S">SI</option>
                                    <option value="N">NO</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-12 col-enfermedad">
                            <div class="form-group ">
                                <label for="txtEnfermedadFamiliar">ENFERMEDAD</label>
                                <input type="text" class="form-control form-control-sm text-uppercase"
                                    id="txtEnfermedadFamiliar" placeholder="Ingrese la enfermedad. . ." maxlength="100">
                            </div>
                        </div>
                        <div class="col-12 col-enfermedad">
                            <div class="form-group ">
                                <label for="txtLugarTratamientoFamiliar">LUGAR DE TRATAMIENTO</label>
                                <input type="text" class="form-control form-control-sm text-uppercase"
                                    id="txtLugarTratamientoFamiliar" placeholder="Ingrese lugar de tratamiento. . ."
                                    maxlength="300">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-primary btn-sm" data-dismiss="modal">CANCELAR</button>
                    <button type="submit" class="btn btn-primary btn-sm" id="btnGuardarAddMenus">GUARDAR</button>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="modal fade" id="modalCargandoFamiliar" data-backdrop="static" data-keyboard="false" tabindex="-1"
    role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;background-color: rgba(0,0,0,.2)"
    aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                        aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Cargando familiares. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--T: DISTRITO SELECTED-->
<div id="ventanaModalSelectedDistritoC" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
    data-keyboard="false" style="padding-top: 2%; overflow-y: visible;background-color: rgba(0,0,0,.2)">
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
                        <input type="hidden" id="pageDistritoC" value="1">
                        <form id="FrmDistritoC">
                            <div class="row mt-3">
                                <div class="input-group col-12">
                                    <input type="text" id="txtFilterDistritoC" class="form-control form-control-sm mr-3"
                                        placeholder="INGRESE FILTRO . . .">
                                    <button type="submit" id="btnBuscarDistritoC" class="btn btn-primary btn-xs"
                                        data-toggle="tooltip" title="Buscar Pregunta"><i class="fa fa-search"
                                            aria-hidden="true"></i>
                                        BUSCAR</button>
                                </div>
                            </div>
                        </form>
                        <div class="row pl-5 pr-5 mb-2">
                            <div class="table-responsive">
                                <table class="table mb-0 table-fluid">
                                    <thead>
                                        <tr>
                                            <th class="align-middle text-left">Distrito</th>
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
                                    <ul id="paginationDistritoC" class="pagination justify-content-end">

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal"
                    id="btnCancelSelectionDistritoC"><i class="fas fa-ban"></i>
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

<!--T: ESCUELA SELECTED-->
<div id="ventanaModalSelectedEscuelaC" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
    data-keyboard="false" style="padding-top: 2%; overflow-y: visible;background-color: rgba(0,0,0,.2)">
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
                        <input type="hidden" id="pageEscuelaC" value="1">
                        <form id="FrmEscuelaC">
                            <div class="row mt-3">
                                <div class="input-group col-12">
                                    <input type="text" id="txtFilterEscuelaC" class="form-control form-control-sm mr-3"
                                        placeholder="INGRESE FILTRO . . .">
                                    <button type="submit" id="btnBuscarEscuelaC" class="btn btn-primary btn-xs"
                                        data-toggle="tooltip" title="Buscar Pregunta"><i class="fa fa-search"
                                            aria-hidden="true"></i>
                                        BUSCAR</button>
                                </div>
                            </div>
                        </form>
                        <div class="row pl-5 pr-5 mb-2">
                            <div class="table-responsive">
                                <table class="table mb-0 table-fluid">
                                    <thead>
                                        <tr>
                                            <th class="align-middle text-left">Escuela</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyEscuelaC">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row mt-2 mb-2" style="display: none">
                            <div class="col-sm-4 mt-2">
                                <select id="sizePageEscuelaC"
                                    class="form-control form-control-sm sisbu-cursor-mano combo-paginar">
                                    <option value="5">05</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>
                            <div class="col-sm-8 mt-2">
                                <nav aria-label="Page navigation">
                                    <ul id="paginationEscuelaC" class="pagination justify-content-end">

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal"
                    id="btnCancelSelectionEscuelaC"><i class="fas fa-ban"></i>
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


<!--T: OCUPACION SELECTED-->
<div id="ventanaModalSelectedOcupacionC" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
    data-keyboard="false" style="padding-top: 2%; overflow-y: visible;background-color: rgba(0,0,0,.2)">
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="border-color: #0085c1; border-width: 4px;">
            <div class="modal-header">
                <h5 class="mb-0" id="titleManagerOcupacionC"><strong>[ 0 ]
                        OCUPACIONES</strong></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pb-0 pt-0">
                <div class="row">
                    <div class="col-12">
                        <input type="hidden" id="pageOcupacionC" value="1">
                        <form id="FrmOcupacionC">
                            <div class="row mt-3">
                                <div class="input-group col-12">
                                    <input type="text" id="txtFilterOcupacionC"
                                        class="form-control form-control-sm mr-3" placeholder="INGRESE FILTRO . . .">
                                    <button type="submit" id="btnBuscarOcupacionC" class="btn btn-primary btn-xs"
                                        data-toggle="tooltip" title="Buscar Pregunta"><i class="fa fa-search"
                                            aria-hidden="true"></i>
                                        BUSCAR</button>
                                </div>
                            </div>
                        </form>
                        <div class="row pl-5 pr-5 mb-2">
                            <div class="table-responsive">
                                <table class="table mb-0 table-fluid">
                                    <thead>
                                        <tr>
                                            <th class="align-middle text-left">Ocupacion</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyOcupacionC">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row mt-2 mb-2" style="display: none">
                            <div class="col-sm-4 mt-2">
                                <select id="sizePageOcupacionC"
                                    class="form-control form-control-sm sisbu-cursor-mano combo-paginar">
                                    <option value="5">05</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>
                            <div class="col-sm-8 mt-2">
                                <nav aria-label="Page navigation">
                                    <ul id="paginationOcupacionC" class="pagination justify-content-end">

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal"
                    id="btnCancelSelectionOcupacionC"><i class="fas fa-ban"></i>
                    CANCELAR</button>
                <button type="button" id="btn-selecionar-ocupacionc" class="btn btn-primary btn-xs"><i
                        class="fas fa-check"></i> SELECCIONAR</button>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoSelectedOcupacionC" data-backdrop="static" data-keyboard="false" tabindex="-1"
    role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.3)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                        aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Cargando ocupaciones. . .
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

<div class="modal" id="modalCargandoVDYA" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog"
    aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.1)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                        aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Verificando Procedimiento del Ciclo. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modalCargandoSelectedFichaSocieconomica" data-backdrop="static" data-keyboard="false"
    tabindex="-1" role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div id="lblModalCargandoEvaluacion" class="progress-bar progress-bar-striped progress-bar-animated"
                        role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Procesando Evaluacion del Atendido. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>