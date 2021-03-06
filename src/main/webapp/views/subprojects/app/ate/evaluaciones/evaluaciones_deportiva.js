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

    document.querySelector("#btnRegresarSelectedOptionED").onclick = function () {
        document.querySelector("#div-content-ev-deportes").style.display = "none";
        document.querySelector("#div-content-ev-aficiones").style.display = "none";
        document.querySelector("#div-evaluacion-deportiva").style.display = "flex";
        document.querySelector("#div-regresar-selected-option-ed").style.display = "none";
        document.querySelector("#div-regresar-selected-evaluation-deporte").style.display = "block";
        document.querySelector("#div-imagen-general-ed").style.display = "flex";

        //DEPORTE
        document.querySelector("#OpenDeporteDetalle").style.display = "none";
        beanRequestProcedimientoDeporte.operation = "paginate";
        beanRequestProcedimientoDeporte.type_request = "GET";
        document.querySelector("#OpenListaDeporteDetalle").style.display = "block";

        //AFICION
        beanRequestProcedimientoAficion.operation = "paginate";
        beanRequestProcedimientoAficion.type_request = "GET";
        document.querySelector("#OpenAficionDetalle").style.display = "none";
        document.querySelector("#OpenListaAficionDetalle").style.display = "block";


    };
    //DEPORTE
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

    $('#FrmDeporteDetalleModal').submit(function (event) {

        if (validarProcedimientoDeporte()) {
            $('#modalCargandoDeporteDetalle').modal('show');
        }
        event.preventDefault();
        event.stopPropagation();


    });

    $("#modalCargandoDeporteDetalle").on('shown.bs.modal', function () {
        processAjaxProcedimientoDeporte();
    });
    $("#sizePageDeporteDetalle").change(function () {
        $('#modalCargandoDeporteDetalle').modal('show');
    });
    document.querySelector("#btnOpenDeporteDetalle").onclick = function () {
        document.querySelector("#btnRegresarSelectedOptionED").style.display = "none";
        beanRequestProcedimientoDeporte.operation = "add";
        beanRequestProcedimientoDeporte.type_request = "POST";
        document.querySelector("#tittleDeporteDetalle").innerHTML = "AGREGAR DEPORTE";
        document.querySelector("#txtEstadoDeporteDetalle").value = "-1";
        document.querySelector("#txtDeporteDetalle").value = "";
        deporteSelected = null;
        document.querySelector("#OpenListaDeporteDetalle").style.display = "none";
        document.querySelector("#OpenDeporteDetalle").style.display = "block";
        $('[data-toggle="popover"]').popover();

    };
    document.querySelector("#btnCancelarDeporteDetalle").onclick = function () {
         document.querySelector("#btnRegresarSelectedOptionED").style.display = "initial";
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

    document.querySelector("#div-ed-option-aficiones").onclick = function () {
        document.querySelector("#div-content-ev-deportes").style.display = " none";
        document.querySelector("#div-content-ev-aficiones").style.display = "flex";
        document.querySelector("#div-evaluacion-deportiva").style.display = "none";
        document.querySelector("#div-regresar-selected-option-ed").style.display = "flex";
        document.querySelector("#div-regresar-selected-evaluation-deporte").style.display = "none";
        document.querySelector("#div-imagen-general-ed").style.display = "none";
        $('#modalCargandoAficionDetalle').modal('show');
    };

    $("#sizePageAficionDetalle").change(function () {
        $('#modalCargandoAficionDetalle').modal('show');
    });

    $('#FrmAficionDetalleModal').submit(function (event) {
        if (validarProcedimientoAficion()) {
            $('#modalCargandoAficionDetalle').modal('show');
        }
        event.preventDefault();
        event.stopPropagation();


    });

    $("#modalCargandoAficionDetalle").on('shown.bs.modal', function () {
        processAjaxProcedimientoAficion();
    });

    document.querySelector("#btnOpenAficionDetalle").onclick = function () {
         document.querySelector("#btnRegresarSelectedOptionED").style.display = "none";
        beanRequestProcedimientoAficion.operation = "add";
        beanRequestProcedimientoAficion.type_request = "POST";
        document.querySelector("#tittleAficionDetalle").innerHTML = "AGREGAR AFICIÓN";
        document.querySelector("#txtEstadoAficionDetalle").value = "-1";
        document.querySelector("#txtAficionDetalle").value = "";
        aficionSelected = null;
        document.querySelector("#OpenListaAficionDetalle").style.display = "none";
        document.querySelector("#OpenAficionDetalle").style.display = "block";
        $('[data-toggle="popover"]').popover();

    };

    document.querySelector("#btnCancelarAficionDetalle").onclick = function () {
         document.querySelector("#btnRegresarSelectedOptionED").style.display = "initial";
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
        parameters_pagination += "&page=" + document.querySelector("#pageDeporteDetalle").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePageDeporteDetalle").value;

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
                json.atendido.idatendido = deporteDetalleSelected.atendido.idatendido;
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
        $('#modalCargandoDeporteDetalle').modal("hide");
        if (beanRequestProcedimientoDeporte.operation == "add") {
            document.querySelector("#txtEstadoDeporteDetalle").value = "-1";
            document.querySelector("#txtDeporteDetalle").value = "";
            deporteSelected = null;
        }
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
            row += estadoGeneralDeporte(detalle.estado) + "</p></div>";

            row += "</div>";

            document.querySelector("#tbodyDeporte").innerHTML += row;
            $('[data-toggle="tooltip"]').tooltip();
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageDeporteDetalle").value),
                document.querySelector("#pageDeporteDetalle"),
                $('#modalCargandoDeporteDetalle'),
                $('#paginationDeporteDetalle'));
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
                 document.querySelector("#btnRegresarSelectedOptionED").style.display = "none";
                beanRequestProcedimientoDeporte.operation = "update";
                beanRequestProcedimientoDeporte.type_request = "PUT";
                document.querySelector("#tittleDeporteDetalle").innerHTML = "EDITAR DEPORTE";
                document.querySelector("#txtEstadoDeporteDetalle").value = deporteDetalleSelected.estado;
                document.querySelector("#txtDeporteDetalle").value = deporteDetalleSelected.deporte.nombre;
                deporteSelected = deporteDetalleSelected.deporte;

                document.querySelector("#OpenListaDeporteDetalle").style.display = "none";
                document.querySelector("#OpenDeporteDetalle").style.display = "block";
                $('[data-toggle="popover"]').popover();
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
        parameters_pagination += "&page=" + document.querySelector("#pageAficionDetalle").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePageAficionDetalle").value;

    } else {
        parameters_pagination = "";
        if (beanRequestProcedimientoAficion.operation == "delete") {
            parameters_pagination = "/" + aficionDetalleSelected.idrelacion;
            json = {};
        } else {
            json = {
                "estado": document.querySelector("#txtEstadoAficionDetalle").value,
                "aficion": {"idaficion": aficionSelected.idaficion},
                "atendido": {
                    "usuario": {"idusuario": Cookies.getJSON('sisbu_user').idusuario}
                }
            };
            if (beanRequestProcedimientoAficion.operation == "update") {
                json.idrelacion = aficionDetalleSelected.idrelacion;
                json.atendido.idatendido = aficionDetalleSelected.atendido.idatendido;
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
        $('#modalCargandoAficionDetalle').modal("hide");
        if (beanRequestProcedimientoAficion.operation == "add") {
            document.querySelector("#txtEstadoAficionDetalle").value = "-1";
            document.querySelector("#txtAficionDetalle").value = "";
            aficionSelected = null;
        }
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
            row += estadoGeneralDeporte(detalle.estado) + "</p></div>";

            row += "</div>";

            document.querySelector("#tbodyAficion").innerHTML += row;
            $('[data-toggle="tooltip"]').tooltip();
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageAficionDetalle").value),
                document.querySelector("#pageAficionDetalle"),
                $('#modalCargandoAficionDetalle'),
                $('#paginationAficionDetalle'));
        addEventsProcedimientoAficion();


    } else {
        destroyPagination($('#paginationAficion'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
    }
}

function addEventsProcedimientoAficion() {
    document.querySelectorAll(".editar-aficion-detalle").forEach(btn => {
        btn.onclick = function () {
            aficionDetalleSelected = findDetalleAficionForId(btn.parentElement.parentElement.getAttribute('idrelacion'));
            if (aficionDetalleSelected != undefined) {
                 document.querySelector("#btnRegresarSelectedOptionED").style.display = "none";
                beanRequestProcedimientoAficion.operation = "update";
                beanRequestProcedimientoAficion.type_request = "PUT";
                document.querySelector("#tittleAficionDetalle").innerHTML = "EDITAR AFICIÓN";
                document.querySelector("#txtEstadoAficionDetalle").value = aficionDetalleSelected.estado;
                document.querySelector("#txtAficionDetalle").value = aficionDetalleSelected.aficion.descripcion;
                aficionSelected = aficionDetalleSelected.aficion;
                document.querySelector("#OpenListaAficionDetalle").style.display = "none";
                document.querySelector("#OpenAficionDetalle").style.display = "block";
                $('[data-toggle="popover"]').popover();
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
        showAlertTopEnd('warning', 'Por favor ingrese Afcion ');
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

function estadoGeneralDeporte(idestado) {
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
