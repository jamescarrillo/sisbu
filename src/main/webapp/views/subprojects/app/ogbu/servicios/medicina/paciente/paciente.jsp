<%-- 
    Document   : comida.jsp
    Created on : 28/08/2019, 09:48:09 AM
    Author     : Andres
--%>

<div class="row">
    <div class="col-xl-12">
        <!-- Card -->
        <div class="card overflow-hidden" id="ListaPaciente">
            <!-- Card Header -->
            <div class="card-header bg-transparent">
                <h4 class="mb-0" id="titleManagerPaciente">[ 0 ] PACIENTES</h4>
                <input type="hidden" id="pagePaciente" value="1">
            </div>
            <!-- /card header -->
            <!-- Card Body -->
            <div class="card-body pt-0">
                <form id="FrmPaciente">
                    <div class="input-group search-box" style="max-width: 100%;">
                        <input type="search" id="txtFilterPaciente" class="form-control form-control-sm" placeholder="FILTRO. . .">
                        <span class="search-icon"><i class="icon icon-search icon-lg"></i></span>
                        <button type="submit" class="btn btn-primary btn-sm mr-2"><i class="icon icon-search icon-fw"></i> BUSCAR</button>
                    </div>
                </form>
                <!-- Tables -->
                <div class="table-responsive">
                    <table class="table mb-0 mt-2">
                        <thead>
                            <tr>
                                <th class="text-uppercase" scope="col" style="width: 10%">H. CLÍNICA</th>
                                <th class="text-uppercase" scope="col" >DNI</th>
                                <th class="text-uppercase" scope="col" >NOMBRE COMPLETO</th>
                                <th class="text-uppercase" scope="col" >TIPO USUARIO</th>
                                <th class="text-uppercase" scope="col" >SUBTIPO USUARIO</th>
                            </tr>
                        </thead>
                        <tbody id="tbodyPaciente">
                        </tbody>
                    </table>
                </div>
                <!-- /tables -->
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
        <div class="card mb-0 " id="openPaciente">
            <!-- Card Header -->
            <div class="card-header bg-transparent">
                <h4 class="modal-title text-center" id="txtTituloPaciente"></h4>
            </div>
            <!-- /card header -->

            <!-- Card Header -->
            <div class="card-header">
                <!-- Tab Navigation -->
                <ul class="card-header-pills nav nav-pills nav-fill" role="tablist">
                    <li class="nav-item">
                        <a id="buttonFiliacion" class="nav-link show active" data-toggle="tab" 
                           href="#tab-pane-15" role="tab" aria-controls="tab-pane-15"
                           aria-="true">
                            DATOS DE FILIACIÓN</a>
                    </li>
                    <li class="nav-item">
                        <a id="buttonAntecedente" class="nav-link" data-toggle="tab" href="#tab-pane-16" 
                           role="tab" aria-controls="tab-pane-16" aria-="false">
                            ANTECEDENTES CLÍNICOS</a>
                    </li>
                    <li class="nav-item">
                        <a id="buttonDiagnostico" class="nav-link" data-toggle="tab" href="#tab-pane-17" 
                           role="tab" aria-controls="tab-pane-17" aria-="false">
                            DIAGNÓSTICOS</a>
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
                                    <option   value="1">DNI</option>
                                    <option  value="2">CARNET DE EXTRANJERIA</option>
                                    <option  value="3">OTRO</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-6">
                            <div class="form-group">
                                <label for="txtUsuarioPaciente">TIPO DE USUARIO</label>
                                <select disabled class="form-control form-control-sm" id="txtUsuarioPaciente">
                                    <option   value="1">ALUMNO</option>
                                    <option  value="2">DOCENTE</option>
                                    <option  value="3">ADMINISTRATIVO</option>
                                    <option  value="4">FAMILIAR DOCENTE</option>
                                    <option  value="5">FAMILIAR ADMINISTRATIVO</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-6">
                            <div class="form-group">
                                <label for="txtSubusuarioPaciente">SUBTIPO DE USUARIO</label>
                                <select disabled class="form-control form-control-sm" id="txtSubusuarioPaciente">
                                    <option value="1">NOMBRADO</option>
                                    <option  value="2">CONTRATADO</option>
                                    <option value="3">NINGUNO</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-lg-4 col-sm-6">
                            <div class="form-group">
                                <label for="txtEstadoPaciente">ESTADO CIVIL</label>
                                <select disabled class="form-control form-control-sm" id="txtEstadoPaciente">
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
                                <label for="txtCodigoPaciente">CÓDIGO</label>
                                <input disabled type="text" class="form-control" id="txtCodigoPaciente" placeholder="CODIGO">
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-6">
                            <div class="form-group">
                                <label for="txtNumeroDocumentoPaciente">N° DOCUMENTO</label>
                                <input disabled type="text" class="form-control" id="txtNumeroDocumentoPaciente" placeholder="N° DOCUMENTO">
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-6">
                            <div class="form-group">
                                <label for="txtApPaternoPaciente">AP. PATERNO</label>
                                <input disabled type="text" class="form-control" id="txtApPaternoPaciente" placeholder="AP. PATERNO">
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-6">
                            <div class="form-group">
                                <label for="txtApMaternoPaciente">AP. MATERNO</label>
                                <input disabled type="text" class="form-control" id="txtApMaternoPaciente" placeholder="AP. MATERNO">
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-6">
                            <div class="form-group">
                                <label for="txtNombrePaciente">NOMBRES</label>
                                <input disabled type="email" class="form-control" id="txtNombrePaciente" placeholder="NOMBRES">
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-6">
                            <div class="form-group">
                                <label for="txtSexoPaciente">SEXO</label>
                                <select disabled class="form-control form-control-sm" id="txtSexoPaciente">
                                    <option value="1">MASCULINO</option>
                                    <option  value="2">FEMENINO</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-6">
                            <div class="form-group">
                                <label for="txtFechaNacPaciente">FECHA DE NACIMIENTO</label>
                                <input disabled type="email" class="form-control" id="txtFechaNacPaciente" placeholder="Enter email">
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-6">
                            <div class="form-group">
                                <label for="txtCelularPaciente">CELULAR</label>
                                <input disabled type="text" class="form-control" id="txtCelularPaciente" placeholder="CELULAR">
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-12">
                            <div class="form-group">
                                <label for="txtEmailPaciente">EMAIL</label>
                                <input disabled type="email" class="form-control" id="txtEmailPaciente" placeholder="Enter email">
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-12">
                            <div class="form-group">
                                <label for="txtEscuelaPaciente">ESCUELA</label>
                                <input disabled type="text" class="form-control" id="txtEscuelaPaciente" placeholder="ESCUELA">
                            </div>
                        </div>

                    </div>
                </div> 
                <!-- /tab pane-->

                <!-- Tab ANTECEDENTES -->
                <div id="tab-pane-16" class="tab-pane ">
                    <form id="FrmAntecedentePaciente">
                        <div class="row">

                            <div class="col-lg-4 col-sm-6">
                                <div class="form-group">
                                    <label for="txtHistoriaPaciente">N° HISTORIA</label>
                                    <input disabled type="text" class="form-control form-control-sm" id="txtHistoriaPaciente" placeholder="N° HISTORIA">
                                </div>
                            </div>
                            <div class="col-lg-4 col-sm-6">
                                <div class="form-group">
                                    <label for="txtSeguroPaciente">TIPO SEGURO</label>
                                    <select  class="form-control form-control-sm" id="txtSeguroPaciente">
                                        <option  value="1">SIS</option>
                                        <option  value="2">ESSALUD</option>
                                        <option  value="3">OTRO</option>
                                        <option   value="4">SIN DEFINIR</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-lg-4 col-sm-6 " >
                                <label for="txtMedicoPaciente">MÉDICO</label>
                                <div class="search-box " style="max-width: 100%;">
                                    <div class="input-group">
                                        <input class="form-control form-control-sm" placeholder="Seleccione ..." id="txtFilterMedico"  type="search">
                                        <span class="search-icon"><i class="icon icon-search icon-lg"></i></span>
                                    </div>
                                    <div id="resultadoMedico" class="list-group position-absolute w-100 bg-light overflow-auto" style="z-index:2;max-height: 85px;"> 
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-4 col-sm-6" >
                                <label for="txtAntFamiliPaciente">ANTECEDENTES FAMILIARES</label>
                                <div class="form-group">
                                    <textarea class="form-control" id="txtAntFamiliPaciente" rows="7" placeholder="ANTECEDENTES FAMILIARES"></textarea>
                                </div>
                            </div>
                            <div class="col-lg-4 col-sm-6" >
                                <label for="txtAntPersonalPaciente">ANTECEDENTES PERSONALES</label>
                                <div class="form-group">
                                    <textarea class="form-control" id="txtAntPersonalPaciente" rows="7" placeholder="ANTECEDENTES PERSONALES"></textarea>     
                                </div>
                            </div>

                            <div class="col-lg-4 col-sm-6" >
                                <label for="txtAlergiaPaciente">ALERGIAS</label>
                                <div class="form-group">
                                    <textarea class="form-control" id="txtAlergiaPaciente" rows="7" placeholder="ALERGIAS"></textarea>
                                </div>
                            </div>
                            <div class="col-lg-12 text-center">
                                <button type="submit" id="btnGuardarPaciente" class="btn btn-primary btn-sm"><i class="fa fa-floppy-o"></i> GUARDAR</button>
                            </div>  
                        </div>   
                    </form>
                </div>
                <!-- /tab pane-->

                <!-- Tab DIAGNOSTICO -->
                <div id="tab-pane-17" class="tab-pane ">
                    <div class="form-group form-row">
                        <div class="col-11 text-center">
                            <label id="titleManagerDiagnostico" for="normal-input-3" class="col-form-label col-form-label-lg text-sm-center text-primary">LISTA DE DIAGNÓSTICOS</label>
                            <input type="hidden" id="pageDiagnostico" value="1">
                        </div>

                        <div class="float-right">
                            <button type="button" class="btn btn-primary btn-sm" id="btnOpenNewDiagnosticoPaciente"><i class="icon icon-plus icon-fw"></i></button>
                        </div>
                    </div>

                    <div class="form-group col-12 ">
                        <!-- Tables -->
                        <div class="table-responsive">
                            <table class="table mb-0">
                                <thead>
                                    <tr>
                                        <th class="text-uppercase" scope="col" >ACCIÓN</th>
                                        <th class="text-uppercase" scope="col" >FECHA DIAGNOSTICO</th>
                                        <th class="text-uppercase" scope="col" >TIPO</th>

                                    </tr>
                                </thead>
                                <tbody id="tbodyDiagnostico" class="overflow-auto" >
                                </tbody>
                            </table>
                        </div>
                        <!-- /tables -->
                    </div>

                    <div class="mt-2">
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
                <!-- /tab pane-->

                <div class="col-lg-12 text-left">
                    <button type="button" id="btnCerrar" class="btn btn-outline-primary btn-sm" > <i class="icon icon-reply icon-lg"></i> CANCELAR</button>
                </div> 
            </div>
            <!-- /tab content -->

        </div>
        <!-- /card --> 
    </div>
