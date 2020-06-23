var beanPaginationPaciente;
var beanPaginationDoctor;
var pacienteSelected;
var doctorSelected;
var historiaSelected;
var beanRequestPaciente = new BeanRequest();
var beanRequestHistoria = new BeanRequest();
var fechaActual = new Date(); //Fecha actual
document.addEventListener("DOMContentLoaded", function () {
    //INICIALIZANDO VARIABLES DE SOLICITUD ATENDIDO
    beanRequestPaciente.entity_api = "api/atendido";
    beanRequestPaciente.operation = "paginate";
    beanRequestPaciente.type_request = "GET";

    document.querySelector("#openPaciente").style.display = "none";
    document.querySelector("#openPaciente").style.display = "none";
    $("#modalCargandoVDYA").on('shown.bs.modal', function () {
        processAjaxValidacionHistoria();
    });
    $('#FrmPaciente').submit(function (event) {
        beanRequestPaciente.operation = "paginate";
        beanRequestPaciente.type_request = "GET";
        $('#modalCargandoPaciente').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $('#FrmPacienteModal').submit(function (event) {
        if (validateFormPaciente()) {
            $('#modalCargandoPaciente').modal('show');
        }
        event.preventDefault();
        event.stopPropagation();
    });

    document.querySelector("#btnCerrar").onclick = function () {
        document.querySelector("#openPaciente").style.display = "none";
        document.querySelector("#ListaPaciente").style.display = "block";
    };

    $("#modalCargandoPaciente").on('shown.bs.modal', function () {
        processAjaxPaciente();
    });

    $("#modalCargandoPaciente").on('hidden.bs.modal', function () {
        beanRequestPaciente.operation = "paginate";
        beanRequestPaciente.type_request = "GET";
    });

    $('#modalCargandoPaciente').modal('show');

    $("#sizePagePaciente").change(function () {
        $('#modalCargandoPaciente').modal('show');
    });

    //HISTORIA
    //INICIALIZANDO VARIABLES DE SOLICITUD ATENDIDO
    beanRequestHistoria.entity_api = "api/historiaclinicao";
    beanRequestHistoria.operation = "dato";
    beanRequestHistoria.type_request = "GET";

    $("#txtPesoPaciente").change(function () {
        document.querySelector("#txtImcPaciente").value = document.querySelector("#txtPesoPaciente").value * document.querySelector("#txtTallaPaciente").value;
    });

    $("#txtTallaPaciente").change(function () {
        document.querySelector("#txtImcPaciente").value = document.querySelector("#txtPesoPaciente").value * document.querySelector("#txtTallaPaciente").value;
    });

    $('#FrmAntecedentePaciente').submit(function (event) {

        if (validateFormHistoriaOdontologia()) {
            $('#modalCargandoHistoria').modal('show');
        }
        event.preventDefault();
        event.stopPropagation();
    });

    document.querySelector("#buttonAntecedente").onclick = function () {
        beanRequestHistoria.operation = "dato";
        beanRequestHistoria.type_request = "GET";
        $('#modalCargandoHistoria').modal('show');
    };

    $("#modalCargandoHistoria").on('shown.bs.modal', function () {
        processAjaxHistoria();
    });

    $("#modalCargandoHistoria").on('hidden.bs.modal', function () {
        beanRequestHistoria.operation = "update";
        beanRequestHistoria.type_request = "PUT";
    });

});


function processAjaxPaciente() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestPaciente.operation == "paginate") {
        if (document.querySelector("#txtFilterPaciente").value != "") {
            document.querySelector("#pagePaciente").value = "1";
        }
        parameters_pagination += "?filter=" + document.querySelector("#txtFilterPaciente").value.toUpperCase();
        parameters_pagination += "&page=" + document.querySelector("#pagePaciente").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePagePaciente").value;

    } else {
        parameters_pagination = "";
        if (beanRequestPaciente.operation == "delete") {
            parameters_pagination = "/" + pacienteSelected.idpaciente;
        } else {
            json = {
                "nombre": document.querySelector("#txtNombrePaciente").value,
            };
            if (beanRequestPaciente.operation == "update") {
                json.idpaciente = pacienteSelected.idpaciente;
            }
        }
    }
    $.ajax({
        url: getHostAPI() + beanRequestPaciente.entity_api + "/" + beanRequestPaciente.operation + parameters_pagination,
        type: beanRequestPaciente.type_request,
        data: JSON.stringify(json),
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoPaciente').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationPaciente = beanCrudResponse.beanPagination;
            toListPaciente(beanPaginationPaciente);

        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoPaciente').modal("hide");
        showAlertErrorRequest();

    });
}

