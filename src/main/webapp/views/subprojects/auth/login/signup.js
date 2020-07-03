
function processAjaxRegisterUsuario() {
    $("#modalCargandoRegister").modal('show');
    let atendido = {
        "dni": "",
        "codigo": "",
        "nombre": googleUser_.getBasicProfile().getGivenName().toUpperCase(),
        "apellido_pat": googleUser_.getBasicProfile().getFamilyName().toUpperCase().split(" ")[0],
        "apellido_mat": googleUser_.getBasicProfile().getFamilyName().toUpperCase().split(" ")[1],
        "tipo_documento": 1,
        "tipo_atendido": -1,
        "subtipo_atendido": -1,
        "sexo": -1,
        "estado_civil": -1,
        "celular": "",
        "fecha_nacimiento": null,
        "email": googleUser_.getBasicProfile().getEmail(),
        "estado": 1,
        "cachimbo": 2,
        "comensal": 2,
        "direccion_procedencia": "",
        "direccion_actual": "",
        "tipo_colegio": 3,
        "modalidad_ingreso": "100",
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
    let beanSignup = {
        "atendido": atendido,
        "aditional_data": {
            "idtoken_google" : googleUser_.getAuthResponse().id_token
        }
    }
    let url_request = getHostAPI() + "api/signup/add/google";
    $.ajax({
        url: url_request,
        type: 'POST',
        data: JSON.stringify(beanSignup),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        setTimeout(() => {
            $('#modalCargandoRegister').modal("hide");
            if (beanCrudResponse.messageServer != undefined) {
                if (beanCrudResponse.messageServer.toLowerCase() === "ok") {
                    //MANDAMOS A INICIAR SESIÓN
                    showAlertTopEnd('success', 'Registro completado exitosamente');
                    setCookieSession(beanCrudResponse.token, beanCrudResponse.usuario);
                    sendIndex();
                } else {
                    showAlertTopEnd('warning', beanCrudResponse.messageServer);
                }
            }
        }, 1000);

    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoRegister').modal("hide");
        showAlertErrorRequest();
    });
}
