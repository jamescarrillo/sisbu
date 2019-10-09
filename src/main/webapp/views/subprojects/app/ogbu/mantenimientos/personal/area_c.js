/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var beanPaginationAreaC;
var areaCSelected;

var beanRequestAreaC = new BeanRequest();

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestAreaC.entity_api = "api/areas";
    beanRequestAreaC.operation = "paginate";
    beanRequestAreaC.type_request = "GET";

    $('#FrmAreaC').submit(function (event) {
        beanRequestAreaC.operation = "paginate";
        beanRequestAreaC.type_request = "GET";
        $('#modalCargandoSelectedAreaC').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $("#modalCargandoSelectedAreaC").on('shown.bs.modal', function () {
        processAjaxAreaC();
    });

    $("#ventanaModalSelectedAreaC").on('shown.bs.modal', function () {
        $("#modalCargandoSelectedAreaC").modal('show');
    });

    $("#ventanaModalSelectedAreaC").on('hidden.bs.modal', function () {
        beanRequestAreaC.operation = "paginate";
        beanRequestAreaC.type_request = "GET";
    });

    document.querySelector("#btnSeleccionarArea").onclick = function () {
        $('#ventanaModalSelectedAreaC').modal('show');
    };

    document.querySelector("#btn-selecionar-areac").onclick = function () {
        if (areaCSelected == undefined) {
            showAlertTopEnd('warning', 'Por favor seleccione un area');
            return;
        }
        areaSelected = areaCSelected;
        document.querySelector("#txtAreaPersonal").value = areaCSelected.nombre.toUpperCase();
        $('#ventanaModalSelectedAreaC').modal('hide');
    };

    document.querySelector("#btnCancelSelectionAreaC").onclick = function () {
        areaCSelected = undefined;
        areaSelected = areaCSelected;
        document.querySelector("#txtAreaPersonal").value = "";
    };

    $("#sizePageAreaC").change(function () {
        $('#modalCargandoSelectedAreaC').modal('show');
    });

});

function processAjaxAreaC() {
    let parameters_pagination = "";
    let json = "";
    let url_request = getHostAPI() + beanRequestAreaC.entity_api + "/" + beanRequestAreaC.operation;
    switch (beanRequestAreaC.operation) {
        default:
            parameters_pagination += "?nombre=" + document.querySelector("#txtFilterAreaC").value.toUpperCase();
            parameters_pagination += "&page=" + document.querySelector("#pageAreaC").value;
            parameters_pagination += "&size=" + document.querySelector("#sizePageAreaC").value;
            url_request += parameters_pagination;
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestAreaC.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoSelectedAreaC').modal("hide");
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationAreaC = beanCrudResponse.beanPagination;
            toListAreaC(beanPaginationAreaC);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoSelectedAreaC').modal("hide");
        showAlertErrorRequest();
    });
}

function toListAreaC(beanPagination) {
    document.querySelector("#tbodyAreaC").innerHTML = "";
    document.querySelector("#titleManagerAreaC").innerHTML = "[ " + beanPagination.count_filter + " ] ÁREAS";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(area => {
            row = "<tr class='click-selection-area sisbu-cursor-mano' idarea='" + area.idarea + "'>";
            row += "<td class='align-middle text-left'>" + area.nombre.toUpperCase() + "</td>";
            row += "</tr>";
            document.querySelector("#tbodyAreaC").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageAreaC").value),
                document.querySelector("#pageAreaC"),
                $('#modalCargandoSelectedAreaC'),
                $('#paginationAreaC'));
        addEventsAreaCes();
        if (beanRequestAreaC.operation == "paginate") {
            document.querySelector("#txtFilterAreaC").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationAreaC'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterAreaC").focus();
    }
}

function addEventsAreaCes() {
    document.querySelectorAll('.click-selection-area').forEach(function (element) {
        element.onclick = function () {
            if (this.classList.contains('row-selected-celeste-claro')) {
                this.classList.remove('row-selected-celeste-claro');
                areaCSelected = undefined;
            } else {
                areaCSelected = findByAreaC(this.getAttribute('idarea'));
                this.parentElement.childNodes.forEach(function (element) {
                    element.classList.remove('row-selected-celeste-claro');
                });
                this.classList.add('row-selected-celeste-claro');
            }
        };
    });

}

function findByAreaC(idarea) {
    let area_;
    beanPaginationAreaC.list.forEach(area => {
        if (parseInt(idarea) == parseInt(area.idarea)) {
            area_ = area;
            return;
        }
    });
    return area_;
}
