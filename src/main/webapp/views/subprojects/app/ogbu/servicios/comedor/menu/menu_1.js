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
    let p1 = new Point({x: 10, y: 20});
    let p2 = new Point();

    console.log(p1.toString()); // (0, 0)
    console.log(p2.toString()); // (0, 0)
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

    document.querySelector("#btnCerrarAddMenus").onclick = function () {
        if (dms.comida_asegundo.idcomida == 0) {
            
        }
        
        
        $("#dsds").modal('hide');
        
        listDMS.push(dms);
    }

    $("#modalCargandoMenuSemanal").on('hide.bs.modal', function () {
        beanRequestMenuSemanal.entity_api = "api/menusemanal";
        beanRequestMenuSemanal.operation = "paginate";
    });

    $('#modalCargandoMenuSemanal').modal('show');

    onclickSemana();

});

function onclickSemana() {
    document.querySelector("#LuDesayunoAbrirModal").onclick = function () {
        $('#ventanaModalMenuSemanal').modal('show');
        document.querySelector("#IndexMenuSemanal").value = 0;
        document.querySelector("#buttonCena").classList.remove("active");
        document.querySelector("#buttonAlmuerzo").classList.remove("active");
        document.querySelector("#buttonDesayuno").classList.add("active");
    };
    document.querySelector("#LuAlmuerzoAbrirModal").onclick = function () {
        $('#ventanaModalMenuSemanal').modal('show');
        document.querySelector("#IndexMenuSemanal").value = 1;
        document.querySelector("#buttonCena").classList.remove("active");
        document.querySelector("#buttonDesayuno").classList.remove("active");
        document.querySelector("#buttonAlmuerzo").classList.add("active");
    };
    document.querySelector("#LuCenaAbrirModal").onclick = function () {
        $('#ventanaModalMenuSemanal').modal('show');
        document.querySelector("#IndexMenuSemanal").value = 2;
        document.querySelector("#buttonAlmuerzo").classList.remove("active");
        document.querySelector("#buttonDesayuno").classList.remove("active");
        document.querySelector("#buttonCena").classList.add("active");
    };

    document.querySelector("#MaDesayunoAbrirModal").onclick = function () {
        $('#ventanaModalMenuSemanal').modal('show');
        document.querySelector("#IndexMenuSemanal").value = 0;
        document.querySelector("#buttonCena").classList.remove("active");
        document.querySelector("#buttonAlmuerzo").classList.remove("active");
        document.querySelector("#buttonDesayuno").classList.add("active");
    };
    document.querySelector("#MaAlmuerzoAbrirModal").onclick = function () {
        $('#ventanaModalMenuSemanal').modal('show');
        document.querySelector("#IndexMenuSemanal").value = 1;
        document.querySelector("#buttonCena").classList.remove("active");
        document.querySelector("#buttonDesayuno").classList.remove("active");
        document.querySelector("#buttonAlmuerzo").classList.add("active");
    };
    document.querySelector("#MaCenaAbrirModal").onclick = function () {
        $('#ventanaModalMenuSemanal').modal('show');
        document.querySelector("#IndexMenuSemanal").value = 2;
        document.querySelector("#buttonAlmuerzo").classList.remove("active");
        document.querySelector("#buttonDesayuno").classList.remove("active");
        document.querySelector("#buttonCena").classList.add("active")
    };

    document.querySelector("#MiDesayunoAbrirModal").onclick = function () {
        $('#ventanaModalMenuSemanal').modal('show');
        document.querySelector("#IndexMenuSemanal").value = 0;
        document.querySelector("#buttonCena").classList.remove("active");
        document.querySelector("#buttonAlmuerzo").classList.remove("active");
        document.querySelector("#buttonDesayuno").classList.add("active");
    };
    document.querySelector("#MiAlmuerzoAbrirModal").onclick = function () {
        $('#ventanaModalMenuSemanal').modal('show');
        document.querySelector("#IndexMenuSemanal").value = 1;
        document.querySelector("#buttonCena").classList.remove("active");
        document.querySelector("#buttonDesayuno").classList.remove("active");
        document.querySelector("#buttonAlmuerzo").classList.add("active");
    };
    document.querySelector("#MiCenaAbrirModal").onclick = function () {
        $('#ventanaModalMenuSemanal').modal('show');
        document.querySelector("#IndexMenuSemanal").value = 2;
        document.querySelector("#buttonAlmuerzo").classList.remove("active");
        document.querySelector("#buttonDesayuno").classList.remove("active");
        document.querySelector("#buttonCena").classList.add("active")
    };

    document.querySelector("#JuDesayunoAbrirModal").onclick = function () {
        $('#ventanaModalMenuSemanal').modal('show');
        document.querySelector("#IndexMenuSemanal").value = 0;
        document.querySelector("#buttonCena").classList.remove("active");
        document.querySelector("#buttonAlmuerzo").classList.remove("active");
        document.querySelector("#buttonDesayuno").classList.add("active");
    };
    document.querySelector("#JuAlmuerzoAbrirModal").onclick = function () {
        $('#ventanaModalMenuSemanal').modal('show');
        document.querySelector("#IndexMenuSemanal").value = 1;
        document.querySelector("#buttonCena").classList.remove("active");
        document.querySelector("#buttonDesayuno").classList.remove("active");
        document.querySelector("#buttonAlmuerzo").classList.add("active");
    };
    document.querySelector("#JuCenaAbrirModal").onclick = function () {
        $('#ventanaModalMenuSemanal').modal('show');
        document.querySelector("#IndexMenuSemanal").value = 2;
        document.querySelector("#buttonAlmuerzo").classList.remove("active");
        document.querySelector("#buttonDesayuno").classList.remove("active");
        document.querySelector("#buttonCena").classList.add("active")
    };

    document.querySelector("#ViDesayunoAbrirModal").onclick = function () {
        $('#ventanaModalMenuSemanal').modal('show');
        document.querySelector("#IndexMenuSemanal").value = 0;
        document.querySelector("#buttonCena").classList.remove("active");
        document.querySelector("#buttonAlmuerzo").classList.remove("active");
        document.querySelector("#buttonDesayuno").classList.add("active");
    };
    document.querySelector("#ViAlmuerzoAbrirModal").onclick = function () {
        $('#ventanaModalMenuSemanal').modal('show');
        document.querySelector("#IndexMenuSemanal").value = 1;
        document.querySelector("#buttonCena").classList.remove("active");
        document.querySelector("#buttonDesayuno").classList.remove("active");
        document.querySelector("#buttonAlmuerzo").classList.add("active");
    };
    document.querySelector("#ViCenaAbrirModal").onclick = function () {
        $('#ventanaModalMenuSemanal').modal('show');
        document.querySelector("#IndexMenuSemanal").value = 2;
        document.querySelector("#buttonAlmuerzo").classList.remove("active");
        document.querySelector("#buttonDesayuno").classList.remove("active");
        document.querySelector("#buttonCena").classList.add("active")
    };
}

