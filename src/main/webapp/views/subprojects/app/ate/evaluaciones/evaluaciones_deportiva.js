/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var deporteSelected;
var deporteDetalleSelected;
var beanPaginationDetalleDeporte;
var beanRequestProcedimientoDeporte = new BeanRequest();

//AFICION
var aficionSelected;
var aficionDetalleSelected;
var beanPaginationDetalleAficion;
var beanRequestProcedimientoAficion = new BeanRequest();
document.addEventListener("DOMContentLoaded", function () {
    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestProcedimientoDeporte.entity_api = "api/detalle-deportes";
    beanRequestProcedimientoDeporte.operation = "paginate";
    beanRequestProcedimientoDeporte.type_request = "GET";

    document.querySelector("#div-ed-option-deportes").onclick = function () {
        document.querySelector("#div-content-ev-deportes").style.display = "flex";
        document.querySelector("#div-content-ev-aficiones").style.display = "none";
        document.querySelector("#div-evaluacion-deportiva").style.display = "none";
        document.querySelector("#div-regresar-selected-option-ed").style.display = "flex";
        document.querySelector("#div-regresar-selected-evaluation-deporte").style.display = "none";
        document.querySelector("#div-imagen-general-ed").style.display = "none";
        $('#modalCargandoDeporteDetalle').modal('show');
    };

    document.querySelector("#div-ed-option-aficiones").onclick = function () {
        document.querySelector("#div-content-ev-deportes").style.display = " none";
        document.querySelector("#div-content-ev-aficiones").style.display = "flex";
        document.querySelector("#div-evaluacion-deportiva").style.display = "none";
        document.querySelector("#div-regresar-selected-option-ed").style.display = "flex";
        document.querySelector("#div-regresar-selected-evaluation-deporte").style.display = "none";
        document.querySelector("#div-imagen-general-ed").style.display = "none";
         $('#modalCargandoAficionDetalle').modal('show');
    };

    document.querySelector("#btnRegresarSelectedOptionED").onclick = function () {
        document.querySelector("#div-content-ev-deportes").style.display = "none";
        document.querySelector("#div-content-ev-aficiones").style.display = "none";
        document.querySelector("#div-evaluacion-deportiva").style.display = "flex";
        document.querySelector("#div-regresar-selected-option-ed").style.display = "none";
        document.querySelector("#div-regresar-selected-evaluation-deporte").style.display = "block";
        document.querySelector("#div-imagen-general-ed").style.display = "flex";
        

    };
    $('#FrmDeporteDetalleModal').submit(function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (validarProcedimientoDeporte) {
            $('#modalCargandoDeporteDetalle').modal('show');
        }
        


    });

    $("#modalCargandoDeporteDetalle").on('shown.bs.modal', function () {
        processAjaxProcedimientoDeporte();
    });

    document.querySelector("#btnOpenDeporteDetalle").onclick = function () {
        beanRequestProcedimientoDeporte.operation = "add";
        beanRequestProcedimientoDeporte.type_request = "POST";
        document.querySelector("#OpenListaDeporteDetalle").style.display = "none";
        document.querySelector("#OpenDeporteDetalle").style.display = "block";

    };
    document.querySelector("#btnCancelarDeporteDetalle").onclick = function () {
        beanRequestProcedimientoDeporte.operation = "paginate";
        beanRequestProcedimientoDeporte.type_request = "GET";
        document.querySelector("#OpenDeporteDetalle").style.display = "none";
        document.querySelector("#OpenListaDeporteDetalle").style.display = "block";
        $('#modalCargandoDeporteDetalle').modal('show');
    };
    
    //  AFICION
     //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestProcedimientoAficion.entity_api = "api/detalle-aficiones";
    beanRequestProcedimientoAficion.operation = "paginate";
    beanRequestProcedimientoAficion.type_request = "GET";

    
    $('#FrmAficionDetalleModal').submit(function (event) {
        if (validarProcedimientoAficion) {
            $('#modalCargandoAficionDetalle').modal('show');
        }
        event.preventDefault();
        event.stopPropagation();


    });

    $("#modalCargandoAficionDetalle").on('shown.bs.modal', function () {
        processAjaxProcedimientoAficion();
    });

    document.querySelector("#btnOpenAficionDetalle").onclick = function () {
        beanRequestProcedimientoAficion.operation = "add";
        beanRequestProcedimientoAficion.type_request = "POST";
        document.querySelector("#OpenListaAficionDetalle").style.display = "none";
        document.querySelector("#OpenAficionDetalle").style.display = "block";

    };
    document.querySelector("#btnCancelarAficionDetalle").onclick = function () {
        beanRequestProcedimientoAficion.operation = "paginate";
        beanRequestProcedimientoAficion.type_request = "GET";
        document.querySelector("#OpenAficionDetalle").style.display = "none";
        document.querySelector("#OpenListaAficionDetalle").style.display = "block";
        $('#modalCargandoAficionDetalle').modal('show');
    };
    
    
});

