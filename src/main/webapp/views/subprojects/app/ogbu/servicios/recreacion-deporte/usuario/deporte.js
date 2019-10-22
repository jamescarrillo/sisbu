var deporteSelected;
var deporteDetalleSelected;
var beanPaginationDetalleDeporte;
var beanRequestProcedimientoDeporte = new BeanRequest();
document.addEventListener("DOMContentLoaded", function () {


    //DEPORTE
    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestProcedimientoDeporte.entity_api = "api/detalle-deportes";
    beanRequestProcedimientoDeporte.operation = "paginate";
    beanRequestProcedimientoDeporte.type_request = "GET";



    $('#FrmDeporteDetalleModal').submit(function (event) {

        if (validarProcedimientoDeporte()) {
            $('#modalCargandoDeporteDetalle').modal('show');
        }
        event.preventDefault();
        event.stopPropagation();


    });

    $("#modalCargandoDeporteDetalle").on('shown.bs.modal', function () {
        processAjaxProcedimientoDeporte();
    });
    $("#sizePageDeporteDetalle").change(function () {
        $('#modalCargandoDeporteDetalle').modal('show');
    });
    document.querySelector("#btnOpenDeporteDetalle").onclick = function () {

        beanRequestProcedimientoDeporte.operation = "add";
        beanRequestProcedimientoDeporte.type_request = "POST";
        document.querySelector("#tittleDeporteDetalle").innerHTML = "AGREGAR DEPORTE";
        document.querySelector("#txtEstadoDeporteDetalle").value = "-1";
        document.querySelector("#txtDeporteDetalle").value = "";
        deporteSelected = null;
        document.querySelector("#OpenListaDeporteDetalle").classList.remove("active");
        document.querySelector("#OpenDeporteDetalle").classList.add("active");
        $('[data-toggle="popover"]').popover();

    };
    document.querySelector("#buttonFiliacion").onclick = function () {
        document.querySelector("#buttonDeporte").classList.remove("active");
        document.querySelector("#OpenListaDeporteDetalle").classList.remove("active");
        document.querySelector("#OpenDeporteDetalle").classList.remove("active");

        document.querySelector("#buttonAficion").classList.remove("active");
        document.querySelector("#OpenListaAficionDetalle").classList.remove("active");
        document.querySelector("#OpenAficionDetalle").classList.remove("active");
        document.querySelector("#OpenListaAficionDetalle").classList.remove("active");

        document.querySelector("#buttonFiliacion").classList.add("active");
        document.querySelector("#tab-pane-15").classList.add("active");


    };
    document.querySelector("#buttonDeporte").onclick = function () {
        beanRequestProcedimientoDeporte.operation = "paginate";
        beanRequestProcedimientoDeporte.type_request = "GET";
        $('#modalCargandoDeporteDetalle').modal('show');

    };

    document.querySelector("#btnCancelarDeporteUsuario").onclick = function () {
        beanRequestProcedimientoDeporte.operation = "paginate";
        beanRequestProcedimientoDeporte.type_request = "GET";
        $('#modalCargandoDeporteDetalle').modal('show');

    };

});
function processAjaxProcedimientoDeporte() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestProcedimientoDeporte.operation == "paginate") {
        parameters_pagination += "?idusuario=" + usuarioSelected.usuario.idusuario;
        parameters_pagination += "&page=" + document.querySelector("#pageDeporteDetalle").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePageDeporteDetalle").value;

    } else {
        parameters_pagination = "";
        if (beanRequestProcedimientoDeporte.operation == "delete") {
            parameters_pagination = "/" + deporteDetalleSelected.idrelacion;
           
        } else {
            json = {
                "estado": document.querySelector("#txtEstadoDeporteDetalle").value,
                "deporte": {"iddeporte": deporteSelected.iddeporte},
                "atendido": {
                    "usuario": {"idusuario": usuarioSelected.usuario.idusuario}
                }
            };
            if (beanRequestProcedimientoDeporte.operation == "update") {
                json.idrelacion = deporteDetalleSelected.idrelacion;
                json.atendido.idatendido = deporteDetalleSelected.atendido.idatendido;
            }
        }
    }
    $.ajax({
        url: getHostAPI() + beanRequestProcedimientoDeporte.entity_api + "/" + beanRequestProcedimientoDeporte.operation + parameters_pagination,
        type: beanRequestProcedimientoDeporte.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        console.log(beanCrudResponse);
        $('#modalCargandoDeporteDetalle').modal("hide");
        if (beanRequestProcedimientoDeporte.operation == "add") {
            document.querySelector("#txtEstadoDeporteDetalle").value = "-1";
            document.querySelector("#txtDeporteDetalle").value = "";
            deporteSelected = null;
        }
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
                $('#ventanaModalAficion').modal('hide');
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {


            beanPaginationDeporte = beanCrudResponse.beanPagination;
            beanPaginationDetalleDeporte = beanPaginationDeporte;
            toListProcedimientoDeporte(beanPaginationDeporte);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoDeporte').modal("hide");
        showAlertErrorRequest();

    });
}

