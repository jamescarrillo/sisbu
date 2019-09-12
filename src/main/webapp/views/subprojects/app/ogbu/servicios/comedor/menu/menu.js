var beanPaginationMenuSemanal;
var beanPaginationComida;
var lista = "";
var ListaDetalleComida = [],
        ListaComidaCena = [],
        ListaComidaAlmuerzo = [],
        ListaComidaDesayuno = [];
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

    document.querySelector("#btnOpenNewMenuSemanal").onclick = function () {
        // listFilter();
        processAjaxComida();
        //CONFIGURAMOS LA SOLICITUD
        beanRequestMenuSemanal.operation = "add";
        beanRequestMenuSemanal.type_request = "POST";
        //LIMPIAR LOS CAMPOS
        ListaComidaAlmuerzo.length = 0;
        ListaComidaCena.length = 0;
        ListaComidaDesayuno.length = 0;
        ListaDetalleComida.length = 0;
        var fechaActual = new Date(); //Fecha actual
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
        //SET TITLE BUTTON
        document.querySelector("#buttonAlmuerzo").innerHTML = '<i class="icon icon-plus icon-fw"></i> ALMUERZO</button>';
        document.querySelector("#buttonCena").innerHTML = '<i class="icon icon-plus icon-fw"></i> CENA</button>';
        document.querySelector("#buttonDesayuno").innerHTML = '<i class="icon icon-plus icon-fw"></i> DESAYUNO</button>';
        //SET TITLE MODAL
        document.querySelector("#txtTituloModalMan").innerHTML = "REGISTRAR MENU";
        document.querySelector("#txtTituloModalComidaDiaria").innerHTML = "COMIDA";
        //OPEN MODEL
        $('#ventanaModalMenuSemanal').modal('show');
    };

    document.querySelector("#buttonAlmuerzo").onclick = function () {
        listFilter();
        processAjaxComida();
        //LIMPIAR LOS CAMPOS
        document.querySelector(".tbodyComidaDiaria").innerHTML = "";
        if (document.querySelector("#buttonAlmuerzo").innerHTML == "ALMUERZO") {
            toListComidaTabla(ListaComidaAlmuerzo);
            //SET TITLE MODAL
            document.querySelector("#txtTituloModalComidaDiaria").innerHTML = "EDITAR MENU DEL DESAYUNO";
        } else {
            ListaDetalleComida.length = 0;
            //SET TITLE MODAL
            document.querySelector("#txtTituloModalComidaDiaria").innerHTML = "REGISTRAR MENU DEL ALMUERZO";
        }
        document.querySelector("#btnGuardarComida").setAttribute("comida", "ALMUERZO");
        //OPEN MODEL
        $('#ventanaModalComidaDiaria').modal('show');
    };

    document.querySelector("#buttonDesayuno").onclick = function () {
        listFilter();
        processAjaxComida();
        //LIMPIAR LOS CAMPOS
        document.querySelector(".tbodyComidaDiaria").innerHTML = "";
        if (document.querySelector("#buttonDesayuno").innerHTML == "DESAYUNO") {
            toListComidaTabla(ListaComidaDesayuno);
            //SET TITLE MODAL
            document.querySelector("#txtTituloModalComidaDiaria").innerHTML = "EDITAR MENU DEL DESAYUNO";
        } else {
            ListaDetalleComida.length = 0;
            //SET TITLE MODAL
            document.querySelector("#txtTituloModalComidaDiaria").innerHTML = "REGISTRAR MENU DEL DESAYUNO";
        }
        document.querySelector("#btnGuardarComida").setAttribute("comida", "DESAYUNO");
        //OPEN MODEL
        $('#ventanaModalComidaDiaria').modal('show');
    };

    document.querySelector("#buttonCena").onclick = function () {
        listFilter();
        processAjaxComida();
        //LIMPIAR LOS CAMPOS
        document.querySelector(".tbodyComidaDiaria").innerHTML = "";
        if (document.querySelector("#buttonCena").innerHTML == "CENA") {
            toListComidaTabla(ListaComidaCena);
            //SET TITLE MODAL
            document.querySelector("#txtTituloModalComidaDiaria").innerHTML = "EDITAR MENU DE LA CENA";
        } else {
            ListaDetalleComida.length = 0;
            //SET TITLE MODAL
            document.querySelector("#txtTituloModalComidaDiaria").innerHTML = "REGISTRAR MENU DE LA CENA";
        }
        document.querySelector("#btnGuardarComida").setAttribute("comida", "CENA");
        //OPEN MODEL
        $('#ventanaModalComidaDiaria').modal('show');
    };

    document.querySelector("#btnGuardarComida").onclick = function () {
        //LIMPIAR LOS CAMPOS
        var ar;
        switch (document.querySelector("#btnGuardarComida").getAttribute("comida")) {
            case "DESAYUNO":
                ar = lista.split(",");
                for (var i = 0; i < ar.length-1; i++) {
                    ListaComidaDesayuno.push({idcomida: ar[i]});
                }
                break;
            case "ALMUERZO":
                ListaComidaAlmuerzo.concat(ListaDetalleComida);
                break;
            case "CENA":
                ListaComidaCena.concat(ListaDetalleComida);
                break;
            default:

                break;
        }
        if (ListaDetalleComida.length < 3) {
            showAlertTopEnd('warning', 'Por favor ingrese la lista de comida completa');
        } else {
            showAlertTopEnd('warning', 'Agregada la Comida, Continuar seleccione Guardar ');
            //OPEN MODEL
            $('#ventanaModalComidaDiaria').modal('hide');
            ListaDetalleComida.length = 0;
        }


    };

    $("#modalCargandoMenuSemanal").on('shown.bs.modal', function () {
        processAjaxMenuSemanal();
    });

    $('#modalCargandoMenuSemanal').modal('show');

});

