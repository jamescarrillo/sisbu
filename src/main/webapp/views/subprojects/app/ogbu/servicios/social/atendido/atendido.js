var beanPaginationAtendido;
var atendidoSelected;
var beanRequestAtendido = new BeanRequest();
document.addEventListener("DOMContentLoaded", function () {
    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestAtendido.entity_api = "api/atendido";
    beanRequestAtendido.operation = "paginate";
    beanRequestAtendido.type_request = "GET";

    $('#FrmAtendido').submit(function (event) {
        beanRequestAtendido.operation = "paginate";
        beanRequestAtendido.type_request = "GET";
        $('#modalCargandoAtendido').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $('#FrmAtendidoModal').submit(function (event) {
        if (validateFormAtendido()) {
            $('#modalCargandoAtendido').modal('show');
        }
        event.preventDefault();
        event.stopPropagation();
    });

    document.querySelector("#btnOpenNewAtendido").onclick = function () {
        //CONFIGURAMOS LA SOLICITUD
        beanRequestAtendido.operation = "add";
        beanRequestAtendido.type_request = "POST";
        //LIMPIAR LOS CAMPOS
        limpiarInput();
        //SET TITLE MODAL
        document.querySelector("#txtTituloModalMan").innerHTML = "REGISTRAR VIDEO TUTORIAL";
        //OPEN MODEL
        document.querySelector("#btnListaAtendido").style.display = 'none';
        document.querySelector("#btnOpenAtendido").style.display = 'block';
    };

    document.querySelector("#btnRegresar").onclick = function () {
        beanRequestAtendido.operation = "paginate";
        beanRequestAtendido.type_request = "GET";
        $('#modalCargandoAtendido').modal('show');
        document.querySelector("#btnOpenAtendido").style.display = 'none';
        document.querySelector("#btnListaAtendido").style.display = 'block';
    };

    $("#modalCargandoAtendido").on('shown.bs.modal', function () {
        processAjaxAtendido();
    });
    $('#modalCargandoAtendido').modal('show');

    $("#sizePageAtendido").change(function () {
        $('#modalCargandoAtendido').modal('show');
    });

});

function processAjaxAtendido() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestAtendido.operation == "paginate") {
        parameters_pagination += "?filter=" + document.querySelector("#txtFilterAtendido").value;
        parameters_pagination += "&page=" + document.querySelector("#pageAtendido").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePageAtendido").value;

    } else {
        parameters_pagination = "";
        if (beanRequestAtendido.operation == "delete") {
            parameters_pagination = "/" + atendidoSelected.idatendido;
            json = {};
        } else {
            json = {
                "titulo": document.querySelector("#txtTituloAtendido").value,
                "descripcion": document.querySelector("#txtDescripcionAtendido").value,
                "link": document.querySelector("#txtLinkAtendido").value,
            };
            if (beanRequestAtendido.operation == "update") {
                json.idatendido = atendidoSelected.idatendido;
            }
        }
    }
    $.ajax({
        url: getHostAPI() + beanRequestAtendido.entity_api + "/" + beanRequestAtendido.operation + parameters_pagination,
        type: beanRequestAtendido.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        console.log(beanCrudResponse);
        $('#modalCargandoAtendido').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                if (beanRequestAtendido.operation == "add") {
                    limpiarInput();
                }

                showAlertTopEnd('success', 'Acción realizada exitosamente');

            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationAtendido = beanCrudResponse.beanPagination;
            toListAtendido(beanPaginationAtendido);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoAtendido').modal("hide");
        showAlertErrorRequest();

    });
}

