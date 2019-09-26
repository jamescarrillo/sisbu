function closeSession() {
    let = keys = keysCOOKIES();
    for (let i = 0; i < keys.length; i++) {
        //console.log("remove" + keys[i]);
        Cookies.remove(keys[i]);
    }
    //REDIRECCIONAMOS EL LOGIN
    location.href = getContextAPP() + "auth/login";
}

function keysCOOKIES() {
    var keys = ["sisbu_user", "sisbu_token"];
    return keys;
}

function getContextAPP() {
    //return "/";
    return "/sisbu/";
}

function getHostAPP() {
    //return "/";
    return "http://localhost:8080/";
}

function parseJwt(token) {
    try {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        JSON.parse(window.atob(base64));
        return true;
    } catch (error) {
        console.log("Error el token no es valido");
        return false;
    }
    //return JSON.parse(window.atob(base64));
}

function setCookieSession(token, user) {
    Cookies.set('sisbu_user', user);
    Cookies.set('sisbu_token', token);
}

function sendIndex() {
    let user = Cookies.getJSON("sisbu_user");
    if (user != undefined) {
        switch (user.tipo_usuario) {
            case 1:
                //ATENDIDO
                location.href = getContextAPP() + "app/ate/index";
                break;
            case 2:
                location.href = getContextAPP() + "app/ogbu/index";
                break;
        }
    } else {
        closeSession();
    }
}

function getIdAreaUserSession() {
    let url = window.location.href;
    if (url.includes('obstetricia')) {
        return 4;
    }
    if (url.includes('psicopedagogia')) {
        return 6;
    }
    if (url.includes('social')) {
        return 7;
    }
}