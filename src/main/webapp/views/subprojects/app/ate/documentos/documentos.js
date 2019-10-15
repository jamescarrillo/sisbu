/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var beanPaginationVE;
var intento_evaluacionSelected;
var beanRequestVE = new BeanRequest();

var idarea_selected = 7;
var repor_preguntas = "N";
var repor_familiares = "N";
var repor_deportes = "N";

document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestVE.entity_api = "api/detalle-procedimiento-ciclo";
    beanRequestVE.operation = "validate-evaluacion-complete";
    beanRequestVE.type_request = "GET";

    document.querySelector("#btn-download-constancia-deportiva").onclick = function () {

        //VERIFICAMOS LOS DEPORTES Y AFICIONES
        repor_deportes = "C";
        $("#modalCargandoVDYA").modal('show');

        showAlertTopEnd('warning', 'Lo sentimos aún no esta disponible esta evaluación', 10000)
    };

    document.querySelector("#btn-download-deportes-aficiones").onclick = function () {
        //VERIFICAMOS LOS DEPORTES Y AFICIONES
        repor_deportes = "D";
        $("#modalCargandoVDYA").modal('show');
    };

    document.querySelector("#btn-download-constancia-socioeconomica").onclick = function () {
        if (user_session.foto == "") {
            showAlertTopEnd('warning', "Aún no has subido tu foto. Si ya lo has hecho cierra sesión y vuelve a intentarlo.");
            return;
        }
        if (this.getAttribute('idarea') == "7") {
            //VERIFICAMOS LOS DATOS PERSONALES Y LISTA DE FAMILIARES
            idarea_selected = this.getAttribute('idarea');
            $("#modalCargandoVDP").modal('show');
        } else {
            showAlertTopEnd('warning', 'No se pudo seleccionar correctamente la evaluación, algunos valores HTML han sido modificados.')
        }
    };

    document.querySelector("#btn-download-preguntas-socioeconomica").onclick = function () {
        repor_preguntas = "S";
        repor_familiares = "N";
        document.querySelector("#btn-download-constancia-socioeconomica").dispatchEvent(new Event('click'));
    };

    document.querySelector("#btn-download-preguntas-obstetricia").onclick = function () {
        idarea_selected = this.getAttribute('idarea');
        if (idarea_selected == "4") {
            repor_preguntas = "S";
            repor_familiares = "N";
            $('#modalCargandoVDPOtrasPruebas').modal('show');
        } else {
            showAlertTopEnd('warning', 'No se pudo seleccionar correctamente la evaluación, algunos valores HTML han sido modificados.')
        }
    };

    document.querySelectorAll(".btn-download-constancia-directa").forEach(btn => {
        btn.onclick = function () {
            idarea_selected = this.getAttribute('idarea');
            if (idarea_selected == "6" || idarea_selected == "4") {
                repor_preguntas = "N";
                repor_familiares = "N";
                $('#modalCargandoVDPOtrasPruebas').modal('show');
            } else {
                showAlertTopEnd('warning', 'No se pudo seleccionar correctamente la evaluación, algunos valores HTML han sido modificados.')
            }
        };
    });

    document.querySelector("#btn-download-familiares-socioeconomica").onclick = function () {
        repor_preguntas = "N";
        repor_familiares = "S";
        document.querySelector("#btn-download-constancia-socioeconomica").dispatchEvent(new Event('click'));
    };

    $("#modalCargandoVDYA").on('shown.bs.modal', function () {
        processAjaxValidacionDeportesAficiones();
    });

    $("#modalCargandoVDF").on('shown.bs.modal', function () {
        processAjaxValidacionDatosFamiliares();
    });

    $("#modalCargandoVDP").on('shown.bs.modal', function () {
        processAjaxValidacionDatosPersonales();
    });

    $("#modalCargandoVDPOtrasPruebas").on('shown.bs.modal', function () {
        processAjaxValidacionDatosPersonalesOtrasEvaluaciones();
    });

    $("#modalCargandoVE").on('shown.bs.modal', function () {
        processAjaxVE();
    });

});