function processAjaxProcedimientoDeporte() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestProcedimientoDeporte.operation == "paginate") {
        parameters_pagination += "?idusuario=" + Cookies.getJSON('sisbu_user').idusuario;
        parameters_pagination += "&page=1";
        parameters_pagination += "&size=4";

    } else {
        parameters_pagination = "";
        if (beanRequestProcedimientoDeporte.operation == "delete") {
            parameters_pagination = "/" + deporteDetalleSelected.idrelacion;
            json = {};
        } else {
            json = {
                "estado": document.querySelector("#txtEstadoDeporteDetalle").value,
                "deporte": {"iddeporte": deporteSelected.iddeporte},
                "atendido": {
                    "usuario": {"idusuario": Cookies.getJSON('sisbu_user').idusuario}
                }
            };
            if (beanRequestProcedimientoDeporte.operation == "update") {
                json.idrelacion = deporteDetalleSelected.idrelacion;
            }
        }
    }
    $.ajax({
        url: getHostAPI() + beanRequestProcedimientoDeporte.entity_api + "/" + beanRequestProcedimientoDeporte.operation + parameters_pagination,
        type: beanRequestProcedimientoDeporte.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        console.log(beanCrudResponse);
        $('#modalCargandoDeporteDetalle').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
                $('#ventanaModalAficion').modal('hide');
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationDeporte = beanCrudResponse.beanPagination;
            beanPaginationDetalleDeporte = beanPaginationDeporte;
            toListProcedimientoDeporte(beanPaginationDeporte);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoDeporte').modal("hide");
        showAlertErrorRequest();

    });
}

