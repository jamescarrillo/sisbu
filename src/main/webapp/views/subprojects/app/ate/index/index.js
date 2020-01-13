
document.addEventListener("DOMContentLoaded", function () {

    document.querySelector("#lblNameUserIndex").innerHTML = getStringCapitalize(Cookies.getJSON('sisbu_user').usuario.split(" ")[0].toLowerCase());
    document.querySelector("#lblNameUserIndex2").innerHTML = document.querySelector("#lblNameUserIndex").innerHTML;

    document.querySelector("#row-saludo-principal").style.display = "flex";
    document.querySelector("#row-videos-tutoriales").style.display = "none";
    document.querySelector("#row-access-direct").style.display = "none";
    document.querySelector("#row-pregunta-empiezo").style.display = "none";

    //SET INDEX
    if (user_session.tipo_perfil == 1000) {
        document.querySelector("#row-saludo-principal-usuario-nc").style.display = "none";
        document.querySelector("#row-saludo-principal").style.display = "flex";
    } else {
        document.querySelector("#row-saludo-principal-usuario-nc").style.display = "flex";
        document.querySelector("#row-saludo-principal").style.display = "none";
    }

    document.querySelector("#btnMirarVideosSisbu").onclick = function () {
        document.querySelector("#row-saludo-principal").style.display = "none";
        document.querySelector("#row-videos-tutoriales").style.display = "flex";
        document.querySelector("#row-access-direct").style.display = "flex";
        document.querySelector("#row-pregunta-empiezo").style.display = "flex";
        if (beanPaginationVideoTutorial.count_filter == 0) {
            showAlertTopEnd('warning', 'Lo sentimos aún no se han publicado videos tutoriales', 7000);
        }
    };

    document.querySelectorAll(".icon-access-mi-perfil").forEach(btn => {
        btn.onclick = function () {
            window.location = "datos";
        }
    });
    
    document.querySelector("#icon-access-reserva-citas").onclick = function () {
        window.location = "reservas";
    };

    document.querySelector("#icon-access-mis-evaluaciones").onclick = function () {
        window.location = "evaluaciones";
    };

}); 