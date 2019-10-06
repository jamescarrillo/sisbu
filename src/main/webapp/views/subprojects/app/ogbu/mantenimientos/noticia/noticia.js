var beanPaginationNoticia;
var noticiaSelected;
var beanRequestNoticia = new BeanRequest();
document.addEventListener("DOMContentLoaded", function () {
    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestNoticia.entity_api = "api/noticias";
    beanRequestNoticia.operation = "paginate";
    beanRequestNoticia.type_request = "GET";

    $('#FrmNoticia').submit(function (event) {
        beanRequestNoticia.operation = "paginate";
        beanRequestNoticia.type_request = "GET";
        $('#modalCargandoNoticia').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $('#txtFechaNoticia').bootstrapMaterialDatePicker({
        weekStart: 0,
        time: false,
        format: 'DD/MM/YYYY',
        lang: 'es'
    }).on('change', function (e, date) {
    });
    $('#txtFilterInicialNoticia').bootstrapMaterialDatePicker({
        weekStart: 0,
        time: false,
        format: 'YYYY-MM-DD',
        lang: 'es'
    }).on('change', function (e, date) {
    });
    $('#txtFilterFinalNoticia').bootstrapMaterialDatePicker({
        weekStart: 0,
        time: false,
        format: 'YYYY-MM-DD',
        lang: 'es'
    }).on('change', function (e, date) {
    });

    document.querySelector('#btnEliminarFechaNoticia').onclick = function () {
        document.querySelector('#txtFechaNoticia').value = '';
    };
    document.querySelector('#btnEliminarFilterNoticia').onclick = function () {
        document.querySelector('#txtFilterInicialNoticia').value = '';
        document.querySelector('#txtFilterFinalNoticia').value = '';
    };
    $('#FrmNoticiaModal').submit(function (event) {
        if (validateFormNoticia()) {
            $('#modalCargandoNoticia').modal('show');
        }
        event.preventDefault();
        event.stopPropagation();
    });

    document.querySelector("#btnOpenNewNoticia").onclick = function () {
        //CONFIGURAMOS LA SOLICITUD
        beanRequestNoticia.operation = "add";
        beanRequestNoticia.type_request = "POST";
        //LIMPIAR LOS CAMPOS
        document.querySelector("#txtTituloNoticia").value = "";
        document.querySelector("#txtDescripcionNoticia").value = "";
        document.querySelector("#txtFechaNoticia").value = "";
        document.querySelector("#txtFuenteNoticia").value = "";
        //SET TITLE MODAL
        document.querySelector("#txtTituloModalMan").innerHTML = "REGISTRAR NOTICIA";
        //OPEN MODEL
        $('#ventanaModalNoticia').modal('show');
    };

    $("#modalCargandoNoticia").on('shown.bs.modal', function () {
        processAjaxNoticia();
    });

    $("#ventanaModalNoticia").on('hidden.bs.modal', function () {
        beanRequestNoticia.operation = "paginate";
        beanRequestNoticia.type_request = "GET";
    });

     $('#modalCargandoNoticia').modal('show');

    $("#sizePageNoticia").change(function () {
        $('#modalCargandoNoticia').modal('show');
    });

});

function processAjaxNoticia() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestNoticia.operation == "paginate") {
        parameters_pagination += "?fechai=" + document.querySelector("#txtFilterInicialNoticia").value;
        parameters_pagination += "&fechaf=" + document.querySelector("#txtFilterFinalNoticia").value;
        parameters_pagination += "&page=" + document.querySelector("#pageNoticia").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePageNoticia").value;

    } else {
        parameters_pagination = "";
        if (beanRequestNoticia.operation == "delete") {
            parameters_pagination = "/" + noticiaSelected.idnoticia;
            json = {};
        } else {
            json = {
                "titulo": document.querySelector("#txtTituloNoticia").value,
                "descripcion": document.querySelector("#txtDescripcionNoticia").value,
                "fecha_publicacion": document.querySelector("#txtFechaNoticia").value,
                "usuario": {"idusuario": user_session.idusuario},
                "fuente": document.querySelector("#txtFuenteNoticia").value,
            };
            if (beanRequestNoticia.operation == "update") {
                json.idnoticia = noticiaSelected.idnoticia;
            }
        }
    }
    $.ajax({
        url: getHostAPI() + beanRequestNoticia.entity_api + "/" + beanRequestNoticia.operation + parameters_pagination,
        type: beanRequestNoticia.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        console.log(beanCrudResponse);
        $('#modalCargandoNoticia').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
                $('#ventanaModalNoticia').modal('hide');
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationNoticia = beanCrudResponse.beanPagination;
            toListNoticia(beanPaginationNoticia);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoNoticia').modal("hide");
        showAlertErrorRequest();

    });
}

