var beanPaginationCicloAcademicoResultados;
var ciclo_academico_resultadosSelected;
var beanRequestCicloAcademicoResultados = new BeanRequest();

class CicloAcademicoResultados {
    constructor() {
        this.idciclo_academico = 0;
    }
}

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestCicloAcademicoResultados.entity_api = "api/ciclosacademicos";
    beanRequestCicloAcademicoResultados.operation = "paginate";
    beanRequestCicloAcademicoResultados.type_request = "GET";

    $('#FrmCicloAcademicoResultados').submit(function (event) {
        beanRequestCicloAcademicoResultados.operation = "paginate";
        beanRequestCicloAcademicoResultados.type_request = "GET";
        $('#modalCargandoCicloAcademicoResultados').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    document.querySelector("#btnSeleccionarCicloAcademicoResultados").onclick = function () {
        $('#ventanaModalCicloAcademicoResultados').modal('show');
    };

    $("#modalCargandoCicloAcademicoResultados").on('shown.bs.modal', function () {
        processAjaxCicloAcademicoResultados();
    });

    $("#ventanaModalCicloAcademicoResultados").on('shown.bs.modal', function () {
        $('#modalCargandoCicloAcademicoResultados').modal('show');
    });

    $("#ventanaModalCicloAcademicoResultados").on('hidden.bs.modal', function () {
        beanRequestCicloAcademicoResultados.operation = "paginate";
        beanRequestCicloAcademicoResultados.type_request = "GET";
    });

    $("#sizePageCicloAcademicoResultados").change(function () {
        $('#modalCargandoCicloAcademicoResultados').modal('show');
    });

    document.querySelector("#btn-selecionar-ciclo-academico-resultados").onclick = function () {
        if (ciclo_academico_resultadosSelected.idciclo_academico != 0) {
            setCicloAcademicoResultados();
        } else {
            showAlertTopEnd('warning', 'Por favor seleccione ciclo academico');
        }
    };


});

function setCicloAcademicoResultados() {
    document.querySelector("#txtCicloAcademicoResultados").value = ciclo_academico_resultadosSelected.nombre;
    $('#ventanaModalCicloAcademicoResultados').modal('hide');
}

function processAjaxCicloAcademicoResultados() {
    let parameters_pagination = "";
    let json = "";
    let url_request = getHostAPI() + beanRequestCicloAcademicoResultados.entity_api + "/" + beanRequestCicloAcademicoResultados.operation;
    switch (beanRequestCicloAcademicoResultados.operation) {
        default:
            parameters_pagination += "?nombre=" + document.querySelector("#txtFilterCicloAcademicoResultados").value.toUpperCase();
            parameters_pagination += "&page=" + document.querySelector("#pageCicloAcademicoResultados").value;
            parameters_pagination += "&size=" + document.querySelector("#sizePageCicloAcademicoResultados").value;
            url_request += parameters_pagination;
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestCicloAcademicoResultados.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoCicloAcademicoResultados').modal("hide");
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationCicloAcademicoResultados = beanCrudResponse.beanPagination;
            toListCicloAcademicoResultados(beanPaginationCicloAcademicoResultados);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#ventanaModalManCicloAcademicoResultados').modal("hide");
        $('#modalCargandoCicloAcademicoResultados').modal("hide");
        showAlertErrorRequest();

    });
}

function toListCicloAcademicoResultados(beanPagination) {
    document.querySelector("#tbodyCicloAcademicoResultados").innerHTML = "";
    document.querySelector("#titleManagerCicloAcademicoResultados").innerHTML = "[ " + beanPagination.count_filter + " ] AREAS";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(ciclo_academico_resultados => {
            row = "<tr class='click-selection-ciclo-academico sisbu-cursor-mano' idciclo_academico='" + ciclo_academico_resultados.idciclo_academico + "'>";
            row += "<td class='align-middle text-left'>" + ciclo_academico_resultados.nombre + "</td>";
            row += "</tr>";
            document.querySelector("#tbodyCicloAcademicoResultados").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageCicloAcademicoResultados").value),
                document.querySelector("#pageCicloAcademicoResultados"),
                $('#modalCargandoCicloAcademicoResultados'),
                $('#paginationCicloAcademicoResultados'));
        addEventsCicloAcademicoResultados();
        if (beanRequestCicloAcademicoResultados.operation == "paginate") {
            document.querySelector("#txtFilterCicloAcademicoResultados").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationCicloAcademicoResultados'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterCicloAcademicoResultados").focus();
    }
}

function addEventsCicloAcademicoResultados() {
    
    document.querySelectorAll('.click-selection-ciclo-academico').forEach(function (element) {
        element.onclick = function () {
            if (this.classList.contains('row-selected-celeste-claro')) {
                this.classList.remove('row-selected-celeste-claro');
                ciclo_academico_resultadosSelected = new CicloAcademicoResultados();
            } else {
                ciclo_academico_resultadosSelected = findByCicloAcademicoResultados(this.getAttribute('idciclo_academico'));
                this.parentElement.childNodes.forEach(function (element) {
                    element.classList.remove('row-selected-celeste-claro');
                });
                this.classList.add('row-selected-celeste-claro');
            }
        }
    });
}

function findByCicloAcademicoResultados(idciclo_academico_resultados) {
    let ciclo_academico_resultados_;
    beanPaginationCicloAcademicoResultados.list.forEach(ciclo_academico_resultados => {
        if (idciclo_academico_resultados == ciclo_academico_resultados.idciclo_academico) {
            ciclo_academico_resultados_ = ciclo_academico_resultados;
            return;
        }
    });
    return ciclo_academico_resultados_;
}