var beanPaginationCicloAcademico;
var ciclo_academicoSelected;
var beanRequestCicloAcademico = new BeanRequest();

class CicloAcademico {
    constructor() {
        this.idciclo_academico = 0;
    }
}

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestCicloAcademico.entity_api = "api/area/psi";
    beanRequestCicloAcademico.operation = "paginate";
    beanRequestCicloAcademico.type_request = "GET";

    $('#FrmCicloAcademico').submit(function (event) {
        beanRequestCicloAcademico.operation = "paginate";
        beanRequestCicloAcademico.type_request = "GET";
        $('#modalCargandoCicloAcademico').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $('#FrmCicloAcademicoModal').submit(function (event) {
        if (validateFormCicloAcademico()) {
            $('#modalCargandoCicloAcademico').modal('show');
        }
        event.preventDefault();
        event.stopPropagation();
    });

    document.querySelector("#btnOpenNewCicloAcademico").onclick = function () {
        //CONFIGURAMOS LA SOLICITUD
        beanRequestCicloAcademico.operation = "add";
        beanRequestCicloAcademico.type_request = "POST";
        //LIMPIAR LOS CAMPOS
        clearCicloAcademico();
        document.querySelector("#txtTituloModalManCicloAcademico").innerHTML = "Registrar Area";
        $('#ventanaModalManCicloAcademico').modal('show');
        document.querySelector("#txtNombreCicloAcademico").focus();
    };

    document.querySelector("#btnSeleccionarCicloAcademico").onclick = function () {
        $('#ventanaModalCicloAcademico').modal('show');
    };

    $("#modalCargandoCicloAcademico").on('shown.bs.modal', function () {
        processAjaxCicloAcademico();
    });

    $("#ventanaModalCicloAcademico").on('shown.bs.modal', function () {
        $('#modalCargandoCicloAcademico').modal('show');
    });

    $("#ventanaModalCicloAcademico").on('hidden.bs.modal', function () {
        beanRequestCicloAcademico.operation = "paginate";
        beanRequestCicloAcademico.type_request = "GET";
    });

    $("#sizePageCicloAcademico").change(function () {
        $('#modalCargandoCicloAcademico').modal('show');
    });

    document.querySelector("#btn-selecionar-area-psi").onclick = function () {
        if (ciclo_academicoSelected.idciclo_academico != 0) {
            setAreaSelectedSubArea();
        } else {
            showAlertTopEnd('warning', 'Por favor seleccione una area');
        }
    };

});

function setAreaSelectedSubArea() {
    document.querySelector("#txtAreaSubCicloAcademico").value = ciclo_academicoSelected.nombre;
    $('#ventanaModalCicloAcademico').modal('hide');
}

function processAjaxCicloAcademico() {
    let parameters_pagination = "";
    let json = "";
    let url_request = getHostAPI() + beanRequestCicloAcademico.entity_api + "/" + beanRequestCicloAcademico.operation;
    switch (beanRequestCicloAcademico.operation) {
        case "add":
            json = {
                "idciclo_academico": 0,
                "nombre": document.querySelector("#txtNombreCicloAcademico").value,
                "descripcion": document.querySelector("#txtDescripcionCicloAcademico").value,
                "abreviatura": document.querySelector("#txtAbreviaturaCicloAcademico").value,
                "puntaje_minimo": document.querySelector("#txtPuntajeMinimoCicloAcademico").value,
                "puntaje_maximo": document.querySelector("#txtPuntajeMaximoCicloAcademico").value,
                "area": {
                    "idarea": getIdAreaUserSession()
                }
            };
            break;
        case "update":
            json = {
                "idciclo_academico": ciclo_academicoSelected.idciclo_academico,
                "nombre": document.querySelector("#txtNombreCicloAcademico").value,
                "descripcion": document.querySelector("#txtDescripcionCicloAcademico").value,
                "abreviatura": document.querySelector("#txtAbreviaturaCicloAcademico").value,
                "puntaje_minimo": document.querySelector("#txtPuntajeMinimoCicloAcademico").value,
                "puntaje_maximo": document.querySelector("#txtPuntajeMaximoCicloAcademico").value,
                "area": {
                    "idarea": getIdAreaUserSession()
                }
            };
            break;
        case "delete":
            url_request += "/" + ciclo_academicoSelected.idciclo_academico;
            break;
        default:
            parameters_pagination += "?filter=" + document.querySelector("#txtFilterCicloAcademico").value.toUpperCase();
            parameters_pagination += "&idarea=" + getIdAreaUserSession();
            parameters_pagination += "&page=" + document.querySelector("#pageCicloAcademico").value;
            parameters_pagination += "&size=" + document.querySelector("#sizePageCicloAcademico").value;
            url_request += parameters_pagination;
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestCicloAcademico.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoCicloAcademico').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
                $('#ventanaModalManCicloAcademico').modal('hide');
                $('#FrmCicloAcademico').submit();
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationCicloAcademico = beanCrudResponse.beanPagination;
            toListCicloAcademico(beanPaginationCicloAcademico);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#ventanaModalManCicloAcademico').modal("hide");
        $('#modalCargandoCicloAcademico').modal("hide");
        showAlertErrorRequest();

    });
}

