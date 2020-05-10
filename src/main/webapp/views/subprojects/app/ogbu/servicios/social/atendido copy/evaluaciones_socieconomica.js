/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var beanRequestProcedimientoSocioeconomico = new BeanRequest();
var beanProcedimientoSelectedGlobal;
var list_respuestas_evaluacion;
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




});

function processAjaxProcedimientoSocioeconomico() {
    let parameters_pagination = "";
    let url_request = getHostAPI() + beanRequestProcedimientoSocioeconomico.entity_api + "/" + beanRequestProcedimientoSocioeconomico.operation;
    switch (beanRequestProcedimientoSocioeconomico.operation) {
        default:
            //7
            parameters_pagination += "?idarea=7";
            parameters_pagination += "&idusuario=" + atendidoSelected.usuario.idusuario;
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
        beanProcedimientoSelectedGlobal = beanProcedimientoCiclo;
        document.querySelector("#row-evaluaciones").style.display = "none";
        document.querySelector("#titleManagerRespuestaEvaluacion").style.display = "flex";
        $('#modalCargandoProcedimientoSocioeconomico').modal("hide");
        openPreguntas('content-preguntas-evaluacion-socioeconomico');
        document.querySelector("#content-preguntas-evaluacion-socioeconomico").style.display = "initial";
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoProcedimientoSocioeconomico').modal("hide");
        showAlertErrorRequest();
    });
}

