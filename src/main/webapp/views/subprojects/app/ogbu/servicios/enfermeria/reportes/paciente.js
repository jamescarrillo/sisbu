var beanPaginationPaciente;
var pacienteSelected;
var escuelaSelected;
var cicloAcademicoSelected;
var beanRequestPaciente = new BeanRequest();
var fechaActual = new Date(); //Fecha actual
document.addEventListener("DOMContentLoaded", function () {
    //INICIALIZANDO VARIABLES DE SOLICITUD ATENDIDO
    beanRequestPaciente.entity_api = "api/atendido";
    beanRequestPaciente.operation = "paginate/enfermeria";
    beanRequestPaciente.type_request = "GET";

    $("#modalCargandoVDYA").on('shown.bs.modal', function () {
        processAjaxValidacionHistoria();
    });

    $('#FrmPaciente').submit(function (event) {
        beanRequestPaciente.operation = "paginate/enfermeria";
        beanRequestPaciente.type_request = "GET";
        $('#modalCargandoPaciente').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $("#modalCargandoPaciente").on('shown.bs.modal', function () {
        processAjaxPaciente();
    });

    $("#modalCargandoPaciente").on('hidden.bs.modal', function () {
        beanRequestPaciente.operation = "paginate/enfermeria";
        beanRequestPaciente.type_request = "GET";
    });

    $('#modalCargandoPaciente').modal('show');

    $("#sizePagePaciente").change(function () {
        $('#modalCargandoPaciente').modal('show');
    });
    $("#txtFilterTipoPersonaPaciente").change(function () {
        $('#modalCargandoPaciente').modal('show');
    });
    $("#txtFilterEstadoPaciente").change(function () {
        $('#modalCargandoPaciente').modal('show');
    });
});

function processAjaxPaciente() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestPaciente.operation == "paginate/enfermeria") {


        parameters_pagination += "?filter=" + document.querySelector("#txtFilterPaciente").value.trim();
        parameters_pagination += "/";
        parameters_pagination += (escuelaSelected == undefined) ? "" : escuelaSelected.idescuela;
        parameters_pagination += "/";
        parameters_pagination += (cicloAcademicoSelected == undefined) ? "" : cicloAcademicoSelected.idciclo_academico;
        parameters_pagination += "/" + document.querySelector("#txtFilterTipoPersonaPaciente").value.trim();
        parameters_pagination += "/" + document.querySelector("#txtFilterEstadoPaciente").value.trim();
        parameters_pagination += "&page=" + document.querySelector("#pagePaciente").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePagePaciente").value;
        console.log(parameters_pagination);
    } else {
        return;
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
               <div class="dt-widget__item border-success bg-primary text-white pl-5 mb-0 pb-2">
                    <!-- Widget Info -->
                    <div class="dt-widget__info  pl-5" style="max-width: 15%;">
                        <p class="mb-0  ">
                           DNI
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info ">
                        <p class="mb-0  ">
                           NOMBRE COMPLETO /
                        </p>
                        <p class="mb-0  ">
                           FECHA DE NACIMIENTO
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info " style="max-width: 15%;">
                        <p class="mb-0  ">
                           TIPO DE PACIENTE
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info ">
                        <p class="mb-0  ">
                           ESCUELA PROFESIONAL
                        </p>
                    </div>
                    <!-- /widget info -->
                    
                </div>
            `;
        document.querySelector("#tbodyPaciente").innerHTML += row;
        let text_row;
        beanPagination.list.forEach(atendido => {
            row =
                `
                 <div class="dt-widget__item border-success pl-5 m-0">
                    <!-- Widget Info -->
                    <div class="dt-widget__info  " style="max-width: 15%;">
                        <p class="mb-0  ">
                           ${atendido.dni}
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info ">
                        <p class="mb-0  ">
                           ${atendido.apellido_pat} ${atendido.apellido_mat} ${atendido.nombre}
                        </p>
                        <p class="mb-0  ">
                           ${atendido.fecha_nacimiento}
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info " style="max-width: 15%;">
                        <p class="mb-0  ">
                           ${tipoPaciente(atendido.tipo_atendido)}
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info ">
                        <p class="mb-0  ">
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
        if (beanRequestPaciente.operation == "paginate/enfermeria") {
            document.querySelector("#txtFilterPaciente").focus();
        }

    } else {
        destroyPagination($('#paginationPaciente'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterPaciente").focus();
    }
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