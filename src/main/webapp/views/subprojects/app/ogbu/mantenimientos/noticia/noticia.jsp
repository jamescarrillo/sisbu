<%-- 
    Document   : comida.jsp
    Created on : 28/08/2019, 09:48:09 AM
    Author     : Andres
--%>

<div class="row d-flex" id="btnListaNoticia">
    <div class="col-xl-12 p-0">
        <!-- Card -->
        <div class="overflow-hidden">
            <!-- Card Header -->
            <div class="card-header bg-transparent">
                <h4 class="mb-0" id="titleManagerNoticia">[ 0 ] NOTICIAS</h4>
                <input type="hidden" id="pageNoticia" value="1">
            </div>
            <!-- /card header -->
            <!-- Card Body -->
            <div class="card-body p-0">
                <form id="FrmNoticia">

                    <div class="row">
                        <div class="col-lg-4 col-sm-6 col-12 form-group">
                            <label for="txtFechaIFilterNoticia">Desde</label>
                            <div class="input-group input-group-sm">
                                <input type="text" id="txtFechaIFilterNoticia" class="form-control form-control-sm"
                                    placeholder="DD/MM/AAAA">
                                <div class="input-group-append">
                                    <button class="btn btn-dark btn-sm input-ii" type="button"
                                        id="btnEliminarFechaIFilterNoticia" data-toggle="tooltip"
                                        title="Eliminar Fecha">
                                        <i class="icon icon-trash"></i></button>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-sm-6 col-12 form-group">
                            <label for="txtFechaFFilterNoticia">Hasta</label>
                            <div class="input-group input-group-sm">
                                <input type="text" id="txtFechaFFilterNoticia" class="form-control form-control-sm"
                                    placeholder="DD/MM/AAAA">
                                <div class="input-group-append">
                                    <button class="btn btn-dark btn-sm input-ii" type="button"
                                        id="btnEliminarFechaFFilterNoticia" data-toggle="tooltip"
                                        title="Eliminar Fecha">
                                        <i class="icon icon-trash"></i></button>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-12 form-group align-self-end ">
                            <div class="input-group w-100 justify-content-center">
                                <button type="submit" class="btn btn-primary btn-sm mr-2"><i
                                        class="icon icon-search icon-fw"></i> BUSCAR
                                </button>
                                <button type="button" class="btn btn-primary btn-sm" id="btnOpenNewNoticia"
                                    data-toggle="tooltip" title="Agregar Noticia"><i class="icon icon-addnew"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

                <!-- Card -->
                <div class="dt-card m-0">
                    <!-- Card Body -->
                    <div class="dt-card__body p-0  ">
                        <!-- Widget -->
                        <div class="dt-widget dt-widget-hl-item-space dt-widget-mb-item dt-widget-hover-bg  dt-social-card border border-w-2 border-light-teal"
                            id="tbodyNoticia">
                        </div>
                        <!-- /widget -->
                        <!-- /card body -->
                    </div>

                </div>
                <!-- /card -->
                <!-- /tables -->
                <div class="row mt-2">
                    <div class="col-md-2 col-sm-3 col-4">
                        <select id="sizePageNoticia" class="form-control form-control-sm select2-single">
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                    <div class="col-md-10 col-sm-9 col-8">
                        <nav aria-label="Page navigation example">
                            <ul id="paginationNoticia" class="pagination pagination-sm justify-content-end">
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

<div class="row justify-content-center d-none" id="btnOpenNoticia">
    <div class="col-lg-12">
        <form id="FrmNoticiaModal" class="card dt-card dt-social-card border border-w-2 border-light-teal p-1 m-0">

            <h4 id="txtTituloModalMan" class="card-header m-1 text-center text-primary">NOTICIAS</h4>
            <div class="card-body p-2 form-row">
                <div class="form-group col-sm-6 col-12">
                    <label for="txtFuenteNoticia">Fuente</label>
                    <input class="form-control form-control-sm" id="txtFuenteNoticia" type="text" placeholder="FUENTE">
                </div>
                <div class="form-group col-sm-6 col-12">
                    <label for="txtFechaNoticia">Fecha de Publicaci�n</label>
                    <div class="input-group">
                        <input type="text" class="form-control form-control-sm" id="txtFechaNoticia"
                            placeholder="DD/MM/AAAA">
                        <div class="input-group-append">
                            <button type="button" id="btnEliminarFechaNoticia" data-toggle="tooltip"
                                title="Eliminar Fecha" class="btn btn-primary btn-sm"><i
                                    class="fa fa-trash"></i></button>
                        </div>
                    </div>
                </div>
                <div class="form-group col-12">
                    <label for="txtTituloNoticia">T�tulo</label>
                    <input class="form-control form-control-sm" id="txtTituloNoticia" type="text" placeholder="T�TULO">
                </div>
                <div class="form-group col-12">
                    <label for="txtDescripcionNoticia">Descripci�n</label>
                    <div id="txtDescripcionNoticia"></div>
                </div>

                <div class="form-group col-12 text-center">
                    <button type="submit" class="btn btn-primary btn-sm"><i class="fas fa-check"></i>
                        GUARDAR</button>
                    <button type="button" id="btnRegresar" class="btn btn-outline-secondary btn-sm"><i
                            class="icon icon-reply"></i> CANCELAR</button>

                </div>
            </div>

        </form>
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