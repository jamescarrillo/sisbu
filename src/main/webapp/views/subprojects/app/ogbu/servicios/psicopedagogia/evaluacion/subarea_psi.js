/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var beanPaginationSubAreaPsi;
var subarea_psiSelected;
var beanRequestSubAreaPsi = new BeanRequest();

class SubAreaPsi {
    constructor() {
        this.idsubarea_psi = 0;
    }
}
;

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestSubAreaPsi.entity_api = "api/subarea/psi";
    beanRequestSubAreaPsi.operation = "paginate";
    beanRequestSubAreaPsi.type_request = "GET";

    $('#FrmSubAreaPsi').submit(function (event) {
        beanRequestSubAreaPsi.operation = "paginate";
        beanRequestSubAreaPsi.type_request = "GET";
        $('#modalCargandoSubAreaPsi').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $('#FrmSubAreaPsiModal').submit(function (event) {
        try {
            if (validateFormSubAreaPsi()) {
                $('#modalCargandoSubAreaPsi').modal('show');
            }
        } catch (e) {
            console.log(e);
        }

        event.preventDefault();
        event.stopPropagation();
    });

    document.querySelector("#btnOpenNewSubAreaPsi").onclick = function () {
        //CONFIGURAMOS LA SOLICITUD
        beanRequestSubAreaPsi.operation = "add";
        beanRequestSubAreaPsi.type_request = "POST";
        //LIMPIAR LOS CAMPOS
        clearSubArea();
        document.querySelector("#txtTituloModalManArePsi").innerHTML = "Registrar SubArea";
        $('#ventanaModalManSubAreaPsi').modal('show');
        document.querySelector("#txtNombreSubAreaPsi").focus();
    };

    document.querySelector("#btnSeleccionarSubArea").onclick = function () {
        $('#ventanaModalSubAreaPsi').modal('show');
    };

    $("#modalCargandoSubAreaPsi").on('shown.bs.modal', function () {
        processAjaxSubAreaPsi();
    });

    $("#ventanaModalSubAreaPsi").on('shown.bs.modal', function () {
        $('#modalCargandoSubAreaPsi').modal('show');
    });

    $("#ventanaModalSubAreaPsi").on('hidden.bs.modal', function () {
        beanRequestSubAreaPsi.operation = "paginate";
        beanRequestSubAreaPsi.type_request = "GET";
    });

    $("#sizePageSubAreaPsi").change(function () {
        $('#modalCargandoSubAreaPsi').modal('show');
    });

    document.querySelector("#btn-selecionar-subarea-psi").onclick = function () {
        if (subarea_psiSelected.idsubarea_psi != 0) {
            setSubAreaSelectedPregunta();
        } else {
            showAlertTopEnd('warning', 'Por favor seleccione una subarea');
        }
    };

});

function setSubAreaSelectedPregunta() {
    document.querySelector("#txtSubAreaPregunta").value = subarea_psiSelected.nombre;
    $('#ventanaModalSubAreaPsi').modal('hide');
}

