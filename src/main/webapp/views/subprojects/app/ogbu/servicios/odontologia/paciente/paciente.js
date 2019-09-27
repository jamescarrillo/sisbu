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
    beanRequestHistoria.operation = "paginate";
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
    
    listFilterOdontologia("#txtFilterMedicoOdontologia");
    
    document.querySelector("#buttonAntecedente").onclick = function () {
        beanRequestHistoria.operation = "paginate";
        beanRequestHistoria.type_request = "GET";
        $('#modalCargandoHistoria').modal('show');


    };

    $("#modalCargandoHistoria").on('shown.bs.modal', function () {
        processAjaxHistoria(pacienteSelected.idatendido);
    });

});

function listFilterOdontologia(filterdni) {
    $(filterdni).change(function () {
        var filter = $(this).val();
        processAjaxDoctor(filter);
    }).keyup(function (e) {
        var txt = String.fromCharCode(e.which);
        if (txt.match(/[A-Za-z0-9]/)) {
            $(this).change();
        }

    });

}

function processAjaxPaciente() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestPaciente.operation == "paginate") {
        parameters_pagination += "?filter=" + document.querySelector("#txtFilterPaciente").value.toUpperCase();
        parameters_pagination += "&page=" + document.querySelector("#pagePaciente").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePagePaciente").value;

    } else {
        parameters_pagination = "";
        if (beanRequestPaciente.operation == "delete") {
            parameters_pagination = "/" + pacienteSelected.idpaciente;
            json = {};
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
            //'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
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
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(paciente => {
            row = "<tr ";
            row += "idpaciente='" + paciente.idatendido + "' ";
            row += ">";
            row += "<td><ul class='dt-list dt-list-cm-0'>";
            row += "<li class='dt-list__item historia-clinica' data-toggle='tooltip' title='Ver Diagnóstico'><a class='text-light-gray' href='javascript:void(0)'>";
            row += "<i class='text-primary fa fa-file-alt'></i></a></li>";
            row += "<li class='dt-list__item eliminar-paciente' data-toggle='tooltip' title='Descargar Diagnóstico'><a class='text-light-gray' href='javascript:void(0)'>";
            row += "<i class='text-danger fa fa-file-pdf'></i></a></li>";
            row += "</ul></td>";
            row += "<td class='align-middle'>" + paciente.dni + "</td>";
            row += "<td class='align-middle'>" + paciente.apellido_pat + " " + paciente.apellido_mat + " " + paciente.nombre + "</td>";
            row += "<td class='align-middle'>" + tipoPaciente(paciente.tipo_atendido) + "</td>";
            row += "<td class='align-middle'>" + subtipoPaciente(paciente.subtipo_atendido) + "</td>";
            row += "</tr>";
            document.querySelector("#tbodyPaciente").innerHTML += row;
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
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationPaciente'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterPaciente").focus();
    }
}

function addEventsPacientes() {
    document.querySelectorAll('.agregar-doctor').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            doctorSelected = findByDoctor(btn.getAttribute('iddoctor'));
            console.log(doctorSelected);
            document.querySelector("#txtFilterMedicoOdontologia").value = doctorSelected.apellido_pat +
                    " " + doctorSelected.apellido_mat + " " +doctorSelected.nombre;
            document.querySelector("#resultadoMedicoOdontologia").innerHTML = "";
        };
    });
    document.querySelectorAll('.historia-clinica').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            document.querySelector("#buttonAntecedente").classList.remove("active");
            document.querySelector("#buttonFiliacion").classList.add("active");
            document.querySelector("#tab-pane-16").classList.remove("active");
            document.querySelector("#tab-pane-15").classList.add("active");
            pacienteSelected = findByPaciente(btn.parentElement.parentElement.parentElement.getAttribute('idpaciente'));
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
    document.querySelectorAll('.eliminar-paciente').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            pacienteSelected = findByPaciente(btn.parentElement.parentElement.parentElement.getAttribute('idpaciente'));
            beanRequestPaciente.operation = "delete";
            beanRequestPaciente.type_request = "DELETE";
            processAjaxPaciente();
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

//DOCTOR
function toListDoctor(beanPagination) {
    document.querySelector("#resultadoMedicoOdontologia").innerHTML = "";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(personal => {
            row = "<a iddoctor='" + personal.idpersonal + "' href='javascript:void(0)' ";
            row += "class='list-group-item list-group-item-action pt-1 pb-1 agregar-doctor'>" + personal.apellido_pat.toUpperCase() + " " + personal.apellido_mat.toUpperCase() + " " + personal.nombre.toUpperCase();
            row += "</a>";
            document.querySelector("#resultadoMedicoOdontologia").innerHTML += row;
        });
        addEventsPacientes();
    } else {
        //destroyPagination($('#paginationComida'));
        showAlertTopEnd('warning', 'No se encontraron resultados');

    }
}

