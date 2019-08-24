//console.log("Validando sessión...");
//console.image("http://blogs.larioja.com/ganas-de-vivir/wp-content/uploads/sites/48/2018/03/stop.png");
//console.meme("Seguro me quieres hackear!", "Y solo porque sabes programar.", "Not Sure Fry", 400, 300);

if (Cookies.get("needu_token") === undefined) {
    location.href = getContextAPP() + "auth/login";
} else if (parseJwt(Cookies.get("needu_token"))) {
    //CARGAMOS LOS DATOS DEL USUARIO
    let user = Cookies.getJSON('needu_user');
    //SET DATOS USER
    document.querySelectorAll('.user-name').forEach(element => {
        //element.innerHTML = user.nombre + " " + user.apellido_pat;
        element.innerHTML = getFullNameShortUser(user);
    });
    document.querySelectorAll('.user-type').forEach(element => {
        element.innerHTML = getStringTipoUsuario(user.tipo_usuario);
    });
    //ADD ITEMS MENU AL SIDEBAR
    addMenus(user.tipo_usuario);
} else {
    closeSession();
}

function getStringTipoUsuario(tipo_usuario) {
    let st = "";
    switch (tipo_usuario) {
        case "PRO":
            st = "PROFESIONAL";
            break;
        case "ATE":
            st = "ATENDIDO";
            break;
        default:
            st = "SUPER ADMINISTRADOR";
            break;
    }
    st = getStringCapitalize(st.toLowerCase());
    return st;
}

function addMenus(typeUser) {
    let contextPah = getContextAPP();
    let HTML_MENUS;
    switch (typeUser) {
        case "SAD":
            HTML_MENUS =
                    `
                <li>
                    <a href="${contextPah}app/${typeUser.toLowerCase()}/index" class="dropdown-toggle no-arrow">
                        <span class="fa fa-home"></span><span class="mtext">Inicio</span>
                    </a>
                </li>
                <li>
                    <a href="${contextPah}app/${typeUser.toLowerCase()}/instituciones" class="dropdown-toggle no-arrow">
                        <span class="fa fa-user-md"></span><span class="mtext">Instituciones</span>
                    </a>
                </li>
                <li>
                    <a href="${contextPah}app/${typeUser.toLowerCase()}/usuarios" class="dropdown-toggle no-arrow">
                        <span class="fa fa-asterisk"></span><span class="mtext">Usuarios</span>
                    </a>
                </li>
                <li>
                    <a href="${contextPah}app/${typeUser.toLowerCase()}/areas/atencion" class="dropdown-toggle no-arrow">
                        <span class="fa fa-comments-o"></span><span class="mtext">Areas Atención</span>
                    </a>
                </li>
            `;
            break;
        case "PRO":
            HTML_MENUS =
                    `
                <li>
                    <a href="${contextPah}app/${typeUser.toLowerCase()}/index" class="dropdown-toggle no-arrow">
                        <span class="fa fa-home"></span><span class="mtext">Inicio</span>
                    </a>
                </li>
                <li>
                    <a href="${contextPah}app/${typeUser.toLowerCase()}/evaluaciones" class="dropdown-toggle no-arrow">
                        <span class="fa fa-user-md"></span><span class="mtext">Evaluaciones</span>
                    </a>
                </li>
                <li>
                    <a href="${contextPah}app/${typeUser.toLowerCase()}/asignaciones" class="dropdown-toggle no-arrow">
                        <span class="fa fa-telegram"></span><span class="mtext">Asignaciones</span>
                    </a>
                </li>
                <li>
                    <a href="${contextPah}app/${typeUser.toLowerCase()}/citas" class="dropdown-toggle no-arrow">
                        <span class="fa fa-calendar-check-o"></span><span class="mtext">Citas Virtuales</span>
                    </a>
                </li>
                <li>
                    <a href="${contextPah}app/${typeUser.toLowerCase()}/chat" class="dropdown-toggle no-arrow">
                        <span class="fa fa-comments-o"></span><span class="mtext">Chat</span>
                    </a>
                </li>
                <li>
                    <a href="${contextPah}app/${typeUser.toLowerCase()}/areas/atencion" class="dropdown-toggle no-arrow">
                        <span class="fa fa-cubes"></span><span class="mtext">Mis Areas Atención</span>
                    </a>
                </li>
            `;
            break;
        default:
            //ATENDIDO
            HTML_MENUS =
                    `
                <li>
                    <a href="${contextPah}app/${typeUser.toLowerCase()}/index" class="dropdown-toggle no-arrow">
                        <span class="fa fa-home"></span><span class="mtext">Inicio</span>
                    </a>
                </li>
                <li>
                    <a href="${contextPah}app/perfil" class="dropdown-toggle no-arrow">
                        <span class="fa fa-user-md"></span><span class="mtext">Perfil</span>
                    </a>
                </li>
                <li>
                    <a href="${contextPah}app/${typeUser.toLowerCase()}/asignaciones" class="dropdown-toggle no-arrow">
                        <span class="fa fa-telegram"></span><span class="mtext">Asignaciones</span>
                    </a>
                </li>
                <li>
                    <a href="${contextPah}app/${typeUser.toLowerCase()}/sessiones" class="dropdown-toggle no-arrow">
                        <span class="fa fa-asterisk"></span><span class="mtext">Sessiones</span>
                    </a>
                </li>
                <li>
                    <a href="${contextPah}app/${typeUser.toLowerCase()}/chat" class="dropdown-toggle no-arrow">
                        <span class="fa fa-comments-o"></span><span class="mtext">Chat</span>
                    </a>
                </li>
                <li>
                    <a href="${contextPah}app/${typeUser.toLowerCase()}/citas" class="dropdown-toggle no-arrow">
                        <span class="fa fa-calendar-check-o"></span><span class="mtext">Citas Virtuales</span>
                    </a>
                </li>
                <li>
                    <a href="${contextPah}app/${typeUser.toLowerCase()}/preferencias" class="dropdown-toggle no-arrow">
                        <span class="fa fa-tags"></span><span class="mtext">Preferencias</span>
                    </a>
                </li>

            `;
            break;
    }
    document.querySelector("#accordion-menu").innerHTML = HTML_MENUS;
}