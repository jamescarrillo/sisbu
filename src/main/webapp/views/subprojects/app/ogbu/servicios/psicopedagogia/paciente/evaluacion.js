/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var beanRequestEvaluacion = new BeanRequest();
var beanPaginationEvaluacion;
var evaluacionSelected;

document.addEventListener("DOMContentLoaded", function () {
    beanRequestEvaluacion.entity_api = "api/evaluacion/atendido";
    beanRequestEvaluacion.operation = "paginate/evaluaciones";
    beanRequestEvaluacion.type_request = "GET";


    document.querySelector("#btnCerrar").onclick = function () {
        document.querySelector("#row-evaluaciones").style.display = "none";
        document.querySelector("#btnListaAtendido").style.display = "initial";

    };

    $("#modalCargandoEvaluacion").on('shown.bs.modal', function () {
        console.log("entrooooo modal cargando evaluacion........")
        processAjaxEvaluacion();
    });

    $("#modalCargandoRemoveEvaluacion").on('shown.bs.modal', function () {
        processAjaxRemoveEvaluacion();
    });

});

function processAjaxEvaluacion() {
    let parameters_pagination = "?idatendido=" + atendidoSelected.idatendido + "&idarea=" + getIdAreaUserSession();
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

function processAjaxRemoveEvaluacion() {
    let parameters_pagination = "?idevaluacion_atendido=" + evaluacionSelected.idevaluacion_atendido;
    $.ajax({
        url: getHostAPI() + beanRequestEvaluacion.entity_api + "/" + "delete" + parameters_pagination,
        type: "DELETE",
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoRemoveEvaluacion').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
                //CARGAMOS NUEVAENTE LAS EVALUACIONES
                setTimeout(() => {
                    $("#modalCargandoEvaluacion").modal('show');
                }, 2000);
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoRemoveEvaluacion').modal("hide");
        showAlertErrorRequest();
    });
}

function toListEvaluacion(beanPagination) {
    document.querySelector("#div-container-evaluaciones").innerHTML = "";
    if (beanPagination.count_filter == 0) {
        return showAlertTopEnd('warning', 'El Paciente no Realizó sus Evaluaciones');
    }
    document.querySelector("#btnListaAtendido").style.display = "none";
    document.querySelector("#row-evaluaciones").style.display = "initial";
    let div;
    beanPagination.list.forEach(evaluacion => {

        div =
                `
                <div class="dt-widget__item border-success border-bottom m-0">
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
                            <span class="d-block text-dark">FECHA : ${evaluacion.fecha_inicio.split(' ')[0]}</span>
                            <span class="d-block">DURACCION : ${restarFechas(convertToDateTimeString(evaluacion.fecha_inicio), convertToDateTimeString(evaluacion.fecha_fin))}</span>
                        </div>
                        <!-- /show content -->
                        <!-- Hide Content -->
                        <div class="hide-content">
                            <!-- Action Button Group -->
                            <div class="action-btn-group">
                                <button class="btn btn-default text-success dt-fab-btn btn-ver-resultado" idevaluacion='${evaluacion.idevaluacion_atendido}' title="Ver resultado" data-toggle="tooltip">
                                    <i class="icon icon-assignment icon-xl"></i>
                                </button>
                                <button class="btn btn-default text-danger dt-fab-btn btn-remove-evaluacion" idevaluacion='${evaluacion.idevaluacion_atendido}' title="Eliminar evaluación" data-toggle="tooltip">
                                    <i class="icon icon-circle-remove-o icon-xl"></i>
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

}

function addEventsEvaluaciones() {

    document.querySelectorAll(".btn-ver-resultado").forEach(btn => {
        btn.onclick = function () {
            $('[data-toggle="tooltip"]').tooltip("hide");
            evaluacionSelected = getEvaluacionForId(this.getAttribute('idevaluacion'));
            if (evaluacionSelected != undefined) {
                let evaTitulo = evaluacionSelected.procedimiento.descripcion.toUpperCase();
                document.querySelector("#btnOpenPromedioArea").style.display = "none";
               /* if (evaTitulo.includes("BARON ICE") || evaTitulo.includes("INVENTARIO DE HABILIDADES")
                        || evaTitulo.includes("ZUNG")) {
                    document.querySelector("#btnOpenPromedioArea").style.display = "flex";
                } else {
                    document.querySelector("#btnOpenPromedioArea").style.display = "none";
                }*/
                $('#modalCargandoRespuestaEvaluacion').modal("show");
            } else {
                showAlertTopEnd('warnign', 'No se encontró el registro para eliminar');
            }
        };
    });

    document.querySelectorAll(".btn-remove-evaluacion").forEach(btn => {
        btn.onclick = function () {
            $('[data-toggle="tooltip"]').tooltip("hide");
            evaluacionSelected = getEvaluacionForId(this.getAttribute('idevaluacion'));
            if (evaluacionSelected != undefined) {
                showAlertDelete('modalCargandoRemoveEvaluacion');
            } else {
                showAlertTopEnd('warnign', 'No se encontró el registro para eliminar');
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

function convertToDateTimeString(date) {
    /*
     FORMAT -> DDXMMXAAAA 
     -X = Character_separater
     */
    let values = (date.split(" ")[0]).split("/");
    let values_horas = (date.split(" ")[1]).split(":");
    //new Date(year, month, day, hours, minutes, seconds, milliseconds)
    if (values.length > 0) {
        return new Date(parseInt(values[2]), (parseInt(values[1]) - 1), parseInt(values[0]), parseInt(values_horas[0]), parseInt(values_horas[1]), parseInt(values_horas[2]));
    }
    return new Date();
}

function restarFechas(fechai, fechaf) {
    let s_rest = "";
    //console.log(fechai, ' - ', fechaf);
    let diferencia = fechaf.getTime() - fechai.getTime(); //milisegundos
    let segundos = diferencia / 1000;
    let minutos = parseInt(segundos / 60);
    //console.log(minutos / 60);
    //HORAS
    let horas = parseInt(minutos / 60);
    if (horas < 10) {
        s_rest += "0" + horas;
    } else {
        s_rest += horas;
    }
    s_rest += ":";
    minutos = segundos % 60;
    if (minutos < 10) {
        s_rest += "0" + minutos;
    } else {
        s_rest += minutos;
    }
    s_rest += " Hrs.";
    return s_rest;
}