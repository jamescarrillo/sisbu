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

            document.querySelector("#row-option-socioeconomica").style.display = "none";
            document.querySelector("#row-option-deportiva").style.display = "flex";
            document.querySelector("#row-option-psicologica").style.display = "none";
            document.querySelector("#row-option-obstetricia").style.display = "none";
            break;
        case "psicologica":
            document.querySelector("#row-options-evaluaciones").style.display = "none";

            document.querySelector("#row-option-socioeconomica").style.display = "none";
            document.querySelector("#row-option-deportiva").style.display = "none";
            document.querySelector("#row-option-psicologica").style.display = "flex";
            document.querySelector("#row-option-obstetricia").style.display = "none";
            break;
        case "obstetricia":
            document.querySelector("#row-options-evaluaciones").style.display = "none";

            document.querySelector("#row-option-socioeconomica").style.display = "none";
            document.querySelector("#row-option-deportiva").style.display = "none";
            document.querySelector("#row-option-psicologica").style.display = "none";
            document.querySelector("#row-option-obstetricia").style.display = "flex";
            break;
        default:
            //SOCIOECONOMICA
            document.querySelector("#row-options-evaluaciones").style.display = "none";

            document.querySelector("#row-option-socioeconomica").style.display = "flex";
            document.querySelector("#row-option-deportiva").style.display = "none";
            document.querySelector("#row-option-psicologica").style.display = "none";
            document.querySelector("#row-option-obstetricia").style.display = "none";

            $('#modalCargandoProcedimientoCicloSocie').modal('show');
            break;
    }
}

/*
 * FUNCTIONS PREGUNTAS DINAMICAS
 */


function getAlternativasPregunta(pregunta, beanProcedimientoCiclo) {
    let alternativas_pregunta = [];
    beanProcedimientoCiclo.alternativas.forEach(alternativa => {
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

function createLiSelectPregunta(pregunta, beanProcedimientoCiclo) {
    let alternativas = getAlternativasPregunta(pregunta, beanProcedimientoCiclo);
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

function createLiCheckBoxPregunta(pregunta, beanProcedimientoCiclo) {
    let alternativas = getAlternativasPregunta(pregunta, beanProcedimientoCiclo);
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

function getPreguntasProcedimiento(beanProcedimientoCiclo, procedimientoCicloSelected) {
    //GET PREGUNTAS DEL PROCEDIMIENTO SELECTED
    let preguntas_procedimientoSelected = [];
    beanProcedimientoCiclo.preguntas.forEach(pregunta => {
        if (parseInt(procedimientoCicloSelected.idprocedimiento) == parseInt(pregunta.procedimiento.idprocedimiento)) {
            preguntas_procedimientoSelected.push(pregunta);
        }
    });
    return preguntas_procedimientoSelected;
}

function validateAlternativaInListAlternativas(idalternativa, beanProcedimientoCiclo) {
    let validate = false;
    beanProcedimientoCiclo.forEach(alternativa => {
        if (parseInt(alternativa.idalternativa) == parseInt(idalternativa)) {
            validate = true;
            return;
        }
    });
    return validate;
}