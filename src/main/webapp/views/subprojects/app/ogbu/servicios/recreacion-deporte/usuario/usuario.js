var beanPaginationUsuario;
var usuarioSelected;
var beanRequestUsuario = new BeanRequest();
document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD ATENDIDO
    beanRequestUsuario.entity_api = "api/atendido";
    beanRequestUsuario.operation = "paginate";
    beanRequestUsuario.type_request = "GET";
    $("#modalCargandoVDYA").on('shown.bs.modal', function () {
        processAjaxValidacionHistoria();
    });

    $('#FrmUsuario').submit(function (event) {
        beanRequestUsuario.operation = "paginate";
        beanRequestUsuario.type_request = "GET";
        $('#modalCargandoUsuario').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });


    $('#FrmUsuarioModal').submit(function (event) {
        if (validateFormUsuario()) {
            $('#modalCargandoUsuario').modal('show');
        }
        event.preventDefault();
        event.stopPropagation();
    });

    document.querySelector("#btnCerrar").onclick = function () {
        beanRequestProcedimientoDeporte.operation = "paginate";
        beanRequestProcedimientoDeporte.type_request = "GET";
        beanRequestProcedimientoAficion.operation = "paginate";
        beanRequestProcedimientoAficion.type_request = "GET";
        document.querySelector("#openUsuario").style.display = "none";
        document.querySelector("#ListaUsuario").style.display = "block";
        document.querySelector("#tab-pane-15").classList.remove("active");
        document.querySelector("#OpenListaDeporteDetalle").classList.remove("active");
        document.querySelector("#OpenListaAficionDetalle").classList.remove("active");

    };

    $("#modalCargandoUsuario").on('shown.bs.modal', function () {
        processAjaxUsuario();
    });


    $("#modalCargandoUsuario").on('hidden.bs.modal', function () {
        beanRequestUsuario.operation = "paginate";
        beanRequestUsuario.type_request = "GET";
    });

    $('#modalCargandoUsuario').modal('show');

    $("#sizePageUsuario").change(function () {
        $('#modalCargandoUsuario').modal('show');
    });



});



function processAjaxUsuario() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestUsuario.operation == "paginate") {
        if (document.querySelector("#txtFilterUsuario").value != "") {
            document.querySelector("#pageUsuario").value = "1";
        }
        parameters_pagination += "?filter=" + document.querySelector("#txtFilterUsuario").value.toUpperCase();
        parameters_pagination += "&page=" + document.querySelector("#pageUsuario").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePageUsuario").value;

    } else {

        if (beanRequestUsuario.operation == "delete") {
            parameters_pagination = "/" + usuarioSelected.idatendido;
        } else {
            json = {
                "nombre": document.querySelector("#txtNombreUsuario").value,
            };
            if (beanRequestUsuario.operation == "update") {
                json.idusuario = usuarioSelected.idatendido;
            }
        }
    }
    $.ajax({
        url: getHostAPI() + beanRequestUsuario.entity_api + "/" + beanRequestUsuario.operation + parameters_pagination,
        type: beanRequestUsuario.type_request,
        data: JSON.stringify(json),
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        console.log(beanCrudResponse);
        $('#modalCargandoUsuario').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationUsuario = beanCrudResponse.beanPagination;
            toListUsuario(beanPaginationUsuario);

        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoUsuario').modal("hide");
        showAlertErrorRequest();

    });
}


