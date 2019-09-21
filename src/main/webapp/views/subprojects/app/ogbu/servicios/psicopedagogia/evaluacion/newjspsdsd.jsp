<%-- 
    Document   : newjspsdsd
    Created on : 20 set. 2019, 01:25:09
    Author     : James Carrillo
--%>

<!--CRUD INCONSISTENCIA-->
<div id="ventanaModalInconsistenciaPsi" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
     data-keyboard="false" style="padding-top: 1%; overflow-y: visible;background-color: rgba(0,0,0,.1)">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content" style="border-color: #757575; border-width: 4px;border-radius: 10px">
            <div class="modal-header">
                <h5 class="mb-0" id="titleManagerInconsistenciaPsi"><strong>[ 0 ]
                        ITEMS INCONSISTENCIA</strong></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pb-0 pt-0">
                <div class="row">
                    <div class="col-12">
                        <input type="hidden" id="pageInconsistenciaPsi"
                               value="1">
                        <form id="FrmInconsistenciaPsi">
                            <div class="row mt-3">
                                <div class="input-group col-12">
                                    <input type="text" id="txtFilterInconsistenciaPsi"
                                           class="form-control form-control-sm mr-3" placeholder="INGRESE FILTRO . . .">
                                    <button type="submit" id="btnBuscarInconsistenciaPsi"
                                            class="btn btn-primary btn-xs mr-3" data-toggle="tooltip"
                                            title="Buscar"><i class="fa fa-search" aria-hidden="true"></i>
                                        BUSCAR</button>
                                    <button type="button" id="btnOpenNewInconsistenciaPsi" class="btn btn-primary btn-xs"
                                            data-toggle="tooltip" title="Agregar Par"><i class="icon icon-plus"
                                                                                 aria-hidden="true"></i></button>
                                </div>
                            </div>
                        </form>
                        <div class="row pl-5 pr-5">
                            <div class="table-responsive">
                                <table class="table mb-0 table-fluid">
                                    <thead>
                                        <tr>
                                            <th class="align-middle" style="width: 35%">NOMBRE/DESCRIPCIÓN</th>
                                            <th class="align-middle">PARES</th>
                                            <th style="width: 15%" colspan="2" class="text-center align-middle">
                                                Acción
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyInconsistenciaPsi">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row mt-2 mb-2">
                            <div class="col-sm-3 col-4 mt-2">
                                <select id="sizePageInconsistenciaPsi"
                                        class="form-control form-control-sm sisbu-cursor-mano combo-paginar">
                                    <option value="8">8</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>
                            <div class="col-sm-9 col-8 mt-2">
                                <nav aria-label="Page navigation InconsistenciaPsi">
                                    <ul id="paginationInconsistenciaPsi"
                                        class="pagination justify-content-end">

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal"><i class="fas fa-ban"></i>
                    CERRAR</button>
            </div>
        </div>
    </div>
</div>

<div id="ventanaModalManInconsistenciaPsi" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
     data-keyboard="false" style="padding-top: 1.5%; overflow-y: visible;background-color: rgba(0,0,0,.2)">
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="border-color: #ffbc34; border-width: 4px;border-radius: 10px">
            <form id="FrmInconsistenciaPsiModal">
                <div class="modal-header">
                    <h6 class="modal-title" id="txtTituloModalManInconsistenciaPsi"></h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-row">
                        <div class="col-12 mb-2">
                            <label for="txtNombreInconsistenciaPsi">Nombre</label>
                            <input type="text" id="txtNombreInconsistenciaPsi"
                                   class="form-control form-control-sm" placeholder="Ingrese nombre. . ." maxlength="100">
                        </div>
                        <div class="col-12 mb-2">
                            <label for="txtDescripcionInconsistenciaPsi">Descripción</label>
                            <textarea type="text" id="txtDescripcionInconsistenciaPsi"
                                      class="form-control form-control-sm" placeholder="Ingrese descripción. . ." maxlength="200" rows="3">
                            </textarea>
                        </div>
                        <div class="col-12 mb-2">
                            <label for="txtPreguta1InconsistenciaPsi">PREGUNTA 1</label>
                            <div class="input-group">
                                <input type="text" class="form-control form-control-sm" id="txtPreguta1InconsistenciaPsi" aria-describedby="nombre" placeholder="Click en el botón para seleccionar. . ." disabled="">
                                <div class="input-group-append">
                                    <button type="button" id="btnSeleccionarPregunta1" class="btn btn-primary btn-sm"><i class="icon icon-subscribe"></i></button>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 mb-2">
                            <label for="txtPreguta2InconsistenciaPsi">PREGUNTA 2</label>
                            <div class="input-group">
                                <input type="text" class="form-control form-control-sm" id="txtPreguta2InconsistenciaPsi" aria-describedby="nombre" placeholder="Click en el botón para seleccionar. . ." disabled="">
                                <div class="input-group-append">
                                    <button type="button" id="btnSeleccionarPregunta2" class="btn btn-primary btn-sm"><i class="icon icon-subscribe"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal"><i
                            class="fas fa-ban"></i>
                        CANCELAR</button>
                    <button type="submit" class="btn btn-primary btn-xs"><i class="fas fa-save"></i> GUARDAR</button>
                </div>
            </form>
        </div>
    </div>
</div>

<div class="modal" id="modalCargandoInconsistenciaPsi" data-backdrop="static" data-keyboard="false" tabindex="-1"
     role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.3)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Procesando Solicitud. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>