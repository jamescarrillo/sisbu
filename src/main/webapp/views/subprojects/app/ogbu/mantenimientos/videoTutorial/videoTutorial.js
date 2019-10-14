var beanPaginationVideoTutorial;
var videoTutorialSelected;
var beanRequestVideoTutorial = new BeanRequest();
document.addEventListener("DOMContentLoaded", function () {
    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestVideoTutorial.entity_api = "api/video/tutorial";
    beanRequestVideoTutorial.operation = "paginate";
    beanRequestVideoTutorial.type_request = "GET";

    $('#FrmVideoTutorial').submit(function (event) {
        beanRequestVideoTutorial.operation = "paginate";
        beanRequestVideoTutorial.type_request = "GET";
        $('#modalCargandoVideoTutorial').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $('#FrmVideoTutorialModal').submit(function (event) {
        if (validateFormVideoTutorial()) {
            $('#modalCargandoVideoTutorial').modal('show');
        }
        event.preventDefault();
        event.stopPropagation();
    });

    document.querySelector("#btnOpenNewVideoTutorial").onclick = function () {
        //CONFIGURAMOS LA SOLICITUD
        beanRequestVideoTutorial.operation = "add";
        beanRequestVideoTutorial.type_request = "POST";
        //LIMPIAR LOS CAMPOS
        limpiarInput();
        //SET TITLE MODAL
        document.querySelector("#txtTituloModalMan").innerHTML = "REGISTRAR VIDEO TUTORIAL";
        //OPEN MODEL
        document.querySelector("#btnListaVideoTutorial").style.display = 'none';
        document.querySelector("#btnOpenVideoTutorial").style.display = 'block';
    };

    document.querySelector("#btnRegresar").onclick = function () {
        beanRequestVideoTutorial.operation = "paginate";
        beanRequestVideoTutorial.type_request = "GET";
        $('#modalCargandoVideoTutorial').modal('show');
        document.querySelector("#btnOpenVideoTutorial").style.display = 'none';
        document.querySelector("#btnListaVideoTutorial").style.display = 'block';
    };

    $("#modalCargandoVideoTutorial").on('shown.bs.modal', function () {
        processAjaxVideoTutorial();
    });
    $('#modalCargandoVideoTutorial').modal('show');

    $("#sizePageVideoTutorial").change(function () {
        $('#modalCargandoVideoTutorial').modal('show');
    });

});

function processAjaxVideoTutorial() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestVideoTutorial.operation == "paginate") {
        if (document.querySelector("#txtFilterVideoTutorial").value != "") {
            document.querySelector("#pageVideoTutorial").value = 1;
        }
        parameters_pagination += "?filter=" + document.querySelector("#txtFilterVideoTutorial").value;
        parameters_pagination += "&page=" + document.querySelector("#pageVideoTutorial").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePageVideoTutorial").value;

    } else {
        parameters_pagination = "";
        if (beanRequestVideoTutorial.operation == "delete") {
            parameters_pagination = "/" + videoTutorialSelected.idvideo_tutorial;
            json = {};
        } else {
            json = {
                "titulo": document.querySelector("#txtTituloVideoTutorial").value,
                "descripcion": document.querySelector("#txtDescripcionVideoTutorial").value,
                "link": document.querySelector("#txtLinkVideoTutorial").value,
            };
            if (beanRequestVideoTutorial.operation == "update") {
                json.idvideo_tutorial = videoTutorialSelected.idvideo_tutorial;
            }
        }
    }
    $.ajax({
        url: getHostAPI() + beanRequestVideoTutorial.entity_api + "/" + beanRequestVideoTutorial.operation + parameters_pagination,
        type: beanRequestVideoTutorial.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        console.log(beanCrudResponse);
        $('#modalCargandoVideoTutorial').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                if (beanRequestVideoTutorial.operation == "add") {
                    limpiarInput();
                }

                showAlertTopEnd('success', 'Acción realizada exitosamente');

            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationVideoTutorial = beanCrudResponse.beanPagination;
            toListVideoTutorial(beanPaginationVideoTutorial);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoVideoTutorial').modal("hide");
        showAlertErrorRequest();

    });
}

