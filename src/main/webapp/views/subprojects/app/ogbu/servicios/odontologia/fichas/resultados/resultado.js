/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

document.addEventListener("DOMContentLoaded", function () {

    document.querySelector("#btnDownloadResultadosGenericos").onclick = function () {
        if (validateParametersReportGeneric()) {
            let url_request = getHostAndContextAPI();
            let _parameters = {
                "idprocedimiento": procedimientoC2Selected.idprocedimiento,
                "idciclo_academico": ciclo_academico_resultadosSelected.idciclo_academico,
                "idfacultad": facultadCSelected == undefined ? "-1" : facultadCSelected.idfacultad,
                "idescuela": escuelaCSelected == undefined ? "-1" : escuelaCSelected.idescuela
            }
            url_request += "constancias/resultados?" + new URLSearchParams(_parameters).toString();
            window.open(
                    url_request,
                    '_blank' // <- This is what makes it open in a new window.
                    );
        }
    };

});

function validateParametersReportGeneric() {
    if (procedimientoC2Selected == undefined) {
        showAlertTopEnd("warning", 'Por favor seleccione una evaluacion');
        return false;
    }
    if (ciclo_academico_resultadosSelected == undefined) {
        showAlertTopEnd("warning", 'Por favor seleccione ciclo academico');
        return false;
    }
    return true;
}