function toListPaciente(beanPagination) {
    document.querySelector("#tbodyPaciente").innerHTML = "";
    document.querySelector("#titleManagerPaciente").innerHTML = "[ " + beanPagination.count_filter + " ] PACIENTES";

    let row;
    row =
        `
               <div class="dt-widget__item border-success bg-primary text-white pl-5 mb-0 pb-2 pr-1">
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate pl-5" style="max-width: 15%;">
                        <p class="mb-0 text-truncate ">
                           DNI
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate">
                        <p class="mb-0 text-truncate ">
                           NOMBRE COMPLETO /
                        </p>
                        <p class="mb-0 text-truncate ">
                           FECHA DE NACIMIENTO
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate" style="max-width: 15%;">
                        <p class="mb-0 text-truncate ">
                           TIPO DE PACIENTE
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate">
                        <p class="mb-0 text-truncate ">
                           ESCUELA PROFESIONAL
                        </p>
                    </div>
                    <!-- /widget info -->
                    
                </div>
            `;
    if (beanPagination.count_filter == 0) {
        destroyPagination($('#paginationPaciente'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterPaciente").focus();
        row +=
            `
                       <div class="dt-widget__item  border-bottom  pl-5 m-0 pr-1 pt-2 pb-2">
                            <!-- Widget Info -->
                            <div class="dt-widget__info text-truncate text-center" >
                                NO HAY PACIENTES
                            </div>
                            <!-- /widget info -->
                            
                        </div>
                    `;
        document.querySelector("#tbodyPaciente").innerHTML += row;
        return;
    }
    document.querySelector("#tbodyPaciente").innerHTML += row;
    beanPagination.list.forEach(atendido => {
        row =
            `
                 <div class="dt-widget__item border-bottom  pl-5 m-0 pr-1 pt-2 pb-2">
                    <!-- Widget Extra -->
                    <div class="dt-widget__extra text-right">
                      
                        <!-- Hide Content -->
                        <div class="hide-content pr-2"">
                            <!-- Action Button Group -->
                            <div class="action-btn-group">
                                <button class="btn btn-default text-primary dt-fab-btn historia-clinica" idpaciente='${atendido.idatendido}' title="Ver Diagnótico" data-toggle="tooltip">
                                    <i class="fa fa-file-alt"></i>
                                </button>
                                <button class="btn btn-default text-danger dt-fab-btn reporte-paciente" idpaciente='${atendido.idatendido}' title="Descargar Historia Clínica" data-toggle="tooltip">
                                    <i class="fa fa-file-pdf"></i>
                                </button>
                               
                              
                            </div>
                            <!-- /action button group -->
                        </div>
                        <!-- /hide content -->
                    </div>
                    <!-- /widget extra -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " style="max-width: 15%;">
                        <p class="mb-0 text-truncate ">
                           ${atendido.dni}
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate">
                        <p class="mb-0 text-truncate ">
                           ${atendido.apellido_pat} ${atendido.apellido_mat} ${atendido.nombre}
                        </p>
                        <p class="mb-0 text-truncate ">
                           ${atendido.fecha_nacimiento == null ? "" : atendido.fecha_nacimiento}
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate" style="max-width: 15%;">
                        <p class="mb-0 text-truncate ">
                           ${tipoPaciente(atendido.tipo_atendido)}
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate">
                        <p class="mb-0 text-truncate ">
            ${atendido.tipo_atendido == 1 ? (atendido.escuela.nombre == null ? "" : atendido.escuela.nombre) : subtipoPaciente(atendido.subtipo_atendido)}
                        </p>
                    </div>
                    <!-- /widget info -->
                    
                </div>
            `;
        document.querySelector("#tbodyPaciente").innerHTML += row;
        $('[data-toggle="tooltip"]').tooltip();
    });
    buildPagination(
        beanPagination.count_filter,
        parseInt(document.querySelector("#sizePagePaciente").value),
        document.querySelector("#pagePaciente"),
        $('#modalCargandoPaciente'),
        $('#paginationPaciente'));
    addEventsPacientes();
    if (beanRequestPaciente.operation == "paginate") {
        document.querySelector("#txtFilterPaciente").focus();
    }


}

function addEventsPacientes() {

    document.querySelectorAll('.historia-clinica').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            document.querySelector("#buttonAntecedente").classList.remove("active");
            document.querySelector("#buttonFiliacion").classList.add("active");
            document.querySelector("#tab-pane-16").classList.remove("active");
            document.querySelector("#tab-pane-15").classList.add("active");
            pacienteSelected = findByPaciente(btn.getAttribute('idpaciente'));
            if (pacienteSelected != undefined) {
                //SET VALUES MODAL
                document.querySelector("#txtTipoDocumentoPaciente").value = pacienteSelected.tipo_documento;
                document.querySelector("#txtUsuarioPaciente").value = pacienteSelected.tipo_atendido;
                document.querySelector("#txtSubusuarioPaciente").value = pacienteSelected.subtipo_atendido;
                document.querySelector("#txtEstadoPaciente").value = pacienteSelected.estado_civil;
                document.querySelector("#txtCodigoPaciente").value = pacienteSelected.codigo;
                document.querySelector("#txtNumeroDocumentoPaciente").value = pacienteSelected.dni;
                document.querySelector("#txtApPaternoPaciente").value = pacienteSelected.apellido_pat;
                document.querySelector("#txtApMaternoPaciente").value = pacienteSelected.apellido_mat;
                document.querySelector("#txtNombrePaciente").value = pacienteSelected.nombre;
                document.querySelector("#txtSexoPaciente").value = pacienteSelected.sexo;
                document.querySelector("#txtFechaNacPaciente").value = pacienteSelected.fecha_nacimiento;
                document.querySelector("#txtCelularPaciente").value = pacienteSelected.celular;
                document.querySelector("#txtEmailPaciente").value = pacienteSelected.email;
                document.querySelector("#txtEscuelaPaciente").value = pacienteSelected.escuela.nombre;

                document.querySelector("#ListaPaciente").style.display = "none";
                document.querySelector("#openPaciente").style.display = "block";
                document.querySelector("#txtNombrePaciente").focus();
            } else {
                showAlertTopEnd('warning', 'No se encontró el Paciente para poder editar');
            }
        };
    });
    document.querySelectorAll('.reporte-paciente').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            pacienteSelected = findByPaciente(btn.getAttribute('idpaciente'));
            if (pacienteSelected != undefined) {
                $("#modalCargandoVDYA").modal('show');
            } else {
                showAlertTopEnd('warning', 'No se encontró el Paciente ');
            }
        };
    });
}