</div>

<div class="modal fade overflow-auto" id="ventanaModalPaciente" data-backdrop="static"
     tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">

            <div class="modal-header">
                <h6  class="modal-title" id="txtTituloModalDiagnostico"></h6>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <form id="FrmDiagnosticoPaciente">
                <div class="modal-body">

                    <div class="row" >
                        <div class="col-lg-6 col-sm-6">
                            <div class="form-group ">
                                <label for="txtPaPaciente">PA</label>
                                <input  type="text" class="form-control form-control-sm" id="txtPaPaciente" placeholder="PA">
                            </div>
                        </div>

                        <div class="col-lg-6 col-sm-6">
                            <div class="form-group ">
                                <label for="txtZonaControlPaciente">ZONA DE CONTROL</label>
                                <select class="form-control form-control-sm " id="txtZonaControlPaciente">
                                    <option value="-1">seleccione tipo...</option>
                                    <option value="0">MSI</option>
                                    <option value="1">MSD</option>

                                </select>
                            </div>
                        </div>

                        <div class="col-lg-6 col-sm-6">
                            <div class="form-group ">
                                <label for="txtPosicionPaciente">POSICIÓN</label>
                                <select class="form-control form-control-sm " id="txtPosicionPaciente">
                                    <option value="-1">seleccione...</option>
                                    <option value="1">DECÚBITO DORSAL</option>
                                    <option value="3">SENTADO</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-lg-6 col-sm-6">
                            <div class="form-group ">
                                <label for="txtFcPaciente">FC</label>
                                <input type="text" class="form-control form-control-sm" id="txtFcPaciente" placeholder="FC">
                            </div>
                        </div>

                        <div class="col-lg-6 col-sm-6">
                            <div class="form-group ">
                                <label for="txtFrPaciente">FR</label>
                                <input  type="text" class="form-control form-control-sm" id="txtFrPaciente" placeholder="FR">
                            </div>
                        </div>

                        <div class="col-lg-6 col-sm-6">
                            <div class="form-group ">
                                <label for="txtTPaciente">T°</label>
                                <input type="text" class="form-control form-control-sm" id="txtTPaciente" placeholder="T°">
                            </div>
                        </div>

                        <div class="col-lg-6 col-sm-6">
                            <div class="form-group ">
                                <label for="txtSo2Paciente">SO<sub>2</sub></label>
                                <input type="text" class="form-control form-control-sm" id="txtSoPaciente" placeholder="S02">
                            </div>
                        </div>

                        <div class="col-lg-6 col-sm-6">
                            <div class="form-group ">
                                <label for="txtGlicemiaPaciente">GLICEMIA</label>
                                <input  type="text" class="form-control form-control-sm" id="txtGlicemiaPaciente" placeholder="GLICEMIA">
                            </div>
                        </div>

                        <div class="col-lg-6 col-sm-6">
                            <div class="form-group ">
                                <label for="txtAyunoPaciente">AYUNO</label>
                                <select class="form-control form-control-sm " id="txtAyunoPaciente">
                                    <option value="-1">seleccione...</option>
                                    <option  value="1">SI</option>
                                    <option value="0">NO</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-lg-6 col-sm-6">
                            <div class="form-group ">
                                <label for="txtPesoPaciente">PESO</label>
                                <input  type="text" class="form-control form-control-sm" id="txtPesoPaciente" placeholder="PESO">
                            </div>
                        </div>

                        <div class="col-lg-6 col-sm-6">
                            <div class="form-group ">
                                <label for="txtTallaPaciente">TALLA (Metros)</label>
                                <input  type="text" class="form-control form-control-sm" id="txtTallaPaciente" placeholder="TALLA">
                            </div>
                        </div>

                        <div class="col-lg-6 col-sm-6">
                            <div class="form-group ">
                                <label for="txtImcPaciente">IMC</label>
                                <input disabled type="text" class="form-control form-control-sm" id="txtImcPaciente" placeholder="IMC">
                            </div>
                        </div>

                        <div class="col-lg-6 col-sm-6">
                            <label for="txtEnfermedadPaciente">ENF. ACTUAL</label>
                            <div class="form-group">
                                <textarea class="form-control " id="txtEnfermedadPaciente" rows="3" placeholder="ENFERMEDAD ACTUAL"></textarea>
                            </div>
                        </div>

                        <div class="col-lg-6 col-sm-6">
                            <label for="txtDxPaciente">Dx</label>
                            <div class="form-group">
                                <textarea class="form-control " id="txtDxPaciente" rows="3" placeholder="Dx"></textarea>
                            </div>
                        </div>

                        <div class="col-lg-6 col-sm-6">
                            <label for="txtTtoPaciente">Tto</label>
                            <div class="form-group">
                                <textarea class="form-control " id="txtTtoPaciente" rows="3" placeholder="Tto"></textarea>
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


<div class="modal fade" id="modalCargandoPaciente" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Cargando Pacientes. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modalCargandoDiagnostico" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Cargando Diagnosticos. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
