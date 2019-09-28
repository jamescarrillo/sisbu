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

    document.querySelector("#btn-download-constancia-socioeconomica").onclick = function () {
        if (user_session.foto == "") {
            showAlertTopEnd('warning', "Aún no has subido tu foto. Si ya lo has hecho cierra sesión y vuelve a intentarlo.");
            return;
        }
        if (this.getAttribute('idarea') == "7") {
            //VERIFICAMOS LOS DATOS PERSONALES Y LISTA DE FAMILIARES
            $("#modalCargandoVDP").modal('show');
        } else {
            showAlertTopEnd('warning', 'No se pudo seleccionar correctamente la evaluación, algunos valores HTML han sido modificados.')
        }
    };

    document.querySelector("#btn-download-constancia-deportiva").onclick = function () {
        //VERIFICAMOS LOS DEPORTES Y AFICIONES
        $("#modalCargandoVDYA").modal('show');
    };

    document.querySelectorAll(".btn-download-constancia-directa").forEach(btn => {
        btn.onclick = function () {
            idarea_selected = this.getAttribute('idarea');
            if (idarea_selected == "7" || idarea_selected == "6" || idarea_selected == "4") {
                $('#modalCargandoVE').modal('show');
            } else {
                showAlertTopEnd('warning', 'No se pudo seleccionar correctamente la evaluación, algunos valores HTML han sido modificados.')
            }
        };
    });

    $("#modalCargandoVDP").on('shown.bs.modal', function () {
        processAjaxValidacionDatosPersonales();
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

function processAjaxValidacionDatosPersonales() {
    let json = "";
    let url_request = getHostAPI() + "api/atendido/usuario/" + user_session.idusuario;
    //url_request += "?idusuario=" + user_session.idusuario;
    $.ajax({
        url: url_request,
        type: "GET",
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (atendido) {
        console.log(atendido);
        $('#modalCargandoVDP').modal("hide");
        if (atendido !== undefined) {
            let list_datos_faltantes = [];
            //EMPEZAMOS A VALIDAR 
            if (atendido.estado_civil == -1) {
                list_datos_faltantes.push("Estado Civil");
            }
            if (atendido.modalidad_ingreso == 100) {
                list_datos_faltantes.push("Modalidad de ingreso");
            }
            if (atendido.fecha_nacimiento == null) {
                list_datos_faltantes.push("Fecha de Nacimiento");
            }
            if (atendido.email == "") {
                list_datos_faltantes.push("Email");
            }
            if (atendido.direccion_procedencia == "") {
                list_datos_faltantes.push("Dirección procedencia");
            }
            if (atendido.distrito_procedencia.iddistrito == 0) {
                list_datos_faltantes.push("Distrito Procedencia");
            }
            if (atendido.direccion_actual == "") {
                list_datos_faltantes.push("Dirección Actual");
            }
            if (atendido.distrito_actual.iddistrito == 0) {
                list_datos_faltantes.push("Distrito Actual");
            }
            if (atendido.escuela.idescuela == 0) {
                list_datos_faltantes.push("Escuela");
            }
            if (list_datos_faltantes.length > 0) {
                document.querySelector("#datos-faltantes-atendido").innerHTML = "";
                list_datos_faltantes.forEach(dato => {
                    document.querySelector("#datos-faltantes-atendido").innerHTML += `<li class="list-group-item">${dato}</li>`;
                });
                $('#ventanaModalDatosFaltantesAtendido').modal('show');
            } else {
                //VALIDAMOS LOS FAMILIARES
                $('#modalCargandoVE').modal("show");
            }
        } else {
            showAlertTopEnd('error', 'Ha ocurrido un error interno al validar tus datos personales, vuelve a intentarlo mas tarde. Si el problema persiste, visite la oficina de bienestar', 10000);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoVDP').modal("hide");
        showAlertTopEnd('error', 'Ha ocurrido un error interno al validar tus datos personales, vuelve a intentarlo mas tarde. Si el problema persiste, visite la oficina de bienestar', 10000);
    });
}

function processAjaxValidacionDatosFamiliares() {
    let json = "";
    let url_request = getHostAPI() + "api/atendido/validate-familiares?idusuario=" + user_session.idusuario;
    $.ajax({
        url: url_request,
        type: "GET",
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (jsonResponse) {
        $('#modalCargandoVDF').modal("hide");
        if (jsonResponse.messageServer !== undefined) {
            if (jsonResponse.messageServer.toLowerCase() == "ok") {
                //VALIDAMOS DE LA EVALUACIÓN
                $('#modalCargandoVE').modal("show");
            } else {
                $('#ventanaModalDatosFaltantesFamiliaresAtendido').modal("show");
            }
        } else {
            showAlertTopEnd('error', 'Ha ocurrido un error interno al validar tus datos familiares, vuelve a intentarlo mas tarde. Si el problema persiste, visite la oficina de bienestar', 10000);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoVDF').modal("hide");
        showAlertTopEnd('error', 'Ha ocurrido un error interno al validar tus datos familiares, vuelve a intentarlo mas tarde. Si el problema persiste, visite la oficina de bienestar', 10000);
    });
}