function processAjaxMenuSemanal() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestMenuSemanal.operation === "paginate") {
        //
        parameters_pagination = "?fechai=" + document.querySelector("#txtFilterFechaI").value;
        parameters_pagination += "&fechaf=" + document.querySelector("#txtFilterFechaF").value;
        parameters_pagination += "&page=1";
        parameters_pagination += "&size=7";
    } else {
        parameters_pagination = "";
        if (beanRequestMenuSemanal.operation === "delete") {
            parameters_pagination = "/" + comidaSelected.idcomida;
            json = {};
        } else {
            json = {
                "tipo": document.querySelector("#txtTipoMenuSemanal").value
            };
            if (beanRequestMenuSemanal.operation === "update") {
                json.idcomida = comidaSelected.idcomida;
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

function listFilter() {
    $("#txtFilterComida").change(function () {
        var filter = $(this).val();
        processAjaxComida();
    }).keyup(function (e) {
        var txt = String.fromCharCode(e.which);
        if (txt.match(/[A-Za-z]/))
        {
            $(this).change();
        }

    });

}

function toListMenuSemanal(beanPagination) {
    document.querySelector("#tbodyMenuSemanal").innerHTML = "";
    document.querySelector("#titleManagerMenuSemanal").innerHTML = "[ " + beanPagination.count_filter + " ] MENU SEMANAL ";
    if (beanPagination.count_filter > 0) {
        let row;
        let head;
        head = "<tr>";
        head += "<th class='text-uppercase' scope='col' >FECHA</th>";
        head += "<th class='text-uppercase' scope='col' >DESAYUNO</th>";
        head += "<th class='text-uppercase' scope='col' >ALMUERZO</th>";
        head += "<th class='text-uppercase' scope='col' >CENA</th>";
        head += "<th class='text-uppercase' scope='col' colspan='2' style='width: 20%'>ACCION</th>";
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
            row += "<td class='text-center align-middle'><button class='btn btn-outline-secondary btn-xs editar-menu' data-toggle='tooltip' title='Editar'><i class='icon icon-editors icon-fw'></i></button></td>";
            row += "<td class='text-center align-middle'><button class='btn btn-outline-secondary btn-xs eliminar-menu' data-toggle='tooltip' title='Eliminar'><i class='icon icon-trash icon-fw'></i></button></td>";
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

function addEventsMenuSemanales() {
    document.querySelectorAll('.editar-menu').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            detalleCronogramaSelected = findByMenuSemanal(btn.parentElement.parentElement.getAttribute('idcronograma'));
            if (detalleCronogramaSelected != undefined) {
                beanRequestMenuSemanal.operation = "update";
                beanRequestMenuSemanal.type_request = "PUT";
                //SET VALUES MODAL
                if (ListaComidaDesayuno.length == 0) {
                    pushDesayuno(detalleCronogramaSelected);
                }
                if (ListaComidaAlmuerzo.length == 0) {
                    pushAlmuerzo(detalleCronogramaSelected);
                }
                if (ListaComidaCena.length == 0) {
                    pushCena(detalleCronogramaSelected);
                }
                document.querySelector("#buttonAlmuerzo").innerHTML = "ALMUERZO";
                document.querySelector("#buttonCena").innerHTML = "CENA";
                document.querySelector("#buttonDesayuno").innerHTML = "DESAYUNO";
                document.querySelector("#txtTituloModalMan").innerHTML = "EDITAR MENU";


                $('#ventanaModalMenuSemanal').modal("show");

            } else {
                showAlertTopEnd('warning', 'No se encontró el cronograma para poder editar');
            }
        };
    });
    document.querySelectorAll('.eliminar-menu').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            detalleCronogramaSelected = findByMenuSemanal(btn.parentElement.parentElement.getAttribute('idcronograma'));
            beanRequestMenuSemanal.operation = "delete";
            beanRequestMenuSemanal.type_request = "DELETE";
            processAjaxMenuSemanal();
        };
    });
    document.querySelectorAll('.agregar-comida').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            comidaSelected = findByComida(btn.parentElement.getAttribute('idcomida'));
            if (comidaSelected !== undefined) {

                if (ListaDetalleComida.length < 4) {
                    //SET VALUES MODAL
                    ListaDetalleComida.push({idcomida: comidaSelected.idcomida,
                        tipo: comidaSelected.tipo,
                        descripcion: comidaSelected.descripcion.toUpperCase()});

                    toListComidaTabla(ListaDetalleComida);
                    lista += comidaSelected.idcomida+",";
                } else {
                    showAlertTopEnd('warning', 'Solo se permite 4 comidas ');
                }
            } else {
                showAlertTopEnd('warning', 'No se encontró la comida para agregar a la lista');
            }
        };
    });
    document.querySelectorAll('.quitar-comida').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            ListaDetalleComida.splice(btn.parentElement.parentElement.getAttribute('idarraycomida'), 1);
            toListComidaTabla(ListaDetalleComida);
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
    if (document.querySelector("#txtTipoMenuSemanal").value == 0) {
        showAlertTopEnd('warning', 'Por favor ingrese tipo ');
        document.querySelector("#txtTipoMenuSemanal").focus();
        return false;
    } else if (document.querySelector("#txtDiaMenuSemanal").value == 0) {
        showAlertTopEnd('warning', 'Por favor ingrese el día ');
        document.querySelector("#txtTipoMenuSemanal").focus();
        return false;
    } else if (ListaComidaAlmuerzo.length < 2) {
        showAlertTopEnd('warning', 'Por favor ingrese la Almuerzo');
        return false;
    } else if (ListaComidaCena.length < 2) {
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

function toListComida(beanPagination) {
    document.querySelector("#ResultadoComida").innerHTML = "";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(comida => {
            row = "<li class='p-1' idcomida='" + comida.idcomida + "'>" + comida.descripcion.toUpperCase() + "&NonBreakingSpace;&NonBreakingSpace; ";
            row += "<small class='btn btn-primary btn-sm pt-1 pb-1 float-right agregar-comida'>Agregar a la Lista</small>";
            row += "</li>";
            document.querySelector("#ResultadoComida").innerHTML += row;
        });
        addEventsMenuSemanales();
    } else {
        destroyPagination($('#paginationComida'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterComida").focus();
    }
}

function processAjaxComida() {
    $.ajax({
        url: getHostAPI() + "api/comidas/paginate?tipo=" + document.querySelector("#txtFilterTipoComida").value +
                "&nombre=" + document.querySelector("#txtFilterComida").value.toUpperCase() + "&page=1&size=5",
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
                showAlertTopEnd('success', 'Acción realizada exitosamente');

            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationComida = beanCrudResponse.beanPagination;
            toListComida(beanPaginationComida);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        showAlertErrorRequest();

    });
}

function toListComidaTabla(ArrayComida) {
    document.querySelector(".tbodyComidaDiaria").innerHTML = "";
    if (ArrayComida.length > 0) {
        let row;
        ArrayComida.forEach(function (element, index) {
            row = "<tr ";
            row += "idarraycomida='" + element.idcomida + "' ";
            row += ">";
            row += "<td class='align-middle'>" + tipoComida(element.tipo) + "</td>";
            row += "<td class='align-middle'>" + element.descripcion + "</td>";
            row += "<td class='text-center align-middle'><button class='btn btn-outline-secondary btn-xs quitar-comida' data-toggle='tooltip' title='Quitar de la lista'><i class='icon icon-trash icon-fw'></i></button></td>";
            row += "</tr>";
            document.querySelector(".tbodyComidaDiaria").innerHTML += row;
        });
        addEventsMenuSemanales();

    } else {
        showAlertTopEnd('warning', 'No se encontraron resultados');

    }
}


function pushDesayuno(detallecronograma) {
    ListaComidaDesayuno.push({idcomida: detallecronograma.comida_dsegundo.idcomida,
        tipo: detallecronograma.comida_dsegundo.tipo, descripcion: detallecronograma.comida_dsegundo.descripcion.toUpperCase()});
    ListaComidaDesayuno.push({idcomida: detallecronograma.comida_dpostre.idcomida,
        tipo: detallecronograma.comida_dpostre.tipo, descripcion: detallecronograma.comida_dpostre.descripcion.toUpperCase()});
    ListaComidaDesayuno.push({idcomida: detallecronograma.comida_dbebida.idcomida,
        tipo: detallecronograma.comida_dbebida.tipo, descripcion: detallecronograma.comida_dbebida.descripcion.toUpperCase()});
    toListComidaTabla(ListaComidaDesayuno);
}

function pushAlmuerzo(detallecronograma) {
    ListaComidaAlmuerzo.push({idcomida: detallecronograma.comida_asegundo.idcomida,
        tipo: detallecronograma.comida_asegundo.tipo, descripcion: detallecronograma.comida_asegundo.descripcion.toUpperCase()});
    ListaComidaAlmuerzo.push({idcomida: detallecronograma.comida_asopa.idcomida,
        tipo: detallecronograma.comida_asopa.tipo, descripcion: detallecronograma.comida_asopa.descripcion.toUpperCase()});
    ListaComidaAlmuerzo.push({idcomida: detallecronograma.comida_apostre.idcomida,
        tipo: detallecronograma.comida_apostre.tipo, descripcion: detallecronograma.comida_apostre.descripcion.toUpperCase()});
    ListaComidaAlmuerzo.push({idcomida: detallecronograma.comida_abebida.idcomida,
        tipo: detallecronograma.comida_abebida.tipo, descripcion: detallecronograma.comida_abebida.descripcion.toUpperCase()});
    toListComidaTabla(ListaComidaAlmuerzo);

}

function pushCena(detallecronograma) {
    ListaComidaCena.push({idcomida: detallecronograma.comida_csegundo.idcomida,
        tipo: detallecronograma.comida_csegundo.tipo, descripcion: detallecronograma.comida_csegundo.descripcion.toUpperCase()});
    ListaComidaCena.push({idcomida: detallecronograma.comida_csopa.idcomida,
        tipo: detallecronograma.comida_csopa.tipo, descripcion: detallecronograma.comida_csopa.descripcion.toUpperCase()});
    ListaComidaCena.push({idcomida: detallecronograma.comida_cpostre.idcomida,
        tipo: detallecronograma.comida_cpostre.tipo, descripcion: detallecronograma.comida_cpostre.descripcion.toUpperCase()});
    ListaComidaCena.push({idcomida: detallecronograma.comida_cbebida.idcomida,
        tipo: detallecronograma.comida_cbebida.tipo, descripcion: detallecronograma.comida_cbebida.descripcion.toUpperCase()});
    toListComidaTabla(ListaComidaCena);
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