var beanPaginationPaciente;
var beanPaginationDiagnostico;
var pacienteSelected;
var historiaSelected;
var diagnosticoSelected;
var beanRequestPaciente = new BeanRequest();
var beanRequestDiagnostico = new BeanRequest();
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
        beanRequestPaciente.operation = "paginate";
        beanRequestPaciente.type_request = "GET";
        $('#modalCargandoPaciente').modal('show');
    });

    //DIAGNOSTICO
    //INICIALIZANDO VARIABLES DE SOLICITUD DIAGNSTICO
    beanRequestDiagnostico.entity_api = "api/diagnosticos";
    beanRequestDiagnostico.operation = "paginate";
    beanRequestDiagnostico.type_request = "GET";


    $("#modalCargandoDiagnostico").on('shown.bs.modal', function () {
        processAjaxDiagnostico();
    });



    $("#sizePageDiagnostico").change(function () {

        $('#modalCargandoDiagnostico').modal('show');
    });

    document.querySelector("#txtPesoPaciente").onkeyup = function () {
        document.querySelector("#txtImcPaciente").value = document.querySelector("#txtPesoPaciente").value * document.querySelector("#txtTallaPaciente").value;
    };

    document.querySelector("#txtTallaPaciente").onkeyup = function () {
        document.querySelector("#txtImcPaciente").value = document.querySelector("#txtPesoPaciente").value * document.querySelector("#txtTallaPaciente").value;
    };


    //HISTORIA
    //INICIALIZANDO VARIABLES DE SOLICITUD ATENDIDO
    beanRequestHistoria.entity_api = "api/historiaclinica";
    beanRequestHistoria.operation = "dato";
    beanRequestHistoria.type_request = "GET";

    $("#modalCargandoHistoria").on('shown.bs.modal', function () {
        processAjaxHistoria();
    });

    $("#modalCargandoHistoria").on('hidden.bs.modal', function () {
        beanRequestHistoria.operation = "update";
        beanRequestHistoria.type_request = "PUT";
    });

    document.querySelector("#buttonAntecedente").onclick = function () {

        document.querySelector("#tab-pane-15").style.display = "none";
        document.querySelector("#tab-pane-17").style.display = "none";
        document.querySelector("#newOpenDiagnostico").style.display = "none";
        document.querySelector("#tab-pane-16").style.display = "initial";
        beanRequestHistoria.operation = "dato";
        beanRequestHistoria.type_request = "GET";
        $('#modalCargandoHistoria').modal('show');

    };
    document.querySelector("#buttonFiliacion").onclick = function () {

        document.querySelector("#tab-pane-16").style.display = "none";
        document.querySelector("#tab-pane-17").style.display = "none";
        document.querySelector("#newOpenDiagnostico").style.display = "none";
        document.querySelector("#tab-pane-15").style.display = "initial";

    };

    document.querySelector("#buttonDiagnostico").onclick = function () {
        document.querySelector("#tab-pane-15").style.display = "none";
        document.querySelector("#tab-pane-16").style.display = "none";
        document.querySelector("#newOpenDiagnostico").style.display = "none";
        document.querySelector("#tab-pane-17").style.display = "initial";
        $('#modalCargandoDiagnostico').modal('show');

    };
    document.querySelector("#btnCancelarDiagnostico").onclick = function () {
        document.querySelector("#tab-pane-17").style.display = "initial";
        document.querySelector("#newOpenDiagnostico").style.display = "none";
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
        return showAlertTopEnd('warning', "la operación no existe");
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
    if (beanPagination.count_filter > 0) {
        let row;
        row =
            `
               <div class="dt-widget__item border-success bg-primary text-white pl-5 mb-0 pb-2"">
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
        document.querySelector("#tbodyPaciente").innerHTML += row;
        beanPagination.list.forEach(atendido => {
            row =
                `
                 <div class="dt-widget__item border-success pl-5 m-0">
                    <!-- Widget Extra -->
                    <div class="dt-widget__extra text-right">
                      
                        <!-- Hide Content -->
                        <div class="hide-content pr-2">
                            <!-- Action Button Group -->
                            <div class="action-btn-group">
                                <button class="btn btn-default text-primary dt-fab-btn historia-clinica" idpaciente='${atendido.idatendido}' title="Ver Diagnótico" data-toggle="tooltip">
                                    <i class="fa fa-file-alt"></i>
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
            document.querySelector("#buttonAntecedente").classList.remove("active");
            document.querySelector("#buttonFiliacion").classList.remove("active");
            document.querySelector("#tab-pane-16").classList.remove("active");
            document.querySelector("#tab-pane-15").classList.remove("active");
            document.querySelector("#tab-pane-16").style.display = "none";
            document.querySelector("#newOpenDiagnostico").style.display = "none";
            document.querySelector("#tab-pane-15").style.display = "none";
            document.querySelector("#tab-pane-17").style.display = "initial";
            document.querySelector("#tab-pane-17").classList.add("active");
            document.querySelector("#buttonDiagnostico").classList.add("active");
            pacienteSelected = findByPaciente(btn.getAttribute('idpaciente'));
            $('#modalCargandoDiagnostico').modal('show');
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
            } else {
                showAlertTopEnd('warning', 'No se encontró el Paciente para poder editar');
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
    document.querySelector("#txtHistoriaPaciente").value = historiaSelected.num_historia;
    document.querySelector("#txtSeguroPaciente").value = historiaSelected.tipo_seguro;
    if (historiaSelected.personal.idpersonal == 1) {
        document.querySelector("#txtMedicoPaciente").value = " ";
    } else {
        document.querySelector("#txtMedicoPaciente").value = historiaSelected.personal.apellido_pat + " " +
            historiaSelected.personal.apellido_mat + " " + historiaSelected.personal.nombre;
    }

    document.querySelector("#txtAntFamiliPaciente").value = historiaSelected.familiares;
    document.querySelector("#txtAntPersonalPaciente").value = historiaSelected.personales;
    document.querySelector("#txtAlergiaPaciente").value = historiaSelected.alergias;

}

function processAjaxHistoria() {
    let parameters_pagination = "";
    let json = "";
    parameters_pagination = "/" + pacienteSelected.idatendido
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
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        $('#modalCargandoHistoria').modal("hide");
        if (beanCrudResponse.idhistoria_clinica != undefined) {
            historiaSelected = beanCrudResponse;
            addInputHistoria(historiaSelected);
        }

    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoPaciente').modal("hide");
        showAlertErrorRequest();

    });
}

