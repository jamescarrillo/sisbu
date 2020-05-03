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
        if (beanRequestUsuario.operation == "get-user") {
            usuarioSelected = beanCrudResponse;
            agregarInputUsuario(beanCrudResponse);
        } else {
            showAlertTopEnd('success', 'Acción realizada exitosamente');
            document.querySelector("#btnRegresarUsuario").dispatchEvent(new Event('click'));
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoUsuario').modal("hide");
        showAlertErrorRequest();

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
    document.querySelector("#txtLoginUsuario").disabled = true;
    document.querySelector("#txtEstadoUsuario").value = bean.estado;
    document.querySelector("#txtTipoPefilUsuario").value = bean.tipo_perfil;
    document.querySelector("#txtPassUsuario").value = "";
    document.querySelector("#txtPassUsuario").focus();
}

