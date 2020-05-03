/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var beanPaginationEscuelaC;
var escuelaCSelected;
var escuelaSelected;
var beanRequestEscuelaC = new BeanRequest();

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestEscuelaC.entity_api = "api/escuelas";
    beanRequestEscuelaC.operation = "paginate";
    beanRequestEscuelaC.type_request = "GET";

    $('#FrmEscuelaC').submit(function (event) {
        beanRequestEscuelaC.operation = "paginate";
        beanRequestEscuelaC.type_request = "GET";
        $('#modalCargandoSelectedEscuelaC').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $("#modalCargandoSelectedEscuelaC").on('shown.bs.modal', function () {
        processAjaxEscuelaC();
    });

    $("#ventanaModalSelectedEscuelaC").on('shown.bs.modal', function () {
        $("#modalCargandoSelectedEscuelaC").modal('show');
    });

    $("#ventanaModalSelectedEscuelaC").on('hidden.bs.modal', function () {
        beanRequestEscuelaC.operation = "paginate";
        beanRequestEscuelaC.type_request = "GET";
    });

    document.querySelector("#btnSeleccionarEscuela").onclick = function () {
        $('#ventanaModalSelectedEscuelaC').modal('show');
    };

    document.querySelector("#btn-selecionar-escuelac").onclick = function () {
        if (escuelaCSelected == undefined) {
            showAlertTopEnd('warning', 'Por favor seleccione un escuela');
            return;
        }
        escuelaSelected = escuelaCSelected;
        document.querySelector("#txtEscuelaAtendido").value = escuelaCSelected.nombre.toUpperCase();
        $('#ventanaModalSelectedEscuelaC').modal('hide');
    };

    document.querySelector("#btnCancelSelectionEscuelaC").onclick = function () {
        escuelaCSelected = undefined;
        escuelaSelected = escuelaCSelected;
        document.querySelector("#txtEscuelaAtendido").value = "";
    };

    $("#sizePageEscuelaC").change(function () {
        $('#modalCargandoSelectedEscuelaC').modal('show');
    });

});

function processAjaxEscuelaC() {
    let parameters_pagination = "";
    let json = "";
    let url_request = getHostAPI() + beanRequestEscuelaC.entity_api + "/" + beanRequestEscuelaC.operation;
    switch (beanRequestEscuelaC.operation) {
        default:
            parameters_pagination += "?nombre=" + document.querySelector("#txtFilterEscuelaC").value.toUpperCase();
            parameters_pagination += "&page=" + document.querySelector("#pageEscuelaC").value;
            parameters_pagination += "&size=" + document.querySelector("#sizePageEscuelaC").value;
            url_request += parameters_pagination;
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestEscuelaC.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoSelectedEscuelaC').modal("hide");
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationEscuelaC = beanCrudResponse.beanPagination;
            toListEscuelaC(beanPaginationEscuelaC);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoSelectedEscuelaC').modal("hide");
        showAlertErrorRequest();
    });
}

function toListEscuelaC(beanPagination) {
    document.querySelector("#tbodyEscuelaC").innerHTML = "";
    document.querySelector("#titleManagerEscuelaC").innerHTML = "[ " + beanPagination.count_filter + " ] ESCUELAS";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(escuela => {
            row = "<tr class='click-selection-escuela sisbu-cursor-mano' idescuela='" + escuela.idescuela + "'>";
            row += "<td class='align-middle text-left'>" + escuela.nombre.toUpperCase() + "</td>";
            row += "</tr>";
            document.querySelector("#tbodyEscuelaC").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageEscuelaC").value),
                document.querySelector("#pageEscuelaC"),
                $('#modalCargandoSelectedEscuelaC'),
                $('#paginationEscuelaC'));
        addEventsEscuelaCes();
        if (beanRequestEscuelaC.operation == "paginate") {
            document.querySelector("#txtFilterEscuelaC").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationEscuelaC'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterEscuelaC").focus();
    }
}

function addEventsEscuelaCes() {
    document.querySelectorAll('.click-selection-escuela').forEach(function (element) {
        element.onclick = function () {
            if (this.classList.contains('bg-info')) {
                this.classList.remove('bg-info');
                this.classList.remove('text-white');
                escuelaCSelected = undefined;
            } else {
                escuelaCSelected = findByEscuelaC(this.getAttribute('idescuela'));
                this.parentElement.childNodes.forEach(function (element) {
                    element.classList.remove('bg-info');
                    element.classList.remove('text-white');
                });
                this.classList.add('bg-info');
                this.classList.add('text-white');
            }
        };
    });

}

function findByEscuelaC(idescuela) {
    let escuela_;
    beanPaginationEscuelaC.list.forEach(escuela => {
        if (parseInt(idescuela) == parseInt(escuela.idescuela)) {
            escuela_ = escuela;
            return;
        }
    });
    return escuela_;
}
