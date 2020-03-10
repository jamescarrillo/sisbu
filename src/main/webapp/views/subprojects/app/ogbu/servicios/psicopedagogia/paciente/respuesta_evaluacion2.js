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
class SubAreaPsi {
    constructor(idarea_psi, idsubarea_psi, nombre, abreviatura,
            puntaje_minimo, puntaje_maximo, cantidad, suma) {
        this.idarea_psi = idarea_psi;
        this.idsubarea_psi = idsubarea_psi;
        this.nombre = nombre;
        this.abreviatura = abreviatura;
        this.puntaje_minimo = puntaje_minimo;
        this.puntaje_maximo = puntaje_maximo;
        this.cantidad = cantidad;
        this.suma = suma;
    }

}
var listSubAreaPsi = [];
document.addEventListener("DOMContentLoaded", function () {
    //INICIALIZANDO VARIABLES DE SOLICITUD

    beanRequestRespuestaEvaluacion.entity_api = "api/evaluacion/atendido";
    beanRequestRespuestaEvaluacion.operation = "paginate-respuesta-evaluacion";
    beanRequestRespuestaEvaluacion.type_request = "GET";

    document.querySelectorAll(".btn-close-resultados-evaluacion").forEach(btn => {
        btn.onclick = function () {
            showCloseResultadoEvaluacion('close');
        };
    });

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
        console.log(beanCrudResponse);
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
            toListPuntajeSubArea(beanPaginationRespuestaEvaluacion);
            toListPuntajeArea(beanPaginationRespuestaEvaluacion);
            toListRespuestaEvaluacion(beanPaginationRespuestaEvaluacion);
            showCloseResultadoEvaluacion('show');
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoRespuestaEvaluacion').modal("hide");
        showAlertErrorRequest();

    });
}

