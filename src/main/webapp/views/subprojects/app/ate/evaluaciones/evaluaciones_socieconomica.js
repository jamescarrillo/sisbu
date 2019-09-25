/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var beanProcedimientoCicloSocie;
var procedimientoCicloSocieSelected;
var beanRequestProcedimientoCicloSocie = new BeanRequest();

var preguntas_procedimientoSelectedSocie;

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestProcedimientoCicloSocie.entity_api = "api/detalle-procedimiento-ciclo";
    beanRequestProcedimientoCicloSocie.operation = "paginate-evaluaciones-ciclo";
    beanRequestProcedimientoCicloSocie.type_request = "GET";

    $("#modalCargandoProcedimientoCicloSocie").on('shown.bs.modal', function () {
        processAjaxProcedimientoCicloSocie();
    });

    document.querySelector("#btn-cancelar-evaluation-socie").onclick = function () {
        navigateProcedimientoCicloSocie('home');
    };

});

function processAjaxProcedimientoCicloSocie() {
    let parameters_pagination = "";
    let url_request = getHostAPI() + beanRequestProcedimientoCicloSocie.entity_api + "/" + beanRequestProcedimientoCicloSocie.operation;
    switch (beanRequestProcedimientoCicloSocie.operation) {
        default:
            //7
            parameters_pagination += "?idarea=6";
            parameters_pagination += "&idusuario=" + Cookies.getJSON('sisbu_user').idusuario;
            url_request += parameters_pagination;
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestProcedimientoCicloSocie.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanProcedimientoCiclo) {
        console.log(beanProcedimientoCiclo);
        $('#modalCargandoProcedimientoCicloSocie').modal("hide");
        beanProcedimientoCicloSocie = beanProcedimientoCiclo;
        toListProcedimientoCicloSocie();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoProcedimientoCicloSocie').modal("hide");
        showAlertErrorRequest();
    });
}

function toListProcedimientoCicloSocie() {
    document.querySelector("#div-content-evaluacion-socioeconomica").innerHTML = "";
    if (beanProcedimientoCicloSocie.procedimientos.length > 0) {
        let card;
        let card_extra;
        beanProcedimientoCicloSocie.procedimientos.forEach(procedimiento => {
            let validation_complete_evaluation = validateCompleteEvaluationSocie(procedimiento.idprocedimiento);
            if (validation_complete_evaluation) {
                card_extra =
                        `
                <div class="dt-widget__extra">
                    <div class="dt-task">
                      <div class="dt-task__number text-success">Relizado</div>
                      <a class="dt-task__redirect" idprocedimiento="${procedimiento.idprocedimiento}"
                        title="Ya has completado esta ficha :)" data-toggle="tooltip"
                        href="javascript:void(0)"><i class="icon icon-check"></i>
                      </a>
                    </div>
                </div>
                `;
            } else {
                card_extra =
                        `
                <div class="dt-widget__extra">
                    <div class="dt-task">
                      <div class="dt-task__number text-success">Pendiente</div>
                      <a class="dt-task__redirect btn-realizar-procedimiento" idprocedimiento="${procedimiento.idprocedimiento}"
                        title="Click para empezar :)" data-toggle="tooltip"
                        href="javascript:void(0)"><i class="icon icon-open-new-tab"></i>
                      </a>
                    </div>
                </div>
                `;
            }
            card =
                    `
                <div class="dt-widget__item ${(validation_complete_evaluation == true ? "border-success" : "border-warning")} sisbu-cursor-mano">
                    <div class="dt-widget__info text-truncate">
                        <div class="dt-widget__title f-16 font-weight-500 text-truncate">
                            ${procedimiento.descripcion}
                        </div>
                        <p class="mb-0 text-truncate text-light-gray">
                            ${procedimiento.num_preguntas} Preguntas
                        </p>
                    </div>
                    ${card_extra}
                    <!--div class="dt-widget__extra text-right">
                        <div class="show-content mt-2">
                            <span class="d-block"><span class='${(validation_complete_evaluation == true ? "text-success" : "text-warning")}'>${(validation_complete_evaluation == true ? "Relizado" : "Por realizar")}</span></span>
                        </div>
                        <div class="hide-content">
                            <div class="action-btn-group">
                                <button class="btn btn-default text-primary dt-fab-btn btn btn-realizar-procedimiento" idprocedimiento="${procedimiento.idprocedimiento}"
                                    title="Click para empezar :)" data-toggle="tooltip">
                                    <i class="icon icon-assignment icon-xl"></i> <i class="icon icon-double-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    </div-->
                </div>
            `;
            document.querySelector("#div-content-evaluacion-socioeconomica").innerHTML += card;
        });
        addEventsProcedimientoCicloSocie();
        $('[data-toggle="tooltip"]').tooltip();
        document.querySelector("#div-cancelar-evaluation-socie").style.display = "none";
        document.querySelector("#div-preguntas-evaluacion-socieconomica").style.display = "none";
        setUpdateGraficaEvaluacionSocie();
    } else {
        showAlertTopEnd('warning', 'Lo sentimos no hay ninguna evaluación configurada para este ciclo');
    }
}
function addEventsProcedimientoCicloSocie() {
    document.querySelectorAll(".btn-realizar-procedimiento").forEach(btn => {
        btn.onclick = function () {
            procedimientoCicloSocieSelected = findProcedimientoCicloSocieForId(this.getAttribute('idprocedimiento'));
            if (procedimientoCicloSocieSelected != undefined) {
                openPreguntas();
            } else {
                showAlertTopEnd('warning', 'No se encontró la evaluación para poder realizarlo. Vuelva a iniciar sesión');
            }
        };
    });
}

