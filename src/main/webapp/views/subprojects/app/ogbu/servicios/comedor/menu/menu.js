var beanPaginationMenuSemanal;
var beanPaginationComida;

var fechaActual = new Date(); //Fecha actual
var ListaDetalleComida = [],
        ListaComidaCena = [],
        ListaComidaAlmuerzo = [],
        ListaComidaDesayuno = [],
        ListaComidaCenaMa = [],
        ListaComidaAlmuerzoMa = [],
        ListaComidaDesayunoMa = [],
        ListaComidaCenaMi = [],
        ListaComidaAlmuerzoMi = [],
        ListaComidaDesayunoMi = [],
        ListaComidaCenaJu = [],
        ListaComidaAlmuerzoJu = [],
        ListaComidaDesayunoJu = [],
        ListaComidaCenaVi = [],
        ListaComidaAlmuerzoVi = [],
        ListaComidaDesayunoVi = [];
var comidaSelected, detalleCronogramaSelected;
var diasemana;
var beanRequestMenuSemanal = new BeanRequest();
document.addEventListener("DOMContentLoaded", function () {
    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestMenuSemanal.entity_api = "api/menusemanal";
    beanRequestMenuSemanal.operation = "paginate";
    beanRequestMenuSemanal.type_request = "GET";
    
    $("#txtFilterTipoComida").change(function () {
        var op = $("#txtFilterTipoComida option:selected").val();
        $('#ventanaModalComida').modal('show');
        processAjaxComida();
    });
    
    $('#FrmMenuSemanal').submit(function (event) {
        beanRequestMenuSemanal.operation = "paginate";
        beanRequestMenuSemanal.type_request = "GET";
        $('#modalCargandoMenuSemanal').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $('#FrmMenuSemanalModal').submit(function (event) {
        if (validateFormMenuSemanal()) {
            $('#modalCargandoMenuSemanal').modal('show');
        }
        event.preventDefault();
        event.stopPropagation();
    });

//document.querySelector("#txtFilterComidaDesayuno").onfocusout =function () {
    //document.querySelector("#ResultadoComidaDesayuno").style.height = "0px";

//};
    document.querySelector("#regresar-central").onclick = function () {
        document.querySelector("#tab-pane-OpenNewMenuSemanal").classList.remove("active");
        document.querySelector("#module-header-content").style.display = "block";

    };
    
    document.querySelector("#regresar-central2").onclick = function () {
        document.querySelector("#tab-pane-OpenBuscaMenuSemanal").classList.remove("active");
        document.querySelector("#module-header-content").style.display = "block";

    };
    
    document.querySelector("#btnOpenBuscaMenuSemanal").onclick = function () {

        document.querySelector("#module-header-content").style.display = "none";
        document.querySelector("#tab-pane-OpenBuscaMenuSemanal").classList.add("active");

    };
    
    document.querySelector("#btnOpenNewMenuSemanal").onclick = function () {
        document.querySelector("#module-header-content").style.display = "none";
        document.querySelector("#tab-pane-OpenNewMenuSemanal").classList.add("active");
        //CONFIGURAMOS LA SOLICITUD
        beanRequestMenuSemanal.operation = "add";
        beanRequestMenuSemanal.type_request = "POST";
        //LIMPIAR LOS CAMPOS
        document.querySelector("#tbodyCronograma").innerHTML = "";
        vaciarListaSemanal();
        ListaDetalleComida.length = 0;
        inicializaValorMenuSemanal();
        toListSemanal();
    };

    document.querySelector("#buttonAlmuerzo").onclick = function () {
        document.querySelector("#IndexMenuSemanal").value = 1;
    };

    document.querySelector("#txtFilterComidaAlmuerzo").onclick = function () {
        document.querySelector("#ResultadoComidaAlmuerzo").style.height = "auto";
        $('#ventanaModalComida').modal('show');
        processAjaxComida(document.querySelector("#txtFilterTipoComidaAlmuerzo").value, document.querySelector("#txtFilterComidaAlmuerzo").value);
        listFilter(document.querySelector("#txtFilterTipoComidaAlmuerzo").value, "#txtFilterComidaAlmuerzo");
    };

    document.querySelector("#buttonDesayuno").onclick = function () {
        document.querySelector("#IndexMenuSemanal").value = 0;
    };

    document.querySelector("#txtFilterComidaDesayuno").onclick = function () {
        document.querySelector("#ResultadoComidaDesayuno").style.height = "auto";
        $('#ventanaModalComida').modal('show');
        processAjaxComida(document.querySelector("#txtFilterTipoComidaDesayuno").value, document.querySelector("#txtFilterComidaDesayuno").value);
        listFilter(document.querySelector("#txtFilterTipoComidaDesayuno").value, "#txtFilterComidaDesayuno");
    };

    document.querySelector("#buttonCena").onclick = function () {
        document.querySelector("#IndexMenuSemanal").value = 2;
    };

    document.querySelector("#txtFilterComidaCena").onclick = function () {
        document.querySelector("#ResultadoComidaCena").style.height = "auto";
        $('#ventanaModalComida').modal('show');
        processAjaxComida(document.querySelector("#txtFilterTipoComidaCena").value, document.querySelector("#txtFilterComidaCena").value);
        listFilter(document.querySelector("#txtFilterTipoComidaCena").value, "#txtFilterComidaCena");
    };

    $("#modalCargandoMenuSemanal").on('shown.bs.modal', function () {
        processAjaxMenuSemanal();
    });

    document.querySelector("#btnGuardarAddMenus").onclick = function () {
        if (validateFormMenuDia()) {
            dms.menu_semanal = new MenuSemanal(null,
                    document.querySelector("#txtMenuSemanalFechaI").value.split("-")[2] + "/" +
                    document.querySelector("#txtMenuSemanalFechaI").value.split("-")[1] + "/" +
                    document.querySelector("#txtMenuSemanalFechaI").value.split("-")[0],
                    document.querySelector("#txtMenuSemanalFechaF").value.split("-")[2] + "/" +
                    document.querySelector("#txtMenuSemanalFechaF").value.split("-")[1] + "/" +
                    document.querySelector("#txtMenuSemanalFechaF").value.split("-")[0],
                    document.querySelector("#txtMenuSemanalObservacion").value
                    );
            var fechatxt = document.querySelector('#txtMenuSemanalFecha').value;
            dms.fecha = fechatxt.split("-")[2] + "/" + fechatxt.split("-")[1] + "/" + fechatxt.split("-")[0];
            listDMS.push(dms);
            $('#ventanaModalMenuSemanal').modal('hide');
        }
    };

    $("#modalCargandoMenuSemanal").on('hide.bs.modal', function () {
        beanRequestMenuSemanal.type_request = "GET";
        beanRequestMenuSemanal.operation = "paginate";
    });

    $('#modalCargandoMenuSemanal').modal('show');

});
function inicializaValorMenuSemanal() {
    var mes = fechaActual.getMonth() + 1; //obteniendo mes
    var dia = fechaActual.getDate(); //obteniendo dia
    var ano = fechaActual.getFullYear(); //obteniendo año
    if (dia < 10)
        dia = '0' + dia; //agrega cero si el menor de 10
    if (mes < 10)
        mes = '0' + mes //agrega cero si el menor de 10
    let diaLunes = dia - fechaActual.getUTCDay() + 1;
    let diaViernes = diaLunes + 4;
    if (diaLunes < 10)
        diaLunes = '0' + diaLunes;

    if (diaViernes < 10)
        diaViernes = '0' + diaViernes;

    document.querySelector('#txtMenuSemanalObservacion').value = "";
    document.querySelector('#txtMenuSemanalFecha').value = ano + "-" + mes + "-" + dia;
    document.querySelector("#txtMenuSemanalFechaI").value = ano + "-" + mes + "-" + diaLunes;
    document.querySelector("#txtMenuSemanalFechaF").value = ano + "-" + mes + "-" + diaViernes;
}

function processAjaxMenuSemanal() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestMenuSemanal.operation === "paginate") {
        parameters_pagination = "?fechai=" + document.querySelector("#txtFilterFechaI").value;
        parameters_pagination += "&fechaf=" + document.querySelector("#txtFilterFechaF").value;
        parameters_pagination += "&page=1";
        parameters_pagination += "&size=7";
    } else {
        parameters_pagination = "";
        if (beanRequestMenuSemanal.operation === "delete") {
            parameters_pagination = "/" + beanPaginationMenuSemanal.list[0].menu_semanal.idmenu_semanal;
            json = {};
        } else {
            json = {"list": listDMS};
            json.menu_semanal = dms.menu_semanal;
            if (beanRequestMenuSemanal.operation === "update") {
                json.list.iddetalle_cronogramacu = beanPaginationMenuSemanal.list[0].iddetalle_cronogramacu;
                json.menu_semanal.idmenu_semanal=beanPaginationMenuSemanal.list[0].menu_semanal.idmenu_semanal;
            }
        }
    }
    $.ajax({
        url: getHostAPI() + beanRequestMenuSemanal.entity_api + "/" + beanRequestMenuSemanal.operation + parameters_pagination,
        type: beanRequestMenuSemanal.type_request,
        headers: {
            //'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoMenuSemanal').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() === "ok") {
                document.querySelector('#txtMenuSemanalObservacion').value = "";
                vaciarListaSemanal();
                toListSemanal();
                showAlertTopEnd('success', 'Acción realizada exitosamente');
                $('#ventanaModalMenuSemanal').modal('hide');
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationMenuSemanal = beanCrudResponse.beanPagination;
            toListMenuSemanal(beanPaginationMenuSemanal);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoMenuSemanal').modal("hide");
        showAlertErrorRequest();

    });
}

function listFilter(filterTipo, filternombre) {
    $(filternombre).change(function () {
        var filter = $(this).val();
        $('#ventanaModalComida').modal('show');
        processAjaxComida(filterTipo, filter);
    }).keyup(function (e) {
        var txt = String.fromCharCode(e.which);
        if (txt.match(/[A-Za-z]/))
        {
            $(this).change();
        }

    });

}

function toListSemanal() {
    ordenarComida();
    document.querySelector("#tbodyCronograma").innerHTML = "";
    let row;
    var desayuno, almuerzo, cena;
    for (var i = 1; i < 6; i++) {
        switch (i) {
            case 1:
                desayuno = ListaComidaDesayuno;
                almuerzo = ListaComidaAlmuerzo;
                cena = ListaComidaCena;
                break;
            case 2:
                desayuno = ListaComidaDesayunoMa;
                almuerzo = ListaComidaAlmuerzoMa;
                cena = ListaComidaCenaMa;
                break;
            case 3:
                desayuno = ListaComidaDesayunoMi;
                almuerzo = ListaComidaAlmuerzoMi;
                cena = ListaComidaCenaMi;
                break;
            case 4:
                desayuno = ListaComidaDesayunoJu;
                almuerzo = ListaComidaAlmuerzoJu;
                cena = ListaComidaCenaJu;
                break;
            case 5:
                desayuno = ListaComidaDesayunoVi;
                almuerzo = ListaComidaAlmuerzoVi;
                cena = ListaComidaCenaVi;
                break;

            default:
                desayuno = [];
                almuerzo = [];
                cena = [];
                break;
        }

        row = `
                                            <div class="dt-widget__item">
                                                <div class="dt-widget__info text-truncate"  style="margin-right: -13%;">
                                                    <div class="dt-widget__title text-truncate">
                                                         <p class="dt-widget__subtitle text-truncate">
                                                        ${diaSemana(i)}</p>
                                                    </div>
                                                </div>
                                                <div class="dt-widget__info text-truncate">
                                                    <div class="dt-widget__title text-truncate">
                                                        <ul style="list-style:none;">
                                                            <li><span class="badge badge-sm badge-pill badge-success  d-sm-inline-block">${desayuno[0] == undefined ? "" : desayuno[0].descripcion}</span></li>
                                                            <li><span class="badge badge-sm badge-pill badge-secondary  d-sm-inline-block">${desayuno[1] == undefined ? "" : desayuno[1].descripcion}</span></li>
                                                            <li><span class="badge badge-sm badge-pill badge-info  d-sm-inline-block">${desayuno[2] == undefined ? "" : desayuno[2].descripcion}</span></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div class="dt-widget__info text-truncate">
                                                    <div class="dt-widget__title text-truncate">
                                                            <ul style="list-style:none;">
                                                                <li><span class="badge badge-sm badge-pill badge-success  d-sm-inline-block">${almuerzo[0] == undefined ? "" : almuerzo[0].descripcion}</span></li>
                                                                <li><span class="badge badge-sm badge-pill badge-secondary  d-sm-inline-block">${almuerzo[1] == undefined ? "" : almuerzo[1].descripcion}</span></li>
                                                                <li><span class="badge badge-sm badge-pill badge-info  d-sm-inline-block">${almuerzo[2] == undefined ? "" : almuerzo[2].descripcion}</span></li>
                                                                <li><span class="badge badge-sm badge-pill badge-warning  d-sm-inline-block">${almuerzo[3] == undefined ? "" : almuerzo[3].descripcion}</span></li>
                                                            </ul>
                                                    </div>
                                                </div>
                                                <div class="dt-widget__info text-truncate">
                                                    <div class="dt-widget__title text-truncate">
                                                            <ul style="list-style:none;">
                                                                <li><span class="badge badge-sm badge-pill badge-success  d-sm-inline-block">${cena[0] == undefined ? "" : cena[0].descripcion}</span></li>
                                                                <li><span class="badge badge-sm badge-pill badge-secondary  d-sm-inline-block">${cena[1] == undefined ? "" : cena[1].descripcion}</span></li>
                                                                <li><span class="badge badge-sm badge-pill badge-info  d-sm-inline-block">${cena[2] == undefined ? "" : cena[2].descripcion}</span></li>
                                                                <li><span class="badge badge-sm badge-pill badge-warning  d-sm-inline-block">${cena[3] == undefined ? "" : cena[3].descripcion}</span></li>
                                                            </ul>
                                                    </div>
                                                </div>
            
                                                <div class="dt-widget__extra">
                                                    <div class="hide-content">
                                                        <div class="action-btn-group" >
                                                            <button  type="button"class="btn btn-outline-primary dt-fab-btn agregar-menu-${diaSemana(i)}">
                                                                <i class="icon icon-plus icon-1x"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
            
            
                                            </div>
                `;
        document.querySelector("#tbodyCronograma").innerHTML += row;

    }

    addEventsMenuSemanales();
}

function toListMenuSemanal(beanPagination) {

    document.querySelector("#tbodyMenuSemanal").innerHTML = "";
    document.querySelector("#theadMenuSemanal").innerHTML = "";

    if (beanPagination.count_filter > 0) {
        let row;
        let head;
        head = "<tr class='bg-primary '>";
        head += "<th scope='col'> ";
        head += "<div class='dt-card__tools'><button type='button' class='btn btn-success mr-4 dt-fab-btn shadow-lg mt-n2 toggle-button editar-menu-semanal'  data-toggle='tooltip' data-original-title='Editar'><i class='icon icon-editors icon-1x'></i></button>";
        head += "<button type='button' class='btn btn-danger dt-fab-btn shadow-lg mt-n2 toggle-button eliminar-menu'  data-toggle='tooltip' data-original-title='Eliminar'><i class='icon icon-trash icon-1x'></i></button></div></th>";
        head += "<th class='text-uppercase text-white' scope='col' >DESAYUNO</th>";
        head += "<th class='text-uppercase text-white' scope='col' >ALMUERZO</th>";
        head += "<th class='text-uppercase text-white ' scope='col' >CENA</th>";
        head += "</tr>";
        document.querySelector("#theadMenuSemanal").innerHTML = head;
        beanPagination.list.forEach(detallecronogramacu => {
            diasemana = new Date(detallecronogramacu.fecha.split('/')[1] + ' ' +
                    detallecronogramacu.fecha.split('/')[0] + ', ' + detallecronogramacu.fecha.split('/')[2])
            row = "<tr ";
            row += "idcronograma='" + detallecronogramacu.iddetalle_cronogramacu + "' ";
            row += ">";
            row += "<td class='align-middle'>" + diaSemana(diasemana.getUTCDay()) + "</td>";
            row += "<td class='align-middle'><ul class='pl-0 dt-widget__subtitle dt-list-cm-0 flex-nowrap'>";
            row += "<li class='dt-list__item text-truncate text-success'>" + detallecronogramacu.comida_dsegundo.descripcion + "</li>";
            row += "<li class='dt-list__item text-truncate text-warning'>" + detallecronogramacu.comida_dpostre.descripcion + "</li>";
            row += "<li class='dt-list__item text-truncate text-info'>" + detallecronogramacu.comida_dbebida.descripcion + "</li>";
            row += "</ul></td>";
            row += "<td class='align-middle'><ul class='pl-0 dt-widget__subtitle  dt-list-cm-0 flex-nowrap'>";
            row += "<li class='dt-list__item text-truncate text-success'>" + detallecronogramacu.comida_asegundo.descripcion + "</li>";
            row += "<li class='dt-list__item text-truncate text-primary'>" + detallecronogramacu.comida_asopa.descripcion + "</li>";
            row += "<li class='dt-list__item text-truncate text-warning'>" + detallecronogramacu.comida_apostre.descripcion + "</li>";
            row += "<li class='dt-list__item text-truncate text-info'>" + detallecronogramacu.comida_abebida.descripcion + "</li>";
            row += "</ul></td>";
            row += "<td class='align-middle'><ul class='pl-0 dt-widget__subtitle  dt-list-cm-0 flex-nowrap'>";
            row += "<li class='dt-list__item text-truncate text-success'>" + detallecronogramacu.comida_csegundo.descripcion + "</li>";
            row += "<li class='dt-list__item text-truncate text-primary'>" + detallecronogramacu.comida_csopa.descripcion + "</li>";
            row += "<li class='dt-list__item text-truncate text-warning'>" + detallecronogramacu.comida_cpostre.descripcion + "</li>";
            row += "<li class='dt-list__item text-truncate text-info'>" + detallecronogramacu.comida_cbebida.descripcion + "</li>";
            row += "</ul></td>";
            row += "</tr>";
            document.querySelector("#tbodyMenuSemanal").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(7),
                1,
                $('#modalCargandoMenuSemanal'),
                $('#paginationMenuSemanal'));
        addEventsMenuSemanales();
        if (beanRequestMenuSemanal.operation === "paginate") {
            document.querySelector("#txtFilterFechaI").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationMenuSemanal'));
        showAlertTopEnd('warning', 'No se encontraron resultados');

        document.querySelector("#txtFilterFechaI").focus();
    }
}

function index(LisComidaDesayuno, LisComidaAlmuerzo, LisComidaCena) {
    toListComidaTabla(LisComidaDesayuno, ".tbodyComidaDesayuno");
    toListComidaTabla(LisComidaAlmuerzo, ".tbodyComidaAlmuerzo");
    toListComidaTabla(LisComidaCena, ".tbodyComidaCena");

}

function vaciarListaSemanal() {
    ListaComidaAlmuerzo.length = 0;
    ListaComidaCena.length = 0;
    ListaComidaDesayuno.length = 0;

    ListaComidaAlmuerzoMa.length = 0;
    ListaComidaCenaMa.length = 0;
    ListaComidaDesayunoMa.length = 0;

    ListaComidaAlmuerzoMi.length = 0;
    ListaComidaCenaMi.length = 0;
    ListaComidaDesayunoMi.length = 0;

    ListaComidaAlmuerzoJu.length = 0;
    ListaComidaCenaJu.length = 0;
    ListaComidaDesayunoJu.length = 0;

    ListaComidaAlmuerzoVi.length = 0;
    ListaComidaCenaVi.length = 0;
    ListaComidaDesayunoVi.length = 0;
}

function ordenarTipoComida(lista) {
    return lista.sort(function (a, b) {
        if (a.tipo > b.tipo) {
            return 1;
        }
        if (a.tipo < b.tipo) {
            return -1;
        }
        // a must be equal to b
        return 0;
    });

}

function ordenarComida() {
    ListaComidaDesayuno = ordenarTipoComida(ListaComidaDesayuno);
    ListaComidaAlmuerzo = ordenarTipoComida(ListaComidaAlmuerzo);
    ListaComidaCena = ordenarTipoComida(ListaComidaCena);

    ListaComidaDesayunoMa = ordenarTipoComida(ListaComidaDesayunoMa);
    ListaComidaAlmuerzoMa = ordenarTipoComida(ListaComidaAlmuerzoMa);
    ListaComidaCenaMa = ordenarTipoComida(ListaComidaCenaMa);

    ListaComidaDesayunoMi = ordenarTipoComida(ListaComidaDesayunoMi);
    ListaComidaAlmuerzoMi = ordenarTipoComida(ListaComidaAlmuerzoMi);
    ListaComidaCenaMi = ordenarTipoComida(ListaComidaCenaMi);

    ListaComidaDesayunoJu = ordenarTipoComida(ListaComidaDesayunoJu);
    ListaComidaAlmuerzoJu = ordenarTipoComida(ListaComidaAlmuerzoJu);
    ListaComidaCenaJu = ordenarTipoComida(ListaComidaCenaJu);

    ListaComidaDesayunoVi = ordenarTipoComida(ListaComidaDesayunoVi);
    ListaComidaAlmuerzoVi = ordenarTipoComida(ListaComidaAlmuerzoVi);
    ListaComidaCenaVi = ordenarTipoComida(ListaComidaCenaVi);
}

function addEventsMenuSemanales() {
    document.querySelectorAll('.editar-menu-semanal').forEach(btn => {
        btn.onclick = function () {
            //vaciar valores
            vaciarListaSemanal();
            beanRequestMenuSemanal.operation = "update";
            beanRequestMenuSemanal.type_request = "PUT";
            //SET VALUES MODAL
            document.querySelector("#txtMenuSemanalFechaI").value = beanPaginationMenuSemanal.list[0].menu_semanal.fechai.split("/")[2] + "-" +
                    beanPaginationMenuSemanal.list[0].menu_semanal.fechai.split("/")[1] + "-" +
                    beanPaginationMenuSemanal.list[0].menu_semanal.fechai.split("/")[0];
            document.querySelector("#txtMenuSemanalFechaF").value = beanPaginationMenuSemanal.list[0].menu_semanal.fechaf.split("/")[2] + "-" +
                    beanPaginationMenuSemanal.list[0].menu_semanal.fechaf.split("/")[1] + "-" +
                    beanPaginationMenuSemanal.list[0].menu_semanal.fechaf.split("/")[0];
            document.querySelector("#txtMenuSemanalObservacion").value = beanPaginationMenuSemanal.list[0].menu_semanal.observacion;
            listDMS = beanPaginationMenuSemanal.list;
            beanPaginationMenuSemanal.list.forEach(dcu => {
                switch (diaSemanaFecha(dcu.fecha)) {
                    case 'LUNES':
                        document.querySelector("#txtMenuSemanalFecha").value = dcu.fecha.split("/")[2] + "-" +
                                dcu.fecha.split("/")[1] + "-" + dcu.fecha.split("/")[0];
                        pushDesayuno(dcu, ListaComidaDesayuno);
                        pushAlmuerzo(dcu, ListaComidaAlmuerzo);
                        pushCena(dcu, ListaComidaCena);
                        break;
                    case 'MARTES':
                        document.querySelector("#txtMenuSemanalFecha").value = dcu.fecha.split("/")[2] + "-" +
                                dcu.fecha.split("/")[1] + "-" + dcu.fecha.split("/")[0];
                        pushDesayuno(dcu, ListaComidaDesayunoMa);
                        pushAlmuerzo(dcu, ListaComidaAlmuerzoMa);
                        pushCena(dcu, ListaComidaCenaMa);
                        break;
                    case 'MIERCOLES':
                        document.querySelector("#txtMenuSemanalFecha").value = dcu.fecha.split("/")[2] + "-" +
                                dcu.fecha.split("/")[1] + "-" + dcu.fecha.split("/")[0];
                        pushDesayuno(dcu, ListaComidaDesayunoMi);
                        pushAlmuerzo(dcu, ListaComidaAlmuerzoMi);
                        pushCena(dcu, ListaComidaCenaMi);
                        break;
                    case 'JUEVES':
                        document.querySelector("#txtMenuSemanalFecha").value = dcu.fecha.split("/")[2] + "-" +
                                dcu.fecha.split("/")[1] + "-" + dcu.fecha.split("/")[0];
                        pushDesayuno(dcu, ListaComidaDesayunoJu);
                        pushAlmuerzo(dcu, ListaComidaAlmuerzoJu);
                        pushCena(dcu, ListaComidaCenaJu);
                        break;
                    case 'VIERNES':
                        document.querySelector("#txtMenuSemanalFecha").value = dcu.fecha.split("/")[2] + "-" +
                                dcu.fecha.split("/")[1] + "-" + dcu.fecha.split("/")[0];
                        pushDesayuno(dcu, ListaComidaDesayunoVi);
                        pushAlmuerzo(dcu, ListaComidaAlmuerzoVi);
                        pushCena(dcu, ListaComidaCenaVi);
                        break;

                    default:

                        break;
                }
            });
            toListSemanal();
            document.querySelector("#buttonAlmuerzo").classList.remove("active");
            document.querySelector("#tab-pane-OpenBuscaMenuSemanal").classList.remove("active");
            document.querySelector("#module-header-content").style.display = "none";
            document.querySelector("#tab-pane-OpenNewMenuSemanal").classList.add("active");
            addEventsMenuSemanales();
        };
    });
    document.querySelectorAll('.agregar-menu-LUNES').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {

            if (listDMS.length != 0) {
                listDMS.forEach(detallecu => {
                    if (diaSemanaFecha(detallecu.fecha) != "LUNES") {
                        document.querySelector("#txtTituloModalMan").innerHTML = "LUNES";
                        dms = new DetalleCronogramaCu();
                        index(ListaComidaDesayuno, ListaComidaAlmuerzo, ListaComidaCena);
                        $('#ventanaModalMenuSemanal').modal("show");
                        return;
                    } else {
                        console.log("si es lunes");
                        showAlertTopEnd('warning', 'Ya se registró el menu del LUNES');
                    }
                });
            } else {

                document.querySelector("#txtTituloModalMan").innerHTML = "LUNES";
                dms = new DetalleCronogramaCu();
                index(ListaComidaDesayuno, ListaComidaAlmuerzo, ListaComidaCena);
                $('#ventanaModalMenuSemanal').modal("show");
            }



        };
    });
    document.querySelectorAll('.agregar-menu-MARTES').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {

            if (listDMS.length != 0) {
                listDMS.forEach(detallecu => {
                    if (diaSemanaFecha(detallecu.fecha) != "MARTES") {
                        document.querySelector("#txtTituloModalMan").innerHTML = "MARTES";
                        dms = new DetalleCronogramaCu();
                        index(ListaComidaDesayunoMa, ListaComidaAlmuerzoMa, ListaComidaCenaMa);
                        $('#ventanaModalMenuSemanal').modal("show");
                        return;
                    } else {
                        console.log("si es lunes");
                        showAlertTopEnd('warning', 'Ya se registró el menu del MARTES');
                    }
                });
            } else {
                index(ListaComidaDesayunoMa, ListaComidaAlmuerzoMa, ListaComidaCenaMa);
                document.querySelector("#txtTituloModalMan").innerHTML = "MARTES";
                dms = new DetalleCronogramaCu();
                $('#ventanaModalMenuSemanal').modal("show");

            }



        };
    });
    document.querySelectorAll('.agregar-menu-MIERCOLES').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            if (listDMS.length != 0) {
                listDMS.forEach(detallecu => {
                    if (diaSemanaFecha(detallecu.fecha) != "MIERCOLES") {

                        document.querySelector("#txtTituloModalMan").innerHTML = "MIERCOLES";
                        index(ListaComidaDesayunoMi, ListaComidaAlmuerzoMi, ListaComidaCenaMi);
                        dms = new DetalleCronogramaCu();
                        $('#ventanaModalMenuSemanal').modal("show");
                        return;
                    } else {
                        console.log("si es lunes");
                        showAlertTopEnd('warning', 'Ya se registró el menu del MIERCOLES');
                    }
                });
            } else {

                document.querySelector("#txtTituloModalMan").innerHTML = "MIERCOLES";
                index(ListaComidaDesayunoMi, ListaComidaAlmuerzoMi, ListaComidaCenaMi);
                dms = new DetalleCronogramaCu();
                $('#ventanaModalMenuSemanal').modal("show");
            }



        };
    });
    document.querySelectorAll('.agregar-menu-JUEVES').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            if (listDMS.length != 0) {
                listDMS.forEach(detallecu => {
                    if (diaSemanaFecha(detallecu.fecha) != "JUEVES") {

                        document.querySelector("#txtTituloModalMan").innerHTML = "JUEVES";
                        dms = new DetalleCronogramaCu();
                        index(ListaComidaDesayunoJu, ListaComidaAlmuerzoJu, ListaComidaCenaJu);
                        $('#ventanaModalMenuSemanal').modal("show");
                        return;
                    } else {
                        showAlertTopEnd('warning', 'Ya se registró el menu del JUEVES');
                    }
                });
            } else {

                document.querySelector("#txtTituloModalMan").innerHTML = "JUEVES";
                dms = new DetalleCronogramaCu();
                index(ListaComidaDesayunoJu, ListaComidaAlmuerzoJu, ListaComidaCenaJu);
                $('#ventanaModalMenuSemanal').modal("show");
            }



        };
    });
    document.querySelectorAll('.agregar-menu-VIERNES').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            if (listDMS.length != 0) {
                listDMS.forEach(detallecu => {
                    if (diaSemanaFecha(detallecu.fecha) != "VIERNES") {
                        document.querySelector("#txtTituloModalMan").innerHTML = "VIERNES";
                        dms = new DetalleCronogramaCu();
                        index(ListaComidaDesayunoVi, ListaComidaAlmuerzoVi, ListaComidaCenaVi);
                        $('#ventanaModalMenuSemanal').modal("show");
                        return;
                    } else {
                        showAlertTopEnd('warning', 'Ya se registró el menu del VIERNES');
                    }
                });
            } else {
                index(ListaComidaDesayunoVi, ListaComidaAlmuerzoVi, ListaComidaCenaVi);
                document.querySelector("#txtTituloModalMan").innerHTML = "VIERNES";
                dms = new DetalleCronogramaCu();
                $('#ventanaModalMenuSemanal').modal("show");

            }



        };
    });
    document.querySelectorAll('.eliminar-menu').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {

            beanRequestMenuSemanal.operation = "delete";
            beanRequestMenuSemanal.type_request = "DELETE";
            processAjaxMenuSemanal();
        };
    });
    document.querySelectorAll('.agregar-comida').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            comidaSelected = findByComida(btn.getAttribute('idcomida'));
            if (comidaSelected !== undefined) {
                var fechas;
                if (detalleCronogramaSelected !== undefined) {
                    fechas = diaSemanaFecha(detalleCronogramaSelected.fecha);
                } else {
                    fechas = document.querySelector("#txtTituloModalMan").innerHTML;
                }
                switch (fechas) {
                    case 'LUNES':
                        comidaSelectedTipoPush(comidaSelected);
                        AgregarComidaTabla(ListaComidaDesayuno, ListaComidaAlmuerzo, ListaComidaCena);
                        break;
                    case 'MARTES':
                        comidaSelectedTipoPush(comidaSelected);
                        AgregarComidaTabla(ListaComidaDesayunoMa, ListaComidaAlmuerzoMa, ListaComidaCenaMa);
                        break;
                    case 'MIERCOLES':
                        comidaSelectedTipoPush(comidaSelected);
                        AgregarComidaTabla(ListaComidaDesayunoMi, ListaComidaAlmuerzoMi, ListaComidaCenaMi);
                        break;
                    case 'JUEVES':
                        comidaSelectedTipoPush(comidaSelected);
                        AgregarComidaTabla(ListaComidaDesayunoJu, ListaComidaAlmuerzoJu, ListaComidaCenaJu);
                        break;
                    case 'VIERNES':
                        comidaSelectedTipoPush(comidaSelected);
                        AgregarComidaTabla(ListaComidaDesayunoVi, ListaComidaAlmuerzoVi, ListaComidaCenaVi);
                        break;
                    default:
                        break;
                }
                toListSemanal();

            } else {
                showAlertTopEnd('warning', 'No se encontró la comida para agregar a la lista');
            }
        };
    });
    document.querySelectorAll('.quitar-comida').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            var fechaActual;
            if (detalleCronogramaSelected !== undefined) {
                fechaActual = diaSemanaFecha(detalleCronogramaSelected.fecha);
            } else {
                fechaActual = document.querySelector("#txtTituloModalMan").innerHTML;
            }
            switch (fechaActual) {
                case 'LUNES':
                    QuitarComidaTabla(ListaComidaDesayuno, ListaComidaAlmuerzo, ListaComidaCena, btn.parentElement.parentElement.getAttribute('idarraycomida'));
                    break;
                case 'MARTES':
                    QuitarComidaTabla(ListaComidaDesayunoMa, ListaComidaAlmuerzoMa, ListaComidaCenaMa, btn.parentElement.parentElement.getAttribute('idarraycomida'));
                    break;
                case 'MIERCOLES':
                    QuitarComidaTabla(ListaComidaDesayunoMi, ListaComidaAlmuerzoMi, ListaComidaCenaMi, btn.parentElement.parentElement.getAttribute('idarraycomida'));
                    break;
                case 'JUEVES':
                    QuitarComidaTabla(ListaComidaDesayunoJu, ListaComidaAlmuerzoJu, ListaComidaCenaJu, btn.parentElement.parentElement.getAttribute('idarraycomida'));
                    break;
                case 'VIERNES':
                    QuitarComidaTabla(ListaComidaDesayunoVi, ListaComidaAlmuerzoVi, ListaComidaCenaVi, btn.parentElement.parentElement.getAttribute('idarraycomida'));
                    break;
                default:
                    break;
            }
            toListSemanal();

        };
    });

}

