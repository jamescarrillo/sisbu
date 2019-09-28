var beanPaginationDeporte;
var deporteSelected;
var beanRequestDeporte = new BeanRequest();
document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestDeporte.entity_api = "api/deportes";
    beanRequestDeporte.operation = "paginate";
    beanRequestDeporte.type_request = "GET";

    $('#FrmDeporte').submit(function (event) {
        beanRequestDeporte.operation = "paginate";
        beanRequestDeporte.type_request = "GET";
        $('#modalCargandoDeporte').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $('#FrmDeporteModal').submit(function (event) {
        if (validateFormDeporte()) {
            $('#modalCargandoDeporte').modal('show');
        }
        event.preventDefault();
        event.stopPropagation();
    });

    document.querySelector("#btnOpenNewDeporte").onclick = function () {
        //CONFIGURAMOS LA SOLICITUD
        beanRequestDeporte.operation = "add";
        beanRequestDeporte.type_request = "POST";
        //LIMPIAR LOS CAMPOS
        document.querySelector("#txtNombreDeporte").value = "";
        //SET TITLE MODAL
        document.querySelector("#txtTituloModalMan").innerHTML = "REGISTRAR CARGO";
        //OPEN MODEL
        $('#ventanaModalDeporte').modal('show');
    };

    $("#modalCargandoDeporte").on('shown.bs.modal', function () {
        if (!$('#ventanaModalDeporte').hasClass("show")) {
          beanRequestDeporte.operation = "paginate";
            beanRequestDeporte.type_request = "GET";
        }
        processAjaxDeporte();
    });
    
    $("#modalCargandoDeporte").on('hide.bs.modal', function () {
          beanRequestDeporte.operation = "paginate";
          beanRequestDeporte.type_request = "GET";
    });

    $('#modalCargandoDeporte').modal('show');

    $("#sizePageDeporte").change(function () {
        $('#modalCargandoDeporte').modal('show');
    });

});

function processAjaxDeporte() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestDeporte.operation == "paginate") {
        parameters_pagination += "?nombre=" + document.querySelector("#txtFilterDeporte").value.toUpperCase();
        parameters_pagination += "&page=" + document.querySelector("#pageDeporte").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePageDeporte").value;

    } else {
        parameters_pagination = "";
        if (beanRequestDeporte.operation == "delete") {
            parameters_pagination = "/" + deporteSelected.iddeporte;
            json = {};
        } else {
            json = {
                "nombre": document.querySelector("#txtNombreDeporte").value,
            };
            if (beanRequestDeporte.operation == "update") {
                json.iddeporte = deporteSelected.iddeporte;
            }
        }
    }
    $.ajax({
        url: getHostAPI() + beanRequestDeporte.entity_api + "/" + beanRequestDeporte.operation + parameters_pagination,
        type: beanRequestDeporte.type_request,
        headers: {
            //'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        $('#modalCargandoDeporte').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() == "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
                $('#ventanaModalDeporte').modal('hide');
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationDeporte = beanCrudResponse.beanPagination;
            toListDeporte(beanPaginationDeporte);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoDeporte').modal("hide");
        showAlertErrorRequest();

    });
}

function toListDeporte(beanPagination) {
    document.querySelector("#tbodyDeporte").innerHTML = "";
    document.querySelector("#titleManagerDeporte").innerHTML = "[ " + beanPagination.count_filter + " ] DEPORTES";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(deporte => {
            row = "<tr ";
            row += "iddeporte='" + deporte.iddeporte + "' ";
            row += ">";
            row += "<td><ul class='dt-list dt-list-cm-0'>";
            row += "<li class='dt-list__item editar-deporte' data-toggle='tooltip' title='Editar'><a class='text-light-gray' href='javascript:void(0)'>";
            row += "<i class='text-primary icon icon-editors'></i></a></li>";
            row += "<li class='dt-list__item eliminar-deporte' data-toggle='tooltip' title='Eliminar'><a class='text-light-gray' href='javascript:void(0)'>";
            row += "<i class='text-danger icon icon-trash-filled'></i></a></li>";
            row += "</ul></td>"; 
            row += "<td class='align-middle'>" + deporte.nombre + "</td>";
              row += "</tr>";
            document.querySelector("#tbodyDeporte").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageDeporte").value),
                document.querySelector("#pageDeporte"),
                $('#modalCargandoDeporte'),
                $('#paginationDeporte'));
        addEventsDeportees();
        if (beanRequestDeporte.operation == "paginate") {
            document.querySelector("#txtFilterDeporte").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationDeporte'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterDeporte").focus();
    }
}

function addEventsDeportees() {
    document.querySelectorAll('.editar-deporte').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            deporteSelected = findByDeporte(btn.parentElement.parentElement.parentElement.getAttribute('iddeporte'));
            if (deporteSelected != undefined) {
                beanRequestDeporte.operation = "update";
                beanRequestDeporte.type_request = "PUT";
                //SET VALUES MODAL
                document.querySelector("#txtNombreDeporte").value = deporteSelected.nombre;
                document.querySelector("#txtTituloModalMan").innerHTML = "EDITAR DEPORTE";
                $('#ventanaModalDeporte').modal("show");
                document.querySelector("#txtNombreDeporte").focus();
            } else {
                showAlertTopEnd('warning', 'No se encontró el Deporte para poder editar');
            }
        };
    });
    document.querySelectorAll('.eliminar-deporte').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            deporteSelected = findByDeporte(btn.parentElement.parentElement.parentElement.getAttribute('iddeporte'));
            beanRequestDeporte.operation = "delete";
            beanRequestDeporte.type_request = "DELETE";
            processAjaxDeporte();
        };
    });
}

function findByDeporte(iddeporte) {
    let deporte_;
    beanPaginationDeporte.list.forEach(deporte => {
        if (iddeporte == deporte.iddeporte) {
            deporte_ = deporte;
            return;
        }
    });
    return deporte_;
}

function validateFormDeporte() {
    if (document.querySelector("#txtNombreDeporte").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese nombre');
        document.querySelector("#txtNombrenDeporte").focus();
        return false;
    }
    return true;
}

