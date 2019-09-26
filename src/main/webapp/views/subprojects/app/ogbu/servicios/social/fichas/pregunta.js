/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var beanPaginationPregunta;
var preguntaSelected;
var beanRequestPregunta = new BeanRequest();

class Pregunta {
    constructor() {
        this.idpregunta = 0;
    }
}

document.addEventListener("DOMContentLoaded", function () {

    //OCULTAMOS COMPONENTES
    document.querySelector("#row-preguntas").style.display = "none";

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestPregunta.entity_api = "api/preguntas";
    beanRequestPregunta.operation = "paginate";
    beanRequestPregunta.type_request = "GET";

    document.querySelector("#btnCancelarPregunta").onclick = function () {
        inicializarEvaluaciones();
        navigatePreguntas('evaluaciones');
    };

    document.querySelector("#btnCancelarCrudPregunta").onclick = function () {
        navigatePreguntas('home');
    };

    $('#FrmPregunta').submit(function (event) {
        beanRequestPregunta.operation = "paginate";
        beanRequestPregunta.type_request = "GET";
        $('#modalCargandoPregunta').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    document.querySelector("#btnOpenNewPregunta").onclick = function () {
        $('#modalCargandoCountPregunta').modal("show");
    };

    document.querySelector("#btnGuardarPregunta").onclick = function () {
        if (validateFormPregunta()) {
            $("#modalCargandoPregunta").modal('show');
        }
    };

    $("#modalCargandoPregunta").on('shown.bs.modal', function () {
        processAjaxPregunta();
    });

    $("#modalCargandoCountPregunta").on('shown.bs.modal', function () {
        processAjaxCountPregunta();
    });

    $("#ventanaModalPregunta").on('hidden.bs.modal', function () {
        beanRequestPregunta.operation = "paginate";
        beanRequestPregunta.type_request = "GET";
    });

    $("#sizePagePregunta").change(function () {
        $('#modalCargandoPregunta').modal('show');
    });

});

function processAjaxPregunta() {
    let parameters_pagination = "";
    let json = "";
    let url_request = getHostAPI() + beanRequestPregunta.entity_api + "/" + beanRequestPregunta.operation;
    switch (beanRequestPregunta.operation) {
        case "add":
            json = {
                "idpregunta": 0,
                "enunciado": document.querySelector("#txtEnunciadoPregunta").value,
                "tooltip": document.querySelector("#txtTooltipPregunta").value,
                "placeholder": document.querySelector("#txtPlaceholderPregunta").value,
                "tipo_respuesta": document.querySelector("#txtTipoRespuestaPregunta").value,
                "item_negativo": document.querySelector("#txtItemNegativoPregunta").value,
                //"columnas": document.querySelector("#txtColumnasPregunta").value,
                "columnas": 12,
                "orden": document.querySelector("#txtOrdenPregunta").value,
                "estado": document.querySelector("#txtEstadoPregunta").value,
                "procedimiento": evaluacionSelected,
                "subarea_psi": {
                    "idsubarea_psi": subarea_psiSelected.idsubarea_psi
                }
            };
            break;
        case "update":
            json = {
                "idpregunta": preguntaSelected.idpregunta,
                "enunciado": document.querySelector("#txtEnunciadoPregunta").value,
                "tooltip": document.querySelector("#txtTooltipPregunta").value,
                "placeholder": document.querySelector("#txtPlaceholderPregunta").value,
                "tipo_respuesta": document.querySelector("#txtTipoRespuestaPregunta").value,
                "item_negativo": document.querySelector("#txtItemNegativoPregunta").value,
                //"columnas": document.querySelector("#txtColumnasPregunta").value,
                "columnas": 12,
                "orden": document.querySelector("#txtOrdenPregunta").value,
                "estado": document.querySelector("#txtEstadoPregunta").value,
                "procedimiento": evaluacionSelected,
                "subarea_psi": {
                    "idsubarea_psi": subarea_psiSelected.idsubarea_psi
                }
            };
            break;
        case "delete":
            url_request += "/" + preguntaSelected.idpregunta;
            break;
        default:
            parameters_pagination += "?filter=" + document.querySelector("#txtFilterPregunta").value.toUpperCase();
            parameters_pagination += "&idprocedimiento=" + evaluacionSelected.idprocedimiento;
            parameters_pagination += "&page=" + document.querySelector("#pagePregunta").value;
            parameters_pagination += "&size=" + document.querySelector("#sizePagePregunta").value;
            url_request += parameters_pagination;
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestPregunta.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoPregunta').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
                navigatePreguntas('home')
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationPregunta = beanCrudResponse.beanPagination;
            toListPregunta(beanPaginationPregunta);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoPregunta').modal("hide");
        showAlertErrorRequest();
    });
}

function toListPregunta(beanPagination) {
    document.querySelector("#tbodyPregunta").innerHTML = "";
    document.querySelector("#titleManagerPregunta").innerHTML = "[ " + beanPagination.count_filter + " ] PREGUNTAS";
    if (beanPagination.count_filter > 0) {
        let row;
        let btn_edit_alternativas;
        beanPagination.list.forEach(pregunta => {
            if (evaluacionSelected.usa_alternativas_globales == 1) {
                btn_edit_alternativas = "";
            } else {
                btn_edit_alternativas =
                        `
                    <li class="dt-list__item">
                        <a idpregunta='${pregunta.idpregunta}' class="text-light-gray editar-alternativas-pregunta sisbu-cursor-mano" data-toggle="tooltip" title="Editar alternativas u opciones" data-placement="bottom">
                            <i class="icon icon-description "></i>
                        </a>
                    </li>
                `;
            }
            row = "<tr>";
            row += "<td class='align-middle'>" + pregunta.orden + "</td>";
            row += "<td class='align-middle'>" + pregunta.enunciado + "<br><span class='text-primary'>" + getSubArea(pregunta.subarea_psi) + "</span></td>";
            row += "<td class='align-middle text-center'>" + getTipoRepuestaPregunta(pregunta.tipo_respuesta) + "</td>";
            row +=
                    `
                <td>
                    <ul class="dt-list dt-list-cm-0">
                        <li class="dt-list__item">
                            <a idpregunta='${pregunta.idpregunta}' class="text-light-gray editar-pregunta sisbu-cursor-mano" data-toggle="tooltip" title="Editar Pregunta">
                                <i class="icon icon-editors "></i>
                            </a>
                        </li>
                        ${btn_edit_alternativas}
                    </ul>
                </td>
            `;
            //row += "<td class='text-center align-middle'><button class='btn btn-outline-secondary btn-xs editar-pregunta' data-toggle='tooltip' title='Editar'><i class='icon icon-editors icon-fw'></i></button></td>";
            //row += "<td class='text-center align-middle'><button class='btn btn-outline-secondary btn-xs eliminar-pregunta' data-toggle='tooltip' title='Eliminar'><i class='icon icon-trash icon-fw'></i></button></td>";
            row += "</tr>";
            document.querySelector("#tbodyPregunta").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePagePregunta").value),
                document.querySelector("#pagePregunta"),
                $('#modalCargandoPregunta'),
                $('#paginationPregunta'));
        addEventsPreguntaes();
        if (beanRequestPregunta.operation == "paginate") {
            document.querySelector("#txtFilterPregunta").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationPregunta'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterPregunta").focus();
    }
}

function addEventsPreguntaes() {
    document.querySelectorAll('.editar-pregunta').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            preguntaSelected = findByPregunta(btn.getAttribute('idpregunta'));
            if (preguntaSelected != undefined) {
                beanRequestPregunta.operation = "update";
                beanRequestPregunta.type_request = "PUT";
                openPregunta();
            } else {
                showAlertTopEnd('warning', 'No se encontró el Pregunta para poder editar');
            }
        };
    });
    document.querySelectorAll('.editar-alternativas-pregunta').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            preguntaSelected = findByPregunta(btn.getAttribute('idpregunta'));
            if (preguntaSelected != undefined) {
                $('#ventanaModalAlternativa').modal('show');
            } else {
                showAlertTopEnd('warning', 'No se encontró el Pregunta para poder editar');
            }
        };
    });

}

