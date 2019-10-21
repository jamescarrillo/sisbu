
var repor_deportes = "N";
document.addEventListener("DOMContentLoaded", function () {
     $("#modalCargandoVDYA").on('shown.bs.modal', function () {
        processAjaxValidacionDeportesAficiones();
    });

  

});

function processAjaxValidacionDeportesAficiones() {
    let url_request = getHostAPI() + "api/atendido/validate-evaluation-deport?idusuario=" + usuarioSelected.usuario.idusuario;
    $.ajax({
        url: url_request,
        type: "GET",
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        //data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (jsonResponse) {
        $('#modalCargandoVDYA').modal("hide");
        if (jsonResponse.messageServer !== undefined) {
            if (jsonResponse.messageServer.toLowerCase() == "ok") {
                //ABRIMOS EL REPORTE
                //ABRIMOS EL REPORTE
                if (repor_deportes == "C") {
                    let url_constancia = getHostAPI() + "api/constancias/deporte";
                    url_constancia += "?idusuario=" + usuarioSelected.usuario.idusuario;
                    document.querySelector("#titleModalPreviewReporte").innerHTML = "VISTA PREVIA"
                    document.querySelector('#idframe_reporte').setAttribute('src', url_constancia);
                    document.querySelector('#row_frame_report').style.display = "block";
                    $('#ventanaModalPreviewReporte').modal('show');
                } else if (repor_deportes == "D") {
                    let url_constancia = getHostAPI() + "api/constancias/lista-deportes-aficiones";
                    url_constancia += "?idusuario=" + usuarioSelected.usuario.idusuario;
                    document.querySelector("#titleModalPreviewReporte").innerHTML = "VISTA PREVIA"
                    document.querySelector('#idframe_reporte').setAttribute('src', url_constancia);
                    document.querySelector('#row_frame_report').style.display = "block";
                    $('#ventanaModalPreviewReporte').modal('show');
                }

            } else {
                showAlertTopEnd('warning', jsonResponse.messageServer);
            }
        } else {
            showAlertTopEnd('error', 'Ha ocurrido un error interno al validar tu evaluación deportiva, vuelve a intentarlo mas tarde. Si el problema persiste, visite la oficina de bienestar', 10000);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoVDYA').modal("hide");
        showAlertTopEnd('error', 'Ha ocurrido un error interno al validar tu evaluación deportiva, vuelve a intentarlo mas tarde. Si el problema persiste, visite la oficina de bienestar', 10000);
    });
}