function findByPaciente(idpaciente) {
    let paciente_;
    beanPaginationPaciente.list.forEach(paciente => {
        if (idpaciente == paciente.idatendido) {
            paciente_ = paciente;
            return;
        }
    });
    return paciente_;
}

function validateFormPaciente() {
    if (document.querySelector("#txtNombrePaciente").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese nombre');
        document.querySelector("#txtNombrenPaciente").focus();
        return false;
    }
    return true;
}

function tipoPaciente(tipopersonal) {
    switch (tipopersonal) {
        case 1:
            return "ALUMNO";
            break;
        case 2:
            return "DOCENTE";
            break;
        case 3:
            return "ADMINISTRATIVO";
            break;
        case 4:
            return "FAMILIAR DOCENTE";
        case 5:
            return "FAMILIAR ADMINISTRATIVO";
        default:
            return " ";
            break;

    }
}

function subtipoPaciente(tipopersonal) {
    switch (tipopersonal) {
        case 1:
            return "NOMBRADO";
            break;
        case 2:
            return "CONTRATADO";
            break;
        default:
            return "";
            break;

    }
}



//historia
function addInputHistoria(historiaSelected) {
    if (historiaSelected.personal.apellido_pat == null) {
        historiaSelected.personal.apellido_pat = "";
    }
    if (historiaSelected.personal.apellido_mat == null) {
        historiaSelected.personal.apellido_mat = "";
    }
    if (historiaSelected.personal.nombre == null) {
        historiaSelected.personal.nombre = "";
    }
    if (historiaSelected.personal.cargo.idcargo == 4) {
        doctorSelected = historiaSelected.personal;
    } else {
        historiaSelected.personal.nombre = "";
        historiaSelected.personal.apellido_mat = "";
        historiaSelected.personal.apellido_pat = "";
        doctorSelected = undefined;
    }
    document.querySelector("#txtHistoriaPaciente").value = historiaSelected.num_historia;
    document.querySelector("#txtSaludGeneralPaciente").value = historiaSelected.antecedentes;
    document.querySelector("#txtMedicoPaciente").value = historiaSelected.personal.apellido_pat + " " +
        historiaSelected.personal.apellido_mat + " " + historiaSelected.personal.nombre;
    document.querySelector("#txtAtmPaciente").value = historiaSelected.atm;
    document.querySelector("#txtMusculoPaciente").value = historiaSelected.musculos_ex_orales;
    document.querySelector("#txtLabiosPaciente").value = historiaSelected.labios;
    document.querySelector("#txtLenguaPaciente").value = historiaSelected.lengua;
    document.querySelector("#txtEnciasPaciente").value = historiaSelected.encias;
    document.querySelector("#txtPiezasDentariasPaciente").value = historiaSelected.piezas_dentarias;
    document.querySelector("#txtObservacionPaciente").value = historiaSelected.observaciones;
    document.querySelector("#txtDiagnosticoPaciente").value = historiaSelected.ex_extra_oral;
}

