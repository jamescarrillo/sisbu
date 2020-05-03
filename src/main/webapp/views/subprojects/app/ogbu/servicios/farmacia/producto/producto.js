var beanPaginationProducto;
var productoSelected;
var categoriaSelected;
var unidadMedidaISelected;
var unidadMedidaSSelected;
var beanRequestProducto = new BeanRequest();
document.addEventListener("DOMContentLoaded", function () {
    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestProducto.entity_api = "api/productos";
    beanRequestProducto.operation = "paginate";
    beanRequestProducto.type_request = "GET";

    $('#FrmProducto').submit(function (event) {
        beanRequestProducto.operation = "paginate";
        beanRequestProducto.type_request = "GET";
        $('#modalCargandoProducto').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $('#FrmProductoModal').submit(function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (validateFormProducto()) {
            $('#modalCargandoProducto').modal('show');
        }

    });

    document.querySelector("#btnOpenNewProducto").onclick = function () {
        //CONFIGURAMOS LA SOLICITUD
        beanRequestProducto.operation = "add";
        beanRequestProducto.type_request = "POST";
        //LIMPIAR LOS CAMPOS
        limpiarInput();
        //SET TITLE MODAL
        document.querySelector("#txtTituloModalMan").innerHTML = "REGISTRAR PRODUCTO";
        //OPEN MODEL
        document.querySelector("#btnListaProducto").style.display = 'none';
        document.querySelector("#btnOpenProducto").style.display = 'block';
    };

    document.querySelector("#btnRegresar").onclick = function () {
        beanRequestProducto.operation = "paginate";
        beanRequestProducto.type_request = "GET";
        $('#modalCargandoProducto').modal('show');
        document.querySelector("#btnOpenProducto").style.display = 'none';
        document.querySelector("#btnListaProducto").style.display = 'block';
    };

    $("#modalCargandoProducto").on('shown.bs.modal', function () {
        processAjaxProducto();
    });
    $('#modalCargandoProducto').modal('show');

    $("#sizePageProducto").change(function () {
        $('#modalCargandoProducto').modal('show');
    });

});

function processAjaxProducto() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestProducto.operation == "paginate") {
        if (document.querySelector("#txtFilterProducto").value != "") {
            document.querySelector("#pageProducto").value = 1;
        }
        parameters_pagination += "?nombre=" + document.querySelector("#txtFilterProducto").value;
        parameters_pagination += "&page=" + document.querySelector("#pageProducto").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePageProducto").value;

    } else {
        parameters_pagination = "";
        if (beanRequestProducto.operation == "delete") {
            parameters_pagination = "/" + productoSelected.idproducto;
        } else {
            json = {
                "codigo": document.querySelector("#txtCodigoProducto").value,
                "nombre": document.querySelector("#txtNombreProducto").value,
                "cant_minima": document.querySelector("#txtCantidadProducto").value,
                "fac_conversion": document.querySelector("#txtFactorProducto").value,
                "estado": document.querySelector("#txtEstadoProducto").value,
                "descripcion": document.querySelector("#txtDescripcionProducto").value,
                "categoria": {
                    "idcategoria": categoriaSelected.idcategoria
                },
                "unidadmedida_ingreso": {
                    "idunidad_medida": unidadMedidaISelected.idunidad_medida
                },
                "unidadmedida_salida": {
                    "idunidad_medida": unidadMedidaSSelected.idunidad_medida
                },
            };
            if (beanRequestProducto.operation == "update") {
                json.idproducto = productoSelected.idproducto;
            }
        }
    }
    $.ajax({
        url: getHostAPI() + beanRequestProducto.entity_api + "/" + beanRequestProducto.operation + parameters_pagination,
        type: beanRequestProducto.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        console.log(beanCrudResponse);
        $('#modalCargandoProducto').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                if (beanRequestProducto.operation == "add") {
                    limpiarInput();
                }

                showAlertTopEnd('success', 'Acción realizada exitosamente');

            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationProducto = beanCrudResponse.beanPagination;
            toListProducto(beanPaginationProducto);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoProducto').modal("hide");
        showAlertErrorRequest();

    });
}