function comidaSelectedTipoPush(comidaSelected) {
    switch (document.querySelector("#IndexMenuSemanal").value) {
        case '0':
            switch (comidaSelected.tipo) {
                case 1:
                    dms.comida_dsegundo = comidaSelected;

                    break;
                case 2:
                    dms.comida_dbebida = comidaSelected;
                    break;
                case 3:
                    dms.comida_dpostre = comidaSelected;
                    break;

                default:

                    break;
            }
            break;
        case '1':
            switch (comidaSelected.tipo) {
                case 1:
                    dms.comida_asegundo = comidaSelected;
                    break;
                case 2:
                    dms.comida_abebida = comidaSelected;
                    break;
                case 3:
                    dms.comida_apostre = comidaSelected;
                    break;
                case 4:
                    dms.comida_asopa = comidaSelected;
                    break;
                default:

                    break;
            }
            break;
        case '2':
            switch (comidaSelected.tipo) {
                case 1:
                    dms.comida_csegundo = comidaSelected;
                    break;
                case 2:
                    dms.comida_cbebida = comidaSelected;
                    break;
                case 3:
                    dms.comida_cpostre = comidaSelected;
                    break;
                case 4:
                    dms.comida_csopa = comidaSelected;
                    break;

                default:

                    break;
            }
            break;
        default:

            break;
    }
}