function limpiarInputHistoria() {
    document.querySelector("#txtHistoriaPaciente").value = "HCO" + pacienteSelected.dni + "-" + Math.floor(Math.random() * 10);
    document.querySelector("#txtSaludGeneralPaciente").value = "";
    document.querySelector("#txtMedicoPaciente").value = "";
    document.querySelector("#txtAtmPaciente").value = "";
    document.querySelector("#txtMusculoPaciente").value = "";
    document.querySelector("#txtLabiosPaciente").value = "";
    document.querySelector("#txtLenguaPaciente").value = "";
    document.querySelector("#txtEnciasPaciente").value = "";
    document.querySelector("#txtPiezasDentariasPaciente").value = "";
    document.querySelector("#txtObservacionPaciente").value = "";
    document.querySelector("#txtDiagnosticoPaciente").value = "";

}

function processAjaxHistoria() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestHistoria.operation == "paginate") {
        parameters_pagination += "?idpaciente=" + pacienteSelected.idatendido;
        parameters_pagination += "&page=" + 1;
        parameters_pagination += "&size=" + 3;

    } else {
        parameters_pagination = "";
        if (beanRequestHistoria.operation == "dato") {
            parameters_pagination = "/" + pacienteSelected.idatendido;

        } else {
            if (beanRequestHistoria.operation == "update") {
                json = {
                    "idhistoria_clinicao": historiaSelected.idhistoria_clinicao,
                    "num_historia": document.querySelector("#txtHistoriaPaciente").value,
                    "atm": document.querySelector("#txtAtmPaciente").value,
                    "personal": { "idpersonal": doctorSelected.idpersonal },
                    "encias": document.querySelector("#txtEnciasPaciente").value,
                    "ex_extra_oral": document.querySelector("#txtDiagnosticoPaciente").value,
                    "ex_intra_oral": " ",
                    "labios": document.querySelector("#txtLabiosPaciente").value,
                    "lengua": document.querySelector("#txtLenguaPaciente").value,
                    "musculos_ex_orales": document.querySelector("#txtMusculoPaciente").value,
                    "observaciones": document.querySelector("#txtObservacionPaciente").value,
                    "antecedentes": document.querySelector("#txtSaludGeneralPaciente").value,
                    "piezas_dentarias": document.querySelector("#txtPiezasDentariasPaciente").value,
                    "atendido": { "idatendido": pacienteSelected.idatendido }
                };

            }

        }
    }
    $.ajax({
        url: getHostAPI() + beanRequestHistoria.entity_api + "/" + beanRequestHistoria.operation + parameters_pagination,
        type: beanRequestHistoria.type_request,
        data: JSON.stringify(json),

        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() === "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        $('#modalCargandoHistoria').modal("hide");

        if (beanCrudResponse.idhistoria_clinicao !== undefined) {
            historiaSelected = beanCrudResponse;
            addInputHistoria(historiaSelected);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoPaciente').modal("hide");
        showAlertErrorRequest();

    });
}

