/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var beanPaginationAficionC;
var aficionCSelected;

var beanRequestAficionC = new BeanRequest();

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestAficionC.entity_api = "api/aficiones";
    beanRequestAficionC.operation = "paginate";
    beanRequestAficionC.type_request = "GET";

    $('#FrmAficionC').submit(function (event) {
        beanRequestAficionC.operation = "paginate";
        beanRequestAficionC.type_request = "GET";
        $('#modalCargandoSelectedAficionC').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $("#modalCargandoSelectedAficionC").on('shown.bs.modal', function () {
        
        processAjaxAficionC();
    });

    $("#ventanaModalSelectedAficionC").on('shown.bs.modal', function () {
        $("#modalCargandoSelectedAficionC").modal('show');
    });

    $("#ventanaModalSelectedAficionC").on('hidden.bs.modal', function () {
        beanRequestAficionC.operation = "paginate";
        beanRequestAficionC.type_request = "GET";
    });

    document.querySelector("#btnSeleccionarAficiones").onclick = function () {
       
        $('#ventanaModalSelectedAficionC').modal('show');
    };

    document.querySelector("#btn-selecionar-aficionc").onclick = function () {
        if (aficionCSelected == undefined) {
            showAlertTopEnd('warning', 'Por favor seleccione un aficion');
            return;
        }
        aficionSelected = aficionCSelected;
        document.querySelector("#txtAficionDetalle").value = aficionCSelected.descripcion.toUpperCase();
        $('#ventanaModalSelectedAficionC').modal('hide');
    };

    document.querySelector("#btnCancelSelectionAficionC").onclick = function () {
        aficionCSelected = undefined;
        aficionSelected = aficionCSelected;
        document.querySelector("#txtAficionDetalle").value = "";
    };

    $("#sizePageAficionC").change(function () {
        $('#modalCargandoSelectedAficionC').modal('show');
    });

});

function processAjaxAficionC() {
    
    let parameters_pagination = "";
    let json = "";
    let url_request = getHostAPI() + beanRequestAficionC.entity_api + "/" + beanRequestAficionC.operation;
    switch (beanRequestAficionC.operation) {
        default:
            parameters_pagination += "?nombre=" + document.querySelector("#txtFilterAficionC").value.toUpperCase();
            parameters_pagination += "&page=" + document.querySelector("#pageAficionC").value;
            parameters_pagination += "&size=" + document.querySelector("#sizePageAficionC").value;
            url_request += parameters_pagination;
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestAficionC.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        console.log(beanCrudResponse);
        $('#modalCargandoSelectedAficionC').modal("hide");
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationAficionC = beanCrudResponse.beanPagination;
            toListAficionC(beanPaginationAficionC);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoSelectedAficionC').modal("hide");
        showAlertErrorRequest();
    });
}

function toListAficionC(beanPagination) {
    document.querySelector("#tbodyAficionC").innerHTML = "";
    document.querySelector("#titleManagerAficionC").innerHTML = "[ " + beanPagination.count_filter + " ] AFICIONES";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(aficion => {
            row = "<tr class='click-selection-aficion sisbu-cursor-mano' idaficion='" + aficion.idaficion + "'>";
            row += "<td class='align-middle text-left'>" + aficion.descripcion.toUpperCase() + "</td>";
            row += "</tr>";
            document.querySelector("#tbodyAficionC").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageAficionC").value),
                document.querySelector("#pageAficionC"),
                $('#modalCargandoSelectedAficionC'),
                $('#paginationAficionC'));
        addEventsAficionCes();
        if (beanRequestAficionC.operation == "paginate") {
            document.querySelector("#txtFilterAficionC").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationAficionC'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterAficionC").focus();
    }
}

function addEventsAficionCes() {
    document.querySelectorAll('.click-selection-aficion').forEach(function (element) {
        element.onclick = function () {
            if (this.classList.contains('row-selected-celeste-claro')) {
                this.classList.remove('row-selected-celeste-claro');
                aficionCSelected = undefined;
            } else {
                aficionCSelected = findByAficionC(this.getAttribute('idaficion'));
                this.parentElement.childNodes.forEach(function (element) {
                    element.classList.remove('row-selected-celeste-claro');
                });
                this.classList.add('row-selected-celeste-claro');
            }
        };
    });

}

function findByAficionC(idaficion) {
    let aficion_;
    beanPaginationAficionC.list.forEach(aficion => {
        if (parseInt(idaficion) == parseInt(aficion.idaficion)) {
            aficion_ = aficion;
            return;
        }
    });
    return aficion_;
}
