/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var color = Chart.helpers.color;

var chartColors = chartColors = {
    red: '#f37070',
    pink: '#ff445d',
    orange: '#ff8f3a',
    yellow: '#ffde16',
    lightGreen: '#24cf91',
    green: '#4ecc48',
    blue: '#5797fc',
    skyBlue: '#33d4ff',
    gray: '#cfcfcf'
};

class RespuestaEvaluacion2 {
    constructor() {
        this.idrespuesta_evaluacion2 = 0;
        this.evaluacion_atendido = null;
        this.pregunta = null;
        this.alternativa = null;
        this.texto = "";
    }
}

var list_respuestas_evaluacion;

var procedimientoSelectedGlobal;
var beanProcedimientoSelectedGlobal;

var procedimiento_menu_selected;

document.addEventListener("DOMContentLoaded", function () {

    // creating center text
    Chart.pluginService.register({
        beforeDraw: function (chart) {
            var width = chart.chart.width,
                    height = chart.chart.height,
                    ctx = chart.chart.ctx;
            var center_text = $(ctx.canvas).data('fill');
            if (center_text) {
                var $dtTheme = localStorage.getItem('dt-theme');
                ctx.restore();
                var fontSize = (height / 114).toFixed(2);
                ctx.font = 3 + "rem Source Sans Pro";
                ctx.textBaseline = "middle";
                /*if ($dtTheme == 'dark') {
                 ctx.fillStyle = "#fff";
                 }*/
                var textX = Math.round((width - ctx.measureText(center_text).width) / 2),
                        textY = height / 2;
                ctx.fillText(center_text, textX, textY);
                ctx.save();
            }
        }
    });

    document.querySelector("#lblNameUserIndex").innerHTML = getStringCapitalize(Cookies.getJSON('sisbu_user').usuario.split(" ")[0].toLowerCase());

    document.querySelector("#btnEmpezarEvaluaciones").onclick = function () {
        document.querySelector("#row-home-evaluaciones").style.display = "none";
        document.querySelector("#row-options-evaluaciones").style.display = "flex";
    };

    document.querySelector("#btnRegresarHome").onclick = function () {
        document.querySelector("#row-home-evaluaciones").style.display = "flex";
        document.querySelector("#row-options-evaluaciones").style.display = "none";
    };

    document.querySelectorAll(".option-evaluation").forEach(div => {
        div.onclick = function () {
            navigateOptionEvaluation(this.getAttribute('evaluation'));
        };
    });

    document.querySelectorAll(".btn-regresar-selected-evaluation").forEach(btn => {
        btn.onclick = function () {
            navigateOptionEvaluation('home');
        };
    });

});

function navigateOptionEvaluation(option) {
    switch (option) {
        case "home":
            document.querySelector("#row-options-evaluaciones").style.display = "flex";

            document.querySelector("#row-option-socioeconomica").style.display = "none";
            document.querySelector("#row-option-deportiva").style.display = "none";
            document.querySelector("#row-option-psicologica").style.display = "none";
            document.querySelector("#row-option-obstetricia").style.display = "none";
            break;
        case "deportiva":
            document.querySelector("#row-options-evaluaciones").style.display = "none";

            document.querySelector("#row-option-socioeconomico").style.display = "none";
            document.querySelector("#row-option-deportiva").style.display = "flex";
            document.querySelector("#row-option-psicologica").style.display = "none";
            document.querySelector("#row-option-obstetricia").style.display = "none";
            break;
        case "psicologica":
            document.querySelector("#row-options-evaluaciones").style.display = "none";

            document.querySelector("#row-option-socioeconomico").style.display = "none";
            document.querySelector("#row-option-deportiva").style.display = "none";
            document.querySelector("#row-option-psicologica").style.display = "flex";
            document.querySelector("#row-option-obstetricia").style.display = "none";
            break;
        case "obstetricia":
            document.querySelector("#row-options-evaluaciones").style.display = "none";

            document.querySelector("#row-option-socioeconomico").style.display = "none";
            document.querySelector("#row-option-deportiva").style.display = "none";
            document.querySelector("#row-option-psicologica").style.display = "none";
            document.querySelector("#row-option-obstetricia").style.display = "flex";
            break;
        default:
            //SOCIOECONOMICA
            document.querySelector("#row-options-evaluaciones").style.display = "none";

            document.querySelector("#row-option-socioeconomico").style.display = "flex";
            document.querySelector("#row-option-deportiva").style.display = "none";
            document.querySelector("#row-option-psicologica").style.display = "none";
            document.querySelector("#row-option-obstetricia").style.display = "none";

            $('#modalCargandoProcedimientoSocioeconomico').modal('show');
            break;
    }
}

/*
 * FUNCTIONS PREGUNTAS DINAMICAS
 */


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
        } else {
            select += getOptionSelect(alternativa);
        }
    });
    select += `</select>`;
    return select;
}

function getInputTextPregunta(pregunta) {
    return `<input class="form-control form-control-sm" placeholder="${pregunta.placeholder}" id="input-text-${pregunta.idpregunta}" >`;
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
        if (parseInt(procedimientoSelectedGlobal.idprocedimiento) == parseInt(pregunta.procedimiento.idprocedimiento)) {
            preguntas_procedimientoSelected.push(pregunta);
        }
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
        if (procedimientoSelectedGlobal.usa_alternativas_globales == 1) {
            preguntas_checkboxs.push(pregunta);
            document.querySelector("#" + idcontent_preguntas_evaluacion).innerHTML += createLiCheckBoxPregunta(pregunta);
        } else {
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
        }
    });
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle=popover]').popover();
    //AGREGAMOS LOS EVENTOS, A LOS CHECKS
    addEventsChecksPreguntas(preguntas_checkboxs);
    //VALIDAR PARA VER A QUE METODO LLAMAMOS
    navigateProcedimientoAndPreguntas('preguntas');
    //MANDAMOS A REGISTRAR UN INTENTO
    fecha_inicioProcedimientoSocioeconomico = getTimesTampJavaScriptCurrent();
}

function navigateProcedimientoAndPreguntas(opcion) {
    switch (procedimiento_menu_selected) {
        case "psicologia":

            break;
        default:
            //socioeconomico
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
            break;
    }
}

function validateFinalizateProcedimiento() {
    let preguntas_procedimiento = getPreguntasProcedimiento();
    let validation_complete = true;
    for (var i = 0; i < preguntas_procedimiento.length; i++) {
        let pregunta = preguntas_procedimiento[i];
        //VALIDAMOS SI YA SE A RESPONDIDO ESA PREGUNTA
        if (procedimientoSelectedGlobal.usa_alternativas_globales == 1) {
            if (!validationQuestionForCheck(pregunta)) {
                showAlertTopEnd('warning', 'Por favor marque una casilla de la pregunta n° ' + pregunta.orden);
                validation_complete = false;
                break;
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
                break;
            }
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
        if (respuesta.alternativa == undefined) {
            if (pregunta.tipo_respuesta != 1) {
                break;
            }
        }
        list_respuestas_evaluacion.push(respuesta);
    }
    return (list_respuestas_evaluacion.length == 0);
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