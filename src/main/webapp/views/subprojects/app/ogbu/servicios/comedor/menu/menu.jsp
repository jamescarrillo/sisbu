<%-- 
    Document   : menusemanal
    Created on : 29/08/2019, 10:48:29 AM
    Author     : Andres
--%>


<div class="row">
    <div class="col-xl-12">
        <!-- Card -->
        <div class="card overflow-hidden">
            <!-- Card Header -->
            <div class="card-header bg-transparent">
                <h4 class="mb-0" id="titleManagerDetalleCronogramaCU">[ 2 ] MENU</h4>
                <input type="hidden" id="pageDetalleCronogramaCU" value="1">
            </div>
            <!-- /card header -->
            <!-- Card Body -->
            <div class="card-body pt-0">
                <form id="FrmDetalleCronogramaCU">
                    <div class="input-group">
                        <select class="custom-select " id="txtFilterMenu">
                            <option value="">FILTRO...</option>
                            <option selected  value="1">LUNES</option>
                            <option value="2">MARTES</option>
                            <option value="3">MIÉRCOLES</option>
                            <option value="4">JUEVES</option>
                            <option value="5">VIERNES</option>
                        </select>
                        <button type="submit" class="btn btn-primary btn-sm mr-2"><i class="icon icon-search icon-fw"></i> BUSCAR</button>
                        <button type="button" class="btn btn-primary btn-sm" id="btnOpenNewDetalleCronogramaCU"><i class="icon icon-plus icon-fw"></i></button>
                    </div>
                </form>
                <!-- Tables -->
                <div class="table-responsive">
                    <table class="table mb-0">
                        <thead>
                            <tr>
                                <th class="text-uppercase" scope="col" >FECHA</th>
                                <th class="text-uppercase" scope="col" >DESAYUNO</th>
                                <th class="text-uppercase" scope="col" >ALMUERZO</th>
                                <th class="text-uppercase" scope="col" >CENA</th>
                                <th class="text-uppercase" scope="col" colspan="2" style="width: 20%">ACCION</th>
                            </tr>
                        </thead>
                        <tbody id="tbodyDetalleCronogramaCU">
                        </tbody>
                    </table>
                </div>
                <!-- /tables -->
                <div class="row mt-2">
                    <div class="col-md-2 col-sm-3 col-4">
                        <select id="sizePageDetalleCronogramaCU" class="form-control form-control-sm select2-single">
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                    <div class="col-md-10 col-sm-9 col-8">
                        <nav aria-label="Page navigation example">
                            <ul id="paginationDetalleCronogramaCU" class="pagination pagination-sm justify-content-end">
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
<div class="modal fade" id="ventanaModalDetalleCronogramaCU" data-backdrop="static"
     tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <form id="FrmDetalleCronogramaCUModal">
                <div class="modal-header">
                    <h6 class="modal-title" id="txtTituloModalMan"></h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">

                        <div class="form-group col-12">
                            <label for="txtTipoDetalleCronogramaCU">MENU SEMANAL</label>
                            <select class="custom-select" id="txtTipoDetalleCronogramaCU">
                                <option selected="0" value="0">seleccione...</option>
                                <option value="1">SEGUNDO</option>
                                <option value="2">BEBIDA</option>
                                <option value="3">POSTRE</option>
                                <option value="4">SOPA</option>
                            </select>
                        </div>
                        <div class="form-group col-12">
                            <label for="txtTipoDetalleCronogramaCU">DÍA</label>
                            <select class="custom-select" id="txtDiaDetalleCronogramaCU">
                                <option selected="0" value="0">seleccione...</option>
                                <option value="1">LUNES</option>
                                <option value="2">MARTES</option>
                                <option value="3">MIÉRCOLES</option>
                                <option value="4">JUEVES</option>
                                <option value="5">VIERNES</option>
                            </select>
                        </div>
                        <div class="form-group col-4">
                            <button type="button" id="buttonDesayuno" class="btn btn-outline-primary btn-block">
                                <i class="icon icon-plus icon-fw"></i> DESAYUNO</button>
                        </div>
                        <div class="form-group col-4">
                            <button type="button" id="buttonAlmuerzo"class="btn btn-outline-primary btn-block">
                                <i class="icon icon-plus icon-fw"></i> ALMUERZO</button>
                        </div>
                        <div class="form-group col-4">
                            <button type="button" id="buttonCena" class="btn btn-outline-primary btn-block">
                                <i class="icon icon-plus icon-fw"></i> CENA</button>
                        </div>
                        <!-- <div class="form-group col-12 ">
                           
                            <div class="table-responsive">
                                <table class="table mb-0">
                                    <thead>
                                        <tr>
                                            <th class="text-uppercase" scope="col" >COMIDA DEL DÍA</th>
                                            <th class="text-uppercase" scope="col" >TIPO</th>
                                            <th class="text-uppercase" scope="col" >DESCRIPCION</th>
                                            <th class="text-uppercase" scope="col" >ACCIÓN</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyComida">
                                    </tbody>
                                </table>
                            </div>
                           
                        </div>

                         Tables -->


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
<div class="modal fade" id="ventanaModalComidaDiaria" data-backdrop="static"
     tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-md" role="document">
        <div class="modal-content">
            <form id="FrmComidaDiariaModal">
                <div class="modal-header">
                    <h6 class="modal-title" id="txtTituloModalComidaDiaria"></h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="form-group ">
                                <select class="custom-select " id="txtFilterTipoComida">
                                    <option value="">seleccione tipo...</option>
                                    <option selected  value="1">SEGUNDO</option>
                                    <option value="2">BEBIDA</option>
                                    <option value="3">POSTRE</option>
                                    <option value="4">SOPA</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-12 " >
                            <div class="search-box " style="max-width: 100%;">
                                <div class="input-group">
                                    <input class="form-control" placeholder="Filter..." id="txtFilterComida"  type="search">
                                    <span class="search-icon"><i class="icon icon-search icon-lg"></i></span>
                                </div>
                                <div id="ResultadoComida"> 
                                </div>
                            </div>
                            <!--     <div class="form-group ">                   
                                     <input class="form-control " id="txtFilterComida" 
                                            type="text" placeholder="Filter...">
                                     <div id="ResultadoComida"> 
                                     </div>
                                 </div>-->
                        </div>
                        <div class="form-group col-12 ">
                            <!-- Tables -->
                            <div class="table-responsive">
                                <table class="table mb-0">
                                    <thead>
                                        <tr>
                                            <th class="text-uppercase" scope="col" >TIPO</th>
                                            <th class="text-uppercase" scope="col" >DESCRIPCION</th>
                                            <th class="text-uppercase" scope="col" >ACCIÓN</th>
                                        </tr>
                                    </thead>
                                    <tbody class="tbodyComidaDiaria">
                                    </tbody>
                                </table>
                            </div>
                            <!-- /tables -->
                        </div>

                    </div>


                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary btn-sm" data-dismiss="modal">CANCELAR</button>
                    <button type="button" id="btnGuardarComida" class="btn btn-outline-primary btn-sm"><i class="fa fa-floppy-o"></i> AGREGAR COMIDA</button>
                </div>
            </form>
        </div>
    </div>
</div>
<div class="modal fade" id="ventanaModalComidaTabla" data-backdrop="static"
     tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-md" role="document">
        <div class="modal-content">
           
                <div class="modal-header">
                    <h6 class="modal-title" id="txtTituloModalComidaTabla"></h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                   
                        <div class="form-group col-12 ">
                            <!-- Tables -->
                            <div class="table-responsive">
                                <table class="table mb-0">
                                    <thead>
                                        <tr>
                                            <th class="text-uppercase" scope="col" >TIPO</th>
                                            <th class="text-uppercase" scope="col" >DESCRIPCION</th>
                                        </tr>
                                    </thead>
                                    <tbody class="tbodyComidaDiaria">
                                    </tbody>
                                </table>
                            </div>
                            <!-- /tables -->
                        </div>

                    </div>


                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary btn-sm" data-dismiss="modal">CANCELAR</button>
                </div>
        </div>
    </div>
</div>
<div class="modal fade" id="modalCargandoDetalleCronogramaCU" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Cargando Menu. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
