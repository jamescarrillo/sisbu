var beanPaginationDetalleCronogramaCU;
var beanPaginationComida;
var ListaDetalleComida = [], ListaComidaCena = [], ListaComidaAlmuerzo = [], ListaComidaDesayuno = [];
var comidaSelected, detalleCronogramaSelected;

var beanRequestDetalleCronogramaCU = new BeanRequest();
document.addEventListener("DOMContentLoaded", function () {
    //INICIALIZANDO VARIABLES DE SOLICITUD

    beanRequestDetalleCronogramaCU.entity_api = "api/detallecronogramacu";
    beanRequestDetalleCronogramaCU.operation = "paginate";
    beanRequestDetalleCronogramaCU.type_request = "GET";
    $("#txtFilterTipoComida").change(function () {
        var op = $("#txtFilterTipoComida option:selected").val();
        processAjaxComida();
    });
    $('#FrmDetalleCronogramaCU').submit(function (event) {
        beanRequestDetalleCronogramaCU.operation = "paginate";
        beanRequestDetalleCronogramaCU.type_request = "GET";
        $('#modalCargandoDetalleCronogramaCU').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $('#FrmDetalleCronogramaCUModal').submit(function (event) {
        if (validateFormDetalleCronogramaCU()) {
            $('#modalCargandoDetalleCronogramaCU').modal('show');
        }
        event.preventDefault();
        event.stopPropagation();
    });

    document.querySelector("#btnOpenNewDetalleCronogramaCU").onclick = function () {
       // listFilter();
        processAjaxComida();
        //CONFIGURAMOS LA SOLICITUD
        beanRequestDetalleCronogramaCU.operation = "add";
        beanRequestDetalleCronogramaCU.type_request = "POST";
        //LIMPIAR LOS CAMPOS
        ListaComidaAlmuerzo.length = 0;
        ListaComidaCena.length = 0;
        ListaComidaDesayuno.length = 0;
        ListaDetalleComida.length = 0;
        document.querySelector("#txtTipoDetalleCronogramaCU").options[0].selected = 'selected';
        //SET TITLE BUTTON
        document.querySelector("#buttonAlmuerzo").innerHTML = '<i class="icon icon-plus icon-fw"></i> ALMUERZO</button>';
        document.querySelector("#buttonCena").innerHTML = '<i class="icon icon-plus icon-fw"></i> CENA</button>';
        document.querySelector("#buttonDesayuno").innerHTML = '<i class="icon icon-plus icon-fw"></i> DESAYUNO</button>';
        //SET TITLE MODAL
        document.querySelector("#txtTituloModalMan").innerHTML = "REGISTRAR MENU";
        document.querySelector("#txtTituloModalComidaDiaria").innerHTML = "COMIDA";
        //OPEN MODEL
        $('#ventanaModalDetalleCronogramaCU').modal('show');
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
        switch (document.querySelector("#btnGuardarComida").getAttribute("comida")) {
            case "DESAYUNO":
                ListaComidaDesayuno.concat(ListaDetalleComida);
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
console.log(ListaDetalleComida);
console.log(ListaComidaAlmuerzo);
        if (ListaDetalleComida.length < 3) {
          showAlertTopEnd('warning', 'Por favor ingrese la lista de comida completa');
        } else {
            showAlertTopEnd('warning', 'Agregada la Comida, Continuar seleccione Guardar ');
            //OPEN MODEL
            $('#ventanaModalComidaDiaria').modal('hide');
            ListaDetalleComida.length = 0;
        }
        

    };

    $("#modalCargandoDetalleCronogramaCU").on('shown.bs.modal', function () {
        processAjaxDetalleCronogramaCU();
    });

    $('#modalCargandoDetalleCronogramaCU').modal('show');

});

function processAjaxDetalleCronogramaCU() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestDetalleCronogramaCU.operation === "paginate") {
        parameters_pagination = "?indice=" + document.querySelector("#txtFilterMenu").value.toUpperCase();
        parameters_pagination += "&page=" + document.querySelector("#pageDetalleCronogramaCU").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePageDetalleCronogramaCU").value;
    } else {
        parameters_pagination = "";
        if (beanRequestDetalleCronogramaCU.operation === "delete") {
            parameters_pagination = "/" + comidaSelected.idcomida;
            json = {};
        } else {
            json = {
                "tipo": document.querySelector("#txtTipoDetalleCronogramaCU").value
            };
            if (beanRequestDetalleCronogramaCU.operation === "update") {
                json.idcomida = comidaSelected.idcomida;
            }
        }


    }
    $.ajax({
        url: getHostAPI() + beanRequestDetalleCronogramaCU.entity_api + "/" + beanRequestDetalleCronogramaCU.operation + parameters_pagination,
        type: beanRequestDetalleCronogramaCU.type_request,
        headers: {
            //'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        console.log(beanCrudResponse);
        $('#modalCargandoDetalleCronogramaCU').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() === "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
                $('#ventanaModalDetalleCronogramaCU').modal('hide');
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationDetalleCronogramaCU = beanCrudResponse.beanPagination;
            toListDetalleCronogramaCU(beanPaginationDetalleCronogramaCU);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoDetalleCronogramaCU').modal("hide");
        showAlertErrorRequest();

    });
}

function listFilter() {
    $("#txtFilterComida").change(function () {
        var filter = $(this).val();
        console.log("filtro:"+filter);
        processAjaxComida();
    }).keyup(function (e) {
        var txt = String.fromCharCode(e.which);
        if (txt.match(/[A-Za-z]/))
        {
            $(this).change();
        }

    });

}

function toListDetalleCronogramaCU(beanPagination) {
    document.querySelector("#tbodyDetalleCronogramaCU").innerHTML = "";
    document.querySelector("#titleManagerDetalleCronogramaCU").innerHTML = "[ " + beanPagination.count_filter + " ] CRONOGRAMA ";
    if (beanPagination.count_filter > 0) {
        let row;
        console.log(beanPagination);
        beanPagination.list.forEach(detallecronogramacu => {
            row = "<tr ";
            row += "idcronograma='" + detallecronogramacu.iddetalle_cronogramacu + "' ";
            row += ">";
            row += "<td class='align-middle'></td>";
            row += "<td class='align-middle'><button class='btn btn-outline-info btn-xs ver-desayuno' data-toggle='tooltip' title='Desayuno'><i class='icon icon-plus icon-fw'></i></button></td>";
            row += "<td class='align-middle'><button class='btn btn-outline-success btn-xs ver-almuerzo' data-toggle='tooltip' title='Almuerzo'><i class='icon icon-plus icon-fw'></i></button></td>";
            row += "<td class='align-middle'><button class='btn btn-outline-warning btn-xs ver-cena' data-toggle='tooltip' title='Cena'><i class='icon icon-plus icon-fw'></i></button></td>";
            row += "<td class='text-center align-middle'><button class='btn btn-secondary btn-xs editar-menu' data-toggle='tooltip' title='Editar'><i class='icon icon-edit icon-fw'></i></button></td>";
            row += "<td class='text-center align-middle'><button class='btn btn-secondary btn-xs eliminar-menu' data-toggle='tooltip' title='Eliminar'><i class='icon icon-trash icon-fw'></i></button></td>";
            row += "</tr>";
            document.querySelector("#tbodyDetalleCronogramaCU").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageDetalleCronogramaCU").value),
                document.querySelector("#pageDetalleCronogramaCU"),
                $('#modalCargandoDetalleCronogramaCU'),
                $('#paginationDetalleCronogramaCU'));
        addEventsDetalleCronogramaCUes();
        if (beanRequestDetalleCronogramaCU.operation === "paginate") {
            document.querySelector("#txtFilterMenu").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationDetalleCronogramaCU'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterMenu").focus();
    }
}

function addEventsDetalleCronogramaCUes() {
    document.querySelectorAll('.ver-desayuno').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            detalleCronogramaSelected = findByDetalleCronogramaCU(btn.parentElement.parentElement.getAttribute('idcronograma'));
            console.log("desayuno:");
            console.log(ListaComidaDesayuno);
            if (detalleCronogramaSelected != undefined) {
                if (ListaComidaDesayuno.length > 0) {
                    ListaComidaDesayuno.length = 0;
                }
                pushDesayuno(detalleCronogramaSelected);
                //SET TITLE MODAL
                document.querySelector("#txtTituloModalComidaTabla").innerHTML = "DESAYUNO DEL DÍA";
                //OPEN MODEL
                $('#ventanaModalComidaTabla').modal('show');
                processAjaxComida();
                ;
            } else {
                showAlertTopEnd('warning', 'No se encontró el cronograma para poder editar');
            }
        };
    });
    document.querySelectorAll('.ver-almuerzo').forEach(btn => {

        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            detalleCronogramaSelected = findByDetalleCronogramaCU(btn.parentElement.parentElement.getAttribute('idcronograma'));
            if (detalleCronogramaSelected != undefined) {
                if (ListaComidaAlmuerzo.length > 0) {
                    ListaComidaAlmuerzo.length = 0;
                }
                pushAlmuerzo(detalleCronogramaSelected);
                //SET TITLE MODAL
                document.querySelector("#txtTituloModalComidaTabla").innerHTML = "ALMUERZO DEL DÍA";
                //OPEN MODEL
                $('#ventanaModalComidaTabla').modal('show');
                processAjaxComida();
            } else {
                showAlertTopEnd('warning', 'No se encontró el cronograma para poder editar');
            }
        };
    });
    document.querySelectorAll('.ver-cena').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            detalleCronogramaSelected = findByDetalleCronogramaCU(btn.parentElement.parentElement.getAttribute('idcronograma'));
            if (detalleCronogramaSelected != undefined) {
                if (ListaComidaCena.length > 0) {
                    ListaComidaCena.length = 0;
                }
                pushCena(detalleCronogramaSelected);
                //SET TITLE MODAL
                document.querySelector("#txtTituloModalComidaTabla").innerHTML = "CENA DEL DÍA";
                //OPEN MODEL
                $('#ventanaModalComidaTabla').modal('show');
                processAjaxComida();
                console.log(detalleCronogramaSelected);
            } else {
                showAlertTopEnd('warning', 'No se encontró el cronograma para poder editar');
            }
        };
    });
    document.querySelectorAll('.editar-menu').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            detalleCronogramaSelected = findByDetalleCronogramaCU(btn.parentElement.parentElement.getAttribute('idcronograma'));
            if (detalleCronogramaSelected != undefined) {
                beanRequestDetalleCronogramaCU.operation = "update";
                beanRequestDetalleCronogramaCU.type_request = "PUT";
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


                $('#ventanaModalDetalleCronogramaCU').modal("show");

            } else {
                showAlertTopEnd('warning', 'No se encontró el cronograma para poder editar');
            }
        };
    });
    document.querySelectorAll('.eliminar-menu').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            detalleCronogramaSelected = findByDetalleCronogramaCU(btn.parentElement.parentElement.getAttribute('idcronograma'));
            beanRequestDetalleCronogramaCU.operation = "delete";
            beanRequestDetalleCronogramaCU.type_request = "DELETE";
            processAjaxDetalleCronogramaCU();
        };
    });
    document.querySelectorAll('.agregar-comida').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            comidaSelected = findByComida(btn.parentElement.getAttribute('idcomida'));
            if (comidaSelected !== undefined) {
               
                if (ListaDetalleComida.length < 4) {
                     //SET VALUES MODAL
                ListaDetalleComida.push({idcomida:comidaSelected.idcomida,tipo:comidaSelected.tipo,descripcion:comidaSelected.descripcion.toUpperCase()});
                    toListComidaTabla(ListaDetalleComida);
                } else {
                    showAlertTopEnd('warning', 'Solo se permite 4 comidas ');
                }
                console.log(ListaDetalleComida);
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

function findByDetalleCronogramaCU(iddetallecronogramacu) {
    let comida_;
    beanPaginationDetalleCronogramaCU.list.forEach(detallecronogramacu => {
        if (iddetallecronogramacu == detallecronogramacu.iddetalle_cronogramacu) {
            comida_ = detallecronogramacu;
            return;
        }
    });
    return comida_;
}

function validateFormDetalleCronogramaCU() {
    console.log(ListaComidaAlmuerzo.length);
    if (document.querySelector("#txtTipoDetalleCronogramaCU").value == 0) {
        showAlertTopEnd('warning', 'Por favor ingrese tipo ');
        document.querySelector("#txtTipoDetalleCronogramaCU").focus();
        return false;
    } else if (document.querySelector("#txtDiaDetalleCronogramaCU").value == 0) {
        showAlertTopEnd('warning', 'Por favor ingrese el día ');
        document.querySelector("#txtTipoDetalleCronogramaCU").focus();
        return false;
    } else if (ListaComidaAlmuerzo.length<2 ) {
        showAlertTopEnd('warning', 'Por favor ingrese la Almuerzo');
        return false;
    }else if (ListaComidaCena.length<2 ) {
        showAlertTopEnd('warning', 'Por favor ingrese Cena');
        return false;
    }
    return true;
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
        addEventsDetalleCronogramaCUes();
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
            row += "idarraycomida='" + element.idcomida+ "' ";
            row += ">";
            row += "<td class='align-middle'>" + tipoComida(element.tipo) + "</td>";
            row += "<td class='align-middle'>" + element.descripcion + "</td>";
            row += "<td class='text-center align-middle'><button class='btn btn-secondary btn-xs quitar-comida' data-toggle='tooltip' title='Quitar de la lista'><i class='icon icon-trash icon-fw'></i></button></td>";
            row += "</tr>";
            document.querySelector(".tbodyComidaDiaria").innerHTML += row;
        });
        addEventsDetalleCronogramaCUes();

    } else {
        showAlertTopEnd('warning', 'No se encontraron resultados');

    }
}