function toListProcedimientoDeporte(beanPagination) {
    document.querySelector("#tbodyDeporte").innerHTML = "";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(detalle => {
            row = "<div class='dt-widget__item border-bottom'>";
            row += "<div class='dt-extra animate-slide align-self-center mr-5' idrelacion='" + detalle.idrelacion + "'>";
            row += "<span class='badge badge-info badge-circle-animate badge-pill badge-sm align-text-top mr-2'>"
            row += "<a class='text-light-gray editar-deporte-detalle' data-toggle='tooltip' title='Editar' href='javascript:void(0)'>";
            row += "<i class='text-white icon icon-editors'></i></a>";
            row += "</span>";
            row += "<span class='badge badge-danger badge-circle-animate badge-pill badge-sm align-text-top mr-2'>"
            row += "<a class='text-light-gray eliminar-deporte-detalle' data-toggle='tooltip' title='Eliminar' href='javascript:void(0)'>";
            row += "<i class='text-white icon icon-trash-filled'></i></a>";
            row += "</span>";
            row += "</div>";

            row += "<div class='dt-widget__info text-truncate mr-5' >";
            row += "<p class='dt-widget__subtitle text-truncate text-dark'>";
            row += detalle.deporte.nombre + "</p></div>";
            
              row += "<div class='dt-widget__info text-truncate mr-5' >";
            row += "<p class='dt-widget__subtitle text-truncate text-dark'>";
            row +=  estadoGeneralDeporte(detalle.estado)+ "</p></div>";

            row += "</div>";

            document.querySelector("#tbodyDeporte").innerHTML += row;
            $('[data-toggle="tooltip"]').tooltip();
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageDeporte").value),
                document.querySelector("#pageDeporte"),
                $('#modalCargandoDeporte'),
                $('#paginationDeporte'));
        addEventsProcedimientoDeporte();


    } else {
        destroyPagination($('#paginationAficion'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
    }
}

function addEventsProcedimientoDeporte() {
    document.querySelectorAll(".editar-deporte-detalle").forEach(btn => {
        btn.onclick = function () {
            deporteDetalleSelected = findDetalleDeporteForId(btn.parentElement.parentElement.getAttribute('idrelacion'));
            if (deporteDetalleSelected != undefined) {
                console.log(deporteDetalleSelected);
                beanRequestProcedimientoDeporte.operation = "update";
                beanRequestProcedimientoDeporte.type_request = "PUT";
                document.querySelector("#txtEstadoDeporteDetalle").value = deporteDetalleSelected.estado;
                document.querySelector("#txtDeporteDetalle").value = deporteDetalleSelected.deporte.nombre;
                deporteSelected = deporteDetalleSelected.aficion;
                document.querySelector("#OpenListaDeporteDetalle").style.display = "none";
                document.querySelector("#OpenDeporteDetalle").style.display = "block";
            } else {
                showAlertTopEnd('warning', 'No se encontró la evaluación para poder realizarlo. Vuelva a iniciar sesión');
            }
        };
    });
    document.querySelectorAll(".eliminar-deporte-detalle").forEach(btn => {
        btn.onclick = function () {
            deporteDetalleSelected = findDetalleDeporteForId(btn.parentElement.parentElement.getAttribute('idrelacion'));
            if (deporteDetalleSelected != undefined) {
                beanRequestProcedimientoDeporte.operation = "delete";
                beanRequestProcedimientoDeporte.type_request = "DELETE";
                $('#modalCargandoDeporteDetalle').modal("show");
            } else {
                showAlertTopEnd('warning', 'No se encontró la evaluación para poder realizarlo. Vuelva a iniciar sesión');
            }
        };
    });
}

function validarProcedimientoDeporte() {
    if (document.querySelector("#txtEstadoDeporteDetalle").value == "-1") {
        showAlertTopEnd('warning', 'Por favor ingrese Estado');
        document.querySelector("#txtEstadoDeporteDetalle").focus();
        return false;
    } else if (document.querySelector("#txtDeporteDetalle").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Deporte ');
        document.querySelector("#txtDeporteDetalle").focus();
        return false;
    }
    return true;
}

function findDetalleDeporteForId(idrelacion) {
    let Deporte_;
    beanPaginationDetalleDeporte.list.forEach(Deporte => {
        if (idrelacion == Deporte.idrelacion) {
            Deporte_ = Deporte;
            return;
        }
    });
    return Deporte_;
}
//AFICION

function processAjaxProcedimientoAficion() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestProcedimientoAficion.operation == "paginate") {
        parameters_pagination += "?idusuario=" + Cookies.getJSON('sisbu_user').idusuario;
        parameters_pagination += "&page=1";
        parameters_pagination += "&size=4";

    } else {
        parameters_pagination = "";
        if (beanRequestProcedimientoAficion.operation == "delete") {
            parameters_pagination = "/" + aficionDetalleSelected.idrelacion;
            json = {};
        } else {
            json = {
                "estado": document.querySelector("#txtEstadoDeporteDetalle").value,
                "aficion": {"idaficion": aficionSelected.idaficion},
                "atendido": {
                    "usuario": {"idusuario": Cookies.getJSON('sisbu_user').idusuario}
                }
            };
            if (beanRequestProcedimientoAficion.operation == "update") {
                json.idrelacion = aficionDetalleSelected.idrelacion;
            }
        }
    }
    $.ajax({
        url: getHostAPI() + beanRequestProcedimientoAficion.entity_api + "/" + beanRequestProcedimientoAficion.operation + parameters_pagination,
        type: beanRequestProcedimientoAficion.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        console.log(beanCrudResponse);
        $('#modalCargandoAficionDetalle').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
                $('#ventanaModalAficion').modal('hide');
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationAficion = beanCrudResponse.beanPagination;
            beanPaginationDetalleAficion = beanPaginationAficion;
            toListProcedimientoAficion(beanPaginationAficion);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoDeporte').modal("hide");
        showAlertErrorRequest();

    });
}

