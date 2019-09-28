var beanPaginationPaciente;
var beanPaginationTriaje;
var pacienteSelected;
var historiaSelected;
var diagnosticoSelected;
var beanRequestPaciente = new BeanRequest();
var beanRequestTriaje = new BeanRequest();
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

    //TRIAJE

    //INICIALIZANDO VARIABLES DE SOLICITUD DIAGNSTICO
    beanRequestTriaje.entity_api = "api/diagnosticos";
    beanRequestTriaje.operation = "paginate";
    beanRequestTriaje.type_request = "GET";

    document.querySelector("#btnOpenNewTriajePaciente").onclick = function () {
        //CONFIGURAMOS LA SOLICITUD
        beanRequestTriaje.operation = "add";
        beanRequestTriaje.type_request = "POST";
        // DNI PRUEBA 75231069
        //LIMPIAR LOS CAMPOS
        limpiarInputTriaje();
        //SET TITLE MODAL
        document.querySelector("#txtTituloModalTriaje").innerHTML = "HISTORIA CLINICA : " + historiaSelected.num_historia;
        //OPEN MODEL
        $('#ventanaModalPaciente').modal('show');

    };

    document.querySelector("#buttonTriaje").onclick = function () {
        beanRequestTriaje.operation = "paginate";
        beanRequestTriaje.type_request = "GET";
        $('#modalCargandoTriaje').modal('show');

    };

    $("#modalCargandoTriaje").on('shown.bs.modal', function () {
        processAjaxTriaje(historiaSelected.idhistoria_clinica);
    });

    $('#FrmTriajePaciente').submit(function (event) {
        if (validateFormTriaje()) {
            processAjaxTriaje(historiaSelected.idhistoria_clinica);
        }
        event.preventDefault();
        event.stopPropagation();
    });

    $("#modalCargandoTriaje").on('hidden.bs.modal', function () {
        beanRequestTriaje.operation = "paginate";
        beanRequestTriaje.type_request = "GET";
    });
    $("#sizePageTriaje").change(function () {
        $('#modalCargandoTriaje').modal('show');
    });
    $("#txtPesoPaciente").change(function () {
        document.querySelector("#txtImcPaciente").value = document.querySelector("#txtPesoPaciente").value * document.querySelector("#txtTallaPaciente").value;
    });
    $("#txtTallaPaciente").change(function () {
        document.querySelector("#txtImcPaciente").value = document.querySelector("#txtPesoPaciente").value * document.querySelector("#txtTallaPaciente").value;
    });


    //HISTORIA

    //INICIALIZANDO VARIABLES DE SOLICITUD HISTORIA
    beanRequestHistoria.entity_api = "api/historiaclinica";
    beanRequestHistoria.operation = "paginate";
    beanRequestHistoria.type_request = "GET";


});



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
            row += "<i class='text-primary fa fa-file-alt '></i></a></li>";
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

    document.querySelectorAll('.historia-clinica').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            document.querySelector("#buttonTriaje").classList.remove("active");
            document.querySelector("#buttonFiliacion").classList.add("active");
            document.querySelector("#tab-pane-17").classList.remove("active");
            document.querySelector("#tab-pane-15").classList.add("active");
            pacienteSelected = findByPaciente(btn.parentElement.parentElement.parentElement.getAttribute('idpaciente'));
            if (pacienteSelected != undefined) {
                console.log(pacienteSelected.idatendido);
                processAjaxHistoria(pacienteSelected.idatendido);
                //SET VALUES MODAL
                document.querySelector("#txtTipoDocumentoPaciente").value = pacienteSelected.tipo_documento;
                document.querySelector("#txtUsuarioPaciente").value = pacienteSelected.tipo_atendido;
                document.querySelector("#txtSubusuarioPaciente").value = pacienteSelected.subtipo_atendido ;
                document.querySelector("#txtEstadoPaciente").value = pacienteSelected.estado_civil;
                document.querySelector("#txtCodigoPaciente").value = pacienteSelected.codigo;
                document.querySelector("#txtNumeroDocumentoPaciente").value = pacienteSelected.dni;
                document.querySelector("#txtApPaternoPaciente").value = pacienteSelected.apellido_pat;
                document.querySelector("#txtApMaternoPaciente").value = pacienteSelected.apellido_mat;
                document.querySelector("#txtNombrePaciente").value = pacienteSelected.nombre;
                document.querySelector("#txtSexoPaciente").value = pacienteSelected.sexo ;
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

//historia

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
            if (beanRequestHistoria.operation == "update") {
                json = {
                    "idhistoria_clinica": historiaSelected.idhistoria_clinica,
                    "num_historia": document.querySelector("#txtHistoriaPaciente").value,
                    "tipo_seguro": document.querySelector("#txtSeguroPaciente").value,
                    "personal": {"idpersonal": doctorSelected.idpersonal},
                    "familiares": document.querySelector("#txtAntFamiliPaciente").value,
                    "personales": document.querySelector("#txtAntPersonalPaciente").value,
                    "alergias": document.querySelector("#txtAlergiaPaciente").value,
                    "atendido": {"idatendido": pacienteSelected.idatendido}
                };

            } else {
                json = {
                    "idhistoria_clinica": "",
                    "num_historia": "HC" + pacienteSelected.dni + "-" + Math.floor(Math.random() * 10),
                    "tipo_seguro": 4,
                    "personal": {"idpersonal": 1},
                    "familiares": " ",
                    "personales": " ",
                    "alergias": " ",
                    "atendido": {"idatendido": pacienteSelected.idatendido}
                };
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
        console.log(beanCrudResponse.beanPagination.list[0]);
        $('#modalCargandoPaciente').modal("hide");
        historiaSelected = beanCrudResponse.beanPagination.list[0];
        if (beanCrudResponse.beanPagination.list.length == 0) {
            beanRequestHistoria.operation = "add";
            beanRequestHistoria.type_request = "POST";
            processAjaxHistoria(pacienteSelected.idatendido);
        }

    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoPaciente').modal("hide");
        showAlertErrorRequest();

    });
}


