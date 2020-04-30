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

    $('#FrmCita').submit(function (event) {
        if (document.querySelector('#txtFechaIFilterCita').value == "" && document.querySelector('#txtFechaIFilterCita').value == "") {
            beanRequestCita.operation = "paginate";
            beanRequestCita.type_request = "GET";
            $('#modalCargandoCita').modal('show');
        } else {
            if (document.querySelector('#txtFechaIFilterCita').value != "" && document.querySelector('#txtFechaIFilterCita').value != "") {
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

});

function processAjaxCita() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestCita.operation == "paginate") {
        parameters_pagination += "?type_request=" + document.querySelector("#txtTypeRequestCita").value.toLowerCase();
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
                fecha_solicitud = fecha_programada;
            }
            json = {
                "fecha_solicitud": fecha_solicitud,
                "fecha_aceptacion": fecha_aceptacion,
                "fecha_programada": fecha_programada,
                "fecha_atendida": null,
                "estado_solicitud": "ACE",
                "estado_cita": "PEN",
                "motivo": document.querySelector("#txtMotivoCita").value,
                "atendido": {
                    "idatendido": atendidoSelected.idatendido
                },
                "area": areaSelected,
                "personal_encargado": {
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
        row =
                `
               <div class="dt-widget__item border-success bg-primary text-white mb-0 pb-2"">
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           NOMBRE
                        </p>
                    </div>
                    <!-- /widget info -->
                    
                </div>
            `;
        document.querySelector("#tbodyCita").innerHTML += row;
        beanPagination.list.forEach(cita => {
            row =
                    `
                 <div class="dt-widget__item border-success  ">
                    <!-- Widget Extra -->
                    <div class="dt-widget__extra text-right">
                      
                        <!-- Hide Content -->
                        <div class="hide-content pr-2"">
                            <!-- Action Button Group -->
                            <div class="action-btn-group">
                                <button class="btn btn-default text-primary dt-fab-btn editar-cita" idcita='${cita.idcita}' title="Editar" data-toggle="tooltip">
                                    <i class="icon icon-editors"></i>
                                </button>
                                <button class="btn btn-default text-danger dt-fab-btn eliminar-cita" idcita='${cita.idcita}' title="Eliminar" data-toggle="tooltip">
                                    <i class="icon icon-trash-filled"></i>
                                </button>
                              
                            </div>
                            <!-- /action button group -->
                        </div>
                        <!-- /hide content -->
                    </div>
                    <!-- /widget extra -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           ${cita.nombre}
                        </p>
                    </div>
                    <!-- /widget info -->
                 
                    
                </div>
            `;
            document.querySelector("#tbodyCita").innerHTML += row;
            $('[data-toggle="tooltip"]').tooltip();
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageCita").value),
                document.querySelector("#pageCita"),
                $('#modalCargandoCita'),
                $('#paginationCita'));
        addEventsCitaes();
        if (beanRequestCita.operation == "paginate") {
            document.querySelector("#txtFilterCita").focus();
        }

    } else {
        destroyPagination($('#paginationCita'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
    }
}

function addEventsCitaes() {
    document.querySelectorAll('.editar-cita').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            citaSelected = findByCita(btn.getAttribute('idcita'));
            if (citaSelected != undefined) {
                beanRequestCita.operation = "update";
                beanRequestCita.type_request = "PUT";
                //SET VALUES MODAL
                document.querySelector("#txtNombreCita").value = citaSelected.nombre;
                document.querySelector("#txtTituloModalMan").innerHTML = "EDITAR CITA";
                $('#ventanaModalCita').modal("show");
                document.querySelector("#txtNombreCita").focus();
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
            processAjaxCita();
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