//DIAGNOSTICO
function processAjaxDiagnostico() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestDiagnostico.operation == "paginate") {
        parameters_pagination += "?idatendido=" + pacienteSelected.idatendido;
        parameters_pagination += "&page=" + document.querySelector("#pageDiagnostico").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePageDiagnostico").value;
    } else {
        return showAlertTopEnd('warning', "la operación no existe");
    }
    $.ajax({
        url: getHostAPI() + beanRequestDiagnostico.entity_api + "/" + beanRequestDiagnostico.operation + parameters_pagination,
        type: beanRequestDiagnostico.type_request,
        data: JSON.stringify(json),
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoDiagnostico').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                document.querySelector("#tab-pane-17").style.display = "initial";
                document.querySelector("#newOpenDiagnostico").style.display = "none";
                $('#modalCargandoDiagnostico').modal('show');
                showAlertTopEnd('success', 'Acción realizada exitosamente');
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationDiagnostico = beanCrudResponse.beanPagination;
            toListDiagnostico(beanPaginationDiagnostico);

        }

    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoPaciente').modal("hide");
        showAlertErrorRequest();

    });
}

function addInputDiagnostico(diagnosticoSelected) {

    document.querySelector("#txtPaPaciente").value = diagnosticoSelected.presiona;
    document.querySelector("#txtZonaControlPaciente").value = diagnosticoSelected.brazo;
    document.querySelector("#txtPosicionPaciente").value = diagnosticoSelected.posicion;
    document.querySelector("#txtFcPaciente").value = diagnosticoSelected.frecuencia_cardiaca;
    document.querySelector("#txtFrPaciente").value = diagnosticoSelected.frecuencia_respiratoria;
    document.querySelector("#txtTPaciente").value = diagnosticoSelected.temperatura;
    document.querySelector("#txtSoPaciente").value = diagnosticoSelected.presion_oxigeno;
    document.querySelector("#txtGlicemiaPaciente").value = diagnosticoSelected.glicemia;
    document.querySelector("#txtAyunoPaciente").value = diagnosticoSelected.ayuna;
    document.querySelector("#txtPesoPaciente").value = diagnosticoSelected.peso;
    document.querySelector("#txtTallaPaciente").value = diagnosticoSelected.talla;
    document.querySelector("#txtImcPaciente").value = diagnosticoSelected.imc;
    document.querySelector("#txtEnfermedadPaciente").value = diagnosticoSelected.enf_actual;
    document.querySelector("#txtDxPaciente").value = diagnosticoSelected.diagnostico;
    document.querySelector("#txtTtoPaciente").value = diagnosticoSelected.tratamiento;
}

