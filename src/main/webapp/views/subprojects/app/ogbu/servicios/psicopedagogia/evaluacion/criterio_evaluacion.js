var beanPaginationCriterioEvaluacion;
var criterio_evaluacionSelected;
var beanRequestCriterioEvaluacion = new BeanRequest();

class CriterioEvaluacion {
    constructor() {
        this.idcriterio_evaluacion = 0;
    }
}

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestCriterioEvaluacion.entity_api = "api/criterio/evaluacion";
    beanRequestCriterioEvaluacion.operation = "paginate";
    beanRequestCriterioEvaluacion.type_request = "GET";

    $('#FrmCriterioEvaluacion').submit(function (event) {
        beanRequestCriterioEvaluacion.operation = "paginate";
        beanRequestCriterioEvaluacion.type_request = "GET";
        $('#modalCargandoCriterioEvaluacion').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $('#FrmCriterioEvaluacionModal').submit(function (event) {
        try {
            if (validateFormCriterioEvaluacion()) {
                $('#modalCargandoCriterioEvaluacion').modal('show');
            }
        } catch (e) {
            console.log(e)
        }

        event.preventDefault();
        event.stopPropagation();
    });

    document.querySelector("#btnOpenNewCriterioEvaluacion").onclick = function () {
        //CONFIGURAMOS LA SOLICITUD
        beanRequestCriterioEvaluacion.operation = "add";
        beanRequestCriterioEvaluacion.type_request = "POST";
        //LIMPIAR LOS CAMPOS
        clearCriterioEvaluacion();
        document.querySelector("#txtTituloModalManCriterioEvaluacion").innerHTML = "Registrar Criterio";
        $('#ventanaModalManCriterioEvaluacion').modal('show');
        document.querySelector("#txtDescripcionCriterioEvaluacion").focus();
    };

    $("#modalCargandoCriterioEvaluacion").on('shown.bs.modal', function () {
        processAjaxCriterioEvaluacion();
    });

    $("#ventanaModalCriterioEvaluacion").on('shown.bs.modal', function () {
        $('#modalCargandoCriterioEvaluacion').modal('show');
    });

    $("#ventanaModalCriterioEvaluacion").on('hidden.bs.modal', function () {
        beanRequestCriterioEvaluacion.operation = "paginate";
        beanRequestCriterioEvaluacion.type_request = "GET";
    });

    $("#sizePageCriterioEvaluacion").change(function () {
        $('#modalCargandoCriterioEvaluacion').modal('show');
    });

});

function processAjaxCriterioEvaluacion() {
    let parameters_pagination = "";
    let json = "";
    let url_request = getHostAPI() + beanRequestCriterioEvaluacion.entity_api + "/" + beanRequestCriterioEvaluacion.operation;
    switch (beanRequestCriterioEvaluacion.operation) {
        case "add":
            json = {
                "idcriterio_evaluacion": 0,
                "descripcion": document.querySelector("#txtDescripcionCriterioEvaluacion").value,
                "limite_inf": document.querySelector("#txtLimiteInfCriterioEvaluacion").value,
                "limite_sup": document.querySelector("#txtLimiteSupCriterioEvaluacion").value,
                "procedimiento": evaluacionSelected
            };
            break;
        case "update":
            json = {
                "idcriterio_evaluacion": criterio_evaluacionSelected.idcriterio_evaluacion,
                "descripcion": document.querySelector("#txtDescripcionCriterioEvaluacion").value,
                "limite_inf": document.querySelector("#txtLimiteInfCriterioEvaluacion").value,
                "limite_sup": document.querySelector("#txtLimiteSupCriterioEvaluacion").value,
                "procedimiento": evaluacionSelected
            };
            break;
        case "delete":
            url_request += "/" + criterio_evaluacionSelected.idcriterio_evaluacion;
            break;
        default:
            parameters_pagination += "?idprocedimiento=" + evaluacionSelected.idprocedimiento;
            parameters_pagination += "&descripcion=" + document.querySelector("#txtFilterCriterioEvaluacion").value;
            parameters_pagination += "&page=" + document.querySelector("#pageCriterioEvaluacion").value;
            parameters_pagination += "&size=" + document.querySelector("#sizePageCriterioEvaluacion").value;
            url_request += parameters_pagination;
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestCriterioEvaluacion.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoCriterioEvaluacion').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
                $('#ventanaModalManCriterioEvaluacion').modal('hide');
                $('#FrmCriterioEvaluacion').submit();
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationCriterioEvaluacion = beanCrudResponse.beanPagination;
            toListCriterioEvaluacion(beanPaginationCriterioEvaluacion);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#ventanaModalManCriterioEvaluacion').modal("hide");
        $('#modalCargandoCriterioEvaluacion').modal("hide");
        showAlertErrorRequest();

    });
}

