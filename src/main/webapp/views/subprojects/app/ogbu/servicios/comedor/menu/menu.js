var beanPaginationMenuSemanal;
var beanPaginationComida;
var tipoDiaComida;
var listSelect;
var fechaActual; //Fecha actual
var comidaSelected, detalleCronogramaSelected;
var Dia_semana;
var beanRequestMenuSemanal = new BeanRequest();
document.addEventListener("DOMContentLoaded", function () {

    $('#txtMenuSemanalFechaI').bootstrapMaterialDatePicker({
        weekStart: 0,
        time: false,
        format: 'DD/MM/YYYY',
        lang: 'es'
    }).on('change', function (e, date) {
    });

    document.querySelector('#btnEliminarFechaI').onclick = function () {
        document.querySelector('#txtFechaI').value = '';
    };
    $('#txtMenuSemanalFechaF').bootstrapMaterialDatePicker({
        weekStart: 0,
        time: false,
        format: 'DD/MM/YYYY',
        lang: 'es'
    }).on('change', function (e, date) {
    });

    document.querySelector('#btnEliminarFechaF').onclick = function () {
        document.querySelector('#txtFechaF').value = '';
    };

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestMenuSemanal.entity_api = "api/menusemanal";
    beanRequestMenuSemanal.operation = "paginate";
    beanRequestMenuSemanal.type_request = "GET";
    document.querySelector("#txtMenuSemanalObservacion").onchange = function () {

        if (document.querySelector("#txtMenuSemanalObservacion").value == "") {
            showAlertTopEnd('warning', "Ingresa Observacion");
            document.querySelector("#txtMenuSemanalObservacion").focus();
        } else {
            document.querySelector("#txtMenuSemanalFechaI").disabled = false;
            document.querySelector("#txtMenuSemanalFechaF").disabled = false;
        }
    };

    document.querySelector("#txtMenuSemanalFechaI").onchange = function () {
        if (beanRequestMenuSemanal.operation == "add") {

            fechaActual = new Date(document.querySelector("#txtMenuSemanalFechaI").value.split("/")[2] + "-" +
                document.querySelector("#txtMenuSemanalFechaI").value.split("/")[1] + "-" +
                document.querySelector("#txtMenuSemanalFechaI").value.split("/")[0]);

            if (fechaActual.getDay() == 0) {
                listDMS.length = 0;
                document.querySelector("#txtMenuSemanalFechaF").value = getDateJava(addDays(fechaActual, 5));

                for (var i = 1; i < 6; i++) {
                    dms = new DetalleCronogramaCu();
                    dms.menu_semanal.fechai = document.querySelector("#txtMenuSemanalFechaI").value;
                    dms.menu_semanal.fechaf = getDateJava(addDays(fechaActual, 5));
                    dms.menu_semanal.observacion = document.querySelector("#txtMenuSemanalObservacion").value;
                    dms.fecha = getDateJava(addDays(fechaActual, i));
                    listDMS.push(dms);

                }
                toListSemanal(listDMS);

            }
        }


    };
    document.querySelector("#txtMenuSemanalFechaF").onchange = function () {
        if (beanRequestMenuSemanal.operation == "add") {

            fechaActual = new Date(document.querySelector("#txtMenuSemanalFechaF").value.split("/")[2] + "-" +
                document.querySelector("#txtMenuSemanalFechaF").value.split("/")[1] + "-" +
                document.querySelector("#txtMenuSemanalFechaF").value.split("/")[0]);

            if (fechaActual.getDay() == 4) {
                listDMS.length = 0;
                document.querySelector("#txtMenuSemanalFechaI").value = getDateJava(addDays(fechaActual, -3));

                fechaActual = new Date(document.querySelector("#txtMenuSemanalFechaI").value.split("/")[2] + "-" +
                    document.querySelector("#txtMenuSemanalFechaI").value.split("/")[1] + "-" +
                    document.querySelector("#txtMenuSemanalFechaI").value.split("/")[0]);

                for (var i = 1; i < 6; i++) {
                    dms = new DetalleCronogramaCu();
                    dms.menu_semanal.fechaf = document.querySelector("#txtMenuSemanalFechaF").value;
                    dms.menu_semanal.fechai = document.querySelector("#txtMenuSemanalFechaI").value;
                    dms.menu_semanal.observacion = document.querySelector("#txtMenuSemanalObservacion").value;
                    dms.fecha = getDateJava(addDays(fechaActual, i));
                    listDMS.push(dms);

                }
                toListSemanal(listDMS);

            }
        }


    };
    $('#FrmMenuSemanal').submit(function (event) {
        beanRequestMenuSemanal.operation = "paginate";
        beanRequestMenuSemanal.type_request = "GET";
        $('#modalCargandoMenuSemanal').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $('#FrmMenuSemanalModal').submit(function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (validateFormMenuSemanal()) {
            $('#modalCargandoMenuSemanal').modal('show');
        }

    });

    document.querySelector("#regresar-central").onclick = function () {
        document.querySelector("#txtMenuSemanalFechaI").disabled = true;
        document.querySelector("#txtMenuSemanalFechaF").disabled = true;

        document.querySelector("#tab-pane-OpenNewMenuSemanal").classList.remove("active");

        document.querySelector("#tab-pane-OpenNewMenuSemanal").style.display = "none";
        document.querySelector("#module-header-content").style.display = "initial";

        vaciarListaSemanal();
        toListSemanal(listDMS);

    };

    document.querySelector("#btnOpenBuscaMenuSemanal").onclick = function () {
        document.querySelector("#txtMenuSemanalFechaI").disabled = false;
        document.querySelector("#txtMenuSemanalFechaF").disabled = false;
        beanRequestMenuSemanal.operation = "paginate";
        beanRequestMenuSemanal.type_request = "GET";
        document.querySelector("#borrarObservacion").style.display = "none";
        document.querySelector("#module-header-content").style.display = "none";
        document.querySelector("#tab-pane-OpenNewMenuSemanal").style.display = "initial";
        document.querySelector("#tab-pane-OpenNewMenuSemanal").classList.add("active");
        document.querySelector("#titleManagerMenu").innerHTML = "BUSCAR MENU SEMANAL";
        document.querySelector("#btnGuardar").innerHTML = '<i class="icon icon-search icon-fw"></i> BUSCAR';
    };

    document.querySelector("#btnOpenNewMenuSemanal").onclick = function () {
        document.querySelector("#txtMenuSemanalFechaI").disabled = false;
        document.querySelector("#txtMenuSemanalFechaF").disabled = false;
        document.querySelector("#borrarObservacion").style.display = "initial";
        document.querySelector("#module-header-content").style.display = "none";
        document.querySelector("#tab-pane-OpenNewMenuSemanal").style.display = "initial";
        document.querySelector("#tab-pane-OpenNewMenuSemanal").classList.add("active");
        //CONFIGURAMOS LA SOLICITUD
        beanRequestMenuSemanal.operation = "add";
        beanRequestMenuSemanal.type_request = "POST";
        //LIMPIAR LOS CAMPOS
        document.querySelector("#titleManagerMenu").innerHTML = "CREAR MENU SEMANAL";
        document.querySelector("#btnGuardar").innerHTML = 'GUARDAR';
        document.querySelector("#tbodyCronograma").innerHTML = "";

    };

    document.querySelector("#buttonAlmuerzo").onclick = function () {

        tipoDiaComida = 1;
        toListComidaTabla(Dia_semana[0], ".tbodyComidaAlmuerzo");
    };

    document.querySelector("#buttonDesayuno").onclick = function () {

        tipoDiaComida = 0;
        toListComidaTabla(Dia_semana[0], ".tbodyComidaAlmuerzo");
    };

    document.querySelector("#buttonCena").onclick = function () {

        tipoDiaComida = 2;
        toListComidaTabla(Dia_semana[0], ".tbodyComidaCena");
    };

    $("#modalCargandoMenuSemanal").on('shown.bs.modal', function () {
        processAjaxMenuSemanal();
    });

    document.querySelector("#btnRegresarMenu").onclick = function () {
        document.querySelector("#OpenComidaDiaria").style.display = "none";
        document.querySelector("#tab-pane-OpenNewMenuSemanal").style.display = "initial";
        toListSemanal(listDMS);
    };
    //LUNES
    document.querySelector("#btnAgregarComida").onclick = function () {
        if (comidaSelected != undefined) {
            document.querySelector("#txtComidaDetalle").value = "";

            listSelect = listDMS.filter(function (obj) {
                if (obj.fecha == Dia_semana[0]["fecha"]) {
                    return obj;
                }
                {
                    return undefined;
                }

            });
            if (comidaSelected.tipo == 1) {
                listSelect[0].comida_dsegundo = comidaSelected;
            } else if (comidaSelected.tipo == 2) {
                listSelect[0].comida_dbebida = comidaSelected;
            } else if (comidaSelected.tipo == 3) {
                listSelect[0].comida_dpostre = comidaSelected;
            }
            toListComidaTabla(listSelect[0], ".tbodyComidaDesayuno");
        } else {
            showAlertTopEnd('warning', 'Selecciona una Comida');
        }

    };

    document.querySelector("#btnAgregarComidaAlmuerzo").onclick = function () {
        if (comidaSelected != undefined) {
            document.querySelector("#txtComidaAlmuerzoDetalle").value = "";
            listSelect = listDMS.filter(function (obj) {
                if (obj.fecha == Dia_semana[0]["fecha"]) {
                    return obj;
                }
                {
                    return undefined;
                }

            });
            if (comidaSelected.tipo == 1) {
                listSelect[0].comida_asegundo = comidaSelected;
            } else if (comidaSelected.tipo == 2) {
                listSelect[0].comida_abebida = comidaSelected;
            } else if (comidaSelected.tipo == 3) {
                listSelect[0].comida_apostre = comidaSelected;
            } else if (comidaSelected.tipo == 4) {
                listSelect[0].comida_asopa = comidaSelected;
            }
            toListComidaTabla(listSelect[0], ".tbodyComidaAlmuerzo");
        } else {
            showAlertTopEnd('warning', 'Selecciona una Comida');
        }

    };
    document.querySelector("#btnAgregarComidaCena").onclick = function () {
        if (comidaSelected != undefined) {
            document.querySelector("#txtComidaCenaDetalle").value = "";
            listSelect = listDMS.filter(function (obj) {
                if (obj.fecha == Dia_semana[0]["fecha"]) {
                    return obj;
                }
                {
                    return undefined;
                }

            });
            if (comidaSelected.tipo == 1) {
                listSelect[0].comida_csegundo = comidaSelected;
            } else if (comidaSelected.tipo == 2) {
                listSelect[0].comida_cbebida = comidaSelected;
            } else if (comidaSelected.tipo == 3) {
                listSelect[0].comida_cpostre = comidaSelected;
            } else if (comidaSelected.tipo == 4) {
                listSelect[0].comida_csopa = comidaSelected;
            }
            toListComidaTabla(listSelect[0], ".tbodyComidaCena");
        } else {
            showAlertTopEnd('warning', 'Selecciona una Comida');
        }

    };

});


function processAjaxMenuSemanal() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestMenuSemanal.operation === "paginate") {
        parameters_pagination = "?fechai=" + document.querySelector("#txtMenuSemanalFechaI").value;
        parameters_pagination += "&fechaf=" + document.querySelector("#txtMenuSemanalFechaF").value;
        parameters_pagination += "&page=1";
        parameters_pagination += "&size=7";
    } else {
        parameters_pagination = "";
        if (beanRequestMenuSemanal.operation === "delete") {
            parameters_pagination = "/" + detalleCronogramaSelected.menu_semanal.idmenu_semanal;
        } else {
            dms = new DetalleCronogramaCu();
            dms.menu_semanal.fechai = document.querySelector("#txtMenuSemanalFechaI").value;
            dms.menu_semanal.fechaf = document.querySelector("#txtMenuSemanalFechaF").value;
            dms.menu_semanal.observacion = document.querySelector("#txtMenuSemanalObservacion").value;
            json = { "list": listDMS };
            json.menu_semanal = dms.menu_semanal;
            if (beanRequestMenuSemanal.operation === "update") {
                json.list.iddetalle_cronogramacu = beanPaginationMenuSemanal.list[0].iddetalle_cronogramacu;
                json.menu_semanal.idmenu_semanal = beanPaginationMenuSemanal.list[0].menu_semanal.idmenu_semanal;
            }
        }
    }
    $.ajax({
        url: getHostAPI() + beanRequestMenuSemanal.entity_api + "/" + beanRequestMenuSemanal.operation + parameters_pagination,
        type: beanRequestMenuSemanal.type_request,
        headers: {
            'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {

        $('#modalCargandoMenuSemanal').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            document.querySelector("#txtMenuSemanalFechaI").disabled = true;
            document.querySelector("#txtMenuSemanalFechaF").disabled = true;
            if (beanCrudResponse.messageServer.toLowerCase() === "ok") {
                if (beanRequestMenuSemanal.operation != "update") {
                    if (beanRequestMenuSemanal.operation == "delete") {
                        document.querySelector("#tab-pane-OpenNewMenuSemanal").classList.remove("active");

                        document.querySelector("#tab-pane-OpenNewMenuSemanal").style.display = "none";
                        document.querySelector("#module-header-content").style.display = "initial";
                    }
                    document.querySelector('#txtMenuSemanalObservacion').value = "";
                    vaciarListaSemanal();
                    toListSemanal(listDMS);
                }
                showAlertTopEnd('success', 'Acción realizada exitosamente');
                $('#ventanaModalMenuSemanal').modal('hide');
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationMenuSemanal = beanCrudResponse.beanPagination;
            listDMS = beanPaginationMenuSemanal.list;
            if (listDMS.length > 0) {
                document.querySelector("#btneliminar-menu").style.display = "initial";
                document.querySelector("#btneliminar-menu").setAttribute("idmenu_semanal", listDMS[0].menu_semanal.idmenu_semanal);
                document.querySelector("#txtMenuSemanalFechaI").disabled = true;
                document.querySelector("#txtMenuSemanalFechaF").disabled = true;
                beanRequestMenuSemanal.operation = "update";
                beanRequestMenuSemanal.type_request = "PUT";
                document.querySelector("#titleManagerMenu").innerHTML = "ACTUALIZAR MENU SEMANAL";
                document.querySelector("#btnGuardar").innerHTML = "ACTUALIZAR";
                document.querySelector("#txtMenuSemanalObservacion").value = listDMS[0].menu_semanal.observacion;
                document.querySelector("#borrarObservacion").style.display = "initial";

                toListSemanal(listDMS);
            } else {
                document.querySelector("#btneliminar-menu").style.display = "none";
                document.querySelector("#borrarObservacion").style.display = "none";
                document.querySelector("#txtMenuSemanalFechaI").disabled = false;
                document.querySelector("#txtMenuSemanalFechaF").disabled = false;
                showAlertTopEnd('warning', 'No se Encontraron Resultados');
                vaciarListaSemanal();
                toListSemanal(listDMS);
            }

        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoMenuSemanal').modal("hide");
        showAlertErrorRequest();

    });
}

function toListSemanal(beanPagination) {
    addClass(document.querySelector("#theadMenuSemanal").parentElement, "dt-widget dt-card dt-social-card border border-w-2 border-light-teal text-light-gray m-0");
    addClass(document.querySelector("#theadMenuSemanal"), "dt-widget__item border");
    document.querySelector("#tbodyCronograma").innerHTML = "";
    let row, head;

    head = '<div class="dt-widget__info " style="max-width:123px;" >';
    head += '<div class="dt-card__title f-14">FECHA';
    head += '</div></div>';
    head += '<div class="dt-widget__info ">';
    head += '<div class="dt-card__title  f-14">DESAYUNO';
    head += '</div></div>';
    head += '<div class="dt-widget__info ">';
    head += '<div class="dt-card__title  f-14">ALMUERZO';
    head += '</div></div>';
    head += '<div class="dt-widget__info ">';
    head += '<div class="dt-card__title  f-14">CENA';
    head += '</div></div>';

    if (beanPagination.length == 0) {
        document.querySelector("#btneliminar-menu").style.display = "none";
        if (beanRequestMenuSemanal.operation == "update") {
            beanRequestMenuSemanal.operation = "paginate";
            beanRequestMenuSemanal.type_request = "GET";
            document.querySelector("#titleManagerMenu").innerHTML = "BUSCAR MENU SEMANAL";
            document.querySelector("#btnGuardar").innerHTML = '<i class="icon icon-search icon-fw"></i> BUSCAR';
        }

        listDMS.length = 0;
        document.querySelector("#theadMenuSemanal").innerHTML = head;
        return;
    }
    document.querySelector("#theadMenuSemanal").innerHTML = head;

    var desayuno, almuerzo, cena;
    beanPagination.forEach(detallecronogramacu => {
        diasemana = new Date(detallecronogramacu.fecha.split('/')[1] + ' ' +
            detallecronogramacu.fecha.split('/')[0] + ', ' + detallecronogramacu.fecha.split('/')[2]);

        row = `
                                            <div class="dt-widget__item">
                                                <div class="dt-widget__info text-truncate"  style="max-width:123px;">
                                                    <div class="dt-widget__title text-truncate">
                                                         <p class="dt-widget__subtitle text-truncate">
                                                        ${ diaSemana(diasemana.getUTCDay())}
                                                        <br>
                                <span class="badge badge-sm badge-pill badge-primary  d-sm-inline-initial">${detallecronogramacu.fecha}</span>
                                                        </p>
                                                        
                                                    </div>
                                                </div>
                                                <div class="dt-widget__info text-truncate">
                                                    <div class="dt-widget__title text-truncate">
                                                        <ul style="list-style:none;" class="pl-0">
                                                            <li><span class="badge badge-sm badge-pill badge-success  d-sm-inline-initial">${ detallecronogramacu.comida_dsegundo.descripcion == undefined ? "" : detallecronogramacu.comida_dsegundo.descripcion}</span></li>
                                                            <li><span class="badge badge-sm badge-pill badge-secondary  d-sm-inline-initial">${detallecronogramacu.comida_dpostre.descripcion == undefined ? "" : detallecronogramacu.comida_dpostre.descripcion}</span></li>
                                                            <li><span class="badge badge-sm badge-pill badge-info  d-sm-inline-initial">${detallecronogramacu.comida_dbebida.descripcion == undefined ? "" : detallecronogramacu.comida_dbebida.descripcion}</span></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div class="dt-widget__info text-truncate">
                                                    <div class="dt-widget__title text-truncate">
                                                            <ul style="list-style:none;" class="pl-0">
                                                                <li><span class="badge badge-sm badge-pill badge-success  d-sm-inline-initial">${detallecronogramacu.comida_asegundo.descripcion == undefined ? "" : detallecronogramacu.comida_asegundo.descripcion}</span></li>
                                                                <li><span class="badge badge-sm badge-pill badge-secondary  d-sm-inline-initial">${detallecronogramacu.comida_asopa.descripcion == undefined ? "" : detallecronogramacu.comida_asopa.descripcion}</span></li>
                                                                <li><span class="badge badge-sm badge-pill badge-info  d-sm-inline-initial">${detallecronogramacu.comida_apostre.descripcion == undefined ? "" : detallecronogramacu.comida_apostre.descripcion}</span></li>
                                                                <li><span class="badge badge-sm badge-pill badge-warning  d-sm-inline-initial">${detallecronogramacu.comida_abebida.descripcion == undefined ? "" : detallecronogramacu.comida_abebida.descripcion}</span></li>
                                                            </ul>
                                                    </div>
                                                </div>
                                                <div class="dt-widget__info text-truncate">
                                                    <div class="dt-widget__title text-truncate">
                                                            <ul style="list-style:none;" class="pl-0">
                                                                <li><span class="badge badge-sm badge-pill badge-success  d-sm-inline-initial">${detallecronogramacu.comida_csegundo.descripcion == undefined ? "" : detallecronogramacu.comida_csegundo.descripcion}</span></li>
                                                                <li><span class="badge badge-sm badge-pill badge-secondary  d-sm-inline-initial">${detallecronogramacu.comida_csopa.descripcion == undefined ? "" : detallecronogramacu.comida_csopa.descripcion}</span></li>
                                                                <li><span class="badge badge-sm badge-pill badge-info  d-sm-inline-initial">${detallecronogramacu.comida_cpostre.descripcion == undefined ? "" : detallecronogramacu.comida_cpostre.descripcion}</span></li>
                                                                <li><span class="badge badge-sm badge-pill badge-warning  d-sm-inline-initial">${detallecronogramacu.comida_cbebida.descripcion == undefined ? "" : detallecronogramacu.comida_cbebida.descripcion}</span></li>
                                                            </ul>
                                                    </div>
                                                </div>
            
                                                <div class="dt-widget__extra">
                                                    <div class="">
                                                        <div class="action-btn-group" >
                                                            <button data-toggle="tooltip" data-placement="top" title="Agregar Menú del ${diaSemana(diasemana.getUTCDay())} "  type="button"class="btn btn-outline-primary dt-fab-btn agregar-menu-${diaSemana(diasemana.getUTCDay())}">
                                                                <i class="icon icon-plus icon-1x"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                           </div>
                `;
        document.querySelector("#tbodyCronograma").innerHTML += row;
        $('[data-toggle="tooltip"]').tooltip();

    });
    addEventsMenuSemanales();

}

function addEventsMenuSemanales() {
    document.querySelectorAll('.editar-menu-semanal').forEach(btn => {
        btn.onclick = function () {


        }
    });
    document.querySelectorAll('.agregar-menu-LUNES').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            document.querySelector("#txtComidaAlmuerzoDetalle").value = "";
            document.querySelector("#txtComidaDetalle").value = "";
            document.querySelector("#txtComidaCenaDetalle").value = "";
            tipoDiaComida = 0;
            viewComida();
            document.querySelector("#title-comida-diaria").innerHTML = "REGISTRAR MENU DEL LUNES";
            document.querySelector("#tab-pane-OpenNewMenuSemanal").style.display = "none";
            document.querySelector("#OpenComidaDiaria").style.display = "initial";
            Dia_semana = listDMS.filter(function (obj) {
                if (diaSemanaFecha(obj.fecha) == "LUNES") {
                    return obj;
                }
                {
                    return undefined;
                }
            });
            toListComidaTabla(Dia_semana[0], ".tbodyComidaDesayuno");

        };
    });
    document.querySelectorAll('.agregar-menu-MARTES').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            document.querySelector("#txtComidaAlmuerzoDetalle").value = "";
            document.querySelector("#txtComidaDetalle").value = "";
            document.querySelector("#txtComidaCenaDetalle").value = "";
            tipoDiaComida = 0;
            viewComida();
            document.querySelector("#title-comida-diaria").innerHTML = "REGISTRAR MENU DEL MARTES";
            document.querySelector("#tab-pane-OpenNewMenuSemanal").style.display = "none";
            document.querySelector("#OpenComidaDiaria").style.display = "initial";
            Dia_semana = listDMS.filter(function (obj) {
                if (diaSemanaFecha(obj.fecha) == "MARTES") {
                    return obj;
                }
                {
                    return undefined;
                }
            });
            toListComidaTabla(Dia_semana[0], ".tbodyComidaDesayuno");
        };
    });
    document.querySelectorAll('.agregar-menu-MIERCOLES').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            document.querySelector("#txtComidaAlmuerzoDetalle").value = "";
            document.querySelector("#txtComidaDetalle").value = "";
            document.querySelector("#txtComidaCenaDetalle").value = "";
            tipoDiaComida = 0;
            viewComida();
            document.querySelector("#title-comida-diaria").innerHTML = "REGISTRAR MENU DEL MIERCOLES";
            document.querySelector("#tab-pane-OpenNewMenuSemanal").style.display = "none";
            document.querySelector("#OpenComidaDiaria").style.display = "initial";
            Dia_semana = listDMS.filter(function (obj) {
                if (diaSemanaFecha(obj.fecha) == "MIERCOLES") {
                    return obj;
                }
                {
                    return undefined;
                }
            });
            toListComidaTabla(Dia_semana[0], ".tbodyComidaDesayuno");
        };
    });
    document.querySelectorAll('.agregar-menu-JUEVES').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            document.querySelector("#txtComidaAlmuerzoDetalle").value = "";
            document.querySelector("#txtComidaDetalle").value = "";
            document.querySelector("#txtComidaCenaDetalle").value = "";
            tipoDiaComida = 0;
            viewComida();
            document.querySelector("#title-comida-diaria").innerHTML = "REGISTRAR MENU DEL JUEVES";
            document.querySelector("#tab-pane-OpenNewMenuSemanal").style.display = "none";
            document.querySelector("#OpenComidaDiaria").style.display = "initial";
            Dia_semana = listDMS.filter(function (obj) {
                if (diaSemanaFecha(obj.fecha) == "JUEVES") {
                    return obj;
                }
                {
                    return undefined;
                }
            });
            toListComidaTabla(Dia_semana[0], ".tbodyComidaDesayuno");
        };
    });
    document.querySelectorAll('.agregar-menu-VIERNES').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            document.querySelector("#txtComidaAlmuerzoDetalle").value = "";
            document.querySelector("#txtComidaDetalle").value = "";
            document.querySelector("#txtComidaCenaDetalle").value = "";
            tipoDiaComida = 0;
            viewComida();
            document.querySelector("#title-comida-diaria").innerHTML = "REGISTRAR MENU DEL VIERNES";
            document.querySelector("#tab-pane-OpenNewMenuSemanal").style.display = "none";
            document.querySelector("#OpenComidaDiaria").style.display = "initial";
            Dia_semana = listDMS.filter(function (obj) {
                if (diaSemanaFecha(obj.fecha) == "VIERNES") {
                    return obj;
                }
                {
                    return undefined;
                }
            });
            toListComidaTabla(Dia_semana[0], ".tbodyComidaDesayuno");
        };
    });
    document.querySelectorAll('.eliminar-menu').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {

            console.log(btn);
            console.log(btn.getAttribute('idmenu_semanal'));
            detalleCronogramaSelected = findByMenuSemanal(btn.getAttribute('idmenu_semanal'));
            if (detalleCronogramaSelected != undefined) {
                console.log(detalleCronogramaSelected);
                beanRequestMenuSemanal.operation = "delete";
                beanRequestMenuSemanal.type_request = "DELETE";
                processAjaxMenuSemanal();
            } else {
                showAlertTopEnd('warning', 'no se encontro el menu seleccionado');
            }

        };
    });

}

