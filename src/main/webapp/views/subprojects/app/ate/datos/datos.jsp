<%-- 
    Document   : comida.jsp
    Created on : 28/08/2019, 09:48:09 AM
    Author     : Andres
--%>

<div class="row">
    <div class="col-xl-12">
        <!-- Card -->
        <div class="card mb-0 " id="openPaciente">
            <!-- Card Header -->
            <div class="card-header">
                <!-- Tab Navigation -->
                <ul class="card-header-pills nav nav-pills nav-fill" role="tablist">
                    <li class="nav-item">
                        <a id="buttonDatosPersonales" class="nav-link show active" data-toggle="tab" 
                           href="#tab-pane-15" role="tab" aria-controls="tab-pane-15"
                           aria-="true">
                            DATOS PERSONALES</a>
                    </li>
                    <li class="nav-item">
                        <a id="buttonDatosFamiliares" class="nav-link" data-toggle="tab" href="#tab-pane-17" 
                           role="tab" aria-controls="tab-pane-17" aria-="false">
                            DATOS FAMILIARES</a>
                    </li>
                </ul>
                <!-- /tab navigation -->
            </div>
            <!-- /card header -->

            <!-- Tab Content -->
            <div class="tab-content p-5 ">

                <!-- Tab DATOS PERSONALES -->
                <div id="tab-pane-15" class="tab-pane show active ">
                    <form id="FrmPersonalPaciente" autocomplete="off">
                        <div class="row">
                            <div class="col-lg-4 col-sm-6">
                                <div class="form-group">
                                    <label for="txtTipoDocumentoPaciente">TIPO DE DOCUMENTO</label>
                                    <select  class="form-control form-control-sm sisbu-cursor-mano" id="txtTipoDocumentoPaciente" disabled="">
                                        <option  value="1">DNI</option>
                                        <option  value="2">CARNET DE EXTRANJERIA</option>
                                        <option  value="3">OTRO</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-4 col-sm-6">
                                <div class="form-group">
                                    <label for="txtModalidadPaciente">MODALIDAD DE INGRESO</label>
                                    <select  class="form-control form-control-sm sisbu-cursor-mano" id="txtModalidadPaciente">
                                        <option   value="100">Seleccione. . .</option>
                                        <option   value="1">EXAMEN ORDINARIO</option>
                                        <option  value="2">DEPORTISTA CALIFICADO</option>
                                        <option  value="3">PRIMEROS PUESTOS</option>
                                        <option  value="4">INGRESANTE CPU-(CICLO ACAD�MICO)</option>
                                        <option  value="5">CAMBIO DE UNIVERSIDAD</option>
                                        <option  value="6">GRADUADOS O TITULADOS</option>
                                        <option  value="7">5TO DE SECUNDARIA</option>
                                        <option  value="8">OTRO</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-4 col-sm-6">
                                <div class="form-group">
                                    <label for="txtTipoColegioPaciente">TIPO DE COLEGIO</label>
                                    <select  class="form-control form-control-sm sisbu-cursor-mano" id="txtTipoColegioPaciente">
                                        <option   value="-1">Seleccione. . .</option>
                                        <option   value="1">NACIONAL</option>
                                        <option  value="2">PARTICULAR</option>
                                        <option  value="3">OTRO</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-4 col-sm-6">
                                <div class="form-group">
                                    <label for="txtEstadoPaciente">ESTADO CIVIL</label>
                                    <select  class="form-control form-control-sm sisbu-cursor-mano" id="txtEstadoPaciente">
                                        <option  value="-1">Seleccionar...</option>
                                        <option  value="1">SOLTERO(A)</option>
                                        <option  value="2">CASADO(A)</option>
                                        <option  value="3">DIVORSIADO(A)</option>
                                        <option  value="4">VIUDO(A)</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-lg-4 col-sm-6">
                                <div class="form-group">
                                    <label for="txtCodigoPaciente">C�DIGO</label>
                                    <input  type="text" class="form-control form-control-sm" id="txtCodigoPaciente" placeholder="Ingrese C�digo. . ." maxlength="7">
                                </div>
                            </div>
                            <div class="col-lg-4 col-sm-6">
                                <div class="form-group">
                                    <label for="txtNumeroDocumentoPaciente">N� DOCUMENTO</label>
                                    <input  type="text" class="form-control form-control-sm" id="txtNumeroDocumentoPaciente" placeholder="Ingrese n� documento. . ." maxlength="8">
                                </div>
                            </div>
                            <div class="col-lg-4 col-sm-6">
                                <div class="form-group">
                                    <label for="txtApPaternoPaciente">AP. PATERNO</label>
                                    <input  type="text" class="form-control form-control-sm" id="txtApPaternoPaciente" placeholder="AP. PATERNO" maxlength="45">
                                </div>
                            </div>
                            <div class="col-lg-4 col-sm-6">
                                <div class="form-group">
                                    <label for="txtApMaternoPaciente">AP. MATERNO</label>
                                    <input  type="text" class="form-control form-control-sm" id="txtApMaternoPaciente" placeholder="AP. MATERNO" maxlength="45">
                                </div>
                            </div>
                            <div class="col-lg-4 col-sm-6">
                                <div class="form-group">
                                    <label for="txtNombrePaciente">NOMBRES</label>
                                    <input  type="text" class="form-control form-control-sm" id="txtNombrePaciente" placeholder="NOMBRES" maxlength="45">
                                </div>
                            </div>
                            <div class="col-lg-4 col-sm-6">
                                <div class="form-group">
                                    <label for="txtSexoPaciente">SEXO</label>
                                    <select  class="form-control form-control-sm" id="txtSexoPaciente">
                                        <option value="-1">Seleccione. . .</option>
                                        <option value="1">MASCULINO</option>
                                        <option  value="2">FEMENINO</option>
                                        <option  value="3">OTRO</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-4 col-sm-6">
                                <div class="form-group">
                                    <label for="txtFechaNacPaciente">FECHA DE NACIMIENTO</label>
                                    <input  type="text" class="form-control form-control-sm" id="txtFechaNacPaciente" placeholder="DD/MM/AAAA">
                                </div>
                            </div>
                            <div class="col-lg-4 col-sm-6">
                                <div class="form-group">
                                    <label for="txtCelularPaciente">CELULAR</label>
                                    <input  type="number" class="form-control form-control-sm" id="txtCelularPaciente" placeholder="Ingrese celular. . ." maxlength="9">
                                </div>
                            </div>
                            <div class="col-lg-4 col-sm-12">
                                <div class="form-group">
                                    <label for="txtEmailPaciente">EMAIL</label>
                                    <input  type="email" class="form-control form-control-sm" id="txtEmailPaciente" placeholder="EMAIL" maxlength="100">
                                </div>
                            </div>
                            <div class="col-lg-8 col-sm-12 mb-3" >
                                <label for="txtEscuelaPaciente">ESCUELA
                                    <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="Carrera profesional a la que ingresaste" style="cursor: pointer" data-original-title=""></i>
                                </label>
                                <div class="search-box " style="max-width: 100%;">
                                    <div class="input-group">
                                        <input class="form-control form-control-sm" placeholder="Seleccione ..." id="txtFilterEscuela"  type="search">
                                        <span class="search-icon"><i class="icon icon-search icon-lg"></i></span>
                                    </div>
                                    <div id="resultadoEscuela" class="list-group position-absolute w-100 bg-light overflow-auto" style="z-index:6;max-height: 85px;"> 
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label for="txtDireccionActualPaciente">DIRECCION ACTUAL
                                        <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="Direcci�n donde vives actualmente. Si vives en un caser�o ingresa tu direcci�n y luego agrega tu caser�o separado por un gui�n. Ejm: #LOS PINOS - SAN MART�N" style="cursor: pointer" data-original-title=""></i>
                                    </label>
                                    <input  type="text" class="form-control" id="txtDireccionActualPaciente" placeholder="Ingrese direcci�n actual. . ." maxlength="80">
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label for="txtDireccionProcePaciente">DIRECCION PROCEDENCIA
                                        <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="Direcci�n de donde vienes. Si vienes de un caser�o ingresa tu direcci�n y luego agrega tu caser�o separado por un gui�n. Ejm: #LOS ROSALES - SAN JUAN" style="cursor: pointer" data-original-title=""></i>
                                    </label>
                                    <input  type="text" class="form-control" id="txtDireccionProcePaciente" placeholder="Ingrese direcci�n de procedencia" maxlength="80">
                                </div>
                            </div>

                            <div class="col-lg-6 col-sm-12 mb-3" >
                                <label for="txtDistritoActualPaciente">DISTRITO ACTUAL
                                    <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="Distrito donde vives actualmente. Busca tu distrito, de no encontrarlo selecciona el m�s cercano" style="cursor: pointer" data-original-title=""></i>
                                </label>
                                <div class="search-box " style="max-width: 100%;">
                                    <div class="input-group">
                                        <input class="form-control form-control-sm" placeholder="Seleccione ..." id="txtFilterDistritoActual"  type="search">
                                        <span class="search-icon"><i class="icon icon-search icon-lg"></i></span>
                                    </div>
                                    <div id="resultadoDistritoActual" class="list-group position-absolute w-100 bg-light overflow-auto" style="z-index:2;max-height: 85px;"> 
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-sm-12 mb-3" >
                                <label for="txtDistritoProcedenciaPaciente">DISTRITO PROCEDENCIA
                                    <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="Distrito de donde vienes. Busca tu distrito, de no encontrarlo selecciona el m�s cercano" style="cursor: pointer" data-original-title=""></i>
                                </label>
                                <div class="search-box " style="max-width: 100%;">
                                    <div class="input-group">
                                        <input class="form-control form-control-sm" placeholder="Seleccione ..." id="txtFilterDistritoProcedencia"  type="search">
                                        <span class="search-icon"><i class="icon icon-search icon-lg"></i></span>
                                    </div>
                                    <div id="resultadoDistritoProcedencia" class="list-group position-absolute w-100 bg-light overflow-auto" style="z-index:2;max-height: 85px;"> 
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-12 text-left mt-3">
                                <button type="submit" class="btn btn-outline-primary btn-sm" id="btnGuardarPersonales">ACTUALIZAR DATOS</button>
                            </div> 

                        </div>
                    </form>
                </div> 
                <!-- /tab pane-->

                <!-- Tab DATOS FAMILIARES -->
                <div id="tab-pane-17" class="tab-pane ">
                    <div class="form-group form-row">
                        <div class="col-11 text-center">
                            <label id="titleManagerFamiliar" for="normal-input-3" class="col-form-label col-form-label-lg text-sm-center text-primary">LISTA DE FAMILIARES</label>
                            <input type="hidden" id="pageTriaje" value="1">
                        </div>

                        <div class="float-right">
                            <button type="button" class="btn btn-primary btn-sm" id="btnOpenNewFamiliar"><i class="icon icon-plus icon-fw"></i></button>
                        </div>
                    </div>

                    <div class="form-group col-12 ">
                        <!-- Tables -->
                        <div class="table-responsive">
                            <table class="table mb-0">
                                <thead class="bg-primary" style="line-height: 1.0;">
                                    <tr>
                                        <th class="text-uppercase text-white" scope="col" style="font-weight: 500;">ACCI�N</th>
                                        <th class="text-uppercase text-white" scope="col" style="font-weight: 500;">NOMBRE COMPLETO</th>
                                        <th class="text-uppercase text-white" scope="col" style="font-weight: 500;">FECHA NACIMIENTO</th>
                                        <th class="text-uppercase text-white" scope="col" style="font-weight: 500;">ESTADO CIVIL/<br>NIVEL INSTRUCCI�N</th>
                                        <th class="text-uppercase text-white" scope="col" style="font-weight: 500;">INGRESOS</th>

                                    </tr>
                                </thead>
                                <tbody id="tbodyDatosFamiliares" class="overflow-auto" >
                                </tbody>
                            </table>
                        </div>
                        <!-- /tables -->
                    </div>



                </div>
                <!-- /tab pane-->


            </div>
            <!-- /tab content -->

        </div>
        <!-- /card --> 
    </div>
