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
    constructor(idarea_psi, nombre_area, idsubarea_psi, nombre, abreviatura,
            puntaje_minimo, puntaje_maximo, cantidad, suma, suma_operacion) {
        this.idarea_psi = idarea_psi;
        this.nombre_area = nombre_area;
        this.idsubarea_psi = idsubarea_psi;
        this.nombre = nombre;
        this.abreviatura = abreviatura;
        this.puntaje_minimo = puntaje_minimo;
        this.puntaje_maximo = puntaje_maximo;
        this.cantidad = cantidad;
        this.suma = suma;
        this.suma_operacion = suma_operacion;
    }

}
var listSubAreaPsi = [];
document.addEventListener("DOMContentLoaded", function () {
    //INICIALIZANDO VARIABLES DE SOLICITUD

    beanRequestRespuestaEvaluacion.entity_api = "api/evaluacion/atendido";
    beanRequestRespuestaEvaluacion.operation = "paginate-respuesta-evaluacion";
    beanRequestRespuestaEvaluacion.type_request = "GET";

    document.querySelector("#btnOpenListaPregunta").onclick = function () {
        document.querySelector("#row-resultado-evaluacione").style.display = "none";
        document.querySelector("#row-resultado-evaluacione-preguntas").style.display = "initial";

    };
    document.querySelectorAll(".btn-close-resultados-evaluacion").forEach(btn => {
        btn.onclick = function () {
            showCloseResultadoEvaluacion('close');
        };
    });
    document.querySelectorAll(".btn-close-resultados").forEach(btn => {
        btn.onclick = function () {
            document.querySelector("#row-resultado-evaluacione").style.display = "none";
            document.querySelector("#row-evaluaciones").style.display = "flex";
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
                    (respuestaEvaluacion.pregunta.item_negativo == "S") ? valorInvertido(respuestaEvaluacion.alternativa.valor) : respuestaEvaluacion.alternativa.valor}
                                </label>
                            <label class="mr-5 font-weight-500 text-dark float-right" >${
                    (respuestaEvaluacion.pregunta.subarea_psi.nombre == null) ? "" : respuestaEvaluacion.pregunta.subarea_psi.nombre}
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

    let  contador = 1, contadorValor = 1, suma = 0, sumaOperacion = 0;
    if (beanPagination.count_filter > 0) {
        listSubAreaPsi.length = 0;
        beanPagination.list.forEach(respuestaEvaluacion2 => {
            console.log((respuestaEvaluacion2.pregunta.item_negativo == "S") ? valorInvertido(respuestaEvaluacion2.alternativa.valor) : respuestaEvaluacion2.alternativa.valor);
            suma += (respuestaEvaluacion2.pregunta.item_negativo == "S") ? valorInvertido(respuestaEvaluacion2.alternativa.valor) : respuestaEvaluacion2.alternativa.valor;
            sumaOperacion += OperacionbyProcedimiento(respuestaEvaluacion2, suma);
            if (contador < beanPaginationRespuestaEvaluacion.count_filter) {

                if (respuestaEvaluacion2.pregunta.subarea_psi.idsubarea_psi ==
                        beanPagination.list[contador].pregunta.subarea_psi.idsubarea_psi) {
                    // console.log("#ingreso- " + suma);
                    // console.log("#ingreso contaador- " + contadorValor);
                    contadorValor++;
                } else {
                    subAreaPsi = new SubAreaPsi(
                            respuestaEvaluacion2.pregunta.subarea_psi.area_psi.idarea_psi,
                            respuestaEvaluacion2.pregunta.subarea_psi.area_psi.nombre,
                            respuestaEvaluacion2.pregunta.subarea_psi.idsubarea_psi,
                            respuestaEvaluacion2.pregunta.subarea_psi.nombre,
                            respuestaEvaluacion2.pregunta.subarea_psi.abreviatura,
                            respuestaEvaluacion2.pregunta.subarea_psi.puntaje_minimo,
                            respuestaEvaluacion2.pregunta.subarea_psi.puntaje_maximo,
                            contadorValor, suma, sumaOperacion);
                    listSubAreaPsi.push(subAreaPsi);
                    suma = 0;
                    sumaOperacion = 0;
                    contadorValor = 1;
                }
            } else {
                if (respuestaEvaluacion2.pregunta.subarea_psi.area_psi.idarea_psi != 0) {
                    subAreaPsi = new SubAreaPsi(
                            respuestaEvaluacion2.pregunta.subarea_psi.area_psi.idarea_psi,
                            respuestaEvaluacion2.pregunta.subarea_psi.area_psi.nombre,
                            respuestaEvaluacion2.pregunta.subarea_psi.idsubarea_psi,
                            respuestaEvaluacion2.pregunta.subarea_psi.nombre,
                            respuestaEvaluacion2.pregunta.subarea_psi.abreviatura,
                            respuestaEvaluacion2.pregunta.subarea_psi.puntaje_minimo,
                            respuestaEvaluacion2.pregunta.subarea_psi.puntaje_maximo,
                            contadorValor, suma, sumaOperacion);
                    listSubAreaPsi.push(subAreaPsi);
                }

            }

            contador++;
        });
//ORDENAR OR ID DE AREA_PSI
        listSubAreaPsi.sort(function (a, b) {
            if (a.idarea_psi < b.idarea_psi) {
                return 1;
            }
            if (a.idarea_psi > b.idarea_psi) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });
        toListPuntajeArea();
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

function toListPuntajeArea() {
    document.querySelector("#tbodyPuntajeArea").innerHTML = "";
    let row = "", idareapsi = 0, sumaTotal = 0, sumaOperacionTotal = 0, cantidadTotal = 0;


    listSubAreaPsi.forEach(respuestaEvaluacion => {
        //console.log("id area temporal : ", idareapsi);
        //console.log("id area :", respuestaEvaluacion.pregunta.subarea_psi.area_psi.idarea_psi);
        if (respuestaEvaluacion.idarea_psi !== idareapsi) {
            idareapsi = respuestaEvaluacion.idarea_psi;

            row += `
                <div class="col-lg-3 col-4 border-top ">
                        <!-- Widget Item -->
                        <div class="dt-widget__item pl-1">
                            <!-- Widget Info -->
                            <div class="dt-widget__info text-truncate" style="min-width: 100%;">
                                <span class="h4 font-weight-400">${
                    (respuestaEvaluacion.nombre_area == null) ? "INDEFINIDO" :
                    respuestaEvaluacion.nombre_area
                    }
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
                    sumaOperacionTotal = sumaOperacionTotal + respuestaEvaluacion2.suma_operacion;
                    cantidadTotal = cantidadTotal + respuestaEvaluacion2.cantidad;
                    row += `
                        <!-- Widget Item -->
                        <div class="dt-widget__item pl-1">
                            <!-- Widget Info -->
                            <div class="dt-widget__info text-truncate">
                                <a href="javascript:void(0)" class="dt-widget__title text-truncate">${
                            (respuestaEvaluacion2.nombre == null) ? "INDEFINIDO" : respuestaEvaluacion2.nombre
                            }</a>
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
                            (respuestaEvaluacion2.suma_operacion == 0) ? 0 : respuestaEvaluacion2.suma_operacion.toFixed(2)
                            }</a>
                            </div>
                            <!-- /widget info -->
                           
                        <!-- Widget Info -->
                            <div class="dt-widget__info text-truncate">
                                <a href="javascript:void(0)" class="dt-widget__title text-truncate">${
                            respuestaEvaluacion2.puntaje_maximo}</a>
                            </div>
                            <!-- /widget info -->
                        <!-- Widget Info -->
                            <div class="dt-widget__info text-truncate">
                                <a href="javascript:void(0)" class="dt-widget__title text-truncate"></a>
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
                                <span class="badge badge-success badge-circle-animate badge-pill badge-sm align-text-top">${
                    (respuestaEvaluacion.nombre_area == null) ? 0 : sumaOperacionTotal.toFixed(2)
                    }</span>
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
                  <!-- Widget Info -->
                            <div class="dt-widget__info text-truncate">
                              <!-- Widget Extra -->
                            <div class="dt-extra animate-slide " >
                                <span class="badge badge-success badge-circle-animate badge-pill badge-sm align-text-top">${
                    (respuestaEvaluacion.nombre_area == null) ? "--" : EscalabyProcedimiento(sumaOperacionTotal.toFixed(2))
                    }</span>
                            </div>
                            <!-- /widget extra -->
                            </div>
                            <!-- /widget info -->
                 </div>
`;
            sumaTotal = 0;
            sumaOperacionTotal = 0;
            cantidadTotal = 0;
            row += `</div> `;
        } else {
            console.log("NO ingreso");
        }



    });
    document.querySelector("#tbodyPuntajeArea").innerHTML += row;
    $('[data-toggle="tooltip"]').tooltip();

}

function showCloseResultadoEvaluacion(option) {
    if (option == "show") {
        document.querySelector("#row-resultado-evaluacione").style.display = "flex";
        document.querySelector("#row-evaluaciones").style.display = "none";
    } else {
        document.querySelector("#row-resultado-evaluacione-preguntas").style.display = "none";
        document.querySelector("#row-resultado-evaluacione").style.display = "flex";
    }
}

function EscalabyProcedimiento(valor) {

    if (evaluacionSelected.procedimiento.descripcion.toUpperCase().includes("BARON")) {
        if (0 < valor && valor < 80) {
            return "MUY BAJO";
        } else if (79 < valor && valor < 91)
        {
            return "BAJO";
        } else if (90 < valor && valor < 110) {
            return "PROMEDIO";
        } else if (109 < valor && valor < 121) {
            return "ALTO";
        } else {
            return "MUY ALTO";
        }
    } else if (evaluacionSelected.procedimiento.descripcion.toUpperCase().includes("ZUNG")) {
        if (0 < valor && valor < 45) {
            return "Dentro del Límite de lo Normal";
        } else if (44 < valor && valor < 60)
        {
            return "Mínimo – Moderado";
        } else if (59 < valor && valor < 75) {
            return "Moderado – Severo";
        } else {
            return "Grado Máximo";
        }
    } else if (evaluacionSelected.procedimiento.descripcion.toUpperCase().includes("IHEA")) {
        if (0 < valor && valor < 24) {
            return "Mal Nivel";
        } else if (23 < valor && valor < 32)
        {
            return "Regular Nivel";

        } else {
            return "Buen Nivel";
        }
    } else {
        return "--";
    }
}
;
function OperacionbyProcedimiento(respuestaEvaluacion2, suma) {
    if (evaluacionSelected.procedimiento.descripcion.toUpperCase().includes("BARON")) {
        return (((suma - respuestaEvaluacion2.pregunta.subarea_psi.media) /
                respuestaEvaluacion2.pregunta.subarea_psi.ds * 15) + 100);
    } else if (evaluacionSelected.procedimiento.descripcion.toUpperCase().includes("ZUNG")) {
        return (suma / 80) * 100;
    } else {
        return 0;
    }
}

function valorInvertido(valor) {
    switch (valor) {
        case 1:
            return 5;
            break;
        case 2:
            return 4;
            break;
        case 4:
            return 2;
            break;
        case 5:
            return 1;
            break;
        default:
            return valor;
            break;
    }
}