function findByPregunta(idpregunta) {
    let pregunta_;
    beanPaginationPregunta.list.forEach(pregunta => {
        if (idpregunta == pregunta.idpregunta) {
            pregunta_ = pregunta;
            return;
        }
    });
    return pregunta_;
}

function validateFormPregunta() {
    if (document.querySelector("#txtOrdenPregunta").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese ingrese orden');
        document.querySelector("#txtOrdenPregunta").focus();
        return false;
    }
    if (document.querySelector("#txtEstadoPregunta").value == "-1") {
        showAlertTopEnd('warning', 'Por favor seleccione un estado');
        document.querySelector("#txtEstadoPregunta").focus();
        return false;
    }
    if (document.querySelector("#txtEnunciadoPregunta").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese enunciado');
        document.querySelector("#txtEnunciadoPregunta").focus();
        return false;
    }
    if (document.querySelector("#txtTipoRespuestaPregunta").value == "-1") {
        showAlertTopEnd('warning', 'Por favor seleccione un tipo de respuesta');
        document.querySelector("#txtTipoRespuestaPregunta").focus();
        return false;
    }
    if (evaluacionSelected.usa_alternativas_globales != 1) {
        //VERIFICAMOS QUE NO SEA 100 
        if (document.querySelector("#txtTipoRespuestaPregunta").value == "100") {
            showAlertTopEnd('warning', 'El tipo de respuesta seleccionado no es válido porque la evaluación no usa alternativas globales. Seleccione otro :)', 10000);
            document.querySelector("#txtTipoRespuestaPregunta").focus();
            return false;
        }
    }
    let num_columas = parseInt(document.querySelector("#txtColumnasPregunta").value);
    if (num_columas > 2 && num_columas < 13) {
        console.log("Num columnas correcto!");
    } else {
        showAlertTopEnd('warning', 'El valor del numero de columas debe estar entre 3 y 12');
        document.querySelector("#txtColumnasPregunta").focus();
        return false;
    }
    if (subarea_psiSelected == undefined) {
        showAlertTopEnd('warning', 'Por favor seleccione una subarea');
        return false;
    }
    if (subarea_psiSelected.idsubarea_psi == 0) {
        showAlertTopEnd('warning', 'Por favor seleccione correctamente una subarea');
        return false;
    }
    return true;
}