//TRIAJE
function processAjaxTriaje(idhistoria) {
    var mes = fechaActual.getMonth() + 1; //obteniendo mes
    var dia = fechaActual.getDate(); //obteniendo dia
    if (dia < 10)
        dia = '0' + dia; //agrega cero si el menor de 10
    if (mes < 10)
        mes = '0' + mes; //agrega cero si el menor de 10
    let parameters_pagination = "";
    let json = "";
    if (beanRequestTriaje.operation == "paginate") {
        parameters_pagination += "?idhistoria=" + idhistoria;
        parameters_pagination += "&page=" + 1;
        parameters_pagination += "&size=" + 3;

    } else {
        parameters_pagination = "";
        if (beanRequestTriaje.operation == "delete") {
            parameters_pagination = "/" + diagnosticoSelected.iddiagnostico;
            json = {};
        } else if (beanRequestTriaje.operation == "dato") {
            parameters_pagination = "/" + idhistoria;
            json = {};
        } else {
            json = {
                "presiona": document.querySelector("#txtPaPaciente").value,
                "brazo": document.querySelector("#txtZonaControlPaciente").value,
                "posicion": document.querySelector("#txtPosicionPaciente").value,
                "frecuencia_cardiaca": document.querySelector("#txtFcPaciente").value,
                "frecuencia_respiratoria": document.querySelector("#txtFrPaciente").value,
                "temperatura": document.querySelector("#txtTPaciente").value,
                "presion_oxigeno": document.querySelector("#txtSoPaciente").value,
                "glicemia": document.querySelector("#txtGlicemiaPaciente").value,
                "ayuna": document.querySelector("#txtAyunoPaciente").value,
                "peso": document.querySelector("#txtPesoPaciente").value,
                "talla": document.querySelector("#txtTallaPaciente").value,
                "imc": (document.querySelector("#txtImcPaciente").value),
                "enf_actual": "",
                "diagnostico": "",
                "tratamiento": "",
                "fecha_triaje": dia + "/" + mes + "/" + fechaActual.getFullYear(),
                "idhistoria_clinica": {"idhistoria_clinica": historiaSelected.idhistoria_clinica}
            };
            if (beanRequestTriaje.operation == "update") {
                json.iddiagnostico = diagnosticoSelected.iddiagnostico;
            }
        }
    }
    $.ajax({
        url: getHostAPI() + beanRequestTriaje.entity_api + "/" + beanRequestTriaje.operation + parameters_pagination,
        type: beanRequestTriaje.type_request,
        data: JSON.stringify(json),
        headers: {
            //'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        console.log(beanCrudResponse);
        $('#modalCargandoTriaje').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                $('#ventanaModalPaciente').modal("hide");
                showAlertTopEnd('success', 'Acción realizada exitosamente');
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationTriaje = beanCrudResponse.beanPagination;
            toListTriaje(beanPaginationTriaje);

        }

    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoPaciente').modal("hide");
        showAlertErrorRequest();

    });
}

