/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var beanPaginationCicloC;
var cicloCSelected;

var beanRequestCicloC = new BeanRequest();

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestCicloC.entity_api = "api/ciclosacademicos";
    beanRequestCicloC.operation = "paginate";
    beanRequestCicloC.type_request = "GET";

    $('#FrmCicloC').submit(function (event) {
        beanRequestCicloC.operation = "paginate";
        beanRequestCicloC.type_request = "GET";
        $('#modalCargandoSelectedCicloC').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $("#modalCargandoSelectedCicloC").on('shown.bs.modal', function () {
        processAjaxCicloC();
    });

    $("#ventanaModalSelectedCicloC").on('shown.bs.modal', function () {
        $("#modalCargandoSelectedCicloC").modal('show');
    });

    $("#ventanaModalSelectedCicloC").on('hidden.bs.modal', function () {
        beanRequestCicloC.operation = "paginate";
        beanRequestCicloC.type_request = "GET";
    });

    document.querySelector("#btnSeleccionarCiclo").onclick = function () {
        $('#ventanaModalSelectedCicloC').modal('show');
    };

    document.querySelector("#btn-selecionar-cicloc").onclick = function () {
        if (cicloCSelected == undefined) {
            showAlertTopEnd('warning', 'Por favor seleccione un ciclo');
            return;
        }
        cicloSelected = cicloCSelected;
        document.querySelector("#txtCicloAlumno").value = cicloCSelected.nombre.toUpperCase();
        $('#ventanaModalSelectedCicloC').modal('hide');
    };

    document.querySelector("#btnCancelSelectionCicloC").onclick = function () {
        cicloCSelected = undefined;
        cicloSelected = cicloCSelected;
        document.querySelector("#txtCicloAlumno").value = "";
    };

    $("#sizePageCicloC").change(function () {
        $('#modalCargandoSelectedCicloC').modal('show');
    });

});

function processAjaxCicloC() {
    let parameters_pagination = "";
    let json = "";
    let url_request = getHostAPI() + beanRequestCicloC.entity_api + "/" + beanRequestCicloC.operation;
    switch (beanRequestCicloC.operation) {
        default:
            parameters_pagination += "?nombre=" + document.querySelector("#txtFilterCicloC").value.toUpperCase();
            parameters_pagination += "&page=" + document.querySelector("#pageCicloC").value;
            parameters_pagination += "&size=" + document.querySelector("#sizePageCicloC").value;
            url_request += parameters_pagination;
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestCicloC.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoSelectedCicloC').modal("hide");
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationCicloC = beanCrudResponse.beanPagination;
            toListCicloC(beanPaginationCicloC);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoSelectedCicloC').modal("hide");
        showAlertErrorRequest();
    });
}

function toListCicloC(beanPagination) {
    document.querySelector("#tbodyCicloC").innerHTML = "";
    document.querySelector("#titleManagerCicloC").innerHTML = "[ " + beanPagination.count_filter + " ] CICLOS ACADÉMICOS";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(ciclo => {
            row = "<tr class='click-selection-ciclo sisbu-cursor-mano' idciclo='" + ciclo.idciclo_academico + "'>";
            row += "<td class='align-middle text-left'>" + ciclo.nombre.toUpperCase() + "</td>";
            row += "</tr>";
            document.querySelector("#tbodyCicloC").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageCicloC").value),
                document.querySelector("#pageCicloC"),
                $('#modalCargandoSelectedCicloC'),
                $('#paginationCicloC'));
        addEventsCicloCes();
        if (beanRequestCicloC.operation == "paginate") {
            document.querySelector("#txtFilterCicloC").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationCicloC'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterCicloC").focus();
    }
}

function addEventsCicloCes() {
    document.querySelectorAll('.click-selection-ciclo').forEach(function (element) {
        element.onclick = function () {
            if (this.classList.contains('row-selected-celeste-claro')) {
                this.classList.remove('row-selected-celeste-claro');
                cicloCSelected = undefined;
            } else {
                cicloCSelected = findByCicloC(this.getAttribute('idciclo'));
                this.parentElement.childNodes.forEach(function (element) {
                    element.classList.remove('row-selected-celeste-claro');
                });
                this.classList.add('row-selected-celeste-claro');
            }
        };
    });

}

function findByCicloC(idciclo) {
    let ciclo_;
    beanPaginationCicloC.list.forEach(ciclo => {
        if (parseInt(idciclo) == parseInt(ciclo.idciclo_academico)) {
            ciclo_ = ciclo;
            return;
        }
    });
    return ciclo_;
}