function toListAtendido(beanPagination) {
    document.querySelector("#tbodyAtendido").innerHTML = "";
    document.querySelector("#titleManagerAtendido").innerHTML = "[ " + beanPagination.count_filter + " ] VIDEO TUTORIALES";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(atendido => {
            row = "<div class='dt-widget__item border-bottom'>";
            row += "<div class='dt-extra animate-slide align-self-center mr-5' idatendido='" + atendido.idatendido + "'>";
            row += "<span class='badge badge-info badge-circle-animate badge-pill badge-sm align-text-top mr-2'>"
            row += "<a class='text-light-gray editar-atendido' data-toggle='tooltip' title='Editar' href='javascript:void(0)'>";
            row += "<i class='text-white icon icon-editors'></i></a>";
            row += "</span>";
            row += "<div class='slide-content'>";
            row += "<a idusuario='" + atendido.usuario.idusuario + "' class='text-light-gray usuario-atendido' data-toggle='tooltip' title='Datos Usuario' href='javascript:void(0)'>";
            row += "<i class='text-success fa fa-user-circle'></i></a></div>";
            row += "<div class='slide-content'>";
            row += "<a class='text-light-gray familiar-atendido' data-toggle='tooltip' title='Lista de Familiares'' href='javascript:void(0)'>";
            row += "<i class='text-primary fa fa-users'></i></a></div>";
            row += "<div class='slide-content'>";
            row += "<a class='text-info text-light-gray fichas-atendido' data-toggle='tooltip' title='Fichas'' href='javascript:void(0)'>";
            row += "<i class='text-warning fa fa-list-ol'></i></a></div>";
            row += "</div>";

            row += "<div class='dt-widget__info text-truncate mr-5' style='min-width:50px; max-width:10%'>";
            row += "<p class='dt-widget__subtitle text-truncate text-dark'>";
            row += atendido.dni + "</p></div>";

            row += "<div class='text-truncate mr-5' style='min-width:60px; width:25%;'>";
            row += "<p class='dt-widget__subtitle text-truncate text-dark'>";
            row += atendido.apellido_pat + " " + atendido.apellido_mat + " " + atendido.nombre + "</p></div>";

            row += "<div class=' text-truncate mr-5'  style='min-width:60px; max-width:18%;'>";
            row += "<p class='dt-widget__subtitle text-truncate text-dark'>";
            row += atendido.fecha_nacimiento + "</p></div>";

            row += "<div class='text-truncate mr-5' style='min-width:60px; max-width:15%;'>";
            row += "<p class='dt-widget__subtitle text-truncate text-dark'>";
            row += atendido.email + "</p></div>";

            row += "<div class='text-truncate' style='min-width:60px; max-width:15%;'>";
            row += "<p class='dt-widget__subtitle text-truncate text-dark'>";
            row += atendido.escuela.nombre + "</p></div>";

            row += "</div>";

            document.querySelector("#tbodyAtendido").innerHTML += row;
            $('[data-toggle="tooltip"]').tooltip();
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageAtendido").value),
                document.querySelector("#pageAtendido"),
                $('#modalCargandoAtendido'),
                $('#paginationAtendido'));
        addEventsAtendidoes();


    } else {
        destroyPagination($('#paginationAtendido'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
    }
}

function addEventsAtendidoes() {
    document.querySelectorAll('.editar-atendido').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            atendidoSelected = findByAtendido(btn.parentElement.parentElement.getAttribute('idatendido'));
            if (atendidoSelected != undefined) {
                beanRequestAtendido.operation = "update";
                beanRequestAtendido.type_request = "PUT";
                //SET VALUES MODAL
                document.querySelector("#txtTituloAtendido").value = atendidoSelected.titulo;
                document.querySelector("#txtDescripcionAtendido").value = atendidoSelected.descripcion;
                document.querySelector("#txtLinkAtendido").value = atendidoSelected.link;
                document.querySelector("#txtTituloModalMan").innerHTML = "EDITAR VIDEO TUTORIAL";
                //OPEN MODEL
                document.querySelector("#btnListaAtendido").style.display = 'none';
                document.querySelector("#btnOpenAtendido").style.display = 'block';
                document.querySelector("#txtTituloAtendido").focus();
            } else {
                showAlertTopEnd('warning', 'No se encontró el Atendido para poder editar');
            }
        };
    });
    document.querySelectorAll('.usuario-atendido').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            atendidoSelected = findByAtendidoUsuario(btn.getAttribute('idusuario'));
            if (atendidoSelected != undefined) {
                beanRequestUsuario.operation = "get-user";
                beanRequestUsuario.type_request = "GET";
                usuarioSelected = atendidoSelected.usuario;
                document.querySelector("#btnListaAtendido").style.display = 'none';
                document.querySelector("#btnOpenUsuario").style.display = 'block';
                $('#modalCargandoUsuario').modal('show');
            }




        };
    });
    document.querySelectorAll('.familiar-atendido').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            atendidoSelected = findByAtendido(btn.parentElement.parentElement.getAttribute('idatendido'));
            if (atendidoSelected != undefined) {
                beanRequestFamiliar.operation = "paginate";
                beanRequestFamiliar.type_request = "GET";
                document.querySelector("#btnListaAtendido").style.display = 'none';
                document.querySelector("#btnOpenFamiliar").style.display = 'block';
                $('#modalCargandoFamiliar').modal('show');
            }

        };
    });
}

function findByAtendido(idatendido) {
    let atendido_;
    beanPaginationAtendido.list.forEach(atendido => {
        if (idatendido == atendido.idatendido) {
            atendido_ = atendido;
            return;
        }
    });
    return atendido_;
}

function findByAtendidoUsuario(idatendido) {
    let atendido_;
    beanPaginationAtendido.list.forEach(atendido => {
        if (idatendido == atendido.usuario.idusuario) {
            atendido_ = atendido;
            return;
        }
    });
    return atendido_;
}

function validateFormAtendido() {
    if (document.querySelector("#txtTituloAtendido").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Título');
        document.querySelector("#txtTituloAtendido").focus();
        return false;
    }
    if (document.querySelector("#txtLinkAtendido").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Fuente');
        document.querySelector("#txtLinkAtendido").focus();
        return false;
    }

    if (document.querySelector("#txtDescripcionAtendido").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Descripción');
        document.querySelector("#txtDescripcionAtendido").focus();
        return false;
    }
    return true;
}

function limpiarInput() {
    document.querySelector("#txtTituloAtendido").value = "";
    document.querySelector("#txtDescripcionAtendido").value = "";
    document.querySelector("#txtLinkAtendido").value = "";
}

