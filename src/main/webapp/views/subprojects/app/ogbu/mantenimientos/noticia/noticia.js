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
    $('#txtFilterNoticia').bootstrapMaterialDatePicker({
        weekStart: 0,
        time: false,
        format: 'DD/MM/YYYY',
        lang: 'es'
    }).on('change', function (e, date) {
    });

    document.querySelector('#btnEliminarFechaNoticia').onclick = function () {
        document.querySelector('#txtFechaNoticia').value = '';
    };
    document.querySelector('#btnEliminarFilterNoticia').onclick = function () {
        document.querySelector('#txtFilterNoticia').value = '';
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

    $("#modalCargandoNoticia").on('hide.bs.modal', function () {
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
        parameters_pagination += "?fecha=" + document.querySelector("#txtFilterNoticia").value;
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
                "usuario":{"idusuario":user_session.idusuario},
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
            row = "<tr ";
            row += "idnoticia='" + noticia.idnoticia + "' ";
            row += ">";
            row += "<td><ul class='dt-list dt-list-cm-0'>";
            row += "<li class='dt-list__item editar-noticia' data-toggle='tooltip' title='Editar'><a class='text-light-gray' href='javascript:void(0)'>";
            row += "<i class='text-primary icon icon-editors'></i></a></li>";
            row += "<li class='dt-list__item eliminar-noticia' data-toggle='tooltip' title='Eliminar'><a class='text-light-gray' href='javascript:void(0)'>";
            row += "<i class='text-danger icon icon-trash-filled'></i></a></li>";
            row += "</ul></td>";
            row += "<td class='align-middle'>" + noticia.titulo + "</td>";
            row += "<td class='align-middle'>" + noticia.descripcion + "</td>";
            row += "<td class='align-middle'>" + noticia.fecha_publicacion + "</td>";
            row += "<td class='align-middle'>" + noticia.fuente + "</td>";
            row += "</tr>";
            document.querySelector("#tbodyNoticia").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageNoticia").value),
                document.querySelector("#pageNoticia"),
                $('#modalCargandoNoticia'),
                $('#paginationNoticia'));
        addEventsNoticiaes();
        if (beanRequestNoticia.operation == "paginate") {
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationNoticia'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
    }
}

function addEventsNoticiaes() {
    document.querySelectorAll('.editar-noticia').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            noticiaSelected = findByNoticia(btn.parentElement.parentElement.parentElement.getAttribute('idnoticia'));
            if (noticiaSelected != undefined) {
                beanRequestNoticia.operation = "update";
                beanRequestNoticia.type_request = "PUT";
                //SET VALUES MODAL
                document.querySelector("#txtTituloNoticia").value = noticiaSelected.nombre;
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
            noticiaSelected = findByNoticia(btn.parentElement.parentElement.parentElement.getAttribute('idnoticia'));
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

