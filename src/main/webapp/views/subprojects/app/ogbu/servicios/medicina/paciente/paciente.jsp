<%-- 
    Document   : comida.jsp
    Created on : 28/08/2019, 09:48:09 AM
    Author     : Andres
--%>

<div class="row">
    <div class="col-xl-12 p-0">
        <!-- Card -->
        <div class="overflow-hidden" id="ListaPaciente">
            <!-- Card Header -->
            <div class="card-header bg-transparent pt-0">
                <h4 class="mb-0" id="titleManagerPaciente">[ 0 ] PACIENTES</h4>
                <input type="hidden" id="pagePaciente" value="1">
            </div>
            <!-- /card header -->
            <!-- Card Body -->
            <div class="card-body p-1">
                <form id="FrmPaciente">
                    <div class="input-group search-box" style="max-width: 100%;">
                        <input type="search" id="txtFilterPaciente" class="form-control form-control-sm"
                            placeholder="FILTRO. . ." data-toggle="tooltip" data-original-title="Buscar"
                            data-placement="left">
                        <button type="submit" class="search-icon"><i class="icon icon-search icon-fw"></i></button>
                    </div>
                </form>
                <!-- Card -->
                <div class="dt-card mt-4">
                    <!-- Card Body -->
                    <div class="dt-card__body p-0 ">
                        <div class="w-100 ps-custom-scrollbar mb-0 ps pb-5">
                            <!-- Widget -->
                            <div class="dt-widget dt-widget-hl-item-space dt-widget-mb-item dt-widget-hover-bg"
                                id="tbodyPaciente" style="min-width: 725px;">
                            </div>
                            <!-- /widget -->
                        </div>
                        <!-- /card body -->
                    </div>

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

        <!-- Card -->
        <div class="card mb-0 " id="openPaciente" style="display:none">
            <!-- Card Header -->
            <div class="card-header">
                <!-- Tab Navigation -->
                <ul class="card-header-pills nav nav-pills nav-fill" role="tablist">
                    <li class="pr-2">
                        <button data-toggle="tooltip" title="Regresar" type="button" id="btnCerrar"
                            class="btn btn-outline-primary btn-sm dt-avatar">
                            <i class="icon icon-reply icon-lg"></i></button>
                    </li>
                    <li class="nav-item">
                        <a id="buttonFiliacion" class="nav-link show active" data-toggle="tab" href="#tab-pane-15"
                            role="tab" aria-controls="tab-pane-15" aria-="true">
                            DATOS DE FILIACI�N</a>
                    </li>
                    <li class="nav-item">
                        <a id="buttonAntecedente" class="nav-link" data-toggle="tab" href="#tab-pane-16" role="tab"
                            aria-controls="tab-pane-16" aria-="false">
                            ANTECEDENTES CL�NICOS</a>
                    </li>
                    <li class="nav-item">
                        <a id="buttonDiagnostico" class="nav-link" data-toggle="tab" href="#tab-pane-17" role="tab"
                            aria-controls="tab-pane-17" aria-="false">
                            DIAGN�STICOS</a>
                    </li>
                </ul>
                <!-- /tab navigation -->
            </div>
            <!-- /card header -->

            <!-- Tab Content -->
            <div class="tab-content p-5 ">

                <!-- Tab FILIACION -->
                <div id="tab-pane-15" class="tab-pane show active ">
                    <div class="row">
                        <div class="col-lg-4 col-sm-6">
                            <div class="form-group">
                                <label for="txtTipoDocumentoPaciente">TIPO DE DOCUMENTO</label>
                                <select disabled class="form-control form-control-sm" id="txtTipoDocumentoPaciente">
                                    <option value="1">DNI</option>
                                    <option value="2">CARNET DE EXTRANJERIA</option>
                                    <option value="3">OTRO</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-6">
                            <div class="form-group">
                                <label for="txtUsuarioPaciente">TIPO DE USUARIO</label>
                                <select disabled class="form-control form-control-sm" id="txtUsuarioPaciente">
                                    <option value="1">ALUMNO</option>
                                    <option value="2">DOCENTE</option>
                                    <option value="3">ADMINISTRATIVO</option>
                                    <option value="4">FAMILIAR DOCENTE</option>
                                    <option value="5">FAMILIAR ADMINISTRATIVO</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-6">
                            <div class="form-group">
                                <label for="txtSubusuarioPaciente">SUBTIPO DE USUARIO</label>
                                <select disabled class="form-control form-control-sm" id="txtSubusuarioPaciente">
                                    <option value="1">NOMBRADO</option>
                                    <option value="2">CONTRATADO</option>
                                    <option value="3">NINGUNO</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-lg-4 col-sm-6">
                            <div class="form-group">
                                <label for="txtEstadoPaciente">ESTADO CIVIL</label>
                                <select disabled class="form-control form-control-sm" id="txtEstadoPaciente">
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
                                <label for="txtCodigoPaciente">C�DIGO</label>
                                <input disabled type="text" class="form-control form-control-sm" id="txtCodigoPaciente"
                                    placeholder="CODIGO">
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-6">
                            <div class="form-group">
                                <label for="txtNumeroDocumentoPaciente">N� DOCUMENTO</label>
                                <input disabled type="text" class="form-control form-control-sm"
                                    id="txtNumeroDocumentoPaciente" placeholder="N� DOCUMENTO">
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-6">
                            <div class="form-group">
                                <label for="txtApPaternoPaciente">AP. PATERNO</label>
                                <input disabled type="text" class="form-control form-control-sm"
                                    id="txtApPaternoPaciente" placeholder="AP. PATERNO">
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-6">
                            <div class="form-group">
                                <label for="txtApMaternoPaciente">AP. MATERNO</label>
                                <input disabled type="text" class="form-control form-control-sm"
                                    id="txtApMaternoPaciente" placeholder="AP. MATERNO">
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-6">
                            <div class="form-group">
                                <label for="txtNombrePaciente">NOMBRES</label>
                                <input disabled type="email" class="form-control form-control-sm" id="txtNombrePaciente"
                                    placeholder="NOMBRES">
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-6">
                            <div class="form-group">
                                <label for="txtSexoPaciente">SEXO</label>
                                <select disabled class="form-control form-control-sm" id="txtSexoPaciente">
                                    <option value="1">MASCULINO</option>
                                    <option value="2">FEMENINO</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-6">
                            <div class="form-group">
                                <label for="txtFechaNacPaciente">FECHA DE NACIMIENTO</label>
                                <input disabled type="email" class="form-control form-control-sm"
                                    id="txtFechaNacPaciente" placeholder="Enter email">
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-6">
                            <div class="form-group">
                                <label for="txtCelularPaciente">CELULAR</label>
                                <input disabled type="text" class="form-control form-control-sm" id="txtCelularPaciente"
                                    placeholder="CELULAR">
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-12">
                            <div class="form-group">
                                <label for="txtEmailPaciente">EMAIL</label>
                                <input disabled type="email" class="form-control form-control-sm" id="txtEmailPaciente"
                                    placeholder="Enter email">
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-12">
                            <div class="form-group">
                                <label for="txtEscuelaPaciente">ESCUELA</label>
                                <input disabled type="text" class="form-control form-control-sm" id="txtEscuelaPaciente"
                                    placeholder="ESCUELA">
                            </div>
                        </div>

                    </div>
                </div>
                <!-- /tab pane-->

                <!-- Tab ANTECEDENTES -->
                <div id="tab-pane-16" class="tab-pane ">
                    <form id="FrmAntecedentePaciente" autocomplete="off">
                        <div class="row">

                            <div class="col-lg-4 col-sm-6">
                                <div class="form-group">
                                    <label for="txtHistoriaPaciente">N� HISTORIA</label>
                                    <div class="input-group">
                                        <div class="input-group-append">
                                            <button type="button" class="btn btn-primary btn-sm"><i
                                                    class="fa fa-file-alt"></i></button>
                                        </div>
                                        <input disabled type="text" class="form-control form-control-sm"
                                            id="txtHistoriaPaciente" placeholder="N� HISTORIA">
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-sm-6">
                                <div class="form-group">
                                    <label for="txtSeguroPaciente">TIPO SEGURO</label>
                                    <select class="form-control form-control-sm" id="txtSeguroPaciente">
                                        <option value="1">SIS</option>
                                        <option value="2">ESSALUD</option>
                                        <option value="3">OTRO</option>
                                        <option value="4">SIN DEFINIR</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-4 col-sm-6 ">
                                <label for="txtMedicoPaciente">M�DICO
                                </label>
                                <div class="input-group">
                                    <input type="text" class="form-control form-control-sm" id="txtMedicoPaciente"
                                        aria-describedby="nombre" placeholder="Click en el bot�n para seleccionar. . ."
                                        disabled="">
                                    <div class="input-group-append">
                                        <button type="button" id="btnSeleccionarDoctor"
                                            class="btn btn-primary btn-sm"><i class="icon icon-subscribe"></i></button>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-4 col-sm-6">
                                <label for="txtAntFamiliPaciente">ANTECEDENTES FAMILIARES</label>
                                <div class="form-group">
                                    <textarea class="form-control" id="txtAntFamiliPaciente" rows="7"
                                        placeholder="ANTECEDENTES FAMILIARES"></textarea>
                                </div>
                            </div>
                            <div class="col-lg-4 col-sm-6">
                                <label for="txtAntPersonalPaciente">ANTECEDENTES PERSONALES</label>
                                <div class="form-group">
                                    <textarea class="form-control" id="txtAntPersonalPaciente" rows="7"
                                        placeholder="ANTECEDENTES PERSONALES"></textarea>
                                </div>
                            </div>

                            <div class="col-lg-4 col-sm-6">
                                <label for="txtAlergiaPaciente">ALERGIAS</label>
                                <div class="form-group">
                                    <textarea class="form-control" id="txtAlergiaPaciente" rows="7"
                                        placeholder="ALERGIAS"></textarea>
                                </div>
                            </div>
                            <div class="col-lg-12 text-center">
                                <button type="submit" id="btnGuardarPaciente"
                                    class="btn btn-primary btn-sm">GUARDAR</button>
                            </div>
                        </div>
                    </form>
                </div>
                <!-- /tab pane-->

                <!-- Tab DIAGNOSTICO -->
                <div id="tab-pane-17" class="tab-pane ">
                    <div class="dt-card__header mb-0 p-0 pt-5 pb-5">
                        <!-- Card Heading -->
                        <div class="dt-card__heading">
                            <h3 id="titleManagerDiagnostico" class="dt-card__title  text-primary text-center">LISTA DE
                                DIAGN�STICOS</h3>
                            <input type="hidden" id="pageDiagnostico" value="1">
                        </div>
                        <!-- /card heading -->
                        <!-- Card Tools -->
                        <div class="dt-card__tools">
                            <button type="button" class="btn btn-primary btn-sm" id="btnOpenNewDiagnosticoPaciente"
                                data-toggle="tooltip" title="Agregar Diagn�stico"><i class="icon icon-addnew"></i>
                            </button>
                        </div>
                        <!-- /card tools -->
                    </div>
                    <div class="form-group ">
                        <!-- Tables -->
                        <div class="table-responsive">
                            <table class="table mb-0">
                                <thead style="line-height: 0.4;border-bottom-style: hidden;" class="bg-primary ">
                                    <tr>
                                        <th class="text-uppercase text-white" scope="col" style="font-weight: 500;">
                                            ACCI�N</th>
                                        <th class="text-uppercase text-white" scope="col" style="font-weight: 500;">
                                            ATENDIDO </th>
                                        <th class="text-uppercase text-white" scope="col" style="font-weight: 500;">
                                            FECHA </th>
                                        <th class="text-uppercase text-white" scope="col" style="font-weight: 500;">
                                            DIAGN�STICO</th>

                                    </tr>
                                </thead>
                                <tbody id="tbodyDiagnostico" class="overflow-auto">
                                </tbody>
                            </table>
                        </div>
                        <!-- /tables -->
                    </div>

                    <div class="mt-2 form-row">
                        <div class="col-md-2 col-sm-3 col-4">
                            <select id="sizePageDiagnostico" class="form-control form-control-sm select2-single">
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                            </select>
                        </div>
                        <div class="col-md-10 col-sm-9 col-8">
                            <nav aria-label="Page navigation example">
                                <ul id="paginationDiagnostico" class="pagination pagination-sm justify-content-end">
                                </ul>
                            </nav>
                        </div>
                    </div>

                </div>
                <div id="newOpenDiagnostico" class="tab-pane ">
                    <div class="card-header bg-transparent pl-0 ">
                        <h4 class="mb-0 text-primary" id="txtTituloModalDiagnostico"></h4>
                    </div>
                    <form id="FrmDiagnosticoPaciente">
                        <div class="row">

                            <div class="col-lg-3 col-sm-4">
                                <div class="form-group ">
                                    <label for="txtPosicionPaciente">POSICI�N</label>
                                    <select class="form-control form-control-sm " id="txtPosicionPaciente">
                                        <option value="-1">seleccione...</option>
                                        <option value="1">DEC�BITO DORSAL</option>
                                        <option value="3">SENTADO</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-3 col-sm-4">
                                <div class="form-group ">
                                    <label for="txtZonaControlPaciente">ZONA DE CONTROL</label>
                                    <select class="form-control form-control-sm " id="txtZonaControlPaciente">
                                        <option value="-1">seleccione tipo...</option>
                                        <option value="0">MSI</option>
                                        <option value="1">MSD</option>

                                    </select>
                                </div>
                            </div>


                            <div class="col-lg-3 col-sm-4">
                                <div class="form-group ">
                                    <label for="txtAyunoPaciente">AYUNO</label>
                                    <select class="form-control form-control-sm " id="txtAyunoPaciente">
                                        <option value="-1">seleccione...</option>
                                        <option value="1">SI</option>
                                        <option value="0">NO</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-3 col-sm-4">
                                <div class="form-group ">
                                    <label for="txtPaPaciente">PA</label>
                                    <input type="text" class="form-control form-control-sm" id="txtPaPaciente"
                                        placeholder="PA">
                                </div>
                            </div>
                            <div class="col-lg-3 col-sm-4">
                                <div class="form-group ">
                                    <label for="txtFcPaciente">FC</label>
                                    <input type="text" class="form-control form-control-sm" id="txtFcPaciente"
                                        placeholder="FC">
                                </div>
                            </div>

                            <div class="col-lg-3 col-sm-4">
                                <div class="form-group ">
                                    <label for="txtFrPaciente">FR</label>
                                    <input type="text" class="form-control form-control-sm" id="txtFrPaciente"
                                        placeholder="FR">
                                </div>
                            </div>

                            <div class="col-lg-3 col-sm-4">
                                <div class="form-group ">
                                    <label for="txtTPaciente">T�</label>
                                    <input type="text" class="form-control form-control-sm" id="txtTPaciente"
                                        placeholder="T�">
                                </div>
                            </div>

                            <div class="col-lg-3 col-sm-4">
                                <div class="form-group ">
                                    <label for="txtSo2Paciente">SO<sub>2</sub></label>
                                    <input type="text" class="form-control form-control-sm" id="txtSoPaciente"
                                        placeholder="S02">
                                </div>
                            </div>

                            <div class="col-lg-3 col-sm-4">
                                <div class="form-group ">
                                    <label for="txtGlicemiaPaciente">GLICEMIA</label>
                                    <input type="text" class="form-control form-control-sm" id="txtGlicemiaPaciente"
                                        placeholder="GLICEMIA">
                                </div>
                            </div>



                            <div class="col-lg-3 col-sm-4">
                                <div class="form-group ">
                                    <label for="txtPesoPaciente">PESO</label>
                                    <input type="text" class="form-control form-control-sm" id="txtPesoPaciente"
                                        placeholder="PESO">
                                </div>
                            </div>

                            <div class="col-lg-3 col-sm-4">
                                <div class="form-group ">
                                    <label for="txtTallaPaciente">TALLA (Metros)</label>
                                    <input type="text" class="form-control form-control-sm" id="txtTallaPaciente"
                                        placeholder="TALLA">
                                </div>
                            </div>

                            <div class="col-lg-3 col-sm-4">
                                <div class="form-group ">
                                    <label for="txtImcPaciente">IMC</label>
                                    <input disabled type="text" class="form-control form-control-sm" id="txtImcPaciente"
                                        placeholder="IMC">
                                </div>
                            </div>

                            <div class="col-lg-4 col-sm-6">
                                <label for="txtEnfermedadPaciente">ENF. ACTUAL</label>
                                <div class="form-group">
                                    <textarea class="form-control form-control-sm" id="txtEnfermedadPaciente" rows="3"
                                        placeholder="ENFERMEDAD ACTUAL"></textarea>
                                </div>
                            </div>

                            <div class="col-lg-4 col-sm-6">
                                <label for="txtDxPaciente">Dx</label>
                                <div class="form-group">
                                    <textarea class="form-control form-control-sm" id="txtDxPaciente" rows="3"
                                        placeholder="Dx"></textarea>
                                </div>
                            </div>

                            <div class="col-lg-4 col-sm-12">
                                <label for="txtTtoPaciente">Tto</label>
                                <div class="form-group">
                                    <textarea class="form-control form-control-sm" id="txtTtoPaciente" rows="3"
                                        placeholder="Tto"></textarea>
                                </div>
                            </div>
                            <div class="col-lg-12 col-sm-12 text-center">
                                <button id="btnCancelarDiagnostico" type="button"
                                    class="btn btn-outline-primary btn-sm"><i class="icon icon-reply"></i>
                                    CANCELAR</button>
                                <button type="submit" class="btn btn-primary btn-sm"
                                    id="btnGuardarAddMenus">GUARDAR</button>
                            </div>
                        </div>
                    </form>
                </div>
                <!-- /tab pane-->
            </div>
            <!-- /tab content -->
        </div>
        <!-- /card -->
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