function findByMenuSemanal(iddetallecronogramacu) {
    let comida_;
    beanPaginationMenuSemanal.list.forEach(detallecronogramacu => {
        if (iddetallecronogramacu == detallecronogramacu.iddetalle_cronogramacu) {
            comida_ = detallecronogramacu;
            return;
        }
    });
    return comida_;
}

function validateFormMenuSemanal() {
    if (document.querySelector("#txtMenuSemanalObservacion").value == 0) {
        showAlertTopEnd('warning', 'Por favor ingrese la observacion de la semana ');
        document.querySelector("#txtMenuSemanalObservacion").focus();
        return false;
    } else if (ListaComidaDesayuno.length < 3) {
        showAlertTopEnd('warning', 'Por favor ingrese la Almuerzo');
        return false;
    } else if (ListaComidaAlmuerzo.length < 4) {
        showAlertTopEnd('warning', 'Por favor ingrese Cena');
        return false;
    } else if (ListaComidaCena.length < 4) {
        showAlertTopEnd('warning', 'Por favor ingrese Cena');
        return false;
    }
    return true;
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



//COMIDA


function findByComida(idcomida) {
    let comida_;
    beanPaginationComida.list.forEach(comida => {
        if (idcomida == comida.idcomida) {
            comida_ = comida;
            return;
        }
    });
    return comida_;
}

function toListComida(beanPagination, tablaResultado) {
    document.querySelector(tablaResultado).innerHTML = "";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(comida => {
            row = "<a idcomida='" + comida.idcomida + "' href='javascript:void(0)' ";
            row += "class='list-group-item list-group-item-action pt-1 pb-1 agregar-comida'>" + comida.descripcion.toUpperCase();
            row += "</a>";
            document.querySelector(tablaResultado).innerHTML += row;
        });
        addEventsMenuSemanales();
    } else {
        destroyPagination($('#paginationComida'));
        showAlertTopEnd('warning', 'No se encontraron resultados');

    }
}

