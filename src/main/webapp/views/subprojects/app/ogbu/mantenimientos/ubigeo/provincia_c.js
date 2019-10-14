/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var beanPaginationProvinciaC;
var provinciaCSelected;

var beanRequestProvinciaC = new BeanRequest();

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestProvinciaC.entity_api = "api/provincias";
    beanRequestProvinciaC.operation = "paginate";
    beanRequestProvinciaC.type_request = "GET";

    $('#FrmProvinciaC').submit(function (event) {
        beanRequestProvinciaC.operation = "paginate";
        beanRequestProvinciaC.type_request = "GET";
        $('#modalCargandoSelectedProvinciaC').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $("#modalCargandoSelectedProvinciaC").on('shown.bs.modal', function () {
        processAjaxProvinciaC();
    });

    $("#ventanaModalSelectedProvinciaC").on('shown.bs.modal', function () {
        $("#modalCargandoSelectedProvinciaC").modal('show');
    });

    $("#ventanaModalSelectedProvinciaC").on('hidden.bs.modal', function () {
        beanRequestProvinciaC.operation = "paginate";
        beanRequestProvinciaC.type_request = "GET";
    });

    document.querySelector("#btnSeleccionarProvincia").onclick = function () {
        $('#ventanaModalSelectedProvinciaC').modal('show');
    };

    document.querySelector("#btn-selecionar-provinciac").onclick = function () {
        if (provinciaCSelected == undefined) {
            showAlertTopEnd('warning', 'Por favor seleccione un provincia');
            return;
        }
        provinciaSelected = provinciaCSelected;
        document.querySelector("#txtProvinciaDistrito").value = provinciaCSelected.nombre.toUpperCase();
        $('#ventanaModalSelectedProvinciaC').modal('hide');
    };

    document.querySelector("#btnCancelSelectionProvinciaC").onclick = function () {
        provinciaCSelected = undefined;
        provinciaSelected = provinciaCSelected;
        document.querySelector("#txtProvinciaDistrito").value = "";
    };

    $("#sizePageProvinciaC").change(function () {
        $('#modalCargandoSelectedProvinciaC').modal('show');
    });

});

function processAjaxProvinciaC() {
    let parameters_pagination = "";
    let json = "";
    let url_request = getHostAPI() + beanRequestProvinciaC.entity_api + "/" + beanRequestProvinciaC.operation;
    switch (beanRequestProvinciaC.operation) {
        default:
            parameters_pagination += "?nombre=" + document.querySelector("#txtFilterProvinciaC").value.toUpperCase();
            parameters_pagination += "&page=" + document.querySelector("#pageProvinciaC").value;
            parameters_pagination += "&size=" + document.querySelector("#sizePageProvinciaC").value;
            url_request += parameters_pagination;
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestProvinciaC.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoSelectedProvinciaC').modal("hide");
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationProvinciaC = beanCrudResponse.beanPagination;
            toListProvinciaC(beanPaginationProvinciaC);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoSelectedProvinciaC').modal("hide");
        showAlertErrorRequest();
    });
}

function toListProvinciaC(beanPagination) {
    document.querySelector("#tbodyProvinciaC").innerHTML = "";
    document.querySelector("#titleManagerProvinciaC").innerHTML = "[ " + beanPagination.count_filter + " ] PROVINCIAS";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(provincia => {
            row = "<tr class='click-selection-provincia sisbu-cursor-mano' idprovincia='" + provincia.idprovincia + "'>";
            row += "<td class='align-middle text-left'>" + provincia.nombre.toUpperCase() + "</td>";
            row += "</tr>";
            document.querySelector("#tbodyProvinciaC").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageProvinciaC").value),
                document.querySelector("#pageProvinciaC"),
                $('#modalCargandoSelectedProvinciaC'),
                $('#paginationProvinciaC'));
        addEventsProvinciaCes();
        if (beanRequestProvinciaC.operation == "paginate") {
            document.querySelector("#txtFilterProvinciaC").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationProvinciaC'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterProvinciaC").focus();
    }
}

function addEventsProvinciaCes() {
    document.querySelectorAll('.click-selection-provincia').forEach(function (element) {
        element.onclick = function () {
            console.log("cloikeaste");
            if (this.classList.contains('row-selected-celeste-claro')) {
                this.classList.remove('row-selected-celeste-claro');
                provinciaCSelected = undefined;
            } else {
                provinciaCSelected = findByProvinciaC(this.getAttribute('idprovincia'));
                this.parentElement.childNodes.forEach(function (element) {
                    element.classList.remove('row-selected-celeste-claro');
                });
                this.classList.add('row-selected-celeste-claro');
            }
        };
    });

}

function findByProvinciaC(idprovincia) {
    let provincia_;
    beanPaginationProvinciaC.list.forEach(provincia => {
        if (parseInt(idprovincia) == parseInt(provincia.idprovincia)) {
            provincia_ = provincia;
            return;
        }
    });
    return provincia_;
}
