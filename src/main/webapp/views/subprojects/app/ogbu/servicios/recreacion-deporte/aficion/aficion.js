var beanPaginationAficion;
var aficionSelected;
var beanRequestAficion = new BeanRequest();
document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestAficion.entity_api = "api/aficiones";
    beanRequestAficion.operation = "paginate";
    beanRequestAficion.type_request = "GET";

    $('#FrmAficion').submit(function (event) {
        beanRequestAficion.operation = "paginate";
        beanRequestAficion.type_request = "GET";
        $('#modalCargandoAficion').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $('#FrmAficionModal').submit(function (event) {
        if (validateFormAficion()) {
            $('#modalCargandoAficion').modal('show');
        }
        event.preventDefault();
        event.stopPropagation();
    });

    document.querySelector("#btnOpenNewAficion").onclick = function () {
        //CONFIGURAMOS LA SOLICITUD
        beanRequestAficion.operation = "add";
        beanRequestAficion.type_request = "POST";
        //LIMPIAR LOS CAMPOS
        document.querySelector("#txtNombreAficion").value = "";
        //SET TITLE MODAL
        document.querySelector("#txtTituloModalMan").innerHTML = "REGISTRAR AFICIONES";
        //OPEN MODEL
        $('#ventanaModalAficion').modal('show');
    };

    $("#modalCargandoAficion").on('shown.bs.modal', function () {
        if (!$('#ventanaModalAficion').hasClass("show")) {
            beanRequestAficion.operation = "paginate";
            beanRequestAficion.type_request = "GET";
        }
        processAjaxAficion();
    });

    $("#modalCargandoAficion").on('hide.bs.modal', function () {
        beanRequestAficion.operation = "paginate";
        beanRequestAficion.type_request = "GET";
    });

    $('#modalCargandoAficion').modal('show');

    $("#sizePageAficion").change(function () {
        $('#modalCargandoAficion').modal('show');
    });

});

function processAjaxAficion() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestAficion.operation == "paginate") {
        if (document.querySelector("#txtFilterAficion").value != "") {
            document.querySelector("#pageAficion").value = "1";
        }
        parameters_pagination += "?nombre=" + document.querySelector("#txtFilterAficion").value.toUpperCase();
        parameters_pagination += "&page=" + document.querySelector("#pageAficion").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePageAficion").value;

    } else {
        parameters_pagination = "";
        if (beanRequestAficion.operation == "delete") {
            parameters_pagination = "/" + aficionSelected.idaficion;
        } else {
            json = {
                "descripcion": document.querySelector("#txtNombreAficion").value,
            };
            if (beanRequestAficion.operation == "update") {
                json.idaficion = aficionSelected.idaficion;
            }
        }
    }
    $.ajax({
        url: getHostAPI() + beanRequestAficion.entity_api + "/" + beanRequestAficion.operation + parameters_pagination,
        type: beanRequestAficion.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoAficion').modal("hide");
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
            toListAficion(beanPaginationAficion);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoAficion').modal("hide");
        showAlertErrorRequest();

    });
}

function toListAficion(beanPagination) {
    document.querySelector("#tbodyAficion").innerHTML = "";
    document.querySelector("#titleManagerAficion").innerHTML = "[ " + beanPagination.count_filter + " ] AFICIONES";
    if (beanPagination.count_filter > 0) {
        let row;
        row =
            `
               <div class="dt-widget__item border-success bg-primary text-white mb-0 pb-2 pl-3">
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate pl-5" >
                        <p class="mb-0 text-truncate ">
                           NOMBRE
                        </p>
                    </div>
                    <!-- /widget info -->
                   
                    
                </div>
            `;
        document.querySelector("#tbodyAficion").innerHTML += row;
        beanPagination.list.forEach(aficion => {

            row =
                `
             <div class="dt-widget__item m-0 pt-1 pb-1 pl-3">
                <!-- Widget Info -->
                <div class="dt-widget__info text-truncate " >
                    <p class="mb-0 text-truncate ">
                       ${aficion.descripcion}
                    </p>
                </div>
                <!-- /widget info -->
               
               
                <!-- Widget Extra -->
                <div class="dt-widget__extra">
                    <div class="dt-task">
                    <div class="dt-task__redirect">
                        <!-- Action Button Group -->
                        <div class="action-btn-group">
                        <button class="btn btn-default text-primary dt-fab-btn editar-aficion" idaficion='${aficion.idaficion}' title="Editar" data-toggle="tooltip">
                        <i class="icon icon-editors"></i>
                    </button>
                    <button class="btn btn-default text-danger dt-fab-btn eliminar-aficion" idaficion='${aficion.idaficion}' title="Eliminar" data-toggle="tooltip">
                        <i class="icon icon-trash-filled"></i>
                    </button>
                            </div>
                        </div>
                        <!-- /action button group -->
                    </div>
                    <!-- /hide content -->
                </div>
                <!-- /widget extra -->
            </div>
        `;
            document.querySelector("#tbodyAficion").innerHTML += row;
            $('[data-toggle="tooltip"]').tooltip();
        });
        buildPagination(
            beanPagination.count_filter,
            parseInt(document.querySelector("#sizePageAficion").value),
            document.querySelector("#pageAficion"),
            $('#modalCargandoAficion'),
            $('#paginationAficion'));
        addEventsAficiones();
        if (beanRequestAficion.operation == "paginate") {
            document.querySelector("#txtFilterAficion").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationAficion'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterAficion").focus();
    }
}

function addEventsAficiones() {
    document.querySelectorAll('.editar-aficion').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            aficionSelected = findByAficion(btn.getAttribute('idaficion'));
            if (aficionSelected != undefined) {
                beanRequestAficion.operation = "update";
                beanRequestAficion.type_request = "PUT";
                //SET VALUES MODAL
                document.querySelector("#txtNombreAficion").value = aficionSelected.descripcion;
                document.querySelector("#txtTituloModalMan").innerHTML = "EDITAR AFICIÓN";
                $('#ventanaModalAficion').modal("show");
                document.querySelector("#txtNombreAficion").focus();
            } else {
                showAlertTopEnd('warning', 'No se encontró el Aficion para poder editar');
            }
        };
    });
    document.querySelectorAll('.eliminar-aficion').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            aficionSelected = findByAficion(btn.getAttribute('idaficion'));
            beanRequestAficion.operation = "delete";
            beanRequestAficion.type_request = "DELETE";
            processAjaxAficion();
        };
    });
}

function findByAficion(idaficion) {
    let aficion_;
    beanPaginationAficion.list.forEach(aficion => {
        if (idaficion == aficion.idaficion) {
            aficion_ = aficion;
            return;
        }
    });
    return aficion_;
}

function validateFormAficion() {
    if (document.querySelector("#txtNombreAficion").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese nombre');
        document.querySelector("#txtNombrenAficion").focus();
        return false;
    }
    return true;
}

