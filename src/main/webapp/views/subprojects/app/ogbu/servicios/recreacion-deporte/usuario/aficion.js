
//AFICION
var aficionSelected;
var aficionDetalleSelected;
var beanPaginationDetalleAficion;
var beanRequestProcedimientoAficion = new BeanRequest();
document.addEventListener("DOMContentLoaded", function () {

    //  AFICION
    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestProcedimientoAficion.entity_api = "api/detalle-aficiones";
    beanRequestProcedimientoAficion.operation = "paginate";
    beanRequestProcedimientoAficion.type_request = "GET";


    $("#sizePageAficionDetalle").change(function () {
        $('#modalCargandoAficionDetalle').modal('show');
    });

    $('#FrmAficionDetalleModal').submit(function (event) {
        if (validarProcedimientoAficion()) {
            $('#modalCargandoAficionDetalle').modal('show');
        }
        event.preventDefault();
        event.stopPropagation();


    });

    $("#modalCargandoAficionDetalle").on('shown.bs.modal', function () {
        processAjaxProcedimientoAficion();
    });

    document.querySelector("#btnOpenAficionDetalle").onclick = function () {
        beanRequestProcedimientoAficion.operation = "add";
        beanRequestProcedimientoAficion.type_request = "POST";
        document.querySelector("#tittleAficionDetalle").innerHTML = "AGREGAR AFICIÓN";
        document.querySelector("#txtEstadoAficionDetalle").value = "-1";
        document.querySelector("#txtAficionDetalle").value = "";
        aficionSelected = null;
        document.querySelector("#OpenListaAficionDetalle").classList.remove("active");
        document.querySelector("#OpenAficionDetalle").classList.add("active");
        $('[data-toggle="popover"]').popover();

    };

    document.querySelector("#buttonAficion").onclick = function () {
        beanRequestProcedimientoAficion.operation = "paginate";
        beanRequestProcedimientoAficion.type_request = "GET";
        $('#modalCargandoAficionDetalle').modal('show');

    };
    document.querySelector("#btnCancelarAficionUsuario").onclick = function () {
        beanRequestProcedimientoAficion.operation = "paginate";
        beanRequestProcedimientoAficion.type_request = "GET";
        $('#modalCargandoAficionDetalle').modal('show');

    };



});
//AFICION

function processAjaxProcedimientoAficion() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestProcedimientoAficion.operation == "paginate") {
        parameters_pagination += "?idusuario=" + usuarioSelected.usuario.idusuario;
        parameters_pagination += "&page=" + document.querySelector("#pageAficionDetalle").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePageAficionDetalle").value;

    } else {
        parameters_pagination = "";
        if (beanRequestProcedimientoAficion.operation == "delete") {
            parameters_pagination = "/" + aficionDetalleSelected.idrelacion;

        } else {
            json = {
                "estado": document.querySelector("#txtEstadoAficionDetalle").value,
                "aficion": { "idaficion": aficionSelected.idaficion },
                "atendido": {
                    "usuario": { "idusuario": usuarioSelected.usuario.idusuario }
                }
            };
            if (beanRequestProcedimientoAficion.operation == "update") {
                json.idrelacion = aficionDetalleSelected.idrelacion;
                json.atendido.idatendido = aficionDetalleSelected.atendido.idatendido;
            }
        }
    }
    $.ajax({
        url: getHostAPI() + beanRequestProcedimientoAficion.entity_api + "/" + beanRequestProcedimientoAficion.operation + parameters_pagination,
        type: beanRequestProcedimientoAficion.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoAficionDetalle').modal("hide");
        if (beanRequestProcedimientoAficion.operation == "add") {
            document.querySelector("#txtEstadoAficionDetalle").value = "-1";
            document.querySelector("#txtAficionDetalle").value = "";
            aficionSelected = null;
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
            beanPaginationAficion = beanCrudResponse.beanPagination;
            beanPaginationDetalleAficion = beanPaginationAficion;
            toListProcedimientoAficion(beanPaginationAficion);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoDeporte').modal("hide");
        showAlertErrorRequest();

    });
}

