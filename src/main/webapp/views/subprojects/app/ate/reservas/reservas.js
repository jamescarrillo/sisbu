var beanPaginationCita;
var CitaSelected;

var beanRequestCita = new BeanRequest();
document.addEventListener("DOMContentLoaded", function () {
    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestCita.entity_api = "citas";
    beanRequestCita.operation = "alumnos/paginate";
    beanRequestCita.type_request = "GET";
    document.querySelector("#btn-nueva-solicitud-cita").onclick = function () {
        document.querySelector("#txtTituloCita").innerHTML = "Registrar Solicitud de Cita";
        navigateSolicitud("crud");
        beanRequestCita.operation = "add";
        beanRequestCita.type_request = "POST";
    };

    document.querySelector("#btn-cancelar-crud").onclick = function () {
        navigateSolicitud("list");
    };

    $('#txtFechaInicialCita').bootstrapMaterialDatePicker({
        weekStart: 0,
        time: false,
        format: 'DD/MM/YYYY',
        lang: 'es'
    }).on('change', function (e, date) {
    });
    document.querySelector("#btnEliminarFechaInicialCita").onclick = function () {
        document.getElementById("txtFechaInicialCita").value = "";
    };
    $('#txtFechaFinalCita').bootstrapMaterialDatePicker({
        weekStart: 0,
        time: false,
        format: 'DD/MM/YYYY HH:mm:ss',
        lang: 'es'
    }).on('change', function (e, date) {
    });
    document.querySelector("#btnEliminarFechaFinalCita").onclick = function () {
        document.getElementById("txtFechaFinalCita").value = "";
    };
    $("#modalCargandoCita").on('shown.bs.modal', function () {
        processAjaxCita();
    });

    $('#FrmCitalModal').submit(function (event) {
        if (validateFormCital()) {
            $('#modalCargandoCita').modal('show');
        }
        event.preventDefault();
        event.stopPropagation();

    });
    $('#FrmCita').submit(function (event) {
        event.preventDefault();
        event.stopPropagation();
        beanRequestCita.operation = "alumnos/paginate";
        beanRequestCita.type_request = "GET";
        if (validateFilterCital()) {
            $('#modalCargandoCita').modal('show');
        }


    });
});

function navigateSolicitud(option) {
    if (option == "list") {
        document.querySelector("#row-list-solicitud-cita").style.display = "flex";
        document.querySelector("#row-crud-solicitud-cita").style.display = "none";
    } else {
        document.querySelector("#row-list-solicitud-cita").style.display = "none";
        document.querySelector("#row-crud-solicitud-cita").style.display = "flex";
    }
}