function findProcedimientoCicloSocieForId(idprocedimiento) {
    let procedimiento_;
    beanProcedimientoCicloSocie.procedimientos.forEach(procedimiento => {
        if (parseInt(idprocedimiento) == parseInt(procedimiento.idprocedimiento)) {
            procedimiento_ = procedimiento;
            return;
        }
    });
    return procedimiento_;
}

function validateCompleteEvaluationSocie(idprocedimiento) {
    let res = false;
    beanProcedimientoCicloSocie.procedimientos_realizados.forEach(procedimiento => {
        if (parseInt(idprocedimiento) == parseInt(procedimiento.idprocedimiento)) {
            res = true;
            return;
        }
    });
    return res;
}

function openPreguntas() {
    //GET PREGUNTAS DEL PROCEDIMIENTO SELECTED
    preguntas_procedimientoSelectedSocie = [];
    beanProcedimientoCicloSocie.preguntas.forEach(pregunta => {
        if (parseInt(procedimientoCicloSocieSelected.idprocedimiento) == parseInt(pregunta.procedimiento.idprocedimiento)) {
            preguntas_procedimientoSelectedSocie.push(pregunta);
        }
    });
    //LISTAMOS LAS PREGUNTAS
    preguntas_procedimientoSelectedSocie.forEach(pregunta => {
        
    });
    navigateProcedimientoCicloSocie('preguntas');
}





function setUpdateGraficaEvaluacionSocie() {
    if ($('#estimation-socie').length) {
        document.querySelector("#estimation-socie").setAttribute('data-fill', beanProcedimientoCicloSocie.procedimientos.length);
        var estimation_data = {
            labels: [
                "Realizados",
                "Pendientes"
            ],
            datasets: [
                {
                    data: [beanProcedimientoCicloSocie.procedimientos_realizados.length, beanProcedimientoCicloSocie.procedimientos.length],
                    backgroundColor: [
                        color(chartColors.blue).alpha(0.8).rgbString(),
                        color(chartColors.pink).alpha(0.8).rgbString()
                    ],
                    hoverBackgroundColor: [
                        color(chartColors.blue).alpha(0.8).rgbString(),
                        color(chartColors.pink).alpha(0.8).rgbString()
                    ]
                }
            ]
        };

        new Chart(document.getElementById('estimation-socie'), {
            type: 'doughnut',
            data: estimation_data,
            options: {
                cutoutPercentage: 90,
                responsive: false,
                legend: {
                    display: false
                }
            }
        });
        document.querySelector("#lblNumProcedimientosSocie").innerHTML = beanProcedimientoCicloSocie.procedimientos.length;
        document.querySelector("#lblNumRespondidasSocie").innerHTML = beanProcedimientoCicloSocie.procedimientos_realizados.length;
        if (beanProcedimientoCicloSocie.procedimientos_realizados.length == 1) {
            document.querySelector("#lblNumRespondidasSocie").innerHTML += " Realizada";
        } else {
            document.querySelector("#lblNumRespondidasSocie").innerHTML += " Realizadas";
        }
        document.querySelector("#lblNumPendientesSocie").innerHTML = beanProcedimientoCicloSocie.procedimientos.length - beanProcedimientoCicloSocie.procedimientos_realizados.length;
        if (beanProcedimientoCicloSocie.procedimientos.length - beanProcedimientoCicloSocie.procedimientos_realizados.length == 1) {
            document.querySelector("#lblNumPendientesSocie").innerHTML += " Pendiente";
        } else {
            document.querySelector("#lblNumPendientesSocie").innerHTML += " Pendientes";
        }
    }
}

function navigateProcedimientoCicloSocie(opcion) {
    switch (opcion) {
        case "preguntas":
            document.querySelector("#div-evaluaciones-socieconomica").style.display = "none";
            document.querySelector("#div-preguntas-evaluacion-socieconomica").style.display = "flex";
            document.querySelector("#div-cancelar-evaluation-socie").style.display = "block";
            document.querySelector("#div-regresar-selected-evaluation-socie").style.display = "none";
            break;
        default:
            //HOME, LISTA DE EVALUACIONES
            document.querySelector("#div-evaluaciones-socieconomica").style.display = "flex";
            document.querySelector("#div-preguntas-evaluacion-socieconomica").style.display = "none";
            document.querySelector("#div-cancelar-evaluation-socie").style.display = "none";
            document.querySelector("#div-regresar-selected-evaluation-socie").style.display = "block";
            break;
    }
}