function toListDiagnostico(beanPagination) {
    document.querySelector("#tbodyDiagnostico").innerHTML = "";
    document.querySelector("#titleManagerDiagnostico").innerHTML = "[ " + beanPagination.count_filter + " ] DIAGNOSTICOS";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(Diagnostico => {
            let diag = (Diagnostico.diagnostico != "") ? Diagnostico.diagnostico : "AÚN NO HAY DIAGNÓSTICO";
            let aten = (Diagnostico.diagnostico != "") ? "SI" : "NO";
            let fecha = (Diagnostico.diagnostico != "") ? Diagnostico.fecha_diagnostico : "PENDIENTE";
            let color = (Diagnostico.diagnostico != "") ? "bg-success" : "bg-danger";
            row = "<tr ";
            row += "iddiagnostico='" + Diagnostico.iddiagnostico + "' ";
            row += ">";
            row += "<td class='pb-2'><ul class='dt-list dt-list-cm-0'>";
            row += "<li class='dt-list__item editar-diagnostico '  title='Editar'><a class='text-light-gray' href='javascript:void(0)'>";
            row += "<i class='text-info icon icon-editors'></i></a></li>";
            row += "</ul></td>";
            row += "<td class='" + color + " text-white align-middle pb-2'style='width:10%'>" + aten + "</td>";
            row += "<td class='align-middle pb-2'>" + fecha + "</td>";
            row += "<td class='align-middle pb-2'>" + diag + "</td>";
            row += "</tr>";
            document.querySelector("#tbodyDiagnostico").innerHTML += row;
        });
        buildPagination(
            beanPagination.count_filter,
            parseInt(document.querySelector("#sizePageDiagnostico").value),
            document.querySelector("#pageDiagnostico"),
            $('#modalCargandoDiagnostico'),
            $('#paginationDiagnostico'));
        addEventsDiagnostico();
        historiaSelected = beanPagination.list[0].idhistoria_clinica;
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationDiagnostico'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        //document.querySelector("#txtFilterDiagnostico").focus();
    }
}

function addEventsDiagnostico() {
    document.querySelectorAll('.editar-diagnostico').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            diagnosticoSelected = findByDiagnostico(btn.parentElement.parentElement.parentElement.getAttribute('iddiagnostico'));
            addInputDiagnostico(diagnosticoSelected);
            //CONFIGURAMOS LA SOLICITUD
            // DNI PRUEBA 75231069

            document.querySelector("#txtTituloModalDiagnostico").innerHTML = "<small class='text-dark'>N° HISTORIA : " + historiaSelected.num_historia + "</small>";
            //OPEN MODEL
            document.querySelector("#tab-pane-17").style.display = "none";
            document.querySelector("#newOpenDiagnostico").style.display = "initial";
        };
    });
}

function findByDiagnostico(iddiagnostico) {
    let diagnostico_;
    beanPaginationDiagnostico.list.forEach(diagnostico => {
        if (iddiagnostico == diagnostico.iddiagnostico) {
            diagnostico_ = diagnostico;
            return;
        }
    });
    return diagnostico_;
}


