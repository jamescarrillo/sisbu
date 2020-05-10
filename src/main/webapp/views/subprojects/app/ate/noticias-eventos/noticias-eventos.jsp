<%-- 
    Document   : perfil
    Created on : 26 set. 2019, 12:40:25
    Author     : Llontop Diaz Andr�s
--%>
<div class="dt-page__header mb-3">
    <h1 class="dt-page__title">Noticias y Eventos</h1>
    <input type="hidden" id="pageNoticia" value="1">
</div>

<!-- /card header -->
<div class="row">
    <div class="col-12 p-0">
        <div class="form-row" id="tbodyNoticia">

        </div>
    </div>
</div>

<!-- /tables -->
<div class="row mt-2">
    <div class="col-md-2 col-sm-3 col-4 ">
        <select id="sizePageNoticia" class="form-control form-control-sm select2-single">
            <option value="6">6</option>
            <option value="9">9</option>
            <option value="12">12</option>
        </select>
    </div>
    <div class="col-md-10 col-sm-9 col-8">
        <nav aria-label="Page navigation example">
            <ul id="paginationNoticia" class="pagination pagination-sm justify-content-end">
            </ul>
        </nav>
    </div>
</div>
<div class="modal fade" id="modalCargandoNoticia" data-backdrop="static" data-keyboard="false" tabindex="-1"
    role="dialog" style="padding-top: 18%; overflow-y: visible; display: none;" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="progress" style="margin-bottom: 0px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                        aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%">
                        Cargando Noticias. . .
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>