function processAjaxEvaluacionAtendidoSocieconomico() {

    let json = {
        "evaluacion_atendido": {
            "idevaluacion_atendido": 0,
            "atendido": {
                "usuario": {
                    "idusuario": atendidoSelected.usuario.idusuario
                }
            },
            "procedimiento": null,
            "fecha_inicio": null,
            "fecha_fin": null,
            "num_intentos": null
        },
        "list_respuestas": list_respuestas_evaluacion
    };
    //console.log(beanEvaluacionAtendidoSocieconomico);
    let url_request = getHostAPI() + "api/evaluacion/atendido/update";
    $.ajax({
        url: url_request,
        type: "PUT",
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrud) {
        $('#modalCargandoEvaluacionAtendidoSocioeconomico').modal("hide");
        if (beanCrud.messageServer != undefined) {
            if (beanCrud.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', "Finalización exitosa!", 6000);
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
/*
 * FUNCTIONS PREGUNTAS DINAMICAS
 */

/*

function getAlternativasPregunta(pregunta) {
    let alternativas_pregunta = [];
    beanProcedimientoSelectedGlobal.alternativas.forEach(alternativa => {
        if (parseInt(alternativa.pregunta.idpregunta) == parseInt(pregunta.idpregunta)) {
            alternativas_pregunta.push(alternativa);
        }
    });
    return alternativas_pregunta;
}

function createLiInputTextPregunta(pregunta) {
    let li =
            `
            <li class="list-group-item">
                <div class="form-group mb-2">
                    <label class="mb-2 text-primary">${pregunta.orden}. ${pregunta.enunciado}
                    ${getTooltipPregunta(pregunta)}
                    </label>
                    ${getInputTextPregunta(pregunta)}
                </div>
            </li>
        `;
    return li;
}

function createLiSelectPregunta(pregunta) {
    let alternativas = getAlternativasPregunta(pregunta);
    let li =
            `
            <li class="list-group-item">
                <div class="form-group mb-2">
                    <label class="mb-2 text-primary">${pregunta.orden}. ${pregunta.enunciado}
                    ${getTooltipPregunta(pregunta)}
                    </label>
                    ${getSelectPregunta(alternativas, pregunta)}
                </div>
            </li>
        `;
    return li;
}

function createLiCheckBoxPregunta(pregunta) {
    let alternativas = getAlternativasPregunta(pregunta);
    let li =
            `
            <li class="list-group-item">
                <label class="mb-2 text-primary">${pregunta.orden}. ${pregunta.enunciado}
                    ${getTooltipPregunta(pregunta)}
                </label>
                ${getChecksPregunta(alternativas)}
            </li>
        `;
    return li;
}

function getTooltipPregunta(pregunta) {
    let i = "";
    if (pregunta.tooltip != "") {
        i =
                `
        <i class="icon icon-question-circle" aria-hidden="true" data-toggle="popover" 
            data-trigger="hover" data-placement="top" 
           title="" data-content="${pregunta.tooltip}" 
           style="cursor: pointer" data-original-title="">
        </i>
        `;
    }
    return i;
}

function getSelectPregunta(alternativas, pregunta) {
    let select = "";
    select += `<select class="form-control form-control-sm sisbu-cursor-mano" id="select-${pregunta.idpregunta}">`;
    alternativas.forEach(function (alternativa, index) {
        if (index == 0) {
            select += getOptionSelectDefault();
            select += getOptionSelect(alternativa);
        } else {
            select += getOptionSelect(alternativa);
        }
    });
    select += `</select>`;
    return select;
}

function getInputTextPregunta(pregunta) {
    return `<input class="form-control form-control-sm" placeholder="${pregunta.placeholder}" id="input-text-${pregunta.idpregunta}" maxlength="500">`;
}

function getChecksPregunta(alternativas) {
    let checks = "";
    alternativas.forEach(alternativa => {
        checks +=
                `
            <div class="form-group custom-control custom-checkbox mb-2">
                <input type="checkbox" class="custom-control-input check-${alternativa.pregunta.idpregunta}" id="${alternativa.idalternativa}" idpregunta="${alternativa.pregunta.idpregunta}">
                <label class="custom-control-label sisbu-cursor-mano" 
                    for="${alternativa.idalternativa}">${alternativa.descripcion}
                </label>
            </div>
            `;
    });
    return checks;
}

function getOptionSelect(alternativa) {
    return `<option value="${alternativa.idalternativa}">${alternativa.descripcion}</option>`;
}

function getOptionSelectDefault(text_default = "Respuesta. . .") {
    return `<option value="-1">${text_default}</option>`;
}
 */

function addEvents() {
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
                document.querySelector("#titleManagerRespuestaEvaluacion").style.display = "none";
                document.querySelector("#content-preguntas-evaluacion-socioeconomico").innerHTML = "";
                //document.querySelector("#row-evaluaciones").style.display = "initial";
                $('#modalCargandoEvaluacion').modal('show');
            }

        });
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
}

function addEventsChecksPreguntas(preguntas_checkboxs) {
    preguntas_checkboxs.forEach(pregunta => {
        document.querySelectorAll(".check-" + pregunta.idpregunta).forEach(check => {
            check.onchange = function () {
                //SET FALSE A TODOS MENOS A ESTE
                if (check.checked) {
                    document.querySelectorAll(".check-" + pregunta.idpregunta).forEach(check_ => {
                        if (check_.getAttribute('id') != check.getAttribute('id')) {
                            check_.checked = false;
                        }
                    });
                }
            };
        });
    });
}

function getPreguntasProcedimiento() {
    //GET PREGUNTAS DEL PROCEDIMIENTO SELECTED
    let preguntas_procedimientoSelected = [];
    beanProcedimientoSelectedGlobal.preguntas.forEach(pregunta => {

        preguntas_procedimientoSelected.push(pregunta);

    });
    return preguntas_procedimientoSelected;
}

function validateAlternativaInListAlternativas(idalternativa) {
    let validate = false;
    beanProcedimientoSelectedGlobal.alternativas.forEach(alternativa => {
        if (parseInt(alternativa.idalternativa) == parseInt(idalternativa)) {
            validate = true;
            return;
        }
    });
    return validate;
}

function openPreguntas(idcontent_preguntas_evaluacion) {
    //GET PREGUNTAS DEL PROCEDIMIENTO SELECTED
    let preguntas_procedimiento = getPreguntasProcedimiento();
    //LISTAMOS LAS PREGUNTAS
    document.querySelector("#" + idcontent_preguntas_evaluacion).innerHTML = "";
    let preguntas_checkboxs = [];
    preguntas_procedimiento.forEach(pregunta => {
        switch (pregunta.tipo_respuesta) {
            case 1:
                document.querySelector("#" + idcontent_preguntas_evaluacion).innerHTML += createLiInputTextPregunta(pregunta);
                break;
            case 2:
                //CHECK BOX
                preguntas_checkboxs.push(pregunta);
                document.querySelector("#" + idcontent_preguntas_evaluacion).innerHTML += createLiCheckBoxPregunta(pregunta);
                break;
            default:
                //SELECT - 4
                document.querySelector("#" + idcontent_preguntas_evaluacion).innerHTML += createLiSelectPregunta(pregunta);
                break;
        }

    });
    document.querySelector("#" + idcontent_preguntas_evaluacion).innerHTML += `
        <div class="form-group col-12 text-center pt-5">
            <button type="button" id="btn-cancelar-evaluation-socioeconomico" class="btn btn-outline-primary btn-sm" >
            <i class="icon icon-reply"></i> CANCELAR</button>
            <button type="submit" class="btn btn-primary btn-sm" id="btn-finalizar-evaluation-socioeconomico">ACTUALIZAR PREGUNTAS</button>
        </div>
    `;
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle=popover]').popover();
    //AGREGAMOS LOS EVENTOS, A LOS CHECKS

    addEventsChecksPreguntas(preguntas_checkboxs);
    //VALIDAR PARA VER A QUE METODO LLAMAMOS
    addEvents();
    toListRespuestaEvaluacion(beanPaginationRespuestaEvaluacion);

}

function validateCompleteProcedimiento(idprocedimiento) {
    let res = false;
    let procedimientos_realizados = beanProcedimientoSelectedGlobal.procedimientos_realizados;
    for (var i = 0; i < procedimientos_realizados.length; i++) {
        let procedimiento = procedimientos_realizados[i];
        if (parseInt(idprocedimiento) == parseInt(procedimiento.idprocedimiento)) {
            res = true;
            break;
        }
    }
    return res;
}

function findProcedimientoForId(idprocedimiento) {
    let procedimiento_;
    let procedimientos = beanProcedimientoSelectedGlobal.procedimientos;
    for (var i = 0; i < procedimientos.length; i++) {
        let procedimiento = procedimientos[i];
        if (parseInt(idprocedimiento) == parseInt(procedimiento.idprocedimiento)) {
            procedimiento_ = procedimiento;
            break;
        }
    }
    return procedimiento_;
}

function validateFinalizateProcedimiento() {
    let preguntas_procedimiento = getPreguntasProcedimiento();
    let validation_complete = true;
    for (var i = 0; i < preguntas_procedimiento.length; i++) {
        let pregunta = preguntas_procedimiento[i];
        //VALIDAMOS SI YA SE A RESPONDIDO ESA PREGUNTA

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
            break;
        }

    }
    return validation_complete;
}