<div class="modal fade" id="modalCargandoDiagnostico" data-backdrop="static" data-keyboard="false" tabindex="-1"
    role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                        aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Cargando Diagnosticos. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="modalCargandoHistoria" data-backdrop="static" data-keyboard="false" tabindex="-1"
    role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                        aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Cargando Historia. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<!--T: DOCTOR SELECTED-->
<div id="ventanaModalSelectedDoctorC" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
    data-keyboard="false" style="padding-top: 2%; overflow-y: visible;background-color: rgba(0,0,0,.2)">
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="border-color: #0085c1; border-width: 4px;">
            <div class="modal-header">
                <h5 class="mb-0" id="titleManagerDoctorC"><strong>[ 0 ]
                        M�DICO</strong></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pb-0 pt-0">
                <div class="row">
                    <div class="col-12">
                        <input type="hidden" id="pageDoctorC" value="1">
                        <form id="FrmDoctorC">
                            <div class="row mt-3">
                                <div class="input-group col-12">
                                    <input type="text" id="txtFilterDoctorC" class="form-control form-control-sm mr-3"
                                        placeholder="INGRESE FILTRO . . .">
                                    <button type="submit" id="btnBuscarDoctorC" class="btn btn-primary btn-xs"
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
                                            <th class="align-middle text-left">Doctor</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyDoctorC">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row mt-2 mb-2" style="display: none">
                            <div class="col-sm-4 mt-2">
                                <select id="sizePageDoctorC"
                                    class="form-control form-control-sm sisbu-cursor-mano combo-paginar">
                                    <option value="5">05</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>
                            <div class="col-sm-8 mt-2">
                                <nav aria-label="Page navigation">
                                    <ul id="paginationDoctorC" class="pagination justify-content-end">

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal"
                    id="btnCancelSelectionDoctorC"><i class="fas fa-ban"></i>
                    CANCELAR</button>
                <button type="button" id="btn-selecionar-doctorc" class="btn btn-primary btn-xs"><i
                        class="fas fa-check"></i> SELECCIONAR</button>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoSelectedDoctorC" data-backdrop="static" data-keyboard="false" tabindex="-1"
    role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.3)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                        aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Cargando doctores. . .
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
                        Verificando Historia Clinica del Paciente. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>