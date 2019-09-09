var beanPaginationDetalleCronogramaCU;
var beanPaginationComida;
var ListaDetalleComida = [];
var comidaSelected;

var beanRequestDetalleCronogramaCU = new BeanRequest();
document.addEventListener("DOMContentLoaded", function () {
    //INICIALIZANDO VARIABLES DE SOLICITUD

    beanRequestDetalleCronogramaCU.entity_api = "api/detallecronogramacu";
    beanRequestDetalleCronogramaCU.operation = "paginate";
    beanRequestDetalleCronogramaCU.type_request = "GET";
      $("#txtFilterTipoComida").change(function(){
         document.querySelector("#txtComidaDetalleCronogramaCU").innerHTML = "FILTRAR...";
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
        listFilter();
        processAjaxComida();
        //CONFIGURAMOS LA SOLICITUD
        beanRequestDetalleCronogramaCU.operation = "add";
        beanRequestDetalleCronogramaCU.type_request = "POST";
        //LIMPIAR LOS CAMPOS

        document.querySelector("#txtTipoDetalleCronogramaCU").options[0].selected = 'selected';
        //SET TITLE MODAL
        document.querySelector("#txtTituloModalMan").innerHTML = "REGISTRAR CRONOGRAMA";
        //OPEN MODEL
        $('#ventanaModalDetalleCronogramaCU').modal('show');
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
        parameters_pagination = "?indice=" + document.querySelector("#txtFilterDetalleCronogramaCU").value.toUpperCase();
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
        beanPagination.list.forEach(comida => {
            row = "<tr ";
            row += "idcomida='" + comida.idcomida + "' ";
            row += ">";
            row += "<td class='align-middle'>" + tipoDetalleCronogramaCU(comida.tipo) + "</td>";
            row += "<td class='align-middle'>" + comida.descripcion + "</td>";
            row += "<td class='text-center align-middle'><button class='btn btn-secondary btn-xs editar-comida' data-toggle='tooltip' title='Editar'><i class='icon icon-undo icon-fw'></i></button></td>";
            row += "<td class='text-center align-middle'><button class='btn btn-secondary btn-xs eliminar-comida' data-toggle='tooltip' title='Eliminar'><i class='icon icon-trash icon-fw'></i></button></td>";
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
            document.querySelector("#txtFilterDetalleCronogramaCU").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationDetalleCronogramaCU'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterDetalleCronogramaCU").focus();
    }
}

function addEventsDetalleCronogramaCUes() {
    document.querySelectorAll('.editar-comida').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            comidaSelected = findByDetalleCronogramaCU(btn.parentElement.parentElement.getAttribute('idcomida'));
            if (comidaSelected != undefined) {
                beanRequestDetalleCronogramaCU.operation = "update";
                beanRequestDetalleCronogramaCU.type_request = "PUT";
                //SET VALUES MODAL
                console.log(comidaSelected.descripcion);
                document.querySelector("#txtTipoDetalleCronogramaCU").options[comidaSelected.tipo].selected = 'selected';
                document.querySelector("#txtTituloModalMan").innerHTML = "EDITAR CRONOGRAMA";
                $('#ventanaModalDetalleCronogramaCU').modal("show");
                document.querySelector("#txtDecripcionDetalleCronogramaCU").focus();
            } else {
                showAlertTopEnd('warning', 'No se encontró el cronograma para poder editar');
            }
        };
    });
    document.querySelectorAll('.eliminar-comida').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            comidaSelected = findByDetalleCronogramaCU(btn.parentElement.parentElement.getAttribute('idcomida'));
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
                //SET VALUES MODAL
                ListaDetalleComida.push(comidaSelected.idcomida + "," + document.querySelector("#txtDiaComida").value +
                        "," + comidaSelected.tipo + "," + comidaSelected.descripcion.toUpperCase());
                document.querySelector("#txtComidaDetalleCronogramaCU").innerHTML = comidaSelected.descripcion.toUpperCase();
                toListComidaTabla(ListaDetalleComida);
                
            } else {
                showAlertTopEnd('warning', 'No se encontró la comida para agregar a la lista');
            }
        };
    });
    document.querySelectorAll('.quitar-comida').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            ListaDetalleComida.splice(btn.parentElement.parentElement.getAttribute('idarraycomida'),1);
            toListComidaTabla(ListaDetalleComida);
        };
    });
}

function findByDetalleCronogramaCU(idcomida) {
    let comida_;
    beanPaginationDetalleCronogramaCU.list.forEach(comida => {
        if (idcomida == comida.idcomida) {
            comida_ = comida;
            return;
        }
    });
    return comida_;
}

function validateFormDetalleCronogramaCU() {
    console.log(ListaDetalleComida.length);
     if (document.querySelector("#txtDescripcionDetalleCronogramaCU").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese descripcion');
        document.querySelector("#txtTipoDetalleCronogramaCU").focus();
        return false;
    }else if (document.querySelector("#txtTipoDetalleCronogramaCU").value == 0) {
        showAlertTopEnd('warning', 'Por favor ingrese tipo ');
        document.querySelector("#txtTipoDetalleCronogramaCU").focus();
        return false;
    }else if (document.querySelector("#txtDiaDetalleCronogramaCU").value == 0) {
        showAlertTopEnd('warning', 'Por favor ingrese el día ');
        document.querySelector("#txtTipoDetalleCronogramaCU").focus();
        return false;
    }else if (ListaDetalleComida.length != 11) {
        showAlertTopEnd('warning', 'Por favor ingrese la lista de comidas');
        document.querySelector("#txtTipoDetalleCronogramaCU").focus();
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
    document.querySelector("#tbodyComida").innerHTML = "";
    document.querySelector("#titleManagerDetalleCronogramaCU").innerHTML = "[ " + ArrayComida.length + " ] CRONOGRAMA ";
    if (ArrayComida.length > 0) {
        let row;
        let array;
        ArrayComida.forEach(function (element, index) {
            array = element.split(",");
            row = "<tr ";
            row += "idarraycomida='" + index + "' ";
            row += ">";
            row += "<td class='align-middle'>" + diaComida(parseInt(array[1])) + "</td>";
            row += "<td class='align-middle'>" + tipoComida(parseInt(array[2])) + "</td>";
            row += "<td class='align-middle'>" + array[3] + "</td>";
            row += "<td class='text-center align-middle'><button class='btn btn-secondary btn-xs quitar-comida' data-toggle='tooltip' title='Quitar de la lista'><i class='icon icon-trash icon-fw'></i></button></td>";
            row += "</tr>";
            document.querySelector("#tbodyComida").innerHTML += row;
        });
        addEventsDetalleCronogramaCUes();

    } else {
        showAlertTopEnd('warning', 'No se encontraron resultados');

    }
}