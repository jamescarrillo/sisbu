/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var beanPaginationUnidadMedidaC;
var unidadMedidaCSelected;
var R_unidadMedida;
var beanRequestUnidadMedidaC = new BeanRequest();

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestUnidadMedidaC.entity_api = "api/unidadmedidas";
    beanRequestUnidadMedidaC.operation = "paginate";
    beanRequestUnidadMedidaC.type_request = "GET";

    $('#FrmUnidadMedidaC').submit(function (event) {
        beanRequestUnidadMedidaC.operation = "paginate";
        beanRequestUnidadMedidaC.type_request = "GET";
        $('#modalCargandoSelectedUnidadMedidaC').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $("#modalCargandoSelectedUnidadMedidaC").on('shown.bs.modal', function () {
        processAjaxUnidadMedidaC();
    });

    $("#ventanaModalSelectedUnidadMedidaC").on('shown.bs.modal', function () {
        $("#modalCargandoSelectedUnidadMedidaC").modal('show');
    });

    $("#ventanaModalSelectedUnidadMedidaC").on('hidden.bs.modal', function () {
        beanRequestUnidadMedidaC.operation = "paginate";
        beanRequestUnidadMedidaC.type_request = "GET";
    });

    document.querySelector("#btnSeleccionarUnidadMedidaI").onclick = function () {
        R_unidadMedida = "I";
        $('#ventanaModalSelectedUnidadMedidaC').modal('show');
    };
    document.querySelector("#btnSeleccionarUnidadMedidaS").onclick = function () {
        R_unidadMedida = "S";
        $('#ventanaModalSelectedUnidadMedidaC').modal('show');
    };

    document.querySelector("#btn-selecionar-unidadMedidac").onclick = function () {
        if (unidadMedidaCSelected == undefined) {
            showAlertTopEnd('warning', 'Por favor seleccione un unidadMedida');
            return;
        }
        if (R_unidadMedida == "I") {
            unidadMedidaISelected = unidadMedidaCSelected;
            document.querySelector("#txtUnidadMedidaIProducto").value = unidadMedidaCSelected.nombre.toUpperCase();
        } else {
            unidadMedidaSSelected = unidadMedidaCSelected;
            document.querySelector("#txtUnidadMedidaSProducto").value = unidadMedidaCSelected.nombre.toUpperCase();
        }

        $('#ventanaModalSelectedUnidadMedidaC').modal('hide');
    };

    document.querySelector("#btnCancelSelectionUnidadMedidaC").onclick = function () {
        unidadMedidaCSelected = undefined;
        if (R_unidadMedida == "I") {
            unidadMedidaSelected = unidadMedidaCSelected;
            document.querySelector("#txtUnidadMedidaIProducto").value = "";
        } else {
            unidadMedidaSelected = unidadMedidaCSelected;
            document.querySelector("#txtUnidadMedidaSProducto").value = "";
        }

    };

    $("#sizePageUnidadMedidaC").change(function () {
        $('#modalCargandoSelectedUnidadMedidaC').modal('show');
    });

});

function processAjaxUnidadMedidaC() {
    let parameters_pagination = "";
    let json = "";
    let url_request = getHostAPI() + beanRequestUnidadMedidaC.entity_api + "/" + beanRequestUnidadMedidaC.operation;
    switch (beanRequestUnidadMedidaC.operation) {
        default:
            parameters_pagination += "?nombre=" + document.querySelector("#txtFilterUnidadMedidaC").value.toUpperCase();
            parameters_pagination += "&page=" + document.querySelector("#pageUnidadMedidaC").value;
            parameters_pagination += "&size=" + document.querySelector("#sizePageUnidadMedidaC").value;
            url_request += parameters_pagination;
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestUnidadMedidaC.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoSelectedUnidadMedidaC').modal("hide");
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationUnidadMedidaC = beanCrudResponse.beanPagination;
            toListUnidadMedidaC(beanPaginationUnidadMedidaC);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoSelectedUnidadMedidaC').modal("hide");
        showAlertErrorRequest();
    });
}

function toListUnidadMedidaC(beanPagination) {
    document.querySelector("#tbodyUnidadMedidaC").innerHTML = "";
    document.querySelector("#titleManagerUnidadMedidaC").innerHTML = "[ " + beanPagination.count_filter + " ] UNIDADES DE MEDIDA";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(unidadMedida => {
            row = "<tr class='click-selection-unidadMedida sisbu-cursor-mano' idunidadMedida='" + unidadMedida.idunidad_medida + "'>";
            row += "<td class='align-middle text-left'>" + unidadMedida.nombre.toUpperCase() + "</td>";
            row += "</tr>";
            document.querySelector("#tbodyUnidadMedidaC").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageUnidadMedidaC").value),
                document.querySelector("#pageUnidadMedidaC"),
                $('#modalCargandoSelectedUnidadMedidaC'),
                $('#paginationUnidadMedidaC'));
        addEventsUnidadMedidaCes();
        if (beanRequestUnidadMedidaC.operation == "paginate") {
            document.querySelector("#txtFilterUnidadMedidaC").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationUnidadMedidaC'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterUnidadMedidaC").focus();
    }
}

function addEventsUnidadMedidaCes() {
    document.querySelectorAll('.click-selection-unidadMedida').forEach(function (element) {
        element.onclick = function () {
            if (this.classList.contains('row-selected-celeste-claro')) {
                this.classList.remove('row-selected-celeste-claro');
                unidadMedidaCSelected = undefined;
            } else {
                unidadMedidaCSelected = findByUnidadMedidaC(this.getAttribute('idunidadMedida'));
                this.parentElement.childNodes.forEach(function (element) {
                    element.classList.remove('row-selected-celeste-claro');
                });
                this.classList.add('row-selected-celeste-claro');
            }
        };
    });

}

function findByUnidadMedidaC(idunidad_medida) {
    let unidadMedida_;
    beanPaginationUnidadMedidaC.list.forEach(unidadMedida => {
        if (parseInt(idunidad_medida) == parseInt(unidadMedida.idunidad_medida)) {
            unidadMedida_ = unidadMedida;
            return;
        }
    });
    return unidadMedida_;
}
