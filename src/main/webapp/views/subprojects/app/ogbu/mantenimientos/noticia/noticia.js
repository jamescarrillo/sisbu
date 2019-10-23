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
        if (document.querySelector("#txtFilterInicialNoticia").value != "" || document.querySelector("#txtFilterFinalNoticia").value != "") {
            document.querySelector("#pageNoticia").value = 1;
        }
        parameters_pagination += "?fechai=" + document.querySelector("#txtFilterInicialNoticia").value;
        parameters_pagination += "&fechaf=" + document.querySelector("#txtFilterFinalNoticia").value;
        parameters_pagination += "&page=" + document.querySelector("#pageNoticia").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePageNoticia").value;

    } else {
        parameters_pagination = "";
        if (beanRequestNoticia.operation == "delete") {
            parameters_pagination = "/" + noticiaSelected.idnoticia;
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
        row =
                `
               <div class="dt-widget__item border-success bg-primary text-white mb-0 pb-2 pl-5">
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           FUENTE /
                        </p>
                        <p class="mb-0 text-truncate ">
                           FECHA
                        </p>
                    </div>
                    <!-- /widget info -->
                     <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           TÍTULO
                        </p>
                    </div>
                    <!-- /widget info -->
                     <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           DESCRIPCIÓN
                        </p>
                    </div>
                    <!-- /widget info -->
                </div>
            `;
        document.querySelector("#tbodyNoticia").innerHTML += row;
        beanPagination.list.forEach(noticia => {

            row =
                    `
                 <div class="dt-widget__item border-success  pl-5">
                    <!-- Widget Extra -->
                    <div class="dt-widget__extra text-right">
                      
                        <!-- Hide Content -->
                        <div class="hide-content pr-2"">
                            <!-- Action Button Group -->
                            <div class="action-btn-group">
                                <button class="btn btn-default text-primary dt-fab-btn editar-noticia" idnoticia='${noticia.idnoticia}' title="Editar" data-toggle="tooltip">
                                    <i class="icon icon-editors"></i>
                                </button>
                                <button class="btn btn-default text-danger dt-fab-btn eliminar-noticia" idnoticia='${noticia.idnoticia}' title="Eliminar" data-toggle="tooltip">
                                    <i class="icon icon-trash-filled"></i>
                                </button>
                              
                            </div>
                            <!-- /action button group -->
                        </div>
                        <!-- /hide content -->
                    </div>
                    <!-- /widget extra -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           ${noticia.fuente} 
                        </p>
                        <p class="mb-0 text-truncate ">
                           ${noticia.fecha_publicacion}
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           ${noticia.titulo}
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           ${noticia.descripcion}
                        </p>
                    </div>
                    <!-- /widget info -->
                 
                    
                </div>
            `;
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
            noticiaSelected = findByNoticia(btn.getAttribute('idnoticia'));
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
            noticiaSelected = findByNoticia(btn.getAttribute('idnoticia'));
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

