var beanPaginationUsuario;
var usuarioSelected;
var mostrar_pass = false;
var beanRequestUsuario = new BeanRequest();
document.addEventListener("DOMContentLoaded", function () {
    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestUsuario.entity_api = "api/usuarios";
    beanRequestUsuario.operation = "get-user";
    beanRequestUsuario.type_request = "GET";


    $('#FrmUsuarioModal').submit(function (event) {
        beanRequestUsuario.operation = "update";
        beanRequestUsuario.type_request = "PUT";
        if (validateFormUsuario()) {
            $('#modalCargandoUsuario').modal('show');
        }
        event.preventDefault();
        event.stopPropagation();
    });

    document.querySelector("#btnRegresarUsuario").onclick = function () {
        beanRequestAtendido.operation = "paginate";
        beanRequestAtendido.type_request = "GET";
        $('#modalCargandoAtendido').modal('show');
        document.querySelector("#btnOpenUsuario").style.display = 'none';
        document.querySelector("#btnListaAtendido").style.display = 'block';
    };
    document.querySelector('#btnMostrarPass').onclick = function () {
        if (mostrar_pass) {
            mostrar_pass = false;
            removeClass(document.querySelector('#icono_mostrar_pass'), "fas fa-eye");
            addClass(document.querySelector('#icono_mostrar_pass'), "fas fa-eye-slash");
            document.querySelector('#txtPassUsuario').setAttribute('type', 'password');
        } else {
            mostrar_pass = true;
            removeClass(document.querySelector('#icono_mostrar_pass'), "fas fa-eye-slash");
            addClass(document.querySelector('#icono_mostrar_pass'), "fas fa-eye");
            document.querySelector('#txtPassUsuario').setAttribute('type', 'text');
        }
    };
    $("#modalCargandoUsuario").on('shown.bs.modal', function () {
        processAjaxUsuario();
    });

});

function processAjaxUsuario() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestUsuario.operation == "get-user") {
        parameters_pagination += "?idusuario=" + usuarioSelected.idusuario;

    } else {
        parameters_pagination = "";
        json = {
            "idusuario": usuarioSelected.idusuario,
            "estado": document.querySelector("#txtEstadoUsuario").value,
            "usuario": document.querySelector("#txtNombreUsuario").value,
            "foto": usuarioSelected.foto,
            "pass": document.querySelector("#txtPassUsuario").value,
            "login": document.querySelector("#txtLoginUsuario").value,
            "tipo_usuario": usuarioSelected.tipo_usuario,
            "tipo_perfil": document.querySelector("#txtTipoPefilUsuario").value,

        };

    }
    $.ajax({
        url: getHostAPI() + beanRequestUsuario.entity_api + "/" + beanRequestUsuario.operation + parameters_pagination,
        type: beanRequestUsuario.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoUsuario').modal("hide");
        showAlertTopEnd('success', 'Acción realizada exitosamente');
        if (beanRequestUsuario.operation == "get-user") {
            usuarioSelected = beanCrudResponse;
            agregarInputUsuario(beanCrudResponse);
        }


    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoUsuario').modal("hide");
        showAlertErrorRequest();

    });
}

