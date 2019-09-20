<%-- 
    Document   : newjspsdsd
    Created on : 20 set. 2019, 01:25:09
    Author     : James Carrillo
--%>

<div id="ventanaModalAlternativa" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
     data-keyboard="false" style="padding-top: 4%; overflow-y: visible;background-color: rgba(0,0,0,.3)">
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="border-color: #757575; border-width: 4px;border-radius: 10px">
            <div class="modal-header">
                <h5 class="mb-0" id="titleManagerAlternativa"><strong>[ 0 ]
                        ALTERNATIVAS</strong></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pb-0 pt-0">
                <div class="row">
                    <div class="col-12">
                        <input type="hidden" id="pageAlternativa"
                               value="1">
                        <form id="FrmAlternativa">
                            <div class="row mt-3">
                                <div class="input-group col-12">
                                    <input type="text" id="txtFilterAlternativa"
                                           class="form-control form-control-sm mr-3" placeholder="INGRESE FILTRO . . .">
                                    <button type="submit" id="btnBuscarAlternativa"
                                            class="btn btn-primary btn-xs mr-3" data-toggle="tooltip"
                                            title="Buscar Area"><i class="fa fa-search" aria-hidden="true"></i>
                                        BUSCAR</button>
                                    <button type="button" id="btnOpenNewAlternativa" class="btn btn-primary btn-xs"
                                            data-toggle="tooltip" title="Agregar Area"><i class="icon icon-plus"
                                                                                  aria-hidden="true"></i></button>
                                </div>
                            </div>
                        </form>
                        <div class="row pl-5 pr-5">
                            <div class="table-responsive">
                                <table class="table mb-0 table-fluid">
                                    <thead>
                                        <tr>
                                            <th class="align-middle">Nombre</th>
                                            <th style="width: 15%" colspan="2" class="text-center align-middle">
                                                Acción
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyAlternativa">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row mt-2 mb-2">
                            <div class="col-sm-3 col-4 mt-2">
                                <select id="sizePageAlternativa"
                                        class="form-control form-control-sm sisbu-cursor-mano combo-paginar">
                                    <option value="8">8</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>
                            <div class="col-sm-9 col-8 mt-2">
                                <nav aria-label="Page navigation Alternativa">
                                    <ul id="paginationAlternativa"
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
                    CANCELAR</button>
                <button type="button" id="btn-selecionar-area-psi" class="btn btn-primary btn-xs"><i
                        class="fas fa-check"></i> SELECCIONAR</button>
            </div>
        </div>
    </div>
</div>

<div id="ventanaModalManAlternativa" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
     data-keyboard="false" style="padding-top: 4.5%; overflow-y: visible;background-color: rgba(0,0,0,.4)">
    <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content" style="border-color: #ffbc34; border-width: 4px;border-radius: 10px">
            <form id="FrmAlternativaModal">
                <div class="modal-header">
                    <h6 class="modal-title" id="txtTituloModalManAlternativa"></h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-row">
                        <div class="col-12 mb-2">
                            <label for="txtNombreAlternativa">Nombre</label>
                            <input type="text" id="txtNombreAlternativa"
                                   class="form-control form-control-sm" placeholder="Ingrese nombre. . ." maxlength="100">
                        </div>
                        <div class="col-lg-6 col-12 mb-2">
                            <label for="txtValorAlternativa">Valor Numérico</label>
                            <input type="number" id="txtValorAlternativa"
                                   class="form-control form-control-sm" placeholder="Ingrese valor numérico. . ." maxlength="10">
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

<div class="modal" id="modalCargandoAlternativa" data-backdrop="static" data-keyboard="false" tabindex="-1"
     role="dialog" aria-hidden="true" style="padding-top: 18%; overflow-y: visible;background-color: rgba(0,0,0,.5)">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;height: 15px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        Cargando alternativas. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>