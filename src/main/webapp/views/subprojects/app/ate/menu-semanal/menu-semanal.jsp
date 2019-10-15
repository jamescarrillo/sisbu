<%-- 
    Document   : perfil
    Created on : 26 set. 2019, 12:40:25
    Author     : James Carrillo
--%>

<div class="dt-page__header mb-3">
    <h2 class="dt-page__title text-primary text-center">MENU SEMANAL DEL COMEDOR UNIVERSITARIO</h2>
</div>

<!-- Tab OPENMENU -->
<form id="FrmMenuSemanal">
    <div class="row pt-3 mt-0 ">
        <div class="form-group col-lg-6 col-sm-6 ">
            <label for="txtMenuSemanalFechaI">DÍA DE LA SEMANA INICIAL (LUNES)</label>
            <div class="input-group">
                <input  type="text" class="form-control form-control-sm" id="txtMenuSemanalFechaI" placeholder="DD/MM/AAAA">
            </div>
        </div>
        <div class="form-group col-lg-6 col-sm-6">
            <label for="txtMenuSemanalFechaF">DÍA DE LA SEMANA FINAL (VIERNES)</label>
            <div class="input-group">
                <input  type="text" class="form-control form-control-sm" id="txtMenuSemanalFechaF" placeholder="DD/MM/AAAA">
            </div>
        </div>
    </div>
    <div class="col-12 text-center">
        <button type="submit" id="btnGuardar" class="btn btn-primary btn-sm"><i class="fa fa-search"></i> BUSCAR</button>
    </div>
</form>


<!-- Tables -->
<div class="table-responsive pt-3">
    <table class="table mb-0 ">
        <thead id="theadMenuSemanal" style="line-height: 0.4">

        </thead>
        <tbody id="tbodyCronograma">
            <tr>
                <td class='align-middle'></td>
                <td class='align-middle'></td>
            </tr>
        </tbody>
    </table>
</div>
<!-- /tables -->
<div class="modal fade" id="modalCargandoMenuSemanal" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
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