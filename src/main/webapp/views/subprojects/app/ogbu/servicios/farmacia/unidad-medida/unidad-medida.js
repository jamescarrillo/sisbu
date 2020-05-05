var beanPaginationUnidadMedida;
var unidadMedidaSelected;
var beanRequestUnidadMedida = new BeanRequest();
document.addEventListener("DOMContentLoaded", function () {
    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestUnidadMedida.entity_api = "api/unidadmedidas";
    beanRequestUnidadMedida.operation = "paginate";
    beanRequestUnidadMedida.type_request = "GET";

    $('#FrmUnidadMedida').submit(function (event) {
        beanRequestUnidadMedida.operation = "paginate";
        beanRequestUnidadMedida.type_request = "GET";
        $('#modalCargandoUnidadMedida').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $('#FrmUnidadMedidaModal').submit(function (event) {
        if (validateFormUnidadMedida()) {
            $('#modalCargandoUnidadMedida').modal('show');
        }
        event.preventDefault();
        event.stopPropagation();
    });

    document.querySelector("#btnOpenNewUnidadMedida").onclick = function () {
        //CONFIGURAMOS LA SOLICITUD
        beanRequestUnidadMedida.operation = "add";
        beanRequestUnidadMedida.type_request = "POST";
        //LIMPIAR LOS CAMPOS
        limpiarInput();
        //SET TITLE MODAL
        document.querySelector("#txtTituloModalMan").innerHTML = "REGISTRAR UNIDAD DE MEDIDA";
        //OPEN MODEL
        document.querySelector("#btnListaUnidadMedida").style.display = 'none';
        document.querySelector("#btnOpenUnidadMedida").style.display = 'block';
    };

    document.querySelector("#btnRegresar").onclick = function () {
        beanRequestUnidadMedida.operation = "paginate";
        beanRequestUnidadMedida.type_request = "GET";
        $('#modalCargandoUnidadMedida').modal('show');
        document.querySelector("#btnOpenUnidadMedida").style.display = 'none';
        document.querySelector("#btnListaUnidadMedida").style.display = 'block';
    };

    $("#modalCargandoUnidadMedida").on('shown.bs.modal', function () {
        processAjaxUnidadMedida();
    });
    $('#modalCargandoUnidadMedida').modal('show');

    $("#sizePageUnidadMedida").change(function () {
        $('#modalCargandoUnidadMedida').modal('show');
    });

});

function processAjaxUnidadMedida() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestUnidadMedida.operation == "paginate") {
        if (document.querySelector("#txtFilterUnidadMedida").value != "") {
            document.querySelector("#pageUnidadMedida").value = 1;
        }
        parameters_pagination += "?nombre=" + document.querySelector("#txtFilterUnidadMedida").value;
        parameters_pagination += "&page=" + document.querySelector("#pageUnidadMedida").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePageUnidadMedida").value;

    } else {
        parameters_pagination = "";
        if (beanRequestUnidadMedida.operation == "delete") {
            parameters_pagination = "/" + unidadMedidaSelected.idunidad_medida;
        } else {
            json = {
                "nombre": document.querySelector("#txtNombreUnidadMedida").value,
                "nom_abreviado": document.querySelector("#txtAbreviaturaUnidadMedida").value
            };
            if (beanRequestUnidadMedida.operation == "update") {
                json.idunidad_medida = unidadMedidaSelected.idunidad_medida;
            }
        }
    }
    $.ajax({
        url: getHostAPI() + beanRequestUnidadMedida.entity_api + "/" + beanRequestUnidadMedida.operation + parameters_pagination,
        type: beanRequestUnidadMedida.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        console.log(beanCrudResponse);
        $('#modalCargandoUnidadMedida').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                if (beanRequestUnidadMedida.operation == "add") {
                    limpiarInput();
                }

                showAlertTopEnd('success', 'Acción realizada exitosamente');

            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationUnidadMedida = beanCrudResponse.beanPagination;
            toListUnidadMedida(beanPaginationUnidadMedida);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoUnidadMedida').modal("hide");
        showAlertErrorRequest();

    });
}

