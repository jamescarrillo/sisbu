var beanPaginationCriticoPsi;
var critico_psiSelected;
var beanRequestCriticoPsi = new BeanRequest();

class CriticoPsi {
    constructor() {
        this.idcritico_psi = 0;
    }
}

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestCriticoPsi.entity_api = "api/critico/psi";
    beanRequestCriticoPsi.operation = "paginate";
    beanRequestCriticoPsi.type_request = "GET";

    $('#FrmCriticoPsi').submit(function (event) {
        beanRequestCriticoPsi.operation = "paginate";
        beanRequestCriticoPsi.type_request = "GET";
        $('#modalCargandoCriticoPsi').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $('#FrmCriticoPsiModal').submit(function (event) {
        if (validateFormCriticoPsi()) {
            $('#modalCargandoCriticoPsi').modal('show');
        }
        event.preventDefault();
        event.stopPropagation();
    });

    document.querySelector("#btnOpenNewCriticoPsi").onclick = function () {
        //CONFIGURAMOS LA SOLICITUD
        beanRequestCriticoPsi.operation = "add";
        beanRequestCriticoPsi.type_request = "POST";
        //LIMPIAR LOS CAMPOS
        clearCriticoPsi();
        document.querySelector("#txtTituloModalManCriticoPsi").innerHTML = "Registrar Items Criticos";
        $('#ventanaModalManCriticoPsi').modal('show');
        document.querySelector("#txtNombreCriticoPsi").focus();
    };

    $("#modalCargandoCriticoPsi").on('shown.bs.modal', function () {
        processAjaxCriticoPsi();
    });

    $("#ventanaModalCriticoPsi").on('shown.bs.modal', function () {
        $('#modalCargandoCriticoPsi').modal('show');
    });

    $("#ventanaModalCriticoPsi").on('hidden.bs.modal', function () {
        beanRequestCriticoPsi.operation = "paginate";
        beanRequestCriticoPsi.type_request = "GET";
    });

    document.querySelector("#btnSeleccionarPregunta1").onclick = function () {
        type_and_num_pregunta = "C1";
        $('#ventanaModalSelectedPreguntaC').modal('show');
    };

    document.querySelector("#btnSeleccionarPregunta2").onclick = function () {
        type_and_num_pregunta = "C2";
        $('#ventanaModalSelectedPreguntaC').modal('show');
    };

    $("#sizePageCriticoPsi").change(function () {
        $('#modalCargandoCriticoPsi').modal('show');
    });

});

function processAjaxCriticoPsi() {
    let parameters_pagination = "";
    let json = "";
    let url_request = getHostAPI() + beanRequestCriticoPsi.entity_api + "/" + beanRequestCriticoPsi.operation;
    switch (beanRequestCriticoPsi.operation) {
        case "add":
            json = {
                "idcritico_psi": 0,
                "nombre": document.querySelector("#txtNombreCriticoPsi").value,
                "descripcion": document.querySelector("#txtDescripcionCriticoPsi").value,
                "pregunta_hn1": preguntaCSelected1,
                "pregunta_hn2": preguntaCSelected2
            };
            break;
        case "update":
            json = {
                "idcritico_psi": critico_psiSelected.idcritico_psi,
                "nombre": document.querySelector("#txtNombreCriticoPsi").value,
                "descripcion": document.querySelector("#txtDescripcionCriticoPsi").value,
                "pregunta_hn1": preguntaCSelected1,
                "pregunta_hn2": preguntaCSelected2
            };
            break;
        case "delete":
            url_request += "/" + critico_psiSelected.idcritico_psi;
            break;
        default:
            parameters_pagination += "?idprocedimiento=" + evaluacionSelected.idprocedimiento;
            parameters_pagination += "&page=" + document.querySelector("#pageCriticoPsi").value;
            parameters_pagination += "&size=" + document.querySelector("#sizePageCriticoPsi").value;
            url_request += parameters_pagination;
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestCriticoPsi.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoCriticoPsi').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
                $('#ventanaModalManCriticoPsi').modal('hide');
                $('#FrmCriticoPsi').submit();
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationCriticoPsi = beanCrudResponse.beanPagination;
            toListCriticoPsi(beanPaginationCriticoPsi);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#ventanaModalManCriticoPsi').modal("hide");
        $('#modalCargandoCriticoPsi').modal("hide");
        showAlertErrorRequest();

    });
}

