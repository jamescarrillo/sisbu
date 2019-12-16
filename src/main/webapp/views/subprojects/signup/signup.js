
var validacion_dni_registro = false;

document.addEventListener("DOMContentLoaded", function () {

    $('#FrmRegistroAtendido').submit(function (event) {
        try {
            if (valditeFrmAtendido()) {
                $('#modalCargandoAtendido').modal('show');
            }
        } catch (e) {
            console.log(e);
        }
        event.preventDefault();
        event.stopPropagation();
    });

    document.querySelector("#btn-finalizar-register").onclick = function () {
        //FINALIZACIÓN DE REGISTRO
        if (valditeFinalizeRegister()) {
            $('#modalCargandoRegister').modal('show');
        }
    };

    document.querySelector("#txtDNIVerificacion").onkeypress = function (e) {
        if (e.keyCode == 13) {
            document.querySelector("#btn-verification-DNI").dispatchEvent(new Event('click'));
        }
    };

    document.querySelector("#btn-verification-DNI").onclick = function () {
        //VERIFICACIÓN DE DNI
        if (document.querySelector("#txtDNIVerificacion").value != "") {
            $('#modalCargandoValidateDNI').modal('show');
        } else {
            showAlertTopEnd('warning', 'Por favor ingrese N° DNI');
            document.querySelector("#txtDNIVerificacion").focus();
        }
    };

    document.querySelector("#btn-next-register-2").onclick = function () {
        if (document.querySelector("#slcTipoUsuario").value != "-1") {
            if (document.querySelector("#slcTipoUsuario").value == "1") {
                //validamos la modalidad de ingreso
                if (document.querySelector("#slcModalidadIngresoUsuario").value != "100") {
                    navigateRegister('s_3');
                } else {
                    showAlertTopEnd('warning', 'Por favor seleccione una modalidad de ingreso');
                }
            } else {
                //validamos el tipo de personal
                if (document.querySelector("#slcTipoPersonalUsuario").value != "-1") {
                    navigateRegister('s_3');
                } else {
                    showAlertTopEnd('warning', 'Por favor seleccione un tipo de personal');
                }
            }
        } else {
            showAlertTopEnd('warning', 'Por favor seleccione un tipo de usuario');
        }
    };

    document.querySelectorAll(".btn-reply-register").forEach(btn => {
        btn.onclick = function () {
            navigateRegister(this.getAttribute('step'));
        };
    });

    $("#modalCargandoValidateDNI").on('shown.bs.modal', function () {
        processValidateDNI();
    });

    $("#modalCargandoRegister").on('shown.bs.modal', function () {
        processAjaxRegisterUsuario();
    });

    document.querySelector("#txtDNIVerificacion").focus();

});

/**
 * FUNCIONES DE PROCESAMIENTO DE SOLICITUD
 * @returns {undefined}
 */

