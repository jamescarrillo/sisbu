<%-- 
    Document   : comida.jsp
    Created on : 28/08/2019, 09:48:09 AM
    Author     : Andres
--%>

<div class="row">
    <div class="col-xl-12">
        <!-- Card -->
        <div class="card overflow-hidden">
            <!-- Card Header -->
            <div class="card-header bg-transparent">
                <h4 class="mb-0" id="titleManagerCicloAcademico">[ 0 ] Ciclo Académico</h4>
                <input type="hidden" id="pageCicloAcademico" value="1">
            </div>
            <!-- /card header -->
            <!-- Card Body -->
            <div class="card-body pt-0">
                <form id="FrmCicloAcademico">
                    <div class="input-group search-box" style="max-width: 100%;">
                        <input type="search" id="txtFilterCicloAcademico" class="form-control form-control-sm" placeholder="FILTRO. . .">
                        <div class="input-group-append">
                            <span class="search-icon"><i class="icon icon-search icon-lg"></i></span>
                            <button type="submit" class="btn btn-primary btn-sm mr-2"><i class="icon icon-search icon-fw"></i> BUSCAR</button>
                        </div>
                        <button type="button" class="btn btn-primary btn-sm" id="btnOpenNewCicloAcademico"data-toggle="tooltip" title="Agregar Ciclo Académico" ><i class="icon icon-addnew"></i></button>
                    </div>
                </form>
                <!-- Tables -->
                <div class="table-responsive">
                    <table class="table mb-0 mt-2">
                        <thead class="bg-primary ">
                            <tr>
                                <th class="text-uppercase text-white pb-2 pt-3" scope="col" style="width: 10%">ACCION</th>
                                <th class="text-uppercase text-white pb-2 pt-3" scope="col" >NOMBRE</th>
                                <th class="text-uppercase text-white pb-2 pt-3" scope="col" >FECHA INICIAL</th>
                                <th class="text-uppercase text-white pb-2 pt-3" scope="col" >FECHA FINAL</th>
                            </tr>
                        </thead>
                        <tbody id="tbodyCicloAcademico">
                        </tbody>
                    </table>
                </div>
                <!-- /tables -->
                <div class="row mt-2">
                    <div class="col-md-2 col-sm-3 col-4">
                        <select id="sizePageCicloAcademico" class="form-control form-control-sm select2-single">
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                    <div class="col-md-10 col-sm-9 col-8">
                        <nav aria-label="Page navigation example">
                            <ul id="paginationCicloAcademico" class="pagination pagination-sm justify-content-end">
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
<div class="modal fade" id="ventanaModalCicloAcademico" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <form id="FrmCicloAcademicoModal">
                <div class="modal-header">
                    <h6 class="modal-title" id="txtTituloModalMan"></h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="form-group col-12">
                            <label for="txtNombreCicloAcademico">NOMBRE</label>
                            <input class="form-control form-control-sm" id="txtNombreCicloAcademico" type="text" placeholder="NOMBRE">
                        </div>
                        <div class="form-group col-6">
                            <label for="txtFechaInicioCicloAcademico">FECHA INICIO</label>

                            <div class="input-group">
                                <input  type="text" class="form-control form-control-sm" id="txtFechaInicioCicloAcademico" placeholder="DD/MM/AAAA">
                                <div class="input-group-append">
                                    <button type="button" id="btnEliminarFechaI" data-toggle="tooltip" title="Eliminar Fecha" class="btn btn-primary btn-sm"><i class="fa fa-trash"></i></button>
                                </div>
                            </div>

                        </div>
                        <div class="form-group col-6">
                            <label for="txtFechaFinCicloAcademico">FECHA FIN</label>
                            <div class="input-group">
                                <input  type="text" class="form-control form-control-sm" id="txtFechaFinCicloAcademico" placeholder="DD/MM/AAAA">
                                <div class="input-group-append">
                                    <button type="button" id="btnEliminarFechaF" data-toggle="tooltip" title="Eliminar Fecha" class="btn btn-primary btn-sm"><i class="fa fa-trash"></i></button>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                <div class="modal-footer text-center">
                    <button type="button" class="btn btn-outline-primary btn-sm" data-dismiss="modal">CANCELAR</button>
                    <button type="submit" id="btnGuardar" class="btn btn-primary btn-sm">GUARDAR</button>
                </div>
            </form>
        </div>
    </div>
</div>
<div class="modal fade" id="modalCargandoCicloAcademico" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Cargando CicloAcademicos. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
