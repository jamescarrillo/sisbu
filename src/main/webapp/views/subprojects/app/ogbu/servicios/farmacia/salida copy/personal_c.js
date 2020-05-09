/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var beanPaginationPersonalC;
var PersonalCSelected;

var beanRequestPersonalC = new BeanRequest();

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestPersonalC.entity_api = "api/personal";
    beanRequestPersonalC.operation = "paginate";
    beanRequestPersonalC.type_request = "GET";

    $('#FrmPersonalC').submit(function (event) {
        beanRequestPersonalC.operation = "paginate";
        beanRequestPersonalC.type_request = "GET";
        $('#modalCargandoSelectedPersonalC').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $("#modalCargandoSelectedPersonalC").on('shown.bs.modal', function () {
        processAjaxPersonalC();
    });

    $("#ventanaModalSelectedPersonalC").on('shown.bs.modal', function () {
        $("#modalCargandoSelectedPersonalC").modal('show');
    });

    $("#ventanaModalSelectedPersonalC").on('hidden.bs.modal', function () {
        beanRequestPersonalC.operation = "paginate";
        beanRequestPersonalC.type_request = "GET";
    });

    document.querySelector("#btnSeleccionarPersonal").onclick = function () {
        $('#ventanaModalSelectedPersonalC').modal('show');
    };

    document.querySelector("#btn-selecionar-Personalc").onclick = function () {
        if (PersonalCSelected == undefined) {
            showAlertTopEnd('warning', 'Por favor seleccione un Personal');
            return;
        }
        PersonalSelected = PersonalCSelected;
        document.querySelector("#txtPersonalSalida").value = PersonalCSelected.nombre.toUpperCase();
        $('#ventanaModalSelectedPersonalC').modal('hide');
    };

    document.querySelector("#btnCancelSelectionPersonalC").onclick = function () {
        PersonalCSelected = undefined;
        PersonalSelected = PersonalCSelected;
        document.querySelector("#txtPersonalSalida").value = "";
    };

    $("#sizePagePersonalC").change(function () {
        $('#modalCargandoSelectedPersonalC').modal('show');
    });

});

function processAjaxPersonalC() {
    let parameters_pagination = "";
    let json = "";
    let url_request = getHostAPI() + beanRequestPersonalC.entity_api + "/" + beanRequestPersonalC.operation;
    switch (beanRequestPersonalC.operation) {
        default:
            parameters_pagination += "?filter=" + document.querySelector("#txtFilterPersonalC").value.toUpperCase();
            parameters_pagination += "&cargo=0&estado=-1&page=" + document.querySelector("#pagePersonalC").value;
            parameters_pagination += "&size=" + document.querySelector("#sizePagePersonalC").value;
            url_request += parameters_pagination;
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestPersonalC.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoSelectedPersonalC').modal("hide");
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationPersonalC = beanCrudResponse.beanPagination;
            toListPersonalC(beanPaginationPersonalC);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoSelectedPersonalC').modal("hide");
        showAlertErrorRequest();
    });
}

function toListPersonalC(beanPagination) {
    document.querySelector("#tbodyPersonalC").innerHTML = "";
    document.querySelector("#titleManagerPersonalC").innerHTML = "[ " + beanPagination.count_filter + " ] PERSONAL";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(Personal => {
            row = "<tr class='click-selection-Personal sisbu-cursor-mano' idpersonal='" + Personal.idpersonal + "'>";
            row += "<td class='align-middle text-left'>" + Personal.nombre.toUpperCase() + "</td>";
            row += "</tr>";
            document.querySelector("#tbodyPersonalC").innerHTML += row;
        });
        buildPagination(
            beanPagination.count_filter,
            parseInt(document.querySelector("#sizePagePersonalC").value),
            document.querySelector("#pagePersonalC"),
            $('#modalCargandoSelectedPersonalC'),
            $('#paginationPersonalC'));
        addEventsPersonalCes();
        if (beanRequestPersonalC.operation == "paginate") {
            document.querySelector("#txtFilterPersonalC").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationPersonalC'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterPersonalC").focus();
    }
}

function addEventsPersonalCes() {
    document.querySelectorAll('.click-selection-Personal').forEach(function (element) {
        element.onclick = function () {
            if (this.classList.contains('row-selected-celeste-claro')) {
                this.classList.remove('row-selected-celeste-claro');
                PersonalCSelected = undefined;
            } else {
                PersonalCSelected = findByPersonalC(this.getAttribute('idpersonal'));
                this.parentElement.childNodes.forEach(function (element) {
                    element.classList.remove('row-selected-celeste-claro');
                });
                this.classList.add('row-selected-celeste-claro');
            }
        };
    });

}

function findByPersonalC(idpersonal) {
    let Personal_;
    beanPaginationPersonalC.list.forEach(Personal => {
        if (parseInt(idpersonal) == parseInt(Personal.idpersonal)) {
            Personal_ = Personal;
            return;
        }
    });
    return Personal_;
}
