/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var beanRequestProcedimientoSocioeconomico = new BeanRequest();

var beanEvaluacionAtendidoSocieconomico;

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestProcedimientoSocioeconomico.entity_api = "api/detalle-procedimiento-ciclo";
    beanRequestProcedimientoSocioeconomico.operation = "paginate-evaluaciones-ciclo";
    beanRequestProcedimientoSocioeconomico.type_request = "GET";

    $("#modalCargandoProcedimientoSocioeconomico").on('shown.bs.modal', function () {
        processAjaxProcedimientoSocioeconomico();
    });

    $("#modalCargandoEvaluacionAtendidoSocioeconomico").on('shown.bs.modal', function () {
        processAjaxEvaluacionAtendidoSocieconomico();
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
                if (validateFinalizateProcedimiento()) {
                    //CARGAMOS LA LISTA DE RESPUESTAS
                    if (loadRespuestasProcedimiento()) {
                        //MANDAMOS A LA BD
                        $('#modalCargandoEvaluacionAtendidoSocioeconomico').modal('show');
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
            parameters_pagination += "?idarea=7";
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
        $('#modalCargandoProcedimientoSocioeconomico').modal("hide");
        beanProcedimientoSelectedGlobal = beanProcedimientoCiclo;
        procedimiento_menu_selected = "socioeconomico";
        toListProcedimientoSocioeconomico();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoProcedimientoSocioeconomico').modal("hide");
        showAlertErrorRequest();
    });
}

function toListProcedimientoSocioeconomico() {
    document.querySelector("#div-content-evaluacion-socioeconomico").innerHTML = "";
    if (beanProcedimientoSelectedGlobal.procedimientos.length > 0) {
        let card;
        let card_extra;
        beanProcedimientoSelectedGlobal.procedimientos.forEach(procedimiento => {
            let validation_complete_evaluation = validateCompleteProcedimiento(procedimiento.idprocedimiento);
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
                </div>
            `;
            document.querySelector("#div-content-evaluacion-socioeconomico").innerHTML += card;
        });
        addEventsProcedimientoSocioeconomico();
        $('[data-toggle="tooltip"]').tooltip();
        document.querySelector("#div-preguntas-evaluacion-socioeconomico").style.display = "none";
        setUpdateGraficaProcedimientoSocioeconomico();
    } else {
        showAlertTopEnd('warning', 'Lo sentimos, no hay ninguna evaluación configurada para este ciclo. Acerquese a la oficina correspondiente e indique el mensaje.', 10000);
    }
}

function addEventsProcedimientoSocioeconomico() {
    document.querySelectorAll(".btn-realizar-procedimiento").forEach(btn => {
        btn.onclick = function () {
            procedimientoSelectedGlobal = findProcedimientoForId(this.getAttribute('idprocedimiento'));
            if (procedimientoSelectedGlobal != undefined) {
                $('#modalCargandoIntentoEvaluacion').modal("show");
            } else {
                showAlertTopEnd('warning', 'No se encontró la evaluación para poder realizarlo. Vuelva a iniciar sesión');
            }
        };
    });
}

function setUpdateGraficaProcedimientoSocioeconomico() {
    if ($('#estimation-socioeconomico').length) {
        document.querySelector("#estimation-socioeconomico").setAttribute('data-fill', beanProcedimientoSelectedGlobal.procedimientos.length);
        var estimation_data = {
            labels: [
                "Realizados",
                "Pendientes"
            ],
            datasets: [
                {
                    data: [beanProcedimientoSelectedGlobal.procedimientos_realizados.length, beanProcedimientoSelectedGlobal.procedimientos.length],
                    backgroundColor: [
                        color(chartColors.lightGreen).alpha(0.8).rgbString(),
                        color(chartColors.orange).alpha(0.8).rgbString()
                    ],
                    hoverBackgroundColor: [
                        color(chartColors.lightGreen).alpha(0.8).rgbString(),
                        color(chartColors.orange).alpha(0.8).rgbString()
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
        document.querySelector("#lblNumProcedimientosSocioeconomico").innerHTML = beanProcedimientoSelectedGlobal.procedimientos.length;
        document.querySelector("#lblNumRespondidasSocioeconomico").innerHTML = beanProcedimientoSelectedGlobal.procedimientos_realizados.length;
        if (beanProcedimientoSelectedGlobal.procedimientos_realizados.length == 1) {
            document.querySelector("#lblNumRespondidasSocioeconomico").innerHTML += " Realizada";
        } else {
            document.querySelector("#lblNumRespondidasSocioeconomico").innerHTML += " Realizadas";
        }
        document.querySelector("#lblNumPendientesSocioeconomico").innerHTML = beanProcedimientoSelectedGlobal.procedimientos.length - beanProcedimientoSelectedGlobal.procedimientos_realizados.length;
        if (beanProcedimientoSelectedGlobal.procedimientos.length - beanProcedimientoSelectedGlobal.procedimientos_realizados.length == 1) {
            document.querySelector("#lblNumPendientesSocioeconomico").innerHTML += " Pendiente";
        } else {
            document.querySelector("#lblNumPendientesSocioeconomico").innerHTML += " Pendientes";
        }
    }
}

function processAjaxEvaluacionAtendidoSocieconomico() {
    fecha_finProcedimiento = getTimesTampJavaScriptCurrent();
    beanEvaluacionAtendidoSocieconomico = {
        "evaluacion_atendido": {
            "idevaluacion_atendido": 0,
            "atendido": {
                "usuario": {
                    "idusuario": Cookies.getJSON('sisbu_user').idusuario
                }
            },
            "procedimiento": procedimientoSelectedGlobal,
            "fecha_inicio": fecha_inicioProcedimiento,
            "fecha_fin": fecha_finProcedimiento,
            "num_intentos": 0
        },
        "list_respuestas": list_respuestas_evaluacion
    };
    //console.log(beanEvaluacionAtendidoSocieconomico);
    let url_request = getHostAPI() + "api/evaluacion/atendido/add";
    $.ajax({
        url: url_request,
        type: "POST",
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(beanEvaluacionAtendidoSocieconomico),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrud) {
        $('#modalCargandoEvaluacionAtendidoSocioeconomico').modal("hide");
        //console.log(beanCrud);
        if (beanCrud.messageServer != undefined) {
            if (beanCrud.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', "Finalización exitosa!", 6000);
                //REGRESAMOS A LAS EVALUACIONES
                navigateProcedimientoAndPreguntas('home');
            } else {
                showAlertTopEnd('warning', beanCrud.messageServer, 6000);
            }
        } else {
            showAlertTopEnd('warning', "No se completó la finalización, ocurrió un error interno. Inténtelo mas tarde :)", 6000);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoEvaluacionAtendidoSocioeconomico').modal("hide");
        showAlertTopEnd('error', 'Oh! A ocurrido un error interno, intentalo mas tarde :/', 6000);
        //showAlertErrorRequest();
    });
}