function pushDesayuno(detallecronograma) {
    ListaComidaDesayuno.push({idcomida:detallecronograma.comida_dsegundo.idcomida,
            tipo:detallecronograma.comida_dsegundo.tipo,descripcion:detallecronograma.comida_dsegundo.descripcion.toUpperCase()});
    ListaComidaDesayuno.push({idcomida:detallecronograma.comida_dpostre.idcomida,
            tipo:detallecronograma.comida_dpostre.tipo,descripcion:detallecronograma.comida_dpostre.descripcion.toUpperCase()});
    ListaComidaDesayuno.push({idcomida:detallecronograma.comida_dbebida.idcomida,
            tipo:detallecronograma.comida_dbebida.tipo,descripcion:detallecronograma.comida_dbebida.descripcion.toUpperCase()});
    toListComidaTabla(ListaComidaDesayuno);
}

function pushAlmuerzo(detallecronograma) {
    ListaComidaAlmuerzo.push({idcomida:detallecronograma.comida_asegundo.idcomida,
            tipo:detallecronograma.comida_asegundo.tipo,descripcion:detallecronograma.comida_asegundo.descripcion.toUpperCase()});
    ListaComidaAlmuerzo.push({idcomida:detallecronograma.comida_asopa.idcomida,
            tipo:detallecronograma.comida_asopa.tipo,descripcion:detallecronograma.comida_asopa.descripcion.toUpperCase()});
    ListaComidaAlmuerzo.push({idcomida:detallecronograma.comida_apostre.idcomida,
        tipo:detallecronograma.comida_apostre.tipo,descripcion:detallecronograma.comida_apostre.descripcion.toUpperCase()});
    ListaComidaAlmuerzo.push({idcomida:detallecronograma.comida_abebida.idcomida,
            tipo:detallecronograma.comida_abebida.tipo,descripcion:detallecronograma.comida_abebida.descripcion.toUpperCase()});
    toListComidaTabla(ListaComidaAlmuerzo);

}

function pushCena(detallecronograma) {
    ListaComidaCena.push({idcomida:detallecronograma.comida_csegundo.idcomida,
            tipo:detallecronograma.comida_csegundo.tipo,descripcion:detallecronograma.comida_csegundo.descripcion.toUpperCase()});
    ListaComidaCena.push({idcomida:detallecronograma.comida_csopa.idcomida,
            tipo:detallecronograma.comida_csopa.tipo,descripcion:detallecronograma.comida_csopa.descripcion.toUpperCase()});
    ListaComidaCena.push({idcomida:detallecronograma.comida_cpostre.idcomida,
            tipo:detallecronograma.comida_cpostre.tipo,descripcion:detallecronograma.comida_cpostre.descripcion.toUpperCase()});
    ListaComidaCena.push({idcomida:detallecronograma.comida_cbebida.idcomida,
            tipo:detallecronograma.comida_cbebida.tipo,descripcion:detallecronograma.comida_cbebida.descripcion.toUpperCase()});
    toListComidaTabla(ListaComidaCena);
}
