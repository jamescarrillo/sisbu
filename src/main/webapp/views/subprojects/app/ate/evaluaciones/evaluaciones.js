/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


document.addEventListener("DOMContentLoaded", function () {

    document.querySelector("#lblNameUserIndex").innerHTML = getStringCapitalize(Cookies.getJSON('sisbu_user').usuario.split(" ")[0].toLowerCase());

    document.querySelector("#btnEmpezarEvaluaciones").onclick = function () {
        document.querySelector("#row-home-evaluaciones").style.display = "none";
        document.querySelector("#row-options-evaluaciones").style.display = "flex";
    };

    document.querySelector("#btnRegresarHome").onclick = function () {
        document.querySelector("#row-home-evaluaciones").style.display = "flex";
        document.querySelector("#row-options-evaluaciones").style.display = "none";
    };

    document.querySelectorAll(".option-evaluation").forEach(div => {
        div.onclick = function () {
            navigateOptionEvaluation(this.getAttribute('evaluation'));
        };
    });

    document.querySelectorAll(".btn-regresar-selected-evaluation").forEach(btn => {
        btn.onclick = function () {
            navigateOptionEvaluation('home');
        };
    });

});
function navigateOptionEvaluation(option) {
    switch (option) {
        case "home":
            document.querySelector("#row-options-evaluaciones").style.display = "flex";

            document.querySelector("#row-option-socioeconomica").style.display = "none";
            document.querySelector("#row-option-deportiva").style.display = "none";
            document.querySelector("#row-option-psicologica").style.display = "none";
            document.querySelector("#row-option-obstetricia").style.display = "none";
            break;
        case "deportiva":
            document.querySelector("#row-options-evaluaciones").style.display = "none";

            document.querySelector("#row-option-socioeconomica").style.display = "none";
            document.querySelector("#row-option-deportiva").style.display = "flex";
            document.querySelector("#row-option-psicologica").style.display = "none";
            document.querySelector("#row-option-obstetricia").style.display = "none";
            break;
        case "psicologica":
            document.querySelector("#row-options-evaluaciones").style.display = "none";

            document.querySelector("#row-option-socioeconomica").style.display = "none";
            document.querySelector("#row-option-deportiva").style.display = "none";
            document.querySelector("#row-option-psicologica").style.display = "flex";
            document.querySelector("#row-option-obstetricia").style.display = "none";
            break;
        case "obstetricia":
            document.querySelector("#row-options-evaluaciones").style.display = "none";

            document.querySelector("#row-option-socioeconomica").style.display = "none";
            document.querySelector("#row-option-deportiva").style.display = "none";
            document.querySelector("#row-option-psicologica").style.display = "none";
            document.querySelector("#row-option-obstetricia").style.display = "flex";
            break;
        default:
            //SOCIOECONOMICA
            document.querySelector("#row-options-evaluaciones").style.display = "none";

            document.querySelector("#row-option-socioeconomica").style.display = "flex";
            document.querySelector("#row-option-deportiva").style.display = "none";
            document.querySelector("#row-option-psicologica").style.display = "none";
            document.querySelector("#row-option-obstetricia").style.display = "none";
            
            $('#modalCargandoProcedimientoCicloSocie').modal('show');
            break;
    }
}