function findByMenuSemanal(idmenu_semanal) {
    let menu_;
    beanPaginationMenuSemanal.list.forEach(detallecronogramacu => {
        if (idmenu_semanal == detallecronogramacu.menu_semanal.idmenu_semanal) {
            menu_ = detallecronogramacu;
            return;
        }
    });
    return menu_;
}

function validateFormMenuSemanal() {
    let retornar = true;
    listDMS.forEach(detallecronogramacu => {
        if (detallecronogramacu.comida_dsegundo.idcomida == undefined) {
            showAlertTopEnd('warning', 'Por favor ingrese segundo al Desayuno del día ' + detallecronogramacu.fecha);
            retornar = false;
            return;
        } else if (detallecronogramacu.comida_dbebida.idcomida == undefined) {
            showAlertTopEnd('warning', 'Por favor ingrese bebida al Desayuno del día ' + detallecronogramacu.fecha);
            retornar = false;
            return;
        } else if (detallecronogramacu.comida_dpostre.idcomida == undefined) {
            showAlertTopEnd('warning', 'Por favor ingrese postre al Desayuno del día ' + detallecronogramacu.fecha);
            retornar = false;
            return;
        } else if (detallecronogramacu.comida_asegundo.idcomida == undefined) {
            showAlertTopEnd('warning', 'Por favor ingrese segundo al Almuerzo del día ' + detallecronogramacu.fecha);
            retornar = false;
            return;
        } else if (detallecronogramacu.comida_abebida.idcomida == undefined) {
            showAlertTopEnd('warning', 'Por favor ingrese bebida al Almuerzo del día ' + detallecronogramacu.fecha);
            retornar = false;
            return;
        } else if (detallecronogramacu.comida_apostre.idcomida == undefined) {
            showAlertTopEnd('warning', 'Por favor ingrese postre al Almuerzo del día ' + detallecronogramacu.fecha);
            retornar = false;
            return;
        } else if (detallecronogramacu.comida_asopa.idcomida == undefined) {
            showAlertTopEnd('warning', 'Por favor ingrese sopa al Almuerzo del día ' + detallecronogramacu.fecha);
            retornar = false;
            return;
        } else if (detallecronogramacu.comida_csegundo.idcomida == undefined) {
            showAlertTopEnd('warning', 'Por favor ingrese segundo a la Cena del día ' + detallecronogramacu.fecha);
            retornar = false;
        } else if (detallecronogramacu.comida_cbebida.idcomida == undefined) {
            showAlertTopEnd('warning', 'Por favor ingrese bebida a la Cena del día ' + detallecronogramacu.fecha);
            retornar = false;
            return;
        } else if (detallecronogramacu.comida_cpostre.idcomida == undefined) {
            showAlertTopEnd('warning', 'Por favor ingrese postre a la Cena del día ' + detallecronogramacu.fecha);
            retornar = false;
            return;
        } else if (detallecronogramacu.comida_csopa.idcomida == undefined) {
            showAlertTopEnd('warning', 'Por favor ingrese sopa a la Cena del día ' + detallecronogramacu.fecha);
            retornar = false;
            return;
        }

    });
    return retornar;
}

