/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var beanPaginationProcedimientoC;
var procedimientoCSelected;

var beanRequestProcedimientoC = new BeanRequest();

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestProcedimientoC.entity_api = "api/procedimientos";
    beanRequestProcedimientoC.operation = "paginate";
    beanRequestProcedimientoC.type_request = "GET";

    $('#FrmProcedimientoC').submit(function (event) {
        beanRequestProcedimientoC.operation = "paginate";
        beanRequestProcedimientoC.type_request = "GET";
        $('#modalCargandoDetalleProcedimientoCiclo').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $("#modalCargandoSelectedProcedimientoC").on('shown.bs.modal', function () {
        processAjaxProcedimientoC();
    });

    $("#ventanaModalSelectedProcedimientoC").on('shown.bs.modal', function () {
        $("#modalCargandoSelectedProcedimientoC").modal('show');
    });

    $("#ventanaModalSelectedProcedimientoC").on('hidden.bs.modal', function () {
        beanRequestProcedimientoC.operation = "paginate";
        beanRequestProcedimientoC.type_request = "GET";
    });

    document.querySelector("#btnSeleccionarDetalleProcedimientoCiclo").onclick = function () {
        $('#ventanaModalSelectedProcedimientoC').modal('show');
    };

    document.querySelector("#btn-selecionar-procedimientoc").onclick = function () {
        if (procedimientoCSelected == undefined) {
            showAlertTopEnd('warning', 'Por favor seleccione una evaluación');
            return;
        }
        document.querySelector("#txtProcedimientoDetalleProcedimientoCiclo").value = procedimientoCSelected.descripcion;
        $('#ventanaModalSelectedProcedimientoC').modal('hide');
    };

    document.querySelector("#btnCancelSelectionProcedimientoC").onclick = function () {
        procedimientoCSelected = undefined;
        document.querySelector("#txtProcedimientoDetalleProcedimientoCiclo").value = "";
    };

    $("#sizePageProcedimientoC").change(function () {
        $('#modalCargandoSelectedProcedimientoC').modal('show');
    });

});

function processAjaxProcedimientoC() {
    let parameters_pagination = "";
    let json = "";
    let url_request = getHostAPI() + beanRequestProcedimientoC.entity_api + "/" + beanRequestProcedimientoC.operation;
    switch (beanRequestProcedimientoC.operation) {
        default:
            parameters_pagination += "?filter=" + document.querySelector("#txtFilterProcedimientoC").value.toUpperCase();
            parameters_pagination += "&idarea=" + getIdAreaUserSession();
            parameters_pagination += "&page=" + document.querySelector("#pageProcedimientoC").value;
            parameters_pagination += "&size=" + document.querySelector("#sizePageProcedimientoC").value;
            url_request += parameters_pagination;
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestProcedimientoC.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoSelectedProcedimientoC').modal("hide");
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationProcedimientoC = beanCrudResponse.beanPagination;
            toListProcedimientoC(beanPaginationProcedimientoC);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoSelectedProcedimientoC').modal("hide");
        showAlertErrorRequest();
    });
}

function toListProcedimientoC(beanPagination) {
    document.querySelector("#tbodyProcedimientoC").innerHTML = "";
    document.querySelector("#titleManagerProcedimientoC").innerHTML = "[ " + beanPagination.count_filter + " ] EVALUACIONES";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(procedimiento => {
            row = "<tr class='click-selection-procedimiento sisbu-cursor-mano' idprocedimiento='" + procedimiento.idprocedimiento + "'>";
            row += "<td class='align-middle text-left'>" + procedimiento.descripcion + "</td>";
            row += "</tr>";
            document.querySelector("#tbodyProcedimientoC").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageProcedimientoC").value),
                document.querySelector("#pageProcedimientoC"),
                $('#modalCargandoSelectedProcedimientoC'),
                $('#paginationProcedimientoC'));
        addEventsProcedimientoCes();
        if (beanRequestProcedimientoC.operation == "paginate") {
            document.querySelector("#txtFilterProcedimientoC").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationProcedimientoC'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterProcedimientoC").focus();
    }
}

function addEventsProcedimientoCes() {
    document.querySelectorAll('.click-selection-procedimiento').forEach(function (element) {
        element.onclick = function () {
            if (this.classList.contains('row-selected-celeste-claro')) {
                this.classList.remove('row-selected-celeste-claro');
                procedimientoCSelected = undefined;
            } else {
                procedimientoCSelected = findByProcedimientoC(this.getAttribute('idprocedimiento'));
                this.parentElement.childNodes.forEach(function (element) {
                    element.classList.remove('row-selected-celeste-claro');
                });
                this.classList.add('row-selected-celeste-claro');
            }
        };
    });

}

function findByProcedimientoC(idprocedimiento) {
    let procedimiento_;
    beanPaginationProcedimientoC.list.forEach(procedimiento => {
        if (parseInt(idprocedimiento) == parseInt(procedimiento.idprocedimiento)) {
            procedimiento_ = procedimiento;
            return;
        }
    });
    return procedimiento_;
}
