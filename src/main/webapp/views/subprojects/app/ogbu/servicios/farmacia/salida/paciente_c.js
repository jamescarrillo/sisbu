/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var beanPaginationPacienteC;
var PacienteCSelected;

var beanRequestPacienteC = new BeanRequest();

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestPacienteC.entity_api = "api/atendido";
    beanRequestPacienteC.operation = "paginate";
    beanRequestPacienteC.type_request = "GET";

    $('#FrmPacienteC').submit(function (event) {
        beanRequestPacienteC.operation = "paginate";
        beanRequestPacienteC.type_request = "GET";
        $('#modalCargandoSelectedPacienteC').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $("#modalCargandoSelectedPacienteC").on('shown.bs.modal', function () {
        processAjaxPacienteC();
    });

    $("#ventanaModalSelectedPacienteC").on('shown.bs.modal', function () {
        $("#modalCargandoSelectedPacienteC").modal('show');
    });

    $("#ventanaModalSelectedPacienteC").on('hidden.bs.modal', function () {
        beanRequestPacienteC.operation = "paginate";
        beanRequestPacienteC.type_request = "GET";
    });

    document.querySelector("#btnSeleccionarPaciente").onclick = function () {
        $('#ventanaModalSelectedPacienteC').modal('show');
    };

    document.querySelector("#btn-selecionar-Pacientec").onclick = function () {
        if (PacienteCSelected == undefined) {
            showAlertTopEnd('warning', 'Por favor seleccione un Paciente');
            return;
        }
        PacienteSelected = PacienteCSelected;
        document.querySelector("#txtPacienteSalida").value = PacienteCSelected.nombre.toUpperCase();
        $('#ventanaModalSelectedPacienteC').modal('hide');
    };

    document.querySelector("#btnCancelSelectionPacienteC").onclick = function () {
        PacienteCSelected = undefined;
        PacienteSelected = PacienteCSelected;
        document.querySelector("#txtPacienteSalida").value = "";
    };

    $("#sizePagePacienteC").change(function () {
        $('#modalCargandoSelectedPacienteC').modal('show');
    });

});

function processAjaxPacienteC() {
    let parameters_pagination = "";
    let json = "";
    let url_request = getHostAPI() + beanRequestPacienteC.entity_api + "/" + beanRequestPacienteC.operation;
    switch (beanRequestPacienteC.operation) {
        default:
            parameters_pagination += "?filter=" + document.querySelector("#txtFilterPacienteC").value.toUpperCase();
            parameters_pagination += "&cargo=0&estado=-1&page=" + document.querySelector("#pagePacienteC").value;
            parameters_pagination += "&size=" + document.querySelector("#sizePagePacienteC").value;
            url_request += parameters_pagination;
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestPacienteC.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoSelectedPacienteC').modal("hide");
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationPacienteC = beanCrudResponse.beanPagination;
            toListPacienteC(beanPaginationPacienteC);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoSelectedPacienteC').modal("hide");
        showAlertErrorRequest();
    });
}

function toListPacienteC(beanPagination) {
    document.querySelector("#tbodyPacienteC").innerHTML = "";
    document.querySelector("#titleManagerPacienteC").innerHTML = "[ " + beanPagination.count_filter + " ] PACIENTE";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(Paciente => {
            row = "<tr class='click-selection-Paciente sisbu-cursor-mano' idatendido='" + Paciente.idatendido + "'>";
            row += "<td class='align-middle text-left'>" + Paciente.dni + "</td>";
            row += "<td class='align-middle text-left'>" + Paciente.apellido_pat.toUpperCase() + " " + Paciente.apellido_mat.toUpperCase() + " " + Paciente.nombre.toUpperCase() + "</td>";
            row += "<td class='align-middle text-left'>" + Paciente.escuela.nombre + "</td>";
            row += "</tr>";
            document.querySelector("#tbodyPacienteC").innerHTML += row;
        });
        buildPagination(
            beanPagination.count_filter,
            parseInt(document.querySelector("#sizePagePacienteC").value),
            document.querySelector("#pagePacienteC"),
            $('#modalCargandoSelectedPacienteC'),
            $('#paginationPacienteC'));
        addEventsPacienteCes();
        if (beanRequestPacienteC.operation == "paginate") {
            document.querySelector("#txtFilterPacienteC").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationPacienteC'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterPacienteC").focus();
    }
}

function addEventsPacienteCes() {
    document.querySelectorAll('.click-selection-Paciente').forEach(function (element) {
        element.onclick = function () {
            if (this.classList.contains('row-selected-celeste-claro')) {
                this.classList.remove('row-selected-celeste-claro');
                PacienteCSelected = undefined;
            } else {
                PacienteCSelected = findByPacienteC(this.getAttribute('idatendido'));
                this.parentElement.childNodes.forEach(function (element) {
                    element.classList.remove('row-selected-celeste-claro');
                });
                this.classList.add('row-selected-celeste-claro');
            }
        };
    });

}

function findByPacienteC(idatendido) {
    let Paciente_;
    beanPaginationPacienteC.list.forEach(Paciente => {
        if (parseInt(idatendido) == parseInt(Paciente.idatendido)) {
            Paciente_ = Paciente;
            return;
        }
    });
    return Paciente_;
}
