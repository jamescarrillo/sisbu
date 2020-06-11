var beanPaginationCita;
var citaSelected;
var beanRequestCita = new BeanRequest();

/*
 var areaSelected;
 var atendidoSelected;
 var personalSelected;
 */

let fecha_solicitud;

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestCita.entity_api = "api/citas";
    beanRequestCita.operation = "paginate";
    beanRequestCita.type_request = "GET";

    document.querySelector("#pageCita").value = 1;

    $('#txtFechaIFilterCita').bootstrapMaterialDatePicker({
        weekStart: 0,
        time: false,
        format: 'DD/MM/YYYY',
        lang: 'es'
    }).on('change', function (e, date) {
        $('#txtFechaFFilterCita').bootstrapMaterialDatePicker('setMinDate', date);
    });

    $('#txtFechaFFilterCita').bootstrapMaterialDatePicker({
        weekStart: 0,
        time: false,
        format: 'DD/MM/YYYY',
        lang: 'es'
    }).on('change', function (e, date) {
        document.querySelector('#btnBuscarCita').dispatchEvent(new Event('click'));
    });

    $('#txtFechaProgramadaDateCita').bootstrapMaterialDatePicker({
        weekStart: 0,
        time: false,
        format: 'DD/MM/YYYY',
        lang: 'es'
    }).on('change', function (e, date) {
    });

    $('#txtFechaProgramadaTimeCita').bootstrapMaterialDatePicker({
        date: false,
        format: 'HH:mm',
        lang: 'es'
    }).on('change', function (e, date) {
    });

    document.querySelector('#btnEliminarFechaIFilterCita').onclick = function () {
        document.querySelector('#txtFechaIFilterCita').value = '';
    };

    document.querySelector('#btnEliminarFechaFFilterCita').onclick = function () {
        document.querySelector('#txtFechaFFilterCita').value = '';
    };

    let current_date = new Date();
    $('#txtFechaIFilterCita').val(getDateJava(current_date));
    $('#txtFechaFFilterCita').val(getDateJava(addDays(current_date, 30)));

    $('#FrmCita').submit(function (event) {
        if (document.querySelector('#txtFechaIFilterCita').value == "" && document.querySelector('#txtFechaFFilterCita').value == "") {
            beanRequestCita.operation = "paginate";
            beanRequestCita.type_request = "GET";
            $('#modalCargandoCita').modal('show');
        } else {
            if (document.querySelector('#txtFechaIFilterCita').value != "" && document.querySelector('#txtFechaFFilterCita').value != "") {
                beanRequestCita.operation = "paginate";
                beanRequestCita.type_request = "GET";
                $('#modalCargandoCita').modal('show');
            } else {
                showAlertTopEnd('warning', 'Por favor ingrese las fechas correctamente para aplicar el filtro');
            }
        }
        event.preventDefault();
        event.stopPropagation();
    });

    $('#FrmCitaModal').submit(function (event) {
        if (validateFormCita()) {
            $('#modalCargandoCita').modal('show');
        }
        event.preventDefault();
        event.stopPropagation();
    });

    document.querySelector("#btnOpenNewCita").onclick = function () {
        //CONFIGURAMOS LA SOLICITUD
        beanRequestCita.operation = "add";
        beanRequestCita.type_request = "POST";
        //LIMPIAR LOS CAMPOS
        clearCita();
        //SET TITLE MODAL
        document.querySelector("#txtTituloModalMan").innerHTML = "REGISTRAR CITA";
        //OPEN MODEL
        $('#ventanaModalCita').modal('show');
    };

    document.querySelector('#btnEliminarFechaProgramadaDateCita').onclick = function () {
        document.querySelector('#txtFechaProgramadaDateCita').value = '';
    };

    document.querySelector('#btnEliminarFechaProgramadaTimeCita').onclick = function () {
        document.querySelector('#txtFechaProgramadaTimeCita').value = '';
    };

    $("#modalCargandoCita").on('shown.bs.modal', function () {
        processAjaxCita();
    });

    $("#ventanaModalCita").on('hidden.bs.modal', function () {
        beanRequestCita.operation = "paginate";
        beanRequestCita.type_request = "GET";
    });

    $("#modalCargandoCita").on('hide.bs.modal', function () {
        beanRequestCita.operation = "paginate";
        beanRequestCita.type_request = "GET";
    });

    $('#modalCargandoCita').modal('show');

    $("#sizePageCita").change(function () {
        $('#modalCargandoCita').modal('show');
    });

    $("#txtTypeRequestCita").change(function () {
        $('#modalCargandoCita').modal('show');
    });

});