function validateFormMenuDia() {
    if (document.querySelector('#txtMenuSemanalFecha').value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese la fecha del día ');
        document.querySelector("#txtMenuSemanalFecha").focus();
        return false;
    } else if (dms.comida_dsegundo.idcomida == undefined) {
        showAlertTopEnd('warning', 'Por favor ingrese segundo al Desayuno');
        document.querySelector("#txtFilterTipoComidaDesayuno").focus();
        return false;
    } else if (dms.comida_dbebida.idcomida == undefined) {
        showAlertTopEnd('warning', 'Por favor ingrese bebida al Desayuno');
        document.querySelector("#txtFilterTipoComidaDesayuno").focus();
        return false;
    } else if (dms.comida_dpostre.idcomida == undefined) {
        showAlertTopEnd('warning', 'Por favor ingrese postre al Desayuno');
        document.querySelector("#txtFilterTipoComidaDesayuno").focus();
        return false;
    } else if (dms.comida_asegundo.idcomida == undefined) {
        showAlertTopEnd('warning', 'Por favor ingrese segundo al Almuerzo');
        document.querySelector("#txtFilterTipoComidaAlmuerzo").focus();
        return false;
    } else if (dms.comida_abebida.idcomida == undefined) {
        showAlertTopEnd('warning', 'Por favor ingrese bebida al Almuerzo');
        document.querySelector("#txtFilterTipoComidaAlmuerzo").focus();
        return false;
    } else if (dms.comida_apostre.idcomida == undefined) {
        showAlertTopEnd('warning', 'Por favor ingrese postre al Almuerzo');
        document.querySelector("#txtFilterTipoComidaAlmuerzo").focus();
        return false;
    } else if (dms.comida_asopa.idcomida == undefined) {
        showAlertTopEnd('warning', 'Por favor ingrese sopa al Almuerzo');
        document.querySelector("#txtFilterTipoComidaAlmuerzo").focus();
        return false;
    } else if (dms.comida_csegundo.idcomida == undefined) {
        showAlertTopEnd('warning', 'Por favor ingrese segundo a la Cena');
        document.querySelector("#txtFilterTipoComidaCena").focus();
        return false;
    } else if (dms.comida_cbebida.idcomida == undefined) {
        showAlertTopEnd('warning', 'Por favor ingrese bebida a la Cena');
        document.querySelector("#txtFilterTipoComidaCena").focus();
        return false;
    } else if (dms.comida_cpostre.idcomida == undefined) {
        showAlertTopEnd('warning', 'Por favor ingrese postre a la Cena');
        document.querySelector("#txtFilterTipoComidaCena").focus();
        return false;
    } else if (dms.comida_csopa.idcomida == undefined) {
        showAlertTopEnd('warning', 'Por favor ingrese sopa a la Cena');
        document.querySelector("#txtFilterTipoComidaCena").focus();
        return false;
    }
    return true;
}