function processAjaxSubAreaPsi() {
    let parameters_pagination = "";
    let json = "";
    let url_request = getHostAPI() + beanRequestSubAreaPsi.entity_api + "/" + beanRequestSubAreaPsi.operation;
    switch (beanRequestSubAreaPsi.operation) {
        case "add":
            json = {
                "idsubarea_psi": 0,
                "nombre": document.querySelector("#txtNombreSubAreaPsi").value,
                "descripcion": document.querySelector("#txtDescripcionSubAreaPsi").value,
                "abreviatura": document.querySelector("#txtAbreviaturaSubAreaPsi").value,
                "puntaje_minimo": document.querySelector("#txtPuntajeMinimoSubAreaPsi").value,
                "puntaje_maximo": document.querySelector("#txtPuntajeMaximoSubAreaPsi").value,
                "area_psi": {
                    "idarea_psi": area_psiSelected.idarea_psi
                }
            };
            break;
        case "update":
            json = {
                "idsubarea_psi": subarea_psiSelected.idsubarea_psi,
                "nombre": document.querySelector("#txtNombreSubAreaPsi").value,
                "descripcion": document.querySelector("#txtDescripcionSubAreaPsi").value,
                "abreviatura": document.querySelector("#txtAbreviaturaSubAreaPsi").value,
                "puntaje_minimo": document.querySelector("#txtPuntajeMinimoSubAreaPsi").value,
                "puntaje_maximo": document.querySelector("#txtPuntajeMaximoSubAreaPsi").value,
                "area_psi": {
                    "idarea_psi": area_psiSelected.idarea_psi
                }
            };
            break;
        case "delete":
            url_request += "/" + subarea_psiSelected.idsubarea_psi;
            break;
        default:
            parameters_pagination += "?filter=" + document.querySelector("#txtFilterSubAreaPsi").value.toUpperCase();
            parameters_pagination += "&idarea=" + getIdAreaUserSession();
            parameters_pagination += "&page=" + document.querySelector("#pageSubAreaPsi").value;
            parameters_pagination += "&size=" + document.querySelector("#sizePageSubAreaPsi").value;
            url_request += parameters_pagination;
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestSubAreaPsi.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoSubAreaPsi').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
                $('#ventanaModalManSubAreaPsi').modal('hide');
                $('#FrmSubAreaPsi').submit();
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationSubAreaPsi = beanCrudResponse.beanPagination;
            toListSubAreaPsi(beanPaginationSubAreaPsi);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoSubAreaPsi').modal("hide");
        showAlertErrorRequest();

    });
}

function toListSubAreaPsi(beanPagination) {
    document.querySelector("#tbodySubAreaPsi").innerHTML = "";
    document.querySelector("#titleManagerSubAreaPsi").innerHTML = "[ " + beanPagination.count_filter + " ] SUBAREAS";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(subarea_psi => {
            row = "<tr class='click-selection-subarea sisbu-cursor-mano' idsubarea_psi='" + subarea_psi.idsubarea_psi + "'>";
            row += "<td class='align-middle'>" + subarea_psi.nombre + "</td>";
            row +=
                    `
                <td>
                    <ul class="dt-list dt-list-cm-0">
                        <li class="dt-list__item">
                            <a idsubarea_psi='${subarea_psi.idsubarea_psi}' class="text-light-gray editar-subarea_psi" href="javascript:void(0)">
                                <i class="icon icon-editors "></i>
                            </a>
                        </li>
                        <li class="dt-list__item">
                            <a idsubarea_psi='${subarea_psi.idsubarea_psi}' class="text-light-gray eliminar-subarea_psi" href="javascript:void(0)">
                                <i class="icon icon-trash-filled"></i>
                            </a>
                        </li>
                    </ul>
                </td>
            `;
            row += "</tr>";
            document.querySelector("#tbodySubAreaPsi").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageSubAreaPsi").value),
                document.querySelector("#pageSubAreaPsi"),
                $('#modalCargandoSubAreaPsi'),
                $('#paginationSubAreaPsi'));
        addEventsSubAreaPsies();
        if (beanRequestSubAreaPsi.operation == "paginate") {
            document.querySelector("#txtFilterSubAreaPsi").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationSubAreaPsi'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterSubAreaPsi").focus();
    }
}

function addEventsSubAreaPsies() {
    document.querySelectorAll('.editar-subarea_psi').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            subarea_psiSelected = findBySubAreaPsi(btn.getAttribute('idsubarea_psi'));
            if (subarea_psiSelected != undefined) {
                if (subarea_psiSelected.idsubarea_psi != 1) {
                    beanRequestSubAreaPsi.operation = "update";
                    beanRequestSubAreaPsi.type_request = "PUT";
                    openSubArea();
                } else {
                    showAlertTopEnd('warning', 'No se permite editar subarea del sistema');
                }
            } else {
                showAlertTopEnd('warning', 'No se encontró el registro para poder editar');
            }
        };
    });
    document.querySelectorAll('.eliminar-subarea_psi').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            subarea_psiSelected = findBySubAreaPsi(btn.getAttribute('idsubarea_psi'));
            if (subarea_psiSelected != undefined) {
                if (subarea_psiSelected.idsubarea_psi != 1) {
                    beanRequestSubAreaPsi.operation = "delete";
                    beanRequestSubAreaPsi.type_request = "DELETE";
                    showAlertDelete('modalCargandoSubAreaPsi')
                } else {
                    showAlertTopEnd('warning', 'No se permite eliminar subarea del sistema');
                }
            }

        };
    });

    document.querySelectorAll('.click-selection-subarea').forEach(function (element) {
        element.onclick = function () {
            if (this.classList.contains('row-selected-celeste-claro')) {
                this.classList.remove('row-selected-celeste-claro');
                subarea_psiSelected = new SubAreaPsi();
            } else {
                subarea_psiSelected = findBySubAreaPsi(this.getAttribute('idsubarea_psi'));
                this.parentElement.childNodes.forEach(function (element) {
                    element.classList.remove('row-selected-celeste-claro');
                });
                this.classList.add('row-selected-celeste-claro');
            }
        }
    });
}

