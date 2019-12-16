
document.addEventListener("DOMContentLoaded", function () {

    document.querySelector("#slcModalidadIngresoUsuario").disabled = true;
    document.querySelector("#slcTipoPersonalUsuario").disabled = true;

    document.querySelector("#slcTipoUsuario").onchange = function () {
        if (this.value === "1") {
            document.querySelector("#slcModalidadIngresoUsuario").disabled = false;
            document.querySelector("#slcTipoPersonalUsuario").disabled = true;
        } else {
            document.querySelector("#slcModalidadIngresoUsuario").disabled = true;
            document.querySelector("#slcTipoPersonalUsuario").disabled = false;
        }
    };

});

