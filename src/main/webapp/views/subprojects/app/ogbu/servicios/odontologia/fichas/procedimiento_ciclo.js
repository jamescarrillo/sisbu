/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var beanRequestProcedimientoCiclo = new BeanRequest();
var beanPaginationProcedimientoCiclo;
var procedimiento_cicloSelected;

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    inicializarProcedimientoCiclo();

    document.querySelector("#row-configurations").style.display = "none";
    document.querySelector("#row-crud-configurations").style.display = "none";

    document.querySelector("#btnOpenNewProcedimientoCiclo").onclick = function () {
        beanRequestProcedimientoCiclo.operation = "add";
        beanRequestProcedimientoCiclo.type_request = "POST";
        clearProcedimientoCiclo();
        navigateProcedimientoCiclo("crud");
    };

    document.querySelector("#btnCancelarCrudProcedimientoCiclo").onclick = function () {
        inicializarProcedimientoCiclo();
        navigateProcedimientoCiclo("home");
    };

    $('#FrmProcedimientoCiclo').submit(function (event) {
        beanRequestProcedimientoCiclo.operation = "paginate";
        beanRequestProcedimientoCiclo.type_request = "GET";
        $('#modalCargandoProcedimientoCiclo').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    document.querySelector('#btnGuardarProcedimientoCiclo').onclick = function () {
        if (validateFormProcedimientoCiclo()) {
            $('#modalCargandoProcedimientoCiclo').modal('show');
        }
    };

    $("#sizePageProcedimientoCiclo").change(function () {
        $('#modalCargandoProcedimientoCiclo').modal('show');
    });

    $("#modalCargandoProcedimientoCiclo").on('shown.bs.modal', function () {
        processAjaxProcedimientoCiclo();
    });

    $("#ventanaModalDetalleProcedimientoCiclo").on('hidden.bs.modal', function () {
        beanRequestProcedimientoCiclo.operation = "paginate";
        beanRequestProcedimientoCiclo.type_request = "GET";
        $('#modalCargandoProcedimientoCiclo').modal('show');
    });

});

function navigateProcedimientoCiclo(ir) {
    switch (ir) {
        case "crud":
            document.querySelector("#row-text-selected-option").style.display = "none";
            document.querySelector("#row-options-selected").style.display = "none";
            document.querySelector("#row-navigation-options").style.display = "none";

            document.querySelector("#row-evaluaciones").style.display = "none";
            document.querySelector("#row-configurations").style.display = "none";

            document.querySelector("#row-crud-configurations").style.display = "flex";
            break;
        default:
            document.querySelector("#row-text-selected-option").style.display = "none";
            document.querySelector("#row-options-selected").style.display = "none";
            document.querySelector("#row-navigation-options").style.display = "flex";

            document.querySelector("#row-evaluaciones").style.display = "none";
            document.querySelector("#row-configurations").style.display = "flex";
            document.querySelector("#row-crud-configurations").style.display = "none";
            break;
    }
}