function toListNoticia(beanPagination) {
    document.querySelector("#tbodyNoticia").innerHTML = "";
    document.querySelector("#titleManagerNoticia").innerHTML = "[ " + beanPagination.count_filter + " ] NOTICIAS";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(noticia => {
            row = "<div class='dt-widget__item border-bottom'>";
            row += "<div class='dt-extra animate-slide align-self-center mr-5' idnoticia='" + noticia.idnoticia + "'>";
            row += "<span class='badge badge-info badge-circle-animate badge-pill badge-sm align-text-top mr-2'>"
            row += "<a class='text-light-gray editar-noticia' data-toggle='tooltip' title='Editar' href='javascript:void(0)'>";
            row += "<i class='text-white icon icon-editors'></i></a>";
            row += "</span>";
            row += "<span class='badge badge-danger badge-circle-animate badge-pill badge-sm align-text-top'>";
            row += "<a class='text-light-gray eliminar-noticia' data-toggle='tooltip' title='ELiminar' href='javascript:void(0)'>";
            row += "<i class='text-white icon icon-trash-filled'></i></a>";
            row += "</span>";
            row += "</div>";
            
            row += "<div class='dt-widget__info text-truncate '  style='min-width:60px; max-width:25%'>";
            row += "<p class='dt-widget__subtitle text-truncate text-dark'>";
            row += noticia.fuente +"<br>"+ noticia.fecha_publicacion + "</p></div>";

            row += "<div class='text-truncate mr-5' style='min-width:50px; max-width:25%;'>";
            row += "<p class='dt-widget__subtitle text-truncate text-dark'>";
            row += noticia.titulo + "</p></div>";

            row += "<div class=' text-truncate '  style='min-width:230px; max-width:50%;'>";
            row += "<p class='dt-widget__subtitle text-truncate text-dark'>";
            row += noticia.descripcion + "</p></div>";

            row += "</div>";

            document.querySelector("#tbodyNoticia").innerHTML += row;
            $('[data-toggle="tooltip"]').tooltip();
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageNoticia").value),
                document.querySelector("#pageNoticia"),
                $('#modalCargandoNoticia'),
                $('#paginationNoticia'));
        addEventsNoticiaes();
      
       
    } else {
        destroyPagination($('#paginationNoticia'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
    }
}

function addEventsNoticiaes() {
    document.querySelectorAll('.editar-noticia').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            noticiaSelected = findByNoticia(btn.parentElement.parentElement.getAttribute('idnoticia'));
            if (noticiaSelected != undefined) {
                beanRequestNoticia.operation = "update";
                beanRequestNoticia.type_request = "PUT";
                //SET VALUES MODAL
                document.querySelector("#txtTituloNoticia").value = noticiaSelected.titulo;
                document.querySelector("#txtDescripcionNoticia").value = noticiaSelected.descripcion;
                document.querySelector("#txtFuenteNoticia").value = noticiaSelected.fuente;
                document.querySelector("#txtFechaNoticia").value = noticiaSelected.fecha_publicacion;
                document.querySelector("#txtTituloModalMan").innerHTML = "EDITAR NOTICIA";
                $('#ventanaModalNoticia').modal("show");
                document.querySelector("#txtTituloNoticia").focus();
            } else {
                showAlertTopEnd('warning', 'No se encontró el Noticia para poder editar');
            }
        };
    });
    document.querySelectorAll('.eliminar-noticia').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            noticiaSelected = findByNoticia(btn.parentElement.parentElement.getAttribute('idnoticia'));
            beanRequestNoticia.operation = "delete";
            beanRequestNoticia.type_request = "DELETE";
            processAjaxNoticia();
        };
    });
}

function findByNoticia(idnoticia) {
    let noticia_;
    beanPaginationNoticia.list.forEach(noticia => {
        if (idnoticia == noticia.idnoticia) {
            noticia_ = noticia;
            return;
        }
    });
    return noticia_;
}

function validateFormNoticia() {
    if (document.querySelector("#txtTituloNoticia").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Título');
        document.querySelector("#txtTituloNoticia").focus();
        return false;
    }
    if (document.querySelector("#txtFuenteNoticia").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Fuente');
        document.querySelector("#txtFuenteNoticia").focus();
        return false;
    }
    if (document.querySelector("#txtFechaNoticia").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Fecha');
        document.querySelector("#txtFechaNoticia").focus();
        return false;
    }
    if (document.querySelector("#txtDescripcionNoticia").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Descripción');
        document.querySelector("#txtDescripcionNoticia").focus();
        return false;
    }
    return true;
}

