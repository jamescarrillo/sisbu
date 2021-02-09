<%-- 
    Document   : paciente.jsp
    Created on : 06/12/2019, 09:48:09 AM
    Author     : JamesCarrillo
--%>

<div class="content-pacientes">

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
            <div class="card-body p-0 pt-2">
                <form id="FrmPaciente" class="search-box mw-100 left-side-icon pb-3">
                    <div class="input-group search-box" style="max-width: 100%;">
                        <input type="search" id="txtFilterPaciente" class="form-control form-control-sm"
                               placeholder="FILTRO. . ." data-toggle="tooltip" data-placement="left"
                               data-original-title="Buscar">
                        <button type="submit" class="search-icon">
                            <i class="icon icon-search icon-lg"></i></button>

                    </div>
                </form>
                <!-- Card -->

                <!-- Card Body -->
                <div class="dt-card__body p-0  ">
                    <div class="w-100 ps-custom-scrollbar mb-0 ps pb-5">
                        <!-- Widget -->
                        <div class="dt-widget dt-widget-hl-item-space dt-widget-mb-item dt-widget-hover-bg dt-social-card border border-w-2 border-light-teal"
                             id="tbodyPaciente" style="min-width: 725px;">
                        </div>
                        <!-- /widget -->
                    </div>
                    <!-- /card body -->
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

    <div class="row justify-content-center" id="row-options-paciente-selected" style="margin-top: 50px; display: none">
        <!-- Grid Item -->
        <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6">
            <!-- Card -->
            <div class="dt-card sisbu-cursor-mano" id="btnIrFIchaAdmision">
                <!-- Card Body -->
                <div class="dt-card__body d-flex flex-sm-column text-center">
                    <div class="mb-sm-7">
                        <i class="icon icon-attendance dt-icon-bg bg-primary text-primary"></i>
                    </div>
                    <a class="h2 mb-0 font-weight-500">Ficha <br>Admision</a>
                </div>
                <!-- /card body -->
            </div>
            <!-- /card -->
        </div>
        <!-- /grid item -->
        <!-- Grid Item -->
        <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6">
            <!-- Card -->
            <div class="dt-card sisbu-cursor-mano" id="btnIrHistoriaPsicologica">
                <!-- Card Body -->
                <div class="dt-card__body d-flex flex-sm-column text-center">
                    <div class="mb-sm-7">
                        <i class="icon icon-attendance dt-icon-bg bg-warning text-primary"></i>
                    </div>
                    <a class="h2 mb-0 font-weight-500">Historia Psicologica</a>
                </div>
                <!-- /card body -->
            </div>
            <!-- /card -->
        </div>
        <!-- /grid item -->
        <!-- Grid Item -->
        <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6">
            <!-- Card -->
            <div class="dt-card sisbu-cursor-mano" id="btnIrFichaSeguimiento">
                <!-- Card Body -->
                <div class="dt-card__body d-flex flex-sm-column text-center">
                    <div class="mb-sm-7">
                        <i class="icon icon-attendance dt-icon-bg bg-success text-primary"></i>
                    </div>
                    <a class="h2 mb-0 font-weight-500">Ficha de Seguimiento</a>
                </div>
                <!-- /card body -->
            </div>
            <!-- /card -->
        </div>
        <!-- /grid item -->
        <!-- Grid Item -->
        <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6">
            <!-- Card -->
            <div class="dt-card sisbu-cursor-mano" id="btnIrEvaluaciones">
                <!-- Card Body -->
                <div class="dt-card__body d-flex flex-sm-column text-center">
                    <div class="mb-sm-7">
                        <i class="icon icon-list dt-icon-bg bg-danger text-primary"></i>
                    </div>
                    <a class="h2 mb-0 font-weight-500">Evaluaciones Psicologicas</a>
                </div>
                <!-- /card body -->
            </div>
            <!-- /card -->
        </div>
        <!-- /grid item -->
    </div>

    <!-- Tab FICHA ADMISION -->
    <div class="row justify-content-center" id="row-ficha-admision" style="display: none">
        <div class="col-12">
            <div class="row">
                <div class="col-12">
                    <h4 class="text-primary mb-0">FICHA DE ADMISION</h4>
                    <hr>
                </div>
                <div class="col-12 text-center">
                    <h5 class="text-success">DATOS PERSONALES</h5>
                </div>
                <div class="col-lg-4 col-sm-6">
                    <div class="form-group">
                        <label for="txtTipoDocumentoPacienteFichaAdmision">TIPO DE DOCUMENTO</label>
                        <select  class="form-control form-control-sm sisbu-cursor-mano" id="txtTipoDocumentoPacienteFichaAdmision" disabled="">
                            <option  value="1">DNI</option>
                            <option  value="2">CARNET DE EXTRANJERIA</option>
                            <option  value="3">OTRO</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                    <div class="form-group">
                        <label for="txtModalidadPacienteFichaAdmision">MODALIDAD DE INGRESO</label>
                        <select  class="form-control form-control-sm sisbu-cursor-mano" id="txtModalidadPacienteFichaAdmision" disabled="">
                            <option   value="100">Seleccione. . .</option>
                            <option   value="1">EXAMEN ORDINARIO</option>
                            <option  value="2">DEPORTISTA CALIFICADO</option>
                            <option  value="3">PRIMEROS PUESTOS</option>
                            <option  value="4">INGRESANTE CPU</option>
                            <option  value="5">CAMBIO DE UNIVERSIDAD</option>
                            <option  value="6">GRADUADOS O TITULADOS</option>
                            <option  value="7">5TO DE SECUNDARIA</option>
                            <option  value="8">OTRO</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                    <div class="form-group">
                        <label for="txtTipoColegioPacienteTipoColegioFichaAdmision">TIPO DE COLEGIO</label>
                        <select  class="form-control form-control-sm sisbu-cursor-mano" id="txtTipoColegioPacienteTipoColegioFichaAdmision" disabled="">
                            <option   value="-1">Seleccione. . .</option>
                            <option   value="1">NACIONAL</option>
                            <option  value="2">PARTICULAR</option>
                            <option  value="3">OTRO</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                    <div class="form-group">
                        <label for="txtEstadoPacienteEstadoCivilFichaAdmision">ESTADO CIVIL</label>
                        <select  class="form-control form-control-sm sisbu-cursor-mano" id="txtEstadoPacienteEstadoCivilFichaAdmision" disabled="">
                            <option  value="-1">Seleccionar...</option>
                            <option  value="1">SOLTERO(A)</option>
                            <option  value="2">CASADO(A)</option>
                            <option  value="3">DIVORCIADO(A)</option>
                            <option  value="4">VIUDO(A)</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                    <div class="form-group">
                        <label for="txtCodigoPacienteFichaAdmision">CÓDIGO
                        </label>
                        <input  type="text" class="form-control form-control-sm" id="txtCodigoPacienteFichaAdmision" placeholder="" maxlength="7" disabled="">
                    </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                    <div class="form-group">
                        <label for="txtNumeroDocumentoPacienteFichaAdmision">N° DOCUMENTO</label>
                        <input  type="text" class="form-control form-control-sm" id="txtNumeroDocumentoPacienteFichaAdmision" placeholder="" maxlength="8" disabled="">
                    </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                    <div class="form-group">
                        <label for="txtApPaternoPacienteFichaAdmision">AP. PATERNO</label>
                        <input  type="text" class="form-control form-control-sm" id="txtApPaternoPacienteFichaAdmision" placeholder="" maxlength="45" disabled="">
                    </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                    <div class="form-group">
                        <label for="txtApMaternoPacienteFichaAdmision">AP. MATERNO</label>
                        <input  type="text" class="form-control form-control-sm" id="txtApMaternoPacienteFichaAdmision" placeholder="" maxlength="45" disabled="">
                    </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                    <div class="form-group">
                        <label for="txtNombrePacienteFichaAdmision">NOMBRES</label>
                        <input  type="text" class="form-control form-control-sm" id="txtNombrePacienteFichaAdmision" placeholder="" maxlength="45" disabled="">
                    </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                    <div class="form-group">
                        <label for="txtSexoPacienteFichaAdmision">SEXO</label>
                        <select  class="form-control form-control-sm" id="txtSexoPacienteFichaAdmision" disabled="">
                            <option value="-1">Seleccione. . .</option>
                            <option value="1">MASCULINO</option>
                            <option  value="2">FEMENINO</option>
                            <option  value="3">OTRO</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-4 col-sm-6 mb-3">
                    <label for="txtFechaNacPacienteFichaAdmision">FECHA DE NACIMIENTO</label>
                    <div class="input-group">
                        <input  type="text" class="form-control form-control-sm" id="txtFechaNacPacienteFichaAdmision" placeholder="DD/MM/AAAA" disabled="">
                    </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                    <div class="form-group">
                        <label for="txtCelularPacienteFichaAdmision">CELULAR</label>
                        <input  type="number" class="form-control form-control-sm" id="txtCelularPacienteFichaAdmision" placeholder="" maxlength="9" disabled="">
                    </div>
                </div>
                <div class="col-lg-4 col-sm-12">
                    <div class="form-group">
                        <label for="txtEmailPacienteFichaAdmision">EMAIL</label>
                        <input  type="email" class="form-control form-control-sm" id="txtEmailPacienteFichaAdmision" placeholder="" maxlength="100" disabled="">
                    </div>
                </div>
                <div class="col-lg-8 col-12 mb-3">
                    <label for="txtEscuelaPacienteFichaAdmision">ESCUELA
                    </label>
                    <div class="input-group">
                        <input type="text" class="form-control form-control-sm" id="txtEscuelaPacienteFichaAdmision" aria-describedby="nombre" placeholder="" disabled="">
                    </div>
                </div>
                <div class="col-lg-4 col-12 mb-3">
                    <label for="txtDistritoActualPacienteFichaAdmision">DISTRITO ACTUAL</label>
                    <div class="input-group">
                        <input type="text" class="form-control form-control-sm" id="txtDistritoActualPacienteFichaAdmision" aria-describedby="nombre" placeholder="" disabled="">
                    </div>
                </div>
                <div class="col-lg-8 col-12 mb-3">
                    <div class="form-group">
                        <label for="txtDireccionActualPacienteFichaAdmision">DIRECCIÓN ACTUAL
                        </label>
                        <input  type="text" class="form-control form-control-sm" id="txtDireccionActualPacienteFichaAdmision" placeholder="" maxlength="80" disabled="">
                    </div>
                </div>
                <div class="col-lg-4 col-12 mb-3">
                    <label for="txtDistritoProcedenciaPacienteFichaAdmision">DISTRITO PROCEDENCIA</label>
                    <div class="input-group">
                        <input type="text" class="form-control form-control-sm" id="txtDistritoProcedenciaPacienteFichaAdmision" aria-describedby="nombre" placeholder="" disabled="">
                    </div>
                </div>
                <div class=col-lg-8 col-12 mb-3">
                    <div class="form-group">
                        <label for="txtDireccionProcePacienteFichaAdmision">DIRECCIÓN PROCEDENCIA
                        </label>
                        <input  type="text" class="form-control form-control-sm" id="txtDireccionProcePacienteFichaAdmision" placeholder="" maxlength="80" disabled="">
                    </div>
                </div>
                <div class="col-12 mb-3">
                    <label for="txtCicloAcademicoPacienteFichaAdmision">CICLO ACADÉMICO INGRESO
                    </label>
                    <div class="input-group">
                        <input type="text" class="form-control form-control-sm" id="txtCicloAcademicoPacienteFichaAdmision" aria-describedby="nombre" placeholder="" disabled="">
                    </div>
                </div>
                <div class="col-12 text-center">
                    <h5 class="text-success">AREA ACADEMICA</h5>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div class="form-group">
                        <label for="txtAnioIngresasteUNPRG">
                            Año que ingresaste a la UNPRG?
                        </label>
                        <input  type="text" class="form-control form-control-sm" id="txtAnioIngresasteUNPRG" placeholder="" maxlength="7">
                    </div>
                </div>
                <div class="col-lg-8 col-md-6">
                    <div class="form-group">
                        <label for="txtBuscasteInformacionAcercaTuCarrera">
                            Buscaste informacion acerca de tu carrera?
                        </label>
                        <select  class="form-control form-control-sm sisbu-cursor-mano" id="txtBuscasteInformacionAcercaTuCarrera">
                            <option value="-1">Seleccionar...</option>
                            <option value="SI">SI</option>
                            <option value="NO">NO</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div class="form-group">
                        <label for="txtElegisteTuCarreraIniciativaPropia">
                            Elegiste tu carrera por iniciativa Propia?
                        </label>
                        <select  class="form-control form-control-sm sisbu-cursor-mano" id="txtElegisteTuCarreraIniciativaPropia">
                            <option value="-1">Seleccionar...</option>
                            <option value="SI">SI</option>
                            <option value="NO">NO</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-8 col-md-6">
                    <div class="form-group">
                        <label for="txtAlgunaVezPensasteCambiarteCarrera">
                            Alguna vez pensaste en cambiarte de carrera?
                        </label>
                        <select  class="form-control form-control-sm sisbu-cursor-mano" id="txtAlgunaVezPensasteCambiarteCarrera">
                            <option value="-1">Seleccionar...</option>
                            <option value="SI">SI</option>
                            <option value="NO">NO</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="form-group">
                        <label for="txtComoEsTuActitudHaciaElEstudio">
                            Como es tu actitud hacia el estudio?
                        </label>
                        <textarea class="form-control" id="txtComoEsTuActitudHaciaElEstudio" placeholder="" maxlength="500" rows="4">
                        </textarea>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="form-group">
                        <label for="txtCualesSonTusHabitosDeEstudio">
                            Cuales son tus habitos de estudio?
                        </label>
                        <textarea class="form-control" id="txtCualesSonTusHabitosDeEstudio" placeholder="" maxlength="500" rows="4">
                        </textarea>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="form-group">
                        <label for="txtComoOrganizasTuTiempo">
                            Como organizas tu tiempo?
                        </label>
                        <textarea class="form-control" id="txtComoOrganizasTuTiempo" placeholder="" maxlength="500" rows="4">
                        </textarea>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="form-group">
                        <label for="txtCreasQueTeHasAdaptadoAlAmbitoAcademico">
                            Crees que te has adaptado al ambito academico?
                        </label>
                        <textarea class="form-control" id="txtCreasQueTeHasAdaptadoAlAmbitoAcademico" placeholder="" maxlength="500" rows="4">
                        </textarea>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="form-group">
                        <label for="txtDescribeLasRelacionesDeAmistadDentroDeLaUniversidad">
                            Describe las relaciones de amistad dentro de la universidad con tus compañeros de clase. ¿Son satisfactorias? ¿Presentas dificultades?
                        </label>
                        <textarea class="form-control" id="txtDescribeLasRelacionesDeAmistadDentroDeLaUniversidad" placeholder="" maxlength="800" rows="4">
                        </textarea>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="form-group">
                        <label for="txtNuevosAspectosPersonalesPorMedioDeLaCarreraQueElegiste">
                            Desarrollas nuevos aspectos personales por medio de la carrera que elegiste?
                        </label>
                        <textarea class="form-control" id="txtNuevosAspectosPersonalesPorMedioDeLaCarreraQueElegiste" placeholder="" maxlength="800" rows="4">
                        </textarea>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="form-group">
                        <label for="txtDescribeteComoEstudiante">
                            Describete como estudiante
                        </label>
                        <textarea class="form-control" id="txtDescribeteComoEstudiante" placeholder="" maxlength="500" rows="4">
                        </textarea>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="form-group">
                        <label for="txtComoEsTuRendimientoAcademico">
                            Como es tu rendimiento academico?
                        </label>
                        <textarea class="form-control" id="" placeholder="txtComoEsTuRendimientoAcademico" maxlength="500" rows="4">
                        </textarea>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="form-group">
                        <label for="txtAdemasDeLosConocimientosDeLaUNPRGInvestigas">
                            Ademas de los conocimientos de la UNPRG, investigas?
                        </label>
                        <textarea class="form-control" id="txtAdemasDeLosConocimientosDeLaUNPRGInvestigas" placeholder="" maxlength="500" rows="4">
                        </textarea>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="form-group">
                        <label for="txtQueEsperasCoseguirDeTuCarrera">
                            Que esperas conseguir de tu carrera?
                        </label>
                        <textarea class="form-control" id="txtQueEsperasCoseguirDeTuCarrera" placeholder="" maxlength="500" rows="4">
                        </textarea>
                    </div>
                </div>
                <div class="col-12 text-center">
                    <h5 class="text-success">INFORMACION FAMILIAR</h5>
                </div>
                <div class="col-12 ">
                    <div class="table-responsive">
                        <table class="table mb-0">
                            <thead class="bg-primary" style="line-height: 1.0;">
                                <tr>
                                    <th class="text-uppercase text-white pt-3" scope="col" style="font-weight: 500;width: 10%">ACCIÓN</th>
                                    <th class="text-uppercase text-white pt-3" scope="col" style="font-weight: 500;">NOMBRE COMPLETO</th>
                                    <th class="text-uppercase text-white pt-3" scope="col" style="font-weight: 500;width: 10%">FECHA NACIMIENTO</th>
                                    <th class="text-uppercase text-white pt-3" scope="col" style="font-weight: 500;width: 20%">ESTADO CIVIL/<br>NIVEL INSTRUCCIÓN</th>
                                    <th class="text-uppercase text-white pt-3" scope="col" style="font-weight: 500;width: 10%">PARENTESCO</th>
                                </tr>
                            </thead>
                            <tbody id="tbodyDatosFamiliares" class="overflow-auto" >
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="form-group">
                        <label for="txtComoDescribiriasATuFamilia">
                            Como describirias a tu familia?
                        </label>
                        <textarea class="form-control" id="txtComoDescribiriasATuFamilia" placeholder="" maxlength="500" rows="4">
                        </textarea>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="form-group">
                        <label for="txtComoDiscribirisaLaRelacionConTuPadre">
                            Como describirias la relacion con tu padre?
                        </label>
                        <textarea class="form-control" id="txtComoDiscribirisaLaRelacionConTuPadre" placeholder="" maxlength="500" rows="4">
                        </textarea>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="form-group">
                        <label for="txtComoDiscribirisaLaRelacionConTuMadre">
                            Como describirias la relacion con tu madre?
                        </label>
                        <textarea class="form-control" id="txtComoDiscribirisaLaRelacionConTuMadre" placeholder="" maxlength="500" rows="4">
                        </textarea>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="form-group">
                        <label for="txtComoDiscribirisaLaRelacionConTusHermanos">
                            Como describirias la relacion con tus hermanos?
                        </label>
                        <textarea class="form-control" id="txtComoDiscribirisaLaRelacionConTusHermanos" placeholder="" maxlength="500" rows="4">
                        </textarea>
                    </div>
                </div>
                <div class="col-12 text-center">
                    <h5 class="text-success">INFORMACION REFERENTE</h5>
                </div>
                <div class="col-lg-6">
                    <div class="form-group">
                        <label for="txtComoTeDescribes">
                            Como te describes?
                        </label>
                        <textarea class="form-control" id="txtComoTeDescribes" placeholder="" maxlength="500" rows="4">
                        </textarea>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="form-group">
                        <label for="txtTiensMetasCualesSonAMedianoYLargoPlazo">
                            ¿Tienes metas?¿Cuales son a mediano y largo plaxo?
                        </label>
                        <textarea class="form-control" id="txtTiensMetasCualesSonAMedianoYLargoPlazo" placeholder="" maxlength="500" rows="4">
                        </textarea>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="form-group">
                        <label for="txtSiPuedierasCambiarAlgoDeTuPersonalidadQueSeria">
                            Si pudieras cambiar algo de tu personalidad, ¿Que seria?
                        </label>
                        <textarea class="form-control" id="txtSiPuedierasCambiarAlgoDeTuPersonalidadQueSeria" placeholder="" maxlength="500" rows="4">
                        </textarea>
                    </div>
                </div>
                <div class="col-12 text-center">
                    <h5 class="text-success">INFORMACION SOBRE MOTIVO CONSULTA</h5>
                </div>
                <div class="col-lg-6">
                    <div class="form-group">
                        <label for="txtHasRecibidoTerapiaPsicologicaUOrientacionPsicopedagogicaAnteriormente">
                            Has recibido terapia psicologica u orientacion psicopedagogica anteriormente?
                        </label>
                        <textarea class="form-control" id="txtHasRecibidoTerapiaPsicologicaUOrientacionPsicopedagogicaAnteriormente" placeholder="" maxlength="500" rows="4">
                        </textarea>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="form-group">
                        <label for="txtCuandoComensasteASentirteAsiDescribeteConTusPropiasPalabras">
                            ¿Cuando comensaste a sentirte asi? ¿Describete con tus propias palabras?
                        </label>
                        <textarea class="form-control" id="txtCuandoComensasteASentirteAsiDescribeteConTusPropiasPalabras" placeholder="" maxlength="500" rows="4">
                        </textarea>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="form-group">
                        <label for="txtAnteriormenteHabiasTenidoEseProblemaQueHicisteParaSuperarLaSituacion">
                            Anteriormente habias tenido ese problema? ¿Que hiciste entonces para superar la situacion?
                        </label>
                        <textarea class="form-control" id="txtAnteriormenteHabiasTenidoEseProblemaQueHicisteParaSuperarLaSituacion" placeholder="" maxlength="500" rows="4">
                        </textarea>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="form-group">
                        <label for="txtQueObstaculizaParaQueTuProblemaSeaResueltoComoInterfiereEnTuVidaYTusEstudios">
                            Que obstaculiza para que tu problema sea resuelto? ¿Como interfiere en tu vida y en tus estudios?
                        </label>
                        <textarea class="form-control" id="" placeholder="txtQueObstaculizaParaQueTuProblemaSeaResueltoComoInterfiereEnTuVidaYTusEstudios" maxlength="500" rows="4">
                        </textarea>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="form-group">
                        <label for="txtComoConsiderasQueSeriaTuVidaSiNoExistieraEsteProblema">
                            Como consideras que seria tu vida, si no existiera este problema?
                        </label>
                        <textarea class="form-control" id="txtComoConsiderasQueSeriaTuVidaSiNoExistieraEsteProblema" placeholder="" maxlength="500" rows="4">
                        </textarea>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="form-group">
                        <label for="txtQueEstasHaciendoOEstasDispuestoHacerParaDarSolucionATuSItuacion">
                            ¿Que estas haciendo o estas dispuesto a hacer para dar solucion a tu situacion?¿Con que habilidades cuentas para dar solucion a tu problema?
                        </label>
                        <textarea class="form-control" id="txtQueEstasHaciendoOEstasDispuestoHacerParaDarSolucionATuSItuacion" placeholder="" maxlength="500" rows="4">
                        </textarea>
                    </div>
                </div>
                <div class="col-12">
                    <div class="form-group">
                        <label for="">
                            Que areas de tu vida te gustaria trabajar?
                        </label>
                    </div>
                </div>
                <div class="col-12 ">
                    <div class="table-responsive">
                        <table class="table mb-0">
                            <thead class="bg-primary" style="line-height: 1.0;">
                                <tr>
                                    <th class="text-uppercase text-white pt-3" scope="col" style="font-weight: 500;width: 30%">AREA</th>
                                    <th class="text-uppercase text-white pt-3" scope="col" style="font-weight: 500;">TEMA (accion,pensamiento,emocion)</th>
                                </tr>
                            </thead>
                            <tbody class="overflow-auto" >
                                <tr>
                                    <td>Conmigo Mismo</td>
                                    <td>
                                        <textarea class="form-control" id="txtAreaTrabajarConmigoMismo" placeholder="" maxlength="500" rows="3">
                                        </textarea> 
                                    </td>
                                </tr>
                                <tr>
                                    <td>Familia</td>
                                    <td>
                                        <textarea class="form-control" id="txtAreaTrabajarFamilia" placeholder="" maxlength="500" rows="3">
                                        </textarea> 
                                    </td>
                                </tr>
                                <tr>
                                    <td>Pareja y Amigos</td>
                                    <td>
                                        <textarea class="form-control" id="txtAreaTrabajarParejaYAmigos" placeholder="" maxlength="500" rows="3">
                                        </textarea> 
                                    </td>
                                </tr><tr>
                                    <td>Academicos y trabajo</td>
                                    <td>
                                        <textarea class="form-control" id="txtAreaTrabajarAcademicosYTrabajo" placeholder="" maxlength="500" rows="3">
                                        </textarea> 
                                    </td>
                                </tr>
                                <tr>
                                    <td>Otros</td>
                                    <td>
                                        <textarea class="form-control" id="txtAreaTrabajarOtros" placeholder="" maxlength="500" rows="3">
                                        </textarea> 
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="col-12">
                    <div class="form-group">
                        <label for="txtSiElApoyoPsicologicoTuvieraExitoQueCambiosObservariasEnTuConducta">
                            Si el apoyo psicologico tuviera exito, ¿Que cambios observarias en tu conducta y como lo notarian los demas?
                        </label>
                        <textarea class="form-control" id="" placeholder="txtSiElApoyoPsicologicoTuvieraExitoQueCambiosObservariasEnTuConducta" maxlength="500" rows="4">
                        </textarea>
                    </div>
                </div>
                <div class="col-12">
                    
                </div>

            </div>
        </div>
        <!--
        
                <div class="col-lg-6">
                    <div class="form-group">
                        <label for="">
                        </label>
                        <textarea class="form-control" id="" placeholder="" maxlength="500" rows="4">
                        </textarea>
                    </div>
                </div>
        
        <div class="col-lg-8 col-md-6">
                    <div class="form-group">
                        <label for="txt">
                        </label>
                        <select  class="form-control form-control-sm sisbu-cursor-mano" id="txt">
                            <option value="-1">Seleccionar...</option>
                            <option value="SI">SI</option>
                            <option value="NO">NO</option>
                        </select>
                    </div>
                </div>
        
        
        
        
        
        
        -->

        <div class="col-12 text-center">
            <button class="btn btn-primary btn-xs btn-close-option-manager-paciente-selected"><i class="icon icon-reply"></i> Regresar</button>
        </div>
    </div>

    <!-- Tab HISTORIA PSICOLOGICA -->
    <div class="row justify-content-center" id="row-historia-psicologica" style="display: none">
        <div class="col-12">
            <h4>Historia psicologica</h4>
        </div>
        <div class="col-12 text-center">
            <button class="btn btn-primary btn-xs btn-close-option-manager-paciente-selected"><i class="icon icon-reply"></i> Regresar</button>
        </div>
    </div>

    <!-- Tab FICHA SEGUIMIENTO -->
    <div class="row justify-content-center" id="row-ficha-seguimiento" style="display: none">
        <div class="col-12">
            <h4>Ficha de Seguimiento</h4>
        </div>
        <div class="col-12 text-center">
            <button class="btn btn-primary btn-xs btn-close-option-manager-paciente-selected"><i class="icon icon-reply"></i> Regresar</button>
        </div>
    </div>

    <!-- Tab EVALUACIONES -->
    <div class="col-lg-12  p-0" id="row-evaluaciones" style="display: none">
        <!-- Grid Item -->
        <div class="col-12 p-0 order-xl-3">
            <!-- Card Header EVALUACIONES -->
            <!-- /card heading -->
            <div class="dt-card__header mb-2">
                <!-- Card Tools -->
                <div class="dt-card__tools">
                    <button data-toggle="tooltip" title="Regresar" type="button" id="btnCerrar"
                            class="btn btn-outline-primary btn-sm ">
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
                <div class="dt-card__header mb-2">
                    <!-- Card Tools -->
                    <div class="dt-card__tools">
                        <button data-toggle="tooltip" title="Regresar" type="button" class="btn btn-outline-primary btn-sm 
                                btn-close-resultados">
                            <i class="icon icon-reply icon-lg"></i></button>
                    </div>
                    <!-- /card tools -->
                    <div class="dt-card__heading text-center">
                        <h3 class="dt-card__title text-primary">Puntajes por &Aacute;reas</h3>
                    </div>


                </div>
                <!-- /card header -->
                <div class="w-100 ps-custom-scrollbar mb-0 ps pb-5">
                    <!-- Card Body -->
                    <div class="dt-card__body p-3" style="min-width: 725px;">
                        <!-- Widget -->
                        <div class="dt-widget form-row">
                            <div class="col-lg-2 col-3">
                                <!-- Widget Item -->
                                <div class="dt-widget__item p-1">
                                    <!-- Widget Info -->
                                    <div class="dt-widget__info  text-center" style="min-width: 100%;">
                                        <span class="h6 font-weight-500">&Aacute;REA
                                        </span>
                                    </div>
                                    <!-- /widget info -->
                                </div>
                                <!-- /widgets item -->
                            </div>
                            <div class="col-lg-10 col-9 pr-0">
                                <!-- Widget Item -->
                                <div class="dt-widget__item p-1">
                                    <!-- Widget Info -->
                                    <div class="dt-widget__info text-center"style="min-width: 130px;">
                                        <span class="h6 font-weight-500">SUB&Aacute;REA
                                        </span>
                                    </div>
                                    <!-- /widget info -->
                                    <!-- Widget Info -->
                                    <div class="dt-widget__info text-center">
                                        <span class="h6 font-weight-500">N° ITEMS
                                        </span>
                                    </div>
                                    <!-- /widget info -->
                                    <!-- Widget Info -->
                                    <div class="dt-widget__info  text-center">
                                        <span class="h6 font-weight-500">PUNTAJE CONVERTIDO
                                        </span>
                                    </div>
                                    <!-- /widget info -->
                                    <!-- Widget Info -->
                                    <div class="dt-widget__info  text-center">
                                        <span class="h6 font-weight-500">OPERACI&Oacute;N
                                        </span>
                                    </div>
                                    <!-- /widget info -->


                                    <!-- Widget Info -->
                                    <div class="dt-widget__info text-center">
                                        <span class="h6 font-weight-500">PUNTAJE M&Aacute;XIMO
                                        </span>
                                    </div>
                                    <!-- /widget info -->
                                    <!-- Widget Info -->
                                    <div class="dt-widget__info text-center">
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

                </div>
                <!-- /card body -->
                <!-- /card -->

            </div>
        </div>
        <!-- /card -->
    </div>

    <!-- Tab RESULTADO DE EVALUACIONES PREGUNTAS -->
    <div class="col-lg-12 p-0" id="row-resultado-evaluacione-preguntas" style="display: none">
        <!-- Grid Item -->
        <div class="col-lg-12 p-0 order-xl-3">
            <!-- Card Header EVALUACIONES -->
            <!-- /card heading -->
            <div class="dt-card__header mb-2">
                <!-- Card Tools -->
                <div class="dt-card__tools">
                    <button data-toggle="tooltip" title="Regresar" type="button" class="btn btn-outline-primary btn-sm 
                            btn-close-resultados-evaluacion">
                        <i class="icon icon-reply icon-lg"></i></button>
                </div>
                <!-- /card tools -->
                <!-- Card Heading -->
                <div class="dt-card__heading">
                    <h3 id="title-respuesta-evaluacion" class="dt-card__title  text-primary text-center">RESULTADO DE
                        EVALUACIï¿½N</h3>
                </div>
                <!-- Card Tools -->
                <div class="dt-card__tools">
                    <button id="btnOpenPromedioArea" 
                            class="btn btn-outline-warning btn-sm 
                            ">Puntajes por &Aacute;reas
                    </button>
                </div>
                <!-- /card tools -->
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
                                    <label class="mb-2 text-primary">1. ï¿½Cuando tengo que hacer una tarea, normalmente la dejo para ï¿½ltimo minuto?
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
                    <h4 id="titleModalPreviewReporte"></h4>
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

<!--MODAL CARGANDO FICHA_ADMISION -->
<div class="modal fade" id="modalCargandoFichaAdmisionPsicologica" data-backdrop="static" data-keyboard="false" tabindex="-1"
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