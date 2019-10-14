/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var beanPaginationCargoC;
var cargoCSelected;

var beanRequestCargoC = new BeanRequest();

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestCargoC.entity_api = "api/cargos";
    beanRequestCargoC.operation = "paginate";
    beanRequestCargoC.type_request = "GET";

    $('#FrmCargoC').submit(function (event) {
        beanRequestCargoC.operation = "paginate";
        beanRequestCargoC.type_request = "GET";
        $('#modalCargandoSelectedCargoC').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $("#modalCargandoSelectedCargoC").on('shown.bs.modal', function () {
        processAjaxCargoC();
    });

    $("#ventanaModalSelectedCargoC").on('shown.bs.modal', function () {
        $("#modalCargandoSelectedCargoC").modal('show');
    });

    $("#ventanaModalSelectedCargoC").on('hidden.bs.modal', function () {
        beanRequestCargoC.operation = "paginate";
        beanRequestCargoC.type_request = "GET";
    });

    document.querySelector("#btnSeleccionarCargo").onclick = function () {
        $('#ventanaModalSelectedCargoC').modal('show');
    };

    document.querySelector("#btn-selecionar-cargoc").onclick = function () {
        if (cargoCSelected == undefined) {
            showAlertTopEnd('warning', 'Por favor seleccione un cargo');
            return;
        }
        cargoSelected = cargoCSelected;
        document.querySelector("#txtCargoPersonal").value = cargoCSelected.nombre.toUpperCase();
        $('#ventanaModalSelectedCargoC').modal('hide');
    };

    document.querySelector("#btnCancelSelectionCargoC").onclick = function () {
        cargoCSelected = undefined;
        cargoSelected = cargoCSelected;
        document.querySelector("#txtCargoPersonal").value = "";
    };

    $("#sizePageCargoC").change(function () {
        $('#modalCargandoSelectedCargoC').modal('show');
    });

});

function processAjaxCargoC() {
    let parameters_pagination = "";
    let json = "";
    let url_request = getHostAPI() + beanRequestCargoC.entity_api + "/" + beanRequestCargoC.operation;
    switch (beanRequestCargoC.operation) {
        default:
            parameters_pagination += "?nombre=" + document.querySelector("#txtFilterCargoC").value.toUpperCase();
            parameters_pagination += "&page=" + document.querySelector("#pageCargoC").value;
            parameters_pagination += "&size=" + document.querySelector("#sizePageCargoC").value;
            url_request += parameters_pagination;
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestCargoC.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoSelectedCargoC').modal("hide");
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationCargoC = beanCrudResponse.beanPagination;
            toListCargoC(beanPaginationCargoC);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoSelectedCargoC').modal("hide");
        showAlertErrorRequest();
    });
}

function toListCargoC(beanPagination) {
    document.querySelector("#tbodyCargoC").innerHTML = "";
    document.querySelector("#titleManagerCargoC").innerHTML = "[ " + beanPagination.count_filter + " ] CARGOS";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(cargo => {
            row = "<tr class='click-selection-cargo sisbu-cursor-mano' idcargo='" + cargo.idcargo + "'>";
            row += "<td class='align-middle text-left'>" + cargo.nombre.toUpperCase() + "</td>";
            row += "</tr>";
            document.querySelector("#tbodyCargoC").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageCargoC").value),
                document.querySelector("#pageCargoC"),
                $('#modalCargandoSelectedCargoC'),
                $('#paginationCargoC'));
        addEventsCargoCes();
        if (beanRequestCargoC.operation == "paginate") {
            document.querySelector("#txtFilterCargoC").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationCargoC'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterCargoC").focus();
    }
}

function addEventsCargoCes() {
    document.querySelectorAll('.click-selection-cargo').forEach(function (element) {
        element.onclick = function () {
            if (this.classList.contains('row-selected-celeste-claro')) {
                this.classList.remove('row-selected-celeste-claro');
                cargoCSelected = undefined;
            } else {
                cargoCSelected = findByCargoC(this.getAttribute('idcargo'));
                this.parentElement.childNodes.forEach(function (element) {
                    element.classList.remove('row-selected-celeste-claro');
                });
                this.classList.add('row-selected-celeste-claro');
            }
        };
    });

}

function findByCargoC(idcargo) {
    let cargo_;
    beanPaginationCargoC.list.forEach(cargo => {
        if (parseInt(idcargo) == parseInt(cargo.idcargo)) {
            cargo_ = cargo;
            return;
        }
    });
    return cargo_;
}
