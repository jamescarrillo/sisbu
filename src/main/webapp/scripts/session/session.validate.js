//console.log("Validando sessión...");
//console.image("http://blogs.larioja.com/ganas-de-vivir/wp-content/uploads/sites/48/2018/03/stop.png");
//console.meme("Seguro me quieres hackear!", "Y solo porque sabes programar.", "Not Sure Fry", 400, 300);
let contextPah = getContextAPP();
if (Cookies.get("sisbu_token") === undefined) {
    location.href = contextPah + "auth/login";
} else if (parseJwt(Cookies.get("sisbu_token"))) {
    //CARGAMOS LOS DATOS DEL USUARIO
    let user = Cookies.getJSON('sisbu_user');
    //SET DATOS USER
    document.querySelectorAll('.name-user-session').forEach(element => {
        element.innerHTML = getStringCapitalize(user.usuario.toLowerCase());
    });
    document.querySelectorAll('.name-type-user-session').forEach(element => {
        element.innerHTML = getStringTipoUsuario(user.tipo_usuario);
    });
    if (document.querySelector("#title-welcome") != null) {
        document.querySelector("#title-welcome").innerHTML = "¡Bienvenido " + getStringCapitalize(user.usuario.toLowerCase()) + "!";
    }
    //ADD ITEMS MENU AL SIDEBAR
    addMenus(user);
} else {
    closeSession();
}

function getStringTipoUsuario(tipo_usuario) {
    let st = "";
    switch (tipo_usuario) {
        case 1:
            st = "Usuario UNPRG";
            break;
        case 2:
            st = "Usuario OGBU";
            break;
        default:
            st = "User";
            break;
    }
    //st = getStringCapitalize(st.toLowerCase());
    return st;
}

function addMenus(usuario) {
    switch (usuario.tipo_usuario) {
        case 1:

            break;
        case 2:
            //ogbu
            createHTML_OGBU(usuario.tipo_perfil);
            break;
        default:

            break;
    }
}

