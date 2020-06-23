/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var beanPaginationProcedimientoC2;
var procedimientoC2Selected;

var beanRequestProcedimientoC2 = new BeanRequest();

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestProcedimientoC2.entity_api = "api/procedimientos";
    beanRequestProcedimientoC2.operation = "paginate";
    beanRequestProcedimientoC2.type_request = "GET";

    $('#FrmProcedimientoC2').submit(function (event) {
        beanRequestProcedimientoC2.operation = "paginate";
        beanRequestProcedimientoC2.type_request = "GET";
        $('#modalCargandoSelectedProcedimientoC2').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $("#modalCargandoSelectedProcedimientoC2").on('shown.bs.modal', function () {
        processAjaxProcedimientoC2();
    });

    $("#ventanaModalSelectedProcedimientoC2").on('shown.bs.modal', function () {
        $("#modalCargandoSelectedProcedimientoC2").modal('show');
    });

    $("#ventanaModalSelectedProcedimientoC2").on('hidden.bs.modal', function () {
        beanRequestProcedimientoC2.operation = "paginate";
        beanRequestProcedimientoC2.type_request = "GET";
    });

    document.querySelector("#btnSeleccionarEvaluacionResultados").onclick = function () {
        $('#ventanaModalSelectedProcedimientoC2').modal('show');
    };

    document.querySelector("#btn-selecionar-procedimientoc2").onclick = function () {
        if (procedimientoC2Selected == undefined) {
            showAlertTopEnd('warning', 'Por favor seleccione una evaluación');
            return;
        }
        document.querySelector("#txtEvaluacionResultados").value = procedimientoC2Selected.descripcion;
        $('#ventanaModalSelectedProcedimientoC2').modal('hide');
    };

    document.querySelector("#btnCancelSelectionProcedimientoC2").onclick = function () {
        procedimientoC2Selected = undefined;
        document.querySelector("#txtEvaluacionResultados").value = "";
    };

    $("#sizePageProcedimientoC2").change(function () {
        $('#modalCargandoSelectedProcedimientoC2').modal('show');
    });

});

function processAjaxProcedimientoC2() {
    let parameters_pagination = "";
    let json = "";
    let url_request = getHostAPI() + beanRequestProcedimientoC2.entity_api + "/" + beanRequestProcedimientoC2.operation;
    switch (beanRequestProcedimientoC2.operation) {
        default:
            parameters_pagination += "?filter=" + document.querySelector("#txtFilterProcedimientoC2").value.toUpperCase();
            parameters_pagination += "&idarea=" + getIdAreaUserSession();
            parameters_pagination += "&page=" + document.querySelector("#pageProcedimientoC2").value;
            parameters_pagination += "&size=" + document.querySelector("#sizePageProcedimientoC2").value;
            url_request += parameters_pagination;
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestProcedimientoC2.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoSelectedProcedimientoC2').modal("hide");
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationProcedimientoC2 = beanCrudResponse.beanPagination;
            toListProcedimientoC2(beanPaginationProcedimientoC2);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoSelectedProcedimientoC2').modal("hide");
        showAlertErrorRequest();
    });
}

function toListProcedimientoC2(beanPagination) {
    document.querySelector("#tbodyProcedimientoC2").innerHTML = "";
    document.querySelector("#titleManagerProcedimientoC2").innerHTML = "[ " + beanPagination.count_filter + " ] EVALUACIONES";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(procedimiento => {
            row = "<tr class='click-selection-procedimiento sisbu-cursor-mano' idprocedimiento='" + procedimiento.idprocedimiento + "'>";
            row += "<td class='align-middle text-left'>" + procedimiento.descripcion + "</td>";
            row += "</tr>";
            document.querySelector("#tbodyProcedimientoC2").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageProcedimientoC2").value),
                document.querySelector("#pageProcedimientoC2"),
                $('#modalCargandoSelectedProcedimientoC2'),
                $('#paginationProcedimientoC2'));
        addEventsProcedimientoC2es();
        if (beanRequestProcedimientoC2.operation == "paginate") {
            document.querySelector("#txtFilterProcedimientoC2").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationProcedimientoC2'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterProcedimientoC2").focus();
    }
}

function addEventsProcedimientoC2es() {
    document.querySelectorAll('.click-selection-procedimiento').forEach(function (element) {
        element.onclick = function () {
            if (this.classList.contains('row-selected-celeste-claro')) {
                this.classList.remove('row-selected-celeste-claro');
                procedimientoC2Selected = undefined;
            } else {
                procedimientoC2Selected = findByProcedimientoC2(this.getAttribute('idprocedimiento'));
                this.parentElement.childNodes.forEach(function (element) {
                    element.classList.remove('row-selected-celeste-claro');
                });
                this.classList.add('row-selected-celeste-claro');
            }
        };
    });

}

function findByProcedimientoC2(idprocedimiento) {
    let procedimiento_;
    beanPaginationProcedimientoC2.list.forEach(procedimiento => {
        if (parseInt(idprocedimiento) == parseInt(procedimiento.idprocedimiento)) {
            procedimiento_ = procedimiento;
            return;
        }
    });
    return procedimiento_;
}
