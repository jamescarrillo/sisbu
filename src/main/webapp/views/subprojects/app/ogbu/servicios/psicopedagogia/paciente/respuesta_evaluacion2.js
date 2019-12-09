var beanRequestRespuestaEvaluacion = new BeanRequest();
var beanPaginationRespuestaEvaluacion;
var respuestaEvaluacionSelected;
class RespuestaEvaluacion2 {
    constructor() {
        this.idrespuesta_evaluacion2 = 0;
        this.evaluacion_atendido = null;
        this.pregunta = null;
        this.alternativa = null;
        this.texto = "";
    }
}
document.addEventListener("DOMContentLoaded", function () {
    //INICIALIZANDO VARIABLES DE SOLICITUD

    beanRequestRespuestaEvaluacion.entity_api = "api/evaluacion/atendido";
    beanRequestRespuestaEvaluacion.operation = "paginate-respuesta-evaluacion";
    beanRequestRespuestaEvaluacion.type_request = "GET";
    
    $("#sizePageRespuestaEvaluacion").change(function () {
        $('#modalCargandoRespuestaEvaluacion').modal('show');
    });

    $("#modalCargandoRespuestaEvaluacion").on('shown.bs.modal', function () {
        processAjaxRespuestaEvaluacion();
    });

});
function processAjaxRespuestaEvaluacion() {
    let parameters_pagination = "?idevaluacion=" + evaluacionSelected.idevaluacion_atendido;
    $.ajax({
        url: getHostAPI() + beanRequestRespuestaEvaluacion.entity_api + "/" + beanRequestRespuestaEvaluacion.operation + parameters_pagination,
        type: beanRequestRespuestaEvaluacion.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoRespuestaEvaluacion').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationRespuestaEvaluacion = beanCrudResponse.beanPagination;

        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoRespuestaEvaluacion').modal("hide");
        showAlertErrorRequest();

    });
}

function toListRespuestaEvaluacion(beanPagination) {
    if (beanPagination.count_filter > 0) {
        beanPagination.list.forEach(respuestaEvaluacion => {
            if (respuestaEvaluacion.pregunta.tipo_respuesta == 1) {
                document.querySelector("#input-text-" + respuestaEvaluacion.pregunta.idpregunta).value =
                        respuestaEvaluacion.texto;
                document.querySelector("#input-text-" + respuestaEvaluacion.pregunta.idpregunta).setAttribute("idrespuesta_evaluacion",respuestaEvaluacion.idrespuesta_evaluacion2);
            } else if (respuestaEvaluacion.pregunta.tipo_respuesta == 2) {
                document.querySelectorAll(".check-" + respuestaEvaluacion.pregunta.idpregunta).forEach(check => {
                    check.setAttribute("idrespuesta_evaluacion",respuestaEvaluacion.idrespuesta_evaluacion2);
                    if (check.getAttribute('id') == respuestaEvaluacion.alternativa.idalternativa) {
                        check.checked = true;
                    }
                });
                ;
                //document.querySelector("#input-check-" + respuestaEvaluacion.alternativa.idalternativa).checked = true;
            }
            //document.querySelector("#"+respuestaEvaluacion.alternativa.idalternativa).value=respuestaEvaluacion.alternativa.descripcion;
        });
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        showAlertTopEnd('warning', 'No se encontraron resultados');
    }
}


function getRespuestaEvaluacionForId(idprocedimiento) {
    let eva_ = -1;
    beanPaginationRespuestaEvaluacion.list.forEach(function (respuestaEvaluacion, index) {
        if (respuestaEvaluacion.idprocedimiento == idprocedimiento) {
            eva_ = respuestaEvaluacion;
            return;
        }
    });
    return eva_;
}


