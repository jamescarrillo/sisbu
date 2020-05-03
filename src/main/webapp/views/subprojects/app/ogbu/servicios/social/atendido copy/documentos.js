
var repor_preguntas = "N";
var repor_familiares = "N";
document.addEventListener("DOMContentLoaded", function () {
    $("#modalCargandoVDYA").on('shown.bs.modal', function () {
        processAjaxVE();
    });

    document.querySelector("#btnReporteFamiliar").onclick = function () {
        repor_preguntas = "N";
        repor_familiares = "S";
        $('#modalCargandoVDYA').modal("show");
    };

});

function processAjaxVE() {
    let url_request = getHostAPI() + "api/detalle-procedimiento-ciclo/validate-evaluacion-complete";
    url_request += "?idusuario=" + atendidoSelected.usuario.idusuario;
    url_request += "&idarea=7";
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
        console.log(jsonResponse);
        $('#modalCargandoVDYA').modal("hide");
        if (jsonResponse.messageServer !== undefined) {
            if (jsonResponse.messageServer.toLowerCase() == "ok") {
                let url_constancia = getHostAPI() + "api/constancias/";
                document.querySelector("#titleModalPreviewReporte").innerHTML = "VISTA PREVIA"
                if (repor_preguntas == "S") {
                    document.querySelector("#titleModalPreviewReporte").innerHTML = "VISTA PREVIA"
                    url_constancia += "respuestas";
                    url_constancia += "?idusuario=" + atendidoSelected.usuario.idusuario;
                    url_constancia += "&idarea=7";
                    document.querySelector('#idframe_reporte').setAttribute('src', url_constancia);
                    document.querySelector('#row_frame_report').style.display = "block";
                    $('#ventanaModalPreviewReporte').modal('show');
                    repor_preguntas = "N";
                    repor_familiares = "N";
                } else if (repor_familiares == "S") {
                    document.querySelector("#titleModalPreviewReporte").innerHTML = "VISTA PREVIA FAMILIARES"
                    url_constancia += "familiares";
                    url_constancia += "?idusuario=" + atendidoSelected.usuario.idusuario;
                    document.querySelector('#idframe_reporte').setAttribute('src', url_constancia);
                    document.querySelector('#row_frame_report').style.display = "block";
                    $('#ventanaModalPreviewReporte').modal('show');
                    repor_preguntas = "N";
                    repor_familiares = "N";
                } else {
                    if (atendidoSelected.usuario.foto!="") {
                     document.querySelector("#titleModalPreviewReporte").innerHTML = "VISTA PREVIA CONSTANCIA";

                    url_constancia += "socioeconomica";
                    url_constancia += "?idusuario=" + atendidoSelected.usuario.idusuario;
                    url_constancia += "&idarea=7";
                    url_constancia += "&foto=" + atendidoSelected.usuario.foto;
                    document.querySelector('#idframe_reporte').setAttribute('src', url_constancia);
                    document.querySelector('#row_frame_report').style.display = "block";
                    $('#ventanaModalPreviewReporte').modal('show');   
                    }else{
                      showAlertTopEnd('error', 'Necesita Ingresar Una Foto el Alumno', 10000);   
                    }
                    
                }
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
