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
    var keys = ["needu_user", "needu_token"];
    return keys;
}

function getContextAPP() {
    return "/";
    //return "/needu/";
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
    Cookies.set('needu_user', user);
    Cookies.set('needu_token', token);
}

function sendIndex() {
    let user = Cookies.getJSON("needu_user");
    if (user != undefined) {
        switch (user.tipo_usuario) {
            case "SAD":
                location.href = getContextAPP() + "app/sad/index";
                break;
            case "PRO":
                location.href = getContextAPP() + "app/pro/index";
                break;
            case "ATE":
                location.href = getContextAPP() + "app/ate/index";
                break;
        }
    } else {
        closeSession();
    }
}