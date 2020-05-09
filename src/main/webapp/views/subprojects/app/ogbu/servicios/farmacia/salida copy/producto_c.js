/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var beanPaginationPresentacionC;
var PresentacionCSelected;
var beanRequestPresentacionC = new BeanRequest();

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestPresentacionC.entity_api = "api/productos/presentacion";
    beanRequestPresentacionC.operation = "paginate";
    beanRequestPresentacionC.type_request = "GET";

    $('#FrmPresentacionC').submit(function (event) {
        beanRequestPresentacionC.operation = "paginate";
        beanRequestPresentacionC.type_request = "GET";
        $('#modalCargandoSelectedPresentacionC').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $("#modalCargandoSelectedPresentacionC").on('shown.bs.modal', function () {
        processAjaxPresentacionC();
    });

    $("#ventanaModalSelectedPresentacionC").on('shown.bs.modal', function () {
        $("#modalCargandoSelectedPresentacionC").modal('show');
    });

    $("#ventanaModalSelectedPresentacionC").on('hidden.bs.modal', function () {
        beanRequestPresentacionC.operation = "paginate";
        beanRequestPresentacionC.type_request = "GET";
    });

    document.querySelector("#btnSeleccionarPresentacion").onclick = function () {
        $('#ventanaModalSelectedPresentacionC').modal('show');
    };

    document.querySelector("#btn-selecionar-Presentacionc").onclick = function () {
        if (PresentacionCSelected == undefined) {
            showAlertTopEnd('warning', 'Por favor seleccione un Presentacion');
            return;
        }
        PresentacionSelected = PresentacionCSelected;
        document.querySelector("#txtPresentacionSalida").value = PresentacionCSelected.producto.nombre.toUpperCase();
        $('#ventanaModalSelectedPresentacionC').modal('hide');
    };

    document.querySelector("#btnCancelSelectionPresentacionC").onclick = function () {
        PresentacionCSelected = undefined;
        PresentacionSelected = PresentacionCSelected;
        document.querySelector("#txtPresentacionSalida").value = "";
    };

    $("#sizePagePresentacionC").change(function () {
        $('#modalCargandoSelectedPresentacionC').modal('show');
    });

});

function processAjaxPresentacionC() {
    let parameters_pagination = "";
    let json = "";
    let url_request = getHostAPI() + beanRequestPresentacionC.entity_api + "/" + beanRequestPresentacionC.operation;
    switch (beanRequestPresentacionC.operation) {
        default:
            parameters_pagination += "?nombre=" + document.querySelector("#txtFilterPresentacionC").value.toUpperCase();
            parameters_pagination += "&page=" + document.querySelector("#pagePresentacionC").value;
            parameters_pagination += "&size=" + document.querySelector("#sizePagePresentacionC").value;
            url_request += parameters_pagination;
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestPresentacionC.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoSelectedPresentacionC').modal("hide");
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationPresentacionC = beanCrudResponse.beanPagination;
            toListPresentacionC(beanPaginationPresentacionC);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoSelectedPresentacionC').modal("hide");
        showAlertErrorRequest();
    });
}

function toListPresentacionC(beanPagination) {
    document.querySelector("#tbodyPresentacionC").innerHTML = "";
    document.querySelector("#titleManagerPresentacionC").innerHTML = "[ " + beanPagination.count_filter + " ] Presentacion";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(Presentacion => {
            row = "<tr class='click-selection-Presentacion sisbu-cursor-mano' idpresentacion='" + Presentacion.idpresentacion + "'>";
            row += "<td class='align-middle text-left'>" + Presentacion.fecha_vencimiento + "</td>";
            row += "<td class='align-middle text-left'>" + Presentacion.producto.nombre.toUpperCase() + "</td>";
            row += "<td class='align-middle text-left'>" + Presentacion.existencia + "</td>";
            row += "</tr>";
            document.querySelector("#tbodyPresentacionC").innerHTML += row;
        });
        buildPagination(
            beanPagination.count_filter,
            parseInt(document.querySelector("#sizePagePresentacionC").value),
            document.querySelector("#pagePresentacionC"),
            $('#modalCargandoSelectedPresentacionC'),
            $('#paginationPresentacionC'));
        addEventsPresentacionCes();
        if (beanRequestPresentacionC.operation == "paginate") {
            document.querySelector("#txtFilterPresentacionC").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationPresentacionC'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterPresentacionC").focus();
    }
}

function addEventsPresentacionCes() {
    document.querySelectorAll('.click-selection-Presentacion').forEach(function (element) {
        element.onclick = function () {
            if (this.classList.contains('row-selected-celeste-claro')) {
                this.classList.remove('row-selected-celeste-claro');
                PresentacionCSelected = undefined;
            } else {
                PresentacionCSelected = findByPresentacionC(this.getAttribute('idpresentacion'));
                this.parentElement.childNodes.forEach(function (element) {
                    element.classList.remove('row-selected-celeste-claro');
                });
                this.classList.add('row-selected-celeste-claro');
            }
        };
    });

}

function findByPresentacionC(idpresentacion) {
    let Presentacion_;
    beanPaginationPresentacionC.list.forEach(Presentacion => {
        if (parseInt(idpresentacion) == parseInt(Presentacion.idpresentacion)) {
            Presentacion_ = Presentacion;
            return;
        }
    });
    return Presentacion_;
}
