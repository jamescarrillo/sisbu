var beanPaginationOcupacion;
var ocupacionSelected;
var beanRequestOcupacion = new BeanRequest();
document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestOcupacion.entity_api = "api/ocupaciones";
    beanRequestOcupacion.operation = "paginate";
    beanRequestOcupacion.type_request = "GET";

    $('#FrmOcupacion').submit(function (event) {
        beanRequestOcupacion.operation = "paginate";
        beanRequestOcupacion.type_request = "GET";
        $('#modalCargandoOcupacion').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $('#FrmOcupacionModal').submit(function (event) {
        if (validateFormOcupacion()) {
            $('#modalCargandoOcupacion').modal('show');
        }
        event.preventDefault();
        event.stopPropagation();
    });

    document.querySelector("#btnOpenNewOcupacion").onclick = function () {
        //CONFIGURAMOS LA SOLICITUD
        beanRequestOcupacion.operation = "add";
        beanRequestOcupacion.type_request = "POST";
        //LIMPIAR LOS CAMPOS
        document.querySelector("#txtNombreOcupacion").value = "";
        //SET TITLE MODAL
        document.querySelector("#txtTituloModalMan").innerHTML = "REGISTRAR OCUPACIÓN";
        //OPEN MODEL
        $('#ventanaModalOcupacion').modal('show');
    };

    $("#modalCargandoOcupacion").on('shown.bs.modal', function () {
        processAjaxOcupacion();
    });

    $("#ventanaModalOcupacion").on('hidden.bs.modal', function () {
        beanRequestOcupacion.operation = "paginate";
        beanRequestOcupacion.type_request = "GET";
    });

    $("#modalCargandoOcupacion").on('hide.bs.modal', function () {
        beanRequestOcupacion.operation = "paginate";
        beanRequestOcupacion.type_request = "GET";
    });


    $('#modalCargandoOcupacion').modal('show');

    $("#sizePageOcupacion").change(function () {
        $('#modalCargandoOcupacion').modal('show');
    });

});

function processAjaxOcupacion() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestOcupacion.operation == "paginate") {
        if (document.querySelector("#txtFilterOcupacion").value != "") {
            document.querySelector("#pageOcupacion").value = 1;
        }
        parameters_pagination += "?nombre=" + document.querySelector("#txtFilterOcupacion").value.toUpperCase();
        parameters_pagination += "&page=" + document.querySelector("#pageOcupacion").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePageOcupacion").value;

    } else {
        parameters_pagination = "";
        if (beanRequestOcupacion.operation == "delete") {
            parameters_pagination = "/" + ocupacionSelected.idocupacion;
        } else {
            json = {
                "nombre": document.querySelector("#txtNombreOcupacion").value,
            };
            if (beanRequestOcupacion.operation == "update") {
                json.idocupacion = ocupacionSelected.idocupacion;
            }
        }
    }
    $.ajax({
        url: getHostAPI() + beanRequestOcupacion.entity_api + "/" + beanRequestOcupacion.operation + parameters_pagination,
        type: beanRequestOcupacion.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoOcupacion').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
                $('#ventanaModalOcupacion').modal('hide');
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationOcupacion = beanCrudResponse.beanPagination;
            toListOcupacion(beanPaginationOcupacion);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoOcupacion').modal("hide");
        showAlertErrorRequest();

    });
}

function toListOcupacion(beanPagination) {
    document.querySelector("#tbodyOcupacion").innerHTML = "";
    document.querySelector("#titleManagerOcupacion").innerHTML = "[ " + beanPagination.count_filter + " ] OCUPACIONES";
    if (beanPagination.count_filter > 0) {
        let row;
        row =
            `
               <div class="dt-widget__item border-success bg-primary text-white mb-0 pb-2 mr-1">
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           NOMBRE
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Extra -->
                    <div class="dt-widget__extra ">
                    <div class="dt-task">
                     </div>
                        <!-- /hide content -->
                    </div>
                    <!-- /widget extra -->
                </div>
            `;
        document.querySelector("#tbodyOcupacion").innerHTML += row;
        beanPagination.list.forEach(ocupacion => {
            row =
                `
                 <div class="dt-widget__item border-bottom m-0 pl-4 pb-2 pt-2 pr-1">
                
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           ${ocupacion.nombre}
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Extra -->
                    <div class="dt-widget__extra ">
                    <div class="dt-task">
                    <div class="dt-task__redirect">
                               <!-- Action Button Group -->
                               <div class="action-btn-group">
                                   <button class="btn btn-default text-primary dt-fab-btn editar-ocupacion" idocupacion='${ocupacion.idocupacion}' title="Editar" data-toggle="tooltip">
                                       <i class="icon icon-editors"></i>
                                   </button>
                                   <button class="btn btn-default text-danger dt-fab-btn eliminar-ocupacion" idocupacion='${ocupacion.idocupacion}' title="Eliminar" data-toggle="tooltip">
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
            document.querySelector("#tbodyOcupacion").innerHTML += row;
            $('[data-toggle="tooltip"]').tooltip();
        });
        buildPagination(
            beanPagination.count_filter,
            parseInt(document.querySelector("#sizePageOcupacion").value),
            document.querySelector("#pageOcupacion"),
            $('#modalCargandoOcupacion'),
            $('#paginationOcupacion'));
        addEventsOcupaciones();
        if (beanRequestOcupacion.operation == "paginate") {
            document.querySelector("#txtFilterOcupacion").focus();
        }

    } else {
        destroyPagination($('#paginationOcupacion'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterOcupacion").focus();
    }
}

function addEventsOcupaciones() {
    document.querySelectorAll('.editar-ocupacion').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            $('[data-toggle="tooltip"]').tooltip("hide");
            ocupacionSelected = findByOcupacion(btn.getAttribute('idocupacion'));
            if (ocupacionSelected != undefined) {
                beanRequestOcupacion.operation = "update";
                beanRequestOcupacion.type_request = "PUT";
                //SET VALUES MODAL
                document.querySelector("#txtNombreOcupacion").value = ocupacionSelected.nombre;
                document.querySelector("#txtTituloModalMan").innerHTML = "EDITAR OCUPACIÓN";
                $('#ventanaModalOcupacion').modal("show");
                document.querySelector("#txtNombreOcupacion").focus();
            } else {
                showAlertTopEnd('warning', 'No se encontró el Ocupacion para poder editar');
            }
        };
    });
    document.querySelectorAll('.eliminar-ocupacion').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            $('[data-toggle="tooltip"]').tooltip("hide");
            ocupacionSelected = findByOcupacion(btn.getAttribute('idocupacion'));
            beanRequestOcupacion.operation = "delete";
            beanRequestOcupacion.type_request = "DELETE";
            processAjaxOcupacion();
        };
    });
}

function findByOcupacion(idocupacion) {
    let ocupacion_;
    beanPaginationOcupacion.list.forEach(ocupacion => {
        if (idocupacion == ocupacion.idocupacion) {
            ocupacion_ = ocupacion;
            return;
        }
    });
    return ocupacion_;
}

function validateFormOcupacion() {
    if (document.querySelector("#txtNombreOcupacion").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese nombre');
        document.querySelector("#txtNombrenOcupacion").focus();
        return false;
    }
    return true;
}