function processAjaxCita() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestCita.operation == "paginate") {
        parameters_pagination += "?type_request=" + document.querySelector("#txtTypeRequestCita").value.toLowerCase();
        parameters_pagination += "&idarea=" + document.querySelector("#txtAreaFilterCita").value.toLowerCase();
        parameters_pagination += "&fechai=" + document.querySelector("#txtFechaIFilterCita").value.toLowerCase();
        parameters_pagination += "&fechaf=" + document.querySelector("#txtFechaFFilterCita").value.toLowerCase();
        parameters_pagination += "&page=" + document.querySelector("#pageCita").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePageCita").value;
    } else {
        parameters_pagination = "";
        if (beanRequestCita.operation == "delete") {
            parameters_pagination = "/" + citaSelected.idcita;
        } else {
            let fecha_programada = document.querySelector("#txtFechaProgramadaDateCita").value + " " + document.querySelector("#txtFechaProgramadaTimeCita").value + ":00";
            let fecha_aceptacion = getTimesTampJavaScriptCurrent();
            if (beanRequestCita.operation == "add") {
                citaSelected = {
                    "idcita": 0
                }
                citaSelected.fecha_solicitud = fecha_programada;
            }
            citaSelected.estado_cita = document.querySelector("#txtEstadoCita").value;
            citaSelected.estado_solicitud = "ACE";
            json = {
                "fecha_solicitud": citaSelected.fecha_solicitud,
                "fecha_aceptacion": fecha_aceptacion,
                "fecha_programada": fecha_programada,
                "fecha_atendida": null,
                "estado_solicitud": citaSelected.estado_solicitud,
                "estado_cita": citaSelected.estado_cita,
                "motivo": document.querySelector("#txtMotivoCita").value,
                "observacion_programacion": document.querySelector("#txtObservacionProgramacionCita").value,
                "observacion_atencion": document.querySelector("#txtObservacionAtencion").value,
                "atendido": {
                    "idatendido": atendidoSelected.idatendido,
                    "usuario": {
                        "idusuario": atendidoSelected.usuario.idusuario
                    }
                },
                "area": areaSelected,
                "personal": {
                    "idpersonal": personalSelected.idpersonal
                },
            };
            if (beanRequestCita.operation == "update") {
                json.idcita = citaSelected.idcita;
            }
        }
    }
    $.ajax({
        url: getHostAPI() + beanRequestCita.entity_api + "/" + beanRequestCita.operation + parameters_pagination,
        type: beanRequestCita.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoCita').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
                $('#ventanaModalCita').modal('hide');
                setTimeout(() => {
                    document.querySelector('#FrmCita').dispatchEvent(new Event('submit'));
                }, 1000);
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationCita = beanCrudResponse.beanPagination;
            toListCita(beanPaginationCita);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoCita').modal("hide");
        showAlertErrorRequest();

    });
}

function toListCita(beanPagination) {
    document.querySelector("#tbodyCita").innerHTML = "";
    document.querySelector("#titleManagerCita").innerHTML = "[ " + beanPagination.count_filter + " ] CITAS";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(cita => {
            personal = cita.personal;
            if (personal.idpersonal == 0) {
                s_personal = "<span class='text-danger'>Sin Personal Asignado</span>";
            } else {
                s_personal = personal.nombre.toUpperCase() + " " + personal.apellido_pat.toUpperCase() + " " + personal.apellido_mat.toUpperCase()
            }
            atendido = cita.atendido;
            buttom_editar =
                    `
                                <button class="btn btn-default text-primary dt-fab-btn editar-cita" idcita='${cita.idcita}' title="Editar" data-toggle="tooltip">
                                    <i class="icon icon-editors"></i>
                                </button>
            `;
            buttom_eliminar =
                    `
                                <button class="btn btn-default text-danger dt-fab-btn eliminar-cita" idcita='${cita.idcita}' title="Eliminar" data-toggle="tooltip">
                                    <i class="icon icon-trash-filled"></i>
                                </button>
            `;
            row = "<tr class='click-selection-cita sisbu-cursor-mano' idcita='" + personal.idpersonal + "'>";
            row += "<td class='align-middle text-left'>" + buttom_editar + "</td>";
            row += "<td class='align-middle text-left'>" + buttom_eliminar + "</td>";
            row += "<td class='align-middle text-left'>" + atendido.dni + " <br> " + atendido.nombre.toUpperCase() + " " + atendido.apellido_pat.toUpperCase() + " " + atendido.apellido_mat.toUpperCase() + "<br><span class='text-info'>" + atendido.escuela.nombre + "</span></td>";
            row += "<td class='align-middle text-left'>" + cita.fecha_solicitud + "<br>" + (cita.fecha_aceptacion == null ? "Pendiente" : cita.fecha_aceptacion) + "</td>";
            row += "<td class='align-middle text-left'>" + (cita.fecha_programada == undefined ? "Pendiente" : cita.fecha_programada) + "<br>" + (cita.fecha_atendida == undefined ? "Pendiente" : cita.fecha_atendida) + "</td>";
            row += "<td class='align-middle text-left'>" + cita.area.nombre + "<br>" + s_personal + "</td>";
            row += "</tr>";
            document.querySelector("#tbodyCita").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageCita").value),
                document.querySelector("#pageCita"),
                $('#modalCargandoCita'),
                $('#paginationCita'));
        addEventsCitas();
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationCita'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
    }
}

