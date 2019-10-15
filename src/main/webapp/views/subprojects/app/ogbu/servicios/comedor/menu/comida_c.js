/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var beanPaginationComidac;
var comidacSelected;

var beanRequestComidac = new BeanRequest();

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestComidac.entity_api = "api/comidas";
    beanRequestComidac.operation = "paginate";
    beanRequestComidac.type_request = "GET";

    $('#FrmComidac').submit(function (event) {
        beanRequestComidac.operation = "paginate";
        beanRequestComidac.type_request = "GET";
        $('#modalCargandoSelectedComidac').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $("#modalCargandoSelectedComidac").on('shown.bs.modal', function () {
        processAjaxComidac();
    });

    $("#ventanaModalSelectedComidac").on('shown.bs.modal', function () {
        $("#modalCargandoSelectedComidac").modal('show');
    });

    $("#ventanaModalSelectedComidac").on('hidden.bs.modal', function () {
        beanRequestComidac.operation = "paginate";
        beanRequestComidac.type_request = "GET";
    });

    document.querySelector("#btnSeleccionarComida").onclick = function () {
        
        $('#ventanaModalSelectedComidac').modal('show');
    };

    document.querySelector("#btn-selecionar-comidac").onclick = function () {
        if (comidacSelected == undefined) {
            showAlertTopEnd('warning', 'Por favor seleccione un comida');
            return;
        }
        comidaSelected = comidacSelected;
        switch (tipoDiaComida) {
            case 0:
                document.querySelector("#txtComidaDetalle").value = comidaSelected.descripcion.toUpperCase();
                break;
            case 1:
                document.querySelector("#txtComidaAlmuerzoDetalle").value = comidaSelected.descripcion.toUpperCase();
                break;
            case 2:
                document.querySelector("#txtComidaCenaDetalle").value = comidaSelected.descripcion.toUpperCase();
                break;

            default:

                break;
        }

        $('#ventanaModalSelectedComidac').modal('hide');
    };

    document.querySelector("#btnCancelSelectionComidac").onclick = function () {
        comidacSelected = undefined;
        comidaSelected = comidacSelected;
        switch (tipoDiaComida) {
            case 0:
                document.querySelector("#txtComidaDetalle").value = "";
                break;
            case 1:
                document.querySelector("#txtComidaAlmuerzoDetalle").value = "";
                break;
            case 2:
                document.querySelector("#txtComidaCenaDetalle").value = "";
                break;

            default:

                break;
        }
    };

    $("#sizePageComidac").change(function () {
        $('#modalCargandoSelectedComidac').modal('show');
    });
    //almuerzo
    document.querySelector("#btnSeleccionarComidaAlmuerzo").onclick = function () {
       
        $('#ventanaModalSelectedComidac').modal('show');
    };
    //cena
    document.querySelector("#btnSeleccionarComidaCena").onclick = function () {
        
        $('#ventanaModalSelectedComidac').modal('show');
    };

});

function processAjaxComidac() {

    let parameters_pagination = "";
    let json = "";
    let url_request = getHostAPI() + beanRequestComidac.entity_api + "/" + beanRequestComidac.operation;
    switch (beanRequestComidac.operation) {
        default:
            parameters_pagination += "?tipo=-1";
            parameters_pagination += "&nombre=" + document.querySelector("#txtFilterComidac").value.toUpperCase();
            parameters_pagination += "&page=" + document.querySelector("#pageComidac").value;
            parameters_pagination += "&size=" + document.querySelector("#sizePageComidac").value;
            url_request += parameters_pagination;
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestComidac.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoSelectedComidac').modal("hide");
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationComidac = beanCrudResponse.beanPagination;
            toListComidac(beanPaginationComidac);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoSelectedComidac').modal("hide");
        showAlertErrorRequest();
    });
}

function toListComidac(beanPagination) {
    document.querySelector("#tbodyComidac").innerHTML = "";
    document.querySelector("#titleManagerComidac").innerHTML = "[ " + beanPagination.count_filter + " ] COMIDAS";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(comida => {
            row = "<tr class='click-selection-comida sisbu-cursor-mano' idcomida='" + comida.idcomida + "'>";
            row += "<td class='align-middle text-left'>" + comida.descripcion.toUpperCase() + "</td>";
            row += "<td class='align-middle text-left'>" + tipoComida(comida.tipo) + "</td>";
            row += "</tr>";
            document.querySelector("#tbodyComidac").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageComidac").value),
                document.querySelector("#pageComidac"),
                $('#modalCargandoSelectedComidac'),
                $('#paginationComidac'));
        addEventsComidaces();
        if (beanRequestComidac.operation == "paginate") {
            document.querySelector("#txtFilterComidac").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationComidac'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterComidac").focus();
    }
}

function addEventsComidaces() {
    document.querySelectorAll('.click-selection-comida').forEach(function (element) {
        element.onclick = function () {
            if (this.classList.contains('row-selected-celeste-claro')) {
                this.classList.remove('row-selected-celeste-claro');
                comidacSelected = undefined;
            } else {
                comidacSelected = findByComidac(this.getAttribute('idcomida'));
                this.parentElement.childNodes.forEach(function (element) {
                    element.classList.remove('row-selected-celeste-claro');
                });
                this.classList.add('row-selected-celeste-claro');
            }
        };
    });

}

function findByComidac(idcomida) {
    let comida_;
    beanPaginationComidac.list.forEach(comida => {
        if (parseInt(idcomida) == parseInt(comida.idcomida)) {
            comida_ = comida;
            return;
        }
    });
    return comida_;
}
