console.log("PathName: " + window.location.pathname);
if (window.location.pathname == getContextAPP() + "auth/login") {
    if (Cookies.get("needu_token") != undefined) {
        if (parseJwt(Cookies.get("needu_token"))) {
            sendIndex();
        }
    }
}