var beanPaginationDetalleEntrada;
var DetalleEntradaSelected;
var beanRequestDetalleEntrada = new BeanRequest();
var ObjectTemporal;
var contadorObject = 0;
var ProductoSelected;
document.addEventListener("DOMContentLoaded", function () {

    document.querySelector("#btnAgregarProducto").onclick = function () {
        if (validateFormDetalleEntrada()) {
            ObjectDetalleEntrada = new DetalleEntrada();
            ObjectDetalleEntrada.iddetalle_entrada = contadorObject++;

            ObjectDetalleEntrada.entrada = new Entrada(document.querySelector("#txtFechaEntrada").value);
            ObjectDetalleEntrada.entrada.personal = new Personal(PersonalSelected.idpersonal);
            ObjectDetalleEntrada.presentacion = new Presentacion(document.querySelector("#txtFechaVencimientoEntrada").value, document.querySelector("#txtCantidadProducto").value);
            ObjectDetalleEntrada.presentacion.producto = new Producto(ProductoSelected.idproducto, ProductoSelected.nombre);
            ObjectDetalleEntrada.cantidad = document.querySelector("#txtCantidadProducto").value;
            listDetalleEntrada.push(ObjectDetalleEntrada);
            toListDetalleEntrada(listDetalleEntrada);
            limpiarInput();

        }
    };

});


function toListDetalleEntrada(beanPagination) {
    document.querySelector("#tbodyDetalleEntrada").innerHTML = "";
    let row;
    row =
        `
           <div class="dt-widget__item border-success bg-primary text-white mb-0 ">
                <!-- Widget Info -->
                <div class="dt-widget__info text-truncate " >
                    <p class="mb-0 text-truncate ">
                       Fecha de Vencimiento
                    </p>
                </div>
                <!-- /widget info -->
                <!-- Widget Info -->
              <div class="dt-widget__info text-truncate ">
                <p class="mb-0 text-truncate ">
                  Producto
                </p>
              </div>
              <!-- /widget info -->
                <!-- Widget Info -->
                <div class="dt-widget__info text-truncate " >
                    <p class="mb-0 text-truncate ">
                       Cantidad
                    </p>
                </div>
                <!-- /widget info -->
            </div>
        `;
    document.querySelector("#tbodyDetalleEntrada").innerHTML += row;
    if (beanPagination.length == 0) {
        destroyPagination($('#paginationDetalleEntrada'));
        return;
    }

    beanPagination.forEach(DetalleEntrada => {
        row =
            `
                <div class="dt-widget__item m-0 pt-1 pb-1">
                   
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           ${DetalleEntrada.presentacion.fecha_vencimiento}
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           ${DetalleEntrada.presentacion.producto.nombre}
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           ${DetalleEntrada.cantidad}
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Extra -->
                    <div class="dt-widget__extra">
                         <div class="dt-task">
                            <!-- Action Button Group -->
                            <div class="action-btn-group">
                                <button type="button" class="btn btn-default text-danger dt-fab-btn eliminar-DetalleEntrada" idDetalleEntrada='${DetalleEntrada.iddetalle_entrada}' title="Eliminar" data-toggle="tooltip">
                                    <i class="icon icon-trash-filled"></i>
                                </button>
                              
                            </div>
                            <!-- /action button group -->
                        </div>
                        <!-- /hide content -->
                    </div>
                    <!-- /widget extra -->
                </div>
            `;
        document.querySelector("#tbodyDetalleEntrada").innerHTML += row;
        $('[data-toggle="tooltip"]').tooltip();
    });
    addEventsDetalleEntrada();
    /* buildPagination(
             beanPagination.count_filter,
             parseInt(document.querySelector("#sizePageDetalleEntrada").value),
             document.querySelector("#pageDetalleEntrada"),
             $('#modalCargandoDetalleEntrada'),
             $('#paginationDetalleEntrada'));
  */



}

function addEventsDetalleEntrada() {

    document.querySelectorAll('.eliminar-DetalleEntrada').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            DetalleEntradaSelected = findByDetalleEntrada(btn.getAttribute('idDetalleEntrada'));
            ObjectTemporal = listDetalleEntrada.filter(function (obj) {
                if (findByDetalleEntrada(obj.iddetalle_entrada).iddetalle_entrada != DetalleEntradaSelected.iddetalle_entrada) {
                    return obj;
                } else {

                    return undefined;
                }


            });
            listDetalleEntrada.length = 0;
            listDetalleEntrada = ObjectTemporal;
            toListDetalleEntrada(listDetalleEntrada);
        };
    });
}

function findByDetalleEntrada(idDetalleEntrada) {
    let DetalleEntrada_;
    listDetalleEntrada.forEach(DetalleEntrada => {

        if (idDetalleEntrada == DetalleEntrada.iddetalle_entrada) {
            DetalleEntrada_ = DetalleEntrada;
            return;
        }
    });
    return DetalleEntrada_;
}

function validateFormDetalleEntrada() {
    if (document.querySelector("#txtFechaEntrada").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Fecha');
        document.querySelector("#txtFechaEntrada").focus();
        return false;
    } else if (PersonalSelected == undefined) {
        showAlertTopEnd('warning', 'Por favor ingrese Personal');
        document.querySelector("#txtPersonalEntrada").focus();
        return false;
    } else if (document.querySelector("#txtCantidadProducto").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese la cantidad');
        document.querySelector("#txtCantidadProducto").focus();
        return false;
    } else if (ProductoSelected == undefined) {
        showAlertTopEnd('warning', 'Por favor ingrese Producto');
        document.querySelector("#txtProductoEntrada").focus();
        return false;
    } else if (document.querySelector("#txtFechaVencimientoEntrada").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Fecha de Vencimiento');
        document.querySelector("#txtFechaVencimientoEntrada").focus();
        return false;
    }

    return true;
}

function limpiarInput() {
    document.querySelector("#txtCantidadProducto").value = "";
    document.querySelector("#txtFechaVencimientoEntrada").value = "";
    document.querySelector("#txtProductoEntrada").value = "";
    ProductoSelected = undefined;
}

