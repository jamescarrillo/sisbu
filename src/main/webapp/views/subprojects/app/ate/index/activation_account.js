var beanRequestTokenRecovery = new BeanRequest();

start_activation_account();

function start_activation_account() {

    beanRequestTokenRecovery.api = "api/token/recovey";

    beanRequestTokenRecovery.operation = "check";
    beanRequestTokenRecovery.type_request = "POST";

    $("#modal-loanding-activation-account").on('shown.bs.modal', function () {
        processAjaxActivationAccount();
    });

    //######### ACTIVATION ACCOUNT
    document.querySelector('#txtCodeActivationAccount').onkeyup = function (e) {
        if (e.keyCode == 13) {
            document.querySelector('#btn-activate-account').dispatchEvent(new Event('click'));
        }
    }

    document.querySelector('#btn-activate-account').onclick = function () {
        if (document.querySelector('#txtCodeActivationAccount').value != "") {
            if (document.querySelector('#txtCodeActivationAccount').value.length == 6) {
                //showCloseInitialConfiguration('show')
                $("#modal-loanding-activation-account").modal('show');
            } else {
                showAlertTopEnd('warning', 'Por favor ingrese código de 6 dígitos');
                document.querySelector('#txtCodeActivationAccount').focus();
            }
        } else {
            showAlertTopEnd('warning', 'Por favor ingrese código de activación');
            document.querySelector('#txtCodeActivationAccount').focus();
        }
    }
}

function showCloseActivationAccount(option) {
    if (option == "show") {
        document.querySelector('#row-activation-account').style.display = "flex";
        document.querySelector('#row-initial-configuration').style.display = "none";
        document.querySelector('#row-access-direct').style.display = "none";

        document.querySelector('#lbl-email-activation-account').innerHTML = user_session.email;
        setTimeout(() => {
            document.querySelector('#txtCodeActivationAccount').focus();
        }, 400);
    } else {
        document.querySelector('#row-activation-account').style.display = "none";
        document.querySelector('#row-initial-configuration').style.display = "none";
        document.querySelector('#row-access-direct').style.display = "none";
    }
}

function processAjaxActivationAccount() {
    let json = "";
    let url_request = getHostAPI() + beanRequestTokenRecovery.api + "/" + beanRequestTokenRecovery.operation;
    switch (beanRequestTokenRecovery.operation) {
        case "check":
            json = {
                "code": document.querySelector('#txtCodeActivationAccount').value,
                "usuario": {
                    "idusuario": user_session.idusuario
                }
            }
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestTokenRecovery.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modal-loanding-activation-account').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() === "ok") {
                showAlertTopEnd('success', 'Cuenta activada con éxito');
                console.log('Account activate success. . .')
                console.log('change user sesion. . .')
                user_session_temp = user_session;
                user_session_temp.estado = 1;
                Cookies.remove('sisbu_user');
                Cookies.set('sisbu_user', user_session_temp);
                user_session = Cookies.getJSON('sisbu_user');
                setTimeout(() => {
                    window.location = "index";
                }, 1500);
            } else {
                showAlertTopEnd("warning", beanCrudResponse.messageServer);
                document.querySelector('#txtCodeActivationAccount').value = "";
                document.querySelector('#txtCodeActivationAccount').focus();
            }
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modal-loanding-activation-account').modal("hide");
        showAlertTopEnd('warning', 'Error interno al activar la cuenta');
    });
}