function processAjaxDoctor(filter) {
    $.ajax({
        url: getHostAPI() + "api/personal/paginate?filter=" + filter + "&cargo=1&estado=1&page=1&size=20",
        type: "GET",
        headers: {
            //'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        console.log(beanCrudResponse);
        $('#modalCargandoPaciente').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationDoctor = beanCrudResponse.beanPagination;
            toListDoctor(beanPaginationDoctor);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoPaciente').modal("hide");
        showAlertErrorRequest();

    });
}

function findByDoctor(iddoctor) {
    let doctor_;
    beanPaginationDoctor.list.forEach(doctor => {
        if (iddoctor == doctor.idpersonal) {
            doctor_ = doctor;
            return;
        }
    });
    return doctor_;
}

//historia
function addInputHistoria(historiaSelected) {

    document.querySelector("#txtHistoriaPaciente").value = historiaSelected.num_historia;
    document.querySelector("#txtSaludGeneralPaciente").value = historiaSelected.antecedentes;
    document.querySelector("#txtFilterMedicoOdontologia").value = historiaSelected.personal.apellido_pat + " " +
            historiaSelected.personal.apellido_mat + " " + historiaSelected.personal.nombre;
    document.querySelector("#txtAtmPaciente").value = historiaSelected.atm;
    document.querySelector("#txtMusculoPaciente").value = historiaSelected.musculos_ex_orales;
    document.querySelector("#txtLabiosPaciente").value = historiaSelected.labios;
    document.querySelector("#txtLenguaPaciente").value = historiaSelected.lengua;
    document.querySelector("#txtEnciasPaciente").value = historiaSelected.encias;
    document.querySelector("#txtPiezasDentariasPaciente").value = historiaSelected.piezas_dentarias;
    document.querySelector("#txtObservacionPaciente").value = historiaSelected.observaciones;
    document.querySelector("#txtDiagnosticoPaciente").value = historiaSelected.ex_extra_oral;
    doctorSelected = historiaSelected.personal;
}

function limpiarInputHistoria() {
    document.querySelector("#txtHistoriaPaciente").value = "H" + pacienteSelected.dni + "-" + Math.floor(Math.random() * 10);
    document.querySelector("#txtSaludGeneralPaciente").value = "";
    document.querySelector("#txtFilterMedicoOdontologia").value = "";
    document.querySelector("#txtAtmPaciente").value = "";
    document.querySelector("#txtMusculoPaciente").value = "";
    document.querySelector("#txtLabiosPaciente").value = "";
    document.querySelector("#txtLenguaPaciente").value = "";
    document.querySelector("#txtEnciasPaciente").value = "";
    document.querySelector("#txtPiezasDentariasPaciente").value = "";
    document.querySelector("#txtObservacionPaciente").value = "";
    document.querySelector("#txtDiagnosticoPaciente").value = "";

}

function processAjaxHistoria(idpaciente) {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestHistoria.operation == "paginate") {
        parameters_pagination += "?idpaciente=" + idpaciente;
        parameters_pagination += "&page=" + 1;
        parameters_pagination += "&size=" + 3;

    } else {
        parameters_pagination = "";
        if (beanRequestHistoria.operation == "dato") {
            parameters_pagination = "/" + idpaciente
            json = {};
        } else {
            console.log(doctorSelected.idpersonal);
            json = {
                "num_historia": document.querySelector("#txtHistoriaPaciente").value,
                "atm": document.querySelector("#txtAtmPaciente").value,
                "personal": {"idpersonal": doctorSelected.idpersonal},
                "encias": document.querySelector("#txtEnciasPaciente").value,
                "ex_extra_oral": document.querySelector("#txtDiagnosticoPaciente").value,
                "ex_intra_oral": " ",
                "labios": document.querySelector("#txtLabiosPaciente").value,
                "lengua": document.querySelector("#txtLenguaPaciente").value,
                "musculos_ex_orales": document.querySelector("#txtMusculoPaciente").value,
                "observaciones": document.querySelector("#txtObservacionPaciente").value,
                "antecedentes": document.querySelector("#txtSaludGeneralPaciente").value,
                "piezas_dentarias": document.querySelector("#txtPiezasDentariasPaciente").value,
                "atendido": {"idatendido": pacienteSelected.idatendido}
            };
            if (beanRequestHistoria.operation == "update") {
                json.idhistoria_clinicao = historiaSelected.idhistoria_clinicao;
            }


        }
    }
    $.ajax({
        url: getHostAPI() + beanRequestHistoria.entity_api + "/" + beanRequestHistoria.operation + parameters_pagination,
        type: beanRequestHistoria.type_request,
        data: JSON.stringify(json),

        headers: {
            //'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoHistoria').modal("hide");
        historiaSelected = beanCrudResponse.beanPagination.list[0];
        if (beanRequestHistoria.type_request != "GET") {
            showAlertTopEnd('success', 'Acción realizada exitosamente');
        }
        if (historiaSelected == undefined) {
            beanRequestHistoria.operation = "add";
            beanRequestHistoria.type_request = "POST";
            limpiarInputHistoria();
        } else {
            beanRequestHistoria.operation = "update";
            beanRequestHistoria.type_request = "PUT";
            addInputHistoria(historiaSelected);
        }



    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoPaciente').modal("hide");
        showAlertErrorRequest();

    });
}

function validateFormHistoriaOdontologia() {

    if (document.querySelector("#txtHistoriaPaciente").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Numero de Historia');
        document.querySelector("#txtHistoriaPaciente").focus();
        return false;
    } else if (document.querySelector("#txtSaludGeneralPaciente").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Antecedentes');
        document.querySelector("#txtSaludGeneralPaciente").focus();
        return false;

    } else if (document.querySelector("#txtFilterMedicoOdontologia").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Medico');
        document.querySelector("#txtFilterMedicoOdontologia").focus();
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