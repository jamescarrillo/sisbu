var beanRequestTokenRecovery = {};

start_recovery_account();

var token;
var captcha_selected;

var user_token;
var code_token;

function start_recovery_account() {

    code_token = "";
    user_token = {}

    token = "";

    beanRequestTokenRecovery.api = "api/web/token/recovey";

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

    $(".email-inputmask").inputmask({
        mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[*{2,6}][*{1,2}].*{1,}[.*{2,6}][.*{1,2}]"
        , greedy: !1
        , onBeforePaste: function (n, a) {
            return (e = e.toLowerCase()).replace("mailto:", "")
        }
        , definitions: {
            "*": {
                validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~/-]"
                , cardinality: 1
                , casing: "lower"
            }
        }
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

    document.querySelector('#FrmSendMailRecoveryAccount').onsubmit = function (event) {
        try {
            console.log("submit send mail recovery account. . .")
            if (validateSendMailRecoveryAccount()) {
                beanRequestTokenRecovery.operation = "request";
                beanRequestTokenRecovery.type_request = "POST";
                setHTMLModalLoanding('Enviando código de recuperación. . .');
                $("#modal-loanding-recovery-account").modal('show');
            }
        } catch (error) {
            console.log(error);
        }
        event.preventDefault();
        event.stopPropagation();
    }

    document.querySelector('#FrmValidateCodeRecoveryAccount').onsubmit = function (event) {
        try {
            console.log("submit validate code recovery account. . .")
            if (validateCodeRecoveryAccount()) {
                beanRequestTokenRecovery.operation = "validate";
                beanRequestTokenRecovery.type_request = "POST";
                setHTMLModalLoanding('Verificando código de recuperación. . .');
                $("#modal-loanding-recovery-account").modal('show');
            }
        } catch (error) {
            console.log(error);
        }
        event.preventDefault();
        event.stopPropagation();
    }

    document.querySelector('#FrmChangePasswordAccount').onsubmit = function (event) {
        try {
            console.log("submit change password account. . .")
            if (validateChangePasswordAccount()) {
                beanRequestTokenRecovery.operation = "change/password";
                beanRequestTokenRecovery.type_request = "POST";
                setHTMLModalLoanding('Actualizando contraseña. . .');
                $("#modal-loanding-recovery-account").modal('show');
            }
        } catch (error) {
            console.log(error);
        }
        event.preventDefault();
        event.stopPropagation();
    }

    $("#modal-loanding-recovery-account").on('shown.bs.modal', function () {
        processAjaxRecoveryAccount();
    });

    document.querySelector('#btn-send-mail-recovery-account').onclick = function () {
        $("#modal-loanding-validate-captcha").modal('show');
    }

    document.querySelector('#txtEmailRecovery').focus();

}

function processAjaxRecoveryAccount() {
    let json = "";
    let url_request = getHostAPI() + beanRequestTokenRecovery.api + "/" + beanRequestTokenRecovery.operation;
    switch (beanRequestTokenRecovery.operation) {
        case "request":
            json = {
                "t": {
                    "usuario": {
                        "email": document.querySelector('#txtEmailRecovery').value
                    }
                },
                "captcha": captcha_selected
            }
            break;
        case "validate":
            json = {
                "t": {
                    "code": document.querySelector('#txtCodeRecoveryAccount').value,
                    "usuario": {
                        "idusuario": user_token.idusuario,
                        "login": user_token.login,
                        "usuario": user_token.usuario,
                        "tipo_usuario": user_token.tipo_usuario
                    }
                }
            }
            break;
        case "change/password":
            json = {
                "t": {
                    "code": code_token,
                    "usuario": {
                        "idusuario": user_token.idusuario,
                        "login": user_token.login,
                        "usuario": user_token.usuario,
                        "tipo_usuario": user_token.tipo_usuario,
                        "pass": document.querySelector('#txtPasswordUsuario').value
                    }
                }
            }
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestTokenRecovery.type_request,
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modal-loanding-recovery-account').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            switch (beanRequestTokenRecovery.operation) {
                case "request":
                    if (beanCrudResponse.messageServer.toLowerCase() === "ok") {
                        if (beanCrudResponse.aditional_data !== undefined) {
                            showAlertTopEnd('success', 'Email enviado con éxito');
                            user_token = beanCrudResponse.aditional_data.user_token;
                            showSetCodeRecoveryAccount();
                        }
                    } else {
                        showAlertTopEnd("warning", beanCrudResponse.messageServer);
                        document.querySelector('#txtEmailRecovery').value = "";
                        document.querySelector('#txtEmailRecovery').focus();
                    }
                    break;
                case "validate":
                    if (beanCrudResponse.messageServer.toLowerCase() === "ok") {
                        showAlertTopEnd('success', 'Código correcto');
                        code_token = document.querySelector('#txtCodeRecoveryAccount').value;
                        showSetNewPasswordAccount();
                    } else {
                        showAlertTopEnd("warning", beanCrudResponse.messageServer);
                        document.querySelector('#txtCodeRecoveryAccount').value = "";
                        document.querySelector('#txtCodeRecoveryAccount').focus();
                    }
                    break;
                case "change/password":
                    if (beanCrudResponse.messageServer.toLowerCase() === "ok") {
                        let timerInterval
                        Swal.fire({
                            title: 'RedPOS',
                            html: "<h4>Contraseña actualizada exitosamente.</h4><h5 class='text-info mb-0'> Redireccionando en <strong></strong> milisegundos . . . </h5>",
                            timer: 3000,
                            type: 'success',
                            onBeforeOpen: () => {
                                Swal.showLoading()
                                timerInterval = setInterval(() => {
                                    Swal.getContent().querySelector('strong')
                                            .textContent = Swal.getTimerLeft()
                                }, 100)
                            },
                            onClose: () => {
                                clearInterval(timerInterval)
                            }
                        }).then((result) => {
                            if (
                                    // Read more about handling dismissals
                                    result.dismiss === Swal.DismissReason.timer
                                    ) {
                                //console.log('I was closed by the timer')
                                window.location = "auth/login";
                            } else {
                                window.location = "auth/login";
                            }
                        });
                    } else {
                        showAlertTopEnd("warning", beanCrudResponse.messageServer);
                        document.querySelector('#txtPasswordUsuario').value = "";
                        document.querySelector('#txtConfirPasswordUsuario').value = "";
                        document.querySelector('#txtPasswordUsuario').focus();
                    }
                    break;
            }
        }
        grecaptcha.reset();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modal-loanding-recovery-account').modal("hide");
        showAlertErrorRequest()
    });
}

