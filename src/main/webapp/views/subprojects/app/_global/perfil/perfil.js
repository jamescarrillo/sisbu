var usuarioSelected;

var beanRequestUsuario = new BeanRequest();

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZAMOS LAS VARIABLES DEL BEAN_REQUEST
    beanRequestUsuario.entity_api = "usuarios";
    beanRequestUsuario.operation = "update";
    beanRequestUsuario.type_request = "PUT";

    $('#txtFechaNacU').bootstrapMaterialDatePicker({
        weekStart: 0,
        time: false,
        format: 'DD/MM/YYYY',
        lang: 'es'
    }).on('change', function (e, date) {
    });

    document.querySelector("#btnEliminarFechaNacU").onclick = function () {
        $('#txtFechaNacU').val("");
    };

    document.querySelectorAll(".radio-sexo").forEach(radio => {
        radio.onchange = function () {
            if (radio.checked) {
                //LIMPIAMOS TODOS MENOS ESTE
                document.querySelectorAll(".radio-sexo").forEach(radio_ => {
                    if (radio_.getAttribute("id") != radio.getAttribute("id")) {
                        setEstadoRadio(radio_, false);
                    }
                });
            }
        };
    });

    function setEstadoRadio(radio, estado) {
        radio.checked = estado;
    }

    $('#FrmUsuarioU').submit(function (event) {
        try {
            if (valditeFrmUsuario()) {
                $('#modalCargandoUsuario').modal('show');
            }
        } catch (e) {
            console.log(e);
        }
        event.preventDefault();
        event.stopPropagation();
    });

    $("#modalCargandoUsuario").on('shown.bs.modal', function () {
        processAjaxUsuario();
    });

    loaderUser();

});

function loaderUser() {
    usuarioSelected = Cookies.getJSON("needu_user");
    if (usuarioSelected != undefined) {
        //SET VALUES
        document.querySelector("#txtNroDocumentoUsuarioU").value = usuarioSelected.nro_documento;
        document.querySelector("#txtColegiaturaUsuarioU").value = usuarioSelected.colegiatura;
        document.querySelector("#txtNombreUsuarioU").value = usuarioSelected.nombre;
        document.querySelector("#txtApellidoPatU").value = usuarioSelected.apellido_pat;
        document.querySelector("#txtApellidoMatU").value = usuarioSelected.apellido_mat;
        document.querySelector("#txtAliasU").value = usuarioSelected.alias;
        //SET SEXO
        if (usuarioSelected.sexo == "M") {
            document.querySelector("#radioMasculino").checked = true;
            document.querySelector("#radioMasculino").dispatchEvent(new Event('change'));
        } else if (usuarioSelected.sexo == "F") {
            document.querySelector("#radioFemenino").checked = true;
            document.querySelector("#radioFemenino").dispatchEvent(new Event('change'));
        } else {
            document.querySelector("#radioOtro").checked = true;
            document.querySelector("#radioOtro").dispatchEvent(new Event('change'));
        }
        document.querySelector("#txtFechaNacU").value = usuarioSelected.fecha_nac == undefined ? "" : usuarioSelected.fecha_nac;
        document.querySelector("#txtEmailU").value = usuarioSelected.email;
        document.querySelector("#txtUsernameU").value = usuarioSelected.username;
        document.querySelector("#txtPassU").value = "";
        //BLOQUEAMOS COLEGIATURA
        if (usuarioSelected.tipo_usuario != "PRO") {
            document.querySelector("#txtColegiaturaUsuarioU").disabled = true;
            document.querySelector("#divColegiatura").style.display = "none";
        }
        document.querySelector("#lblFullName").innerHTML = usuarioSelected.nombre + " " + usuarioSelected.apellido_pat;
        document.querySelector("#lblTypeUser").innerHTML = getStringTipoUsuario(usuarioSelected.tipo_usuario);
        document.querySelector("#liEmail").innerHTML =
                `
            <span>Email:</span>
            ${usuarioSelected.email == "" ? "tucorre@dominio.com" : usuarioSelected.email}
        `;
        document.querySelector("#liInstitucion").innerHTML =
                `
            <span>Institución:</span>
            ${usuarioSelected.institucion.nombre}
        `;
        document.querySelector("#txtNroDocumentoUsuarioU").focus();
    } else {
        showAlertTopEnd('warning', "No se pudo recuperar el usuario de la sesión");
    }
}

function processAjaxUsuario() {
    let sexo_;
    if (document.querySelector("#radioMasculino").checked) {
        sexo_ = "M";
    } else if (document.querySelector("#radioFemenino").checked) {
        sexo_ = "F";
    } else {
        sexo_ = "O";
    }
    beanCrudRequest = {
        "t": {
            "idusuario": usuarioSelected.idusuario,
            "nro_documento": document.querySelector("#txtNroDocumentoUsuarioU").value,
            "colegiatura": document.querySelector("#txtColegiaturaUsuarioU").value,
            "nombre": document.querySelector("#txtNombreUsuarioU").value,
            "apellido_pat": document.querySelector("#txtApellidoPatU").value,
            "apellido_mat": document.querySelector("#txtApellidoMatU").value,
            "alias": document.querySelector("#txtAliasU").value,
            "email": document.querySelector("#txtEmailU").value,
            "tipo_usuario": usuarioSelected.tipo_usuario,
            "estado": "ACT",
            "path_foto": "",
            "sexo": sexo_,
            "fecha_nac": document.querySelector("#txtFechaNacU").value,
            "username": document.querySelector("#txtUsernameU").value,
            "pass": document.querySelector("#txtPassU").value,
            "institucion": usuarioSelected.institucion
        }
    };
    $.ajax({
        url: getHostAPI() + beanRequestUsuario.entity_api + "/" + beanRequestUsuario.operation,
        type: beanRequestUsuario.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("needu_token")
        },
        data: JSON.stringify(beanCrudRequest),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoUsuario').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() === "ok") {
                //MANDAMOS A INICIAR SESIÓN
                showAlertTopEnd('success', 'Información actualizada exitosamente');
                $('#ventanaModalRUUsuario').modal('hide');
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoUsuario').modal("hide");
        showAlertErrorRequest();
    });
}