function toListUsuario(beanPagination) {
    document.querySelector("#tbodyUsuario").innerHTML = "";
    document.querySelector("#titleManagerUsuario").innerHTML = "[ " + beanPagination.count_filter + " ] VIDEO TUTORIALES";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(usuario => {
            row = "<div class='dt-widget__item border-bottom'>";
            row += "<div class='dt-extra animate-slide align-self-center mr-5' idusuario='" + usuario.idusuario + "'>";
            row += "<span class='badge badge-info badge-circle-animate badge-pill badge-sm align-text-top mr-2'>"
            row += "<a class='text-light-gray editar-usuario' data-toggle='tooltip' title='Editar' href='javascript:void(0)'>";
            row += "<i class='text-white icon icon-editors'></i></a>";
            row += "</span>";
            row += "<div class='slide-content'>";
            row += "<a class='text-light-gray usuario-usuario' data-toggle='tooltip' title='Datos Usuario' href='javascript:void(0)'>";
            row += "<i class='text-success fa fa-user-circle'></i></a></div>";
            row += "<div class='slide-content'>";
            row += "<a class='text-light-gray familiar-usuario' data-toggle='tooltip' title='Lista de Familiares'' href='javascript:void(0)'>";
            row += "<i class='text-primary fa fa-users'></i></a></div>";
            row += "<div class='slide-content'>";
            row += "<a class='text-info text-light-gray fichas-usuario' data-toggle='tooltip' title='Fichas'' href='javascript:void(0)'>";
            row += "<i class='text-warning fa fa-list-ol'></i></a></div>";
            row += "</div>";

            row += "<div class='dt-widget__info text-truncate mr-5' style='min-width:50px; max-width:10%'>";
            row += "<p class='dt-widget__subtitle text-truncate text-dark'>";
            row += usuario.dni + "</p></div>";

            row += "<div class='text-truncate mr-5' style='min-width:60px; width:25%;'>";
            row += "<p class='dt-widget__subtitle text-truncate text-dark'>";
            row += usuario.apellido_pat + " " + usuario.apellido_mat + " " + usuario.nombre + "</p></div>";

            row += "<div class=' text-truncate mr-5'  style='min-width:60px; max-width:18%;'>";
            row += "<p class='dt-widget__subtitle text-truncate text-dark'>";
            row += usuario.fecha_nacimiento + "</p></div>";

            row += "<div class='text-truncate mr-5' style='min-width:60px; max-width:15%;'>";
            row += "<p class='dt-widget__subtitle text-truncate text-dark'>";
            row += usuario.email + "</p></div>";

            row += "<div class='text-truncate' style='min-width:60px; max-width:15%;'>";
            row += "<p class='dt-widget__subtitle text-truncate text-dark'>";
            row += usuario.escuela.nombre + "</p></div>";

            row += "</div>";

            document.querySelector("#tbodyUsuario").innerHTML += row;
            $('[data-toggle="tooltip"]').tooltip();
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageUsuario").value),
                document.querySelector("#pageUsuario"),
                $('#modalCargandoUsuario'),
                $('#paginationUsuario'));
        addEventsUsuarioes();


    } else {
        destroyPagination($('#paginationUsuario'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
    }
}

function addEventsUsuarioes() {
    document.querySelectorAll('.editar-usuario').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            usuarioSelected = findByUsuario(btn.parentElement.parentElement.getAttribute('idusuario'));
            if (usuarioSelected != undefined) {
                beanRequestUsuario.operation = "update";
                beanRequestUsuario.type_request = "PUT";
                //SET VALUES MODAL
                document.querySelector("#txtTituloUsuario").value = usuarioSelected.titulo;
                document.querySelector("#txtDescripcionUsuario").value = usuarioSelected.descripcion;
                document.querySelector("#txtLinkUsuario").value = usuarioSelected.link;
                document.querySelector("#txtTituloModalMan").innerHTML = "EDITAR VIDEO TUTORIAL";
                //OPEN MODEL
                document.querySelector("#btnListaUsuario").style.display = 'none';
                document.querySelector("#btnOpenUsuario").style.display = 'block';
                document.querySelector("#txtTituloUsuario").focus();
            } else {
                showAlertTopEnd('warning', 'No se encontró el Usuario para poder editar');
            }
        };
    });
    document.querySelectorAll('.eliminar-usuario').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            usuarioSelected = findByUsuario(btn.parentElement.parentElement.getAttribute('idusuario'));
            beanRequestUsuario.operation = "delete";
            beanRequestUsuario.type_request = "DELETE";
            processAjaxUsuario();
        };
    });
}

function findByUsuario(idusuario) {
    let usuario_;
    beanPaginationUsuario.list.forEach(usuario => {
        if (idusuario == usuario.idusuario) {
            usuario_ = usuario;
            return;
        }
    });
    return usuario_;
}

function validateFormUsuario() {
    if (document.querySelector("#txtNombreUsuario").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Usuario');
        document.querySelector("#txtNombreUsuario").focus();
        return false;
    }
    if (document.querySelector("#txtLoginUsuario").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Login');
        document.querySelector("#txtLoginUsuario").focus();
        return false;
    }

    if (document.querySelector("#txtEstadoUsuario").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Estado');
        document.querySelector("#txtEstadoUsuario").focus();
        return false;
    }
    if (document.querySelector("#txtTipoPefilUsuario").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Tipo de Perfil');
        document.querySelector("#txtTipoPefilUsuario").focus();
        return false;
    }
    return true;
}

function limpiarInputUsuario() {
    document.querySelector("#txtNombreUsuario").value = "";
    document.querySelector("#txtPassUsuario").value = "";
    document.querySelector("#txtLoginUsuario").value = "";
    document.querySelector("#txtEstadoUsuario").value = "1";
    document.querySelector("#txtTipoPefilUsuario").value = "1000";
}

function agregarInputUsuario(bean) {
    document.querySelector("#txtNombreUsuario").value = bean.usuario;
    //document.querySelector("#txtPassUsuario").value = bean.pass;
    document.querySelector("#txtLoginUsuario").value = bean.login;
    document.querySelector("#txtEstadoUsuario").value = bean.estado;
    document.querySelector("#txtTipoPefilUsuario").value = bean.tipo_perfil;
}

