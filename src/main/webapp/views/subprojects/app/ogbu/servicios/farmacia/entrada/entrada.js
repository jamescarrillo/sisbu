var beanPaginationEntrada;
var entradaSelected;
var beanRequestEntrada = new BeanRequest();
document.addEventListener("DOMContentLoaded", function () {
    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestEntrada.entity_api = "api/unidadmedidas";
    beanRequestEntrada.operation = "paginate";
    beanRequestEntrada.type_request = "GET";

    $('#FrmEntrada').submit(function (event) {
        beanRequestEntrada.operation = "paginate";
        beanRequestEntrada.type_request = "GET";
      $('#modalCargandoEntrada').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $('#FrmEntradaModal').submit(function (event) {
        if (validateFormEntrada()) {
            $('#modalCargandoEntrada').modal('show');
        }
        event.preventDefault();
        event.stopPropagation();
    });

    document.querySelector("#btnOpenNewEntrada").onclick = function () {
        //CONFIGURAMOS LA SOLICITUD
        beanRequestEntrada.operation = "add";
        beanRequestEntrada.type_request = "POST";
        //LIMPIAR LOS CAMPOS
        limpiarInput();
        //SET TITLE MODAL
        document.querySelector("#txtTituloModalMan").innerHTML = "REGISTRAR UNIDAD DE MEDIDA";
        //OPEN MODEL
        document.querySelector("#btnListaEntrada").style.display = 'none';
        document.querySelector("#btnOpenEntrada").style.display = 'block';
    };

    document.querySelector("#btnRegresar").onclick = function () {
        beanRequestEntrada.operation = "paginate";
        beanRequestEntrada.type_request = "GET";
        $('#modalCargandoEntrada').modal('show');
        document.querySelector("#btnOpenEntrada").style.display = 'none';
        document.querySelector("#btnListaEntrada").style.display = 'block';
    };

    $("#modalCargandoEntrada").on('shown.bs.modal', function () {
        processAjaxEntrada();
    });
    $('#modalCargandoEntrada').modal('show');

    $("#sizePageEntrada").change(function () {
        $('#modalCargandoEntrada').modal('show');
    });

});

function processAjaxEntrada() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestEntrada.operation == "paginate") {
        if (document.querySelector("#txtFilterEntrada").value != "") {
            document.querySelector("#pageEntrada").value = 1;
        }
        parameters_pagination += "?nombre=" + document.querySelector("#txtFilterEntrada").value;
        parameters_pagination += "&page=" + document.querySelector("#pageEntrada").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePageEntrada").value;

    } else {
        parameters_pagination = "";
        if (beanRequestEntrada.operation == "delete") {
            parameters_pagination = "/" + entradaSelected.identrada;
        } else {
            json = {
                "nombre": document.querySelector("#txtNombreEntrada").value,
                "nom_abreviado": document.querySelector("#txtAbreviaturaEntrada").value
            };
            if (beanRequestEntrada.operation == "update") {
                json.identrada = entradaSelected.identrada;
            }
        }
    }
    $.ajax({
        url: getHostAPI() + beanRequestEntrada.entity_api + "/" + beanRequestEntrada.operation + parameters_pagination,
        type: beanRequestEntrada.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        console.log(beanCrudResponse);
        $('#modalCargandoEntrada').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                if (beanRequestEntrada.operation == "add") {
                    limpiarInput();
                }

                showAlertTopEnd('success', 'Acción realizada exitosamente');

            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationEntrada = beanCrudResponse.beanPagination;
            toListEntrada(beanPaginationEntrada);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoEntrada').modal("hide");
        showAlertErrorRequest();

    });
}

function toListEntrada(beanPagination) {
    document.querySelector("#tbodyEntrada").innerHTML = "";
    document.querySelector("#titleManagerEntrada").innerHTML = "[ " + beanPagination.count_filter + " ] ENTRADA";
    if (beanPagination.count_filter > 0) {
        let row;
        row =
                `
               <div class="dt-widget__item border-success bg-primary text-white mb-0 pl-5">
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           NOMBRE
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           ABREVIATURA
                        </p>
                    </div>
                    <!-- /widget info -->
                </div>
            `;
        document.querySelector("#tbodyEntrada").innerHTML += row;
        beanPagination.list.forEach(entrada => {
            row =
                    `
                 <div class="dt-widget__item border-success  pl-5">
                    <!-- Widget Extra -->
                    <div class="dt-widget__extra text-right">
                      
                        <!-- Hide Content -->
                        <div class="hide-content pr-2"">
                            <!-- Action Button Group -->
                            <div class="action-btn-group">
                                <button class="btn btn-default text-primary dt-fab-btn editar-entrada" identrada='${entrada.identrada}' title="Editar" data-toggle="tooltip">
                                    <i class="icon icon-editors"></i>
                                </button>
                                <button class="btn btn-default text-danger dt-fab-btn eliminar-entrada" identrada='${entrada.identrada}' title="Eliminar" data-toggle="tooltip">
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
                           ${entrada.nombre}
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           ${entrada.nom_abreviado}
                        </p>
                    </div>
                    <!-- /widget info -->
                </div>
            `;
            document.querySelector("#tbodyEntrada").innerHTML += row;
            $('[data-toggle="tooltip"]').tooltip();
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageEntrada").value),
                document.querySelector("#pageEntrada"),
                $('#modalCargandoEntrada'),
                $('#paginationEntrada'));
        addEventsEntradaes();


    } else {
        destroyPagination($('#paginationEntrada'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
    }
}

function addEventsEntradaes() {
    document.querySelectorAll('.editar-entrada').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            entradaSelected = findByEntrada(btn.getAttribute('identrada'));
            if (entradaSelected != undefined) {
                beanRequestEntrada.operation = "update";
                beanRequestEntrada.type_request = "PUT";
                //SET VALUES MODAL
                document.querySelector("#txtNombreEntrada").value = entradaSelected.nombre;
                document.querySelector("#txtAbreviaturaEntrada").value=entradaSelected.nom_abreviado;
                document.querySelector("#txtTituloModalMan").innerHTML = "EDITAR UNIDAD DE MEDIDA";
                //OPEN MODEL
                document.querySelector("#btnListaEntrada").style.display = 'none';
                document.querySelector("#btnOpenEntrada").style.display = 'block';
                document.querySelector("#txtNombreEntrada").focus();
            } else {
                showAlertTopEnd('warning', 'No se encontró el Entrada para poder editar');
            }
        };
    });
    document.querySelectorAll('.eliminar-entrada').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            entradaSelected = findByEntrada(btn.getAttribute('identrada'));
            beanRequestEntrada.operation = "delete";
            beanRequestEntrada.type_request = "DELETE";
            processAjaxEntrada();
        };
    });
}

function findByEntrada(identrada) {
    let entrada_;
    beanPaginationEntrada.list.forEach(entrada => {
        if (identrada == entrada.identrada) {
            entrada_ = entrada;
            return;
        }
    });
    return entrada_;
}

function validateFormEntrada() {
    if (document.querySelector("#txtNombreEntrada").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Nombre');
        document.querySelector("#txtNombreEntrada").focus();
        return false;
    }else  if (document.querySelector("#txtAbreviaturaEntrada").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Abreviatura');
        document.querySelector("#txtAbreviaturaEntrada").focus();
        return false;
    }
   
    return true;
}

function limpiarInput() {
    document.querySelector("#txtNombreEntrada").value = "";
     document.querySelector("#txtAbreviaturaEntrada").value="";
}