function toListVideoTutorial(beanPagination) {
    document.querySelector("#tbodyVideoTutorial").innerHTML = "";
    document.querySelector("#titleManagerVideoTutorial").innerHTML = "[ " + beanPagination.count_filter + " ] VIDEO TUTORIALES";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(videoTutorial => {
            row = "<div class='dt-widget__item border-bottom'>";
            row += "<div class='dt-extra animate-slide align-self-center mr-5' idvideotutorial='" + videoTutorial.idvideo_tutorial + "'>";
            row += "<span class='badge badge-info badge-circle-animate badge-pill badge-sm align-text-top mr-2'>"
            row += "<a class='text-light-gray editar-videoTutorial' data-toggle='tooltip' title='Editar' href='javascript:void(0)'>";
            row += "<i class='text-white icon icon-editors'></i></a>";
            row += "</span>";
            row += "<span class='badge badge-danger badge-circle-animate badge-pill badge-sm align-text-top'>";
            row += "<a class='text-light-gray eliminar-videoTutorial' data-toggle='tooltip' title='ELiminar' href='javascript:void(0)'>";
            row += "<i class='text-white icon icon-trash-filled'></i></a>";
            row += "</span>";
            row += "</div>";

            row += "<div class='dt-widget__info text-truncate '  style='min-width:60px; max-width:25%'>";
            row += "<p class='dt-widget__subtitle text-truncate text-dark'>";
            row += videoTutorial.titulo + "</p></div>";

            row += "<div class=' text-truncate '  style='min-width:230px; max-width:50%;'>";
            row += "<p class='dt-widget__subtitle text-truncate text-dark'>";
            row += videoTutorial.descripcion + "</p></div>";

            row += "<div class='text-truncate mr-5' style='min-width:50px; max-width:25%;'>";
            row += "<p class='dt-widget__subtitle text-truncate text-dark'>";
            row += videoTutorial.link + "</p></div>";

            row += "</div>";

            document.querySelector("#tbodyVideoTutorial").innerHTML += row;
            $('[data-toggle="tooltip"]').tooltip();
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageVideoTutorial").value),
                document.querySelector("#pageVideoTutorial"),
                $('#modalCargandoVideoTutorial'),
                $('#paginationVideoTutorial'));
        addEventsVideoTutoriales();


    } else {
        destroyPagination($('#paginationVideoTutorial'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
    }
}

function addEventsVideoTutoriales() {
    document.querySelectorAll('.editar-videoTutorial').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            videoTutorialSelected = findByVideoTutorial(btn.parentElement.parentElement.getAttribute('idvideotutorial'));
            if (videoTutorialSelected != undefined) {
                beanRequestVideoTutorial.operation = "update";
                beanRequestVideoTutorial.type_request = "PUT";
                //SET VALUES MODAL
                document.querySelector("#txtTituloVideoTutorial").value = videoTutorialSelected.titulo;
                document.querySelector("#txtDescripcionVideoTutorial").value = videoTutorialSelected.descripcion;
                document.querySelector("#txtLinkVideoTutorial").value = videoTutorialSelected.link;
                document.querySelector("#txtTituloModalMan").innerHTML = "EDITAR VIDEO TUTORIAL";
                //OPEN MODEL
                document.querySelector("#btnListaVideoTutorial").style.display = 'none';
                document.querySelector("#btnOpenVideoTutorial").style.display = 'block';
                document.querySelector("#txtTituloVideoTutorial").focus();
            } else {
                showAlertTopEnd('warning', 'No se encontró el VideoTutorial para poder editar');
            }
        };
    });
    document.querySelectorAll('.eliminar-videoTutorial').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            videoTutorialSelected = findByVideoTutorial(btn.parentElement.parentElement.getAttribute('idvideotutorial'));
            beanRequestVideoTutorial.operation = "delete";
            beanRequestVideoTutorial.type_request = "DELETE";
            processAjaxVideoTutorial();
        };
    });
}

function findByVideoTutorial(idvideoTutorial) {
    let videoTutorial_;
    beanPaginationVideoTutorial.list.forEach(videoTutorial => {
        if (idvideoTutorial == videoTutorial.idvideo_tutorial) {
            videoTutorial_ = videoTutorial;
            return;
        }
    });
    return videoTutorial_;
}

function validateFormVideoTutorial() {
    if (document.querySelector("#txtTituloVideoTutorial").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Título');
        document.querySelector("#txtTituloVideoTutorial").focus();
        return false;
    }
    if (document.querySelector("#txtLinkVideoTutorial").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Fuente');
        document.querySelector("#txtLinkVideoTutorial").focus();
        return false;
    }

    if (document.querySelector("#txtDescripcionVideoTutorial").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Descripción');
        document.querySelector("#txtDescripcionVideoTutorial").focus();
        return false;
    }
    return true;
}

function limpiarInput() {
    document.querySelector("#txtTituloVideoTutorial").value = "";
    document.querySelector("#txtDescripcionVideoTutorial").value = "";
    document.querySelector("#txtLinkVideoTutorial").value = "";
}

