var beanPaginationDetalleSalida;
var DetalleSalidaSelected;
var beanRequestDetalleSalida = new BeanRequest();
var ObjectTemporal;
var contadorObject = 0;
var PresentacionSelected;
document.addEventListener("DOMContentLoaded", function () {

    document.querySelector("#btnAgregarPresentacion").onclick = function () {
        if (validateFormDetalleSalida()) {
            ObjectDetalleSalida = new DetalleSalida();
            ObjectDetalleSalida.iddetalle_salida = contadorObject++;
            ObjectDetalleSalida.salida = new Salida(document.querySelector("#txtFechaSalida").value, new Personal(PersonalSelected.idpersonal), new Diagnostico(diagnosticoSelected.iddiagnostico));
            ObjectDetalleSalida.presentacion = new Presentacion(PresentacionSelected.idpresentacion, PresentacionSelected.fecha_vencimiento, PresentacionSelected.existencia - document.querySelector("#txtCantidadPresentacion").value, PresentacionSelected.producto);
            ObjectDetalleSalida.cantidad = document.querySelector("#txtCantidadPresentacion").value;
            listDetalleSalida.push(ObjectDetalleSalida);
            toListDetalleSalida(listDetalleSalida);
            limpiarInput();

        }
    };

});


function toListDetalleSalida(beanPagination) {
    document.querySelector("#tbodyDetalleSalida").innerHTML = "";
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
              <div class="dt-widget__info text-truncate  text-center">
                <p class="mb-0 text-truncate ">
                  Producto
                </p>
              </div>
              <!-- /widget info -->
                <!-- Widget Info -->
                <div class="dt-widget__info text-truncate  text-center" >
                    <p class="mb-0 text-truncate ">
                       Cantidad
                    </p>
                </div>
                <!-- /widget info -->
                <!-- Widget Extra -->
                    <div class="dt-widget__extra">
                         <div class="dt-task">
                        </div>
                        <!-- /hide content -->
                    </div>
                <!-- /widget extra -->
            </div>
        `;
    document.querySelector("#tbodyDetalleSalida").innerHTML += row;
    if (beanPagination.length == 0) {
        destroyPagination($('#paginationDetalleSalida'));
        return;
    }

    beanPagination.forEach(DetalleSalida => {
        row =
            `
                <div class="dt-widget__item m-0 pt-1 pb-1">
                   
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           ${DetalleSalida.presentacion.fecha_vencimiento}
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate text-center" >
                        <p class="mb-0 text-truncate ">
                           ${DetalleSalida.presentacion.producto.nombre}
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate  text-center" >
                        <p class="mb-0 text-truncate ">
                           ${DetalleSalida.cantidad}
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Extra -->
                    <div class="dt-widget__extra">
                         <div class="dt-task">
                            <!-- Action Button Group -->
                            <div class="action-btn-group">
                                <button type="button" class="btn btn-default text-danger dt-fab-btn eliminar-DetalleSalida" idDetalleSalida='${DetalleSalida.iddetalle_salida}' title="Eliminar" data-toggle="tooltip">
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
        document.querySelector("#tbodyDetalleSalida").innerHTML += row;
        $('[data-toggle="tooltip"]').tooltip();
    });
    addEventsDetalleSalida();
    /* buildPagination(
             beanPagination.count_filter,
             parseInt(document.querySelector("#sizePageDetalleSalida").value),
             document.querySelector("#pageDetalleSalida"),
             $('#modalCargandoDetalleSalida'),
             $('#paginationDetalleSalida'));
  */



}

function addEventsDetalleSalida() {

    document.querySelectorAll('.eliminar-DetalleSalida').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            DetalleSalidaSelected = findByDetalleSalida(btn.getAttribute('idDetalleSalida'));
            ObjectTemporal = listDetalleSalida.filter(function (obj) {
                if (findByDetalleSalida(obj.iddetalle_salida).iddetalle_salida != DetalleSalidaSelected.iddetalle_salida) {
                    return obj;
                } else {

                    return undefined;
                }


            });
            listDetalleSalida.length = 0;
            listDetalleSalida = ObjectTemporal;
            toListDetalleSalida(listDetalleSalida);
        };
    });
}

function findByDetalleSalida(idDetalleSalida) {
    let DetalleSalida_;
    listDetalleSalida.forEach(DetalleSalida => {

        if (idDetalleSalida == DetalleSalida.iddetalle_salida) {
            DetalleSalida_ = DetalleSalida;
            return;
        }
    });
    return DetalleSalida_;
}

function validateFormDetalleSalida() {
    if (document.querySelector("#txtFechaSalida").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Fecha');
        document.querySelector("#txtFechaSalida").focus();
        return false;
    } if (PersonalSelected == undefined) {
        showAlertTopEnd('warning', 'Por favor ingrese Personal');
        document.querySelector("#txtPersonalSalida").focus();
        return false;
    } if (document.querySelector("#txtCantidadPresentacion").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese la cantidad');
        document.querySelector("#txtCantidadPresentacion").focus();
        return false;
    }

    if (PresentacionSelected.existencia < parseInt(document.querySelector("#txtCantidadPresentacion").value)) {
        showAlertTopEnd('warning', 'La cantidad ingresada es superior al stock del producto');
        document.querySelector("#txtCantidadPresentacion").focus();
        return false;
    }
    if (PresentacionSelected == undefined) {
        showAlertTopEnd('warning', 'Por favor ingrese Presentacion');
        document.querySelector("#txtPresentacionSalida").focus();
        return false;
    }

    return true;
}

function limpiarInput() {
    document.querySelector("#txtCantidadPresentacion").value = "";

    document.querySelector("#txtPresentacionSalida").value = "";
    PresentacionSelected = undefined;
}

