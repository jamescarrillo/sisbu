<%-- 
    Document   : temp
    Created on : 26 set. 2019, 15:50:22
    Author     : James Carrillo
--%>

<div class="col-12">
    <div class="row" id="div-evaluaciones-obstetricia">
        <div class="col-12">
            <div class="dt-card dt-card__full-height">
                <div class="dt-card__header mb-2 pt-4">
                    <div class="dt-card__heading">
                        <h3 class="dt-card__title">Avance</h3>
                    </div>
                </div>
                <div class="dt-card__body pb-4">
                    <div class="row">
                        <div class="col-xl-4 col-md-12 col-sm-4">
                            <!-- Chart -->
                            <canvas class="mx-auto mb-5 mb-sm-0 mb-md-5 mb-xl-0"
                                    id="estimation-obstetricia" data-fill="0"
                                    height="110" width="110"></canvas>
                        </div>
                        <div class="col-xl-8 col-md-12 col-sm-8">
                            <div class="pb-3 mb-3 border-bottom">
                                <span class="display-4 d-inline-block mr-2 font-weight-500 text-dark" id="lblNumProcedimientosObstetricia">0</span><span
                                    class="font-weight-light f-16">Fichas</span>
                            </div>
                            <ul class="dt-list dt-list-col-6">
                                <li class="dt-list__item">
                                    <span class="dot-shape dot-shape-lg bg-light-green mr-2"></span>
                                    <span class="d-inline-block" id="lblNumRespondidasObstetricia">0 Realizadas</span>
                                </li>
                                <li class="dt-list__item">
                                    <span class="dot-shape dot-shape-lg bg-light-pink mr-2"></span>
                                    <span class="d-inline-block" id="lblNumPendientesObstetricia">0 Pendientes</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="dt-card">
                <div class="dt-card__body p-0">
                    <div class="dt-widget dt-widget-hl-item dt-widget-hl-item-space dt-widget-mb-item dt-widget-hover-bg" 
                         id="div-content-evaluacion-obstetricia">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row" id="div-preguntas-evaluacion-obstetricia" style="display: none">
        <div class="col-12" style="">
            <div class="dt-card">
                <div class="dt-card__header bg-primary pb-7 mb-0 rounded-top">
                    <div class="dt-card__heading">
                        <div class="d-flex align-items-center">
                            <i class="icon icon-invoice-new icon-fw icon-2x text-white mr-2"></i>
                            <h3 class="dt-card__title text-white" style="text-transform: none">Lista de Preguntas</h3>
                        </div>
                    </div>
                </div>
                <div class="dt-card__body pb-3">
                    <div class="row mt-3">
                        <div class="col-12">
                            <ul class="list-group list-group-flush" id="content-preguntas-evaluacion-obstetricia">
                                
                            </ul>
                        </div>
                        <div class="col-12 text-right">
                            <button class="btn btn-outline-primary" id="btn-cancelar-evaluation-obstetricia">
                                <i class="icon icon-reply"></i>
                                Salir
                            </button>
                            <button class="btn btn-primary" id="btn-finalizar-evaluation-obstetricia">
                                <i class="icon icon-double-arrow-right mb-1"></i>
                                Finalizar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="col-12 text-center" id="div-regresar-selected-evaluation-obstetricia">
    <button class="btn btn-outline-primary btn-regresar-selected-evaluation">
        <i class="icon icon-reply"></i>
        Mis Evaluaciones
    </button>
</div>