function processAjaxRegisterUsuario() {
    let atendido = {
        "dni": document.querySelector("#txtNumeroDocumentoUsuario").value,
        "codigo": "",
        "nombre": document.querySelector("#txtNombreUsuario").value,
        "apellido_pat": document.querySelector("#txtApPaternoUsuario").value,
        "apellido_mat": document.querySelector("#txtApMaternoUsuario").value,
        "tipo_documento": document.querySelector("#slcTipoDocumentoUsuario").value,
        "tipo_atendido": document.querySelector("#slcTipoUsuario").value,
        "subtipo_atendido": (document.querySelector("#slcTipoPersonalUsuario").value == "-1" ? "3" : document.querySelector("#slcTipoPersonalUsuario").value),
        "sexo": -1,
        "estado_civil": -1,
        "celular": document.querySelector("#txtCelularAlumno").value,
        "fecha_nacimiento": null,
        "email": document.querySelector("#txtEmailUsuario").value,
        "estado": 1,
        "cachimbo": 2,
        "comensal": 2,
        "direccion_procedencia": "",
        "direccion_actual": "",
        "tipo_colegio": 3,
        "modalidad_ingreso": document.querySelector("#slcModalidadIngresoUsuario").value,
        "ciclo_academico_ingreso": null,
        "escuela": {
            "idescuela": 0
        },
        "distrito_actual": {
            "iddistrito": 0
        },
        "distrito_procedencia": {
            "iddistrito": 0
        }
    };
    let url_request = getHostAPI() + "api/signup/add";
    $.ajax({
        url: url_request,
        type: 'POST',
        data: JSON.stringify(atendido),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoRegister').modal("hide");
        if (beanCrudResponse.messageServer != undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() === "ok") {
                //MANDAMOS A INICIAR SESIÓN
                showAlertTopEnd('success', 'Registro completado exitosamente');
                setTimeout(() => {
                    location.href = getContextAPP() + "auth/login";
                }, 1500);
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoRegister').modal("hide");
        showAlertErrorRequest();
    });
}

function processAjaxRegistroAtendido() {
    let beanCrudRequest = {
        "t": {
            "nro_documento": "",
            "colegiatura": "",
            "nombre": "",
            "apellido_pat": "",
            "apellido_mat": "",
            "tipo_usuario": "ATE",
            "username": document.querySelector("#txtUsernameAtendido").value,
            "email": "",
            "pass": document.querySelector("#txtPassAtendido").value,
            "alias": document.querySelector("#txtAliasAtendido").value,
            "estado": "ACT",
            "path_foto": "",
            "institucion": {
                "idinstitucion": 1
            }
        }
    };
    $.ajax({
        url: getHostAPI() + "auth/signup",
        type: 'POST',
        data: JSON.stringify(beanCrudRequest),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoAtendido').modal("hide");
        if (beanCrudResponse.messageServer != undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() === "ok") {
                //MANDAMOS A INICIAR SESIÓN
                showAlertTopEnd('success', 'Registro completado exitosamente');
                setTimeout(() => {
                    location.href = getContextAPP() + "auth/login";
                }, 2500);
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoAtendido').modal("hide");
        showAlertErrorRequest();
    });
}

/*
 * UTILITARIOS DEL REGISTRO
 * @returns {undefined}
 */
function hideTypesRegistros() {
    document.querySelector('#divProfesional').style.display = "none";
    document.querySelector('#divAtendido').style.display = "none";
}

function valditeFrmProfesional() {
    if (document.querySelector('#txtNombresProfesional').value === "") {
        showAlertTopEnd('warning', 'Ingrese nombres');
        return false;
    }
    if (document.querySelector('#txtApellidoPatProfesional').value === "") {
        showAlertTopEnd('warning', 'Ingrese apellido paterno');
        return false;
    }
    if (document.querySelector('#txtApellidoMatProfesional').value === "") {
        showAlertTopEnd('warning', 'Ingrese apellido paterno');
        return false;
    }
    if (document.querySelector('#txtColegiaturaProfesional').value === "") {
        showAlertTopEnd('warning', 'Ingrese colegiatura');
        return false;
    }
    if (document.querySelector('#txtUsernameProfesional').value === "") {
        showAlertTopEnd('warning', 'Ingrese nombre de usuario');
        return false;
    }
    if (document.querySelector('#txtPassProfesional').value === "") {
        showAlertTopEnd('warning', 'Ingrese contraseña');
        return false;
    }
    return true;
}

function valditeFinalizeRegister() {
    if (document.querySelector('#txtApPaternoUsuario').value === "") {
        showAlertTopEnd('warning', 'Ingrese Ap. Paterno');
        document.querySelector('#txtApPaternoUsuario').focus();
        return false;
    }
    if (document.querySelector('#txtApMaternoUsuario').value === "") {
        showAlertTopEnd('warning', 'Ingrese Ap. Materno');
        document.querySelector('#txtApMaternoUsuario').focus();
        return false;
    }
    if (document.querySelector('#txtNombreUsuario').value === "") {
        showAlertTopEnd('warning', 'Ingrese nombres');
        document.querySelector('#txtNombreUsuario').focus();
        return false;
    }
    if (document.querySelector('#txtCelularAlumno').value === "") {
        showAlertTopEnd('warning', 'Ingrese celular');
        document.querySelector('#txtCelularAlumno').focus();
        return false;
    }
    if (document.querySelector('#txtEmailUsuario').value === "") {
        showAlertTopEnd('warning', 'Ingrese email');
        document.querySelector('#txtEmailUsuario').focus();
        return false;
    }
    return true;
}

function navigateRegister(option) {
    switch (option) {
        case "s_2":
            document.querySelector("#row-verification").style.display = "none";
            document.querySelector("#row-registro-1").style.display = "flex";
            document.querySelector("#row-registro-2").style.display = "none";
            document.querySelector("#slcTipoDocumentoUsuario").value = "1";
            document.querySelector("#slcTipoDocumentoUsuario").disabled = true;
            document.querySelector("#txtNumeroDocumentoUsuario").value = document.querySelector("#txtDNIVerificacion").value;
            document.querySelector("#txtNumeroDocumentoUsuario").disabled = true;
            document.querySelector("#slcTipoUsuario").value = "-1";
            document.querySelector("#slcTipoUsuario").dispatchEvent(new Event('change'));
            //document.querySelector("#slcTipoPersonalUsuario").disabled = true;
            break;
        case "s_3":
            document.querySelector("#row-verification").style.display = "none";
            document.querySelector("#row-registro-1").style.display = "none";
            document.querySelector("#row-registro-2").style.display = "flex";

            document.querySelector("#txtApPaternoUsuario").value = "";
            document.querySelector("#txtApMaternoUsuario").value = "";
            document.querySelector("#txtNombreUsuario").value = "";
            document.querySelector("#txtCelularAlumno").value = "";
            document.querySelector("#txtEmailUsuario").value = "";

            document.querySelector("#txtApPaternoUsuario").focus();
            break;
        default:
            document.querySelector("#row-verification").style.display = "flex";
            document.querySelector("#row-registro-1").style.display = "none";
            document.querySelector("#row-registro-2").style.display = "none";
            break;
    }
}

function processValidateDNI() {
    let url_request = getHostAPI() + "api/signup/validate/dni";
    url_request += "?dni=" + document.querySelector("#txtDNIVerificacion").value
    $.ajax({
        url: url_request,
        type: 'GET',
        //data: JSON.stringify(beanCrudRequest),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoValidateDNI').modal("hide");
        if (beanCrudResponse.messageServer != undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() === "ok") {
                validacion_dni_registro = true;
                navigateRegister('s_2');
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
                document.querySelector("#txtDNIVerificacion").value = "";
                document.querySelector("#txtDNIVerificacion").focus();
            }
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoValidateDNI').modal("hide");
        showAlertErrorRequest();
    });
}