var beanPaginationInconsistenciaPsi;
var inconsistencia_psiSelected;
var beanRequestInconsistenciaPsi = new BeanRequest();

class InconsistenciaPsi {
    constructor() {
        this.idinconsistencia_psi = 0;
    }
}

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestInconsistenciaPsi.entity_api = "api/inconsistencia/psi";
    beanRequestInconsistenciaPsi.operation = "paginate";
    beanRequestInconsistenciaPsi.type_request = "GET";

    $('#FrmInconsistenciaPsi').submit(function (event) {
        beanRequestInconsistenciaPsi.operation = "paginate";
        beanRequestInconsistenciaPsi.type_request = "GET";
        $('#modalCargandoInconsistenciaPsi').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $('#FrmInconsistenciaPsiModal').submit(function (event) {
        try {
            if (validateFormInconsistenciaPsi()) {
                $('#modalCargandoInconsistenciaPsi').modal('show');
            }
        } catch (e) {
            console.log(e);
        }   
        event.preventDefault();
        event.stopPropagation();
    });

    document.querySelector("#btnOpenNewInconsistenciaPsi").onclick = function () {
        //CONFIGURAMOS LA SOLICITUD
        beanRequestInconsistenciaPsi.operation = "add";
        beanRequestInconsistenciaPsi.type_request = "POST";
        //LIMPIAR LOS CAMPOS
        clearInconsistenciaPsi();
        document.querySelector("#txtTituloModalManInconsistenciaPsi").innerHTML = "Registrar Items Criticos";
        $('#ventanaModalManInconsistenciaPsi').modal('show');
        //document.querySelector("#txtNombreInconsistenciaPsi").focus();
    };

    $("#modalCargandoInconsistenciaPsi").on('shown.bs.modal', function () {
        processAjaxInconsistenciaPsi();
    });

    $("#ventanaModalInconsistenciaPsi").on('shown.bs.modal', function () {
        $('#modalCargandoInconsistenciaPsi').modal('show');
    });

    $("#ventanaModalInconsistenciaPsi").on('hidden.bs.modal', function () {
        beanRequestInconsistenciaPsi.operation = "paginate";
        beanRequestInconsistenciaPsi.type_request = "GET";
    });

    document.querySelector("#btnSeleccionarPreguntaI1").onclick = function () {
        type_and_num_pregunta = "I1";
        $('#ventanaModalSelectedPreguntaC').modal('show');
    };

    document.querySelector("#btnSeleccionarPreguntaI2").onclick = function () {
        type_and_num_pregunta = "I2";
        $('#ventanaModalSelectedPreguntaC').modal('show');
    };

    $("#sizePageInconsistenciaPsi").change(function () {
        $('#modalCargandoInconsistenciaPsi').modal('show');
    });

});

function processAjaxInconsistenciaPsi() {
    let parameters_pagination = "";
    let json = "";
    let url_request = getHostAPI() + beanRequestInconsistenciaPsi.entity_api + "/" + beanRequestInconsistenciaPsi.operation;
    switch (beanRequestInconsistenciaPsi.operation) {
        case "add":
            json = {
                "idinconsistencia_psi": 0,
                "pregunta_hn1": preguntaISelected1,
                "pregunta_hn2": preguntaISelected2
            };
            break;
        case "update":
            json = {
                "idinconsistencia_psi": inconsistencia_psiSelected.idinconsistencia_psi,
                "pregunta_hn1": preguntaISelected1,
                "pregunta_hn2": preguntaISelected2
            };
            break;
        case "delete":
            url_request += "/" + inconsistencia_psiSelected.idinconsistencia_psi;
            break;
        default:
            parameters_pagination += "?idprocedimiento=" + evaluacionSelected.idprocedimiento;
            parameters_pagination += "&page=" + document.querySelector("#pageInconsistenciaPsi").value;
            parameters_pagination += "&size=" + document.querySelector("#sizePageInconsistenciaPsi").value;
            url_request += parameters_pagination;
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestInconsistenciaPsi.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoInconsistenciaPsi').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
                $('#ventanaModalManInconsistenciaPsi').modal('hide');
                $('#FrmInconsistenciaPsi').submit();
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationInconsistenciaPsi = beanCrudResponse.beanPagination;
            toListInconsistenciaPsi(beanPaginationInconsistenciaPsi);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#ventanaModalManInconsistenciaPsi').modal("hide");
        $('#modalCargandoInconsistenciaPsi').modal("hide");
        showAlertErrorRequest();

    });
}

