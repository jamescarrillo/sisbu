/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var beanPaginationVE;
var intento_evaluacionSelected;
var beanRequestVE = new BeanRequest();

var idarea_selected = 7;

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestVE.entity_api = "api/detalle-procedimiento-ciclo";
    beanRequestVE.operation = "validate-evaluacion-complete";
    beanRequestVE.type_request = "GET";

    document.querySelectorAll(".btn-descargar-constancia").forEach(btn => {
        btn.onclick = function () {
            idarea_selected = this.getAttribute('idarea');
            if (idarea_selected == "7" || idarea_selected == "6" || idarea_selected == "4") {
                $('#modalCargandoVE').modal('show');
            } else {
                showAlertTopEnd('warning', 'No se pudo seleccionar correctamente la evaluación, algunos valores HTML han sido modificados')
            }
        };
    });

    $("#modalCargandoVE").on('shown.bs.modal', function () {
        processAjaxVE();
    });

});

function processAjaxVE() {
    let json = "";
    let url_request = getHostAPI() + beanRequestVE.entity_api + "/" + beanRequestVE.operation;
    url_request += "?idusuario=" + user_session.idusuario;
    url_request += "&idarea=" + idarea_selected;
    $.ajax({
        url: url_request,
        type: beanRequestVE.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (jsonResponse) {
        $('#modalCargandoVE').modal("hide");
        if (jsonResponse.messageServer !== undefined) {
            if (jsonResponse.messageServer.toLowerCase() == "ok") {
                let url_constancia = getHostAPI() + "api/constancias/mi-constancia";
                url_constancia += "?idusuario=" + user_session.idusuario;
                document.querySelector("#titleModalPreviewReporte").innerHTML = "VISTA PREVIA DE CONSTANCIA"
                switch (idarea_selected) {
                    case "4":
                        url_constancia += "&evaluacion=socioeconomico";
                        url_constancia += "&idarea=" + idarea_selected;
                        break;
                    case "6":
                        url_constancia += "&evaluacion=psicologico";
                        url_constancia += "&idarea=" + idarea_selected;
                        break;
                    case "7":
                        url_constancia += "&evaluacion=obstetricia";
                        url_constancia += "&idarea=" + idarea_selected;
                        break;

                }
                document.querySelector('#idframe_reporte').setAttribute('src', url_constancia);
                document.querySelector('#row_frame_report').style.display = "block";
                $('#ventanaModalPreviewReporte').modal('show');
            } else {
                showAlertTopEnd('warning', jsonResponse.messageServer, 10000);
            }
        } else {
            showAlertTopEnd('error', 'Ha ocurrido un error interno, vuelve a intentarlo mas tarde :)', 10000);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoVE').modal("hide");
        showAlertTopEnd('error', 'Ha ocurrido un error interno, vuelve a intentarlo mas tarde. Si el problema persiste, visite la oficina de bienestar', 10000);
    });
}