function toListProcedimientoAficion(beanPagination) {
    document.querySelector("#ListaUsuario").style.display = "none";
    document.querySelector("#buttonDeporte").classList.remove("active");
    document.querySelector("#OpenDeporteDetalle").classList.remove("active");
    document.querySelector("#OpenAficionDetalle").classList.remove("active");
    document.querySelector("#buttonFiliacion").classList.remove("active");
    document.querySelector("#tab-pane-15").classList.remove("active");
    document.querySelector("#buttonAficion").classList.add("active");
    document.querySelector("#OpenListaAficionDetalle").classList.add("active");
    document.querySelector("#tbodyAficion").innerHTML = "";
    document.querySelector("#openUsuario").style.display = "initial";
    if (beanPagination.count_filter > 0) {

        let row;
        row =
            `
               <div class="dt-widget__item border-success bg-primary text-white mb-0 pb-2">
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
        document.querySelector("#tbodyAficion").innerHTML += row;
        beanPagination.list.forEach(detalle => {

            row =
                `
                 <div class="dt-widget__item m-0 pt-1 pb-1">
                    <!-- Widget Info -->
                    <div class="dt-widget__info text-truncate " >
                        <p class="mb-0 text-truncate ">
                           ${detalle.aficion.descripcion}
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
                    <!-- Widget Extra -->
                    <div class="dt-widget__extra">
                        <div class="dt-task">
                        <div class="dt-task__redirect">
                            <!-- Action Button Group -->
                            <div class="action-btn-group">
                            <button class="btn btn-default text-primary dt-fab-btn editar-aficion-detalle" idrelacion='${detalle.idrelacion}' title="Editar" data-toggle="tooltip">
                            <i class="icon icon-editors"></i>
                        </button>
                        <button class="btn btn-default text-danger dt-fab-btn eliminar-aficion-detalle" idrelacion='${detalle.idrelacion}' title="Eliminar" data-toggle="tooltip">
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
            parseInt(document.querySelector("#sizePageAficionDetalle").value),
            document.querySelector("#pageAficionDetalle"),
            $('#modalCargandoAficionDetalle'),
            $('#paginationAficionDetalle'));
        addEventsProcedimientoAficion();


    } else {
        destroyPagination($('#paginationAficion'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
    }
}

function addEventsProcedimientoAficion() {
    document.querySelectorAll(".editar-aficion-detalle").forEach(btn => {
        btn.onclick = function () {
            aficionDetalleSelected = findDetalleAficionForId(btn.getAttribute('idrelacion'));
            if (aficionDetalleSelected != undefined) {
                beanRequestProcedimientoAficion.operation = "update";
                beanRequestProcedimientoAficion.type_request = "PUT";
                document.querySelector("#tittleAficionDetalle").innerHTML = "EDITAR AFICIÓN";
                document.querySelector("#txtEstadoAficionDetalle").value = aficionDetalleSelected.estado;
                document.querySelector("#txtAficionDetalle").value = aficionDetalleSelected.aficion.descripcion;
                aficionSelected = aficionDetalleSelected.aficion;
                document.querySelector("#OpenListaAficionDetalle").classList.remove("active");
                document.querySelector("#OpenAficionDetalle").classList.add("active");
                $('[data-toggle="popover"]').popover();
            } else {
                showAlertTopEnd('warning', 'No se encontró la evaluación para poder realizarlo. Vuelva a iniciar sesión');
            }
        };
    });
    document.querySelectorAll(".eliminar-aficion-detalle").forEach(btn => {
        btn.onclick = function () {
            aficionDetalleSelected = findDetalleAficionForId(btn.getAttribute('idrelacion'));
            if (aficionDetalleSelected != undefined) {
                beanRequestProcedimientoAficion.operation = "delete";
                beanRequestProcedimientoAficion.type_request = "DELETE";
                $('#modalCargandoAficionDetalle').modal("show");
            } else {
                showAlertTopEnd('warning', 'No se encontró la evaluación para poder realizarlo. Vuelva a iniciar sesión');
            }
        };
    });
}

function validarProcedimientoAficion() {
    if (document.querySelector("#txtEstadoAficionDetalle").value == "-1") {
        showAlertTopEnd('warning', 'Por favor ingrese Estado');
        document.querySelector("#txtEstadoAficionDetalle").focus();
        return false;
    } else if (document.querySelector("#txtAficionDetalle").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese Afcion ');
        document.querySelector("#txtAficionDetalle").focus();
        return false;
    }
    return true;
}

function findDetalleAficionForId(idrelacion) {
    let Aficion_;
    beanPaginationDetalleAficion.list.forEach(Aficion => {
        if (idrelacion == Aficion.idrelacion) {
            Aficion_ = Aficion;
            return;
        }
    });
    return Aficion_;
}

function estadoGeneralDeporte(idestado) {
    switch (idestado) {
        case 1:
            return 'LO PRACTICO';
            break;
        case 2:
            return 'ME GUSTARÍA APRENDER';
            break;

        default:
            return '';
            break;
    }
}

