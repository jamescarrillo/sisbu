var beanPaginationAtendido;
var atendidoSelected;
var beanRequestAtendido = new BeanRequest();
document.addEventListener("DOMContentLoaded", function () {
    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestAtendido.entity_api = "api/atendido";
    beanRequestAtendido.operation = "paginate";
    beanRequestAtendido.type_request = "GET";

    document.querySelector("#pageAtendido").value = "1";

    $('#FrmAtendido').submit(function (event) {
        beanRequestAtendido.operation = "paginate";
        beanRequestAtendido.type_request = "GET";
        $('#modalCargandoSelectedAtendido').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $("#modalCargandoSelectedAtendido").on('shown.bs.modal', function () {
        processAjaxAtendido();
    });

    $("#ventanaModalSelectedAtendido").on('shown.bs.modal', function () {
        $("#modalCargandoSelectedAtendido").modal('show');
    });

    document.querySelector("#btnSeleccionarAtendido").onclick = function () {
        $('#ventanaModalSelectedAtendido').modal('show');
    };

    document.querySelector("#btn-selecionar-atendido").onclick = function () {
        if (atendidoSelected == undefined) {
            showAlertTopEnd('warning', 'Por favor seleccione un atendido');
            return;
        }
        document.querySelector("#txtAtendidoCita").value = atendidoSelected.nombre.toUpperCase();
        $('#ventanaModalSelectedAtendido').modal('hide');
    };

    document.querySelector("#btnCancelSelectionAtendido").onclick = function () {
        atendidoSelected = undefined;
        document.querySelector("#txtAtendidoCita").value = "";
    };

    $("#sizePageAtendido").change(function () {
        $('#modalCargandoSelectedAtendido').modal('show');
    });

});

function processAjaxAtendido() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestAtendido.operation == "paginate") {
        parameters_pagination += "?filter=" + document.querySelector("#txtFilterAtendido").value;
        parameters_pagination += "&page=" + document.querySelector("#pageAtendido").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePageAtendido").value;

    }
    $.ajax({
        url: getHostAPI() + beanRequestAtendido.entity_api + "/" + beanRequestAtendido.operation + parameters_pagination,
        type: beanRequestAtendido.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        //console.log(beanCrudResponse);
        $('#modalCargandoSelectedAtendido').modal("hide");
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationAtendido = beanCrudResponse.beanPagination;
            toListAtendido(beanPaginationAtendido);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoSelectedAtendido').modal("hide");
        showAlertErrorRequest();
    });
}


function toListAtendido(beanPagination) {
    document.querySelector("#tbodyAtendido").innerHTML = "";
    document.querySelector("#titleManagerAtendido").innerHTML = "[ " + beanPagination.count_filter + " ] USUARIOS";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(atendido => {
            row = "<tr class='click-selection-atendido sisbu-cursor-mano' idatendido='" + atendido.idatendido + "'>";
            let escuela = "";
            let distrito_actual = "";
            if (atendido.escuela.idescuela > 0) {
                escuela += atendido.escuela.nombre;
            }
            if (atendido.distrito_actual.iddistrito > 0) {
                distrito_actual = atendido.distrito_actual.nombre;
            }
            row += "<td class='align-middle text-left'>" + atendido.nombre.toUpperCase() + " " + atendido.apellido_pat.toUpperCase() + "<br>" + escuela + "</td>";
            row += "<td class='align-middle text-left'>" + distrito_actual + "</td>";
            row += "</tr>";
            document.querySelector("#tbodyAtendido").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageAtendido").value),
                document.querySelector("#pageAtendido"),
                $('#modalCargandoSelectedAtendido'),
                $('#paginationAtendido'));
        addEventsAtendidoes();
        if (beanRequestAtendido.operation == "paginate") {
            document.querySelector("#txtFilterAtendido").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationAtendido'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterAtendido").focus();
    }
}

function addEventsAtendidoes() {
    document.querySelectorAll('.click-selection-atendido').forEach(function (element) {
        element.onclick = function () {
            if (this.classList.contains('row-selected-celeste-claro')) {
                this.classList.remove('row-selected-celeste-claro');
                atendidoSelected = undefined;
            } else {
                atendidoSelected = findByAtendido(this.getAttribute('idatendido'));
                this.parentElement.childNodes.forEach(function (element) {
                    element.classList.remove('row-selected-celeste-claro');
                });
                this.classList.add('row-selected-celeste-claro');
            }
        };
    });

}

function findByAtendido(idatendido) {
    let atendido_;
    beanPaginationAtendido.list.forEach(atendido => {
        if (idatendido == atendido.idatendido) {
            atendido_ = atendido;
            return;
        }
    });
    return atendido_;
}