class Point {
    constructor(args = {}) {
        ({x: this.x = 0, y: this.y = 0} = args);
    }

    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }
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
            parameters_pagination = "/" + detalleCronogramaSelected.menu_semanal.idmenu_semanal;
            json = {};
        } else {
            var j;
            for (j in ListaComidaDesayuno) {
                switch (ListaComidaDesayuno[j]['tipo']) {
                    case 1:
                        var ds = ListaComidaDesayuno[j];
                        break;
                    case 2:
                        var db = ListaComidaDesayuno[j];
                        break;
                    case 3:
                        var dp = ListaComidaDesayuno[j];
                        break;
                    default:

                        break;
                }

            }
            j = 0;
            for (j in ListaComidaAlmuerzo) {
                switch (ListaComidaAlmuerzo[j]['tipo']) {
                    case 1:
                        var as = ListaComidaAlmuerzo[j];
                        break;
                    case 2:
                        var ab = ListaComidaAlmuerzo[j];
                        break;
                    case 3:
                        var ap = ListaComidaAlmuerzo[j];
                        break;
                    case 4:
                        var aso = ListaComidaAlmuerzo[j];
                        break;
                    default:

                        break;
                }

            }

            j = 0;
            for (j in ListaComidaCena) {
                switch (ListaComidaCena[j]['tipo']) {
                    case 1:
                        var cs = ListaComidaCena[j];
                        break;
                    case 2:
                        var cb = ListaComidaCena[j];
                        break;
                    case 3:
                        var cp = ListaComidaCena[j];
                        break;
                    case 4:
                        var cso = ListaComidaCena[j];
                        break;
                    default:

                        break;
                }

            }
            json = {
                "menu_semanal": {
                    "fechai": document.querySelector("#txtMenuSemanalFechaI").value.split("-")[2] + "/" +
                            document.querySelector("#txtMenuSemanalFechaI").value.split("-")[1] + "/" +
                            document.querySelector("#txtMenuSemanalFechaI").value.split("-")[0],
                    "fechaf": document.querySelector("#txtMenuSemanalFechaF").value.split("-")[2] + "/" +
                            document.querySelector("#txtMenuSemanalFechaF").value.split("-")[1] + "/" +
                            document.querySelector("#txtMenuSemanalFechaF").value.split("-")[0],
                    "observacion": document.querySelector("#txtMenuSemanalObservacion").value},
                "list": {
                    "fecha": document.querySelector("#txtMenuSemanalFecha").value.split("-")[2] + "/" +
                            document.querySelector("#txtMenuSemanalFecha").value.split("-")[1] + "/" +
                            document.querySelector("#txtMenuSemanalFecha").value.split("-")[0],
                    "comida_dsegundo": ds,
                    "comida_dpostre": dp,
                    "comida_dbebida": db,
                    "comida_asegundo": as,
                    "comida_asopa": aso,
                    "comida_abebida": ab,
                    "comida_apostre": ap,
                    "comida_csegundo": cs,
                    "comida_csopa": cso,
                    "comida_cbebida": cb,
                    "comida_cpostre": cp
                }
            };
            if (beanRequestMenuSemanal.operation === "update") {
                json.menu_semanal.idmenu_semanal = detalleCronogramaSelected.menu_semanal.idmenu_semanal;
                json.list.iddetalle_cronogramacu = detalleCronogramaSelected.iddetalle_cronogramacu;
            }
        }
    }
    let  list = [
        {},
        {}

    ];
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
                                                            <li><span class="badge badge-sm badge-pill badge-info  d-sm-inline-block">${desayuno[1] == undefined ? "" : desayuno[1].descripcion}</span></li>
                                                            <li><span class="badge badge-sm badge-pill badge-warning  d-sm-inline-block">${desayuno[2] == undefined ? "" : desayuno[2].descripcion}</span></li>
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

