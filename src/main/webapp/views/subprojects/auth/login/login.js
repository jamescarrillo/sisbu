document.addEventListener("DOMContentLoaded", function () {

    $('#FrmLogin').submit(function (event) {
        try {
            if (document.querySelector("#txtUsername").value != "") {
                if (document.querySelector("#txtPass").value != "") {
                    $('#modalCargandoLogin').modal('show');
                } else {
                    showAlertTopEnd('warning', "Por favor ingrese una contraseña");
                }
            } else {
                showAlertTopEnd('warning', "Por favor ingrese un nombre de usuario");
            }
        } catch (e) {
            console.log(e);
        }
        event.preventDefault();
        event.stopPropagation();
    });

    $("#modalCargandoLogin").on('shown.bs.modal', function () {
        processAjaxAuth();
    });

    document.querySelector("#txtUsername").focus();

});

function processAjaxAuth() {
    let loginRequest = {
        "username": document.querySelector("#txtUsername").value,
        "password": document.querySelector("#txtPass").value
    };
    $.ajax({
        url: getHostAPI() + "auth/login",
        type: 'POST',
        data: JSON.stringify(loginRequest),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanAuth) {
        $('#modalCargandoLogin').modal("hide");
        if (beanAuth.messageServer != undefined) {
            if (beanAuth.messageServer.toLowerCase() === "ok") {
                //PROCESAMOS LA SOLICITUD DEL TOKEN
                processAjaxAuthToken(beanAuth.usuario);
            } else {
                switch (beanAuth.typeMessage) {
                    case "1":
                        showAlertTopEnd('error', beanAuth.messageServer);
                        document.querySelector("#txtUsername").value = "";
                        document.querySelector("#txtPass").value = "";
                        document.querySelector("#txtUsername").focus();
                        break;
                    case "2":
                        showAlertTopEnd('error', beanAuth.messageServer);
                        document.querySelector("#txtPass").value = "";
                        document.querySelector("#txtPass").focus();
                        break;
                    default :
                        // 3 Y 4
                        showAlertTopEnd('warning', beanAuth.messageServer);
                        break;
                }
            }
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoLogin').modal("hide");
        showAlertErrorRequest();
    });
}

function processAjaxAuthToken(user) {
    let loginRequest = {
        "username": document.querySelector("#txtUsername").value,
        "password": document.querySelector("#txtPass").value
    };
    $.ajax({
        url: getHostAPI() + "auth/login/token",
        type: 'POST',
        data: JSON.stringify(loginRequest),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (jwtResponse) {
        $('#modalCargandoLoginToken').modal("hide");
        if (jwtResponse.token !== undefined) {
            //SET COOKIE TOKEN
            setCookieSession(jwtResponse.token, user);
            sendIndex();
        } else {
            showAlertTopEnd('warning', 'No se pudo obtener el token para iniciar sesión');
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoLoginToken').modal("hide");
        showAlertErrorRequest();
    });
}