function toListCriticoPsi(beanPagination) {
    document.querySelector("#tbodyCriticoPsi").innerHTML = "";
    document.querySelector("#titleManagerCriticoPsi").innerHTML = "[ " + beanPagination.count_filter + " ] ITEMS CRITICOS";
    if (beanPagination.count_filter > 0) {
        let row;
        let cadena_preguntas;
        beanPagination.list.forEach(critico_psi => {
            cadena_preguntas = critico_psi.pregunta_hn1.orden + ". ";
            cadena_preguntas += critico_psi.pregunta_hn1.enunciado;
            cadena_preguntas += "<br>" + critico_psi.pregunta_hn2.orden + ". ";
            cadena_preguntas += critico_psi.pregunta_hn2.enunciado;
            row = "<tr class='sisbu-cursor-mano' idcritico_psi='" + critico_psi.idcritico_psi + "'>";
            row += "<td class='align-middle'>" + critico_psi.nombre + "<br>" + critico_psi.descripcion + "</td>";
            row += "<td class='align-middle'>" + cadena_preguntas + "</td>";
            row +=
                    `
                <td>
                    <ul class="dt-list dt-list-cm-0">
                        <li class="dt-list__item">
                            <a idcritico_psi='${critico_psi.idcritico_psi}' class="text-light-gray editar-critico_psi" href="javascript:void(0)">
                                <i class="icon icon-editors "></i>
                            </a>
                        </li>
                        <li class="dt-list__item">
                            <a idcritico_psi='${critico_psi.idcritico_psi}' class="text-light-gray eliminar-critico_psi" href="javascript:void(0)">
                                <i class="icon icon-trash-filled"></i>
                            </a>
                        </li>
                    </ul>
                </td>
            `;
            row += "</tr>";
            document.querySelector("#tbodyCriticoPsi").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageCriticoPsi").value),
                document.querySelector("#pageCriticoPsi"),
                $('#modalCargandoCriticoPsi'),
                $('#paginationCriticoPsi'));
        addEventsCriticoPsies();
        if (beanRequestCriticoPsi.operation == "paginate") {
            document.querySelector("#txtFilterCriticoPsi").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationCriticoPsi'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterCriticoPsi").focus();
    }
}

function addEventsCriticoPsies() {
    document.querySelectorAll('.editar-critico_psi').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            critico_psiSelected = findByCriticoPsi(btn.getAttribute('idcritico_psi'));
            if (critico_psiSelected != undefined) {
                beanRequestCriticoPsi.operation = "update";
                beanRequestCriticoPsi.type_request = "PUT";
                openCriticoPsi();
            } else {
                showAlertTopEnd('warning', 'No se encontró el registro para poder editar');
            }
        };
    });
    document.querySelectorAll('.eliminar-critico_psi').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            critico_psiSelected = findByCriticoPsi(btn.getAttribute('idcritico_psi'));
            if (critico_psiSelected != undefined) {
                beanRequestCriticoPsi.operation = "delete";
                beanRequestCriticoPsi.type_request = "DELETE";
                //MODAL ELIMINAR
                showAlertDelete('modalCargandoCriticoPsi');
            } else {
                showAlertTopEnd('warning', 'No se encontró el registro para poder eliminar');
            }

        };
    });
}

function findByCriticoPsi(idcritico_psi) {
    let critico_psi_;
    beanPaginationCriticoPsi.list.forEach(critico_psi => {
        if (idcritico_psi == critico_psi.idcritico_psi) {
            critico_psi_ = critico_psi;
            return;
        }
    });
    return critico_psi_;
}

function validateFormCriticoPsi() {
    if (document.querySelector("#txtNombreCriticoPsi").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese nombre');
        document.querySelector("#txtNombreCriticoPsi").focus();
        return false;
    }
    if (preguntaCSelected1 == undefined) {
        showAlertTopEnd('warning', 'Por favor seleccione la pregunta 1');
        return false;
    }
    if (preguntaCSelected1.idpregunta == 0) {
        showAlertTopEnd('warning', 'Por favor seleccione correctamente la pregunta 1');
        return false;
    }
    if (preguntaCSelected2 == undefined) {
        showAlertTopEnd('warning', 'Por favor seleccione la pregunta 2');
        return false;
    }
    if (preguntaCSelected2.idpregunta == 0) {
        showAlertTopEnd('warning', 'Por favor seleccione correctamente la pregunta 2');
        return false;
    }
    //VERIFICAMOS QUE LAS PREGUNTAS SEAN DIFERENTES
    if (preguntaCSelected1.idpregunta == preguntaCSelected2.idpregunta) {
        showAlertTopEnd('warning', 'Por favor seleccione 2 preguntas distintas');
        return false;
    }
    ;
    return true;
}

function clearCriticoPsi() {
    document.querySelector("#txtNombreCriticoPsi").value = "";
    document.querySelector("#txtDescripcionCriticoPsi").value = "";
    preguntaCSelected1 = undefined;
    preguntaCSelected2 = undefined;
    document.querySelector("#txtPreguta1CriticoPsi").value = "";
    document.querySelector("#txtPreguta2CriticoPsi").value = "";
}

function openCriticoPsi() {
    document.querySelector("#txtNombreCriticoPsi").value = critico_psiSelected.nombre;
    document.querySelector("#txtDescripcionCriticoPsi").value = critico_psiSelected.descripcion;
    preguntaCSelected1 = critico_psiSelected.pregunta_hn1;
    preguntaCSelected2 = critico_psiSelected.pregunta_hn2;
    document.querySelector("#txtPreguta1CriticoPsi").value = preguntaCSelected1.orden + ". " + preguntaCSelected1.enunciado;
    document.querySelector("#txtPreguta2CriticoPsi").value = preguntaCSelected2.orden + ". " + preguntaCSelected2.enunciado;
    document.querySelector("#txtTituloModalManCriticoPsi").innerHTML = "Editar Items Criticos";
    $('#ventanaModalManCriticoPsi').modal('show');
    document.querySelector("#txtNombreCriticoPsi").focus();
}