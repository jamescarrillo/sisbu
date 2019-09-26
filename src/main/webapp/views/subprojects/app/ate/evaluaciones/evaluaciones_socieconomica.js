/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var beanProcedimientoSocioeconomico;
var procedimientoSocioeconomicoSelected;
var beanRequestProcedimientoSocioeconomico = new BeanRequest();

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
                navigateProcedimientoSocioeconomico('home');
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
            let validation_complete_evaluation = validateCompleteEvaluationSocie(procedimiento.idprocedimiento);
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
                openPreguntas();
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

function validateCompleteEvaluationSocie(idprocedimiento) {
    let res = false;
    beanProcedimientoSocioeconomico.procedimientos_realizados.forEach(procedimiento => {
        if (parseInt(idprocedimiento) == parseInt(procedimiento.idprocedimiento)) {
            res = true;
            return;
        }
    });
    return res;
}

function openPreguntas() {
    //GET PREGUNTAS DEL PROCEDIMIENTO SELECTED
    let preguntas_procedimientoSocioeconomicoSelected = getPreguntasProcedimiento(beanProcedimientoSocioeconomico, procedimientoSocioeconomicoSelected);
    //LISTAMOS LAS PREGUNTAS
    document.querySelector("#content-preguntas-evaluacion-socioeconomico").innerHTML = "";
    let preguntas_checkboxs = [];
    preguntas_procedimientoSocioeconomicoSelected.forEach(pregunta => {
        if (procedimientoSocioeconomicoSelected.usa_alternativas_globales == 1) {
            preguntas_checkboxs.push(pregunta);
            document.querySelector("#content-preguntas-evaluacion-socioeconomico").innerHTML += createLiCheckBoxPregunta(pregunta, beanProcedimientoSocioeconomico);
        } else {
            switch (pregunta.tipo_respuesta) {
                case 1:
                    document.querySelector("#content-preguntas-evaluacion-socioeconomico").innerHTML += createLiInputTextPregunta(pregunta, beanProcedimientoSocioeconomico);
                    break;
                case 2:
                    //CHECK BOX
                    preguntas_checkboxs.push(pregunta);
                    document.querySelector("#content-preguntas-evaluacion-socioeconomico").innerHTML += createLiCheckBoxPregunta(pregunta, beanProcedimientoSocioeconomico);
                    break;
                default:
                    //SELECT - 4
                    document.querySelector("#content-preguntas-evaluacion-socioeconomico").innerHTML += createLiSelectPregunta(pregunta, beanProcedimientoSocioeconomico);
                    break;
            }
        }
    });
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle=popover]').popover();
    //AGREGAMOS LOS EVENTOS, A LOS CHECKS
    addEventsChecksPreguntas(preguntas_checkboxs);
    navigateProcedimientoSocioeconomico('preguntas');
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

function navigateProcedimientoSocioeconomico(opcion) {
    switch (opcion) {
        case "preguntas":
            document.querySelector("#div-evaluaciones-socioeconomico").style.display = "none";
            document.querySelector("#div-preguntas-evaluacion-socioeconomico").style.display = "flex";
            document.querySelector("#div-regresar-selected-evaluation-socioeconomico").style.display = "none";
            break;
        default:
            //HOME, LISTA DE EVALUACIONES
            document.querySelector("#div-evaluaciones-socioeconomico").style.display = "flex";
            document.querySelector("#div-preguntas-evaluacion-socioeconomico").style.display = "none";
            document.querySelector("#div-regresar-selected-evaluation-socioeconomico").style.display = "block";

            //VOLVEMOS A LISTAR
            break;
    }
}

function validateFinalizateProcedimientoSocioeconomico() {
    let preguntas_procedimientoSocioeconomicoSelected = getPreguntasProcedimiento(beanProcedimientoSocioeconomico, procedimientoSocioeconomicoSelected);
    let validation_complete = true;
    preguntas_procedimientoSocioeconomicoSelected.forEach(pregunta => {
        //VALIDAMOS SI YA SE A RESPONDIDO ESA PREGUNTA
        if (procedimientoSocioeconomicoSelected.usa_alternativas_globales == 1) {
            if (!validationQuestionForCheck(pregunta)) {
                showAlertTopEnd('warning', 'Por favor marque una casilla de la pregunta n° ' + pregunta.orden);
                validation_complete = false;
                return;
            }
        } else {
            let val_temp = true;
            switch (pregunta.tipo_respuesta) {
                case 1:
                    //TEXT
                    if (!validationQuestionForInputText(pregunta)) {
                        showAlertTopEnd('warning', 'Por favor ingrese un texto en la pregunta n° ' + pregunta.orden);
                        val_temp = false;
                    }
                    break;
                case 2:
                    //CHECK BOX
                    if (!validationQuestionForCheck(pregunta)) {
                        showAlertTopEnd('warning', 'Por favor marque una casilla de la pregunta n° ' + pregunta.orden);
                        val_temp = false;
                    }
                    break;
                default:
                    //SELECT - 4
                    if (!validationQuestionForSelect(pregunta)) {
                        showAlertTopEnd('warning', 'Por favor seleccione una opción de la pregunta n° ' + pregunta.orden);
                        val_temp = false;
                    }
                    break;
            }
            if (!val_temp) {
                validation_complete = false;
                return;
            }
        }
    });
    return validation_complete;
}

