/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var beanProcedimientoSocioeconomico;
var procedimientoSocioeconomicoSelected;
var beanRequestProcedimientoSocioeconomico = new BeanRequest();

var fecha_inicioProcedimientoSocioeconomico;
var fecha_finProcedimientoSocioeconomico;

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestProcedimientoSocioeconomico.entity_api = "api/detalle-procedimiento-ciclo";
    beanRequestProcedimientoSocioeconomico.operation = "paginate-evaluaciones-ciclo";
    beanRequestProcedimientoSocioeconomico.type_request = "GET";

    $("#modalCargandoProcedimientoSocioeconomico").on('shown.bs.modal', function () {
        processAjaxProcedimientoSocioeconomico();
    });

    document.querySelector("#btn-cancelar-evaluation-socioeconomico").onclick = function () {
        //CONFIRMACION
        Swal.fire({
            title: '¿Estás seguro de salir?',
            text: "No podrás revertir una vez confirmado y tendrás que volver a responder cada pregunta!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, continuar',
            cancelButtonText: 'No, cancelar'
        }).then((result) => {
            if (result.value) {
                navigateProcedimientoAndPreguntas('home');
            }
        })
    };

    document.querySelector("#btn-finalizar-evaluation-socioeconomico").onclick = function () {
        //CONFIRMACION
        Swal.fire({
            title: '¿Estás seguro de finalizar?',
            text: "No podrás revertir tus respuestas una vez confirmado!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, continuar',
            cancelButtonText: 'No, cancelar'
        }).then((result) => {
            if (result.value) {
                //VALIDAMOS
                if (validateFinalizateProcedimientoSocioeconomico()) {
                    //CARGAMOS LA LISTA DE RESPUESTAS
                    if (loadRespuestasProcedimientoSocioeconomico()) {
                        //MANDAMOS A LA BD

                    }
                }
            }
        });
    };


});

function processAjaxProcedimientoSocioeconomico() {
    let parameters_pagination = "";
    let url_request = getHostAPI() + beanRequestProcedimientoSocioeconomico.entity_api + "/" + beanRequestProcedimientoSocioeconomico.operation;
    switch (beanRequestProcedimientoSocioeconomico.operation) {
        default:
            //7
            parameters_pagination += "?idarea=6";
            parameters_pagination += "&idusuario=" + Cookies.getJSON('sisbu_user').idusuario;
            url_request += parameters_pagination;
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestProcedimientoSocioeconomico.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanProcedimientoCiclo) {
        //console.log(beanProcedimientoCiclo);
        $('#modalCargandoProcedimientoSocioeconomico').modal("hide");
        beanProcedimientoSocioeconomico = beanProcedimientoCiclo;
        beanProcedimientoSelectedGlobal = beanProcedimientoSocioeconomico;
        procedimiento_menu_selected = "socioeconomico";
        toListProcedimientoSocioeconomico();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoProcedimientoSocioeconomico').modal("hide");
        showAlertErrorRequest();
    });
}

function toListProcedimientoSocioeconomico() {
    document.querySelector("#div-content-evaluacion-socioeconomico").innerHTML = "";
    if (beanProcedimientoSocioeconomico.procedimientos.length > 0) {
        let card;
        let card_extra;
        beanProcedimientoSocioeconomico.procedimientos.forEach(procedimiento => {
            let validation_complete_evaluation = validateCompleteEvaluationSocioeconomico(procedimiento.idprocedimiento);
            if (validation_complete_evaluation) {
                card_extra =
                        `
                <div class="dt-widget__extra">
                    <div class="dt-task mt-2">
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
                    <div class="dt-task mt-2">
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
            document.querySelector("#div-content-evaluacion-socioeconomico").innerHTML += card;
        });
        addEventsProcedimientoSocioeconomico();
        $('[data-toggle="tooltip"]').tooltip();
        document.querySelector("#div-preguntas-evaluacion-socioeconomico").style.display = "none";
        setUpdateGraficaProcedimientoSocioeconomico();
    } else {
        showAlertTopEnd('warning', 'Lo sentimos no hay ninguna evaluación configurada para este ciclo');
    }
}
function addEventsProcedimientoSocioeconomico() {
    document.querySelectorAll(".btn-realizar-procedimiento").forEach(btn => {
        btn.onclick = function () {
            procedimientoSocioeconomicoSelected = findProcedimientoSocioeconomicoForId(this.getAttribute('idprocedimiento'));
            if (procedimientoSocioeconomicoSelected != undefined) {
                procedimientoSelectedGlobal = procedimientoSocioeconomicoSelected;
                $('#modalCargandoIntentoEvaluacion').modal("show");
            } else {
                showAlertTopEnd('warning', 'No se encontró la evaluación para poder realizarlo. Vuelva a iniciar sesión');
            }
        };
    });
}

function findProcedimientoSocioeconomicoForId(idprocedimiento) {
    let procedimiento_;
    beanProcedimientoSocioeconomico.procedimientos.forEach(procedimiento => {
        if (parseInt(idprocedimiento) == parseInt(procedimiento.idprocedimiento)) {
            procedimiento_ = procedimiento;
            return;
        }
    });
    return procedimiento_;
}

function validateCompleteEvaluationSocioeconomico(idprocedimiento) {
    let res = false;
    beanProcedimientoSocioeconomico.procedimientos_realizados.forEach(procedimiento => {
        if (parseInt(idprocedimiento) == parseInt(procedimiento.idprocedimiento)) {
            res = true;
            return;
        }
    });
    return res;
}

function setUpdateGraficaProcedimientoSocioeconomico() {
    if ($('#estimation-socioeconomico').length) {
        document.querySelector("#estimation-socioeconomico").setAttribute('data-fill', beanProcedimientoSocioeconomico.procedimientos.length);
        var estimation_data = {
            labels: [
                "Realizados",
                "Pendientes"
            ],
            datasets: [
                {
                    data: [beanProcedimientoSocioeconomico.procedimientos_realizados.length, beanProcedimientoSocioeconomico.procedimientos.length],
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

        new Chart(document.getElementById('estimation-socioeconomico'), {
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
        document.querySelector("#lblNumProcedimientosSocioeconomico").innerHTML = beanProcedimientoSocioeconomico.procedimientos.length;
        document.querySelector("#lblNumRespondidasSocioeconomico").innerHTML = beanProcedimientoSocioeconomico.procedimientos_realizados.length;
        if (beanProcedimientoSocioeconomico.procedimientos_realizados.length == 1) {
            document.querySelector("#lblNumRespondidasSocioeconomico").innerHTML += " Realizada";
        } else {
            document.querySelector("#lblNumRespondidasSocioeconomico").innerHTML += " Realizadas";
        }
        document.querySelector("#lblNumPendientesSocioeconomico").innerHTML = beanProcedimientoSocioeconomico.procedimientos.length - beanProcedimientoSocioeconomico.procedimientos_realizados.length;
        if (beanProcedimientoSocioeconomico.procedimientos.length - beanProcedimientoSocioeconomico.procedimientos_realizados.length == 1) {
            document.querySelector("#lblNumPendientesSocioeconomico").innerHTML += " Pendiente";
        } else {
            document.querySelector("#lblNumPendientesSocioeconomico").innerHTML += " Pendientes";
        }
    }
}
