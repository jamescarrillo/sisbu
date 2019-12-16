/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var beanPaginationCicloAcademicoC;
var cicloAcademicoCSelected;

var beanRequestCicloAcademicoC = new BeanRequest();

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestCicloAcademicoC.entity_api = "api/ciclosacademicos";
    beanRequestCicloAcademicoC.operation = "paginate";
    beanRequestCicloAcademicoC.type_request = "GET";

    $('#FrmCicloAcademicoC').submit(function (event) {
        beanRequestCicloAcademicoC.operation = "paginate";
        beanRequestCicloAcademicoC.type_request = "GET";
        $('#modalCargandoSelectedCicloAcademicoC').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $("#modalCargandoSelectedCicloAcademicoC").on('shown.bs.modal', function () {
        processAjaxCicloAcademicoC();
    });

    $("#ventanaModalSelectedCicloAcademicoC").on('shown.bs.modal', function () {
        $("#modalCargandoSelectedCicloAcademicoC").modal('show');
    });

    $("#ventanaModalSelectedCicloAcademicoC").on('hidden.bs.modal', function () {
        beanRequestCicloAcademicoC.operation = "paginate";
        beanRequestCicloAcademicoC.type_request = "GET";
    });

    document.querySelector("#btnSeleccionarCicloAcademico").onclick = function () {
        $('#ventanaModalSelectedCicloAcademicoC').modal('show');
    };

    document.querySelector("#btn-selecionar-ciclo_academicoc").onclick = function () {
        if (cicloAcademicoCSelected == undefined) {
            showAlertTopEnd('warning', 'Por favor seleccione un escuela');
            return;
        }
        escuelaSelected = cicloAcademicoCSelected;
        document.querySelector("#txtCicloAcademicoPaciente").value = cicloAcademicoCSelected.nombre.toUpperCase();
        $('#ventanaModalSelectedCicloAcademicoC').modal('hide');
    };

    document.querySelector("#btnCancelSelectionCicloAcademicoC").onclick = function () {
        cicloAcademicoCSelected = undefined;
        escuelaSelected = cicloAcademicoCSelected;
        document.querySelector("#txtCicloAcademicoPaciente").value = "";
    };

    $("#sizePageCicloAcademicoC").change(function () {
        $('#modalCargandoSelectedCicloAcademicoC').modal('show');
    });

});

function processAjaxCicloAcademicoC() {
    let parameters_pagination = "";
    let json = "";
    let url_request = getHostAPI() + beanRequestCicloAcademicoC.entity_api + "/" + beanRequestCicloAcademicoC.operation;
    switch (beanRequestCicloAcademicoC.operation) {
        default:
            parameters_pagination += "?nombre=" + document.querySelector("#txtFilterCicloAcademicoC").value.toUpperCase();
            parameters_pagination += "&page=" + document.querySelector("#pageCicloAcademicoC").value;
            parameters_pagination += "&size=" + document.querySelector("#sizePageCicloAcademicoC").value;
            url_request += parameters_pagination;
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestCicloAcademicoC.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoSelectedCicloAcademicoC').modal("hide");
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationCicloAcademicoC = beanCrudResponse.beanPagination;
            toListCicloAcademicoC(beanPaginationCicloAcademicoC);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoSelectedCicloAcademicoC').modal("hide");
        showAlertErrorRequest();
    });
}

function toListCicloAcademicoC(beanPagination) {
    document.querySelector("#tbodyCicloAcademicoC").innerHTML = "";
    document.querySelector("#titleManagerCicloAcademicoC").innerHTML = "[ " + beanPagination.count_filter + " ] CICLOS ACADÉMICOS";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(escuela => {
            row = "<tr class='click-selection-escuela sisbu-cursor-mano' idescuela='" + escuela.idescuela + "'>";
            row += "<td class='align-middle text-left'>" + escuela.nombre.toUpperCase() + "</td>";
            row += "</tr>";
            document.querySelector("#tbodyCicloAcademicoC").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageCicloAcademicoC").value),
                document.querySelector("#pageCicloAcademicoC"),
                $('#modalCargandoSelectedCicloAcademicoC'),
                $('#paginationCicloAcademicoC'));
        addEventsCicloAcademicoCes();
        if (beanRequestCicloAcademicoC.operation == "paginate") {
            document.querySelector("#txtFilterCicloAcademicoC").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationCicloAcademicoC'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterCicloAcademicoC").focus();
    }
}

function addEventsCicloAcademicoCes() {
    document.querySelectorAll('.click-selection-escuela').forEach(function (element) {
        element.onclick = function () {
            if (this.classList.contains('row-selected-celeste-claro')) {
                this.classList.remove('row-selected-celeste-claro');
                cicloAcademicoCSelected = undefined;
            } else {
                cicloAcademicoCSelected = findByCicloAcademicoC(this.getAttribute('idescuela'));
                this.parentElement.childNodes.forEach(function (element) {
                    element.classList.remove('row-selected-celeste-claro');
                });
                this.classList.add('row-selected-celeste-claro');
            }
        };
    });

}

function findByCicloAcademicoC(idescuela) {
    let escuela_;
    beanPaginationCicloAcademicoC.list.forEach(escuela => {
        if (parseInt(idescuela) == parseInt(escuela.idescuela)) {
            escuela_ = escuela;
            return;
        }
    });
    return escuela_;
}