function addClass(element, class_) {
    class_.split(" ").forEach(function (class_iterator) {
        element.classList.add(class_iterator);
    });
}

function removeClass(element, class_) {
    class_.split(" ").forEach(function (class_iterator) {
        element.classList.remove(class_iterator);
    });
}

function onSubmitSendMailRecoveryAccount(token_) {
    console.log("Captcha SendMailRecoveryAccount validate success")
    $("#modal-loanding-validate-captcha").modal('hide');
    token = token_;
    document.querySelector('#FrmSendMailRecoveryAccount').dispatchEvent(new Event('submit'));
}

function validateSendMailRecoveryAccount() {
    if (document.querySelector('#txtEmailRecovery').value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese email');
        document.querySelector('#txtEmailRecovery').focus();
        return false;
    }
    let emailTest = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!emailTest.test(document.querySelector('#txtEmailRecovery').value)) {
        showAlertTopEnd('warning', 'Por favor ingresa un correo electrónico válido');
        document.querySelector('#txtEmailRecovery').focus();
        return false;
    }
    if (token == "") {
        showAlertTopEnd('warning', 'No se validó el captcha. Por favor recargue la página y vuelva a intentarlo');
        return false;
    }
    captcha_selected = {
        "token": token,
        "success": "",
        "challenge_ts": "",
        "hostname": ""
    }
    return true;
}

