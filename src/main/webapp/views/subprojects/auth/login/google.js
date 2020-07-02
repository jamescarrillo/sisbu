let googleUser_;

var googleUser = {};
var startApp = function () {
    gapi.load('auth2', function () {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        auth2 = gapi.auth2.init({
            client_id: '927613292031-l1fd3p8tp63stn727bda93nj0963b6bt.apps.googleusercontent.com',
            //cookiepolicy: 'single_host_origin',
            // Request scopes in addition to 'profile' and 'email'
            //scope: 'additional_scope'
        });
        attachSigninGoogle(document.getElementById('btnLoginWhitGoogle'));
    });
};

function attachSigninGoogle(element) {
    //console.log(element.id);
    auth2.attachClickHandler(element, {},
            function (googleUser) {
                googleUser_ = googleUser;
                console.log(googleUser_)
                //Validamos en el servidor si existe para solicitar un token o crear una cuenta
                validateUserByEmail(googleUser_.getBasicProfile().getEmail()).then(function (user_) {
                    console.log(user_);
                    if (user_.idusuario == -1) {
                        //Registramos
                        if (googleUser_.getBasicProfile().getEmail().includes("@unprg.edu.pe")) {
                            processAjaxRegisterUsuario();
                        } else {
                            showAlertTopEnd("warning", 'Solo se permiten cuentas institucionales. Tu correo debe terminar en: @unprg.edu.pe ', 8000);
                        }
                        //processAjaxRegisterUsuario();
                    } else {
                        //Request token inicio sesión
                        getTokenSessionByGoogle(googleUser_.getAuthResponse().id_token).then((jsonResponse) => {
                            console.log(jsonResponse);
                            setCookieSession(jsonResponse.token, jsonResponse.usuario);
                            sendIndex();
                        });
                    }
                });
            }, function (error) {
        alert(JSON.stringify(error, undefined, 2));
    });
}

function signOutGoogle() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

startApp();