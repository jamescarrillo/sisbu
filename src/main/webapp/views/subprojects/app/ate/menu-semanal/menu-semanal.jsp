<%-- 
    Document   : perfil
    Created on : 26 set. 2019, 12:40:25
    Author     : James Carrillo
--%>
<div class="row">
    <div
        class="col-12 dt-widget dt-card dt-social-card border border-w-2 border-light-teal text-light-gray m-0 pt-2 pb-2">
        <h2 class="text-center text-primary self-item-center mb-4">Men&uacute; Semal del Comedor Universitario
        </h2>
        <div class="col-12 p-0">
            <form id="FrmMenuSemanal">
                <div class="form-row col-12 justify-content-center p-0">
                    <div class="col-lg-4 col-sm-6 col-6">
                        <label for="txtMenuSemanalFechaI">Fecha Inicial</label>
                        <div class="input-group">
                            <input type="text" class="form-control form-control-sm" id="txtMenuSemanalFechaI"
                                placeholder="DD/MM/AAAA">
                            <div class="input-group-append">
                                <button type="button" id="btnEliminarMenuSemanalFechaI" data-toggle="tooltip"
                                    title="Eliminar Fecha" class="btn btn-primary btn-sm"><i
                                        class="icon icon-trash"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5 col-sm-6 col-6">
                        <label for="txtMenuSemanalFechaF">Fecha Final</label>
                        <div class="input-group">
                            <input type="text" class="form-control form-control-sm" id="txtMenuSemanalFechaF"
                                placeholder="DD/MM/AAAA">
                            <div class="input-group-append">
                                <button type="button" id="btnEliminarMenuSemanalFechaF" data-toggle="tooltip"
                                    title="Eliminar Fecha" class="btn btn-primary btn-sm"><i
                                        class="icon icon-trash"></i></button>
                                <button type="submit" class="btn btn-sm btn-outline-primary ml-2 p-1"> <i
                                        class="icon icon-lg icon-search"></i> Buscar</button>
                            </div>

                        </div>

                    </div>
                </div>

            </form>
        </div>

    </div>


    <!-- Tables -->
    <div class="col-12 table-responsive mt-3 p-0">
        <table class="table mb-0 ">
            <thead id="theadMenuSemanal" style="line-height: 0.4" class="p-1">
            </thead>
            <tbody id="tbodyCronograma">
                <!-- <tr>
                    <td class='align-middle'></td>
                    <td class='align-middle'></td>
                </tr> -->
            </tbody>
        </table>
    </div>
    <!-- /tables -->
</div>

<div class="modal fade" id="modalCargandoMenuSemanal" data-backdrop="static" data-keyboard="false" tabindex="-1"
    role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                        aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Cargando Menu. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>