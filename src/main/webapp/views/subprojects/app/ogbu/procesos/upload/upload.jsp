<%-- 
    Document   : comida.jsp
    Created on : 28/08/2019, 09:48:09 AM
    Author     : Andres
--%>

<div class="row" id="row-uploads">
    <div class="col-xl-12">
        <!-- Card -->
        <div class="card overflow-hidden">
            <!-- Card Header -->
            <div class="card-header bg-transparent">
                <h4 class="mb-0" id="titleManagerUploadAlumno">[ 0 ] IMPORTACIONES</h4>
                <input type="hidden" id="pageUploadAlumno" value="1">
            </div>
            <!-- /card header -->
            <!-- Card Body -->
            <div class="card-body pt-0">
                <form id="FrmUploadAlumno">
                    <div class="input-group search-box" style="max-width: 100%;">
                        <input type="search" id="txtFilterUploadAlumno" class="form-control form-control-sm" placeholder="FILTRO. . .">
                        <span class="search-icon"><i class="icon icon-search icon-lg"></i></span>
                        <button type="submit" class="btn btn-primary btn-sm mr-2"><i class="icon icon-search icon-fw"></i> BUSCAR</button>
                        <button type="button" class="btn btn-primary btn-sm" id="btnOpenNewUploadAlumno"><i class="icon icon-plus icon-fw"></i></button>
                    </div>
                </form>
                <!-- Tables -->
                <div class="table-responsive">
                    <table class="table mb-0 mt-2">
                        <thead>
                            <tr>
                                <th class="text-uppercase" scope="col" >CICLO ACADEMICO</th>
                                <th class="text-uppercase" scope="col" >FECHA</th>
                                <th class="text-uppercase" scope="col" >CANTIDAD</th>
                                <th class="text-uppercase" scope="col" >USUARIO</th>
                            </tr>
                        </thead>
                        <tbody id="tbodyUploadAlumno">
                        </tbody>
                    </table>
                </div>
                <!-- /tables -->
                <div class="row mt-2">
                    <div class="col-md-2 col-sm-3 col-4">
                        <select id="sizePageUploadAlumno" class="form-control form-control-sm select2-single">
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                    <div class="col-md-10 col-sm-9 col-8">
                        <nav aria-label="Page navigation example">
                            <ul id="paginationUploadAlumno" class="pagination pagination-sm justify-content-end">
                            </ul>
                        </nav>  
                    </div>
                </div>
            </div>
            <!-- /card body -->
        </div>
        <!-- /card -->
    </div>
</div>

<div class="row" id="row-crud-uploads" style="display: none">
    <div class="col-xl-12">
        <!-- Card -->
        <div class="card overflow-hidden">
            <!-- Card Header -->
            <div class="card-header bg-transparent">
                <h4 class="mb-0" id="titleCrudUploadAlumno"></h4>
            </div>
            <div class="card-body pt-0">
                <div class="row">
                    <div class="form-group col-12">
                        <label for="txtCicloAcademico">CICLO ACADÉMICO</label>
                        <div class="input-group">
                            <input type="text" class="form-control form-control-sm" id="txtCicloAcademico" aria-describedby="nombre" placeholder="Click en el botón para seleccionar. . ." disabled="">
                            <div class="input-group-append">
                                <button type="button" id="btnSeleccionarCicloAcademico" class="btn btn-primary btn-sm"><i class="icon icon-subscribe"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-12">
                        <label for="">EXCEL <small>[Seleccione Archivo Excel (xlsx, xls)]</small></label>
                        <div class="input-group">
                            <input type="text" class="form-control form-control-sm" id="txtNombreFileExcel" disabled="" placeholder="Click en el botón para seleccionar un archivo">
                            <div class="input-group-append">
                                <input id="excelfile" type="file" style="display: none">
                                <button type="button" id="btnSeleccionarArchivo" class="btn btn-primary btn-sm mr-3"><i class="icon icon-subscribe"></i></button>
                                <button type="button" id="btnCargarTablaHTML" class="btn btn-primary btn-sm"><i class="icon icon-watchlist"></i> LEER ARCHIVO</button>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-12">
                        <label for="txtComentario">COMENTARIO</label>
                        <textarea id="txtComentario" class="form-control" placeholder="COMENTARIO" rows="2"></textarea>
                    </div>
                    <div class="col-12 text-right">
                        <button type="button" id="btnCancelarCargaUsuarios" class="btn btn-outline-primary btn-xs"><i
                                class="icon icon-reply"></i>
                            CANCELAR</button>
                        <button type="button" id="btnGuardarCargaUsuarios" class="btn btn-primary btn-xs">CARGAR USUARIOS</button>
                    </div>
                    <div class="col-12" id="contenedorTablaAlumnos">
                        <label id="lblCantidadImportar">[0] USUARIOS </label>
                        <table class="table table-responsive table-bordered table-hover table-sm" id="exceltable">

                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="ventanaModalUploadAlumno" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <form id="FrmUploadAlumnoModal">
                <div class="modal-header">
                    <h6 class="modal-title" id="txtTituloModalMan"></h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="form-group col-12">
                            <label for="txtNombreUploadAlumno">NOMBRE</label>
                            <input class="form-control form-control-sm" id="txtNombreUploadAlumno" type="text" placeholder="NOMBRE">
                        </div>

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary btn-sm" data-dismiss="modal">CANCELAR</button>
                    <button type="submit" id="btnGuardar" class="btn btn-outline-primary btn-sm"><i class="fa fa-floppy-o"></i> GUARDAR</button>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="modal fade" id="modalCargandoUploadAlumno" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Procesar solicitud. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modalCargandoExcel" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Leyendo Archivo. . .
                    </div>
                </div>
            </div>
        </div>
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
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal" id="btn-cancelar-ciclo-academico"><i class="fas fa-ban"></i>
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