/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var beanPaginationPreguntaC;
var preguntaCSelected1;
var preguntaCSelected2;
var preguntaISelected1;
var preguntaISelected2;

var type_and_num_pregunta;

var beanRequestPreguntaC = new BeanRequest();

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestPreguntaC.entity_api = "api/preguntas";
    beanRequestPreguntaC.operation = "paginate";
    beanRequestPreguntaC.type_request = "GET";

    $('#FrmPreguntaC').submit(function (event) {
        beanRequestPreguntaC.operation = "paginate";
        beanRequestPreguntaC.type_request = "GET";
        $('#modalCargandoPreguntaC').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $("#modalCargandoPreguntaC").on('shown.bs.modal', function () {
        processAjaxPreguntaC();
    });

    $("#ventanaModalSelectedPreguntaC").on('shown.bs.modal', function () {
        $("#modalCargandoPreguntaC").modal('show');
    });

    $("#ventanaModalPreguntaC").on('hidden.bs.modal', function () {
        beanRequestPreguntaC.operation = "paginate";
        beanRequestPreguntaC.type_request = "GET";
    });

    document.querySelector("#btn-selecionar-preguntac").onclick = function () {
        let pregunta_final;
        let txt;
        switch (type_and_num_pregunta) {
            case "C1":
                pregunta_final = preguntaCSelected1;
                txt = document.querySelector("#txtPreguta1CriticoPsi");
                break;
            case "C2":
                pregunta_final = preguntaCSelected2;
                txt = document.querySelector("#txtPreguta2CriticoPsi");
                break;
            case "I1":
                pregunta_final = preguntaISelected1;
                txt = document.querySelector("#txtPreguta1InconsistenciaPsi");
                break;
            case "I2":
                pregunta_final = preguntaISelected2;
                txt = document.querySelector("#txtPreguta2InconsistenciaPsi");
                break;
            default:
                pregunta_final = preguntaCSelected1;
                txt = document.querySelector("#txtPreguta1CriticoPsi");
                break;
        }
        if (pregunta_final.idcritico_psi != 0) {
            txt.value = pregunta_final.orden + ". " + pregunta_final.enunciado;
            $('#ventanaModalSelectedPreguntaC').modal('hide');
        } else {
            showAlertTopEnd('warning', 'Por favor seleccione una pregunta');
        }
    };

    document.querySelector("#btnCancelSelectionPreguntaC").onclick = function () {
        switch (type_and_num_pregunta) {
            case "C1":
                preguntaCSelected1 = new Pregunta();
                break;
            case "C2":
                preguntaCSelected2 = new Pregunta();
                break;
            case "I1":
                preguntaISelected1 = new Pregunta();
                break;
            case "I2":
                preguntaISelected2 = new Pregunta();
                break;
            default:
                preguntaCSelected1 = new Pregunta();
                break;
        }
    };

    $("#sizePagePreguntaC").change(function () {
        $('#modalCargandoPreguntaC').modal('show');
    });

});



function processAjaxPreguntaC() {
    let parameters_pagination = "";
    let json = "";
    let url_request = getHostAPI() + beanRequestPreguntaC.entity_api + "/" + beanRequestPreguntaC.operation;
    switch (beanRequestPreguntaC.operation) {
        default:
            parameters_pagination += "?filter=" + document.querySelector("#txtFilterPreguntaC").value.toUpperCase();
            parameters_pagination += "&idprocedimiento=" + evaluacionSelected.idprocedimiento;
            parameters_pagination += "&page=" + document.querySelector("#pagePreguntaC").value;
            parameters_pagination += "&size=" + document.querySelector("#sizePagePreguntaC").value;
            url_request += parameters_pagination;
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestPreguntaC.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoPreguntaC').modal("hide");
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationPreguntaC = beanCrudResponse.beanPagination;
            toListPreguntaC(beanPaginationPreguntaC);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoPreguntaC').modal("hide");
        showAlertErrorRequest();
    });
}

function toListPreguntaC(beanPagination) {
    document.querySelector("#tbodyPreguntaC").innerHTML = "";
    document.querySelector("#titleManagerPreguntaC").innerHTML = "[ " + beanPagination.count_filter + " ] PREGUNTAS";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(pregunta => {
            row = "<tr class='click-selection-pregunta sisbu-cursor-mano' idpregunta='" + pregunta.idpregunta + "'>";
            row += "<td class='align-middle text-left'>" + pregunta.orden + ". " + pregunta.enunciado + "<br><span class='text-primary'>" + getSubAreaPreguntaC(pregunta.subarea_psi) + "</span></td>";
            row += "</tr>";
            document.querySelector("#tbodyPreguntaC").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePagePreguntaC").value),
                document.querySelector("#pagePreguntaC"),
                $('#modalCargandoPreguntaC'),
                $('#paginationPreguntaC'));
        addEventsPreguntaCes();
        if (beanRequestPreguntaC.operation == "paginate") {
            document.querySelector("#txtFilterPreguntaC").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationPreguntaC'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterPreguntaC").focus();
    }
}

function addEventsPreguntaCes() {
    document.querySelectorAll('.click-selection-pregunta').forEach(function (element) {
        element.onclick = function () {
            if (this.classList.contains('row-selected-celeste-claro')) {
                this.classList.remove('row-selected-celeste-claro');
                preguntaCSelected1 = new Pregunta();
                preguntaCSelected2 = new Pregunta();
                preguntaISelected1 = new Pregunta();
                preguntaISelected2 = new Pregunta();
            } else {
                switch (type_and_num_pregunta) {
                    case "C1":
                        preguntaCSelected1 = findByPreguntaC(this.getAttribute('idpregunta'));
                        break;
                    case "C2":
                        preguntaCSelected2 = findByPreguntaC(this.getAttribute('idpregunta'));
                        break;
                    case "I1":
                        preguntaISelected1 = findByPreguntaC(this.getAttribute('idpregunta'));
                        break;
                    case "I2":
                        preguntaISelected2 = findByPreguntaC(this.getAttribute('idpregunta'));
                        break;
                    default:
                        preguntaCSelected1 = findByPreguntaC(this.getAttribute('idpregunta'));
                        break;
                }
                this.parentElement.childNodes.forEach(function (element) {
                    element.classList.remove('row-selected-celeste-claro');
                });
                this.classList.add('row-selected-celeste-claro');
            }
        };
    });

}

function findByPreguntaC(idpregunta) {
    let pregunta_;
    beanPaginationPreguntaC.list.forEach(pregunta => {
        if (parseInt(idpregunta) == parseInt(pregunta.idpregunta)) {
            pregunta_ = pregunta;
            return;
        }
    });
    return pregunta_;
}

function getSubAreaPreguntaC(subarea_psi) {
    let res = "";
    if (subarea_psi.nombre != null) {
        res = subarea_psi.nombre;
    }
    return res;
}