function toListUsuario(beanPagination) {
    document.querySelector("#tbodyUsuario").innerHTML = "";
    document.querySelector("#titleManagerUsuario").innerHTML = "[ " + beanPagination.count_filter + " ] USUARIOS";
    if (beanPagination.count_filter > 0) {
        let row;
        row =
            `
               <div class="dt-widget__item border-success bg-primary text-white pl-5 mb-0 pb-2 pr-1">
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
                           TIPO DE USUARIO
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
        document.querySelector("#tbodyUsuario").innerHTML += row;
        beanPagination.list.forEach(atendido => {
            row =
                `
                 <div class="dt-widget__item border-success pl-5 m-0 pr-1">
                    <!-- Widget Extra -->
                    <div class="dt-widget__extra text-right">
                      
                        <!-- Hide Content -->
                        <div class="hide-content pr-2"">
                            <!-- Action Button Group -->
                            <div class="action-btn-group">
                                <button class="btn btn-default text-primary dt-fab-btn detalle-deporte" idusuario='${atendido.idatendido}' title="Lista de Deportes" data-toggle="tooltip">
                                    <i class="fa fa-file-alt"></i>
                                </button>
                                <button class="btn btn-default text-success dt-fab-btn detalle-aficion" idusuario='${atendido.idatendido}' title="Lista de Aficiones" data-toggle="tooltip">
                                    <i class="fa fa-file-alt"></i>
                                </button>
                                <button class="btn btn-default text-warning dt-fab-btn reporte-constancia" idusuario='${atendido.idatendido}' title="Descargar Constancia" data-toggle="tooltip">
                                    <i class="fa fa-file-pdf"></i>
                                </button>
                                <button class="btn btn-default text-danger dt-fab-btn reporte-deportes" idusuario='${atendido.idatendido}' title="Descarga Lista de Deportes y Aficiones" data-toggle="tooltip">
                                    <i class="fa fa-file-pdf"></i>
                                </button>
                            </div>
                            <!-- /action button group -->
                        </div>
                        <!-- /hide content -->
                    </div>
                    <!-- /widget extra -->
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
                           ${tipoUsuario(atendido.tipo_atendido)}
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info ">
                        <p class="mb-0  ">
            ${atendido.tipo_atendido == 1 ? (atendido.escuela.nombre == null ? "" : atendido.escuela.nombre) : subtipoUsuario(atendido.subtipo_atendido)}
                        </p>
                    </div>
                    <!-- /widget info -->
                    
                </div>
            `;
            document.querySelector("#tbodyUsuario").innerHTML += row;
            $('[data-toggle="tooltip"]').tooltip();
        });
        buildPagination(
            beanPagination.count_filter,
            parseInt(document.querySelector("#sizePageUsuario").value),
            document.querySelector("#pageUsuario"),
            $('#modalCargandoUsuario'),
            $('#paginationUsuario'));
        addEventsUsuarios();
        if (beanRequestUsuario.operation == "paginate") {
            document.querySelector("#txtFilterUsuario").focus();
        }

    } else {
        destroyPagination($('#paginationUsuario'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterUsuario").focus();
    }
}

function addEventsUsuarios() {

    document.querySelectorAll('.detalle-deporte').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {

            usuarioSelected = findByUsuario(btn.getAttribute('idusuario'));
            if (usuarioSelected != undefined) {
                $('#modalCargandoDeporteDetalle').modal('show');
            } else {
                showAlertTopEnd('warning', 'No se encontró el Usuario para poder editar');
            }
        };
    });

    document.querySelectorAll('.detalle-aficion').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {

            usuarioSelected = findByUsuario(btn.getAttribute('idusuario'));
            if (usuarioSelected != undefined) {
                $('#modalCargandoAficionDetalle').modal('show');
            } else {
                showAlertTopEnd('warning', 'No se encontró el Usuario para poder editar');
            }
        };
    });
    document.querySelectorAll('.reporte-constancia').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {

            usuarioSelected = findByUsuario(btn.getAttribute('idusuario'));
            if (usuarioSelected != undefined) {
                repor_deportes = "C";
                $("#modalCargandoVDYA").modal('show');
            } else {
                showAlertTopEnd('warning', 'No se encontró el Usuario para poder editar');
            }
        };
    });
    document.querySelectorAll('.reporte-deportes').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {

            usuarioSelected = findByUsuario(btn.getAttribute('idusuario'));
            if (usuarioSelected != undefined) {
                repor_deportes = "D";
                $("#modalCargandoVDYA").modal('show');
            } else {
                showAlertTopEnd('warning', 'No se encontró el Usuario para poder editar');
            }
        };
    });
}

function findByUsuario(idusuario) {
    let usuario_;
    beanPaginationUsuario.list.forEach(usuario => {
        if (idusuario == usuario.idatendido) {
            usuario_ = usuario;
            return;
        }
    });
    return usuario_;
}

function validateFormUsuario() {
    if (document.querySelector("#txtNombreUsuario").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese nombre');
        document.querySelector("#txtNombrenUsuario").focus();
        return false;
    }
    return true;
}

function tipoUsuario(tipopersonal) {
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

function subtipoUsuario(tipopersonal) {
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

