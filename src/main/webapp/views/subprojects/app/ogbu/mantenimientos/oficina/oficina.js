
var beanPaginationOficina;
var oficinaSelected;

var beanRequestOficina = new BeanRequest();


document.addEventListener("DOMContentLoaded", function () {

    //INICIALIZANDO VARIABLES DE SOLICITUD
    beanRequestOficina.entity_api = "api/oficinas";
    beanRequestOficina.operation = "paginate";
    beanRequestOficina.type_request = "GET";

    $('#FrmOficina').submit(function (event) {
        $('#modalCargandoOficina').modal('show');
        event.preventDefault();
        event.stopPropagation();
    });

    $('#FrmOficinaModal').submit(function (event) {
        if (validateFormOficina()) {
            $('#modalCargandoOficina').modal('show');
        }
        event.preventDefault();
        event.stopPropagation();
    });

    document.querySelector("#btnOpenNewOficina").onclick = function () {
        //CONFIGURAMOS LA SOLICITUD
        beanRequestOficina.operation = "add";
        beanRequestOficina.type_request = "POST";
        //LIMPIAR LOS CAMPOS
        document.querySelector("#txtNombreOficinaER").value = "";
        //SET TITLE MODAL
        document.querySelector("#txtTituloModalMan").innerHTML = "REGISTRAR OFICINA";
        //OPEN MODEL
        $('#ventanaModalOficina').modal('show');
    };

    $("#modalCargandoOficina").on('shown.bs.modal', function () {
        processAjaxOficina();
    });

    $('#modalCargandoOficina').modal('show');

});

function processAjaxOficina() {
    let parameters_pagination = "";
    let json = "";
    if (beanRequestOficina.operation === "paginate") {
        parameters_pagination = "?nombre=" + document.querySelector("#txtFilterOficina").value.toUpperCase();
        parameters_pagination += "&page=" + document.querySelector("#pageOficina").value;
        parameters_pagination += "&size=" + document.querySelector("#sizePageOficina").value;
    } else {
        parameters_pagination = "";
        json = {
            "nombre": document.querySelector("#txtNombreOficinaER").value
        };
        if (beanRequestOficina.operation === "update") {
            json.idoficina = oficinaSelected.idoficina
        }
    }
    $.ajax({
        url: getHostAPI() + beanRequestOficina.entity_api + "/" + beanRequestOficina.operation + parameters_pagination,
        type: beanRequestOficina.type_request,
        headers: {
            //'Authorization': 'Bearer ' + Cookies.get("sisbu_token")
        },
        data: JSON.stringify(json),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (beanCrudResponse) {
        console.log(beanCrudResponse);
        $('#modalCargandoOficina').modal("hide");
        if (beanCrudResponse.messageServer !== undefined) {
            if (beanCrudResponse.messageServer.toLowerCase() === "ok") {
                showAlertTopEnd('success', 'Acción realizada exitosamente');
                $('#ventanaModalOficina').modal('hide');
            } else {
                showAlertTopEnd('warning', beanCrudResponse.messageServer);
            }
        }
        if (beanCrudResponse.beanPagination !== undefined) {
            beanPaginationOficina = beanCrudResponse.beanPagination;
            toListOficina(beanPaginationOficina);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#modalCargandoOficina').modal("hide");
        showAlertErrorRequest();
        console.log(errorThrown);
    });
}

function toListOficina(beanPagination) {
    document.querySelector("#tbodyOficina").innerHTML = "";
    document.querySelector("#titleManagerOficina").innerHTML = "[ " + beanPagination.count_filter + " ] OFICINAS";
    if (beanPagination.count_filter > 0) {
        let row;
        beanPagination.list.forEach(oficina => {
            row = "<tr ";
            row += "idoficina='" + oficina.idoficina + "' ";
            row += ">";
            row += "<td class='align-middle'>" + oficina.nombre + "</td>";
            row += "<td class='text-center align-middle'><button class='btn btn-secondary btn-xs editar-oficina' data-toggle='tooltip' title='Editar'><i class='icon icon-company icon-fw'></i></button></td>";
            row += "<td class='text-center align-middle'><button class='btn btn-secondary btn-xs eliminar-oficina' data-toggle='tooltip' title='Eliminar'><i class='icon icon-company icon-fw'></i></button></td>";
            row += "</tr>";
            document.querySelector("#tbodyOficina").innerHTML += row;
        });
        buildPagination(
                beanPagination.count_filter,
                parseInt(document.querySelector("#sizePageOficina").value),
                document.querySelector("#pageOficina"),
                $('#modalCargandoOficina'),
                $('#paginationOficina'));
        addEventsOficinaes();
        if (beanRequestOficina.operation === "paginate") {
            document.querySelector("#txtFilterOficina").focus();
        }
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        destroyPagination($('#paginationOficina'));
        showAlertTopEnd('warning', 'No se encontraron resultados');
        document.querySelector("#txtFilterOficina").focus();
    }
}

function addEventsOficinaes() {
    document.querySelectorAll('.editar-oficina').forEach(btn => {
        //AGREGANDO EVENTO CLICK
        btn.onclick = function () {
            oficinaSelected = findByOficina(btn.parentElement.parentElement.getAttribute('idoficina'));
            if (oficinaSelected != undefined) {
                beanRequestOficina.operation = "update";
                beanRequestOficina.type_request = "PUT";
                //SET VALUES MODAL
                document.querySelector("#txtNombreOficinaER").value = oficinaSelected.nombre;
                document.querySelector("#txtTituloModalMan").innerHTML = "EDITAR ÁREA DE ATENCIÓN";
                $('#ventanaModalOficina').modal("show");
                document.querySelector("#txtNombreOficinaER").focus();
            } else {
                showAlertTopEnd('warning', 'No se encontró el Oficina para poder editar');
            }
        };
    });

}

function findByOficina(idoficina) {
    let oficina_;
    beanPaginationOficina.list.forEach(oficina => {
        if (idoficina == oficina.idoficina) {
            oficina_ = oficina;
            return;
        }
    });
    return oficina_;
}

function validateFormOficina() {
    if (document.querySelector("#txtNombreOficinaER").value == "") {
        showAlertTopEnd('warning', 'Por favor ingrese nombre');
        document.querySelector("#txtNombreOficinaER").focus();
        return false;
    }
    return true;
}
