var beanPaginationPaciente;
var pacienteSelected;
var beanRequestPaciente = new BeanRequest();
var fechaActual = new Date(); //Fecha actual
document.addEventListener("DOMContentLoaded", function () {
    //INICIALIZANDO VARIABLES DE SOLICITUD ATENDIDO
    beanRequestPaciente.entity_api = "api/atendido";
    beanRequestPaciente.operation = "paginate/odontologia";
    beanRequestPaciente.type_request = "GET";

    $("#modalCargandoVDYA").on('shown.bs.modal', function () {
        processAjaxValidacionHistoria();
    });

    $('#FrmPaciente').submit(function (event) {
        beanRequestPaciente.operation = "paginate/odontologia";
        beanRequestPaciente.type_request = "GET";
        $('#modalCargandoPaciente').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $("#modalCargandoPaciente").on('shown.bs.modal', function () {
        processAjaxPaciente();
    });

    $("#modalCargandoPaciente").on('hidden.bs.modal', function () {
        beanRequestPaciente.operation = "paginate/odontologia";
        beanRequestPaciente.type_request = "GET";
    });

    $('#modalCargandoPaciente').modal('show');

    $("#sizePagePaciente").change(function () {
        beanRequestPaciente.operation = "paginate/odontologia";
        beanRequestPaciente.type_request = "GET";
        $('#modalCargandoPaciente').modal('show');
    });

});

function processAjaxPaciente() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestPaciente.operation == "paginate/odontologia") {
        let filterPaciente = "0", filterCiclo = "0", filterTipo = "0", filterEstado = "3";
        if (document.querySelector("#txtFilterPaciente").value != "") {
            filterPaciente = document.querySelector("#txtFilterPaciente").value;
        }
        /*else {
         document.querySelector("#pagePaciente").value = "1";
         }*/

        if (document.querySelector("#txtFilterCicloPaciente").value != "") {
            filterCiclo = document.querySelector("#txtFilterCicloPaciente").value;

        }
        if (document.querySelector("#txtFilterTipoPersonaPaciente").value != "-1") {
            filterTipo = document.querySelector("#txtFilterTipoPersonaPaciente").value;
        }
        if (document.querySelector("#txtFilterEstadoPaciente").value != "-1") {
            filterEstado = document.querySelector("#txtFilterEstadoPaciente").value;
        }
        parameters_pagination += "?filter=" + filterPaciente + "/" + filterCiclo +
                "/" + filterTipo + "/" + filterEstado;
        parameters_pagination += "&page=" + document.querySelector("#pagePaciente").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePagePaciente").value;

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
        let text_row;
        beanPagination.list.forEach(atendido => {
            row =
                    `
                 <div class="dt-widget__item border-success pl-5">
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
        if (beanRequestPaciente.operation == "paginate/odontologia") {
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