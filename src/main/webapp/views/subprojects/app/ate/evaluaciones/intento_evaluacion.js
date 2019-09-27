var beanPaginationIntentoEvaluacion;
var intento_evaluacionSelected;
var beanRequestIntentoEvaluacion = new BeanRequest();

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestIntentoEvaluacion.entity_api = "api/intento-evaluacion";
    beanRequestIntentoEvaluacion.operation = "add";
    beanRequestIntentoEvaluacion.type_request = "POST";

    $("#modalCargandoIntentoEvaluacion").on('shown.bs.modal', function () {
        processAjaxIntentoEvaluacion();
    });

});

function processAjaxIntentoEvaluacion() {
    let json = "";
    let url_request = getHostAPI() + beanRequestIntentoEvaluacion.entity_api + "/" + beanRequestIntentoEvaluacion.operation;

    switch (beanRequestIntentoEvaluacion.operation) {
        case "add":
            json = {
                "idintento_evaluacion": 0,
                "fecha": getTimesTampJavaScriptCurrent(),
                "atendido": {
                    "idatendido": 0,
                    "usuario": {
                        "idusuario": Cookies.getJSON('sisbu_user').idusuario
                    }
                },
                "procedimiento": procedimientoSelectedGlobal
            };
            break;
    }
    $.ajax({
        url: url_request,
        type: beanRequestIntentoEvaluacion.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoIntentoEvaluacion').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                switch (procedimiento_menu_selected) {
                    case "psicologico":
                        openPreguntas('content-preguntas-evaluacion-psicologico');
                        break;
                    case "obstetricia":
                        openPreguntas('content-preguntas-evaluacion-obstetricia');
                        break;
                    default:
                        //socioeconomico
                        openPreguntas('content-preguntas-evaluacion-socioeconomico');
                        break;
                }
            } else {
                showAlertTopEnd('error', 'Ha ocurrido un error interno, vuelve a intentarlo mas tarde :)');
            }
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#ventanaModalManIntentoEvaluacion').modal("hide");
        $('#modalCargandoIntentoEvaluacion').modal("hide");
        showAlertErrorRequest();
    });
}