function processAjaxComida(filterTipo, filternombre) {
    $.ajax({
        url: getHostAPI() + "api/comidas/paginate?tipo=" + filterTipo +
                "&nombre=" + filternombre.toUpperCase() + "&page=1&size=20",
        type: "GET",
        headers: {
            //'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoComida').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() === "ok") {
                $('#ventanaModalComida').modal('hide');
                showAlertTopEnd('success', 'Acción realizada exitosamente');

            } else {

                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationComida = beanCrudResponse.beanPagination;
            switch (document.querySelector("#IndexMenuSemanal").value) {
                case '0':
                    toListComida(beanPaginationComida, "#ResultadoComidaDesayuno");
                    break;
                case '1':
                    toListComida(beanPaginationComida, "#ResultadoComidaAlmuerzo");
                    break;
                case '2':
                    toListComida(beanPaginationComida, "#ResultadoComidaCena");
                    break;
                default:
                    break;
            }

        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        showAlertErrorRequest();

    });
}

function toListComidaTabla(ArrayComida, tablaBody) {
    document.querySelector(tablaBody).innerHTML = "";
    if (ArrayComida.length > 0) {
        let row;
        ArrayComida.forEach(function (element, index) {
            row = "<tr ";
            row += "idarraycomida='" + element.idcomida + "' ";
            row += ">";
            row += "<td class='align-middle'>" + tipoComida(element.tipo) + "</td>";
            row += "<td class='align-middle'>" + element.descripcion + "</td>";
            row += "<td class='text-center align-middle'><button type='button'class='btn btn-outline-primary btn-xs quitar-comida' data-toggle='tooltip' title='Quitar de la lista'><i class='icon icon-trash icon-fw'></i></button></td>";
            row += "</tr>";
            document.querySelector(tablaBody).innerHTML += row;
        });
        addEventsMenuSemanales();

    } else {
        showAlertTopEnd('warning', 'No se encontraron resultados');

    }
}


function pushDesayuno(detallecronograma, listadia) {
    listadia.push({idcomida: detallecronograma.comida_dsegundo.idcomida,
        tipo: detallecronograma.comida_dsegundo.tipo, descripcion: detallecronograma.comida_dsegundo.descripcion.toUpperCase()});
    listadia.push({idcomida: detallecronograma.comida_dpostre.idcomida,
        tipo: detallecronograma.comida_dpostre.tipo, descripcion: detallecronograma.comida_dpostre.descripcion.toUpperCase()});
    listadia.push({idcomida: detallecronograma.comida_dbebida.idcomida,
        tipo: detallecronograma.comida_dbebida.tipo, descripcion: detallecronograma.comida_dbebida.descripcion.toUpperCase()});
    toListComidaTabla(listadia, ".tbodyComidaDesayuno");
}

function pushAlmuerzo(detallecronograma, listadia) {
    listadia.push({idcomida: detallecronograma.comida_asegundo.idcomida,
        tipo: detallecronograma.comida_asegundo.tipo, descripcion: detallecronograma.comida_asegundo.descripcion.toUpperCase()});
    listadia.push({idcomida: detallecronograma.comida_asopa.idcomida,
        tipo: detallecronograma.comida_asopa.tipo, descripcion: detallecronograma.comida_asopa.descripcion.toUpperCase()});
    listadia.push({idcomida: detallecronograma.comida_apostre.idcomida,
        tipo: detallecronograma.comida_apostre.tipo, descripcion: detallecronograma.comida_apostre.descripcion.toUpperCase()});
    listadia.push({idcomida: detallecronograma.comida_abebida.idcomida,
        tipo: detallecronograma.comida_abebida.tipo, descripcion: detallecronograma.comida_abebida.descripcion.toUpperCase()});
    toListComidaTabla(listadia, ".tbodyComidaAlmuerzo");

}

function pushCena(detallecronograma, listadia) {
    listadia.push({idcomida: detallecronograma.comida_csegundo.idcomida,
        tipo: detallecronograma.comida_csegundo.tipo, descripcion: detallecronograma.comida_csegundo.descripcion.toUpperCase()});
    listadia.push({idcomida: detallecronograma.comida_csopa.idcomida,
        tipo: detallecronograma.comida_csopa.tipo, descripcion: detallecronograma.comida_csopa.descripcion.toUpperCase()});
    listadia.push({idcomida: detallecronograma.comida_cpostre.idcomida,
        tipo: detallecronograma.comida_cpostre.tipo, descripcion: detallecronograma.comida_cpostre.descripcion.toUpperCase()});
    listadia.push({idcomida: detallecronograma.comida_cbebida.idcomida,
        tipo: detallecronograma.comida_cbebida.tipo, descripcion: detallecronograma.comida_cbebida.descripcion.toUpperCase()});
    toListComidaTabla(listadia, ".tbodyComidaCena");
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

function AgregarComidaTabla(ListaComidaDesayuno, ListaComidaAlmuerzo, ListaComidaCena) {
    if (comidaSelected !== undefined) {
        switch (document.querySelector("#IndexMenuSemanal").value) {
            case '0':
                if (ListaComidaDesayuno.find(comida => comida.tipo === comidaSelected.tipo) === undefined) {
                    if (ListaComidaDesayuno.length < 3) {
                        ListaComidaDesayuno.push({idcomida: comidaSelected.idcomida,
                            tipo: comidaSelected.tipo,
                            descripcion: comidaSelected.descripcion.toUpperCase()});
                        toListComidaTabla(ListaComidaDesayuno, ".tbodyComidaDesayuno");
                    } else {
                        showAlertTopEnd('warning', 'Solamente se permite 3 comidas');
                    }
                } else {
                    showAlertTopEnd('warning', 'Ya existe ' + tipoComida(comidaSelected.tipo) + " agregado");
                }

                document.querySelector("#ResultadoComidaDesayuno").style.height = "0px";
                break;
            case '1':
                if (ListaComidaAlmuerzo.find(comida => comida.tipo === comidaSelected.tipo) === undefined) {
                    if (ListaComidaAlmuerzo.length < 4) {
                        ListaComidaAlmuerzo.push({idcomida: comidaSelected.idcomida,
                            tipo: comidaSelected.tipo,
                            descripcion: comidaSelected.descripcion.toUpperCase()});
                        toListComidaTabla(ListaComidaAlmuerzo, ".tbodyComidaAlmuerzo");
                    } else {
                        showAlertTopEnd('warning', 'Solamente se permite 4 comidas');
                    }
                } else {
                    showAlertTopEnd('warning', 'Ya existe ' + tipoComida(comidaSelected.tipo) + " agregado");
                }
                document.querySelector("#ResultadoComidaAlmuerzo").style.height = "0px";
                break;
            case '2':
                if (ListaComidaCena.find(comida => comida.tipo === comidaSelected.tipo) === undefined) {
                    if (ListaComidaCena.length < 4) {
                        ListaComidaCena.push({idcomida: comidaSelected.idcomida,
                            tipo: comidaSelected.tipo,
                            descripcion: comidaSelected.descripcion.toUpperCase()});
                        toListComidaTabla(ListaComidaCena, ".tbodyComidaCena");
                    } else {
                        showAlertTopEnd('warning', 'Solamente se permite 4 comidas');
                    }
                } else {
                    showAlertTopEnd('warning', 'Ya existe ' + tipoComida(comidaSelected.tipo) + " agregado");
                }
                document.querySelector("#ResultadoComidaCena").style.height = "0px";
                break;
            default:
                break;
        }
    }

}

function QuitarComidaTabla(ListaComidaDesayuno, ListaComidaAlmuerzo, ListaComidaCena, idarraycomida) {
    var i;
    switch (document.querySelector("#IndexMenuSemanal").value) {
        case '0':
            for (i in ListaComidaDesayuno) {
                if (ListaComidaDesayuno[i]['idcomida'] == idarraycomida) {
                    switch (ListaComidaDesayuno[i]['tipo']) {
                        case 1:
                            dms.comida_dsegundo = new Comida(undefined, undefined, undefined);
                            console.log(dms.comida_dsegundo);
                            break;
                        case 2:
                            dms.comida_dbebida = new Comida(undefined, undefined, undefined);
                            break;
                        case 3:
                            dms.comida_dpostre = new Comida(undefined, undefined, undefined);
                            break;
                        default:

                            break;
                    }
                    break;
                }
            }
            ListaComidaDesayuno.splice(i, 1);
            toListComidaTabla(ListaComidaDesayuno, ".tbodyComidaDesayuno");
            break;
        case '1':
            for (i in ListaComidaAlmuerzo) {
                if (ListaComidaAlmuerzo[i]['idcomida'] == idarraycomida) {
                    switch (ListaComidaAlmuerzo[i]['tipo']) {
                        case 1:
                            dms.comida_asegundo = new Comida(undefined, undefined, undefined);
                            break;
                        case 2:
                            dms.comida_abebida = new Comida(undefined, undefined, undefined);
                            break;
                        case 3:
                            dms.comida_apostre = new Comida(undefined, undefined, undefined);
                            break;
                        case 4:
                            dms.comida_apostre = new Comida(undefined, undefined, undefined);
                            break;
                        default:

                            break;
                    }
                    break;
                }
            }
            ListaComidaAlmuerzo.splice(i, 1);
            toListComidaTabla(ListaComidaAlmuerzo, ".tbodyComidaAlmuerzo");
            break;
        case '2':
            for (i in ListaComidaCena) {
                if (ListaComidaCena[i]['idcomida'] == idarraycomida) {
                    switch (ListaComidaCena[i]['tipo']) {
                        case 1:
                            dms.comida_csegundo = new Comida(undefined, undefined, undefined);
                            break;
                        case 2:
                            dms.comida_cbebida = new Comida(undefined, undefined, undefined);
                            break;
                        case 3:
                            dms.comida_cpostre = new Comida(undefined, undefined, undefined);
                            break;
                        case 4:
                            dms.comida_cpostre = new Comida(undefined, undefined, undefined);
                            break;
                        default:

                            break;
                    }
                    break;
                }
            }
            ListaComidaCena.splice(i, 1);
            toListComidaTabla(ListaComidaCena, ".tbodyComidaCena");
            break;
        default:
            break;
    }
}