function getSubArea(subarea_psi) {
    let res = "";
    if (subarea_psi.nombre != null) {
        res = subarea_psi.nombre;
    }
    return res;
}

function navigatePreguntas(ir) {
    switch (ir) {
        case "crud":
            document.querySelector("#row-evaluaciones").style.display = "none";
            document.querySelector("#row-navigation-options").style.display = "none";
            document.querySelector("#row-preguntas").style.display = "none";
            document.querySelector("#row-crud-preguntas").style.display = "flex";
            break;
        case "evaluaciones":
            document.querySelector("#row-evaluaciones").style.display = "flex";
            document.querySelector("#row-navigation-options").style.display = "flex";
            document.querySelector("#row-preguntas").style.display = "none";
            document.querySelector("#row-crud-preguntas").style.display = "none";
            $('#modalCargandoEvaluacion').modal('show');
            break;
        default:
            //home
            document.querySelector("#row-evaluaciones").style.display = "none";
            document.querySelector("#row-navigation-options").style.display = "none";
            document.querySelector("#row-preguntas").style.display = "flex";
            document.querySelector("#row-crud-preguntas").style.display = "none";
            beanRequestPregunta.operation = "paginate";
            beanRequestPregunta.type_request = "GET";
            $('#modalCargandoPregunta').modal('show');
            break;
    }
}

function clearPregunta() {
    document.querySelector("#txtOrdenPregunta").value = "";
    document.querySelector("#txtEstadoPregunta").value = "1";
    document.querySelector("#txtItemNegativoPregunta").value = "N";
    document.querySelector("#txtEnunciadoPregunta").value = "";
    document.querySelector("#txtTooltipPregunta").value = "";
    document.querySelector("#txtPlaceholderPregunta").value = "";
    document.querySelector("#txtTipoRespuestaPregunta").value = "-1";
    document.querySelector("#txtColumnasPregunta").value = "12";
    document.querySelector("#txtColumnasPregunta").disabled = true;
    document.querySelector("#txtSubAreaPregunta").value = "";
}