function toListUnidadMedida(beanPagination) {
    document.querySelector("#tbodyUnidadMedida").innerHTML = "";
    document.querySelector("#titleManagerUnidadMedida").innerHTML = "[ " + beanPagination.count_filter + " ] UNIDADES DE MEDIDA";
    if (beanPagination.count_filter > 0) {
        let row;
        row =
            `
               <div class="dt-widget__item border-success bg-primary text-white mb-0 ">
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           NOMBRE
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate" >
                        <p class="mb-0 text-truncate ">
                           ABREVIATURA
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Extra -->
                    <div class="dt-widget__extra">
                        <div class="dt-task">
                        </div>
                    </div>
                    <!-- /widget extra -->
                </div>
            `;
        document.querySelector("#tbodyUnidadMedida").innerHTML += row;
        beanPagination.list.forEach(unidadMedida => {
            row =
                `
                 <div class="dt-widget__item m-0 pt-1 pb-1">
                   
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           ${unidadMedida.nombre}
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate" >
                        <p class="mb-0 text-truncate ">
                           ${unidadMedida.nom_abreviado}
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Extra -->
                    <div class="dt-widget__extra">
                        <div class="dt-task">
                            <div class="dt-task__redirect">
                            <!-- Action Button Group -->
                                <div class="action-btn-group">
                                <button class="btn btn-default text-primary dt-fab-btn editar-unidadMedida" idunidadMedida='${unidadMedida.idunidad_medida}' title="Editar" data-toggle="tooltip">
                                    <i class="icon icon-editors"></i>
                                </button>
                                <button class="btn btn-default text-danger dt-fab-btn eliminar-unidadMedida" idunidadMedida='${unidadMedida.idunidad_medida}' title="Eliminar" data-toggle="tooltip">
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
            document.querySelector("#tbodyUnidadMedida").innerHTML += row;
            $('[data-toggle="tooltip"]').tooltip();
        });
        buildPagination(
            beanPagination.count_filter,
            parseInt(document.querySelector("#sizePageUnidadMedida").value),
            document.querySelector("#pageUnidadMedida"),
            $('#modalCargandoUnidadMedida'),
            $('#paginationUnidadMedida'));
        addEventsUnidadMedidaes();


    } else {
        destroyPagination($('#paginationUnidadMedida'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
    }
}

function addEventsUnidadMedidaes() {
    document.querySelectorAll('.editar-unidadMedida').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            unidadMedidaSelected = findByUnidadMedida(btn.getAttribute('idunidadMedida'));
            if (unidadMedidaSelected != undefined) {
                beanRequestUnidadMedida.operation = "update";
                beanRequestUnidadMedida.type_request = "PUT";
                //SET VALUES MODAL
                document.querySelector("#txtNombreUnidadMedida").value = unidadMedidaSelected.nombre;
                document.querySelector("#txtAbreviaturaUnidadMedida").value = unidadMedidaSelected.nom_abreviado;
                document.querySelector("#txtTituloModalMan").innerHTML = "EDITAR UNIDAD DE MEDIDA";
                //OPEN MODEL
                document.querySelector("#btnListaUnidadMedida").style.display = 'none';
                document.querySelector("#btnOpenUnidadMedida").style.display = 'block';
                document.querySelector("#txtNombreUnidadMedida").focus();
            } else {
                showAlertTopEnd('warning', 'No se encontró el UnidadMedida para poder editar');
            }
        };
    });
    document.querySelectorAll('.eliminar-unidadMedida').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            unidadMedidaSelected = findByUnidadMedida(btn.getAttribute('idunidadMedida'));
            beanRequestUnidadMedida.operation = "delete";
            beanRequestUnidadMedida.type_request = "DELETE";
            processAjaxUnidadMedida();
        };
    });
}

function findByUnidadMedida(idunidadMedida) {
    let unidadMedida_;
    beanPaginationUnidadMedida.list.forEach(unidadMedida => {
        if (idunidadMedida == unidadMedida.idunidad_medida) {
            unidadMedida_ = unidadMedida;
            return;
        }
    });
    return unidadMedida_;
}

function validateFormUnidadMedida() {
    if (document.querySelector("#txtNombreUnidadMedida").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Nombre');
        document.querySelector("#txtNombreUnidadMedida").focus();
        return false;
    } else if (document.querySelector("#txtAbreviaturaUnidadMedida").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Abreviatura');
        document.querySelector("#txtAbreviaturaUnidadMedida").focus();
        return false;
    }

    return true;
}

function limpiarInput() {
    document.querySelector("#txtNombreUnidadMedida").value = "";
    document.querySelector("#txtAbreviaturaUnidadMedida").value = "";
}