function addInputTriaje(diagnosticoSelected) {

    document.querySelector("#txtPaPaciente").value = diagnosticoSelected.presiona;
    document.querySelector("#txtZonaControlPaciente").selectedIndex = diagnosticoSelected.brazo + 1;
    document.querySelector("#txtPosicionPaciente").value = diagnosticoSelected.posicion;
    document.querySelector("#txtFcPaciente").value = diagnosticoSelected.frecuencia_cardiaca;
    document.querySelector("#txtFrPaciente").value = diagnosticoSelected.frecuencia_respiratoria;
    document.querySelector("#txtTPaciente").value = diagnosticoSelected.temperatura;
    document.querySelector("#txtSoPaciente").value = diagnosticoSelected.presion_oxigeno;
    document.querySelector("#txtGlicemiaPaciente").value = diagnosticoSelected.glicemia;
    document.querySelector("#txtAyunoPaciente").selectedIndex = diagnosticoSelected.ayuna;
    document.querySelector("#txtPesoPaciente").value = diagnosticoSelected.peso;
    document.querySelector("#txtTallaPaciente").value = diagnosticoSelected.talla;
    document.querySelector("#txtImcPaciente").value = diagnosticoSelected.imc;
}

function limpiarInputTriaje() {

    document.querySelector("#txtPaPaciente").value = "";
    document.querySelector("#txtZonaControlPaciente").value = "-1";
    document.querySelector("#txtPosicionPaciente").value = "-1";
    document.querySelector("#txtFcPaciente").value = "";
    document.querySelector("#txtFrPaciente").value = "";
    document.querySelector("#txtTPaciente").value = "";
    document.querySelector("#txtSoPaciente").value = "";
    document.querySelector("#txtGlicemiaPaciente").value = "";
    document.querySelector("#txtAyunoPaciente").value = "-1";
    document.querySelector("#txtPesoPaciente").value = "";
    document.querySelector("#txtTallaPaciente").value = "";
    document.querySelector("#txtImcPaciente").value = "";
}