function vaciarListaSemanal() {
    removeClass(document.querySelector("#theadMenuSemanal").parentElement, "dt-widget dt-card dt-social-card border border-w-2 border-light-teal text-light-gray m-0");
    removeClass(document.querySelector("#theadMenuSemanal"), "dt-widget__item border");
    document.querySelector("#tbodyCronograma").innerHTML = "";
    listDMS.length = 0;
    document.querySelector("#txtMenuSemanalFechaI").value = "";
    document.querySelector("#txtMenuSemanalFechaF").value = "";
    document.querySelector("#txtMenuSemanalObservacion").value = "";
}

function diaSemana(diacomida) {
    switch (diacomida) {
        case 1:
            return "LUNES";
            break;
        case 2:
            return "MARTES";
            break;
        case 3:
            return "MIERCOLES";
            break;
        case 4:
            return "JUEVES";
            break;
        case 5:
            return "VIERNES";
            break;
        case 6:
            return "SABADO";
            break;
        case 7:
            return "DOMINGO";
            break;
        default:
            return "NINGUNO";
            break;

    }
}

function diaSemanaFecha(fechaw) {
    var fecha_texto = fechaw.split("/")[2] + "-" + fechaw.split("/")[1] + "-" + fechaw.split("/")[0];
    var ms = Date.parse(fecha_texto);
    var fecha = new Date(ms);
    switch (fecha.getUTCDay()) {
        case 1:
            return "LUNES";
            break;
        case 2:
            return "MARTES";
            break;
        case 3:
            return "MIERCOLES";
            break;
        case 4:
            return "JUEVES";
            break;
        case 5:
            return "VIERNES";
            break;
        case 6:
            return "SABADO";
            break;
        case 7:
            return "DOMINGO";
            break;
        default:
            return "NINGUNO";
            break;

    }
}