function loadRespuestasProcedimiento() {
    let preguntas_procedimiento = getPreguntasProcedimiento();
    list_respuestas_evaluacion = [];
    //CREAMOS LOS OBTEJOS DE RESPUESTA
    for (var i = 0; i < preguntas_procedimiento.length; i++) {
        let pregunta = preguntas_procedimiento[i];
        respuesta = new RespuestaEvaluacion2();
        respuesta.pregunta = pregunta;
        //VALIDAMOS SI YA SE A RESPONDIDO ESA PREGUNTA
        let alternativa_temp;

        switch (pregunta.tipo_respuesta) {
            case 1:
                //TEXT
                respuesta.alternativa = null;
                respuesta.texto = getTextQuestionForInputText(pregunta);
                respuesta.idrespuesta_evaluacion2 = getIdRespuestaEvaluacionForInputText(pregunta);
                break;
            case 2:
                //CHECK BOX
                alternativa_temp = getAlternativaQuestionForCheck(pregunta);
                if (alternativa_temp != undefined) {
                    respuesta.alternativa = alternativa_temp;
                    respuesta.idrespuesta_evaluacion2 = getIdRespuestaEvaluacionForCheck(pregunta);
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

        if (respuesta.alternativa == undefined) {
            if (pregunta.tipo_respuesta != 1) {
                break;
            }
        }
        respuesta.evaluacion_atendido = evaluacionSelected;

        list_respuestas_evaluacion.push(respuesta);
    }
    return (list_respuestas_evaluacion.length > 0);
}

//VALIDACIONES
function validationQuestionForCheck(pregunta) {
    let validate = false;
    let checks = document.querySelectorAll(".check-" + pregunta.idpregunta);
    //VALIDACION POR CHECK, DEBE A VER AL MENOS UNO
    for (var i = 0; i < checks.length; i++) {
        let check = checks[i];
        if (check.checked) {
            validate = true;
            break;
        }
    }

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
    let checks = document.querySelectorAll(".check-" + pregunta.idpregunta);
    //VALIDACION POR CHECK, DEBE A VER AL MENOS UNO
    for (var i = 0; i < checks.length; i++) {
        let check = checks[i];
        if (check.checked) {
            alternativa = {
                "idalternativa": check.getAttribute('id')
            };
            break;
        }
    }
    //VALIDAMOS QUE ESTA ALTERNATIVA SEA VALIDA, EXISTA EN LA LISTA DE ALTERNATIVAS
    if (!validateAlternativaInListAlternativas(alternativa.idalternativa)) {
        alternativa = undefined;
    }
    return alternativa;
}
//GET ALTERNATIVAS RESPONDIDA
function getIdRespuestaEvaluacionForCheck(pregunta) {
    let alternativa;
    //VALIDACION POR CHECK, DEBE A VER AL MENOS UNO
    let checks = document.querySelectorAll(".check-" + pregunta.idpregunta);
    //VALIDACION POR CHECK, DEBE A VER AL MENOS UNO
    for (var i = 0; i < checks.length; i++) {
        let check = checks[i];
        if (check.checked) {
            alternativa = check.getAttribute('idrespuesta_evaluacion');
            break;
        }
    }
    //VALIDAMOS QUE ESTA ALTERNATIVA SEA VALIDA, EXISTA EN LA LISTA DE ALTERNATIVAS
    if (!validateListRespuestaEvaluacion(alternativa)) {
        alternativa = undefined;
    }
    return alternativa;
}

function validateListRespuestaEvaluacion(idrespuesta_evaluacion) {
    let eva_ = false;
    beanPaginationRespuestaEvaluacion.list.forEach(function (respuestaEvaluacion, index) {
        if (respuestaEvaluacion.idrespuesta_evaluacion2 == idrespuesta_evaluacion) {
            eva_ = true;
            return;
        }
    });
    return eva_;
}

function getAlternativaQuestionForSelect(pregunta) {
    let alternativa = false;
    if (document.querySelector("#select-" + pregunta.idpregunta).value != "-1") {
        alternativa = {
            "idalternativa": document.querySelector("#select-" + pregunta.idpregunta).value
        };
    }
    //VALIDAMOS QUE ESTA ALTERNATIVA SEA VALIDA, EXISTA EN LA LISTA DE ALTERNATIVAS
    if (!validateAlternativaInListAlternativas(alternativa.idalternativa)) {
        alternativa = undefined;
    }
    return alternativa;
}

function getTextQuestionForInputText(pregunta) {
    return document.querySelector("#input-text-" + pregunta.idpregunta).value;
}

function getIdRespuestaEvaluacionForInputText(pregunta) {
    let alternativa;
    alternativa = document.querySelector("#input-text-" + pregunta.idpregunta).getAttribute('idrespuesta_evaluacion');
    //VALIDAMOS QUE ESTA ALTERNATIVA SEA VALIDA, EXISTA EN LA LISTA DE ALTERNATIVAS
    if (!validateListRespuestaEvaluacion(alternativa)) {
        alternativa = undefined;
    }
    return alternativa;
}


