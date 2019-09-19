var beanPaginationAreaPsi;
var area_psiSelected;
var beanRequestAreaPsi = new BeanRequest();

class AreaPsi {
    constructor() {
        this.idarea_psi = 0;
    }
}

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestAreaPsi.entity_api = "api/area/psi";
    beanRequestAreaPsi.operation = "paginate";
    beanRequestAreaPsi.type_request = "GET";

    $('#FrmAreaPsi').submit(function (event) {
        beanRequestAreaPsi.operation = "paginate";
        beanRequestAreaPsi.type_request = "GET";
        $('#modalCargandoAreaPsi').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $('#FrmAreaPsiModal').submit(function (event) {
        if (validateFormAreaPsi()) {
            $('#modalCargandoAreaPsi').modal('show');
        }
        event.preventDefault();
        event.stopPropagation();
    });

    document.querySelector("#btnOpenNewAreaPsi").onclick = function () {
        //CONFIGURAMOS LA SOLICITUD
        beanRequestAreaPsi.operation = "add";
        beanRequestAreaPsi.type_request = "POST";
        //LIMPIAR LOS CAMPOS
        clearArea();
        document.querySelector("#txtTituloModalManAreaPsi").innerHTML = "Registrar Area";
        $('#ventanaModalManAreaPsi').modal('show');
        document.querySelector("#txtNombreAreaPsi").focus();
    };

    document.querySelector("#btnSeleccionarAreaPsi").onclick = function () {
        $('#ventanaModalAreaPsi').modal('show');
    };

    $("#modalCargandoAreaPsi").on('shown.bs.modal', function () {
        processAjaxAreaPsi();
    });

    $("#ventanaModalAreaPsi").on('shown.bs.modal', function () {
        $('#modalCargandoAreaPsi').modal('show');
    });

    $("#ventanaModalAreaPsi").on('hidden.bs.modal', function () {
        beanRequestAreaPsi.operation = "paginate";
        beanRequestAreaPsi.type_request = "GET";
    });

    $("#sizePageAreaPsi").change(function () {
        $('#modalCargandoAreaPsi').modal('show');
    });

    document.querySelector("#btn-selecionar-area-psi").onclick = function () {
        if (area_psiSelected.idarea_psi != 0) {
            setAreaSelectedSubArea();
        } else {
            showAlertTopEnd('warning', 'Por favor seleccione una area');
        }
    };

});

function setAreaSelectedSubArea() {
    document.querySelector("#txtAreaSubAreaPsi").value = area_psiSelected.nombre;
    $('#ventanaModalAreaPsi').modal('hide');
}

function processAjaxAreaPsi() {
    let parameters_pagination = "";
    let json = "";
    let url_request = getHostAPI() + beanRequestAreaPsi.entity_api + "/" + beanRequestAreaPsi.operation;
    switch (beanRequestAreaPsi.operation) {
        case "add":
            json = {
                "idarea_psi": 0,
                "nombre": document.querySelector("#txtNombreAreaPsi").value,
                "descripcion": document.querySelector("#txtDescripcionAreaPsi").value,
                "abreviatura": document.querySelector("#txtAbreviaturaAreaPsi").value,
                "puntaje_minimo": document.querySelector("#txtPuntajeMinimoAreaPsi").value,
                "puntaje_maximo": document.querySelector("#txtPuntajeMaximoAreaPsi").value,
                "area": {
                    "idarea": getIdAreaUserSession()
                }
            };
            break;
        case "update":
            json = {
                "idarea_psi": area_psiSelected.idarea_psi,
                "nombre": document.querySelector("#txtNombreAreaPsi").value,
                "descripcion": document.querySelector("#txtDescripcionAreaPsi").value,
                "abreviatura": document.querySelector("#txtAbreviaturaAreaPsi").value,
                "puntaje_minimo": document.querySelector("#txtPuntajeMinimoAreaPsi").value,
                "puntaje_maximo": document.querySelector("#txtPuntajeMaximoAreaPsi").value,
                "area": {
                    "idarea": getIdAreaUserSession()
                }
            };
            break;
        case "delete":
            url_request += "/" + area_psiSelected.idarea_psi;
            break;
        default:
            parameters_pagination += "?filter=" + document.querySelector("#txtFilterAreaPsi").value.toUpperCase();
            parameters_pagination += "&idarea=" + getIdAreaUserSession();
            parameters_pagination += "&page=" + document.querySelector("#pageAreaPsi").value;
            parameters_pagination += "&size=" + document.querySelector("#sizePageAreaPsi").value;
            url_request += parameters_pagination;
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestAreaPsi.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoAreaPsi').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
                $('#ventanaModalManAreaPsi').modal('hide');
                $('#FrmAreaPsi').submit();
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationAreaPsi = beanCrudResponse.beanPagination;
            toListAreaPsi(beanPaginationAreaPsi);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#ventanaModalManAreaPsi').modal("hide");
        showAlertErrorRequest();

    });
}