function loadRespuestasProcedimientoSocioeconomico() {
    let preguntas_procedimientoSocioeconomicoSelected = getPreguntasProcedimiento(beanProcedimientoSocioeconomico, procedimientoSocioeconomicoSelected);
    list_respuestas_evaluacion = [];
    //CREAMOS LOS OBTEJOS DE RESPUESTA
    preguntas_procedimientoSocioeconomicoSelected.forEach(pregunta => {
        respuesta = new RespuestaEvaluacion2();
        respuesta.pregunta = pregunta;
        //VALIDAMOS SI YA SE A RESPONDIDO ESA PREGUNTA
        let alternativa_temp;
        if (procedimientoSocioeconomicoSelected.usa_alternativas_globales == 1) {
            alternativa_temp = getAlternativaQuestionForCheck(pregunta);
            if (alternativa_temp != undefined) {
                respuesta.alternativa = alternativa_temp;
            } else {
                showAlertTopEnd('warning', 'La respuesta de la pregunta n° ' + pregunta.orden + " es invalida");
            }
        } else {
            switch (pregunta.tipo_respuesta) {
                case 1:
                    //TEXT
                    respuesta.alternativa = null;
                    respuesta.texto = getTextQuestionForInputText(pregunta);
                    break;
                case 2:
                    //CHECK BOX
                    alternativa_temp = getAlternativaQuestionForCheck(pregunta);
                    if (alternativa_temp != undefined) {
                        respuesta.alternativa = alternativa_temp;
                    } else {
                        showAlertTopEnd('warning', 'La respuesta de la pregunta n° ' + pregunta.orden + " es invalida");
                    }
                    break;
                default:
                    //SELECT - 4
                    alternativa_temp = getAlternativaQuestionForSelect(pregunta);
                    if (alternativa_temp != undefined) {
                        respuesta.alternativa = alternativa_temp;
                    } else {
                        showAlertTopEnd('warning', 'La respuesta de la pregunta n° ' + pregunta.orden + " es invalida");
                    }
                    break;
            }
        }
        list_respuestas_evaluacion.push(respuesta);
    });
    return (list_respuestas_evaluacion.length == 0);
}

//VALIDACIONES
function validationQuestionForCheck(pregunta) {
    let validate = false;
    //VALIDACION POR CHECK, DEBE A VER AL MENOS UNO
    document.querySelectorAll(".check-" + pregunta.idpregunta).forEach(check => {
        if (check.checked) {
            validate = true;
            return;
        }
    });
    return validate;
}

function validationQuestionForSelect(pregunta) {
    let validate = false;
    if (document.querySelector("#select-" + pregunta.idpregunta).value != "-1") {
        validate = true;
    }
    return validate;
}

function validationQuestionForInputText(pregunta) {
    return true;
}

//GET ALTERNATIVAS RESPONDIDA

function getAlternativaQuestionForCheck(pregunta) {
    let alternativa;
    //VALIDACION POR CHECK, DEBE A VER AL MENOS UNO
    document.querySelectorAll(".check-" + pregunta.idpregunta).forEach(check => {
        if (check.checked) {
            alternativa = {
                "idalternativa": check.getAttribute('id')
            };
        }
    });
    //VALIDAMOS QUE ESTA ALTERNATIVA SEA VALIDA, EXISTA EN LA LISTA DE ALTERNATIVAS
    if (!validateAlternativaInListAlternativas(alternativa.idalternativa, beanProcedimientoSocioeconomico)) {
        alternativa = undefined;
    }
    return alternativa;
}

function getAlternativaQuestionForSelect(pregunta) {
    let alternativa = false;
    if (document.querySelector("#select-" + pregunta.idpregunta).value != "-1") {
        alternativa = {
            "idalternativa": document.querySelector("#select-" + pregunta.idpregunta).value
        };
    }
    //VALIDAMOS QUE ESTA ALTERNATIVA SEA VALIDA, EXISTA EN LA LISTA DE ALTERNATIVAS
    if (!validateAlternativaInListAlternativas(alternativa.idalternativa, beanProcedimientoSocioeconomico)) {
        alternativa = undefined;
    }
    return alternativa;
}

function getTextQuestionForInputText(pregunta) {
    return document.querySelector("#input-text-" + pregunta.idpregunta).value;
}