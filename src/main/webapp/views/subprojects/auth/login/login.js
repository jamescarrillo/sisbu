document.addEventListener("DOMContentLoaded", function () {

    $('[data-toggle="tooltip"]').tooltip();
    $(".preloader").fadeOut();

    $(".form-control-md").click(function () {
        $(this).parent().addClass("label-animate");
    });

    $(window).click(function () {
        if (!$(event.target).is('.form-control')) {
            $(".form-control").each(function () {
                if ($(this).val() == '') {
                    $(this).parent().removeClass("label-animate");
                }
            });
        }
    });

    $(".form-control-md").focus(function () {
        $(this).trigger('click');
    });

    document.querySelectorAll('.span_icon_password').forEach(span => {
        span.onclick = function () {
            let input = document.querySelector('#' + this.getAttribute('idinput'));
            let children = this.children[0];
            if (input.getAttribute('type') == "text") {
                removeClass(children, "fas fa-eye-slash");
                addClass(children, "fas fa-eye");
                input.setAttribute('type', 'password');
            } else {
                removeClass(children, "fas fa-eye");
                addClass(children, "fas fa-eye-slash");
                input.setAttribute('type', 'text');
            }
            input.focus();
        }
    });

    document.querySelector('#FrmLogin').onsubmit = function (event) {
        try {
            console.log("submit login account. . .")
            if (validateFrmLogin()) {
                $('#modalCargandoLogin').modal('show');
            }
        } catch (error) {
            console.log(error);
        }
        event.preventDefault();
        event.stopPropagation();
    }

    $("#modalCargandoLogin").on('shown.bs.modal', function () {
        processAjaxAuth();
    });

    document.querySelector('#txtUsername').focus();
    document.querySelector('#txtPass').focus();
    document.querySelector('#txtUsername').focus();

});

function processAjaxAuth() {
    let datosSerializados = $('#FrmLogin').serialize();
    $.ajax({
        url: getHostAndContextAPI() + "authentication/login",
        type: 'POST',
        data: datosSerializados,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        dataType: 'json'
    }).done(function (jsonResponse) {
        console.log(jsonResponse);
        $('#modalCargandoLogin').modal("hide");
        if (jsonResponse.message_server != undefined) {
            if (jsonResponse.message_server.toLowerCase() === "ok") {
                if (jsonResponse.token !== undefined) {
                    //SET COOKIE TOKEN
                    setCookieSession(jsonResponse.token, jsonResponse.usuario);
                    sendIndex();
                } else {
                    showAlertTopEnd('warning', 'No se pudo obtener el token para iniciar sesión');
                }
            } else {
                switch (jsonResponse.type_message) {
                    case "1":
                        showAlertTopEnd('error', jsonResponse.message_server);
                        document.querySelector("#txtUsername").value = "";
                        document.querySelector("#txtPass").value = "";
                        document.querySelector("#txtUsername").focus();
                        break;
                    case "2":
                        showAlertTopEnd('error', jsonResponse.message_server);
                        document.querySelector("#txtPass").value = "";
                        document.querySelector("#txtPass").focus();
                        break;
                    default :
                        // 3 Y 4
                        showAlertTopEnd('warning', jsonResponse.message_server);
                        break;
                }
            }
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoLogin').modal("hide");
        showAlertErrorRequest();
    });
}


function validateFrmLogin() {
    if (document.querySelector("#txtUsername").value == "") {
        showAlertTopEnd('warning', "Por favor ingrese un nombre de usuario");
        document.querySelector("#txtUsername").focus();
        return false;
    }
    if (document.querySelector("#txtPass").value == "") {
        showAlertTopEnd('warning', "Por favor ingrese una contraseña");
        document.querySelector("#txtPass").focus();
        return false;
    }
    return true;
}

async function validateUserByEmail(email) {
    $('#modal-loanding-validate-user-by-email').modal("show");
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: getHostAndContextAPI() + "authentication/validate/by/email/" + email,
            type: 'GET'
        }).done(function (user_) {
            setTimeout(() => {
                $('#modal-loanding-validate-user-by-email').modal("hide");
                resolve(user_);
            }, 1000);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            $('#modal-loanding-validate-user-by-email').modal("hide");
            showError(jqXHR, textStatus);
        });
    });
}

async function getTokenSessionByGoogle(idtoken) {
    $('#modal-loanding-validate-user-by-email').modal("show");
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: getHostAndContextAPI() + "authentication/get/token/by/google?idtoken=" + idtoken,
            type: 'GET'
        }).done(function (jsonResponse) {
            setTimeout(() => {
                $('#modal-loanding-validate-user-by-email').modal("hide");
                resolve(jsonResponse);
            }, 1000);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            $('#modal-loanding-validate-user-by-email').modal("hide");
            showError(jqXHR, textStatus);
        });
    });
}

// 34169868 - Pago efectivo.
// 