function createHTML_OGBU(typeProfile) {
    //INICIO PARA TODOS
    document.querySelector("#menus_sisbu").innerHTML =
            `
        <!-- Menu Header -->
        <li class="dt-side-nav__item dt-side-nav__header">
            <span class="dt-side-nav__text">Dashboard</span>
        </li>
        <!-- /menu header -->

        <!-- Menu Item -->
        <li class="dt-side-nav__item">
            <a href="${contextPah}app/ogbu/index" class="dt-side-nav__link a-index-no" title="Inicio">
                <i class="icon icon-home icon-fw icon-lg"></i>
                <span class="dt-side-nav__text">Inicio</span>
            </a>
        </li>
        <!-- /menu item -->
    `;
    //SERVICIOS
    ///inicio
    document.querySelector("#menus_sisbu").innerHTML +=
            `
        <!-- Menu Header -->
        <li class="dt-side-nav__item dt-side-nav__header">
            <span class="dt-side-nav__text">Servicios</span>
        </li>
        <!-- /menu header -->
    `;

    ////Enfermería
    if (typeProfile == 0 || typeProfile == 1 || typeProfile == 10) {
        document.querySelector("#menus_sisbu").innerHTML +=
                `
            <!-- Menu Item -->
            <li class="dt-side-nav__item">
                <a href="javascript:void(0)" class="dt-side-nav__link dt-side-nav__arrow" title="Enfermería">
                    <i class="icon icon-components icon-fw icon-lg"></i>
                    <span class="dt-side-nav__text">Enfermería</span>
                </a>
                <!-- Sub-menu -->
                <ul class="dt-side-nav__sub-menu">
                    <li class="dt-side-nav__item">
                        <a href="${contextPah}app/ogbu/enfermeria/pacientes" class="dt-side-nav__link" title="Pacientes">
                            <i class="icon icon-contacts-app icon-fw icon-lg"></i>
                            <span class="dt-side-nav__text">Pacientes</span>
                        </a>
                    </li>
                    <li class="dt-side-nav__item">
                        <a href="${contextPah}app/ogbu/enfermeria/citas" class="dt-side-nav__link" title="Citas">
                            <i class="icon icon-sweet-alert icon-fw icon-lg"></i>
                            <span class="dt-side-nav__text">Citas</span>
                        </a>
                    </li>
                </ul>
                <!-- /sub-menu -->
            </li>
        `;
    }

    ////medicina
    if (typeProfile == 0 || typeProfile == 1 || typeProfile == 10 || typeProfile == 11) {
        document.querySelector("#menus_sisbu").innerHTML +=
                `
            <li class="dt-side-nav__item">
                <a href="javascript:void(0)" class="dt-side-nav__link dt-side-nav__arrow" title="Medicina">
                    <i class="icon icon-customer icon-fw icon-lg"></i>
                    <span class="dt-side-nav__text">Medicina</span>
                </a>
                <!-- Sub-menu -->
                <ul class="dt-side-nav__sub-menu">
                    <li class="dt-side-nav__item">
                        <a href="${contextPah}app/ogbu/medicina/pacientes" class="dt-side-nav__link" title="Pacientes">
                            <i class="icon icon-contacts-app icon-fw icon-lg"></i>
                            <span class="dt-side-nav__text">Pacientes</span>
                        </a>
                    </li>
                    <li class="dt-side-nav__item">
                        <a href="${contextPah}app/ogbu/medicina/citas" class="dt-side-nav__link" title="Citas">
                            <i class="icon icon-sweet-alert icon-fw icon-lg"></i>
                            <span class="dt-side-nav__text">Citas</span>
                        </a>
                    </li>
                </ul>
                <!-- /sub-menu -->
            </li>
        `;
    }
    ////farmacia
    if (typeProfile == 0 || typeProfile == 1 || typeProfile == 10) {
        document.querySelector("#menus_sisbu").innerHTML +=
                `
            <li class="dt-side-nav__item">
                <a href="javascript:void(0)" class="dt-side-nav__link dt-side-nav__arrow" title="Farmacia">
                    <i class="icon icon-home icon-fw icon-lg"></i>
                    <span class="dt-side-nav__text">Farmacia</span>
                </a>
                <!-- Sub-menu -->
                <ul class="dt-side-nav__sub-menu">
                    <li class="dt-side-nav__item">
                        <a href="${contextPah}app/ogbu/farmacia/pacientes" class="dt-side-nav__link" title="Pacientes">
                            <i class="icon icon-contacts-app icon-fw icon-lg"></i>
                            <span class="dt-side-nav__text">Pacientes</span>
                        </a>
                    </li>
                    <li class="dt-side-nav__item">
                        <a href="${contextPah}app/ogbu/farmacia/entradas" class="dt-side-nav__link" title="Entradas de Medicamentos">
                            <i class="icon icon-arrow-left icon-fw icon-lg"></i>
                            <span class="dt-side-nav__text">Entradas</span>
                        </a>
                    </li>
                    <li class="dt-side-nav__item">
                        <a href="${contextPah}app/ogbu/farmacia/entradas" class="dt-side-nav__link" title="Salidas de Medicamentos">
                            <i class="icon icon-arrow-right icon-fw icon-lg"></i>
                            <span class="dt-side-nav__text">Salidas</span>
                        </a>
                    </li>
                </ul>
                <!-- /sub-menu -->
            </li>
        `;
    }
    ////odontologia
    if (typeProfile == 0 || typeProfile == 1 || typeProfile == 3) {
        document.querySelector("#menus_sisbu").innerHTML +=
                `
            <li class="dt-side-nav__item">
                <a href="javascript:void(0)" class="dt-side-nav__link dt-side-nav__arrow" title="Odontología">
                    <i class="icon icon-link icon-fw icon-lg"></i>
                    <span class="dt-side-nav__text">Odontología</span>
                </a>
                <!-- Sub-menu -->
                <ul class="dt-side-nav__sub-menu">
                    <li class="dt-side-nav__item">
                        <a href="${contextPah}app/ogbu/odontologia/pacientes" class="dt-side-nav__link" title="Pacientes">
                            <i class="icon icon-contacts-app icon-fw icon-lg"></i>
                            <span class="dt-side-nav__text">Pacientes</span>
                        </a>
                    </li>
                    <li class="dt-side-nav__item">
                        <a href="${contextPah}app/ogbu/odontologia/citas" class="dt-side-nav__link" title="Citas">
                            <i class="icon icon-sweet-alert icon-fw icon-lg"></i>
                            <span class="dt-side-nav__text">Citas</span>
                        </a>
                    </li>
                </ul>
                <!-- /sub-menu -->
            </li>
        `;
    }
    ////obstetricia
    if (typeProfile == 0 || typeProfile == 1 || typeProfile == 4) {
        document.querySelector("#menus_sisbu").innerHTML +=
                `
            <li class="dt-side-nav__item">
                <a href="javascript:void(0)" class="dt-side-nav__link dt-side-nav__arrow" title="Obstetricia">
                    <i class="icon icon-contacts-app icon-fw icon-lg"></i>
                    <span class="dt-side-nav__text">Obstetricia</span>
                </a>
                <!-- Sub-menu -->
                <ul class="dt-side-nav__sub-menu">
                    <li class="dt-side-nav__item">
                        <a href="${contextPah}app/ogbu/obstetricia/pacientes" class="dt-side-nav__link" title="Pacientes">
                            <i class="icon icon-contacts-app icon-fw icon-lg"></i>
                            <span class="dt-side-nav__text">Pacientes</span>
                        </a>
                    </li>
                    <li class="dt-side-nav__item">
                        <a href="${contextPah}app/ogbu/obstetricia/citas" class="dt-side-nav__link" title="Citas">
                            <i class="icon icon-sweet-alert icon-fw icon-lg"></i>
                            <span class="dt-side-nav__text">Citas</span>
                        </a>
                    </li>
                </ul>
                <!-- /sub-menu -->
            </li>
        `;
    }
    ////Psicopedagogía
    if (typeProfile == 0 || typeProfile == 1 || typeProfile == 11) {
        document.querySelector("#menus_sisbu").innerHTML +=
                `
            <li class="dt-side-nav__item">
                <a href="javascript:void(0)" class="dt-side-nav__link dt-side-nav__arrow" title="Psicopedagogía">
                    <i class="icon icon-heart-o icon-fw icon-fw icon-lg"></i>
                    <span class="dt-side-nav__text">Psicopedagogía</span>
                </a>
                <!-- Sub-menu -->
                <ul class="dt-side-nav__sub-menu">
                    <li class="dt-side-nav__item">
                        <a href="${contextPah}app/ogbu/servicios/psicopedagogia/evaluaciones" class="dt-side-nav__link" title="Evaluaciones">
                            <i class="icon icon-assignment icon-fw icon-lg"></i>
                            <span class="dt-side-nav__text">Evaluaciones</span>
                        </a>
                    </li>
                    <li class="dt-side-nav__item">
                        <a href="${contextPah}app/ogbu/servicios/psicopedagogia/pacientes" class="dt-side-nav__link" title="Pacientes">
                            <i class="icon icon-contacts-app icon-fw icon-lg"></i>
                            <span class="dt-side-nav__text">Pacientes</span>
                        </a>
                    </li>
                    <li class="dt-side-nav__item">
                        <a href="${contextPah}app/ogbu/servicios/psicopedagogia/citas" class="dt-side-nav__link" title="Citas">
                            <i class="icon icon-sweet-alert icon-fw icon-lg"></i>
                            <span class="dt-side-nav__text">Citas</span>
                        </a>
                    </li>
                    <li class="dt-side-nav__item">
                        <a href="${contextPah}app/ogbu/servicios/psicopedagogia/citas" class="dt-side-nav__link" title="Asignaciones">
                            <i class="icon icon-sweet-alert icon-fw icon-lg"></i>
                            <span class="dt-side-nav__text">Asignaciones</span>
                        </a>
                    </li>
                </ul>
                <!-- /sub-menu -->
            </li>
        `;
    }
    ////social
    if (typeProfile == 0 || typeProfile == 1 || typeProfile == 11 || typeProfile == 5) {
        document.querySelector("#menus_sisbu").innerHTML +=
                `
            <li class="dt-side-nav__item">
                <a href="javascript:void(0)" class="dt-side-nav__link dt-side-nav__arrow" title="Social">
                    <i class="icon icon-users icon-fw icon-fw icon-lg"></i>
                    <span class="dt-side-nav__text">Social</span>
                </a>
                <!-- Sub-menu -->
                <ul class="dt-side-nav__sub-menu">
                    <li class="dt-side-nav__item">
                        <a href="${contextPah}app/ogbu/social/fichas" class="dt-side-nav__link" title="Fichas">
                            <i class="icon icon-list icon-fw icon-lg"></i>
                            <span class="dt-side-nav__text">Fichas</span>
                        </a>
                    </li>
                    <li class="dt-side-nav__item">
                        <a href="${contextPah}app/ogbu/social/usuarios" class="dt-side-nav__link" title="Pacientes">
                            <i class="icon icon-contacts-app icon-fw icon-lg"></i>
                            <span class="dt-side-nav__text">Pacientes</span>
                        </a>
                    </li>
                    <li class="dt-side-nav__item">
                        <a href="${contextPah}app/ogbu/social/citas" class="dt-side-nav__link" title="Citas">
                            <i class="icon icon-sweet-alert icon-fw icon-lg"></i>
                            <span class="dt-side-nav__text">Citas</span>
                        </a>
                    </li>
                    <li class="dt-side-nav__item">
                        <a href="${contextPah}app/ogbu/social/reservas-cu" class="dt-side-nav__link" title="Reservas C.U">
                            <i class="icon icon-list icon-fw icon-lg"></i>
                            <span class="dt-side-nav__text">Reservas C.U</span>
                        </a>
                    </li>
                    <li class="dt-side-nav__item">
                        <a href="${contextPah}app/ogbu/social/convocatorias-cu" class="dt-side-nav__link" title="Convocatorias">
                            <i class="icon icon-list icon-fw icon-lg"></i>
                            <span class="dt-side-nav__text">Convocatorias C.U</span>
                        </a>
                    </li>
                </ul>
                <!-- /sub-menu -->
            </li>
        `;
    }
    ////comedor universitario
    if (typeProfile == 0 || typeProfile == 1 || typeProfile == 5 || typeProfile == 6) {
        document.querySelector("#menus_sisbu").innerHTML +=
                `
            <li class="dt-side-nav__item">
                <a href="javascript:void(0)" class="dt-side-nav__link dt-side-nav__arrow" title="Comedor Universitario">
                    <i class="icon icon-card-group icon-fw icon-fw icon-lg"></i>
                    <span class="dt-side-nav__text">Comedor Univ.</span>
                </a>
                <!-- Sub-menu -->
                <ul class="dt-side-nav__sub-menu">
                    <li class="dt-side-nav__item">
                        <a href="${contextPah}app/ogbu/servicios/comedor/c-a-cu" class="dt-side-nav__link" title="Control Asistencia del C.U">
                            <i class="icon icon-collapse icon-fw icon-lg"></i>
                            <span class="dt-side-nav__text">Control Diario</span>
                        </a>
                    </li>
                    <li class="dt-side-nav__item">
                        <a href="${contextPah}app/ogbu/servicios/comedor/asitencia-cu" class="dt-side-nav__link" title="Asistencia">
                            <i class="icon icon-calendar icon-fw icon-lg"></i>
                            <span class="dt-side-nav__text">Asistencia</span>
                        </a>
                    </li>
                    <li class="dt-side-nav__item">
                        <a href="${contextPah}app/ogbu/servicios/comedor/comidas" class="dt-side-nav__link" title="Comidas">
                            <i class="icon icon-burger icon-fw icon-lg"></i>
                            <span class="dt-side-nav__text">Comidas</span>
                        </a>
                    </li>
                    <li class="dt-side-nav__item">
                        <a href="${contextPah}app/ogbu/servicios/comedor/menus" class="dt-side-nav__link" title="Menus">
                            <i class="icon icon-list icon-fw icon-lg"></i>
                            <span class="dt-side-nav__text">Menus</span>
                        </a>
                    </li>
                </ul>
                <!-- /sub-menu -->
            </li>
            <!-- /menu item -->
        `;
    }
    ////recreacion y deporte
    if (typeProfile == 0 || typeProfile == 1 || typeProfile == 7) {
        document.querySelector("#menus_sisbu").innerHTML +=
                `
            <li class="dt-side-nav__item">
                <a href="javascript:void(0)" class="dt-side-nav__link dt-side-nav__arrow" title="Psicopedagogía">
                    <i class="icon icon-heart-o icon-fw icon-fw icon-lg"></i>
                    <span class="dt-side-nav__text">Deportes</span>
                </a>
                <!-- Sub-menu -->
                <ul class="dt-side-nav__sub-menu">
                    <li class="dt-side-nav__item">
                        <a href="${contextPah}app/ogbu/servicios/recreacion-deportes/usuarios" class="dt-side-nav__link" title="Usuarios">
                            <i class="icon icon-contacts-app icon-fw icon-lg"></i>
                            <span class="dt-side-nav__text">Usuarios</span>
                        </a>
                    </li>
                    <li class="dt-side-nav__item">
                        <a href="${contextPah}app/ogbu/servicios/recreacion-deportes/aficiones" class="dt-side-nav__link" title="Aficiones">
                            <i class="icon icon-crm icon-fw icon-lg"></i>
                            <span class="dt-side-nav__text">Aficiones</span>
                        </a>
                    </li>
                    <li class="dt-side-nav__item">
                        <a href="${contextPah}app/ogbu/servicios/recreacion-deportes/deportes" class="dt-side-nav__link" title="Deportes">
                            <i class="icon icon-customers icon-fw icon-lg"></i>
                            <span class="dt-side-nav__text">Deportes</span>
                        </a>
                    </li>
                </ul>
                <!-- /sub-menu -->
            </li>
            <!-- /menu item -->
        `;
    }
    ////mantenimientos seguridad (todos)
    if (typeProfile == 0 || typeProfile == 1) {
        document.querySelector("#menus_sisbu").innerHTML +=
                `
            <!-- Menu Header -->
            <li class="dt-side-nav__item dt-side-nav__header">
                <span class="dt-side-nav__text">Mantenimientos</span>
            </li>
            <!-- /menu header -->

            <!-- Menu Item -->
            <li class="dt-side-nav__item">
                <a href="${contextPah}app/ogbu/mantenimientos/cargos" class="dt-side-nav__link" title="Cargos">
                    <i class="icon icon-task-manager icon-fw icon-lg"></i>
                    <span class="dt-side-nav__text">Cargos</span>
                </a>
            </li>
            <li class="dt-side-nav__item">
                <a href="${contextPah}app/ogbu/mantenimientos/personal" class="dt-side-nav__link" title="Personal">
                    <i class="icon icon-user-add icon-fw icon-lg"></i>
                    <span class="dt-side-nav__text">Personal</span>
                </a>
            </li>
            <li class="dt-side-nav__item">
                <a href="${contextPah}app/ogbu/mantenimientos/oficinas" class="dt-side-nav__link" title="Oficinas">
                    <i class="icon icon-datatable icon-fw icon-lg"></i>
                    <span class="dt-side-nav__text">Oficinas</span>
                </a>
            </li>
            <li class="dt-side-nav__item">
                <a href="${contextPah}app/ogbu/mantenimientos/facultades" class="dt-side-nav__link" title="Facultades">
                    <i class="icon icon-components icon-fw icon-lg"></i>
                    <span class="dt-side-nav__text">Facultades</span>
                </a>
            </li>
            <li class="dt-side-nav__item">
                <a href="${contextPah}app/ogbu/mantenimientos/ubigeo" class="dt-side-nav__link" title="Ubigeo">
                    <i class="icon icon-maps icon-fw icon-lg"></i>
                    <span class="dt-side-nav__text">Ubigeo</span>
                </a>
            </li>
            <!-- /menu item -->
        
            <!-- Menu Header -->
            <!--li class="dt-side-nav__item dt-side-nav__header">
                <span class="dt-side-nav__text">Seguridad</span>
            </li-->
            <!-- /menu header -->

            <!-- Menu Item -->
            <!--li class="dt-side-nav__item">
                <a href="basic-form.html" class="dt-side-nav__link" title="Basic Form">
                    <i class="icon icon-settings icon-fw icon-lg"></i>
                    <span class="dt-side-nav__text">Perfiles</span>
                </a>
            </li-->
            <!-- /menu item -->
        
            <!-- Menu Header -->
            <li class="dt-side-nav__item dt-side-nav__header">
                <span class="dt-side-nav__text">Configuraciones</span>
            </li>
            <!-- /menu header -->

            <!-- Menu Item -->
            <li class="dt-side-nav__item">
                <a href="" class="dt-side-nav__link" title="Correo SISBU">
                    <i class="icon icon-mail icon-fw icon-lg"></i>
                    <span class="dt-side-nav__text">Correo SISBU</span>
                </a>
            </li>
            <li class="dt-side-nav__item">
                <a href="${contextPah}app/ogbu/configuraciones/cicloacademico" class="dt-side-nav__link" title="Ciclos Académicos">
                    <i class="icon icon-tag-o icon-fw icon-lg"></i>
                    <span class="dt-side-nav__text">Ciclos Académicos</span>
                </a>
            </li>
            <!-- /menu item -->
        
            <!-- Menu Header -->
            <li class="dt-side-nav__item dt-side-nav__header">
                <span class="dt-side-nav__text">Procesos</span>
            </li>
            <!-- /menu header -->

            <!-- Menu Item -->
            <li class="dt-side-nav__item">
                <a href="page-wall.html" class="dt-side-nav__link" title="Importar Alumnos">
                    <i class="icon icon-wall icon-fw icon-lg"></i>
                    <span class="dt-side-nav__text">Importar Alumnos</span>
                </a>
            </li>
            <!-- /menu item -->
        
        
        `;
    }
    ////informes
    if (typeProfile != 100) {
        //diferente de invitado
        document.querySelector("#menus_sisbu").innerHTML +=
                `
            <!-- Menu Header -->
            <li class="dt-side-nav__item dt-side-nav__header">
                <span class="dt-side-nav__text">Informes</span>
            </li>
            <!-- /menu header -->
            <li class="dt-side-nav__item">
                <a href="" class="dt-side-nav__link" title="Reportes">
                    <i class="icon icon-profilepage icon-fw icon-lg"></i>
                    <span class="dt-side-nav__text">Reportes</span>
                </a>
            </li>
            <li class="dt-side-nav__item">
                <a href="" class="dt-side-nav__link" title="Estadísticas">
                    <i class="icon icon-profilepage icon-fw icon-lg"></i>
                    <span class="dt-side-nav__text">Estadísticas</span>
                </a>
            </li>
            <!-- /menu item -->   
        `;
    }


    /*
     document.querySelector("#menus_sisbu").innerHTML +=
     `
     
     `;
     */
}
