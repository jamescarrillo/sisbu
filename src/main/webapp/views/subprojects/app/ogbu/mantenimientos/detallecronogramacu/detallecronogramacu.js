var beanPaginationMenuSemanal;
var beanPaginationComida;
var ListaDetalleComida = [];
var comidaSelected;

var beanRequestMenuSemanal = new BeanRequest();
document.addEventListener("DOMContentLoaded", function () {
    //INICIALIZANDO VARIABLES DE SOLICITUD

    beanRequestMenuSemanal.entity_api = "api/comidas";
    beanRequestMenuSemanal.operation = "paginate";
    beanRequestMenuSemanal.type_request = "GET";
      $("#txtFilterTipoComida").change(function(){
         document.querySelector("#txtComidaMenuSemanal").innerHTML = "FILTRAR...";
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
        listFilter();
        processAjaxComida();
        //CONFIGURAMOS LA SOLICITUD
        beanRequestMenuSemanal.operation = "add";
        beanRequestMenuSemanal.type_request = "POST";
        //LIMPIAR LOS CAMPOS

        document.querySelector("#txtTipoMenuSemanal").options[0].selected = 'selected';
        //SET TITLE MODAL
        document.querySelector("#txtTituloModalMan").innerHTML = "REGISTRAR CRONOGRAMA";
        //OPEN MODEL
        $('#ventanaModalMenuSemanal').modal('show');
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
        parameters_pagination = "?nombre=" + document.querySelector("#txtFilterMenuSemanal").value.toUpperCase();
        parameters_pagination += "&page=" + document.querySelector("#pageMenuSemanal").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePageMenuSemanal").value;
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
        console.log("filtro :" + filter);
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
    document.querySelector("#titleManagerMenuSemanal").innerHTML = "[ " + beanPagination.count_filter + " ] CRONOGRAMA ";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(comida => {
            row = "<tr ";
            row += "idcomida='" + comida.idcomida + "' ";
            row += ">";
            row += "<td class='align-middle'>" + tipoMenuSemanal(comida.tipo) + "</td>";
            row += "<td class='align-middle'>" + comida.descripcion + "</td>";
            row += "<td class='text-center align-middle'><button class='btn btn-secondary btn-xs editar-comida' data-toggle='tooltip' title='Editar'><i class='icon icon-undo icon-fw'></i></button></td>";
            row += "<td class='text-center align-middle'><button class='btn btn-secondary btn-xs eliminar-comida' data-toggle='tooltip' title='Eliminar'><i class='icon icon-trash icon-fw'></i></button></td>";
            row += "</tr>";
            document.querySelector("#tbodyMenuSemanal").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageMenuSemanal").value),
                document.querySelector("#pageMenuSemanal"),
                $('#modalCargandoMenuSemanal'),
                $('#paginationMenuSemanal'));
        addEventsMenuSemanales();
        if (beanRequestMenuSemanal.operation === "paginate") {
            document.querySelector("#txtFilterMenuSemanal").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationMenuSemanal'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterMenuSemanal").focus();
    }
}

function addEventsMenuSemanales() {
    document.querySelectorAll('.editar-comida').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            comidaSelected = findByMenuSemanal(btn.parentElement.parentElement.getAttribute('idcomida'));
            if (comidaSelected != undefined) {
                beanRequestMenuSemanal.operation = "update";
                beanRequestMenuSemanal.type_request = "PUT";
                //SET VALUES MODAL
                console.log(comidaSelected.descripcion);
                document.querySelector("#txtTipoMenuSemanal").options[comidaSelected.tipo].selected = 'selected';
                document.querySelector("#txtTituloModalMan").innerHTML = "EDITAR CRONOGRAMA";
                $('#ventanaModalMenuSemanal').modal("show");
                document.querySelector("#txtDecripcionMenuSemanal").focus();
            } else {
                showAlertTopEnd('warning', 'No se encontró el cronograma para poder editar');
            }
        };
    });
    document.querySelectorAll('.eliminar-comida').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            comidaSelected = findByMenuSemanal(btn.parentElement.parentElement.getAttribute('idcomida'));
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
                //SET VALUES MODAL
                ListaDetalleComida.push(comidaSelected.idcomida + "," + document.querySelector("#txtDiaComida").value +
                        "," + comidaSelected.tipo + "," + comidaSelected.descripcion.toUpperCase());
                document.querySelector("#txtComidaMenuSemanal").innerHTML = comidaSelected.descripcion.toUpperCase();
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

function findByMenuSemanal(idcomida) {
    let comida_;
    beanPaginationMenuSemanal.list.forEach(comida => {
        if (idcomida == comida.idcomida) {
            comida_ = comida;
            return;
        }
    });
    return comida_;
}

function validateFormMenuSemanal() {
    console.log(ListaDetalleComida.length);
     if (document.querySelector("#txtDescripcionMenuSemanal").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese descripcion');
        document.querySelector("#txtTipoMenuSemanal").focus();
        return false;
    }else if (document.querySelector("#txtTipoMenuSemanal").value == 0) {
        showAlertTopEnd('warning', 'Por favor ingrese tipo ');
        document.querySelector("#txtTipoMenuSemanal").focus();
        return false;
    }else if (document.querySelector("#txtDiaMenuSemanal").value == 0) {
        showAlertTopEnd('warning', 'Por favor ingrese el día ');
        document.querySelector("#txtTipoMenuSemanal").focus();
        return false;
    }else if (ListaDetalleComida.length != 11) {
        showAlertTopEnd('warning', 'Por favor ingrese la lista de comidas');
        document.querySelector("#txtTipoMenuSemanal").focus();
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
    document.querySelector("#tbodyComida").innerHTML = "";
    document.querySelector("#titleManagerMenuSemanal").innerHTML = "[ " + ArrayComida.length + " ] CRONOGRAMA ";
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
        addEventsMenuSemanales();

    } else {
        showAlertTopEnd('warning', 'No se encontraron resultados');

    }
}