function findBySubAreaPsi(idsubarea_psi) {
    let subarea_psi_;
    beanPaginationSubAreaPsi.list.forEach(subarea_psi => {
        if (idsubarea_psi == subarea_psi.idsubarea_psi) {
            subarea_psi_ = subarea_psi;
            return;
        }
    });
    return subarea_psi_;
}

function validateFormSubAreaPsi() {
    if (document.querySelector("#txtNombreSubAreaPsi").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese nombre');
        document.querySelector("#txtNombreSubAreaPsi").focus();
        return false;
    }
    if (document.querySelector("#txtAbreviaturaSubAreaPsi").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese abreviatura');
        document.querySelector("#txtAbreviaturaSubAreaPsi").focus();
        return false;
    }
    if (document.querySelector("#txtPuntajeMinimoSubAreaPsi").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese puntaje mínimo');
        document.querySelector("#txtPuntajeMinimoSubAreaPsi").focus();
        return false;
    }
    if (document.querySelector("#txtPuntajeMaximoSubAreaPsi").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese puntaje máximo');
        document.querySelector("#txtPuntajeMaximoSubAreaPsi").focus();
        return false;
    }
    if (area_psiSelected == undefined) {
        showAlertTopEnd('warning', 'Por favor seleccione un area');
        return false;
    }
    if (area_psiSelected.idarea_psi == 0) {
        showAlertTopEnd('warning', 'Por favor seleccione un area correctamente');
        return false;
    }
    return true;
}

function clearSubArea() {
    document.querySelector("#txtNombreSubAreaPsi").value = "";
    document.querySelector("#txtDescripcionSubAreaPsi").value = "";
    document.querySelector("#txtAbreviaturaSubAreaPsi").value = "";
    document.querySelector("#txtPuntajeMinimoSubAreaPsi").value = "";
    document.querySelector("#txtPuntajeMaximoSubAreaPsi").value = "";
    document.querySelector("#txtAreaSubAreaPsi").value = "";
}

function openSubArea() {
    document.querySelector("#txtNombreSubAreaPsi").value = subarea_psiSelected.nombre;
    document.querySelector("#txtDescripcionSubAreaPsi").value = subarea_psiSelected.descripcion;
    document.querySelector("#txtAbreviaturaSubAreaPsi").value = subarea_psiSelected.abreviatura;
    document.querySelector("#txtPuntajeMinimoSubAreaPsi").value = subarea_psiSelected.puntaje_minimo;
    document.querySelector("#txtPuntajeMaximoSubAreaPsi").value = subarea_psiSelected.puntaje_maximo;
    document.querySelector("#txtAreaSubAreaPsi").value = subarea_psiSelected.area_psi.nombre;
    document.querySelector("#txtTituloModalManArePsi").innerHTML = "Editar SubArea";
    $('#ventanaModalManSubAreaPsi').modal('show');
    document.querySelector("#txtNombreSubAreaPsi").focus();
}