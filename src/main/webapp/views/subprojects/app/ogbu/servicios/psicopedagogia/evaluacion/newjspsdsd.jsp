<%-- 
    Document   : newjspsdsd
    Created on : 20 set. 2019, 01:25:09
    Author     : James Carrillo
--%>

<div id="ventanaModalCriticoPsi" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
     data-keyboard="false" style="padding-top: 1%; overflow-y: visible;background-color: rgba(0,0,0,.3)">
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="border-color: #757575; border-width: 4px;border-radius: 10px">
            <div class="modal-header">
                <h5 class="mb-0" id="titleManagerCriticoPsi"><strong>[ 0 ]
                        ITEMS CRITICOS</strong></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pb-0 pt-0">
                <div class="row">
                    <div class="col-12">
                        <input type="hidden" id="pageCriticoPsi"
                               value="1">
                        <form id="FrmCriticoPsi">
                            <div class="row mt-3">
                                <div class="input-group col-12">
                                    <input type="text" id="txtFilterCriticoPsi"
                                           class="form-control form-control-sm mr-3" placeholder="INGRESE FILTRO . . .">
                                    <button type="submit" id="btnBuscarCriticoPsi"
                                            class="btn btn-primary btn-xs mr-3" data-toggle="tooltip"
                                            title="Buscar"><i class="fa fa-search" aria-hidden="true"></i>
                                        BUSCAR</button>
                                    <button type="button" id="btnOpenNewCriticoPsi" class="btn btn-primary btn-xs"
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
                                            <th class="align-middle">PREGUNT 1</th>
                                            <th class="align-middle">PREGUNT 2</th>
                                            <th style="width: 15%" colspan="2" class="text-center align-middle">
                                                Acción
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyCriticoPsi">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row mt-2 mb-2">
                            <div class="col-sm-3 col-4 mt-2">
                                <select id="sizePageCriticoPsi"
                                        class="form-control form-control-sm sisbu-cursor-mano combo-paginar">
                                    <option value="8">8</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>
                            <div class="col-sm-9 col-8 mt-2">
                                <nav aria-label="Page navigation CriticoPsi">
                                    <ul id="paginationCriticoPsi"
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

<div id="ventanaModalManCriticoPsi" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
     data-keyboard="false" style="padding-top: 1.5%; overflow-y: visible;background-color: rgba(0,0,0,.4)">
    <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content" style="border-color: #ffbc34; border-width: 4px;border-radius: 10px">
            <form id="FrmCriticoPsiModal">
                <div class="modal-header">
                    <h6 class="modal-title" id="txtTituloModalManCriticoPsi"></h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-row">
                        <div class="col-lg-6 col-12 mb-2">
                            <label for="txtNombreCriticoPsi">Nombre</label>
                            <input type="text" id="txtNombreCriticoPsi"
                                   class="form-control form-control-sm" placeholder="Ingrese nombre. . ." maxlength="100">
                        </div>
                        <div class="col-12 mb-2">
                            <label for="txtDescripcionCriticoPsi">Descripción</label>
                            <textarea type="text" id="txtDescripcionCriticoPsi"
                                      class="form-control form-control-sm" placeholder="Ingrese descripción. . ." maxlength="200" rows="3">
                            </textarea>
                        </div>
                        <div class="col-12 mb-2">
                            <label for="txtPreguta1CriticoPsi">PREGUNTA 1</label>
                            <div class="input-group">
                                <input type="text" class="form-control form-control-sm" id="txtPreguta1CriticoPsi" aria-describedby="nombre" placeholder="Click en el botón para seleccionar. . ." disabled="">
                                <div class="input-group-append">
                                    <button type="button" id="btnSeleccionarPregunta1" class="btn btn-primary btn-sm"><i class="icon icon-subscribe"></i></button>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 mb-2">
                            <label for="txtPreguta2CriticoPsi">PREGUNTA 2</label>
                            <div class="input-group">
                                <input type="text" class="form-control form-control-sm" id="txtPreguta2CriticoPsi" aria-describedby="nombre" placeholder="Click en el botón para seleccionar. . ." disabled="">
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

<div class="modal" id="modalCargandoCriticoPsi" data-backdrop="static" data-keyboard="false" tabindex="-1"
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

<div id="ventanaModalSelectedPreguntaE" class="modal" tabindex="-1" role="dialog" data-backdrop="static"
     data-keyboard="false" style="padding-top: 1%; overflow-y: visible;background-color: rgba(0,0,0,.1)">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content" style="border-color: #0085c1; border-width: 4px;">
            <div class="modal-header">
                <h5 class="mb-0" id="titleManagerPreguntaE"><strong>[ 0 ]
                        PREGUNTAS</strong></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body pb-0 pt-0">
                <div class="row">
                    <div class="col-12">
                        <input type="hidden" id="pagePreguntaE"
                               value="1">
                        <form id="FrmPreguntaE">
                            <div class="row mt-3">
                                <div class="input-group col-12">
                                    <input type="text" id="txtFilterPreguntaE"
                                           class="form-control form-control-sm mr-3" placeholder="INGRESE FILTRO . . .">
                                    <button type="submit" id="btnBuscarPreguntaE"
                                            class="btn btn-primary btn-xs mr-3" data-toggle="tooltip"
                                            title="Buscar SubArea"><i class="fa fa-search" aria-hidden="true"></i>
                                        BUSCAR</button>
                                    <button type="button" id="btnOpenNewPreguntaE" class="btn btn-primary btn-xs"
                                            data-toggle="tooltip" title="Agregar SubArea"><i class="icon icon-plus"
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
                                    <tbody id="tbodyPreguntaE">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row mt-2 mb-2">
                            <div class="col-sm-4 mt-2">
                                <select id="sizePagePreguntaE"
                                        class="form-control form-control-sm sisbu-cursor-mano combo-paginar">
                                    <option value="8">08</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>
                            <div class="col-sm-8 mt-2">
                                <nav aria-label="Page navigation Area">
                                    <ul id="paginationPreguntaE"
                                        class="pagination justify-content-end">

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary btn-xs" data-dismiss="modal" id="btnCancelSelectionSubArea"><i class="fas fa-ban"></i>
                    CANCELAR</button>
                <button type="button" id="btn-selecionar-subarea-psi" class="btn btn-primary btn-xs"><i
                        class="fas fa-check"></i> SELECCIONAR</button>
            </div>
        </div>
    </div>
</div>