function validateFormHistoriaOdontologia() {

    if (document.querySelector("#txtHistoriaPaciente").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Número de Historia');
        document.querySelector("#txtHistoriaPaciente").focus();
        return false;
    } else if (document.querySelector("#txtSaludGeneralPaciente").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Antecedentes');
        document.querySelector("#txtSaludGeneralPaciente").focus();
        return false;

    } else if (doctorSelected == undefined) {
        showAlertTopEnd('warning', 'Por favor ingrese Odontólogo(a)');
        document.querySelector("#txtMedicoPaciente").focus();
        return false;

    } else if (document.querySelector("#txtAtmPaciente").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese ATM');
        document.querySelector("#txtAtmPaciente").focus();
        return false;

    } else if (document.querySelector("#txtLabiosPaciente").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Labios');
        document.querySelector("#txtLabiosPaciente").focus();
        return false;
    } else if (document.querySelector("#txtLenguaPaciente").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Lengua');
        document.querySelector("#txtLenguaPaciente").focus();
        return false;
    } else if (document.querySelector("#txtEnciasPaciente").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Encias');
        document.querySelector("#txtEnciasPaciente").focus();
        return false;
    } else if (document.querySelector("#txtPiezasDentariasPaciente").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Pa');
        document.querySelector("#txtPiezasDentariasPaciente").focus();
        return false;
    } else if (document.querySelector("#txtObservacionPaciente").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Observación');
        document.querySelector("#txtObservacionPaciente").focus();
        return false;
    } else if (document.querySelector("#txtDiagnosticoPaciente").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Diagnótico');
        document.querySelector("#txtDiagnosticoPaciente").focus();
        return false;
    }
    return true;
}
function processAjaxValidacionHistoria() {
    let url_request = getHostAPI() + "api/historiaclinicao/validate-historia?idatendido=" + pacienteSelected.idatendido;
    $.ajax({
        url: url_request,
        type: "GET",
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        //data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (jsonResponse) {
        $('#modalCargandoVDYA').modal("hide");
        if (jsonResponse.messageServer !== undefined) {
            if (jsonResponse.messageServer.toLowerCase() == "ok") {
                //ABRIMOS EL REPORTE
                //ABRIMOS EL REPORTE

                let url_constancia = getHostAPI() + "api/constancias/historia-clinica-odontologia";
                url_constancia += "?idatendido=" + pacienteSelected.idatendido;
                document.querySelector("#titleModalPreviewReporte").innerHTML = "VISTA PREVIA";
                document.querySelector('#idframe_reporte').setAttribute('src', url_constancia);
                document.querySelector('#row_frame_report').style.display = "block";
                $('#ventanaModalPreviewReporte').modal('show');


            } else {
                showAlertTopEnd('warning', jsonResponse.messageServer);
            }
        } else {
            showAlertTopEnd('error', 'Ha ocurrido un error interno al validar tu evaluación deportiva, vuelve a intentarlo mas tarde. Si el problema persiste, visite la oficina de bienestar', 10000);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoVDYA').modal("hide");
        showAlertTopEnd('error', 'Ha ocurrido un error interno al validar tu evaluación deportiva, vuelve a intentarlo mas tarde. Si el problema persiste, visite la oficina de bienestar', 10000);
    });
}