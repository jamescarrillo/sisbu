/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var beanPaginationPersonal;
var personalSelected;

var beanRequestPersonal = new BeanRequest();

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestPersonal.entity_api = "api/personal";
    beanRequestPersonal.operation = "paginate";
    beanRequestPersonal.type_request = "GET";

    $('#FrmPersonal').submit(function (event) {
        beanRequestPersonal.operation = "paginate";
        beanRequestPersonal.type_request = "GET";
        $('#modalCargandoSelectedPersonal').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $("#modalCargandoSelectedPersonal").on('shown.bs.modal', function () {
        processAjaxPersonal();
    });

    $("#ventanaModalSelectedPersonal").on('shown.bs.modal', function () {
        $("#modalCargandoSelectedPersonal").modal('show');
    });

    $("#ventanaModalSelectedPersonal").on('hidden.bs.modal', function () {
        beanRequestPersonal.operation = "paginate";
        beanRequestPersonal.type_request = "GET";
    });

    document.querySelector("#btnSeleccionarPersonal").onclick = function () {
        $('#ventanaModalSelectedPersonal').modal('show');
    };

    document.querySelector("#btn-selecionar-personal").onclick = function () {
        if (personalSelected == undefined) {
            showAlertTopEnd('warning', 'Por favor seleccione el personal correctamente');
            return;
        }
        document.querySelector("#txtPersonalEncargadoCita").value = personalSelected.nombre.toUpperCase() + " " + personalSelected.apellido_pat.toUpperCase() + " " + personalSelected.apellido_mat.toUpperCase();
        $('#ventanaModalSelectedPersonal').modal('hide');
    };

    document.querySelector("#btnCancelSelectionPersonal").onclick = function () {
        personalSelected = undefined;
        document.querySelector("#txtPersonalEncargadoCita").value = "";
    };

    $("#sizePagePersonal").change(function () {
        $('#modalCargandoSelectedPersonal').modal('show');
    });

    document.querySelector("#btnDownloadCitas").onclick = function () {
        if (personalSelected == undefined) {
            showAlertTopEnd('warning', 'Por favor seleccione un personal');
            return;
        }
        if (document.querySelector("#txtFechaIFilterCita").value == "") {
            showAlertTopEnd('warning', 'Por favor ingrese el parámetro desde');
            return;
        }
        if (document.querySelector("#txtFechaFFilterCita").value == "") {
            showAlertTopEnd('warning', 'Por favor ingrese el parámetro hasta');
            return;
        }
        let parameters = {
            "idpersonal": personalSelected.idpersonal,
            "dni": personalSelected.dni,
            "fechai": document.querySelector("#txtFechaIFilterCita").value,
            "fechaf": document.querySelector("#txtFechaFFilterCita").value,
            "name_area": personalSelected.area.nombre
        }
        let url_request = getHostAndContextAPI() + "reports/citas/personal";
        url_request += "?" + new URLSearchParams(parameters).toString();
        window.open(
                url_request,
                '_blank' // <- This is what makes it open in a new window.
                );
        console.log("Parametros de reporte success");
    }

});

function processAjaxPersonal() {
    let parameters_pagination = "";
    let json = "";
    let url_request = getHostAPI() + beanRequestPersonal.entity_api + "/" + beanRequestPersonal.operation;
    switch (beanRequestPersonal.operation) {
        default:
            parameters_pagination += "?filter=" + document.querySelector("#txtFilterPersonal").value.toUpperCase();
            parameters_pagination += "&cargo=" + getIdCargoByArea(getIdAreaUserSession()) + "&estado=1";
            parameters_pagination += "&page=" + document.querySelector("#pagePersonal").value;
            parameters_pagination += "&size=" + document.querySelector("#sizePagePersonal").value;
            url_request += parameters_pagination;
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestPersonal.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoSelectedPersonal').modal("hide");
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationPersonal = beanCrudResponse.beanPagination;
            toListPersonal(beanPaginationPersonal);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoSelectedPersonal').modal("hide");
        showAlertErrorRequest();
    });
}

function toListPersonal(beanPagination) {
    document.querySelector("#tbodyPersonal").innerHTML = "";
    document.querySelector("#titleManagerPersonal").innerHTML = "[ " + beanPagination.count_filter + " ] PERSONAL";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(personal => {
            row = "<tr class='click-selection-personal sisbu-cursor-mano' idpersonal='" + personal.idpersonal + "'>";
            row += "<td class='align-middle text-left'>" + personal.nombre.toUpperCase() + " " + personal.apellido_pat.toUpperCase() + " " + personal.apellido_mat.toUpperCase() + "</td>";
            row += "</tr>";
            document.querySelector("#tbodyPersonal").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePagePersonal").value),
                document.querySelector("#pagePersonal"),
                $('#modalCargandoSelectedPersonal'),
                $('#paginationPersonal'));
        addEventsPersonales();
        if (beanRequestPersonal.operation == "paginate") {
            document.querySelector("#txtFilterPersonal").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationPersonal'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterPersonal").focus();
    }
}

function addEventsPersonales() {
    document.querySelectorAll('.click-selection-personal').forEach(function (element) {
        element.onclick = function () {
            if (this.classList.contains('row-selected-celeste-claro')) {
                this.classList.remove('row-selected-celeste-claro');
                personalSelected = undefined;
            } else {
                personalSelected = findByPersonal(this.getAttribute('idpersonal'));
                this.parentElement.childNodes.forEach(function (element) {
                    element.classList.remove('row-selected-celeste-claro');
                });
                this.classList.add('row-selected-celeste-claro');
            }
        };
    });

}

function findByPersonal(idpersonal) {
    let personal_;
    beanPaginationPersonal.list.forEach(personal => {
        if (parseInt(idpersonal) == parseInt(personal.idpersonal)) {
            personal_ = personal;
            return;
        }
    });
    return personal_;
}

function getIdCargoByArea(idarea) {
    let idcargo = -1;
    switch (parseInt(idarea)) {
        case 1:
            idcargo = 1;
            break;
        case 2:
            idcargo = 2;
            break;
        case 3:
            idcargo = 4;
            break;
        case 4:
            idcargo = 6;
            break;
        case 6:
            idcargo = 8;
    }
    return idcargo;
}