function processAjaxProcedimientoCiclo() {
    let parameters_pagination = "";
    let json = "";
    let url_request = getHostAPI() + beanRequestProcedimientoCiclo.entity_api + "/" + beanRequestProcedimientoCiclo.operation;
    switch (beanRequestProcedimientoCiclo.operation) {
        case "add":
            json = {
                "idprocedimiento_ciclo": 0,
                "fecha_registro": getTimesTampJavaScriptCurrent(),
                "num_procedimientos": 0,
                "ciclo_academico": ciclo_academicoSelected,
                "area": {
                    "idarea": getIdAreaUserSession()
                }
            };
            break;
        case "update":
            json = {
                "idprocedimiento_ciclo": procedimiento_cicloSelected.idprocedimiento_ciclo,
                "fecha_registro": getTimesTampJavaScriptCurrent(),
                "num_procedimientos": 0,
                "ciclo_academico": ciclo_academicoSelected,
                "area": {
                    "idarea": getIdAreaUserSession()
                }
            };
            break;
        case "delete":
            parameters_pagination += "/" + procedimiento_cicloSelected.idprocedimiento_ciclo;
            url_request += parameters_pagination;
            break;
        default:
            parameters_pagination += "?filter=" + document.querySelector("#txtFilterProcedimientoCiclo").value.toUpperCase();
            parameters_pagination += "&idarea=" + getIdAreaUserSession();
            parameters_pagination += "&page=" + document.querySelector("#pageProcedimientoCiclo").value;
            parameters_pagination += "&size=" + document.querySelector("#sizePageProcedimientoCiclo").value;
            url_request += parameters_pagination;
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestProcedimientoCiclo.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoProcedimientoCiclo').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
                document.querySelector("#btnCancelarCrudProcedimientoCiclo").dispatchEvent(new Event('click'));
                setTimeout(() => {
                    $("#FrmProcedimientoCiclo").submit();
                }, 500);
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationProcedimientoCiclo = beanCrudResponse.beanPagination;
            toListProcedimientoCiclo(beanPaginationProcedimientoCiclo);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoProcedimientoCiclo').modal("hide");
        showAlertErrorRequest();

    });
}