function toListProcedimientoDeporte(beanPagination) {
    document.querySelector("#ListaUsuario").style.display = "none";
    document.querySelector("#OpenAficionDetalle").classList.remove("active");
    document.querySelector("#OpenDeporteDetalle").classList.remove("active");
    document.querySelector("#buttonAficion").classList.remove("active");
    document.querySelector("#buttonFiliacion").classList.remove("active");
    document.querySelector("#tab-pane-15").classList.remove("active");
    document.querySelector("#buttonDeporte").classList.add("active");
    document.querySelector("#OpenListaDeporteDetalle").classList.add("active");
    document.querySelector("#openUsuario").style.display = "initial";
    document.querySelector("#tbodyDeporte").innerHTML = "";
    if (beanPagination.count_filter > 0) {

        let row;
        row =
                `
               <div class="dt-widget__item border-success bg-primary text-white pl-5 mb-0 pb-2"">
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate pl-5" >
                        <p class="mb-0 text-truncate ">
                           DEPORTE
                        </p>
                    </div>
                    <!-- /widget info -->
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate" >
                        <p class="mb-0 text-truncate ">
                         ESTADO
                        </p>
                    </div>
                    <!-- /widget info -->
                    
                </div>
            `;
        document.querySelector("#tbodyDeporte").innerHTML += row;
        beanPagination.list.forEach(detalle => {

            row =
                    `
                 <div class="dt-widget__item border-success pl-5 ">
                    <!-- Widget Extra -->
                    <div class="dt-widget__extra text-right">
                      
                        <!-- Hide Content -->
                        <div class="hide-content pr-2"">
                            <!-- Action Button Group -->
                            <div class="action-btn-group">
                                <button class="btn btn-default text-primary dt-fab-btn editar-deporte-detalle" idrelacion='${detalle.idrelacion}' title="Editar" data-toggle="tooltip">
                                    <i class="icon icon-editors"></i>
                                </button>
                                <button class="btn btn-default text-danger dt-fab-btn eliminar-deporte-detalle" idrelacion='${detalle.idrelacion}' title="Eliminar" data-toggle="tooltip">
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
                           ${detalle.deporte.nombre}
                        </p>
                    </div>
                    <!-- /widget info -->
                   
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate" >
                        <p class="mb-0 text-truncate ">
                           ${estadoGeneralDeporte(detalle.estado)}
                        </p>
                    </div>
                    <!-- /widget info -->
                    
                </div>
            `;
            document.querySelector("#tbodyDeporte").innerHTML += row;
            $('[data-toggle="tooltip"]').tooltip();
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageDeporteDetalle").value),
                document.querySelector("#pageDeporteDetalle"),
                $('#modalCargandoDeporteDetalle'),
                $('#paginationDeporteDetalle'));
        addEventsProcedimientoDeporte();


    } else {
        destroyPagination($('#paginationAficion'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
    }
}

function addEventsProcedimientoDeporte() {
    document.querySelectorAll(".editar-deporte-detalle").forEach(btn => {
        btn.onclick = function () {
            deporteDetalleSelected = findDetalleDeporteForId(btn.getAttribute('idrelacion'));
            if (deporteDetalleSelected != undefined) {
                beanRequestProcedimientoDeporte.operation = "update";
                beanRequestProcedimientoDeporte.type_request = "PUT";
                document.querySelector("#tittleDeporteDetalle").innerHTML = "EDITAR DEPORTE";
                document.querySelector("#txtEstadoDeporteDetalle").value = deporteDetalleSelected.estado;
                document.querySelector("#txtDeporteDetalle").value = deporteDetalleSelected.deporte.nombre;
                deporteSelected = deporteDetalleSelected.deporte;

                document.querySelector("#OpenListaDeporteDetalle").classList.remove("active");
                document.querySelector("#OpenDeporteDetalle").classList.add("active");
                $('[data-toggle="popover"]').popover();
            } else {
                showAlertTopEnd('warning', 'No se encontró la evaluación para poder realizarlo. Vuelva a iniciar sesión');
            }
        };
    });
    document.querySelectorAll(".eliminar-deporte-detalle").forEach(btn => {
        btn.onclick = function () {
            deporteDetalleSelected = findDetalleDeporteForId(btn.getAttribute('idrelacion'));
            if (deporteDetalleSelected != undefined) {
                beanRequestProcedimientoDeporte.operation = "delete";
                beanRequestProcedimientoDeporte.type_request = "DELETE";
                $('#modalCargandoDeporteDetalle').modal("show");
            } else {
                showAlertTopEnd('warning', 'No se encontró la evaluación para poder realizarlo. Vuelva a iniciar sesión');
            }
        };
    });
}

function validarProcedimientoDeporte() {
    if (document.querySelector("#txtEstadoDeporteDetalle").value == "-1") {
        showAlertTopEnd('warning', 'Por favor ingrese Estado');
        document.querySelector("#txtEstadoDeporteDetalle").focus();
        return false;
    } else if (document.querySelector("#txtDeporteDetalle").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Deporte ');
        document.querySelector("#txtDeporteDetalle").focus();
        return false;
    }
    return true;
}

function findDetalleDeporteForId(idrelacion) {
    let Deporte_;
    beanPaginationDetalleDeporte.list.forEach(Deporte => {
        if (idrelacion == Deporte.idrelacion) {
            Deporte_ = Deporte;
            return;
        }
    });
    return Deporte_;
}