function toListAreaPsi(beanPagination) {
    document.querySelector("#tbodyAreaPsi").innerHTML = "";
    document.querySelector("#titleManagerAreaPsi").innerHTML = "[ " + beanPagination.count_filter + " ] AREAS";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(area_psi => {
            row = "<tr class='click-selection-area sisbu-cursor-mano' idarea_psi='" + area_psi.idarea_psi + "'>";
            row += "<td class='align-middle'>" + area_psi.nombre + "</td>";
            row +=
                    `
                <td>
                    <ul class="dt-list dt-list-cm-0">
                        <li class="dt-list__item">
                            <a idarea_psi='${area_psi.idarea_psi}' class="text-light-gray editar-area_psi" href="javascript:void(0)">
                                <i class="icon icon-editors "></i>
                            </a>
                        </li>
                        <li class="dt-list__item">
                            <a idarea_psi='${area_psi.idarea_psi}' class="text-light-gray eliminar-area_psi" href="javascript:void(0)">
                                <i class="icon icon-trash-filled"></i>
                            </a>
                        </li>
                    </ul>
                </td>
            `;
            row += "</tr>";
            document.querySelector("#tbodyAreaPsi").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageAreaPsi").value),
                document.querySelector("#pageAreaPsi"),
                $('#modalCargandoAreaPsi'),
                $('#paginationAreaPsi'));
        addEventsAreaPsies();
        if (beanRequestAreaPsi.operation == "paginate") {
            document.querySelector("#txtFilterAreaPsi").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationAreaPsi'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterAreaPsi").focus();
    }
}

function addEventsAreaPsies() {
    document.querySelectorAll('.editar-area_psi').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            area_psiSelected = findByAreaPsi(btn.getAttribute('idarea_psi'));
            if (area_psiSelected != undefined) {
                if (area_psiSelected.idarea_psi != 1) {
                    beanRequestAreaPsi.operation = "update";
                    beanRequestAreaPsi.type_request = "PUT";
                    openArea();
                } else {
                    showAlertTopEnd('warning', 'No se permite editar area del sistema');
                }
            } else {
                showAlertTopEnd('warning', 'No se encontró el registro para poder editar');
            }
        };
    });
    document.querySelectorAll('.eliminar-area_psi').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            area_psiSelected = findByAreaPsi(btn.getAttribute('idarea_psi'));
            if (area_psiSelected != undefined) {
                if (area_psiSelected.idarea_psi != 1) {
                    beanRequestAreaPsi.operation = "delete";
                    beanRequestAreaPsi.type_request = "DELETE";
                    //MODAL ELIMINAR
                    showAlertDelete('modalCargandoAreaPsi')
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
                area_psiSelected = new AreaPsi();
            } else {
                area_psiSelected = findByAreaPsi(this.getAttribute('idarea_psi'));
                this.parentElement.childNodes.forEach(function (element) {
                    element.classList.remove('row-selected-celeste-claro');
                });
                this.classList.add('row-selected-celeste-claro');
            }
        }
    });
}

function findByAreaPsi(idarea_psi) {
    let area_psi_;
    beanPaginationAreaPsi.list.forEach(area_psi => {
        if (idarea_psi == area_psi.idarea_psi) {
            area_psi_ = area_psi;
            return;
        }
    });
    return area_psi_;
}

function validateFormAreaPsi() {
    if (document.querySelector("#txtNombreAreaPsi").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese nombre');
        document.querySelector("#txtNombreAreaPsi").focus();
        return false;
    }
    if (document.querySelector("#txtAbreviaturaAreaPsi").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese abreviatura');
        document.querySelector("#txtAbreviaturaAreaPsi").focus();
        return false;
    }
    if (document.querySelector("#txtPuntajeMinimoAreaPsi").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese puntaje mínimo');
        document.querySelector("#txtPuntajeMinimoAreaPsi").focus();
        return false;
    }
    if (document.querySelector("#txtPuntajeMaximoAreaPsi").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese puntaje máximo');
        document.querySelector("#txtPuntajeMaximoAreaPsi").focus();
        return false;
    }
    return true;
}

function clearArea() {
    document.querySelector("#txtNombreAreaPsi").value = "";
    document.querySelector("#txtDescripcionAreaPsi").value = "";
    document.querySelector("#txtAbreviaturaAreaPsi").value = "";
    document.querySelector("#txtPuntajeMinimoAreaPsi").value = "";
    document.querySelector("#txtPuntajeMaximoAreaPsi").value = "";
}

function openArea() {
    document.querySelector("#txtNombreAreaPsi").value = area_psiSelected.nombre;
    document.querySelector("#txtDescripcionAreaPsi").value = area_psiSelected.descripcion;
    document.querySelector("#txtAbreviaturaAreaPsi").value = area_psiSelected.abreviatura;
    document.querySelector("#txtPuntajeMinimoAreaPsi").value = area_psiSelected.puntaje_minimo;
    document.querySelector("#txtPuntajeMaximoAreaPsi").value = area_psiSelected.puntaje_maximo;
    document.querySelector("#txtTituloModalManArePsi").innerHTML = "Editar Area";
    $('#ventanaModalManAreaPsi').modal('show');
    document.querySelector("#txtNombreAreaPsi").focus();
}