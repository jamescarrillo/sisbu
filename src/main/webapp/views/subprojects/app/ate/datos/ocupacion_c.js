/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var beanPaginationOcupacionC;
var ocupacionCSelected;

var beanRequestOcupacionC = new BeanRequest();

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestOcupacionC.entity_api = "api/ocupaciones";
    beanRequestOcupacionC.operation = "paginate";
    beanRequestOcupacionC.type_request = "GET";

    $('#FrmOcupacionC').submit(function (event) {
        beanRequestOcupacionC.operation = "paginate";
        beanRequestOcupacionC.type_request = "GET";
        $('#modalCargandoSelectedOcupacionC').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $("#modalCargandoSelectedOcupacionC").on('shown.bs.modal', function () {
        processAjaxOcupacionC();
    });

    $("#ventanaModalSelectedOcupacionC").on('shown.bs.modal', function () {
        $("#modalCargandoSelectedOcupacionC").modal('show');
    });

    $("#ventanaModalSelectedOcupacionC").on('hidden.bs.modal', function () {
        beanRequestOcupacionC.operation = "paginate";
        beanRequestOcupacionC.type_request = "GET";
    });

    document.querySelector("#btnSeleccionarOcupacion").onclick = function () {
        $('#ventanaModalSelectedOcupacionC').modal('show');
    };

    document.querySelector("#btn-selecionar-ocupacionc").onclick = function () {
        if (ocupacionCSelected == undefined) {
            showAlertTopEnd('warning', 'Por favor seleccione un ocupacion');
            return;
        }
        ocupacionSelected = ocupacionCSelected;
        document.querySelector("#txtOcupacionFamiliarPaciente").value = ocupacionCSelected.nombre.toUpperCase();
        $('#ventanaModalSelectedOcupacionC').modal('hide');
    };

    document.querySelector("#btnCancelSelectionOcupacionC").onclick = function () {
        ocupacionCSelected = undefined;
        ocupacionSelected = ocupacionCSelected;
        document.querySelector("#txtOcupacionFamiliarPaciente").value = "";
    };

    $("#sizePageOcupacionC").change(function () {
        $('#modalCargandoSelectedOcupacionC').modal('show');
    });

});

function processAjaxOcupacionC() {
    let parameters_pagination = "";
    let json = "";
    let url_request = getHostAPI() + beanRequestOcupacionC.entity_api + "/" + beanRequestOcupacionC.operation;
    switch (beanRequestOcupacionC.operation) {
        default:
            parameters_pagination += "?nombre=" + document.querySelector("#txtFilterOcupacionC").value.toUpperCase();
            parameters_pagination += "&page=" + document.querySelector("#pageOcupacionC").value;
            parameters_pagination += "&size=" + document.querySelector("#sizePageOcupacionC").value;
            url_request += parameters_pagination;
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestOcupacionC.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoSelectedOcupacionC').modal("hide");
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationOcupacionC = beanCrudResponse.beanPagination;
            toListOcupacionC(beanPaginationOcupacionC);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoSelectedOcupacionC').modal("hide");
        showAlertErrorRequest();
    });
}

function toListOcupacionC(beanPagination) {
    document.querySelector("#tbodyOcupacionC").innerHTML = "";
    document.querySelector("#titleManagerOcupacionC").innerHTML = "[ " + beanPagination.count_filter + " ] OCUPACIONES";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(ocupacion => {
            row = "<tr class='click-selection-ocupacion sisbu-cursor-mano' idocupacion='" + ocupacion.idocupacion + "'>";
            row += "<td class='align-middle text-left'>" + ocupacion.nombre.toUpperCase() + "</td>";
            row += "</tr>";
            document.querySelector("#tbodyOcupacionC").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageOcupacionC").value),
                document.querySelector("#pageOcupacionC"),
                $('#modalCargandoSelectedOcupacionC'),
                $('#paginationOcupacionC'));
        addEventsOcupacionCes();
        if (beanRequestOcupacionC.operation == "paginate") {
            document.querySelector("#txtFilterOcupacionC").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationOcupacionC'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterOcupacionC").focus();
    }
}

function addEventsOcupacionCes() {
    document.querySelectorAll('.click-selection-ocupacion').forEach(function (element) {
        element.onclick = function () {
            if (this.classList.contains('row-selected-celeste-claro')) {
                this.classList.remove('row-selected-celeste-claro');
                ocupacionCSelected = undefined;
            } else {
                ocupacionCSelected = findByOcupacionC(this.getAttribute('idocupacion'));
                this.parentElement.childNodes.forEach(function (element) {
                    element.classList.remove('row-selected-celeste-claro');
                });
                this.classList.add('row-selected-celeste-claro');
            }
        };
    });

}

function findByOcupacionC(idocupacion) {
    let ocupacion_;
    beanPaginationOcupacionC.list.forEach(ocupacion => {
        if (parseInt(idocupacion) == parseInt(ocupacion.idocupacion)) {
            ocupacion_ = ocupacion;
            return;
        }
    });
    return ocupacion_;
}