function toListProducto(beanPagination) {
    document.querySelector("#tbodyProducto").innerHTML = "";
    document.querySelector("#titleManagerProducto").innerHTML = "[ " + beanPagination.count_filter + " ] PRODUCTOS";
    if (beanPagination.count_filter > 0) {
        let row;
        row =
            `
               <div class="dt-widget__item border-success bg-primary text-white mb-0 ">
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           CÓDIGO
                        </p>
                    </div>
                    <!-- /widget info -->
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
                           CATEGORÍA
                        </p>
                    </div>
                    <!-- /widget info -->
                </div>
            `;
        document.querySelector("#tbodyProducto").innerHTML += row;
        beanPagination.list.forEach(producto => {
            row =
                `
                 <div class="dt-widget__item border-success m-o pt-1 pb-1">
                   
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           ${producto.codigo}
                        </p>
                    </div>
                    <!-- /widget info -->
                 <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           ${producto.nombre}
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           ${producto.categoria.nombre}
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Extra -->
                    <div class="dt-widget__extra">
                    <div class="dt-task">
                    <div class="dt-task__redirect">
                            <!-- Action Button Group -->
                            <div class="action-btn-group">
                                <button class="btn btn-default text-primary dt-fab-btn editar-producto" idproducto='${producto.idproducto}' title="Editar" data-toggle="tooltip">
                                    <i class="icon icon-editors"></i>
                                </button>
                                <button class="btn btn-default text-danger dt-fab-btn eliminar-producto" idproducto='${producto.idproducto}' title="Eliminar" data-toggle="tooltip">
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
            document.querySelector("#tbodyProducto").innerHTML += row;
            $('[data-toggle="tooltip"]').tooltip();
        });
        buildPagination(
            beanPagination.count_filter,
            parseInt(document.querySelector("#sizePageProducto").value),
            document.querySelector("#pageProducto"),
            $('#modalCargandoProducto'),
            $('#paginationProducto'));
        addEventsProductoes();


    } else {
        destroyPagination($('#paginationProducto'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
    }
}

function addEventsProductoes() {
    document.querySelectorAll('.editar-producto').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            productoSelected = findByProducto(btn.getAttribute('idproducto'));
            if (productoSelected != undefined) {
                beanRequestProducto.operation = "update";
                beanRequestProducto.type_request = "PUT";
                //SET VALUES MODAL
                document.querySelector("#txtCodigoProducto").value = productoSelected.codigo;
                document.querySelector("#txtNombreProducto").value = productoSelected.nombre;
                document.querySelector("#txtCantidadProducto").value = productoSelected.cant_minima;
                document.querySelector("#txtFactorProducto").value = productoSelected.fac_conversion;
                document.querySelector("#txtEstadoProducto").value = productoSelected.estado;
                document.querySelector("#txtCategoriaProducto").value = productoSelected.categoria.nombre;
                document.querySelector("#txtUnidadMedidaIProducto").value = productoSelected.unidadmedida_ingreso.nombre;
                document.querySelector("#txtUnidadMedidaSProducto").value = productoSelected.unidadmedida_salida.nombre;
                document.querySelector("#txtDescripcionProducto").value = productoSelected.descripcion;
                categoriaSelected = productoSelected.categoria;
                unidadMedidaISelected = productoSelected.unidadmedida_ingreso;
                unidadMedidaSSelected = productoSelected.unidadmedida_salida;
                document.querySelector("#txtTituloModalMan").innerHTML = "EDITAR PRODUCTO";
                //OPEN MODEL
                document.querySelector("#btnListaProducto").style.display = 'none';
                document.querySelector("#btnOpenProducto").style.display = 'block';
                document.querySelector("#txtCodigoProducto").focus();
            } else {
                showAlertTopEnd('warning', 'No se encontró el Producto para poder editar');
            }
        };
    });
    document.querySelectorAll('.eliminar-producto').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            productoSelected = findByProducto(btn.getAttribute('idproducto'));
            beanRequestProducto.operation = "delete";
            beanRequestProducto.type_request = "DELETE";
            processAjaxProducto();
        };
    });
}

function findByProducto(idproducto) {
    let producto_;
    beanPaginationProducto.list.forEach(producto => {
        if (idproducto == producto.idproducto) {
            producto_ = producto;
            return;
        }
    });
    return producto_;
}

function validateFormProducto() {

    if (document.querySelector("#txtCodigoProducto").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Código');
        document.querySelector("#txtCodigoProducto").focus();
        return false;
    } else if (document.querySelector("#txtNombreProducto").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Nombre');
        document.querySelector("#txtNombreProducto").focus();
        return false;
    } else if (document.querySelector("#txtCantidadProducto").value.match(/^[0-9]+$/) == null) {
        showAlertTopEnd('warning', 'Por favor ingrese Cantidad');
        document.querySelector("#txtCantidadProducto").focus();
        return false;
    } else if (document.querySelector("#txtFactorProducto").value.match(/^[0-9.]+$/) == null) {
        showAlertTopEnd('warning', 'Por favor ingrese Factor de conversión');
        document.querySelector("#txtFactorProducto").focus();
        return false;
    } else if (document.querySelector("#txtEstadoProducto").value == "-1") {
        showAlertTopEnd('warning', 'Por favor ingrese Estado');
        document.querySelector("#txtEstadoProducto").focus();
        return false;
    } else if (categoriaSelected == undefined) {
        showAlertTopEnd('warning', 'Por favor ingrese Categoría');
        return false;
    } else if (unidadMedidaISelected == undefined) {
        showAlertTopEnd('warning', 'Por favor ingrese Unidad de medida de Ingreso');
        return false;
    } else if (unidadMedidaSSelected == undefined) {
        showAlertTopEnd('warning', 'Por favor ingrese Unidad de medida de Salida');
        return false;
    }
    return true;
}

function limpiarInput() {
    document.querySelector("#txtCodigoProducto").value = "";
    document.querySelector("#txtNombreProducto").value = "";
    document.querySelector("#txtCantidadProducto").value = "5";
    document.querySelector("#txtFactorProducto").value = "1";
    document.querySelector("#txtEstadoProducto").value = "1";
    document.querySelector("#txtCategoriaProducto").value = "";
    document.querySelector("#txtUnidadMedidaIProducto").value = "";
    document.querySelector("#txtUnidadMedidaSProducto").value = "";
    document.querySelector("#txtDescripcionProducto").value = "";
    categoriaSelected = undefined;
    unidadMedidaISelected = undefined;
    unidadMedidaSSelected = undefined;
}