function toListRespuestaEvaluacion(beanPagination) {

    document.querySelector("#content-respuesta-evaluacion-psicologico").innerHTML = "";
    document.querySelector("#title-respuesta-evaluacion").innerHTML = " [" + beanPagination.list.length + "] RESULTADO DE EVALUACIÓN";
    let row = "", contador = 1, suma = 0;
    if (beanPagination.count_filter > 0) {
        beanPagination.list.forEach(respuestaEvaluacion => {

            suma += respuestaEvaluacion.alternativa.valor;
            row += `
            <li class="list-group-item">
                            <label class="mb-2 text-primary">${contador++}. 
                              ${respuestaEvaluacion.pregunta.enunciado}</label>
                            <div class="form-group custom-control custom-checkbox mb-2">
                                <label class="sisbu-cursor-mano" >${
                    respuestaEvaluacion.alternativa.descripcion}
                                </label>
                                <label class="float-right" >${
                    respuestaEvaluacion.alternativa.valor}
                                </label>
                            </div>
                        </li>
            `;

            if (respuestaEvaluacion.pregunta.tipo_respuesta == 1) {
                document.querySelector("#input-text-" + respuestaEvaluacion.pregunta.idpregunta).value =
                        respuestaEvaluacion.texto;
                document.querySelector("#input-text-" + respuestaEvaluacion.pregunta.idpregunta).setAttribute("idrespuesta_evaluacion", respuestaEvaluacion.idrespuesta_evaluacion2);
            } else if (respuestaEvaluacion.pregunta.tipo_respuesta == 2) {
                document.querySelectorAll(".check-" + respuestaEvaluacion.pregunta.idpregunta).forEach(check => {
                    check.setAttribute("idrespuesta_evaluacion", respuestaEvaluacion.idrespuesta_evaluacion2);
                    if (check.getAttribute('id') == respuestaEvaluacion.alternativa.idalternativa) {
                        check.checked = true;
                    }
                });
                ;
                //document.querySelector("#input-check-" + respuestaEvaluacion.alternativa.idalternativa).checked = true;
            }
            //document.querySelector("#"+respuestaEvaluacion.alternativa.idalternativa).value=respuestaEvaluacion.alternativa.descripcion;

        });
        row += `
            <li class="list-group-item bg-primary">
                            <label class="dt-card__title text-white">TOTAL</label>
                                <label class="float-right dt-card__title text-white" >${
                suma}
                                </label>
                        </li>
            `;
        document.querySelector("#content-respuesta-evaluacion-psicologico").innerHTML += row;
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


function toListPuntajeSubArea(beanPagination) {

    let  contador = 1, contadorValor = 1, suma = 0;
    if (beanPagination.count_filter > 0) {
        listSubAreaPsi.length = 0;
        beanPagination.list.forEach(respuestaEvaluacion2 => {
            suma += respuestaEvaluacion2.alternativa.valor;
            if (contador < beanPaginationRespuestaEvaluacion.count_filter) {

                if (respuestaEvaluacion2.pregunta.subarea_psi.idsubarea_psi ==
                        beanPagination.list[contador].pregunta.subarea_psi.idsubarea_psi) {
                    // console.log("#ingreso- " + suma);
                    // console.log("#ingreso contaador- " + contadorValor);
                    contadorValor++;
                } else {
                    subAreaPsi = new SubAreaPsi(
                            respuestaEvaluacion2.pregunta.subarea_psi.area_psi.idarea_psi,
                            respuestaEvaluacion2.pregunta.subarea_psi.idsubarea_psi,
                            respuestaEvaluacion2.pregunta.subarea_psi.nombre,
                            respuestaEvaluacion2.pregunta.subarea_psi.abreviatura,
                            respuestaEvaluacion2.pregunta.subarea_psi.puntaje_minimo,
                            respuestaEvaluacion2.pregunta.subarea_psi.puntaje_maximo,
                            contadorValor, suma);
                    listSubAreaPsi.push(subAreaPsi);
                    console.log("#sin ingresar contaador" + contadorValor);
                    console.log("#sin ingresar " + respuestaEvaluacion2.pregunta.subarea_psi.nombre);
                    console.log("#sin ingresar " + suma);
                    suma = 0;
                    contadorValor = 1;
                }
            } else {
                subAreaPsi = new SubAreaPsi(respuestaEvaluacion2.pregunta.subarea_psi.area_psi.idarea_psi,
                        respuestaEvaluacion2.pregunta.subarea_psi.idsubarea_psi,
                        respuestaEvaluacion2.pregunta.subarea_psi.nombre,
                        respuestaEvaluacion2.pregunta.subarea_psi.abreviatura,
                        respuestaEvaluacion2.pregunta.subarea_psi.puntaje_minimo,
                        respuestaEvaluacion2.pregunta.subarea_psi.puntaje_maximo,
                        contadorValor, suma);
                listSubAreaPsi.push(subAreaPsi);
                console.log("#sin ingresar contaador" + contadorValor);
                console.log("#sin ingresar " + respuestaEvaluacion2.pregunta.subarea_psi.nombre);
                console.log("#sin ingresar " + suma);
            }

            contador++;
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

function toListPuntajeArea(beanPagination) {
    document.querySelector("#tbodyPuntajeArea").innerHTML = "";
    let row = "", idareapsi = 0, sumaTotal = 0, cantidadTotal = 0;

    if (beanPagination.count_filter > 0) {
        beanPagination.list.forEach(respuestaEvaluacion => {

            if (respuestaEvaluacion.pregunta.subarea_psi.area_psi.idarea_psi !== idareapsi) {
                idareapsi = respuestaEvaluacion.pregunta.subarea_psi.area_psi.idarea_psi;
                row += `
                <div class="col-lg-3 col-4 border-top ">
                        <!-- Widget Item -->
                        <div class="dt-widget__item pl-1">
                            <!-- Widget Info -->
                            <div class="dt-widget__info text-truncate" style="min-width: 100%;">
                                <span class="h4 font-weight-400">${
                        respuestaEvaluacion.pregunta.subarea_psi.area_psi.nombre}
                                </span>  
                            </div>
                            <!-- /widget info -->
                           
                        </div>
                        <!-- /widgets item -->
                    </div>
                
             <div class="col-lg-9 col-8 border-top">
            `;
                listSubAreaPsi.forEach(respuestaEvaluacion2 => {
                    if (respuestaEvaluacion2.idarea_psi == idareapsi) {
                        sumaTotal = sumaTotal + respuestaEvaluacion2.suma;
                        cantidadTotal = cantidadTotal + respuestaEvaluacion2.cantidad;
                        row += `
                        <!-- Widget Item -->
                        <div class="dt-widget__item pl-1">
                            <!-- Widget Info -->
                            <div class="dt-widget__info text-truncate">
                                <a href="javascript:void(0)" class="dt-widget__title text-truncate">${
                                respuestaEvaluacion2.nombre}</a>
                            </div>
                            <!-- /widget info -->
                            <!-- Widget Info -->
                            <div class="dt-widget__info text-truncate">
                                <a href="javascript:void(0)" class="dt-widget__title text-truncate">${
                                respuestaEvaluacion2.cantidad}</a>
                            </div>
                            <!-- /widget info -->
                        <!-- Widget Info -->
                            <div class="dt-widget__info text-truncate">
                                <a href="javascript:void(0)" class="dt-widget__title text-truncate">${
                                respuestaEvaluacion2.suma}</a>
                            </div>
                            <!-- /widget info -->
                        <!-- Widget Info -->
                            <div class="dt-widget__info text-truncate">
                                <a href="javascript:void(0)" class="dt-widget__title text-truncate">${
                                respuestaEvaluacion2.puntaje_maximo}</a>
                            </div>
                            <!-- /widget info -->
                        </div>
                        <!-- /widgets item -->
                       
            `;
                    }

                });
                row += `
                <!-- Widget Item -->
                        <div class="dt-widget__item pl-1">
                 <!-- Widget Info -->
                            <div class="dt-widget__info text-truncate">
                                <!-- Widget Extra -->
                            <div class="dt-extra animate-slide " >
                                <span class="badge badge-primary badge-circle-animate badge-pill badge-sm align-text-top">TOTAL</span>
                            </div>
                            <!-- /widget extra -->
                            </div>
                            <!-- /widget info -->
                 <!-- Widget Info -->
                            <div class="dt-widget__info text-truncate">
                                <!-- Widget Extra -->
                            <div class="dt-extra animate-slide ">
                                <span class="badge badge-info badge-circle-animate badge-pill badge-sm align-text-top">${
                        cantidadTotal
                        }</span>
                            </div>
                            <!-- /widget extra -->
                            </div>
                            <!-- /widget info -->
                 <!-- Widget Info -->
                            <div class="dt-widget__info text-truncate">
                              <!-- Widget Extra -->
                            <div class="dt-extra animate-slide " >
                                <span class="badge badge-success badge-circle-animate badge-pill badge-sm align-text-top">${
                        sumaTotal}</span>
                            </div>
                            <!-- /widget extra -->
                            </div>
                            <!-- /widget info -->
                 <!-- Widget Info -->
                            <div class="dt-widget__info text-truncate">
                               <!-- Widget Extra -->
                            <div class="dt-extra animate-slide " >
                                <span class="badge badge-danger badge-circle-animate badge-pill badge-sm align-text-top">--</span>
                            </div>
                            <!-- /widget extra -->
                            </div>
                            <!-- /widget info -->
                
                            
                 </div>
`;
                sumaTotal = 0;
                cantidadTotal = 0;
                row += `</div> `;
            }
        });
        document.querySelector("#tbodyPuntajeArea").innerHTML += row;
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        showAlertTopEnd('warning', 'No se encontraron resultados');
    }
}
function showCloseResultadoEvaluacion(option) {
    if (option == "show") {
        document.querySelector("#row-resultado-evaluacione").style.display = "flex";
        document.querySelector("#row-evaluaciones").style.display = "none";
    } else {
        document.querySelector("#row-resultado-evaluacione").style.display = "none";
        document.querySelector("#row-evaluaciones").style.display = "flex";
    }
}