function getTipoRepuestaPregunta(tipo_respuesta) {
    let s_ = "";
    switch (tipo_respuesta) {
        case 1:
            s_ = "TEXTO";
            break;
        case 2:
            s_ = "CHECK BOX";
            break;
        case 3:
            s_ = "TABLA";
            break;
        case 4:
            s_ = "LISTA DESPLEGABLE";
            break;
        default:
            s_ = "OTRO";
            break;
    }
    return s_;
}

function getSubAreaPregunta(subarea_psi) {
    let subarea_ = "";
    if (subarea_psi !== undefined) {
        subarea_ = subarea_psi.nombre;
    }
    return subarea_;
}

function openPregunta() {
    document.querySelector("#txtOrdenPregunta").value = preguntaSelected.orden;
    document.querySelector("#txtEstadoPregunta").value = preguntaSelected.estado;
    document.querySelector("#txtEnunciadoPregunta").value = preguntaSelected.enunciado;
    document.querySelector("#txtTooltipPregunta").value = preguntaSelected.tooltip;
    document.querySelector("#txtPlaceholderPregunta").value = preguntaSelected.placeholder;
    document.querySelector("#txtTipoRespuestaPregunta").value = preguntaSelected.tipo_respuesta;
    if (evaluacionSelected.usa_alternativas_globales == 1) {
        document.querySelector("#txtTipoRespuestaPregunta").disabled = true;
    } else {
        document.querySelector("#txtTipoRespuestaPregunta").disabled = false;
    }
    document.querySelector("#txtColumnasPregunta").value = preguntaSelected.columnas;
    document.querySelector("#txtColumnasPregunta").disabled = true;
    document.querySelector("#txtItemNegativoPregunta").value = preguntaSelected.item_negativo == undefined ? "-1" : preguntaSelected.item_negativo;
    ;
    document.querySelector("#txtSubAreaPregunta").value = getSubAreaPregunta(preguntaSelected.subarea_psi);
    subarea_psiSelected = preguntaSelected.subarea_psi;
    navigatePreguntas('crud');
    document.querySelector("#titleCrudPreguntas").innerHTML = "EDITAR PREGUNTA";
    document.querySelector("#txtOrdenPregunta").focus();
}

/*
 * PROCESO DE OBTENCION DE CANTIDAD DE PREGUNTA DE UN PROCEDIMIENTO
 */

function processAjaxCountPregunta() {
    let url_request = getHostAPI() + beanRequestPregunta.entity_api + "/get/num-preguntas?idprocedimiento=" + evaluacionSelected.idprocedimiento;
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
        $('#modalCargandoCountPregunta').modal("hide");
        if (jsonResponse.NUM_PREGUNTAS !== undefined) {
            if (jsonResponse.NUM_PREGUNTAS > -1) {
                openNewPregunta(jsonResponse.NUM_PREGUNTAS);
            } else {
                showAlertTopEnd('warning', "No se pudo obtener correctamente el n° de pregunta");
            }
        } else {
            showAlertTopEnd('warning', "No se pudo obtener el n° de pregunta");
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoCountPregunta').modal("hide");
        showAlertErrorRequest();
    });
}

function openNewPregunta(num_pregunta_actual) {
    //CONFIGURAMOS LA SOLICITUD
    beanRequestPregunta.operation = "add";
    beanRequestPregunta.type_request = "POST";
    //LIMPIAR LOS CAMPOS
    clearPregunta();
    //SET TITLE MODAL
    document.querySelector("#titleCrudPreguntas").innerHTML = "REGISTRAR PREGUNTA";
    //OPEN MODEL
    navigatePreguntas('crud');
    //TRAEMOS LA CANTIDAD DE PREGUNTAS
    document.querySelector("#txtOrdenPregunta").value = num_pregunta_actual + 1;
    if (evaluacionSelected.usa_alternativas_globales == 1) {
        document.querySelector("#txtTipoRespuestaPregunta").value = "100";
        document.querySelector("#txtTipoRespuestaPregunta").disabled = true;
    } else {
        document.querySelector("#txtTipoRespuestaPregunta").disabled = false;
    }
    subarea_psiSelected = new SubAreaPsi();
    document.querySelector("#txtEnunciadoPregunta").focus();
}
