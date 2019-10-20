/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var beanRequestEvaluacion = new BeanRequest();
var beanPaginationEvaluacion;
var evaluacionSelected;
var repor_preguntas = "N";
var repor_familiares = "N";
document.addEventListener("DOMContentLoaded", function () {
    beanRequestEvaluacion.entity_api = "api/evaluacion/atendido";
    beanRequestEvaluacion.operation = "paginate";
    beanRequestEvaluacion.type_request = "GET";

    $("#modalCargandoVDYA").on('shown.bs.modal', function () {
        processAjaxVE();
    });
    document.querySelector("#btnCerrar").onclick = function () {
        document.querySelector("#row-evaluaciones").style.display = "none";
        document.querySelector("#btnListaAtendido").style.display = "initial";

    };
    document.querySelector("#btnReporteFamiliar").onclick = function () {
        repor_preguntas = "N";
        repor_familiares = "S";
        $('#modalCargandoVDYA').modal("show");
    };

    $("#modalCargandoEvaluacion").on('shown.bs.modal', function () {
        processAjaxEvaluacion();
    });

});
function processAjaxEvaluacion() {
    let parameters_pagination = "?idatendido=" + atendidoSelected.idatendido + "&idprocedimiento=1&page=1&size=20";
    $.ajax({
        url: getHostAPI() + beanRequestEvaluacion.entity_api + "/" + beanRequestEvaluacion.operation + parameters_pagination,
        type: beanRequestEvaluacion.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoEvaluacion').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {

            beanPaginationEvaluacion = beanCrudResponse.beanPagination;
            toListEvaluacion(beanPaginationEvaluacion);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoEvaluacion').modal("hide");
        showAlertErrorRequest();

    });
}

function toListEvaluacion(beanPagination) {
    document.querySelector("#div-container-evaluaciones").innerHTML = "";
    if (beanPagination.count_filter > 0) {
        document.querySelector("#btnListaAtendido").style.display = "none";
        document.querySelector("#row-evaluaciones").style.display = "initial";
        let div;
        beanPagination.list.forEach(evaluacion => {
            div =
                    `
                <div class="dt-widget__item border-success">
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate">
                        <div class="dt-widget__title f-16 font-weight-500 text-truncate">
                            ${evaluacion.procedimiento.descripcion}
                        </div>
                        <p class="mb-0 text-truncate text-light-gray">NÚMERO DE INTENTOS :
                            ${evaluacion.num_intentos == null ? "" : evaluacion.num_intentos}
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Extra -->
                    <div class="dt-widget__extra text-right">
                        <!-- Show Content -->
                        <div class="show-content">
                            <span class="d-block text-dark">FECHA INICIAL : ${evaluacion.fecha_inicio}</span>
                            <span class="d-block">FECHA FINAL : ${evaluacion.fecha_fin == null ? "" : evaluacion.fecha_fin}</span>
                        </div>
                        <!-- /show content -->
                        <!-- Hide Content -->
                        <div class="hide-content">
                            <!-- Action Button Group -->
                            <div class="action-btn-group">
                                <button class="btn btn-default text-success dt-fab-btn btn-editar-preguntas" idevaluacion='${evaluacion.idevaluacion_atendido}' title="Editar Respuestas" data-toggle="tooltip">
                                    <i class="icon icon-editors icon-1x"></i>
                                </button>
                                <button class="btn btn-default text-danger dt-fab-btn btn-reporte-preguntas" idevaluacion='${evaluacion.idevaluacion_atendido}' title="Reporte de Respuestas" data-toggle="tooltip">
                                    <i class="icon icon-assignment icon-xl"></i>
                                </button>
                              
                            </div>
                            <!-- /action button group -->
                        </div>
                        <!-- /hide content -->
                    </div>
                    <!-- /widget extra -->
                </div>
            `;
            document.querySelector("#div-container-evaluaciones").innerHTML += div;
        });

        addEventsEvaluaciones();

        $('[data-toggle="tooltip"]').tooltip();
    } else {

        showAlertTopEnd('warning', 'No se encontraron resultados');
    }
}

function addEventsEvaluaciones() {
    document.querySelectorAll(".btn-reporte-preguntas").forEach(btn => {
        btn.onclick = function () {
            evaluacionSelected = getEvaluacionForId(this.getAttribute('idevaluacion'));
            if (evaluacionSelected != undefined) {
                repor_preguntas = "S";
                repor_familiares = "N";
                $('#modalCargandoVDYA').modal("show");
            } else {
                showAlertTopEnd('warnign', 'No se encontró el registro para editar');
            }
        };
    });

    document.querySelectorAll(".btn-editar-preguntas").forEach(btn => {
        btn.onclick = function () {
            evaluacionSelected = getEvaluacionForId(this.getAttribute('idevaluacion'));
            if (evaluacionSelected != undefined) {
                $('#modalCargandoRespuestaEvaluacion').modal("show");
            } else {
                showAlertTopEnd('warnign', 'No se encontró el registro para editar');
            }
        };
    });

}

function getEvaluacionForId(idevaluacion_atendido) {
    let eva_ = -1;
    beanPaginationEvaluacion.list.forEach(function (evaluacion, index) {
        if (evaluacion.idevaluacion_atendido == idevaluacion_atendido) {
            eva_ = evaluacion;
            return;
        }
    });
    return eva_;
}

function processAjaxVE() {
    let url_request = getHostAPI() + "api/detalle-procedimiento-ciclo/validate-evaluacion-complete";
    url_request += "?idusuario=" + atendidoSelected.usuario.idusuario;
    url_request += "&idarea=7";
    $.ajax({
        url: url_request,
        type: "GET",
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        //data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (jsonResponse) {
        $('#modalCargandoVDYA').modal("hide");
        if (jsonResponse.messageServer !== undefined) {
            if (jsonResponse.messageServer.toLowerCase() == "ok") {
                let url_constancia = getHostAPI() + "api/constancias/";
                document.querySelector("#titleModalPreviewReporte").innerHTML = "VISTA PREVIA"
                if (repor_preguntas == "S") {
                    document.querySelector("#titleModalPreviewReporte").innerHTML = "VISTA PREVIA"
                    url_constancia += "respuestas";
                    url_constancia += "?idusuario=" + atendidoSelected.usuario.idusuario;
                    url_constancia += "&idarea=7";
                    document.querySelector('#idframe_reporte').setAttribute('src', url_constancia);
                    document.querySelector('#row_frame_report').style.display = "block";
                    $('#ventanaModalPreviewReporte').modal('show');
                    repor_preguntas = "N";
                    repor_familiares = "N";
                } else if (repor_familiares == "S") {
                    document.querySelector("#titleModalPreviewReporte").innerHTML = "VISTA PREVIA FAMILIARES"
                    url_constancia += "familiares";
                    url_constancia += "?idusuario=" + atendidoSelected.usuario.idusuario;
                    document.querySelector('#idframe_reporte').setAttribute('src', url_constancia);
                    document.querySelector('#row_frame_report').style.display = "block";
                    $('#ventanaModalPreviewReporte').modal('show');
                    repor_preguntas = "N";
                    repor_familiares = "N";
                }
            } else {
                showAlertTopEnd('warning', jsonResponse.messageServer, 10000);
            }
        } else {
            showAlertTopEnd('error', 'Ha ocurrido un error interno, vuelve a intentarlo mas tarde :)', 10000);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoVE').modal("hide");
        showAlertTopEnd('error', 'Ha ocurrido un error interno, vuelve a intentarlo mas tarde. Si el problema persiste, visite la oficina de bienestar', 10000);
    });
}