function toListProcedimientoAficion(beanPagination) {
    document.querySelector("#tbodyAficion").innerHTML = "";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(detalle => {
            row = "<div class='dt-widget__item border-bottom'>";
            row += "<div class='dt-extra animate-slide align-self-center mr-5' idrelacion='" + detalle.idrelacion + "'>";
            row += "<span class='badge badge-info badge-circle-animate badge-pill badge-sm align-text-top mr-2'>"
            row += "<a class='text-light-gray editar-aficion-detalle' data-toggle='tooltip' title='Editar' href='javascript:void(0)'>";
            row += "<i class='text-white icon icon-editors'></i></a>";
            row += "</span>";
            row += "<span class='badge badge-danger badge-circle-animate badge-pill badge-sm align-text-top mr-2'>"
            row += "<a class='text-light-gray eliminar-aficion-detalle' data-toggle='tooltip' title='Eliminar' href='javascript:void(0)'>";
            row += "<i class='text-white icon icon-trash-filled'></i></a>";
            row += "</span>";
            row += "</div>";

            row += "<div class='dt-widget__info text-truncate mr-5' >";
            row += "<p class='dt-widget__subtitle text-truncate text-dark'>";
            row += detalle.aficion.descripcion + "</p></div>";
            
            row += "<div class='dt-widget__info text-truncate mr-5' >";
            row += "<p class='dt-widget__subtitle text-truncate text-dark'>";
            row +=  estadoGeneralDeporte(detalle.estado)+ "</p></div>";



            row += "</div>";

            document.querySelector("#tbodyAficion").innerHTML += row;
            $('[data-toggle="tooltip"]').tooltip();
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageAficion").value),
                document.querySelector("#pageAficion"),
                $('#modalCargandoAficion'),
                $('#paginationAficion'));
        addEventsProcedimientoAficions();


    } else {
        destroyPagination($('#paginationAficion'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
    }
}

function addEventsProcedimientoAficion() {
    document.querySelectorAll(".editar-aficion-detalle").forEach(btn => {
        btn.onclick = function () {
            aficionDetalleSelected = findDetalleDeporteForId(btn.parentElement.parentElement.getAttribute('idrelacion'));
            if (aficionDetalleSelected != undefined) {
                console.log(aficionDetalleSelected);
                beanRequestProcedimientoAficion.operation = "update";
                beanRequestProcedimientoAficion.type_request = "PUT";
                document.querySelector("#txtEstadoAficionDetalle").value = aficionDetalleSelected.estado;
                document.querySelector("#txtAficionDetalle").value = aficionDetalleSelected.aficion.nombre;
                aficionSelected = aficionDetalleSelected.aficion;
                document.querySelector("#OpenListaAficionDetalle").style.display = "none";
                document.querySelector("#OpenAficionDetalle").style.display = "block";
            } else {
                showAlertTopEnd('warning', 'No se encontró la evaluación para poder realizarlo. Vuelva a iniciar sesión');
            }
        };
    });
    document.querySelectorAll(".eliminar-aficion-detalle").forEach(btn => {
        btn.onclick = function () {
            aficionDetalleSelected = findDetalleAficionForId(btn.parentElement.parentElement.getAttribute('idrelacion'));
            if (aficionDetalleSelected != undefined) {
                beanRequestProcedimientoAficion.operation = "delete";
                beanRequestProcedimientoAficion.type_request = "DELETE";
                $('#modalCargandoAficionDetalle').modal("show");
            } else {
                showAlertTopEnd('warning', 'No se encontró la evaluación para poder realizarlo. Vuelva a iniciar sesión');
            }
        };
    });
}

function validarProcedimientoAficion() {
    if (document.querySelector("#txtEstadoAficionDetalle").value == "-1") {
        showAlertTopEnd('warning', 'Por favor ingrese Estado');
        document.querySelector("#txtEstadoAficionDetalle").focus();
        return false;
    } else if (document.querySelector("#txtAficionDetalle").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Deporte ');
        document.querySelector("#txtAficionDetalle").focus();
        return false;
    }
    return true;
}

function findDetalleAficionForId(idrelacion) {
    let Aficion_;
    beanPaginationDetalleAficion.list.forEach(Aficion => {
        if (idrelacion == Aficion.idrelacion) {
            Aficion_ = Aficion;
            return;
        }
    });
    return Aficion_;
}


function estadoGeneralDeporte(idestado){
    switch (idestado) {
        case 1:
            return 'LO PRACTICO';
            break;
        case 2:
            return 'ME GUSTARÍA APRENDER';
            break;
            
        default:
            return '';
            break;
    }
}
