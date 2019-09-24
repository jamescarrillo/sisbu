
document.addEventListener("DOMContentLoaded", function () {

    document.querySelector("#row-saludo-principal").style.display = "flex";
    document.querySelector("#row-videos-tutoriales").style.display = "none";

    document.querySelector("#btnMirarVideosSisbu").onclick = function () {
        document.querySelector("#row-saludo-principal").style.display = "none";
        document.querySelector("#row-videos-tutoriales").style.display = "flex";
    };


}); 