function dias(mes, anno) {
    mes = parseInt(mes);
    anno = parseInt(anno);
    switch (mes) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            return 31;
        case 2:
            return (anno % 4 == 0) ? 29 : 28;
    }
    return 30;
}



//COMIDA
function toListComidaTabla(ArrayComida, tablaBody) {
    let segundo, postre, bebida, sopa;
    if (".tbodyComidaDesayuno" == tablaBody) {
        segundo = "comida_dsegundo";
        bebida = "comida_dbebida";
        postre = "comida_dpostre";
    } else if (".tbodyComidaAlmuerzo" == tablaBody) {
        segundo = "comida_asegundo";
        bebida = "comida_abebida";
        postre = "comida_apostre";
        sopa = "comida_asopa";
    } else if (".tbodyComidaCena" == tablaBody) {
        segundo = "comida_csegundo";
        bebida = "comida_cbebida";
        postre = "comida_cpostre";
        sopa = "comida_csopa";
    }
    document.querySelector(tablaBody).innerHTML = "";
    let row = "";
    if (ArrayComida[segundo].idcomida != undefined) {
        row += "<tr ";
        row += "idarraycomida='" + ArrayComida[segundo].idcomida + "' ";
        row += ">";
        row += "<td class='align-middle'>" + tipoComida(ArrayComida[segundo].tipo) + "</td>";
        row += "<td class='align-middle'>" + ArrayComida[segundo].descripcion.toUpperCase() + "</td>";
        row += "</tr>";
    }

    if (ArrayComida[bebida].idcomida != undefined) {
        row += "<tr ";
        row += "idarraycomida='" + ArrayComida[bebida].idcomida + "' ";
        row += ">";
        row += "<td class='align-middle'>" + tipoComida(ArrayComida[bebida].tipo) + "</td>";
        row += "<td class='align-middle'>" + ArrayComida[bebida].descripcion.toUpperCase() + "</td>";
        row += "</tr>";
    }

    if (ArrayComida[postre].idcomida != undefined) {
        row += "<tr ";
        row += "idarraycomida='" + ArrayComida[postre].idcomida + "' ";
        row += ">";
        row += "<td class='align-middle'>" + tipoComida(ArrayComida[postre].tipo) + "</td>";
        row += "<td class='align-middle'>" + ArrayComida[postre].descripcion.toUpperCase() + "</td>";
        row += "</tr>";
    }
    if (ArrayComida[sopa] != undefined) {
        if (ArrayComida[sopa].idcomida != undefined) {
            row += "<tr ";
            row += "idarraycomida='" + ArrayComida[sopa].idcomida + "' ";
            row += ">";
            row += "<td class='align-middle'>" + tipoComida(ArrayComida[sopa].tipo) + "</td>";
            row += "<td class='align-middle'>" + ArrayComida[sopa].descripcion.toUpperCase() + "</td>";
            row += "</tr>";
        }
    }

    document.querySelector(tablaBody).innerHTML += row;
    addEventsMenuSemanales();
}

function tipoComida(tipocomida) {
    switch (tipocomida) {
        case 1:
            return "SEGUNDO";
            break;
        case 2:
            return "BEBIDA";
            break;
        case 3:
            return "POSTRE";
            break;
        case 4:
            return "SOPA";
            break;
        default:
            return "NINGUNO";
            break;

    }
}

function diaComida(diacomida) {
    switch (diacomida) {
        case 1:
            return "DESAYUNO";
            break;
        case 2:
            return "ALMUERZO";
            break;
        case 3:
            return "CENA";
            break;
        default:
            return "NINGUNO";
            break;

    }
}

function viewComida() {
    document.querySelector("#buttonAlmuerzo").classList.remove("active");
    document.querySelector("#buttonCena").classList.remove("active");
    document.querySelector("#buttonDesayuno").classList.add("active");
    document.querySelector("#tab-pane-16").classList.remove("active");
    document.querySelector("#tab-pane-17").classList.remove("active");
    document.querySelector("#tab-pane-15").classList.add("active");
}