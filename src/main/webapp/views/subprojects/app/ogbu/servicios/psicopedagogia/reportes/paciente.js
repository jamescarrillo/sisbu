
var beanPaginationPaciente;
var pacienteSelected; var escuelaSelected;
var cicloAcademicoSelected;
var beanRequestPaciente = new BeanRequest();
var fechaActual = new Date(); //Fecha actual
document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD ATENDIDO
    beanRequestPaciente.entity_api = "api/atendido";
    beanRequestPaciente.operation = "paginate/psicopedagogia";
    beanRequestPaciente.type_request = "GET";

    $("#modalCargandoVDYA").on('shown.bs.modal', function () {
        processAjaxValidacionHistoria();
    });

    $('#FrmPaciente').submit(function (event) {
        $('#modalCargandoPaciente').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $("#modalCargandoPaciente").on('shown.bs.modal', function () {
        processAjaxPaciente();
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
    if (beanPaginationProcedimientoC == undefined) {
        processAjaxProcedimientoC();
    }

    let parameters_pagination = "";
    let json = "";
    if (beanRequestPaciente.operation == "paginate/psicopedagogia") {
        parameters_pagination += "?filter=" + document.querySelector("#txtFilterPaciente").value.trim();
        parameters_pagination += "/";
        parameters_pagination += (escuelaSelected == undefined) ? "" : escuelaSelected.idescuela;
        parameters_pagination += "/";
        parameters_pagination += (cicloAcademicoSelected == undefined) ? "" : cicloAcademicoSelected.idciclo_academico;
        parameters_pagination += "/" + document.querySelector("#txtFilterTipoPersonaPaciente").value.trim();
        parameters_pagination += "/" + document.querySelector("#txtFilterEstadoPaciente").value.trim();
        parameters_pagination += "&page=" + document.querySelector("#pagePaciente").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePagePaciente").value;

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
                    <div class="dt-widget__info text-truncate pl-5" style="max-width: 12%;">
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
                    <div class="dt-widget__info text-truncate" style="max-width: 12%;">
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
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate" style="max-width: 12%;">
                        <p class="mb-0 text-truncate ">
                           F. REALIZADA
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate">
                        <p class="mb-0 text-truncate ">
                           PROCEDIMIENTO
                        </p>
                    </div>
                    <!-- /widget info -->
                    
                </div>
            `;
        document.querySelector("#tbodyPaciente").innerHTML += row;
        let text_row;
        beanPagination.list.forEach(eva => {

            row =
                `
                 <div class="dt-widget__item border-success pl-5 m-0">
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " style="max-width: 12%;">
                        <p class="mb-0 text-truncate ">
                           ${eva.atendido.dni}
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate">
                        <p class="mb-0 text-truncate ">
                           ${eva.atendido.apellido_pat} ${eva.atendido.apellido_mat} ${eva.atendido.nombre}
                        </p>
                        <p class="mb-0 text-truncate ">
                           ${eva.atendido.fecha_nacimiento}
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate" style="max-width: 12%;">
                        <p class="mb-0 text-truncate ">
                           ${tipoPaciente(eva.atendido.tipo_atendido)}
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate">
                        <p class="mb-0 text-truncate ">
            ${eva.atendido.tipo_atendido == 1 ? (eva.atendido.escuela.nombre == null ? "" : eva.atendido.escuela.nombre) : subtipoPaciente(eva.atendido.subtipo_atendido)}
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate" style="max-width: 12%;">
                        <p class="mb-0 text-truncate ">
                           ${eva.fecha_inicio == null ? "" : eva.fecha_inicio.split(" ")[0]} 
                        </p>
                        <p class="mb-0 text-truncate ">
                        ${eva.fecha_inicio == null ? "" : eva.fecha_inicio.split(" ")[1]} 
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate">
                        <p class="mb-0 text-truncate ">
                           ${eva.procedimiento.descripcion == null ? "" : eva.procedimiento.descripcion} 
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

        if (beanRequestPaciente.operation == "paginate") {
            document.querySelector("#txtFilterPaciente").focus();
        }

    } else {
        destroyPagination($('#paginationPaciente'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterPaciente").focus();
    }
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