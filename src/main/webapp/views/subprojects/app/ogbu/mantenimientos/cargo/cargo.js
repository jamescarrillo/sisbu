var beanPaginationCargo;
var cargoSelected;
var beanRequestCargo = new BeanRequest();
document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestCargo.entity_api = "api/cargos";
    beanRequestCargo.operation = "paginate";
    beanRequestCargo.type_request = "GET";

    $('#FrmCargo').submit(function (event) {
        beanRequestCargo.operation = "paginate";
        beanRequestCargo.type_request = "GET";
        $('#modalCargandoCargo').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $('#FrmCargoModal').submit(function (event) {
        if (validateFormCargo()) {
            $('#modalCargandoCargo').modal('show');
        }
        event.preventDefault();
        event.stopPropagation();
    });

    document.querySelector("#btnOpenNewCargo").onclick = function () {
        //CONFIGURAMOS LA SOLICITUD
        beanRequestCargo.operation = "add";
        beanRequestCargo.type_request = "POST";
        //LIMPIAR LOS CAMPOS
        document.querySelector("#txtNombreCargo").value = "";
        //SET TITLE MODAL
        document.querySelector("#txtTituloModalMan").innerHTML = "REGISTRAR CARGO";
        //OPEN MODEL
        $('#ventanaModalCargo').modal('show');
    };

    $("#modalCargandoCargo").on('shown.bs.modal', function () {
        processAjaxCargo();
    });

    $("#ventanaModalCargo").on('hidden.bs.modal', function () {
        beanRequestCargo.operation = "paginate";
        beanRequestCargo.type_request = "GET";
    });

    $("#modalCargandoCargo").on('hide.bs.modal', function () {
        beanRequestCargo.operation = "paginate";
        beanRequestCargo.type_request = "GET";
    });


    $('#modalCargandoCargo').modal('show');

    $("#sizePageCargo").change(function () {
        $('#modalCargandoCargo').modal('show');
    });

});

function processAjaxCargo() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestCargo.operation == "paginate") {
        if (document.querySelector("#txtFilterCargo").value != "") {
            document.querySelector("#pageCargo").value = 1;
        }
        parameters_pagination += "?nombre=" + document.querySelector("#txtFilterCargo").value.toUpperCase();
        parameters_pagination += "&page=" + document.querySelector("#pageCargo").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePageCargo").value;

    } else {
        parameters_pagination = "";
        if (beanRequestCargo.operation == "delete") {
            parameters_pagination = "/" + cargoSelected.idcargo;
        } else {
            json = {
                "nombre": document.querySelector("#txtNombreCargo").value,
            };
            if (beanRequestCargo.operation == "update") {
                json.idcargo = cargoSelected.idcargo;
            }
        }
    }
    $.ajax({
        url: getHostAPI() + beanRequestCargo.entity_api + "/" + beanRequestCargo.operation + parameters_pagination,
        type: beanRequestCargo.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoCargo').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
                $('#ventanaModalCargo').modal('hide');
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationCargo = beanCrudResponse.beanPagination;
            toListCargo(beanPaginationCargo);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoCargo').modal("hide");
        showAlertErrorRequest();

    });
}

function toListCargo(beanPagination) {
    document.querySelector("#tbodyCargo").innerHTML = "";
    document.querySelector("#titleManagerCargo").innerHTML = "[ " + beanPagination.count_filter + " ] CARGOS";
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
        document.querySelector("#tbodyCargo").innerHTML += row;
        beanPagination.list.forEach(cargo => {
            row =
                `
                 <div class="dt-widget__item border-bottom m-0 pl-4 pb-2 pt-2 pr-1">
                
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           ${cargo.nombre}
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Extra -->
                    <div class="dt-widget__extra ">
                    <div class="dt-task">
                    <div class="dt-task__redirect">
                               <!-- Action Button Group -->
                               <div class="action-btn-group">
                                   <button class="btn btn-default text-primary dt-fab-btn editar-cargo" idcargo='${cargo.idcargo}' title="Editar" data-toggle="tooltip">
                                       <i class="icon icon-editors"></i>
                                   </button>
                                   <button class="btn btn-default text-danger dt-fab-btn eliminar-cargo" idcargo='${cargo.idcargo}' title="Eliminar" data-toggle="tooltip">
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
            document.querySelector("#tbodyCargo").innerHTML += row;
            $('[data-toggle="tooltip"]').tooltip();
        });
        buildPagination(
            beanPagination.count_filter,
            parseInt(document.querySelector("#sizePageCargo").value),
            document.querySelector("#pageCargo"),
            $('#modalCargandoCargo'),
            $('#paginationCargo'));
        addEventsCargoes();
        if (beanRequestCargo.operation == "paginate") {
            document.querySelector("#txtFilterCargo").focus();
        }

    } else {
        destroyPagination($('#paginationCargo'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterCargo").focus();
    }
}

function addEventsCargoes() {
    document.querySelectorAll('.editar-cargo').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            cargoSelected = findByCargo(btn.getAttribute('idcargo'));
            if (cargoSelected != undefined) {
                beanRequestCargo.operation = "update";
                beanRequestCargo.type_request = "PUT";
                //SET VALUES MODAL
                document.querySelector("#txtNombreCargo").value = cargoSelected.nombre;
                document.querySelector("#txtTituloModalMan").innerHTML = "EDITAR CARGO";
                $('#ventanaModalCargo').modal("show");
                document.querySelector("#txtNombreCargo").focus();
            } else {
                showAlertTopEnd('warning', 'No se encontró el Cargo para poder editar');
            }
        };
    });
    document.querySelectorAll('.eliminar-cargo').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            cargoSelected = findByCargo(btn.getAttribute('idcargo'));
            beanRequestCargo.operation = "delete";
            beanRequestCargo.type_request = "DELETE";
            processAjaxCargo();
        };
    });
}

function findByCargo(idcargo) {
    let cargo_;
    beanPaginationCargo.list.forEach(cargo => {
        if (idcargo == cargo.idcargo) {
            cargo_ = cargo;
            return;
        }
    });
    return cargo_;
}

function validateFormCargo() {
    if (document.querySelector("#txtNombreCargo").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese nombre');
        document.querySelector("#txtNombrenCargo").focus();
        return false;
    }
    return true;
}

