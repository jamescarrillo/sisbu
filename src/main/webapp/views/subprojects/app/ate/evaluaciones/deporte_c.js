/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var beanPaginationDeporteC;
var deporteCSelected;

var beanRequestDeporteC = new BeanRequest();

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestDeporteC.entity_api = "api/deportes";
    beanRequestDeporteC.operation = "paginate";
    beanRequestDeporteC.type_request = "GET";

    $('#FrmDeporteC').submit(function (event) {
        beanRequestDeporteC.operation = "paginate";
        beanRequestDeporteC.type_request = "GET";
        $('#modalCargandoSelectedDeporteC').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $("#modalCargandoSelectedDeporteC").on('shown.bs.modal', function () {
        processAjaxDeporteC();
    });

    $("#ventanaModalSelectedDeporteC").on('shown.bs.modal', function () {
        $("#modalCargandoSelectedDeporteC").modal('show');
    });

    $("#ventanaModalSelectedDeporteC").on('hidden.bs.modal', function () {
        beanRequestDeporteC.operation = "paginate";
        beanRequestDeporteC.type_request = "GET";
    });

    document.querySelector("#btnSeleccionarDeporte").onclick = function () {
        $('#ventanaModalSelectedDeporteC').modal('show');
    };

    document.querySelector("#btn-selecionar-deportec").onclick = function () {
        if (deporteCSelected == undefined) {
            showAlertTopEnd('warning', 'Por favor seleccione un deporte');
            return;
        }
        deporteSelected = deporteCSelected;
        document.querySelector("#txtDeporteDetalle").value = deporteCSelected.nombre.toUpperCase();
        $('#ventanaModalSelectedDeporteC').modal('hide');
    };

    document.querySelector("#btnCancelSelectionDeporteC").onclick = function () {
        deporteCSelected = undefined;
        deporteSelected = deporteCSelected;
        document.querySelector("#txtDeporteDetalle").value = "";
    };

    $("#sizePageDeporteC").change(function () {
        $('#modalCargandoSelectedDeporteC').modal('show');
    });

});

function processAjaxDeporteC() {
    let parameters_pagination = "";
    let json = "";
    let url_request = getHostAPI() + beanRequestDeporteC.entity_api + "/" + beanRequestDeporteC.operation;
    switch (beanRequestDeporteC.operation) {
        default:
            parameters_pagination += "?nombre=" + document.querySelector("#txtFilterDeporteC").value.toUpperCase();
            parameters_pagination += "&page=" + document.querySelector("#pageDeporteC").value;
            parameters_pagination += "&size=" + document.querySelector("#sizePageDeporteC").value;
            url_request += parameters_pagination;
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestDeporteC.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        console.log(beanCrudResponse);
        $('#modalCargandoSelectedDeporteC').modal("hide");
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationDeporteC = beanCrudResponse.beanPagination;
            toListDeporteC(beanPaginationDeporteC);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoSelectedDeporteC').modal("hide");
        showAlertErrorRequest();
    });
}

function toListDeporteC(beanPagination) {
    document.querySelector("#tbodyDeporteC").innerHTML = "";
    document.querySelector("#titleManagerDeporteC").innerHTML = "[ " + beanPagination.count_filter + " ] DEPORTES";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(deporte => {
            row = "<tr class='click-selection-deporte sisbu-cursor-mano' iddeporte='" + deporte.iddeporte + "'>";
            row += "<td class='align-middle text-left'>" + deporte.nombre.toUpperCase() + "</td>";
            row += "</tr>";
            document.querySelector("#tbodyDeporteC").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageDeporteC").value),
                document.querySelector("#pageDeporteC"),
                $('#modalCargandoSelectedDeporteC'),
                $('#paginationDeporteC'));
        addEventsDeporteCes();
        if (beanRequestDeporteC.operation == "paginate") {
            document.querySelector("#txtFilterDeporteC").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationDeporteC'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterDeporteC").focus();
    }
}

function addEventsDeporteCes() {
    document.querySelectorAll('.click-selection-deporte').forEach(function (element) {
        element.onclick = function () {
            if (this.classList.contains('row-selected-celeste-claro')) {
                this.classList.remove('row-selected-celeste-claro');
                deporteCSelected = undefined;
            } else {
                deporteCSelected = findByDeporteC(this.getAttribute('iddeporte'));
                this.parentElement.childNodes.forEach(function (element) {
                    element.classList.remove('row-selected-celeste-claro');
                });
                this.classList.add('row-selected-celeste-claro');
            }
        };
    });

}

function findByDeporteC(iddeporte) {
    let deporte_;
    beanPaginationDeporteC.list.forEach(deporte => {
        if (parseInt(iddeporte) == parseInt(deporte.iddeporte)) {
            deporte_ = deporte;
            return;
        }
    });
    return deporte_;
}
