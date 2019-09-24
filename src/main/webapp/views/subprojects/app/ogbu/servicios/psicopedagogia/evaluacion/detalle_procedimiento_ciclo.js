/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var beanRequestDetalleProcedimientoCiclo = new BeanRequest();
var beanPaginationDetalleProcedimientoCiclo;
var detalle_procedimiento_cicloSelected;

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    inicializarDetalleProcedimientoCiclo();

    document.querySelector("#btnGuardarDetalleProcedimientoCiclo").onclick = function () {
        if (validateFormDetalleProcedimientoCiclo()) {
            beanRequestDetalleProcedimientoCiclo.operation = "add";
            beanRequestDetalleProcedimientoCiclo.type_request = "POST";
            $('#modalCargandoDetalleProcedimientoCiclo').modal('show');
        }
    };

    document.querySelector("#btnBuscarDetalleProcedimientoCiclo").onclick = function () {
        beanRequestDetalleProcedimientoCiclo.operation = "paginate";
        beanRequestDetalleProcedimientoCiclo.type_request = "GET";
        $('#modalCargandoDetalleProcedimientoCiclo').modal("show");
    };

    $("#sizePageDetalleProcedimientoCiclo").change(function () {
        $('#modalCargandoDetalleProcedimientoCiclo').modal('show');
    });

    $("#modalCargandoDetalleProcedimientoCiclo").on('shown.bs.modal', function () {
        processAjaxDetalleProcedimientoCiclo();
    });
    
    $("#ventanaModalDetalleProcedimientoCiclo").on('hidden.bs.modal', function () {
        $("#modalCargandoProcedimientoCiclo").modal("show");
    });

    $("#ventanaModalDetalleProcedimientoCiclo").on('shown.bs.modal', function () {
        $("#modalCargandoDetalleProcedimientoCiclo").modal("show");
    });

});


function processAjaxDetalleProcedimientoCiclo() {
    let parameters_pagination = "";
    let json = "";
    let url_request = getHostAPI() + beanRequestDetalleProcedimientoCiclo.entity_api + "/" + beanRequestDetalleProcedimientoCiclo.operation;
    switch (beanRequestDetalleProcedimientoCiclo.operation) {
        case "add":
            json = {
                "iddetalle_procedimiento_ciclo": 0,
                "procedimiento_ciclo": procedimiento_cicloSelected,
                "procedimiento": procedimientoCSelected
            };
            break;
        case "delete":
            parameters_pagination += "/" + detalle_procedimiento_cicloSelected.iddetalle_procedimiento_ciclo;
            url_request += parameters_pagination;
            break;
        default:
            parameters_pagination += "?idprocedimiento_ciclo=" + procedimiento_cicloSelected.idprocedimiento_ciclo;
            parameters_pagination += "&page=" + document.querySelector("#pageDetalleProcedimientoCiclo").value;
            parameters_pagination += "&size=" + document.querySelector("#sizePageDetalleProcedimientoCiclo").value;
            url_request += parameters_pagination;
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestDetalleProcedimientoCiclo.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoDetalleProcedimientoCiclo').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
                setTimeout(() => {
                    //VOLVEMOS A PAGINAR
                    procedimientoCSelected = undefined;
                    document.querySelector("#txtProcedimientoDetalleProcedimientoCiclo").value = "";
                    document.querySelector("#btnBuscarDetalleProcedimientoCiclo").dispatchEvent(new Event('click'));
                }, 500);
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationDetalleProcedimientoCiclo = beanCrudResponse.beanPagination;
            toListDetalleProcedimientoCiclo(beanPaginationDetalleProcedimientoCiclo);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoDetalleProcedimientoCiclo').modal("hide");
        showAlertErrorRequest();

    });
}

function toListDetalleProcedimientoCiclo(beanPagination) {
    document.querySelector("#tbodyDetalleProcedimientoCiclo").innerHTML = "";
    document.querySelector("#titleManagerDetalleProcedimientoCiclo").innerHTML = "[ " + beanPagination.count_filter + " ] EVALUACIONES EN EL " + procedimiento_cicloSelected.ciclo_academico.nombre;
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(detalle_procedimiento_ciclo => {
            row = "<tr ";
            row += ">";
            row += "<td class='align-middle text-left'>" + detalle_procedimiento_ciclo.procedimiento.descripcion + "</td>";
            row += "<td><ul class='dt-list dt-list-cm-0'>";
            row += "<li class='dt-list__item btn-eliminar-dpc' iddetalle_procedimiento_ciclo='" + detalle_procedimiento_ciclo.iddetalle_procedimiento_ciclo + "' data-toggle='tooltip' title='Eliminar'><a class='text-light-gray' href='javascript:void(0)'>";
            row += "<i class='icon icon-trash-filled'></i></a></li>";
            row += "</ul></td>";
            row += "</tr>";
            document.querySelector("#tbodyDetalleProcedimientoCiclo").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageDetalleProcedimientoCiclo").value),
                document.querySelector("#pageDetalleProcedimientoCiclo"),
                $('#modalCargandoDetalleProcedimientoCiclo'),
                $('#paginationDetalleProcedimientoCiclo'));
        addEventsDetalleProcedimientoCiclo();
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationDetalleProcedimientoCiclo'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
    }
}

function addEventsDetalleProcedimientoCiclo() {
    document.querySelectorAll(".btn-eliminar-dpc").forEach(btn => {
        btn.onclick = function () {
            detalle_procedimiento_cicloSelected = getDetalleProcedimientoCicloForId(this.getAttribute('iddetalle_procedimiento_ciclo'));
            if (detalle_procedimiento_cicloSelected != undefined) {
                beanRequestDetalleProcedimientoCiclo.operation = "delete";
                beanRequestDetalleProcedimientoCiclo.type_request = "DELETE";
                showAlertDelete('modalCargandoDetalleProcedimientoCiclo');
            } else {
                showAlertTopEnd('warnign', 'No se encontró el registro para editar');
            }
        };
    });
}

function getDetalleProcedimientoCicloForId(iddetalle_procedimiento_ciclo) {
    let eva_ = -1;
    beanPaginationDetalleProcedimientoCiclo.list.forEach(function (detalle_procedimiento_ciclo, index) {
        if (detalle_procedimiento_ciclo.iddetalle_procedimiento_ciclo == iddetalle_procedimiento_ciclo) {
            eva_ = detalle_procedimiento_ciclo;
            return;
        }
    });
    return eva_;
}


function validateFormDetalleProcedimientoCiclo() {
    if (procedimientoCSelected == undefined) {
        showAlertTopEnd('warning', 'Por favor seleccione una evaluación');
        return false;
    }
    if (procedimientoCSelected.idprocedimiento == 0) {
        showAlertTopEnd('warning', 'Por favor seleccione correctamente una evaluacion');
        return false;
    }
    return true;
}

function inicializarDetalleProcedimientoCiclo() {
    beanRequestDetalleProcedimientoCiclo.entity_api = "api/detalle-procedimiento-ciclo";
    beanRequestDetalleProcedimientoCiclo.operation = "paginate";
    beanRequestDetalleProcedimientoCiclo.type_request = "GET";
}