function toListProcedimientoCiclo(beanPagination) {
    document.querySelector("#div-container-procedimiento_ciclo").innerHTML = "";
    document.querySelector("#titleManagerProcedimientoCiclo").innerHTML = "[ " + beanPagination.count_filter + " ] CONFIGURACIONES";
    if (beanPagination.count_filter > 0) {
        let div;
        let btn_incon;
        beanPagination.list.forEach(procedimiento_ciclo => {
            btn_incon =
                    `
                    <button class="btn btn-default text-primary dt-fab-btn btn-editar-procedimientos" idprocedimiento_ciclo='${procedimiento_ciclo.idprocedimiento_ciclo}' title="Configurar editar evaluaciones" data-toggle="tooltip">
                        <i class="icon icon-assignment icon-xl"></i>
                    </button>
                `;
            div =
                    `
                <div class="dt-widget__item border-success">
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate">
                        <div class="dt-widget__title f-16 font-weight-500 text-truncate">
                            ${procedimiento_ciclo.ciclo_academico.nombre}
                        </div>
                        <p class="mb-0 text-truncate text-light-gray">
                            ${procedimiento_ciclo.ciclo_academico.fechai == undefined ? "" : procedimiento_ciclo.ciclo_academico.fechai} - ${procedimiento_ciclo.ciclo_academico.fechaf == undefined ? "" : procedimiento_ciclo.ciclo_academico.fechaf}
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Extra -->
                    <div class="dt-widget__extra text-right">
                        <!-- Show Content -->
                        <div class="show-content">
                            <span class="d-block text-dark">${procedimiento_ciclo.num_procedimientos == undefined ? "Sin" : procedimiento_ciclo.num_procedimientos}</span>
                            <span class="d-block">Evaluaciones</span>
                        </div>
                        <!-- /show content -->
                        <!-- Hide Content -->
                        <div class="hide-content">
                            <!-- Action Button Group -->
                            <div class="action-btn-group">
                                <button class="btn btn-default text-success dt-fab-btn btn-editar-procedimiento_ciclo" idprocedimiento_ciclo='${procedimiento_ciclo.idprocedimiento_ciclo}' title="Editar Evaluación" data-toggle="tooltip">
                                    <i class="icon icon-editors icon-1x"></i>
                                </button>
                                <button class="btn btn-default text-danger dt-fab-btn btn-eliminar-procedimiento_ciclo" idprocedimiento_ciclo='${procedimiento_ciclo.idprocedimiento_ciclo}' title="Eliminar Configuración" data-toggle="tooltip">
                                    <i class="icon icon-trash-filled icon-xl"></i>
                                </button>
                                ${btn_incon}
                            </div>
                            <!-- /action button group -->
                        </div>
                        <!-- /hide content -->
                    </div>
                    <!-- /widget extra -->

                </div>
            `;
            document.querySelector("#div-container-procedimiento_ciclo").innerHTML += div;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageProcedimientoCiclo").value),
                document.querySelector("#pageProcedimientoCiclo"),
                $('#modalCargandoProcedimientoCiclo'),
                $('#paginationProcedimientoCiclo'));
        addEventsProcedimientoCiclo();
        if (beanRequestProcedimientoCiclo.operation == "paginate") {
            document.querySelector("#txtFilterProcedimientoCiclo").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationProcedimientoCiclo'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterProcedimientoCiclo").focus();
    }
}

function addEventsProcedimientoCiclo() {
    document.querySelectorAll(".btn-editar-procedimiento_ciclo").forEach(btn => {
        btn.onclick = function () {
            procedimiento_cicloSelected = getProcedimientoCicloForId(this.getAttribute('idprocedimiento_ciclo'));
            if (procedimiento_cicloSelected != undefined) {
                openProcedimientoCiclo();
            } else {
                showAlertTopEnd('warnign', 'No se encontró el registro para editar');
            }
        };
    });

    document.querySelectorAll(".btn-eliminar-procedimiento_ciclo").forEach(btn => {
        btn.onclick = function () {
            procedimiento_cicloSelected = getProcedimientoCicloForId(this.getAttribute('idprocedimiento_ciclo'));
            if (procedimiento_cicloSelected != undefined) {
                beanRequestProcedimientoCiclo.operation = "delete";
                beanRequestProcedimientoCiclo.type_request = "DELETE";
                showAlertDelete('modalCargandoProcedimientoCiclo');
            } else {
                showAlertTopEnd('warnign', 'No se encontró el registro para editar');
            }
        };
    });

    document.querySelectorAll(".btn-editar-procedimientos").forEach(btn => {
        btn.onclick = function () {
            procedimiento_cicloSelected = getProcedimientoCicloForId(this.getAttribute('idprocedimiento_ciclo'));
            if (procedimiento_cicloSelected != undefined) {
                $('#ventanaModalDetalleProcedimientoCiclo').modal('show')
            } else {
                showAlertTopEnd('warnign', 'No se encontró el registro para editar');
            }
        };
    });

}

function clearProcedimientoCiclo() {
    document.querySelector("#txtCicloAcademico").value = "";
    document.querySelector("#titleCrudProcedimientoCiclo").innerHTML = "REGISTRO DE CONFIGURACIÓN";
    ciclo_academicoSelected = undefined;
}

function openProcedimientoCiclo() {
    beanRequestProcedimientoCiclo.operation = "update";
    beanRequestProcedimientoCiclo.type_request = "PUT";
    document.querySelector("#txtCicloAcademico").value = procedimiento_cicloSelected.ciclo_academico.nombre;
    ciclo_academicoSelected = procedimiento_cicloSelected.ciclo_academico;
    document.querySelector("#titleCrudProcedimientoCiclo").innerHTML = "EDICIÓN DE CONFIGURACIÓN";
    navigateProcedimientoCiclo("crud");
}

function getProcedimientoCicloForId(idprocedimiento_ciclo) {
    let eva_ = -1;
    beanPaginationProcedimientoCiclo.list.forEach(function (procedimiento_ciclo, index) {
        if (procedimiento_ciclo.idprocedimiento_ciclo == idprocedimiento_ciclo) {
            eva_ = procedimiento_ciclo;
            return;
        }
    });
    return eva_;
}


function validateFormProcedimientoCiclo() {
    if (ciclo_academicoSelected == undefined) {
        showAlertTopEnd('warning', 'Por favor seleccione un ciclo académico');
        return false;
    }
    if (ciclo_academicoSelected.idciclo_academico == 0) {
        showAlertTopEnd('warning', 'Por favor seleccione correctamente ciclo académico');
        return false;
    }
    return true;
}

function inicializarProcedimientoCiclo() {
    beanRequestProcedimientoCiclo.entity_api = "api/procedimientos/ciclo";
    beanRequestProcedimientoCiclo.operation = "paginate";
    beanRequestProcedimientoCiclo.type_request = "GET";
}
