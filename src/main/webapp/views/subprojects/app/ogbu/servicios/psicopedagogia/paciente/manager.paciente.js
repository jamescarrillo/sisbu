document.addEventListener("DOMContentLoaded", function () {

    document.querySelector('#btnIrFIchaAdmision').onclick = function () {
        navigateHome('ficha_admision');
    }

    document.querySelector('#btnIrHistoriaPsicologica').onclick = function () {
        navigateHome('historia_psicologica');
    }

    document.querySelector('#btnIrEvaluaciones').onclick = function () {
        navigateHome('evaluaciones_psicologicas');
    }

    document.querySelectorAll('.btn-close-option-manager-paciente-selected').forEach((btn) => {
        btn.onclick = function () {
            navigateHome('');
        }
    })

});

function navigateHome(ir) {
    switch (ir) {
        case "ficha_admision":
            document.querySelector("#row-ficha-admision").style.display = "flex";
            document.querySelector("#row-historia-psicologica").style.display = "none";
            document.querySelector("#row-evaluaciones").style.display = "none";

            document.querySelector("#row-options-paciente-selected").style.display = "none";

            beanRequestFichaAdmisionPsicologica.entity_api = "api/ficha/admision/psicologica";
            beanRequestFichaAdmisionPsicologica.operation = "get";
            beanRequestFichaAdmisionPsicologica.type_request = "GET";

            $('#modalCargandoFichaAdmisionPsicologica').modal('show');
            break;
        case "historia_psicologica":
            document.querySelector("#row-ficha-admision").style.display = "none";
            document.querySelector("#row-historia-psicologica").style.display = "flex";
            document.querySelector("#row-evaluaciones").style.display = "none";

            document.querySelector("#row-options-paciente-selected").style.display = "none";

            beanRequestHistoriaPsicologica.entity_api = "api/historia/psicologica";
            beanRequestHistoriaPsicologica.operation = "get";
            beanRequestHistoriaPsicologica.type_request = "GET";

            $('#modalCargandoHistoriaPsicologica').modal('show');
            break;
        case "evaluaciones_psicologicas":
            if (atendidoSelected.ciclo_academico_ingreso.idciclo_academico > 12) {
                document.querySelector("#row-ficha-admision").style.display = "none";
                document.querySelector("#row-historia-psicologica").style.display = "none";
                document.querySelector("#row-evaluaciones").style.display = "flex";

                document.querySelector("#row-options-paciente-selected").style.display = "none";

                $('#modalCargandoEvaluacion').modal('show');
            } else {
                showAlertTopEnd('warning', 'El Atendido no pertenece al ciclo superior 2019-II');
            }
            break;
        default:
            //MENU PRINCIPAL
            document.querySelector("#row-ficha-admision").style.display = "none";
            document.querySelector("#row-historia-psicologica").style.display = "none";
            document.querySelector("#row-evaluaciones").style.display = "none";

            document.querySelector("#row-options-paciente-selected").style.display = "flex";
            break;
    }
}