/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var beanPaginationFacultadC;
var facultadCSelected;

var beanRequestFacultadC = new BeanRequest();

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestFacultadC.entity_api = "api/facultades";
    beanRequestFacultadC.operation = "paginate";
    beanRequestFacultadC.type_request = "GET";

    $('#FrmFacultadC').submit(function (event) {
        beanRequestFacultadC.operation = "paginate";
        beanRequestFacultadC.type_request = "GET";
        $('#modalCargandoSelectedFacultadC').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $("#modalCargandoSelectedFacultadC").on('shown.bs.modal', function () {
        processAjaxFacultadC();
    });

    $("#ventanaModalSelectedFacultadC").on('shown.bs.modal', function () {
        $("#modalCargandoSelectedFacultadC").modal('show');
    });

    $("#ventanaModalSelectedFacultadC").on('hidden.bs.modal', function () {
        beanRequestFacultadC.operation = "paginate";
        beanRequestFacultadC.type_request = "GET";
    });

    document.querySelector("#btnSeleccionarFacultadResultados").onclick = function () {
        $('#ventanaModalSelectedFacultadC').modal('show');
    };

    document.querySelector("#btn-selecionar-facultadc").onclick = function () {
        if (facultadCSelected == undefined) {
            showAlertTopEnd('warning', 'Por favor seleccione un facultad');
            return;
        }
        facultadSelected = facultadCSelected;
        document.querySelector("#txtFacultadResultados").value = facultadCSelected.nombre.toUpperCase();
        $('#ventanaModalSelectedFacultadC').modal('hide');
        document.querySelector("#btnCancelSelectionEscuelaC").dispatchEvent(new Event('click'));
    };

    document.querySelector("#btnCancelSelectionFacultadC").onclick = function () {
        facultadCSelected = undefined;
        facultadSelected = facultadCSelected;
        document.querySelector("#txtFacultadResultados").value = "";
    };

    $("#sizePageFacultadC").change(function () {
        $('#modalCargandoSelectedFacultadC').modal('show');
    });

});

function processAjaxFacultadC() {
    let parameters_pagination = "";
    let json = "";
    let url_request = getHostAPI() + beanRequestFacultadC.entity_api + "/" + beanRequestFacultadC.operation;
    switch (beanRequestFacultadC.operation) {
        default:
            parameters_pagination += "?nombre=" + document.querySelector("#txtFilterFacultadC").value.toUpperCase();
            parameters_pagination += "&page=" + document.querySelector("#pageFacultadC").value;
            parameters_pagination += "&size=" + document.querySelector("#sizePageFacultadC").value;
            url_request += parameters_pagination;
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestFacultadC.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoSelectedFacultadC').modal("hide");
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationFacultadC = beanCrudResponse.beanPagination;
            toListFacultadC(beanPaginationFacultadC);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoSelectedFacultadC').modal("hide");
        showAlertErrorRequest();
    });
}

function toListFacultadC(beanPagination) {
    document.querySelector("#tbodyFacultadC").innerHTML = "";
    document.querySelector("#titleManagerFacultadC").innerHTML = "[ " + beanPagination.count_filter + " ] FACULTADES";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(facultad => {
            row = "<tr class='click-selection-facultad sisbu-cursor-mano' idfacultad='" + facultad.idfacultad + "'>";
            row += "<td class='align-middle text-left'>" + facultad.nombre.toUpperCase() + "</td>";
            row += "</tr>";
            document.querySelector("#tbodyFacultadC").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageFacultadC").value),
                document.querySelector("#pageFacultadC"),
                $('#modalCargandoSelectedFacultadC'),
                $('#paginationFacultadC'));
        addEventsFacultadCes();
        if (beanRequestFacultadC.operation == "paginate") {
            document.querySelector("#txtFilterFacultadC").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationFacultadC'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterFacultadC").focus();
    }
}

function addEventsFacultadCes() {
    document.querySelectorAll('.click-selection-facultad').forEach(function (element) {
        element.onclick = function () {
            if (this.classList.contains('row-selected-celeste-claro')) {
                this.classList.remove('row-selected-celeste-claro');
                facultadCSelected = undefined;
            } else {
                facultadCSelected = findByFacultadC(this.getAttribute('idfacultad'));
                this.parentElement.childNodes.forEach(function (element) {
                    element.classList.remove('row-selected-celeste-claro');
                });
                this.classList.add('row-selected-celeste-claro');
            }
        };
    });

}

function findByFacultadC(idfacultad) {
    let facultad_;
    beanPaginationFacultadC.list.forEach(facultad => {
        if (parseInt(idfacultad) == parseInt(facultad.idfacultad)) {
            facultad_ = facultad;
            return;
        }
    });
    return facultad_;
}