function processAjaxCita() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestCita.operation === "alumnos/paginate") {
        parameters_pagination = "?fechai=" + document.querySelector("#txtFechaInicialCita").value;
        parameters_pagination += "&fechaf=" + document.querySelector("#txtFechaFinalCita").value;
        parameters_pagination += "&page=1&size=5";
    } else {
        parameters_pagination = "";
        if (beanRequestCita.operation == "delete")
            parameters_pagination = "/" + CitaSelected.idcita;
        else
            json = {
                "fecha_solicitud": getTimesTampJavaScriptCurrent(),
                "motivo": document.querySelector("#txtMotivoCita").value,
                "atendido": {"usuario": {"idusuario": user_session.idusuario}},
                "area": {"idcita": document.querySelector("#txtServicioSolicitudCita").value},
            };



    }
    $.ajax({
        url: getHostAndContextAPI() + beanRequestCita.entity_api + "/" + beanRequestCita.operation + parameters_pagination,
        type: beanRequestCita.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        console.log(beanCrudResponse);
        $('#modalCargandoCita').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() === "ok") {
                showAlertTopEnd('success', 'Cita reservada con éxito');
                addReservas();
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
    document.querySelector("#div-content-evaluaciones-completadas").innerHTML = "";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(cita => {
            row =
                    `
                <div class="dt-widget__item ${cita.fecha_programada != null
                    ? "border-success"
                    : cita.fecha_aceptacion != null ? "border-warning"
                    : cita.fecha_solicitud != null ? "border-danger"
                    : ""} sisbu-cursor-mano border-bottom m-0">
                        <div class="dt-widget__info text-truncate">
                            <div class="dt-widget__title f-16 font-weight-500 text-truncate">${cita.area.nombre}
                            </div>

                            <p class="mb-0 text-truncate text-light-gray">
                            ${cita.personal_encargado.nombre == null
                    ? "Motivo : " + cita.motivo
                    : 'Dr. ' + cita.personal_encargado.nombre +
                    ' ' + cita.personal_encargado.apellido_pat +
                    ' ' + cita.personal_encargado.apellido_mat}
                            </p>
                        </div>
                        <div class="dt-widget__extra text-right">
                            <div class="">
                                <span class="d-block">${
                    cita.fecha_programada != null
                    ? "Fecha de Atenci&oacute;n : " + cita.fecha_programada.split(" ")[0]
                    : cita.fecha_aceptacion != null
                    ? "Fecha de Aprobaci&oacute;n : " + cita.fecha_aceptacion.split(" ")[0]
                    : cita.fecha_solicitud != null ? "Fecha de Solicitud : " + cita.fecha_solicitud.split(" ")[0]
                    : ""

                    }</span>
                                <span class="d-block">${cita.fecha_programada != null
                    ? cita.fecha_programada.split(" ")[1]
                    : cita.fecha_aceptacion != null
                    ? cita.fecha_aceptacion.split(" ")[1]
                    : cita.fecha_solicitud != null ? cita.fecha_solicitud.split(" ")[1]
                    : ""}</span>
                            </div>
                       
                            <!-- div class="show-content">
                                <div class="action-btn-group">
                                    <button class="btn btn-default text-success dt-fab-btn editar-cita"
                                         idcita='${cita.idcita}' title="Editar solicitud"
                                        data-toggle="tooltip">
                                        <i class="icon icon-assignment icon-1x"></i>
                                    </button>
                                    <button class="btn btn-default text-danger dt-fab-btn eliminar-cita"
                                         idcita='${cita.idcita}' title="Eliminar solicitud"
                                        data-toggle="tooltip">
                                        <i class="icon icon-assignment icon-xl"></i>
                                    </button>
                                 
                                </div>
                            </div-->
                        </div>
                    </div>
            `;
            document.querySelector("#div-content-evaluaciones-completadas").innerHTML += row;
            $('[data-toggle="tooltip"]').tooltip();
        });
        addEventsCitas();

    } else {
        showAlertTopEnd('warning', 'No Cuenta con citas :C');
    }
}

function validateFormCital() {
    if (document.querySelector("#txtMotivoCita").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Motivo');
        document.querySelector("#txtMotivoCita").focus();
        return false;
    } else if (document.querySelector("#txtServicioSolicitudCita").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Servicio');
        document.querySelector("#txtServicioSolicitudCita").focus();
        return false;
    }
    return true;
}

function validateFilterCital() {
    if (document.querySelector("#txtFechaInicialCita").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Fecha Inicial');
        document.querySelector("#txtFechaInicialCita").focus();
        return false;
    } else if (document.querySelector("#txtFechaFinalCita").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Fecha Final');
        document.querySelector("#txtFechaFinalCita").focus();
        return false;
    }
    return true;
}

function addReservas(cita = undefined) {

    document.querySelector("#txtMotivoCita").value = (cita == undefined) ? "" : cita.motivo;
    document.querySelector("#txtServicioSolicitudCita").value = (cita == undefined) ? "-1" : cita.area.idcita;

}

function addEventsCitas() {
    document.querySelectorAll('.editar-cita').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            CitaSelected = findBycita(btn.getAttribute('idcita'));
            if (CitaSelected != undefined) {
                beanRequestCita.operation = "update";
                beanRequestCita.type_request = "PUT";
                //SET VALUES MODAL
                addReservas(CitaSelected);
                document.querySelector("#txtTituloCita").innerHTML = "Editar Solicitud de Cita";
                navigateSolicitud("crud");
                document.querySelector("#txtNombrecitaER").focus();
            } else {
                showAlertTopEnd('warning', 'No se encontró la cita para poder editar');
            }
        };
    });
    document.querySelectorAll('.eliminar-cita').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            CitaSelected = findBycita(btn.getAttribute('idcita'));
            if (CitaSelected != undefined) {
                beanRequestCita.operation = "delete";
                beanRequestCita.type_request = "DELETE";
                //SET VALUES MODAL

                $('#modalCargandoCita').modal("show");
            } else {
                showAlertTopEnd('warning', 'No se encontró el cita para poder editar');
            }
        };
    });

}
function findBycita(idcita) {
    let cita_;
    beanPaginationCita.list.forEach(cita => {
        if (idcita == cita.idcita) {
            cita_ = cita;
            return;
        }
    });
    return cita_;
}