function validateCodeRecoveryAccount() {
    if (document.querySelector('#txtCodeRecoveryAccount').value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese código de recuperación');
        document.querySelector('#txtCodeRecoveryAccount').focus();
        return false;
    }
    if (document.querySelector('#txtCodeRecoveryAccount').value.length < 6) {
        showAlertTopEnd('warning', 'Por favor ingrese código de 6 dígitos');
        document.querySelector('#txtCodeRecoveryAccount').focus();
        return false;
    }
    if (token == "") {
        showAlertTopEnd('warning', 'No se validó el captcha. Por favor recargue la página y vuelva a intentarlo');
        return false;
    }
    captcha_selected = {
        "token": token,
        "success": "",
        "challenge_ts": "",
        "hostname": ""
    }
    return true;
}

function validateChangePasswordAccount() {
    if (document.querySelector('#txtPasswordUsuario').value == "") {
        showAlertTopEnd('warning', 'Por favor ingresa la nueva contraseña para tu cuenta');
        document.querySelector('#txtPasswordUsuario').focus();
        return false;
    }
    if (document.querySelector('#txtConfirPasswordUsuario').value == "") {
        showAlertTopEnd('warning', 'Por favor confirma la nueva contraseña para tu cuenta');
        document.querySelector('#txtConfirPasswordUsuario').focus();
        return false;
    }
    //VALIDAMOS LONGITUD DE LA CONTRASEÑA
    if (document.querySelector('#txtPasswordUsuario').value.length < 6) {
        showAlertTopEnd('warning', 'La contraseña debe tener al menos 6 caracteres');
        document.querySelector('#txtPasswordUsuario').focus();
        return false;
    }
    //COMPARAMOS LAS CONTRASEÑAS SI SON IGUALES
    if (document.querySelector('#txtPasswordUsuario').value !== document.querySelector('#txtConfirPasswordUsuario').value) {
        showAlertTopEnd('warning', 'Las contraseñas no coinciden');
        document.querySelector('#txtPasswordUsuario').value = "";
        document.querySelector('#txtConfirPasswordUsuario').value = "";
        document.querySelector('#txtPasswordUsuario').focus();
        return false;
    }
    //VALIDAMOS QUE NO SEA UNA CONSTRASEÑA FACIL
    let pass_easy = [
        "123123", "123456", "654321", "123321", "asdasd",
        "111111", "222222", "333333", "444444", "555555",
        "666666", "777777", "888888", "999999", "147258",
        "147369", "258369", "147741", "258852", "369963"];
    if (pass_easy.indexOf(document.querySelector('#txtPasswordUsuario').value) != -1) {
        showAlertTopEnd('warning', 'La contraseña ingresada es muy fácil. Por favor ingrese otra');
        document.querySelector('#txtPasswordUsuario').value = "";
        document.querySelector('#txtConfirPasswordUsuario').value = "";
        document.querySelector('#txtPasswordUsuario').focus();
        return false;
    }
    if (token == "") {
        showAlertTopEnd('warning', 'No se validó el captcha. Por favor recargue la página y vuelva a intentarlo');
        return false;
    }
    captcha_selected = {
        "token": token,
        "success": "",
        "challenge_ts": "",
        "hostname": ""
    }
    return true;
}

function showSetCodeRecoveryAccount(option = "show") {
    if (option == "show") {
        document.querySelector('#row-send-mail-recovery-account').style.display = "none";
        document.querySelector('#row-change-password-account').style.display = "none";
        document.querySelector('#row-check-recovery-account').style.display = "flex";

        document.querySelector('#lbl-name-user-recovery-account').innerHTML = user_token.usuario;
        document.querySelector('#txtCodeRecoveryAccount').value = "";
        document.querySelector('#txtCodeRecoveryAccount').focus();
}
}

function showSetNewPasswordAccount(option = "show") {
    if (option == "show") {
        document.querySelector('#row-send-mail-recovery-account').style.display = "none";
        document.querySelector('#row-check-recovery-account').style.display = "none";
        document.querySelector('#row-change-password-account').style.display = "flex";

        document.querySelector('#txtPasswordUsuario').value = "";
        document.querySelector('#txtConfirPasswordUsuario').value = "";
        document.querySelector('#txtPasswordUsuario').focus();
}
}

function setHTMLModalLoanding(message) {
    document.querySelectorAll(".lbl-loanding-recovery-account").forEach(lbl => {
        lbl.innerHTML = message;
    });
}
