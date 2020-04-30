/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var beanPaginationArea;
var areaSelected;

var beanRequestArea = new BeanRequest();

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestArea.entity_api = "api/areas";
    beanRequestArea.operation = "paginate";
    beanRequestArea.type_request = "GET";

    $('#FrmArea').submit(function (event) {
        beanRequestArea.operation = "paginate";
        beanRequestArea.type_request = "GET";
        $('#modalCargandoSelectedArea').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $("#modalCargandoSelectedArea").on('shown.bs.modal', function () {
        processAjaxArea();
    });

    $("#ventanaModalSelectedArea").on('shown.bs.modal', function () {
        $("#modalCargandoSelectedArea").modal('show');
    });

    $("#ventanaModalSelectedArea").on('hidden.bs.modal', function () {
        beanRequestArea.operation = "paginate";
        beanRequestArea.type_request = "GET";
    });

    document.querySelector("#btnSeleccionarArea").onclick = function () {
        $('#ventanaModalSelectedArea').modal('show');
    };

    document.querySelector("#btn-selecionar-area").onclick = function () {
        if (areaSelected == undefined) {
            showAlertTopEnd('warning', 'Por favor seleccione una area');
            return;
        }
        document.querySelector("#txtAreaCita").value = areaSelected.nombre.toUpperCase();
        $('#ventanaModalSelectedArea').modal('hide');
        document.querySelector("#btnCancelSelectionPersonal").dispatchEvent(new Event('click'));
    };

    document.querySelector("#btnCancelSelectionArea").onclick = function () {
        areaSelected = undefined;
        document.querySelector("#txtAreaCita").value = "";
    };

    $("#sizePageArea").change(function () {
        $('#modalCargandoSelectedArea').modal('show');
    });

});

function processAjaxArea() {
    let parameters_pagination = "";
    let json = "";
    let url_request = getHostAPI() + beanRequestArea.entity_api + "/" + beanRequestArea.operation;
    switch (beanRequestArea.operation) {
        default:
            parameters_pagination += "?nombre=" + document.querySelector("#txtFilterArea").value.toUpperCase();
            parameters_pagination += "&page=" + document.querySelector("#pageArea").value;
            parameters_pagination += "&size=" + document.querySelector("#sizePageArea").value;
            url_request += parameters_pagination;
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestArea.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoSelectedArea').modal("hide");
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationArea = beanCrudResponse.beanPagination;
            toListArea(beanPaginationArea);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoSelectedArea').modal("hide");
        showAlertErrorRequest();
    });
}

function toListArea(beanPagination) {
    document.querySelector("#tbodyArea").innerHTML = "";
    document.querySelector("#titleManagerArea").innerHTML = "[ " + beanPagination.count_filter + " ] AREAS";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(area => {
            row = "<tr class='click-selection-area sisbu-cursor-mano' idarea='" + area.idarea + "'>";
            row += "<td class='align-middle text-left'>" + area.nombre.toUpperCase() + "</td>";
            row += "</tr>";
            document.querySelector("#tbodyArea").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageArea").value),
                document.querySelector("#pageArea"),
                $('#modalCargandoSelectedArea'),
                $('#paginationArea'));
        addEventsAreaes();
        if (beanRequestArea.operation == "paginate") {
            document.querySelector("#txtFilterArea").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationArea'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterArea").focus();
    }
}

function addEventsAreaes() {
    document.querySelectorAll('.click-selection-area').forEach(function (element) {
        element.onclick = function () {
            if (this.classList.contains('row-selected-celeste-claro')) {
                this.classList.remove('row-selected-celeste-claro');
                areaSelected = undefined;
            } else {
                areaSelected = findByArea(this.getAttribute('idarea'));
                this.parentElement.childNodes.forEach(function (element) {
                    element.classList.remove('row-selected-celeste-claro');
                });
                this.classList.add('row-selected-celeste-claro');
            }
        };
    });

}

function findByArea(idarea) {
    let area_;
    beanPaginationArea.list.forEach(area => {
        if (parseInt(idarea) == parseInt(area.idarea)) {
            area_ = area;
            return;
        }
    });
    return area_;
}