function getStringTipoUsuario(tipo_usuario) {
    let st = "";
    switch (tipo_usuario) {
        case "PRO":
            st = "PROFESIONAL";
            break;
        case "ATE":
            st = "ATENDIDO";
            break;
        default:
            st = "SUPER ADMINISTRADOR";
            break;
    }
    return st;
}

function valditeFrmUsuario() {
    //DEPENDE DEL TIPO DE USUARIO LA VALIDACION
    let seleccion_completada = false;
    switch (usuarioSelected.tipo_usuario) {
        case "ATE":
            if (document.querySelector('#txtAliasU').value === "") {
                showAlertTopEnd('warning', 'Ingrese Alias');
                document.querySelector('#txtAliasU').focus();
                return false;
            }
            document.querySelectorAll('.radio-sexo').forEach(radio => {
                if (radio.checked) {
                    seleccion_completada = true;
                    return;
                }
            });
            if (!seleccion_completada) {
                showAlertTopEnd('warning', 'Seleccione género');
                return false;
            }
            if (document.querySelector('#txtNombreUsuarioU').value === "") {
                showAlertTopEnd('warning', 'Ingrese Nombre de Usuario');
                document.querySelector('#txtNombreUsuarioU').focus();
                return false;
            }
            break;
        case "PRO":
            if (document.querySelector('#txtNroDocumentoUsuarioU').value === "") {
                showAlertTopEnd('warning', 'Ingrese N° Documento');
                document.querySelector('#txtNroDocumentoUsuarioU').focus();
                return false;
            }
            if (document.querySelector('#txtColegiaturaUsuarioU').value === "") {
                showAlertTopEnd('warning', 'Ingrese Colegiatura');
                document.querySelector('#txtColegiaturaUsuarioU').focus();
                return false;
            }
            if (document.querySelector('#txtNombreUsuarioU').value === "") {
                showAlertTopEnd('warning', 'Ingrese Nombre');
                document.querySelector('#txtNombreUsuarioU').focus();
                return false;
            }
            if (document.querySelector('#txtApellidoPatU').value === "") {
                showAlertTopEnd('warning', 'Ingrese Apellido Paterno');
                document.querySelector('#txtApellidoPatU').focus();
                return false;
            }
            if (document.querySelector('#txtApellidoMatU').value === "") {
                showAlertTopEnd('warning', 'Ingrese Apellido Materno');
                document.querySelector('#txtApellidoMatU').focus();
                return false;
            }
            document.querySelectorAll('.radio-sexo').forEach(radio => {
                if (radio.checked) {
                    seleccion_completada = true;
                    return;
                }
            });
            if (!seleccion_completada) {
                showAlertTopEnd('warning', 'Seleccione género');
                return false;
            }
            if (document.querySelector('#txtUsernameU').value === "") {
                showAlertTopEnd('warning', 'Ingrese Nombre de Usuario');
                document.querySelector('#txtUsernameU').focus();
                return false;
            }
            if (document.querySelector('#txtPassU').value === "") {
                showAlertTopEnd('warning', 'Ingrese Contraseña');
                document.querySelector('#txtPassU').focus();
                return false;
            }
            break;
        default:
            //SAD
            if (document.querySelector('#txtNroDocumentoUsuarioU').value === "") {
                showAlertTopEnd('warning', 'Ingrese N° Documento');
                document.querySelector('#txtNroDocumentoUsuarioU').focus();
                return false;
            }
            if (document.querySelector('#txtNombreUsuarioU').value === "") {
                showAlertTopEnd('warning', 'Ingrese Nombre');
                document.querySelector('#txtNombreUsuarioU').focus();
                return false;
            }
            if (document.querySelector('#txtApellidoPatU').value === "") {
                showAlertTopEnd('warning', 'Ingrese Apellido Paterno');
                document.querySelector('#txtApellidoPatU').focus();
                return false;
            }
            if (document.querySelector('#txtApellidoMatU').value === "") {
                showAlertTopEnd('warning', 'Ingrese Apellido Materno');
                document.querySelector('#txtApellidoMatU').focus();
                return false;
            }
            document.querySelectorAll('.radio-sexo').forEach(radio => {
                if (radio.checked) {
                    seleccion_completada = true;
                    return;
                }
            });
            if (!seleccion_completada) {
                showAlertTopEnd('warning', 'Seleccione género');
                return false;
            }
            if (document.querySelector('#txtUsernameU').value === "") {
                showAlertTopEnd('warning', 'Ingrese Nombre de Usuario');
                document.querySelector('#txtUsernameU').focus();
                return false;
            }
            if (document.querySelector('#txtPassU').value === "") {
                showAlertTopEnd('warning', 'Ingrese Contraseña');
                document.querySelector('#txtPassU').focus();
                return false;
            }
            break;
    }
    return true;
}