function processAjaxVE() {
    let url_request = getHostAPI() + beanRequestVE.entity_api + "/" + beanRequestVE.operation;
    url_request += "?idusuario=" + user_session.idusuario;
    url_request += "&idarea=" + idarea_selected;
    $.ajax({
        url: url_request,
        type: beanRequestVE.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        //data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (jsonResponse) {
        $('#modalCargandoVE').modal("hide");
        if (jsonResponse.messageServer !== undefined) {
            if (jsonResponse.messageServer.toLowerCase() == "ok") {
                let url_constancia = getHostAPI() + "api/constancias/";
                document.querySelector("#titleModalPreviewReporte").innerHTML = "VISTA PREVIA"
                if (repor_preguntas == "S") {
                    document.querySelector("#titleModalPreviewReporte").innerHTML = "VISTA PREVIA"
                    url_constancia += "respuestas";
                    url_constancia += "?idusuario=" + user_session.idusuario;
                    url_constancia += "&idarea=" + idarea_selected;
                    document.querySelector('#idframe_reporte').setAttribute('src', url_constancia);
                    document.querySelector('#row_frame_report').style.display = "block";
                    $('#ventanaModalPreviewReporte').modal('show');
                    repor_preguntas = "N";
                    repor_familiares = "N";
                } else if (repor_familiares == "S") {
                    document.querySelector("#titleModalPreviewReporte").innerHTML = "VISTA PREVIA FAMILIARES"
                    url_constancia += "familiares";
                    url_constancia += "?idusuario=" + user_session.idusuario;
                    document.querySelector('#idframe_reporte').setAttribute('src', url_constancia);
                    document.querySelector('#row_frame_report').style.display = "block";
                    $('#ventanaModalPreviewReporte').modal('show');
                    repor_preguntas = "N";
                    repor_familiares = "N";
                } else {
                    document.querySelector("#titleModalPreviewReporte").innerHTML = "VISTA PREVIA CONSTANCIA";
                    switch (idarea_selected) {
                        case "7":
                            url_constancia += "socioeconomica";
                            url_constancia += "?idusuario=" + user_session.idusuario;
                            url_constancia += "&idarea=" + idarea_selected;
                            url_constancia += "&foto=" + user_session.foto;
                            break;
                        case "6":
                            url_constancia += "psicologia";
                            url_constancia += "?idusuario=" + user_session.idusuario;
                            url_constancia += "&idarea=" + idarea_selected;
                            break;
                        case "4":
                            url_constancia += "obstetricia";
                            url_constancia += "?idusuario=" + user_session.idusuario;
                            url_constancia += "&idarea=" + idarea_selected;
                            break;
                    }
                    document.querySelector('#idframe_reporte').setAttribute('src', url_constancia);
                    document.querySelector('#row_frame_report').style.display = "block";
                    $('#ventanaModalPreviewReporte').modal('show');
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

function processAjaxValidacionDatosPersonales() {
    let url_request = getHostAPI() + "api/atendido/usuario/" + user_session.idusuario;
    $.ajax({
        url: url_request,
        type: "GET",
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        //data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (atendido) {
        //console.log(atendido);
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
                $('#modalCargandoVDF').modal("show");
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
    let url_request = getHostAPI() + "api/atendido/validate-familiares?idusuario=" + user_session.idusuario;
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

function processAjaxValidacionDeportesAficiones() {
    let url_request = getHostAPI() + "api/atendido/validate-evaluation-deport?idusuario=" + user_session.idusuario;
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
                    url_constancia += "?idusuario=" + user_session.idusuario;
                    document.querySelector("#titleModalPreviewReporte").innerHTML = "VISTA PREVIA"
                    document.querySelector('#idframe_reporte').setAttribute('src', url_constancia);
                    document.querySelector('#row_frame_report').style.display = "block";
                    $('#ventanaModalPreviewReporte').modal('show');
                } else if (repor_deportes == "D") {
                    let url_constancia = getHostAPI() + "api/constancias/lista-deportes-aficiones";
                    url_constancia += "?idusuario=" + user_session.idusuario;
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

function processAjaxValidacionDatosPersonalesOtrasEvaluaciones() {
    let url_request = getHostAPI() + "api/atendido/usuario/" + user_session.idusuario;
    $.ajax({
        url: url_request,
        type: "GET",
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        //data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (atendido) {
        //console.log(atendido);
        $('#modalCargandoVDPOtrasPruebas').modal("hide");
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
                //VALIDAMOS LA FICHA COMPLETADA
                $('#modalCargandoVE').modal('show');
            }
        } else {
            showAlertTopEnd('error', 'Ha ocurrido un error interno al validar tus datos personales, vuelve a intentarlo mas tarde. Si el problema persiste, visite la oficina de bienestar', 10000);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoVDPOtrasPruebas').modal("hide");
        showAlertTopEnd('error', 'Ha ocurrido un error interno al validar tus datos personales, vuelve a intentarlo mas tarde. Si el problema persiste, visite la oficina de bienestar', 10000);
    });
}