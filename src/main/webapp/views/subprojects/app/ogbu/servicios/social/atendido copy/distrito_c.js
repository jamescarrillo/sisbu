/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var beanPaginationDistritoC;
var distritoCSelected;
var distritoActualSelected;
var distritoProcedenciaSelected;
var beanRequestDistritoC = new BeanRequest();

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestDistritoC.entity_api = "api/distritos";
    beanRequestDistritoC.operation = "paginate";
    beanRequestDistritoC.type_request = "GET";

    $('#FrmDistritoC').submit(function (event) {
        beanRequestDistritoC.operation = "paginate";
        beanRequestDistritoC.type_request = "GET";
        $('#modalCargandoSelectedDistritoC').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $("#modalCargandoSelectedDistritoC").on('shown.bs.modal', function () {
        processAjaxDistritoC();
    });

    $("#ventanaModalSelectedDistritoC").on('shown.bs.modal', function () {
        $("#modalCargandoSelectedDistritoC").modal('show');
    });

    $("#ventanaModalSelectedDistritoC").on('hidden.bs.modal', function () {
        beanRequestDistritoC.operation = "paginate";
        beanRequestDistritoC.type_request = "GET";
    });

    document.querySelector("#btnSeleccionarDistritoActual").onclick = function () {
        distrito_option = "actual";
        $('#ventanaModalSelectedDistritoC').modal('show');
    };

    document.querySelector("#btnSeleccionarDistritoProcedencia").onclick = function () {
        distrito_option = "procedencia";
        $('#ventanaModalSelectedDistritoC').modal('show');
    };

    // document.querySelector("#btnSeleccionarDistritoFamiliar").onclick = function () {
    //     distrito_option = "familiar";
    //     $('#ventanaModalSelectedDistritoC').modal('show');
    // };

    document.querySelector("#btn-selecionar-distritoc").onclick = function () {
        if (distritoCSelected == undefined) {
            showAlertTopEnd('warning', 'Por favor seleccione un distrito');
            return;
        }
        switch (distrito_option) {
            case "procedencia":
                distritoProcedenciaSelected = distritoCSelected;
                document.querySelector("#txtDistritoProcedenciaAtendido").value = distritoCSelected.nombre.toUpperCase();
                break;
            case "familiar":
                distritoSelected = distritoCSelected;
                document.querySelector("#txtDistritoAtendido").value = distritoCSelected.nombre.toUpperCase();
                break;
            default:
                //actual
                distritoActualSelected = distritoCSelected;
                document.querySelector("#txtDistritoActualAtendido").value = distritoCSelected.nombre.toUpperCase();
                break;
        }
        $('#ventanaModalSelectedDistritoC').modal('hide');
    };

    document.querySelector("#btnCancelSelectionDistritoC").onclick = function () {
        distritoCSelected = undefined;
        switch (distrito_option) {
            case "procedencia":
                distritoActualSelected = distritoCSelected;
                document.querySelector("#txtDistritoProcedenciaAtendido").value = "";
                break;
            case "familiar":
                distritoSelected = distritoCSelected;
                document.querySelector("#txtDistritoAtendido").value = "";
                break;
            default:
                //actual
                distritoActualSelected = distritoCSelected;
                document.querySelector("#txtDistritoActualAtendido").value = "";
                break;
        }
    };

    $("#sizePageDistritoC").change(function () {
        $('#modalCargandoSelectedDistritoC').modal('show');
    });

});

function processAjaxDistritoC() {
    let parameters_pagination = "";
    let json = "";
    let url_request = getHostAPI() + beanRequestDistritoC.entity_api + "/" + beanRequestDistritoC.operation;
    switch (beanRequestDistritoC.operation) {
        default:
            parameters_pagination += "?nombre=" + document.querySelector("#txtFilterDistritoC").value.toUpperCase();
            parameters_pagination += "&page=" + document.querySelector("#pageDistritoC").value;
            parameters_pagination += "&size=" + document.querySelector("#sizePageDistritoC").value;
            url_request += parameters_pagination;
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestDistritoC.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoSelectedDistritoC').modal("hide");
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationDistritoC = beanCrudResponse.beanPagination;
            toListDistritoC(beanPaginationDistritoC);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoSelectedDistritoC').modal("hide");
        showAlertErrorRequest();
    });
}

function toListDistritoC(beanPagination) {
    document.querySelector("#tbodyDistritoC").innerHTML = "";
    document.querySelector("#titleManagerDistritoC").innerHTML = "[ " + beanPagination.count_filter + " ] DISTRITOS";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(distrito => {
            row = "<tr class='click-selection-distrito sisbu-cursor-mano' iddistrito='" + distrito.iddistrito + "'>";
            row += "<td class='align-middle text-left'>" + distrito.nombre.toUpperCase() + "</td>";
            row += "</tr>";
            document.querySelector("#tbodyDistritoC").innerHTML += row;
        });
        buildPagination(
            beanPagination.count_filter,
            parseInt(document.querySelector("#sizePageDistritoC").value),
            document.querySelector("#pageDistritoC"),
            $('#modalCargandoSelectedDistritoC'),
            $('#paginationDistritoC'));
        addEventsDistritoCes();
        if (beanRequestDistritoC.operation == "paginate") {
            document.querySelector("#txtFilterDistritoC").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationDistritoC'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterDistritoC").focus();
    }
}

function addEventsDistritoCes() {
    document.querySelectorAll('.click-selection-distrito').forEach(function (element) {
        element.onclick = function () {
            if (this.classList.contains('bg-info')) {
                this.classList.remove('bg-info');
                this.classList.remove('text-white');
                distritoCSelected = undefined;
            } else {
                distritoCSelected = findByDistritoC(this.getAttribute('iddistrito'));
                this.parentElement.childNodes.forEach(function (element) {
                    element.classList.remove('bg-info');
                    element.classList.remove('text-white');
                });
                this.classList.add('bg-info');
                this.classList.add('text-white');
            }
        };
    });

}

function findByDistritoC(iddistrito) {
    let distrito_;
    beanPaginationDistritoC.list.forEach(distrito => {
        if (parseInt(iddistrito) == parseInt(distrito.iddistrito)) {
            distrito_ = distrito;
            return;
        }
    });
    return distrito_;
}