function toListInconsistenciaPsi(beanPagination) {
    document.querySelector("#tbodyInconsistenciaPsi").innerHTML = "";
    document.querySelector("#titleManagerInconsistenciaPsi").innerHTML = "[ " + beanPagination.count_filter + " ] ITEMS CRITICOS";
    if (beanPagination.count_filter > 0) {
        let row;
        let cadena_preguntas;
        beanPagination.list.forEach(inconsistencia_psi => {
            cadena_preguntas = inconsistencia_psi.pregunta_hn1.orden + ". ";
            cadena_preguntas += inconsistencia_psi.pregunta_hn1.enunciado;
            cadena_preguntas += "<br>" + inconsistencia_psi.pregunta_hn2.orden + ". ";
            cadena_preguntas += inconsistencia_psi.pregunta_hn2.enunciado;
            row = "<tr class='sisbu-cursor-mano' idinconsistencia_psi='" + inconsistencia_psi.idinconsistencia_psi + "'>";
            row += "<td class='align-middle'>" + cadena_preguntas + "</td>";
            row +=
                    `
                <td>
                    <ul class="dt-list dt-list-cm-0">
                        <li class="dt-list__item">
                            <a idinconsistencia_psi='${inconsistencia_psi.idinconsistencia_psi}' class="text-light-gray editar-inconsistencia_psi" href="javascript:void(0)">
                                <i class="icon icon-editors "></i>
                            </a>
                        </li>
                        <li class="dt-list__item">
                            <a idinconsistencia_psi='${inconsistencia_psi.idinconsistencia_psi}' class="text-light-gray eliminar-inconsistencia_psi" href="javascript:void(0)">
                                <i class="icon icon-trash-filled"></i>
                            </a>
                        </li>
                    </ul>
                </td>
            `;
            row += "</tr>";
            document.querySelector("#tbodyInconsistenciaPsi").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageInconsistenciaPsi").value),
                document.querySelector("#pageInconsistenciaPsi"),
                $('#modalCargandoInconsistenciaPsi'),
                $('#paginationInconsistenciaPsi'));
        addEventsInconsistenciaPsies();
        if (beanRequestInconsistenciaPsi.operation == "paginate") {
            document.querySelector("#txtFilterInconsistenciaPsi").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationInconsistenciaPsi'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterInconsistenciaPsi").focus();
    }
}

function addEventsInconsistenciaPsies() {
    document.querySelectorAll('.editar-inconsistencia_psi').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            inconsistencia_psiSelected = findByInconsistenciaPsi(btn.getAttribute('idinconsistencia_psi'));
            if (inconsistencia_psiSelected != undefined) {
                beanRequestInconsistenciaPsi.operation = "update";
                beanRequestInconsistenciaPsi.type_request = "PUT";
                openInconsistenciaPsi();
            } else {
                showAlertTopEnd('warning', 'No se encontró el registro para poder editar');
            }
        };
    });
    document.querySelectorAll('.eliminar-inconsistencia_psi').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            inconsistencia_psiSelected = findByInconsistenciaPsi(btn.getAttribute('idinconsistencia_psi'));
            if (inconsistencia_psiSelected != undefined) {
                beanRequestInconsistenciaPsi.operation = "delete";
                beanRequestInconsistenciaPsi.type_request = "DELETE";
                //MODAL ELIMINAR
                showAlertDelete('modalCargandoInconsistenciaPsi');
            } else {
                showAlertTopEnd('warning', 'No se encontró el registro para poder eliminar');
            }

        };
    });
}

function findByInconsistenciaPsi(idinconsistencia_psi) {
    let inconsistencia_psi_;
    beanPaginationInconsistenciaPsi.list.forEach(inconsistencia_psi => {
        if (idinconsistencia_psi == inconsistencia_psi.idinconsistencia_psi) {
            inconsistencia_psi_ = inconsistencia_psi;
            return;
        }
    });
    return inconsistencia_psi_;
}

function validateFormInconsistenciaPsi() {
    /*
     if (document.querySelector("#txtNombreInconsistenciaPsi").value == "") {
     showAlertTopEnd('warning', 'Por favor ingrese nombre');
     document.querySelector("#txtNombreInconsistenciaPsi").focus();
     return false;
     }
     */
    if (preguntaISelected1 == undefined) {
        showAlertTopEnd('warning', 'Por favor seleccione la pregunta 1');
        return false;
    }
    if (preguntaISelected1.idpregunta == 0) {
        showAlertTopEnd('warning', 'Por favor seleccione correctamente la pregunta 1');
        return false;
    }
    if (preguntaISelected2 == undefined) {
        showAlertTopEnd('warning', 'Por favor seleccione la pregunta 2');
        return false;
    }
    if (preguntaISelected2.idpregunta == 0) {
        showAlertTopEnd('warning', 'Por favor seleccione correctamente la pregunta 2');
        return false;
    }
    //VERIFICAMOS QUE LAS PREGUNTAS SEAN DIFERENTES
    if (preguntaISelected1.idpregunta == preguntaISelected2.idpregunta) {
        showAlertTopEnd('warning', 'Por favor seleccione 2 preguntas distintas');
        return false;
    }
    ;
    return true;
}

function clearInconsistenciaPsi() {
    //document.querySelector("#txtNombreInconsistenciaPsi").value = "";
    //document.querySelector("#txtDescripcionInconsistenciaPsi").value = "";
    preguntaISelected1 = undefined;
    preguntaISelected2 = undefined;
    document.querySelector("#txtPreguta1InconsistenciaPsi").value = "";
    document.querySelector("#txtPreguta2InconsistenciaPsi").value = "";
}

function openInconsistenciaPsi() {
    //document.querySelector("#txtNombreInconsistenciaPsi").value = inconsistencia_psiSelected.nombre;
    //document.querySelector("#txtDescripcionInconsistenciaPsi").value = inconsistencia_psiSelected.descripcion;
    preguntaISelected1 = inconsistencia_psiSelected.pregunta_hn1;
    preguntaISelected2 = inconsistencia_psiSelected.pregunta_hn2;
    document.querySelector("#txtPreguta1InconsistenciaPsi").value = preguntaISelected1.orden + ". " + preguntaISelected1.enunciado;
    document.querySelector("#txtPreguta2InconsistenciaPsi").value = preguntaISelected2.orden + ". " + preguntaISelected2.enunciado;
    document.querySelector("#txtTituloModalManInconsistenciaPsi").innerHTML = "Editar Items Criticos";
    $('#ventanaModalManInconsistenciaPsi').modal('show');
    //document.querySelector("#txtNombreInconsistenciaPsi").focus();
}