function toListCicloAcademico(beanPagination) {
    document.querySelector("#tbodyCicloAcademico").innerHTML = "";
    document.querySelector("#titleManagerCicloAcademico").innerHTML = "[ " + beanPagination.count_filter + " ] AREAS";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(ciclo_academico => {
            row = "<tr class='click-selection-area sisbu-cursor-mano' idciclo_academico='" + ciclo_academico.idciclo_academico + "'>";
            row += "<td class='align-middle'>" + ciclo_academico.nombre + "</td>";
            row +=
                    `
                <td>
                    <ul class="dt-list dt-list-cm-0">
                        <li class="dt-list__item">
                            <a idciclo_academico='${ciclo_academico.idciclo_academico}' class="text-light-gray editar-ciclo_academico" href="javascript:void(0)">
                                <i class="icon icon-editors "></i>
                            </a>
                        </li>
                        <li class="dt-list__item">
                            <a idciclo_academico='${ciclo_academico.idciclo_academico}' class="text-light-gray eliminar-ciclo_academico" href="javascript:void(0)">
                                <i class="icon icon-trash-filled"></i>
                            </a>
                        </li>
                    </ul>
                </td>
            `;
            row += "</tr>";
            document.querySelector("#tbodyCicloAcademico").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageCicloAcademico").value),
                document.querySelector("#pageCicloAcademico"),
                $('#modalCargandoCicloAcademico'),
                $('#paginationCicloAcademico'));
        addEventsCicloAcademicoes();
        if (beanRequestCicloAcademico.operation == "paginate") {
            document.querySelector("#txtFilterCicloAcademico").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationCicloAcademico'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterCicloAcademico").focus();
    }
}

function addEventsCicloAcademicoes() {
    document.querySelectorAll('.editar-ciclo_academico').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            ciclo_academicoSelected = findByCicloAcademico(btn.getAttribute('idciclo_academico'));
            if (ciclo_academicoSelected != undefined) {
                if (ciclo_academicoSelected.idciclo_academico != 1) {
                    beanRequestCicloAcademico.operation = "update";
                    beanRequestCicloAcademico.type_request = "PUT";
                    openCicloAcademico();
                } else {
                    showAlertTopEnd('warning', 'No se permite editar area del sistema');
                }
            } else {
                showAlertTopEnd('warning', 'No se encontró el registro para poder editar');
            }
        };
    });
    document.querySelectorAll('.eliminar-ciclo_academico').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            ciclo_academicoSelected = findByCicloAcademico(btn.getAttribute('idciclo_academico'));
            if (ciclo_academicoSelected != undefined) {
                if (ciclo_academicoSelected.idciclo_academico != 1) {
                    beanRequestCicloAcademico.operation = "delete";
                    beanRequestCicloAcademico.type_request = "DELETE";
                    //MODAL ELIMINAR
                    showAlertDelete('modalCargandoCicloAcademico')
                } else {
                    showAlertTopEnd('warning', 'No se permite eliminar area del sistema');
                }
            }

        };
    });

    document.querySelectorAll('.click-selection-area').forEach(function (element) {
        element.onclick = function () {
            if (this.classList.contains('row-selected-celeste-claro')) {
                this.classList.remove('row-selected-celeste-claro');
                ciclo_academicoSelected = new CicloAcademico();
            } else {
                ciclo_academicoSelected = findByCicloAcademico(this.getAttribute('idciclo_academico'));
                this.parentElement.childNodes.forEach(function (element) {
                    element.classList.remove('row-selected-celeste-claro');
                });
                this.classList.add('row-selected-celeste-claro');
            }
        }
    });
}

function findByCicloAcademico(idciclo_academico) {
    let ciclo_academico_;
    beanPaginationCicloAcademico.list.forEach(ciclo_academico => {
        if (idciclo_academico == ciclo_academico.idciclo_academico) {
            ciclo_academico_ = ciclo_academico;
            return;
        }
    });
    return ciclo_academico_;
}

function validateFormCicloAcademico() {
    if (document.querySelector("#txtNombreCicloAcademico").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese nombre');
        document.querySelector("#txtNombreCicloAcademico").focus();
        return false;
    }
    if (document.querySelector("#txtAbreviaturaCicloAcademico").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese abreviatura');
        document.querySelector("#txtAbreviaturaCicloAcademico").focus();
        return false;
    }
    if (document.querySelector("#txtPuntajeMinimoCicloAcademico").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese puntaje mínimo');
        document.querySelector("#txtPuntajeMinimoCicloAcademico").focus();
        return false;
    }
    if (document.querySelector("#txtPuntajeMaximoCicloAcademico").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese puntaje máximo');
        document.querySelector("#txtPuntajeMaximoCicloAcademico").focus();
        return false;
    }
    return true;
}

function clearCicloAcademico() {
    document.querySelector("#txtNombreCicloAcademico").value = "";
    document.querySelector("#txtDescripcionCicloAcademico").value = "";
    document.querySelector("#txtAbreviaturaCicloAcademico").value = "";
    document.querySelector("#txtPuntajeMinimoCicloAcademico").value = "";
    document.querySelector("#txtPuntajeMaximoCicloAcademico").value = "";
}

function openCicloAcademico() {
    document.querySelector("#txtNombreCicloAcademico").value = ciclo_academicoSelected.nombre;
    document.querySelector("#txtDescripcionCicloAcademico").value = ciclo_academicoSelected.descripcion;
    document.querySelector("#txtAbreviaturaCicloAcademico").value = ciclo_academicoSelected.abreviatura;
    document.querySelector("#txtPuntajeMinimoCicloAcademico").value = ciclo_academicoSelected.puntaje_minimo;
    document.querySelector("#txtPuntajeMaximoCicloAcademico").value = ciclo_academicoSelected.puntaje_maximo;
    document.querySelector("#txtTituloModalManArePsi").innerHTML = "Editar Area";
    $('#ventanaModalManCicloAcademico').modal('show');
    document.querySelector("#txtNombreCicloAcademico").focus();
}