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
        event.preventDefault();
        event.stopPropagation();
        if (validateFormUsuario()) {
            $('#modalCargandoUsuario').modal('show');
        }

    });


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
    $("#modalCargandoUsuario").on('hidden.bs.modal', function () {
        beanRequestUsuario.operation = "update";
        beanRequestUsuario.type_request = "PUT";
    });

});

function processAjaxUsuario() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestUsuario.operation == "get-user") {
        parameters_pagination += "?idusuario=" + usuarioSelected.idusuario;

    } else {
        json = {

            "estado": document.querySelector("#txtEstadoUsuario").value,
            "usuario": document.querySelector("#txtNombreUsuario").value,
            "pass": document.querySelector("#txtPassUsuario").value,
            "login": document.querySelector("#txtLoginUsuario").value,
            "tipo_usuario": "2",
            "tipo_perfil": document.querySelector("#txtTipoPerfilUsuario").value,
            "perfil": {"idperfil": "100"}

        };
        if (beanRequestUsuario.operation == "update") {
            json.idusuario = usuarioSelected.idusuario;
            json.foto = usuarioSelected.foto;
            json.perfil = perfilSelected;

        } else {
            json.foto = " ";
        }

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
        console.log(beanCrudResponse);

        if (beanCrudResponse.beanPagination !== undefined) {
            usuarioSelected = beanCrudResponse.beanPagination.list[0];
        }

        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                if (beanRequestUsuario.operation == "add") {
                    processAjaxPersonal();
                } else {
                    showAlertTopEnd('success', 'Acción realizada exitosamente');
                }
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
                $('#modalCargandoPersonal').modal("hide");
            }

        } else {
            if (beanRequestUsuario.operation == "get-user") {
                usuarioSelected = beanCrudResponse;
                agregarInputUsuario(beanCrudResponse);
            } else {
                showAlertTopEnd('success', 'Acción realizada exitosamente');

            }
        }
        $('#modalCargandoUsuario').modal("hide");

    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
        $('#modalCargandoUsuario').modal("hide");
        showAlertErrorRequest();

    });
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
    if (document.querySelector("#txtPassUsuario").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese contraseña');
        document.querySelector("#txtEstadoUsuario").focus();
        return false;
    }
    if (document.querySelector("#txtEstadoUsuario").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Estado');
        document.querySelector("#txtEstadoUsuario").focus();
        return false;
    }
    if (document.querySelector("#txtTipoPerfilUsuario").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Tipo de Perfil');
        document.querySelector("#txtTipoPerfilUsuario").focus();
        return false;
    }
    return true;
}

function limpiarInputUsuario() {
    document.querySelector("#txtNombreUsuario").value = "";
    document.querySelector("#txtPassUsuario").value = "";
    document.querySelector("#txtLoginUsuario").value = "";
    document.querySelector("#txtEstadoUsuario").value = "1";
    document.querySelector("#txtPerfilUsuario").value = "";
    document.querySelector("#txtTipoPerfilUsuario").value = "-1";
    perfilSelected = null;
}

function agregarInputUsuario(bean) {
    document.querySelector("#txtNombreUsuario").value = bean.usuario;
    //document.querySelector("#txtPassUsuario").value = bean.pass;
    document.querySelector("#txtLoginUsuario").value = bean.login;
    document.querySelector("#txtLoginUsuario").disabled = true;
    document.querySelector("#txtEstadoUsuario").value = bean.estado;
    document.querySelector("#txtTipoPerfilUsuario").value = bean.tipo_perfil;
    document.querySelector("#txtPerfilUsuario").value = bean.perfil.nombre;
    document.querySelector("#txtPassUsuario").value = "";
    document.querySelector("#txtPassUsuario").focus();

    perfilSelected = bean.perfil;
}

