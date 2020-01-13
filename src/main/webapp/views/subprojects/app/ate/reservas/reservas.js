
document.addEventListener("DOMContentLoaded", function () {

    document.querySelector("#btn-nueva-solicitud-cita").onclick = function () {
        navigateSolicitud("crud");
    };
    
    document.querySelector("#btn-cancelar-crud").onclick = function () {
        navigateSolicitud("list");
    };
    
});

function navigateSolicitud(option) {
    if (option == "list") {
        document.querySelector("#row-list-solicitud-cita").style.display = "flex";
        document.querySelector("#row-crud-solicitud-cita").style.display = "none";
    } else {
        document.querySelector("#row-list-solicitud-cita").style.display = "none";
        document.querySelector("#row-crud-solicitud-cita").style.display = "flex";
    }
}


