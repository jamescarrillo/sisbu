var beanPaginationPaciente;
var beanPaginationTriaje;
var pacienteSelected;
var historiaSelected;
var diagnosticoSelected;
var beanRequestPaciente = new BeanRequest();
var beanRequestTriaje = new BeanRequest();
var fechaActual = new Date(); //Fecha actual
document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD ATENDIDO
    beanRequestPaciente.entity_api = "api/atendido";
    beanRequestPaciente.operation = "paginate";
    beanRequestPaciente.type_request = "GET";
    document.querySelector("#openPaciente").style.display = "none";
    $("#modalCargandoVDYA").on('shown.bs.modal', function () {
        processAjaxValidacionHistoria();
    });
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
        document.querySelector("#tab-pane-15").style.display = "initial";
        document.querySelector("#tab-pane-17").style.display = "none";
        document.querySelector("#newOpenTriaje").style.display = "none";
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
        document.querySelector("#txtTituloModalTriaje").innerHTML =
            "REGISTRAR TRIAJE<small class='pl-5 text-dark'>N° HISTORIA : "
            + historiaSelected.num_historia + "</small>";
        //OPEN MODEL
        document.querySelector("#tab-pane-17").style.display = "none";
        document.querySelector("#newOpenTriaje").style.display = "initial";
    };

    $("#modalCargandoTriaje").on('shown.bs.modal', function () {
        processAjaxTriaje();
    });

    $('#FrmTriajePaciente').submit(function (event) {
        if (validateFormTriaje()) {
            $('#modalCargandoTriaje').modal('show');
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

    document.querySelector("#txtPesoPaciente").onkeyup = function () {
        document.querySelector("#txtImcPaciente").value = document.querySelector("#txtPesoPaciente").value * document.querySelector("#txtTallaPaciente").value;
    };

    document.querySelector("#txtTallaPaciente").onkeyup = function () {
        document.querySelector("#txtImcPaciente").value = document.querySelector("#txtPesoPaciente").value * document.querySelector("#txtTallaPaciente").value;
    };

    document.querySelector("#buttonTriaje").onclick = function () {
        document.querySelector("#newOpenTriaje").style.display = "none";
        document.querySelector("#tab-pane-15").style.display = "none";
        document.querySelector("#tab-pane-17").style.display = "initial";
        getTriajeModal();

    };


    document.querySelector("#btnCancelarTriaje").onclick = function () {
        document.querySelector("#newOpenTriaje").style.display = "none";
        document.querySelector("#tab-pane-17").style.display = "block";
        getTriajeModal();

    };
    document.querySelector("#buttonFiliacion").onclick = function () {
        document.querySelector("#tab-pane-15").style.display = "initial";
        document.querySelector("#tab-pane-17").style.display = "none";
        document.querySelector("#newOpenTriaje").style.display = "none";
    };

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

function getTriajeModal() {
    beanRequestTriaje.operation = "paginate";
    beanRequestTriaje.type_request = "GET";
    $('#modalCargandoTriaje').modal('show');
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
                           ${atendido.fecha_nacimiento}
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
            document.querySelector("#buttonTriaje").classList.remove("active");
            document.querySelector("#buttonFiliacion").classList.add("active");
            document.querySelector("#tab-pane-17").classList.remove("active");
            document.querySelector("#tab-pane-15").classList.add("active");
            document.querySelector("#tab-pane-17").style.display = "none";
            document.querySelector("#newOpenTriaje").style.display = "none";
            document.querySelector("#tab-pane-15").style.display = "initial";
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


//TRIAJE
function processAjaxTriaje() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestTriaje.operation == "paginate") {
        parameters_pagination += "?idatendido=" + pacienteSelected.idatendido;
        parameters_pagination += "&page=" + document.querySelector("#pageTriaje").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePageTriaje").value;

    } else {
        parameters_pagination = "";
        if (beanRequestTriaje.operation == "delete") {
            parameters_pagination = "/" + diagnosticoSelected.iddiagnostico;
        } else if (beanRequestTriaje.operation == "dato") {
            parameters_pagination = "/" + idhistoria;
        } else {
            if (beanRequestTriaje.operation == "add") {
                diagnosticoSelected = undefined;
            }
            if (diagnosticoSelected != undefined) {
                if (diagnosticoSelected.diagnostico == null || diagnosticoSelected.diagnostico == "") {
                    diagnosticoSelected.diagnostico = "";
                }
                if (diagnosticoSelected.enf_actual == null || diagnosticoSelected.enf_actual == "") {
                    diagnosticoSelected.enf_actual = "";
                }
                if (diagnosticoSelected.tratamiento == null || diagnosticoSelected.tratamiento == "") {
                    diagnosticoSelected.tratamiento = "";
                }
                if (diagnosticoSelected.fecha_diagnostico == null || diagnosticoSelected.fecha_diagnostico == "") {
                    diagnosticoSelected.fecha_diagnostico = "";
                }
            } else {
                diagnosticoSelected = [];
                diagnosticoSelected.fecha_diagnostico = "";
                diagnosticoSelected.diagnostico = ""
                diagnosticoSelected.tratamiento = "";
                diagnosticoSelected.enf_actual = "";
            }


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
                "fecha_diagnostico": diagnosticoSelected.fecha_diagnostico,
                "enf_actual": diagnosticoSelected.enf_actual,
                "diagnostico": diagnosticoSelected.diagnostico,
                "tratamiento": diagnosticoSelected.tratamiento,
                "fecha_triaje": getTimesTampJavaScriptCurrent(),
                "idhistoria_clinica": { "idhistoria_clinica": historiaSelected.idhistoria_clinica }
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
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoTriaje').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
                limpiarInputTriaje();
                document.querySelector("#newOpenTriaje").style.display = "none";
                document.querySelector("#tab-pane-17").style.display = "block";
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
            let color = (Triaje.diagnostico != "") ? "bg-success" : "bg-danger";
            row = "<tr ";
            row += "iddiagnostico='" + Triaje.iddiagnostico + "' ";
            row += ">";
            row += "<td class='pb-2'><ul class='dt-list dt-list-cm-0'>";
            row += "<li class='dt-list__item editar-diagnostico'  title='Editar'><a class='text-light-gray' href='javascript:void(0)'>";
            row += "<i class='text-info icon icon-editors'></i></a></li>";
            row += "<li class='dt-list__item eliminar-diagnostico'  title='Eliminar'><a class='text-light-gray' href='javascript:void(0)'>";
            row += "<i class='text-danger icon icon-trash-filled'></i></a></li>";
            row += "</ul></td>";
            row += "<td class='" + color + " text-white align-middle text-center pb-2' style='width:10%'>" + aten + "</td>";
            row += "<td class=' align-middle pb-2'>" + fecha + "</td>";
            row += "<td class=' align-middle pb-2'>" + diag + "</td>";
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
    historiaSelected = beanPagination.list[0].idhistoria_clinica;
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
            document.querySelector("#txtTituloModalTriaje").innerHTML = "ACTUALIZAR TRIAJE<small class='pl-5 text-dark'>N° HISTORIA : " + historiaSelected.num_historia + "</small>";
            //OPEN MODEL

            document.querySelector("#tab-pane-17").style.display = "none";
            document.querySelector("#newOpenTriaje").style.display = "initial";
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
    if (document.querySelector("#txtPaPaciente").value == "") {
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
function processAjaxValidacionHistoria() {
    let url_request = getHostAPI() + "api/historiaclinica/validate-historia?idatendido=" + pacienteSelected.idatendido;
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

                let url_constancia = getHostAPI() + "api/constancias/triaje";
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