/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var beanPaginationDepartamentoC;
var departamentoCSelected;

var beanRequestDepartamentoC = new BeanRequest();

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestDepartamentoC.entity_api = "api/departamentos";
    beanRequestDepartamentoC.operation = "paginate";
    beanRequestDepartamentoC.type_request = "GET";

    $('#FrmDepartamentoC').submit(function (event) {
        beanRequestDepartamentoC.operation = "paginate";
        beanRequestDepartamentoC.type_request = "GET";
        $('#modalCargandoSelectedDepartamentoC').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $("#modalCargandoSelectedDepartamentoC").on('shown.bs.modal', function () {
        processAjaxDepartamentoC();
    });

    $("#ventanaModalSelectedDepartamentoC").on('shown.bs.modal', function () {
        $("#modalCargandoSelectedDepartamentoC").modal('show');
    });

    $("#ventanaModalSelectedDepartamentoC").on('hidden.bs.modal', function () {
        beanRequestDepartamentoC.operation = "paginate";
        beanRequestDepartamentoC.type_request = "GET";
    });

    document.querySelector("#btnSeleccionarDepartamento").onclick = function () {
        $('#ventanaModalSelectedDepartamentoC').modal('show');
    };

    document.querySelector("#btn-selecionar-departamentoc").onclick = function () {
        if (departamentoCSelected == undefined) {
            showAlertTopEnd('warning', 'Por favor seleccione un departamento');
            return;
        }
        departamentoSelected = departamentoCSelected;
        document.querySelector("#txtDepartamentoProvincia").value = departamentoCSelected.nombre.toUpperCase();
        $('#ventanaModalSelectedDepartamentoC').modal('hide');
    };

    document.querySelector("#btnCancelSelectionDepartamentoC").onclick = function () {
        departamentoCSelected = undefined;
        departamentoSelected = departamentoCSelected;
        document.querySelector("#txtDepartamentoProvincia").value = "";
    };

    $("#sizePageDepartamentoC").change(function () {
        $('#modalCargandoSelectedDepartamentoC').modal('show');
    });

});

function processAjaxDepartamentoC() {
    let parameters_pagination = "";
    let json = "";
    let url_request = getHostAPI() + beanRequestDepartamentoC.entity_api + "/" + beanRequestDepartamentoC.operation;
    switch (beanRequestDepartamentoC.operation) {
        default:
            parameters_pagination += "?nombre=" + document.querySelector("#txtFilterDepartamentoC").value.toUpperCase();
            parameters_pagination += "&page=" + document.querySelector("#pageDepartamentoC").value;
            parameters_pagination += "&size=" + document.querySelector("#sizePageDepartamentoC").value;
            url_request += parameters_pagination;
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestDepartamentoC.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoSelectedDepartamentoC').modal("hide");
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationDepartamentoC = beanCrudResponse.beanPagination;
            toListDepartamentoC(beanPaginationDepartamentoC);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoSelectedDepartamentoC').modal("hide");
        showAlertErrorRequest();
    });
}

function toListDepartamentoC(beanPagination) {
    document.querySelector("#tbodyDepartamentoC").innerHTML = "";
    document.querySelector("#titleManagerDepartamentoC").innerHTML = "[ " + beanPagination.count_filter + " ] DEPARTAMENTOS";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(departamento => {
            row = "<tr class='click-selection-departamento sisbu-cursor-mano' iddepartamento='" + departamento.iddepartamento + "'>";
            row += "<td class='align-middle text-left'>" + departamento.nombre.toUpperCase() + "</td>";
            row += "</tr>";
            document.querySelector("#tbodyDepartamentoC").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageDepartamentoC").value),
                document.querySelector("#pageDepartamentoC"),
                $('#modalCargandoSelectedDepartamentoC'),
                $('#paginationDepartamentoC'));
        addEventsDepartamentoCes();
        if (beanRequestDepartamentoC.operation == "paginate") {
            document.querySelector("#txtFilterDepartamentoC").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationDepartamentoC'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterDepartamentoC").focus();
    }
}

function addEventsDepartamentoCes() {
    document.querySelectorAll('.click-selection-departamento').forEach(function (element) {
        element.onclick = function () {
            console.log("cloikeaste");
            if (this.classList.contains('row-selected-celeste-claro')) {
                this.classList.remove('row-selected-celeste-claro');
                departamentoCSelected = undefined;
            } else {
                departamentoCSelected = findByDepartamentoC(this.getAttribute('iddepartamento'));
                this.parentElement.childNodes.forEach(function (element) {
                    element.classList.remove('row-selected-celeste-claro');
                });
                this.classList.add('row-selected-celeste-claro');
            }
        };
    });

}

function findByDepartamentoC(iddepartamento) {
    let departamento_;
    beanPaginationDepartamentoC.list.forEach(departamento => {
        if (parseInt(iddepartamento) == parseInt(departamento.iddepartamento)) {
            departamento_ = departamento;
            return;
        }
    });
    return departamento_;
}