function addEventsCitas() {
    document.querySelectorAll('.editar-cita').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            citaSelected = findByCita(btn.getAttribute('idcita'));
            if (citaSelected != undefined) {
                beanRequestCita.operation = "update";
                beanRequestCita.type_request = "PUT";
                //SET VALUES MODAL
                openCita();
            } else {
                showAlertTopEnd('warning', 'No se encontró el Cita para poder editar');
            }
        };
    });
    document.querySelectorAll('.eliminar-cita').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            citaSelected = findByCita(btn.getAttribute('idcita'));
            beanRequestCita.operation = "delete";
            beanRequestCita.type_request = "DELETE";
            showAlertDelete('modalCargandoCita')
        };
    });
}

function findByCita(idcita) {
    let cita_;
    beanPaginationCita.list.forEach(cita => {
        if (idcita == cita.idcita) {
            cita_ = cita;
            return;
        }
    });
    return cita_;
}

function clearCita() {
    document.querySelector("#btnCancelSelectionAtendido").dispatchEvent(new Event('click'));
    document.querySelector("#btnCancelSelectionArea").dispatchEvent(new Event('click'));
    document.querySelector("#btnCancelSelectionPersonal").dispatchEvent(new Event('click'));
    document.querySelector("#txtFechaProgramadaDateCita").value = "";
    document.querySelector("#txtFechaProgramadaTimeCita").value = "";
    document.querySelector("#txtEstadoCita").value = "PEN";
    document.querySelector("#txtMotivoCita").value = "";
    document.querySelector("#txtObservacionProgramacionCita").value = "";
    document.querySelector("#txtObservacionAtencion").value = "";
}

function validateFormCita() {
    if (atendidoSelected == undefined) {
        showAlertTopEnd('warning', 'Por favor seleccione un usuario');
        return false;
    }
    if (atendidoSelected.idatendido < 1) {
        showAlertTopEnd('warning', 'Por favor seleccione un usuario correctamente');
        return false;
    }
    if (areaSelected == undefined) {
        showAlertTopEnd('warning', 'Por favor seleccione una área');
        return false;
    }
    if (areaSelected.idarea < 1) {
        showAlertTopEnd('warning', 'Por favor seleccione una área correctamente');
        return false;
    }
    if (personalSelected == undefined) {
        showAlertTopEnd('warning', 'Por favor seleccione el personal encargado');
        return false;
    }
    if (personalSelected.idpersonal < 1) {
        showAlertTopEnd('warning', 'Por favor seleccione el personal encargado correctamente');
        return false;
    }
    if (document.querySelector("#txtFechaProgramadaDateCita").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese fecha');
        document.querySelector("#txtFechaProgramadaDateCita").focus();
        return false;
    }
    if (document.querySelector("#txtFechaProgramadaTimeCita").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese fecha');
        document.querySelector("#txtFechaProgramadaTimeCita").focus();
        return false;
    }
    return true;
}

function openCita() {
    atendido = citaSelected.atendido;
    atendidoSelected = atendido;
    personal = citaSelected.personal;
    if (personal.idpersonal == 0) {
        s_personal = "";
        personalSelected = undefined;
    } else {
        s_personal = personal.nombre.toUpperCase() + " " + personal.apellido_pat.toUpperCase() + " " + personal.apellido_mat.toUpperCase()
        personalSelected = personal;
    }
    areaSelected = citaSelected.area;
    document.querySelector("#txtAtendidoCita").value = atendido.nombre.toUpperCase() + " " + atendido.apellido_pat.toUpperCase() + " " + atendido.apellido_mat.toUpperCase();
    document.querySelector("#txtAreaCita").value = citaSelected.area.nombre;
    document.querySelector("#txtPersonalEncargadoCita").value = s_personal;
    s_fecha_programada = citaSelected.fecha_programada == null ? "" : citaSelected.fecha_programada.split(" ")[0];
    s_hora_programada = citaSelected.fecha_programada == null ? "" : citaSelected.fecha_programada.split(" ")[1].substring(0, 5);
    document.querySelector("#txtFechaProgramadaDateCita").value = s_fecha_programada;
    document.querySelector("#txtFechaProgramadaTimeCita").value = s_hora_programada;
    document.querySelector("#txtEstadoCita").value = citaSelected.estado_cita;
    document.querySelector("#txtMotivoCita").value = citaSelected.motivo;
    document.querySelector("#txtTituloModalMan").innerHTML = "EDITAR CITA";
    $('#ventanaModalCita').modal("show");
}