function toListTriaje(beanPagination) {
    document.querySelector("#tbodyTriaje").innerHTML = "";
    document.querySelector("#titleManagerTriaje").innerHTML = "[ " + beanPagination.count_filter + " ] TRIAJES";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(Triaje => {
            let diag = (Triaje.diagnostico != "") ? Triaje.diagnostico : "AÚN NO HAY DIAGNÓSTICO";
            let aten = (Triaje.diagnostico != "") ? "SI" : "NO";
            let fecha = (Triaje.diagnostico != "") ? Triaje.fecha_diagnostico : "PENDIENTE";
            let color = (Triaje.diagnostico != "") ? "bg-info" : "bg-danger";
            row = "<tr ";
            row += "iddiagnostico='" + Triaje.iddiagnostico + "' ";
            row += ">";
            row += "<td><ul class='dt-list dt-list-cm-0'>";
            row += "<li class='dt-list__item editar-diagnostico'  title='Editar'><a class='text-light-gray' href='javascript:void(0)'>";
            row += "<i class='text-info icon icon-editors'></i></a></li>";
            row += "<li class='dt-list__item eliminar-diagnostico'  title='Eliminar'><a class='text-light-gray' href='javascript:void(0)'>";
            row += "<i class='text-danger icon icon-trash-filled'></i></a></li>";
            row += "</ul></td>";
            row += "<td class='" + color + " text-white align-middle'>" + aten + "</td>";
            row += "<td class=' align-middle'>" + fecha + "</td>";
            row += "<td class=' align-middle'>" + diag + "</td>";
            row += "</tr>";
            document.querySelector("#tbodyTriaje").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageTriaje").value),
                document.querySelector("#pageTriaje"),
                $('#modalCargandoTriaje'),
                $('#paginationTriaje'));
        addEventsTriaje();
        if (beanRequestTriaje.operation == "paginate") {
            // document.querySelector("#txtFilterTriaje").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationTriaje'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        //document.querySelector("#txtFilterTriaje").focus();
    }
}

function addEventsTriaje() {
    document.querySelectorAll('.editar-diagnostico').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            diagnosticoSelected = findByTriaje(btn.parentElement.parentElement.parentElement.getAttribute('iddiagnostico'));
            addInputTriaje(diagnosticoSelected);
            //CONFIGURAMOS LA SOLICITUD
            beanRequestTriaje.operation = "update";
            beanRequestTriaje.type_request = "PUT";
            // DNI PRUEBA 75231069
            //SET TITLE MODAL
            document.querySelector("#txtTituloModalTriaje").innerHTML = "EDITAR TRIAJE";
            //OPEN MODEL
            $('#ventanaModalPaciente').modal('show');
        };
    });

    document.querySelectorAll('.eliminar-diagnostico').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            diagnosticoSelected = findByTriaje(btn.parentElement.parentElement.parentElement.getAttribute('iddiagnostico'));
            beanRequestTriaje.operation = "delete";
            beanRequestTriaje.type_request = "DELETE";
            $('#modalCargandoTriaje').modal('show');
        };
    });
}

function findByTriaje(iddiagnostico) {
    let diagnostico_;
    beanPaginationTriaje.list.forEach(diagnostico => {
        if (iddiagnostico == diagnostico.iddiagnostico) {
            diagnostico_ = diagnostico;
            return;
        }
    });
    return diagnostico_;
}

function validateFormTriaje() {
    console.log(document.querySelector("#txtPaPaciente").value);
    if (document.querySelector("#txtPaPaciente").value  == "") {
        showAlertTopEnd('warning', 'Por favor ingrese PA');
        document.querySelector("#txtPaPaciente").focus();
        return false;
    } else if (document.querySelector("#txtZonaControlPaciente").value == "-1") {
        showAlertTopEnd('warning', 'Por favor ingrese Zona de Control');
        document.querySelector("#txtZonaControlPaciente").focus();
        return false;

    } else if (document.querySelector("#txtPosicionPaciente").value == "-1") {
        showAlertTopEnd('warning', 'Por favor ingrese Posición');
        document.querySelector("#txtPosicionPaciente").focus();
        return false;

    } else if (document.querySelector("#txtFcPaciente").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese FC');
        document.querySelector("#txtFcPaciente").focus();
        return false;

    } else if (document.querySelector("#txtFrPaciente").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese FR');
        document.querySelector("#txtFrPaciente").focus();
        return false;
    } else if (document.querySelector("#txtTPaciente").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Temperatura');
        document.querySelector("#txtTPaciente").focus();
        return false;
    } else if (document.querySelector("#txtSoPaciente").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese SO2');
        document.querySelector("#txtSoPaciente").focus();
        return false;
    } else if (document.querySelector("#txtGlicemiaPaciente").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Glicemia');
        document.querySelector("#txtGlicemiaPaciente").focus();
        return false;
    } else if (document.querySelector("#txtAyunoPaciente").value == "-1") {
        showAlertTopEnd('warning', 'Por favor ingrese Ayuno');
        document.querySelector("#txtAyunoPaciente").focus();
        return false;
    } else if (document.querySelector("#txtPesoPaciente").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Peso');
        document.querySelector("#txtPesoPaciente").focus();
        return false;
    } else if (document.querySelector("#txtTallaPaciente").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Talla');
        document.querySelector("#txtTallaPaciente").focus();
        return false;
    }

    return true;
}