function index(numeroIndex, LisComidaDesayuno, LisComidaAlmuerzo, LisComidaCena) {
    switch (numeroIndex) {
        case '0':
            toListComidaTabla(LisComidaDesayuno, ".tbodyComidaDesayuno");
            break;
        case '1':
            toListComidaTabla(LisComidaAlmuerzo, ".tbodyComidaAlmuerzo");
            break;
        case '2':
            toListComidaTabla(LisComidaCena, ".tbodyComidaCena");
            break;
        default:
            break;
    }

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
            console.log(beanPaginationMenuSemanal);
            //SET VALUES MODAL
            document.querySelector("#txtMenuSemanalFechaI").value = beanPaginationMenuSemanal.list[0].menu_semanal.fechai.split("/")[2] + "-" +
                    beanPaginationMenuSemanal.list[0].menu_semanal.fechai.split("/")[1] + "-" +
                    beanPaginationMenuSemanal.list[0].menu_semanal.fechai.split("/")[0];
            document.querySelector("#txtMenuSemanalFechaF").value = beanPaginationMenuSemanal.list[0].menu_semanal.fechaf.split("/")[2] + "-" +
                    beanPaginationMenuSemanal.list[0].menu_semanal.fechaf.split("/")[1] + "-" +
                    beanPaginationMenuSemanal.list[0].menu_semanal.fechaf.split("/")[0];
            document.querySelector("#txtMenuSemanalObservacion").value = beanPaginationMenuSemanal.list[0].menu_semanal.observacion;

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
                        document.querySelector("#txtMenuSemanalFechaMartes").value = dcu.fecha.split("/")[2] + "-" +
                                dcu.fecha.split("/")[1] + "-" + dcu.fecha.split("/")[0];
                        pushDesayuno(dcu, ListaComidaDesayunoMa);
                        pushAlmuerzo(dcu, ListaComidaAlmuerzoMa);
                        pushCena(dcu, ListaComidaCenaMa);
                        break;
                    case 'MIERCOLES':
                        document.querySelector("#txtMenuSemanalFechaMiercoles").value = dcu.fecha.split("/")[2] + "-" +
                                dcu.fecha.split("/")[1] + "-" + dcu.fecha.split("/")[0];
                        pushDesayuno(dcu, ListaComidaDesayunoMi);
                        pushAlmuerzo(dcu, ListaComidaAlmuerzoMi);
                        pushCena(dcu, ListaComidaCenaMi);
                        break;
                    case 'JUEVES':
                        document.querySelector("#txtMenuSemanalFechaJueves").value = dcu.fecha.split("/")[2] + "-" +
                                dcu.fecha.split("/")[1] + "-" + dcu.fecha.split("/")[0];
                        pushDesayuno(dcu, ListaComidaDesayunoJu);
                        pushAlmuerzo(dcu, ListaComidaAlmuerzoJu);
                        pushCena(dcu, ListaComidaCenaJu);
                        break;
                    case 'VIERNES':
                        console.log(dcu.fecha);
                        document.querySelector("#txtMenuSemanalFechaViernes").value = dcu.fecha.split("/")[2] + "-" +
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


            document.querySelector('#txtMenuSemanalFechaMiercoles').style.display = "none";
            document.querySelector('#txtMenuSemanalFechaMartes').style.display = "none";
            document.querySelector('#txtMenuSemanalFechaJueves').style.display = "none";
            document.querySelector('#txtMenuSemanalFechaViernes').style.display = "none";
            document.querySelector('#txtMenuSemanalFecha').style.display = "block";
            document.querySelector("#txtTituloModalMan").innerHTML = "LUNES";
            index(document.querySelector("#IndexMenuSemanal").value, ListaComidaDesayuno, ListaComidaAlmuerzo, ListaComidaCena);
            dms = new DetalleCronogramaCu();
            $('#ventanaModalMenuSemanal').modal("show");
        };
    });
    document.querySelectorAll('.agregar-menu-MARTES').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {

            document.querySelector('#txtMenuSemanalFechaMiercoles').style.display = "none";
            document.querySelector('#txtMenuSemanalFechaMartes').style.display = "block";
            document.querySelector('#txtMenuSemanalFechaJueves').style.display = "none";
            document.querySelector('#txtMenuSemanalFechaViernes').style.display = "none";
            document.querySelector('#txtMenuSemanalFecha').style.display = "none";
            document.querySelector("#txtTituloModalMan").innerHTML = "MARTES";
            index(document.querySelector("#IndexMenuSemanal").value, ListaComidaDesayunoMa, ListaComidaAlmuerzoMa, ListaComidaCenaMa);
            $('#ventanaModalMenuSemanal').modal("show");


        };
    });
    document.querySelectorAll('.agregar-menu-MIERCOLES').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {

            document.querySelector('#txtMenuSemanalFechaMiercoles').style.display = "block";
            document.querySelector('#txtMenuSemanalFechaMartes').style.display = "none";
            document.querySelector('#txtMenuSemanalFechaJueves').style.display = "none";
            document.querySelector('#txtMenuSemanalFechaViernes').style.display = "none";
            document.querySelector('#txtMenuSemanalFecha').style.display = "none";
            document.querySelector("#txtTituloModalMan").innerHTML = "MIERCOLES";
            index(document.querySelector("#IndexMenuSemanal").value, ListaComidaDesayunoMi, ListaComidaAlmuerzoMi, ListaComidaCenaMi);

            $('#ventanaModalMenuSemanal').modal("show");


        };
    });
    document.querySelectorAll('.agregar-menu-JUEVES').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {

            document.querySelector('#txtMenuSemanalFechaMiercoles').style.display = "none";
            document.querySelector('#txtMenuSemanalFechaMartes').style.display = "none";
            document.querySelector('#txtMenuSemanalFechaJueves').style.display = "block";
            document.querySelector('#txtMenuSemanalFechaViernes').style.display = "none";
            document.querySelector('#txtMenuSemanalFecha').style.display = "none";
            document.querySelector("#txtTituloModalMan").innerHTML = "JUEVES";
            index(document.querySelector("#IndexMenuSemanal").value, ListaComidaDesayunoJu, ListaComidaAlmuerzoJu, ListaComidaCenaJu);
            $('#ventanaModalMenuSemanal').modal("show");


        };
    });
    document.querySelectorAll('.agregar-menu-VIERNES').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {

            document.querySelector('#txtMenuSemanalFechaMiercoles').style.display = "none";
            document.querySelector('#txtMenuSemanalFechaMartes').style.display = "none";
            document.querySelector('#txtMenuSemanalFechaJueves').style.display = "none";
            document.querySelector('#txtMenuSemanalFechaViernes').style.display = "block";
            document.querySelector('#txtMenuSemanalFecha').style.display = "none";
            document.querySelector("#txtTituloModalMan").innerHTML = "VIERNES";
            index(document.querySelector("#IndexMenuSemanal").value, ListaComidaDesayunoVi, ListaComidaAlmuerzoVi, ListaComidaCenaVi);
            $('#ventanaModalMenuSemanal').modal("show");


        };
    });
    document.querySelectorAll('.eliminar-menu').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {

            beanRequestMenuSemanal.operation = "delete";
            beanRequestMenuSemanal.type_request = "DELETE";
            console.log(beanPaginationMenuSemanal);

            //processAjaxMenuSemanal();
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
                        AgregarComidaTabla(ListaComidaDesayuno, ListaComidaAlmuerzo, ListaComidaCena);
                        dms.comida_asegundo = comidaSelected;
                        dms.comida_asegundo = comidaSelected;
                        dms.comida_asegundo = comidaSelected;
                        break;
                    case 'MARTES':
                        AgregarComidaTabla(ListaComidaDesayunoMa, ListaComidaAlmuerzoMa, ListaComidaCenaMa);
                        break;
                    case 'MIERCOLES':
                        AgregarComidaTabla(ListaComidaDesayunoMi, ListaComidaAlmuerzoMi, ListaComidaCenaMi);
                        break;
                    case 'JUEVES':
                        AgregarComidaTabla(ListaComidaDesayunoJu, ListaComidaAlmuerzoJu, ListaComidaCenaJu);
                        break;
                    case 'VIERNES':
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
                    break;
                }
            }
            ListaComidaDesayuno.splice(i, 1);
            toListComidaTabla(ListaComidaDesayuno, ".tbodyComidaDesayuno");
            break;
        case '1':
            for (i in ListaComidaAlmuerzo) {
                if (ListaComidaAlmuerzo[i]['idcomida'] == idarraycomida) {
                    break;
                }
            }
            ListaComidaAlmuerzo.splice(i, 1);
            toListComidaTabla(ListaComidaAlmuerzo, ".tbodyComidaAlmuerzo");
            break;
        case '2':
            for (i in ListaComidaCena) {
                if (ListaComidaCena[i]['idcomida'] == idarraycomida) {
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