</div>

<div class="modal fade overflow-auto" id="ventanaModalFamiliar" data-backdrop="static"
     tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">

            <div class="modal-header">
                <h6  class="modal-title" id="txtTituloModalFamiliar"></h6>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">�</span>
                </button>
            </div>
            <form id="FrmFamiliarPaciente" autocomplete="off">
                <div class="modal-body">
                    <div class="row" >
                        <div class="col-lg-6 col-sm-6">
                            <div class="form-group ">
                                <label for="txtNombreFamiliar">NOMBRE COMPLETO</label>
                                <input  type="text" class="form-control form-control-sm" id="txtNombreFamiliar" placeholder="Ingrese nombre completo. . ." maxlength="100">
                            </div>
                        </div>

                        <div class="col-lg-6 col-sm-6">
                            <div class="form-group ">
                                <label for="txtParentescoFamiliar">PARENTESCO</label>
                                <select class="form-control form-control-sm sisbu-cursor-mano" id="txtParentescoFamiliar">
                                    <option value="-1">Seleccione. . .</option>
                                    <option value="1">PAP�</option>
                                    <option value="2">MAM�</option>
                                    <option value="3">HERMANO(A)</option>
                                    <option value="4">TIO(A)</option>
                                    <option value="5">OTRO</option>

                                </select>
                            </div>
                        </div>
                        <div class="col-lg-6 col-sm-6">
                            <div class="form-group ">
                                <label for="txtFechaNaciFamiliar">FECHA NACIMIENTO</label>
                                <input  type="text" class="form-control form-control-sm" id="txtFechaNaciFamiliar" placeholder="DD/MM/AAAA">
                            </div>
                        </div>
                        <div class="col-lg-6 col-sm-6">
                            <div class="form-group ">
                                <label for="txtEstadoFamiliar">ESTADO CIVIL</label>
                                <select class="form-control form-control-sm sisbu-cursor-mano" id="txtEstadoFamiliar">
                                    <option value="-1">seleccione. . .</option>
                                    <option value="1">SOLTERO</option>
                                    <option value="2">CASADO</option>
                                    <option value="3">DIVORCIADO</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-6 col-sm-6">
                            <div class="form-group ">
                                <label for="txtNivelInstFamiliar">NIVEL INSTRUCCI�N</label>
                                <select class="form-control form-control-sm sisbu-cursor-mano" id="txtNivelInstFamiliar">
                                    <option value="-1">seleccione. . .</option>
                                    <option value="1">SIN ESTUDIOS</option>
                                    <option value="2">PRIMARIA</option>
                                    <option value="3">SECUNDARIA</option>
                                    <option value="4">T�CNICO</option>
                                    <option value="5">UNIVERSIDAD</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-lg-6 col-sm-6">
                            <div class="form-group ">
                                <label for="txtIngresosFamiliar">INGRESOS</label>
                                <input type="text" class="form-control form-control-sm" id="txtIngresosFamiliar" placeholder="INGRESOS">
                            </div>
                        </div>


                        <div class="col-lg-6 col-sm-12 mb-2" >
                            <label for="txtOcupacionPaciente">OCUPACI�N</label>
                            <div class="search-box " style="max-width: 100%;">
                                <div class="input-group">
                                    <input class="form-control form-control-sm" placeholder="Seleccione ..." id="txtFilterOcupacion"  type="search">
                                    <span class="search-icon"><i class="icon icon-search icon-lg"></i></span>
                                </div>
                                <div id="resultadoOcupacion" class="list-group position-absolute w-100 bg-light overflow-auto" style="z-index:6;max-height: 85px;"> 
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-6 col-sm-12 mb-2" >
                            <label for="txtDistritoPaciente">DISTRITO</label>
                            <div class="search-box " style="max-width: 100%;">
                                <div class="input-group">
                                    <input class="form-control form-control-sm" placeholder="Seleccione ..." id="txtFilterDistrito"  type="search">
                                    <span class="search-icon"><i class="icon icon-search icon-lg"></i></span>
                                </div>
                                <div id="resultadoDistrito" class="list-group position-absolute w-100 bg-light overflow-auto" style="z-index:6;max-height: 85px;"> 
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary btn-sm" data-dismiss="modal">CANCELAR</button>
                    <button type="submit" class="btn btn-outline-primary btn-sm" id="btnGuardarAddMenus">Guardar</button>
                </div>
            </form>
        </div>
    </div>
</div>


<div class="modal fade" id="modalCargandoFamiliar" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Cargando Familiares. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modalCargandoDatos" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Cargando Datos. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
