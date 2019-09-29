<%-- 
    Document   : comida.jsp
    Created on : 28/08/2019, 09:48:09 AM
    Author     : Andres
    Corregido por: James Carrillo
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
                                    <label for="txtCodigoPaciente">CÓDIGO
                                        <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="Es el código único de estudiante. Si aún no sabes cual es tu código, deja la caja de texto en blanco" style="cursor: pointer" data-original-title=""></i>
                                    </label>
                                    <input  type="text" class="form-control form-control-sm" id="txtCodigoPaciente" placeholder="Ingrese Código. . ." maxlength="7">
                                </div>
                            </div>
                            <div class="col-lg-4 col-sm-6">
                                <div class="form-group">
                                    <label for="txtNumeroDocumentoPaciente">N° DOCUMENTO</label>
                                    <input  type="text" class="form-control form-control-sm" id="txtNumeroDocumentoPaciente" placeholder="Ingrese n° documento. . ." maxlength="8">
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
                            <div class="col-lg-4 col-sm-6 mb-3">
                                <label for="txtFechaNacPaciente">FECHA DE NACIMIENTO</label>
                                <div class="input-group">
                                    <input  type="text" class="form-control form-control-sm" id="txtFechaNacPaciente" placeholder="DD/MM/AAAA">
                                    <div class="input-group-append">
                                        <button type="button" id="btnEliminarFechaNacPaciente" data-toggle="tooltip" title="Eliminar Fecha" class="btn btn-primary btn-sm"><i class="fa fa-trash"></i></button>
                                    </div>
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
                            <div class="col-lg-8 col-12 mb-3">
                                <label for="txtEscuelaPaciente">ESCUELA
                                    <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="Carrera profesional a la que ingresaste" style="cursor: pointer" data-original-title=""></i>
                                </label>
                                <div class="input-group">
                                    <input type="text" class="form-control form-control-sm" id="txtEscuelaPaciente" aria-describedby="nombre" placeholder="Click en el botón para seleccionar. . ." disabled="">
                                    <div class="input-group-append">
                                        <button type="button" id="btnSeleccionarEscuela" class="btn btn-primary btn-sm"><i class="icon icon-subscribe"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label for="txtDireccionActualPaciente">DIRECCION ACTUAL
                                        <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="Dirección donde vives actualmente. Si vives en un caserío ingresa tu dirección y luego agrega tu caserío separado por un guión. Ejm: #LOS PINOS - SAN MARTÍN" style="cursor: pointer" data-original-title=""></i>
                                    </label>
                                    <input  type="text" class="form-control form-control-sm" id="txtDireccionActualPaciente" placeholder="Ingrese dirección actual. . ." maxlength="80">
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label for="txtDireccionProcePaciente">DIRECCION PROCEDENCIA
                                        <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="Dirección de donde vienes. Si vienes de un caserío ingresa tu dirección y luego agrega tu caserío separado por un guión. Ejm: #LOS ROSALES - SAN JUAN" style="cursor: pointer" data-original-title=""></i>
                                    </label>
                                    <input  type="text" class="form-control form-control-sm" id="txtDireccionProcePaciente" placeholder="Ingrese dirección de procedencia" maxlength="80">
                                </div>
                            </div>
                            <div class="col-lg-6 col-12 mb-3">
                                <label for="txtDistritoActualPaciente">DISTRITO ACTUAL</label>
                                <div class="input-group">
                                    <input type="text" class="form-control form-control-sm" id="txtDistritoActualPaciente" aria-describedby="nombre" placeholder="Click en el botón para seleccionar. . ." disabled="">
                                    <div class="input-group-append">
                                        <button type="button" id="btnSeleccionarDistritoActual" class="btn btn-primary btn-sm"><i class="icon icon-subscribe"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-12 mb-3">
                                <label for="txtDistritoProcedenciaPaciente">DISTRITO PROCEDENCIA</label>
                                <div class="input-group">
                                    <input type="text" class="form-control form-control-sm" id="txtDistritoProcedenciaPaciente" aria-describedby="nombre" placeholder="Click en el botón para seleccionar. . ." disabled="">
                                    <div class="input-group-append">
                                        <button type="button" id="btnSeleccionarDistritoProcedencia" class="btn btn-primary btn-sm"><i class="icon icon-subscribe"></i></button>
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
                    <div class="form-row">
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
                                        <th class="text-uppercase text-white" scope="col" style="font-weight: 500;width: 10%">ACCIÓN</th>
                                        <th class="text-uppercase text-white" scope="col" style="font-weight: 500;">NOMBRE COMPLETO</th>
                                        <th class="text-uppercase text-white" scope="col" style="font-weight: 500;width: 10%">FECHA NACIMIENTO</th>
                                        <th class="text-uppercase text-white" scope="col" style="font-weight: 500;width: 20%">ESTADO CIVIL/<br>NIVEL INSTRUCCIÓN</th>
                                        <th class="text-uppercase text-white" scope="col" style="font-weight: 500;width: 10%">INGRESOS</th>

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
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <form id="FrmFamiliarPaciente" autocomplete="off">
                <div class="modal-body">
                    <div class="row" >
                        <div class="col-lg-6">
                            <div class="form-group ">
                                <label for="txtNombreFamiliar">NOMBRE COMPLETO</label>
                                <input  type="text" class="form-control form-control-sm" id="txtNombreFamiliar" placeholder="Ingrese nombre completo. . ." maxlength="100">
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <div class="form-group ">
                                <label for="txtParentescoFamiliar">PARENTESCO</label>
                                <select class="form-control form-control-sm sisbu-cursor-mano" id="txtParentescoFamiliar">
                                    <option value="-1">Seleccione. . .</option>
                                    <option value="1">PAPÁ</option>
                                    <option value="2">MAMÁ</option>
                                    <option value="3">HERMANO(A)</option>
                                    <option value="4">TIO(A)</option>
                                    <option value="5">OTRO</option>

                                </select>
                            </div>
                        </div>
                        <div class="col-lg-6 mb-3">
                            <label for="txtFechaNaciFamiliar">FECHA NACIMIENTO
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="Si no sabes puedes dejar la caja de texto en blanco" style="cursor: pointer" data-original-title=""></i>
                            </label>
                            <div class="input-group ">
                                <input  type="text" class="form-control form-control-sm" id="txtFechaNaciFamiliar" placeholder="DD/MM/AAAA">
                                <div class="input-group-append">
                                    <button type="button" id="btnEliminarFechaNacFamiliar" data-toggle="tooltip" title="Eliminar Fecha" class="btn btn-primary btn-sm"><i class="fa fa-trash"></i></button>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
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
                        <div class="col-lg-6">
                            <div class="form-group ">
                                <label for="txtNivelInstFamiliar">NIVEL INSTRUCCIÓN</label>
                                <select class="form-control form-control-sm sisbu-cursor-mano" id="txtNivelInstFamiliar">
                                    <option value="-1">seleccione. . .</option>
                                    <option value="1">SIN ESTUDIOS</option>
                                    <option value="2">PRIMARIA</option>
                                    <option value="3">SECUNDARIA</option>
                                    <option value="4">TÉCNICO</option>
                                    <option value="5">UNIVERSIDAD</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <div class="form-group ">
                                <label for="txtIngresosFamiliar">INGRESOS
                                    <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="Coloca el monto mensual que tiene de ingresos tu familiar" style="cursor: pointer" data-original-title=""></i>
                                </label>
                                <input type="number" class="form-control form-control-sm" id="txtIngresosFamiliar" placeholder="INGRESOS">
                            </div>
                        </div>
                        <div class="col-lg-6 mb-3">
                            <label for="txtOcupacionPaciente">OCUPACIÓN
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="Es a lo que se dedica tu familiar" style="cursor: pointer" data-original-title=""></i>
                            </label>
                            <div class="input-group">
                                <input type="text" class="form-control form-control-sm" id="txtOcupacionPaciente" aria-describedby="nombre" placeholder="Click en el botón para seleccionar. . ." disabled="">
                                <div class="input-group-append">
                                    <button type="button" id="btnSeleccionarOcupacion" class="btn btn-primary btn-sm"><i class="icon icon-subscribe"></i></button>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 mb-3">
                            <label for="txtDistritoPaciente">DISTRITO PROCEDENCIA
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="Es el distrito donde nacio tu familiar" style="cursor: pointer" data-original-title=""></i>
                            </label>
                            <div class="input-group">
                                <input type="text" class="form-control form-control-sm" id="txtDistritoPaciente" aria-describedby="nombre" placeholder="Click en el botón para seleccionar. . ." disabled="">
                                <div class="input-group-append">
                                    <button type="button" id="btnSeleccionarDistritoFamiliar" class="btn btn-primary btn-sm"><i class="icon icon-subscribe"></i></button>
                                </div>
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


<div class="modal fade" id="modalCargandoFamiliar" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;background-color: rgba(0,0,0,.2)" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Cargando familiares. . .
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
                        <input type="hidden" id="pageOcupacionC"
                               value="1">
                        <form id="FrmOcupacionC">
                            <div class="row mt-3">
                                <div class="input-group col-12">
                                    <input type="text" id="txtFilterOcupacionC"
                                           class="form-control form-control-sm mr-3" placeholder="INGRESE FILTRO . . .">
                                    <button type="submit" id="btnBuscarOcupacionC"
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
                                            <th class="align-middle text-left">Ocupación</th>
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
                                    <ul id="paginationOcupacionC"
                                        class="pagination justify-content-end">

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal" id="btnCancelSelectionOcupacionC"><i class="fas fa-ban"></i>
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