function toListCriterioEvaluacion(beanPagination) {
    document.querySelector("#tbodyCriterioEvaluacion").innerHTML = "";
    document.querySelector("#titleManagerCriterioEvaluacion").innerHTML = "[ " + beanPagination.count_filter + " ] ITEMS CRITICOS";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(criterio_evaluacion => {
           
            row = "<tr class='sisbu-cursor-mano' idcriterio_evaluacion='" + criterio_evaluacion.idcriterio_evaluacion + "'>";
            row += "<td class='align-middle'>" + criterio_evaluacion.descripcion + "</td>";
            row += "<td class='align-middle'>" + criterio_evaluacion.limite_inf + "</td>";
            row += "<td class='align-middle'>" + criterio_evaluacion.limite_sup + "</td>";
            row +=
                    `
                <td>
                    <ul class="dt-list dt-list-cm-0">
                        <li class="dt-list__item">
                            <a idcriterio_evaluacion='${criterio_evaluacion.idcriterio_evaluacion}' class="text-light-gray editar-criterio_evaluacion" href="javascript:void(0)">
                                <i class="icon icon-editors "></i>
                            </a>
                        </li>
                        <li class="dt-list__item">
                            <a idcriterio_evaluacion='${criterio_evaluacion.idcriterio_evaluacion}' class="text-light-gray eliminar-criterio_evaluacion" href="javascript:void(0)">
                                <i class="icon icon-trash-filled"></i>
                            </a>
                        </li>
                    </ul>
                </td>
            `;
            row += "</tr>";
            document.querySelector("#tbodyCriterioEvaluacion").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageCriterioEvaluacion").value),
                document.querySelector("#pageCriterioEvaluacion"),
                $('#modalCargandoCriterioEvaluacion'),
                $('#paginationCriterioEvaluacion'));
        addEventsCriterioEvaluaciones();
        if (beanRequestCriterioEvaluacion.operation == "paginate") {
            document.querySelector("#txtFilterCriterioEvaluacion").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationCriterioEvaluacion'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterCriterioEvaluacion").focus();
    }
}

function addEventsCriterioEvaluaciones() {
    document.querySelectorAll('.editar-criterio_evaluacion').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            criterio_evaluacionSelected = findByCriterioEvaluacion(btn.getAttribute('idcriterio_evaluacion'));
            if (criterio_evaluacionSelected != undefined) {
                beanRequestCriterioEvaluacion.operation = "update";
                beanRequestCriterioEvaluacion.type_request = "PUT";
                openCriterioEvaluacion();
            } else {
                showAlertTopEnd('warning', 'No se encontró el registro para poder editar');
            }
        };
    });
    document.querySelectorAll('.eliminar-criterio_evaluacion').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            criterio_evaluacionSelected = findByCriterioEvaluacion(btn.getAttribute('idcriterio_evaluacion'));
            if (criterio_evaluacionSelected != undefined) {
                beanRequestCriterioEvaluacion.operation = "delete";
                beanRequestCriterioEvaluacion.type_request = "DELETE";
                //MODAL ELIMINAR
                showAlertDelete('modalCargandoCriterioEvaluacion');
            } else {
                showAlertTopEnd('warning', 'No se encontró el registro para poder eliminar');
            }

        };
    });
}

function findByCriterioEvaluacion(idcriterio_evaluacion) {
    let criterio_evaluacion_;
    beanPaginationCriterioEvaluacion.list.forEach(criterio_evaluacion => {
        if (idcriterio_evaluacion == criterio_evaluacion.idcriterio_evaluacion) {
            criterio_evaluacion_ = criterio_evaluacion;
            return;
        }
    });
    return criterio_evaluacion_;
}

function validateFormCriterioEvaluacion() {
    if (document.querySelector("#txtDescripcionCriterioEvaluacion").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese descripcion');
        document.querySelector("#txtDescripcionCriterioEvaluacion").focus();
        return false;
    }
    if (document.querySelector("#txtLimiteInfCriterioEvaluacion").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese puntaje minimo');
        document.querySelector("#txtLimiteInfCriterioEvaluacion").focus();
        return false;
    }
    if (document.querySelector("#txtLimiteSupCriterioEvaluacion").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese puntaje maximo');
        document.querySelector("#txtLimiteSupCriterioEvaluacion").focus();
        return false;
    }
    if (evaluacionSelected == undefined) {
        showAlertTopEnd('warning', 'Por favor seleccione correctamente una evaluacion');
        return false;
    }
    return true;
}

function clearCriterioEvaluacion() {
    document.querySelector("#txtDescripcionCriterioEvaluacion").value = "";
    document.querySelector("#txtLimiteInfCriterioEvaluacion").value = "";
    document.querySelector("#txtLimiteSupCriterioEvaluacion").value = "";
}

function openCriterioEvaluacion() {
    document.querySelector("#txtDescripcionCriterioEvaluacion").value = criterio_evaluacionSelected.descripcion;
    document.querySelector("#txtLimiteInfCriterioEvaluacion").value = criterio_evaluacionSelected.limite_inf;
    document.querySelector("#txtLimiteSupCriterioEvaluacion").value = criterio_evaluacionSelected.limite_sup;
    document.querySelector("#txtTituloModalManCriterioEvaluacion").innerHTML = "Editar Items Criticos";
    $('#ventanaModalManCriterioEvaluacion').modal('show');
    document.querySelector("#txtDescripcionCriterioEvaluacion").focus();
}