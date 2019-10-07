/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var beanPaginationDoctorC;
var doctorCSelected;

var beanRequestDoctorC = new BeanRequest();

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestDoctorC.entity_api = "api/personal";
    beanRequestDoctorC.operation = "paginate";
    beanRequestDoctorC.type_request = "GET";

    $('#FrmDoctorC').submit(function (event) {
        beanRequestDoctorC.operation = "paginate";
        beanRequestDoctorC.type_request = "GET";
        $('#modalCargandoSelectedDoctorC').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $("#modalCargandoSelectedDoctorC").on('shown.bs.modal', function () {
        processAjaxDoctorC();
    });

    $("#ventanaModalSelectedDoctorC").on('shown.bs.modal', function () {
        $("#modalCargandoSelectedDoctorC").modal('show');
    });

    $("#ventanaModalSelectedDoctorC").on('hidden.bs.modal', function () {
        beanRequestDoctorC.operation = "paginate";
        beanRequestDoctorC.type_request = "GET";
    });

    document.querySelector("#btnSeleccionarDoctor").onclick = function () {
        $('#ventanaModalSelectedDoctorC').modal('show');
    };

    document.querySelector("#btn-selecionar-doctorc").onclick = function () {
        if (doctorCSelected == undefined) {
            showAlertTopEnd('warning', 'Por favor seleccione un doctor');
            return;
        }
        doctorSelected = doctorCSelected;
        document.querySelector("#txtMedicoPaciente").value = doctorCSelected.nombre.toUpperCase();
        $('#ventanaModalSelectedDoctorC').modal('hide');
    };

    document.querySelector("#btnCancelSelectionDoctorC").onclick = function () {
        doctorCSelected = undefined;
        doctorSelected = doctorCSelected;
        document.querySelector("#txtMedicoPaciente").value = "";
    };

    $("#sizePageDoctorC").change(function () {
        $('#modalCargandoSelectedDoctorC').modal('show');
    });

});

function processAjaxDoctorC() {
    let parameters_pagination = "";
    let json = "";
    let url_request = getHostAPI() + beanRequestDoctorC.entity_api + "/" + beanRequestDoctorC.operation;
    switch (beanRequestDoctorC.operation) {
        default:
            parameters_pagination += "?filter=" + document.querySelector("#txtFilterDoctorC").value.toUpperCase();
            parameters_pagination += "&cargo=1&estado=1";
            parameters_pagination += "&page=" + document.querySelector("#pageDoctorC").value;
            parameters_pagination += "&size=" + document.querySelector("#sizePageDoctorC").value;
            url_request += parameters_pagination;
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestDoctorC.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoSelectedDoctorC').modal("hide");
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationDoctorC = beanCrudResponse.beanPagination;
            toListDoctorC(beanPaginationDoctorC);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoSelectedDoctorC').modal("hide");
        showAlertErrorRequest();
    });
}

function toListDoctorC(beanPagination) {
    document.querySelector("#tbodyDoctorC").innerHTML = "";
    document.querySelector("#titleManagerDoctorC").innerHTML = "[ " + beanPagination.count_filter + " ] MÉDICOS";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(doctor => {
            row = "<tr class='click-selection-doctor sisbu-cursor-mano' iddoctor='" + doctor.idpersonal + "'>";
            row += "<td class='align-middle text-left'>" + doctor.nombre.toUpperCase() + "</td>";
            row += "</tr>";
            document.querySelector("#tbodyDoctorC").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageDoctorC").value),
                document.querySelector("#pageDoctorC"),
                $('#modalCargandoSelectedDoctorC'),
                $('#paginationDoctorC'));
        addEventsDoctorCes();
        if (beanRequestDoctorC.operation == "paginate") {
            document.querySelector("#txtFilterDoctorC").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationDoctorC'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterDoctorC").focus();
    }
}

function addEventsDoctorCes() {
    document.querySelectorAll('.click-selection-doctor').forEach(function (element) {
        element.onclick = function () {
            if (this.classList.contains('row-selected-celeste-claro')) {
                this.classList.remove('row-selected-celeste-claro');
                doctorCSelected = undefined;
            } else {
                doctorCSelected = findByDoctorC(this.getAttribute('iddoctor'));
                this.parentElement.childNodes.forEach(function (element) {
                    element.classList.remove('row-selected-celeste-claro');
                });
                this.classList.add('row-selected-celeste-claro');
            }
        };
    });

}

function findByDoctorC(iddoctor) {
    let doctor_;
    beanPaginationDoctorC.list.forEach(doctor => {
        if (parseInt(iddoctor) == parseInt(doctor.idpersonal)) {
            doctor_ = doctor;
            return;
        }
    });
    return doctor_;
}
