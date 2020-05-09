var beanPaginationPaciente;
var beanPaginationDiagnostico;
var pacienteSelected;
var historiaSelected;
var diagnosticoSelected;
var beanRequestPaciente = new BeanRequest();
var beanRequestDiagnostico = new BeanRequest();
var fechaActual = new Date(); //Fecha actual
document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD ATENDIDO
    beanRequestPaciente.entity_api = "api/atendido";
    beanRequestPaciente.operation = "paginate";
    beanRequestPaciente.type_request = "GET";


    $('#FrmPaciente').submit(function (event) {
        beanRequestPaciente.operation = "paginate";
        beanRequestPaciente.type_request = "GET";
        $('#modalCargandoPaciente').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    document.querySelector("#btnCerrar").onclick = function () {
        addClass(document.querySelector("#openPaciente"), "d-none");
        removeClass(document.querySelector("#ListaPaciente"), "d-none");
    };

    $("#modalCargandoPaciente").on('shown.bs.modal', function () {
        processAjaxPaciente();
    });


    $("#modalCargandoPaciente").on('hidden.bs.modal', function () {
        beanRequestPaciente.operation = "paginate";
        beanRequestPaciente.type_request = "GET";
    });



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
            pacienteSelected = findByPaciente(btn.getAttribute('idpaciente'));
            $('#modalCargandoDiagnostico').modal('show');
            if (pacienteSelected == undefined)
                showAlertTopEnd('warning', 'No se encontró el Paciente para poder editar');

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
    document.querySelector("#txtEnfermedadPaciente").innerHTML = diagnosticoSelected.enf_actual;
    document.querySelector("#txtDxPaciente").innerHTML = diagnosticoSelected.diagnostico;
    document.querySelector("#txtTtoPaciente").innerHTML = diagnosticoSelected.tratamiento;
}

function toListDiagnostico(beanPagination) {
    document.querySelector("#tbodyDiagnostico").innerHTML = "";
    document.querySelector("#titleManagerDiagnostico").innerHTML = "[ " + beanPagination.count_filter + " ] DIAGNOSTICOS";
    if (beanPagination.count_filter == 0) {
        destroyPagination($('#paginationDiagnostico'));
        showAlertTopEnd('warning', 'No se encontraron Diagnósticos para el paciente');
        return;
    }
    addClass(document.querySelector("#newOpenDiagnostico"), "d-none");
    addClass(document.querySelector("#ListaPaciente"), "d-none");
    removeClass(document.querySelector("#openPaciente"), "d-none");
    let row;
    beanPagination.list.forEach(Diagnostico => {
        let diag = (Diagnostico.diagnostico != "") ? Diagnostico.diagnostico : "AÚN NO HAY DIAGNÓSTICO";
        let aten = (Diagnostico.diagnostico != "") ? "SI" : "NO";
        let fecha = (Diagnostico.diagnostico != "") ? Diagnostico.fecha_diagnostico : "PENDIENTE";
        let color = (Diagnostico.diagnostico != "") ? "bg-success" : "bg-danger";
        row = "<tr class='editar-diagnostico sisbu-cursor-mano'";
        row += "iddiagnostico='" + Diagnostico.iddiagnostico + "' ";
        row += ">";
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

}

function addEventsDiagnostico() {
    document.querySelectorAll('.editar-diagnostico').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            diagnosticoSelected = findByDiagnostico(btn.getAttribute('iddiagnostico'));
            if (diagnosticoSelected == undefined)
                return showAlertTopEnd('warning', 'No existe el diagnóstico');
            document.querySelector("#txtDiagnoticoSalida").value = pacienteSelected.nombre + " " + pacienteSelected.apellido_pat + " " + pacienteSelected.apellido_mat;
            addInputDiagnostico(diagnosticoSelected);
            // DNI PRUEBA 75231069
            document.querySelector("#txtTituloModalDiagnostico").innerHTML = "<small class='text-dark'>N° HISTORIA : " + historiaSelected.num_historia + "</small>";
            //OPEN MODEL
            addClass(document.querySelector("#openPaciente"), "d-none");
            removeClass(document.querySelector("#newOpenDiagnostico"), "d-none");

            addClass(document.querySelector("#btnListaSalida"), "d-none");
            removeClass(document.querySelector("#btnOpenSalida"), "d-none");
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


